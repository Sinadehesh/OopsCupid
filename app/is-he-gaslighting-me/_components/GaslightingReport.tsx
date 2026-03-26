"use client";
import React, { useState } from "react";
import { CloudFog, ShieldAlert, Activity, BrainCircuit, Lock, Zap, ArrowRight, Sparkles } from "lucide-react";
import GaslightingPremiumReport from "./GaslightingPremiumReport";

export default function GaslightingReport({ result }: { result: any }) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* ── FREE HERO ── */}
      <div className="bg-[#312E81] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#4F46E5]/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold tracking-widest mb-6 bg-rose-500/20 border border-rose-500/30 uppercase text-rose-300">
            <CloudFog className="w-4 h-4" /> Reality Check · Level {result.level}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Stop Doubting Yourself.</h2>
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-300 mb-6">{result.levelData.title}</h3>
          <p className="text-xl md:text-2xl italic text-indigo-200 font-medium mb-8 leading-snug">
            &quot;{result.levelData.subtitle.split("|")[1]?.trim() || result.levelData.subtitle}&quot;
          </p>
          <div className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 text-left">
            <p className="font-extrabold text-white mb-2 uppercase tracking-wide text-sm">The Brutal Truth:</p>
            {result.levelData.advice}
          </div>
        </div>
      </div>

      {/* ── FREE BARS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><BrainCircuit className="text-indigo-600" /> The Mind Games</h4>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{result.tacticsScore} / 160</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 flex-grow">How often he denies facts, invalidates your feelings, and twists the story so it is always your fault.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mt-auto">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.tacticsScore / 160) * 100}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2"><Activity className="text-violet-600" /> The Mental Erosion</h4>
            <span className="text-sm font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{result.impactScore} / 40</span>
          </div>
          <p className="text-slate-500 text-sm mb-6 flex-grow">Damage done to your confidence. A high score means constantly walking on eggshells and feeling like you are losing your mind.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden mt-auto">
            <div className="bg-violet-600 h-full rounded-full transition-all duration-1000" style={{ width: `${(result.impactScore / 40) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* ── FREE SUBSCALES ── */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
        <h4 className="font-extrabold text-2xl text-slate-800 mb-2">Specific Manipulation Tactics</h4>
        <p className="text-slate-500 text-sm mb-8">The exact methods detected in your responses.</p>
        <div className="space-y-6">
          {result.subscales.map((s: any) => (
            <div key={s.key}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">{s.label}</span>
                <span className="text-slate-500 font-extrabold">{Math.round(s.pct)}% Risk</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000 delay-300" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FREE RED FLAGS ── */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 text-center">
        <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <ShieldAlert className="w-8 h-8 text-rose-600" />
        </div>
        <h4 className="font-extrabold text-xl text-slate-800 mb-2">Danger Zone Markers</h4>
        <p className="text-slate-500 text-sm mb-6">Red blocks = severe reality-denial detected.</p>
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`w-5 h-12 rounded-[4px] ${i < result.criticalFlags ? "bg-rose-500 shadow-sm" : "bg-slate-100"}`} />
          ))}
        </div>
        <p className="text-sm font-extrabold text-rose-600 bg-rose-50 px-4 py-2 rounded-full inline-block">{result.criticalFlags} out of 10 red flags detected</p>
      </div>

      {/* ── PREMIUM SECTION ── */}
      {isPremiumUnlocked ? (
        <GaslightingPremiumReport result={result} />
      ) : (
        /* ── PAYWALL GATE ── */
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
          {/* Ghost content */}
          <div className="pointer-events-none select-none blur-[6px] opacity-25 p-10 bg-[#0c1120] space-y-5">
            <div className="h-8 bg-white/20 rounded-xl w-1/2" />
            <div className="h-40 bg-white/10 rounded-2xl" />
            <div className="h-5 bg-white/15 rounded-lg w-full" />
            <div className="h-5 bg-white/10 rounded-lg w-4/5" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-white/10 rounded-2xl" />
              <div className="h-32 bg-white/10 rounded-2xl" />
            </div>
            <div className="h-5 bg-white/15 rounded-lg w-full" />
            <div className="h-5 bg-white/10 rounded-lg w-5/6" />
            <div className="h-20 bg-white/8 rounded-2xl" />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1120]/70 via-[#0c1120]/92 to-[#0c1120]" />

          {/* CTA CARD */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-lg">
              {/* Glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-violet-600 to-rose-500 rounded-[36px] blur-xl opacity-40" />
              <div className="relative bg-[#0c1120] border border-white/10 rounded-[28px] p-8 md:p-10 text-center overflow-hidden">
                <Sparkles className="absolute top-3 right-4 w-24 h-24 text-white/4 pointer-events-none" />

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute w-16 h-16 rounded-full bg-indigo-500/20 blur-xl" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  <Zap className="w-3.5 h-3.5" /> Full Reality Defense Report
                </div>

                {/* Headline */}
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                  You Deserve The Full<br />
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    Truth About What&apos;s Happening
                  </span>
                </h3>
                <p className="text-white/50 font-medium text-sm md:text-base mb-7 leading-relaxed max-w-sm mx-auto">
                  AI-powered personalized analysis of every tactic used on you, your erosion profile, exact scripts to shut it down, and a complete escape plan.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-7">
                  {[
                    "AI breakdown of every tactic",
                    "Your erosion severity profile",
                    "Population percentile context",
                    "Personalized escape roadmap",
                    "\"Shut It Down\" script templates",
                    "Healthy relationship benchmark",
                  ].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/10 text-white/75 text-xs font-bold px-3 py-1.5 rounded-full">
                      <span className="w-3.5 h-3.5 rounded-full bg-indigo-400/40 text-indigo-300 flex items-center justify-center text-[9px] font-black shrink-0">✓</span>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="border-t border-white/8 mb-7" />

                {/* Value stack teaser */}
                <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">What you&apos;re unlocking — total value</p>
                <div className="space-y-1.5 text-left mb-6">
                  {[
                    ["AI Reality Defense Report", "€40"],
                    ["Gaslighting Playbook PDF", "€30"],
                    ["\"Shut It Down\" Script Pack", "€20"],
                    ["Healthy Man Benchmark Guide", "€25"],
                    ["7-Day Clarity Protocol", "€15"],
                  ].map(([item, val], i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-white/60 text-xs font-bold flex items-center gap-1.5">
                        <span className="text-indigo-400 text-[10px]">✓</span> {item}
                      </span>
                      <span className="text-white/30 text-xs font-black line-through">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-center gap-4 mb-7">
                  <div className="text-right">
                    <p className="text-xs font-black text-white/25 line-through">€130+ value</p>
                    <p className="text-xs font-black text-[#ffbc42] uppercase tracking-widest">One-time only</p>
                  </div>
                  <div className="text-6xl font-black text-white leading-none">
                    €12<span className="text-indigo-400">.99</span>
                  </div>
                  <div className="bg-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    90% off
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setIsPremiumUnlocked(true)}
                  className="group relative w-full py-5 rounded-2xl font-black text-xl text-white overflow-hidden
                    bg-gradient-to-r from-indigo-600 to-violet-600
                    hover:from-violet-600 hover:to-indigo-600
                    transition-all duration-300 shadow-lg shadow-indigo-500/25
                    flex items-center justify-center gap-3">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Lock className="w-5 h-5 opacity-70" />
                  Unlock My Full Report
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Social proof */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <div className="flex -space-x-2">
                    {["#4F46E5","#7C3AED","#db2777"].map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0c1120] flex items-center justify-center text-[9px] font-black text-white"
                        style={{ backgroundColor: c }}>★</div>
                    ))}
                  </div>
                  <p className="text-white/35 text-xs font-bold">3,100+ women got clarity this month</p>
                </div>

                <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-4">
                  Instant access · No subscription · Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
