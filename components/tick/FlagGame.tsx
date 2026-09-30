"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { FLAG_CARDS, rankFor, type FlagCard } from "@/lib/quizzes/flagGame";
import { nextQuickTest } from "@/lib/quizzes/tickTests";
import { guidesFor } from "@/lib/guides/meta";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import GuideCards from "@/components/guides/GuideCards";
import MerchCard from "@/components/shop/MerchCard";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import ProgramOffer from "@/components/program/ProgramOffer";
import MoreQuickTests from "./MoreQuickTests";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

const SLUG = "red-flag-or-green-flag";

/**
 * Swipe left for red, right for green, like a dating app, with a verdict
 * and the reason after every card. Buttons do the same for anyone who
 * doesn't swipe. The streak counter and the rank at the end are the game;
 * the reasons are the part that's actually useful.
 */
export default function FlagGame() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [feedback, setFeedback] = useState<{ card: FlagCard; right: boolean } | null>(null);
  const [drag, setDrag] = useState(0);
  const [fly, setFly] = useState<"left" | "right" | null>(null);
  const [done, setDone] = useState(false);
  const start = useRef<number | null>(null);
  const started = useRef(false);
  const next = nextQuickTest(SLUG);

  const card = FLAG_CARDS[i];

  const answer = (pick: "red" | "green") => {
    if (feedback || fly) return;
    if (!started.current) {
      started.current = true;
      trackQuizStart(SLUG);
    }
    const right = pick === card.flag;
    setFly(pick === "red" ? "left" : "right");
    setTimeout(() => {
      setScore((s) => s + (right ? 1 : 0));
      const st = right ? streak + 1 : 0;
      setStreak(st);
      setBest((b) => Math.max(b, st));
      setFeedback({ card, right });
      setFly(null);
      setDrag(0);
    }, 220);
  };

  const advance = () => {
    setFeedback(null);
    if (i + 1 < FLAG_CARDS.length) {
      setI(i + 1);
    } else {
      setDone(true);
      trackQuizComplete(SLUG, FLAG_CARDS.length);
      trackResultView(SLUG, rankFor(score).title);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onDown = (e: React.PointerEvent) => {
    if (feedback) return;
    start.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    start.current = null;
    if (drag < -90) answer("red");
    else if (drag > 90) answer("green");
    else setDrag(0);
  };

  if (done) {
    const rank = rankFor(score);
    return (
      <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
          <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 md:p-8 mb-8 text-center ${stickerStatic}`}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {["🚩", "💚", "✨", "🚩", "💚"].map((e, k) => (
                <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 120}ms` }}>{e}</span>
              ))}
            </div>
            <div className="text-6xl mb-2" aria-hidden="true">{rank.emoji}</div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 mb-1">Your red flag radar</p>
            <h1 className="text-[38px] md:text-5xl leading-[1] mb-2" style={display}>{rank.title}</h1>
            <p className="text-5xl tabular-nums mb-3" style={display}>{score}/{FLAG_CARDS.length}</p>
            <p className="text-[17px] font-bold text-white/95">{rank.line}</p>
            <p className="text-sm font-black text-white/80 mt-3">🔥 Best streak: {best}</p>
          </div>

          <GuideCards guides={guidesFor(SLUG)} title="Sharpen your radar" />

          <UnlockAllCard from={`result-${SLUG}`} />

          <Link href="/first-month-red-flags" className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 bg-[#FFE68A] text-[#1A1033] ${sticker}`}>
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">🚩</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Now test your own</span>
              <span className="block text-xl leading-snug" style={display}>Which red flags happened in your first month?</span>
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

          <ProgramOffer quizPath="/is-he-manipulative" className="!px-0 !py-4" />

          <ResultShare quiz="Red Flag or Green Flag?" quizPath={`/${SLUG}`} title={`${rank.emoji} ${rank.title}`} score={score} scoreLabel={`of ${FLAG_CARDS.length}`} />
          <MerchCard from={`result-${SLUG}`} />
          <MoreQuickTests exclude={SLUG} />

          <button
            onClick={() => { setI(0); setScore(0); setStreak(0); setBest(0); setDone(false); }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#1A1033]/50 hover:text-[#1A1033]"
          >
            <RotateCcw className="w-4 h-4" /> Play again
          </button>
        </div>
      </div>
    );
  }

  const tilt = fly === "left" ? -30 : fly === "right" ? 30 : drag / 12;
  const shift = fly === "left" ? -500 : fly === "right" ? 500 : drag;
  const hint = drag < -40 ? "red" : drag > 40 ? "green" : null;

  return (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
      <div className="max-w-md mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-4">
          <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
            🚦 swipe game · 16 cards
          </span>
          <h1 className="text-[38px] md:text-5xl leading-[1] text-[#1A1033]" style={display}>Red flag or green flag?</h1>
        </div>

        <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-2">
          <span>{i + 1}/{FLAG_CARDS.length}</span>
          <span>✅ {score}</span>
          <span className={streak >= 3 ? "text-[#FF4FA3]" : ""}>🔥 {streak}</span>
        </div>
        <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-5">
          <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${(i / FLAG_CARDS.length) * 100}%` }} />
        </div>

        {/* The card: drag it, or use the buttons. */}
        <div className="relative h-[300px] mb-5 select-none">
          {FLAG_CARDS[i + 1] && (
            <div className={`absolute inset-0 rounded-[28px] rotate-3 ${stickerStatic}`} style={{ backgroundColor: CANDY[(i + 1) % CANDY.length] }} />
          )}
          <div
            key={card.id}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className={`absolute inset-0 rounded-[28px] p-6 flex flex-col justify-between touch-none cursor-grab active:cursor-grabbing ${stickerStatic} ${start.current === null ? "transition-transform duration-200" : ""}`}
            style={{ backgroundColor: CANDY[i % CANDY.length], transform: `translateX(${shift}px) rotate(${tilt}deg)` }}
          >
            <div className="flex justify-between">
              <span className={`rounded-full border-2 border-[#1A1033] px-3 py-1 text-sm font-black transition-opacity ${hint === "red" ? "opacity-100 bg-[#FF5A5A] text-white" : "opacity-0"}`}>🚩 RED</span>
              <span className={`rounded-full border-2 border-[#1A1033] px-3 py-1 text-sm font-black transition-opacity ${hint === "green" ? "opacity-100 bg-[#34D399] text-[#1A1033]" : "opacity-0"}`}>💚 GREEN</span>
            </div>
            <p className="text-[26px] leading-[1.15] text-[#1A1033]" style={display}>{card.text}</p>
            <p className="text-xs font-black text-[#1A1033]/50 text-center">← swipe →</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => answer("red")} className={`min-h-[62px] rounded-2xl bg-[#FF5A5A] text-white font-black text-lg ${sticker}`}>🚩 Red flag</button>
          <button onClick={() => answer("green")} className={`min-h-[62px] rounded-2xl bg-[#34D399] text-[#1A1033] font-black text-lg ${sticker}`}>💚 Green flag</button>
        </div>

        {/* The verdict, with the reason. */}
        {feedback && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1A1033]/40 p-4" onClick={advance}>
            <div
              className={`w-full max-w-md rounded-[26px] p-6 oc-pop ${stickerStatic} ${feedback.right ? "bg-[#B8F2D8]" : "bg-[#FFD1E8]"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-3xl mb-1" style={display}>
                {feedback.right ? (streak >= 3 ? `🔥 ${streak} in a row!` : "✅ Nailed it") : "🙈 Not quite"}
              </p>
              <p className="text-sm font-black uppercase tracking-wider text-[#1A1033]/70 mb-3">
                {feedback.card.beige ? "🟫 Beige flag (counts as green)" : feedback.card.flag === "red" ? "🚩 Red flag" : "💚 Green flag"}
              </p>
              <p className="text-[17px] font-bold text-[#1A1033] leading-relaxed mb-5">{feedback.card.why}</p>
              <button onClick={advance} className={`w-full min-h-[56px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}>
                {i + 1 < FLAG_CARDS.length ? "Next card" : "See my radar"} <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
