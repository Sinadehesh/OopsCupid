import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.oopscupid.com/why-do-i-keep-dating-the-same-type" },
  title: "Why Do I Keep Dating the Same Type? | OopsCupid Quiz",
  description: "Explore why you keep dating the same type with a free 78-question assessment, about 10 minutes, and get your result on screen.",
};

export default function QuizPage() {
  return (
    <>
      <MainHero
        headline="Why Do I Keep Dating the Same Type?"
        subheadline="Answer 78 questions, about 10 minutes, and examine the pattern behind your repeated attractions."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/attraction-patterns" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Attraction Patterns Hub
            </Link>
        </div>
        <QuizWidget quizName="attraction-patterns" />
      </div>
    </>
  );
}