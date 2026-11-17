---
title: "ApparelMagic API to SQL: Paging, Limits, Pitfalls"
seo_title: "ApparelMagic API to SQL and Power BI: Paging and Limits"
seo_description: "Loading ApparelMagic into SQL for Power BI? Page with last_id (up to 1,000 rows), stay under 4 requests a second, sign each call with time+token, and cast text."
slug: apparelmagic-api-to-sql
target_query: "apparelmagic api data warehouse power bi"
service: data-engineering
case_study: pink-chicken-retail-data
status: published
published: 2026-11-17
---

> **Short answer**
> - Every request needs a `time` (Unix seconds) and your API `token`. If the time is too far from ApparelMagic's clock, you get a 401.
> - Page with `pagination[page_size]` (up to 1,000) and `pagination[last_id]`. When `meta.pagination.last_id` comes back null, you have reached the last page.
> - The limit is a bucket of 80 requests that empties at 4 a second. Go over it and you get HTTP 429. One request a second keeps you well under it.
> - Most values arrive as text and dates come in more than one format. Cast them when you load. Then check the sales rules (freight, own-brand invoices, closed date) before anyone builds a Power BI report.

**In this post:** [authentication](#how-do-you-authenticate-to-the-apparelmagic-api) · [paging](#how-does-apparelmagic-api-pagination-work) · [rate limits](#what-are-the-apparelmagic-api-rate-limits) · [incremental loads](#how-to-load-only-changed-apparelmagic-records) · [data types](#apparelmagic-data-types-and-dates-in-sql) · [sales rules](#apparelmagic-sales-rules-to-settle-before-power-bi)

ApparelMagic is the order, invoice and warehouse system many clothing brands run on. If you want its data in Power BI next to your Shopify sales, you need it in a SQL database first. You can buy a connector, but connector pages don't tell you how the API behaves. This post does.

It comes from building that pipeline for a US children's clothing brand. ApparelMagic held its warehouse stock and wholesale invoices. Shopify ran 10+ shops and the online store. Everything was loaded into Azure SQL with Azure Data Factory (ADF), every day, for Power BI.

## How do you authenticate to the ApparelMagic API?

The base URL is your account's subdomain:

```
https://<subdomain>.app.apparelmagic.com/api/json/<endpoint>/
```

There are no login calls and no headers. You send two values with every request:

- `time`: the current time in Unix seconds,
- `token`: an API token from your ApparelMagic settings.

ApparelMagic's own error list says a **401** can mean "your request was too old (your timestamp was too far from the timestamp generated on the server)". It can also mean the token is wrong or doesn't match the subdomain. So compute `time` fresh for each request. Don't compute it once at the start of a long job.

ADF has no "Unix time now" function. This expression gives it:

```
@string(sub(div(ticks(utcNow()), 10000000), 62135596800))
```

`ticks` counts 100-nanosecond steps since the year 1. Dividing by 10,000,000 turns that into seconds. Subtracting 62,135,596,800 moves the start to 1 January 1970.

> **Warning:** ADF saves dataset parameters, default values included, in the JSON that goes into Git. Don't put the token there. Keep it in Azure Key Vault and read it when the pipeline runs.

Two more errors from ApparelMagic's list are worth knowing. A **302** usually means the URL is missing its trailing slash. A completely **empty response** usually means a parameter array was badly formed.

## How does ApparelMagic API pagination work?

Since 13 February 2023, ApparelMagic says every request "MUST include pagination information". The old style, with `page_number` and a `total_pages` count, is gone. Now it works like this:

1. Send `pagination[page_size]`. The default is 100 and the most is 1,000.
2. Read `meta.pagination.last_id` from the response.
3. Send it back as `pagination[last_id]` for the next page. ApparelMagic says it must be a string.
4. When `last_id` is null, there are no more pages.

```
GET /api/json/invoices/?time=1764000000&token=...
    &pagination[page_size]=1000
    &pagination[last_id]=48210
```

In ADF this is an **Until** loop. Each pass copies one page from the API into blob storage as JSON. A **Lookup** then reads `meta.pagination` from that file. An **If** decides whether to stop, and a **Wait** pauses before the next page. The stop test has to handle two cases: `last_id` missing altogether, and `last_id` present but null.

```
@or(
  not(contains(string(activity('Read page').output.value[0].meta.pagination), 'last_id')),
  equals(string(activity('Read page').output.value[0].meta.pagination.last_id), 'null')
)
```

> **Tip:** Use 1,000 rows per page for big tables. The largest table we loaded, stock per SKU per warehouse, had over 200,000 rows. That is about 230 requests at 1,000 a page, but over 2,000 at the default 100.

> **Note:** Some responses still carried the old `total_records` and `total_pages` fields. Don't build on them. ApparelMagic says they were removed from `meta.pagination`, so they may disappear without warning.

## What are the ApparelMagic API rate limits?

ApparelMagic uses a "leaky bucket":

- **Bucket size: 80 requests.** You can send a burst of up to 80.
- **Leak rate: 4 a second.** The bucket empties at four requests a second.
- Go over and you get **HTTP 429 Too Many Requests**. ApparelMagic says the check is pass or fail: the request is not queued, it is refused.
- A POST counts as one request per 100 records, rounded up. A POST of 210 records counts as 3.

Our pipelines waited one second between pages. That is a quarter of the allowed rate, which leaves room for other apps using the same account. If you need more speed, run a few tables in parallel and keep the total under four a second. Add retry with a growing delay for 429s, which is what ApparelMagic recommends.

## How to load only changed ApparelMagic records

Loading everything every night gets slow. To load only what changed, filter on `last_modified_time`:

```
&parameters[0][field]=last_modified_time
&parameters[0][operator]=>=
&parameters[0][value]=2025-06-01T00:00:00Z
```

The operators are `=`, `!=`, `>`, `<`, `<=` and `>=`. You can combine several filters with `include_type` (`AND` or `OR`).

We kept the last load time for each table in a small control table (`data_load_control`). Each pipeline read it before calling the API and updated it after a good load.

Two things make a time filter alone risky:

- ApparelMagic warns that "it may take a few moments for newly created or updated records to appear in API responses". If your next filter starts exactly where the last one stopped, a record saved in those moments can be missed. Start each load a little earlier than the last one ended. Loading a row twice is harmless if you upsert on its ID.
- A deleted record never shows up in a "changed since" filter.

So on top of the daily loads, we ran a **weekly full sync** of invoices, orders and products every Saturday, as a safety net.

## ApparelMagic data types and dates in SQL

Most values come back as JSON strings, numbers and yes/no flags included. A flag like `is_inventory_tracked` arrives as the text `"1"`. Copy that straight into SQL and you get text columns. Sums are wrong or fail, and joins on IDs are slow. Our first mapping files were corrected to proper whole-number, decimal and true/false types early on.

Dates need care too:

- Documents carry `date` as `08/04/2017` (month first) **and** `date_internal` as `2017-08-04`. Load `date_internal`. Month-first text breaks as soon as a server reads it day-first.
- `last_modified_time` came in two formats depending on the endpoint: `2017-08-04T17:30:31Z` on some, `2024-05-08 18:13:15` on others. Parse both.

Documents also contain lists inside each record. An invoice holds its line items and its sales commissions. A customer holds contacts, salespeople and ship-to locations. Flatten each list into its own child table, keyed on the parent ID, rather than storing JSON in one text column.

> **Tip:** ADF creates text columns as `nvarchar(max)`, and SQL Server can't index those. Resize each column to fit the longest value it really holds, then index it.

## ApparelMagic sales rules to settle before Power BI

Getting the data in is half the job. These rules decided whether the reports were right:

- **Freight is not sales.** An invoice `amount` includes freight. Gross sales is `amount - amount_freight`.
- **Leave out invoices to yourself.** Wholesale reports excluded invoices billed to the brand's own customer account, which are internal transfers. They were also limited to the wholesale division by `division_id`.
- **Date orders by `closed_at`, not `updated_at`.** Any later edit moves `updated_at`, so an old order jumps into this month's sales.
- **Choose which warehouses count as stock.** Stock comes from the SKU-per-warehouse data (`qty_avail_alloc`). We counted the main warehouse, the e-commerce warehouse and one marketplace warehouse, and left the virtual one out. If the same online stock also appears in Shopify, decide which system owns it, or it gets counted twice.
- **Guard reference tables.** Stock views joined to the warehouse list. If that small table is ever missing its main row, all stock quietly disappears from the reports. A check before each refresh rebuilt it when the main row was missing.

```sql
-- Wholesale gross sales, freight excluded, internal invoices left out
SELECT
    CAST(i.date_internal AS date)                   AS invoice_date,
    SUM(CAST(i.amount AS decimal(18,2))
      - CAST(i.amount_freight AS decimal(18,2)))    AS gross_sales
FROM am_invoices i
WHERE i.division_id = @wholesale_division
  AND i.customer_id NOT IN (SELECT customer_id FROM own_brand_accounts)
GROUP BY CAST(i.date_internal AS date);
```

> **Note:** There are ready-made ApparelMagic connectors and an open-source Singer tap. They solve paging and limits. They don't decide your freight, division or warehouse rules, and those are what make Power BI match the finance team's numbers.

## Want ApparelMagic and Shopify in one warehouse?

This was one part of a [data engineering](/services/data-engineering) project. ApparelMagic and Shopify went into one Azure SQL warehouse, with daily loads, a daily stock snapshot for trends, and stock valued at cost, retail and wholesale prices. The full story is in the case study, [Retail numbers that finally match](/work/pink-chicken-retail-data).

If you run ApparelMagic and need its data in Power BI, [get in touch](/contact). Tell me which reports you need, and I'll tell you which endpoints and rules they depend on.
