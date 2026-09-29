/**
 * THE PROGRAM FORMAT
 *
 * Every workbook on the site is one of these. The first workbook was
 * forty-eight hand-built pages, each with its own layout and state, and it
 * could not be extended: a second programme would have meant another
 * forty-eight. Content is data now, and one renderer draws all of it.
 *
 * The shape is fixed on purpose. Four weeks, five sessions a week, each
 * session ten to fifteen minutes, and the weeks always move the same way:
 *
 *   1. See it        naming the pattern, measuring a baseline
 *   2. Understand it where it comes from and what it protects
 *   3. Change it     skills, practised on the real situation
 *   4. Live it       values, self-compassion, a plan for the relapse
 *
 * That is the arc of a structured CBT protocol: psychoeducation, then a
 * formulation, then skills, then consolidation and relapse prevention. It
 * is what makes a workbook something other than a stack of prompts.
 */

export type BlockKind =
  | "read"
  | "reflect"
  | "scale"
  | "choose"
  | "sort"
  | "thoughts"
  | "script"
  | "timer"
  | "experiment"
  | "check"
  | "letter";

interface BlockBase {
  /** Stable within the session. Persistence and the weekly review key on it. */
  id: string;
}

/** A short piece of psychoeducation. The "why" is what makes it stick. */
export interface ReadBlock extends BlockBase {
  kind: "read";
  title: string;
  body: string[];
  /** The research or the reason, one or two sentences. */
  why?: string;
}

export interface ReflectBlock extends BlockBase {
  kind: "reflect";
  prompt: string;
  hint?: string;
  placeholder?: string;
  rows?: number;
}

/** 0 to 10. Measured more than once, so change can be seen. */
export interface ScaleBlock extends BlockBase {
  kind: "scale";
  prompt: string;
  low: string;
  high: string;
  /**
   * Which way is progress. Most scales here measure something she wants
   * more of (self-trust, clarity), but some measure what she wants less of
   * (how loud the alarm is), and reading a falling alarm back to her as a
   * setback would be exactly backwards. Defaults to "higher".
   */
  better?: "higher" | "lower";
  /** Ties a re-measure back to its baseline, e.g. week 4 against week 1. */
  compareTo?: { program?: string; week: number; day: number; id: string; label: string };
}

export interface ChooseBlock extends BlockBase {
  kind: "choose";
  prompt: string;
  options: string[];
  /** Shown once anything is picked. Keyed by count band. */
  after?: { few?: string; many?: string };
}

/** Drag-free sort: tap an item, then tap a bucket. Works on a phone. */
export interface SortBlock extends BlockBase {
  kind: "sort";
  prompt: string;
  buckets: string[];
  items: { text: string; answer?: string }[];
  /** When items have answers, what to say once all are placed. */
  after?: string;
}

/** A CBT thought record, four columns. */
export interface ThoughtsBlock extends BlockBase {
  kind: "thoughts";
  prompt: string;
  example?: { situation: string; thought: string; evidence: string; balanced: string };
}

/** Fill-in script. Fields render as inputs; the assembled sentence below. */
export interface ScriptBlock extends BlockBase {
  kind: "script";
  prompt: string;
  /** Lines with {field} slots. */
  template: string[];
  fields: { key: string; label: string; placeholder: string }[];
}

export interface TimerBlock extends BlockBase {
  kind: "timer";
  title: string;
  seconds: number;
  /** Cues shown in turn across the timer. */
  cues: string[];
}

/** A behavioural experiment: predict, do, compare. */
export interface ExperimentBlock extends BlockBase {
  kind: "experiment";
  task: string;
  predictPrompt: string;
  resultPrompt: string;
  learnPrompt: string;
}

/** A knowledge check. Wrong answers explain rather than mark. */
export interface CheckBlock extends BlockBase {
  kind: "check";
  question: string;
  options: { text: string; correct?: boolean; because: string }[];
}

export interface LetterBlock extends BlockBase {
  kind: "letter";
  to: string;
  prompt: string;
  opening: string;
}

export type Block =
  | ReadBlock
  | ReflectBlock
  | ScaleBlock
  | ChooseBlock
  | SortBlock
  | ThoughtsBlock
  | ScriptBlock
  | TimerBlock
  | ExperimentBlock
  | CheckBlock
  | LetterBlock;

export interface Session {
  day: number;
  title: string;
  minutes: number;
  /** The method, named honestly: "CBT · thought record". */
  technique: string;
  intro: string;
  blocks: Block[];
  /** One sentence to leave with. */
  takeaway: string;
}

export interface Week {
  week: number;
  theme: string;
  goal: string;
  sessions: Session[];
}

export interface ProgramOutline {
  week: number;
  theme: string;
  sessions: { title: string; technique: string }[];
}

export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  /** Quiz slugs whose buyers this is for. */
  forQuizzes: string[];
  /** Who it is for, in one sentence she would recognise. */
  whoFor: string;
  /** What changes by the end, stated modestly and specifically. */
  outcomes: string[];
  /** Named methods, for the honest "what this draws on" line. */
  methods: string[];
  /** What the weekly review is told the programme is about. */
  reviewFocus: string;
  accent: string;
  /**
   * Only "live" programmes are listed or sold. An outline is a plan, and
   * docs/PAID-CONTENT.md is explicit that plans are not for sale.
   */
  status: "live" | "outline";
  /** Present when live. */
  weeks?: Week[];
  /** Always present: the plan the content is written against. */
  outline: ProgramOutline[];
  /** Shown before week 1 when the subject needs it. */
  safety?: string;
}
