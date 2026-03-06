import Hero from "@/components/ui/Hero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is He Manipulative? | OopsCupid Quiz",
  description: "Find out the answer to is he manipulative? with our quick psychological assessment.",
};

export default function QuizPage() {
  return (
    <>
      <Hero
        headline="Is He Manipulative?"
        subheadline="Take this quick quiz to gain some objective clarity."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/relationship-red-flags" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Relationship Red Flags Hub
            </Link>
        </div>
        <QuizWidget quizName="Is He Manipulative?" />
      </div>
    </>
  );
}