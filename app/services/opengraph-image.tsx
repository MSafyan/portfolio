import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Services";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "Full-stack development, technical SEO, AI integration and data engineering." });
}
