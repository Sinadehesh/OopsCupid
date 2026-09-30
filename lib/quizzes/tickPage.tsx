import type { Metadata } from "next";
import TickPicker from "@/components/tick/TickPicker";
import { tickTestBySlug } from "@/lib/quizzes/tickTests";

const baseUrl = "https://www.oopscupid.com";

/** Metadata for a forty-second test, with a share card for TikTok bios. */
export function tickMetadata(slug: string): Metadata {
  const t = tickTestBySlug(slug)!;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(t.question)}&q=${encodeURIComponent("16 taps · 40 seconds")}`;
  return {
    metadataBase: new URL(baseUrl),
    title: t.seo.title,
    description: t.seo.description,
    alternates: { canonical: `${baseUrl}/${slug}` },
    openGraph: {
      title: t.question,
      description: t.seo.description,
      url: `${baseUrl}/${slug}`,
      type: "website",
      images: [{ url: card, width: 1200, height: 630, alt: t.question }],
    },
    twitter: { card: "summary_large_image", title: t.question, description: t.seo.description, images: [card] },
  };
}

/** The page body for a forty-second test. */
export function TickPage({ slug }: { slug: string }) {
  const t = tickTestBySlug(slug)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: t.question,
    url: `${baseUrl}/${slug}`,
    educationalLevel: "beginner",
    hasPart: t.items.map((i) => ({ "@type": "Question", name: i.text })),
  };
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TickPicker slug={slug} />
    </main>
  );
}
