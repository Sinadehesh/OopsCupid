import { TOXIC_FRIEND_QUESTIONS } from "../_data/questions";

export function calculateToxicScores(answers: Record<string, string>) {
  const sums: Record<string, { total: number; max: number }> = {
    victimization: { total: 0, max: 0 },
    neg_quality: { total: 0, max: 0 },
    relational_aggression: { total: 0, max: 0 },
    manipulation: { total: 0, max: 0 },
    antisocial: { total: 0, max: 0 },
    vulnerability: { total: 0, max: 0 },
    impact: { total: 0, max: 0 }
  };

  let safetyFlagTriggered = false;

  // 1. Tally raw scores based on question weights & reverse coding
  Object.entries(answers).forEach(([id, val]) => {
    const q = TOXIC_FRIEND_QUESTIONS.find(x => x.id === id);
    if (!q || q.module === "validity") return; // Exclude validity items from mathematical score

    let num = 0;
    if (q.responseType === "binary") {
      num = val === "Yes" ? 4 : 0; // Normalize binary to 0-4 scale to match weight calculations
    } else {
      num = parseInt(val.charAt(0));
      if (isNaN(num)) return;
    }

    // Apply Reverse Coding (e.g. 0 becomes 4, 4 becomes 0)
    if (q.reverseCoded) {
      num = 4 - num;
    }

    if (sums[q.module]) {
      sums[q.module].total += num * q.weight;
      sums[q.module].max += 4 * q.weight; // Max possible score per weight point is 4
    }

    // Safety Flag Escalation Check (Trigger on >= 3 or Binary 'Yes')
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
    victimization: norm("victimization"),
    quality: norm("neg_quality"),
    aggression: norm("relational_aggression"),
    manipulation: norm("manipulation"),
    antisocial: norm("antisocial"),
    vulnerability: norm("vulnerability"),
    impact: norm("impact")
  };

  // 3. Weighted Core Toxicity Score exactly matching prompt specification
  let riskScore = Math.round(
    mods.victimization * 0.30 +
    mods.quality * 0.25 +
    mods.aggression * 0.15 +
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
    riskScore = Math.max(riskScore, 65); // Boost visual gauge to match tier
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
