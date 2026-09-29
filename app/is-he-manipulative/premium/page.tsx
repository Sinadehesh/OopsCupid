"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ManipulationMasterReport from "@/components/report/ManipulationMasterReport";
import OfferLadder from "@/components/offers/OfferLadder";
import CoachingUpsell from "@/components/offers/CoachingUpsell";
import { scoreToSeverity } from "@/lib/offers/catalog";
import PremiumGate from "@/components/report/PremiumGate";
import YourAnswersSection from "@/components/report/premium/YourAnswersSection";
import ProgramOffer from "@/components/program/ProgramOffer";
import { buildEvidence, humanise } from "@/lib/report/evidence";
import { MANIPULATION_QUESTIONS } from "@/lib/psychometrics/manipulation/questions";
import ScriptsAndPlan from "@/components/report/premium/ScriptsAndPlan";
import { scriptsFor, planFor } from "../_lib/scriptsPlan";

/**
 * The scale the quiz on /is-he-manipulative actually shows: five buttons,
 * 1 to 5, the same five for every item whatever its responseType. The
 * first version of this mapped the battery's own responseType scales,
 * which belong to an older widget and run 0 to 5 over six labels, so an
 * answer of "Often" was quoted back as "Very Often" and "Never" as
 * "Rarely". Misquoting the buyer is the one thing this section cannot do.
 */
const QUIZ_SCALE = ["Never", "Rarely", "Sometimes", "Often", "Always"];

export default function ManipulationPremiumPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("manipulation_result");
    if (stored) {
      try { setData(JSON.parse(stored)); } catch (e) {}
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>;
  if (!data) return <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]"><h2 className="text-2xl font-bold mb-4">No Data Found</h2><button onClick={() => router.push('/is-he-manipulative')} className="bg-slate-900 text-white px-6 py-3 rounded-lg">Retake Diagnostic</button></div>;

  const score: number = typeof data?.score === "number" ? data.score : 55;

  return (
    <PremiumGate returnTo="/is-he-manipulative/premium">
      <>
        <ManipulationMasterReport data={data} />
        <YourAnswersSection
          accent="#dd1c1a"
          evidence={
            data?.rawAnswers
              ? buildEvidence(
                  MANIPULATION_QUESTIONS.map((q: any) => ({
                    id: q.id,
                    text: q.stem,
                    category: humanise(q.subscale),
                    options: QUIZ_SCALE,
                    min: 1,
                  })),
                  data.rawAnswers
                )
              : undefined
          }
          no="03"
        />
        <ProgramOffer quizPath="/is-he-manipulative" />
        {/* The checkout page promises "the scripts to stop him today" and an
            action plan. This report had neither until now. Both are keyed to
            the dominant pattern, a counter-move for gaslighting is the wrong
            move for isolation. */}
        <ScriptsAndPlan
          accent="#4F46E5"
          scripts={scriptsFor(data?.dominantPattern)}
          plan={planFor(data?.dominantPattern)}
          scriptsNo="03"
          planNo="04"
        />
        <OfferLadder
          topic="manipulation"
          score={score}
          heading="Your Next Move, Three Ways"
          subheading="Pick the level of support that matches how serious your results are. One-time payment, no subscription."
        />
        <CoachingUpsell
          severity={scoreToSeverity(score)}
          topicLabel="the tactics being used on you"
        />
      </>
    </PremiumGate>
  );
}
