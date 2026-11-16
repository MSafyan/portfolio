import Image from "next/image";
import Link from "next/link";
import { getService } from "@/lib/services";
import type { CaseStudy } from "@/lib/work";
import { Arrow } from "./ui";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const shot = study.shots[0];
  const lead = study.metrics[0];
  // Phone screenshots: show the whole screen centred instead of cropping the top.
  const portrait = shot && shot.height > shot.width;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-shadow hover:shadow-xl hover:shadow-black/5">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-accent-soft">
        {shot ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
            className={`transition-transform duration-500 group-hover:scale-[1.02] ${
              portrait ? "object-contain py-6" : "object-cover object-top"
            }`}
          />
        ) : (
          // Typographic cover for projects with no shareable screenshots.
          <div className="flex h-full flex-col justify-end p-6">
            <p className="font-serif text-5xl font-medium tracking-tight text-accent sm:text-6xl">{lead.value}</p>
            <p className="mt-1 text-sm font-medium text-muted">{lead.label}</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-muted uppercase">
          {study.client} · {getService(study.service)?.name}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-snug font-medium tracking-tight text-balance">
          <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0">
            {study.name}
          </Link>
        </h3>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
          {study.metrics.slice(shot ? 0 : 1, shot ? 2 : 3).map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-xl font-semibold tabular-nums">{m.value}</span>
                <span className="text-sm text-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read the case study <Arrow />
        </span>
      </div>
    </article>
  );
}
