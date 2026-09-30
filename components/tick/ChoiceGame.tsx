"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { choiceGame, choiceRank, optionsFor } from "@/lib/quizzes/choiceGames";
import { nextQuickTest } from "@/lib/quizzes/tickTests";
import { guidesFor } from "@/lib/guides/guides";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import GuideCards from "@/components/guides/GuideCards";
import MerchCard from "@/components/shop/MerchCard";
import MoreQuickTests from "./MoreQuickTests";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * One moment per card, tap an answer, get the verdict and the reason.
 * Score, streak and a rank at the end make it a game; the reasons are
 * the education, and the guides after are the thing worth buying.
 */
export default function ChoiceGame({ slug }: { slug: string }) {
  const game = choiceGame(slug)!;
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const next = nextQuickTest(slug);
  const total = game.rounds.length;
  const round = game.rounds[i];
  const options = optionsFor(game, round);

  const answer = (id: string) => {
    if (picked) return;
    if (!started) {
      setStarted(true);
      trackQuizStart(slug);
    }
    const right = id === round.answer;
    setPicked(id);
    setScore((s) => s + (right ? 1 : 0));
    const st = right ? streak + 1 : 0;
    setStreak(st);
    setBest((b) => Math.max(b, st));
  };

  const advance = () => {
    setPicked(null);
    if (i + 1 < total) {
      setI(i + 1);
    } else {
      setDone(true);
      trackQuizComplete(slug, total);
      trackResultView(slug, choiceRank(game, score).title);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const restart = () => {
    setI(0); setScore(0); setStreak(0); setBest(0); setPicked(null); setDone(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    const rank = choiceRank(game, score);
    return (
      <div className="bg-[#FFF4FA] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
          <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 md:p-8 mb-8 text-center ${stickerStatic}`}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {[game.emoji, "✨", "💖", "✨", game.emoji].map((e, k) => (
                <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 120}ms` }}>{e}</span>
              ))}
            </div>
            <div className="text-6xl mb-2" aria-hidden="true">{rank.emoji}</div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 mb-1">{game.resultLabel}</p>
            <h1 className="text-[38px] md:text-5xl leading-[1] mb-2" style={display}>{rank.title}</h1>
            <p className="text-5xl tabular-nums mb-3" style={display}>{score}/{total}</p>
            <p className="text-[17px] font-bold text-white/95">{rank.line}</p>
            <p className="text-sm font-black text-white/80 mt-3">🔥 Best streak: {best}</p>
          </div>

          {game.note && (
            <p className={`rounded-2xl bg-white p-4 mb-8 text-[15px] font-bold text-[#1A1033] leading-relaxed ${stickerStatic}`}>💡 {game.note}</p>
          )}

          <GuideCards guides={guidesFor(slug)} title="Go deeper" />

          <Link href={game.own.href} className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 bg-[#FFE68A] text-[#1A1033] ${sticker}`}>
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{game.own.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Now it&apos;s about you</span>
              <span className="block text-xl leading-snug" style={display}>{game.own.label}</span>
            </span>
            <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
          </Link>

          <Link href={`/${next.slug}`} className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 ${sticker}`} style={{ backgroundColor: next.bg, color: "#1A1033" }}>
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{next.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Up next</span>
              <span className="block text-xl leading-snug" style={display}>{next.short}</span>
            </span>
            <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
          </Link>

          <ResultShare quiz={game.title} quizPath={`/${slug}`} title={`${rank.emoji} ${rank.title}`} score={score} scoreLabel={`of ${total}`} />
          <MerchCard from={`result-${slug}`} />
          <MoreQuickTests exclude={slug} />

          <button onClick={restart} className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#1A1033]/50 hover:text-[#1A1033]">
            <RotateCcw className="w-4 h-4" /> Play again
          </button>
        </div>
      </div>
    );
  }

  const right = picked === round.answer;
  const correct = options.find((x) => x.id === round.answer)!;

  return (
    <div className="bg-[#FFF4FA] min-h-screen">
      <div className="max-w-md mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-4">
          <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
            {game.kicker}
          </span>
          <h1 className="text-[36px] md:text-5xl leading-[1] text-[#1A1033]" style={display}>{game.title}</h1>
          {i === 0 && !picked && <p className="mt-2 text-[15px] font-bold text-[#1A1033]/70">{game.intro}</p>}
        </div>

        <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-2">
          <span>{i + 1}/{total}</span>
          <span>✅ {score}</span>
          <span className={streak >= 3 ? "text-[#FF4FA3]" : ""}>🔥 {streak}</span>
        </div>
        <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-5">
          <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${(i / total) * 100}%` }} />
        </div>

        {/* The moment. Text games show it as his message. */}
        <div key={round.id} className={`oc-pop rounded-[28px] p-5 mb-5 ${stickerStatic}`} style={{ backgroundColor: CANDY[i % CANDY.length] }}>
          {game.style === "text" ? (
            <div className="rounded-2xl bg-white/70 border-2 border-[#1A1033] p-4">
              <p className="text-[11px] font-black text-[#1A1033]/60 mb-2">💬 him</p>
              <div className="inline-block max-w-full rounded-[20px] rounded-bl-md bg-[#E9E9EB] px-4 py-2.5">
                <p className="text-[21px] font-bold text-[#1A1033] leading-snug break-words">{round.prompt}</p>
              </div>
            </div>
          ) : (
            <p className="text-[22px] leading-[1.2] text-[#1A1033]" style={display}>{round.prompt}</p>
          )}
          {round.context && <p className="mt-3 text-[14px] font-bold text-[#1A1033]/75">{round.context}</p>}
        </div>

        <p className="text-center text-[13px] font-black uppercase tracking-wider text-[#1A1033]/60 mb-3">{game.question}</p>

        <div className="grid gap-3">
          {options.map((opt) => {
            const isPicked = picked === opt.id;
            const isAnswer = picked && opt.id === round.answer;
            const tone = isAnswer ? "bg-[#34D399]" : isPicked ? "bg-[#FF8A8A]" : "bg-white";
            return (
              <button
                key={opt.id}
                onClick={() => answer(opt.id)}
                disabled={Boolean(picked)}
                className={`min-h-[58px] rounded-2xl px-4 py-3 text-left flex items-center gap-3 text-[#1A1033] font-black text-[17px] ${tone} ${picked ? stickerStatic : sticker} ${picked && !isAnswer && !isPicked ? "opacity-50" : ""}`}
              >
                <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
                <span className="flex-1">{opt.label}</span>
                {isAnswer && <span aria-hidden="true">✅</span>}
                {isPicked && !isAnswer && <span aria-hidden="true">❌</span>}
              </button>
            );
          })}
        </div>

        {/* The verdict, with the reason. */}
        {picked && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1A1033]/40 p-4" onClick={advance}>
            <div
              className={`w-full max-w-md rounded-[26px] p-6 oc-pop ${stickerStatic} ${right ? "bg-[#B8F2D8]" : "bg-[#FFD1E8]"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-3xl mb-1" style={display}>
                {right ? (streak >= 3 ? `🔥 ${streak} in a row!` : "✅ Nailed it") : "🙈 Not quite"}
              </p>
              <p className="text-sm font-black uppercase tracking-wider text-[#1A1033]/70 mb-3">
                {correct.emoji} {correct.label}
              </p>
              <p className="text-[17px] font-bold text-[#1A1033] leading-relaxed mb-5">{round.why}</p>
              <button onClick={advance} className={`w-full min-h-[56px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}>
                {i + 1 < total ? "Next one" : "See my result"} <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
