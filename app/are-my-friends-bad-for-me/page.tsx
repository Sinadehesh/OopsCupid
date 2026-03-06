import Hero from "@/components/ui/Hero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Are My Friends Bad for Me? | OopsCupid Quiz",
  description: "Find out the answer to are my friends bad for me? with our quick psychological assessment.",
};

export default function QuizPage() {
  return (
    <>
      <Hero
        headline="Are My Friends Bad for Me?"
        subheadline="Take this quick quiz to gain some objective clarity."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
            <Link href="/toxic-friendships" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Toxic Friendships Hub
            </Link>
        </div>
        <QuizWidget quizName="Are My Friends Bad for Me?" />
      </div>
    </>
  );
}