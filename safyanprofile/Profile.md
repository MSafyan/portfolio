## Muhammad Safyan — Full-Stack & Cloud Engineer (5+ years)

GitHub: github.com/MSafyan · Email: msafyan080@gmail.com · LinkedIn: linkedin.com/in/safyanakram · Phone: +92 314 994 57000 · Location: Gujranwala, Pakistan

---

## Key Metrics at a Glance

| Project | Metric |
|---------|--------|
| **Abundance AI** | 95% AI cost reduction via model selection; 11 specialized AI services; chat summarization across 7-day windows via NestJS cron |
| **Helpicon Platform** | 10,000+ active users · 500+ verified providers · 99.8% payment success rate · API p50 <200ms · DB queries <50ms |
| **Helpicon DevOps** | Deployment time cut 75% (45 min → 11 min) · Uptime 99.7% → 99.95% · MTTR 2h → 15 min · Docker image 1.2 GB → 180 MB · 30% AWS cost saving |
| **Palmetto Air Balance** | 50+ ADF pipelines · $40M+ portfolio visibility · 60% less manual processing · days-to-minutes reporting · 1M+ records/day at sub-second latency |
| **Pink Chicken** | Azure Monitor cost $1,000/mo → $0.10/mo (~$12K/year saved) · 10+ retail locations unified · Resolved 1–3% sales-data divergence via GraphQL root-cause analysis |
| **EcomInvestigator** | 50k–100k+ products/run · catalog coverage ~15% → ~75%+ with multi-strategy pagination · 10–20x faster DB loads · idempotent Snowpark ETL |
| **CarLister** | 112 TS/TSX files · 21 API endpoints · 6 external integrations · 4 cache layers · cron-driven good-deal engine with configurable pricing-source switching |

---

## Professional Summary

Full‑stack engineer with end‑to‑end ownership across frontend, backend, data, and cloud. I design and deliver scalable SaaS applications, data platforms, and AI features with a strong emphasis on reliability, cost optimization, and security. I’ve led greenfield builds and taken over existing systems, implementing clean architectures, DevOps automation, CI/CD, and observability.

---

## Certifications

- AWS Certified Solutions Architect – Associate (2024)
  Verified: https://www.credly.com/badges/9f649e53-5fca-4a2b-9d32-935d3da280f1/public_url

- HashiCorp Certified: Terraform Associate (2024)
  Verified: https://www.credly.com/badges/41cf43ff-e454-4191-8174-e54ee6856a14/public_url

- Certified Kubernetes Application Developer – CKAD (2026)
  Verified: https://www.credly.com/badges/bea98d78-b0ee-4171-9e06-146ebde91bbf/public_url

---

## Core Skills

- Full‑Stack Web: React.js, Next.js, Angular, TypeScript, Node.js, Express, NestJS
- Databases: PostgreSQL, Prisma, TypeORM, Knex, MongoDB, Mongoose, SQL optimization
- Cloud & DevOps: AWS (ECS, EKS, Elastic Beanstalk, RDS, S3), Azure, Terraform, Serverless, Docker, CI/CD (GitHub Actions, Bitbucket Pipelines, Jenkins)
- Payments & Comms: Stripe, Swish, PayPal, Twilio (Conversations)
- AI/ML: OpenAI GPT, LangChain, Pinecone (vector DB), embeddings, prompt engineering
- Data/ETL/Analytics: Azure Data Factory, Databricks/Spark, Power BI, warehousing
- Observability & Quality: Logging (Winston), monitoring (CloudWatch/Azure Monitor), testing (Jest)

---

## Tooling & Platforms

- Cloud: AWS (EC2, S3, RDS, Cognito, SES, CloudWatch), Azure (ADF, SQL, Storage, VNet)
- Infrastructure: Terraform, Serverless Framework, Kubernetes (basics), Docker
- Frontend: Next.js/React, SSR/SSG, Tailwind/CSS/Sass
- Backend: Node.js/NestJS/Express, REST APIs, microservices
- Auth: Cognito, Clerk, Auth0, Web3 auth (experience), RBAC/roles, sessions/JWT
- Data: PostgreSQL, Azure SQL, dimensional modeling (star schema), performance tuning

---

## Selected Projects

### Abundance Movement — AI Matching & Recommendations (Full‑Stack + AI)

- Built 11 specialized AI services including semantic user matching, video recommendations, personality-based goal suggestions, content analysis, and automated chat summarization
- Achieved 95% AI cost reduction by strategically switching from o1-mini to gpt-4o-mini with token limiting — maintained output quality while cutting monthly spend
- Designed a multi-index Pinecone vector architecture with namespace-based user profile storage across 5+ attributes (strengths, weaknesses, interests, values, keywords) for nuanced semantic matching
- Implemented a weekly chat summarization pipeline via NestJS cron: collects 7-day message windows, generates narrative summaries and action items via OpenAI, exposes REST endpoints for on-demand/historical digests
- Built real-time cost monitoring with sub-cent precision, model configuration utilities, and automated optimization recommendations
- Stack: NestJS, TypeScript, TypeORM, PostgreSQL, OpenAI GPT, Pinecone, LangChain

### Helpicon — Marketplace Platform (Senior Backend + DevOps)

- Engineered backend for a Swedish marketplace platform serving 10,000+ active users and 500+ verified service providers with 99.8% payment success rate
- Integrated Stripe and Swish (Nordic mobile payments) with marketplace commission logic — automatic platform fee splits, payout scheduling, webhook-driven booking state machine, and dispute handling
- Optimized API performance to p50 <200ms and database queries to <50ms; maintained zero security incidents and GDPR-compliant data workflows throughout
- Implemented Twilio Conversations for real-time messaging with multi-tenant isolation, file attachments via S3, and full message audit trail in PostgreSQL
- Built CI/CD pipeline on Bitbucket cutting deployment time by 75% (45 min → 11 min automated) and improving uptime from 99.7% to 99.95%; MTTR dropped from 2 hours to 15 minutes
- Reduced monthly AWS costs by 30% through right-sized EC2 instances and reserved capacity; optimized Docker image from 1.2 GB to 180 MB via multi-stage builds
- Stack: Node.js, PostgreSQL, AWS (ECS, RDS, S3), Stripe, Swish, Twilio, Docker, Bitbucket Pipelines

### Helpicon DevOps — Payment Service Infrastructure (EKS + Terraform + Jenkins)

- Designed and maintained a 3-account AWS strategy (DevOps / Staging / Production) with full infrastructure-as-code via Terraform covering EKS, RDS, ECR, and S3
- Implemented a Jenkins + Kaniko (ECS Fargate) build pipeline — no Docker-in-Docker, reproducible container builds triggered by git tag (staging) or main branch push (production)
- Automated Prisma database migrations as part of every deployment startup sequence, ensuring schema and application code stay in sync across environments
- Deployed two Kubernetes CronJobs for background automation: hourly payment status checks and 5-minute Workamo contractor sync — decoupled from the main API pod
- Managed Terraform remote state with S3 + DynamoDB locking; parameterized all environment differences via `.tfvars` for zero-code-change environment promotion
- Stack: Jenkins, Kaniko, AWS EKS, Terraform, ECR, RDS PostgreSQL 14, S3, Kubernetes

### Palmetto Air Balance — Enterprise Data Warehouse (Azure)

- Architected an enterprise Azure data warehouse integrating NetSuite, Air1, and UKG, providing real-time visibility into a $40M+ project portfolio
- Designed and deployed 50+ Azure Data Factory pipelines with dynamic MERGE stored procedures, self-healing schema-change detection, and automated email alerting
- Reduced manual reporting effort by 60% and cut reporting time from days to minutes; achieved 99.95% data quality score with automated validation
- Processed 1M+ records daily at sub-second query latency using optimized T-SQL, indexed star-schema models, and parallel ADF execution
- Delivered real-time Power BI dashboards for revenue, backlog, and resource utilization with weekly automated snapshots for historical trending
- Stack: Azure Data Factory, Azure SQL, Databricks/Spark, Power BI, T-SQL, REST APIs

### Pink Chicken — Retail Data Integration (Azure, Shopify, Apparel Magic)

- Unified Shopify (10+ retail stores + e-commerce) with Apparel Magic WMS into a single Azure SQL data warehouse, eliminating manual data consolidation across all channels
- Reduced Azure Monitor cost by ~99.99% — from ~$1,000/month to $0.10/month (~$12,000/year saved) by eliminating redundant alert rules with no loss of operational visibility
- Root-caused a persistent 1–3% monthly sales divergence traced to gift card refund misclassification in Shopify's REST API; resolved by querying GraphQL order-changes API and applying explicit transaction classification logic
- Resolved a REST vs. GraphQL schema mismatch for incoming inventory — a field that only existed in GraphQL — requiring pipeline redesign and cross-API field normalization
- Implemented dimensional modeling with inventory valued from cost, retail, and wholesale perspectives per location
- Stack: Azure Data Factory, Azure SQL, REST APIs (Shopify + Apparel Magic), Power BI, T-SQL

### EcomInvestigator — Snowflake/Snowpark ETL Platform (Data Engineering)

- Architected a Snowflake + Snowpark (Python) ETL platform enriching 50k–100k+ e-commerce products per run from Keepa, ScaleSERP, and other APIs into a canonical entity/attribute model
- Increased catalog coverage from ~15% to ~75%+ per run by designing a multi-strategy pagination engine with 6 configurable sort strategies and a global ASIN deduplication set
- Achieved 10–20x faster database loads by replacing row-by-row inserts with batched `INSERT … UNION ALL` patterns and smarter per-product cleanup SQL
- Implemented idempotent terminate-then-reactivate semantics: procedures can be rerun safely without accumulating duplicates; state is always "current as of last successful run"
- Developed a schema sync tool exporting tables, views, and procedures to versioned SQL/CSV/JSON under git, keeping Snowflake schema and codebase aligned across environments
- Stack: Snowflake, Snowpark (Python), Keepa API, ScaleSERP, pytest

### CVR Sports Analytics — Rugby League Insights Platform (Backend + Data)

- Built a rugby league analytics platform for NRL, Super League, and NSW Cup with a CQRS-style architecture: metrics materialized at XML ingestion time, not recomputed on every read
- Computed event-derived metrics (yardage errors, penalties, team tackles) once during ingestion and persisted on team records — eliminating repeated raw-event scans and reducing query complexity
- Upgraded frontend from Angular 9 to Angular 17: removed legacy OpenSSL dependency, updated AG Grid, fixed visual regressions, and improved build tooling
- Added async XML upload with background job polling, decoupling upload latency from data processing and improving reliability for large match files
- Implemented PDF export across all major report views using html2canvas + jsPDF with cloned DOM mutation — live page is never modified during export
- Stack: Node.js, MongoDB, Angular 17, PDF export (html2canvas + jsPDF)

### CarLister — Automotive Pricing Intelligence Platform (Full‑Stack)

- Architected a full-stack automotive pricing intelligence platform integrating 6 external providers (MarketCheck, vAuto, AccuTrade, MMR, Carfax, SendGrid) into a unified search, valuation, and alerting workflow
- Designed a configurable good-deal engine backed by database settings — pricing source (vAuto vs. MMR) and deal thresholds switchable at runtime without redeployment
- Built cron-driven saved-filter automation: refresh listings → enrich with MMR/vAuto pricing → score deals → send email alerts, turning one-off searches into continuous inventory monitoring pipelines
- Implemented 4 dedicated cache layers (search, listings, MMR, price predictions) with expiry metadata and negative-result caching to reduce provider API costs and improve response times
- Resolved PostgreSQL connection exhaustion in a multi-service Node environment by consolidating around a shared Prisma client and configuring PgBouncer connection limits
- Added provider monitoring with daily health probes, failure-rate tracking, and automated alert emails when upstream degradation crosses threshold
- Stack: Next.js 15, React 19, TypeScript, TanStack Query, Zustand, Express 5, Prisma, PostgreSQL, SendGrid

### Facebook Group Scraper — Playwright Automation + Backend Integration

- Built a fully automated headless Playwright scraper that collects user engagement points across multiple Facebook groups with no manual intervention required
- Handled device-based 2FA by detecting the verification step and waiting for push-approval on a secondary device before proceeding — resilient without storing SMS codes
- Implemented configurable concurrency (5 parallel Chromium pages) for throughput across large user lists; aggregated points per user across groups, deduplicated, and bulk-synced to backend
- Saved timestamped JSON audit files locally per run for traceability and debugging
- Stack: Node.js, Playwright (Chromium), Axios, REST APIs

### Helpicon Mobile App — Marketplace Mobile Platform (React Native)

- Cross‑platform mobile application connecting users with vetted service providers
- Implemented real‑time chat via Twilio, video calls via Agora, and Google Maps integration
- Built secure payment flows, task management, and rating/review system
- Published to App Store and Google Play with 4+ star ratings
- Stack: React Native, Twilio, Agora, Google Maps API, Node.js backend integration

### Legacy Suite — Digital Legacy & Estate Platform (Full‑Stack)

- Built non‑custodial digital asset management with wallet monitoring and Web3 integration
- Implemented secure password sharing, end‑of‑life planning, and beneficiary management
- Designed estate planning features with user authentication and role‑based access control
- Stack: Angular, NestJS, Web3.js, PostgreSQL, TypeScript

### CHAINSCAN — NFT Explorer & Blockchain Analytics (Full‑Stack)

- Built Ethereum NFT analytics platform with real‑time indexing from Alchemy Graph API
- Implemented Web3 authentication and wallet connectivity for blockchain interactions
- Optimized PostgreSQL queries for millions of blockchain records with efficient indexing
- Stack: Next.js, Web3.js, PostgreSQL, Alchemy API, TypeScript

### FashionXotics — High‑Volume Product Catalog (Next.js + Redux)

- Server‑side rendered product listings with SSR hydration into Redux store to avoid refetches on client interactions
- Handled large variant/colour matrices, fast filters/sorting, and Stripe/PayPal checkout flows
- Stack: Next.js, Redux, TypeScript, Stripe, PayPal

### MarketCheck Integration — Dealership Data & Listings (Data + Automation)

- Seeded franchised dealership lists and recent car listings via MarketCheck API; normalized names/domains/addresses and cross‑checked with OEM dealer locators
- Used dataset to drive contact discovery pipelines and deal‑finding prototypes
- Stack: Node.js, MarketCheck API, PostgreSQL

### ResIhop Mobile App — Carpooling & Ride Sharing Platform (React Native)

- Built eco‑friendly carpooling platform connecting drivers and passengers for shared rides
- Implemented Google Maps integration for route planning, geolocation, and distance calculation
- Designed recurring schedule management, ride matching algorithm, and in‑app messaging
- Published to App Store and Google Play with user authentication and payment integration
- Stack: React Native, Google Maps API, Node.js, PostgreSQL

### P2G Global Services — E‑commerce Ops (Contract)

- Managed 130k+ Amazon products with automation scripts and continuous inventory updates
- Integrated Amazon APIs for product listings, SEO features, analytics segmentation, and order shipment tracking (Didadi APIs)
- Worked with Keepa data for Amazon product tracking and pricing analysis
- Stack: Node.js, Amazon APIs, Keepa, automation scripts

---

## SaaS & Authentication Experience

- Next.js/Node.js SaaS foundations with SSR/SSG, API routes, and secure session handling
- SQL schema design with Prisma/TypeORM, migrations, and performance tuning
- Authentication & Authorization: Cognito, Clerk, Auth0; RBAC, multi‑tenant org models
- Secrets management, password hashing best practices, encryption‑at‑rest/in‑transit
- Multi‑environment CI/CD, blue/green and zero‑downtime deploys (AWS/Azure)

---

## Education

BS Software Engineering — COMSATS University Islamabad, Lahore Campus

---

## Links

- GitHub: github.com/MSafyan
- LinkedIn: linkedin.com/in/safyanakram/
- Email: msafyan080@gmail.com
