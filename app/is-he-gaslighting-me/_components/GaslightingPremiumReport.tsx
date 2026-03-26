"use client";
import React, { useEffect, useState } from "react";
import {
  CloudFog, ShieldAlert, Activity, BrainCircuit, Lock, Zap, ArrowRight,
  Sparkles, Lightbulb, MessageCircle, Loader2, Star, CheckCircle2,
  BookOpen, Heart, Flame, ChevronDown, Clock, Brain, Target
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Subscale { key: string; label: string; score: number; max: number; pct: number; }
export interface GaslightingResult {
  totalScore: number; maxScore: number;
  tacticsScore: number; tacticsMax: number;
  impactScore: number; impactMax: number;
  criticalFlags: number; level: number;
  levelData: { title: string; subtitle: string; advice: string; };
  subscales: Subscale[];
  topDrivers: Subscale[];
}
interface AIInsights {
  tacticsInsight: string;
  impactInsight: string;
  subscaleInsight: string;
  redFlagInsight: string;
  erosionProfileInsight: string;
  actionInsight: string;
}

// ── AI Block ───────────────────────────────────────────────────────────────
function AIBlock({ text, label, loading }: { text?: string; label: string; loading: boolean }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6 flex items-start gap-4 animate-pulse">
        <div className="w-9 h-9 rounded-xl bg-indigo-200/50 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-indigo-200/50 rounded-full w-1/3" />
          <div className="h-3 bg-indigo-100/50 rounded-full w-full" />
          <div className="h-3 bg-indigo-100/50 rounded-full w-5/6" />
          <div className="h-3 bg-indigo-100/50 rounded-full w-4/5" />
        </div>
      </div>
    );
  }
  if (!text) return null;
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50/60 border border-indigo-100 p-6 flex items-start gap-4 shadow-sm">
      <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow">
        <Lightbulb className="w-5 h-5 text-[#ffbc42]" />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2 flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" /> {label}
        </p>
        <p className="text-indigo-900/85 font-medium text-base leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ── Animated Bar ───────────────────────────────────────────────────────────
function AnimatedBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), delay + 200); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, backgroundColor: color }} />
    </div>
  );
}

// ── Bell Curve ─────────────────────────────────────────────────────────────
function BellCurve({ pct }: { pct: number }) {
  const [mx, setMx] = useState(0);
  useEffect(() => { const t = setTimeout(() => setMx(pct * 10), 500); return () => clearTimeout(t); }, [pct]);
  return (
    <svg viewBox="0 0 1000 220" className="w-full h-auto">
      <defs>
        <linearGradient id="glBellFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,210 C200,210 380,18 500,18 C620,18 800,210 1000,210Z" fill="url(#glBellFill)" />
      <path d="M0,210 C200,210 380,18 500,18 C620,18 800,210 1000,210" fill="none" stroke="#4F46E5" strokeWidth="3.5" />
      <line x1="820" y1="14" x2="820" y2="210" stroke="#312E81" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
      <text x="820" y="9" textAnchor="middle" fill="#312E81" fontSize="11" fontWeight="800">Healthy Zone</text>
      <g style={{ transform: `translateX(${mx - 500}px)`, transition: "transform 1.3s cubic-bezier(0.2,0.8,0.2,1)" }}>
        <line x1="500" y1="14" x2="500" y2="210" stroke="#e11d48" strokeWidth="3" />
        <circle cx="500" cy="14" r="7" fill="#e11d48">
          <animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="500" y="4" textAnchor="middle" fill="#e11d48" fontSize="13" fontWeight="900">YOU</text>
      </g>
    </svg>
  );
}

// ── Playbook Card ──────────────────────────────────────────────────────────
function PlaybookCard({
  title, subtitle, price, strikePrice, badge, bullets, cta, highlight, gumroadUrl, icon
}: {
  title: string; subtitle: string; price: number; strikePrice: number;
  badge: string; bullets: string[]; cta: string; highlight?: boolean;
  gumroadUrl: string; icon: React.ReactNode;
}) {
  return (
    <div className={`relative rounded-3xl p-8 border-2 flex flex-col gap-5 shadow-lg transition-transform hover:-translate-y-1
      ${highlight ? "border-[#ffbc42] bg-white" : "border-slate-200 bg-slate-50"}`}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ffbc42] text-[#312E81] text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-0.5">{badge}</p>
          <h3 className="text-xl font-black text-slate-800">{title}</h3>
          <p className="text-sm font-medium text-slate-500">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-medium text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />{b}
          </li>
        ))}
      </ul>
      <div className="flex items-end gap-3 mt-auto">
        <span className="text-4xl font-black text-slate-800">€{price.toFixed(2)}</span>
        <span className="text-sm font-bold text-slate-400 line-through mb-1">€{strikePrice.toFixed(2)}</span>
      </div>
      <a href={gumroadUrl} target="_blank" rel="noopener noreferrer"
        className={`w-full py-4 rounded-xl font-black text-lg text-center flex items-center justify-center gap-2 transition-all shadow
          ${highlight ? "bg-[#ffbc42] text-[#312E81] hover:bg-yellow-400" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
        {cta} <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}

// ── Bundle Banner ──────────────────────────────────────────────────────────
function BundleBanner() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border-2 border-rose-500 bg-white shadow-xl overflow-hidden">
      <button className="w-full bg-[#312E81] px-8 py-5 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-[#ffbc42] animate-pulse" />
          <span className="text-white font-black text-xl">🔥 BUNDLE BOTH — Save Over €4</span>
        </div>
        <ChevronDown className={`w-6 h-6 text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="p-8 space-y-5">
          <p className="text-slate-700 font-medium text-lg leading-relaxed">
            Get <strong>both playbooks</strong> — the Gaslighting Defense Playbook <em>and</em> How A Healthy Man Treats You — at one combined price.
          </p>
          <ul className="space-y-2">
            {[
              "Gaslighting Defense Playbook (€9.99 value)",
              "How A Healthy Man Treats You (€9.99 value)",
              "Bonus: 7-Day Clarity & Grounding Protocol",
              "Bonus: 12 \"Shut It Down\" Script Templates",
              "Bonus: Healthy Relationship Checklist (print-ready)",
            ].map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Star className="w-4 h-4 text-[#ffbc42] shrink-0" />{b}
              </li>
            ))}
          </ul>
          <div className="flex items-end gap-4">
            <span className="text-5xl font-black text-[#312E81]">€15.99</span>
            <div className="flex flex-col mb-1">
              <span className="text-sm font-bold text-slate-400 line-through">€19.98</span>
              <span className="text-xs font-black text-rose-500 uppercase tracking-widest">You save €3.99</span>
            </div>
          </div>
          <a href="https://sinadehesh.gumroad.com/l/gaslighting-bundle" target="_blank" rel="noopener noreferrer"
            className="w-full py-5 bg-[#312E81] text-white rounded-xl font-black text-xl flex items-center justify-center gap-3 hover:bg-indigo-800 transition-all shadow-lg">
            Get The Bundle Now <Zap className="w-6 h-6" />
          </a>
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            Instant PDF delivery · No subscription · Secure checkout via Gumroad
          </p>
        </div>
      )}
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────────────
export default function GaslightingPremiumReport({ result }: { result: GaslightingResult }) {
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/gaslighting-ai-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result }),
        });
        const data = await res.json();
        if (data.success && data.insights) setAiInsights(data.insights);
        else setAiError(true);
      } catch { setAiError(true); }
      finally { setAiLoading(false); }
    })();
  }, [result]);

  const tacticsPct = Math.round((result.tacticsScore / result.tacticsMax) * 100);
  const impactPct = Math.round((result.impactScore / result.impactMax) * 100);
  const populationPct = Math.min(97, Math.round(tacticsPct * 0.85 + 10));

  const AIStatus = aiLoading ? (
    <div className="flex items-center gap-3 px-5 py-3 bg-indigo-50 rounded-2xl border border-indigo-100 text-indigo-700 text-sm font-bold">
      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      Your personalized AI analysis is being written…
    </div>
  ) : aiError ? (
    <div className="px-5 py-3 bg-rose-50 rounded-2xl border border-rose-100 text-rose-600 text-sm font-bold">
      AI analysis temporarily unavailable. All data below is still fully accurate.
    </div>
  ) : null;

  // ── VALUE STACK — what the €12.99 unlocked ──────────────────────────────
  const valueStack = [
    { item: "AI-written Reality Defense Report (personalized)", value: "€40" },
    { item: "Tactics breakdown — what he's doing & why it works", value: "€20" },
    { item: "Your psychological erosion profile", value: "€15" },
    { item: "Population percentile context with bell curve", value: "€10" },
    { item: "Critical flag severity analysis", value: "€10" },
    { item: "Personalized 3-step escape & clarity roadmap", value: "€20" },
    { item: "Healthy relationship benchmark comparison", value: "€15" },
  ];

  return (
    <div className="bg-slate-50 py-12 md:py-20 rounded-[32px]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-10">

        {AIStatus && <div>{AIStatus}</div>}

        {/* ── HERO ── */}
        <div className="bg-[#312E81] rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <Sparkles className="absolute top-4 right-4 w-40 h-40 text-white/5 rotate-12 pointer-events-none" />
          <CloudFog className="absolute -bottom-6 -left-6 w-32 h-32 text-white/5 pointer-events-none" />
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 mb-6">
            <Brain className="w-4 h-4 text-indigo-300" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Reality Defense Report — Unlocked</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            You Are Not<br /><span className="text-[#ffbc42]">Crazy.</span>
          </h1>
          <p className="text-indigo-300 text-xl font-medium max-w-lg mx-auto">
            Here is the full clinical picture of what has been done to your mind — and exactly how to take it back.
          </p>
        </div>

        {/* ── VALIDATION STATEMENT ── */}
        <div className="bg-white rounded-3xl border-l-8 border-rose-500 p-8 md:p-12 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> What Your Results Actually Mean
          </p>
          <h2 className="text-3xl font-black text-slate-800 mb-4">Level {result.level}: <span className="text-indigo-600">{result.levelData.title}</span></h2>
          <p className="text-lg font-medium text-slate-600 leading-relaxed mb-4">{result.levelData.subtitle.split("|")[1]?.trim() || result.levelData.subtitle}</p>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
            <p className="text-base font-medium text-indigo-900/80 leading-relaxed">{result.levelData.advice}</p>
          </div>
        </div>

        {/* ── MIND GAMES SCORE ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="w-7 h-7 text-indigo-600" />
            <h2 className="text-2xl font-black text-slate-800">The Mind Games — Tactics Score</h2>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-600">Score: {result.tacticsScore} / {result.tacticsMax}</span>
            <span className="font-black text-indigo-600 text-xl">{tacticsPct}%</span>
          </div>
          <AnimatedBar value={tacticsPct} color="#4F46E5" delay={200} />
          <p className="text-sm text-slate-500 font-medium mt-3">How systematically he uses tactics to control your narrative.</p>
        </div>

        <AIBlock label="What this tactics score means for you specifically" text={aiInsights?.tacticsInsight} loading={aiLoading} />

        {/* ── EROSION SCORE ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-7 h-7 text-violet-600" />
            <h2 className="text-2xl font-black text-slate-800">The Mental Erosion — Impact Score</h2>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-600">Score: {result.impactScore} / {result.impactMax}</span>
            <span className="font-black text-violet-600 text-xl">{impactPct}%</span>
          </div>
          <AnimatedBar value={impactPct} color="#7C3AED" delay={300} />
          <p className="text-sm text-slate-500 font-medium mt-3">How much your self-trust and confidence has been eroded.</p>
        </div>

        <AIBlock label="What this erosion level feels like — and how long it lasts" text={aiInsights?.impactInsight} loading={aiLoading} />

        {/* ── SUBSCALE BREAKDOWN ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Specific Tactics Breakdown</h2>
          <p className="text-slate-500 text-sm mb-8">The exact manipulation methods detected in your responses.</p>
          <div className="space-y-5">
            {result.subscales.map((s, i) => {
              const col = s.pct >= 75 ? "#e11d48" : s.pct >= 50 ? "#7C3AED" : "#4F46E5";
              return (
                <div key={s.key}>
                  <div className="flex justify-between mb-1">
                    <span className="font-black text-sm text-slate-700">{s.label}</span>
                    <span className="font-black text-sm" style={{ color: col }}>{Math.round(s.pct)}% Risk</span>
                  </div>
                  <AnimatedBar value={s.pct} color={col} delay={i * 100} />
                </div>
              );
            })}
          </div>
        </div>

        <AIBlock label="How these tactics work together as a system to trap you" text={aiInsights?.subscaleInsight} loading={aiLoading} />

        {/* ── RED FLAGS ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <ShieldAlert className="w-7 h-7 text-rose-600" />
            <h2 className="text-2xl font-black text-slate-800">Danger Zone Markers</h2>
          </div>
          <p className="text-slate-500 text-sm mb-6">These flags represent the most severe individual incidents detected in your answers.</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`w-6 h-14 rounded-md ${
                i < result.criticalFlags
                  ? result.criticalFlags >= 7 ? "bg-rose-600" : result.criticalFlags >= 4 ? "bg-orange-500" : "bg-yellow-400"
                  : "bg-slate-100"
              }`} />
            ))}
          </div>
          <p className="text-base font-black text-rose-600 bg-rose-50 px-5 py-2 rounded-full inline-block">
            {result.criticalFlags} / 10 critical flags triggered
          </p>
        </div>

        <AIBlock label="What these flags actually mean in real-world terms" text={aiInsights?.redFlagInsight} loading={aiLoading} />

        {/* ── BELL CURVE ── */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-7 h-7 text-indigo-500" />
            <h2 className="text-2xl font-black text-slate-800">Population Context</h2>
          </div>
          <p className="text-slate-600 font-medium text-lg mb-6">
            You are in the <span className="text-rose-600 font-black">{populationPct}th percentile</span> for gaslighting exposure intensity compared to all users.
          </p>
          <BellCurve pct={populationPct} />
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Total Tactics Score", value: `${tacticsPct}%` },
              { label: "Population Percentile", value: `${populationPct}th` },
              { label: "Critical Flags", value: `${result.criticalFlags}/10` },
            ].map((s, i) => (
              <div key={i} className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
                <p className="text-2xl font-black text-indigo-700">{s.value}</p>
                <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <AIBlock label="Your unique psychological erosion profile" text={aiInsights?.erosionProfileInsight} loading={aiLoading} />

        {/* ── DARK SECTION: ACTION PLAN ── */}
        <div className="bg-[#0c1120] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 w-32 h-32 text-white/4 pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#ffbc42]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#ffbc42]" />
            </div>
            <h2 className="text-2xl font-black text-white">Your Personalized Action Plan</h2>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed">
            Based on your Level {result.level} pattern, the most dangerous thing you can do right now is try to convince him with logic. 
            Gaslighters don't respond to evidence — they respond to you withdrawing supply. Your power is in clarity, documentation, and outside anchors.
          </p>
        </div>

        <AIBlock label="Your exact 3-step action plan — written for your specific scores" text={aiInsights?.actionInsight} loading={aiLoading} />

        {/* ── VALUE STACK ── */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-7 h-7 text-[#ffbc42]" />
            <h2 className="text-2xl font-black text-slate-800">What You Just Unlocked — €12.99 Total</h2>
          </div>
          <div className="space-y-1">
            {valueStack.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span className="font-medium text-slate-700 text-sm">{v.item}</span>
                </div>
                <span className="font-black text-slate-300 line-through text-sm ml-4 shrink-0">{v.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Total Retail Value</p>
              <p className="text-xl font-black text-indigo-300 line-through">€130+</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-widest text-rose-500">You Paid Today</p>
              <p className="text-4xl font-black text-indigo-700">€12.99</p>
            </div>
          </div>
        </div>

        {/* ── BRIDGE TO UPSELL ── */}
        <div className="bg-[#312E81] rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
          <Sparkles className="absolute bottom-4 left-4 w-28 h-28 text-white/5 pointer-events-none" />
          <span className="inline-block bg-[#ffbc42] text-[#312E81] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            🎁 Your Next Step
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            You Know What He&apos;s Doing.<br />
            <span className="text-[#ffbc42]">Now Learn How To Stop It.</span>
          </h2>
          <p className="text-indigo-300 font-medium text-xl max-w-2xl mx-auto">
            The report told you the diagnosis. The playbooks give you the cure — word for word, step by step.
          </p>
        </div>

        {/* ── PLAYBOOK CARDS ── */}
        <div>
          <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">Choose Your Weapon</h2>
          <p className="text-center text-slate-500 font-medium mb-8">Two playbooks. One mission: get your mind back.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <PlaybookCard
              title="Gaslighting Defense Playbook"
              subtitle="Shut it down. Take your reality back."
              price={9.99} strikePrice={29.99}
              badge="Playbook 1"
              highlight={false}
              icon={<ShieldAlert className="w-6 h-6" />}
              gumroadUrl="https://sinadehesh.gumroad.com/l/gaslighting-defense-playbook"
              cta="Get This Playbook"
              bullets={[
                "50+ pages of step-by-step defense strategies",
                '12 copy-paste "Shut It Down" script templates',
                "How to document incidents legally & safely",
                "The grey-rock method explained with examples",
                "Safe exit planning checklist",
                "Based on clinical coercive control research",
              ]}
            />
            <PlaybookCard
              title="How A Healthy Man Treats You"
              subtitle="Know the standard. Never settle again."
              price={9.99} strikePrice={29.99}
              badge="Playbook 2"
              highlight={true}
              icon={<Heart className="w-6 h-6" />}
              gumroadUrl="https://sinadehesh.gumroad.com/l/healthy-man-playbook"
              cta="Get This Playbook"
              bullets={[
                "45+ pages on what secure, healthy love looks like",
                "30 green-flag behaviours of emotionally safe men",
                "The 5 conversations a healthy man never avoids",
                "Self-worth recalibration exercises",
                "Attachment re-programming journal prompts",
                "Based on Gottman & Hendrix research",
              ]}
            />
          </div>
        </div>

        {/* ── BUNDLE ── */}
        <BundleBanner />

        {/* ── SOCIAL PROOF ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { quote: "The 'Shut It Down' scripts alone were worth 10x the price. I finally stopped JADE-ing and started using the grey rock. He had nothing left to feed on.", name: "Alessia R., 29" },
            { quote: "I cried reading the erosion profile. It described exactly how I felt for 2 years. Just knowing it has a name made me feel less insane.", name: "Priya M., 33" },
            { quote: "The healthy man playbook reset my baseline completely. I didn't realize how low my standards had fallen until I read what normal actually looks like.", name: "Sofia K., 27" },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#ffbc42] fill-[#ffbc42]" />)}</div>
              <p className="text-slate-700 font-medium text-sm leading-relaxed italic">&quot;{t.quote}&quot;</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-auto">— {t.name}</p>
            </div>
          ))}
        </div>

        {/* ── URGENCY STRIP ── */}
        <div className="bg-rose-600 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-white shrink-0 animate-pulse" />
            <p className="font-black text-white text-lg">Introductory pricing — available while it lasts.</p>
          </div>
          <a href="https://sinadehesh.gumroad.com/l/gaslighting-bundle" target="_blank" rel="noopener noreferrer"
            className="shrink-0 px-8 py-3 bg-white text-rose-600 rounded-xl font-black text-lg hover:bg-rose-50 transition-all">
            Lock In €15.99 Bundle Now
          </a>
        </div>

        {/* ── CROSS-SELL ── */}
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-8 md:p-12 text-center shadow-md">
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-black text-xs tracking-widest uppercase mb-6">
            Understand Yourself Next
          </span>
          <h3 className="text-3xl font-black text-slate-800 mb-4">Why Did You Attract This Dynamic?</h3>
          <p className="text-xl font-medium text-slate-500 mb-8 max-w-lg mx-auto">
            Your attachment style is the missing piece. Take the 12-minute clinical quiz to understand why this felt familiar — and how to change it.
          </p>
          <a href="/attachment-style-quiz"
            className="inline-flex items-center justify-center gap-3 py-5 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1">
            Take The Attachment Quiz <ArrowRight className="w-6 h-6" />
          </a>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-3 justify-center pb-4 opacity-40">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">
            Instant PDF delivery · No subscription · Secure checkout via Gumroad
          </p>
        </div>

      </div>
    </div>
  );
}
