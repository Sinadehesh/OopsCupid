"use client";
import React, { useState } from "react";
import { FLIP_PAIRS, type SubscaleKey } from "./premiumCopy";
import { ChevronDown } from "lucide-react";

export default function FlipTogglePairs({ result }: { result: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const topKey = result.topDrivers?.[0]?.key as SubscaleKey | undefined;
  const pairs = (topKey && FLIP_PAIRS[topKey]) ? FLIP_PAIRS[topKey] : Object.values(FLIP_PAIRS)[0];

  return (
    <div className="bg-[#086788] rounded-[24px] shadow-xl p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#06AED5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="mb-8">
          <span className="text-[#F0C808] font-extrabold uppercase tracking-widest text-xs">Cognitive Dissonance</span>
          <h3 className="text-[26px] md:text-[32px] font-extrabold text-[#FFF1D0] mt-1">What You Tell Yourself vs What's Actually Happening</h3>
          <p className="text-[#FFF1D0]/70 font-medium mt-2 text-[15px]">Based on your top driver: <strong className="text-[#F0C808]">{result.topDrivers?.[0]?.label ?? "your patterns"}</strong>. Tap each to reveal the signal beneath the story.</p>
        </div>
        <div className="space-y-3">
          {pairs.map((pair, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-white/15">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-white/10 hover:bg-white/15 transition-all duration-200 text-left focus:outline-none">
                <div className="flex items-start gap-3">
                  <span className="text-[#F0C808] font-black text-lg shrink-0 mt-0.5">💬</span>
                  <span className="font-bold text-[#FFF1D0] text-[15px] leading-snug">{pair.story}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#FFF1D0]/60 shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 py-4 bg-white/5 border-t border-white/10 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-start gap-3">
                    <span className="text-[#06AED5] font-black text-lg shrink-0 mt-0.5">🔬</span>
                    <p className="text-[#FFF1D0]/90 font-medium text-[15px] leading-relaxed">{pair.signal}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
