import { type Video, fmt } from "@/lib/videos";
import { YouTube } from "./YouTube";

// A video with its chapter list. Chapter links open YouTube at that second.
export function VideoBlock({ video, start = 0, headingLevel = "h3" }: { video: Video; start?: number; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <YouTube id={video.id} title={video.title} start={start} />
      <div>
        <Heading className="font-serif text-2xl leading-snug font-medium tracking-tight">{video.title}</Heading>
        <p className="mt-2 text-sm text-muted">{fmt(video.duration)} min</p>
        <p className="mt-3 leading-relaxed text-muted">{video.description}</p>
        <ol className="mt-4 space-y-1.5 text-sm">
          {video.chapters.slice(1).map((c) => (
            <li key={c.t}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}&t=${c.t}`}
                target="_blank"
                rel="noopener"
                className="group flex gap-3 hover:text-accent"
              >
                <span className="w-10 shrink-0 text-muted tabular-nums group-hover:text-accent">{fmt(c.t)}</span>
                <span>{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
