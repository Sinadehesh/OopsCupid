"use client";
import React, { useState, useEffect } from "react";
import { Download, ShieldAlert, EyeOff, Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * Score-aware, per-tactic analysis. Each of the four control tactics has
 * its own explanation at each severity band — no shared sentences, and
 * the verdict never asserts more than the scores support.
 */
const CATEGORY_INSIGHTS: Record<string, { name: string; high: string; mid: string; low: string }> = {
  gaslighting: {
    name: "Reality Distortion (Gaslighting)",
    high: "Your answers show a consistent pattern of him denying events, rewriting arguments, and treating your memory as the problem. This is the tactic doing the most damage: it converts every disagreement about his behavior into a debate about your sanity. Start a private, dated log of key conversations — not to confront him with, but to protect your own reality from revision.",
    mid: "You reported meaningful reality-bending — occasional flat denials or 'that never happened' moments — but not yet a wall-to-wall pattern. Watch one thing: does he distort under pressure (bad sign, defensive habit) or systematically, even about trivial things (worse sign, control strategy)?",
    low: "Reality distortion is not a significant feature of your answers. Disagreements about what happened appear to stay disagreements — your memory itself isn't being put on trial.",
  },
  isolation: {
    name: "Isolation Tactics",
    high: "The pattern here is strong: your answers describe steady pressure that shrinks your world — friction about friends, family cast as intruders, guilt attached to time spent away from him. Isolation is the load-bearing wall of control; every other tactic gets stronger as your outside witnesses disappear. Reconnect with one person this week, before it feels even harder.",
    mid: "There's real pull toward isolation in your answers — perhaps discomfort or sulking when you prioritize others — though you still have your own orbit. The test: announce a plan with friends and observe the cost he attaches to it. Punishment-by-mood after independent plans is the tell.",
    low: "Your answers don't show meaningful isolation pressure. Your access to friends, family, and your own life appears intact — protect that; it's the immune system of a relationship.",
  },
  emotional_extortion: {
    name: "Emotional Extortion",
    high: "You scored high on compliance-through-fear: guilt campaigns, the silent treatment as punishment, or threats designed to make 'no' too expensive. Notice what this has trained you to do — you likely pre-edit requests and confess to things you didn't do just to end the tension. That reflex is the measurable cost of this tactic.",
    mid: "There's a visible lever here — guilt or withdrawal shows up when he doesn't get his way — but it isn't yet the primary currency of the relationship. Track whether apologies flow one direction only; one-way apology traffic is how extortion becomes routine.",
    low: "Emotional extortion doesn't register strongly in your answers. Conflict seems to end in resolution rather than in punishment, which is the single healthiest signal in this report.",
  },
  intermittent_reinforcement: {
    name: "Intermittent Reinforcement",
    high: "This is your highest-risk finding: your answers describe a cruelty-then-affection cycle. Unpredictable reward is the most addictive schedule known to behavioral science — the lows make the highs feel like rescue, and the person hurting you becomes the person soothing you. If leaving feels chemically impossible, this cycle, not love, is usually why.",
    mid: "Your answers show some hot-and-cold cycling — enough to keep you guessing, not yet a full addiction loop. The diagnostic question: do you feel relief when he's kind, or joy? Relief means the kindness is functioning as the end of a punishment.",
    low: "The affection in this relationship appears consistent rather than cyclical. Whatever else is going on, you don't seem to be on the slot-machine schedule that makes toxic bonds so hard to break.",
  },
};

const VERDICTS: Record<string, string> = {
  SEVERE: "Your combined scores sit in the range where these behaviors stop looking like moods and start looking like a system. You cannot 'communicate' your way out of a system — the tactics below explain what each part of it is doing, and the decoder shows you the scripts it runs on.",
  ELEVATED: "Several control tactics register clearly in your answers. No single one is conclusive, but their overlap is what deserves your attention — coincidences don't usually coordinate. The breakdown below shows exactly where the pressure concentrates.",
  MODERATE: "Your scores land in ambiguous territory: real friction, some concerning moments, but not a consistent control pattern. The most useful thing you can do is compare this snapshot against his baseline — a recent shift matters far more than the absolute numbers.",
};

const band = (pct: number) => (pct >= 65 ? "high" : pct >= 40 ? "mid" : "low") as "high" | "mid" | "low";

const BAND_CHIP = {
  high: { label: "Active pattern", cls: "bg-rose-600 text-white", icon: AlertTriangle },
  mid: { label: "Emerging pattern", cls: "bg-amber-500 text-white", icon: Activity },
  low: { label: "Low signal", cls: "bg-emerald-600 text-white", icon: CheckCircle2 },
};

export default function ManipulationMasterReport({ data }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const rawScorePercent = data?.overall?.percent ?? 50;
  const riskLevel: string = data?.overall?.severity ?? "MODERATE";

  const matrix = (["gaslighting", "isolation", "emotional_extortion", "intermittent_reinforcement"] as const).map(
    (key) => {
      const score = data?.categories?.[key]?.percent ?? 0;
      const insight = CATEGORY_INSIGHTS[key];
      const b = band(score);
      return { key, score, b, name: insight.name, text: insight[b] };
    }
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans bg-[#f8fafc] overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 print:hidden animate-in fade-in slide-in-from-top-8 duration-700">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-600" /> Manipulation Dossier
          </h1>
          <p className="text-slate-500 font-medium ml-11">Full tactical breakdown of your screening results</p>
        </div>
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* HERO: COERCION GAUGE */}
      <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-16 mb-16 shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden animate-in zoom-in-95 duration-1000">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-48 h-48 relative flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-indigo-500 stroke-current transition-all duration-[2000ms] ease-out drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${mounted ? rawScorePercent : 0}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-indigo-400 drop-shadow-lg">{rawScorePercent}%</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold mt-1 tracking-widest">Coercion Index</span>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-black text-indigo-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Risk Level: {riskLevel}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-2xl">What Your Scores Mean</h3>
            <p className="text-xl text-slate-300 font-medium leading-relaxed bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
              {VERDICTS[riskLevel] ?? VERDICTS.MODERATE}
            </p>
          </div>
        </div>
      </div>

      {/* THE CONTROL MATRIX — score-aware, tactic-specific */}
      <div className="mb-20 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-100">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-indigo-600" /> The 4-Point Control Matrix
        </h3>
        <p className="text-lg text-slate-500 font-medium mb-8 max-w-3xl">
          Each tactic is scored from your answers and explained at YOUR level — not a generic warning. Green means genuinely low signal; that finding matters as much as the red ones.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matrix.map((vec) => {
            const chip = BAND_CHIP[vec.b];
            const ChipIcon = chip.icon;
            return (
              <div key={vec.key} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h4 className="font-black text-xl text-slate-800">{vec.name}</h4>
                  <span className={`${chip.cls} inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                    <ChipIcon className="w-3.5 h-3.5" /> {chip.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 bg-slate-100 rounded-full h-3 shadow-inner overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-[2000ms] ease-out ${vec.b === "high" ? "bg-rose-500" : vec.b === "mid" ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: mounted ? `${vec.score}%` : "0%" }}
                    />
                  </div>
                  <span className="text-sm font-black text-slate-600 tabular-nums w-11 text-right">{vec.score}%</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">{vec.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* THE SANITY-THEFT DECODER */}
      <div className="mb-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 flex justify-center items-center gap-3">
            <EyeOff className="w-10 h-10 text-slate-900" /> The &ldquo;Sanity-Theft&rdquo; Decoder
          </h3>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Word-for-word translations of the three most common control phrases — so you can hear what they actually do.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: '"You are too sensitive"', desc: 'Translation: "I am going to condition you to accept my behavior by convincing you that your completely normal reaction is a character flaw." Your sensitivity is the alarm system — this phrase exists to unplug it.' },
            { num: 2, title: '"I never said that"', desc: 'Translation: "If I deny it confidently enough, you will doubt your own memory instead of my honesty." Said occasionally, it’s defensiveness. Said reliably whenever you raise something, it’s gaslighting.' },
            { num: 3, title: '"After everything I do for you"', desc: 'Translation: "I am converting past favors into current debt so that your no becomes too expensive." Generosity with a ledger attached was never generosity — it was a down payment on compliance.' },
          ].map((step) => (
            <div key={step.num} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-slate-900 hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-lg">{step.num}</div>
              <h4 className="font-black text-xl text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer ladder + coaching are appended by the premium page itself. */}
    </div>
  );
}
