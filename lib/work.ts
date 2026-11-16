export type Shot = { src: string; alt: string; width: number; height: number };

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
};

export const WORK: CaseStudy[] = [
  {
    slug: "wesion-ai-matching",
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
    client: "Helpicon",
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
  },
  {
    slug: "palmetto-data-warehouse",
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
  {
    slug: "pink-chicken-retail-data",
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
  {
    slug: "carlister-pricing-platform",
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
