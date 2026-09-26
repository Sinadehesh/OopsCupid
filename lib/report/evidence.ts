/**
 * WHAT THE BUYER ACTUALLY SAID
 *
 * Every scoring function in this codebase threw the answers away and kept
 * only the totals. That single decision is why the paid reports could not
 * justify their price: with nothing but a band and ten subscale numbers to
 * work from, the most a report could do was print a pre-written paragraph
 * per band. Two women who answered oppositely and landed in the same band
 * read word-for-word the same report — which a careful reader spots
 * immediately, and correctly calls a leaflet with her score on it.
 *
 * The fix is not better prose. It is using the data. Someone answered
 * fifty specific statements about her own life; the report should tell her
 * what she said. "You marked 'I keep replying even after he has shown me
 * he is unreliable' as very true, and 'I ignore my own standards when
 * attraction is strong' as rarely true" is information that exists nowhere
 * else in the world — not in the free result, not in any article, not in a
 * competitor's quiz. That is what a buyer is owed.
 *
 * Three things come out of here, in descending order of how much they are
 * worth:
 *
 *  1. The statements she endorsed, quoted exactly, with her own answer.
 *  2. The statements she rejected — the exceptions. A pattern with holes
 *     in it is a more accurate and more usable description than a score.
 *  3. Where her answers disagree with each other. Two items from the same
 *     dimension answered at opposite ends means the dimension is firing on
 *     something narrower than its name, and that narrowing is the most
 *     specific thing a report can hand her.
 *
 * None of this is generated writing. It is her own words, arranged.
 */

/**
 * A question, in the loosest shape that covers every battery here. The
 * per-quiz banks disagree about almost everything — numeric ids in the
 * bespoke quizzes, string ids in the psychometric vaults, five-point
 * agreement scales in some, four-point 0-based intensity scales in others —
 * so the adapter for each quiz maps onto this rather than the reverse.
 */
export interface Question {
  id: number | string;
  text: string;
  /** The subscale this question belongs to. */
  category: string;
  /**
   * The exact wording shown for each choice, lowest value first. Preferred
   * over the default scale: quoting back the words she actually clicked is
   * the whole point.
   */
  options?: string[];
  /** Lowest selectable value. 1 for the agreement scales, 0 for intensity. */
  min?: number;
}

export interface AnsweredQuestion extends Question {
  /** The value as answered. */
  score: number;
  /** The wording the quiz showed beside that value. */
  answer: string;
  /** Where the answer sits on its own scale, 0 (lowest) to 1 (highest). */
  position: number;
}

/**
 * Two items from one dimension answered at opposite ends. Kept factual on
 * purpose: the report's own copy does the interpreting, because a generated
 * sentence about a contradiction is exactly the filler this is replacing.
 */
export interface Tension {
  category: string;
  agreed: AnsweredQuestion;
  denied: AnsweredQuestion;
}

export interface Evidence {
  /** How many of the questions were answered, out of how many. */
  answered: number;
  total: number;
  /** Everything marked 4 or 5, strongest first. */
  endorsed: AnsweredQuestion[];
  /** Everything marked 1 or 2, most emphatic first. */
  rejected: AnsweredQuestion[];
  /** Every answer, grouped by dimension, strongest first within each. */
  bySubscale: Record<string, AnsweredQuestion[]>;
  tensions: Tension[];
}

/**
 * The five-point scale every one of these quizzes uses, in the wording the
 * buyer saw. Quoting "Often true" back at her is honest; quoting "4" is a
 * spreadsheet.
 */
const SCALE = ["Never true", "Rarely true", "Sometimes true", "Often true", "Very true"];

/**
 * Strip the numbering the quizzes prefix onto their choices: the buyer saw
 * "4 - Often", and "Often" is what belongs in a sentence about her.
 */
function tidy(label: string): string {
  return label.replace(/^\s*\d+\s*[-–.)]\s*/, "").trim();
}

export function answerLabel(q: Question, score: number): string {
  const min = q.min ?? 1;
  const options = q.options ?? SCALE;
  return tidy(options[score - min] ?? String(score));
}

/**
 * Some quizzes store the number, others store the option string the buyer
 * clicked ("3 - Often", or plain "Yes"). Both are answers; resolve either.
 */
function valueOf(q: Question, raw: number | string | undefined): number | null {
  if (typeof raw === "number") return Number.isNaN(raw) ? null : raw;
  if (typeof raw !== "string") return null;

  const index = q.options?.indexOf(raw) ?? -1;
  if (index >= 0) return (q.min ?? 1) + index;

  const parsed = Number(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

/** 0 for the bottom of this question's scale, 1 for the top. */
function positionOf(q: Question, score: number): number {
  const min = q.min ?? 1;
  const max = min + ((q.options ?? SCALE).length - 1);
  if (max <= min) return 0;
  return Math.max(0, Math.min(1, (score - min) / (max - min)));
}

/**
 * Items are placed by what she literally answered, not by what they
 * contribute to a subscale. Several batteries reverse-score some items, so
 * strongly disagreeing with one can push a score up — but quoting "you
 * strongly disagreed with this" under a heading about strong agreement
 * would be false, and explaining the reversal to a buyer is noise. This
 * section reports what she said; the scoring's internal arithmetic stays
 * where it belongs, in the scoring.
 */
export function buildEvidence(
  questions: Question[],
  answers: Record<string | number, number | string>
): Evidence {
  const all: AnsweredQuestion[] = [];

  for (const q of questions) {
    const score = valueOf(q, answers[q.id]);
    if (score === null) continue; // Unanswered.
    all.push({
      ...q,
      score,
      answer: answerLabel(q, score),
      position: positionOf(q, score),
    });
  }

  const strongestFirst = (a: AnsweredQuestion, b: AnsweredQuestion) => b.position - a.position;
  const weakestFirst = (a: AnsweredQuestion, b: AnsweredQuestion) => a.position - b.position;

  const bySubscale: Record<string, AnsweredQuestion[]> = {};
  for (const item of all) {
    (bySubscale[item.category] ??= []).push(item);
  }
  for (const list of Object.values(bySubscale)) list.sort(strongestFirst);

  // A dimension she both strongly agreed and strongly disagreed with is
  // where the score is hiding something. Take the widest split per
  // dimension; a second pair from the same dimension says nothing new.
  const tensions: Tension[] = [];
  for (const [category, list] of Object.entries(bySubscale)) {
    const agreed = list[0];
    const denied = list[list.length - 1];
    if (agreed && denied && agreed.position >= 0.75 && denied.position <= 0.25) {
      tensions.push({ category, agreed, denied });
    }
  }
  // Widest splits first — those are the ones worth the reader's attention.
  tensions.sort(
    (a, b) =>
      b.agreed.position - b.denied.position - (a.agreed.position - a.denied.position)
  );

  return {
    answered: all.length,
    total: questions.length,
    endorsed: all.filter((i) => i.position >= 0.75).sort(strongestFirst),
    rejected: all.filter((i) => i.position <= 0.25).sort(weakestFirst),
    bySubscale,
    tensions,
  };
}

/** True when there is enough here to be worth showing. */
export function hasEvidence(evidence?: Evidence | null): evidence is Evidence {
  return Boolean(evidence && evidence.answered > 0);
}

/**
 * Adapter for the psychometric batteries in lib/psychometrics/*.
 *
 * They all share a shape — string id, subscale key, and the exact option
 * wording the respondent clicked — but call the subscale something
 * different from what the dossiers call it, and two of them use a 0-based
 * four-point scale. Both differences belong here rather than in four copies
 * at the call sites.
 */
export function fromBattery(
  questions: {
    id: string;
    text: string;
    subscaleKey: string;
    options?: string[];
  }[],
  /** Turns a subscale key into the name the report uses for it. */
  label: (subscaleKey: string) => string = humanise
): Question[] {
  return questions.map((q) => ({
    id: q.id,
    text: q.text,
    category: label(q.subscaleKey),
    options: q.options,
    min: q.options?.[0]?.trimStart().startsWith("0") ? 0 : 1,
  }));
}

/** "emotionalAvailability" / "emotional_availability" -> "Emotional availability". */
export function humanise(key: string): string {
  const spaced = key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
