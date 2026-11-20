# Next tasks

Backlog for muhammadsafyan.com, in priority order. Tick items off here and record the change in
that day's log. Current setup is described in [../refined/seo-and-analytics.md](../refined/seo-and-analytics.md).

## 1. Get found under the name (owner: Safyan)

- [x] LinkedIn: Contact info → Website (type Portfolio) and a Featured link card — 2026-11-20.
- [x] GitHub: website field, bio, profile README with a banner and case-study cards linking the
      site (`MSafyan/MSafyan`) — 2026-11-20.
- [x] Upwork: **no link in profile text** (Upwork forbids outside links and contact details);
      clients reach the site through the linked GitHub account — decided 2026-11-20.
- [ ] CV PDF and email signature. Re-export the CV first: it still has Palmetto 50+ pipelines,
      CVR from 2022 and Wesion "Present" (correct: about 10, Feb 2023, ended Aug 2026).
- [ ] LinkedIn Wesion entry: end Aug 2026 (shows "May 2023 – Present"); settle Apr vs May 2023.
- [ ] GitHub: pin the `portfolio` repo; add LinkedIn under Social accounts.
- [ ] GitHub README "Recent writing" is static — refresh it as posts release.
- [ ] Make the six YouTube walkthroughs **public** (unlisted videos are not searchable) and link the
      matching case study in each description. Registry: `~/dev/_me/upwork/knowledge-base/videos/`.
- [ ] BrickDistrict backlink: run the bd-theme prompt (portfolio link on `/site-credits/`, GA4
      `designer_portfolio_click`; making the page indexable needs Shawn's OK).
- [ ] Ask The Gala and CVR for a "built by" credit linking to the site.

## 2. Blog: problem-solution articles (highest ranking value)

Plan, researched topic list and on-page checklist: **[blog-plan.md](blog-plan.md)**.

- [x] Build `/blog` (index, post page, BlogPosting + BreadcrumbList schema, sitemap with lastmod, OG images) — 2026-11-17. RSS still to do.
- [ ] Confirm with each named client that a deeper write-up is fine, or write it anonymously.
- [~] First batch of eight scheduled 17 Nov – 8 Dec (see blog-plan.md); two Gala posts held.
- [ ] Weekly: Search Console → which posts get impressions; Request indexing on each release day.
      Pending: `/blog/beaver-builder-to-custom-theme` ("unknown to Google" on 2026-11-20).

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
