import { friendRoleQuestions } from "./questions";

export function generateFriendRoleProfile(answers: Record<string, string>) {
  const scores: Record<string, number> = {};
  const counts: Record<string, number> = {};

  // 1. Calculate Raw Averages per Subscale
  friendRoleQuestions.forEach(q => {
    if (!answers[q.id]) return;
    
    let val = parseInt(answers[q.id].charAt(0)); // Gets "1" from "1 - Strongly Disagree"
    if (isNaN(val)) return;

    if (q.reverseScore) {
      val = 6 - val; // 1->5, 2->4, 4->2, 5->1
    }

    const key = q.subscaleKey;
    scores[key] = (scores[key] || 0) + val;
    counts[key] = (counts[key] || 0) + 1;
  });

  const avg: Record<string, number> = {};
  for (const key in counts) {
    avg[key] = scores[key] / counts[key];
  }

  // Helper function to safely get avg
  const getAvg = (k: string) => avg[k] || 3.0; // Default to neutral if missing

  // 2. Apply Weighted Formulas for Archetypes
  const archScores = {
    "The Leader": (getAvg("Social Leadership") * 0.40) + (getAvg("Attention & Spotlight") * 0.20) + (getAvg("Observational Insight") * 0.15) + (getAvg("Social Glue") * 0.15) + (getAvg("Adventure & Risk") * 0.10),
    "The Therapist": (getAvg("Emotional Support") * 0.45) + (getAvg("Observational Insight") * 0.30) + (getAvg("Conflict Mediation") * 0.25),
    "The Entertainer": (getAvg("Humor & Entertainment") * 0.50) + (getAvg("Attention & Spotlight") * 0.30) + (getAvg("Social Glue") * 0.20),
    "The Adventurer": (getAvg("Adventure & Risk") * 0.55) + (getAvg("Humor & Entertainment") * 0.20) + (getAvg("Independence") * 0.15) + (getAvg("Attention & Spotlight") * 0.10),
    "The Peacekeeper": (getAvg("Conflict Mediation") * 0.45) + (getAvg("Emotional Support") * 0.30) + (getAvg("Observational Insight") * 0.25),
    "The Protector": (getAvg("Loyalty & Protection") * 0.50) + (getAvg("Social Leadership") * 0.20) + (getAvg("Observational Insight") * 0.20) + (getAvg("Emotional Support") * 0.10),
    "The Connector": (getAvg("Social Glue") * 0.45) + (getAvg("Emotional Support") * 0.25) + (getAvg("Social Leadership") * 0.15) + (getAvg("Humor & Entertainment") * 0.15),
    "The Lone Wolf": (getAvg("Independence") * 0.60) + (getAvg("Observational Insight") * 0.20) + ((6 - getAvg("Social Glue")) * 0.20)
  };

  // 3. Determine the Winner & Check for Hybrid
  let sortedArchetypes = Object.entries(archScores).sort((a, b) => b[1] - a[1]);
  let primaryArchetype = sortedArchetypes[0][0];
  
  if (sortedArchetypes[0][1] - sortedArchetypes[1][1] <= 0.20) {
    primaryArchetype = `${sortedArchetypes[0][0]} / ${sortedArchetypes[1][0]}`;
  }

  // Transform averages to 0-100 percentages for visual bar charts
  const normalized: Record<string, number> = {};
  for (const key in avg) {
      normalized[key] = Math.round(((avg[key] - 1) / 4) * 100); 
  }

  // Get Top 3 Traits to display
  const topTraits = Object.entries(normalized)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(t => ({ name: t[0], score: t[1] }));

  return {
    archetype: primaryArchetype,
    topTraits,
    normalizedScores: normalized,
    premiumUnlocked: false
  };
}
