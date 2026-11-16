import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { WORK } from "@/lib/work";

// Built from the same data as the routes, so a page can't exist without a
// sitemap entry or the other way round. No lastmod: we have no real per-page
// timestamp, and a fake one teaches search engines to ignore it.
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
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
