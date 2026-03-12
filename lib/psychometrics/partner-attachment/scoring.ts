/**
 * 🔒 SECURE VAULT: PARTNER ATTACHMENT SCORING ENGINE
 * * Calculates observed Anxiety vs Avoidance to predict partner's quadrant.
 */
import { partnerAttachmentQuestions } from "./questions";

export function generatePartnerAttachmentProfile(answers: Record<string, string>) {
  const scores: Record<string, number> = { Anxiety: 0, Avoidance: 0, Fearful: 0, Secure: 0 };
  const counts: Record<string, number> = { Anxiety: 0, Avoidance: 0, Fearful: 0, Secure: 0 };

  partnerAttachmentQuestions.forEach(q => {
    if (!answers[q.id]) return;
    
    const match = answers[q.id].match(/^(\d+)/);
    let val = match ? parseInt(match[1]) : 0;
    
    // Reverse score handling (5 becomes 1, etc.)
    if (q.reverseScore) {
      val = q.options.length - 1 - val; // Works if max val is the highest index (e.g., 5 options = index 4 max)
    }

    const key = q.subscaleKey;
    if (scores[key] !== undefined) {
        scores[key] += val;
        counts[key] += (q.options.length - 1);
    }
  });

  const normalized = {
    Anxiety: counts["Anxiety"] > 0 ? Math.round((scores["Anxiety"] / counts["Anxiety"]) * 100) : 0,
    Avoidance: counts["Avoidance"] > 0 ? Math.round((scores["Avoidance"] / counts["Avoidance"]) * 100) : 0,
    FearfulRisk: counts["Fearful"] > 0 ? Math.round((scores["Fearful"] / counts["Fearful"]) * 100) : 0,
    SecureBase: counts["Secure"] > 0 ? Math.round((1 - (scores["Secure"] / counts["Secure"])) * 100) : 100 // Lower SecureScore = higher secure behavior
  };

  // Determine Core Attachment Quadrant based on Bartholomew & Horowitz model
  let styleLabel = "Secure";
  
  if (normalized.Anxiety > 60 && normalized.Avoidance > 60) {
      styleLabel = "Fearful-Avoidant (Disorganized)";
  } else if (normalized.FearfulRisk > 65) {
      styleLabel = "Fearful-Avoidant (Disorganized)"; // Catch-all for extreme volatility
  } else if (normalized.Avoidance > 55) {
      styleLabel = "Dismissive-Avoidant";
  } else if (normalized.Anxiety > 55) {
      styleLabel = "Anxious-Preoccupied";
  } else if (normalized.SecureBase > 60) {
      // If they didn't score high on anxiety/avoidance but scored poorly on secure metrics
      styleLabel = "Dismissive-Avoidant"; 
  }

  // Calculate Overall Volatility Index
  const volatilityIndex = Math.min(100, Math.round(((normalized.Anxiety + normalized.Avoidance + normalized.FearfulRisk) / 3)));

  return {
    styleLabel,
    volatilityIndex,
    normalizedScores: normalized,
    premiumUnlocked: false // Sunk Cost Paywall Trigger
  };
}
