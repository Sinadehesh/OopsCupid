"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildAttractorDossier } from "@/lib/report/quizzes/attractor";

export default function AttractorPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.attractor}
      quizHref="/who-is-attracted-to-me"
      quizName="Who Is Attracted To Me? assessment"
      build={buildAttractorDossier}
    />
  );
}
