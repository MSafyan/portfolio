// NEW PROJECTS DATA FOR SAFYAN AKRAM
// This file contains the updated projects array to replace in constants/index.js

// Note: You'll need to add placeholder images for new projects
// For now, using generic placeholders or similar project images

const newProjects = [
  // ============================================
  // WEBSITE PROJECTS
  // ============================================

  // KEPT FROM ORIGINAL (Shared projects)
  {
    id: 1,
    name: "Helpicon Web App",
    description:
      "Swedish marketplace platform connecting people with trusted, vetted Helpers for tasks like cleaning, babysitting, pet care, and deliveries. Built backend microservices with payment integration and real-time chat.",
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Node.js",
        color: "blue-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "green-text-gradient",
      },
      {
        name: "AWS",
        color: "pink-text-gradient",
      },
      {
        name: "Terraform",
        color: "yellow-text-gradient",
      },
    ],
    image: helpiWeb, // Keep existing image
    images: [],
    source_code_link: "https://helpicon.se/en",
  },

  {
    id: 2,
    name: "Chez Chef",
    description:
      "Web application that enables users to search for recipes, view details, buy them and save them to their favorites. Built with React, Redux, and SCSS.",
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
    image: chezchef, // Keep existing image
    images: [],
    source_code_link: "https://www.chezchefs.com/",
  },

  {
    id: 3,
    name: "Fashion Xotics",
    description:
      "Comprehensive e-commerce platform for feminine clothing with advanced filtering, server-side rendering, and optimized performance using Next.js and Strapi CMS.",
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
    image: xotics, // Keep existing image
    images: [],
    source_code_link: "https://fashionxotics.com/",
  },

  {
    id: 4,
    name: "Wand Cleaning",
    description:
      "Web-based platform that helps simplify maid services with scheduling, payment integration, and satisfaction guarantee. Built with React and Node.js.",
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
    image: wind, // Keep existing image
    images: [wind],
    source_code_link: "https://wandycleaning.com/",
  },

  // NEW SAFYAN PROJECTS

  {
    id: 5,
    name: "Abundance Movement",
    description:
      "AI-powered social learning platform with semantic user matching, video recommendations, and personality-based goal suggestions. Achieved 99.9% cost reduction through intelligent OpenAI model selection.",
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
    image: fawkes, // Placeholder - need to replace with actual screenshot
    images: [],
    source_code_link: "#", // Update with actual link if public
  },

  {
    id: 6,
    name: "CVR Sports Analytics",
    description:
      "Professional rugby league analytics platform processing NRL, Super League, and NSW Cup data. Features complex performance metrics, yardage analysis, and 7 interactive chart types for coaches and analysts.",
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
    image: techaccess, // Placeholder - need to replace
    images: [],
    source_code_link: "#",
  },

  {
    id: 7,
    name: "Palmetto Air Balance Data Warehouse",
    description:
      "Enterprise data warehouse on Azure integrating NetSuite, Air1, and UKG systems with 20+ ETL pipelines. Delivers real-time dashboards for revenue, backlog, and resource utilization tracking $40M+ portfolio.",
    category: "website",
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
    image: alpha, // Placeholder - need to replace
    images: [],
    source_code_link: "#",
  },

  {
    id: 8,
    name: "Pink Chicken Data Integration",
    description:
      "Multi-channel retail data platform unifying Shopify (10+ stores) with Apparel Magic WMS. Features complex API integration, multi-perspective inventory valuation, and real-time analytics.",
    category: "website",
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
    image: pashma, // Placeholder - need to replace
    images: [],
    source_code_link: "#",
  },

  {
    id: 9,
    name: "CHAINSCAN - NFT Explorer",
    description:
      "Blockchain analytics platform for Ethereum NFT data. Features real-time indexing from Alchemy Graph API, Web3 authentication, and query optimization for millions of blockchain records.",
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Angular",
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
    image: cloth, // Placeholder - need to replace
    images: [],
    source_code_link: "#",
  },

  {
    id: 10,
    name: "P2G Global Services",
    description:
      "Large-scale e-commerce operations managing 130,000+ products with automation scripts, SEO implementation, Google Analytics segmentation, and Didadi API order tracking integration.",
    category: "website",
    dimensionsCategory: "website",
    tags: [
      {
        name: "Node.js",
        color: "blue-text-gradient",
      },
      {
        name: "automation",
        color: "green-text-gradient",
      },
      {
        name: "SEO",
        color: "pink-text-gradient",
      },
      {
        name: "analytics",
        color: "yellow-text-gradient",
      },
    ],
    image: port, // Placeholder - need to replace
    images: [],
    source_code_link: "#",
  },

  // ============================================
  // MOBILE PROJECTS
  // ============================================

  // KEPT FROM ORIGINAL
  {
    id: 11,
    name: "Res Ihop Mobile App",
    description:
      "Carpooling platform allowing drivers and passengers to share rides, reduce carbon emissions, and create recurring travel schedules. Built with React Native and Google Maps integration.",
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
    image: r1, // Keep existing image
    images: [r1, r2, r3, r4, r5, r6, r7, r8, r9],
    android_link:
      "https://play.google.com/store/apps/details?id=com.reactnative.resihop&hl=uz&gl=US",
    source_code_link: "https://apps.apple.com/us/app/res-ihop/id1576501174",
  },

  // NEW SAFYAN MOBILE PROJECT
  {
    id: 12,
    name: "Helpicon Mobile App",
    description:
      "Task-based mobile marketplace app with real-time chat (Twilio), video calls (Agora), secure payments (Stripe/Swish), and background job processing. Serves Swedish market with vetted Helpers.",
    category: "mobile",
    dimensionsCategory: "mobile",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "redux-toolkit",
        color: "green-text-gradient",
      },
      {
        name: "twilio",
        color: "pink-text-gradient",
      },
      {
        name: "stripe",
        color: "yellow-text-gradient",
      },
    ],
    image: h2, // Keep existing Helpicon images
    images: [h1, h2, h8, h3, h4, h5, h6, h7],
    android_link:
      "https://play.google.com/store/apps/details?id=com.helpicon.app&hl=en",
    source_code_link:
      "https://apps.apple.com/se/app/helpicon/id6450137041?l=en-GB",
  },

  {
    id: 13,
    name: "Fashion Xotics Mobile",
    description:
      "E-commerce mobile app for global fashion products featuring infinite scroll, cached network images, GetX state management, and Stripe payment integration.",
    category: "mobile",
    dimensionsCategory: "mobile",
    tags: [
      {
        name: "flutter",
        color: "blue-text-gradient",
      },
      {
        name: "getx",
        color: "green-text-gradient",
      },
      {
        name: "stripe",
        color: "pink-text-gradient",
      },
    ],
    image: splashx, // Keep existing image
    images: [x4, x5, x6, x8, x9, x10, x11],
    android_link:
      "https://play.google.com/store/apps/details?id=com.munibullahshah.fashion_xotics",
    source_code_link:
      "https://play.google.com/store/apps/details?id=com.munibullahshah.fashion_xotics",
  },

  {
    id: 14,
    name: "Employee & Resource Management",
    description:
      "React Native business management app with multilingual support (Urdu/English), reducing paperwork and operational errors for small-scale businesses. Features employee tracking and resource allocation.",
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
        name: "i18n",
        color: "pink-text-gradient",
      },
    ],
    image: hanti, // Placeholder - need to replace
    images: [],
    source_code_link: "#",
  },

  // ============================================
  // AUTOMATION / TOOLS
  // ============================================

  {
    id: 15,
    name: "Facebook Group Scraper",
    description:
      "Headless Playwright automation tool for collecting user engagement points across multiple Facebook groups. Features concurrent scraping (5 parallel instances), 2FA handling, and bulk API synchronization.",
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
    image: bet, // Placeholder - need to replace
    images: [],
    source_code_link: "https://github.com/MSafyan/facebook-group-scraper", // Update if you create public repo
  },
];

// IMPORTANT NOTES:
// 1. Need to create/gather actual project screenshots for new projects
// 2. Update source_code_link with actual GitHub URLs if making repos public
// 3. Current placeholders use existing images - replace with actual project visuals
// 4. Consider adding more images to the images[] arrays for modal view
// 5. You may want to add android_link for mobile projects if they have Play Store presence

export default newProjects;
