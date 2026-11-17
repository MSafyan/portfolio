import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** A full-width tinted band, used on every other section so sections read as separate. */
export const BAND = "border-y border-line bg-band py-20 sm:py-24";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-3 font-serif text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
    </div>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-ink text-bg hover:bg-accent hover:text-accent-ink"
      : "border border-line text-ink hover:border-ink";
  return <Link {...props} className={`${base} ${styles} ${className}`} />;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">{children}</li>
  );
}

export function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h10m-4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
