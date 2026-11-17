import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Marked } from "marked";

// Posts are Markdown files in content/blog with a small frontmatter block.
// Drafts render under `pnpm dev` (and with SHOW_DRAFTS=1) so they can be read in
// place; a production build only contains posts whose status is "published".

const DIR = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  /** H1 — written for the reader. */
  title: string;
  /** <title> — written for the search, ≤60 chars. */
  seoTitle: string;
  description: string;
  targetQuery: string;
  service: string;
  caseStudy?: string;
  status: "draft" | "published" | "held";
  /** ISO date; null until published. */
  published: string | null;
  updated: string | null;
  html: string;
  toc: { id: string; text: string }[];
  minutes: number;
};

const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

function frontmatter(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("Post is missing its frontmatter block");
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  return { meta, body: m[2] };
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function render(body: string) {
  const toc: Post["toc"] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      // External links open in a new tab; site links stay in place.
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>` : `<a href="${href}"${t}>${text}</a>`;
      },
    },
  });
  let html = marked.parse(body, { async: false });
  // A blockquote that opens with a bold label is a callout: Short answer, Tip, Note, Warning.
  html = html.replace(/<blockquote>\s*<p><strong>(Short answer|Tip|Note|Warning):?<\/strong>/g, (_, label: string) => {
    const kind = label === "Short answer" ? "answer" : label.toLowerCase();
    return `<blockquote class="callout callout-${kind}"><p><strong>${label}${kind === "answer" ? "" : ":"}</strong>`;
  });
  // Wide tables scroll inside their own box instead of the page.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");
  return { html, toc };
}

function load(file: string): Post {
  const { meta, body } = frontmatter(readFileSync(path.join(DIR, file), "utf8"));
  const { html, toc } = render(body);
  const words = body.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length;
  const nullable = (v?: string) => (!v || v === "null" ? null : v);
  return {
    slug: meta.slug || file.replace(/\.md$/, ""),
    title: meta.title,
    seoTitle: meta.seo_title || meta.title,
    description: meta.seo_description,
    targetQuery: meta.target_query,
    service: meta.service,
    caseStudy: meta.case_study,
    status: (meta.status as Post["status"]) || "draft",
    published: nullable(meta.published),
    updated: nullable(meta.updated),
    html,
    toc,
    minutes: Math.max(1, Math.round(words / 230)),
  };
}

let cache: Post[] | null = null;

export function getPosts(): Post[] {
  if (!cache || process.env.NODE_ENV !== "production") {
    cache = readdirSync(DIR)
      .filter((f) => f.endsWith(".md"))
      .map(load)
      .filter((p) => p.status === "published" || (SHOW_DRAFTS && p.status === "draft"))
      // Newest first; drafts (no date) after published posts, by title.
      .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? "") || a.title.localeCompare(b.title));
  }
  return cache;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

/** Posts a search engine may see: published ones only. */
export const publishedPosts = () => getPosts().filter((p) => p.status === "published");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
