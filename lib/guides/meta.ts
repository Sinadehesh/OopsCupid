/**
 * MINI GUIDES, €1.99 each: what the cards need (title, hook, price,
 * which tests they belong to). No guide text lives here, because this
 * file ships to the browser; the paid text stays in guides.ts, which only
 * the server reads.
 *
 * The thing a short test should sell is not a longer test: it is an
 * explanation of the exact thing she just recognised. Someone who ticked
 * "checked when he was last online" wants to know why she does it and
 * whether it means anything, today, for the price of a coffee.
 *
 * Each guide is a ten-minute read: a hook, what's actually happening
 * (the real psychology, named honestly), how to tell a pattern from
 * overthinking, what's normal and what's a red flag, and what to do. The
 * first section is free, so she knows what she's buying and search engines
 * can find it. The rest unlocks for €1.99, or with the €9.99 report, which
 * unlocks every guide and every read.
 *
 * Tone: a clever friend who has read the research. Fun, never flippant
 * about harm. British English, no dashes.
 */

export interface GuideMeta {
  slug: string;
  title: string;
  hook: string;
  emoji: string;
  bg: string;
  fg: string;
  minutes: number;
  /** Short tests this guide belongs under, and tick groups that trigger it. */
  forTests: string[];
  forGroups?: string[];
}

export const GUIDE_META: GuideMeta[] = [
  {
    slug: "last-seen-spiral",
    title: "The Last-Seen Spiral",
    hook: "Why you keep checking if he's online, and what it actually means (spoiler: less than it feels like).",
    emoji: "👀",
    bg: "#DDEFE8",
    fg: "#1F4A3E",
    minutes: 9,
    forTests: ["decode-his-text", "guess-the-attachment-style", "waiting-for-his-reply", "is-he-just-not-that-into-you", "things-he-does", "after-a-good-weekend"],
    forGroups: ["checking", "rehearsing", "body", "story"],
  },
  {
    slug: "pattern-or-overthinking",
    title: "Pattern or Overthinking?",
    hook: "How to tell when he's actually doing something, and when your brain is writing fan fiction.",
    emoji: "🧠",
    bg: "#E9E2F7",
    fg: "#3F2C6B",
    minutes: 10,
    forTests: ["decode-his-text", "things-he-does", "things-he-says", "is-he-just-not-that-into-you", "is-it-a-situationship", "waiting-for-his-reply"],
    forGroups: ["stories", "secrecy", "effort", "reality"],
  },
  {
    slug: "red-flag-field-guide",
    title: "The Red Flag Field Guide",
    hook: "Red, orange or just annoying? A spotter's guide to what actually matters in a new relationship.",
    emoji: "🚩",
    bg: "#FCE3D8",
    fg: "#7A2E14",
    minutes: 10,
    forTests: ["gaslighting-or-not", "red-flag-or-green-flag", "first-month-red-flags", "is-my-boyfriend-toxic", "does-he-have-narcissistic-traits", "things-he-says"],
    forGroups: ["intensity", "boundaries", "character", "control", "disrespect"],
  },
  {
    slug: "hot-and-cold",
    title: "Hot and Cold",
    hook: "Why the guy who confuses you is the one you can't stop thinking about, and how to break the spell.",
    emoji: "🎰",
    bg: "#FBE0E6",
    fg: "#7A1F35",
    minutes: 9,
    forTests: ["guess-the-attachment-style", "red-flag-or-green-flag", "after-a-good-weekend", "first-month-red-flags", "is-he-just-not-that-into-you", "is-it-a-situationship"],
    forGroups: ["hotcold", "withdraw", "return", "convenience", "pressure"],
  },
  {
    slug: "too-sensitive",
    title: "\"You're Too Sensitive\"",
    hook: "The sentences that end arguments without answering them, decoded one by one.",
    emoji: "🌀",
    bg: "#E3E6F8",
    fg: "#27306B",
    minutes: 9,
    forTests: ["gaslighting-or-not", "decode-his-text", "things-he-says", "is-my-boyfriend-toxic", "does-he-have-narcissistic-traits", "him-vs-your-ex"],
    forGroups: ["reality", "blame", "minimising", "character", "fragile", "mask"],
  },
  {
    slug: "frenemy-files",
    title: "The Frenemy Files",
    hook: "How to spot the friend who isn't happy for you, and what to do without starting a war.",
    emoji: "🐍",
    bg: "#FDEBD3",
    fg: "#6B3E0E",
    minutes: 9,
    forTests: ["friend-or-frenemy", "things-my-friend-says", "friend-vs-friend", "is-my-friend-a-pick-me", "are-you-the-therapist-friend"],
    forGroups: ["envy", "taking", "digs", "guilt", "gossip", "effort", "rival", "oneway"],
  },
  {
    slug: "why-you-run",
    title: "Why You Run When It's Good",
    hook: "The self-sabotage guide: why closeness makes you want to bolt, and how to stay ten minutes longer.",
    emoji: "🏃‍♀️",
    bg: "#D8F0EE",
    fg: "#134A45",
    minutes: 9,
    forTests: ["guess-the-attachment-style", "when-it-gets-serious", "am-i-the-toxic-one"],
    forGroups: ["exit", "distance", "test", "numb", "worth", "punish", "fight"],
  },
  {
    slug: "what-are-we",
    title: "The \"What Are We?\" Guide",
    hook: "How to ask the scariest question in modern dating without scaring yourself, or him.",
    emoji: "🌫️",
    bg: "#E2EEF3",
    fg: "#1F4552",
    minutes: 8,
    forTests: ["decode-his-text", "is-it-a-situationship", "is-he-just-not-that-into-you"],
    forGroups: ["label", "shape", "world", "you", "said", "hidden"],
  },
  {
    slug: "therapist-friend",
    title: "The Therapist Friend's Survival Guide",
    hook: "For the one everyone calls at 2am. How to stop being everyone's therapist and nobody's friend.",
    emoji: "🛋️",
    bg: "#E4F2E0",
    fg: "#2C4F22",
    minutes: 8,
    forTests: ["friend-or-frenemy", "are-you-the-therapist-friend", "things-my-friend-says", "friend-vs-friend"],
    forGroups: ["role", "oneway", "cost", "taking", "effort"],
  },
  {
    slug: "clueless-or-careless",
    title: "Clueless or Careless?",
    hook: "Is he genuinely oblivious, or just not paying attention to you? How to tell, and what to say.",
    emoji: "🤷‍♂️",
    bg: "#FFF1C9",
    fg: "#6A4B00",
    minutes: 7,
    forTests: ["is-my-boyfriend-stupid", "is-he-a-mamas-boy", "after-a-good-weekend", "him-vs-your-ex"],
    forGroups: ["house", "hints", "feelings", "memory", "sides", "shutdown"],
  },
];

export function guideMetaBySlug(slug: string) {
  return GUIDE_META.find((g) => g.slug === slug);
}

/** The guides to offer on a short test's result, best match first. */
export function guidesFor(testSlug: string, groups: string[] = [], max = 3): GuideMeta[] {
  const scored = GUIDE_META.map((g) => {
    let s = 0;
    if (g.forTests.includes(testSlug)) s += 2;
    s += (g.forGroups ?? []).filter((x) => groups.includes(x)).length;
    return { g, s };
  })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  return scored.slice(0, max).map((x) => x.g);
}

export const GUIDE_PRICE = "€1.99";
