import { friendUsedQuestions } from "./questions";

export function generateFriendUsedProfile(answers: Record<string, string>) {
  const scores: Record<string, number> = {};
  const counts: Record<string, number> = {};

  friendUsedQuestions.forEach(q => {
    if (!answers[q.id]) return;
    
    // Scale is 1 to 5. We need 0 to 4 for the math requested.
    let val = parseInt(answers[q.id].charAt(0)) - 1; 
    if (isNaN(val)) return;

    if (q.reverseScore) {
      val = 4 - val; // 0->4, 1->3, 2->2, 3->1, 4->0
    }

    const key = q.subscaleKey;
    scores[key] = (scores[key] || 0) + val;
    counts[key] = (counts[key] || 0) + 1; // max 9 per category
  });

  const normalized: Record<string, number> = {};
  for (const key in counts) {
    // max_raw for a subgroup = 9 items × 4 = 36
    normalized[key] = Math.round((scores[key] / (counts[key] * 4)) * 100);
  }

  // Calculate Use-Risk Index using provided normalized weights
  const weights: Record<string, number> = {
    "Favor Frequency": 0.11,
    "Reciprocity Balance": 0.14,
    "Emotional Labor": 0.12,
    "Boundary Respect": 0.09,
    "Conditional Presence": 0.07,
    "Opportunism": 0.07,
    "Time Drain": 0.07,
    "Financial Drain": 0.09,
    "Reliability Asymmetry": 0.07,
    "Manipulation": 0.09,
    "Appreciation": 0.04,
    "Dependency": 0.07
  };

  let rawRisk = 0;
  for (const key in weights) {
    rawRisk += (normalized[key] || 0) * weights[key];
  }
  const useRiskIndex = Math.min(100, Math.max(0, Math.round(rawRisk)));

  // ARCHETYPE LOGIC
  const get = (k: string) => normalized[k] || 0;
  
  // Note: For AC (Appreciation), the logic asks for "low AC". 
  // However, the items are mostly phrased negatively ("rarely acknowledge"), 
  // meaning a HIGH score = BAD appreciation. 
  // We will assume "High" means the bad behavior is present.

  const archScores = {
    "The Generous Anchor": (get("Favor Frequency") + get("Emotional Labor") + get("Boundary Respect") + get("Appreciation")) / 4,
    "The Overleveraged Helper": (get("Reciprocity Balance") + get("Time Drain") + get("Financial Drain")) / 3,
    "The Unseen Sponsor": (get("Opportunism") + get("Financial Drain") + get("Appreciation")) / 3,
    "The Emotional ATM": (get("Emotional Labor") + get("Manipulation") + get("Reciprocity Balance")) / 3,
    "The Conditional Companion": (get("Conditional Presence") + get("Opportunism") + get("Reliability Asymmetry")) / 3,
    "The Boundary Blur": (get("Boundary Respect") + get("Dependency") + get("Reciprocity Balance")) / 3,
    "The Reliable One (but Burned)": (get("Reliability Asymmetry") + get("Favor Frequency") + get("Appreciation")) / 3,
    "The Financial Magnet": (get("Financial Drain") + get("Favor Frequency") + get("Appreciation")) / 3,
    "The Dependent Trap": (get("Dependency") + get("Manipulation") + get("Emotional Labor")) / 3,
    "The Strategic Networker": (get("Opportunism") + (100 - get("Manipulation")) + (100 - get("Reciprocity Balance"))) / 3
  };

  let sortedArchetypes = Object.entries(archScores).sort((a, b) => b[1] - a[1]);
  let primaryArchetype = sortedArchetypes[0][0];
  let secondaryArchetype = sortedArchetypes[1][0];

  return {
    useRiskIndex,
    primaryArchetype,
    secondaryArchetype,
    normalizedScores: normalized,
    premiumUnlocked: false
  };
}
