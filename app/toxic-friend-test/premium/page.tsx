"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildToxicFriendDossier } from "../_lib/dossier";

export default function ToxicFriendPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.toxicFriend}
      quizHref="/toxic-friend-test"
      quizName="Toxic Friend Test"
      build={buildToxicFriendDossier}
    />
  );
}
