"use client";
import React, { useEffect, useState } from "react";
import { Activity, ShieldAlert } from "lucide-react";

export default function DuelBars({ result }: { result: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t); }, []);

  const anxious = result.composites?.anxiousPattern ?? 0;
  const avoidant = result.composites?.avoidantPattern ?? 0;
  const anxPct = Math.round((anxious / 80) * 100);
  const avoPct = Math.round((avoidant / 80) * 100);

  let verdict = "", verdictBg = "";
  if (anxPct > avoPct + 15) { verdict = "You lean Anxious"; verdictBg = "#DD1C1A"; }
  else if (avoPct > anxPct + 15) { verdict = "You lean Avoidant"; verdictBg = "#5E6E79"; }
  else { verdict = "Mixed — Anxious-Avoidant blend"; verdictBg = "#086788"; }

  const anxInterp = anxPct > 70 ? "You pursue, test, and hypervigilate. Closeness feels urgent — you can't let uncertainty sit." : anxPct > 40 ? "Moderate pursuit energy. You get activated but can usually regulate." : "Low anxiety drive. You're not typically the one chasing or over-interpreting.";
  const avoInterp = avoPct > 70 ? "You close doors, fade, and distance. Intimacy triggers your exit instinct automatically." : avoPct > 40 ? "Some avoidance patterns. You need more space than average and may shut down under pressure." : "Low avoidance drive. You generally don't instinctively flee closeness.";

  return (
    <div className="bg-white rounded-[24px] border-2 border-[#06AED5]/20 shadow-sm p-6 md:p-8 hover:border-[#06AED5] hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h3 className="font-extrabold text-[#086788] text-xl mb-0.5">Anxious vs Avoidant Split</h3>
          <p className="text-[#5E6E79] text-sm font-medium">Which defense style dominates your nervous system.</p>
        </div>
        <span className="px-4 py-2 rounded-full text-sm font-extrabold text-white" style={{ background: verdictBg }}>{verdict}</span>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-[#334B63] flex items-center gap-2"><Activity className="w-4 h-4 text-[#DD1C1A]" />Anxious Pattern</span>
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#DD1C1A]/10 text-[#DD1C1A]">{anxious} / 80 — {anxPct}%</span>
          </div>
          <div className="w-full h-5 bg-[#d6d2d2] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#DD1C1A] rounded-full transition-all duration-1000" style={{ width: mounted ? `${anxPct}%` : "0%" }} />
          </div>
          <p className="text-[#5E6E79] text-sm font-medium">{anxInterp}</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-[#334B63] flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-[#5E6E79]" />Avoidant Pattern</span>
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-slate-100 text-[#5E6E79]">{avoidant} / 80 — {avoPct}%</span>
          </div>
          <div className="w-full h-5 bg-[#d6d2d2] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#5E6E79] rounded-full transition-all duration-1000 delay-150" style={{ width: mounted ? `${avoPct}%` : "0%" }} />
          </div>
          <p className="text-[#5E6E79] text-sm font-medium">{avoInterp}</p>
        </div>
      </div>
    </div>
  );
}
