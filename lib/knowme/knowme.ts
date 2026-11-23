/**
 * "HOW WELL DO YOU KNOW ME?": she answers ten questions about herself, gets
 * a link, and sends it to her friends (or her boyfriend), who guess her
 * answers and get a score. Every quiz made brings several people to the
 * site, and every one of them is offered their own quiz to send on, which
 * is the loop the biggest quiz sites grew on.
 *
 * Like the surveys, nothing is stored: her answers travel inside the link,
 * packed so a quick look at the address doesn't give them away.
 */

export type KnowMode = "bestie" | "boyfriend";

export interface KnowQuestion {
  id: string;
  /** What she sees while making it: "My go-to drink on a night out". */
  me: string;
  /** What the guesser sees, with {n} for her name. */
  them: string;
  options: { emoji: string; label: string }[];
}

export interface KnowQuiz {
  mode: KnowMode;
  page: string;
  title: string;
  emoji: string;
  /** Who she sends it to, for copy: "your friends", "your boyfriend". */
  sendTo: string;
  questions: KnowQuestion[];
  /** Score bands, highest first: [minimum score, verdict, line]. */
  verdicts: [number, string, string][];
  seo: { title: string; description: string; about: string; aboutText: string };
}

const o = (emoji: string, label: string) => ({ emoji, label });

export const KNOW_QUIZZES: Record<KnowMode, KnowQuiz> = {
  bestie: {
    mode: "bestie",
    page: "/how-well-do-you-know-me",
    title: "How well do you know me?",
    emoji: "👯",
    sendTo: "your friends",
    questions: [
      { id: "k1", me: "My go-to drink on a night out", them: "{n}'s go-to drink on a night out", options: [o("🍸", "A cocktail"), o("🍷", "Wine"), o("🍺", "Beer or cider"), o("🧃", "Something soft")] },
      { id: "k2", me: "My toxic trait", them: "{n}'s toxic trait", options: [o("📱", "Replying three days later"), o("🛍️", "\"Treating myself\" daily"), o("🕵️", "Stalking my ex's new partner"), o("🛋️", "Cancelling plans to stay in")] },
      { id: "k3", me: "If my ex texted \"hey\", I'd…", them: "{n}'s ex texts \"hey\". What happens?", options: [o("👀", "Leave it on read"), o("📸", "Screenshot it to the group chat"), o("💬", "Reply in two minutes"), o("🗑️", "Block and delete")] },
      { id: "k4", me: "My comfort show", them: "{n}'s comfort show", options: [o("🏝️", "Reality dating shows"), o("🛋️", "A sitcom I've seen ten times"), o("🔪", "True crime"), o("🐉", "Fantasy or anime")] },
      { id: "k5", me: "When I'm hungry, I'm…", them: "When {n} is hungry…", options: [o("😡", "Personally offended by everyone"), o("😶", "Silent and dangerous"), o("🍫", "Fine, I always have snacks"), o("🥲", "Dramatic, like I'm dying")] },
      { id: "k6", me: "My dream date", them: "{n}'s dream date", options: [o("🍝", "Dinner somewhere fancy"), o("🎳", "Something fun and silly"), o("🍕", "Takeaway and a film"), o("✈️", "A spontaneous trip")] },
      { id: "k7", me: "My biggest ick", them: "{n}'s biggest ick", options: [o("🙄", "Being dry over text"), o("😤", "Rude to waiters"), o("🧢", "Lying about small things"), o("🧼", "Bad hygiene")] },
      { id: "k8", me: "In the group chat, I'm the…", them: "In the group chat, {n} is the…", options: [o("🎙️", "Voice note queen"), o("🫥", "Lurker who sees everything"), o("😂", "Meme supplier"), o("📜", "Paragraph writer")] },
      { id: "k9", me: "My most used emoji", them: "{n}'s most used emoji", options: [o("😭", "Crying face"), o("💀", "Skull"), o("🥹", "Holding back tears"), o("🙃", "Upside-down face")] },
      { id: "k10", me: "Right now I'd rather be…", them: "Right now, {n} would rather be…", options: [o("🛏️", "In bed"), o("🏖️", "On a beach"), o("🎉", "At a party"), o("🛒", "Shopping")] },
    ],
    verdicts: [
      [10, "Soulmate status 👯", "Ten out of ten. You basically share a brain."],
      [8, "Certified bestie 💖", "You know {n} better than {n}'s own mum does."],
      [6, "Solid friend energy 🙂", "You know the important stuff. Maybe pay attention in the group chat."],
      [4, "Acquaintance vibes 😬", "You know {n}'s name. That's a start."],
      [0, "Who even are you? 🕵️", "Was this your first time meeting?"],
    ],
    seo: {
      title: "How Well Do You Know Me? Make a Bestie Quiz for Your Friends (Free)",
      description: "Make your own \"how well do you know me\" quiz in a minute: answer ten fun questions about yourself, send the link to your friends, and see who really knows you. Free, no sign-up.",
      about: "How does the \"how well do you know me\" quiz work?",
      aboutText:
        "You answer ten quick questions about yourself, from your toxic trait to what you'd do if your ex texted. You get a link to send to your friends or post in the group chat. They guess your answers, find out instantly whether they were right, and get a score out of ten, which they can send back to you. Then they can make their own and send it to you.",
    },
  },
  boyfriend: {
    mode: "boyfriend",
    page: "/how-well-does-your-boyfriend-know-you",
    title: "How well does he know you?",
    emoji: "💘",
    sendTo: "your boyfriend",
    questions: [
      { id: "b1", me: "My perfect Friday night", them: "{n}'s perfect Friday night", options: [o("🍕", "Takeaway on the sofa"), o("🍸", "Out with the girls"), o("💃", "Dancing till late"), o("🛁", "A bath and an early night")] },
      { id: "b2", me: "My love language", them: "{n}'s love language", options: [o("💬", "Sweet words"), o("⏳", "Quality time"), o("🫂", "Cuddles"), o("🎁", "Little gifts")] },
      { id: "b3", me: "What annoys me most about you", them: "What annoys {n} most about you", options: [o("⏰", "You're always late"), o("📱", "You're always on your phone"), o("🎮", "Gaming for hours"), o("🧦", "Socks everywhere")] },
      { id: "b4", me: "My comfort food", them: "{n}'s comfort food", options: [o("🍕", "Pizza"), o("🍜", "Noodles"), o("🍫", "Chocolate"), o("🍟", "Chips")] },
      { id: "b5", me: "What I'm secretly scared of", them: "What {n} is secretly scared of", options: [o("🕷️", "Spiders"), o("🌊", "Deep water"), o("🎤", "Public speaking"), o("👻", "The dark")] },
      { id: "b6", me: "My dream holiday", them: "{n}'s dream holiday", options: [o("🏝️", "Beach and cocktails"), o("🏙️", "A city break"), o("🏔️", "A cabin in the mountains"), o("🎢", "Theme parks")] },
      { id: "b7", me: "When we argue, I…", them: "When you argue, {n}…", options: [o("🔇", "Go quiet"), o("📜", "Send a paragraph"), o("😤", "Win, obviously"), o("🍫", "Need a snack first")] },
      { id: "b8", me: "What I'd grab first in a fire", them: "What {n} would grab first in a fire", options: [o("📱", "My phone"), o("🐶", "The pet"), o("💄", "My make-up bag"), o("🧸", "Something sentimental")] },
      { id: "b9", me: "My ideal Sunday", them: "{n}'s ideal Sunday", options: [o("🥞", "Brunch"), o("🛏️", "Staying in bed"), o("🚶‍♀️", "A long walk"), o("🛍️", "Shopping")] },
      { id: "b10", me: "What I'd be famous for", them: "What {n} would be famous for", options: [o("🎤", "Singing"), o("🧁", "Baking"), o("📸", "Being an influencer"), o("😂", "Being hilarious")] },
    ],
    verdicts: [
      [10, "Marry him 💍", "Ten out of ten. He's been listening the whole time."],
      [8, "A keeper 💖", "He pays attention. Rare. Keep him."],
      [6, "He's trying 🙂", "Not bad. A few more dates and he'll ace it."],
      [4, "Is he listening? 😬", "He knows your name and your coffee order. Probably."],
      [0, "Who is this man? 🕵️", "Time for a long chat. Or a short one."],
    ],
    seo: {
      title: "How Well Does Your Boyfriend Know You? Make the Quiz (Free)",
      description: "Make a \"how well does your boyfriend know you\" quiz in a minute: answer ten questions about yourself, send him the link and see his score out of ten. Free, no sign-up, works for girlfriends and partners too.",
      about: "How does the \"how well does your boyfriend know you\" quiz work?",
      aboutText:
        "You answer ten questions about yourself, like your love language, your comfort food and what you'd grab first in a fire. Send him the link. He guesses your answers, sees straight away whether he got each one right, and gets a score out of ten that he can send back to you. It works just as well for a girlfriend, a partner or a situationship you're testing.",
    },
  },
};

export function knowQuizFor(mode: string | null): KnowQuiz {
  return mode === "boyfriend" ? KNOW_QUIZZES.boyfriend : KNOW_QUIZZES.bestie;
}

/**
 * Her ten answers (0 to 3 each) as one short code. They're read as a base-4
 * number, scrambled with a multiplier, and written in base 36, so the link
 * shows something like "2kq9f" instead of "0213301223". Codes that don't
 * unscramble cleanly are rejected, which also catches broken links.
 */
const MUL = 7919;
const ADD = 104729;

export function encodeKnow(picks: number[]): string {
  const value = picks.reduce((acc, p, i) => acc + p * 4 ** i, 0);
  return (value * MUL + ADD).toString(36);
}

export function decodeKnow(code: string | null, quiz: KnowQuiz): number[] | null {
  if (!code || !/^[0-9a-z]{1,12}$/.test(code)) return null;
  const raw = parseInt(code, 36) - ADD;
  if (!Number.isSafeInteger(raw) || raw < 0 || raw % MUL !== 0) return null;
  let value = raw / MUL;
  const n = quiz.questions.length;
  if (value >= 4 ** n) return null;
  const picks: number[] = [];
  for (let i = 0; i < n; i++) {
    picks.push(value % 4);
    value = Math.floor(value / 4);
  }
  return picks;
}

export function verdictFor(quiz: KnowQuiz, score: number): { title: string; line: string } {
  const [, title, line] = quiz.verdicts.find(([min]) => score >= min) ?? quiz.verdicts[quiz.verdicts.length - 1];
  return { title, line };
}

/** The guesser's view of a question, with her name in it. */
export function themPrompt(q: KnowQuestion, name: string): string {
  return q.them.replace("{n}", name);
}
