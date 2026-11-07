"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { typeQuiz, scoreType } from "@/lib/quizzes/typeQuizzes";
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

/**
 * "Which one are you?": one question per card, every answer votes for a
 * type, and the result is a type worth posting. The breakdown under it is
 * the bit people screenshot ("62% Detective, 25% Overthinker").
 */
export default function TypeQuiz({ slug }: { slug: string }) {
  const quiz = typeQuiz(slug)!;
  const [picks, setPicks] = useState<string[]>([]);
  const [tapped, setTapped] = useState<string | null>(null);
  const next = nextQuickTest(slug);
  const total = quiz.questions.length;
  const i = picks.length;
  const done = i >= total;

  const answer = (t: string, key: string) => {
    if (tapped) return;
    if (i === 0) trackQuizStart(slug);
    setTapped(key);
    // A beat so the tap registers before the card changes.
    setTimeout(() => {
      const nextPicks = [...picks, t];
      setPicks(nextPicks);
      setTapped(null);
      if (nextPicks.length >= total) {
        const s = scoreType(quiz, nextPicks);
        trackQuizComplete(slug, total);
        trackResultView(slug, quiz.types[s.top].title);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 220);
  };

  const back = () => setPicks((p) => p.slice(0, -1));
  const restart = () => {
    setPicks([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    const s = scoreType(quiz, picks);
    const type = quiz.types[s.top];
    return (
      <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
          <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 pb-14 md:p-8 md:pb-16 mb-6 text-center ${stickerStatic}`}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {[type.emoji, "✨", "💖", "✨", type.emoji].map((e, k) => (
                <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 120}ms` }}>{e}</span>
              ))}
            </div>
            <div className="text-7xl mb-2" aria-hidden="true">{type.emoji}</div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 mb-1">{quiz.resultLabel}</p>
            <h1 className="text-[34px] md:text-5xl leading-[1.02] mb-3" style={display}>{type.title}</h1>
            <p className="text-[18px] font-bold text-white/95 leading-snug">{type.line}</p>
          </div>

          {/* The breakdown: everyone is a bit of everything. */}
          <div className={`rounded-[24px] bg-white p-5 mb-6 ${stickerStatic}`}>
            <p className="text-[13px] text-[#1A1033] mb-3" style={display}>📊 Your mix</p>
            <div className="space-y-2.5">
              {s.ranked.map((r, k) => (
                <div key={r.t}>
                  <div className="flex items-center justify-between text-[14px] font-black text-[#1A1033] mb-1">
                    <span>{quiz.types[r.t].emoji} {quiz.types[r.t].title}</span>
                    <span className="tabular-nums">{r.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#FFF4FA] border-2 border-[#1A1033] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${r.pct}%`, backgroundColor: k === 0 ? "#FF4FA3" : CANDY[k % CANDY.length] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[24px] bg-white p-5 md:p-6 mb-6 text-[#1A1033] ${stickerStatic}`}>
            <p className="text-[16px] font-semibold leading-relaxed mb-4">{type.body}</p>
            <div className="grid gap-3">
              <p className="rounded-2xl bg-[#DDF7EA] p-3.5 text-[15px] font-bold leading-snug">💪 <b>Your superpower:</b> {type.strength}</p>
              <p className="rounded-2xl bg-[#FFE3E3] p-3.5 text-[15px] font-bold leading-snug">👀 <b>Watch out:</b> {type.watch}</p>
              <p className="rounded-2xl bg-[#FFF1C9] p-3.5 text-[15px] font-bold leading-snug">✨ <b>Try this:</b> {type.tip}</p>
            </div>
          </div>

          {quiz.note && (
            <p className="text-[13px] font-bold text-[#1A1033]/55 leading-relaxed mb-8 px-1">{quiz.note}</p>
          )}

          <ResultShare quiz={quiz.title} quizPath={`/${slug}`} title={`${type.emoji} ${type.title}`} />

          <Link href={quiz.own.href} className={`flex items-center gap-4 rounded-[24px] p-5 my-8 bg-[#FFE68A] text-[#1A1033] ${sticker}`}>
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{quiz.own.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Go deeper, free</span>
              <span className="block text-xl leading-snug" style={display}>{quiz.own.label}</span>
            </span>
            <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
          </Link>

          <GuideCards guides={guidesFor(slug)} title="Go deeper" />

          <UnlockAllCard from={`result-${slug}`} />

          {quiz.program && <ProgramOffer quizPath={quiz.program} className="!px-0 !py-4" />}

          <Link href={`/${next.slug}`} className={`flex items-center gap-4 rounded-[24px] p-5 my-8 ${sticker}`} style={{ backgroundColor: next.bg, color: "#1A1033" }}>
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{next.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Up next</span>
              <span className="block text-xl leading-snug" style={display}>{next.short}</span>
            </span>
            <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
          </Link>

          <MerchCard from={`result-${slug}`} />
          <MoreQuickTests exclude={slug} />

          <button onClick={restart} className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#1A1033]/50 hover:text-[#1A1033]">
            <RotateCcw className="w-4 h-4" /> Take it again
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[i];

  return (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
      <div className="max-w-md mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-4">
          <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
            {quiz.kicker}
          </span>
          <h1 className="text-[34px] md:text-5xl leading-[1.02] text-[#1A1033]" style={display}>{quiz.title}</h1>
          {i === 0 && <p className="mt-2 text-[15px] font-bold text-[#1A1033]/70">{quiz.intro}</p>}
        </div>

        <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-2">
          {i > 0 ? (
            <button onClick={back} className="inline-flex items-center gap-1 text-[#1A1033]/60 hover:text-[#1A1033]">
              <ArrowLeft className="w-4 h-4" strokeWidth={3} /> Back
            </button>
          ) : (
            <span />
          )}
          <span>{i + 1}/{total}</span>
        </div>
        <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-5">
          <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${(i / total) * 100}%` }} />
        </div>

        <div key={question.id} className={`oc-pop rounded-[28px] p-5 mb-5 ${stickerStatic}`} style={{ backgroundColor: CANDY[i % CANDY.length] }}>
          <p className="text-[24px] leading-[1.18] text-[#1A1033]" style={display}>{question.prompt}</p>
        </div>

        <div className="grid gap-3">
          {question.options.map((opt, k) => {
            const key = `${question.id}-${k}`;
            const isTapped = tapped === key;
            return (
              <button
                key={key}
                onClick={() => answer(opt.t, key)}
                disabled={Boolean(tapped)}
                className={`min-h-[58px] rounded-2xl px-4 py-3 text-left flex items-center gap-3 text-[#1A1033] font-black text-[16px] leading-snug ${isTapped ? "bg-[#FF4FA3] text-white scale-[0.98]" : "bg-white"} ${tapped ? stickerStatic : sticker}`}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{opt.emoji}</span>
                <span className="flex-1">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
