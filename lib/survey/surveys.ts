/**
 * POST-DATE AND AFTER-HANGOUT SURVEYS: the "rate our date" trend, ready
 * made. She sends a link, they tap eight answers and send a link back.
 *
 * Every survey that gets sent brings a new person to the site, which makes
 * it the one thing here that advertises itself. Nothing is stored: the
 * names and answers travel inside the links, so there's no database and
 * nothing to leak.
 */

export type SurveyMode = "date" | "hangout";

export interface SurveyQuestion {
  id: string;
  prompt: string;
  options: { emoji: string; label: string }[];
}

export interface Survey {
  mode: SurveyMode;
  /** The landing page that makes the link. */
  page: string;
  title: string;
  emoji: string;
  /** "{from} wants your honest review of the date". */
  ask: (from: string) => string;
  questions: SurveyQuestion[];
  /** The question whose answer leads the results card. */
  headline: string;
  seo: { title: string; description: string; about: string };
}

const o = (emoji: string, label: string) => ({ emoji, label });

const TALK = [o("🙊", "The perfect amount"), o("🗣️", "A little bit"), o("🎤", "It was basically a podcast"), o("🤐", "You were too quiet")];

export const SURVEYS: Record<SurveyMode, Survey> = {
  date: {
    mode: "date",
    page: "/after-date-survey",
    title: "Post-date survey",
    emoji: "💌",
    ask: (from) => `${from} wants your honest review of the date`,
    headline: "q7",
    questions: [
      { id: "q1", prompt: "Overall, how was the date?", options: [o("🔥", "Amazing"), o("😊", "Really nice"), o("🙂", "Fine"), o("😬", "Awkward")] },
      { id: "q2", prompt: "Rate my outfit", options: [o("💅", "10/10"), o("😍", "8/10"), o("🙂", "6/10"), o("🫣", "Let's not talk about it")] },
      { id: "q3", prompt: "Best part?", options: [o("🍝", "The food"), o("💬", "The chat"), o("😂", "The laughing"), o("💋", "The ending")] },
      { id: "q4", prompt: "Did I talk too much?", options: TALK },
      { id: "q5", prompt: "Any red flags?", options: [o("🟢", "Only green flags"), o("🟡", "One tiny one"), o("🚩", "A few"), o("🚨", "I've already told my friends")] },
      { id: "q6", prompt: "Butterflies?", options: [o("🦋", "So many"), o("🐛", "A few"), o("🌀", "It's complicated"), o("😐", "None, sorry")] },
      { id: "q7", prompt: "Second date?", options: [o("💯", "Absolutely"), o("🤔", "Maybe"), o("🫶", "As friends"), o("✈️", "I'm moving countries")] },
      { id: "q8", prompt: "Where next?", options: [o("🍸", "Drinks"), o("🎳", "Something fun"), o("🏠", "A cosy night in"), o("📵", "Lose my number")] },
    ],
    seo: {
      title: "Post-Date Survey: Send Your Date a Cute After-Date Survey (Free)",
      description: "The post-date survey, ready to send. Type your name, send the link to your date, and get their honest answers back: outfit rating, red flags, butterflies and whether there's a second date. Free, no sign-up.",
      about: "What is a post-date survey?",
    },
  },
  hangout: {
    mode: "hangout",
    page: "/after-hangout-survey",
    title: "After-hangout survey",
    emoji: "👯",
    ask: (from) => `${from} wants to know how the hangout was`,
    headline: "q7",
    questions: [
      { id: "q1", prompt: "How was hanging out?", options: [o("🔥", "Elite"), o("😊", "So fun"), o("🙂", "Nice"), o("😴", "I'd rather have napped")] },
      { id: "q2", prompt: "Rate the vibe", options: [o("✨", "Immaculate"), o("😎", "Good"), o("🙃", "Chaotic"), o("🫠", "Questionable")] },
      { id: "q3", prompt: "Best part?", options: [o("☕", "The food and drinks"), o("🗣️", "The gossip"), o("😂", "The laughing"), o("📸", "The photos")] },
      { id: "q4", prompt: "Did I talk too much?", options: TALK },
      { id: "q5", prompt: "Most iconic moment?", options: [o("😭", "Crying with laughter"), o("🫖", "The tea that got spilled"), o("🛍️", "The shopping"), o("🍕", "The 2am snack")] },
      { id: "q6", prompt: "Who was the main character?", options: [o("👑", "Me, obviously"), o("🙋‍♀️", "You"), o("🫶", "Both of us"), o("🐕", "A random dog")] },
      { id: "q7", prompt: "Again soon?", options: [o("💯", "This week"), o("🗓️", "This month"), o("⏰", "When you stop being late"), o("🫡", "Same time next year")] },
      { id: "q8", prompt: "Friendship status?", options: [o("👯", "Soulmates"), o("🫶", "Besties"), o("🙂", "Good friends"), o("🕵️", "Still assessing")] },
    ],
    seo: {
      title: "After-Hangout Survey: Send Your Friend a Fun Hangout Survey (Free)",
      description: "The after-hangout survey for friends. Type your name, send the link, and find out how they rated the vibe, the gossip and the most iconic moment. Free, no sign-up.",
      about: "What is an after-hangout survey?",
    },
  },
};

export function surveyFor(mode: string | null): Survey {
  return mode === "hangout" ? SURVEYS.hangout : SURVEYS.date;
}

/** Names and notes stay short and plain. */
export function clean(text: string | null, max: number): string {
  return (text ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
}

/** Answers travel as option indexes joined with dots, e.g. "0.2.1.3". */
export function encodeAnswers(picks: number[]): string {
  return picks.join(".");
}

export function decodeAnswers(raw: string | null, s: Survey): number[] | null {
  if (!raw) return null;
  const picks = raw.split(".").map((x) => Number(x));
  if (picks.length !== s.questions.length) return null;
  if (picks.some((p, i) => !Number.isInteger(p) || p < 0 || p >= s.questions[i].options.length)) return null;
  return picks;
}
