import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { BUSINESS_ID, breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hire Muhammad Safyan — Contact",
  description:
    "Start a project with Muhammad Safyan: email a short brief about your SaaS, AI or data project, or hire through Upwork or Fiverr with payment protection.",
  path: "/contact",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const BRIEF = [
  "What you are building, and who it is for",
  "What exists today — code, data, infrastructure",
  "What is blocking you, or what success looks like",
  "Your timeline, and a budget range if you have one",
];

export default function ContactPage() {
  const channels = [
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}?subject=Project%20enquiry`, note: "Best for direct contracts" },
    { label: "Upwork", value: "Hire on Upwork", href: SITE.profiles.upwork, note: "Payment protection, hourly or fixed price" },
    { label: "Fiverr", value: "Order on Fiverr", href: SITE.profiles.fiverr, note: "Smaller, well-defined jobs" },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: SITE.profiles.linkedin, note: "Full-time and contract roles" },
  ];

  return (
    <>
      <JsonLd
        data={graph(breadcrumbs(CRUMBS), {
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          about: { "@id": BUSINESS_ID },
        })}
      />
      <PageHeader
        crumbs={CRUMBS}
        eyebrow="Contact"
        title="Tell me about your project"
        intro="Email is fastest. A few lines are enough to start — I will reply with questions, or with a short plan if the brief is clear."
      />
      <Container className="mt-16 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "me noopener" } : {})}
                className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-ink"
              >
                <span className="text-sm text-muted">{c.label}</span>
                <span className="mt-2 font-serif text-xl font-medium break-all">{c.value}</span>
                <span className="mt-3 text-sm text-muted">{c.note}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="rounded-3xl bg-accent-soft p-7">
          <h2 className="font-serif text-2xl font-medium tracking-tight">What to include</h2>
          <ul className="mt-5 space-y-3 leading-relaxed">
            {BRIEF.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Based in {SITE.locality}, {SITE.countryName} (UTC+5). Working remotely with clients worldwide.
          </p>
        </div>
      </Container>
    </>
  );
}
