import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Muhammad Safyan — full-stack, AI and data engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Available for new projects", title: "Full-stack, AI and data engineer for teams that need it shipped." });
}
