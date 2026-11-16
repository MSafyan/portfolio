import Image from "next/image";
import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { VideoBlock } from "@/components/VideoBlock";
import { ContactCta } from "@/components/ContactCta";
import { Arrow, ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { CERTIFICATIONS, REVIEWS } from "@/lib/profile";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { VIDEOS } from "@/lib/videos";
import { WORK } from "@/lib/work";

export const metadata = buildMetadata({
  title: "Muhammad Safyan — Full-Stack, AI & Data Engineer for Hire",
  description:
    "Freelance full-stack, AI and data engineer with 5+ years shipping SaaS products: Next.js and Node.js apps, OpenAI integrations and Azure or Snowflake data warehouses.",
  path: "/",
  type: "profile",
});

const PROOF = [
  { value: "95%", label: "LLM cost cut on a production AI platform" },
  { value: "58x", label: "more weekly Google impressions for an e-commerce store" },
  { value: "19", label: "lead-gen sites running on one Next.js codebase" },
  { value: "5+ yrs", label: "shipping for clients in the US, UK, EU and Australia" },
];

const STEPS = [
  {
    title: "Audit and plan",
    body: "A discovery call, or a short audit if there is existing code. You get a written plan: what to build or fix first, the risks, and a timeline.",
  },
  {
    title: "Build in the open",
    body: "Small, reviewable increments in your repository, deployed to a preview you can click. Regular written updates, so you always know where things stand.",
  },
  {
    title: "Ship and hand over",
    body: "Automated deploys, monitoring and documentation, so your team can run it without me — or I stay on for the next phase.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <Eyebrow>Available for new projects</Eyebrow>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Full-stack, AI and data engineer for teams that need it <span className="text-accent">shipped</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
              I&rsquo;m {SITE.name}. I build SaaS products end to end — Next.js and Node.js apps, AI features on
              OpenAI, and data warehouses on Azure and Snowflake — with the cloud, payments and pipelines that keep
              them running.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">
                Start a project <Arrow />
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                See the work
              </ButtonLink>
            </div>
          </div>
          <div className="relative hidden w-64 shrink-0 lg:block">
            <Image
              src={SITE.image}
              alt={`${SITE.name}, full-stack, AI and data engineer`}
              width={300}
              height={400}
              priority
              sizes="256px"
              className="aspect-[3/4] w-64 rounded-3xl object-cover"
            />
          </div>
        </Container>
      </section>

      <section aria-label="Results" className="border-b border-line">
        <Container>
          <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {PROOF.map((p) => (
              <div key={p.label} className="bg-bg px-1 py-8 sm:px-6 first:pl-0">
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="block font-serif text-3xl font-medium tabular-nums sm:text-4xl">{p.value}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{p.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="services-heading" className="mt-24">
        <Container>
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="Three things I do well, and do every week"
            intro="Hire me for one, or for the whole product. Each service page explains what you get and shows the projects behind it."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <li key={s.slug} className="group relative flex flex-col rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-ink">
                <span className="font-serif text-sm text-muted tabular-nums">0{i + 1}</span>
                <h3 className="mt-6 font-serif text-2xl font-medium tracking-tight">
                  <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{s.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Main tools">
                  {s.stack.slice(0, 5).map((t) => (
                    <li key={t} className="rounded-full bg-bg px-2.5 py-1 text-xs font-medium text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Learn more <Arrow />
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="work-heading" className="mt-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Selected work</Eyebrow>
              <h2 id="work-heading" className="mt-3 font-serif text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
                Case studies with the numbers left in
              </h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              All {WORK.length} case studies <Arrow />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {WORK.slice(0, 4).map((w) => (
              <CaseStudyCard key={w.slug} study={w} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="intro-video-heading" className="mt-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Three-minute intro</Eyebrow>
              <h2 id="intro-video-heading" className="mt-3 font-serif text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
                See how I work before we talk
              </h2>
            </div>
            <Link href="/videos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              All {VIDEOS.length} walkthroughs <Arrow />
            </Link>
          </div>
          <div className="mt-10">
            <VideoBlock video={VIDEOS[0]} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="process-heading" className="mt-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>How I work</Eyebrow>
            <h2 id="process-heading" className="mt-3 font-serif text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
              Senior ownership, without the agency overhead
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              You work directly with the engineer writing the code. Certified on the platforms I deploy to:
            </p>
            <ul className="mt-6 space-y-3">
              {CERTIFICATIONS.map((c) => (
                <li key={c.name}>
                  <a href={c.url} target="_blank" rel="noopener" className="group flex items-start gap-3 text-sm font-medium">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-accent" fill="currentColor">
                      <path d="M10 1.5 12.2 4l3.3-.3.4 3.3L18.5 9 16.6 11.7l.3 3.3-3.3.4L11.6 18 10 16.4 7.6 18l-1.9-2.6-3.3-.4.3-3.3L1.5 9l2.6-2 .4-3.3 3.3.3Zm3.3 6-1-1-3.3 3.3L7.4 8.2l-1 1L9 11.8Z" />
                    </svg>
                    <span className="underline decoration-line underline-offset-4 group-hover:decoration-accent">{c.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 rounded-3xl border border-line p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif text-lg text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="reviews-heading" className="mt-28">
        <Container>
          <SectionHeading id="reviews-heading" eyebrow="Client reviews" title="What clients say after the project" />
          <ul className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3">
            {REVIEWS.map((r) => (
              <li key={r.author} className="mb-5 break-inside-avoid rounded-3xl border border-line bg-surface p-6">
                <figure>
                  <blockquote className="font-serif text-lg leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold">{r.author}</span>
                    <span className="text-muted">
                      {" "}
                      · {r.context} · via {r.platform}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
