import ManipulationQuizEngine from "./_components/ManipulationQuizEngine";
import { Metadata } from "next";
import { QuizJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import QuizFaq from "@/components/seo/QuizFaq";
import RelatedQuizzes from "@/components/seo/RelatedQuizzes";
import { quizRegistry } from "@/lib/quizzes/registry";

export const metadata: Metadata = {
  title: "Is He Manipulative? Free Manipulation Tactics Test | OopsCupid",
  description:
    "Is it manipulation or just conflict? This free screening test identifies the exact tactics being used on you — guilt trips, DARVO, silent treatment — with an instant result.",
  alternates: { canonical: "https://oopscupid.com/is-he-manipulative" },
  openGraph: {
    title: "Is He Manipulative? Manipulation Tactics Test",
    description:
      "Identify the exact manipulation tactics being used on you and get scripts to shut them down. Free, 3 minutes.",
    url: "https://oopscupid.com/is-he-manipulative",
    type: "website",
  },
};

const FAQ = [
  {
    q: "What's the difference between manipulation and normal conflict?",
    a: "Healthy conflict is two people arguing about a problem. Manipulation is one person managing your perception so the problem can never be discussed: your complaints get turned back on you, your memory gets questioned, and you leave arguments apologizing for things you didn't do. If you consistently feel confused and guilty after disagreements, that pattern is worth measuring.",
  },
  {
    q: "What is DARVO?",
    a: "DARVO stands for Deny, Attack, Reverse Victim and Offender — the most common defensive pattern in manipulative relationships. You raise a concern; he denies it happened, attacks your character or motives, and ends up positioned as the real victim of your 'accusations.' Recognizing DARVO in real time is one of the most protective skills you can build, and it's part of what this test screens for.",
  },
  {
    q: "Can a manipulative partner change?",
    a: "Sometimes — but only with genuine accountability, which looks like: acknowledging specific behaviors without minimizing, tolerating your boundaries without punishment, and sustained change over months rather than a good week after a blow-up. Your result explains what change would need to look like for the specific tactics in play.",
  },
];

export default function IsHeManipulativePage() {
  const quiz = quizRegistry.find((q) => q.slug === "/is-he-manipulative")!;

  return (
    <main className="bg-[#fafafa] min-h-screen">
      <QuizJsonLd quiz={quiz} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", slug: "/" },
          { name: "His Behavior", slug: "/him" },
          { name: "Is He Manipulative?", slug: "/is-he-manipulative" },
        ]}
      />
      {/* This renders our brand new, crash-proof engine */}
      <ManipulationQuizEngine />
      <QuizFaq items={FAQ} heading="Is He Manipulative? — Common Questions" />
      <RelatedQuizzes currentSlug="/is-he-manipulative" />
    </main>
  );
}
