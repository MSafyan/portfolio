---
title: "Shopify Inventory API: Reading Incoming Stock at Every Location"
seo_title: "Shopify Inventory API: Read Incoming Stock with GraphQL"
seo_description: "In the Shopify inventory API, REST levels return only available. Incoming, committed and on_hand need GraphQL quantities(names:) on each InventoryLevel."
slug: shopify-inventory-api-incoming
target_query: shopify inventory api
service: data-engineering
case_study: pink-chicken-retail-data
status: published
published: 2026-11-21
updated: null
---

> **Short answer**
> - Shopify inventory comes in three objects: an **InventoryItem** for each variant, a **Location** for each shop or warehouse, and an **InventoryLevel** joining the two. The level holds the quantities.
> - The REST `inventory_levels` endpoint returns one number per item and location: `available`. Shopify has called REST Admin legacy since **1 October 2024**.
> - Incoming, committed, on_hand and the other named quantities are only in GraphQL, through `quantities(names: [...])` on each InventoryLevel.
> - For a brand with **16** locations, we read every level location by location, **250** items a page. Each page cost **425** query points, and up to **15** locations ran in parallel.

The Shopify inventory API is a set of objects in the Admin API: each product variant has an
**InventoryItem**, each shop or warehouse is a **Location**, and an **InventoryLevel** joins one item to
one location and holds its stock. If you read stock through the REST endpoint, you get one number back,
`available`. The "Incoming" and "Committed" columns a merchant sees in the admin aren't there, and no
REST parameter adds them. They are named quantities that only the GraphQL Admin API returns. This post
covers how the objects fit together, how to read and update stock, and how we read incoming stock for
every location of a US children's clothing brand and loaded it into SQL.

## How does the Shopify inventory API model stock?

Shopify's inventory guide describes four objects:

| Object | What it holds |
|---|---|
| `ProductVariant` | Price, title, images. Has exactly one InventoryItem |
| `InventoryItem` | The physical product: SKU, whether it's tracked |
| `Location` | A shop, warehouse or other place that stocks items |
| `InventoryLevel` | One item at one location, with its `quantities` by state |

The quantities are named states. Shopify's guide lists these:

| Name | Meaning | How it changes |
|---|---|---|
| `available` | Sellable at the location | Set, adjust or move |
| `committed` | On orders not yet fulfilled | Shopify manages it through orders; you can't set it |
| `on_hand` | Physically at the location | Set only |
| `incoming` | On its way to the location | Adjust or move |
| `reserved` | Held back from sale | Adjust or move |
| `damaged` | Can't be sold | Adjust or move |
| `safety_stock` | Buffer kept for demand swings | Adjust or move |
| `quality_control` | Being inspected | Adjust or move |

`on_hand` is the sum of `available`, `committed`, `reserved`, `damaged`, `safety_stock` and
`quality_control`. `incoming` is the one state that isn't in that sum, because the stock isn't at the
location yet.

## Shopify inventory API: REST or GraphQL?

The REST Admin API still answers, but Shopify's own REST pages open with this notice: it is "a legacy
API as of October 1, 2024", and since 1 April 2025 new public apps must use GraphQL only. Custom and
existing apps can still call REST, which is what a lot of older integrations and data pipelines do.

The bigger problem for reporting is what REST returns. This is a real `inventory_levels` row from the
brand's store, with the IDs changed:

```json
{
  "inventory_item_id": 40011122233,
  "location_id": 60044455566,
  "available": 12,
  "updated_at": "2025-07-30T09:14:02-04:00",
  "admin_graphql_api_id": "gid://shopify/InventoryLevel/90077788899?inventory_item_id=40011122233"
}
```

That's every field. The REST InventoryLevel has `available`, the two IDs and `updated_at`, and its
`set.json` and `adjust.json` endpoints only change `available`. A developer asked on the Shopify
community forum in January 2025 whether there was "any way of querying the other quantities in REST",
and nobody answered, because there isn't one.

> **Note:** The REST `GET /inventory_levels.json` call takes up to 50 `inventory_item_ids` or
> `location_ids` and up to 250 rows a page. Fine for a nightly `available` sync, but you'll never see
> incoming stock through it.

## How to get incoming inventory from the Shopify API

In GraphQL, an InventoryLevel has a `quantities` field with a required `names` argument. You pass the
states you want and get one `{ name, quantity }` pair back for each. The answer usually posted on the
forum reads one level by its ID:

```graphql
query {
  inventoryLevel(id: "gid://shopify/InventoryLevel/90077788899?inventory_item_id=40011122233") {
    quantities(names: ["incoming"]) { name quantity }
  }
}
```

That's fine for one item. A report needs every item at every location, so you start from the location
and page through its levels. In July 2025 I wrote a short Python script to try this against the brand's
store, and the production pipeline ran the same query:

```graphql
query getInventoryLevels($locationId: ID!, $first: Int!, $after: String) {
  location(id: $locationId) {
    id
    name
    inventoryLevels(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          quantities(names: ["available", "incoming", "committed"]) { name quantity }
          item { id sku tracked }
        }
      }
    }
  }
}
```

One node in the response looks like this (IDs and SKU changed):

```json
{
  "id": "gid://shopify/InventoryLevel/90077788899?inventory_item_id=40011122233",
  "quantities": [
    { "name": "available", "quantity": 12 },
    { "name": "incoming", "quantity": 0 },
    { "name": "committed", "quantity": 3 }
  ],
  "item": { "id": "gid://shopify/InventoryItem/40011122233", "sku": "KD-DRS-0412-6", "tracked": true }
}
```

Set `first` to 250 and loop: keep calling with `after` set to the last `endCursor` until `hasNextPage`
is false, then move on to the next location. Get the list of location IDs first with a
`locations` query.

> **Tip:** The level ID carries the item ID as a query string (`?inventory_item_id=...`). If you store
> the level ID as a key, strip everything from the `?` on. Our data flow did exactly that.

## What does a bulk inventory read cost in query points?

GraphQL limits are by cost, not by request count. Every response carries an `extensions.cost` block,
and that block is how we knew our page size was safe. One page of 250 levels with three quantities each
came back as:

```json
"cost": {
  "requestedQueryCost": 425,
  "actualQueryCost": 425,
  "throttleStatus": { "maximumAvailable": 20000, "restoreRate": 1000 }
}
```

Two limits matter here. Shopify caps any single query at **1,000** points on every plan, so a 250-item
page at 425 points has room for a few more fields but not for doubling everything. And points come
back at a rate set by the plan: 100 a second on Standard, 200 on Advanced, 1,000 on Plus and 2,000 on
Enterprise. This store's bucket restored at 1,000 a second, so a 425-point page was back in under half a
second. On a Standard plan the same page takes more than four seconds to restore, so sequential
paging is the safe default there.

The brand had **16** Shopify locations. We ran up to **15** of them in parallel, each one paging on its
own. At 1,000 points a second that holds up; on a smaller plan, run fewer at once and read
`currentlyAvailable` before each call.

> **Warning:** Pin the API version in the URL, then check the response header. Our pipeline asked for
> `2024-01`, but saved responses came back with `x-shopify-api-version: 2024-04` and a version-warning
> header. Shopify had answered with a newer version than the one we asked for, and nothing failed.

## How to load Shopify inventory levels into SQL

The brand's reports ran on Azure SQL, loaded by Azure Data Factory. We built the read as a child
pipeline per location: an `Until` loop that posts the query, saves the raw response to Blob storage,
reads `hasNextPage` and `endCursor` from it, and repeats. The first page needs a query without
`$after`, so the pipeline switches between two query strings. Each call retries twice, 30 seconds
apart.

A data flow then turns the saved pages into rows. GraphQL gives you one row per item, location and
quantity name; a report wants one row per item and location with a column per quantity. So the data
flow unrolls the edges, unrolls the quantities, strips the `gid://` prefixes from the IDs, and pivots
on the quantity name:

```text
pivot(groupBy(inventory_item_id, sku, inventory_level_id, location_id, updated_at),
      pivotBy(quantity_type, ['available', 'incoming', 'committed']),
      {} = first(quantity_value))
```

If you're not on Data Factory, the same step in T-SQL is a conditional sum over a staging table with
one row per quantity:

```sql
SELECT inventory_item_id,
       location_id,
       SUM(CASE WHEN quantity_name = 'available' THEN quantity END) AS available,
       SUM(CASE WHEN quantity_name = 'incoming'  THEN quantity END) AS incoming,
       SUM(CASE WHEN quantity_name = 'committed' THEN quantity END) AS committed
FROM   stage_inventory_quantities
GROUP  BY inventory_item_id, location_id;
```

The inventory table is truncated and reloaded from GraphQL on every run. GraphQL **replaced** the REST
levels for this table; it wasn't merged with them. Two sources for one number is how stock ends up
counted twice. In August 2025 we joined `incoming` into the current-stock view the reports read.

> **Warning:** Our data flow read `quantity` as `short`, a 16-bit integer that tops out at 32,767.
> We never saw it overflow, but a warehouse location holding a lot of one SKU could pass that. Use a
> 32-bit integer.

## Why is incoming inventory zero in the Shopify API?

The sample page we saved showed `incoming: 0` on the items we checked, and that's common. Incoming
isn't filled by everything a merchant thinks of as "on order". A thread on the Shopify community
forum from July 2026 reports that the new purchase order feature doesn't populate incoming; what
populates it is transfers and shipments marked in transit. The Admin GraphQL API has
`InventoryTransfer` and `InventoryShipment` objects but no `PurchaseOrder` object, so supplier orders
and their dates aren't readable through it.

If incoming is zero, check how the merchant records stock on its way before you debug the query. If
they use purchase orders, that stock won't show as incoming in the API.

## How to update inventory with the Shopify inventory API

Writes go through three GraphQL mutations, and the rules tightened in 2026:

- `inventorySetQuantities` sets `available` or `on_hand` to an absolute number.
- `inventoryAdjustQuantities` changes a state by a delta, which is safer when more than one system
  writes stock.
- `inventoryMoveQuantities` moves units between states, for example from `incoming` to `available`
  when a delivery is received.

From API version 2026-04, each quantity must include `changeFromQuantity`, the number you believe is
there now. If the stored value differs, the mutation fails with `CHANGE_FROM_QUANTITY_STALE` instead of
overwriting someone else's change. The same version made the `@idempotent` directive required. Every
change also needs a `reason`. As of November 2026 the latest version is 2026-10, and Shopify's example
looks like this:

```graphql
mutation inventorySetQuantities($input: InventorySetQuantitiesInput!, $idempotencyKey: String!) {
  inventorySetQuantities(input: $input) @idempotent(key: $idempotencyKey) {
    inventoryAdjustmentGroup { reason changes { name delta quantityAfterChange } }
    userErrors { code field message }
  }
}
```

```json
{
  "input": {
    "name": "available",
    "reason": "correction",
    "referenceDocumentUri": "logistics://some.warehouse/take/2026-02-23T13:14:15Z",
    "quantities": [{
      "inventoryItemId": "gid://shopify/InventoryItem/30322695",
      "locationId": "gid://shopify/Location/124656943",
      "quantity": 42,
      "changeFromQuantity": 1
    }]
  },
  "idempotencyKey": "550e8400-e29b-41d4-a716-446655440000"
}
```

Reading needs the `read_inventory` scope and writing needs `write_inventory`. `committed` can't be
written at all: Shopify moves it as orders are created and fulfilled.

## Need Shopify stock in your warehouse?

Reading stock is the easy part; making it agree with the rest of the business is the work. My
[data engineering service](/services/data-engineering) builds pipelines like this one, from Shopify and
other systems into a SQL warehouse your reports can trust. The whole project, including the warehouse
system on the other side, is in the [retail data case study](/work/pink-chicken-retail-data). The same
store's sales figures had their own REST blind spot, covered in
[why Shopify sales don't match your warehouse](/blog/shopify-sales-dont-match-warehouse).

If your stock numbers don't line up across Shopify and your other systems, [get in touch](/contact)
and tell me what you're seeing.
