import React from "react";
import GaslightingQuizEngine from "./_components/GaslightingQuizEngine";
import { QuizJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import QuizFaq from "@/components/seo/QuizFaq";
import RelatedQuizzes from "@/components/seo/RelatedQuizzes";
import { quizRegistry } from "@/lib/quizzes/registry";

export const metadata = {
  title: "Is He Gaslighting Me? Free Reality-Check Test | OopsCupid",
  description:
    "Constantly doubting your own memory? This free 50-item audit measures reality denial, invalidation, and self-trust erosion — with an instant, private result.",
  alternates: { canonical: "https://oopscupid.com/is-he-gaslighting-me" },
  openGraph: {
    title: "Is He Gaslighting Me? Reality-Check Test",
    description:
      "Stop asking yourself if you're crazy. Measure his behavior against the clinical gaslighting playbook.",
    url: "https://oopscupid.com/is-he-gaslighting-me",
    type: "website",
  },
};

const FAQ = [
  {
    q: "What are the classic gaslighting phrases?",
    a: "The recurring ones are: 'That never happened,' 'You're too sensitive,' 'You're remembering it wrong,' 'Everyone agrees you overreact,' and 'I never said that.' Any of these can appear once in a normal relationship — gaslighting is when they form the standard response to your concerns, so your memory itself becomes the topic instead of his behavior.",
  },
  {
    q: "How do I know it's gaslighting and not my anxiety?",
    a: "One reliable signal: check your reality against records. If texts, emails, and other people's accounts keep confirming your memory while he keeps denying it, that's gaslighting. If the records keep surprising you, anxiety may be doing the distorting. This test helps separate the two by scoring his behaviors and your self-trust independently.",
  },
  {
    q: "Why do I feel like I'm going crazy?",
    a: "Because that is the designed outcome of gaslighting: when someone you love and trust repeatedly denies your reality, your brain resolves the conflict by doubting itself. Feeling 'crazy' around one specific person — while functioning fine everywhere else — is itself a diagnostic clue worth taking seriously.",
  },
];

export default function GaslightingPage() {
  const quiz = quizRegistry.find((q) => q.slug === "/is-he-gaslighting-me")!;

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <QuizJsonLd quiz={quiz} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", slug: "/" },
          { name: "His Behavior", slug: "/him" },
          { name: "Is He Gaslighting Me?", slug: "/is-he-gaslighting-me" },
        ]}
      />
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">Is He Gaslighting Me?</h1>
        <p className="text-slate-500 text-lg">Stop guessing. Start measuring. Run a 50-point clinical screening on his behavior and your mental clarity.</p>
      </div>
      <GaslightingQuizEngine />
      <QuizFaq items={FAQ} heading="Gaslighting — Common Questions" />
      <RelatedQuizzes currentSlug="/is-he-gaslighting-me" />
    </main>
  );
}
