import Link from "next/link";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Arrow, Container } from "@/components/ui";
import { breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

export const metadata = buildMetadata({
  title: "Services: Full-Stack, AI Integration and Data Engineering",
  description:
    "Freelance software engineering services: full-stack SaaS development in Next.js and Node.js, OpenAI and LangChain integration, and Azure data engineering.",
  path: "/services",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbs(CRUMBS))} />
      <PageHeader
        crumbs={CRUMBS}
        eyebrow="Services"
        title="Software engineering services for SaaS teams"
        intro="Three services, one engineer. Each is backed by production projects with measured results — follow the links for the detail."
      />
      <Container className="mt-16">
        <ul className="divide-y divide-line border-y border-line">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="group relative grid gap-4 py-10 md:grid-cols-[4rem_1fr_1.3fr] md:gap-8">
              <span className="font-serif text-lg text-muted tabular-nums">0{i + 1}</span>
              <h2 className="font-serif text-3xl font-medium tracking-tight">
                <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                  {s.name}
                </Link>
              </h2>
              <div>
                <p className="text-lg leading-relaxed text-muted">{s.intro}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  What you get <Arrow />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
      <ContactCta />
    </>
  );
}
