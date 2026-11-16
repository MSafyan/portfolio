export const EXPERIENCE = [
  {
    company: "Pink Chicken",
    region: "USA",
    role: "Data engineer",
    period: "Mar 2025 – Jan 2026",
    summary: "Azure warehouse unifying Shopify and Apparel Magic; closed a 1–3% monthly sales gap.",
  },
  {
    company: "Palmetto Air Balance",
    region: "USA",
    role: "Data engineer",
    period: "Dec 2024 – Jan 2026",
    summary: "50+ Data Factory pipelines across NetSuite, UKG and Air1; $40M+ portfolio visibility.",
  },
  {
    company: "Helpicon",
    region: "Sweden",
    role: "Senior back-end and DevOps engineer",
    period: "Sep 2023 – Mar 2026",
    summary: "Stripe and Swish payments, Twilio messaging, ECS/EKS and Terraform for 10,000+ users.",
  },
  {
    company: "Wesion (Abundance Movement)",
    region: "UK",
    role: "Full-stack and AI engineer",
    period: "Apr 2023 – present",
    summary: "NestJS back end and 11 AI services on OpenAI and Pinecone; 95% lower LLM spend.",
  },
  {
    company: "CVR Sports Analytics",
    region: "Australia",
    role: "Full-stack and data engineer",
    period: "2022 – 2026",
    summary: "Rugby league analytics on Node.js and MongoDB; Angular 9 to 17 upgrade.",
  },
  {
    company: "Frizhub",
    region: "Pakistan",
    role: "Full-stack developer",
    period: "Nov 2022 – Aug 2023",
    summary: "CHAINSCAN Ethereum NFT analytics: millions of records indexed into PostgreSQL.",
  },
  {
    company: "P2G Global Services",
    region: "USA",
    role: "Back-end developer",
    period: "Nov 2021 – 2023",
    summary: "Automation for a 130k+ product Amazon catalogue: inventory, shipments and analytics.",
  },
] as const;

export const CERTIFICATIONS = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/9f649e53-5fca-4a2b-9d32-935d3da280f1/public_url",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    url: "https://www.credly.com/badges/41cf43ff-e454-4191-8174-e54ee6856a14/public_url",
  },
  {
    name: "Certified Kubernetes Application Developer (CKAD)",
    issuer: "The Linux Foundation",
    url: "https://www.credly.com/badges/bea98d78-b0ee-4171-9e06-146ebde91bbf/public_url",
  },
] as const;

export const SKILLS = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "T-SQL"] },
  { group: "Front end", items: ["React", "Next.js", "Angular", "TanStack Query", "Tailwind CSS"] },
  { group: "Back end", items: ["Node.js", "NestJS", "Express", "REST", "GraphQL", "Microservices"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Azure SQL", "Snowflake", "Redis", "Azure Data Factory", "Power BI"] },
  { group: "AI", items: ["OpenAI", "LangChain", "Pinecone", "Embeddings", "RAG"] },
  { group: "Cloud & DevOps", items: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Jenkins"] },
] as const;

// Real client reviews, quoted from Upwork and Fiverr (… marks a cut). No photos:
// the old site used stock portraits, which undercuts the reviews themselves.
export const REVIEWS = [
  {
    quote:
      "I had the pleasure of working with Safyan on the development of a Sports Analytics Data Warehouse and Reporting System. … He effectively designed and implemented a robust data warehouse architecture, ensuring scalability and efficiency. His attention to detail in data modeling, ETL processes, and integration was outstanding.",
    author: "Will Badel",
    context: "Sports analytics data warehouse",
    platform: "Upwork",
  },
  {
    quote:
      "BEST software developer on upwork, followed the brief perfectly and executed within timelines, great communication and would HIGHLY recommend for any technical project.",
    author: "Nick Jarvis",
    context: "Fixed-price project",
    platform: "Upwork",
  },
  {
    quote:
      "This project ended up significantly more complicated than expected because we aimed to add functionalities to an existing front- and backend system and to create a new CMS to integrate with the existing custom website. Despite the complexities and limitations, Safyan delivered exceptional work.",
    author: "B. Bolliglu",
    context: "CMS and system extension, Vietnam",
    platform: "Fiverr",
  },
  {
    quote:
      "Couldn't find a better developer. Constantly comes back if I need revision, listened to my requests with patience and carried out work to a 10/10 standard.",
    author: "glowoutapp",
    context: "Repeat client, UK",
    platform: "Fiverr",
  },
  {
    quote:
      "Safyan has made it very easy to communicate with him. He takes time to understand the project and his client's needs. We created milestones and Safyan has exceeded my expectations.",
    author: "kiwangreenaway",
    context: "Custom website, USA",
    platform: "Fiverr",
  },
] as const;
