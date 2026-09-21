"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildBadGuysDossier } from "../_lib/dossier";

export default function BadGuysPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.badGuys}
      quizHref="/why-do-i-pick-bad-guys"
      quizName="Why Do I Pick Bad Guys? assessment"
      build={buildBadGuysDossier}
    />
  );
}
