import { getPost, getPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Article";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = true;
// Re-rendered hourly, so a scheduled post appears on its date without a deploy.
export const revalidate = 3600;


export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return ogImage({ eyebrow: "Article", title: post.title });
}
