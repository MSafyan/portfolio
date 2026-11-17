import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Blog posts are read from disk at render time (hourly revalidation, scheduled posts).
  outputFileTracingIncludes: { "/**": ["./content/blog/*.md"] },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    // The old vercel.app addresses send their links and rankings to the real
    // domain. Preview deployments use other hostnames and are unaffected.
    const oldHosts = ["safyan-portfolio.vercel.app", "portfolio-outc.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://muhammadsafyan.com/:path*",
      permanent: true,
    }));
    // /map was a discontinued experiment on the old site.
    return [...oldHosts, { source: "/map", destination: "/", permanent: true }];
  },
};

export default nextConfig;
