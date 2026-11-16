"use client";

import Image from "next/image";
import { useState } from "react";
import { thumb } from "@/lib/videos";

// Click-to-load facade: a thumbnail and play button until the visitor asks for
// the video. A YouTube iframe costs ~1 MB of script, so it is never loaded
// up front. Uses youtube-nocookie so no YouTube cookies before play.
export function YouTube({ id, title, start = 0, priority }: { id: string; title: string; start?: number; priority?: boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&start=${start}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full" aria-label={`Play video: ${title}`}>
          <Image src={thumb(id)} alt="" fill sizes="(min-width: 1024px) 720px, 100vw" priority={priority} className="object-cover" />
          <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
          <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-ink shadow-xl transition-transform group-hover:scale-110">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
