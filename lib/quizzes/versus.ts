/**
 * VERSUS GAMES: "who would say this?"
 *
 * She names two people. Each card is a situation and something someone
 * might say or do in it, and she taps who would: one, the other, both or
 * neither. Guessing is the fun part, and it quietly does the measuring:
 * every card belongs to a trait (shows up, celebrates you, keeps your
 * secrets...) and is either a green or a red flag, so by the end each
 * person has a profile built from her own predictions.
 *
 * Names never leave the phone. The optional written read is generated
 * about "Person A" and "Person B" and the names are put back in the
 * browser.
 */

export type Pick = "a" | "b" | "both" | "neither";

export interface VersusCard {
  id: string;
  situation: string;
  line: string;
  trait: string;
  good: boolean;
}

export interface VersusTier {
  min: number;
  emoji: string;
  label: string;
  line: string;
}

export interface VersusGame {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  bg: string;
  fg: string;
  intro: string;
  /** What the two people are, for the name boxes. */
  roleA: string;
  roleB: string;
  placeholderA: string;
  placeholderB: string;
  traits: Record<string, string>;
  cards: VersusCard[];
  /** Highest min first. Score is 0 to 100. */
  tiers: VersusTier[];
  full: { href: string; label: string };
  seo: { title: string; description: string };
}

export const VERSUS_GAMES: VersusGame[] = [
  {
    slug: "friend-vs-friend",
    title: "Friend vs Friend",
    short: "Friend vs Friend",
    emoji: "🥊",
    bg: "#FFE3D6",
    fg: "#7A2E14",
    intro: "Name two friends. For each moment, guess who would say it. At the end you'll see which one is really in your corner.",
    roleA: "First friend",
    roleB: "Second friend",
    placeholderA: "e.g. Sophie",
    placeholderB: "e.g. Jess",
    traits: {
      celebrates: "Happy for you",
      shows: "Shows up",
      trust: "Keeps your trust",
      effort: "Makes the effort",
      honest: "Honest with you",
    },
    cards: [
      { id: "c1", situation: "You get your dream job", line: "\"Omg!! Drinks on me tonight, I'm so proud of you\"", trait: "celebrates", good: true },
      { id: "c2", situation: "You get your dream job", line: "\"Must be nice. Some of us actually have to work for it\"", trait: "celebrates", good: false },
      { id: "c3", situation: "You're crying at 1am after a breakup", line: "\"I'm getting in a taxi. Put the kettle on\"", trait: "shows", good: true },
      { id: "c4", situation: "You're crying at 1am after a breakup", line: "Leaves you on read until lunchtime", trait: "shows", good: false },
      { id: "c5", situation: "You tell them a secret", line: "Takes it to the grave", trait: "trust", good: true },
      { id: "c6", situation: "You tell them a secret", line: "Half the group chat knows by Friday", trait: "trust", good: false },
      { id: "c7", situation: "You cancel because you're exhausted", line: "\"Rest! Love you, we'll go next week\"", trait: "effort", good: true },
      { id: "c8", situation: "You cancel because you're exhausted", line: "\"Wow. Again? Fine.\"", trait: "effort", good: false },
      { id: "c9", situation: "You start seeing someone new", line: "\"Bring him to dinner, I want to vet him\"", trait: "celebrates", good: true },
      { id: "c10", situation: "You start seeing someone new", line: "Gets a bit too friendly with him", trait: "trust", good: false },
      { id: "c11", situation: "You're in the wrong in an argument", line: "Tells you, kindly, in private", trait: "honest", good: true },
      { id: "c12", situation: "You're in the wrong in an argument", line: "Agrees with you, then takes their side in the group chat", trait: "honest", good: false },
      { id: "c13", situation: "You haven't spoken in two weeks", line: "\"Haven't heard from you, you ok?\"", trait: "effort", good: true },
      { id: "c14", situation: "You haven't spoken in two weeks", line: "Only gets in touch when they need something", trait: "effort", good: false },
      { id: "c15", situation: "You need a lift to the airport at 5am", line: "Says yes before you've finished asking", trait: "shows", good: true },
      { id: "c16", situation: "You post a selfie you love", line: "Screenshots it to someone else to laugh at", trait: "celebrates", good: false },
    ],
    tiers: [
      { min: 80, emoji: "💎", label: "The Real One", line: "Keep this one forever." },
      { min: 60, emoji: "🌤️", label: "Good Friend", line: "Solid, with the odd off day." },
      { min: 40, emoji: "⚖️", label: "Mixed Bag", line: "Great sometimes, draining others." },
      { min: 20, emoji: "🎭", label: "Frenemy", line: "Friendly on the surface, competing underneath." },
      { min: 0, emoji: "🐍", label: "Snake Energy", line: "You keep making excuses for this one." },
    ],
    full: { href: "/toxic-friend-test", label: "Test the worrying one properly, free" },
    seo: { title: "Friend vs Friend: Which Of Your Friends Is Toxic? Quiz", description: "Name two friends and guess who'd say what. Find out which one is really in your corner and which one is a frenemy. Free, names stay on your phone." },
  },
  {
    slug: "him-vs-your-ex",
    title: "Him vs Your Ex",
    short: "Him vs Your Ex",
    emoji: "💘",
    bg: "#FBDDE8",
    fg: "#6E1A3E",
    intro: "Your current guy against your ex. For each moment, guess who would do it. Brutal, and weirdly useful.",
    roleA: "Him (now)",
    roleB: "Your ex",
    placeholderA: "e.g. Tom",
    placeholderB: "e.g. The Ex",
    traits: {
      care: "Cares when you're down",
      respect: "Respects you",
      effort: "Makes the effort",
      honest: "Honest with you",
      proud: "Proud of you",
    },
    cards: [
      { id: "x1", situation: "You're ill in bed", line: "Turns up with soup and your favourite snacks", trait: "care", good: true },
      { id: "x2", situation: "You're ill in bed", line: "\"You'll be fine\" and goes out anyway", trait: "care", good: false },
      { id: "x3", situation: "You get a promotion", line: "Tells everyone how proud he is", trait: "proud", good: true },
      { id: "x4", situation: "You get a promotion", line: "Goes quiet, then picks a fight that night", trait: "proud", good: false },
      { id: "x5", situation: "You're upset about something", line: "Asks what's wrong and actually listens", trait: "care", good: true },
      { id: "x6", situation: "You're upset about something", line: "\"You're overreacting\"", trait: "respect", good: false },
      { id: "x7", situation: "Meeting your friends", line: "Makes an effort with every single one", trait: "effort", good: true },
      { id: "x8", situation: "Meeting your friends", line: "Sulks in the corner on his phone", trait: "effort", good: false },
      { id: "x9", situation: "In an argument", line: "\"I'm sorry, I got that wrong\"", trait: "honest", good: true },
      { id: "x10", situation: "In an argument", line: "\"That never happened\"", trait: "honest", good: false },
      { id: "x11", situation: "Your birthday", line: "Plans something that proves he listens", trait: "effort", good: true },
      { id: "x12", situation: "Your birthday", line: "Forgets, then says you're too dramatic", trait: "respect", good: false },
      { id: "x13", situation: "You say no to something", line: "\"Okay, no problem\"", trait: "respect", good: true },
      { id: "x14", situation: "You go out with friends", line: "Texts \"who are you with?\" every hour", trait: "respect", good: false },
      { id: "x15", situation: "You mention something you're insecure about", line: "Makes you feel better about it", trait: "proud", good: true },
      { id: "x16", situation: "Someone asks if you're together", line: "\"We're just seeing where it goes\"", trait: "honest", good: false },
    ],
    tiers: [
      { min: 80, emoji: "💎", label: "Keeper", line: "This one treats you right." },
      { min: 60, emoji: "🌤️", label: "Good Guy", line: "Decent, with room to grow." },
      { min: 40, emoji: "⚖️", label: "Mixed Signals", line: "Lovely sometimes, hard work others." },
      { min: 20, emoji: "🚩", label: "Red Flag", line: "More bad moments than good ones." },
      { min: 0, emoji: "☠️", label: "Toxic", line: "The way he treats you isn't okay." },
    ],
    full: { href: "/is-he-manipulative", label: "Worried about him? Take the full test, free" },
    seo: { title: "Him vs Your Ex: Who Treats You Better? Quiz", description: "Your current partner against your ex. Guess who'd do what and find out who actually treats you better. Free, names stay on your phone." },
  },
];

export function versusBySlug(slug: string) {
  return VERSUS_GAMES.find((g) => g.slug === slug);
}

export interface PersonScore {
  score: number;
  tier: VersusTier;
  good: number;
  bad: number;
  traits: { key: string; label: string; score: number }[];
}

/**
 * Score one person from the picks. Each trait starts at a neutral 50. Every
 * green card of that trait they were picked for adds its share of +50,
 * every red card its share of -50, so all the green and none of the red is
 * 100 and the reverse is 0. The overall score is the mean across traits.
 */
function scorePerson(game: VersusGame, picks: Record<string, Pick>, who: "a" | "b"): PersonScore {
  let good = 0;
  let bad = 0;
  const traits = Object.entries(game.traits).map(([key, label]) => {
    const cards = game.cards.filter((c) => c.trait === key);
    const greens = cards.filter((c) => c.good);
    const reds = cards.filter((c) => !c.good);
    const got = (c: VersusCard) => picks[c.id] === who || picks[c.id] === "both";
    const plus = greens.filter(got).length;
    const minus = reds.filter(got).length;
    good += plus;
    bad += minus;
    const raw = 50 + (greens.length ? (plus / greens.length) * 50 : 0) - (reds.length ? (minus / reds.length) * 50 : 0);
    return { key, label, score: Math.max(0, Math.min(100, Math.round(raw))) };
  });
  const score = Math.round(traits.reduce((s, t) => s + t.score, 0) / traits.length);
  const tier = game.tiers.find((t) => score >= t.min)!;
  return { score, tier, good, bad, traits };
}

export interface VersusResult {
  a: PersonScore;
  b: PersonScore;
  /** "a", "b" or "tie". */
  winner: "a" | "b" | "tie";
}

export function scoreVersus(game: VersusGame, picks: Record<string, Pick>): VersusResult {
  const a = scorePerson(game, picks, "a");
  const b = scorePerson(game, picks, "b");
  const winner = Math.abs(a.score - b.score) < 5 ? "tie" : a.score > b.score ? "a" : "b";
  return { a, b, winner };
}
