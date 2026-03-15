import { sabotageQuestions } from "./questions";

const LEVELS = [
  { title: "Low pattern", subtitle: "Little evidence of repeated self-sabotage.", advice: "Keep building direct communication, notice triggers early, and use the subscales more as self-awareness than warning." },
  { title: "Mild self-protection", subtitle: "You protect yourself sometimes, but the pattern is not dominating your relationships.", advice: "Track what triggers distance or panic, and practice naming the feeling before acting on it." },
  { title: "Emerging sabotage", subtitle: "A real pattern is forming around fear or worthiness.", advice: "Pause before testing, chasing, or withdrawing; write down the trigger, the story you told yourself, and the action you wanted to take." },
  { title: "Moderate sabotage cycle", subtitle: "Protective habits are shaping your relationships in visible ways.", advice: "Focus on one repair skill at a time: direct reassurance requests, conflict regulation, and tolerating closeness without creating drama." },
  { title: "High sabotage pattern", subtitle: "This pattern repeatedly distorts your choices and reactions.", advice: "Work on the core driver, not just the behavior; structured journaling, therapy, or attachment-focused work would likely help." },
  { title: "Severe cycle", subtitle: "Self-protection is overwhelming connection.", advice: "Get support outside the relationship, slow major decisions when activated, and treat this as a serious pattern worth working on, not a personality flaw." }
];

export function calculateSabotageScore(answers: number[]) {
  let totalScore = 0;
  let criticalFlags = 0;

  const subscaleScores: Record<string, number> = {
    fear_of_closeness: 0, rejection_alarm: 0, worthiness_wounds: 0,
    protest_testing: 0, withdrawal_exit: 0
  };

  answers.forEach((rawScore, index) => {
    const q = sabotageQuestions[index];
    // Reverse scoring logic (0=4, 1=3, 2=2, 3=1, 4=0)
    const score = q.isReverse ? 4 - rawScore : rawScore;
    
    totalScore += score;
    subscaleScores[q.subscale] += score;
    if (q.isCritical && score >= 3) criticalFlags += 1;
  });

  const composites = {
    anxiousPattern: subscaleScores.rejection_alarm + subscaleScores.protest_testing,
    avoidantPattern: subscaleScores.fear_of_closeness + subscaleScores.withdrawal_exit,
    selfWorthCore: subscaleScores.worthiness_wounds,
    vulnerabilityScore: subscaleScores.rejection_alarm + subscaleScores.worthiness_wounds,
    defenseScore: subscaleScores.fear_of_closeness + subscaleScores.protest_testing + subscaleScores.withdrawal_exit
  };

  // Base Level logic
  let baseLevel = 0;
  if (totalScore >= 150) baseLevel = 5;
  else if (totalScore >= 120) baseLevel = 4;
  else if (totalScore >= 90) baseLevel = 3;
  else if (totalScore >= 60) baseLevel = 2;
  else if (totalScore >= 30) baseLevel = 1;

  // Escalation Rules
  let subscalesOver30 = Object.values(subscaleScores).filter(s => s >= 30).length;
  if (criticalFlags >= 4 && baseLevel < 5) baseLevel += 1;
  if (subscalesOver30 >= 2 && baseLevel < 5) baseLevel += 1;
  if (totalScore >= 150 && (composites.anxiousPattern >= 55 || composites.avoidantPattern >= 55)) baseLevel = 5;
  
  const finalLevel = Math.min(baseLevel, 5);

  // Archetype blending logic
  let archetype = "";
  if (subscaleScores.rejection_alarm >= 26 && subscaleScores.protest_testing >= 26) archetype = "The Chase and Test Cycle";
  else if (subscaleScores.fear_of_closeness >= 26 && subscaleScores.withdrawal_exit >= 26) archetype = "The Leave Before It Hurts Pattern";
  else if (subscaleScores.worthiness_wounds >= 26 && subscaleScores.rejection_alarm >= 26) archetype = "The Not Chosen Wound";
  else if (subscaleScores.fear_of_closeness >= 26 && subscaleScores.protest_testing >= 26) archetype = "The Push-Pull Protector";
  else {
    // Single dominant archetype
    const dominant = Object.keys(subscaleScores).reduce((a, b) => subscaleScores[a] > subscaleScores[b] ? a : b);
    if (dominant === "fear_of_closeness") archetype = "The Door-Closer";
    if (dominant === "rejection_alarm") archetype = "The Rejection Radar";
    if (dominant === "worthiness_wounds") archetype = "The Not-Enough Spiral";
    if (dominant === "protest_testing") archetype = "The Tester";
    if (dominant === "withdrawal_exit") archetype = "The Slow Fade";
  }

  const subscales = [
    { key: "fear_of_closeness", label: "Fear of Closeness", score: subscaleScores.fear_of_closeness, max: 40, pct: (subscaleScores.fear_of_closeness / 40) * 100 },
    { key: "rejection_alarm", label: "Rejection Alarm", score: subscaleScores.rejection_alarm, max: 40, pct: (subscaleScores.rejection_alarm / 40) * 100 },
    { key: "worthiness_wounds", label: "Worthiness Wounds", score: subscaleScores.worthiness_wounds, max: 40, pct: (subscaleScores.worthiness_wounds / 40) * 100 },
    { key: "protest_testing", label: "Protest & Testing", score: subscaleScores.protest_testing, max: 40, pct: (subscaleScores.protest_testing / 40) * 100 },
    { key: "withdrawal_exit", label: "Withdrawal & Exit", score: subscaleScores.withdrawal_exit, max: 40, pct: (subscaleScores.withdrawal_exit / 40) * 100 }
  ].sort((a, b) => b.pct - a.pct);

  return {
    totalScore,
    maxScore: 200,
    level: finalLevel,
    levelData: LEVELS[finalLevel],
    archetype,
    subscales,
    composites,
    criticalFlags,
    topDrivers: subscales.slice(0, 2)
  };
}
