"use client";
import React, { useState, useEffect } from "react";
import { ShieldAlert, Smartphone, Clock, Heart, Search, Eye, Target, FileText, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";

interface ReportData {
  score: number;
  riskLevel: "SEVERE" | "ELEVATED" | "MODERATE";
  vectors: { digital: number; chronological: number; intimacy: number; micro: number };
  email?: string;
}

interface Insights {
  verdictInsight: string;
  digitalInsight: string;
  scheduleInsight: string;
  intimacyInsight: string;
  microInsight: string;
  confrontationScript: string;
  nextStepsInsight: string;
}

const RISK_CONFIG = {
  SEVERE:   { label: "High-Risk: Active Concealment Detected", color: "text-rose-600",   bg: "bg-rose-50",   border: "border-rose-200",   badge: "bg-rose-100 text-rose-700 border-rose-200",   bar: "from-rose-400 to-rose-600",   ring: "#f43f5e" },
  ELEVATED: { label: "Elevated Risk: Suspicious Pattern",      color: "text-amber-600",  bg: "bg-amber-50",  border: "border-amber-200",  badge: "bg-amber-100 text-amber-700 border-amber-200",  bar: "from-amber-400 to-amber-600", ring: "#f59e0b" },
  MODERATE: { label: "Moderate Risk: Gray Zone Signals",        color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700 border-indigo-200", bar: "from-indigo-400 to-indigo-600", ring: "#6366f1" },
};

const VECTORS = [
  { key: "digital" as const,       label: "Digital Footprint",     icon: Smartphone, desc: "Phone secrecy, hidden apps, notification management" },
  { key: "chronological" as const, label: "Time & Schedule",        icon: Clock,      desc: "Unexplained gaps, vague whereabouts, late patterns" },
  { key: "intimacy" as const,      label: "Emotional Intimacy",     icon: Heart,      desc: "Coldness, deflection, guilt projection" },
  { key: "micro" as const,         label: "Micro-Deceptions",       icon: Search,     desc: "Small lies, story inconsistencies, defensiveness" },
];

const INSIGHT_SECTIONS = [
  { key: "verdictInsight" as const,      icon: Target,        title: "The Verdict",                     subtitle: "What your scores actually mean",                          color: "rose" },
  { key: "digitalInsight" as const,      icon: Smartphone,    title: "His Digital Behavior",             subtitle: "What he's doing on his phone",                           color: "slate" },
  { key: "scheduleInsight" as const,     icon: Clock,         title: "His Schedule Anomalies",           subtitle: "What the time patterns reveal",                          color: "slate" },
  { key: "intimacyInsight" as const,     icon: Heart,         title: "The Emotional Withdrawal",         subtitle: "Why you feel like the problem",                          color: "slate" },
  { key: "microInsight" as const,        icon: Search,        title: "The Micro-Deception Pattern",      subtitle: "Small lies that expose the big one",                     color: "slate" },
  { key: "confrontationScript" as const, icon: FileText,      title: "Your Confrontation Script",        subtitle: "Word-for-word. Use it today.",                           color: "rose" },
  { key: "nextStepsInsight" as const,    icon: Zap,           title: "Your 5-Day Action Protocol",       subtitle: "Exactly what to do from here",                          color: "rose" },
];

function AIInsightCard({ icon: Icon, title, subtitle, content, color }: { icon: any; title: string; subtitle: string; content: string; color: string }) {
  const accent = color === "rose" ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-white";
  const iconBg = color === "rose" ? "bg-rose-600 text-white" : "bg-slate-900 text-white";
  const titleColor = color === "rose" ? "text-rose-700" : "text-slate-900";
  return (
    <div className={`rounded-[28px] p-8 border shadow-sm ${accent}`}>
      <div className="flex items-start gap-5 mb-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className={`font-black text-xl leading-tight ${titleColor}`}>{title}</h4>
          <p className="text-slate-400 text-sm font-medium mt-0.5">{subtitle}</p>
        </div>
      </div>
      <p className="text-slate-700 font-medium leading-relaxed text-[15px]">{content}</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[28px] p-8 border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-5 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-slate-200 animate-pulse shrink-0" />
        <div className="flex-1">
          <div className="h-5 bg-slate-200 animate-pulse rounded-lg w-2/3 mb-2" />
          <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-full" />
        <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-5/6" />
        <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-4/5" />
        <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-full" />
        <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-3/4" />
      </div>
    </div>
  );
}

export default function InfidelityMasterReport({ data }: { data: ReportData }) {
  const [mounted, setMounted] = useState(false);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState(false);

  const score = data?.score ?? 65;
  const riskLevel: "SEVERE" | "ELEVATED" | "MODERATE" = data?.riskLevel ?? "ELEVATED";
  const cfg = RISK_CONFIG[riskLevel];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const generate = async () => {
      try {
        const res = await fetch("/api/infidelity-ai-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: data }),
        });
        const json = await res.json();
        if (json.success && json.insights) {
          setInsights(json.insights);
        } else {
          setAiError(true);
        }
      } catch {
        setAiError(true);
      } finally {
        setAiLoading(false);
      }
    };
    if (data) generate();
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8 bg-[#f8fafc] font-sans">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-10 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-600" /> Deception Dossier
          </h1>
          <p className="text-slate-400 font-medium ml-11 text-sm mt-1">Full AI Investigation Report · Confidential</p>
        </div>
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md print:hidden">
          Save PDF
        </button>
      </div>

      {/* ── HERO SCORE ── */}
      <div className="bg-[#0d0a12] text-white rounded-[32px] p-10 md:p-14 mb-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/8 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">

          {/* Score ring */}
          <div className="relative w-44 h-44 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={cfg.ring} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${mounted ? score * 2.64 : 0} 264`}
                className="transition-all duration-[2000ms] ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl font-black text-white leading-none">{score}</p>
              <p className="text-white/30 text-xs font-black uppercase tracking-wider">/100</p>
            </div>
          </div>

          <div>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border ${cfg.badge}`}>
              <AlertTriangle className="w-3.5 h-3.5" /> {cfg.label}
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Your gut isn&apos;t lying.<br />
              <span className="text-white/40">The numbers confirm it.</span>
            </h2>
            <p className="text-white/60 font-medium text-lg leading-relaxed">
              Below is your full AI-generated investigation — built specifically from your answers. Every section is personalized to the exact patterns you flagged.
            </p>
          </div>
        </div>
      </div>

      {/* ── VECTOR BARS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {VECTORS.map(({ key, label, icon: Icon, desc }) => (
          <div key={key} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <Icon className="w-4 h-4 text-rose-500" /> {label}
              </h4>
              <span className="text-sm font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{data.vectors[key]}%</span>
            </div>
            <p className="text-slate-400 text-xs font-medium mb-4">{desc}</p>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className={`bg-gradient-to-r ${cfg.bar} h-full rounded-full transition-all duration-[1500ms] ease-out`}
                style={{ width: mounted ? `${data.vectors[key]}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── AI LOADING INDICATOR ── */}
      {aiLoading && (
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-3xl px-7 py-5 mb-8 shadow-sm">
          <div className="w-8 h-8 border-3 border-rose-200 border-t-rose-600 rounded-full animate-spin shrink-0" />
          <div>
            <p className="font-black text-slate-800">Generating your personalized investigation…</p>
            <p className="text-slate-400 text-sm font-medium">AI is analyzing your 4 behavioral vectors. Takes ~10 seconds.</p>
          </div>
        </div>
      )}

      {/* ── SECTION DIVIDER ── */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Eye className="w-4 h-4" /> Full AI Investigation Below
        </p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* ── AI INSIGHT CARDS ── */}
      <div className="space-y-5 mb-14">
        {INSIGHT_SECTIONS.map((section) => (
          insights ? (
            <AIInsightCard
              key={section.key}
              icon={section.icon}
              title={section.title}
              subtitle={section.subtitle}
              content={insights[section.key]}
              color={section.color}
            />
          ) : (
            <SkeletonCard key={section.key} />
          )
        ))}
      </div>

      {/* ── AI ERROR FALLBACK ── */}
      {aiError && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-7 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-black text-rose-700 mb-1">AI generation hit a snag</p>
            <p className="text-rose-600 text-sm font-medium">Your scores and vector breakdown above are fully accurate. Reload the page to retry the AI narrative sections.</p>
          </div>
        </div>
      )}

      {/* ── WHAT TO DO NEXT CTA ── */}
      {insights && (
        <div className="bg-[#0d0a12] rounded-[32px] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-rose-600/10 rounded-full blur-[80px]" />
          <CheckCircle2 className="w-14 h-14 text-rose-400 mx-auto mb-5" />
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">You have everything you need.</h3>
          <p className="text-white/55 font-medium text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Your investigation is complete. Screenshot this report. Follow your 5-day protocol. Trust what you found.
          </p>
          <button onClick={() => window.print()} className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-xl shadow-rose-500/30 hover:from-rose-500 hover:to-pink-500 transition-all">
            Save Your Full Report
          </button>
        </div>
      )}

    </div>
  );
}
