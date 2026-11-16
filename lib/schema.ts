import { SAME_AS, SITE, absoluteUrl } from "./site";
import { CERTIFICATIONS } from "./profile";
import { SERVICES, type Faq, type Service } from "./services";
import type { CaseStudy } from "./work";
import { type Video, thumb } from "./videos";

// Stable entity ids. Every page refers to these instead of repeating the
// Person and business objects.
export const PERSON_ID = absoluteUrl("/#person");
export const BUSINESS_ID = absoluteUrl("/#business");
const WEBSITE_ID = absoluteUrl("/#website");

type Node = Record<string, unknown>;

export function graph(...nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

// JSON.stringify does not escape "<", so a "</script>" inside any string would
// close the tag early. Escape it before it goes into dangerouslySetInnerHTML.
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function siteGraph() {
  return [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.name,
      url: absoluteUrl("/"),
      image: absoluteUrl(SITE.image),
      jobTitle: SITE.jobTitle,
      email: `mailto:${SITE.email}`,
      address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
      alumniOf: { "@type": "CollegeOrUniversity", name: "COMSATS University Islamabad" },
      knowsAbout: [
        "Full-stack web development",
        "Next.js",
        "Node.js",
        "NestJS",
        "AWS",
        "Terraform",
        "AI integration",
        "OpenAI",
        "LangChain",
        "Data engineering",
        "Azure Data Factory",
        "Snowflake",
      ],
      hasCredential: CERTIFICATIONS.filter((c) => !c.expired).map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.name,
        credentialCategory: "certification",
        recognizedBy: { "@type": "Organization", name: c.issuer },
        url: c.url,
      })),
      sameAs: SAME_AS,
    },
    {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: `${SITE.name} — Software Engineering`,
      url: absoluteUrl("/"),
      image: absoluteUrl(SITE.image),
      email: SITE.email,
      founder: { "@id": PERSON_ID },
      address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
      areaServed: "Worldwide",
      availableLanguage: ["English"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@id": absoluteUrl(`/services/${s.slug}#service`) },
        })),
      },
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: SITE.name,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ];
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceNode(service: Service) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: "Worldwide",
  };
}

// Only questions that are visible on the same page.
export function faqNode(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function caseStudyNode(study: CaseStudy) {
  const url = absoluteUrl(`/work/${study.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: study.title,
    description: study.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(study.shots[0]?.src ?? SITE.image),
    datePublished: study.published,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    about: study.stack,
    inLanguage: "en",
  };
}

// VideoObject with Clip parts, so Google can show "key moments" for chapters.
export function videoNode(video: Video, pagePath: string) {
  const watch = `https://www.youtube.com/watch?v=${video.id}`;
  return {
    "@type": "VideoObject",
    "@id": absoluteUrl(`${pagePath}#video-${video.id}`),
    name: video.title,
    description: video.description,
    thumbnailUrl: thumb(video.id),
    uploadDate: video.uploadDate,
    duration: `PT${Math.floor(video.duration / 60)}M${video.duration % 60}S`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    url: watch,
    author: { "@id": PERSON_ID },
    hasPart: video.chapters.map((c, i) => ({
      "@type": "Clip",
      name: c.label,
      startOffset: c.t,
      endOffset: video.chapters[i + 1]?.t ?? video.duration,
      url: `${watch}&t=${c.t}`,
    })),
  };
}
