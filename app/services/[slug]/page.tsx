import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BAND, ButtonLink, Container, SectionHeading, Tag } from "@/components/ui";
import { VideoBlock } from "@/components/VideoBlock";
import { breadcrumbs, faqNode, graph, serviceNode, videoNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES, getService } from "@/lib/services";
import { videoForService } from "@/lib/videos";
import { workForService } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) return {};
  return buildMetadata({ title: service.title, description: service.description, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];
  const work = workForService(service.work);
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const video = videoForService(service.slug);
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={graph(serviceNode(service), breadcrumbs(crumbs), faqNode(service.faqs), ...(video ? [videoNode(video, path)] : []))}
      />
      <PageHeader crumbs={crumbs} eyebrow={service.name} title={service.h1} intro={service.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Discuss your project</ButtonLink>
          <ButtonLink href="#work" variant="secondary">
            See related work
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-labelledby="fit-heading" className="mt-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="fit-heading" eyebrow="Is this you?" title="This is a good fit if…" />
          <ul className="grid gap-3">
            {service.forYouIf.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-line bg-surface p-5 text-lg leading-relaxed">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="m4 10.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="deliver-heading" className={`mt-24 ${BAND}`}>
        <Container>
          <SectionHeading id="deliver-heading" eyebrow="What you get" title={`What ${service.name.toLowerCase()} covers`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {service.deliverables.map((d) => (
              <div key={d.title} className="rounded-3xl border border-line bg-surface p-7">
                <h3 className="font-serif text-2xl font-medium tracking-tight">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-12 text-sm font-semibold">Tools I use for this</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {service.stack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </ul>
        </Container>
      </section>

      <section id="work" aria-labelledby="work-heading" className="mt-24 scroll-mt-24">
        <Container>
          <SectionHeading id="work-heading" eyebrow="Proof" title={`${service.name} case studies`} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {work.map((w) => (
              <CaseStudyCard key={w.slug} study={w} />
            ))}
          </div>
        </Container>
      </section>

      {video && (
        <section aria-labelledby="video-heading" className="mt-24">
          <Container>
            <SectionHeading id="video-heading" eyebrow="Walkthrough" title="See the work, not just the list" />
            <div className="mt-10">
              <VideoBlock video={video} />
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="faq-heading" className={`mt-24 ${BAND}`}>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Common questions" />
          <div className="divide-y divide-line border-y border-line">
            {service.faqs.map((f) => (
              <details key={f.q} className="group py-5" name="faq">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  <h3>{f.q}</h3>
                  <span aria-hidden="true" className="mt-1 text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="more-heading" className="mt-24">
        <Container>
          <h2 id="more-heading" className="text-sm font-semibold">
            Other services
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <ButtonLink href={`/services/${s.slug}`} variant="secondary">
                  {s.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta title={`Need help with ${service.name.toLowerCase()}?`} />
    </>
  );
}
