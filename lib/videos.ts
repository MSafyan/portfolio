// Walkthrough videos (unlisted on YouTube, linked from Upwork proposals).
// Source: ~/dev/_me/upwork/knowledge-base/videos/ (registry + transcripts).
export type Chapter = { t: number; label: string };

export type Video = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Seconds. */
  duration: number;
  uploadDate: string;
  service?: "full-stack-development" | "ai-integration" | "data-engineering";
  chapters: Chapter[];
};

const ts = (m: number, s: number) => m * 60 + s;

export const VIDEOS: Video[] = [
  {
    id: "Tv8Gw8nwPno",
    slug: "intro",
    title: "Web apps, back ends, data and automation — a 3-minute intro",
    description:
      "A quick tour of the kind of work I do: a car-listings platform, turning spreadsheets into an inventory app, a Swedish services marketplace, AI matching and upgrading a live platform.",
    duration: 198,
    uploadDate: "2026-09-29T09:28:23-07:00",
    chapters: [
      { t: 0, label: "Intro" },
      { t: ts(0, 14), label: "Car-listings platform" },
      { t: ts(0, 43), label: "Inventory: spreadsheets to an app" },
      { t: ts(1, 15), label: "Swedish services marketplace" },
      { t: ts(1, 43), label: "AI user matching" },
      { t: ts(2, 21), label: "Upgrading a live platform" },
      { t: ts(2, 49), label: "Working together" },
    ],
  },
  {
    id: "3rp6xjwwaK0",
    slug: "full-stack-work",
    title: "Full-stack work: six products and the hard part of each",
    description:
      "Six production apps and the hardest problem in each: API limits and PgBouncer, Stripe webhooks, stats computed at upload, Pinecone matching, two-way WooCommerce sync and a Laravel takeover.",
    duration: 908,
    uploadDate: "2026-10-10T09:40:17-07:00",
    service: "full-stack-development",
    chapters: [
      { t: 0, label: "Intro" },
      { t: ts(0, 19), label: "CarLister — deal finder, API limits, PgBouncer" },
      { t: ts(2, 46), label: "Helpicon — Stripe webhooks, never trust the front-end price" },
      { t: ts(4, 43), label: "CVR — Angular, stats computed at upload" },
      { t: ts(6, 24), label: "Abundance — Pinecone matching, bulk save 20 s to 2 s" },
      { t: ts(9, 13), label: "BrickDistrict — spreadsheets to app, two-way WordPress sync" },
      { t: ts(10, 48), label: "Laravel + React (Inertia) takeover, missing migrations" },
      { t: ts(13, 42), label: "Why I start with a meeting" },
    ],
  },
  {
    id: "YMJ4e0TEcTU",
    slug: "ai-in-production",
    title: "AI features in production: LLM moderation, Pinecone matching, RAG and cost",
    description:
      "AI features running in real products: LLM content moderation, auto-written descriptions, people matching with Pinecone, a RAG chatbot kept away from the database, and cutting AI cost.",
    duration: 910,
    uploadDate: "2026-09-29T13:18:32-07:00",
    service: "ai-integration",
    chapters: [
      { t: 0, label: "Intro" },
      { t: ts(0, 13), label: "Marketplace moderation with an LLM" },
      { t: ts(1, 56), label: "Why the first prompt blocked real posts" },
      { t: ts(3, 2), label: "Auto-writing task descriptions" },
      { t: ts(3, 29), label: "People matching with Pinecone" },
      { t: ts(4, 1), label: "How matching works" },
      { t: ts(6, 14), label: "Match threshold, namespaces and weights" },
      { t: ts(7, 41), label: "Chatbot: help docs or your own data" },
      { t: ts(8, 11), label: "Keeping an AI agent away from your database" },
      { t: ts(10, 11), label: "Cutting AI cost: the right model for the job" },
      { t: ts(12, 56), label: "Computer vision: agility drills and rugby" },
    ],
  },
  {
    id: "qYOXeFOOdjY",
    slug: "data-pipelines",
    title: "Data pipelines: three platforms and what went wrong in each",
    description:
      "Azure Data Factory and Snowflake pipelines in production: schema changes without downtime, incremental loads, a four-hour job split into small procedures, and a 1–3% sales gap tracked down.",
    duration: 917,
    uploadDate: "2026-10-05T09:24:05-07:00",
    service: "data-engineering",
    chapters: [
      { t: 0, label: "Intro" },
      { t: ts(0, 10), label: "Palmetto: daily and weekly table loads" },
      { t: ts(0, 56), label: "Schema changes: build staging, then swap" },
      { t: ts(2, 2), label: "Incremental loads: soft deletes and updated_at" },
      { t: ts(2, 45), label: "Pink Chicken: Shopify, Apparel Magic, spreadsheets" },
      { t: ts(3, 20), label: "nvarchar(max) can't be indexed" },
      { t: ts(4, 34), label: "Tags in their own table" },
      { t: ts(6, 11), label: "Four hours to small procedures" },
      { t: ts(8, 5), label: "The 1–3% that wouldn't reconcile" },
      { t: ts(11, 24), label: "Amazon brand protection: Keepa, ScaleSERP, SmartyStreets" },
      { t: ts(13, 8), label: "Why Snowpark, and a log table" },
    ],
  },
  {
    id: "d364a4WmzAg",
    slug: "automation",
    title: "Making manual work disappear: from spreadsheets to a system that runs itself",
    description:
      "Replacing spreadsheets and manual reports with automation: an inventory app with two-way WooCommerce sync for BrickDistrict, and Excel match reports turned into automatic ones.",
    duration: 457,
    uploadDate: "2026-10-04T11:29:35-07:00",
    chapters: [
      { t: 0, label: "Intro" },
      { t: ts(0, 14), label: "BrickDistrict: spreadsheets and Sortly to one app" },
      { t: ts(1, 34), label: "Two-way sync with the WooCommerce shop" },
      { t: ts(2, 6), label: "One source of truth for stock" },
      { t: ts(2, 51), label: "A 30-second save: the plugin behind it" },
      { t: ts(3, 35), label: "Geo-blocked APIs" },
      { t: ts(4, 4), label: "More than inventory" },
      { t: ts(4, 55), label: "CVR: Excel reports to automatic reports" },
      { t: ts(6, 21), label: "Data warehouses behind the automations" },
    ],
  },
  {
    id: "QJlka6mmC2s",
    slug: "taking-over-an-app",
    title: "Taking over an existing app: what I check in the first week",
    description:
      "What I check when I inherit a codebase: reproducing bugs first, auth gaps, N+1 queries, tenant isolation, private files, logs, silent cron failures and shared databases — plus a real takeover.",
    duration: 900,
    uploadDate: "2026-10-04T11:27:56-07:00",
    chapters: [
      { t: 0, label: "Intro" },
      { t: ts(0, 15), label: "Step 0: understand the business" },
      { t: ts(1, 1), label: "Reproduce before touching" },
      { t: ts(1, 48), label: "Report too big: PNG vs JPEG" },
      { t: ts(2, 55), label: "Auth: suspended but still logged in" },
      { t: ts(4, 19), label: "N+1 queries" },
      { t: ts(5, 31), label: "Tenants: RLS and connection pools" },
      { t: ts(8, 28), label: "Sensitive data: file names, public vs private" },
      { t: ts(9, 48), label: "Logs: keep them, keep tokens out" },
      { t: ts(10, 49), label: "Failing every hour" },
      { t: ts(11, 47), label: "Two environments, one database" },
      { t: ts(12, 30), label: "A real takeover: database to RDS, files, migrations" },
    ],
  },
];

export const getVideo = (id: string) => VIDEOS.find((v) => v.id === id);
export const videoForService = (slug: string) => VIDEOS.find((v) => v.service === slug);
export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const fmt = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
