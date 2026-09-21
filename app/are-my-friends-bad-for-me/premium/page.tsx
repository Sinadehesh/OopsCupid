"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildFriendsBadDossier } from "../_lib/dossier";

export default function FriendsBadPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.friendsBad}
      quizHref="/are-my-friends-bad-for-me"
      quizName="Are My Friends Bad For Me? audit"
      build={buildFriendsBadDossier}
    />
  );
}
