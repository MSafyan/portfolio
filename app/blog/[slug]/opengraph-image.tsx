import { getPost, getPosts } from "@/lib/blog";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Article";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug)!;
  return ogImage({ eyebrow: "Article", title: post.title });
}
