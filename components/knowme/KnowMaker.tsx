"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { KNOW_QUIZZES, encodeKnow, type KnowMode } from "@/lib/knowme/knowme";
import { clean } from "@/lib/survey/surveys";
import { trackQuizStart, trackQuizComplete, trackShare } from "@/lib/track";
import CopyButton from "@/components/share/CopyButton";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/** Her name, her ten answers, then the link to send. */
export default function KnowMaker({ mode }: { mode: KnowMode }) {
  const quiz = KNOW_QUIZZES[mode];
  const total = quiz.questions.length;
  const [name, setName] = useState("");
  const [named, setNamed] = useState(false);
  const [picks, setPicks] = useState<number[]>([]);
  const [tapped, setTapped] = useState<number | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clean(name, 24)) return;
    setNamed(true);
    trackQuizStart(`knowme-${mode}-make`);
  };

  const answer = (k: number) => {
    if (tapped !== null) return;
    setTapped(k);
    setTimeout(() => {
      const next = [...picks, k];
      setPicks(next);
      setTapped(null);
      if (next.length === total) {
        const params = new URLSearchParams({ k: mode, n: clean(name, 24), a: encodeKnow(next) });
        setLink(`${window.location.origin}/survey/know?${params.toString()}`);
        trackQuizComplete(`knowme-${mode}-make`, total);
      }
    }, 200);
  };

  const send = async () => {
    if (!link) return;
    const text = mode === "bestie" ? "How well do you know me? 👀 Prove it" : "How well do you actually know me? 👀 Prove it";
    try {
      if (navigator.share) {
        await navigator.share({ title: quiz.title, text, url: link });
        trackShare(`knowme-${mode}`, "native");
        return;
      }
    } catch {
      return; // Share sheet closed.
    }
    await navigator.clipboard?.writeText(`${text} ${link}`).catch(() => {});
    trackShare(`knowme-${mode}`, "copy");
  };

  if (!named) {
    return (
      <form onSubmit={start} className={`rounded-[26px] bg-white p-5 md:p-6 ${stickerStatic}`}>
        <label htmlFor="know-name" className="block text-[15px] font-black text-[#1A1033] mb-2">
          Your first name, so they know whose quiz it is
        </label>
        <input
          id="know-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
          placeholder="e.g. Sophie"
          autoComplete="given-name"
          className="w-full rounded-2xl border-[2.5px] border-[#1A1033] px-4 py-3.5 text-[17px] font-bold text-[#1A1033] outline-none focus:bg-[#FFF4FA] mb-4"
        />
        <button type="submit" disabled={!clean(name, 24)} className={`w-full min-h-[58px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg disabled:opacity-50 ${sticker}`}>
          {quiz.emoji} Start my quiz
        </button>
        <p className="mt-3 text-[12px] font-bold text-[#1A1033]/55 text-center">
          Free. No sign-up. Ten taps about you, then send it to {quiz.sendTo}.
        </p>
      </form>
    );
  }

  if (link) {
    return (
      <div className={`rounded-[26px] bg-white p-5 md:p-6 ${stickerStatic}`}>
        <p className="text-[24px] text-[#1A1033] mb-1" style={display}>Your quiz is ready {quiz.emoji}</p>
        <p className="text-[14px] font-bold text-[#1A1033]/65 mb-4">
          Send it to {quiz.sendTo} or drop it in the group chat. When they finish, they can send you their score.
        </p>
        <button type="button" onClick={send} className={`w-full min-h-[58px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg mb-3 ${sticker}`}>
          📤 Send it
        </button>
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#FFF4FA] p-3">
          <p className="text-[13px] font-semibold break-all text-[#1A1033]">{link}</p>
          <CopyButton text={link} label="Copy" />
        </div>
        <a href={link} target="_blank" rel="noopener" className="mt-3 inline-block text-[13px] font-black underline text-[#1A1033]/70">
          Preview what they&apos;ll see →
        </a>
      </div>
    );
  }

  const i = picks.length;
  const q = quiz.questions[i];
  return (
    <div>
      <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-2">
        {i > 0 ? (
          <button type="button" onClick={() => setPicks((p) => p.slice(0, -1))} className="inline-flex items-center gap-1 text-[#1A1033]/60">
            <ArrowLeft className="w-4 h-4" strokeWidth={3} /> Back
          </button>
        ) : (
          <span className="text-[#1A1033]/60">About you, {clean(name, 24)}</span>
        )}
        <span>{i + 1}/{total}</span>
      </div>
      <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-5">
        <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${(i / total) * 100}%` }} />
      </div>
      <div key={q.id} className={`oc-pop rounded-[28px] p-5 mb-5 ${stickerStatic}`} style={{ backgroundColor: CANDY[i % CANDY.length] }}>
        <p className="text-[26px] leading-[1.15] text-[#1A1033]" style={display}>{q.me}</p>
      </div>
      <div className="grid gap-3">
        {q.options.map((opt, k) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => answer(k)}
            disabled={tapped !== null}
            className={`min-h-[58px] rounded-2xl px-4 py-3 text-left flex items-center gap-3 font-black text-[17px] ${tapped === k ? "bg-[#FF4FA3] text-white" : "bg-white text-[#1A1033]"} ${tapped !== null ? stickerStatic : sticker}`}
          >
            <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
            <span className="flex-1">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
