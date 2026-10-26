import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";
import QuizSeoFooter from "@/components/seo/QuizSeoFooter";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.oopscupid.com/what-kind-of-person-do-i-attract" },
  title: "Who Do I Attract? Free Quiz: What Kind of Person Do I Attract",
  description: "Explore what kind of person you attract with a free 78-question assessment, about 10 minutes, and get your result on screen.",
};

export default function QuizPage() {
  return (
    <>
      <MainHero
        headline="What Kind of Person Do I Attract?"
        subheadline="Answer 78 questions, about 10 minutes, and get your attraction pattern on screen."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/attraction-patterns" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Attraction Patterns Hub
            </Link>
        </div>
        <QuizWidget quizName="what-kind-of-person-do-i-attract" />
      </div>
    <QuizSeoFooter slug="/what-kind-of-person-do-i-attract" />
    </>
  );
}