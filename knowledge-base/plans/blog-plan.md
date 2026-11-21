# Blog plan — what to write and how to make it rank

Researched 2026-11-17: ~40 live searches across three pillars (web/payments/SEO, AI, data), checking
who ranks for each candidate query and where the gap is. **No search-volume data** — volumes come
later from Search Console. Replaces the draft list in [next-tasks.md](next-tasks.md) §2.

## Strategy in one paragraph

A new domain cannot win head terms ("reduce OpenAI costs", "Shopify data warehouse", "NetSuite
Power BI") — vendors and listicles own them. It *can* win specific problem queries where today's
results are forum threads, package READMEs or connector landing pages, and where Safyan has the
real root cause and real numbers. Prefer queries a **buyer** types (store owner, finance lead,
founder, CTO) over pure-developer queries; mix in a few developer posts for links and credibility.
Write in clusters so each post links to the others, its case study and its service page.

## First ten, in order

| # | Title (≤60) | Target query | Who searches | Why it can rank | Links to |
|---|---|---|---|---|---|
| 1 | Why Shopify Sales Don't Match Your Warehouse | shopify sales don't match data warehouse gift card refunds | Finance lead, e-com ops | Rankers (Weld, datadice, retail-q) cover generic mismatch; none has the gift-card-refund-then-spent double count via GraphQL order changes | pink-chicken, data-engineering |
| 2 | WooCommerce Product Save Took 34s: The Fix | woocommerce product update takes 30 seconds | Store owner | Only GitHub issues and support threads; nobody names cache rebuild on save with a measured 34 s → 1.87 s | brickdistrict, technical-seo |
| 3 | Tabby, Tamara and MyFatoorah in One Laravel Checkout | integrate tabby and tamara laravel | GCC business owners + their devs | Thin package READMEs and agency pages; nobody covers all three + mobile app | the-gala, full-stack |
| 4 | Matching People by What They Lack, Not Share | complementary matching strengths weaknesses embeddings | Community/mentoring app founders | Only papers and HR vendors; no build guide. Publish the 0.4/0.5/0.1 formula + 40/100 cut-off | wesion, ai-integration |
| 5 | ApparelMagic API to SQL: Paging, Limits, Pitfalls | apparelmagic api data warehouse / power bi | Apparel brand ops/IT | Only connector pages and a GitHub tap; tiny volume, every reader a prospect | pink-chicken, data-engineering |
| 6 | Beaver Builder to Custom Theme: Lighthouse 60→98 | replace beaver builder custom theme seo | Business owner | Beaver-specific results are only "best themes" listicles | brickdistrict, technical-seo |
| 7 | Our LLM Moderator Blocked Real Posts. The Fix | llm moderation rejecting legitimate posts | Marketplace CTO/founder | Only an OpenAI forum thread and papers; no practitioner write-up | helpicon, ai-integration |
| 8 | Shopify to Azure SQL: A Production ADF Pipeline | shopify to azure sql | IT lead deciding build vs buy | Connector landing pages own it but explain nothing; add REST vs GraphQL traps | pink-chicken, data-engineering |
| 9 | Dashboard Hours Don't Match UKG? Reconcile First | ukg hours don't match power bi report | Finance/ops lead | UKG reporting results are thin (Red Three, connector pages); nobody tells a reconciliation story. **SERP not yet checked for this phrasing** | palmetto, data-engineering |
| 10 | Taking Over a Laravel App: The First Two Weeks | taking over a laravel project from another developer | Owner whose developer left | Agency checklists, few first-person accounts; this one sells the service | the-gala, full-stack |

### Source material for #9 (Palmetto, from the archived repo, checked 2026-11-17)

Safyan did **not** call the UKG API: the Air1 vendor imported a UKG "Detailed Calculated Time
(Counters)" CSV into their Postgres, and ADF copied it to Azure SQL. The work was reconciliation.
All under `~/archive/palmetto/palmetto-data-warehouse/`:

Real values and file references live in the git-ignored `drafts/blog/sources/ukg-hours-dont-match-power-bi/` folder, not here.

- **Reconcile to the cent first.** The raw table matched UKG exactly for each year; the view was
  low because it dropped rows without a job number — overhead/admin, roughly a quarter to a third
  of all hours.
- **One project showed about a tenth of its UKG hours** on the dashboard. The sync was ruled out
  (same row count on both sides); job numbers were rebuilt from separate fields and lost their
  leading zeros (shape: `ABC12-3-25` vs `ABC012-03-25`).
- **Premium Pay counted twice** — extra counter rows in the UKG export; split into their own columns.
- **Edited timecards not re-imported** — a small row-level gap (inferred).
- Never name the client's customer projects (they appear in the files); office codes and hours only.
- `INVESTIGATION_SUMMARY.md` names client staff and was written with Claude; keep both out.

## Next batch

- **Shopify Incoming Inventory: Why REST Doesn't Return It** (`shopify incoming inventory api`) — devs stuck in community.shopify.dev threads. Shopify cluster with #1 and #8.
- **Swish + Stripe for a Marketplace: Webhooks Done Right** (`swish api integration node.js callback`) — no modern write-up; absorbs "never trust the price from the browser".
- **How to Build AI Member Matching for a Community App** — results are agency cost pages with no technical content; founder intent.
- **Most AI Features Don't Need a Reasoning Model** — the old "95% cheaper" post, re-angled: per-feature measurement and token caps; model names in an "at the time" box (they date fast).
- **Azure Monitor Cost: $1,000/mo to $0.10 for ADF Alerts** — generic cost guides only.
- **Inherited Laravel App, No Migrations? Fix Schema Drift** — rankers say "run the generator"; nobody covers hand-edited production.
- **NetSuite to Azure SQL and Power BI Without a Connector** — aim at the Microsoft Q&A gap, not "netsuite power bi". Air1 has no search demand; mention it here.
- **When the Model Behind the Same Name Changes** — follow-up to #7; evergreen.
- **AI Location Pages Across 19 Next.js Sites** — crowded with scale-brag posts; the angle is quality control.
- Developer filler (links, credibility, few leads): ADF nvarchar(max) indexing; Don't embed whole bios; Pinecone namespaces per attribute; one generic MERGE proc; Prisma + PgBouncer from cron jobs; weekly chat summaries with a NestJS cron.

## Cut or merge

- **Stripe "never trust the browser price"** as its own post — saturated (Stripe docs + many dev.to posts). Merged into the Swish post.
- **"How we cut OpenAI costs by 95%"** as titled — first page is 2026 tool-vendor listicles; re-angled above.
- **Keepa 10-page limit** — Keepa's Product Finder docs allow 10,000 ASINs, so the claim reads wrong
  unless the post names the exact endpoint that caps at 10 pages. Check before writing; low priority.

## Writing rules (adapted from BrickDistrict's guides)

BrickDistrict's guides are 88% of that store's search impressions; the rules that made them work,
from `~/dev/brickdistrict/bd-theme/knowledge-base/refined/guides.md` and the "Content rules" in
`~/dev/brickdistrict/legobrick/knowledge-base/plans/seo-and-growth.md`:

- **One question per post.** Narrow single-question pages ranked best (positions 3–5); broad ones
  sat at 7–10. No two posts share a primary keyword or answer the same question.
- **Short answer first.** A boxed 2–4 bullet answer under the byline that only restates the post
  (every number in it appears again below). Clarity showed readers stop right after it — so the
  next thing they see is the call to action: the case study and "work with me".
- **Search title ≠ H1.** `seo_title` ≤60 uses the words people search; the H1 is the human title.
  Description 150–160, answering in the snippet where possible.
- **Every claim has a source that was read.** Each post gets a research folder `sources/<slug>/` whose
  `facts.md` maps each fact and number to a file, commit or transcript. Not in a source → not written.
- **Specific, not reusable.** The opening can't be pasted onto another post; at least four facts
  specific to this case (numbers, field names, error text).
- **Keyword in most H2s, varied**; H2s phrased as the follow-up questions searchers ask; a table of
  contents with 3+ H2s.
- **Callouts** for tip / note / warning; tables that collapse to cards on a phone.
- **No time-relative text** ("last month", "ten weeks left") — write dates.
- **Links:** service page (the pillar) first, then the case study, then 0–3 sibling posts that are
  live. Never a link to a page that doesn't exist yet.
- **A real byline:** Muhammad Safyan, Person schema by `@id`.
- **Client names:** drafts are anonymous ("a US children's clothing brand") until the client is
  asked; never the client's customers, staff or personal data.

- **Client identifiers and internal figures are disguised (Safyan, 2026-11-17).** Job numbers,
  order/record IDs, office codes, client table and resource names, commit hashes → made-up values
  of the same shape. Internal figures (hours, row counts, amounts) → rounded approximations.
  Headline results already published in a case study may stay as published.

## Release schedule (first batch)

| Date (UTC) | Post |
|---|---|
| 17 Nov 2026 | shopify-sales-dont-match-warehouse, woocommerce-product-save-slow |
| 20 Nov | beaver-builder-to-custom-theme |
| 24 Nov | complementary-matching-embeddings |
| 27 Nov | ukg-hours-dont-match-power-bi |
| 1 Dec | llm-moderation-false-positives |
| 4 Dec | apparelmagic-api-to-sql |
| 8 Dec | shopify-to-azure-sql-data-factory |

Held (`status: held`, git-ignored): tabby-tamara-myfatoorah-laravel, taking-over-a-laravel-app —
revisit ~1 Dec (client security details; Tabby/Tamara code by another developer).

On each release day: Search Console → URL Inspection → Request indexing for that post. IndexNow is
not sent automatically for scheduled posts (Bing finds them through the sitemap).

## Drafts and publishing

- Posts: `content/blog/<slug>.md` — frontmatter (`title`, `seo_title`, `seo_description`, `slug`,
  `target_query`, `service`, `case_study`, `status`, `published`, `updated`) + Markdown body.
  Committed, disguised. Rendered by `lib/blog.ts` at `/blog/<slug>`.
- `status: draft` shows under `pnpm dev` only (badge "Draft"); `held` never shows.
- `status: published` + `published: YYYY-MM-DD` goes live **on that date** (UTC), automatically:
  blog pages, the sitemap and the service/case-study pages that list posts re-render hourly
  (`revalidate = 3600`), and post pages not pre-built render on first request. A post appears
  within about an hour after midnight UTC. To delay one, move its date. Locally it shows as "Scheduled".
- Research per post: `knowledge-base/drafts/blog/sources/<slug>/` — **git-ignored, local only**
  (the repo is public), so real values are allowed there. Layout in `sources/BRIEF.md`:
  `README.md` (status, summary, open questions), `facts.md` (claim → real value → source),
  `research.md` (SERP, keywords, follow-up questions, links, cross-posting), `images.md` + `images/`
  (used, candidate and to-make images), `code/` (real, disguised and unused snippets),
  `timeline.md`, `outtakes.md` (cut material, follow-up ideas). Publish only after Safyan has
  answered the open questions in that folder's `README.md`.
- Callouts: a blockquote starting `**Short answer**`, `**Tip:**`, `**Note:**` or `**Warning:**`.

## How each post is built to rank

**On the page**
- URL `/blog/<short-slug>`; title = the target query in natural words, ≤60 chars, through `buildMetadata`.
- Description 150–160 chars: the answer, not a teaser.
- First paragraph answers the question; the symptom in the searcher's words, then the cause.
- Real numbers from `safyanprofile/` or the client's records only — same rule as case studies. A
  "what we measured" box beats every listicle that ranks today.
- One diagram (the existing `/images/work/diagrams/` are reusable) and real code/queries where they help.
- Headings that match follow-up questions searchers ask; FAQ schema only for questions shown on the page.
- 1,000–2,000 words; as long as the problem needs, no padding.

**Structured data and discovery** (extend the existing layer, don't add a new one)
- `Article` (or `TechArticle` for code-heavy posts) with `author`/`publisher` → Person `@id`, real
  `datePublished` and `dateModified`, `BreadcrumbList` Home › Blog › Post.
- Sitemap gets blog URLs **with lastmod** — posts have real dates, unlike the rest of the site.
- `/blog` index, RSS feed, per-post OG image, IndexNow ping and Search Console "Request indexing" on publish.

**Links**
- Every post links to its case study, its service page and 1–2 sibling posts in the same cluster.
- Case studies and service pages link back to their posts (add a "Related articles" block).
- Cross-post to dev.to / Hashnode / LinkedIn **with the canonical pointing here**, a few days after
  publishing so Google sees this copy first.
- Natural backlinks: answer the forum threads that rank today (Shopify community, Microsoft Q&A,
  OpenAI forum) with a short answer and the link.

**After publishing**
- Weekly: Search Console queries at positions 8–20 → extend those posts with the exact words people search.
- After 6–8 weeks, refresh posts with impressions but low click-through: rewrite title and description.

## Building `/blog`

Content is data, like the rest of the site. Posts are long prose with code, so MDX (`@next/mdx`)
is the likely fit — it adds dependencies, so decide when building. Same `buildMetadata`, `<JsonLd>`,
sitemap and OG patterns as case studies. Cadence: one post every 1–2 weeks.

## Before writing

- Client names: case studies already name Pink Chicken, Palmetto, Helpicon, The Gala, Wesion and
  BrickDistrict; a blog post goes deeper into their internals. Confirm each client is fine with it,
  or write the post anonymously ("a US children's clothing brand"). Coverage stays anonymous always.
- Source material: video transcripts, `safyanprofile/projects/`, the client repos.
