import { FLAG_CARDS, type FlagCard } from "@/lib/quizzes/flagGame";
import { KNOW_QUIZZES, type KnowQuiz } from "@/lib/knowme/knowme";
import { TICK_GAMES } from "@/lib/quizzes/tickGames";
import { tickTestBySlug } from "@/lib/quizzes/tickTests";
import { SITE, kitEntry, type Deck, type Slide } from "./kit";

/**
 * PLAY-ALONG POSTS: slideshows she does something with, not just reads.
 *
 * In a search of TikTok and Instagram in November 2026, the relationship
 * posts that reached hundreds of thousands of people from small accounts
 * were tests she runs on him or with her friends: "how well do you know
 * your bf?", boyfriend tests, red or green flag calls. Their comments fill
 * up with scores, and people send them on. These are that shape, built from
 * the site's own games so the post and the page always match:
 *  - red flag or green flag: call it, swipe for the verdict and the reason;
 *  - ask him / send to your bestie: the friend quiz's questions, out loud;
 *  - bingo: one card to screenshot and mark.
 *
 * Each ends on a short address (oopscupid.com/bf) that is easy to type,
 * since a new TikTok account can't have a link in its bio.
 */

const RGF_BG = "#FFD1E8";

/** Each part opens on a card people argue about, and mixes red, green and beige. */
const RGF_PARTS = [
  ["g2", "g4", "g1", "g3", "g5"],
  ["g9", "g7", "g6", "g10", "g8"],
  ["g15", "g14", "g13", "g12", "g11", "g16"],
];

/** The verdict slide says "Beige flag" itself, so the reason drops it. */
function reason(c: FlagCard) {
  const why = c.beige ? c.why.replace(/^Beige( flag)?[:.,]\s*/, "") : c.why;
  return why.charAt(0).toUpperCase() + why.slice(1);
}

function flagDeck(ids: string[], part: number): Deck {
  const cards = ids.map((id) => FLAG_CARDS.find((c) => c.id === id)!);
  return {
    slug: `red-or-green-${part}`,
    url: `${SITE}/red-flag-or-green-flag`,
    title: `Red flag or green flag? Part ${part}`,
    emoji: "🚩",
    bg: RGF_BG,
    slides: [
      { kind: "hook", emoji: "🚩", title: `Red flag or green flag? Part ${part}`, sub: "Call each one before you swipe. Keep score 👇" },
      ...cards.flatMap((c, i): Slide[] => [
        { kind: "flag", n: `${i + 1}/${cards.length}`, text: c.text },
        { kind: "verdict", flag: c.flag, beige: c.beige, why: reason(c) },
      ]),
      { kind: "end", title: `How many did you get right?`, sub: `Comment your score 👇 All ${FLAG_CARDS.length} are in the free game:`, cta: "oopscupid.com/flags" },
    ],
    tiktok: `Red flag or green flag? 🚩💚 Part ${part}. Call each one before you swipe and comment your score 👇 All ${FLAG_CARDS.length} are on oopscupid.com/flags #redflags #greenflags #beigeflag #datingadvice`,
  };
}

/** The question as she'd ask it: "My comfort food?", "When we argue, I…". */
const asked = (me: string) => (/[…?]$/.test(me) ? me : `${me}?`);

function askDeck(q: KnowQuiz, d: { slug: string; bg: string; title: string; sub: string; endTitle: string; endSub: string; cta: string; tiktok: string }): Deck {
  return {
    slug: d.slug,
    url: `${SITE}${q.page}`,
    title: d.title,
    emoji: q.emoji,
    bg: d.bg,
    slides: [
      { kind: "hook", emoji: q.emoji, title: d.title, sub: d.sub },
      ...q.questions.map((x, i): Slide => ({ kind: "ask", n: `${i + 1}/${q.questions.length}`, q: asked(x.me), options: x.options })),
      { kind: "end", title: d.endTitle, sub: d.endSub, cta: d.cta },
    ],
    tiktok: d.tiktok,
  };
}

const ASK_HIM = askDeck(KNOW_QUIZZES.boyfriend, {
  slug: "ask-him",
  bg: "#FFC9A8",
  title: "Ask your boyfriend these about you",
  sub: "10 questions, no hints. Keep score 👇",
  endTitle: "What did he get out of 10? 👀",
  endSub: "Comment his score 👇 Or send him the real quiz. It scores him for you:",
  cta: "oopscupid.com/bf",
  tiktok: "Ask your boyfriend these about you 🫣 Comment his score out of 10 👇 Or send him the real quiz, it scores him for you: oopscupid.com/bf #howwelldoyouknowme #boyfriendtest #couplestiktok #relationshipquiz",
});

const ASK_BESTIE = askDeck(KNOW_QUIZZES.bestie, {
  slug: "ask-bestie",
  bg: "#BDE3FF",
  title: "Send this to your bestie",
  sub: "How many can she get right about you? Keep score 👇",
  endTitle: "What did she get out of 10? 👀",
  endSub: "Comment her score 👇 Or make your own quiz for the group chat:",
  cta: "oopscupid.com/bestie",
  tiktok: "Send this to your bestie 👯 How many does she get right about you? Comment her score 👇 Make your own quiz: oopscupid.com/bestie #howwelldoyouknowme #bestie #bestfriendquiz #friendshiptok",
});

function bingoDeck(slug: string): Deck | null {
  const t = tickTestBySlug(slug);
  const game = TICK_GAMES[slug];
  if (!t || game?.mode !== "bingo") return null;
  // "Stamp everything he's done. Full line = BINGO." keeps only what follows the stamping.
  const rules = game.how.split(/(?<=\.)\s+/).slice(1).join(" ");
  const friends = /friend/.test(slug);
  const tags = friends ? "#bingo #friendshiptok #besties #quiz" : "#bingo #relationshiptok #datingadvice #quiz";
  return {
    slug: `bingo-${slug}`,
    url: `${SITE}/${slug}`,
    title: game.name,
    emoji: t.emoji,
    bg: t.bg,
    slides: [
      { kind: "hook", emoji: t.emoji, title: game.name, sub: `Screenshot the next slide and mark yours. ${rules}`.trim() },
      { kind: "bingo", name: game.name, items: t.items.map((i) => i.text) },
      { kind: "end", title: "Got a BINGO? 👀", sub: "Comment how many you marked 👇 Play it free, with real stamps:" },
    ],
    tiktok: `${game.name} ${t.emoji} Screenshot the card and mark yours. How many did you get? 👇 Play it free on oopscupid.com ${tags}`,
  };
}

const [RGF1, RGF2, RGF3] = RGF_PARTS.map((ids, i) => flagDeck(ids, i + 1));
const bingo = (slug: string) => bingoDeck(slug);

/** In posting order, mixed so two days in a row never look the same. */
export const PLAYS: Deck[] = [
  RGF1,
  ASK_HIM,
  bingo("is-he-a-pick-me-boy"),
  RGF2,
  bingo("is-it-a-situationship"),
  ASK_BESTIE,
  RGF3,
  bingo("is-he-a-player"),
  bingo("first-month-red-flags"),
  bingo("is-my-boyfriend-toxic"),
  bingo("is-my-fwb-catching-feelings"),
  bingo("is-my-friend-a-pick-me"),
  bingo("anxious-avoidant-trap"),
  bingo("things-my-friend-says"),
  bingo("is-my-friend-jealous-of-me"),
  bingo("is-my-friend-manipulative"),
  bingo("are-you-the-therapist-friend"),
].filter((d): d is Deck => d !== null);

/** Any slideshow by its slug: a play-along post or a quiz's own. */
export function deckFor(slug: string): Deck | undefined {
  return PLAYS.find((d) => d.slug === slug) ?? kitEntry(slug);
}
