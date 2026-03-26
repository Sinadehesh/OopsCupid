"use client";
import React, { useState } from "react";
import {
  ShieldAlert, Smartphone, Clock, Heart, Search,
  Eye, AlertTriangle, Brain, MessageSquare, Target,
  TrendingUp, ChevronDown, Star, CheckCircle2, BookOpen, Zap, Lock,
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
    label: "High-Risk — Active Cheating Detected",
    accent: "#f43f5e",
    bg: "bg-[#1a0608]",
    border: "border-rose-500/30",
    badge: "bg-rose-500/20 border-rose-500/40 text-rose-300",
    bar: "bg-rose-500",
    verdict: "The behavioral fingerprint you submitted is consistent with active infidelity. Digital withdrawal, unexplained time gaps, and emotional shutdown rarely overlap like this without a coordinating cause. This is not a stress response — it is a management strategy.",
    urgency: "Act within the next 7 days. Patterns this dense accelerate fast.",
  },
  ELEVATED: {
    label: "Elevated Risk — Cheating Pattern Emerging",
    accent: "#f59e0b",
    bg: "bg-[#110e02]",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    bar: "bg-amber-500",
    verdict: "Several behavioral markers in your responses align with someone managing a secret. No single signal is proof on its own — but their overlap crosses the threshold of coincidence. The combination is the signal.",
    urgency: "Patterns at this level escalate if not addressed directly.",
  },
  MODERATE: {
    label: "Moderate Signals — Gray Zone",
    accent: "#6366f1",
    bg: "bg-[#060818]",
    border: "border-indigo-500/30",
    badge: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300",
    bar: "bg-indigo-500",
    verdict: "The signals you reported are real but sit in ambiguous territory. Stress, life transitions, and emotional withdrawal can mimic infidelity signals. The key diagnostic: are these a change from his baseline? A shift matters far more than the absolute level.",
    urgency: "Monitor over 30 days. Compare against his prior baseline, not other men.",
  },
};

const VECTORS = [
  {
    key: "digital" as const,
    icon: Smartphone,
    label: "Digital Behavior",
    desc: "Phone secrecy, app-switching, notification hiding, passcode changes",
    insight: {
      high: "Passcode changes and screen-facing avoidance are the #1 behavioral tell in post-disclosure research. He is creating a digital perimeter — this is deliberate, not accidental.",
      mid: "Some digital guardedness is present. Combined with other signals it warrants direct attention.",
      low: "Digital patterns appear within normal range.",
    },
  },
  {
    key: "chronological" as const,
    icon: Clock,
    label: "Time & Schedule",
    desc: "Unexplained absences, vague whereabouts, late arrivals, new routines",
    insight: {
      high: "Unexplained time is where a parallel life operates. A person with nothing to hide has no reason to leave time unaccounted for — rehearsed answers are not the same as honest ones.",
      mid: "Schedule changes are visible but not extreme. Notice whether explanations feel spontaneous or prepared.",
      low: "Time patterns appear consistent and accounted for.",
    },
  },
  {
    key: "intimacy" as const,
    icon: Heart,
    label: "Emotional Distance",
    desc: "Coldness, withdrawal, picking fights to create distance, detachment",
    insight: {
      high: "Emotional withdrawal and manufactured conflict are tools for creating distance without accountability. He is making space — not because he is unhappy, but because closeness would require honesty.",
      mid: "Emotional distance is present. Could reflect relationship strain or active concealment — the direction of change tells you which.",
      low: "Emotional connection appears largely intact.",
    },
  },
  {
    key: "micro" as const,
    icon: Search,
    label: "Story Inconsistencies",
    desc: "Small lies that drift, over-explaining, defensiveness to basic questions",
    insight: {
      high: "Micro-lies compound. Each one needs maintenance — over time the story drifts. An innocent person does not experience ordinary questions as attacks. Defensive reactions to normal curiosity are themselves the evidence.",
      mid: "Some story drift noted. Pay attention to whether explanations expand or contract under direct questioning.",
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
    "\"I need to talk to you, and I need you to listen. I have been watching what has been happening for a while. I am not here to fight. I am here because I deserve honesty, and I am asking you directly: what have you been hiding from me?\"",
    "\"The phone, the schedule, the way you have been pulling away — I have not been imagining it. I am not asking you to confess. I am telling you that I already see it, and I need you to tell me the truth right now.\"",
    "\"If nothing is happening, you will be able to answer my questions without deflecting or turning this back on me. I am watching how you respond, not just what you say.\"",
  ],
  ELEVATED: [
    "\"Something has been off between us and I need to ask you about it directly. I am not trying to start a fight. I want an honest answer: is there something going on that you have not told me?\"",
    "\"Your behavior has changed and I have noticed. I deserve to know if something is happening. I am asking you clearly, and I need a real answer.\"",
  ],
  MODERATE: [
    "\"Something feels different between us lately and I want to check in honestly. I am not accusing you of anything. I just need to know — is everything okay with you? With us?\"",
    "\"I would rather ask and be wrong than stay quiet and keep wondering. Is there anything you have been holding back from me?\"",
  ],
};

const ACTION_PROTOCOL: Record<"SEVERE" | "ELEVATED" | "MODERATE", { day: string; action: string; why: string }[]> = {
  SEVERE: [
    { day: "Day 1", action: "Document everything now.", why: "Write down the last 4 weeks of observable behaviors — exact times, dates, phrases used. Memory degrades under stress. This becomes your evidence baseline." },
    { day: "Day 2", action: "Stop justifying your concerns to him.", why: "Every time you explain why you are upset, you shift the focus onto your reaction instead of his behavior. Stop defending your right to notice what you are noticing." },
    { day: "Day 3", action: "Tell one trusted person the full picture.", why: "Isolation is how this continues unchallenged. One person who knows everything keeps you grounded in what is real." },
    { day: "Day 4", action: "Use the confrontation script.", why: "Deliver it once, then stop talking. His immediate unrehearsed reaction — not what he says — is the most diagnostic data you will collect." },
    { day: "Day 5", action: "Decide your line in advance.", why: "Know what happens if he denies it and the behavior continues. Having a pre-decided boundary removes his ability to exhaust you into inaction." },
  ],
  ELEVATED: [
    { day: "Day 1", action: "Track quietly for 5 days.", why: "Before confronting, gather 5 days of specific observations. Vague concerns are easy to dismiss — specific patterns are not." },
    { day: "Day 2", action: "Stop over-explaining your feelings.", why: "If you find yourself apologizing for being suspicious, stop. Your concerns do not need a defense to be valid." },
    { day: "Day 3", action: "Start a low-key honest check-in.", why: "Ask if he has been feeling distant lately. His reaction to this simple question is itself diagnostic data." },
    { day: "Day 4", action: "Note how he responds when questioned.", why: "Does he get defensive? Turn it back on you? A person with nothing to hide does not react to curiosity like an accusation." },
    { day: "Day 5", action: "Make your next move based on the data.", why: "You now have 5 days of fresh observations. Either things resolve or they compound. Act on what you see, not what you hope." },
  ],
  MODERATE: [
    { day: "Day 1", action: "Write down his normal baseline.", why: "What does he actually look like when things are fine? That is your reference point for measuring the current change." },
    { day: "Day 2", action: "Identify when the shift started.", why: "A specific date, event, or conversation usually anchors the cause. Pin it down — it matters." },
    { day: "Day 3", action: "Open an honest, non-accusatory conversation.", why: "Come from curiosity. Saying you have seemed different lately, is everything okay is enough to open the door." },
    { day: "Day 4", action: "Measure his willingness to engage.", why: "A secure partner meets curiosity with openness. Watch for deflection, irritability, or turning the question back onto you." },
    { day: "Day 5", action: "Re-run the assessment in 30 days.", why: "At this level, time and repeated pattern are your clearest diagnostic tools. One data point is not enough." },
  ],
};

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-40 h-40">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="50" cy="50" r="44" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${score * 2.76} 276`} className="transition-all duration-1000" />
      </svg>
      <div className="text-center">
        <p className="text-5xl font-black text-white leading-none">{score}</p>
        <p className="text-white/40 text-xs font-black uppercase tracking-wider mt-1">/ 100</p>
      </div>
    </div>
  );
}

// ── PLAYBOOKS ─────────────────────────────────────────────────────────────
const PLAYBOOK_EVIDENCE_URL = "https://oopscupid.gumroad.com/l/caught-or-paranoid";
const PLAYBOOK_REBUILD_URL  = "https://oopscupid.gumroad.com/l/clean-break-or-comeback";
const PLAYBOOK_BUNDLE_URL   = "https://oopscupid.gumroad.com/l/cheating-truth-bundle";

function PlaybooksUpsell({ accent }: { accent: string }) {
  const [hovered, setHovered] = useState<"evidence" | "rebuild" | null>(null);

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 px-8 py-7 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-black uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5" /> Recommended For You
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">You Have The Diagnosis. Now What?</h2>
        <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
          Two playbooks written specifically for women who suspect or have confirmed cheating. One for right now. One for what comes next.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-5">

        {/* PLAYBOOK 1 */}
        <div
          className={`relative rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
            hovered === "evidence" ? "border-rose-400 shadow-lg shadow-rose-100" : "border-slate-200"
          }`}
          onMouseEnter={() => setHovered("evidence")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="absolute top-0 right-0 bg-rose-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">
            Most Urgent
          </div>
          <div className="p-7 md:p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl">&#128373;&#65039;</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">Caught or Paranoid?</h3>
                <p className="text-rose-600 font-bold text-sm mt-1">The Cheating Evidence Playbook</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              This playbook is for the woman who suspects but does not yet have proof. You will learn exactly what counts as real evidence vs. coincidence, how to document without tipping him off, which confrontation approach matches your specific risk level, and how to protect yourself legally and emotionally before the conversation happens.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                { icon: "\uD83D\uDD0D", text: "What counts as real evidence — and what does not" },
                { icon: "\uD83D\uDCCB", text: "The Silent Documentation Method — 7-day tracking template" },
                { icon: "\uD83D\uDCF1", text: "How to check his digital footprint without him knowing" },
                { icon: "\uD83D\uDCAC", text: "3 confrontation scripts matched to your risk level" },
                { icon: "\u26A0\uFE0F", text: "The 5 things that make a cheater confess vs. double down" },
                { icon: "\uD83D\uDEE1\uFE0F", text: "How to protect yourself before the confrontation" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-slate-700 text-xs font-semibold leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900">$9.99</span>
                <span className="text-slate-400 text-sm ml-2">one-time</span>
              </div>
              <a href={PLAYBOOK_EVIDENCE_URL} target="_blank" rel="noopener noreferrer"
                className="bg-rose-600 hover:bg-rose-500 text-white font-black text-sm px-7 py-3.5 rounded-2xl shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" /> Get This Playbook
              </a>
            </div>
          </div>
        </div>

        {/* PLAYBOOK 2 */}
        <div
          className={`relative rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
            hovered === "rebuild" ? "border-emerald-400 shadow-lg shadow-emerald-100" : "border-slate-200"
          }`}
          onMouseEnter={() => setHovered("rebuild")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">
            For After
          </div>
          <div className="p-7 md:p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl">&#128739;</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">The Clean Break or The Comeback</h3>
                <p className="text-emerald-600 font-bold text-sm mt-1">The Decision Playbook for After You Know</p>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Once you have the truth, the hardest question is what to do with it. This playbook gives you the decision framework: how to tell the difference between performed remorse and genuine accountability, what real relationship repair after infidelity requires (and whether he is capable of it), and how to leave cleanly if that is what you choose.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
              {[
                { icon: "\u2696\uFE0F", text: "The Leave vs. Stay Decision Framework — 12 honest questions" },
                { icon: "\uD83C\uDFAD", text: "Performed remorse vs. real accountability — how to tell the difference" },
                { icon: "\uD83D\uDD01", text: "What genuine relationship repair after cheating actually requires" },
                { icon: "\uD83D\uDEAA", text: "The Clean Exit Protocol — how to leave without drama or collapse" },
                { icon: "\uD83E\uDDEA", text: "The 90-Day Accountability Test — can he actually change?" },
                { icon: "\uD83D\uDCAA", text: "How to rebuild your self-trust after being deceived" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="text-slate-700 text-xs font-semibold leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900">$9.99</span>
                <span className="text-slate-400 text-sm ml-2">one-time</span>
              </div>
              <a href={PLAYBOOK_REBUILD_URL} target="_blank" rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm px-7 py-3.5 rounded-2xl shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" /> Get This Playbook
              </a>
            </div>
          </div>
        </div>

        {/* BUNDLE */}
        <div className="relative rounded-3xl bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 0%, #f43f5e18 0%, transparent 60%), radial-gradient(ellipse at 10% 100%, #10b98118 0%, transparent 60%)" }} />
          <div className="relative z-10 p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-black uppercase tracking-widest mb-4">
                  <Lock className="w-3 h-3" /> Bundle &amp; Save
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Both Playbooks Together</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">
                  One tells you how to find out the truth. The other tells you what to do with it. Together, they are the complete roadmap from suspicion to clarity — whatever that clarity turns out to be.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {["Caught or Paranoid? Playbook", "Clean Break or Comeback Playbook", "Lifetime Access", "Instant Download"].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-white/60 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center">
                <div className="mb-1">
                  <span className="text-white/30 line-through text-lg font-black">$19.98</span>
                </div>
                <div className="text-4xl font-black text-white">$15.99</div>
                <div className="text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">Save $4 — Today Only</div>
                <a href={PLAYBOOK_BUNDLE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 font-black text-sm px-8 py-4 rounded-2xl shadow-xl hover:bg-slate-100 hover:-translate-y-0.5 transition-all">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Get Both &mdash; $15.99
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────

export default function InfidelityPremiumReport({ data }: { data: ReportData }) {
  const cfg = RISK_CFG[data.riskLevel];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-4 py-10 pb-24 space-y-8">

        {/* HEADER HERO */}
        <div className={`${cfg.bg} text-white rounded-[32px] p-8 md:p-12 shadow-2xl border ${cfg.border} relative overflow-hidden text-center`}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: `${cfg.accent}18` }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: `${cfg.accent}0c` }} />
          <div className="relative z-10">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border ${cfg.badge}`}>
              <ShieldAlert className="w-4 h-4" /> Full Cheating Investigation Report
            </div>
            <ScoreRing score={data.score} accent={cfg.accent} />
            <h1 className="text-3xl md:text-5xl font-black mt-6 mb-3 leading-tight">{cfg.label}</h1>
            <p className="text-white/50 text-base mb-8">Infidelity Risk Index: <span className="text-white font-black">{data.riskLevel}</span></p>
            <div className="bg-white/5 border border-white/8 rounded-2xl p-6 text-left max-w-2xl mx-auto">
              <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">Verdict</p>
              <p className="text-white/85 leading-relaxed text-base">{cfg.verdict}</p>
              <p className="mt-4 text-sm font-black" style={{ color: cfg.accent }}>{cfg.urgency}</p>
            </div>
          </div>
        </div>

        {/* VECTOR DEEP DIVE */}
        <div>
          <h2 className="text-2xl font-black text-slate-800 mb-5 flex items-center gap-3">
            <Eye className="w-6 h-6 text-rose-500" /> Cheating Signal Breakdown
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
                    <div className={`${cfg.bar} h-full rounded-full transition-all duration-1000`} style={{ width: `${val}%` }} />
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-slate-600 text-sm leading-relaxed">{getInsight(val, insight)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIGITAL DEEP DIVE */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-rose-500" /> What He Is Doing On His Phone
          </h2>
          <p className="text-slate-400 text-sm mb-6">Based on your digital behavior score of <strong>{data.vectors.digital}%</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "\uD83D\uDD12", title: "Passcode & Screen Behavior", body: data.vectors.digital >= 65 ? "Sudden passcode changes or refusing to use his phone around you are deliberate perimeter-building behaviors. He knows exactly what is on there." : "Some guardedness present — watch for escalation alongside other signals." },
              { icon: "\uD83D\uDCF2", title: "App & Notification Patterns", body: data.vectors.digital >= 65 ? "Notification suppression, switching apps mid-conversation, and face-down placement are evasion habits. This behavior becomes automatic because it needs to." : "Digital patterns are moderately guarded." },
              { icon: "\uD83D\uDD75\uFE0F", title: "Deletion Habits", body: data.vectors.digital >= 65 ? "Regular deletion of messages, call logs, or browser history is a maintenance behavior. It is not done once — it is done consistently because there is something consistent to hide." : "No strong deletion signals detected." },
              { icon: "\uD83D\uDEA8", title: "Reaction When You Are Near", body: data.vectors.digital >= 50 ? "Does he go silent, shift position, or tense up when you are nearby while he is on his phone? That involuntary startle-and-cover response is one of the most reliable physical tells." : "Phone reactions appear within normal range." },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-2xl mb-2">{item.icon}</p>
                <h4 className="font-extrabold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY YOU FEEL LIKE THE PROBLEM */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-rose-500" /> Why You Feel Like the Problem
          </h2>
          <div className="space-y-4">
            {[
              { label: "DARVO", full: "Deny, Attack, Reverse Victim and Offender", body: "When you raise a concern and he reacts by attacking your mental stability or trustworthiness, that is DARVO — a documented defense mechanism used to shift focus from his behavior to your reaction. A person with nothing to hide does not feel attacked by being asked a direct question." },
              { label: "Manufactured Conflict", full: "Picking fights to create justified distance", body: "Cheaters frequently create arguments before or after seeing the other person — it justifies distance, provides an alibi for emotional absence, and puts you in a defensive position. If conflict seems to appear out of nowhere and disappear just as fast, that rhythm is not accidental." },
              { label: "Emotional Debt", full: "The empathy inversion", body: "When he becomes the victim of your suspicion, you end up managing his feelings while yours go unaddressed. You end up comforting the person causing your pain. This inversion is not organic — it is leverage." },
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
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed bg-slate-50">{item.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONFRONTATION SCRIPTS */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-rose-500" /> Word-for-Word Confrontation Script
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Written for your {data.riskLevel.toLowerCase()} risk profile. These phrases are designed to prevent the standard deflection patterns cheaters use.
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
              After delivering any of these lines: go silent. The most diagnostic information comes from his immediate, unrehearsed reaction — not what he prepares to say 10 seconds later. Silence is your tool.
            </p>
          </div>
        </div>

        {/* 5-DAY PROTOCOL */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <Target className="w-6 h-6 text-rose-500" /> Your 5-Day Action Protocol
          </h2>
          <div className="space-y-4">
            {ACTION_PROTOCOL[data.riskLevel].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-sm" style={{ background: cfg.accent }}>
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

        {/* SILENCE COST */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-rose-500" /> What Happens If You Stay Silent
          </h2>
          <p className="text-slate-500 text-sm mb-7">Research on concealment behavior shows these patterns compound over time without intervention.</p>
          <div className="space-y-5">
            {[
              { label: "Cheating behavior escalates", pct: data.riskLevel === "SEVERE" ? 89 : data.riskLevel === "ELEVATED" ? 72 : 48 },
              { label: "Emotional self-doubt increases", pct: data.riskLevel === "SEVERE" ? 94 : data.riskLevel === "ELEVATED" ? 78 : 55 },
              { label: "Confrontation becomes harder", pct: data.riskLevel === "SEVERE" ? 91 : data.riskLevel === "ELEVATED" ? 74 : 52 },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700 font-bold text-sm">{row.label}</span>
                  <span className="text-slate-500 text-sm font-black">{row.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div className={`${cfg.bar} h-full rounded-full transition-all duration-1000`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLAYBOOKS UPSELL */}
        <PlaybooksUpsell accent={cfg.accent} />

        {/* CLOSING SEAL */}
        <div className={`${cfg.bg} rounded-[32px] p-8 text-center border ${cfg.border} relative overflow-hidden`}>
          <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${cfg.accent}12 0%, transparent 70%)` }} />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: cfg.accent }}>
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-white mb-3">You Deserve the Truth</h3>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed mb-6">
              Whatever the truth turns out to be — knowing is always better than wondering. You looked directly at the data. That took courage.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Full Cheating Investigation", "Confrontation Script", "5-Day Protocol"].map((item, i) => (
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
