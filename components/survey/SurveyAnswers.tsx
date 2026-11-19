"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { surveyFor, clean, decodeAnswers, type Survey } from "@/lib/survey/surveys";
import { trackResultView } from "@/lib/track";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

/** The answers coming back: the headline answer big, then the rest. */
export default function SurveyAnswers() {
  const [data, setData] = useState<{ s: Survey; from: string; who: string; picks: number[] | null; note: string } | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = surveyFor(q.get("m"));
    const picks = decodeAnswers(q.get("a"), s);
    setData({ s, from: clean(q.get("f"), 24), who: clean(q.get("n"), 24), picks, note: clean(q.get("t"), 140) });
    if (picks) trackResultView(`survey-${s.mode}`, "answers");
  }, []);

  if (!data) return <div className="min-h-[70vh]" />;
  const { s, who, picks, note } = data;
  const name = who || (s.mode === "date" ? "Your date" : "Your friend");

  if (!picks) {
    return (
      <div className="bg-[#FFF4FA] min-h-screen px-4 py-16 text-center">
        <p className="text-2xl text-[#1A1033] mb-4" style={display}>This link looks incomplete 🤔</p>
        <Link href={s.page} className={`inline-flex rounded-2xl bg-[#FF4FA3] text-white font-black px-6 py-4 ${sticker}`}>Make a survey</Link>
      </div>
    );
  }

  const hi = s.questions.findIndex((x) => x.id === s.headline);
  const top = s.questions[hi].options[picks[hi]];

  return (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className={`rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 mb-6 text-center ${stickerStatic}`}>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 mb-1">{name}&apos;s answers {s.emoji}</p>
          <p className="text-[15px] font-bold text-white/90 mb-1">{s.questions[hi].prompt}</p>
          <div className="text-6xl my-2" aria-hidden="true">{top.emoji}</div>
          <h1 className="text-[36px] leading-[1.05]" style={display}>{top.label}</h1>
        </div>

        <div className="space-y-3 mb-6">
          {s.questions.map((x, k) =>
            k === hi ? null : (
              <div key={x.id} className={`rounded-2xl bg-white p-4 ${stickerStatic}`}>
                <p className="text-[12px] font-black uppercase tracking-wider text-[#1A1033]/50 mb-1">{x.prompt}</p>
                <p className="text-[18px] font-black text-[#1A1033]">{x.options[picks[k]].emoji} {x.options[picks[k]].label}</p>
              </div>
            )
          )}
          {note && (
            <div className={`rounded-2xl bg-[#FFE68A] p-4 ${stickerStatic}`}>
              <p className="text-[12px] font-black uppercase tracking-wider text-[#1A1033]/60 mb-1">{name} added</p>
              <p className="text-[17px] font-bold text-[#1A1033] break-words">&ldquo;{note}&rdquo;</p>
            </div>
          )}
        </div>

        <Link href={s.page} className={`flex items-center justify-center w-full min-h-[56px] rounded-2xl bg-[#1A1033] text-white font-black text-[17px] mb-2 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}>
          {s.emoji} Send another survey
        </Link>
        <p className="text-center text-[12px] font-bold text-[#1A1033]/50 mb-6">📸 Screenshot it before you lose the link.</p>

        <MoreQuickTests title="Now take a quiz about them" />
      </div>
    </div>
  );
}
