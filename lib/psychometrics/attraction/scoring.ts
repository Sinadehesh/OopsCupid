/**
 * 🔒 SECURE VAULT: ATTRACTION SCORING ENGINE
 * * WARNING: DO NOT MODIFY THIS SCORING LOGIC.
 * * This file contains the precise algorithms for calculating the
 * Attraction Risk Index and the strict 12-Archetype decision tree.
 * Altering these thresholds will break the resulting psychological profiles.
 */

import { attractionQuestions } from "./questions";

export function generateAttractionProfile(answers: Record<string, string>) {
  const scores: Record<string, number> = {};
  const counts: Record<string, number> = {};

  attractionQuestions.forEach(q => {
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

  const pidRisk = ((normalized["NegativeAffect"] || 0) + (normalized["Antagonism"] || 0) + (normalized["Disinhibition"] || 0)) / 3;
  const dtRisk = ((normalized["Machiavellianism"] || 0) + (normalized["Narcissism"] || 0) + (normalized["Psychopathy"] || 0)) / 3;
  const attachRisk = ((normalized["Anxiety"] || 0) + (normalized["Avoidance"] || 0)) / 2;
  const sympRisk = ((normalized["Depression"] || 0) + (normalized["ADHD"] || 0) + (normalized["Substance"] || 0)) / 3;
  
  const bfRisk = ((normalized["Neuroticism"] || 0) + (100 - (normalized["Agreeableness"] || 100)) + (100 - (normalized["Conscientiousness"] || 100))) / 3;
  const prefRiskScore = ((normalized["Excitement"] || 0) + (normalized["Dominance"] || 0) + (normalized["Vulnerability"] || 0)) / 3;

  const rawRisk = (pidRisk * 0.25) + (dtRisk * 0.20) + (attachRisk * 0.20) + (sympRisk * 0.15) + (bfRisk * 0.10) + (prefRiskScore * 0.10);
  const riskIndex = Math.min(100, Math.max(0, Math.round(rawRisk)));

  // 12-ARCHETYPE DECISION TREE (Order matters: most extreme risk patterns trigger first)
  let archetype = "The Safe-But-Bored Seeker"; // Fallback
  
  if (attachRisk > 60 && normalized["Dominance"] > 60 && normalized["NegativeAffect"] > 50) {
    archetype = "The Emotional Masochist";
  } else if (dtRisk > 40 && (normalized["Status"] > 60 || normalized["Dominance"] > 60)) {
    archetype = "The Dark Magnet";
  } else if (normalized["Avoidance"] > 50 && normalized["Independence"] > 60) {
    archetype = "The Ghost Hunter";
  } else if (normalized["Disinhibition"] > 50 && normalized["Excitement"] > 60) {
    archetype = "The Chaos Junkie";
  } else if (normalized["Dominance"] > 70 && normalized["Protection"] > 70) {
    archetype = "The Power Submissive";
  } else if (normalized["Vulnerability"] > 60 && normalized["Agreeableness"] > 60) {
    archetype = "The Fixer";
  } else if (normalized["Chemistry"] > 70 && attachRisk > 50) {
    archetype = "The Intensity Chaser";
  } else if (normalized["Resources"] > 70 && normalized["Status"] > 70) {
    archetype = "The Status Climber";
  } else if (normalized["Looks"] > 75 && dtRisk > 30) {
    archetype = "The Trophy Hunter";
  } else if (normalized["Intelligence"] > 75 && normalized["Openness"] > 60) {
    archetype = "The Intellectual Sparring Partner";
  } else if (normalized["Family"] > 70 && normalized["Values"] > 70) {
    archetype = "The Traditionalist";
  } else if (normalized["Chemistry"] > 65) {
    archetype = "The Intensity Chaser"; 
  } else if (normalized["Vulnerability"] > 50) {
    archetype = "The Fixer"; 
  }

  return {
    riskIndex,
    archetype,
    normalizedScores: normalized,
    premiumUnlocked: false // Locked by default for Sunk Cost
  };
}
