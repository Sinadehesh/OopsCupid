"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildGaslightingDossier } from "../_lib/dossier";

export default function GaslightingPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.gaslighting}
      quizHref="/is-he-gaslighting-me"
      quizName="Is He Gaslighting Me? assessment"
      build={buildGaslightingDossier}
    />
  );
}
