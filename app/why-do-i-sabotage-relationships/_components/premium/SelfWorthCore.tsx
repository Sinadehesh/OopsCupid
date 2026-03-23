"use client";
import React, { useEffect, useState } from "react";

export default function SelfWorthCore({ result }: { result: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t); }, []);

  const score = result.composites?.selfWorthCore ?? 0;
  const pct = Math.round((score / 40) * 100);

  let depth = "", color = "#06AED5", advice = "";
  if (pct >= 75) { depth = "Deep wound — actively running"; color = "#DD1C1A"; advice = "The 'not-enough' belief is your operating system right now. Every relationship behavior is downstream of this. Addressing this directly — not just the surface behaviors — is where real change lives."; }
  else if (pct >= 50) { depth = "Moderate wound — situationally active"; color = "#F0C808"; advice = "The wound is there but it doesn't dominate every interaction. It activates under specific conditions — usually when you feel most at risk of being truly known or losing someone meaningful."; }
  else if (pct >= 25) { depth = "Mild wound — background noise"; color = "#06AED5"; advice = "Low-level unworthiness shows up occasionally — usually as surprise when someone is consistently good to you, or mild doubt when things are going well. Worth monitoring."; }
  else { depth = "Low — reasonably stable self-worth"; color = "#086788"; advice = "Your worthiness beliefs aren't the primary driver. Your patterns likely stem more from external defensive behaviors than core unworthiness. That's actually easier to work with."; }

  return (
    <div className="bg-white rounded-[24px] border-2 border-[#F0C808]/40 shadow-sm p-6 md:p-10 hover:border-[#F0C808] transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <span className="text-[#F0C808] font-extrabold uppercase tracking-widest text-xs">Root System</span>
          <h3 className="text-[24px] md:text-[30px] font-extrabold text-[#086788] mt-1 mb-3">Self-Worth Core</h3>
          <p className="text-[#5E6E79] font-medium text-[15px] mb-6 leading-relaxed">All five sabotage patterns have surface behaviors — but most grow from the same root: a belief that you are not quite enough to be chosen, kept, or loved without conditions.</p>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-[#334B63] text-sm">Worthiness Wound Depth</span>
              <span className="text-sm font-extrabold px-3 py-1 rounded-full text-white" style={{ background: color }}>{depth}</span>
            </div>
            <div className="w-full h-5 bg-[#d6d2d2] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: mounted ? `${pct}%` : "0%", background: color }} />
            </div>
            <div className="flex justify-between text-xs text-[#5E6E79] font-bold mt-1"><span>Stable</span><span>{score} / 40 ({pct}%)</span><span>Deep</span></div>
          </div>
          <div className="bg-[#FFF1D0] border border-[#F0C808]/30 rounded-2xl p-5">
            <p className="text-[#334B63] font-medium text-[14px] leading-relaxed">{advice}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-w-[120px]">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#d6d2d2" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - (mounted ? pct : 0) / 100)}`}
              style={{ transition: "stroke-dashoffset 1.2s ease", transform: "rotate(-90deg)", transformOrigin: "60px 60px" }} />
            <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="900" fill="#086788">{pct}%</text>
            <text x="60" y="73" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5E6E79">wound depth</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
