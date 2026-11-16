import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "About";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "About", title: "Engineer first, with the whole system in view." });
}
