/**
 * 🔒 SECURE VAULT: "WHO FINDS ME ATTRACTIVE" SCORING ENGINE
 * * WARNING: DO NOT MODIFY THIS SCORING LOGIC.
 * * This predicts inbound attraction archetypes.
 */
import { attractorQuestions } from "./questions";

export function generateAttractorProfile(answers: Record<string, string>) {
  const scores: Record<string, number> = {};
  const counts: Record<string, number> = {};

  attractorQuestions.forEach(q => {
    if (!answers[q.id]) return;
    
    const match = answers[q.id].match(/^(\d+)/);
    let val = match ? parseInt(match[1]) : 0;
    
    if (q.reverseScore) {
      val = q.options.length - 1 - val;
    }

    const key = q.subscaleKey;
    scores[key] = (scores[key] || 0) + val;
    counts[key] = (counts[key] || 0) + (q.options.length - 1);
  });

  const normalized: Record<string, number> = {};
  for (const key in scores) {
    normalized[key] = counts[key] > 0 ? Math.round((scores[key] / counts[key]) * 100) : 0;
  }

  // CALCULATE INBOUND VULNERABILITY INDEX
  const preyRisk = ((normalized["Anxiety"] || 0) + (normalized["Agreeableness"] || 0) + (normalized["Innocence"] || 0) + (normalized["Submissiveness"] || 0) + (normalized["Victimhood"] || 0)) / 5;
  const chaosRisk = ((normalized["Disinhibition"] || 0) + (normalized["Substance"] || 0) + (normalized["Chaos"] || 0) + (normalized["NegativeAffect"] || 0)) / 4;
  const objectRisk = ((normalized["Aesthetics"] || 0) + (normalized["Wealth"] || 0) + (normalized["Sexuality"] || 0)) / 3;

  const rawRisk = (preyRisk * 0.4) + (chaosRisk * 0.3) + (objectRisk * 0.3);
  const vulnerabilityIndex = Math.min(100, Math.max(0, Math.round(rawRisk)));

  // 12 INBOUND ATTRACTOR ARCHETYPES
  let archetype = "The Safe Harbor"; 
  
  if (normalized["Victimhood"] > 60 && normalized["Anxiety"] > 50) {
    archetype = "The Predator Magnet";
  } else if (normalized["Avoidance"] > 60 && normalized["Mystery"] > 60) {
    archetype = "The Chase Trigger";
  } else if (normalized["Agreeableness"] > 70 && normalized["Maternal"] > 60) {
    archetype = "The Broken-Bird Collector";
  } else if (normalized["Aesthetics"] > 70 && normalized["HardToGet"] > 60) {
    archetype = "The Narcissist's Trophy";
  } else if (normalized["Wealth"] > 70 || normalized["Status"] > 70) {
    archetype = "The Opportunist's Mark";
  } else if (normalized["Chaos"] > 60 && normalized["Disinhibition"] > 60) {
    archetype = "The Savior's Project";
  } else if (normalized["Submissiveness"] > 60 && normalized["Innocence"] > 60) {
    archetype = "The Dominant's Canvas";
  } else if (normalized["Dominance"] > 70 && normalized["Antagonism"] > 50) {
    archetype = "The Submissive's Shield";
  } else if (normalized["Intellect"] > 75) {
    archetype = "The Sapiosexual Trap";
  } else if (normalized["Tradition"] > 70) {
    archetype = "The Traditional Catch";
  } else if (normalized["Alternative"] > 70) {
    archetype = "The Subculture Icon";
  } else if (normalized["Chill"] > 70) {
    archetype = "The Low-Effort Magnet"; 
  }

  return {
    vulnerabilityIndex,
    archetype,
    normalizedScores: normalized,
    premiumUnlocked: false // Sunk Cost Paywall Trigger
  };
}
