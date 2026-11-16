export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** <title> — subject first, at most ~60 chars with the name suffix. */
  title: string;
  /** Meta description, ~150–160 chars, answer first. */
  description: string;
  h1: string;
  /** One line for cards. */
  summary: string;
  intro: string;
  forYouIf: string[];
  deliverables: { title: string; body: string }[];
  stack: string[];
  work: string[];
  faqs: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: "full-stack-development",
    name: "Full-stack web development",
    title: "Full-Stack Developer for Hire — Next.js, Node, AWS",
    description:
      "Hire a senior full-stack developer to build or rescue your product: Next.js and Node.js apps, technical SEO and Core Web Vitals, payments and AWS deployment.",
    h1: "Full-stack development for SaaS products",
    summary: "Next.js front ends, Node.js and NestJS APIs, payments and the AWS they run on — built or rescued.",
    intro:
      "I design, build and ship complete web products — the interface, the API, the database and the cloud it runs on. Greenfield builds or taking over a codebase that has stalled, I own it end to end and leave it documented.",
    forYouIf: [
      "Your site is slow or invisible on Google and you need it fixed at the code level.",
      "You need an MVP built properly the first time, not rewritten in six months.",
      "Your app works but is slow, fragile or expensive to run.",
      "You need payments, messaging or third-party integrations done right.",
      "Your previous developer left and nobody understands the codebase.",
    ],
    deliverables: [
      {
        title: "Web apps in Next.js and React",
        body: "Server-rendered, fast and accessible front ends with TypeScript, TanStack Query and a design system that scales.",
      },
      {
        title: "APIs and back ends",
        body: "Node.js, NestJS and Express services on PostgreSQL with Prisma or TypeORM, role-based access and audit trails.",
      },
      {
        title: "Payments and integrations",
        body: "Stripe, Swish and PayPal flows with webhooks, commission splits and subscriptions; Twilio, SendGrid and partner APIs.",
      },
      {
        title: "Technical SEO and Core Web Vitals",
        body: "Server-rendered pages, structured data, sitemaps and Lighthouse scores in the high 90s — one store went from 137 to 8,020 weekly Google impressions.",
      },
      {
        title: "Cloud, CI/CD and DevOps",
        body: "AWS (ECS, EKS, RDS, S3, Lambda) with Terraform, Docker and automated pipelines — repeatable deploys and real monitoring.",
      },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "Terraform",
      "Docker",
      "Stripe",
    ],
    work: ["brickdistrict-seo-ecommerce", "insurance-lead-gen-sites", "helpicon-marketplace", "carlister-pricing-platform"],
    faqs: [
      {
        q: "Can you take over an existing codebase?",
        a: "Yes — most of my engagements start that way. I begin with a short audit of the architecture, deploys and the riskiest parts of the code, then fix what blocks you before adding features.",
      },
      {
        q: "Do you handle hosting and deployment?",
        a: "Yes. I set up AWS or Vercel infrastructure as code with Terraform, CI/CD pipelines and monitoring, so deploys are automatic and reversible.",
      },
      {
        q: "How do we work together across time zones?",
        a: "I work remotely with clients in the US, UK, Europe and Australia, with regular written updates and overlap hours for calls. You get access to the repository and the board from day one.",
      },
      {
        q: "Do you work through Upwork or directly?",
        a: "Either. Many clients start on Upwork for the payment protection and move to a direct contract later.",
      },
    ],
  },
  {
    slug: "ai-integration",
    name: "AI integration",
    title: "AI Integration Developer — OpenAI, LangChain, RAG",
    description:
      "Add AI features that earn their cost: OpenAI and LangChain integrations, semantic search and recommendations with vector databases, and LLM cost reduction.",
    h1: "AI integration for products that need to stay affordable",
    summary: "OpenAI and LangChain features — matching, search, summaries — with the cost per user kept in check.",
    intro:
      "I add AI features to real products — matching, recommendations, summarisation and search — and keep the bill under control. On one platform I cut LLM spend by 95% without losing output quality.",
    forYouIf: [
      "You want AI features in an existing product, not a demo that breaks in production.",
      "Your OpenAI bill is growing faster than your users.",
      "You need search or recommendations that understand meaning, not keywords.",
      "You want summaries, digests or automation built on your own data.",
    ],
    deliverables: [
      {
        title: "LLM features in your product",
        body: "OpenAI GPT and LangChain features wired into your back end with prompt versioning, guardrails, retries and logging.",
      },
      {
        title: "Semantic search and matching",
        body: "Embeddings and vector databases such as Pinecone for recommendations, matching and retrieval-augmented generation (RAG).",
      },
      {
        title: "Cost and quality control",
        body: "Model selection, token limits and per-feature cost tracking so every AI feature has a known price per user.",
      },
      {
        title: "Automation pipelines",
        body: "Scheduled jobs that summarise conversations, classify content and generate reports from your data.",
      },
    ],
    stack: ["OpenAI", "LangChain", "Pinecone", "Embeddings", "RAG", "NestJS", "Python", "PostgreSQL"],
    work: ["wesion-ai-matching", "helpicon-marketplace"],
    faqs: [
      {
        q: "Which AI models do you work with?",
        a: "Mostly OpenAI's GPT models through the API, orchestrated with LangChain, and vector databases such as Pinecone. I pick the cheapest model that meets the quality bar for each feature.",
      },
      {
        q: "How did you cut LLM costs by 95%?",
        a: "By measuring each feature separately, moving tasks that did not need a reasoning model to a smaller one, limiting tokens per use case and tuning temperature — then checking output quality against the old results.",
      },
      {
        q: "Can you add AI to my existing app?",
        a: "Yes. AI features are usually a new service or module beside your current back end, so they can be added without a rewrite.",
      },
      {
        q: "Is my data sent to OpenAI used for training?",
        a: "Data sent through the OpenAI API is not used to train their models by default. I also keep personal data out of prompts where it is not needed.",
      },
    ],
  },
  {
    slug: "data-engineering",
    name: "Data engineering",
    title: "Data Engineer for Hire — Azure Data Factory, Snowflake",
    description:
      "Freelance data engineer for warehouses and ETL: Azure Data Factory, Azure SQL, Snowflake and Power BI. One trusted source of numbers across Shopify, NetSuite and more.",
    h1: "Data engineering: one source of truth for your numbers",
    summary: "Warehouses and ETL on Azure Data Factory and Snowflake, so every team reads the same numbers.",
    intro:
      "I build data warehouses and ETL pipelines that pull your ERP, e-commerce and operations systems into one model — so finance, operations and leadership read the same numbers, refreshed automatically.",
    forYouIf: [
      "Your reports are assembled by hand in spreadsheets every week.",
      "Shopify, NetSuite and your other systems disagree about the same sale.",
      "Dashboards are slow or nobody trusts them.",
      "Your cloud data bill is higher than it should be.",
    ],
    deliverables: [
      {
        title: "Data warehouses",
        body: "Dimensional models (facts, dimensions, snapshots) on Azure SQL or Snowflake, designed around the questions the business asks.",
      },
      {
        title: "ETL and ELT pipelines",
        body: "Azure Data Factory and Snowpark pipelines with incremental loads, MERGE logic, schema-drift handling and alerting.",
      },
      {
        title: "Integrations",
        body: "Shopify (REST and GraphQL), NetSuite, UKG, Apparel Magic, Keepa and other APIs reconciled into one model.",
      },
      {
        title: "Dashboards and reporting",
        body: "Power BI dashboards for revenue, backlog, inventory and utilisation with automated weekly snapshots.",
      },
    ],
    stack: ["Azure Data Factory", "Azure SQL", "T-SQL", "Snowflake", "Snowpark", "Python", "Power BI", "Databricks"],
    work: ["palmetto-data-warehouse", "pink-chicken-retail-data", "ecommerce-intelligence-etl"],
    faqs: [
      {
        q: "Which data platforms do you use?",
        a: "Azure Data Factory with Azure SQL for most warehouse builds, Snowflake with Snowpark (Python) for large catalogue and enrichment pipelines, and Power BI for reporting.",
      },
      {
        q: "Can you fix numbers that do not match between systems?",
        a: "Yes. On one retail project I traced a 1–3% monthly sales gap to gift-card refunds that Shopify's REST and GraphQL APIs classify differently, and rebuilt the pipeline to reconcile them.",
      },
      {
        q: "How long does a data warehouse take?",
        a: "A first version covering one or two source systems and the key reports is usually a few weeks. Each further source is added as its own increment.",
      },
      {
        q: "Will it be expensive to run?",
        a: "Cost is part of the design. On one Azure project I cut monitoring costs from about $1,000 a month to $0.10 by removing redundant alert rules.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
