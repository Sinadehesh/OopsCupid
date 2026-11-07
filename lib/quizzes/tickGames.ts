/**
 * How each forty-second test plays. The data and the scoring stay the
 * same (a set of picked items), so the reads, guides and reports behind
 * them don't change; only the way she picks them does.
 *
 *  - bingo: the items are a bingo card. Stamp the ones you've had, shout
 *    BINGO on every full line. Only 12 or 16 items make a square-ish card.
 *  - receipt: scan each thing he does and it prints on a till receipt,
 *    totalled at the end. The receipt is the screenshot.
 *  - tier: sort every item into all the time, sometimes or never, one at
 *    a time, and build a tier list. "All the time" and "sometimes" count
 *    as picked.
 */

import { TYPE_QUIZZES } from "./typeQuizzes";

export type TickMode = "bingo" | "receipt" | "tier";

export interface TickGame {
  mode: TickMode;
  /** The game's own name, e.g. "Toxic Friend Bingo". */
  name: string;
  /** One line on how to play. */
  how: string;
  /** Receipt only. */
  store?: string;
  paidWith?: string;
  /** Tier only: labels for the three rows, most first. */
  tiers?: [string, string, string];
}

const SELF: [string, string, string] = ["💀 Guilty, often", "😬 Once or twice", "😇 Never"];
const HIM: [string, string, string] = ["💀 All the time", "😬 Sometimes", "😇 Never"];

export const TICK_GAMES: Record<string, TickGame> = {
  "things-my-friend-says": { mode: "bingo", name: "Toxic Friend Bingo", how: "Stamp every line she's said to you. Get a full row, column or diagonal for BINGO." },
  "first-month-red-flags": { mode: "bingo", name: "Red Flag Bingo", how: "Stamp everything that happened in the first month. Full line = BINGO." },
  "is-my-boyfriend-toxic": { mode: "bingo", name: "Toxic Boyfriend Bingo", how: "Stamp everything he's done. A full row, column or diagonal is a BINGO. You don't want a BINGO." },
  "is-my-friend-a-pick-me": { mode: "bingo", name: "Pick-Me Bingo", how: "Stamp everything she's said or done. Full line = BINGO." },
  "are-you-the-therapist-friend": { mode: "bingo", name: "Therapist Friend Bingo", how: "Stamp everything that's happened to you. Full line = BINGO. Full card = invoice them." },
  "is-it-a-situationship": { mode: "bingo", name: "Situationship Bingo", how: "Stamp everything that sounds familiar. Full line = BINGO." },
  "is-my-fwb-catching-feelings": { mode: "bingo", name: "FWB Feelings Bingo", how: "Stamp everything he's done lately. Full line = BINGO. Full card = it's a relationship." },
  "is-he-a-pick-me-boy": { mode: "bingo", name: "Pick-Me Boy Bingo", how: "Stamp everything he's said or done. Full line = BINGO." },
  "is-my-friend-manipulative": { mode: "bingo", name: "Manipulative Friend Bingo", how: "Stamp everything she's done more than once. A full line is a BINGO you don't want." },

  "things-he-does": { mode: "receipt", name: "The Receipts", how: "Scan everything he's started doing. We'll print you the receipt.", store: "HIS NEW HABITS LTD", paidWith: "YOUR PEACE OF MIND" },
  "is-my-boyfriend-stupid": { mode: "receipt", name: "His Receipt", how: "Scan every clueless thing he's done. We'll total it up.", store: "CLUELESS & CO.", paidWith: "YOUR PATIENCE" },
  "is-he-a-mamas-boy": { mode: "receipt", name: "The Mummy Receipt", how: "Scan everything that sounds like him. We'll print the bill.", store: "MUM'S THE WORD MART", paidWith: "EVERY SUNDAY LUNCH" },
  "is-he-just-not-that-into-you": { mode: "receipt", name: "The Mixed Signals Receipt", how: "Scan everything he does. See what you're really paying.", store: "MIXED SIGNALS STORE", paidWith: "YOUR ENERGY" },
  "does-he-have-narcissistic-traits": { mode: "receipt", name: "The Ego Receipt", how: "Scan every one you've seen. We'll print his tab.", store: "ALL ABOUT ME PLC", paidWith: "YOUR SELF-ESTEEM" },
  "is-he-avoidant": { mode: "receipt", name: "The Avoidant Receipt", how: "Scan everything he actually does. We'll print what it's costing you.", store: "I NEED SPACE LTD", paidWith: "YOUR PATIENCE" },
  "is-my-friend-mad-at-me": { mode: "receipt", name: "The Overthinking Receipt", how: "Scan everything that's actually happened. We'll total it up.", store: "READ INTO IT & CO.", paidWith: "THREE HOURS OF REPLAYING" },
  "emotional-cheating-or-friendship": { mode: "receipt", name: "The Just Friends Receipt", how: "Scan everything you've seen between them. We'll print the bill.", store: "JUST FRIENDS LTD", paidWith: "YOUR GUT FEELING" },
  "am-i-being-love-bombed": { mode: "receipt", name: "The Love Bomb Receipt", how: "Scan everything that's happened. We'll print what it's really costing.", store: "TOO MUCH TOO SOON", paidWith: "YOUR BOUNDARIES" },

  "waiting-for-his-reply": { mode: "tier", name: "Overthinking Tier List", how: "Sort each one: how often do you do it? Build your tier list.", tiers: SELF },
  "when-it-gets-serious": { mode: "tier", name: "Self-Sabotage Tier List", how: "Sort each one by how often you do it when things get real.", tiers: SELF },
  "am-i-the-toxic-one": { mode: "tier", name: "Toxic Habits Tier List", how: "Be honest. Sort each one by how often you've done it.", tiers: SELF },
  "after-a-good-weekend": { mode: "tier", name: "Hot and Cold Tier List", how: "Sort each one by how often he does it after a good weekend.", tiers: HIM },
  "am-i-too-clingy": { mode: "tier", name: "Clingy Tier List", how: "Be honest. Sort each one by how often you do it.", tiers: SELF },
  "do-i-have-trust-issues": { mode: "tier", name: "Trust Issues Tier List", how: "Sort each one by how often you've done it.", tiers: SELF },
  "do-i-fall-in-love-too-fast": { mode: "tier", name: "Falling Fast Tier List", how: "Sort each one by how often you've done it.", tiers: SELF },
  "am-i-scared-of-love": { mode: "tier", name: "Fear of Love Tier List", how: "Sort each one by how often you've done it when it got real.", tiers: SELF },
  "am-i-delulu": { mode: "tier", name: "Delulu Tier List", how: "Sort each one. How delulu have you been?", tiers: ["🦄 Fully delulu", "🙈 Once or twice", "🧘‍♀️ Never"] },
  "am-i-a-pick-me": { mode: "tier", name: "Pick-Me Tier List", how: "Be honest. Sort each one by how often you've done it.", tiers: SELF },
};

export function tickGame(slug: string): TickGame | undefined {
  return TICK_GAMES[slug];
}

export type Tier = 0 | 1 | 2;

/** The little label on a test's tile: what kind of game it is. */
const TYPE_SLUGS = new Set(TYPE_QUIZZES.map((x) => x.slug));

export function tileBadge(slug: string, fun?: boolean) {
  if (TYPE_SLUGS.has(slug)) return "🔮 which are you";
  const mode = TICK_GAMES[slug]?.mode;
  if (mode === "bingo") return "🎱 bingo";
  if (mode === "receipt") return "🧾 receipt";
  if (mode === "tier") return "🏆 tier list";
  return fun ? "🎮 game" : "40 sec";
}
