import { OG_SIZE, ogImage } from "@/lib/og";
import { WORK, getCaseStudy } from "@/lib/work";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug)!;
  return ogImage({ eyebrow: `Case study · ${study.client}`, title: study.name });
}
