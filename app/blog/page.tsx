import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Arrow, Container } from "@/components/ui";
import { formatDate, getPosts, isLive, publishedPosts } from "@/lib/blog";
import { breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";

export function generateMetadata() {
  return buildMetadata({
    title: "Blog: Real Problems from Production Projects",
    description:
      "Articles on problems solved in real client projects: Shopify and ERP data that won't reconcile, slow WooCommerce stores, AI features and payment integrations.",
    path: "/blog",
    // Kept out of the index until the first article is published.
    noindex: publishedPosts().length === 0,
  });
}

// Re-rendered hourly, so a scheduled post appears on its date without a deploy.
export const revalidate = 3600;

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={graph(breadcrumbs(CRUMBS))} />
      <PageHeader
        crumbs={CRUMBS}
        eyebrow="Blog"
        title="Problems from real projects, and how they were fixed"
        intro="Each article starts with something that broke on a client project — numbers that didn't match, a page that took 30 seconds — then the cause and the fix, with what was measured."
      />
      <Container className="mt-16">
        {posts.length === 0 ? (
          <p className="text-lg text-muted">The first articles are on their way.</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <li
                key={p.slug}
                className="group relative flex flex-col rounded-3xl border border-line bg-surface p-7 transition hover:-translate-y-0.5 hover:border-ink hover:shadow-xl hover:shadow-black/5"
              >
                <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                  {getService(p.service)?.name ?? "Article"} · {p.minutes} min read
                  {!isLive(p) && (
                    <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-accent normal-case">
                      {p.status === "published" ? "Scheduled" : "Draft"}
                    </span>
                  )}
                </p>
                <h2 className="mt-3 font-serif text-2xl leading-snug font-medium tracking-tight text-balance">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.description}</p>
                <p className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-muted">{p.published ? formatDate(p.published) : "Not yet published"}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
                    Read <Arrow />
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
      <ContactCta />
    </>
  );
}
