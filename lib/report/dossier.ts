import type { Evidence } from "./evidence";

/**
 * PREMIUM DOSSIER — shared content contract
 *
 * Every paid report is the same five-act structure (verdict → data →
 * mechanism → scripts → plan) filled with quiz-specific writing. Keeping
 * the shape here is what stops the reports drifting back into the
 * copy-pasted, one-paragraph-per-band sameness they had before: a quiz
 * cannot render a dossier without supplying a distinct insight for every
 * subscale it measures.
 */

/** One measured dimension, normalised to 0–100 so charts are comparable. */
export interface Subscale {
  key: string;
  /** Full name, used in prose and bar labels. */
  label: string;
  /** 1–2 words for the radar axis, where space is tight. */
  short: string;
  value: number;
  /** One line explaining what the dimension measures (chart tooltips). */
  measures: string;
}

/** Band-specific writing. Bands are score ranges, not personality types. */
export interface Band {
  id: string;
  label: string;
  /** Hex, used for gauge/bars/accents. */
  accent: string;
  /** 2–4 sentences. The headline judgement, in plain language. */
  verdict: string;
  /** What this means for the next fortnight. */
  urgency: string;
  /** Short reassurance so a bad score does not read as a life sentence. */
  perspective: string;
}

/**
 * Per-subscale writing. Three tiers because "you scored 71" means nothing
 * on its own — the same dimension needs different advice high vs low.
 */
export interface SubscaleInsight {
  /** Why this dimension behaves the way it does. Mechanism, not label. */
  mechanism: string;
  high: string;
  mid: string;
  low: string;
  /** The single concrete thing to change. */
  move: string;
}

export interface ScriptCard {
  situation: string;
  say: string;
  why: string;
}

export interface ActionStep {
  /** e.g. "Days 1–3" */
  window: string;
  title: string;
  detail: string;
}

export interface DeepDiveSection {
  heading: string;
  body: string;
}

export interface Dossier {
  /** Quiz name, shown in the header. */
  quiz: string;
  /** e.g. "Infidelity Risk Dossier" */
  title: string;
  /** What the headline number is called, e.g. "Suspicion Index". */
  scoreLabel: string;
  score: number;
  band: Band;
  /** The archetype/type name, when the quiz produces one. */
  archetype?: string;
  /** Small-caps label above it. Defaults to "Your profile". */
  archetypeLabel?: string;
  archetypeBlurb?: string;
  subscales: Subscale[];
  insights: Record<string, SubscaleInsight>;
  deepDive: DeepDiveSection[];
  scripts: ScriptCard[];
  plan: ActionStep[];
  /** Answers to the questions a buyer asks after reading. */
  faq?: { q: string; a: string }[];
  /** Phrase the coaching upsell uses, e.g. "his pattern of stonewalling". */
  topicLabel?: string;
  /**
   * The buyer's own answers, quoted back. Optional only because not every
   * quiz has been migrated to keep them yet — but a report without this is
   * a report that could have been written before she arrived, and it should
   * not be charged for. See docs/PAID-CONTENT.md.
   */
  evidence?: Evidence;
}

/** Which tier of writing a subscale score falls into. */
export function tierOf(value: number): "high" | "mid" | "low" {
  if (value >= 67) return "high";
  if (value >= 34) return "mid";
  return "low";
}

export function insightFor(insight: SubscaleInsight, value: number): string {
  return insight[tierOf(value)];
}

/** Rank labels used beside each bar, so the numbers carry meaning. */
export function intensityLabel(value: number): string {
  if (value >= 80) return "Dominant";
  if (value >= 67) return "Strong";
  if (value >= 50) return "Present";
  if (value >= 34) return "Occasional";
  if (value >= 17) return "Faint";
  return "Absent";
}

/** Pick the band whose threshold the score clears. Bands: highest first. */
export function bandFor<T extends { min: number }>(score: number, bands: T[]): T {
  return bands.find((b) => score >= b.min) ?? bands[bands.length - 1];
}
