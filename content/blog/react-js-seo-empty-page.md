---
title: "Why Google Saw an Empty Page on My React Site"
seo_title: "React JS SEO: Why Google Saw an Empty Page (and the Fix)"
seo_description: "React JS SEO starts with real HTML on every URL. My Vite SPA sent Google an empty div on one URL; static Next.js got all 24 pages indexed within five days."
slug: react-js-seo-empty-page
target_query: react js seo
service: technical-seo
status: published
published: 2026-11-21
updated: null
---

> **Short answer**
> - React is fine for SEO. An empty first response is the problem: my Vite single-page app sent Google `<div id="root"></div>` and nothing else, on **one URL**.
> - The fix is real HTML for every page (server rendering, static generation or prerendering), plus a title, description and canonical per page, a sitemap and one URL per thing you want to rank for.
> - I rebuilt the site as a statically generated Next.js 16 site on 16 November 2026. In production it scores **100** in all four mobile Lighthouse categories on the home, case study and contact pages tested.
> - By 21 November 2026, **all 24 pages** in the sitemap were "Submitted and indexed", five days after launch.

React JS SEO comes down to one question: what is in the HTML your server sends before any JavaScript runs? If the answer is an empty `<div id="root">`, search engines have to run your bundle to find any text, and many bots never do. Give every page its own URL, its own real HTML, its own title and description, and list them all in a sitemap. That is most of SEO for a React app. The rest of this post is how I did it on my own site, muhammadsafyan.com, with the dates and scores.

## Is React bad for SEO?

No, but the default setup is. A plain React app built with Vite or Create React App renders in the browser. The server sends a nearly empty HTML file and a script tag, and the page only exists once that script has run.

Google can handle that. Its own [JavaScript SEO guide](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) describes three phases (crawling, rendering and indexing) and says a page can wait in the render queue "for a few seconds, but it can take longer than that". The same guide still says server-side or pre-rendering "is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript."

So "Google can't read React" is wrong. What is true: you are relying on a second, delayed step, and only some crawlers take it. My old site had a bigger problem as well.

## What Google got from my React site

This was the whole `index.html` of my old portfolio, a Vite and Three.js single-page app:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Safyan | Development Portfolio</title>
    <meta name="description" content="Safyan Akram — Backend engineer specialising in scalable systems, cloud infrastructure, and AI/ML solutions. View projects, experience, and get in touch." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

An audit of the site found more than the empty `<div>`:

- **One URL.** Services, projects and contact were all sections of a single page, so there was exactly one page that could rank, for whatever query that page happened to match best.
- **No sitemap, no robots.txt, no canonical, no structured data and no Open Graph tags.**
- **Two names.** The description said "Safyan Akram"; everywhere else I am "Muhammad Safyan". Google has to work out which person a page is about, and two names make that harder.

Even with perfect rendering, Google would have found one page of text and nothing to match a search like "hire a technical SEO developer". Rendering was the first problem, not the only one.

> **Note:** The last Lighthouse run on the old site gave Performance 54, but it was measured in dev mode on localhost. A dev-mode score is not a production score, so I don't compare it with the numbers below.

## How to make a React app SEO-friendly

These are the five things that decide React SEO, in order of how much they mattered on my site.

| What | Why it matters | Plain React (Vite) | Next.js |
|---|---|---|---|
| Real HTML on first response | Crawlers read text without running JavaScript | Prerender plugin or a prerender service | Static generation or server rendering, built in |
| One URL per page | Each URL can rank for its own query | React Router with the History API, never `#` fragments | One folder per route |
| Title, description, canonical per page | What the search result shows and which URL counts | `react-helmet-async` | `metadata` / `generateMetadata` |
| Sitemap and robots.txt | Tells crawlers which URLs exist | Build script from your route list | `app/sitemap.ts`, `app/robots.ts` |
| Links as `<a href>` | Google discovers pages through real links | `<Link>` renders one; `onClick` navigation does not | `<Link>` renders one |

The last row comes straight from Google's guide: Googlebot "can only discover your links if they are `<a>` HTML elements with an `href` attribute." A menu built from `<div onClick>` hides every page behind it.

## SSR, SSG or prerendering: which React SEO setup should you pick?

- **Static generation (SSG)** builds every page to HTML at build time. It is the right default for a portfolio, a company site, docs or a blog: content that changes when you deploy, not on every request.
- **Server rendering (SSR)** builds the HTML on each request. Use it when the page depends on fresh data, such as stock, prices or search results.
- **Prerendering an existing SPA** (a Vite prerender plugin, React Router's framework mode, or a hosted prerender service) gives crawlers HTML without a rewrite. It is a reasonable patch when the app is large and the public pages are few.

My site is a couple of dozen pages of text that change when I publish, so I chose static generation in Next.js. Blog posts revalidate hourly, so a scheduled post appears on its date without a deploy.

## What I changed: Vite SPA to static Next.js 16

On 16 November 2026 I removed the Vite app and rebuilt the site on Next.js 16, Tailwind 4 and pnpm, as a series of small commits: scaffold, content as typed data, the metadata and JSON-LD builders, pages, then sitemap, robots and share images.

The biggest change was not the framework. It was the page list. The single page became a home page, a page per service, a page per case study, a videos page, about and contact, each with its own URL and its own HTML. At launch the sitemap had **17 URLs** where the old site had one.

Every page's metadata goes through one function, so a page can't ship without a title or description, and canonical, Open Graph and Twitter tags can't drift apart:

```ts
// lib/seo.ts (shortened)
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  if (!title?.trim() || !description?.trim()) {
    throw new Error(`Missing title or description for ${path}`);
  }
  if (description.length > 170) {
    throw new Error(`Description for ${path} is ${description.length} chars; keep it under 170`);
  }
  return {
    title: { absolute: pageTitle(title) },
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title: pageTitle(title), description },
  };
}
```

The sitemap is built from the same data as the routes, so a page can't exist without a sitemap entry, or the other way round:

```ts
// app/sitemap.ts (shortened)
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...WORK.map((w) => `/work/${w.slug}`),
    "/about",
    "/contact",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
```

A few details that are easy to get wrong:

- **One canonical origin.** The site URL lives in one constant and is never built from the hosting provider's preview URL. `www` and the two old `vercel.app` addresses 308-redirect to the same path on `muhammadsafyan.com`.
- **robots.txt blocks every preview deployment** and allows only production, so test builds never get indexed.
- **One name everywhere:** "Muhammad Safyan" in every title, in the `Person` structured data, and on GitHub and LinkedIn, which both link to the site.
- **Structured data per page type:** `Person`, `ProfessionalService` and `WebSite` site-wide, `Service` and `FAQPage` on service pages, `Article` and `BreadcrumbList` on case studies.

> **Warning:** If you move a project from Vite to Next.js on Vercel, check the project's framework setting. My first production build failed because the Vercel project was still set to Vite. Switching it to Next.js (Node 24) fixed it.

## React SEO results: Lighthouse and indexing

| Date (2026) | What happened |
|---|---|
| 16 Nov | Next.js site live; sitemap with 17 URLs |
| 16 Nov | Moved to muhammadsafyan.com; sitemap submitted in Search Console; all sitemap URLs sent to IndexNow (HTTP 202) |
| 16 Nov | Production Lighthouse, mobile: Performance 97–100 on every page, 100 for Accessibility, Best Practices and SEO |
| 16 Nov | Home, BrickDistrict case study and contact: 100 in all four categories |
| 17–20 Nov | Google's last crawl dates for the pages |
| 21 Nov | URL inspection of every sitemap URL: **all 24 "Submitted and indexed"** |

The sitemap grew from 17 to 24 URLs as pages were added after launch, and all 24 were indexed by 21 November 2026, five days after launch. The first search to show up was my own name, "muhammad safyan", with the about page at position 2. Rankings for service queries take longer, and I have no numbers for those yet.

> **Tip:** On 21 November, Search Console's Page indexing report still showed 18 pages as "Crawled – currently not indexed". That report is a snapshot, and it was dated 16 November. URL inspection is live, and it showed every page indexed. Check a page with URL inspection before you start fixing a problem the report shows.

## What mattered less for React SEO than I expected

- **A perfect Performance score.** On a local production build, mobile Performance stopped at 95–98 because Lighthouse's simulated slow phone counts about 150 KB of Next.js JavaScript against first paint. A straight 100 everywhere would have meant moving to Astro. It was not worth it: the text was already in the HTML.
- **Server rendering on its own.** Real HTML on one URL would still have been one page. Splitting the site into a page per service and per case study gave Google something to match each search against.
- **Analytics scripts.** Microsoft Clarity first dropped Best Practices to 75 in production. It logged a console error and set third-party cookies on load. Fixing its load order and loading it on the visitor's first scroll, tap or key press brought Best Practices back to 100.

## How to check SEO for a React app in five minutes

1. **Look at the raw HTML, not the rendered page.** Browser DevTools show the page after JavaScript runs. `curl` shows what a crawler gets first:

   ```bash
   # Count the words in the HTML before any JavaScript runs.
   curl -s https://example.com/services | sed 's/<[^>]*>//g' | wc -w
   ```

   A few dozen words on a page full of text means the content only exists after rendering.
2. **Open a deep page by its URL in a new tab.** If `/services` loads the home page or a 404, crawlers can't reach it either.
3. **Check each page's `<title>` and canonical** in the raw HTML. Every page should have its own, and the canonical should point at itself on your real domain.
4. **Open `/sitemap.xml`.** Every page you want found should be there, and nothing else.
5. **Run URL inspection in Search Console** on two or three pages and look at the rendered HTML Google stored.

If steps 1 and 2 fail, no amount of keyword work will help until the pages exist as HTML. That was my site until 16 November 2026.

## Need help with SEO on a React site?

My [technical SEO service](/services/technical-seo) starts with checks like the ones above and then fixes what they show, whether that means prerendering an existing app or moving it to Next.js. For the same kind of rebuild on a client's WordPress store, where no URL moved, see [replacing Beaver Builder with a custom theme](/blog/beaver-builder-to-custom-theme).

If your React site isn't showing up on Google, [get in touch](/contact) and send me the URL.
