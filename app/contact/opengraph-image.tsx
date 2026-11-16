import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Contact";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Tell me about your project." });
}
