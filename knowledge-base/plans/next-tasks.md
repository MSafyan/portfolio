# Next tasks

Backlog for muhammadsafyan.com, in priority order. Tick items off here and record the change in
that day's log. Current setup is described in [../refined/seo-and-analytics.md](../refined/seo-and-analytics.md).

## 1. Get found under the name (owner: Safyan)

- [ ] Add `https://muhammadsafyan.com` to LinkedIn (website field + Featured), Upwork, CV, email signature.
- [ ] Make the six YouTube walkthroughs **public** (unlisted videos are not searchable) and link the
      matching case study in each description. Registry: `~/dev/_me/upwork/knowledge-base/videos/`.
- [ ] BrickDistrict backlink: run the bd-theme prompt (portfolio link on `/site-credits/`, GA4
      `designer_portfolio_click`; making the page indexable needs Shawn's OK).
- [ ] Ask The Gala and CVR for a "built by" credit linking to the site.

## 2. Blog: problem-solution articles (highest ranking value)

Build `/blog` with the same SEO layer (Article + BreadcrumbList schema, index page, RSS), then one
article every 1–2 weeks, each linking to its case study and service page. Cross-post to dev.to /
Hashnode / LinkedIn with the canonical pointing here. Source material: the video transcripts.

- [ ] Why Shopify sales don't match your data warehouse (gift-card refunds) — Pink Chicken
- [ ] How we cut OpenAI costs by 95% without losing quality — Wesion
- [ ] Never trust the price from the browser: Stripe webhooks done right — Helpicon
- [ ] Prisma + PgBouncer: fixing "too many connections" on Postgres — CarLister
- [ ] Azure Data Factory nvarchar(max): making columns indexable — Pink Chicken
- [ ] Getting past Keepa's 10-page API limit — e-commerce ETL
- [ ] Taking over a Laravel app with missing migrations — The Gala
- [ ] Why WooCommerce product saves take 30 seconds — BrickDistrict

## 3. Analytics gaps (do once traffic starts)

Today: GA4 page views + enhanced measurement, `generate_lead`, `contact_email_click`, `video_play`;
Clarity recordings/heatmaps; Search Console. Missing:

- [ ] **Count non-interacting visits.** GA loads on first interaction, so visitors who leave without
      scrolling/tapping are never counted (traffic and bounce rate read too good). Load GA after
      page load + idle instead; keep Clarity on first interaction. Measure the Lighthouse cost first
      (expected 1–3 mobile points).
- [ ] `cta_click` with `cta` (hero / header / footer-panel / service) and page — which button converts.
- [ ] Scroll depth 25/50/75% on case studies and articles (GA only records 90%).
- [ ] Contact form: `form_error` (which field) and `form_abandon` (started, left without sending).
- [ ] Video progress (25/50/75/complete) via YouTube player messages (`enablejsapi=1`), loaded only after play.
- [ ] `faq_open` on service pages — shows which questions clients actually have.
- [ ] Verify every event in GA DebugView in a headed browser before shipping.

GA settings (Safyan's login, ~5 min):

- [ ] Admin → Data retention → **14 months** (default is 2).
- [ ] Admin → Events → mark `generate_lead` as a **key event**.
- [ ] Admin → Data filters → internal-traffic filter for own IP.
- [ ] Admin → Product links → link **Search Console**.

## 4. Later

- [ ] Narrow service pages, only where a case study backs them: Shopify data warehouse (Pink
      Chicken), Azure Data Factory consultant (Palmetto), WooCommerce SEO & speed (BrickDistrict).
- [ ] Weekly: Search Console queries at positions 8–20 → improve those pages first.
- [ ] Email on the domain (e.g. hello@ via Zoho / ImprovMX) — then update SPF from `-all` to
      include the provider, or own mail will be rejected.
- [ ] Tag Manager container `GTM-TL5JJF7X` is empty and unused. Use it only if running ads
      (LinkedIn Insight Tag); then move GA4 into it and drop the separate Google tag.
- [ ] Renew HashiCorp Terraform Associate (expired on Credly), then set `expired: false` in `lib/profile.ts`.
- [ ] `safyanprofile/` holds the CV with a phone number in a public repo — move it to `_me/upwork/` or another private place.
