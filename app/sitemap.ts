import type { MetadataRoute } from "next";
import { publishedPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { WORK } from "@/lib/work";

// Built from the same data as the routes, so a page can't exist without a
// sitemap entry or the other way round. No lastmod: we have no real per-page
// timestamp, and a fake one teaches search engines to ignore it.
// Re-rendered hourly, so a scheduled post appears on its date without a deploy.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    ...SERVICES.map((s) => `/services/${s.slug}`),
    "/work",
    ...WORK.map((w) => `/work/${w.slug}`),
    "/videos",
    "/about",
    "/contact",
  ];
  const posts = publishedPosts();
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path) })),
    // Posts have real dates, so they carry lastmod. The index joins once there is something in it.
    ...(posts.length ? [{ url: absoluteUrl("/blog") }] : []),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.updated ?? p.published ?? undefined })),
  ];
}
