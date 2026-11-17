import Link from "next/link";
import type { Post } from "@/lib/blog";
import { Arrow } from "./ui";

// Compact article links for service pages, case studies and related posts.
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {posts.map((p) => (
        <li key={p.slug} className="group relative flex flex-col rounded-3xl border border-line bg-surface p-6 transition hover:border-ink">
          <p className="text-xs font-semibold tracking-wider text-muted uppercase">{p.minutes} min read</p>
          <h3 className="mt-2 flex-1 font-serif text-xl leading-snug font-medium tracking-tight text-balance">
            <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
              {p.title}
            </Link>
          </h3>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Read <Arrow />
          </span>
        </li>
      ))}
    </ul>
  );
}
