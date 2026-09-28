import type { Metadata } from "next";
import PhrasePicker from "./_components/PhrasePicker";
import { PHRASES } from "@/lib/quizzes/thingsHeSays";

const baseUrl = "https://www.oopscupid.com";

/**
 * The share card. A link in a TikTok bio with no preview image is a grey
 * rectangle, which is the difference between a tap and a scroll, and the
 * page had none: openGraph was declared without an image at all.
 */
const shareCard = `${baseUrl}/api/og?t=${encodeURIComponent(
  "Which of these has he said to you?"
)}&q=${encodeURIComponent("16 phrases · 40 seconds")}`;

/**
 * The landing page paid social points at.
 *
 * It is a separate route from the full diagnostic on purpose. A cold
 * visitor and a searcher want different first screens: the searcher has
 * already asked a question and will answer ninety-three items to get it
 * settled, while the visitor has given us one scroll to earn a second one.
 * Pointing both at the same page means losing one of them, and it has been
 * losing the visitor.
 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Which Of These Has He Said To You? 16 Phrases, 40 Seconds",
  description:
    "Sixteen sentences people hear in relationships that are going wrong. Tap the ones you recognise and find out what each is doing in the conversation. Free, no sign-up.",
  alternates: { canonical: `${baseUrl}/things-he-says` },
  openGraph: {
    title: "Which of these has he said to you?",
    description:
      "Sixteen ordinary sentences. Tap the ones you recognise. Forty seconds, no sign-up.",
    url: `${baseUrl}/things-he-says`,
    type: "website",
    images: [{ url: shareCard, width: 1200, height: 630, alt: "Which of these has he said to you?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Which of these has he said to you?",
    description: "Sixteen ordinary sentences. Tap the ones you recognise.",
    images: [shareCard],
  },
};

export default function ThingsHeSaysPage() {
  // Marked up as a Quiz so the phrases themselves can surface in search,
  // which is the same asset doing two jobs: the hook for a video and the
  // long-tail text for anyone typing one of these sentences into Google.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Which of these has he said to you?",
    url: `${baseUrl}/things-he-says`,
    educationalLevel: "beginner",
    about: { "@type": "Thing", name: "Manipulation tactics in relationships" },
    hasPart: PHRASES.map((p) => ({
      "@type": "Question",
      name: `Has he said "${p.text}"`,
      acceptedAnswer: { "@type": "Answer", text: p.text },
    })),
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PhrasePicker />
    </main>
  );
}
