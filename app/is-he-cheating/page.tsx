import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is He Cheating? | OopsCupid Quiz",
  description: "Find out the answer to is he cheating? with our quick psychological assessment.",
};

export default function QuizPage() {
  return (
    <>
      <MainHero
        headline="Is He Cheating?"
        subheadline="Take this quick quiz to gain some objective clarity."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/relationship-red-flags" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Relationship Red Flags Hub
            </Link>
        </div>
        <QuizWidget quizName="Is He Cheating?" />
      </div>
    </>
  );
}