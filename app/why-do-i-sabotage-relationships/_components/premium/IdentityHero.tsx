"use client";
import React, { useEffect, useState } from "react";
import { ARCHETYPE_BRUTAL_TRUTH } from "./premiumCopy";
import { ShieldAlert } from "lucide-react";

const LEVEL_COLORS = ["#06AED5","#06AED5","#F0C808","#F0C808","#DD1C1A","#DD1C1A"];
const LEVEL_LABELS = ["Low","Mild","Emerging","Moderate","High","Severe"];

export default function IdentityHero({ result }: { result: any }) {
  const [count, setCount] = useState(0);
  const target = result.totalScore ?? 0;
  const level = result.level ?? 0;
  const archetype = result.archetype ?? "";
  const pct = Math.round((target / (result.maxScore ?? 200)) * 100);
  const levelColor = LEVEL_COLORS[level];
  const brutalTruth = ARCHETYPE_BRUTAL_TRUTH[archetype] ?? result.levelData?.advice ?? "";

  useEffect(() => {
    let frame = 0;
    const steps = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((target / steps) * frame));
      if (frame >= steps) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="relative bg-[#086788] rounded-[32px] overflow-hidden shadow-2xl mb-8 p-8 md:p-14 text-center">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#06AED5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#F0C808]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-extrabold uppercase tracking-widest mb-6 text-[#FFF1D0]">
          <ShieldAlert className="w-4 h-4" style={{ color: levelColor }} />
          Level {level} — {LEVEL_LABELS[level]} Sabotage Pattern
        </div>
        <div className="relative mx-auto mb-8 flex items-center justify-center" style={{ width: 160, height: 160 }}>
          <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
            <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
            <circle cx="80" cy="80" r="68" fill="none" stroke={levelColor} strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 68}`}
              strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
              style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-[40px] font-extrabold text-white leading-none">{count}</span>
            <span className="text-[13px] font-bold text-[#FFF1D0]/60 uppercase tracking-widest">/ 200</span>
          </div>
        </div>
        <p className="text-[#F0C808] font-extrabold uppercase tracking-widest text-sm mb-3">Your Sabotage Archetype</p>
        <h1 className="text-[36px] md:text-[52px] font-extrabold text-[#FFF1D0] leading-tight tracking-tight mb-6">{archetype}</h1>
        <div className="bg-white/8 border border-white/15 rounded-2xl px-6 py-5 max-w-2xl mx-auto">
          <p className="text-[17px] md:text-[19px] font-bold text-[#FFF1D0]/90 leading-relaxed italic">"{brutalTruth}"</p>
        </div>
      </div>
    </div>
  );
}
