import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BAND, Container, SectionHeading, Tag } from "@/components/ui";
import { midSentence } from "@/lib/text";
import { CERTIFICATIONS, EXPERIENCE, SKILLS } from "@/lib/profile";
import { PERSON_ID, breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Muhammad Safyan — Experience and Certifications",
  description:
    "Muhammad Safyan: full-stack, AI and data engineer with 5+ years of experience, AWS Solutions Architect and CKAD certified, working remotely worldwide.",
  path: "/about",
  type: "profile",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbs(CRUMBS), {
          "@type": "ProfilePage",
          url: absoluteUrl("/about"),
          mainEntity: { "@id": PERSON_ID },
        })}
      />
      <PageHeader
        crumbs={CRUMBS}
        eyebrow="About"
        title="Engineer first, with the whole system in view"
        intro={`I'm ${SITE.name}, a ${midSentence(SITE.jobTitle)} based in ${SITE.locality}, ${SITE.countryName}. For over five years I have owned products end to end for clients in the US, UK, Sweden and Australia — from the interface and the API to the data warehouse and the cloud underneath.`}
      />

      <Container className="mt-16 grid gap-14 lg:grid-cols-[18rem_1fr]">
        <div>
          <Image
            src={SITE.image}
            alt={`Portrait of ${SITE.name}`}
            width={300}
            height={400}
            sizes="(min-width: 1024px) 288px, 60vw"
            className="aspect-[3/4] w-full max-w-72 rounded-3xl object-cover"
          />
        </div>
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
          <p>
            I like the work most companies find awkward: the payment flow that has to be right, the warehouse where
            two systems disagree about the same sale, the AI feature that works in a demo but costs too much in
            production. I find the cause, fix it properly and write down why.
          </p>
          <p>
            Most of my clients hire me for one thing — a back end, a pipeline, an integration — and keep me on for
            the next, because I leave systems documented, deployed by automation and cheaper to run than I found
            them.
          </p>
          <p className="text-muted">
            BS Software Engineering, COMSATS University Islamabad. I work in English, with overlap hours for teams in
            Europe, the US and Australia.
          </p>
        </div>
      </Container>

      <section aria-labelledby="experience-heading" className="mt-24">
        <Container>
          <SectionHeading id="experience-heading" eyebrow="Experience" title="Recent roles" />
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {EXPERIENCE.map((e) => (
              <li key={e.company} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <p className="text-sm text-muted tabular-nums">{e.period}</p>
                <div>
                  <h3 className="text-lg font-semibold">
                    {e.role} · {e.company}
                    <span className="font-normal text-muted"> ({e.region})</span>
                  </h3>
                  <p className="mt-1 leading-relaxed text-muted">{e.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="certs-heading" className={`mt-24 ${BAND}`}>
        <Container>
          <SectionHeading id="certs-heading" eyebrow="Certifications" title="Verified on Credly" />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener"
                  className="flex h-full flex-col items-start rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-ink"
                >
                  <Image
                    src={c.badge}
                    alt={`${c.name} badge`}
                    width={120}
                    height={120}
                    className={`size-28 object-contain ${c.expired ? "opacity-50 grayscale" : ""}`}
                  />
                  <p className="mt-5 text-sm text-muted">{c.issuer}</p>
                  <p className="mt-2 font-serif text-xl leading-snug font-medium">{c.name}</p>
                  {c.expired && (
                    <p className="mt-2 rounded-full bg-line px-2.5 py-0.5 text-xs font-semibold text-muted">Expired</p>
                  )}
                  <p className="mt-auto pt-4 text-sm font-semibold text-accent">Verify on Credly ↗</p>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="skills-heading" className="mt-24">
        <Container>
          <SectionHeading id="skills-heading" eyebrow="Skills" title="Tools I use in production" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <dt className="text-sm font-semibold">{s.group}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {s.items.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
