import type { Metadata } from "next";
import { SITE } from "./site";

type PageMeta = {
  /** Page subject. The name suffix is added and dropped first if it would overflow. */
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
};

const TITLE_MAX = 60;
const SUFFIX = ` | ${SITE.name}`;

export function pageTitle(subject: string) {
  return subject.length + SUFFIX.length <= TITLE_MAX ? subject + SUFFIX : subject;
}

// Every page goes through here, so canonical, OG and Twitter can never drift
// apart. A missing title or description fails the build instead of shipping
// a placeholder.
export function buildMetadata({ title, description, path, type = "website", noindex }: PageMeta): Metadata {
  if (!title?.trim() || !description?.trim()) {
    throw new Error(`Missing title or description for ${path}`);
  }
  if (description.length > 170) {
    throw new Error(`Description for ${path} is ${description.length} chars; keep it under 170`);
  }
  const fullTitle = pageTitle(title);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
