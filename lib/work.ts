export type Shot = { src: string; alt: string; width: number; height: number };

type Point = { value: number; display: string };
export type Chart =
  | { type: "beforeAfter"; title: string; before: Point; after: Point; change?: string; source?: string }
  | { type: "series"; title: string; points: (Point & { label: string })[]; source?: string };

export type CaseStudy = {
  slug: string;
  client: string;
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
  hardParts?: { title: string; body: string }[];
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
      "BrickDistrict sells rare and retired LEGO sets. In September 2026 the page-builder site scored 56 on mobile Lighthouse with a 9.7-second LCP and 14 MB home page, only 6 of 402 products had a description, Google had indexed 175 of 507 sitemap URLs, and the store had about 19 organic clicks in two months.",
    approach: [
      "Replaced the Beaver Builder site with a custom WordPress theme: mobile Lighthouse went from 60 to 98 on the home page (LCP 9.1 s to 2.2 s, 5.2 MB to 0.83 MB), 62 to 100 on categories and 71 to 99 on products — with a clean before-and-after SEO comparison across 519 pages.",
      "Extended Product, Offer and BreadcrumbList structured data with brand, GTIN and return policy, wrote search titles that carry each set's status, and kept thin category pages out of the index.",
      "Wrote a real description for all 402 products, generated from LEGO's own set text, and published 21 buying guides that now earn most of the store's search impressions.",
      "Set up Search Console, GA4 e-commerce events, Bing Webmaster Tools, IndexNow, a Google Merchant Center feed and single-hop 301 redirects for every old URL.",
      "Built the catalogue back end in Python and FastAPI on AWS (EC2, DynamoDB, CloudFront, SSM): retirement dates from Brickset, a daily site-health alarm, and product writes cut from about 34 s to 1.9 s.",
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
      "Redesigned the multi-tenant Next.js template that renders every agency's site on its own domain: quote forms, a mobile call bar, estimate calculators, lead tracking and new site types.",
      "Built AI page generation that writes one section at a time and validates and corrects its own output, plus automatic repair of broken links in published content.",
      "Generated location and policy pages programmatically, with a queue that rewrites internal links when a page changes and redirects for retired URLs.",
      "Pulled Search Console, SE Ranking, BrightLocal, GA4, Bing and Clarity data into one pipeline behind a site-performance dashboard, and submitted 2,342 URLs to Bing through IndexNow.",
      "Shipped it as 128 pull requests across 15 repositories; as of 15 November 27 of 142 tracked keywords rank on page one, including one at #1.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel", "Express", "OpenAI", "Search Console API", "IndexNow", "Stripe"],
    shots: [],
  },
  {
    slug: "the-gala-events-marketplace",
    client: "The Gala",
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
      "Recreated the missing database migrations so every environment can be rebuilt to match, on AWS Elastic Beanstalk with MySQL on RDS and files on S3, deployed automatically.",
      "Rebuilt checkout around card payments through MyFatoorah and Tabby and Tamara buy-now-pay-later, with the server — never the app — deciding the amount and confirming payment.",
      "Added the money side a marketplace needs: provider payouts per booking, a hold when a provider's bank account changes, and refunds as records with a status and a full history.",
      "Built booking rules for real events: one confirmed booking per offer and time slot, provider unavailable days, home-visit addresses and reminders the day before.",
      "Reskinned the provider and admin dashboards in React through Laravel and Inertia, serving two Flutter apps from the same API, with 867 automated tests guarding every change.",
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
    ],
    shots: [],
  },
  {
    slug: "wesion-ai-matching",
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
      "Designed and built the NestJS back end from scratch on TypeORM and PostgreSQL, deployed on AWS, with a Python Lambda compressing uploaded images and video on S3.",
      "Built 11 AI services — semantic matching, video recommendations, goal suggestions, content analysis and chat summarisation — on OpenAI GPT and LangChain.",
      "Stored each member's strengths, weaknesses, interests, values and keywords in separate Pinecone namespaces, so matches compare like with like.",
      "Measured cost per feature, moved tasks that did not need a reasoning model from o1-mini to gpt-4o-mini, and set token limits of 300–2,000 per use case — 95% cheaper with output quality held.",
      "Added a weekly NestJS cron that summarises each 7-day conversation window into a narrative and action items, with REST endpoints for on-demand digests.",
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
    video: { id: "3rp6xjwwaK0", start: 166 },
    client: "Helpicon",
    name: "A Swedish services marketplace with 99.8% payment success",
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
      },
      {
        title: "A chatbot that never touches the database directly",
        body: "General questions about the platform are answered from documentation through RAG. Questions about a member's own data go through one narrow function per question type, so the model can never compose its own queries against production.",
      },
      {
        title: "The cheapest model that does the job",
        body: "One day of unexpected API cost led to measuring every feature on its own. Most tasks didn't need a reasoning model; moving them to a smaller one with token limits cut spend by 95% without a drop in output quality.",
      },
    ],
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
      "Integrated Stripe and Swish (Nordic mobile payments) with automatic commission splits, subscription tiers and webhook handlers for payments, subscriptions and refunds.",
      "Cut Twilio messaging costs by 90% with a shared Conversations service, multi-tenant isolation and S3 attachments.",
      "Made the API 2–3x faster — under 200 ms — with field projection, caching and composite indexes; database queries under 50 ms.",
      "Ran ECS with auto-scaling (2 to 10 tasks at 70% CPU) and Multi-AZ RDS PostgreSQL with automated backups.",
      "Deployed the payment microservice on EKS with Jenkins and Kaniko across three AWS accounts (DevOps, staging, production), all in Terraform, with Prisma migrations on every deploy.",
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
  },
  {
    slug: "palmetto-data-warehouse",
    video: { id: "qYOXeFOOdjY", start: 10 },
    client: "Palmetto Air Balance",
    name: "One warehouse for a $40M project portfolio",
    title: "Palmetto: Azure Data Warehouse for NetSuite, UKG and Air1",
    description:
      "An Azure data warehouse joining NetSuite, UKG and Air1 with 50+ Data Factory pipelines — real-time visibility into a $40M+ portfolio and 70% less manual reporting.",
    service: "data-engineering",
    role: "Data engineer",
    region: "United States",
    published: "2026-11-16",
    period: "2024 – 2026",
    metrics: [
      { value: "$40M+", label: "portfolio made visible" },
      { value: "50+", label: "Data Factory pipelines" },
      { value: "70%", label: "less manual reporting" },
    ],
    challenge:
      "Revenue lived in NetSuite, projects in Air1 and labour in UKG. Leadership waited days for backlog and utilisation reports that were assembled by hand and rarely agreed.",
    approach: [
      "Built an Azure SQL warehouse fed by 50+ Azure Data Factory pipelines, with key mapping and financial reconciliation across the three systems.",
      "Wrote dynamic MERGE procedures that detect primary keys, catch and categorise errors, log at pipeline and database level and email alerts.",
      "Processed 1M+ records a day with sub-second queries using composite indexes, partitioning and materialised views.",
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
      },
      {
        title: "Incremental loads need two things from the source",
        body: "Millions of rows a day can't be reloaded in full. Continuous sync only works when tables have an updated_at column and soft deletes; a hard-deleted row simply vanishes and the warehouse never learns it is gone. Tables were sorted into daily or weekly loads by size.",
      },
    ],
  {
    slug: "pink-chicken-retail-data",
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
      "A fashion brand selling through 10+ retail stores, e-commerce and wholesale could not reconcile Shopify with its Apparel Magic warehouse system, and monthly sales were off by 1–3%.",
    approach: [
      "Built an Azure warehouse unifying Shopify and Apparel Magic, with virtual-warehouse logic that stops inventory being counted twice.",
      "Traced the sales gap to gift-card refunds that Shopify's REST and GraphQL APIs classify differently, and rebuilt reconciliation on the GraphQL order-changes API.",
      "Found that incoming stock exists only in Shopify's GraphQL API and merged both endpoints without breaking incremental loads.",
      "Cut Azure Monitor from about $1,000 a month to $0.10 by replacing redundant rules with one essential failure alert.",
      "Added daily incremental loads, inventory snapshots and a dimensional model valuing stock at cost, retail and wholesale.",
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
    video: { id: "qYOXeFOOdjY", start: 684 },
    client: "E-commerce intelligence platform",
    name: "From 15% to 75% catalogue coverage on Snowflake",
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
      },
      {
        title: "A four-hour procedure",
        body: "One procedure loaded products, sales, refunds, tags, vendors and pricing at once. It grew from 30 minutes to four hours as tables were added. Split into six or seven procedures over a shared base table, each logging which step it reached, it runs in about 30 minutes.",
      },
      {
        title: "Columns you can't index",
        body: "Data Factory writes text as nvarchar(max), which SQL Server can't index. Each column was profiled for its real length and resized; product tags, up to 40 per product in two different formats, moved into their own table so they could be indexed and searched.",
      },
    ],
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
      "Keepa's API returns a limited window of results per query, so a single ingestion strategy saw only about 15% of each catalogue — and row-by-row inserts made every run slow.",
    approach: [
      "Built a pagination engine with six configurable sort strategies and a global de-duplication set, lifting coverage to 75%+ per run.",
      "Replaced row-by-row inserts with batched INSERT … UNION ALL statements for a 10–20x faster load.",
      "Modelled semi-structured API payloads as canonical entities and attributes, with token-based rate limiting.",
      "Made every procedure idempotent so runs can be repeated safely, and versioned the Snowflake schema in git.",
    ],
    stack: ["Snowflake", "Snowpark", "Python", "Keepa API", "ScaleSERP", "pytest"],
    shots: [],
  },
  {
    slug: "cvr-sports-analytics",
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
    period: "2022 – 2026",
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
    metrics: [
      { value: "3", label: "competitions covered" },
      { value: "9 → 17", label: "Angular versions upgraded" },
      { value: "1×", label: "KPIs computed per match, not per query" },
    ],
    challenge:
      "Coaches and analysts needed team and player reports across NRL, Super League and NSW Cup. Recomputing metrics from raw match events on every report made queries slow and complex.",
    approach: [
      "Moved to a CQRS-style design: KPIs are computed once when a match XML file is ingested and stored at player, team, quarter and 10-minute grain.",
      "Tuned MongoDB with compound indexes on real access patterns, parallel reads, lean queries and guarded aggregation pipelines.",
      "Led the Angular 9 to 17 upgrade, removing the legacy OpenSSL dependency and fixing AG Grid regressions.",
      "Built PDF export for every report view, and asynchronous XML uploads with background processing.",
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
        width: 1600,
        height: 983,
      },
    ],
  },
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
  {
    slug: "carlister-pricing-platform",
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
      "Built a deal engine whose pricing source and thresholds are switched in the database, without a redeploy.",
      "Turned saved searches into scheduled pipelines: refresh listings, enrich with pricing, score deals and email alerts.",
      "Added four cache layers with negative-result caching, and fixed PostgreSQL connection exhaustion with a shared Prisma client and PgBouncer.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "TanStack Query", "Express 5", "Prisma", "PostgreSQL", "SendGrid"],
    shots: [],
  },
];

export function getCaseStudy(slug: string) {
  return WORK.find((w) => w.slug === slug);
}

export function workForService(slugs: string[]) {
  return slugs.map((s) => getCaseStudy(s)).filter((w): w is CaseStudy => Boolean(w));
}
    hardParts: [
      {
        title: "An unlimited API needs your own limits",
        body: "The listings provider allowed unlimited calls, so a bug could loop millions of times and run up thousands of dollars. The system has its own circuit breakers: a cap on calls per run, a stop after repeated failures, and an email alert when either trips.",
      },
      {
        title: "Cron jobs that took the database down",
        body: "Scheduled refreshes opened more connections than the managed PostgreSQL allowed, and queries started timing out. One shared Prisma client behind PgBouncer, with a fixed connection limit, fixed it.",
      },
    ],
