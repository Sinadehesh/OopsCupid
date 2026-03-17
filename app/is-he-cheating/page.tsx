import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is He Cheating? | Instant Diagnostic Audit | OopsCupid",
  description: "Take this 3-minute test to find out if he is hiding something, and get the exact steps on what to do next.",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <MainHero
        topSubheading="INSTANT DIAGNOSTIC AUDIT"
        headline="Stop Guessing. Find Out The Truth."
        subheadline="Take this 3-minute test. Find out if you are being paranoid, or if he is actually hiding something behind your back."
        cards={[]} /* This explicitly tells the hero NOT to render the default cards */
      />
      
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <div className="mb-8">
            <Link href="/him" className="inline-flex items-center text-[#DD1C1A] hover:text-[#b81715] font-extrabold tracking-wide uppercase text-sm transition-colors">
                &larr; Back to His Behavior Hub
            </Link>
        </div>
        
        {/* Added a nice container wrapper to make the quiz pop visually */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-2xl border border-slate-100">
            <QuizWidget quizName="is-he-cheating" />
        </div>
      </div>
    </main>
  );
}
