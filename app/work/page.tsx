import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { WORK } from "@/lib/work";

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
        intro="Every project here shipped to real users. Each case study covers the problem, what I built and what changed — in numbers."
      />
      {SERVICES.map((s) => {
        const items = WORK.filter((w) => w.service === s.slug);
        return (
          <section key={s.slug} aria-labelledby={`${s.slug}-heading`} className="mt-20">
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
      <ContactCta />
    </>
  );
}
