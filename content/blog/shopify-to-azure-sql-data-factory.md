---
title: "Shopify to Azure SQL: A Production ADF Pipeline"
seo_title: "Shopify to Azure SQL with Data Factory: A Production Guide"
seo_description: "Load Shopify into Azure SQL with Data Factory: Link-header paging, a 2-per-second request pace, a watermark table, and GraphQL for what REST doesn't return."
slug: shopify-to-azure-sql-data-factory
target_query: shopify to azure sql
service: data-engineering
case_study: pink-chicken-retail-data
status: published
published: 2026-12-08
---

> **Short answer**
> - Azure Data Factory can load Shopify into Azure SQL without a paid connector: a REST copy that follows Shopify's `Link` headers, one request every 0.5 seconds, and a watermark table so each night loads only what changed.
> - Shopify's REST API doesn't return everything. Incoming stock comes only from GraphQL, and so does the order-change history that explains gift-card refunds.
> - Data Factory creates text columns as `nvarchar(max)`, which you can't index. Resize them to the lengths you measure, and give product tags their own table.
> - Split long load procedures into logged steps (ours went from 4 hours to about 30 minutes), and alert on one thing: failed runs. That took monitoring from about $1,000 a month to $0.10.

I built this pipeline for a US children's clothing brand that sells through 10+ shops, online and wholesale. Shopify ran the shops and the website. Apparel Magic ran the warehouse. Neither system agreed with the other, and the team was putting reports together by hand. This post covers the Shopify half: how the data gets into Azure SQL, where the REST API falls short, and what I would set up the same way again.

## What does a Shopify to Azure SQL pipeline look like?

There are four layers, and each one does one job:

1. **Extract.** Data Factory copy activities call the Shopify Admin API and write the raw JSON to Blob storage. Keeping the raw response means you can reload a table without calling Shopify again.
2. **Flatten.** Data flows turn the nested JSON (orders, line items, refunds, fulfillments, transactions) into flat base tables in Azure SQL. Shopify tables and Apparel Magic tables sit side by side, each with its own prefix.
3. **Model.** Stored procedures build the reporting tables from the base tables, including rules that stop online stock being counted twice across the two systems.
4. **Report.** Views feed Power BI, including stock valued at cost, retail and wholesale price for each location.

A parent pipeline runs a `ForEach` over the list of tables and then refreshes the views. Each table has its own child pipeline, so you can rerun one endpoint on its own.

## How do you page through the Shopify REST API in Data Factory?

Shopify's REST API returns at most 250 records per call and pages with cursors in the `Link` response header, not with page numbers. Data Factory's REST source supports that format (RFC 5988) out of the box, so you switch it on instead of building a loop:

```json
"source": {
  "type": "RestSource",
  "requestMethod": "GET",
  "requestInterval": "00.00:00:00.500",
  "httpRequestTimeout": "00:01:40",
  "paginationRules": { "supportRFC5988": "true" }
}
```

The relative URL is built from pipeline parameters. For orders it asks for the largest page, includes every status (by default, Shopify only returns open orders), and adds `updated_at_min` when there is a previous load to continue from:

```text
@concat(
  pipeline().parameters.endpoint,
  '?limit=250',
  '&status=any',
  if(equals(pipeline().parameters.updated_at, null), '',
     concat('&updated_at_min=',
            formatDateTime(pipeline().parameters.updated_at, 'yyyy-MM-ddTHH:mm:ss')))
)
```

> **Tip:** Write the raw pages to storage first and flatten them in a second step. When a data flow mapping is wrong, you fix it and rerun from storage instead of paging through every order again.

## Shopify API rate limits in Data Factory

Shopify's REST Admin API gives each app a bucket of 40 requests per store that drains at 2 requests a second on a standard plan. Go over it and you get `429 Too Many Requests` with a `Retry-After` header. The `requestInterval` of 0.5 seconds above is exactly the drain rate, so a long copy never empties the bucket.

The GraphQL calls run as Web activities, and those have their own retry policy: two retries, 30 seconds apart. GraphQL limits work differently: they are based on query cost, not request count. So test a parallel loop (we ran up to 15 locations at once) against your own store before trusting it.

## Incremental loads with a load-control table

Reloading every order every night gets slower each month. Instead, one small table holds a timestamp per table, and the pipeline reads it before each load:

```sql
-- 1. Lookup: when did this table last load?
SELECT updated_at FROM load_watermark WHERE table_name = @table_name;

-- 2. The child pipeline gets updated_at and passes it as updated_at_min.

-- 3. After a successful copy, move the watermark forward.
UPDATE load_watermark
SET updated_at = FORMAT(GETUTCDATE(), 'yyyy-MM-ddTHH:mm:ss') + 'Z'
WHERE table_name = @table_name;
```

In Data Factory this is a Lookup, then a Switch on the table name that calls the right child pipeline with `updated_at`, then a stored-procedure activity. The watermark only moves after the copy succeeds, so a failed night is picked up again the next night.

> **Warning:** Our procedure stamps the time it runs, which is after the copy finishes. A record changed in Shopify while the copy was running could fall between the two. The safer version sets a variable to `utcnow()` before the copy starts and passes that to the procedure. Re-reading a few minutes of orders costs nothing; missing one costs a reconciliation.

Weekly full-sync pipelines sit next to the incremental ones. They catch anything an incremental window missed.

## REST vs GraphQL: what Shopify's REST API doesn't return

Shopify now calls its REST Admin API legacy, and the data shows why. Two gaps changed this project.

**Incoming inventory.** The REST `inventory_levels` endpoint returns one quantity per item and location: `available`. Stock on its way to a shop is not in it. That only exists in GraphQL, where an inventory level has named quantities:

```graphql
query getInventoryLevels($locationId: ID!, $first: Int!, $after: String) {
  location(id: $locationId) {
    inventoryLevels(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges { node {
        quantities(names: ["available", "incoming", "committed"]) { name quantity }
        item { id sku tracked }
      } }
    }
  }
}
```

GraphQL pages with a cursor in the response body, not in a header, so the REST pagination switch doesn't help here. The inventory pipeline gets every location first, then runs a child pipeline per location. That child pipeline is an `Until` loop: post the query, save the response to storage, read `hasNextPage` and `endCursor`, and repeat. A data flow then merges the GraphQL quantities into the same tables the REST data feeds, and the staged files are deleted at the end.

**Order changes and gift cards.** Monthly sales in the warehouse were 1–3% off Shopify's own reports. The cause was gift cards issued as refunds and then spent, and the only record of it was the order-change history, which REST doesn't expose. That story has [its own post](/blog/shopify-sales-dont-match-warehouse), so here is the lesson for the pipeline: if your numbers have to match Shopify's reports, plan for GraphQL from day one.

## Why do Data Factory's nvarchar(max) columns slow down Shopify reports?

When the copy activity creates the target table for you, every text column becomes `nvarchar(max)`. SQL Server can't use those as index keys, so every filter on vendor, product type or size scans the whole table.

Before adding indexes to the main product view, I checked every column it used. Almost half were `max` types and couldn't be indexed. The fix is to measure what each column actually holds and resize it with headroom. If a column's longest value today is 40 characters, `nvarchar(128)` is plenty and indexable:

```sql
SELECT MAX(LEN(product_type)) AS max_len,
       AVG(CAST(LEN(product_type) AS float)) AS avg_len
FROM shopify_products;
```

Product tags needed more than a resize. A product can carry 40 tags, the longest tags value ran past 750 characters, and the two systems store tags differently: Shopify as one comma-separated string, Apparel Magic as JSON. So tags moved into their own table, one row per tag, indexed both ways:

```sql
CREATE TABLE product_tags (
  id         bigint IDENTITY PRIMARY KEY,
  source     nvarchar(20)  NOT NULL,   -- 'Shopify' or 'ApparelMagic'
  product_id bigint        NOT NULL,
  tag_name   nvarchar(100) NOT NULL,
  CONSTRAINT uq_product_tag UNIQUE (source, product_id, tag_name)
);
CREATE INDEX ix_tags_by_tag     ON product_tags (tag_name, source) INCLUDE (product_id);
CREATE INDEX ix_tags_by_product ON product_tags (source, product_id) INCLUDE (tag_name);

-- Shopify: comma-separated string
INSERT INTO product_tags (source, product_id, tag_name)
SELECT DISTINCT 'Shopify', p.id, LTRIM(RTRIM(value))
FROM shopify_products p CROSS APPLY STRING_SPLIT(p.tags, ',')
WHERE LTRIM(RTRIM(value)) <> '';

-- Apparel Magic: JSON array of {"text": ...}
INSERT INTO product_tags (source, product_id, tag_name)
SELECT DISTINCT 'ApparelMagic', a.product_id, JSON_VALUE(j.value, '$.text')
FROM am_products a CROSS APPLY OPENJSON(a.tags) j
WHERE ISJSON(a.tags) = 1 AND JSON_VALUE(j.value, '$.text') <> '';
```

## Splitting a four-hour load procedure

One stored procedure built the main reporting table. It loaded products, sales, refunds, tags, vendors and pricing in one go. It started at 30 minutes. Then it took 40 minutes, then an hour. After one more requested change added a table or two, it took four hours.

The fix was to stop doing everything at once. One base table holds the core product and sales rows, and six or seven smaller procedures each fill in one or two things: first the Apparel Magic and Shopify base rows, then gift cards and locations, then stock and the remaining details. Each step writes a log row when it finishes:

```sql
INSERT INTO proc_step_log (procedure_name, step_name, message, execution_time_ms, rows_affected, created_at)
VALUES ('refresh_product_info', 'STEP_2_SHOPIFY_BASE', 'Shopify base rows inserted',
        DATEDIFF(MILLISECOND, @step_start, GETUTCDATE()), @rows, GETUTCDATE());
```

The whole load now runs in about 30 minutes. When it does slow down, the log shows which step to look at.

> **Note:** You can't step through a stored procedure while Data Factory runs it. A log table is the only way to see how far a two-hour run got before it failed.

## Cutting Azure Monitor from $1,000 to $0.10 a month

The factory had a pile of alert rules watching overlapping pipeline metrics. Azure Monitor bills metric alerts per time series monitored, after a small free allowance, so duplicate rules add up. The estimated bill was about $1,000 a month. I replaced them with one alert: `ActivityFailedRuns > 0`. The estimate dropped to $0.10 a month, about $12,000 a year, and the team still hears about every failure. Before adding an alert, ask what you would do differently when it fires. If the answer is "nothing", don't add it.

## When is a paid Shopify to Azure SQL connector enough?

Most results for this search are connector landing pages, and for many stores a connector is the right answer. Check three things before you build:

| Question | Connector is fine if… | Build it if… |
|---|---|---|
| Which data? | Orders, customers and products are enough | You need incoming stock, order-change history or other GraphQL-only fields |
| Which systems? | Shopify is the only source | You must join Shopify to a warehouse or ERP system and stop double counting |
| Must it match Shopify's reports? | Close is good enough | Finance reconciles to the cent, gift cards and refunds included |

This brand needed the right-hand column on all three, so a custom Data Factory pipeline paid for itself. If you're in the left-hand column, buy the connector. Then compare one month of its numbers against Shopify's own sales report before you trust it.

## Work with me

I build Shopify, ERP and warehouse pipelines on Azure that finance can reconcile against the source system. See my [data engineering service](/services/data-engineering) and the [full case study for this children's clothing brand](/work/pink-chicken-retail-data). If your Shopify numbers and your warehouse numbers don't match, send me what you have and we'll find out why.
