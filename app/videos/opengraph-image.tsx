import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Videos";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Videos", title: "Watch me walk through the work." });
}
