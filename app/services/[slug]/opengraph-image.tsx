import { OG_SIZE, ogImage } from "@/lib/og";
import { SERVICES, getService } from "@/lib/services";

export const alt = "Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug)!;
  return ogImage({ eyebrow: service.name, title: service.h1 });
}
