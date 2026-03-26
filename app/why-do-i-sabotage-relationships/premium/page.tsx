"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { calculateSabotageScore } from "@/lib/psychometrics/sabotage/scoring";
import SabotagePremiumReport from "../_components/SabotagePremiumReport";

export default function SabotagePremiumPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try reading pre-computed result first
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
        const answers: number[] = JSON.parse(rawAnswers);
        setResult(calculateSabotageScore(answers));
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
    <main className="min-h-screen bg-[#fff1d0]">
      <SabotagePremiumReport result={result} />
    </main>
  );
}
