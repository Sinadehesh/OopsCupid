import { KIT } from "./kit";
import { quizRegistry } from "@/lib/quizzes/registry";
import { VERSUS_GAMES } from "@/lib/quizzes/versus";
import { CHOICE_GAMES } from "@/lib/quizzes/choiceGames";

/**
 * Which pages may have a Story card, and how each one looks. The card only
 * ever names a quiz from this list, with the quiz's own title, so a link
 * can't make an OopsCupid-branded image about anything else.
 */
export interface StoryQuiz {
  title: string;
  emoji: string;
  bg: string;
}

const GAMES: Record<string, StoryQuiz> = {
  "/red-flag-or-green-flag": { title: "Red flag or green flag?", emoji: "🚦", bg: "#FFD1E8" },
  "/flag-runner": { title: "Flag Runner", emoji: "🏃‍♀️", bg: "#FFE68A" },
  "/love-tower": { title: "Love Tower", emoji: "🏗️", bg: "#B8F2D8" },
  "/kiss-the-frogs": { title: "Kiss the Frogs", emoji: "🐸", bg: "#D9F99D" },
  "/heart-wars": { title: "Heart Wars", emoji: "🏰", bg: "#FFB3C7" },
  "/things-he-says": { title: "Things he says", emoji: "💬", bg: "#BDE3FF" },
};

const CANDY = ["#FFD1E8", "#FFE68A", "#B8F2D8", "#FFC9A8", "#BDE3FF", "#FFB3C7", "#D9F99D"];

export function storyQuiz(path: string): StoryQuiz | null {
  if (GAMES[path]) return GAMES[path];
  const kit = KIT.find((k) => `/${k.slug}` === path);
  if (kit) return { title: kit.title, emoji: kit.emoji, bg: kit.bg };
  const game = [...VERSUS_GAMES, ...CHOICE_GAMES].find((g) => `/${g.slug}` === path);
  if (game) return { title: game.title, emoji: game.emoji, bg: game.bg };
  const i = quizRegistry.findIndex((q) => q.slug === path && q.isQuiz);
  if (i >= 0) return { title: quizRegistry[i].title, emoji: "💘", bg: CANDY[i % CANDY.length] };
  return null;
}
