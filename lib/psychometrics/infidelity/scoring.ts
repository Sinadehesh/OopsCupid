import { infidelityQuestions } from "./questions";

export function generateInfidelityProfile(answers: Record<string, string>) {
  const scores: Record<string, number> = { Digital: 0, Schedule: 0, Emotion: 0, Defensive: 0, Physical: 0 };
  const counts: Record<string, number> = { Digital: 0, Schedule: 0, Emotion: 0, Defensive: 0, Physical: 0 };

  infidelityQuestions.forEach(q => {
    if (!answers[q.id]) return;
    
    const match = answers[q.id].match(/^(\d+)/);
    let val = match ? parseInt(match[1]) : 0;
    
    if (q.reverseScore) {
      val = q.options.length - 1 - val;
    }

    const key = q.subscaleKey;
    if (scores[key] !== undefined) {
      scores[key] += val;
      counts[key] += (q.options.length - 1);
    }
  });

  const normalized: Record<string, number> = {};
  for (const key in scores) {
    normalized[key] = counts[key] > 0 ? Math.round((scores[key] / counts[key]) * 100) : 0;
  }

  // Calculate Global Suspicion Index (Heavily weighted on Defensive and Physical evidence)
  const rawRisk = (normalized.Digital * 0.20) + (normalized.Schedule * 0.20) + (normalized.Emotion * 0.15) + (normalized.Defensive * 0.25) + (normalized.Physical * 0.20);
  const suspicionIndex = Math.min(100, Math.max(0, Math.round(rawRisk)));

  // Archetypes
  let archetype = "The False Alarm";
  
  if (normalized.Defensive > 75 && normalized.Digital > 70) {
    archetype = "The Gaslighting Ghost"; // Hides data, attacks you for asking
  } else if (normalized.Schedule > 75 && normalized.Physical > 70) {
    archetype = "The Double Life"; // Classic affair logistics
  } else if (normalized.Digital > 80 && normalized.Physical < 40) {
    archetype = "The Digital Betrayal"; // Emotional/Cyber affair, low physical evidence
  } else if (normalized.Emotion > 75 && normalized.Defensive < 50) {
    archetype = "The Silent Deactivation"; // Checking out, possibly monkey-branching, but avoiding conflict
  } else if (suspicionIndex > 65) {
    archetype = "The High-Risk Cover-up";
  }

  return {
    suspicionIndex,
    archetype,
    normalizedScores: normalized,
    premiumUnlocked: false
  };
}
