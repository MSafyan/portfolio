# SEO and analytics — current setup

How the site is found and measured, as of 2026-11-16. Rewrite in place when it changes.

## Domain and DNS (Vercel, personal team "msafyan's projects")

- `muhammadsafyan.com` bought through Vercel 2026-11-16, auto-renew on, Vercel DNS.
- `www.` and the old `safyan-portfolio.vercel.app` / `portfolio-outc.vercel.app` 308-redirect to the
  same path on the apex (`www` in Vercel domain settings, the vercel.app hosts in `next.config.ts`).
- TXT `google-site-verification=…` — Search Console domain property. Keep it.
- TXT `v=spf1 -all` and `_dmarc` `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s` — nothing may send
  mail as the domain. **Change SPF first if email is ever set up on the domain.**
- Canonical origin lives only in `SITE.url` (`lib/site.ts`); never derive it from `VERCEL_URL`.

## On-page SEO (code)

- Every page: `buildMetadata` (`lib/seo.ts`) — title ≤60 chars, description ≤170 (build fails
  otherwise), self-canonical, OG + Twitter, per-route `opengraph-image.tsx`.
- JSON-LD (`lib/schema.ts`, escaped via `<JsonLd>`): Person + ProfessionalService + WebSite site-wide;
  Service + FAQPage on service pages; Article + BreadcrumbList on case studies; VideoObject with Clip
  parts (key moments) wherever a video is embedded. Expired certifications are left out of Person.
- `sitemap.xml` and `robots.txt` built from the same data as the routes; robots disallows everything
  outside Vercel production.
- Blog (`/blog`, `lib/blog.ts`, posts in `content/blog/*.md`): `BlogPosting` + `BreadcrumbList`,
  per-post OG image, sitemap entries with lastmod; posts go live on their `published` date via hourly
  revalidation. Details and schedule: `../plans/blog-plan.md`.
- IndexNow: key file in `public/<key>.txt`; all sitemap URLs submitted 2026-11-16 (HTTP 202).

## Search engines

- Google Search Console: domain property verified, sitemap submitted (Safyan, 2026-11-16).
- Bing Webmaster Tools: imported from Search Console (Safyan, 2026-11-16).
- Search Console API, read-only: `pnpm gsc [--days 7]` (`scripts/search-console.mjs`, no deps) prints
  top pages, top searches and the index status of every blog post in the sitemap. Service account in
  Safyan's `portfolio-seo` Google Cloud project; key in `keys/` (see `keys/CREDENTIALS.md`).
  Request indexing stays manual — the API cannot do it.
- Index status 2026-11-21 (URL inspection of every sitemap URL): **all 24 pages "Submitted and
  indexed"**, last crawled 17–20 Nov. The "Crawled – currently not indexed" page report (dated
  16 Nov) was stale. First searches: "muhammad safyan" → `/about`, position 2.
- **Two views, two speeds.** Search Console → Pages (the Page indexing report) is a periodic
  snapshot: on 21 Nov its chart still had a single bar (~16 Nov) with 18 pages under "Crawled –
  currently not indexed", validation "Started". URL inspection (the API, the dashboard's step 1,
  or the magnifier on a listed URL) is live and is the truth for a page. Expect the report to
  catch up within days and the validation to end "Passed"; nothing to do. If it still shows 18
  after ~28 Nov, investigate.

## Dashboard (app.muhammadsafyan.com)

Private, installable dashboard in the sibling repo `../site-stats` (Vercel project `site-stats`,
private GitHub repo `MSafyan/site-stats`). Daily snapshot of Search Console, URL inspection
(weekly), GA4 (property 564503664, the service account above is a Viewer) and Clarity — the same
funnel and seven steps as the Coverage Creatives site-performance page. How it works: its
`CLAUDE.md`. It uses 2 of Clarity's 10 daily API calls.

- Live since 2026-11-21; first refresh OK on all four sources. Rebuilds daily 06:00 UTC (11:00 PKT).
- Login: one password (in `../site-stats/keys/CREDENTIALS.md`), cookie for a year. On iPhone, add to
  Home Screen first and log in inside the installed app (it keeps its own cookies).
- Production secrets are set with `bash scripts/push-env.sh` in a **normal terminal** (`vercel login`
  is interactive; Claude's `!` cannot answer prompts and times out after 120 s).
- `stats.muhammadsafyan.com` was the first subdomain; it is still attached to the project and
  must be removed by hand (Vercel → site-stats → Settings → Domains).

## Profiles that link to the site

| Profile | Where the link is |
|---|---|
| LinkedIn (`/in/safyanakram/`) | Contact info → Website (Portfolio); Featured link card |
| GitHub (`MSafyan`) | Website field; bio; profile README (`MSafyan/MSafyan`) — banner, service links, case-study cards using each `opengraph-image` |
| Upwork | **None, on purpose.** Upwork forbids outside links in profile text; the linked GitHub account is the route |

The GitHub README's banner SVGs live in that repo's `assets/`; their URLs carry `?v=N` (bump it on
change — GitHub caches raw files for 5 minutes). Figures on every profile must match `lib/work.ts`.

## Analytics (`components/Analytics.tsx`, `lib/track.ts`)

- **GA4**: Google tag `GTM-WCJM6JNH` → stream `G-DQ2H393P77`. Production only.
- **Clarity**: project `zenl4evg02`. Data Export API token is in `keys/CREDENTIALS.md` (git-ignored).
- Both load on the visitor's **first interaction** (scroll/tap/key) to keep Lighthouse at 100; events
  queue on `dataLayer` from page load so nothing is lost. Side effect: GA does not count visits with
  no interaction — see next-tasks §3.
- Custom events: `generate_lead` (contact form sent), `contact_email_click` (`link_location`),
  `video_play` (`video_id`, `video_title`, `start_seconds`).
- Tag Manager container `GTM-TL5JJF7X` exists but is empty and **not installed** (kept for future ad pixels).

## Contact form

- Server action `app/contact/actions.ts`: validation, honeypot, per-IP rate limit, reply-to = visitor.
- Sends through EmailJS (Vercel env `VITE_APP_EMAILJS_*`, Gmail service), or Resend if
  `RESEND_API_KEY` is set. EmailJS's Gmail link expired once ("Invalid grant") — reconnect it in the
  EmailJS dashboard if the form starts failing.

## Measured (production, mobile Lighthouse, 2026-11-16)

Performance 97–100, Accessibility 100, Best Practices 100, SEO 100 on all pages; LCP 1.0–2.5 s; CLS 0.
