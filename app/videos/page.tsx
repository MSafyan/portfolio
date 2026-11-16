import { ContactCta } from "@/components/ContactCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { VideoBlock } from "@/components/VideoBlock";
import { Container } from "@/components/ui";
import { breadcrumbs, graph, videoNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { VIDEOS } from "@/lib/videos";

export const metadata = buildMetadata({
  title: "Video Walkthroughs of Real Projects",
  description:
    "Screen-recorded walkthroughs of production work: full-stack apps, AI features, data pipelines, automation and taking over an existing codebase — with chapters.",
  path: "/videos",
});

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Videos", path: "/videos" },
];

export default function VideosPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbs(CRUMBS), ...VIDEOS.map((v) => videoNode(v, "/videos")))} />
      <PageHeader
        crumbs={CRUMBS}
        eyebrow="Videos"
        title="Watch me walk through the work"
        intro="Real projects, recorded on screen: what was built, the hard part, and how I solved it. Jump to any chapter."
      />
      <Container className="mt-16 space-y-20">
        {VIDEOS.map((v) => (
          <section key={v.id} id={v.slug} className="scroll-mt-24">
            <VideoBlock video={v} headingLevel="h2" />
          </section>
        ))}
      </Container>
      <ContactCta />
    </>
  );
}
