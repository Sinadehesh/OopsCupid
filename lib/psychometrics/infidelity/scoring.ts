import { infidelityQuestions } from "./questions";

/**
 * Deterministic subscale scoring for the infidelity diagnostic.
 *
 * Accepts answers keyed by question id. Values may be the numeric option
 * value (e.g. 3) or the full option string (e.g. "3 - Sometimes").
 * Handles mixed scales correctly: freq5/agree5 items are 1-indexed (1–5),
 * change4 items are 0-indexed (0–3) — each item is normalized against its
 * own option range, and reverse-scored items are flipped within that range.
 */
export function generateInfidelityProfile(answers: Record<string, number | string>) {
  const scores: Record<string, number> = { Digital: 0, Schedule: 0, Emotion: 0, Defensive: 0, Physical: 0 };
  const counts: Record<string, number> = { Digital: 0, Schedule: 0, Emotion: 0, Defensive: 0, Physical: 0 };
  let flagged = 0;
  let answered = 0;

  const leadingDigit = (s: string) => {
    const m = s.match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  };

  infidelityQuestions.forEach((q) => {
    const raw = answers[q.id];
    if (raw === undefined || raw === null) return;

    const val = typeof raw === "number" ? raw : leadingDigit(raw);
    const min = leadingDigit(q.options[0]);
    const denom = q.options.length - 1;

    let idx = Math.min(Math.max(val - min, 0), denom);
    if (q.reverseScore) idx = denom - idx;

    const key = q.subscaleKey;
    if (scores[key] !== undefined) {
      scores[key] += idx;
      counts[key] += denom;
      answered += 1;
      // an answer in the top quarter of its scale is a concrete red flag
      if (idx / denom >= 0.75) flagged += 1;
    }
  });

  const normalized: Record<string, number> = {};
  for (const key in scores) {
    normalized[key] = counts[key] > 0 ? Math.round((scores[key] / counts[key]) * 100) : 0;
  }

  // Global Suspicion Index (heavily weighted on Defensive and Physical evidence)
  const rawRisk =
    normalized.Digital * 0.2 +
    normalized.Schedule * 0.2 +
    normalized.Emotion * 0.15 +
    normalized.Defensive * 0.25 +
    normalized.Physical * 0.2;
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
    archetype = "The Silent Deactivation"; // Checking out, avoiding conflict
  } else if (suspicionIndex > 65) {
    archetype = "The High-Risk Cover-up";
  }

  return {
    suspicionIndex,
    archetype,
    normalizedScores: normalized,
    flaggedCount: flagged,
    answeredCount: answered,
    premiumUnlocked: false,
  };
}
