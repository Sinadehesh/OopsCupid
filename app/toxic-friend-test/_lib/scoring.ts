import { TOXIC_FRIEND_QUESTIONS } from "../_data/questions";

export function calculateToxicScores(answers: Record<string, string>) {
  const sums: Record<string, { total: number; max: number }> = {
    Victimization: { total: 0, max: 0 },
    Quality: { total: 0, max: 0 },
    Aggression: { total: 0, max: 0 },
    Manipulation: { total: 0, max: 0 },
    Antisocial: { total: 0, max: 0 },
    Vulnerability: { total: 0, max: 0 },
    Impact: { total: 0, max: 0 }
  };

  let safetyFlagTriggered = false;

  // 1. Tally raw scores based on question weights
  Object.entries(answers).forEach(([id, val]) => {
    const q = TOXIC_FRIEND_QUESTIONS.find(x => x.id === id);
    if (!q) return;

    let num = 0;
    if (q.responseType === "binary") {
      num = val === "Yes" ? 4 : 0;
    } else {
      num = parseInt(val.charAt(0)) || 0;
    }

    if (sums[q.module]) {
      sums[q.module].total += num * q.weight;
      sums[q.module].max += 4 * q.weight;
    }

    // Safety Flag Escalation Check
    if (q.hardFlag && num >= 3) {
      safetyFlagTriggered = true;
    }
  });

  // 2. Normalize to 0-100 scale
  const norm = (m: string) => {
    const s = sums[m];
    return s && s.max > 0 ? Math.round((s.total / s.max) * 100) : 0;
  };

  const mods = {
    victimization: norm("Victimization"),
    quality: norm("Quality"),
    aggression: norm("Aggression"),
    manipulation: norm("Manipulation"),
    antisocial: norm("Antisocial"),
    vulnerability: norm("Vulnerability"),
    impact: norm("Impact")
  };

  // 3. Weighted Core Toxicity Score
  let riskScore = Math.round(
    mods.victimization * 0.30 +
    mods.quality * 0.20 +
    mods.aggression * 0.20 +
    mods.manipulation * 0.15 +
    mods.antisocial * 0.15
  );

  // 4. Severity Tier logic
  let tier = 1;
  if (riskScore >= 80) tier = 5;
  else if (riskScore >= 60) tier = 4;
  else if (riskScore >= 40) tier = 3;
  else if (riskScore >= 20) tier = 2;

  // AUTO-ESCALATE if safety/fear threshold is met
  if (safetyFlagTriggered && tier < 4) {
    tier = 4; 
    riskScore = Math.max(riskScore, 65);
  }

  // 5. Archetype Extraction
  let archetype = "Low Concern";
  let description = "This friendship shows minimal signs of toxicity. Occasional friction is normal.";

  if (tier >= 4) {
    // Find highest contributing toxic module
    const highest = Object.entries({
       "The Energy Vampire": mods.impact,
       "The Social Saboteur": mods.aggression,
       "The Choreographer": mods.manipulation,
       "The Chaotic Instigator": mods.antisocial,
       "The Hostile Controller": mods.victimization
    }).sort((a,b) => b[1] - a[1])[0][0];
    
    archetype = highest;
    description = `Your answers suggest a deeply toxic pattern. As an archetype, ${highest} dynamics often involve severe boundary violations, manipulation, or intense emotional drain.`;
  } else if (tier === 3) {
    archetype = "The One-Sided Ally";
    description = "You are giving significantly more than you get. This friendship is emotionally exhausting and structurally imbalanced, though not necessarily intentionally malicious.";
  } else if (tier === 2) {
    archetype = "Strained / Mismatch";
    description = "There is notable friction here, but it appears to stem from mismatched expectations or poor communication rather than intentional psychological harm.";
  }

  return {
    riskScore,
    tier,
    archetype,
    description,
    safetyFlagTriggered,
    mods
  };
}
