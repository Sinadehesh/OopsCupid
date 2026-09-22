/**
 * COMPOSITE DIMENSIONS
 *
 * Several quizzes score a long tail of one-question subscales. A single
 * item is far too noisy to put on a chart on its own — it would give a
 * paying reader a confident-looking number built from one answer. These
 * helpers average related items into dimensions with enough questions
 * behind them to be worth reporting.
 */

/** Mean of the keys that are actually present, 0–100, rounded. */
export function composite(scores: Record<string, number>, keys: string[]): number {
  const present = keys.map((k) => scores[k]).filter((v): v is number => typeof v === "number");
  if (!present.length) return 0;
  const mean = present.reduce((a, b) => a + b, 0) / present.length;
  return Math.max(0, Math.min(100, Math.round(mean)));
}

/** Same, but the listed keys count inverted (100 - value). */
export function inverseComposite(scores: Record<string, number>, keys: string[]): number {
  return 100 - composite(scores, keys);
}
