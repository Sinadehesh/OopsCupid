import { TICK_TESTS } from "@/lib/quizzes/tickTests";
import { TYPE_QUIZZES } from "@/lib/quizzes/typeQuizzes";

/**
 * THE SHARE KIT: everything needed to post a quiz on Pinterest and TikTok,
 * generated from the quiz data itself so a new quiz gets its pin, its
 * slideshow and its captions with no extra work.
 *
 * Pinterest is the one free channel where a post links straight to the
 * page and keeps sending visits for months; TikTok slideshows are where
 * the audience is. The slides only ever show the quiz's own items or
 * types, so nothing is promised that the page doesn't deliver.
 */

export const SITE = "https://www.oopscupid.com";

export type Slide =
  | { kind: "hook"; emoji: string; title: string; sub: string }
  | { kind: "list"; heading: string; lines: string[] }
  | { kind: "type"; emoji: string; title: string; line: string }
  | { kind: "end"; title: string; sub: string };

export interface KitEntry {
  slug: string;
  url: string;
  title: string;
  emoji: string;
  bg: string;
  fg: string;
  /** "Free 30-second quiz" and the like, for the pin. */
  badge: string;
  /** Four teaser lines for the pin. */
  pinLines: string[];
  /** Tick boxes or a type list on the pin. */
  pinStyle: "tick" | "type";
  /** The curiosity line under the teaser, e.g. "+ 10 more inside". */
  pinMore: string;
  slides: Slide[];
  tiktok: string;
  pinTitle: string;
  pinDescription: string;
}

function spread<T>(xs: T[], n: number): T[] {
  if (xs.length <= n) return xs;
  return Array.from({ length: n }, (_, i) => xs[Math.floor((i * xs.length) / n)]);
}

/** At most `size` per slide, spread evenly so the last slide isn't a stub. */
function chunks<T>(xs: T[], size: number): T[][] {
  const pages = Math.ceil(xs.length / size);
  const out: T[][] = [];
  let at = 0;
  for (let p = 0; p < pages; p++) {
    const take = Math.ceil((xs.length - at) / (pages - p));
    out.push(xs.slice(at, at + take));
    at += take;
  }
  return out;
}

const TICK_TAGS = "#relationshiptok #datingadvice #redflags #quiz";
const TYPE_TAGS = "#relationshiptok #quiz #datingadvice #personalityquiz";

function tickEntry(t: (typeof TICK_TESTS)[number]): KitEntry {
  const seconds = t.items.length <= 12 ? 30 : 40;
  const url = `${SITE}/${t.slug}`;
  const pages = chunks(t.items.map((i) => i.text), 4);
  return {
    slug: t.slug,
    url,
    title: t.question,
    emoji: t.emoji,
    bg: t.bg,
    fg: t.fg,
    badge: `Free ${seconds}-second quiz`,
    pinLines: spread(t.items, 4).map((i) => i.text),
    pinStyle: "tick",
    pinMore: `+ ${t.items.length - 4} more inside. How many are true?`,
    slides: [
      { kind: "hook", emoji: t.emoji, title: t.question, sub: "Count the ones that are true 👇 be honest" },
      ...pages.map((lines, k) => ({ kind: "list" as const, heading: `${k + 1}/${pages.length}`, lines })),
      { kind: "end", title: "How many did you get?", sub: "Comment your number 👇 The full quiz is free:" },
    ],
    tiktok: `${t.question} ${t.emoji} Count how many are true and comment your number 👇 The free quiz is on oopscupid.com ${TICK_TAGS}`,
    pinTitle: `${t.question} Free ${seconds}-second quiz`.slice(0, 100),
    pinDescription: `${t.seo.description} Take it free at oopscupid.com.`.slice(0, 500),
  };
}

function typeEntry(x: (typeof TYPE_QUIZZES)[number]): KitEntry {
  const url = `${SITE}/${x.slug}`;
  const types = Object.values(x.types);
  return {
    slug: x.slug,
    url,
    title: x.title,
    emoji: x.emoji,
    bg: x.bg,
    fg: x.fg,
    badge: `Free quiz · ${x.questions.length} questions`,
    pinLines: spread(types, 4).map((t) => `${t.emoji} ${t.title}`),
    pinStyle: "type",
    pinMore: types.length > 4 ? `+ ${types.length - 4} more. Which one are you?` : "Which one are you?",
    slides: [
      { kind: "hook", emoji: x.emoji, title: x.title, sub: "Swipe and tell me which one you are →" },
      ...types.map((t) => ({ kind: "type" as const, emoji: t.emoji, title: t.title, line: t.line })),
      { kind: "end", title: "Which one are you?", sub: "Take the free quiz and find out for sure:" },
    ],
    tiktok: `${x.title} ${x.emoji} Which one are you? Tell me in the comments 👇 The free quiz is on oopscupid.com ${TYPE_TAGS}`,
    pinTitle: `${x.title} Free quiz`.slice(0, 100),
    pinDescription: `${x.seo.description} Take it free at oopscupid.com.`.slice(0, 500),
  };
}

/** Type quizzes first: they're the most shareable thing on the site. */
export const KIT: KitEntry[] = [...TYPE_QUIZZES.map(typeEntry), ...TICK_TESTS.map(tickEntry)];

export function kitEntry(slug: string) {
  return KIT.find((k) => k.slug === slug);
}
