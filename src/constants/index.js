import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  fawkes,
  cloth,
  chezchef,
  alpha,
  wind,
  xotics,
  pashma,
  bet,
  // mapped public assets
  wesion,
  wesion2,
  wesion3,
  cvr1,
  cvr2,
  cvr3,
  cvr4,
  cvr5,
  cvr6,
  legacy1,
  legacy2,
  legacy3,
  legacy4,
  palmetto1,
  palmetto2,
  palmetto3,
  pinkchicken1,
  pinchicken2,
  erma,
  terraform,
  kubernetesCert,
  x1,
  x2,
  x3,
  x4,
  x5,
  x6,
  x7,
  x8,
  x9,
  x10,
  x11,
  helpicon,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8,
  r1,
  r2,
  r3,
  r4,
  r5,
  r6,
  r7,
  r8,
  r9,
  port,
  helpiWeb,
} from "../assets";

export const resumeData = {
  name: "Safyan Akram",
  title: "Full-Stack & Cloud Engineer",
  summary:
    "AWS-certified Full-Stack Engineer specializing in backend development, cloud architecture, data engineering, and AI/ML integration. Proven track record of building scalable microservices, optimizing infrastructure costs by 95%, and delivering enterprise data solutions managing $40M+ portfolios.",
  skills: [
    "Backend: Node.js | NestJS | Express | TypeScript | JavaScript | Microservices Architecture | RESTful APIs | GraphQL | WebSocket | Background Jobs",
    "Cloud & DevOps: AWS (EKS, RDS, S3, ECR, EC2) | Azure (Data Factory, SQL, Databricks) | Terraform | Kubernetes | Docker | Jenkins CI/CD | Infrastructure as Code",
    "Databases: PostgreSQL | MongoDB | Azure SQL | Prisma | TypeORM | Knex | Mongoose | Query Optimization | Database Design | Stored Procedures",
    "AI/ML: OpenAI GPT (GPT-4o, GPT-4o-mini) | LangChain | Pinecone Vector Database | Semantic Search | Embeddings | AI Cost Optimization",
    "Data Engineering: Azure Data Factory | ETL/ELT Pipelines | Data Warehousing | Power BI | DAX | Complex Data Integration | Shopify API | NetSuite",
    "Frontend: React | Next.js | Angular | TypeScript | Redux | Tailwind CSS | Server-Side Rendering | Web3 | Blockchain Integration",
    "Tools & Practices: Git | Postman | Playwright | Automation | Agile/Scrum | Code Review | Test-Driven Development | Documentation",
  ],
  experience: [
    {
      role: "Data Engineer",
      company: "Pink Chicken (Remote)",
      duration: "03/2025 – Present",
      details: [
        "Unified Shopify (10+ retail + e-commerce stores) with Apparel Magic WMS implementing virtual warehouse logic for multi-channel inventory management.",
        "Migrated millions of records daily with incremental and full-sync based timestamps, optimizing pipeline runtime to under 4 hours.",
        "Developed Python scripts comparing NetSales/GrossSales of millions of dollars between Shopify dashboards and MySQL views for data validation.",
        "Optimized queries using composite indexes, multi-step procedures, and utility tables for handling tens of millions of records efficiently.",
        "Stack: Azure Data Factory, Azure SQL, Python, Dataflow for enterprise-scale data integration.",
      ],
    },
    {
      role: "Data Engineer",
      company: "Palmetto Air Balance (Remote)",
      duration: "12/2024 – 01/2026",
      details: [
        "Designed Azure-based data warehouse with ADF pipelines integrating NetSuite ERP, Air1 CRM, and UKG HRIS with complex reconciliation logic.",
        "Developed Python scripts in Databricks for NetSuite data migration to Azure Storage Account with automated daily runs.",
        "Built dynamic MERGE procedures with comprehensive logging, monitoring, email alerts, and failure categorization for data pipeline reliability.",
        "Delivered real-time dashboards for revenue tracking, backlog analysis, and resource utilization with snapshot architecture for historical analysis.",
      ],
    },
    {
      role: "Full-Stack Developer & AI Engineer",
      company: "Abundance Movement (Remote)",
      duration: "04/2023 – Present",
      details: [
        "Built AI-powered social learning platform with semantic user matching using OpenAI GPT, LangChain, and Pinecone vector database for personality-based recommendations.",
        "Developed 11 specialized AI services including video recommendations, goal suggestions, and intelligent content analysis with context-aware responses.",
        "Achieved 95% cost reduction (95% reduction) through intelligent model selection strategies (GPT-4o vs GPT-4o-mini) and optimization techniques.",
        "Architected microservices backend with NestJS, PostgreSQL, TypeScript, and implemented semantic search with vector embeddings.",
        "Designed custom LangChain chains for multi-step AI workflows and built scalable infrastructure for high-volume AI operations.",
      ],
    },
    {
      role: "Backend Developer & DevOps Engineer",
      company: "Helpicon, Malmo, Sweden (Remote)",
      duration: "09/2023 – Present",
      details: [
        "Developed backend microservices architecture on AWS using Node.js, PostgreSQL, and TypeScript for Swedish marketplace platform connecting users with vetted helpers.",
        "Built payment integration with Stripe, Swish, and Workamo, implementing webhooks, subscription management, and secure transaction flows.",
        "Designed and deployed complete AWS infrastructure using Terraform, Kubernetes (EKS), RDS, S3, and ECR with Jenkins CI/CD pipelines for automated deployments.",
        "Implemented real-time chat functionality using Twilio Conversations API with background job processing for notifications and task management.",
        "Architected database schema, stored procedures, and optimized queries for high-traffic marketplace operations with thousands of concurrent users.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Frizhub (CHAINSCAN) (Remote)",
      duration: "11/2022 - 08/2023",
      details: [
        "Built blockchain analytics platform for Ethereum NFT data with real-time indexing from Alchemy Graph API processing millions of records.",
        "Developed Angular frontend with Web3 authentication, integrated with PostgreSQL for complex blockchain data aggregations.",
        "Implemented query optimization and caching strategies reducing response times by 80% for transaction history analysis.",
        "Created RESTful APIs for NFT discovery, ownership tracking, and marketplace analytics with comprehensive documentation.",
      ],
    },
  ],
  additionalProjects: [
    "CVR Sports Analytics: Built professional rugby league analytics platform processing NRL and Super League data with MongoDB, featuring 7 interactive chart types for performance analysis.",
    "Pink Chicken Data Integration: Developed multi-channel retail data platform unifying Shopify (10+ stores) with Apparel Magic WMS using Azure, featuring complex API integration and inventory valuation.",
    "P2G Global Services: Managed large-scale e-commerce operations with 130,000+ products using Node.js automation scripts, SEO implementation, and Google Analytics integration.",
    "Facebook Group Scraper: Created headless Playwright automation tool for collecting user engagement across multiple Facebook groups with concurrent scraping and 2FA handling.",
    "Employee & Resource Management: Built React Native business app with multilingual support (Urdu/English) for small-scale business operations management.",
    "Fashion Xotics: Contributed to comprehensive e-commerce platform using Next.js, Strapi CMS, Redux Toolkit with server-side rendering and advanced filtering.",
    "Chez Chef: Developed recipe platform using React, Redux, SCSS, and Stripe payments with intuitive user interface.",
    "Wand Cleaning: Built web-based maid services platform with React, Node.js, scheduling features, and Stripe payment integration.",
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "COMSATS University, Lahore, Pakistan",
    graduationYear: "2020",
  },
  certifications: [
    {
      title: "Introduction to Frontend Development",
      issuer: "Meta",
      link: "https://www.coursera.org/account/accomplishments/certificate/7L6R2C4628B5",
    },
    {
      title: "Introduction to Backend Development",
      issuer: "Meta",
      link: "https://www.coursera.org/account/accomplishments/certificate/P5JJ58ZP7ZWV",
    },
  ],
  mentorship: [
    "Technical Mentor: Provided guidance on backend architecture, cloud infrastructure design, and AI/ML implementation strategies to junior developers.",
    "Code Review Lead: Conducted comprehensive code reviews focusing on scalability, security, and best practices for Node.js and cloud deployments.",
  ],
};

export const navLinks = [
  // {
  //   id: "resume",
  //   title: "Resume",
  // },
  {
    id: "about",
    title: "About",
  },
  {
    id: "works",
    title: "Projects",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "certifications",
    title: "Certifications",
  },
  {
    id: "testimonials",
    title: "Reviews",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Cloud Engineer",
    icon: web,
  },
  {
    title: "Data Engineer",
    icon: creator,
  },
  {
    title: "Full-Stack Developer",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Data Engineer",
    company_name: "Pink Chicken, Remote",
    icon: pashma,
    iconBg: "#E6DEDD",
    date: "March 2025 - Present",
    points: [
      "Unified Shopify (10+ retail + e-commerce stores) with Apparel Magic WMS implementing virtual warehouse logic for multi-channel inventory management.",
      "Migrated millions of records daily with incremental and full-sync based timestamps, optimizing pipeline runtime to under 4 hours.",
      "Developed Python scripts comparing NetSales/GrossSales of millions of dollars between Shopify dashboards and MySQL views for data validation.",
      "Optimized queries using composite indexes, multi-step procedures, and utility tables for handling tens of millions of records efficiently.",
      "Stack: Azure Data Factory, Azure SQL, Python, Dataflow for enterprise-scale data integration.",
    ],
  },
  {
    title: "Data Engineer",
    company_name: "Palmetto Air Balance, Remote",
    icon: alpha,
    iconBg: "#383E56",
    date: "December 2024 - January 2026",
    points: [
      "Designed Azure-based data warehouse with ADF pipelines integrating NetSuite ERP, Air1 CRM, and UKG HRIS with complex reconciliation logic.",
      "Developed Python scripts in Databricks for NetSuite data migration to Azure Storage Account with automated daily runs.",
      "Built dynamic MERGE procedures with comprehensive logging, monitoring, email alerts, and failure categorization for data pipeline reliability.",
      "Delivered real-time dashboards for revenue tracking, backlog analysis, and resource utilization with snapshot architecture for historical analysis.",
    ],
  },
  {
    title: "Full-Stack Developer & AI Engineer",
    company_name: "Abundance Movement, Remote",
    icon: fawkes,
    iconBg: "#E6DEDD",
    date: "April 2023 - Present",
    points: [
      "Built AI-powered social learning platform with semantic user matching using OpenAI GPT, LangChain, and Pinecone vector database.",
      "Developed 11 specialized AI services including video recommendations, personality-based goal suggestions, and intelligent content analysis.",
      "Achieved 95% cost reduction (95% reduction) through intelligent model selection (GPT-4o vs GPT-4o-mini) and optimization strategies.",
      "Architected microservices backend with NestJS, PostgreSQL, and TypeScript for scalable AI operations.",
      "Implemented semantic search with vector embeddings and built custom LangChain chains for context-aware AI responses.",
    ],
  },
  {
    title: "Backend Developer & DevOps Engineer",
    company_name: "Helpicon, Malmo, Sweden",
    icon: helpicon,
    iconBg: "#383E56",
    date: "September 2023 - Present",
    points: [
      "Served 10,000+ active users and 500+ verified providers with 99.8% payment success rate; API p50 <200ms and DB queries consistently <50ms.",
      "Built payment integration with Stripe, Swish, and Workamo — marketplace commission splits, payout scheduling, webhook-driven booking state machine, and dispute handling.",
      "CI/CD pipeline cut deployment time 75% (45 min → 11 min automated); MTTR improved from 2 hours to 15 minutes; AWS costs reduced 30% via right-sized instances.",
      "Docker image optimized from 1.2 GB to 180 MB via multi-stage builds; deployed EKS + Terraform + Jenkins infrastructure across 3 AWS accounts.",
      "Implemented real-time chat via Twilio Conversations with multi-tenant isolation, S3 file attachments, and full message audit trail in PostgreSQL.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company_name: "Frizhub (CHAINSCAN), Remote",
    icon: cloth,
    iconBg: "#E6DEDD",
    date: "November 2022 - August 2023",
    points: [
      "Built blockchain analytics platform for Ethereum NFT data with real-time indexing from Alchemy Graph API.",
      "Developed Angular frontend with Web3 authentication and integrated with PostgreSQL for millions of blockchain records.",
      "Implemented query optimization and caching strategies for complex blockchain data aggregations.",
      "Created RESTful APIs for NFT discovery, ownership tracking, and transaction history analysis.",
    ],
  },
  {
    title: "Data Engineer & Backend Developer",
    company_name: "P2G Global Services, Remote (Contract)",
    icon: port,
    iconBg: "#383E56",
    date: "November 2020 - 2023",
    points: [
      "Managed large-scale e-commerce operations with 130,000+ products using automation scripts and Node.js.",
      "Implemented SEO optimization strategies, Google Analytics segmentation, and conversion tracking.",
      "Integrated Didadi API for automated order tracking and inventory management across multiple warehouses.",
      "Developed data pipelines for product catalog synchronization and real-time inventory updates.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "BEST software developer on upwork, followed the brief perfectly and executed within timelines, great communication and would HIGHLY recommend for any technical project.",
    name: "Nick Jarvis",
    designation: "Upwork Client",
    company: "Upwork - $200 Fixed Price",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    platform: "upwork",
    platformUrl: "https://www.upwork.com/freelancers/~0110ed1cc027d85e0f",
  },
  {
    testimonial:
      "I had the pleasure of working with Safyan on the development of a Sports Analytics Data Warehouse and Reporting System. From the outset, Safyan demonstrated strong technical expertise, professionalism, and a clear understanding of the project's objectives. He effectively designed and implemented a robust data warehouse architecture, ensuring scalability and efficiency. His attention to detail in data modeling, ETL processes, and integration was outstanding. Beyond his technical skills, Safyan's communication, reliability, and proactive approach stood out. I highly recommend Safyan for any data engineering, analytics, or reporting projects.",
    name: "Will Badel",
    designation: "Upwork Client - 5.0 ⭐",
    company: "Upwork - $780 Fixed Price",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    platform: "upwork",
    platformUrl: "https://www.upwork.com/freelancers/~0110ed1cc027d85e0f",
  },
  {
    testimonial:
      "Couldn't find a better developer. Constantly comes back if I need revision, listened to my requests with patience and carried out work to a 10/10 standard. Would 100% recommend and I will definitely be working with again in the future.",
    name: "glowoutapp",
    designation: "Repeat Client - UK",
    company: "Fiverr - 5.0 ⭐",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    platform: "fiverr",
    platformUrl: "https://www.fiverr.com/s/P216loL",
  },
  {
    testimonial:
      "Safyan has made it very easy to communicate with him. He takes time to understand the project and his client's needs. We created milestones and Safyan has exceeded my expectations. We are looking forward to finishing this project with him.",
    name: "kiwangreenaway",
    designation: "Repeat Client - USA",
    company: "Fiverr - Custom Websites",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    platform: "fiverr",
    platformUrl: "https://www.fiverr.com/s/P216loL",
  },
  {
    testimonial: "Excellent worker. Hard and quick. Will buy again.",
    name: "n9gggg",
    designation: "Repeat Client - USA",
    company: "Fiverr - 5.0 ⭐",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    platform: "fiverr",
    platformUrl: "https://www.fiverr.com/s/P216loL",
  },
  {
    testimonial:
      "This project ended up significantly more complicated than expected because we aimed to add functionalities to an existing front- and backend system and to create a new CMS to integrate with the existing custom website. Despite the complexities and limitations, Safyan delivered exceptional work. He is very attentive to detail and has helped my team and I understand the project thoroughly.",
    name: "B Bolliglu",
    designation: "Fiverr Client - Vietnam",
    company: "Fiverr - $800-$1000",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    platform: "fiverr",
    platformUrl: "https://www.fiverr.com/s/P216loL",
  },
];

const projects = [
  // ============================================
  // WEBSITE / BACKEND PROJECTS
  // ============================================
  {
    id: 1,
    name: "Helpicon Backend & DevOps",
    description:
      "Swedish marketplace backend on AWS/EKS/Terraform — deployment time cut 75% (45 min → 11 min), MTTR reduced from 2h to 15 min, and AWS costs down 30%. Serves 10,000+ users with 99.8% payment success via Stripe/Swish integrations, Twilio real-time chat, and Jenkins CI/CD pipelines.",
    highlights: [
      "Engineered microservices backend on AWS EKS serving 10,000+ active users and 500+ verified providers — API p50 <200ms, DB queries <50ms, zero security incidents throughout.",
      "Integrated Stripe + Swish (Nordic mobile payments) with marketplace commission splits, automatic payout scheduling, webhook-driven booking state machine, and full dispute handling.",
      "Implemented Twilio Conversations for real-time messaging with multi-tenant isolation, S3 file attachments, read receipts, typing indicators, and full audit trail in PostgreSQL.",
      "Designed 3-account AWS strategy (DevOps / Staging / Production) with Terraform IaC covering EKS, RDS, ECR, S3, VPC, and CloudWatch monitoring.",
      "Built Jenkins + Kaniko (ECS Fargate) CI/CD pipeline — no Docker-in-Docker, Prisma migrations automated on every deployment startup, full pipeline completes in 11 minutes.",
      "Deployed 2 Kubernetes CronJobs for background automation: hourly payment status checks and 5-minute Workamo contractor sync — fully decoupled from the main API pod.",
      "Multi-role RBAC system (Admin / Provider / Customer) with JWT refresh token rotation, Redis-based session blacklisting, bcrypt hashing, and admin IP whitelisting.",
      "Reduced AWS costs 30% via right-sized EC2 instances and reserved capacity; Docker image size cut from 1.2GB → 180MB through multi-stage builds.",
      "Built an internal admin dashboard (Retool) for task management, AI-powered content moderation, targeted push notification scheduling, and platform analytics.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Node.js",
        color: "blue-text-gradient",
      },
      {
        name: "AWS / EKS",
        color: "green-text-gradient",
      },
      {
        name: "Terraform",
        color: "pink-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "yellow-text-gradient",
      },
      {
        name: "Kubernetes",
        color: "purple-text-gradient",
      },
      {
        name: "Jenkins",
        color: "orange-text-gradient",
      },
    ],
    image: helpiWeb,
    images: [],
    source_code_link: "https://helpicon.se/en",
  },
  {
    id: 2,
    name: "Abundance Movement",
    description:
      "AI-powered social learning platform with 11 specialized AI services — semantic user matching, video recommendations, personality-based goal suggestions, and weekly chat summarization (7-day windows via NestJS cron). Multi-index Pinecone architecture with namespace-based user profiles across 5+ attributes. Reduced monthly LLM cost 95% through model selection and token limiting.",
    highlights: [
      "Built 11 specialized AI services including semantic user matching, video recommendations, personality-based goal suggestions, content analysis, and automated weekly chat summarization.",
      "Designed multi-index Pinecone vector architecture with namespace-based user profile storage across 5+ attributes (strengths, weaknesses, interests, values, keywords) for nuanced semantic matching.",
      "Achieved 95% AI cost reduction by strategically switching from o1-mini to gpt-4o-mini with token limiting — maintained output quality while cutting monthly spend from ~$X to near zero.",
      "Implemented weekly chat summarization pipeline via NestJS cron: collects 7-day message windows, generates narrative summaries and action items via OpenAI, exposed via REST endpoints for on-demand digests.",
      "Built real-time cost monitoring with sub-cent precision, model configuration utilities, and automated optimization recommendations across all AI service calls.",
      "Advanced prompt engineering for consistent JSON output parsing, context-aware formatting, and token efficiency — semantic similarity threshold of 35%+ for match quality.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "NestJS",
        color: "blue-text-gradient",
      },
      {
        name: "OpenAI",
        color: "green-text-gradient",
      },
      {
        name: "Pinecone",
        color: "pink-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "yellow-text-gradient",
      },
    ],
    image: wesion,
    images: [wesion, wesion2, wesion3],
    source_code_link: "https://www.app.wesion.world/",
  },
  {
    id: 3,
    name: "CVR Sports Analytics",
    description:
      "Rugby league analytics platform for NRL, Super League, and NSW Cup with CQRS-style architecture — metrics materialized at XML ingestion, not recomputed on read. Upgraded Angular 9→17, added async XML upload with background job polling, and implemented PDF export across all report views using html2canvas + jsPDF.",
    highlights: [
      "CQRS-style architecture: event-derived metrics (yardage errors, penalties, team tackles) computed once at XML ingestion and persisted on team records — eliminates repeated raw-event scans on every read.",
      "Upgraded frontend from Angular 9 → 17: removed legacy OpenSSL dependency, updated AG Grid, fixed visual regressions in competition tables, and modernized build tooling.",
      "Async XML upload with background job polling (uploadJob model) — decouples upload latency from data processing and improves reliability for large match files.",
      "PDF export across all major report views using html2canvas + jsPDF with cloned DOM mutation — the live page is never modified during export.",
      "Designed compound MongoDB indexes aligned to real filter query shapes; used distinct() + parallel execution for filter endpoints to minimize UI latency.",
      "Covers NRL, Super League, and NSW Cup competitions with player coverage (CVG) metrics, yardage error analysis, and field position tracking throughout matches.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Node.js",
        color: "blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "Angular",
        color: "pink-text-gradient",
      },
      {
        name: "Analytics",
        color: "yellow-text-gradient",
      },
    ],
    image: cvr1,
    images: [cvr1, cvr2, cvr3, cvr4, cvr5, cvr6],
    source_code_link: "http://cvr-analysis.com/",
  },
  {
    id: 14,
    name: "Legacy Suite",
    description:
      "Digital legacy and estate platform with non-custodial digital asset management, wallet monitoring, password sharing, and end-of-life planning. Built using Angular frontend and NestJS backend with Web3 integration and PostgreSQL.",
    highlights: [
      "Non-custodial digital asset management — users retain full ownership of wallet keys, with the platform providing monitoring without ever holding private keys.",
      "Wallet monitoring across multiple blockchain addresses with real-time balance and transaction tracking.",
      "Secure password vault with end-of-life sharing logic — designated beneficiaries gain access only upon verified trigger conditions.",
      "End-of-life planning module covering document storage, estate instructions, and beneficiary management.",
      "Web3 integration with Angular frontend and NestJS backend, backed by PostgreSQL for structured data and on-chain event indexing.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Angular",
        color: "blue-text-gradient",
      },
      {
        name: "NestJS",
        color: "green-text-gradient",
      },
      {
        name: "Web3",
        color: "pink-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "yellow-text-gradient",
      },
    ],
    image: legacy1,
    images: [legacy1, legacy2, legacy3, legacy4],
    source_code_link: "https://www.legacysuite.com/",
  },
  {
    id: 4,
    name: "Palmetto Air Balance Data Warehouse",
    description:
      "Enterprise Azure data warehouse integrating NetSuite, Air1, and UKG across a $40M+ project portfolio. 50+ ADF pipelines with dynamic MERGE procedures and self-healing schema detection. Processes 1M+ records/day at sub-second latency with 99.95% data quality; cut manual reporting effort 60% and reporting time from days to minutes.",
    highlights: [
      "Architected enterprise Azure data warehouse integrating NetSuite ERP, Air1 project management, and UKG workforce systems — providing real-time visibility into a $40M+ project portfolio.",
      "Built 50+ Azure Data Factory pipelines with dynamic MERGE stored procedures, self-healing schema-change detection, and automated email alerting on pipeline failures.",
      "Custom MergeTableFromStaging stored procedure with dynamic primary key detection, intelligent column mapping, and TRY-CATCH error logging — handles INSERT, UPDATE, DELETE automatically.",
      "Processed 1M+ records daily at sub-second query latency using optimized T-SQL, indexed star-schema models, and parallel ADF execution.",
      "Delivered real-time Power BI dashboards for revenue, backlog, and resource utilization with weekly automated snapshots for historical trending.",
      "Backlog calculation engine: real-time computation of Contract Price + Change Orders - Invoices with cross-system financial reconciliation between NetSuite and Air1.",
      "Achieved 99.95% data quality score with automated validation rules, comprehensive error logging, and tiered email notification system for failures.",
    ],
    category: "Ware Housing",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Azure",
        color: "blue-text-gradient",
      },
      {
        name: "Data Factory",
        color: "green-text-gradient",
      },
      {
        name: "SQL",
        color: "pink-text-gradient",
      },
      {
        name: "Power BI",
        color: "yellow-text-gradient",
      },
    ],
    image: palmetto1,
    images: [palmetto1, palmetto2, palmetto3],
    source_code_link: "#",
  },
  {
    id: 5,
    name: "Pink Chicken Data Integration",
    description:
      "Unified Shopify (10+ retail stores + e-commerce) with Apparel Magic WMS into Azure SQL. Cut Azure Monitor cost ~99.99% ($1,000/mo → $0.10/mo, ~$12K/year saved). Root-caused a persistent 1–3% monthly sales divergence traced to gift-card refund misclassification in Shopify's REST API — resolved via GraphQL order-changes API.",
    highlights: [
      "Unified Shopify POS (10+ retail stores) and e-commerce with Apparel Magic WMS into a single Azure SQL data warehouse — eliminating manual consolidation across all channels.",
      "Cut Azure Monitor cost by ~99.99% — from ~$1,000/month to $0.10/month (~$12,000/year saved) by eliminating redundant alert rules with zero loss of operational visibility.",
      "Root-caused a persistent 1–3% monthly sales divergence traced to gift card refund misclassification in Shopify's REST API — fixed by switching to GraphQL order-changes API with explicit transaction classification logic.",
      "Resolved a REST vs. GraphQL schema mismatch for incoming inventory data — a field that only existed in GraphQL — requiring full pipeline redesign and cross-API field normalization.",
      "Implemented dimensional inventory modeling valued from cost, retail, and wholesale perspectives per location, supporting multi-team reporting needs.",
      "Azure Data Factory pipelines with complex API integrations, staging via Azure Blob Storage, and Power BI dashboards for sales, inventory, and channel performance.",
    ],
    category: "Ware Housing",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Azure",
        color: "blue-text-gradient",
      },
      {
        name: "Shopify API",
        color: "green-text-gradient",
      },
      {
        name: "ETL",
        color: "pink-text-gradient",
      },
      {
        name: "SQL",
        color: "yellow-text-gradient",
      },
    ],
    image: pinkchicken1,
    images: [pinkchicken1, pinchicken2],
    source_code_link: "#",
  },
  {
    id: 99,
    name: "Helpicon Mobile App",
    description:
      "React Native marketplace app (iOS & Android) connecting 10,000+ users with vetted local helpers for tasks like cleaning, babysitting, and pet care. Features real-time Twilio messaging, Stripe/Swish payments, Google Maps for location-based discovery, and Agora video calling.",
    highlights: [
      "Cross-platform React Native app live on App Store and Google Play with 10,000+ active users across Sweden.",
      "Real-time in-app messaging via Twilio Conversations API with read receipts, typing indicators, and S3 file attachments.",
      "Integrated Stripe and Swish (Nordic mobile payments) for secure in-app transactions with automatic commission splits.",
      "Google Maps integration for location-based helper discovery, task tracking, and service area filtering.",
      "Agora video/voice calling for provider verification, pre-task consultations, and customer support.",
      "Multi-role authentication (Users and Helpers) with verified provider onboarding and AI-powered content moderation.",
    ],
    category: "mobile",
    dimensionsCategory: "mobile",

    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "twilio",
        color: "green-text-gradient",
      },
      {
        name: "google maps",
        color: "pink-text-gradient",
      },
      {
        name: "agora",
        color: "pink-text-gradient",
      },
    ],
    image: h2,
    images: [h1, h2, h8, h3, h4, h5, h6, h7],
    android_link:
      "https://play.google.com/store/apps/details?id=com.helpicon.app&hl=en",
    source_code_link:
      "https://apps.apple.com/se/app/helpicon/id6450137041?l=en-GB",
  },
  {
    id: 6,
    name: "CHAINSCAN - NFT Explorer",
    description:
      "Blockchain analytics platform for Ethereum NFT data with real-time indexing from Alchemy Graph API, Web3 authentication, and query optimization for millions of blockchain records. Built with Angular and PostgreSQL.",
    highlights: [
      "Real-time Ethereum NFT data indexing via Alchemy Graph API — tracks ownership, transfers, and on-chain metadata across millions of blockchain records.",
      "Web3 wallet authentication (MetaMask/WalletConnect) allowing users to log in and explore their own NFT portfolio alongside market-wide data.",
      "PostgreSQL query optimization for high-volume blockchain datasets — indexed filtering by collection, owner, transfer history, and floor price.",
      "Angular frontend with dynamic collection explorer, holder analysis, and transaction timeline views.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Web3",
        color: "green-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "pink-text-gradient",
      },
      {
        name: "Alchemy",
        color: "yellow-text-gradient",
      },
    ],
    image: cloth,
    images: [],
    source_code_link: "#",
  },
  {
    id: 8,
    name: "Facebook Group Scraper",
    description:
      "Headless Playwright automation tool for collecting user engagement points across multiple Facebook groups with concurrent scraping (5 parallel instances), 2FA handling, and bulk API synchronization.",
    highlights: [
      "Fully automated headless Playwright scraper collecting engagement points across multiple Facebook groups with zero manual intervention required.",
      "Device-based 2FA handling — detects the verification step and waits for push-approval on a secondary device before proceeding, making the flow resilient without storing SMS codes.",
      "Configurable concurrency with 5 parallel Chromium pages by default for throughput across large user lists while managing browser resource limits.",
      "Aggregated points per user across multiple groups, deduplicated entries, and bulk-synced results to the backend via a single authenticated API call.",
      "Saved timestamped JSON audit files locally per run for full traceability and debugging.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Node.js",
        color: "blue-text-gradient",
      },
      {
        name: "Playwright",
        color: "green-text-gradient",
      },
      {
        name: "automation",
        color: "pink-text-gradient",
      },
    ],
    image: bet,
    images: [],
    source_code_link: "#",
  },

  // KEPT SHARED PROJECTS
  {
    id: 9,
    name: "Chez Chef",
    description:
      "Web application that enables users to search for recipes, view details, buy them and save them to their favorites. Built with React, Redux, and SCSS.",
    highlights: [
      "Recipe search and discovery with detailed ingredient lists, cooking steps, and nutritional info.",
      "Favorites system with persistent user collections powered by Redux state management.",
      "Strapi CMS backend for recipe content management, enabling non-technical editors to add and update recipes.",
      "Responsive SCSS styling with clean card-based recipe layout.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "strapi",
        color: "green-text-gradient",
      },
      {
        name: "redux",
        color: "pink-text-gradient",
      },
    ],
    image: chezchef,
    images: [],
    source_code_link: "https://www.chezchefs.com/",
  },
  {
    id: 10,
    name: "Fashion Xotics",
    description:
      "Comprehensive e-commerce platform for feminine clothing with advanced filtering, server-side rendering, and optimized performance using Next.js, Strapi CMS, and Redux Toolkit.",
    highlights: [
      "Server-side rendering with Next.js for fast initial load and SEO-optimized product pages.",
      "Advanced product filtering by category, size, color, and price range with Redux Toolkit state management.",
      "Strapi CMS headless backend for product catalog management, inventory, and content updates.",
      "Optimized performance with image lazy loading, code splitting, and TypeScript throughout.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "Strapi",
        color: "green-text-gradient",
      },
      {
        name: "typescript",
        color: "pink-text-gradient",
      },
      {
        name: "redux-toolkit",
        color: "yellow-text-gradient",
      },
    ],
    image: xotics,
    images: [],
    source_code_link: "#",
  },
  {
    id: 11,
    name: "Wand Cleaning",
    description:
      "Web-based platform that helps simplify maid services with scheduling, payment integration (Stripe), and satisfaction guarantee. Built with React and Node.js backend.",
    highlights: [
      "Booking and scheduling system for home cleaning services with date/time slot selection.",
      "Stripe payment integration for secure online checkout with booking confirmation.",
      "Satisfaction guarantee flow with customer feedback collection post-service.",
      "React frontend with Node.js backend for booking management and service coordination.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "stripe",
        color: "pink-text-gradient",
      },
    ],
    image: wind,
    images: [wind],
    source_code_link: "#",
  },

  // ============================================
  // MOBILE PROJECTS
  // ============================================
  {
    id: 15,
    name: "Fashion Xotics App",
    description:
      "Mobile e-commerce application for Fashion Xotics featuring intuitive product browsing, shopping cart, secure checkout, user authentication, and order tracking. Built with React Native for seamless cross-platform experience.",
    highlights: [
      "Cross-platform React Native app (iOS & Android) with full e-commerce functionality.",
      "Product browsing with category filters, search, and detailed product views with image galleries.",
      "Shopping cart with quantity management, saved items, and secure checkout flow.",
      "User authentication with order history and real-time order tracking.",
      "Strapi CMS backend synced with the web platform for consistent catalog across channels.",
    ],
    category: "mobile",
    dimensionsCategory: "mobile",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
      {
        name: "strapi",
        color: "pink-text-gradient",
      },
      {
        name: "e-commerce",
        color: "yellow-text-gradient",
      },
    ],
    image: x1,
    images: [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11],
    source_code_link: "#",
  },
  {
    id: 12,
    name: "ResIhop Mobile App",
    description:
      "Carpooling platform allowing drivers and passengers to share rides, reduce carbon emissions, and create recurring travel schedules. Built with React Native, Google Maps integration, and Node.js backend.",
    highlights: [
      "Cross-platform React Native carpooling app live on App Store and Google Play.",
      "Google Maps integration for route planning, real-time driver location, and estimated arrival times.",
      "Recurring ride scheduling for daily commuters — set once, auto-match for every trip.",
      "Driver and passenger matching algorithm based on route overlap and departure time.",
      "Node.js backend for ride management, user matching, and in-app notifications.",
    ],
    category: "mobile",
    dimensionsCategory: "mobile",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "google maps",
        color: "pink-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
    ],
    image: r7,
    images: [r1, r2, r3, r4, r5, r6, r7, r8, r9],
    android_link:
      "https://play.google.com/store/apps/details?id=com.reactnative.resihop&hl=uz&gl=US",
    source_code_link: "https://apps.apple.com/us/app/res-ihop/id1576501174",
  },
  {
    id: 13,
    name: "Employee & Resource Management (ERMA)",
    description:
      "Final Year Project — mobile app for small-scale clothing businesses to manage budget, employees, and orders. Features multilingual support (Urdu/English), SMS/email notifications, dark mode, and role-based access.",
    highlights: [
      "Final Year Project: full-stack mobile ERP for small clothing businesses built with React Native and Strapi.",
      "Multilingual support (Urdu/English) with full RTL layout for Urdu, making it accessible for local Pakistani businesses.",
      "Role-based access control: Owner, Manager, and Employee roles with different permission levels.",
      "SMS and email notifications via Twilio for order updates, employee alerts, and budget thresholds.",
      "Budget tracking, project/order management, and employee productivity reporting in one dashboard.",
      "Dark mode with smooth theme switching throughout the app.",
    ],
    category: "mobile",
    dimensionsCategory: "mobile",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "strapi",
        color: "green-text-gradient",
      },
      {
        name: "twilio",
        color: "pink-text-gradient",
      },
      {
        name: "multilingual",
        color: "purple-text-gradient",
      },
      {
        name: "dark-mode",
        color: "orange-text-gradient",
      },
    ],
    image: erma,
    images: [erma],
    source_code_link:
      "https://www.linkedin.com/feed/update/urn:li:activity:6970775478383054848/",
  },

  // ============================================
  // DATA / ETL PLATFORMS
  // ============================================
  {
    id: 16,
    name: "EcomInvestigator — Snowflake ETL",
    description:
      "Snowflake + Snowpark (Python) ETL platform enriching 50k–100k+ e-commerce products per run from Keepa and ScaleSERP into a canonical entity/attribute model. Increased catalog coverage ~15%→75%+ via 6-strategy pagination engine. Achieved 10–20x faster DB loads via batched INSERT patterns. Idempotent terminate-then-reactivate semantics with token-based API rate limiting.",
    highlights: [
      "Architected a Snowflake + Snowpark (Python) ETL platform enriching 50k–100k+ e-commerce products per run from Keepa, ScaleSERP, and other APIs into a canonical entity/attribute model.",
      "Increased catalog coverage from ~15% to ~75%+ per run by designing a multi-strategy pagination engine with 6 configurable sort strategies and a global ASIN deduplication set.",
      "Achieved 10–20x faster database loads by replacing row-by-row inserts with batched INSERT … UNION ALL patterns (20–100 rows per statement) and smarter per-product cleanup SQL.",
      "Implemented idempotent terminate-then-reactivate semantics: procedures can be re-run safely without accumulating duplicates — state is always 'current as of last successful run'.",
      "Built token-based Keepa API rate limiting to sustain thousands of product calls per run without hitting 429 errors.",
      "Developed a schema sync tool exporting tables, views, and procedures to versioned SQL/CSV/JSON under git — keeping Snowflake schema and codebase aligned across environments.",
    ],
    category: "Ware Housing",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Snowflake",
        color: "blue-text-gradient",
      },
      {
        name: "Snowpark",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "pink-text-gradient",
      },
      {
        name: "Keepa API",
        color: "yellow-text-gradient",
      },
    ],
    image: alpha,
    images: [],
    source_code_link: "#",
  },
  {
    id: 17,
    name: "CarLister — Automotive Intelligence",
    description:
      "Full-stack automotive pricing intelligence platform integrating 6 providers (MarketCheck, vAuto, AccuTrade, MMR, Carfax, SendGrid). DB-backed configurable good-deal engine with runtime pricing-source switching. Cron-driven saved-filter automation for continuous inventory monitoring. 4 cache layers, provider health probes, and PostgreSQL connection-pool fixes via shared Prisma client + PgBouncer. 112 TS/TSX files, 21 API endpoints.",
    highlights: [
      "Integrated 6 external data providers (MarketCheck, vAuto, AccuTrade, MMR, Carfax, SendGrid) into a unified search, valuation, and alerting workflow.",
      "DB-backed configurable good-deal engine — pricing source (vAuto vs. MMR) and deal thresholds switchable at runtime without redeployment.",
      "Cron-driven saved-filter automation: refresh listings → enrich with MMR/vAuto pricing → score deals → send email alerts, turning one-off searches into continuous inventory monitoring pipelines.",
      "4 dedicated cache layers (search, listings, MMR, price predictions) with expiry metadata and negative-result caching to reduce provider API costs and improve response times.",
      "Resolved PostgreSQL connection exhaustion in a multi-service Node environment by consolidating around a shared Prisma client and configuring PgBouncer connection limits.",
      "Provider health monitoring with daily probes, failure-rate tracking, and automated alert emails when upstream degradation crosses threshold.",
      "112 TypeScript/TSX files, 21 API endpoints, built on Next.js 15, React 19, TanStack Query, Zustand, and Express 5.",
    ],
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Express",
        color: "green-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "yellow-text-gradient",
      },
    ],
    image: wind,
    images: [],
    source_code_link: "#",
  },
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    image:
      "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    date: "2024",
    provider: "Amazon Web Services (AWS)",
    link: "https://www.credly.com/badges/9f649e53-5fca-4a2b-9d32-935d3da280f1",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    image: terraform,
    date: "2024",
    provider: "HashiCorp",
    link: "https://www.credly.com/badges/41cf43ff-e454-4191-8174-e54ee6856a14",
  },
  {
    name: "CKAD: Certified Kubernetes Application Developer",
    image: kubernetesCert,
    date: "2026",
    provider: "The Linux Foundation",
    link: "https://www.credly.com/badges/bea98d78-b0ee-4171-9e06-146ebde91bbf/public_url",
  },
];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  certifications,
};
