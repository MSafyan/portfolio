import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { BUSINESS_ID, breadcrumbs, graph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Hire Muhammad Safyan — Contact",
  description:
    "Start a project with Muhammad Safyan: send a short brief about your SaaS, AI or data project by form or email, or hire through Upwork with payment protection.",
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
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}?subject=Project%20enquiry`, note: "Write directly from your inbox" },
    { label: "Upwork", value: "Hire on Upwork", href: SITE.profiles.upwork, note: "Payment protection, hourly or fixed price" },
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
        intro="A few lines are enough to start. I will reply by email with questions, or with a short plan if the brief is clear."
      />
      <Container className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="sr-only">Send a message</h2>
          <ContactForm />
        </div>
        <div className="space-y-6">
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
          </div>
          <div>
            <h2 className="text-sm font-semibold">Prefer another channel?</h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "me noopener" } : {})}
                    className="flex items-baseline justify-between gap-4 py-3.5 hover:text-accent"
                  >
                    <span className="font-medium">{c.label}</span>
                    <span className="text-right text-sm text-muted break-all">{c.label === "Email" ? c.value : c.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Based in {SITE.locality}, {SITE.countryName} (UTC+5). Working remotely with clients worldwide.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
