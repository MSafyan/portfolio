## Muhammad Safyan — Full-Stack & Cloud Engineer (5+ years)

GitHub: github.com/MSafyan · Email: msafyan080@gmail.com · LinkedIn: linkedin.com/in/safyan-akram-975631b4 · Phone: +92 314 994 5700 · Location: Gujranwala, Pakistan

---

## Professional Summary

Full‑stack engineer with end‑to‑end ownership across frontend, backend, data, and cloud. I design and deliver scalable SaaS applications, data platforms, and AI features with a strong emphasis on reliability, cost optimization, and security. I’ve led greenfield builds and taken over existing systems, implementing clean architectures, DevOps automation, CI/CD, and observability.

---

## Certifications

- AWS Certified Solutions Architect – Associate (2024) — Verified via Credly
- HashiCorp Certified: Terraform Associate (2024) — Verified via Credly

---

## Core Skills

- Full‑Stack Web: React.js, Next.js, Angular, TypeScript, Node.js, Express, NestJS
- Databases: PostgreSQL, Prisma, TypeORM, Knex, MongoDB, Mongoose, SQL optimization
- Cloud & DevOps: AWS, Azure, Terraform, Serverless, Docker, CI/CD (GitHub Actions, Jenkins)
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

- Built multi‑service AI architecture using OpenAI GPT, LangChain, and Pinecone
- Implemented embeddings pipeline and multi‑index vector search for profiles/videos
- Designed semantic matching, goal/personality recommendations, content analysis
- Cost optimization framework achieved ~99.9% reduction by model selection + token limits
- Stack: NestJS, TypeScript, TypeORM, PostgreSQL, OpenAI, Pinecone, LangChain

### Helpicon — Marketplace Microservices (Senior Backend)

- Integrated payment providers (Stripe, Swish) incl. marketplace/commission flows
- Implemented Twilio Conversations for chat; shared/common services for data transfer
- Deployed microservices on AWS with pipelines and environment automation
- Stack: Node.js, PostgreSQL, Stripe/Swish, Twilio, AWS, microservices

### CVR Sports Analytics — Rugby League Insights Platform (Backend + Data)

- Processed league data (NRL, Super League, NSW Cup) into advanced analytics
- Implemented coverage (CVG) metrics, yardage error analysis, intelligent filtering
- Stack: Node.js, MongoDB, Angular; focus on data modeling and query optimization
  Chart Summary

1. Match Period Chart
   Type: Mixed (Column + Spline)
   Purpose: Shows 10-minute period performance for specific matches
   Data: Neg Pts (red bars) + Final CVG (blue line)
2. Season Period Chart
   Type: Mixed (Column + Spline)
   Purpose: Shows 10-minute period performance across entire season
   Data: NEGS Win/Loss (green/red bars) + CVG Win/Loss (green/red lines)
3. Team Linespeed Chart
   Type: Spline (Line)
   Purpose: Shows average metres conceded per run across rounds
   Data: Performance trend with match results
4. Team Season Progress Chart
   Type: Mixed (Spline + Column)
   Purpose: Shows team's CVG progression throughout season
   Data: CVG trend (green line) + NEGS (red columns) + average reference lines
5. Team KPI Chart
   Type: Scatter
   Purpose: Shows team rankings across different performance metrics
   Data: KPI rankings with color-coded zones (blue=general, red=discipline)
6. Team Summary Rankings
   Type: Custom Bar (CSS-based, not HighCharts)
   Purpose: Shows individual player CVG rankings
   Data: Horizontal bars showing player performance
7. Team Comparison
   Type: Data Table (not a chart)
   Purpose: Tabular comparison of team statistics
   Most Common Types: Mixed charts (Column + Spline) for period analysis, and Spline charts for trend visualization.

### Facebook Group Scraper — Playwright Automation + Backend Integration

- Headless Playwright scraper to collect user points across groups with concurrency control
- Device‑based 2FA handling, resilient navigation, aggregation and API sync to backend
- Bulk update to engagement service and local audit trail; robust error handling
- Stack: Node.js, Playwright, Axios, REST APIs, concurrency patterns

### Palmetto Air Balance — Enterprise Data Warehouse (Data Platform on Azure)

- Designed Azure‑based warehouse: ADF (20+ pipelines), Azure SQL, Storage, private endpoints
- Integrated NetSuite, Air1, UKG; complex reconciliation and business logic in T‑SQL
- Dynamic MERGE procedures, logging/monitoring, email alerts, failure categorization
- Delivered real‑time dashboards (revenue, backlog, utilization) and snapshot architecture
- Stack: Azure Data Factory, Azure SQL, Databricks/Spark, Power BI, T‑SQL, REST APIs

### Pink Chicken — Retail Data Integration (Azure, Shopify, Apparel Magic)

- Unified Shopify (10+ retail + e‑commerce) with Apparel Magic WMS; virtual warehouse logic
- Implemented pagination, rate limiting, incremental loads, JSON transformation
- Dimensional modeling (facts/dimensions), inventory valuation across multiple perspectives
- Stack: Azure Data Factory, Azure SQL, REST APIs, Power BI, T‑SQL
  We recently completed a PostgreSQL to MSSQL migration using Azure Data Factory (ADF) copy activities with daily synchronization, so I have hands-on experience with this exact scenario.
  Key Questions for Daily Sync Strategy:
  The success of your daily sync approach depends on a few critical factors:

Timestamp Strategy: Do your source tables have updated_at or modified_date columns? This is crucial for incremental syncs to identify new and updated records.
Deletion Handling: How do you handle deleted records? Do you hard delete them or use soft deletes with flags like is_deleted or is_archived? This affects how we track changes.
Schema Flexibility: Can we add timestamp columns to existing tables, or do we need to work with the current schema? If schema changes aren't possible, we can implement database-level triggers to track changes without modifying the application.

Solution Recommendations:
For straightforward data migration: Azure Data Factory is excellent. We successfully used it for RDS → MSSQL migration with minimal customization. It handles the heavy lifting of data movement and scheduling.
For complex transformations: A custom Node.js script gives you complete control over business logic, data validation, and custom transformation rules that might be specific to equipment management.
Hybrid Approach: You could use ADF for bulk migration and Node.js for complex transformations or edge cases.
Additional Considerations:

What's your data volume for a full sync? This helps determine if weekly full syncs are feasible for certain tables.
Where is your MSSQL server hosted?
Can we use a read replica for the sync operations to avoid impacting production performance?

Understanding these details will help us design the most efficient ETL strategy for your specific requirements.

### Employee & Resource Management App — React Native (Personal Project)

- Small business operations app with multilingual support and demo walkthrough
- Focus on reducing paperwork and operational errors; pragmatic UX

### P2G Global Services — E‑commerce Ops (Contract)

- Managed 130k+ products with automation scripts and continuous inventory updates
- Implemented SEO features, analytics segmentation, order shipment tracking (Didadi APIs)

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
- LinkedIn: linkedin.com/in/safyan-akram-975631b4
- Email: msafyan080@gmail.com
