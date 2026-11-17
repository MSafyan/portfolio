import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ChartCard } from "@/components/Charts";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PostList } from "@/components/PostList";
import { Arrow, BAND, Container, Tag } from "@/components/ui";
import { YouTube } from "@/components/YouTube";
import { breadcrumbs, caseStudyNode, graph, videoNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { postsFor } from "@/lib/blog";
import { getService } from "@/lib/services";
import { midSentence } from "@/lib/text";
import { fmt, getVideo } from "@/lib/videos";
import { WORK, getCaseStudy } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return buildMetadata({ title: study.title, description: study.description, path: `/work/${study.slug}`, type: "article" });
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const service = getService(study.service)!;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.client, path: `/work/${study.slug}` },
  ];
  const related = WORK.filter((w) => w.slug !== study.slug && w.service === study.service).slice(0, 2);
  const portrait = study.shots.every((s) => s.height > s.width);
  const video = study.video && getVideo(study.video.id);
  const posts = postsFor({ caseStudy: study.slug });

  return (
    <>
      <JsonLd
        data={graph(caseStudyNode(study), breadcrumbs(crumbs), ...(video ? [videoNode(video, `/work/${study.slug}`)] : []))}
      />
      <PageHeader crumbs={crumbs} eyebrow={study.client} title={study.name} intro={study.description} />

      <Container className="mt-12">
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {study.metrics.map((m) => (
            <div key={m.label} className="bg-surface p-6">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-serif text-4xl font-medium text-accent tabular-nums">{m.value}</span>
                <span className="mt-1 block text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {study.charts && (
        <Container className="mt-6">
          <h2 className="sr-only">Results in charts</h2>
          <div className={`grid gap-5 ${study.charts.length > 1 ? "md:grid-cols-2" : ""}`}>
            {study.charts.map((c) => (
              <ChartCard key={c.title} chart={c} />
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-16 grid gap-14 lg:grid-cols-[1fr_18rem]">
        <article className="max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight">The problem</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{study.challenge}</p>

          <h2 className="mt-14 font-serif text-3xl font-medium tracking-tight">What I built</h2>
          <ol className="mt-6 space-y-5">
            {study.approach.map((step, i) => (
              <li key={step} className="flex gap-4 text-lg leading-relaxed">
                <span className="mt-0.5 font-serif text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {study.hardParts && (
            <>
              <h2 className="mt-14 font-serif text-3xl font-medium tracking-tight">The hard parts</h2>
              <div className="mt-6 space-y-5">
                {study.hardParts.map((h) => (
                  <div key={h.title} className="rounded-2xl border-l-2 border-accent bg-surface py-4 pr-5 pl-5">
                    <h3 className="text-lg font-semibold">{h.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{h.body}</p>
                    {h.figure && (
                      <a href={h.figure.src} target="_blank" rel="noopener" className="mt-4 block">
                        <Image
                          src={h.figure.src}
                          alt={h.figure.alt}
                          width={h.figure.width}
                          height={h.figure.height}
                          sizes="(min-width: 1024px) 640px, 100vw"
                          className="h-auto w-full rounded-xl border border-line bg-white"
                        />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {video && (
            <>
              <h2 className="mt-14 font-serif text-3xl font-medium tracking-tight">Watch the walkthrough</h2>
              <p className="mt-3 text-muted">
                Starts at {fmt(study.video!.start)} in &ldquo;{video.title}&rdquo;.
              </p>
              <div className="mt-6">
                <YouTube id={video.id} title={video.title} start={study.video!.start} />
              </div>
            </>
          )}

          {study.shots.length > 0 && (
            <>
              <h2 className="mt-14 font-serif text-3xl font-medium tracking-tight">Screens</h2>
              <div className={`mt-6 grid gap-5 ${portrait ? "grid-cols-2" : ""}`}>
                {study.shots.map((shot) => (
                  <figure key={shot.src}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes={portrait ? "(min-width: 768px) 320px, 50vw" : "(min-width: 768px) 672px, 100vw"}
                      className="h-auto w-full rounded-2xl border border-line"
                    />
                    <figcaption className="mt-2 text-sm text-muted">{shot.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-5 rounded-3xl border border-line p-6 text-sm">
            <div>
              <dt className="text-muted">Client</dt>
              <dd className="mt-1 font-semibold">{study.client}</dd>
              {study.site && (
                <dd className="mt-1">
                  <a href={study.site} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-semibold text-accent">
                    Visit {new URL(study.site).hostname} <Arrow />
                  </a>
                </dd>
              )}
            </div>
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-1 font-semibold">{study.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Where and when</dt>
              <dd className="mt-1 font-semibold">
                {study.region}, {study.period}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Service</dt>
              <dd className="mt-1">
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1 font-semibold text-accent">
                  {service.name} <Arrow />
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Stack</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {study.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
      </Container>

      {posts.length > 0 && (
        <section aria-labelledby="posts-heading" className="mt-20">
          <Container>
            <h2 id="posts-heading" className="font-serif text-3xl font-medium tracking-tight">
              Articles from this project
            </h2>
            <div className="mt-8">
              <PostList posts={posts} />
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className={`mt-24 ${BAND}`}>
          <Container>
            <h2 id="related-heading" className="font-serif text-3xl font-medium tracking-tight">
              More {midSentence(service.name)} work
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((w) => (
                <CaseStudyCard key={w.slug} study={w} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCta title="Want results like these on your project?" />
    </>
  );
}
