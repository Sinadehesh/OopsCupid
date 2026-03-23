"use client";
import React, { useState, useEffect } from "react";
import { Bomb, ShieldAlert, Activity, HeartCrack, Lock } from "lucide-react";
import SabotageEmailGate from "./SabotageEmailGate";
import SabotagePremiumOffer from "./SabotagePremiumOffer";

type Stage = "gate" | "free" | "offer";

export default function SabotageReport({ result }: { result: any }) {
  const [stage, setStage] = useState<Stage>("gate");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const archetype = result?.archetype || "The Protector";
  const level = result?.level ?? 0;
  const title = result?.levelData?.title ?? "";
  const subtitle = result?.levelData?.subtitle ?? "";
  const advice = result?.levelData?.advice ?? "";
  const topDrivers: any[] = result?.topDrivers ?? [];
  const subscales: any[] = result?.subscales ?? [];
  const composites = result?.composites ?? {};

  if (stage === "gate") {
    return (
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
        <SabotageEmailGate result={result} onEmailSubmit={() => setStage("free")} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700 pb-8">

        {/* ── HERO RESULT CARD ── */}
        <div className="bg-[#086788] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#06AED5]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06AED5]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 backdrop-blur-sm border border-white/20 uppercase text-[#FFF1D0]">
              <Bomb className="w-4 h-4" /> Level {level}: {title}
            </div>
            <h2 className="text-[36px] md:text-[48px] font-extrabold mb-4 tracking-tight text-[#FFF1D0]">
              Your Archetype: <span className="text-[#F0C808]">{archetype}</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#FFF1D0]/90 font-medium mb-8">"{subtitle}"</p>
            <p className="text-lg text-[#FFF1D0]/80 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
              {advice}
            </p>
          </div>
        </div>

        {/* ── SCORE BARS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm hover:border-[#06AED5] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-xl text-[#086788] flex items-center gap-2">
                <Activity className="text-[#DD1C1A]" /> Anxious Pattern
              </h4>
              <span className="text-sm font-bold text-[#DD1C1A] bg-[#DD1C1A]/10 px-3 py-1 rounded-full">
                {composites.anxiousPattern ?? 0} / 80
              </span>
            </div>
            <p className="text-[#5E6E79] text-sm mb-4 font-medium">Driven by hypervigilance, testing, and fear of abandonment.</p>
            <div className="w-full bg-[#d6d2d2] rounded-full h-4 overflow-hidden">
              <div
                className="bg-[#DD1C1A] h-full rounded-full transition-all duration-1000"
                style={{ width: mounted ? `${((composites.anxiousPattern ?? 0) / 80) * 100}%` : "0%" }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm hover:border-[#06AED5] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-xl text-[#086788] flex items-center gap-2">
                <ShieldAlert className="text-[#5E6E79]" /> Avoidant Pattern
              </h4>
              <span className="text-sm font-bold text-[#5E6E79] bg-slate-100 px-3 py-1 rounded-full">
                {composites.avoidantPattern ?? 0} / 80
              </span>
            </div>
            <p className="text-[#5E6E79] text-sm mb-4 font-medium">Driven by distancing, emotional shutdown, and fear of engulfment.</p>
            <div className="w-full bg-[#d6d2d2] rounded-full h-4 overflow-hidden">
              <div
                className="bg-[#5E6E79] h-full rounded-full transition-all duration-1000"
                style={{ width: mounted ? `${((composites.avoidantPattern ?? 0) / 80) * 100}%` : "0%" }}
              />
            </div>
          </div>
        </div>

        {/* ── BEHAVIORAL DRIVERS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm">
            <h4 className="font-extrabold text-2xl text-[#086788] mb-6">Your Behavioral Drivers</h4>
            <div className="space-y-5">
              {subscales.map((s: any) => (
                <div key={s.key}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-[#334B63]">{s.label}</span>
                    <span className="text-[#5E6E79] font-medium">{Math.round(s.pct)}%</span>
                  </div>
                  <div className="w-full bg-[#d6d2d2] rounded-full h-3">
                    <div
                      className="bg-[#06AED5] h-full rounded-full transition-all duration-1000 delay-300"
                      style={{ width: mounted ? `${s.pct}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm flex flex-col justify-center">
            <h4 className="font-extrabold text-xl text-[#086788] mb-6">Internal vs External</h4>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-[#334B63]">Vulnerability (Internal)</span>
                <span className="text-[#5E6E79]">{Math.round(((composites.vulnerabilityScore ?? 0) / 80) * 100)}%</span>
              </div>
              <div className="w-full bg-[#d6d2d2] rounded-full h-3 overflow-hidden">
                <div className="bg-[#F0C808] h-full rounded-full" style={{ width: mounted ? `${((composites.vulnerabilityScore ?? 0) / 80) * 100}%` : "0%" }} />
              </div>
              <p className="text-xs text-[#5E6E79] mt-2">Your sensitivity to rejection and unworthiness.</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-[#334B63]">Defense (External Actions)</span>
                <span className="text-[#5E6E79]">{Math.round(((composites.defenseScore ?? 0) / 120) * 100)}%</span>
              </div>
              <div className="w-full bg-[#d6d2d2] rounded-full h-3 overflow-hidden">
                <div className="bg-[#086788] h-full rounded-full" style={{ width: mounted ? `${((composites.defenseScore ?? 0) / 120) * 100}%` : "0%" }} />
              </div>
              <p className="text-xs text-[#5E6E79] mt-2">How much you act out, test, or withdraw.</p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM LINE + LOCKED PREMIUM TEASE ── */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#06AED5]/20 shadow-sm text-center mb-0">
          <HeartCrack className="w-10 h-10 text-[#DD1C1A] mx-auto mb-4" />
          <h4 className="font-extrabold text-[#086788] mb-4 text-xl">The Bottom Line</h4>
          <p className="text-[#5E6E79] text-lg leading-relaxed mb-6">
            Your primary triggers are <strong className="text-[#086788]">{topDrivers[0]?.label?.toLowerCase() ?? "hypervigilance"}</strong> and <strong className="text-[#086788]">{topDrivers[1]?.label?.toLowerCase() ?? "avoidance"}</strong>. You sabotage when closeness starts to feel fundamentally unsafe.
          </p>

          {/* BLURRED PREMIUM TEASER */}
          <div className="bg-[#086788]/5 rounded-2xl p-6 border-2 border-[#086788]/20 relative overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/40 z-10 flex flex-col items-center justify-center gap-3">
              <Lock className="w-8 h-8 text-[#086788]" />
              <p className="font-extrabold text-[#086788] text-base">Full Trigger Map — Locked</p>
              <button
                onClick={() => setStage("offer")}
                className="px-6 py-2.5 bg-[#086788] hover:bg-[#06AED5] text-white font-extrabold rounded-xl text-sm transition-all"
              >
                Unlock Premium Report
              </button>
            </div>
            <div className="blur-sm pointer-events-none select-none space-y-3 p-2">
              <p className="font-bold text-[#334B63]">🧠 Trigger 1: Fear of Engulfment — 87%</p>
              <p className="font-bold text-[#334B63]">💥 Trigger 2: Rejection Alarm — 74%</p>
              <p className="font-bold text-[#334B63]">🔄 Your Sabotage Loop: Closeness → Panic → Flaw Hunt → Distance</p>
              <p className="font-bold text-[#334B63]">🛡️ Your Defense Stack: Avoidance + Nitpicking + Emotional Shutdown</p>
            </div>
          </div>
        </div>

      </div>

      {/* ── PREMIUM OFFER BLOCK — full width ── */}
      {stage === "offer" && (
        <SabotagePremiumOffer result={result} />
      )}

      {stage === "free" && (
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <button
            onClick={() => setStage("offer")}
            className="w-full flex items-center justify-center gap-2 bg-[#086788] hover:bg-[#06AED5] text-white font-extrabold text-[18px] py-5 rounded-2xl transition-all duration-200 shadow-lg"
          >
            <Lock className="w-5 h-5" /> Unlock My Full Sabotage Blueprint — $12.99
          </button>
          <p className="text-center text-xs text-[#5E6E79] mt-3">100% money-back guarantee. Read the report. If it's not scarily accurate, we refund you.</p>
        </div>
      )}
    </div>
  );
}
