import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Case studies";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Case studies", title: "Production work, with the results measured." });
}
