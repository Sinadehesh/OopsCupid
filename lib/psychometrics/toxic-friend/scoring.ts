import { TOXIC_FRIEND_QUESTIONS } from "./questions";

// Normalized Score Weighting based on prompt rules
const WEIGHTS = { victimization: 0.35, quality: 0.30, aggression: 0.20, antisocial: 0.15 };

export function calculateToxicFriendScore(answers: Record<string, string>) {
  const scores = {
    victimization: { total: 0, max: 0 },
    quality: { total: 0, max: 0 },
    aggression: { total: 0, max: 0 },
    antisocial: { total: 0, max: 0 },
    impact: { total: 0, max: 0 }
  };

  let hardFlagTriggered = false;

  // 1. Tally raw scores
  Object.entries(answers).forEach(([qId, answerString]) => {
    const question = TOXIC_FRIEND_QUESTIONS.find(q => q.id === qId);
    if (!question) return;

    const numericValue = parseInt(answerString.split(" - ")[0]);
    if (isNaN(numericValue)) return;

    scores[question.module].total += numericValue;
    scores[question.module].max += 4; 

    // Safety Flag Escalation Check (Fear / Threat items)
    if (question.safetyFlag && numericValue >= 3) {
      hardFlagTriggered = true;
    }
  });

  // 2. Normalize to 0-100
  const norm = {
    victimization: scores.victimization.max > 0 ? (scores.victimization.total / scores.victimization.max) * 100 : 0,
    quality: scores.quality.max > 0 ? (scores.quality.total / scores.quality.max) * 100 : 0,
    aggression: scores.aggression.max > 0 ? (scores.aggression.total / scores.aggression.max) * 100 : 0,
    antisocial: scores.antisocial.max > 0 ? (scores.antisocial.total / scores.antisocial.max) * 100 : 0,
    impact: scores.impact.max > 0 ? (scores.impact.total / scores.impact.max) * 100 : 0,
  };

  // 3. Weighted Core Toxicity Score
  let riskScore = Math.round(
    (norm.victimization * WEIGHTS.victimization) +
    (norm.quality * WEIGHTS.quality) +
    (norm.aggression * WEIGHTS.aggression) +
    (norm.antisocial * WEIGHTS.antisocial)
  );

  // 4. Severity Tier logic
  let tier = 1;
  if (riskScore >= 80) tier = 5;
  else if (riskScore >= 60) tier = 4;
  else if (riskScore >= 40) tier = 3;
  else if (riskScore >= 20) tier = 2;

  // AUTO-ESCALATE if safety/fear threshold is met
  if (hardFlagTriggered && tier < 4) {
    tier = 4; 
    riskScore = Math.max(riskScore, 65);
  }

  // 5. Build Free Output Text
  let title = "Healthy but Strained";
  let description = "This friendship has typical friction, but lacks strong evidence of consistent toxicity. The main issues seem to be normal conflict or personality mismatch rather than relational harm.";
  
  if (tier === 5) {
    title = "High-Risk Toxic Friend";
    description = "The assessment detected multiple severe harmful dimensions at once: direct victimization, relational aggression, unpredictability, and high emotional cost. This pattern heavily impacts emotional safety.";
  } else if (tier === 4) {
    title = "Controlling / Manipulative Friend";
    description = "This friend shows a pattern of shaping your behavior through emotional leverage, guilt-trips, and destabilization. A toxic dynamic is clearly present in how they handle boundaries.";
  } else if (tier === 3) {
    title = "One-Sided / Draining Friend";
    description = "You give much more than you get. This friend appears inconsistent, emotionally extractive, or unreliable. The core dynamic is exhausting rather than explicitly dangerous.";
  } else if (tier === 2) {
    title = "Strained but Possibly Repairable";
    description = "The friendship has notable friction and tension, but may not be deeply toxic. Open communication and firmer boundaries might be able to repair the dynamic.";
  }

  return {
    title: title,
    healthScore: 100 - riskScore, 
    gaugeScore: riskScore,
    gaugeLabel: "Overall Toxicity Risk",
    description: description,
    behaviors: "This free result gives you a high-level overview. Because toxic friendships operate across multiple hidden layers, we highly recommend unlocking the full breakdown to see exactly what is happening under the surface.",
    
    // Strict Premium Data Object (Locked away until paid)
    premiumData: {
      riskScore,
      impactScore: Math.round(norm.impact),
      tier,
      modules: norm,
      hardFlagTriggered
    }
  };
}
