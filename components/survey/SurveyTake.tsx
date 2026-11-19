"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { surveyFor, clean, encodeAnswers, type Survey } from "@/lib/survey/surveys";
import { trackQuizStart, trackQuizComplete, trackShare } from "@/lib/track";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import CopyButton from "@/components/share/CopyButton";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * The person who was sent a survey: eight taps, then their answers go
 * back as a link. Read from the URL after mount, because the page is
 * static and the names live in the link.
 */
export default function SurveyTake() {
  const [s, setS] = useState<Survey | null>(null);
  const [from, setFrom] = useState("");
  const [picks, setPicks] = useState<number[]>([]);
  const [tapped, setTapped] = useState<number | null>(null);
  const [me, setMe] = useState("");
  const [note, setNote] = useState("");
  const [back, setBack] = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setS(surveyFor(q.get("m")));
    setFrom(clean(q.get("f"), 24));
  }, []);

  if (!s) return <div className="min-h-[70vh]" />;

  const who = from || (s.mode === "date" ? "Your date" : "Your friend");
  const total = s.questions.length;
  const i = picks.length;

  const answer = (k: number) => {
    if (tapped !== null) return;
    if (i === 0) trackQuizStart(`survey-${s.mode}`);
    setTapped(k);
    setTimeout(() => {
      setPicks((p) => [...p, k]);
      setTapped(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const finish = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ m: s.mode, a: encodeAnswers(picks) });
    if (from) params.set("f", from);
    const n = clean(me, 24);
    const t = clean(note, 140);
    if (n) params.set("n", n);
    if (t) params.set("t", t);
    const url = `${window.location.origin}/survey/answers?${params.toString()}`;
    setBack(url);
    trackQuizComplete(`survey-${s.mode}`, total);
    try {
      if (navigator.share) {
        await navigator.share({ title: "My answers 💌", text: "My answers 💌", url });
        trackShare(`survey-${s.mode}-reply`, "native");
      }
    } catch {
      // Closed the share sheet: the link is on screen to copy.
    }
  };

  return (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
      <div className="max-w-md mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-5">
          <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
            {s.emoji} {s.title}
          </span>
          <h1 className="text-[30px] md:text-4xl leading-[1.05] text-[#1A1033]" style={display}>{s.ask(who)} 👀</h1>
          {i === 0 && <p className="mt-2 text-[15px] font-bold text-[#1A1033]/70">Eight quick taps. Be honest, they asked for it.</p>}
        </div>

        {i < total ? (
          <>
            <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-2">
              {i > 0 ? (
                <button onClick={() => setPicks((p) => p.slice(0, -1))} className="inline-flex items-center gap-1 text-[#1A1033]/60">
                  <ArrowLeft className="w-4 h-4" strokeWidth={3} /> Back
                </button>
              ) : <span />}
              <span>{i + 1}/{total}</span>
            </div>
            <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-5">
              <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${(i / total) * 100}%` }} />
            </div>
            <div key={s.questions[i].id} className={`oc-pop rounded-[28px] p-5 mb-5 ${stickerStatic}`} style={{ backgroundColor: CANDY[i % CANDY.length] }}>
              <p className="text-[26px] leading-[1.15] text-[#1A1033]" style={display}>{s.questions[i].prompt}</p>
            </div>
            <div className="grid gap-3">
              {s.questions[i].options.map((opt, k) => (
                <button
                  key={opt.label}
                  onClick={() => answer(k)}
                  disabled={tapped !== null}
                  className={`min-h-[58px] rounded-2xl px-4 py-3 text-left flex items-center gap-3 font-black text-[17px] ${tapped === k ? "bg-[#FF4FA3] text-white" : "bg-white text-[#1A1033]"} ${tapped !== null ? stickerStatic : sticker}`}
                >
                  <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
                  <span className="flex-1">{opt.label}</span>
                </button>
              ))}
            </div>
          </>
        ) : !back ? (
          <form onSubmit={finish} className={`rounded-[26px] bg-white p-5 ${stickerStatic}`}>
            <p className="text-[22px] text-[#1A1033] mb-4" style={display}>Done! Send your answers to {who} 💌</p>
            <label htmlFor="me" className="block text-[14px] font-black text-[#1A1033] mb-1">Your name (optional)</label>
            <input id="me" value={me} onChange={(e) => setMe(e.target.value)} maxLength={24} className="w-full rounded-2xl border-[2.5px] border-[#1A1033] px-4 py-3 text-[16px] font-bold text-[#1A1033] mb-3 outline-none" />
            <label htmlFor="note" className="block text-[14px] font-black text-[#1A1033] mb-1">Anything else to say? (optional)</label>
            <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={140} rows={3} className="w-full rounded-2xl border-[2.5px] border-[#1A1033] px-4 py-3 text-[16px] font-bold text-[#1A1033] mb-4 outline-none resize-none" />
            <button type="submit" className={`w-full min-h-[58px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg ${sticker}`}>📤 Send my answers</button>
          </form>
        ) : (
          <div className={`rounded-[26px] bg-white p-5 ${stickerStatic}`}>
            <p className="text-[22px] text-[#1A1033] mb-2" style={display}>Your answers are ready 💌</p>
            <p className="text-[14px] font-bold text-[#1A1033]/65 mb-3">If the share sheet didn&apos;t open, copy the link and send it to {who}.</p>
            <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#FFF4FA] p-3 mb-5">
              <p className="text-[12px] font-semibold break-all text-[#1A1033]">{back}</p>
              <CopyButton text={back} />
            </div>
            <Link href={s.page} className={`flex items-center justify-center w-full min-h-[56px] rounded-2xl bg-[#FFE68A] text-[#1A1033] font-black text-[17px] ${sticker}`}>
              {s.emoji} Now make your own and send it back
            </Link>
          </div>
        )}

        {back && <MoreQuickTests title="While you wait, try a quiz" />}
      </div>
    </div>
  );
}
