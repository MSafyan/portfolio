import { SITE } from "@/lib/site";
import Link from "next/link";
import { Container } from "./ui";

export function ContactCta({ title = "Have a project in mind?" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="mt-24">
      <Container>
        <div className="rounded-3xl bg-ink px-6 py-14 text-bg sm:px-12 sm:py-16">
          <h2 id="cta-heading" className="max-w-2xl font-serif text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed opacity-80">
            Tell me what you are building and where it hurts, and I will come back with questions or a plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${SITE.email}?subject=Project%20enquiry`}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
            >
              Email {SITE.email}
            </a>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center rounded-full border border-bg/30 px-5 text-sm font-semibold text-bg transition-colors hover:border-bg"
            >
              See case studies
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
