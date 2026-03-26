"use client";
import React, { useState } from "react";
import { Bomb, ShieldAlert, Activity, HeartCrack, Lock, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import SabotagePremiumReport from "./SabotagePremiumReport";

export default function SabotageReport({ result }: { result: any }) {
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* ── FREE HERO CARD (always visible) ── */}
      <div className="bg-[#0F172A] text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border border-[#334155]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-3xl -z-0" />
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

      {/* ── FREE COMPOSITES (always visible) ── */}
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
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#086788] shadow-2xl">

          {/* Blurred preview of what's behind */}
          <div className="pointer-events-none select-none blur-sm opacity-40 p-10 bg-[#fff1d0] space-y-6">
            <div className="h-10 bg-[#086788]/20 rounded-xl w-2/3" />
            <div className="h-48 bg-[#086788]/10 rounded-2xl" />
            <div className="h-6 bg-[#086788]/20 rounded-xl w-full" />
            <div className="h-6 bg-[#086788]/15 rounded-xl w-4/5" />
            <div className="h-6 bg-[#086788]/10 rounded-xl w-3/4" />
            <div className="h-32 bg-[#dd1c1a]/10 rounded-2xl" />
            <div className="h-6 bg-[#086788]/20 rounded-xl w-full" />
            <div className="h-6 bg-[#086788]/15 rounded-xl w-5/6" />
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6
            bg-gradient-to-b from-[#fff1d0]/60 via-[#fff1d0]/90 to-[#fff1d0]">

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-[#086788] max-w-lg w-full">
              <div className="w-16 h-16 rounded-2xl bg-[#086788] flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#dd1c1a]/10 text-[#dd1c1a] text-xs font-black
                uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                <Zap className="w-3.5 h-3.5" /> Full Deep-Dive Report
              </div>
              <h3 className="text-3xl font-black text-[#086788] mb-3 leading-tight">
                Unlock Your Complete<br />Behavioral Blueprint
              </h3>
              <p className="text-[#086788]/70 font-medium text-base mb-6 leading-relaxed">
                Get the full AI-powered analysis — personalized explanations for every chart, your core wound, population context, playbook recommendations, and your exact action plan.
              </p>

              {/* What you get */}
              <ul className="text-left space-y-2 mb-8">
                {[
                  "AI-written explanation for every graph & chart",
                  "Your core wound + childhood root analysis",
                  "Population percentile bell curve + context",
                  "5-axis radar breakdown with personalized insights",
                  "Exact action plan tailored to your archetype",
                  "Playbook recommendations based on your scores",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold text-[#086788]">
                    <span className="w-5 h-5 rounded-full bg-[#06aed5]/20 text-[#06aed5] flex items-center justify-center text-xs font-black shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-5xl font-black text-[#086788]">€6.99</span>
                <div className="text-left">
                  <p className="text-xs font-black text-[#086788]/35 line-through">€19.99</p>
                  <p className="text-xs font-black text-[#dd1c1a] uppercase tracking-widest">One-time only</p>
                </div>
              </div>

              {/* CTA — swap onClick for Stripe later */}
              <button
                onClick={() => setIsPremiumUnlocked(true)}
                className="w-full py-5 bg-[#086788] hover:bg-[#06aed5] text-white rounded-xl font-black text-xl
                  flex items-center justify-center gap-3 transition-all shadow-lg hover:-translate-y-0.5">
                Unlock Full Report <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-xs font-bold text-[#086788]/30 uppercase tracking-widest mt-4">
                Instant access · No subscription · Secure checkout
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
