# CLAUDE.md

Personal portfolio of Muhammad Safyan — built to rank for the services he sells
(full-stack development, AI integration, data engineering) and to convert visitors
into enquiries.

## Knowledge base

Start at [knowledge-base/MASTER-INDEX.md](knowledge-base/MASTER-INDEX.md).

- `knowledge-base/plans/next-tasks.md` — the backlog (getting found, blog, analytics gaps). Check it first.
- `knowledge-base/refined/seo-and-analytics.md` — domain/DNS, SEO layer, GA4/Clarity, contact form.
  Read it before touching any of those.
- After meaningful work: add to today's `knowledge-base/logs/session_YYYY-MM-DD.md` and a line in
  `logs/INDEX.md`; update the refined doc if the setup changed.
- Credentials: `keys/CREDENTIALS.md` (git-ignored — the repo is public; never put secrets in the KB).

## Stack

Next.js 16 (App Router, every page statically generated), React 19, TypeScript,
Tailwind CSS 4, pnpm. Deployed on Vercel. No client JS beyond the theme toggle.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # must pass: it fails on a missing/overlong meta description
pnpm start        # serve the production build (use this for Lighthouse)
pnpm typecheck
```

## Where things live

| What | Where |
|---|---|
| Identity, canonical origin, profile links, nav | `lib/site.ts` |
| Service pages (copy, FAQs, related work) | `lib/services.ts` |
| Case studies | `lib/work.ts` |
| Experience, certifications, skills, reviews | `lib/profile.ts` |
| Metadata builder (title, canonical, OG, Twitter) | `lib/seo.ts` |
| JSON-LD graph (Person, ProfessionalService, Service, FAQPage, Article, BreadcrumbList) | `lib/schema.ts` |
| Share-image design | `lib/og.tsx` + `opengraph-image.tsx` per route |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |
| Source material (résumé, project notes) — not served | `safyanprofile/` |

## Rules

- **Content is data.** Add a case study or service by adding an object; routes,
  sitemap, footer links and schema follow automatically.
- **Every page uses `buildMetadata`.** Title is subject first, ≤60 chars (the name
  suffix is dropped first). Description 150–160 chars, answer first.
- **Canonical origin is `SITE.url` only** — never `VERCEL_URL`. Change the domain
  in one place.
- **JSON-LD goes through `<JsonLd>`**, which escapes `<`. Reference the Person and
  business by `@id`; never repeat them. FAQ schema only for FAQs visible on the page.
- **No invented numbers or reviews.** Every metric comes from `safyanprofile/` or the
  client project's own records. Coverage work stays anonymous ("a US marketing
  agency"); never name its clients.
- **Images:** `next/image` with real width/height; hero image `priority`, rest lazy.
- **Lighthouse:** measure `pnpm build && pnpm start` or production, never `pnpm dev`.
