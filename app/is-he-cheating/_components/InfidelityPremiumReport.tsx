"use client";
import React, { useState, useEffect } from "react";
import {
  ShieldAlert, Lock, Smartphone, Clock, Heart, Search,
  Eye, Zap, AlertTriangle, Brain, MessageSquare, Target,
  TrendingUp, ChevronDown, Star, ArrowRight, CheckCircle2
} from "lucide-react";

interface ReportData {
  score: number;
  riskLevel: "SEVERE" | "ELEVATED" | "MODERATE";
  email: string;
  vectors: {
    digital: number;
    chronological: number;
    intimacy: number;
    micro: number;
  };
}

const RISK_CFG = {
  SEVERE: {
    label: "High-Risk — Active Concealment",
    color: "rose",
    accent: "#f43f5e",
    bg: "bg-[#1a0608]",
    border: "border-rose-500/30",
    badge: "bg-rose-500/20 border-rose-500/40 text-rose-300",
    bar: "bg-rose-500",
    gradient: "from-rose-600 to-pink-600",
    verdict: "The behavioral fingerprint you've submitted is consistent with active concealment. Multiple deception vectors are operating simultaneously — digital withdrawal, schedule evasion, and intimacy suppression rarely co-occur without a coordinating cause.",
    urgency: "Act within the next 7 days. Patterns this dense typically accelerate.",
  },
  ELEVATED: {
    label: "Elevated Risk — Suspicious Pattern",
    color: "amber",
    accent: "#f59e0b",
    bg: "bg-[#110e02]",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    bar: "bg-amber-500",
    gradient: "from-amber-500 to-orange-600",
    verdict: "Several behavioral markers in your responses align with concealment patterns. While no single signal is conclusive, their overlap crosses the threshold of coincidence. Trust the pattern, not each isolated event.",
    urgency: "Patterns at this level tend to escalate if not addressed directly.",
  },
  MODERATE: {
    label: "Moderate Signals — Gray Zone",
    color: "indigo",
    accent: "#6366f1",
    bg: "bg-[#060818]",
    border: "border-indigo-500/30",
    badge: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300",
    bar: "bg-indigo-500",
    gradient: "from-indigo-500 to-violet-600",
    verdict: "The signals you've reported are real but exist in ambiguous territory. Stress, life transitions, or emotional withdrawal can mimic infidelity signals. The critical question: are these a change from his baseline behavior? A shift matters far more than the absolute level.",
    urgency: "Monitor over 30 days and compare against his prior baseline.",
  },
};

const VECTORS = [
  {
    key: "digital" as const,
    icon: Smartphone,
    label: "Digital Behavior",
    desc: "Phone secrecy, app-switching, notification hiding, passcode changes",
    insight: {
      high: "Screen-facing avoidance and sudden passcode changes are the #1 behavioral tell identified in post-disclosure research. He is creating a digital perimeter.",
      mid: "Some digital guardedness is present. It may reflect privacy preferences, but combined with other signals it warrants attention.",
      low: "Digital patterns appear within normal range.",
    },
  },
  {
    key: "chronological" as const,
    icon: Clock,
    label: "Time & Schedule",
    desc: "Unexplained absences, vague whereabouts, late arrivals, new routines",
    insight: {
      high: "Unexplained time gaps are where the parallel life lives. A person with nothing to hide has no reason to leave time unaccounted for.",
      mid: "Schedule changes are visible but not extreme. Look for whether explanations feel rehearsed vs. spontaneous.",
      low: "Time patterns appear consistent and accounted for.",
    },
  },
  {
    key: "intimacy" as const,
    icon: Heart,
    label: "Emotional Intimacy",
    desc: "Coldness, deflection, DARVO patterns, guilt projection, disconnection",
    insight: {
      high: "Emotional withdrawal and guilt-flipping (making you feel like the problem) are active defense mechanisms. He is protecting himself from closeness because closeness would require honesty.",
      mid: "Emotional distance is present. This could reflect relationship strain, depression, or concealment — context is key.",
      low: "Emotional connection appears largely intact.",
    },
  },
  {
    key: "micro" as const,
    icon: Search,
    label: "Micro-Deceptions",
    desc: "Small inconsistencies, story drift, over-explaining, defensiveness",
    insight: {
      high: "Micro-deceptions compound. Each small lie requires maintenance — over time the story drifts. The defensiveness you're triggering by asking normal questions is itself a signal: innocent people don't experience ordinary questions as attacks.",
      mid: "Some story inconsistencies noted. Pay attention to whether explanations expand or contract when questioned directly.",
      low: "Narrative consistency appears mostly intact.",
    },
  },
];

function getInsight(score: number, insight: { high: string; mid: string; low: string }) {
  if (score >= 65) return insight.high;
  if (score >= 40) return insight.mid;
  return insight.low;
}

const CONFRONTATION_SCRIPTS: Record<"SEVERE" | "ELEVATED" | "MODERATE", string[]> = {
  SEVERE: [
    '"I need to talk to you about something that has been clear to me for a while. I'm not here to argue. I'm here because I deserve honesty, and I'm going to ask you directly: what have you been hiding from me?"',
    '"The changes in your behavior — the phone, the schedule, the distance — I've been watching and documenting. I'm not asking you to confess. I'm telling you that I already know something is wrong, and I need you to be honest with me right now."',
    '"If there's nothing happening, you will be able to answer my questions calmly and openly. I need you to prove that to me, not just tell me."',
  ],
  ELEVATED: [
    '"I've noticed changes in how you've been acting over the past few weeks. I'm not trying to start a fight — I'm trying to understand. Can we have an honest conversation about where you're at?"',
    '"I feel like there's distance between us that wasn't there before. I need to know if something is going on, because your behavior has changed and I can't pretend I haven't noticed."',
  ],
  MODERATE: [
    '"Something feels different between us lately. I'm not accusing you of anything. I just want to check in honestly — are you okay? Is there anything you've been holding back from me?"',
    '"I've been feeling some uncertainty about us. I'd rather bring it up and be wrong than stay silent and wonder. Can we be real with each other tonight?"',
  ],
};

const ACTION_PROTOCOL: Record<"SEVERE" | "ELEVATED" | "MODERATE", { day: string; action: string; why: string }[]> = {
  SEVERE: [
    { day: "Day 1", action: "Document everything now.", why: "Write down the last 4 weeks of observable behaviors — times, dates, exact phrases. Memory degrades. This becomes your evidence baseline." },
    { day: "Day 2", action: "Stop explaining yourself to him.", why: "DARVO (Deny, Attack, Reverse Victim and Offender) is effective because you keep re-engaging. Grey-rock his deflections." },
    { day: "Day 3", action: "Activate one trusted confidant.", why: "Isolation is part of how this continues. One person who knows the full picture keeps you grounded in reality." },
    { day: "Day 4", action: "Run the confrontation script.", why: "Use the exact language above. His response (not what he says — how he responds physically) tells you everything." },
    { day: "Day 5", action: "Make a contingency decision.", why: "Decide in advance what happens if he denies and the behavior continues. Having a line removes his ability to exhaust you into inaction." },
  ],
  ELEVATED: [
    { day: "Day 1", action: "Track for 5 days silently.", why: "Before confronting, gather 5 days of specific observations. Vague accusations are easily dismissed." },
    { day: "Day 2", action: "Reduce your over-explaining.", why: "If you're apologizing or justifying your own feelings, stop. Your concerns are valid without a defense." },
    { day: "Day 3", action: "Initiate a low-stakes honest check-in.", why: "Create a relaxed, non-confrontational opening. Ask if he's been feeling distant. His reaction to this question matters." },
    { day: "Day 4", action: "Assess his response pattern.", why: "Did he get defensive? Did he turn it back on you? Healthy people don't feel attacked by 'are you okay?'" },
    { day: "Day 5", action: "Decide next step based on data.", why: "You now have 5 days of fresh data. Either the concern resolves or it compounds. Act accordingly." },
  ],
  MODERATE: [
    { day: "Day 1", action: "Establish a behavior baseline.", why: "Write down what his 'normal' looks like — this is your reference point for measuring change." },
    { day: "Day 2", action: "Identify the change trigger.", why: "When did the shift begin? A specific date, event, or conversation often anchors the cause." },
    { day: "Day 3", action: "Open a genuine check-in conversation.", why: "Come from curiosity, not accusation. 'You've seemed different — is everything okay?' is enough." },
    { day: "Day 4", action: "Evaluate his willingness to engage.", why: "A partner with nothing to hide will meet curiosity with openness, not defensiveness." },
    { day: "Day 5", action: "Re-run the assessment in 30 days.", why: "At this level, time and pattern repetition are your best diagnostic tools." },
  ],
};

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-40 h-40">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="44" fill="none"
          stroke={accent} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${score * 2.76} 276`}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="text-center">
        <p className="text-5xl font-black text-white leading-none">{score}</p>
        <p className="text-white/40 text-xs font-black uppercase tracking-wider mt-1">/ 100</p>
      </div>
    </div>
  );
}

export default function InfidelityPremiumReport({ data }: { data: ReportData }) {
  const cfg = RISK_CFG[data.riskLevel];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-4 py-10 pb-24 space-y-8">

        {/* ── HEADER HERO ── */}
        <div className={`${cfg.bg} text-white rounded-[32px] p-8 md:p-12 shadow-2xl border ${cfg.border} relative overflow-hidden text-center`}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${cfg.accent}18` }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${cfg.accent}0c` }} />
          <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border ${cfg.badge}`}>
              <ShieldAlert className="w-4 h-4" /> Premium Investigation Report
            </div>
            <ScoreRing score={data.score} accent={cfg.accent} />
            <h1 className="text-3xl md:text-5xl font-black mt-6 mb-3 leading-tight">{cfg.label}</h1>
            <p className="text-white/50 text-base mb-8">Threat Level: <span className="text-white font-black">{data.riskLevel}</span></p>
            <div className="bg-white/6 border border-white/8 rounded-2xl p-6 text-left max-w-2xl mx-auto">
              <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">AI Verdict</p>
              <p className="text-white/85 leading-relaxed text-base">{cfg.verdict}</p>
              <p className="mt-4 text-sm font-black" style={{ color: cfg.accent }}>{cfg.urgency}</p>
            </div>
          </div>
        </div>

        {/* ── VECTOR DEEP DIVE ── */}
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-5 flex items-center gap-3">
            <Eye className="w-6 h-6 text-rose-500" /> Deception Vector Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VECTORS.map(({ key, icon: Icon, label, desc, insight }) => {
              const val = data.vectors[key];
              return (
                <div key={key} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                      <Icon className="w-5 h-5 text-rose-500" /> {label}
                    </h4>
                    <span className="text-sm font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{val}%</span>
                  </div>
                  <p className="text-slate-400 text-xs font-medium mb-4 leading-snug">{desc}</p>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
                    <div
                      className={`${cfg.bar} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed">{getInsight(val, insight)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DIGITAL BEHAVIOR DEEP DIVE ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-rose-500" /> What He's Doing on His Phone
          </h2>
          <p className="text-slate-400 text-sm mb-6">Based on your digital behavior score of <strong>{data.vectors.digital}%</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "🔒", title: "Passcode & Screen Behavior", body: data.vectors.digital >= 65 ? "High-alert: sudden passcode changes or refusing to use the phone around you are deliberate perimeter-building behaviors. He knows exactly what's there." : "Some guardedness present — watch for escalation." },
              { icon: "📲", title: "App & Notification Patterns", body: data.vectors.digital >= 65 ? "Notification suppression, switching apps mid-conversation, or face-down placement are automated evasion responses. This behavior becomes habitual fast." : "Digital patterns are moderately guarded." },
              { icon: "🕵️", title: "Deletion Habits", body: data.vectors.digital >= 65 ? "Regular deletion of messages, call logs, or browser history is a maintenance behavior. It is not done once — it is done consistently, which means there is something consistent to hide." : "No strong deletion signals detected." },
              { icon: "⚡", title: "Reaction to Being Seen", body: data.vectors.digital >= 50 ? "Does he change position, go silent, or become tense when you're nearby while he's on his phone? That startle-and-cover response is involuntary and highly diagnostic." : "Phone reactions appear within normal range." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-2xl mb-2">{item.icon}</p>
                <h4 className="font-extrabold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY YOU FEEL LIKE THE PROBLEM ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-rose-500" /> Why You Feel Like the Problem
          </h2>
          <div className="space-y-4">
            {[
              { label: "DARVO", full: "Deny, Attack, Reverse Victim and Offender", body: "When you raise a concern and he turns it into an attack on your mental stability or trustworthiness, this is DARVO. It is a documented manipulation tactic, not a natural response. Healthy people do not feel attacked by being asked direct questions." },
              { label: "Gaslight Loop", full: "Weaponizing your perception", body: "If you have started to doubt your own memory of events, question whether your concerns are 'crazy', or apologize for noticing something was wrong — you have been gaslighted. This is not an accident. It is a strategy that keeps you focused on defending your own sanity rather than his behavior." },
              { label: "Emotional Debt", full: "The empathy inversion", body: "When he becomes the victim of your suspicion, you end up managing his feelings while yours go unaddressed. The relationship dynamic inverts: you comfort the person causing your pain. This is not love — it is leverage." },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div>
                    <span className="font-black text-slate-800 mr-2">{item.label}</span>
                    <span className="text-slate-400 text-sm">{item.full}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed bg-slate-50">
                    {item.body}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── CONFRONTATION SCRIPTS ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-rose-500" /> Word-for-Word Confrontation Script
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Calibrated to your {data.riskLevel.toLowerCase()} risk profile. Use these exact phrases — they are designed to prevent the standard deflection patterns.
          </p>
          <div className="space-y-4">
            {CONFRONTATION_SCRIPTS[data.riskLevel].map((script, i) => (
              <div key={i} className="bg-rose-50 border-l-4 border-rose-400 rounded-r-2xl p-5">
                <p className="text-rose-800 text-sm font-bold leading-relaxed italic">{script}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-800 text-sm font-bold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              After delivering any of these lines: stop talking. The most important diagnostic data comes from his immediate, unrehearsed response — not a prepared follow-up answer. Silence is your tool.
            </p>
          </div>
        </div>

        {/* ── 5-DAY PROTOCOL ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-rose-500" /> Your 5-Day Action Protocol
          </h2>
          <div className="space-y-4">
            {ACTION_PROTOCOL[data.riskLevel].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-sm"
                  style={{ background: cfg.accent }}>
                  {step.day.replace("Day ", "D")}
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 flex-1 border border-slate-100">
                  <p className="font-extrabold text-slate-800 mb-1">{step.action}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROGRESS METER ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-rose-500" /> What Happens If You Stay Silent
          </h2>
          <p className="text-slate-500 text-sm mb-7">Research on concealment behavior shows these patterns compound over time without intervention.</p>
          <div className="space-y-5">
            {[
              { label: "Behavior escalates", pct: data.riskLevel === "SEVERE" ? 89 : data.riskLevel === "ELEVATED" ? 72 : 48 },
              { label: "Emotional self-doubt increases", pct: data.riskLevel === "SEVERE" ? 94 : data.riskLevel === "ELEVATED" ? 78 : 55 },
              { label: "Confrontation becomes harder", pct: data.riskLevel === "SEVERE" ? 91 : data.riskLevel === "ELEVATED" ? 74 : 52 },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700 font-bold text-sm">{row.label}</span>
                  <span className="text-slate-500 text-sm font-black">{row.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`${cfg.bar} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLOSING SEAL ── */}
        <div className={`${cfg.bg} rounded-[32px] p-8 text-center border ${cfg.border} relative overflow-hidden`}>
          <div className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${cfg.accent}12 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: cfg.accent }}>
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-white mb-3">You Deserve Clarity</h3>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed mb-6">
              Whatever the truth turns out to be — knowing is always better than wondering. You took the hardest step by looking directly at the data.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Full AI Investigation", "Confrontation Script", "5-Day Protocol"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70 font-bold">
                  <CheckCircle2 className="w-4 h-4" style={{ color: cfg.accent }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
