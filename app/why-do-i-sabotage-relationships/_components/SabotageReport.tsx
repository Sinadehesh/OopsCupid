"use client";
import React, { useState } from "react";
import { Bomb, ShieldAlert, Activity, HeartCrack, Lock, Zap, ArrowRight, Sparkles, Brain, Star } from "lucide-react";
import Link from "next/link";
import SabotagePremiumReport from "./SabotagePremiumReport";

export default function SabotageReport({ result }: { result: any }) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* ── FREE HERO CARD ── */}
      <div className="bg-[#0F172A] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#334155]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#086788]/15 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 backdrop-blur-sm border border-white/20 uppercase text-rose-200">
            <Bomb className="w-4 h-4" /> Level {result.level}: {result.levelData.title}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Your Archetype: <span className="text-rose-400">{result.archetype}</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-medium mb-8">&quot;{result.levelData.subtitle}&quot;</p>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
            {result.levelData.advice}
          </p>
        </div>
      </div>

      {/* ── FREE COMPOSITES ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2">
              <Activity className="text-rose-500" /> Anxious Pattern
            </h4>
            <span className="text-sm font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              {result.composites.anxiousPattern} / 80
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-4">Driven by hypervigilance, testing, and fear of abandonment.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${(result.composites.anxiousPattern / 80) * 100}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-xl text-slate-800 flex items-center gap-2">
              <ShieldAlert className="text-slate-500" /> Avoidant Pattern
            </h4>
            <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {result.composites.avoidantPattern} / 80
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-4">Driven by distancing, emotional shutdown, and fear of engulfment.</p>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
            <div className="bg-slate-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${(result.composites.avoidantPattern / 80) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h4 className="font-extrabold text-2xl text-slate-800 mb-6">Your Behavioral Drivers</h4>
          <div className="space-y-5">
            {result.subscales.map((s: any) => (
              <div key={s.key}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-slate-700">{s.label}</span>
                  <span className="text-slate-500 font-medium">{Math.round(s.pct)}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-1000 delay-300"
                    style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
          <h4 className="font-extrabold text-xl text-slate-800 mb-6">Internal vs External</h4>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-slate-600">Vulnerability (Internal)</span>
              <span className="text-slate-500">{Math.round((result.composites.vulnerabilityScore / 80) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-pink-400 h-full rounded-full"
                style={{ width: `${(result.composites.vulnerabilityScore / 80) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">Your sensitivity to rejection and unworthiness.</p>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-bold text-slate-600">Defense (External Actions)</span>
              <span className="text-slate-500">{Math.round((result.composites.defenseScore / 120) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-slate-700 h-full rounded-full"
                style={{ width: `${(result.composites.defenseScore / 120) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">How much you act out, test, or withdraw.</p>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100 shadow-sm text-center mb-8">
        <HeartCrack className="w-10 h-10 text-rose-500 mx-auto mb-4" />
        <h4 className="font-bold text-slate-800 mb-4 text-xl">The Bottom Line</h4>
        <p className="text-slate-600 text-lg leading-relaxed">
          The strongest signal in your results is not that you simply &quot;don&apos;t care.&quot; Your primary triggers are{" "}
          <strong>{result.topDrivers[0].label.toLowerCase()}</strong> and{" "}
          <strong>{result.topDrivers[1].label.toLowerCase()}</strong>. You sabotage when closeness or uncertainty starts to feel fundamentally unsafe.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/attachment-style-quiz"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors">
            Find Your Attachment Style
          </Link>
          <Link href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
            Read Sabotage Resources
          </Link>
        </div>
      </div>

      {/* ── PREMIUM SECTION ── */}
      {isPremiumUnlocked ? (
        <SabotagePremiumReport result={result} />
      ) : (
        /* ── PAYWALL GATE ── */
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl">

          {/* Blurred ghost content behind */}
          <div className="pointer-events-none select-none blur-[6px] opacity-30 p-10 bg-[#0c1a2e] space-y-5">
            <div className="h-8 bg-white/20 rounded-xl w-1/2" />
            <div className="h-40 bg-white/10 rounded-2xl" />
            <div className="h-5 bg-white/15 rounded-lg w-full" />
            <div className="h-5 bg-white/10 rounded-lg w-4/5" />
            <div className="h-5 bg-white/8 rounded-lg w-3/4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-28 bg-white/10 rounded-2xl" />
              <div className="h-28 bg-white/10 rounded-2xl" />
            </div>
            <div className="h-5 bg-white/15 rounded-lg w-full" />
            <div className="h-5 bg-white/10 rounded-lg w-5/6" />
          </div>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a2e]/70 via-[#0c1a2e]/92 to-[#0c1a2e]" />

          {/* CTA CARD */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-lg">

              {/* Glow ring behind card */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#06aed5] via-[#086788] to-[#dd1c1a] rounded-[36px] blur-xl opacity-40" />

              <div className="relative bg-[#0c1a2e] border border-white/10 rounded-[28px] p-8 md:p-10 text-center overflow-hidden">

                {/* Background sparkle decoration */}
                <Sparkles className="absolute top-3 right-4 w-24 h-24 text-white/4 pointer-events-none" />
                <Sparkles className="absolute -bottom-4 -left-4 w-20 h-20 text-[#06aed5]/10 pointer-events-none rotate-45" />

                {/* Brain icon with glow */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute w-16 h-16 rounded-full bg-[#06aed5]/20 blur-xl" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#086788] to-[#06aed5] flex items-center justify-center shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#dd1c1a]/20 border border-[#dd1c1a]/30 text-[#ff6b6b] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  <Zap className="w-3.5 h-3.5" /> Full Deep-Dive Report
                </div>

                {/* Headline */}
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                  Unlock Your Complete<br />
                  <span className="bg-gradient-to-r from-[#06aed5] to-[#f0c808] bg-clip-text text-transparent">
                    Behavioral Blueprint
                  </span>
                </h3>
                <p className="text-white/55 font-medium text-sm md:text-base mb-7 leading-relaxed max-w-sm mx-auto">
                  AI-powered analysis — personalized explanations for every chart, your core wound, and your exact action plan.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {[
                    "AI explanation per chart",
                    "Core wound analysis",
                    "Bell curve percentile",
                    "5-axis radar insights",
                    "Personalized action plan",
                    "Playbook recommendations",
                  ].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/10 text-white/75 text-xs font-bold px-3 py-1.5 rounded-full">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#06aed5]/40 text-[#06aed5] flex items-center justify-center text-[9px] font-black shrink-0">✓</span>
                      {item}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/8 mb-7" />

                {/* Price block */}
                <div className="flex items-center justify-center gap-4 mb-7">
                  <div className="text-right">
                    <p className="text-xs font-black text-white/25 line-through">€19.99</p>
                    <p className="text-xs font-black text-[#f0c808] uppercase tracking-widest">One-time only</p>
                  </div>
                  <div className="text-6xl font-black text-white leading-none">
                    €6<span className="text-[#06aed5]">.99</span>
                  </div>
                  <div className="bg-[#dd1c1a] text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    65% off
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setIsPremiumUnlocked(true)}
                  className="group relative w-full py-5 rounded-2xl font-black text-xl text-white overflow-hidden
                    bg-gradient-to-r from-[#086788] to-[#06aed5]
                    hover:from-[#06aed5] hover:to-[#086788]
                    transition-all duration-300 shadow-lg shadow-[#06aed5]/20
                    flex items-center justify-center gap-3">
                  {/* Shimmer sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Lock className="w-5 h-5 opacity-70" />
                  Unlock Full Report
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Social proof mini row */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <div className="flex -space-x-2">
                    {["#086788","#dd1c1a","#f0c808"].map((c,i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0c1a2e] flex items-center justify-center text-[9px] font-black text-white"
                        style={{ backgroundColor: c }}>{'★'}</div>
                    ))}
                  </div>
                  <p className="text-white/35 text-xs font-bold">Joined by 2,400+ people this month</p>
                </div>

                {/* Trust line */}
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
