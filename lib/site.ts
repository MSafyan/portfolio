// One place for identity and the canonical origin. Every canonical, sitemap
// entry, OG URL and JSON-LD @id is built from SITE.url — never from VERCEL_URL,
// which would leak preview domains into search results.
export const SITE = {
  url: "https://muhammadsafyan.com",
  name: "Muhammad Safyan",
  jobTitle: "Full-Stack, AI & Data Engineer",
  tagline: "Full-stack, AI and data engineer for SaaS teams",
  email: "msafyan080@gmail.com",
  locality: "Gujranwala",
  country: "PK",
  countryName: "Pakistan",
  image: "/images/me/muhammad-safyan.png",
  yearsExperience: 5,
  profiles: {
    github: "https://github.com/MSafyan",
    linkedin: "https://www.linkedin.com/in/safyanakram/",
    upwork: "https://www.upwork.com/freelancers/~0110ed1cc027d85e0f",
    fiverr: "https://www.fiverr.com/s/P216loL",
  },
} as const;

export const SAME_AS = Object.values(SITE.profiles);

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
