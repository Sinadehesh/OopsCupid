"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { calculateSabotageScore } from "@/lib/psychometrics/sabotage/scoring";
import SabotagePremiumReport from "../_components/SabotagePremiumReport";
import PremiumGate from "@/components/report/PremiumGate";
import YourAnswersSection from "@/components/report/premium/YourAnswersSection";
import { buildEvidence, humanise } from "@/lib/report/evidence";
import { sabotageQuestions } from "@/lib/psychometrics/sabotage/questions";

const SABOTAGE_SCALE = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];

export default function SabotagePremiumPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  /** Answers are stored as a positional array by this quiz, not a map. */
  const [answers, setAnswers] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try reading pre-computed result first
    // Read the answers regardless of which branch supplies the result:
    // the report quotes them back, so they matter even when the scores
    // were already computed.
    const stored = localStorage.getItem("oc_sabotage_answers");
    if (stored) {
      try {
        setAnswers(JSON.parse(stored));
      } catch (_) {
        // Unreadable: the report simply renders without that section.
      }
    }

    const raw = localStorage.getItem("oc_sabotage_result");
    if (raw) {
      try {
        setResult(JSON.parse(raw));
        return;
      } catch (_) {
        // fall through to re-compute from raw answers
      }
    }

    // Fall back: re-compute from raw answers if available
    const rawAnswers = localStorage.getItem("oc_sabotage_answers");
    if (rawAnswers) {
      try {
        const parsed: number[] = JSON.parse(rawAnswers);
        setAnswers(parsed);
        setResult(calculateSabotageScore(parsed));
        return;
      } catch (_) {
        // fall through to error
      }
    }

    setError("No quiz data found. Please complete the assessment first.");
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1d0] px-4 text-center">
        <AlertTriangle className="w-16 h-16 text-[#dd1c1a] mb-6" />
        <h2 className="text-3xl font-black text-[#086788] mb-4">Access Denied</h2>
        <p className="text-lg font-medium text-[#086788]/80 max-w-md mb-8">{error}</p>
        <button
          onClick={() => router.push("/why-do-i-sabotage-relationships")}
          className="px-8 py-4 bg-[#086788] text-white rounded-xl font-black shadow-md hover:bg-[#06aed5] transition-colors"
        >
          Return to Quiz
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1d0] px-4">
        <div className="w-16 h-16 border-8 border-[#d6d2d2] border-t-[#06aed5] rounded-full animate-spin mb-6" />
        <p className="text-[#086788] font-black text-lg">Loading your results…</p>
      </div>
    );
  }

  return (
    <PremiumGate returnTo="/why-do-i-sabotage-relationships/premium">
      <main className="min-h-screen bg-[#fff1d0]">
        <SabotagePremiumReport result={result} />
        <YourAnswersSection
          accent="#dd1c1a"
          evidence={
            answers
              ? buildEvidence(
                  sabotageQuestions.map((q: any) => ({
                    id: q.id,
                    text: q.text,
                    category: humanise(q.subscale),
                    options: SABOTAGE_SCALE,
                    min: 0,
                  })),
                  // Positional array -> the id-keyed map buildEvidence wants.
                  Object.fromEntries(
                    sabotageQuestions.map((q: any, i: number) => [q.id, answers[i]])
                  )
                )
              : undefined
          }
        />
      </main>
    </PremiumGate>
  );
}
