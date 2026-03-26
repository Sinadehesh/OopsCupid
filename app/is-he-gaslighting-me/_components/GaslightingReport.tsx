"use client";
import React, { useState, useRef, useEffect } from "react";
import { CloudFog, ShieldAlert, Activity, BrainCircuit, Lock, Zap, ArrowRight, Sparkles, Star } from "lucide-react";
import GaslightingPremiumReport from "./GaslightingPremiumReport";

export default function GaslightingReport({ result }: { result: any }) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const paywallRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to paywall when it mounts
  useEffect(() => {
    if (!isPremiumUnlocked && paywallRef.current) {
      setTimeout(() => {
        paywallRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, [isPremiumUnlocked]);

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
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10 text-center">
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
        <p className="text-sm font-extrabold text-rose-600 bg-rose-50 px-4 py-2 rounded-full inline-block">
          {result.criticalFlags} out of 10 red flags detected
        </p>
      </div>

      {/* ── PREMIUM SECTION ── */}
      {isPremiumUnlocked ? (
        <GaslightingPremiumReport result={result} />
      ) : (
        <div ref={paywallRef} className="scroll-mt-8">

          {/* Transition strip */}
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 rounded-3xl p-6 mb-6 text-center shadow-lg">
            <p className="text-white font-black text-lg md:text-xl">
              ⬇️ Your free snapshot ends here. The full picture is below.
            </p>
          </div>

          {/* Paywall Card */}
          <div className="bg-[#0c1120] rounded-[32px] p-8 md:p-12 shadow-2xl border border-indigo-500/30 relative overflow-hidden">

            {/* Background glows — inside the card, not outside it */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-600/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto text-center">

              {/* Lock icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl shadow-indigo-500/30 mb-8">
                <Lock className="w-9 h-9 text-white" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" /> Full AI Reality Defense Report
              </div>

              {/* Headline */}
              <h3 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
                You Deserve The Full Truth<br />
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  About What&apos;s Happening To You.
                </span>
              </h3>

              <p className="text-white/55 font-medium text-base md:text-lg mb-10 leading-relaxed">
                AI-written, personalized breakdown of every tactic used on you. Your unique erosion profile. Exact copy-paste scripts to shut it down. A complete step-by-step escape plan.
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-2 gap-3 mb-10 text-left">
                {[
                  { icon: "🧠", text: "AI breakdown of every tactic" },
                  { icon: "📊", text: "Your erosion severity profile" },
                  { icon: "📈", text: "Population percentile context" },
                  { icon: "🗺️", text: "Personalized escape roadmap" },
                  { icon: "💬", text: '"Shut It Down" script templates' },
                  { icon: "💚", text: "Healthy relationship benchmark" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-2xl p-4">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-white/80 text-sm font-bold leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/8 mb-8" />

              {/* Value stack */}
              <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-4">Everything you&apos;re unlocking</p>
              <div className="space-y-2 mb-8">
                {[
                  ["AI Reality Defense Report (personalized)", "€40"],
                  ["Gaslighting Tactics Breakdown", "€30"],
                  ['"Shut It Down" Script Pack (12 templates)', "€20"],
                  ["Healthy Man Benchmark Guide", "€25"],
                  ["7-Day Clarity Protocol", "€15"],
                ].map(([item, val], i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/65 text-sm font-medium flex items-center gap-2">
                      <span className="text-indigo-400 font-black">&#10003;</span> {item}
                    </span>
                    <span className="text-white/25 text-sm font-black line-through ml-4 shrink-0">{val}</span>
                  </div>
                ))}
              </div>

              {/* Price block */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
                <p className="text-white/35 text-xs font-black uppercase tracking-widest mb-3">Total value: <span className="line-through">€130+</span></p>
                <div className="flex items-center justify-center gap-5">
                  <div className="text-left">
                    <p className="text-white/30 text-sm font-black line-through">€130+</p>
                    <p className="text-[#ffbc42] text-xs font-black uppercase tracking-widest">One-time only</p>
                  </div>
                  <div className="text-6xl md:text-7xl font-black text-white leading-none">
                    €12<span className="text-indigo-400">.99</span>
                  </div>
                  <div className="bg-rose-500 text-white text-sm font-black px-4 py-2 rounded-xl uppercase tracking-wider">
                    90%<br />OFF
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsPremiumUnlocked(true)}
                className="group w-full py-6 rounded-2xl font-black text-xl md:text-2xl text-white
                  bg-gradient-to-r from-indigo-600 to-violet-600
                  hover:from-indigo-500 hover:to-violet-500
                  transition-all duration-200 shadow-xl shadow-indigo-500/30
                  flex items-center justify-center gap-3 mb-6
                  active:scale-[0.98]"
              >
                <Lock className="w-6 h-6 opacity-60" />
                Unlock My Full Report
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="flex -space-x-1.5">
                  {["bg-indigo-500", "bg-violet-500", "bg-pink-500", "bg-rose-500"].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#0c1120] ${c} flex items-center justify-center`}>
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-sm font-bold">3,100+ women got clarity this month</p>
              </div>

              <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
                Instant access · No subscription · Secure checkout
              </p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
