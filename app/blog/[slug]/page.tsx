import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { Arrow, BAND, Container } from "@/components/ui";
import { formatDate, getPost, getPosts, isLive, relatedPosts } from "@/lib/blog";
import { blogPostNode, breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { SITE } from "@/lib/site";
import { getCaseStudy } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

// Scheduled posts are not pre-rendered; they render on request once their date arrives.
export const dynamicParams = true;
// Re-rendered hourly, so a scheduled post appears on its date without a deploy.
export const revalidate = 3600;


export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    noindex: !isLive(post),
  });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const service = getService(post.service);
  const study = post.caseStudy ? getCaseStudy(post.caseStudy) : undefined;
  const related = relatedPosts(post);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={graph(blogPostNode(post), breadcrumbs(crumbs))} />
      <PageHeader crumbs={crumbs} eyebrow={service?.name ?? "Article"} title={post.title}>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="font-semibold text-ink">{SITE.name}</span>
          <span aria-hidden="true">·</span>
          {post.published ? <time dateTime={post.published}>{formatDate(post.published)}</time> : <span>Draft</span>}
          <span aria-hidden="true">·</span>
          <span>{post.minutes} min read</span>
        </p>
        {!isLive(post) && (
          <p className="mt-5 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {post.status === "published" && post.published
              ? `Scheduled for ${formatDate(post.published)} — only visible locally until then`
              : "Draft preview — not published, only visible locally"}
          </p>
        )}
      </PageHeader>

      <Container className="mt-12 grid gap-14 lg:grid-cols-[1fr_17rem]">
        <article className="prose min-w-0 max-w-2xl" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {post.toc.length >= 3 && (
            <nav aria-label="On this page" className="rounded-3xl border border-line p-6 text-sm">
              <p className="font-semibold">On this page</p>
              <ol className="mt-3 space-y-2">
                {post.toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-muted hover:text-accent">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {service && (
            <div className="rounded-3xl bg-accent-soft p-6 text-sm">
              <p className="font-serif text-xl leading-snug font-medium">Need this fixed on your project?</p>
              <p className="mt-2 leading-relaxed text-muted">{service.summary}</p>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-flex items-center gap-1 font-semibold text-accent">
                {service.name} <Arrow />
              </Link>
            </div>
          )}
        </aside>
      </Container>

      {study && (
        <section aria-labelledby="study-heading" className={`mt-24 ${BAND}`}>
          <Container>
            <h2 id="study-heading" className="font-serif text-3xl font-medium tracking-tight">
              The project behind this article
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <CaseStudyCard study={study} />
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-20">
          <Container>
            <h2 id="related-heading" className="font-serif text-3xl font-medium tracking-tight">
              Related articles
            </h2>
            <div className="mt-8">
              <PostList posts={related} />
            </div>
          </Container>
        </section>
      )}

      <ContactCta title="Stuck on something like this?" />
    </>
  );
}
