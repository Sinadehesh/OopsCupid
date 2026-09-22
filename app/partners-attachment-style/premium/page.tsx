"use client";

import PremiumRoute from "@/components/report/premium/PremiumRoute";
import { QUIZ_KEYS } from "@/lib/quizResults";
import { buildPartnerAttachmentDossier } from "@/lib/report/quizzes/partnerAttachment";

export default function PartnerAttachmentPremiumPage() {
  return (
    <PremiumRoute
      storageKey={QUIZ_KEYS.partnerAttachment}
      quizHref="/partners-attachment-style"
      quizName="partner attachment assessment"
      build={buildPartnerAttachmentDossier}
    />
  );
}
