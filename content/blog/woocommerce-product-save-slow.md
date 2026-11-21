---
title: "WooCommerce Product Save Took 34s: The Fix"
seo_title: "WooCommerce Product Update Takes 30+ Seconds? The Fix"
seo_description: "If every WooCommerce product update takes 30+ seconds, time an empty save. Ours was WP Rocket's purge on save: 34 s per product, 1.87 s with it switched off."
slug: woocommerce-product-save-slow
target_query: woocommerce product update takes 30 seconds
service: technical-seo
case_study: brickdistrict-seo-ecommerce
status: published
published: 2026-11-17
---

> **Short answer**
> - On a LEGO resale store, every WooCommerce product save took about 34 seconds, and an update that changed **nothing** took just as long.
> - The cause was WP Rocket clearing its cache on every save. It was not WooCommerce, the data being sent, the network or our code.
> - With WP Rocket deactivated, the same save took **1.87 s**. A pass over the whole catalogue went from about two hours to about 11 minutes.
> - Turning off WP Rocket's preload changed nothing. Time an empty update first, then switch plugins off one at a time and time it again.

If clicking **Update** on a WooCommerce product leaves you waiting half a minute, the usual advice is
to upgrade WooCommerce, cut down your categories or buy a bigger server. On the store in this post, none
of that was the problem. The cause was a caching plugin that clears its cache every time a product is
saved. This is how we measured it, the two wrong guesses we made first, and how to check your own store
in about ten minutes.

## Why does a WooCommerce product update take 30 seconds?

The store sells rare and retired LEGO sets. It has about 250 products, and a back end I built
updates prices, stock and tags through the WooCommerce REST API. In August 2026 one routine job was
updating the price tags on retired sets. A pass over the catalogue took **two hours**, which is far too
long for a store that size. Each product update was taking about half a minute.

WordPress runs a chain of hooks each time a post is saved, and a WooCommerce product is a post. The best
known is `save_post`; another is `clean_post_cache`, which fires whenever a post's cache is cleared, even
on an update that changes nothing. Any plugin can attach work to these hooks, and the save does not finish
until all of that work is done. A slow save almost always means one plugin is doing heavy work there.

## How to measure a slow WooCommerce product save

Opinions about what makes WordPress slow are cheap. A timed request settles it. We timed four things
against one product on 30 August 2026:

| Probe | Time |
|---|---|
| `GET` one product (read only) | about 1 s |
| `PUT {}`: an update with **no fields at all** | about 34 s |
| `PUT` changing only `menu_order` (not a category or tag) | about 35 s |
| The same probe with WP Rocket deactivated | **1.87 s** |

The empty update is the important one. It sends nothing to change, so if it still takes 34 seconds, the
size of the data, the number of categories and tags, and your own code are all ruled out at once. Only the
work that WordPress and its plugins do on every save is left.

The timing breakdown pointed the same way. Connecting and the TLS handshake took well under a tenth of a
second. Almost the whole 34 seconds was spent waiting for the server's first byte. The server was busy
saving, not slow to reach.

You can run the same test with `curl`. Use a test product, and a WooCommerce REST API key with write
access:

```bash
# Time an update that changes nothing. 123 is a test product's ID.
curl -s -o /dev/null -X PUT \
  -u "$WC_KEY:$WC_SECRET" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -w 'connect %{time_connect}s  tls %{time_appconnect}s  first byte %{time_starttransfer}s  total %{time_total}s\n' \
  https://example.com/wp-json/wc/v3/products/123
```

> **Tip:** Run it three times and note each result. A single slow request might be a cold cache, but
> three in a row that each take 30 seconds or more are the save itself.

## What did not fix the slow product save

We made two wrong guesses before the right one. Both were ruled out by timing the save again, not by
argument.

**Guess 1: the unused plugins.** The store had three plugins that did nothing useful. One was a search
plugin that showed no search box at all. The other two were an events calendar pair that loaded about 20 files
on every page to show one empty block. They were right to remove, but they were not the cost: after
removing them the empty save took about 36 s, against about 34 s before.

**Guess 2: WP Rocket's preload.** There is a well-documented WooCommerce problem where WP Rocket's preload
clears a product's pages and then crawls them again after each change. That made preload the obvious
suspect, and I recommended turning it off with some confidence. With preload off, the empty save took
between 33 and 38 seconds. Nothing changed.

It was the store owner who said to just deactivate WP Rocket and measure. That was the test that worked:
**1.87 s**.

> **Note:** "WP Rocket" is not a synonym for "slow". Its own documentation says it clears the cache when you
> edit products and categories, and that bulk imports slow down for that reason. The cost depends on the
> store, the host and how many other caches sit in front of it. Measure yours before you remove anything.

## WP Rocket and the WooCommerce save_post hook: what was going on

The slow part was the cache clearing WP Rocket does after a product is updated. It hooks
`clean_post_cache`, not `save_post`: an empty WooCommerce update never fires `save_post`, but it does
clear the product's cache, and that is enough to start the purge. The work runs inside the request, so the
save cannot finish until the clearing is done. On this host, WP Rocket's integration also flushed the whole
object cache for every URL it purged, and one save purges about ten (the product, its categories, the home
page and neighbouring products). We did not profile inside the plugin, so that is the likely cost, not a
measured one. Preload is a separate feature on top of it,
which is why turning preload off did not help. WP Rocket has no setting that switches off clearing on
save, so on this store **deactivating the plugin was the only fix we found**.

WP Rocket's knowledge base does describe a helper plugin that turns off automatic cache clearing, written
for slow imports, and WP Rocket checks a filter, `rocket_is_importing`, that does the same for a script:
`add_filter('rocket_is_importing', '__return_true');`. We did not test either, because the next question
made it unnecessary.

## Was the caching plugin worth 34 seconds a save?

It made sense to check what WP Rocket was giving the store before deciding to remove it. The answer was
very little.

- **Page speed was the same with or without it.** Pages loaded fresh from the server, skipping every
  cache, took roughly 3–4 s with WP Rocket on and roughly 2.5–4.5 s with it off. The difference was smaller
  than the variation between runs.
- **Its main feature was doing nothing.** It produced no minified or combined CSS or JavaScript files. On a
  Beaver Builder site loading nearly 30 stylesheets, that was the one thing that might have justified it.
- **Visitors were served by a different cache.** The store's host, GoDaddy Managed WordPress, runs its own
  server cache (Varnish) and a CDN in front of the site, which kept pages for 31 days
  (`cache-control: public, max-age=2678400`). WP Rocket was a third cache layer behind both, and it could
  not clear the CDN cache that visitors actually saw.

So every save cost about 34 seconds, in return for about one second on page loads that visitors rarely hit.

> **Warning:** Some managed hosts allow only certain caching plugins, or none, because they cache at the
> server. GoDaddy generally does not allow caching plugins and names WP Rocket as the exception, because it
> clears GoDaddy's server cache when it clears its own. Know why a caching plugin was installed before you
> remove it, and check your host's rules before you install a replacement.

## How to fix a slow WooCommerce product save on your store

1. **Time an empty update** with the `curl` probe above, on a test product. If it takes 30 seconds or
   more, the cost is in the save hooks, not your data.
2. **Time a read** (`GET`) of the same product. If reads are fast and writes are slow, it is the save
   path, not the server.
3. **Deactivate your caching plugin first** and time the empty update again. Do this at a quiet hour, and
   purge your CDN afterwards if you have one.
4. **If that is not it, deactivate the other plugins one at a time**, timing the save after each one.
   Begin with anything that hooks into saves: search indexes, sync and backup plugins, SEO plugins.
5. **Decide with numbers.** Compare page speed with and without the plugin, measured past every cache.
   If the plugin gives back less than it costs, remove it. If you need what it does, look for a tool that
   does that one job without the cost on save.

We deactivated WP Rocket on the day we measured it, and no code changed. Four plugins came off the store
that day: WP Rocket and the three unused ones.

## What the fix changed for the store

- **A catalogue pass went from about two hours to about 11 minutes.** Jobs that touch every product,
  such as updating tags or adding barcodes, became something to run whenever needed, not something to
  schedule.
- **Re-pricing about 120 retired sets by hand went from over an hour of waiting on saves to under four
  minutes.** That changed whether the work got done at all.
- **Long jobs still run on the server, not on a laptop.** That rule stayed, for a different reason: a
  laptop sleeps and loses wifi, and an 11-minute job dies just as surely as a two-hour one when the lid
  closes.

> **Tip:** Write a timing into your notes with the date and how it was measured. In September 2026 the old
> "about 34 s" turned up again in a summary and made a barcode job look like a three-hour task. The store
> owner caught it: it was an 11-minute task. A number without a date and a method goes stale without anyone noticing.

## Need a slow WooCommerce store looked at?

A slow save is a technical SEO problem as much as a speed one: it decides how often a store owner can
afford to fix titles, prices and descriptions. My [technical SEO service](/services/technical-seo) starts
with measurements like the ones above, then fixes what they show. The full story of this store,
including a theme rebuild that took mobile Lighthouse from 60 to 98, is in the
[LEGO store case study](/work/brickdistrict-seo-ecommerce).

If your WooCommerce store is slow to save, slow to load or not getting found, [get in touch](/contact) and
tell me what you are seeing.
