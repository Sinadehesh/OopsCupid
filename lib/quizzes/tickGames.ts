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

  "things-he-does": { mode: "receipt", name: "The Receipts", how: "Scan everything he's started doing. We'll print you the receipt.", store: "HIS NEW HABITS LTD", paidWith: "YOUR PEACE OF MIND" },
  "is-my-boyfriend-stupid": { mode: "receipt", name: "His Receipt", how: "Scan every clueless thing he's done. We'll total it up.", store: "CLUELESS & CO.", paidWith: "YOUR PATIENCE" },
  "is-he-a-mamas-boy": { mode: "receipt", name: "The Mummy Receipt", how: "Scan everything that sounds like him. We'll print the bill.", store: "MUM'S THE WORD MART", paidWith: "EVERY SUNDAY LUNCH" },
  "is-he-just-not-that-into-you": { mode: "receipt", name: "The Mixed Signals Receipt", how: "Scan everything he does. See what you're really paying.", store: "MIXED SIGNALS STORE", paidWith: "YOUR ENERGY" },
  "does-he-have-narcissistic-traits": { mode: "receipt", name: "The Ego Receipt", how: "Scan every one you've seen. We'll print his tab.", store: "ALL ABOUT ME PLC", paidWith: "YOUR SELF-ESTEEM" },

  "waiting-for-his-reply": { mode: "tier", name: "Overthinking Tier List", how: "Sort each one: how often do you do it? Build your tier list.", tiers: SELF },
  "when-it-gets-serious": { mode: "tier", name: "Self-Sabotage Tier List", how: "Sort each one by how often you do it when things get real.", tiers: SELF },
  "am-i-the-toxic-one": { mode: "tier", name: "Toxic Habits Tier List", how: "Be honest. Sort each one by how often you've done it.", tiers: SELF },
  "after-a-good-weekend": { mode: "tier", name: "Hot and Cold Tier List", how: "Sort each one by how often he does it after a good weekend.", tiers: HIM },
};

export function tickGame(slug: string): TickGame | undefined {
  return TICK_GAMES[slug];
}

export type Tier = 0 | 1 | 2;

/** The little label on a test's tile: what kind of game it is. */
export function tileBadge(slug: string, fun?: boolean) {
  const mode = TICK_GAMES[slug]?.mode;
  if (mode === "bingo") return "🎱 bingo";
  if (mode === "receipt") return "🧾 receipt";
  if (mode === "tier") return "🏆 tier list";
  return fun ? "🎮 game" : "40 sec";
}
