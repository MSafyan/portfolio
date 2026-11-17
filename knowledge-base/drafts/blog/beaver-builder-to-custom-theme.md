---
title: "Beaver Builder to Custom Theme: Lighthouse 60→98"
seo_title: "Replace Beaver Builder With a Custom Theme, Keep Your SEO"
seo_description: "Replacing Beaver Builder with a custom theme took a store from 60 to 98 on mobile Lighthouse. SEO held because no URL moved and all 519 pages were compared."
slug: beaver-builder-to-custom-theme
target_query: replace beaver builder custom theme seo
service: technical-seo
case_study: brickdistrict-seo-ecommerce
status: draft
published: null
---

> **Short answer**
> - Replacing Beaver Builder with a custom WordPress theme took a LEGO resale store's home page from **60 to 98** on mobile Lighthouse, and the time to show its main content from **9.1 s to 2.2 s**.
> - Search held because no URL changed, Yoast kept writing the titles, descriptions and schema, and a script compared **all 519 pages** before and after the switch.
> - That comparison caught a real fault before visitors saw the new theme: product pages with no H1.
> - Weekly Google impressions went from **137 to 8,020** a month after the switch, mostly from buying guides the new theme made possible.

Most results for this question are lists of "the best Beaver Builder themes". They answer a different
question. If your site is slow because of the page builder, a different theme under the same builder
will not fix it. This post is about taking the builder out: what we measured first, how every URL stayed
where it was, how we proved search engines lost nothing, and the numbers after the switch on 13 October
2026.

## Why replace Beaver Builder with a custom theme?

The store sells rare and retired LEGO sets on WooCommerce. Its site was built with the Beaver Builder
Theme, Beaver Themer layouts for the header, footer, category and product pages, and two add-on packs
(PowerPack and Ultimate Addons). We measured it on 13 October 2026, past the CDN cache:

| Page (mobile Lighthouse) | Score | Main content shown (LCP) | Data loaded | Requests |
|---|---|---|---|---|
| Home | 60 | 9.1 s | about 5 MB | about 140 |
| Category | 62 | about 7 s | about 6 MB | about 80 |
| Product | 71 | about 4.5 s | about 5 MB | about 240 |

The home page loaded about 30 stylesheets and 30 scripts. Blocking time and layout shift were already fine. The
cost was weight, and the main image arriving late.

Speed was not the only problem. Beaver Themer's product layout skipped some of WooCommerce's standard
hooks, so features that rely on them needed workarounds. One of those hooks
(`woocommerce_single_product_summary`) is where WooCommerce adds its Product schema. And no product page
linked to any other product.

> **Note:** Caching and image work can only do so much here. When we checked a caching plugin on this
> site in August 2026, it was producing no combined or minified files at all. Removing the builder
> removes the weight at its source.

## Custom theme or headless: which keeps your SEO safer?

A custom theme means WordPress still builds every page, through templates you write instead of a
drag-and-drop builder. Headless means WordPress only stores the data and a separate app builds the pages.

We chose a custom PHP theme. It keeps every URL, Yoast's output and WooCommerce's own cart and checkout.
Headless would have meant rebuilding checkout on a shop that had not yet completed a sale online. The
theme was also cheap to host: it runs on the same managed WordPress hosting, with the same CDN.

## Before you replace Beaver Builder: take an SEO baseline

You cannot prove nothing was lost unless you wrote down what was there. Before writing any templates we
recorded three things from the live site:

1. **What renders each page.** Which pages used Themer layouts, and which held their content as Builder
   layouts. A handful of pages (About, FAQs, Contact, Gallery and others) were Builder layouts, so their
   text had to be rebuilt as normal block-editor content before Beaver could be switched off.
2. **An SEO snapshot of every URL in the sitemap.** For each page: status code, title, meta description,
   robots, Open Graph tags, canonical, H1s and the types of structured data on it. Every request skipped
   the CDN cache, so the run took about half an hour.
3. **Mobile Lighthouse** on the home page, a category page and a product page.

The snapshot showed the old site was clean on the basics (every URL 200, one H1 per page, valid JSON-LD,
canonicals pointing to themselves). That set the rule: the new theme must keep it that way.

## How we kept every URL and redirect when replacing Beaver Builder

**No slug, permalink or category base changed.** That was a rule of the project, not a hope. Things to
check:

- **New sections must not move old URLs.** The theme added a blog at `/blog/<post-name>/`. We set that
  permalink structure on a local copy of the site first and confirmed that product, category, tag, page
  and shop URLs came out identical, all answering 200. WooCommerce registers its URLs without the
  permalink prefix, which is why they did not move.
- **Pages you merge need a 301.** An old `/categories/` page became part of `/themes/`, so it now 301s
  there. When `/shop/` became the page listing every set, old `/themes/page/2/`-style links 301 to the
  same page of `/shop/`.
- **Changing how many products a page shows can create 404s.** Going from 16 to 48 sets a page left an
  old `/page/2/` link on one category pointing past the end. A sweep of about 530 known addresses found
  it, and listing pages past the end now 301 to page one.
- **Leave titles, descriptions and schema to your SEO plugin.** The theme calls `wp_head()` and lets Yoast
  write them, so nothing in that layer depended on the theme.

## Comparing SEO before and after on all 519 pages

Before going live, the new theme ran behind an admin-only preview on the real site, with the same content
and plugins, so the same snapshot script could run against it. A second script compared the two
snapshots field by field and failed on anything search engines rely on. This is a shortened version:

```python
for url, new in after.items():
    old = before.get(url)
    if not old:
        notes.append(f"new URL: {url}")
        continue
    for field in ("status", "title", "description", "robots",
                  "og:title", "og:description", "og:image", "canonical"):
        if old[field] != new[field] and field not in INTENDED.get(url, ()):
            problems.append(f"{url}: {field} {old[field]!r} -> {new[field]!r}")
    if len(new["h1"]) != 1:
        problems.append(f"{url}: {len(new['h1'])} H1s")
    lost = Counter(old["schema_types"]) - Counter(new["schema_types"])
    if lost and lost != Counter({"BreadcrumbList": 1}):   # the duplicate breadcrumb goes on purpose
        problems.append(f"{url}: schema lost {dict(lost)}")
```

Two details make it useful. Changes made on purpose (new titles for three tag pages) are listed in
`INTENDED`, so they show as notes instead of failures. And one expected loss is allowed: the old product
pages printed two breadcrumb lists, Yoast's and Themer's, and the theme keeps only Yoast's.

**It caught a real fault.** An early preview showed every product page with **no H1**. WooCommerce stores
template paths in the object cache (Object Cache Pro on this host) under a key that does not include the
theme, so the preview was still using the old theme's product templates. The fix makes the theme's
templates win. Without the comparison, that would have gone live on every product page.

After the switch, the same comparison against the live site reported **519 URLs compared, no problems**.
It listed several hundred expected differences, such as the duplicate breadcrumb list gone, new headings
on the rebuilt pages, the retitled tag pages and one new tag page.

> **Warning:** Check that a page's real content is visible, not only its tags. After launch, the new
> guides turned out to be hidden behind a login form, because a membership plugin blocks posts by
> default. Visitors and Google saw a login form. One setting fixed it, and a check now reads a guide's
> text.

## Lighthouse after removing Beaver Builder

On switch day, 13 October 2026, mobile Lighthouse on the live site:

| Page | Before | After | LCP before → after |
|---|---|---|---|
| Home | 60 | **98** | 9.1 s → 2.2 s |
| Category | 62 | **100** | about 7 s → under 2 s |
| Product | 71 | **99** | about 4.5 s → under 2 s |

The home page went from about 5 MB to under 1 MB. SEO, accessibility and best-practice scores were 100.

Two things mattered as much as the templates:

- **Switch off the builder's assets, not just its templates.** While some pages still used Beaver, the
  plugins kept loading their libraries everywhere. The theme stops loading the Beaver, PowerPack, Ultimate
  Addons and Themer files except on the pages that still need them, and loads the payment provider's card
  script only at checkout.
- **Measure again after the switch.** Beaver and Themer print their layout CSS inline only for the active
  theme, so it showed up only after the switch: nearly 200 KB on the home page. The next release removed
  it.

> **Note:** By 31 October the home page scored 84–87. Most of the drop came from a new version of Chrome
> scoring the same page differently: with the older Chrome, the home page still scored 98. Part of it was
> real: product pages had grown to about 5 MB from a payment plugin's express checkout scripts. Compare
> Lighthouse runs on the same browser version, and keep the raw reports.

## Search Console after the switch

On switch day the sitemap was resubmitted, indexing was requested for the new shop and guide pages, Bing
Webmaster Tools was set up from Search Console, and IndexNow was added so new pages are announced to Bing
at once.

| Week to | Google impressions |
|---|---|
| 20 Sep 2026 | 137 |
| 12 Oct 2026 (the day before the switch) | 154 |
| 2 Nov 2026 | 5,280 |
| 13 Nov 2026 | 8,020 |

Be clear about what caused this. **A theme switch alone does not multiply impressions.** The faster pages
and clean structured data helped pages get indexed, but nearly nine in ten impressions came from the
buying guides. The old site had no blog at all. The new theme gave the store one, plus links from set
pages to the guides and between related sets, where before no product page linked to another.

## Rolling back if something breaks

Every change to the live site at the switch was made by a script that recorded what it changed: the shop
page, the rebuilt pages, the menu, the permalinks. The Beaver layouts were switched off, not deleted. A
single `rollback` command restores all of it, and then the old theme is reactivated. We did not need it, but having it made switching during an active search push a safe call.

## Replacing a page builder on your own site?

Removing a builder is mostly careful measuring before and after. The templates are the easy part. My
[technical SEO service](/services/technical-seo) covers this kind of rebuild: baseline, URL plan,
before-and-after comparison, and Search Console work after launch. The full results for this store,
including a WooCommerce save that went from 34 s to 1.87 s, are in the
[LEGO store case study](/work/brickdistrict-seo-ecommerce).

If your WordPress site runs on Beaver Builder and is slow or not being found,
[get in touch](/contact) and send me the address.
