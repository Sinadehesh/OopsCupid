import Hero from "@/components/ui/Hero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Kind of Person Do I Attract? | OopsCupid Quiz",
  description: "Find out the answer to what kind of person do i attract? with our quick psychological assessment.",
};

export default function QuizPage() {
  return (
    <>
      <Hero
        headline="What Kind of Person Do I Attract?"
        subheadline="Take this quick quiz to gain some objective clarity."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/attraction-patterns" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Attraction Patterns Hub
            </Link>
        </div>
        <QuizWidget quizName="What Kind of Person Do I Attract?" />
      </div>
    </>
  );
}