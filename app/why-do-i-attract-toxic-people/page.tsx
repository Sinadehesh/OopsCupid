import React from "react";
import QuizEngine from "./_components/QuizEngine";
import { QuizJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import QuizFaq from "@/components/seo/QuizFaq";
import RelatedQuizzes from "@/components/seo/RelatedQuizzes";
import { quizRegistry } from "@/lib/quizzes/registry";

export const metadata = {
  title: "Why Do I Attract Toxic People? Free Pattern Quiz | OopsCupid",
  description:
    "Keep ending up with toxic partners? This free diagnostic maps the childhood loops and boundary gaps behind your pattern — and shows you how to break it.",
  alternates: { canonical: "https://oopscupid.com/why-do-i-attract-toxic-people" },
  openGraph: {
    title: "Why Do I Attract Toxic People? Pattern Diagnostic",
    description:
      "Map the hidden pattern that keeps picking toxic partners for you. Free, instant result.",
    url: "https://oopscupid.com/why-do-i-attract-toxic-people",
    type: "website",
  },
};

const FAQ = [
  {
    q: "Why do I keep attracting toxic people?",
    a: "It's rarely bad luck. Most repeat patterns come from three sources working together: an attachment template formed in childhood (what love 'feels like' to your nervous system), boundary gaps that toxic people are unusually good at detecting, and a mismatch between what you say you want and what feels familiar. This quiz measures all three so you can see which one is driving your pattern.",
  },
  {
    q: "Do toxic people target certain personalities?",
    a: "Manipulative people do preferentially pursue partners who are empathetic, conflict-avoidant, quick to give second chances, and slow to enforce boundaries. Those are genuinely good qualities — the fix isn't to become colder, it's to add screening and boundaries on top of them.",
  },
  {
    q: "Can I actually change my 'type'?",
    a: "Yes — attraction templates are learned, which means they can be relearned. The process is concrete: identify your pattern's origin, learn to notice when the 'spark' is actually a threat response, and recalibrate toward partners who feel calm instead of chaotic. Your result includes the first steps for your specific pattern.",
  },
];

export default function AttractToxicQuizPage() {
  const quiz = quizRegistry.find((q) => q.slug === "/why-do-i-attract-toxic-people")!;

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <QuizJsonLd quiz={quiz} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", slug: "/" },
          { name: "My Patterns", slug: "/me" },
          { name: "Why Do I Attract Toxic People?", slug: "/why-do-i-attract-toxic-people" },
        ]}
      />
      <QuizEngine />
      <QuizFaq items={FAQ} heading="Why Do I Attract Toxic People? — Common Questions" />
      <RelatedQuizzes currentSlug="/why-do-i-attract-toxic-people" />
    </main>
  );
}
