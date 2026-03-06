import Hero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Do I Attract Toxic People? | OopsCupid Quiz",
  description: "Find out the answer to why do i attract toxic people? with our quick psychological assessment.",
};

export default function QuizPage() {
  return (
    <>
      <MainHero
        headline="Why Do I Attract Toxic People?"
        subheadline="Take this quick quiz to gain some objective clarity."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/attraction-patterns" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Attraction Patterns Hub
            </Link>
        </div>
        <QuizWidget quizName="Why Do I Attract Toxic People?" />
      </div>
    </>
  );
}