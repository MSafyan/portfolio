# Safyan Akram - Comprehensive Projects Analysis
**Generated:** October 11, 2025
**Purpose:** Reference document for updating portfolio with actual projects

---

## Professional Summary

Full-stack engineer with 5+ years of experience specializing in:
- **Backend Development:** Node.js, NestJS, Express, TypeScript
- **Frontend Development:** React.js, Next.js, Angular
- **Cloud & DevOps:** AWS (Solutions Architect Certified), Azure, Terraform (HashiCorp Certified)
- **Data Engineering:** Azure Data Factory, Databricks, ETL/ELT pipelines, PostgreSQL, Azure SQL
- **AI/ML:** OpenAI GPT, LangChain, Pinecone vector database, embeddings
- **Payments & Integrations:** Stripe, Swish, PayPal, Twilio

---

## Major Projects (Featured Work)

### 1. **Abundance Movement - AI Matching & Recommendations Platform**
**Role:** Full-Stack Developer (April 2023 - Present)
**Type:** SaaS / AI Platform
**Category:** Full-Stack + AI/ML

**Description:**
Built a sophisticated AI-powered social learning platform featuring multi-dimensional user matching, content recommendations, and personality-based goal suggestions using advanced machine learning techniques.

**Key Achievements:**
- Developed 11 specialized AI services using OpenAI GPT, LangChain, and Pinecone
- Achieved **99.9% cost reduction** (from $750/month to $0.75/month) through intelligent model selection and optimization
- Implemented multi-namespace vector database architecture for semantic search
- Created semantic user matching system with 35%+ accuracy threshold
- Built intelligent video recommendation engine with query enrichment

**Technical Stack:**
- **Backend:** NestJS, TypeScript, Node.js
- **Database:** PostgreSQL with TypeORM
- **AI/ML:** OpenAI (o1-mini, gpt-4o-mini, gpt-3.5-turbo), LangChain, Pinecone
- **Other:** Text embeddings, vector search, prompt engineering

**Technical Highlights:**
- Multi-model LLM service architecture with intelligent model selection
- Cost optimization framework with real-time expense tracking
- Advanced prompt engineering for consistent JSON output
- Semantic user profile analysis across multiple dimensions (strengths, weaknesses, interests, values)
- Dynamic content analysis and categorization
- Automated question generation from video content

**Business Impact:**
- Annual cost savings of $8,991 while maintaining quality
- Real-time semantic similarity matching
- Multi-dimensional user profiling with 5+ attributes per user

**Screenshots/Demo:** [Would need actual screenshots of the platform, AI matching interface, recommendation dashboard]

---

### 2. **Helpicon - Marketplace Microservices Platform**
**Role:** Senior Backend Developer (September 2023 - Present)
**Type:** Marketplace SaaS
**Category:** Backend + DevOps

**Description:**
Swedish digital marketplace connecting people with verified local "Helpers" for tasks like cleaning, babysitting, pet care, and deliveries. Built and deployed payment and chat microservices on AWS with comprehensive DevOps automation.

**Key Features:**
- Payment service integration (Stripe, Swish, Workamo) with marketplace commission flows
- Real-time chat using Twilio Conversations
- Microservices architecture deployed on AWS EKS
- Complete DevOps infrastructure with Terraform and CI/CD

**Technical Stack:**
- **Backend:** Node.js, PostgreSQL, Prisma ORM
- **Payments:** Stripe, Swish (Swedish payment method), Workamo
- **Communication:** Twilio Conversations API
- **Cloud:** AWS (EKS, ECR, RDS, S3, EC2), Terraform
- **CI/CD:** Jenkins, Kaniko (containerized builds), GitHub Actions
- **Infrastructure:** Kubernetes, Docker, AWS VPC

**DevOps Architecture:**
- **Multi-account AWS setup:** DevOps, Staging, Production (EU-North-1 Stockholm)
- **Build pipeline:** Jenkins → Kaniko (ECS Fargate) → ECR → EKS deployment
- **Automated cron jobs:** Payment release processing (hourly), Workamo user sync (every 5 minutes)
- **Infrastructure as Code:** Complete Terraform setup for RDS, ECR, S3, networking
- **Monitoring:** CloudWatch, logging with Winston, error tracking

**DevOps Highlights:**
- Implemented complete CI/CD pipeline with automated deployments
- Managed multi-environment infrastructure (staging/production)
- Created Kubernetes manifests with rolling updates
- Set up automated database migrations and backups
- Configured private VPC networking with security groups

**Business Impact:**
- Secure payment processing for Swedish marketplace
- Real-time chat capabilities for task coordination
- Automated background job processing
- Scalable microservices architecture

**Screenshots/Demo:** [Platform UI, payment flows, chat interface, AWS architecture diagram]

---

### 3. **Palmetto Air Balance - Enterprise Data Warehouse**
**Role:** Data Engineer
**Type:** Enterprise Data Platform
**Category:** Data Engineering / Azure

**Description:**
Designed and implemented comprehensive Azure-based enterprise data warehouse integrating multiple business systems (NetSuite ERP, Air1 project management, UKG workforce) to provide real-time business intelligence for operational dashboards and executive reporting.

**Key Achievements:**
- Built 20+ Azure Data Factory (ADF) ETL/ELT pipelines
- Integrated 3 major business systems with complex data reconciliation
- Implemented automated backlog calculation and snapshot architecture
- Created dynamic MERGE stored procedures for data synchronization
- Delivered real-time dashboards for revenue, backlog, and resource utilization

**Technical Stack:**
- **Cloud:** Microsoft Azure (Data Factory, SQL Database, Storage, Databricks)
- **Database:** Azure SQL Database, T-SQL, Stored Procedures
- **ETL:** Azure Data Factory pipelines, Databricks/Spark, PySpark
- **BI:** Power BI, DAX, Advanced Analytics
- **APIs:** REST API integrations (NetSuite, Air1, UKG)

**Technical Highlights:**
- **Complex Business Logic:** Multi-system financial reconciliation, project-to-hours mapping
- **Advanced Stored Procedures:** Dynamic `MergeTableFromStaging` with automatic primary key detection
- **Comprehensive Logging:** SyncLog table with error categorization and email notifications
- **Snapshot Architecture:** Weekly automated backlog snapshots for historical trending
- **Performance Optimization:** Indexed queries, partitioning, materialized views

**Data Integration Challenges Solved:**
- Field vs. non-field hour categorization across departments
- Contract prices, change orders, invoice tracking reconciliation
- Cross-system key mapping between disparate identifiers
- Real-time backlog calculation: Contract Price + Change Orders - Invoices

**Business Impact:**
- Reduced reporting time from days to minutes
- 99.95% data quality score with automated validation
- 60% reduction in manual data processing
- Real-time visibility into $40M+ project portfolio
- Processing 100K+ records daily

**Screenshots/Demo:** [Dashboard screenshots, pipeline architecture, data flow diagrams]

---

### 4. **Pink Chicken - Retail Data Integration Platform**
**Role:** Data Engineer
**Type:** Multi-Channel Retail Analytics
**Category:** Data Engineering / Azure

**Description:**
Architected data warehouse solution for children's apparel retailer, integrating Shopify (10+ retail stores + e-commerce) with Apparel Magic WMS into unified analytics platform supporting inventory valuation across multiple business perspectives.

**Key Features:**
- Multi-source integration (Shopify REST API + Apparel Magic API)
- Complex deduplication logic to prevent e-commerce inventory double-counting
- Multi-perspective inventory valuation (finance/retail/wholesale pricing)
- Incremental data loading with snapshot strategy
- 10+ retail locations + e-commerce integration

**Technical Stack:**
- **Cloud:** Microsoft Azure (Data Factory, SQL Database, Storage, VNet)
- **ETL:** Azure Data Factory pipelines with complex JSON transformation
- **Database:** Azure SQL Database, dimensional modeling, star schema
- **APIs:** Shopify REST API, Apparel Magic API with rate limiting
- **BI:** Power BI integration

**API Integration Complexities:**
- **Shopify:** RFC 5988 pagination, rate limiting (40 req/min), inventory level batching
- **Apparel Magic:** Unix timestamp auth, mandatory pagination with `last_id`, rate limiting (4 req/sec)
- Virtual warehouse reconciliation logic
- Historical data extraction with date range filtering

**Data Warehouse Design:**
- **Fact Tables:** Sales transactions, inventory snapshots, order details
- **Dimension Tables:** Products, customers, locations, time dimensions
- **Bridge Tables:** Complex many-to-many for product variants
- **Control Tables:** `data_load_control` for incremental processing

**Business Impact:**
- Unified reporting across all channels (single source of truth)
- Real-time analytics eliminating manual consolidation
- Historical trending for strategic planning
- Multi-perspective inventory valuation for different business units

**Screenshots/Demo:** [Data model diagram, pipeline architecture, PowerBI dashboards]

---

### 5. **CVR Sports Analytics - Rugby League Insights Platform**
**Role:** Full-Stack Developer
**Type:** Sports Analytics SaaS
**Category:** Full-Stack

**Description:**
Developed comprehensive sports analytics system for professional rugby league, analyzing match data from NRL, Super League, and NSW Cup. Transformed raw game statistics into meaningful performance metrics for coaches and analysts.

**Key Features:**
- Complex performance metrics calculation (CVG - Coverage scores)
- Yardage error analysis by tracking team field positions
- Multiple chart types (Mixed, Spline, Scatter, custom CSS bars)
- Intelligent filtering (competitions, seasons, rounds)
- 7 different chart visualizations (match period, season progress, KPI rankings, etc.)

**Technical Stack:**
- **Backend:** Node.js
- **Database:** MongoDB with query optimization
- **Frontend:** Angular
- **Analytics:** Custom data modeling and statistical calculations

**Chart Types Implemented:**
1. **Match Period Chart** (Mixed: Column + Spline) - 10-minute period performance
2. **Season Period Chart** (Mixed) - NEGS Win/Loss + CVG trends
3. **Team Linespeed Chart** (Spline) - Metres conceded per run
4. **Team Season Progress Chart** (Mixed) - CVG progression
5. **Team KPI Chart** (Scatter) - Rankings across performance metrics
6. **Team Summary Rankings** (Custom CSS Bars) - Player CVG rankings
7. **Team Comparison** (Data Table) - Statistical comparisons

**Technical Achievements:**
- Database optimization for millions of records
- Real-time data processing and aggregation
- Complex statistical calculations for sports metrics
- Interactive chart visualizations

**Screenshots/Demo:** [Chart examples, analytics dashboard, filtering interface]

---

### 6. **Facebook Group Scraper - Automated Engagement Tracking**
**Role:** Backend Developer
**Type:** Automation Tool
**Category:** Web Scraping / Automation

**Description:**
Built headless browser automation system using Playwright to collect user engagement points across multiple Facebook groups, with automatic synchronization to backend API and comprehensive error handling.

**Key Features:**
- Headless Playwright scraper with concurrency control (5 parallel instances)
- Device-based 2FA handling with 5-minute timeout
- Resilient navigation with network idle detection
- Bulk data aggregation across multiple groups
- API sync to engagement service with audit trail

**Technical Stack:**
- **Automation:** Playwright (headless browser)
- **Backend:** Node.js, Axios for API communication
- **Concurrency:** Custom queue with parallel processing
- **Error Handling:** Comprehensive try-catch with retry logic

**Technical Highlights:**
- Persistent browser context for session management
- Smart 2FA detection and handling
- Dynamic content waiting with timeout controls
- Multi-group data aggregation and deduplication
- Bulk update API with transaction integrity
- Local audit trail with JSON file storage

**Challenges Solved:**
- Facebook dynamic content loading
- Rate limiting and concurrent page management
- Session persistence across multiple group scans
- Point extraction from varying page structures

**Business Impact:**
- Automated manual data collection process
- Real-time engagement tracking across groups
- Eliminated hours of manual point tracking work

**Code Sample:** [Included full implementation in projects folder]

---

### 7. **P2G Global Services - E-Commerce Operations**
**Role:** Contract Full-Stack Developer (November 2020 - 2023)
**Type:** E-Commerce Platform
**Category:** Full-Stack

**Description:**
Managed large-scale e-commerce operations including 130,000+ product management, automation scripts, SEO implementation, and order tracking integration.

**Key Features:**
- Automated product management scripts for 130K+ items
- Continuous inventory updates and synchronization
- SEO-friendly features implementation
- Google Analytics segmentation for user flow tracking
- Order shipment tracking via Didadi APIs
- Multiple payment method integration

**Technical Stack:**
- **Backend:** Node.js scripting
- **APIs:** Didadi shipping APIs, payment gateway integrations
- **Analytics:** Google Analytics with custom segmentation
- **Automation:** Custom scripts for bulk operations

**Business Impact:**
- Managed hundreds of thousands of products efficiently
- Automated inventory updates reducing manual work
- Improved SEO driving organic traffic
- Streamlined order fulfillment with API tracking

---

### 8. **Frizhub (CHAINSCAN) - NFT Explorer Application**
**Role:** Full-Stack Developer (November 2022 - August 2023)
**Type:** Blockchain Analytics
**Category:** Full-Stack / Web3

**Description:**
Built NFT explorer application for Ethereum blockchain data, including real-time indexing, Web3 authentication, and query optimization for millions of blockchain records.

**Key Features:**
- Real-time Ethereum data indexing to PostgreSQL
- Alchemy Graph API integration
- Query optimization for millions of records
- Web3-based authentication and subscription system
- Angular frontend with modular architecture

**Technical Stack:**
- **Backend:** Node.js, PostgreSQL
- **Blockchain:** Alchemy Graph API, Web3.js
- **Frontend:** Angular
- **Optimization:** Advanced SQL query tuning, indexing strategies

**Technical Achievements:**
- ETL pipeline from Ethereum blockchain to relational database
- Complex query optimization for blockchain data
- Web3 authentication implementation
- Subscription management system

---

### 9. **Employee & Resource Management App**
**Role:** Solo Developer
**Type:** Personal Project
**Category:** Mobile (React Native)

**Description:**
Developed React Native app for small-scale business management focusing on reducing paperwork and operational errors for local businesses.

**Key Features:**
- Multilingual support (Urdu/English)
- Demo video walkthrough for user onboarding
- Employee tracking and resource allocation
- Paperwork digitization

**Technical Stack:**
- **Mobile:** React Native
- **State Management:** Redux or Context API
- **Localization:** i18n for multilingual support

**Business Impact:**
- Reduced paperwork for small businesses
- Minimized operational errors
- Simplified resource management

---

## Certifications

### AWS Certified Solutions Architect – Associate (2024)
- **Verification:** Credly badge
- **Link:** [Credly verification URL]
- **Coverage:** EC2, S3, RDS, VPC, Lambda, CloudWatch, IAM, etc.

### HashiCorp Certified: Terraform Associate (2024)
- **Verification:** Credly badge
- **Link:** [Credly verification URL]
- **Coverage:** Infrastructure as Code, state management, modules, workspaces

---

## Skills Breakdown by Category

### **Backend Development**
- Node.js, Express, NestJS
- RESTful API design
- Microservices architecture
- WebSocket/real-time communication
- Authentication & Authorization (JWT, OAuth)

### **Frontend Development**
- React.js, Next.js (SSR/SSG)
- Angular (modular architecture)
- TypeScript
- Tailwind CSS, Sass
- Responsive design

### **Databases**
- PostgreSQL (advanced queries, indexing, performance tuning)
- MongoDB (aggregation, optimization)
- Azure SQL Database
- Prisma, TypeORM, Knex, Mongoose
- Dimensional modeling (star schema)

### **Cloud & DevOps**
- **AWS:** EC2, EKS, RDS, S3, ECR, VPC, CloudWatch, Cognito, SES
- **Azure:** Data Factory, SQL Database, Storage, Databricks, VNet
- **IaC:** Terraform (certified), CloudFormation basics
- **Containers:** Docker, Kubernetes, EKS
- **CI/CD:** Jenkins, GitHub Actions, Kaniko
- **Serverless:** AWS Lambda, serverless framework

### **Data Engineering**
- Azure Data Factory (20+ pipelines)
- ETL/ELT design and implementation
- Databricks/Spark
- Data warehouse design (dimensional modeling)
- Power BI, DAX
- Complex SQL (stored procedures, dynamic queries)

### **AI/ML**
- OpenAI GPT (multiple models)
- LangChain framework
- Pinecone vector database
- Text embeddings
- Prompt engineering
- Cost optimization strategies

### **Payment Systems**
- Stripe (marketplace, subscriptions, webhooks)
- Swish (Swedish payment)
- PayPal integration
- Workamo payment platform

### **Communication APIs**
- Twilio (Conversations, SMS)
- SendGrid (email)
- Real-time chat implementations

### **Web Scraping & Automation**
- Playwright (headless browser)
- Puppeteer
- API rate limiting handling
- Concurrency management

### **Testing & Quality**
- Jest (unit testing)
- Integration testing
- Error handling patterns
- Logging (Winston, Morgan)

---

## Project Categories for Portfolio

### **AI/ML Projects**
1. Abundance Movement (AI Matching & Recommendations)

### **Backend & Microservices**
1. Helpicon (Marketplace Microservices)
2. Facebook Group Scraper (Automation)

### **Data Engineering**
1. Palmetto Air Balance (Enterprise Data Warehouse)
2. Pink Chicken (Retail Data Integration)

### **Full-Stack Applications**
1. CVR Sports Analytics (Sports Insights Platform)
2. Frizhub/CHAINSCAN (NFT Explorer)
3. P2G Global Services (E-Commerce Operations)

### **Mobile Applications**
1. Employee & Resource Management App (React Native)

---

## Portfolio Presentation Recommendations

### **Hero Projects (Showcase First)**
1. **Abundance Movement** - Demonstrates AI/ML expertise, cost optimization
2. **Helpicon** - Shows DevOps, microservices, cloud architecture
3. **Palmetto Air Balance** - Highlights data engineering, Azure expertise

### **Supporting Projects**
4. Pink Chicken (Data Engineering)
5. CVR Sports Analytics (Full-Stack)
6. Facebook Group Scraper (Automation expertise)

### **Additional Experience**
7. Frizhub/CHAINSCAN (Blockchain/Web3)
8. P2G Global Services (E-Commerce scale)
9. Employee Management App (Mobile development)

---

## GitHub Repositories to Create

Based on your current projects, you should create public GitHub repos for:

1. **abundance-movement-ai** (if allowed, otherwise abstract/sanitized version)
   - Showcase AI architecture, cost optimization framework

2. **facebook-group-scraper** (generic version)
   - Playwright automation patterns, concurrency handling

3. **azure-data-warehouse-template**
   - Generic ADF pipeline templates, stored procedures
   - Demonstrate data engineering best practices

4. **microservices-payment-demo**
   - Sanitized payment service architecture
   - Show Stripe/payment integration patterns

5. **terraform-aws-eks-deployment**
   - IaC templates for EKS setup
   - Demonstrate DevOps expertise

---

## Project Images Needed

For each major project, gather:
- Architecture diagrams
- Dashboard screenshots
- Code snippets (interesting algorithms)
- Performance metrics/graphs
- API flow diagrams
- Before/after comparisons

---

## Next Steps for Portfolio Update

1. **Prioritize Projects:** Select top 6-8 projects to feature
2. **Create Descriptions:** Write engaging, results-focused descriptions
3. **Gather Visuals:** Collect screenshots, diagrams, metrics
4. **Update Constants:** Modify `src/constants/index.js` with new project data
5. **Organize Categories:** Group projects by technology/type (AI, Backend, Data, Full-Stack)
6. **Add GitHub Links:** Point to relevant repositories (create if needed)
7. **Highlight Certifications:** Feature AWS and Terraform certifications prominently
8. **Update Resume Data:** Sync `resumeData` with actual experience

---

**End of Analysis**
*This document serves as the comprehensive reference for updating the portfolio website with Safyan's actual projects and experience.*
