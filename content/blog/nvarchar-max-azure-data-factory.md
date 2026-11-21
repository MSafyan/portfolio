---
title: "nvarchar(max) Can't Be an Index Key. Data Factory Used It Everywhere"
seo_title: "nvarchar(max): Limits, Indexing and the Data Factory Trap"
seo_description: "nvarchar(max) holds up to 2 GB of Unicode text but can't be an index key. When to use it, nvarchar vs varchar, and how Data Factory can quietly undo a resize."
slug: nvarchar-max-azure-data-factory
target_query: nvarchar max
service: data-engineering
case_study: pink-chicken-retail-data
status: published
published: 2026-11-21
updated: null
---

> **Short answer**
> - `nvarchar(max)` stores variable-length Unicode text up to **2 GB** per value. Use it only when a value might pass 4,000 byte-pairs, the most `nvarchar(n)` allows.
> - It **can't be an index key column**. SQL Server allows it only in an index's `INCLUDE` list. Bounded columns can be keys, up to **900 bytes** for a clustered index and **1,700 bytes** for a nonclustered one.
> - Azure Data Factory's auto-create table option made every text column `nvarchar(max)`. In one reporting view, **16 of 37** columns couldn't be indexed. The fix was to measure each column and resize it to about **2x** its longest value.
> - The resize only lasts if the pipeline stops rebuilding the table. **4 of our 13** auto-create pipelines dropped their table before every run, so a resize there would be gone by the next load.

`nvarchar(max)` is SQL Server's type for Unicode text of any length, up to 2 GB per value. That size comes at a price: it can't be the key column of an index, so a filter on an `nvarchar(max)` column scans the whole table. Most `nvarchar(max)` columns in real databases were never chosen by anyone. A tool created them. This post covers the type's limits, when it is the right choice, how it compares with `varchar`, and what happened when Azure Data Factory made every text column in a reporting database `nvarchar(max)`.

## What is nvarchar(max)?

`nvarchar` stores variable-length Unicode text. Microsoft's documentation defines it like this:

- **`nvarchar(n)`**: `n` is the size in **byte-pairs**, from 1 to 4,000. It is not a number of characters. Most characters take one byte-pair, but characters outside the basic Unicode range (many emoji, for example) take two, so fewer than `n` of those fit.
- **`nvarchar(max)`**: up to 2^31-1 bytes, which is 2 GB. SQL Server's capacity table puts that at 2^30-1 characters, about a billion.
- **Storage**: two bytes per byte-pair, plus 2 bytes of overhead. A 10-character value costs about the same in `nvarchar(50)` as in `nvarchar(max)`. The declared size is a limit, not space that gets reserved.

Microsoft's own guidance is short. Use `nvarchar` when values vary in length, and use **`nvarchar(max)` when they vary a lot and might exceed 4,000 byte-pairs**. Article bodies, JSON documents and long notes are good examples. A product type, a size or a warehouse name is not.

## nvarchar(max) limits: 2 GB, indexes and the row size

The 2 GB ceiling is rarely the problem. These are the limits that actually affect a database:

| Limit | Value | What it means |
|---|---|---|
| Size per value | 2 GB (2^31-1 bytes) | More than any text column needs |
| Index key column | **Not allowed** | `varchar(max)`, `nvarchar(max)`, `varbinary(max)`, `xml`, `text`, `ntext` and `image` can't be key columns |
| Index `INCLUDE` column | Allowed | It can be stored in a nonclustered index as a non-key column |
| Clustered index key | 900 bytes | That is `nvarchar(450)` if the key is one column |
| Nonclustered index key | 1,700 bytes | That is `nvarchar(850)` if the key is one column (SQL Server 2016 and later) |
| Row size | 8,060 bytes | Each non-null `max` column needs 24 extra bytes during sorts, which counts against this |

The index rule is the one people run into. If you try to build an index on an `nvarchar(max)` column, SQL Server stops with error 1919:

```text
Msg 1919: Column 'vendor' in table 'shopify_products' is of a type that is
invalid for use as a key column in an index.
```

> **Note:** A bounded column can be declared wider than the key limit. SQL Server warns when you create the index and then rejects any row whose key is actually over the limit. A `max` column is refused outright, however short its values are.

## nvarchar vs varchar: which should you use?

The difference is encoding, and that sets the size limits:

| | `varchar(n)` | `nvarchar(n)` |
|---|---|---|
| `n` counts | Bytes, 1 to 8,000 | Byte-pairs, 1 to 4,000 |
| Encoding | The collation's code page, or UTF-8 with a UTF-8 collation (SQL Server 2019+) | UTF-16 (UCS-2 without a supplementary-character collation) |
| Bytes for plain English text | About 1 per character | 2 per character |
| `max` version | `varchar(max)`, 2 GB | `nvarchar(max)`, 2 GB |

If a column might hold names, addresses or anything typed by customers in more than one language, `nvarchar` is the safe default. Microsoft also suggests a UTF-8 collation with `varchar` on SQL Server 2019 and later for multilingual data. `varchar` without UTF-8 is fine for codes, SKUs and other values you control. Whichever you choose, the `max` rules are the same: neither `max` type can be an index key.

## Why Azure Data Factory creates nvarchar(max) columns

Data Factory's copy activity has a sink setting, `tableOption: autoCreate`. If the target table doesn't exist, the copy creates it from the source schema. The source schema of an API or JSON file carries no string length, so there is nothing to size the column from. In our pipelines **every text column came out as `nvarchar(max)`**.

This was a pipeline I built for a US children's clothing brand. It loaded Shopify and Apparel Magic, its warehouse system, into Azure SQL every day for Power BI. Thirteen of its pipelines used auto-create. That was quick to set up, and fine until the reports needed indexes. As I said in a video walkthrough of the project: "it always uses nvarchar(max), which can't be indexed."

On 21 August 2025 I checked every column that the main product view's recommended indexes needed. There were 37 columns, and **16 of them were `max` types**, so they could not be keys. At that point the product table held about 18,000 rows and the variant table about 67,000. Filters on vendor, product type, size or color were reading all of them.

## How to change nvarchar(max) to nvarchar(n) safely

Don't guess the sizes. Measure what each column actually holds, then add headroom. This is the measurement query, run once per column:

```sql
SELECT 'shopify_products.vendor' AS column_name,
       MAX(LEN(vendor))                AS max_length,
       AVG(CAST(LEN(vendor) AS float)) AS avg_length,
       COUNT(*)                        AS total_rows
FROM shopify_products
WHERE vendor IS NOT NULL;
```

The rule in the resize script was **about 2x the longest value measured**, rounded up to a tidy number:

| Column | Longest value | New type |
|---|---|---|
| `shopify_products.product_type` | 21 | `nvarchar(50)` |
| `shopify_products.vendor` | 33 | `nvarchar(80)` |
| `shopify_variants.option1` | 148 | `nvarchar(300)` |
| `shopify_variants.option2` | 52 | `nvarchar(120)` |
| `am_products.style_number` | 78 | `nvarchar(160)` |
| `shopify_locations.name` | 39 | `nvarchar(80)` |
| `am_warehouses.name` | empty | `nvarchar(100)` |
| `shopify_products.tags` | 757 | kept as `nvarchar(max)` |

```sql
-- WARNING: ALTER COLUMN locks the table while it runs. Use a quiet window.
ALTER TABLE shopify_products  ALTER COLUMN vendor       NVARCHAR(80);
ALTER TABLE shopify_products  ALTER COLUMN product_type NVARCHAR(50);
ALTER TABLE shopify_variants  ALTER COLUMN option1      NVARCHAR(300);
ALTER TABLE shopify_variants  ALTER COLUMN option2      NVARCHAR(120);
ALTER TABLE shopify_locations ALTER COLUMN name         NVARCHAR(80);

-- Then the indexes, for example:
CREATE INDEX ix_products_vendor_type
    ON shopify_products (vendor, product_type);
```

> **Warning:** `LEN` counts characters and ignores trailing spaces. If a column might hold emoji or other characters that take two byte-pairs, measure with `DATALENGTH(col) / 2` instead. Also add `NOT NULL` to the `ALTER` if the column had it, because `ALTER COLUMN` without it makes the column nullable.

Some columns really are long. Shopify tags averaged about 100 characters, the longest ran to 757, and a product could carry up to 40 tags. Shrinking that column wouldn't have made it useful to search. Instead, tags moved into their own table, one row per tag, with normal indexes on the tag and on the product. Tag searches then use an index instead of reading every product's tag string.

If you need to look up a long value by exact match, there is a third option: a computed column. Microsoft allows a computed column derived from `nvarchar(max)` as an index key, as long as its own type can be a key:

```sql
ALTER TABLE shopify_products
  ADD tags_hash AS CAST(HASHBYTES('SHA2_256', tags) AS binary(32));
CREATE INDEX ix_products_tags_hash ON shopify_products (tags_hash);
```

That index answers "which rows have exactly this value". It can't help with `LIKE '%summer%'`.

## Why Data Factory undoes an nvarchar(max) resize

This part is missing from most write-ups on `nvarchar(max)`. Auto-create only creates the table **if it doesn't already exist**. On its own it leaves a resized table alone. But four of the 13 auto-create pipelines (locations, warehouses, currencies and salespeople) also had a pre-copy script that dropped the table before every run. Simplified, the sink looked like this:

```json
"sink": {
  "type": "AzureSqlSink",
  "preCopyScript": "@concat('DROP TABLE IF EXISTS ', pipeline().parameters.table_name, ';')",
  "tableOption": "autoCreate"
}
```

Each run drops the table, finds nothing there, and creates it again with every text column as `nvarchar(max)`. Any index on the table is dropped with it. Two of the columns in the resize list, the location name and the warehouse name, are in tables those pipelines load. Going by the pipeline definitions, their resize would last until the next scheduled load.

We saw the same pattern again at a US construction company. Its generic loader copied each PostgreSQL table into a staging table with auto-create. A merge procedure then compared the staging columns with the main table's, using `INFORMATION_SCHEMA.COLUMNS` and including `CHARACTER_MAXIMUM_LENGTH`. If anything differed, it dropped the main table and rebuilt it from the staging schema. Read the procedure that way and a hand resize of the main table is a schema difference, so the next load puts the old types back.

So resizing is only half the fix. The other half is taking ownership of the table away from the pipeline:

1. **Create the table yourself**, with the measured types, indexes and nullability, in a script kept in source control.
2. **Set `tableOption` to `none`** on the copy sink, so a missing table fails the run loudly instead of coming back as `nvarchar(max)`.
3. **Replace `DROP TABLE` with `TRUNCATE TABLE`** in the pre-copy script if the load really is a full refresh. The rows go and the column types stay.
4. **For staging-and-merge loaders, create the staging table with the right types too**, or make the schema compare ignore length differences you made on purpose.
5. **After the next scheduled run, check the types** with `SELECT name, max_length FROM sys.columns WHERE object_id = OBJECT_ID('shopify_locations');`. A `max_length` of `-1` means `max`.

> **Tip:** Search your factory's JSON for `"autoCreate"` and `DROP TABLE` before you resize anything. That tells you which tables will keep a resize and which will lose it overnight.

## When nvarchar(max) is the right type

- **Use it** for values that can really pass 4,000 byte-pairs: descriptions, notes, HTML, JSON payloads you store whole.
- **Use it in a landing or staging table** that is loaded and thrown away, where nothing filters or joins on the text.
- **Don't use it** for anything you filter, join, sort or group on: names, codes, types, statuses, sizes. Measure those and give them a real length.
- **Don't accept it by default** from a tool. Auto-created tables are a starting point, not a schema.

## Need a Data Factory pipeline that reports can rely on?

I build data pipelines on Azure, from the source APIs to the indexes Power BI reads. See my [data engineering service](/services/data-engineering), and the [case study for this children's clothing brand](/work/pink-chicken-retail-data) for the whole project. It also covers [why Shopify sales didn't match the warehouse](/blog/shopify-sales-dont-match-warehouse). If your reports have slowed down and the tables were built by Data Factory, [get in touch](/contact).
