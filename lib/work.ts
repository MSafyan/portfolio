export type Shot = { src: string; alt: string; width: number; height: number };

type Point = { value: number; display: string };
export type Chart =
  | { type: "beforeAfter"; title: string; before: Point; after: Point; change?: string; source?: string }
  | { type: "series"; title: string; points: (Point & { label: string })[]; source?: string };

export type CaseStudy = {
  slug: string;
  client: string;
  /** The client's live site, linked from the case study. */
  site?: string;
  /** Headline used for the H1 and the card. */
  name: string;
  title: string;
  description: string;
  service: "full-stack-development" | "ai-integration" | "data-engineering";
  role: string;
  region: string;
  period: string;
  /** ISO date the case study went live, for Article schema. */
  published: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  stack: string[];
  shots: Shot[];
  /** The hard problems, in the order they came up: what went wrong and what fixed it. */
  hardParts?: { title: string; body: string; figure?: Shot }[];
  charts?: Chart[];
  /** Walkthrough video and the second its section starts. */
  video?: { id: string; start: number };
};

export const WORK: CaseStudy[] = [
  {
    slug: "brickdistrict-seo-ecommerce",
    charts: [
      {
        type: "series",
        title: "Google impressions per week",
        points: [
          { label: "20 Sep", value: 137, display: "137" },
          { label: "12 Oct", value: 154, display: "154" },
          { label: "2 Nov", value: 5280, display: "5,280" },
          { label: "13 Nov", value: 8020, display: "8,020" },
        ],
        source: "Google Search Console, 2026. The new theme went live on 13 October.",
      },
      {
        type: "beforeAfter",
        title: "Mobile Lighthouse performance, home page",
        before: { value: 60, display: "60" },
        after: { value: 98, display: "98" },
        change: "+38 points",
        source: "Lighthouse mobile, before and after the theme switch on 13 Oct 2026.",
      },
      {
        type: "beforeAfter",
        title: "Largest Contentful Paint, home page (mobile)",
        before: { value: 9.1, display: "9.1 s" },
        after: { value: 2.2, display: "2.2 s" },
        change: "4x faster",
      },
      {
        type: "beforeAfter",
        title: "Saving one product to WooCommerce",
        before: { value: 34, display: "~34 s" },
        after: { value: 1.87, display: "1.87 s" },
        change: "18x faster",
        source: "Measured 30 Aug 2026, after removing the caching plugin's save hooks.",
      },
    ],
    hardParts: [
      {
        title: "We started with spreadsheets, and should have started with an app",
        body: "The first brief was to automate the inventory spreadsheets. After one or two weeks, a proper meeting about how the shop actually ran showed the spreadsheets were the problem. We switched to one app — scan, list, sell — with a two-way sync to WooCommerce: a sale in the shop updates the app, a change in the app updates the shop. It's why I now start every project with a meeting.",
        figure: {
          src: "/images/work/diagrams/automation.webp",
          alt: "Diagram: before, a spreadsheet, Sortly and the online shop disagree; after, scan the box, identify the set, update stock and price, and sync with the shop",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "A 30-second save that wasn't our code",
        body: "Every product update took about half a minute. The cause was a caching plugin that rebuilt its cache on every save. Without its save hooks the same write takes 1.87 s, which turned a two-hour catalogue pass into about eleven minutes.",
      },
      {
        title: "Search traffic came from answering real questions",
        body: "Speed and clean structured data got pages indexed, but impressions took off with buying guides written for what collectors actually search — is a set retiring, what it's worth, which sets are rare. Guides now earn most of the store's impressions, and click-through is the next thing to work on.",
      },
    ],
    video: { id: "d364a4WmzAg", start: 14 },
    client: "BrickDistrict",
    site: "https://brickdistrict.net/",
    name: "58x more Google impressions for a LEGO e-commerce store",
    title: "BrickDistrict: WooCommerce SEO, Speed and Automation",
    description:
      "A custom WordPress theme, structured data and catalogue automation for a WooCommerce LEGO store: Lighthouse 60 to 98 and weekly impressions 137 to 8,020.",
    service: "full-stack-development",
    role: "Full-stack developer and technical SEO",
    region: "Remote",
    published: "2026-11-16",
    period: "2026 – present",
    metrics: [
      { value: "137 → 8,020", label: "weekly Google impressions" },
      { value: "60 → 98", label: "mobile Lighthouse, home page" },
      { value: "9 → 116", label: "weekly clicks from Google" },
    ],
    challenge:
      "BrickDistrict sells rare and retired LEGO sets. In September 2026 the site was slow: the home page weighed 14 MB, scored 56 out of 100 on Google's mobile speed test and took almost 10 seconds to show its main content. Only 6 of 402 products had a description, Google had indexed about a third of the pages, and the store got about 19 clicks from Google in two months.",
    approach: [
      "Replaced the page-builder site with a custom WordPress theme. On mobile, the home page's speed score went from 60 to 98 and its main content now appears in 2.2 s instead of 9.1 s. Category and product pages now score 99–100, and a check across all 519 pages confirmed nothing was lost for search.",
      "Gave Google richer product details (brand, barcode, price, return policy), wrote search titles that say whether a set is retired, and kept near-empty category pages out of Google's index.",
      "Wrote a real description for all 402 products, generated from LEGO's own set text, and published 21 buying guides that now earn most of the store's search impressions.",
      "Set up Google and Bing webmaster tools, sales tracking in Google Analytics, a Google Shopping feed, and redirects so every old link still works.",
      "Built the catalogue back end in Python on AWS: it pulls each set's retirement date, checks the site's health every day, and saves a product in 1.9 s instead of about 34 s.",
      "Built a Flutter barcode-scanning app the team uses to receive, list and sell stock directly against WooCommerce.",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "Schema.org", "Search Console", "GA4", "Python", "FastAPI", "AWS", "Flutter"],
    shots: [
      {
        src: "/images/work/brickdistrict-home.webp",
        alt: "BrickDistrict home page with the hero for rare, retired and retiring LEGO sets",
        width: 1440,
        height: 900,
      },
    ],
  },
  {
    slug: "insurance-lead-gen-sites",
    charts: [
      {
        type: "beforeAfter",
        title: "Search impressions per week, across the sites",
        before: { value: 533, display: "533" },
        after: { value: 6271, display: "6,271" },
        change: "12x in one week",
        source: "Google Search Console, week to 13 Nov 2026.",
      },
      {
        type: "beforeAfter",
        title: "Sitemap pages indexed by Google",
        before: { value: 1914, display: "1,914 submitted" },
        after: { value: 1233, display: "1,233 indexed (64%)" },
        source: "Google Search Console, 9 Nov 2026.",
      },
    ],
    hardParts: [
      {
        title: "One codebase, nineteen brands",
        body: "Every site has its own domain, colours, offices and content, but they all render from one Next.js template backed by Supabase. A fix or a new feature lands on all nineteen at once — the only way a small team can keep that many sites current.",
      },
      {
        title: "AI content you can publish without reading every word",
        body: "Pages are generated one section at a time, and each section is validated and corrected before it is saved. A separate pass repairs broken links and stray markdown in published content, because generated text fails in small, boring ways at scale.",
      },
      {
        title: "SEO data in one place",
        body: "Search Console, SE Ranking, BrightLocal, GA4, Bing and Clarity each told part of the story. Pulling them into one pipeline made it possible to see which pages rank on page two and which keywords are worth a new page.",
      },
    ],
    client: "US marketing agency",
    name: "19 insurance lead-generation sites from one Next.js codebase",
    title: "Multi-Site Next.js Lead-Gen Platform with Programmatic SEO",
    description:
      "One Next.js template rendering 19 insurance lead-gen sites, with AI page generation, location pages and SEO data pipelines: 1,233 pages indexed and 27 page-1 rankings.",
    service: "full-stack-development",
    role: "Full-stack developer",
    region: "United States",
    published: "2026-11-16",
    period: "2026 – present",
    metrics: [
      { value: "19", label: "live sites from one codebase" },
      { value: "1,233", label: "pages indexed by Google" },
      { value: "533 → 6,271", label: "weekly search impressions" },
    ],
    challenge:
      "A US marketing agency builds lead-generation websites for local insurance agencies. Each new site meant hand-built pages and content, and there was no shared view of how the sites performed in search.",
    approach: [
      "Redesigned the single Next.js template that runs every agency's site on its own domain: quote forms, a tap-to-call bar on mobile, estimate calculators, lead tracking and new site types.",
      "Built AI page writing that drafts one section at a time and checks and corrects each section before saving it, plus an automatic fix for broken links in published pages.",
      "Created location and policy pages automatically from data, with links between pages updated when one changes and redirects when a page is removed.",
      "Brought data from six SEO and analytics tools into one dashboard that shows how each site performs in search, and sent 2,342 pages to Bing for indexing.",
      "Shipped it as 128 pull requests across 15 repositories; as of 15 November 27 of 142 tracked keywords rank on page one, including one at #1.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Express", "OpenAI", "Search Console API", "IndexNow", "Stripe"],
    shots: [],
  },
  {
    slug: "the-gala-events-marketplace",
    client: "The Gala",
    site: "https://thegala.com.sa/",
    name: "An events marketplace in Saudi Arabia, payments to payouts",
    title: "The Gala: Laravel Marketplace with BNPL Payments and Payouts",
    description:
      "Taking over and extending a Saudi events marketplace: Laravel API, React (Inertia) dashboards, two Flutter apps, card and buy-now-pay-later payments, payouts and refunds.",
    service: "full-stack-development",
    role: "Back-end developer",
    region: "Saudi Arabia",
    published: "2026-11-16",
    period: "2025 – present",
    metrics: [
      { value: "867", label: "automated tests, all passing" },
      { value: "680", label: "commits shipped" },
      { value: "3", label: "payment providers integrated" },
    ],
    challenge:
      "The Gala connects customers with singers, decorators and event managers. It had been built by a previous team: the core worked, but there were bugs, an interface that needed reskinning, and a database whose structure existed only in production — the migration files were missing.",
    approach: [
      "Wrote the missing database setup files, so a new copy of the system now matches production exactly. It runs on AWS and deploys automatically.",
      "Rebuilt checkout for card payments (MyFatoorah) and pay-later plans (Tabby and Tamara). The server, never the app, sets the price and confirms the payment.",
      "Added the money side a marketplace needs: provider payouts per booking, a hold when a provider's bank account changes, and refunds as records with a status and a full history.",
      "Built booking rules for real events: one confirmed booking per offer and time slot, provider unavailable days, home-visit addresses and reminders the day before.",
      "Redesigned the provider and admin dashboards in React, served the two mobile apps from the same back end, and added 867 automated tests that run on every change.",
    ],
    stack: ["Laravel", "PHP", "React", "Inertia.js", "MySQL", "Flutter", "MyFatoorah", "Tabby", "Tamara", "AWS"],
    video: { id: "3rp6xjwwaK0", start: 648 },
    hardParts: [
      {
        title: "A database nobody could rebuild",
        body: "Previous developers had changed the database by hand, so the migration files no longer described it. A new environment could come out with missing tables or different column limits from production. Writing the missing migrations made every environment reproducible again.",
      },
      {
        title: "Money that has to add up",
        body: "Between the customer's payment and the provider's payout sit service fees, refunds, complaints and changed bank details. Each payout and refund is a record with a status and history, and a payout is held while a complaint is under review or for three days after a bank account change.",
      },
      {
        title: "Files anyone with the link could open",
        body: "Invoices, identity documents and bank details sat in a public bucket. Now the bucket is private: the app checks the signed-in user may see a file, writes an audit row, then streams it. Bank numbers are encrypted, and personal fields never reach the logs.",
        figure: {
          src: "/images/work/diagrams/takeover-data.webp",
          alt: "Diagram: before, a public bucket served invoices and identity documents to anyone with the link; after, a private bucket behind a permission check and an audit row",
          width: 1600,
          height: 900,
        },
      },
    ],
    shots: [
      {
        src: "/images/work/gala-app.webp",
        alt: "The Gala admin executive dashboard with customers, providers, bookings and revenue on staging data",
        width: 1400,
        height: 900,
      },
    ],
  },
  {
    slug: "wesion-ai-matching",
    charts: [
      {
        type: "beforeAfter",
        title: "Monthly LLM spend (relative)",
        before: { value: 100, display: "100%" },
        after: { value: 5, display: "5%" },
        change: "95% lower",
        source: "After moving tasks from o1-mini to gpt-4o-mini with per-feature token limits.",
      },
      {
        type: "beforeAfter",
        title: "Saving a member's assessment",
        before: { value: 20, display: "20 s" },
        after: { value: 2, display: "2 s" },
        change: "10x faster",
      },
    ],
    hardParts: [
      {
        title: "Match keywords, not paragraphs",
        body: "Feeding whole bios into a vector database matches people on filler words. Instead an LLM extracts keywords from each profile first — \"I like cricket\" becomes \"cricket\" — and only those go into Pinecone, in separate namespaces for strengths, weaknesses, interests and values.",
      },
      {
        title: "A score people can trust",
        body: "Vector search always returns something, even for a bad match, so anything under 40 out of 100 is dropped. The final score weights semantic similarity at 40%, strength-to-weakness pairing at 50% (someone strong at public speaking matched with someone who wants to improve it) and engagement at 10%.",
        figure: {
          src: "/images/work/diagrams/ai-matching.webp",
          alt: "Diagram: a weekly job scores similar and complementary answers with OpenAI and Pinecone, combined 0.4 similar, 0.5 complementary, 0.1 engagement",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "A chatbot that never touches the database directly",
        body: "General questions about the platform are answered from documentation through RAG. Questions about a member's own data go through one narrow function per question type, so the model can never compose its own queries against production.",
        figure: {
          src: "/images/work/diagrams/ai-chatbot.webp",
          alt: "Diagram: a question is classified, then answered from the help docs through RAG or from the member's own data through fixed lookups",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "The cheapest model that does the job",
        body: "One day of unexpected API cost led to measuring every feature on its own. Most tasks didn't need a reasoning model; moving them to a smaller one with token limits cut spend by 95% without a drop in output quality.",
        figure: {
          src: "/images/work/diagrams/ai-cost.webp",
          alt: "Diagram: moving from o1-mini to gpt-4o-mini with token limits cut the AI bill by 95%; the bigger model kept only where it earns it",
          width: 1600,
          height: 900,
        },
      },
    ],
    video: { id: "YMJ4e0TEcTU", start: 209 },
    client: "Wesion (Abundance Movement)",
    name: "AI matching and recommendations at 5% of the cost",
    title: "Wesion: AI Matching Platform with OpenAI and Pinecone",
    description:
      "How I built an 11-service AI matching and recommendation platform with OpenAI, LangChain and Pinecone for a UK social learning app — and cut LLM costs by 95%.",
    service: "ai-integration",
    role: "Full-stack and AI engineer",
    region: "United Kingdom",
    published: "2026-11-16",
    period: "2023 – present",
    metrics: [
      { value: "95%", label: "lower LLM spend" },
      { value: "11", label: "AI services in production" },
      { value: "5+", label: "profile dimensions matched" },
    ],
    challenge:
      "Wesion connects members by goals, strengths and values. It needed matching, video recommendations and conversation summaries that understood meaning — and the first AI prototype was too expensive to run for every member.",
    approach: [
      "Designed and built the back end from scratch in NestJS and PostgreSQL on AWS, including a small service that compresses every uploaded image and video.",
      "Built 11 AI features on OpenAI and LangChain: matching members by meaning, video recommendations, goal suggestions, content checks and chat summaries.",
      "Stored each member's strengths, weaknesses, interests and values separately in a vector database (Pinecone), so strengths are compared with strengths, not with hobbies.",
      "Measured what each AI feature cost, moved the ones that didn't need a large model (o1-mini) to a smaller one (gpt-4o-mini), and capped how much each may write — 95% cheaper with the same quality.",
      "Added a weekly job that turns each week of conversation into a short summary with action items, which members can also request at any time.",
    ],
    stack: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "OpenAI", "LangChain", "Pinecone", "AWS Lambda", "S3"],
    shots: [
      {
        src: "/images/work/wesion.webp",
        alt: "Wesion community dashboard showing proposals, votes and member balances",
        width: 1716,
        height: 1216,
      },
    ],
  },
  {
    slug: "helpicon-marketplace",
    charts: [
      {
        type: "beforeAfter",
        title: "Deployment time",
        before: { value: 45, display: "45 min" },
        after: { value: 11, display: "11 min" },
        change: "75% faster",
      },
      {
        type: "beforeAfter",
        title: "Time to recover from an incident",
        before: { value: 120, display: "2 h" },
        after: { value: 15, display: "15 min" },
        change: "8x faster",
      },
      {
        type: "beforeAfter",
        title: "Docker image size",
        before: { value: 1200, display: "1.2 GB" },
        after: { value: 180, display: "180 MB" },
        change: "85% smaller",
      },
    ],
    hardParts: [
      {
        title: "Never take the price from the browser",
        body: "Anyone with developer tools can change a price before it is sent. Every amount comes from the server and is confirmed by a Stripe or Swish webhook that is verified with its signing secret — the webhook, not the redirect back to the app, decides whether a booking is paid.",
      },
      {
        title: "Moderation with an LLM, and the prompt that blocked real posts",
        body: "Users were posting tasks the platform doesn't allow, phone numbers to move off-platform, and \"hire me\" ads in the wrong place. An LLM validator checks each task and question. The first prompt rejected plenty of legitimate tasks; it took several rounds of testing to tune — and needs re-checking whenever the model behind the same name changes.",
      },
      {
        title: "Send only what the screen needs",
        body: "Lists that were fine with a few hundred users slowed down with thousands. The API now returns only the fields and relations each screen asks for, with pagination and composite indexes — responses dropped from around three seconds to under 200 ms.",
      },
    ],
    video: { id: "3rp6xjwwaK0", start: 166 },
    client: "Helpicon",
    site: "https://helpicon.se/",
    name: "A Swedish services marketplace with 99.8% payment success",
    title: "Helpicon: Marketplace Back End, Payments and DevOps on AWS",
    description:
      "Back end, Stripe and Swish payments, and AWS DevOps for a Swedish services marketplace with 10,000+ users: 99.8% payment success and 2–3x faster APIs.",
    service: "full-stack-development",
    role: "Senior back-end and DevOps engineer",
    region: "Sweden",
    published: "2026-11-16",
    period: "2023 – 2026",
    metrics: [
      { value: "99.8%", label: "payment success rate" },
      { value: "10,000+", label: "active users" },
      { value: "<200 ms", label: "API response time" },
    ],
    challenge:
      "Helpicon matches people with vetted local helpers. The platform had to take payments in two systems, split commissions automatically, keep chat private between parties and deploy safely — with a small team.",
    approach: [
      "Connected Stripe and Swish (Sweden's mobile payment app), with the platform's commission split off automatically, paid subscription tiers, and refunds handled end to end.",
      "Cut chat messaging costs (Twilio) by 90% by moving every conversation onto one shared service, while keeping each chat private to its two parties.",
      "Made the app's server responses 2–3x faster, to under 200 ms, by sending only the data each screen needs, caching, and better database indexes.",
      "Set the servers to grow from 2 to 10 copies when traffic rises, and ran the database across two data centres with automatic backups.",
      "Deployed the payment service on Kubernetes with automatic builds, kept testing and live systems in separate AWS accounts, and wrote all the infrastructure as code in Terraform.",
    ],
    stack: ["Node.js", "PostgreSQL", "Prisma", "Stripe", "Swish", "Twilio", "AWS ECS", "AWS EKS", "Terraform", "Jenkins", "Docker"],
    shots: [
      {
        src: "/images/work/helpicon1.webp",
        alt: "Helpicon mobile app home screen with helper categories and popular helpers",
        width: 1290,
        height: 2796,
      },
      {
        src: "/images/work/helpicon2.webp",
        alt: "Helpicon mobile app screen from the App Store listing",
        width: 1290,
        height: 2796,
      },
    ],
  },
  {
    slug: "palmetto-data-warehouse",
    charts: [
      {
        type: "beforeAfter",
        title: "Manual reporting effort",
        before: { value: 100, display: "100%" },
        after: { value: 30, display: "30%" },
        change: "70% less",
      },
    ],
    hardParts: [
      {
        title: "Schema changes without an empty table",
        body: "The source databases were still being developed, so columns and tables changed under the pipelines. Each load compares schemas first; when they differ it builds a staging table, loads it, then swaps it in — the warehouse never has a moment without the table.",
        figure: {
          src: "/images/work/diagrams/data-schema.webp",
          alt: "Diagram: load to staging, compare columns, rebuild the table in one transaction if different, and log every sync",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "Incremental loads need two things from the source",
        body: "Millions of rows a day can't be reloaded in full. Continuous sync only works when tables have an updated_at column and soft deletes; a hard-deleted row simply vanishes and the warehouse never learns it is gone. Tables were sorted into daily or weekly loads by size.",
      },
    ],
    video: { id: "qYOXeFOOdjY", start: 10 },
    client: "Palmetto Air Balance",
    name: "One warehouse for a $40M project portfolio",
    title: "Palmetto: Azure Data Warehouse for NetSuite, UKG and Air1",
    description:
      "An Azure data warehouse joining NetSuite, UKG and Air1 that gives leadership real-time visibility into a $40M+ portfolio, with 70% less manual reporting.",
    service: "data-engineering",
    role: "Data engineer",
    region: "United States",
    published: "2026-11-16",
    period: "2024 – 2026",
    metrics: [
      { value: "$40M+", label: "portfolio made visible" },
      { value: "1M+", label: "records loaded a day" },
      { value: "70%", label: "less manual reporting" },
    ],
    challenge:
      "Revenue lived in NetSuite, projects in Air1 and labour in UKG. Leadership waited days for backlog and utilisation reports that were assembled by hand and rarely agreed.",
    approach: [
      "Built a central Azure SQL database fed by about 10 automated Data Factory pipelines, matching projects, invoices and hours across the three systems so the money adds up.",
      "Wrote one reusable update procedure that works for any table, records what failed and why, and emails an alert when a load breaks.",
      "Handles over a million records a day, and reports still load in under a second.",
      "Delivered Power BI dashboards for revenue, backlog and utilisation, with automated weekly backlog snapshots for trends.",
    ],
    stack: ["Azure Data Factory", "Azure SQL", "T-SQL", "Power BI", "NetSuite", "UKG", "REST APIs"],
    shots: [
      {
        src: "/images/work/palmetto3.webp",
        alt: "Backlog dashboard mock-up with total backlog, change orders and backlog by location",
        width: 2180,
        height: 1666,
      },
      {
        src: "/images/work/palmetto1.webp",
        alt: "Productivity dashboard mock-up with project status and performance by office",
        width: 2180,
        height: 1764,
      },
    ],
  },
  {
    slug: "pink-chicken-retail-data",
    charts: [
      {
        type: "beforeAfter",
        title: "Nightly load procedure",
        before: { value: 240, display: "4 h" },
        after: { value: 30, display: "~30 min" },
        change: "8x faster",
        source: "After splitting one procedure into six or seven steps, each logging its progress.",
      },
      {
        type: "beforeAfter",
        title: "Azure Monitor cost per month",
        before: { value: 1000, display: "$1,000" },
        after: { value: 0.1, display: "$0.10" },
        change: "~$12,000 a year saved",
      },
    ],
    hardParts: [
      {
        title: "The 1–3% that took four months",
        body: "Gift cards and test orders explained part of the gap between Shopify's reports and the warehouse, but not all of it, and Shopify support couldn't say why. The answer was in GraphQL's order-change history, which the REST API doesn't expose: gift cards issued as refunds and then spent were being counted twice.",
        figure: {
          src: "/images/work/diagrams/data-reconcile.webp",
          alt: "Diagram: tracing a 1–3% sales gap through Shopify support and GraphQL order history to gift cards sold, refunded onto cards and spent",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "A four-hour procedure",
        body: "One procedure loaded products, sales, refunds, tags, vendors and pricing at once. It grew from 30 minutes to four hours as tables were added. Split into six or seven procedures over a shared base table, each logging which step it reached, it runs in about 30 minutes.",
        figure: {
          src: "/images/work/diagrams/data-steps.webp",
          alt: "Diagram: one query joining ten tables grew to over four hours; one parent now calls small procedures, one or two tables each",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "Columns you can't index",
        body: "Data Factory stores all text in a column type SQL Server can't index, so searches were slow. Each column was resized to the longest value it really holds, and product tags — up to 40 per product, in two formats — moved into their own table so they can be searched quickly.",
        figure: {
          src: "/images/work/diagrams/data-tags.webp",
          alt: "Diagram: product tags moved from one long text column into a table with one row per tag, indexed on tag and product",
          width: 1600,
          height: 900,
        },
      },
    ],
    video: { id: "qYOXeFOOdjY", start: 165 },
    client: "Pink Chicken",
    name: "Retail numbers that finally match",
    title: "Pink Chicken: Shopify and Apparel Magic Data Warehouse",
    description:
      "Unified Shopify (10+ stores) and Apparel Magic in an Azure warehouse, fixed a 1–3% monthly sales gap and cut Azure Monitor costs from $1,000 to $0.10 a month.",
    service: "data-engineering",
    role: "Data engineer",
    region: "United States",
    published: "2026-11-16",
    period: "2025 – 2026",
    metrics: [
      { value: "10+", label: "stores unified" },
      { value: "1–3%", label: "sales gap closed" },
      { value: "$12K", label: "saved a year on monitoring" },
    ],
    challenge:
      "A children's clothing brand sells through 10+ shops, online and wholesale. Its shop and online sales (Shopify) and its warehouse system (Apparel Magic) never agreed, and monthly sales figures were off by 1–3%.",
    approach: [
      "Built one Azure database, fed by 50+ Data Factory pipelines, holding both Shopify and Apparel Magic data, with rules that stop online stock being counted twice.",
      "Traced the sales gap to gift-card refunds that Shopify's two APIs report differently, and rebuilt the sales figures on the one that records every change to an order.",
      "Found that stock on its way to the shops is only available from Shopify's newer API, and combined the two without breaking the daily updates.",
      "Cut the monitoring bill from about $1,000 a month to $0.10 by replacing a pile of duplicate alerts with one that fires when a pipeline fails.",
      "Added daily updates, a daily stock snapshot for trends, and stock valued three ways: at cost for finance, at retail price for online, and at wholesale price.",
    ],
    stack: ["Azure Data Factory", "Azure SQL", "Shopify GraphQL", "Apparel Magic", "Python", "T-SQL", "Power BI"],
    shots: [
      {
        src: "/images/work/pinkchicken1.webp",
        alt: "Retail business intelligence dashboard mock-up with sales, returns and sales by channel",
        width: 2200,
        height: 2494,
      },
    ],
  },
  {
    slug: "ecommerce-intelligence-etl",
    charts: [
      {
        type: "beforeAfter",
        title: "Catalogue coverage per run",
        before: { value: 15, display: "~15%" },
        after: { value: 75, display: "75%+" },
        change: "5x coverage",
      },
    ],
    hardParts: [
      {
        title: "An API that stops at page ten",
        body: "Keepa returns at most ten pages per query, so one query sees a fraction of a brand's catalogue. Running six different sort orders and de-duplicating the results lifted coverage from about 15% to over 75%.",
        figure: {
          src: "/images/work/diagrams/data-snowpark.webp",
          alt: "Diagram: Keepa, ScaleSERP and SmartyStreets feed Snowpark stored procedures in Snowflake, with batched writes, safe re-runs and a run log",
          width: 1600,
          height: 900,
        },
      },
      {
        title: "Is this seller legitimate?",
        body: "For each product the platform lists who is selling it, then checks each seller against Google results and a verified address (ScaleSERP and SmartyStreets) and ranks them — helping brands find unauthorised sellers.",
      },
      {
        title: "Debugging code you can't step into",
        body: "Python running inside a Snowflake procedure has no console. Every procedure writes its progress — started, 10% done, rows loaded, finished — to a log table, which made failures traceable.",
      },
    ],
    video: { id: "qYOXeFOOdjY", start: 684 },
    client: "E-commerce intelligence platform",
    name: "From 15% to 75% catalogue coverage on Snowflake",
    title: "Snowflake and Snowpark ETL for E-commerce Product Data",
    description:
      "An idempotent Snowflake and Snowpark ETL enriching 50k–100k+ products per run from Keepa and ScaleSERP — 5x the catalogue coverage and 10–20x faster loads.",
    service: "data-engineering",
    role: "Data engineer",
    region: "United States",
    published: "2026-11-16",
    period: "2025",
    metrics: [
      { value: "75%+", label: "catalogue coverage, up from 15%" },
      { value: "10–20x", label: "faster database loads" },
      { value: "100k+", label: "products per run" },
    ],
    challenge:
      "Keepa's API returns only a limited number of results per search, so the pipeline saw about 15% of each brand's catalogue — and saving one row at a time made every run slow.",
    approach: [
      "Ran each search six ways, sorted differently, and removed the duplicates — coverage rose to over 75% per run.",
      "Saved rows in large batches instead of one at a time, making loads 10–20x faster.",
      "Stored the API's loosely structured data in one consistent shape, and kept within the API's usage limits.",
      "Made every run safe to repeat without creating duplicates, and kept the database structure in version control.",
    ],
    stack: ["Snowflake", "Snowpark", "Python", "Keepa API", "ScaleSERP", "pytest"],
    shots: [],
  },
  {
    slug: "cvr-sports-analytics",
    hardParts: [
      {
        title: "Thousands of events per match file",
        body: "Each match arrives as a ~3 MB XML file with 3,000–4,000 events. Re-reading hundreds of files for every report isn't possible, so the useful statistics are computed once, at upload, and stored — reports read the results, not the raw events.",
      },
      {
        title: "Excel reports to automatic ones",
        body: "Analysts used to build team and player reports by hand in spreadsheets. They now come from the platform directly, filterable by competition, season, team and match, with PDF export for every view.",
      },
    ],
    video: { id: "3rp6xjwwaK0", start: 283 },
    client: "CVR Sports Analytics",
    name: "Rugby league analytics that answer in seconds",
    title: "CVR: Rugby League Analytics Platform (Node, MongoDB, Angular)",
    description:
      "A rugby league analytics platform for NRL, Super League and NSW Cup: KPIs computed once at ingestion, fast MongoDB reports and an Angular 9 to 17 upgrade.",
    service: "full-stack-development",
    role: "Full-stack and data engineer",
    region: "Australia",
    published: "2026-11-16",
    period: "2022 – present",
    metrics: [
      { value: "3", label: "competitions covered" },
      { value: "9 → 17", label: "Angular versions upgraded" },
      { value: "1×", label: "KPIs computed per match, not per query" },
    ],
    challenge:
      "Coaches and analysts needed team and player reports across NRL, Super League and NSW Cup. Recomputing metrics from raw match events on every report made queries slow and complex.",
    approach: [
      "Calculated each match's statistics once, when the match file is uploaded, and stored them per player, team, quarter and 10-minute window — reports read the results instead of recalculating.",
      "Sped up the database (MongoDB) with indexes that match how reports really read data, and time limits on the heaviest queries.",
      "Led the upgrade from Angular 9 to 17, removed an outdated security workaround, and fixed the data tables the upgrade broke.",
      "Added PDF export to every report, and match uploads that process in the background so nobody waits.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Angular 17", "AG Grid", "jsPDF"],
    shots: [
      {
        src: "/images/work/cvr1.webp",
        alt: "CVR team comparison report ranking NRL teams by metres, tackle breaks and errors",
        width: 1600,
        height: 983,
      },
      {
        src: "/images/work/cvr2.webp",
        alt: "CVR rugby league analytics report view",
        width: 1360,
        height: 820,
      },
    ],
  },
  {
    slug: "carlister-pricing-platform",
    hardParts: [
      {
        title: "An unlimited API needs your own limits",
        body: "The listings provider allowed unlimited calls, so a bug could loop millions of times and run up thousands of dollars. The system has its own circuit breakers: a cap on calls per run, a stop after repeated failures, and an email alert when either trips.",
      },
      {
        title: "Cron jobs that took the database down",
        body: "Scheduled refreshes opened more connections than the managed PostgreSQL allowed, and queries started timing out. One shared Prisma client behind PgBouncer, with a fixed connection limit, fixed it.",
        figure: {
          src: "/images/work/diagrams/carlister-connections.webp",
          alt: "Code: one shared Prisma client per service behind PgBouncer, and the script used to diagnose active Postgres connections",
          width: 1600,
          height: 1000,
        },
      },
    ],
    video: { id: "3rp6xjwwaK0", start: 19 },
    client: "CarLister",
    name: "Automotive pricing intelligence from six data providers",
    title: "CarLister: Automotive Pricing Platform in Next.js and Express",
    description:
      "A Next.js and Express platform joining six automotive data providers into one search, valuation and deal-alert workflow, with four cache layers to cut API costs.",
    service: "full-stack-development",
    role: "Full-stack engineer",
    region: "United States",
    published: "2026-11-16",
    period: "2025",
    metrics: [
      { value: "6", label: "data providers integrated" },
      { value: "4", label: "cache layers" },
      { value: "21", label: "API endpoints" },
    ],
    challenge:
      "Dealers were checking MarketCheck, vAuto, MMR, Carfax and others by hand to decide whether a car was a good deal — one search at a time.",
    approach: [
      "Joined six providers (MarketCheck, vAuto, AccuTrade, MMR, Carfax, SendGrid) into one search, valuation and alert flow.",
      "Built a deal finder whose price source and rules can be changed in settings, without releasing new code.",
      "Turned saved searches into scheduled jobs: fetch new listings, add prices, score each deal and email the good ones.",
      "Added four layers of caching so the same paid data isn't fetched twice, and fixed the database running out of connections.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "TanStack Query", "Express 5", "Prisma", "PostgreSQL", "SendGrid"],
    shots: [
      {
        src: "/images/work/carlister-app.webp",
        alt: "Good Deals page listing cars priced under their MMR and vAuto valuations, with the price difference for each",
        width: 1400,
        height: 900,
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return WORK.find((w) => w.slug === slug);
}

export function workForService(slugs: string[]) {
  return slugs.map((s) => getCaseStudy(s)).filter((w): w is CaseStudy => Boolean(w));
}

// Earlier and smaller projects, shown as a list on /work.
export const MORE_PROJECTS: {
  name: string;
  summary: string;
  stack: string[];
  shot?: Shot;
}[] = [
  {
    name: "Helpicon mobile app",
    summary: "React Native app for the Swedish services marketplace: Twilio chat, Agora video calls, Google Maps, secure payments, tasks and reviews. Published on the App Store and Google Play.",
    stack: ["React Native", "Twilio", "Agora", "Google Maps"],
  },
  {
    name: "LegacySuite",
    summary: "Digital legacy and estate planning: wills, beneficiaries, secure password sharing and non-custodial crypto wallet monitoring, with role-based access.",
    stack: ["Angular", "NestJS", "PostgreSQL", "Web3.js"],
    shot: {
      src: "/images/work/legacysuite.webp",
      alt: "LegacySuite home page with the legacy planning dashboard",
      width: 1600,
      height: 871,
    },
  },
  {
    name: "CHAINSCAN NFT explorer",
    summary: "Ethereum NFT analytics: millions of records indexed from Alchemy into PostgreSQL with composite indexes, plus Web3 sign-in and wallet connection.",
    stack: ["Next.js", "PostgreSQL", "Alchemy", "Web3.js"],
  },
  {
    name: "FashionXotics",
    summary: "High-volume fashion store with server-rendered listings hydrated into Redux, large size and colour matrices, fast filters and Stripe and PayPal checkout.",
    stack: ["Next.js", "Redux", "Strapi", "Stripe"],
  },
  {
    name: "ResIhop carpooling app",
    summary: "Ride-sharing app matching drivers and passengers: route planning and distance with Google Maps, recurring schedules, ride matching and in-app messages.",
    stack: ["React Native", "Node.js", "PostgreSQL", "Google Maps"],
  },
  {
    name: "Facebook group automation",
    summary: "Headless Playwright pipeline that collects engagement points across Facebook groups, handles device-based 2FA, runs five pages in parallel and syncs results to a back end.",
    stack: ["Node.js", "Playwright"],
  },
  {
    name: "Amazon catalogue operations",
    summary: "Automation for a 130,000+ product Amazon catalogue: inventory updates, listing SEO, shipment tracking and pricing analysis with Keepa data.",
    stack: ["Python", "Node.js", "Amazon APIs", "Keepa"],
  },
];
