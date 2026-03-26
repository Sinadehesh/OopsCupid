"use client";
import React, { useRef, useEffect } from "react";
import { ShieldAlert, Eye, Clock, Heart, Zap, Lock, ArrowRight, Star, Search, Smartphone } from "lucide-react";

interface Props {
  data: {
    score: number;
    riskLevel: "SEVERE" | "ELEVATED" | "MODERATE";
    vectors: {
      digital: number;
      chronological: number;
      intimacy: number;
      micro: number;
    };
  };
  onUnlock: () => void;
  isGenerating: boolean;
}

const RISK_CONFIG = {
  SEVERE: {
    label: "High-Risk Profile Detected",
    subtitle: "Multiple deception vectors are active simultaneously.",
    advice: "The behavioral pattern you have described is consistent with active concealment. The combination of digital withdrawal, schedule changes, and emotional distancing is not coincidental — it is a coordinated response to something he is hiding.",
    heroBg: "bg-[#1a0a0a]",
    heroBorder: "border-rose-500/30",
    badgeColor: "bg-rose-500/20 border-rose-500/40 text-rose-300",
    barColor: "bg-rose-500",
  },
  ELEVATED: {
    label: "Suspicious Pattern Detected",
    subtitle: "Several behavioral markers align with deceptive concealment.",
    advice: "His behavior shows multiple overlapping patterns that warrant serious attention. While not every signal is conclusive on its own, the combination you are experiencing points strongly toward hidden activity. Trust your instincts — they are usually right.",
    heroBg: "bg-[#0f1520]",
    heroBorder: "border-amber-500/30",
    badgeColor: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    barColor: "bg-amber-500",
  },
  MODERATE: {
    label: "Low-Level Signals Present",
    subtitle: "Some patterns exist but may have alternative explanations.",
    advice: "The signals you've noticed are real, but they exist in a gray zone. Some could reflect stress, life changes, or emotional withdrawal rather than infidelity. The key question is whether these behaviors represent a change from his baseline — if yes, that matters.",
    heroBg: "bg-[#0a1020]",
    heroBorder: "border-indigo-500/30",
    badgeColor: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300",
    barColor: "bg-indigo-500",
  },
};

const VECTORS = [
  { key: "digital" as const, label: "Digital Footprint", icon: Smartphone, desc: "Phone secrecy, app switching, notification hiding" },
  { key: "chronological" as const, label: "Time & Schedule", icon: Clock, desc: "Unexplained absences, late returns, vague whereabouts" },
  { key: "intimacy" as const, label: "Emotional Intimacy", icon: Heart, desc: "Coldness, deflection, guilt projection onto you" },
  { key: "micro" as const, label: "Micro-Deceptions", icon: Search, desc: "Small lies, story inconsistencies, defensiveness" },
];

export default function InfidelityFreeResult({ data, onUnlock, isGenerating }: Props) {
  const paywallRef = useRef<HTMLDivElement>(null);
  const cfg = RISK_CONFIG[data.riskLevel];

  useEffect(() => {
    setTimeout(() => {
      paywallRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* ── FREE HERO ── */}
      <div className={`${cfg.heroBg} text-white rounded-[32px] p-8 md:p-12 mb-8 text-center shadow-2xl relative overflow-hidden border ${cfg.heroBorder}`}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border ${cfg.badgeColor}`}>
            <ShieldAlert className="w-4 h-4" /> Threat Level: {data.riskLevel}
          </div>

          {/* Score ring */}
          <div className="relative inline-flex items-center justify-center w-36 h-36 mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="44" fill="none"
                stroke={data.riskLevel === "SEVERE" ? "#f43f5e" : data.riskLevel === "ELEVATED" ? "#f59e0b" : "#6366f1"}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${data.score * 2.76} 276`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="text-center">
              <p className="text-5xl font-black text-white leading-none">{data.score}</p>
              <p className="text-white/40 text-xs font-black uppercase tracking-wider mt-1">/ 100</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">{cfg.label}</h2>
          <p className="text-white/60 text-lg font-medium mb-8">{cfg.subtitle}</p>

          <div className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/8 text-left">
            <p className="font-black text-white mb-2 uppercase tracking-wide text-xs">What This Means For You:</p>
            {cfg.advice}
          </div>
        </div>
      </div>

      {/* ── VECTOR BARS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {VECTORS.map(({ key, label, icon: Icon, desc }) => (
          <div key={key} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <Icon className="w-5 h-5 text-rose-500" /> {label}
              </h4>
              <span className="text-sm font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {data.vectors[key]}%
              </span>
            </div>
            <p className="text-slate-400 text-xs font-medium mb-4 leading-snug">{desc}</p>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`${cfg.barColor} h-full rounded-full transition-all duration-1000`}
                style={{ width: `${data.vectors[key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── RED FLAG COUNT ── */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-5 mx-auto">
          <Eye className="w-8 h-8 text-rose-600" />
        </div>
        <h4 className="font-extrabold text-xl text-slate-800 mb-2">Active Deception Signals</h4>
        <p className="text-slate-400 text-sm mb-7">Red blocks = confirmed behavioral anomaly detected in your responses.</p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {[...Array(12)].map((_, i) => {
            const flagCount = Math.round((data.score / 100) * 12);
            return (
              <div
                key={i}
                className={`w-6 h-14 rounded-lg transition-all duration-300 ${
                  i < flagCount
                    ? data.riskLevel === "SEVERE" ? "bg-rose-500 shadow-sm shadow-rose-200"
                    : data.riskLevel === "ELEVATED" ? "bg-amber-500 shadow-sm shadow-amber-200"
                    : "bg-indigo-500 shadow-sm shadow-indigo-200"
                    : "bg-slate-100"
                }`}
              />
            );
          })}
        </div>
        <p className={`text-sm font-black px-5 py-2 rounded-full inline-block ${
          data.riskLevel === "SEVERE" ? "text-rose-600 bg-rose-50"
          : data.riskLevel === "ELEVATED" ? "text-amber-600 bg-amber-50"
          : "text-indigo-600 bg-indigo-50"
        }`}>
          {Math.round((data.score / 100) * 12)} out of 12 anomalies flagged
        </p>
      </div>

      {/* ── PAYWALL ── */}
      <div ref={paywallRef} className="scroll-mt-8">

        {/* Transition strip */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 rounded-3xl p-6 mb-6 text-center shadow-lg">
          <p className="text-white font-black text-lg md:text-xl">
            ⬇️ Your surface-level scan ends here. The full investigation is below.
          </p>
        </div>

        {/* Paywall Card */}
        <div className="bg-[#0d0a12] rounded-[32px] p-8 md:p-12 shadow-2xl border border-rose-500/20 relative overflow-hidden">

          {/* Background glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/12 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-600/8 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-lg mx-auto text-center">

            {/* Lock icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-600 to-pink-700 shadow-2xl shadow-rose-500/30 mb-8">
              <Lock className="w-9 h-9 text-white" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" /> Full AI Investigation Report
            </div>

            {/* Headline */}
            <h3 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              You Deserve To Know<br />
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Exactly What He&apos;s Hiding.
              </span>
            </h3>

            <p className="text-white/55 font-medium text-base md:text-lg mb-10 leading-relaxed">
              Our AI generates a full investigation using your exact behavioral scores — his digital patterns, the confrontation script you should use today, and a 5-day action protocol written just for your situation.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 mb-10 text-left">
              {[
                { icon: "🔍", text: "AI verdict: paranoia or proof?" },
                { icon: "📱", text: "What he's doing on his phone" },
                { icon: "🕐", text: "His schedule anomalies decoded" },
                { icon: "💬", text: "Word-for-word confrontation script" },
                { icon: "🧠", text: "Why you feel like the problem" },
                { icon: "🗺️", text: "Your 5-day action protocol" },
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
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-4">Everything inside</p>
            <div className="space-y-2 mb-8">
              {[
                ["Full AI Infidelity Investigation Report", "€45"],
                ["Deception Signal Breakdown (12 markers)", "€30"],
                ["Word-for-word Confrontation Script", "€25"],
                ["His Digital Behavior Deep-Dive", "€20"],
                ["5-Day Action Protocol", "€15"],
              ].map(([item, val], i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/65 text-sm font-medium flex items-center gap-2">
                    <span className="text-rose-400 font-black">&#10003;</span> {item}
                  </span>
                  <span className="text-white/25 text-sm font-black line-through ml-4 shrink-0">{val}</span>
                </div>
              ))}
            </div>

            {/* Price block */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
              <p className="text-white/35 text-xs font-black uppercase tracking-widest mb-4">Total value: <span className="line-through">€135+</span></p>
              <div className="flex items-center justify-center gap-5">
                <div className="text-left">
                  <p className="text-white/30 text-sm font-black line-through">€135+</p>
                  <p className="text-[#ffbc42] text-xs font-black uppercase tracking-widest mt-1">One-time only</p>
                </div>
                <div className="text-6xl md:text-7xl font-black text-white leading-none">
                  €9<span className="text-rose-400">.99</span>
                </div>
                <div className="bg-rose-500 text-white text-sm font-black px-4 py-2 rounded-xl uppercase tracking-wider">
                  92%<br />OFF
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onUnlock}
              disabled={isGenerating}
              className="group w-full py-6 rounded-2xl font-black text-xl md:text-2xl text-white
                bg-gradient-to-r from-rose-600 to-pink-600
                hover:from-rose-500 hover:to-pink-500
                transition-all duration-200 shadow-xl shadow-rose-500/30
                flex items-center justify-center gap-3 mb-6
                disabled:opacity-70 active:scale-[0.98]"
            >
              {isGenerating ? (
                <><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating Your Report…</>
              ) : (
                <><Lock className="w-6 h-6 opacity-60" /> Reveal The Full Investigation <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" /></>
              )}
            </button>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex -space-x-1.5">
                {["bg-rose-500", "bg-pink-500", "bg-violet-500", "bg-rose-600"].map((c, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#0d0a12] ${c} flex items-center justify-center`}>
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-sm font-bold">4,800+ women got the truth this month</p>
            </div>

            <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
              Instant access · No subscription · Secure checkout
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
