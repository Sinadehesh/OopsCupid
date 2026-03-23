"use client";
import React, { useState, useEffect } from "react";
import { Bomb, ShieldAlert, Activity, HeartCrack, Lock } from "lucide-react";
import SabotageEmailGate from "./SabotageEmailGate";
import SabotagePremiumResult from "./SabotagePremiumResult";

type Stage = "gate" | "free" | "premium";

export default function SabotageReport({ result }: { result: any }) {
  const [stage, setStage] = useState<Stage>("gate");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const archetype = result?.archetype || "";
  const level = result?.level ?? 0;
  const title = result?.levelData?.title ?? "";
  const subtitle = result?.levelData?.subtitle ?? "";
  const advice = result?.levelData?.advice ?? "";
  const topDrivers: any[] = result?.topDrivers ?? [];
  const subscales: any[] = result?.subscales ?? [];
  const composites = result?.composites ?? {};

  if (stage === "gate") return (
    <div className="max-w-4xl mx-auto w-full">
      <SabotageEmailGate result={result} onEmailSubmit={() => setStage("free")} />
    </div>
  );

  if (stage === "premium") return (
    <div className="max-w-5xl mx-auto w-full">
      <SabotagePremiumResult result={result} />
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto w-full pb-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Hero */}
        <div className="bg-[#086788] text-white rounded-[32px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06AED5]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 border border-white/20 uppercase text-[#FFF1D0]">
              <Bomb className="w-4 h-4" /> Level {level}: {title}
            </div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-4 tracking-tight text-[#FFF1D0]">
              Your Archetype: <span className="text-[#F0C808]">{archetype}</span>
            </h2>
            <p className="text-xl text-[#FFF1D0]/90 font-medium mb-8">"{subtitle}"</p>
            <p className="text-lg text-[#FFF1D0]/80 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">{advice}</p>
          </div>
        </div>

        {/* Score bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-xl text-[#086788] flex items-center gap-2"><Activity className="text-[#DD1C1A]" />Anxious Pattern</h4>
              <span className="text-sm font-bold text-[#DD1C1A] bg-[#DD1C1A]/10 px-3 py-1 rounded-full">{composites.anxiousPattern ?? 0} / 80</span>
            </div>
            <p className="text-[#5E6E79] text-sm mb-4 font-medium">Hypervigilance, testing, fear of abandonment.</p>
            <div className="w-full bg-[#d6d2d2] rounded-full h-4 overflow-hidden">
              <div className="bg-[#DD1C1A] h-full rounded-full transition-all duration-1000" style={{ width: mounted ? `${((composites.anxiousPattern ?? 0) / 80) * 100}%` : "0%" }} />
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-xl text-[#086788] flex items-center gap-2"><ShieldAlert className="text-[#5E6E79]" />Avoidant Pattern</h4>
              <span className="text-sm font-bold text-[#5E6E79] bg-slate-100 px-3 py-1 rounded-full">{composites.avoidantPattern ?? 0} / 80</span>
            </div>
            <p className="text-[#5E6E79] text-sm mb-4 font-medium">Distancing, emotional shutdown, fear of engulfment.</p>
            <div className="w-full bg-[#d6d2d2] rounded-full h-4 overflow-hidden">
              <div className="bg-[#5E6E79] h-full rounded-full transition-all duration-1000" style={{ width: mounted ? `${((composites.avoidantPattern ?? 0) / 80) * 100}%` : "0%" }} />
            </div>
          </div>
        </div>

        {/* Subscale bars */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm">
          <h4 className="font-extrabold text-2xl text-[#086788] mb-6">Your Behavioral Drivers</h4>
          <div className="space-y-5">
            {subscales.map((s: any) => (
              <div key={s.key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-[#334B63]">{s.label}</span>
                  <span className="text-[#5E6E79] font-medium">{Math.round(s.pct)}%</span>
                </div>
                <div className="w-full bg-[#d6d2d2] rounded-full h-3">
                  <div className="bg-[#06AED5] h-full rounded-full transition-all duration-1000" style={{ width: mounted ? `${s.pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom line + locked premium */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm text-center">
          <HeartCrack className="w-10 h-10 text-[#DD1C1A] mx-auto mb-4" />
          <h4 className="font-extrabold text-[#086788] mb-4 text-xl">The Bottom Line</h4>
          <p className="text-[#5E6E79] text-lg leading-relaxed mb-6">
            Your primary triggers are <strong className="text-[#086788]">{topDrivers[0]?.label?.toLowerCase() ?? "hypervigilance"}</strong> and <strong className="text-[#086788]">{topDrivers[1]?.label?.toLowerCase() ?? "avoidance"}</strong>. You sabotage when closeness starts to feel fundamentally unsafe.
          </p>

          {/* Locked teaser */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#086788]/20 mb-6">
            <div className="p-6 blur-[3px] pointer-events-none select-none space-y-2 text-left">
              <p className="font-bold text-[#334B63]">🗺️ Pattern Radar — all 5 dimensions visualized</p>
              <p className="font-bold text-[#334B63]">🔄 Your exact sabotage loop — 4-step interactive breakdown</p>
              <p className="font-bold text-[#334B63]">💬 What you tell yourself vs what's actually happening</p>
              <p className="font-bold text-[#334B63]">🩹 Self-worth wound depth score</p>
              <p className="font-bold text-[#334B63]">🗺️ 3-step personalized rewiring roadmap</p>
            </div>
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
              <Lock className="w-8 h-8 text-[#086788]" />
              <p className="font-extrabold text-[#086788] text-base">Full Premium Analysis</p>
              <button onClick={() => setStage("premium")} className="px-8 py-3 bg-[#086788] hover:bg-[#06AED5] text-white font-extrabold rounded-xl text-sm transition-all shadow-md">
                Unlock Full Report — Free
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
