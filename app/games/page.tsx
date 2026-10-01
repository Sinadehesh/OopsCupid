import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CHOICE_GAMES } from "@/lib/quizzes/choiceGames";
import { VERSUS_GAMES } from "@/lib/quizzes/versus";
import { TICK_GAMES } from "@/lib/quizzes/tickGames";
import { tickTestBySlug } from "@/lib/quizzes/tickTests";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import MerchCard from "@/components/shop/MerchCard";
import { sticker, display } from "@/lib/ui/sticker";

export const metadata: Metadata = {
  title: "Relationship Games: Red Flags, Texts, Attachment and Frenemies | OopsCupid",
  description: "Free relationship games. Swipe red flags, decode his texts, guess attachment styles, spot gaslighting and frenemies, and compare your friends. Learn something every round.",
  alternates: { canonical: "https://www.oopscupid.com/games" },
};

const GAMES = [
  { slug: "flag-runner", title: "Flag Runner", emoji: "🏃‍♀️", bg: "#FFE68A", line: "Fill her heart with green flags. Three red flags and the ick wins.", tag: "new · 16 levels" },
  { slug: "red-flag-or-green-flag", title: "Red flag or green flag?", emoji: "🚦", bg: "#FFD1E8", line: "Swipe 16 dating moments. How sharp is your radar?", tag: "swipe" },
  ...CHOICE_GAMES.map((g) => ({ slug: g.slug, title: g.title, emoji: g.emoji, bg: g.bg, line: g.intro, tag: `${g.rounds.length} rounds` })),
  ...VERSUS_GAMES.map((g) => ({ slug: g.slug, title: g.title, emoji: g.emoji, bg: g.bg, line: g.intro, tag: "2 players" })),
  ...Object.entries(TICK_GAMES).map(([slug, g]) => {
    const t = tickTestBySlug(slug)!;
    return { slug, title: g.name, emoji: t.emoji, bg: t.bg, line: t.question, tag: g.mode === "bingo" ? "bingo" : g.mode === "receipt" ? "receipt" : "tier list" };
  }),
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-14">
        <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
          🎮 free · about a minute each
        </span>
        <h1 className="text-[44px] md:text-6xl text-[#1A1033] leading-[1] mb-3" style={display}>The games 🎮</h1>
        <p className="text-lg text-[#1A1033]/70 font-bold leading-relaxed mb-8">
          Play, score, and learn the stuff nobody teaches you about dating and friends. Every answer comes with the reason.
        </p>

        <div className="grid gap-4 mb-10">
          {GAMES.map((g, k) => (
            <Link
              key={g.slug}
              href={`/${g.slug}`}
              className={`flex items-center gap-4 rounded-[24px] p-5 text-[#1A1033] ${sticker} ${k % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}`}
              style={{ backgroundColor: g.bg }}
            >
              <span className="w-16 h-16 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-4xl" aria-hidden="true">{g.emoji}</span>
              <span className="flex-1 min-w-0">
                <span className="inline-block rounded-full bg-white/80 border-2 border-[#1A1033] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider mb-1">{g.tag}</span>
                <span className="block text-[22px] leading-tight" style={display}>{g.title}</span>
                <span className="block text-[14px] font-bold opacity-75 leading-snug mt-1">{g.line}</span>
              </span>
              <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
            </Link>
          ))}
        </div>

        <MerchCard from="games-index" />
        <MoreQuickTests title="Or take a 40-second test" />
      </div>
    </main>
  );
}
