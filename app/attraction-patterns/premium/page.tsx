"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildAttractionDossier } from "@/lib/report/quizzes/attraction";

export default function AttractionPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.attraction}
      quizHref="/attraction-patterns"
      quizName="Attraction Patterns assessment"
      build={buildAttractionDossier}
    />
  );
}
