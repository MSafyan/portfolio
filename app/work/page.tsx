import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BAND, Container } from "@/components/ui";
import { breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import Image from "next/image";
import { MORE_PROJECTS, WORK } from "@/lib/work";
import { Tag } from "@/components/ui";

export const metadata = buildMetadata({
  title: "Case Studies: SaaS, AI and Data Engineering Projects",
  description:
    "Case studies from production projects: an AI matching platform, a Swedish payments marketplace, Azure data warehouses and a Snowflake ETL — each with measured results.",
  path: "/work",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbs(CRUMBS), {
          "@type": "ItemList",
          itemListElement: WORK.map((w, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/work/${w.slug}`),
            name: w.title,
          })),
        })}
      />
      <PageHeader
        crumbs={CRUMBS}
        eyebrow="Case studies"
        title="Production work, with the results measured"
        intro={`${WORK.length} case studies from projects that shipped to real users — the problem, what I built, the hard parts and what changed, in numbers — plus ${MORE_PROJECTS.length} earlier builds.`}
      />
      {SERVICES.map((s, i) => {
        const items = WORK.filter((w) => w.service === s.slug);
        return (
          <section key={s.slug} aria-labelledby={`${s.slug}-heading`} className={i % 2 ? `mt-20 ${BAND}` : "mt-20"}>
            <Container>
              <h2 id={`${s.slug}-heading`} className="font-serif text-3xl font-medium tracking-tight">
                {s.name}
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {items.map((w) => (
                  <CaseStudyCard key={w.slug} study={w} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
      <section aria-labelledby="more-heading" className="mt-24">
        <Container>
          <h2 id="more-heading" className="font-serif text-3xl font-medium tracking-tight">
            More projects
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">Earlier and smaller builds — web, mobile and automation.</p>
          <ul className="mt-8 grid items-start gap-5 md:grid-cols-2">
            {MORE_PROJECTS.map((p) => (
              <li key={p.name} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface">
                {p.shot && (
                  <Image
                    src={p.shot.src}
                    alt={p.shot.alt}
                    width={p.shot.width}
                    height={p.shot.height}
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="aspect-[16/9] w-full border-b border-line object-cover object-top"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-xl font-medium">{p.name}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
