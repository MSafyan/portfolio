import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // Old SPA routes. /map was a discontinued experiment.
    return [{ source: "/map", destination: "/", permanent: true }];
  },
};

export default nextConfig;
