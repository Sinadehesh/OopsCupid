"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildFriendUsedDossier } from "@/lib/report/quizzes/friendUsed";

export default function FriendUsedPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.friendUsed}
      quizHref="/are-your-friends-using-you"
      quizName="Are Your Friends Using You? assessment"
      build={buildFriendUsedDossier}
    />
  );
}
