export type LikertValue = 0 | 1 | 2 | 3 | 4 | 5;
export type ImpactValue = 0 | 1 | 2 | 3 | 4;

export type ModuleKey =
  | "par"
  | "coercive_control"
  | "power_tactics"
  | "gaslighting"
  | "impact";

export type SubscaleKey =
  | "severe_psych_abuse"
  | "coercive_emotional"
  | "restrictive_isolating"
  | "financial_abuse"
  | "demands"
  | "threats"
  | "surveillance"
  | "response_to_demands"
  | "intimidation"
  | "blame_minimization"
  | "isolation_dependency"
  | "economic_control"
  | "reality_distortion"
  | "self_doubt_induction"
  | "confusion_dependency"
  | "fear_distress"
  | "hypervigilance"
  | "emotional_exhaustion";

export type Question = {
  id: string;
  module: ModuleKey;
  subscale: SubscaleKey;
  stem: string;
  responseType: "frequency_0_5" | "impact_0_4" | "agreement_0_4";
  premiumOnly?: boolean;
  safetyCritical?: boolean;
  reverseScored?: boolean;
  order: number;
};

export type Answer = {
  questionId: string;
  value: number;
};

export type ModuleScore = {
  raw: number;
  max: number;
  normalized100: number;
  subscales: Record<string, { raw: number; max: number; normalized100: number }>;
  triggeredCutoff?: boolean;
};

export type SafetyFlag =
  | "threat_kill"
  | "threat_children"
  | "harm_pets"
  | "restrict_essentials"
  | "healthcare_interference"
  | "dangerous_surveillance"
  | "financial_entrapment"
  | "severe_isolation";

export type AssessmentResult = {
  modules: Record<ModuleKey, ModuleScore | null>;
  overallRisk100: number;
  severityTier: "low" | "emerging" | "elevated" | "high" | "critical";
  dominantPattern:
    | "mixed_friction"
    | "emotional_control"
    | "gaslighting"
    | "isolation_dependency"
    | "high_coercive_control";
  safetyFlags: SafetyFlag[];
  premiumUnlocked: boolean;
};

export type AssessmentSession = {
  sessionId: string;
  userId?: string;
  startedAt: string;
  completedAt?: string;
  locale: string;
  modulesStarted: ModuleKey[];
  modulesCompleted: ModuleKey[];
  answers: Answer[];
  result?: AssessmentResult;
  partnerLabel?: "boyfriend" | "girlfriend" | "partner" | "ex";
  consentAccepted: boolean;
  crisisNoticeShown: boolean;
};
