"use client";

import React, { useState } from "react";
import { SURVEYS, clean, type SurveyMode } from "@/lib/survey/surveys";
import { trackShare } from "@/lib/track";
import CopyButton from "@/components/share/CopyButton";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

/** Type your name, get the link, send it. */
export default function SurveyMaker({ mode }: { mode: SurveyMode }) {
  const s = SURVEYS[mode];
  const [name, setName] = useState("");
  const [link, setLink] = useState<string | null>(null);

  const make = (e: React.FormEvent) => {
    e.preventDefault();
    const from = clean(name, 24);
    if (!from) return;
    setLink(`${window.location.origin}/survey?m=${mode}&f=${encodeURIComponent(from)}`);
  };

  const send = async () => {
    if (!link) return;
    const text = mode === "date" ? "I made you a post-date survey 👀 Be honest" : "Rate our hangout 👀 Be honest";
    try {
      if (navigator.share) {
        await navigator.share({ title: s.title, text, url: link });
        trackShare(`survey-${mode}`, "native");
        return;
      }
    } catch {
      return; // Share sheet closed.
    }
    await navigator.clipboard?.writeText(`${text} ${link}`).catch(() => {});
    trackShare(`survey-${mode}`, "copy");
  };

  return (
    <div className={`rounded-[26px] bg-white p-5 md:p-6 ${stickerStatic}`}>
      {!link ? (
        <form onSubmit={make}>
          <label htmlFor="survey-name" className="block text-[15px] font-black text-[#1A1033] mb-2">
            Your first name, so they know who&apos;s asking
          </label>
          <input
            id="survey-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            placeholder="e.g. Sophie"
            autoComplete="given-name"
            className="w-full rounded-2xl border-[2.5px] border-[#1A1033] px-4 py-3.5 text-[17px] font-bold text-[#1A1033] outline-none focus:bg-[#FFF4FA] mb-4"
          />
          <button type="submit" disabled={!clean(name, 24)} className={`w-full min-h-[58px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg disabled:opacity-50 ${sticker}`}>
            {s.emoji} Make my survey link
          </button>
          <p className="mt-3 text-[12px] font-bold text-[#1A1033]/55 text-center">Free. No sign-up. Nothing is stored: the answers travel inside the link.</p>
        </form>
      ) : (
        <div>
          <p className="text-[22px] text-[#1A1033] mb-1" style={display}>Your survey is ready {s.emoji}</p>
          <p className="text-[14px] font-bold text-[#1A1033]/65 mb-4">Send it to them. When they finish, they&apos;ll send their answers straight back to you.</p>
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
      )}
    </div>
  );
}
