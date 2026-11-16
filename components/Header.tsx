import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-xl font-medium tracking-tight">
          {SITE.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/contact"
            className="ml-2 inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Hire me
          </Link>
        </nav>

        {/* No-JS mobile menu: <details> opens and closes natively. */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <details className="group relative">
            <summary
              aria-label="Menu"
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full hover:bg-line/60 [&::-webkit-details-marker]:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                <path className="hidden group-open:block" d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-black/5"
            >
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-base font-medium hover:bg-bg">
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
