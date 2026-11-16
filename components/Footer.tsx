import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { WORK } from "@/lib/work";
import { Container } from "./ui";

export function Footer() {
  const profiles = [
    { href: SITE.profiles.github, label: "GitHub" },
    { href: SITE.profiles.linkedin, label: "LinkedIn" },
    { href: SITE.profiles.upwork, label: "Upwork" },
    { href: SITE.profiles.fiverr, label: "Fiverr" },
  ];

  return (
    <footer className="mt-24 border-t border-line">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl font-medium">{SITE.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {SITE.jobTitle}. Based in {SITE.locality}, {SITE.countryName}, working with teams worldwide.
          </p>
          <a href={`mailto:${SITE.email}`} className="mt-4 inline-block text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-accent">
            {SITE.email}
          </a>
        </div>
        <FooterList title="Services" links={SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.name }))} />
        <FooterList title="Case studies" links={WORK.slice(0, 5).map((w) => ({ href: `/work/${w.slug}`, label: w.client }))} />
        <FooterList title="Elsewhere" links={profiles} external />
      </Container>
      <Container className="border-t border-line py-6 text-xs text-muted">
        © {new Date().getFullYear()} {SITE.name}
      </Container>
    </footer>
  );
}

function FooterList({
  title,
  links,
  external,
}: {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.map((l) => (
          <li key={l.href}>
            {external ? (
              <a href={l.href} rel="me noopener" target="_blank" className="hover:text-ink">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
