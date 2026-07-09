import type { QuizTopic } from "@/lib/quizzes/registry";

/**
 * CENTRAL OFFER CATALOG — the value ladder behind every funnel.
 *
 * Ladder logic (ascending commitment):
 *   1. TRIPWIRE  — low-ticket PDF playbook (existing Gumroad products)
 *   2. CORE      — topic bundle / course (existing Gumroad bundles)
 *   3. COACHING  — 1:1 clarity session (highest margin, sold via Gumroad
 *                  so Gumroad remains merchant of record — no payment
 *                  entity needed on our side)
 *   4. PROGRAM   — multi-week coaching program (backend offer, pitched
 *                  on the coaching page and after a clarity session)
 *
 * ⚠️ The coaching/program Gumroad products must be created in the
 * Gumroad dashboard before these links go live. Every URL lives here —
 * one file to update, every funnel picks it up.
 */

export interface Offer {
  id: string;
  kind: "playbook" | "course" | "coaching" | "program";
  name: string;
  tagline: string;
  price: string; // display only — Gumroad charges the real price
  anchorPrice?: string; // honest comparison anchor (e.g. typical session cost)
  url: string;
  bullets: string[];
  cta: string;
}

// ── COACHING OFFERS (shared across all topics) ─────────────────────────────

export const CLARITY_CALL: Offer = {
  id: "clarity-call",
  kind: "coaching",
  name: "60-Minute Clarity Session",
  tagline: "Your results, decoded live — with a plan you leave with.",
  price: "€49",
  anchorPrice: "€120+ typical coaching rate",
  url: "https://oopscupid.gumroad.com/l/clarity-session",
  bullets: [
    "We walk through your exact quiz results together — no generic advice",
    "You leave with a written 14-day action plan for your situation",
    "Ask anything: scripts, boundaries, whether to stay or go",
    "Video or voice-only — your choice, fully private",
  ],
  cta: "Book My Clarity Session",
};

export const RESET_PROGRAM: Offer = {
  id: "reset-program",
  kind: "program",
  name: "The 4-Week Pattern Reset",
  tagline: "Four weekly 1:1 sessions to break the cycle for good.",
  price: "€179",
  anchorPrice: "€480 if booked as single sessions",
  url: "https://oopscupid.gumroad.com/l/pattern-reset",
  bullets: [
    "Week 1: map your pattern and its triggers",
    "Week 2: boundary scripts and live practice",
    "Week 3: rewire the 'chemistry' that picks the wrong people",
    "Week 4: your relapse-proof plan, in writing",
  ],
  cta: "Start My 4-Week Reset",
};

// ── TOPIC LADDERS (tripwire + core per quiz topic) ─────────────────────────

interface TopicLadder {
  playbook: Offer;
  course: Offer;
}

const ladders: Record<QuizTopic, TopicLadder> = {
  infidelity: {
    playbook: {
      id: "caught-or-paranoid",
      kind: "playbook",
      name: "Caught or Paranoid?",
      tagline: "The evidence protocol: verify before you confront.",
      price: "€14",
      url: "https://oopscupid.gumroad.com/l/caught-or-paranoid",
      bullets: [
        "The 7-day documentation protocol",
        "What counts as proof vs. paranoia fuel",
        "The one confrontation mistake that lets him rewrite the story",
      ],
      cta: "Get the Evidence Protocol",
    },
    course: {
      id: "cheating-truth-bundle",
      kind: "course",
      name: "The Cheating Truth Bundle",
      tagline: "Everything: verify, confront, decide, recover.",
      price: "€24",
      url: "https://oopscupid.gumroad.com/l/cheating-truth-bundle",
      bullets: [
        "Both playbooks: evidence protocol + clean break or comeback",
        "Word-for-word confrontation scripts",
        "The stay-or-go decision framework",
      ],
      cta: "Get the Full Bundle",
    },
  },
  manipulation: {
    playbook: {
      id: "manipulation-defense",
      kind: "playbook",
      name: "The Manipulation Defense Playbook",
      tagline: "Name the tactic, break the script, take back the frame.",
      price: "€14",
      url: "https://oopscupid.gumroad.com/l/manipulation-defense",
      bullets: [
        "The 12 tactics decoded: DARVO, guilt loops, silent treatment",
        "Counter-scripts for each tactic, word for word",
        "How to stop JADE-ing (justify, argue, defend, explain)",
      ],
      cta: "Get the Defense Playbook",
    },
    course: {
      id: "manipulation-bundle",
      kind: "course",
      name: "The Frame Control Course",
      tagline: "From target to untouchable in 21 days.",
      price: "€29",
      url: "https://oopscupid.gumroad.com/l/frame-control",
      bullets: [
        "21 daily lessons with one script to use that day",
        "Boundary escalation ladder: from hint to hard line",
        "Exit planning module if the tactics don't stop",
      ],
      cta: "Start the Course",
    },
  },
  gaslighting: {
    playbook: {
      id: "gaslighting-defense-playbook",
      kind: "playbook",
      name: "The Gaslighting Defense Playbook",
      tagline: "Trust your memory again. Document, deflect, decide.",
      price: "€14",
      url: "https://sinadehesh.gumroad.com/l/gaslighting-defense-playbook",
      bullets: [
        "The reality-log method that ends 'that never happened'",
        "Grey-rock and broken-record scripts that don't escalate",
        "The 3 signs it's changeable vs. the 3 signs it's not",
      ],
      cta: "Get the Playbook",
    },
    course: {
      id: "gaslighting-bundle",
      kind: "course",
      name: "The Gaslighting Recovery Bundle",
      tagline: "Defense playbook + the healthy-man comparison guide.",
      price: "€24",
      url: "https://sinadehesh.gumroad.com/l/gaslighting-bundle",
      bullets: [
        "Everything in the Defense Playbook",
        "The Healthy Man Playbook: what normal actually looks like",
        "Self-trust rebuilding exercises, week by week",
      ],
      cta: "Get the Bundle",
    },
  },
  attachment: {
    playbook: {
      id: "attachment-workbook",
      kind: "playbook",
      name: "The Attachment Workbook",
      tagline: "Rewire your style with 4 weeks of daily exercises.",
      price: "€19",
      url: "https://sinadehesh.gumroad.com/l/attachment-workbook",
      bullets: [
        "Daily 10-minute exercises matched to your style",
        "The protest-behavior tracker (anxious) / deactivation log (avoidant)",
        "Secure-communication scripts for triggering moments",
      ],
      cta: "Get the Workbook",
    },
    course: {
      id: "attachment-truth-bundle",
      kind: "course",
      name: "The Attachment Truth Bundle",
      tagline: "Decode his style + reach him with the right scripts.",
      price: "€29",
      url: "https://oopscupid.gumroad.com/l/attachment-truth-bundle",
      bullets: [
        "Decode His Attachment: why he pulls away and when he won't",
        "The Reach-Him Playbook: scripts that land with avoidants",
        "Compatibility map for your style pairing",
      ],
      cta: "Get the Bundle",
    },
  },
  "attraction-patterns": {
    playbook: {
      id: "pattern-breaker",
      kind: "playbook",
      name: "The Pattern Breaker Playbook",
      tagline: "Why 'your type' keeps hurting you — and the 30-day fix.",
      price: "€14",
      url: "https://oopscupid.gumroad.com/l/pattern-breaker",
      bullets: [
        "Your attraction template mapped to its origin",
        "The 'boring vs. secure' recalibration exercises",
        "First-date filters that screen out your pattern early",
      ],
      cta: "Get the Playbook",
    },
    course: {
      id: "trauma-playbook",
      kind: "course",
      name: "The Deep Pattern Course",
      tagline: "Trauma-informed rewiring for repeat relationship cycles.",
      price: "€29",
      url: "https://sinadehesh.gumroad.com/l/trauma-playbook",
      bullets: [
        "The childhood-loop deconstruction module",
        "Nervous-system work: why chaos feels like chemistry",
        "The 60-day new-pattern protocol",
      ],
      cta: "Start the Course",
    },
  },
  "self-sabotage": {
    playbook: {
      id: "sabotage-stop",
      kind: "playbook",
      name: "The Self-Sabotage Stop Kit",
      tagline: "Catch the pattern mid-act and interrupt it.",
      price: "€14",
      url: "https://sinadehesh.gumroad.com/l/sabotage-bundle",
      bullets: [
        "Your sabotage signature: testing, picking fights, or ghosting first",
        "The 90-second interrupt technique",
        "Repair scripts for after you've already done the thing",
      ],
      cta: "Get the Stop Kit",
    },
    course: {
      id: "sabotage-course",
      kind: "course",
      name: "The Secure Love Course",
      tagline: "From sabotage loops to a relationship that feels safe.",
      price: "€29",
      url: "https://sinadehesh.gumroad.com/l/sabotage-bundle",
      bullets: [
        "Week-by-week sabotage deconditioning",
        "Partner communication scripts for vulnerable moments",
        "The 'earned secure' roadmap with milestones",
      ],
      cta: "Start the Course",
    },
  },
  "toxic-friends": {
    playbook: {
      id: "friend-audit",
      kind: "playbook",
      name: "The Friendship Audit Kit",
      tagline: "Decide who stays, who gets distance, who goes.",
      price: "€12",
      url: "https://oopscupid.gumroad.com/l/friendship-audit",
      bullets: [
        "The keep/distance/cut decision matrix",
        "Slow-fade vs. direct-talk scripts for each case",
        "How to survive the group fallout",
      ],
      cta: "Get the Audit Kit",
    },
    course: {
      id: "friend-boundaries",
      kind: "course",
      name: "The Boundaries Course",
      tagline: "Stop being the group's free therapist and doormat.",
      price: "€24",
      url: "https://oopscupid.gumroad.com/l/boundaries-course",
      bullets: [
        "Boundary scripts for the 8 hardest friend situations",
        "Guilt-management: hold the line without hating yourself",
        "Rebuild: how to find friends who don't drain you",
      ],
      cta: "Start the Course",
    },
  },
  "red-flags": {
    playbook: {
      id: "red-flag-decoder",
      kind: "playbook",
      name: "The Red Flag Decoder",
      tagline: "Rank his flags by actual danger, not vibes.",
      price: "€12",
      url: "https://oopscupid.gumroad.com/l/red-flag-decoder",
      bullets: [
        "All 47 flags ranked by escalation risk",
        "Deal-breaker vs. workable: the honest sorting rules",
        "The early-exit scripts that avoid the drawn-out ending",
      ],
      cta: "Get the Decoder",
    },
    course: {
      id: "smart-dating-course",
      kind: "course",
      name: "The Smart Screening Course",
      tagline: "Filter out the wrong men in 3 dates, not 3 years.",
      price: "€24",
      url: "https://oopscupid.gumroad.com/l/smart-screening",
      bullets: [
        "The 3-date screening framework",
        "Questions that reveal character without an interrogation",
        "Pace-setting: how to slow down a love-bomber",
      ],
      cta: "Start the Course",
    },
  },
};

export type Severity = "low" | "moderate" | "high";

export interface OfferStack {
  playbook: Offer;
  course: Offer;
  coaching: Offer;
  /** Which rung to visually feature, based on result severity. */
  featured: "playbook" | "course" | "coaching";
}

/**
 * The upsell brain: higher severity → push higher-touch (higher-margin)
 * offers. Low-severity users get the cheap playbook (easy yes), high-severity
 * users are the ones who most need — and most convert on — coaching.
 */
export function getOfferStack(topic: QuizTopic, severity: Severity): OfferStack {
  const ladder = ladders[topic];
  return {
    playbook: ladder.playbook,
    course: ladder.course,
    coaching: CLARITY_CALL,
    featured: severity === "high" ? "coaching" : severity === "moderate" ? "course" : "playbook",
  };
}

/** Map a 0-100 score to a severity band. */
export function scoreToSeverity(score: number): Severity {
  if (score >= 70) return "high";
  if (score >= 45) return "moderate";
  return "low";
}
