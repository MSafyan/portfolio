---
title: "Conversions API vs Meta Pixel: Run Both, Then Gate the Server"
seo_title: "Conversions API vs Meta Pixel: Use Both, Mind the Bots"
seo_description: "Run the Meta Pixel and the Conversions API together, with one event_id so Meta keeps one copy. But server events count bots too: ours were 97% of AddToCart."
slug: conversions-api-vs-meta-pixel
target_query: conversions api vs meta pixel
service: full-stack-development
case_study: brickdistrict-seo-ecommerce
status: published
published: 2026-11-21
updated: null
---

> **Short answer**
> - The Meta Pixel sends events from the visitor's browser. The Conversions API sends them from your server. Meta recommends running both and giving each event the same `event_id` in both places, so it keeps only one copy.
> - The server sees what the browser misses, such as shoppers with ad blockers. It also sees what the browser never runs, such as bots.
> - On one WooCommerce store, roughly 350 of about 365 AddToCart events in Meta came from the server, against about 12 adds to cart in GA4. A bot was following plain `?add-to-cart=` links.
> - Sending server AddToCart only when the browser holds the pixel's `_fbp` cookie took the daily count from about 205 to 4 and 8.

You need both. The Meta Pixel is JavaScript that reports events from the visitor's browser. The
Conversions API (CAPI) reports the same events from your server, straight to Meta. Meta's own
documentation recommends running the two together, "a redundant setup", and removing the duplicates
with a shared event ID. Most comparisons stop there. What they leave out is that the server reports
every request that looks like a shopper, including the ones that aren't. This post covers what each
one does, how deduplication works, and what happened when I moved AddToCart to the server on a US
LEGO resale store and a bot became 97% of its add-to-cart events.

## Conversions API vs Meta Pixel: what is the difference?

| | Meta Pixel | Conversions API |
|---|---|---|
| Runs in | The visitor's browser | Your server |
| Sends | `fbq('track', ...)` calls to Meta | HTTPS requests to Meta's Graph API |
| Blocked by | Ad blockers, tracking protection, a script that never loads | Nothing on the visitor's side |
| Knows | What happens on the page: views, scrolls, clicks | What reaches your server: orders, form entries, cart requests |
| Sets | The `_fbp` cookie (Meta's browser id) | Nothing in the browser; it can read `_fbp` and `_fbc` and pass them on |
| Setup | Paste a script or install a plugin | An access token and code or a partner integration |

The pixel is the quick part. It sees what only a browser sees, and it sets `_fbp`, a first-party
id Meta uses to recognise the same browser again. If its script is blocked or never loads, the event
is gone.

The Conversions API is the reliable part. An order in your database is sent from your server, so no
browser extension can stop it, and Meta uses those events like pixel events, for reporting and
optimisation. But it knows only what reaches your server, and it can't tell a person from a script
requesting the same URL.

> **Note:** On a site served from a CDN cache, most page views never reach your server at all. On the
> store in this post, page and product views stay browser-only for that reason. The server sends the
> events that always run PHP: AddToCart, InitiateCheckout, Purchase and Lead.

## Do you need the Conversions API if you have the Meta Pixel?

For anything you optimise ads for, yes. Meta's documentation says: "For optimal ad performance, we
recommend that advertisers implement the Conversions API alongside their Meta Pixel." The pixel alone
loses the events that blocked browsers never send. The Conversions API alone loses the browser
signals and the `_fbp` id it would have carried. Together, Meta gets every real sale once, with
enough identifiers to match it to a person.

The store started on the pixel alone in October 2026 and added the Conversions API on
15 November 2026: Purchase and Lead first, then AddToCart and InitiateCheckout the same day.

> **Warning:** Events Manager would not issue a Conversions API token for this store at first. The
> "Generate access token" button said *"You must be an admin or developer for this business
> portfolio"*, even for the account's owner, because the ad account and pixel were not in a business
> portfolio. The fix was a portfolio, owned by the store owner, holding the ad account, the pixel and
> the Page.

## How Meta deduplicates pixel and Conversions API events

If the browser and the server both send the same AddToCart, Meta has to know they are one event.
The reliable way is a shared ID. Meta treats two events as the same when the pixel's `eventID`
matches the server's `event_id` and the event names match. It keeps the first one it receives, and
only deduplicates events that arrive within 48 hours of the first one with that ID.

So the ID has to exist before either copy is sent. On this store, the PHP that prints the browser
event makes the ID (`atc-` plus a UUID), writes it into the pixel call, and hands the same ID to the
server code:

```js
// Browser: printed into the page by the server, with the ID it generated.
fbq('track', 'AddToCart', { content_ids: ['10294'], value: 349.99, currency: 'USD' },
    { eventID: 'atc-3f1c9a52-7d4e-4b8a-9e21-6c0f5d8b2a17' });
```

```json
{
  "event_name": "AddToCart",
  "event_time": 1794787200,
  "event_id": "atc-3f1c9a52-7d4e-4b8a-9e21-6c0f5d8b2a17",
  "action_source": "website",
  "event_source_url": "https://example.com/",
  "user_data": {
    "client_ip_address": "203.0.113.7",
    "client_user_agent": "Mozilla/5.0 (iPhone; ...)",
    "fbp": "fb.1.1794780000000.1234567890"
  },
  "custom_data": { "content_ids": ["10294"], "value": 349.99, "currency": "USD" }
}
```

Purchase uses the order number (`order-<number>`) and Lead the form entry ID, written into the form's
confirmation for the browser script to read. Meta also describes a fallback that matches on `fbp` or
`external_id`, but it works mainly when the browser event arrives before the server one. A shared
`event_id` doesn't depend on order.

> **Tip:** Meta accepts a server event up to 7 days after it happened (`event_time`), so the server
> copy doesn't have to be sent during the request. The store queues it and sends it in the background,
> usually within a few minutes, so checkout never waits on Meta.

## What the Conversions API adds, and why AddToCart jumped in Meta

Within three days of switching on server AddToCart, Events Manager showed about 365 AddToCart events,
roughly 350 of them from the server. The daily count rose each day, about 25, 135 and 205 on
15, 16 and 17 November. Every one was recorded on the homepage URL. GA4 counted about 12 adds to cart
over the same period.

The first suspicion was click fraud on the ads. It didn't hold up: Meta reported about 175 link
clicks, and GA4 had about 200 sessions tagged as coming from the ads. The clicks were real visits.
That ruled out fake ad clicks, though it is a comparison of counts, not a forensic look at the traffic.

The cause was in the store's guides. Their product cards had plain WooCommerce add-to-cart links,
`/?add-to-cart=<product id>`. Anything that follows that URL with a GET request puts the product in a
cart, and WooCommerce runs its add-to-cart hooks. Those hooks were where the server AddToCart was
sent. A bot was crawling the guides and following those links.

The code already skipped crawlers by user agent (`bot`, `crawl`, `spider`, `headless` and so on). This
bot sent an ordinary browser user agent, so it passed. The browser pixel never ran for it, because it
never executed the page's JavaScript. That is why the browser copies were so few. But the PHP ran on
every request, and each fake add also sent a custom value event worth 15 points, which the store had
planned to optimise for.

That is what the Conversions API adds, in both directions: real shoppers the pixel loses, and
anything else that can request a URL. Nothing in Meta separates the two.

## How to stop bots sending server-side AddToCart events

The fix needed a signal that a real browser had run the page. The pixel provides one: when it runs, it
sets the `_fbp` cookie if there isn't one already. A bot that requests URLs without running JavaScript
never gets it. So server AddToCart and InitiateCheckout are now sent only when the request carries
`_fbp`:

```php
add_action( 'shop_meta_server_event', function ( $name, $params, $event_id, $url ) {
	$ua = isset( $_SERVER['HTTP_USER_AGENT'] )
		? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

	if ( '' === $ua
		|| preg_match( '/bot|crawl|spider|slurp|headless|lighthouse|preview/i', $ua )
		|| empty( $_COOKIE['_fbp'] ) ) {  // the pixel never ran in this browser
		return;
	}

	shop_meta_capi_queue( array(
		'event_name'       => $name,
		'event_time'       => time(),
		'event_id'         => $event_id,
		'action_source'    => 'website',
		'event_source_url' => (string) $url,
		'user_data'        => shop_meta_capi_user_data( $ua ),  // IP, user agent, fbp, fbc
		'custom_data'      => $params,
	) );
}, 10, 4 );
```

Purchase and Lead are unchanged: a paid order and a form entry that passed the spam check aren't
things a link-following bot produces.

There is a cost, and it should be stated. A shopper whose ad blocker stops the pixel has no `_fbp`
either, so their AddToCart is no longer sent from the server. But a server event with no `_fbp` and no
email gives Meta very little to match the person by, so the loss is small.

I tested it on a local copy of the store in a visible browser. An add-to-cart link without `_fbp`
still put the set in the cart and queued 0 events. With `_fbp`, it queued 2: AddToCart and the value
event, with the same ID and the `fbp` value carried over.

> **Warning:** Don't test this with `curl` against the live site. A bot-style request to the live
> `?add-to-cart=` URL got a 302 redirect and no cart cookie, so it proved nothing either way. A GET to
> that URL may not start a WooCommerce session at all. Test in a real browser, or judge from Events
> Manager.

## What changed after gating the Conversions API on `_fbp`

The fix went live on 18 November 2026 at about 09:00 UTC. No server AddToCart arrived in the first
hour after. Events Manager's daily AddToCart count went like this:

| Day (Nov 2026) | AddToCart in Events Manager |
|---|---|
| 15 | about 25 |
| 16 | about 135 |
| 17 | about 205 |
| 18 (fix live) | 4 |
| 19 | 8 |

What can't be fixed is the past. **Meta has no way to delete events it has already received.** The
fake carts from 15–17 November stay in the dataset. They did no damage because no campaign was
optimising for AddToCart or the value event yet; both sales campaigns were optimising for a
custom engaged-visit event. The plan is to wait at least 14 clean days before moving a campaign to
AddToCart or value. A move on about 2 December also keeps the learning reset away from Black Friday,
27 November.

## Conversions API vs Meta Pixel: the verdict

- **Run both**, with the same `event_id` in the pixel's `eventID` and the server's `event_id`. Neither
  is complete alone.
- **Send from the server the events your server can vouch for:** a paid order, a real form entry.
  Those are the ones the Conversions API is best at.
- **Gate the early funnel events.** AddToCart and InitiateCheckout fire from URLs anyone can request.
  Require `_fbp`, or another sign the page actually ran in a browser, before you send them.
- **Compare browser and server counts in Events Manager** for a few days after any change. If the
  server copy is many times the browser copy, something other than shoppers is sending.
- **Remove plain `?add-to-cart=` links** from content pages where you can, so the cart isn't one GET
  request away from any crawler.

## Need your Meta tracking checked?

Server-side tracking is a back-end job: it lives in the same code as checkout, the queue and the
database. My [full-stack development service](/services/full-stack-development) covers that kind of
work, including integrations like this one. This store's wider story is in the
[LEGO store case study](/work/brickdistrict-seo-ecommerce), and one of its other fixes has its own post:
[why a WooCommerce product save took 34 seconds](/blog/woocommerce-product-save-slow).

If your Meta numbers don't match your store, [get in touch](/contact) and tell me what you are seeing.
