import { gaslightingQuestions } from "./questions";

const LEVELS = [
  { title: "Minimal evidence", subtitle: "Mostly Clear | Some friction, not much fog", advice: "You may be dealing with conflict, immaturity, or inconsiderate communication, but the full gaslighting pattern is not strongly present. Stay anchored in specifics and notice whether concerns lead to repair or defensiveness." },
  { title: "Early distortion", subtitle: "Subtle Fog | Something feels off, but not constant", advice: "Something is bending the emotional reality of the relationship. You are not overreacting by paying attention now. Start tracking repeated moments, not isolated excuses." },
  { title: "Emerging pattern", subtitle: "Reality Drift | Your perspective is getting pulled", advice: "This looks less like misunderstanding and more like a pattern of destabilization. The important question is not whether every single incident is extreme. It is whether your reality keeps getting weaker while his control gets stronger." },
  { title: "Significant pattern", subtitle: "Narrative Trap | His version keeps replacing yours", advice: "Your score suggests a meaningful erosion of self-trust. At this level, clarity usually does not come from one perfect conversation. It comes from facts, outside perspective, and stepping out of the circular logic." },
  { title: "High risk", subtitle: "Control Through Confusion | This is bigger than mixed signals", advice: "This pattern is no longer just emotionally confusing. It is shaping what feels true, what feels safe to say, and how much you trust your own judgment. Protecting your clarity matters now." },
  { title: "Severe pattern", subtitle: "Deep Fog | Your self-trust is under attack", advice: "Your results strongly suggest an abusive pattern centered on confusion, control, and self-doubt. You do not need more proof to take your distress seriously. Move toward support, documentation if safe, and a safety-centered plan." }
];

export function calculateGaslightingScore(answers: number[]) {
  let totalScore = 0;
  let tacticsScore = 0;
  let impactScore = 0;
  let criticalFlags = 0;

  const subscaleScores: Record<string, number> = {
    reality_denial: 0, invalidation: 0, blame_reversal: 0,
    confusion_tactics: 0, isolation_control: 0, self_trust_erosion: 0
  };

  answers.forEach((score, index) => {
    totalScore += score;
    const q = gaslightingQuestions[index];
    
    if (index < 40) tacticsScore += score;
    else impactScore += score;

    if (q.isCritical && score >= 3) criticalFlags += 1;
    subscaleScores[q.subscale] += score;
  });

  let baseLevel = 0;
  if (totalScore >= 140) baseLevel = 5;
  else if (totalScore >= 110) baseLevel = 4;
  else if (totalScore >= 80) baseLevel = 3;
  else if (totalScore >= 50) baseLevel = 2;
  else if (totalScore >= 25) baseLevel = 1;

  if (criticalFlags >= 3) baseLevel += 1;
  if (criticalFlags >= 5 && totalScore >= 100 && baseLevel < 4) baseLevel = 4;
  
  const finalLevel = Math.min(baseLevel, 5);

  const subscales = [
    { key: "reality_denial", label: "Reality Denial", score: subscaleScores.reality_denial, max: 32, pct: (subscaleScores.reality_denial / 32) * 100 },
    { key: "invalidation", label: "Invalidation", score: subscaleScores.invalidation, max: 32, pct: (subscaleScores.invalidation / 32) * 100 },
    { key: "blame_reversal", label: "Blame Reversal", score: subscaleScores.blame_reversal, max: 32, pct: (subscaleScores.blame_reversal / 32) * 100 },
    { key: "confusion_tactics", label: "Confusion Tactics", score: subscaleScores.confusion_tactics, max: 32, pct: (subscaleScores.confusion_tactics / 32) * 100 },
    { key: "isolation_control", label: "Isolation & Control", score: subscaleScores.isolation_control, max: 32, pct: (subscaleScores.isolation_control / 32) * 100 },
    { key: "self_trust_erosion", label: "Self-Trust Erosion", score: subscaleScores.self_trust_erosion, max: 40, pct: (subscaleScores.self_trust_erosion / 40) * 100 }
  ].sort((a, b) => b.pct - a.pct);

  return {
    totalScore,
    maxScore: 200,
    tacticsScore,
    tacticsMax: 160,
    impactScore,
    impactMax: 40,
    criticalFlags,
    level: finalLevel,
    levelData: LEVELS[finalLevel],
    subscales,
    topDrivers: subscales.slice(0, 3)
  };
}
