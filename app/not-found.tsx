import { ButtonLink, Container } from "@/components/ui";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight">This page doesn&rsquo;t exist</h1>
      <p className="mt-4 text-lg text-muted">It may have moved when the site was rebuilt.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Case studies
        </ButtonLink>
      </div>
    </Container>
  );
}
