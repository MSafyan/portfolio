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
| 9 | UKG Pro to Azure SQL: Automated Loads for Power BI | ukg pro api export to sql server | HR/finance/IT lead | Red Three's answer is CSV export; nobody shows scheduled incremental loads | palmetto, data-engineering |
| 10 | Taking Over a Laravel App: The First Two Weeks | taking over a laravel project from another developer | Owner whose developer left | Agency checklists, few first-person accounts; this one sells the service | the-gala, full-stack |

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
