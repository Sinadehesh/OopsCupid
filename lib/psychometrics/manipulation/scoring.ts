import { 
  Answer, 
  Question, 
  ModuleScore, 
  AssessmentResult, 
  SubscaleKey, 
  SafetyFlag 
} from "./types";
import { MODULE_CONFIG } from "./config";

const WEIGHTS: Record<SubscaleKey, number> = {
  severe_psych_abuse: 4,
  coercive_emotional: 2,
  restrictive_isolating: 3,
  financial_abuse: 3,
  demands: 2,
  threats: 4,
  surveillance: 3,
  response_to_demands: 2,
  intimidation: 3,
  blame_minimization: 2,
  isolation_dependency: 3,
  economic_control: 3,
  reality_distortion: 3,
  self_doubt_induction: 3,
  confusion_dependency: 2,
  fear_distress: 2,
  hypervigilance: 2,
  emotional_exhaustion: 1
};

export function scorePAR(answers: Answer[], questions: Question[]): ModuleScore {
  const subscales = {
    severe_psych_abuse: { raw: 0, max: 35, normalized100: 0 },
    coercive_emotional: { raw: 0, max: 25, normalized100: 0 },
    restrictive_isolating: { raw: 0, max: 25, normalized100: 0 },
    financial_abuse: { raw: 0, max: 15, normalized100: 0 }
  };

  for (const q of questions.filter(q => q.module === "par")) {
    const ans = answers.find(a => a.questionId === q.id)?.value ?? 0;
    subscales[q.subscale as keyof typeof subscales].raw += ans;
  }

  for (const key of Object.keys(subscales) as (keyof typeof subscales)[]) {
    subscales[key].normalized100 = Math.round(
      (subscales[key].raw / subscales[key].max) * 100
    );
  }

  const raw =
    subscales.severe_psych_abuse.raw +
    subscales.coercive_emotional.raw +
    subscales.restrictive_isolating.raw +
    subscales.financial_abuse.raw;

  const triggeredCutoff =
    subscales.severe_psych_abuse.raw >= 1 ||
    subscales.coercive_emotional.raw >= 2 ||
    subscales.restrictive_isolating.raw >= 2 ||
    subscales.financial_abuse.raw >= 2;

  return {
    raw,
    max: 100,
    normalized100: Math.round((raw / 100) * 100), // PAR total max is 100
    subscales,
    triggeredCutoff
  };
}

export function scoreCustomModule(
  moduleKey: keyof typeof MODULE_CONFIG,
  answers: Answer[],
  questions: Question[]
): ModuleScore {
  const config = MODULE_CONFIG[moduleKey];
  const subscales: Record<string, { raw: number; max: number; normalized100: number }> = {};
  
  let totalRaw = 0;
  let totalMax = 0;
  let totalWeightedRaw = 0;
  let totalWeightedMax = 0;

  // Initialize subscales
  for (const [key, details] of Object.entries(config.subscales)) {
    subscales[key] = { raw: 0, max: details.items * 5, normalized100: 0 }; 
  }

  for (const q of questions.filter(q => q.module === moduleKey)) {
    const ans = answers.find(a => a.questionId === q.id)?.value ?? 0;
    const weight = WEIGHTS[q.subscale] ?? 1;

    if (subscales[q.subscale]) {
      subscales[q.subscale].raw += ans;
    }

    totalRaw += ans;
    totalMax += 5; // Assuming 0-5 likert for all custom modules for now
    totalWeightedRaw += ans * weight;
    totalWeightedMax += 5 * weight;
  }

  // Normalize subscales
  for (const key of Object.keys(subscales)) {
    if (subscales[key].max > 0) {
      subscales[key].normalized100 = Math.round((subscales[key].raw / subscales[key].max) * 100);
    }
  }

  return {
    raw: totalRaw,
    max: totalMax,
    normalized100: totalWeightedMax > 0 ? Math.round((totalWeightedRaw / totalWeightedMax) * 100) : 0,
    subscales
  };
}

function getDominantPattern(
  modules: Record<string, ModuleScore | null>, 
  safetyFlags: SafetyFlag[], 
  severityTier: string
): AssessmentResult["dominantPattern"] {
  if (safetyFlags.length > 0 || severityTier === "critical") {
    return "high_coercive_control";
  }

  const par = modules.par;
  const cc = modules.coercive_control;
  const pt = modules.power_tactics;
  const gas = modules.gaslighting;

  const gasScore =
    (gas?.subscales.reality_distortion?.normalized100 ?? 0) +
    (gas?.subscales.self_doubt_induction?.normalized100 ?? 0);

  const isolationScore =
    (par?.subscales.restrictive_isolating?.normalized100 ?? 0) +
    (pt?.subscales.isolation_dependency?.normalized100 ?? 0) +
    (pt?.subscales.economic_control?.normalized100 ?? 0);

  const emotionalScore =
    (par?.subscales.coercive_emotional?.normalized100 ?? 0) +
    (pt?.subscales.intimidation?.normalized100 ?? 0) +
    (pt?.subscales.blame_minimization?.normalized100 ?? 0);

  if (gasScore >= isolationScore && gasScore >= emotionalScore) return "gaslighting";
  if (isolationScore >= emotionalScore) return "isolation_dependency";
  if (emotionalScore >= 35) return "emotional_control";
  
  return "mixed_friction";
}

function applySafetyOverrides(result: AssessmentResult): AssessmentResult {
  const flags = result.safetyFlags;
  
  const critical =
    flags.includes("threat_kill") ||
    flags.includes("threat_children") ||
    flags.includes("restrict_essentials") ||
    flags.includes("healthcare_interference") ||
    flags.includes("dangerous_surveillance");

  if (critical) {
    result.severityTier = "critical";
    result.dominantPattern = "high_coercive_control";
    result.overallRisk100 = Math.max(result.overallRisk100, 85);
  }

  return result;
}

export function calculateManipulationScore(
  answers: Answer[], 
  questions: Question[],
  premiumUnlocked: boolean = false
): AssessmentResult {
  
  // 1. Extract Safety Flags based on answers to safetyCritical questions
  const safetyFlags: SafetyFlag[] = [];
  // (In a real implementation, you'd map specific high-severity question IDs or tags to these flags)
  // For now, assume this logic populates if a critical item scores > 0

  // 2. Score Modules
  const par = scorePAR(answers, questions);
  const coercive_control = scoreCustomModule("coercive_control", answers, questions);
  const power_tactics = scoreCustomModule("power_tactics", answers, questions);
  const gaslighting = scoreCustomModule("gaslighting", answers, questions);
  
  let impact = null;
  if (premiumUnlocked) {
     impact = scoreCustomModule("impact", answers, questions);
  }

  // 3. Calculate Overall Risk (Weighted Formula)
  let overallRisk100 = Math.round(
    par.normalized100 * 0.35 +
    coercive_control.normalized100 * 0.30 +
    power_tactics.normalized100 * 0.20 +
    gaslighting.normalized100 * 0.15
  );

  // 4. Determine Baseline Severity Tier
  let severityTier: AssessmentResult["severityTier"] = "low";
  if (overallRisk100 >= 80) severityTier = "critical";
  else if (overallRisk100 >= 60) severityTier = "high";
  else if (overallRisk100 >= 40) severityTier = "elevated";
  else if (overallRisk100 >= 20) severityTier = "emerging";

  const modules = { par, coercive_control, power_tactics, gaslighting, impact };

  // 5. Build Result Object
  let result: AssessmentResult = {
    modules,
    overallRisk100,
    severityTier,
    dominantPattern: "mixed_friction", // placeholder
    safetyFlags,
    premiumUnlocked
  };

  // 6. Assign Dominant Pattern
  result.dominantPattern = getDominantPattern(modules, safetyFlags, severityTier);

  // 7. Apply Safety Overrides (mutates result)
  result = applySafetyOverrides(result);

  return result;
}
