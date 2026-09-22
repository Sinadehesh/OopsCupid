"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildAttractorDossier } from "@/lib/report/quizzes/attractor";

export default function AttractedTypePremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.attractedType}
      quizHref="/what-kind-of-person-do-i-attract"
      quizName="What Kind of Person Do I Attract? assessment"
      build={buildAttractorDossier}
    />
  );
}
