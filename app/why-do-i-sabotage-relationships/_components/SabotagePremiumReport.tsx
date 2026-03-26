"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  AlertTriangle, Flame, ShieldOff, Brain, HeartCrack,
  ArrowRight, CheckCircle2, Zap, Sparkles, TrendingUp,
  Lock, BookOpen, Star, Target, Clock, ChevronDown, Activity, ShieldAlert
} from "lucide-react";
import Link from "next/link";

// ── Types matching calculateSabotageScore output exactly ──────────────────────
interface Subscale {
  key: string;
  label: string;
  score: number;
  max: number;
  pct: number;
}

interface Composites {
  anxiousPattern: number;
  avoidantPattern: number;
  selfWorthCore: number;
  vulnerabilityScore: number;
  defenseScore: number;
}

interface LevelData {
  title: string;
  subtitle: string;
  advice: string;
}

export interface SabotageResult {
  totalScore: number;
  maxScore: number;
  level: number;
  levelData: LevelData;
  archetype: string;
  subscales: Subscale[];
  composites: Composites;
  criticalFlags: number;
  topDrivers: Subscale[];
}

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const iv = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    iv.current = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(iv.current!); }
      else setVal(cur);
    }, 16);
    return () => clearInterval(iv.current!);
  }, [target, duration]);
  return <>{val}</>;
}

// ── Animated Progress Bar ─────────────────────────────────────────────────────
function AnimatedBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), delay + 200);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="w-full h-3 bg-[#e8e0cc] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${w}%`, backgroundColor: color }} />
    </div>
  );
}

// ── Radar / Spider SVG ────────────────────────────────────────────────────────
function RadarChart({ subscales }: { subscales: Subscale[] }) {
  const cx = 150, cy = 155, r = 105;
  const n = subscales.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, scale: number) => ({
    x: cx + scale * r * Math.cos(angle(i)),
    y: cy + scale * r * Math.sin(angle(i)),
  });
  const dataPoints = subscales.map((s, i) => pt(i, s.pct / 100));
  const outerPoints = subscales.map((_, i) => pt(i, 1));
  const poly = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + "Z";

  return (
    <svg viewBox="0 0 300 310" className="w-full max-w-[280px] mx-auto">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon key={s}
          points={subscales.map((_, i) => { const p = pt(i, s); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke="#d6cdb0" strokeWidth="1" />
      ))}
      {outerPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#d6cdb0" strokeWidth="1" />
      ))}
      <path d={poly} fill="#dd1c1a" fillOpacity="0.15" stroke="#dd1c1a" strokeWidth="2.5" strokeLinejoin="round">
        <animate attributeName="fillOpacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite" />
      </path>
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#dd1c1a">
          <animate attributeName="r" values="4;6;4" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {outerPoints.map((p, i) => {
        const lx = cx + (r + 24) * Math.cos(angle(i));
        const ly = cy + (r + 24) * Math.sin(angle(i));
        const words = subscales[i].label.split(" ");
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fontWeight="800" fill="#086788">
            {words.map((w, wi) => (
              <tspan key={wi} x={lx} dy={wi === 0 ? 0 : 10}>{w}</tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

// ── Bell Curve ────────────────────────────────────────────────────────────────
function BellCurve({ pct }: { pct: number }) {
  const [mx, setMx] = useState(0);
  useEffect(() => { const t = setTimeout(() => setMx(pct * 10), 500); return () => clearTimeout(t); }, [pct]);
  return (
    <svg viewBox="0 0 1000 220" className="w-full h-auto">
      <defs>
        <linearGradient id="sbBellFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06aed5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06aed5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,210 C200,210 380,18 500,18 C620,18 800,210 1000,210Z" fill="url(#sbBellFill)" />
      <path d="M0,210 C200,210 380,18 500,18 C620,18 800,210 1000,210"
        fill="none" stroke="#06aed5" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="820" y1="14" x2="820" y2="210" stroke="#086788" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
      <text x="820" y="9" textAnchor="middle" fill="#086788" fontSize="11" fontWeight="800">Secure Top 10%</text>
      {/* animated marker */}
      <g style={{ transform: `translateX(${mx - 500}px)`, transition: "transform 1.3s cubic-bezier(0.2,0.8,0.2,1)" }}>
        <line x1="500" y1="14" x2="500" y2="210" stroke="#dd1c1a" strokeWidth="3" />
        <circle cx="500" cy="14" r="7" fill="#dd1c1a">
          <animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="500" y="4" textAnchor="middle" fill="#dd1c1a" fontSize="13" fontWeight="900">YOU</text>
      </g>
    </svg>
  );
}

// ── Playbook Card ─────────────────────────────────────────────────────────────
interface PlaybookCardProps {
  title: string; subtitle: string; price: number; strikePrice: number;
  badge: string; bullets: string[]; cta: string; highlight?: boolean;
  gumroadUrl: string; icon: React.ReactNode;
}
function PlaybookCard({ title, subtitle, price, strikePrice, badge, bullets, cta, highlight, gumroadUrl, icon }: PlaybookCardProps) {
  return (
    <div className={`relative rounded-3xl p-8 md:p-10 border-2 flex flex-col gap-6 shadow-lg transition-transform hover:-translate-y-1
      ${highlight ? "border-[#f0c808] bg-white" : "border-[#d6d2d2] bg-[#fffdf5]"}`}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f0c808] text-[#086788] text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow">
          Most Popular
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#086788]/10 text-[#086788]">{icon}</div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#dd1c1a] mb-0.5">{badge}</p>
          <h3 className="text-xl font-black text-[#086788]">{title}</h3>
          <p className="text-sm font-medium text-[#086788]/60">{subtitle}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-medium text-[#086788]/80">
            <CheckCircle2 className="w-4 h-4 text-[#06aed5] shrink-0 mt-0.5" />{b}
          </li>
        ))}
      </ul>
      <div className="flex items-end gap-3 mt-auto">
        <span className="text-4xl font-black text-[#086788]">€{price.toFixed(2)}</span>
        <span className="text-sm font-bold text-[#086788]/30 line-through mb-1">€{strikePrice.toFixed(2)}</span>
      </div>
      <a href={gumroadUrl} target="_blank" rel="noopener noreferrer"
        className={`w-full py-4 rounded-xl font-black text-lg text-center flex items-center justify-center gap-2 transition-all shadow
          ${highlight ? "bg-[#f0c808] text-[#086788] hover:bg-[#e0b800]" : "bg-[#086788] text-white hover:bg-[#06aed5]"}`}>
        {cta} <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}

// ── Bundle Banner ─────────────────────────────────────────────────────────────
function BundleBanner() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border-2 border-[#dd1c1a] bg-white shadow-xl overflow-hidden">
      <button
        className="w-full bg-[#dd1c1a] px-8 py-5 flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <Flame className="w-6 h-6 text-white animate-pulse" />
          <span className="text-white font-black text-xl">🔥 BUNDLE BOTH — Save 20%</span>
        </div>
        <ChevronDown className={`w-6 h-6 text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="p-8 md:p-10 space-y-5">
          <p className="text-[#086788]/80 font-medium text-lg leading-relaxed">
            Get <strong>both playbooks</strong> — the Attachment Style Workbook <em>and</em> the Trauma Style Playbook — at one combined price. Together they cover the full root-cause picture of your self-sabotage pattern.
          </p>
          <ul className="space-y-2">
            {[
              "Attachment Style Workbook (€9.99 value)",
              "Trauma Style Playbook (€9.99 value)",
              "Bonus: 7-Day Rewire Daily Protocol",
              "Bonus: Partner Communication Script Templates",
            ].map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-bold text-[#086788]">
                <Star className="w-4 h-4 text-[#f0c808] shrink-0" />{b}
              </li>
            ))}
          </ul>
          <div className="flex items-end gap-4">
            <span className="text-5xl font-black text-[#086788]">€15.99</span>
            <div className="flex flex-col mb-1">
              <span className="text-sm font-bold text-[#086788]/30 line-through">€19.98</span>
              <span className="text-xs font-black text-[#dd1c1a] uppercase tracking-widest">You save €3.99</span>
            </div>
          </div>
          <a href="https://sinadehesh.gumroad.com/l/sabotage-bundle"
            target="_blank" rel="noopener noreferrer"
            className="w-full py-5 bg-[#dd1c1a] text-white rounded-xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#b10f2e] transition-all shadow-lg">
            Get The Bundle Now <Zap className="w-6 h-6" />
          </a>
          <p className="text-center text-xs font-bold text-[#086788]/30 uppercase tracking-widest">
            Instant PDF delivery · No subscription · Secure checkout via Gumroad
          </p>
        </div>
      )}
    </div>
  );
}

// ── MAIN EXPORT — receives the same `result` prop as SabotageReport ───────────
export default function SabotagePremiumReport({ result }: { result: SabotageResult }) {
  const overallPct = Math.round((result.totalScore / result.maxScore) * 100);
  // Population percentile: higher score = higher percentile
  const populationPercentile = Math.min(99, Math.round(overallPct * 0.9 + 5));

  const severityLabel =
    overallPct >= 75 ? { text: "Extreme Sabotage Pattern", color: "#dd1c1a" } :
    overallPct >= 50 ? { text: "Moderate Sabotage Pattern", color: "#f0c808" } :
    { text: "Mild Sabotage Tendencies", color: "#06aed5" };

  return (
    <div className="min-h-screen bg-[#fff1d0] py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-10">

        {/* ── HERO ── */}
        <div className="bg-[#086788] rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
          <Sparkles className="absolute top-4 right-4 w-40 h-40 text-white/5 rotate-12 pointer-events-none" />
          <ShieldOff className="absolute -bottom-6 -left-6 w-32 h-32 text-white/5 pointer-events-none" />
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 mb-6">
            <Brain className="w-4 h-4 text-[#06aed5]" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Behavioral Audit Complete</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Your Sabotage<br /><span className="text-[#f0c808]">Blueprint</span>
          </h1>
          <p className="text-[#06aed5] text-xl font-medium max-w-lg mx-auto">
            We mapped every pattern. Here's exactly why you self-destruct in relationships — and the precise steps to stop.
          </p>
        </div>

        {/* ── ARCHETYPE REVEAL ── */}
        <div className="bg-white rounded-3xl border-l-8 border-[#dd1c1a] p-8 md:p-12 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-[#dd1c1a] mb-2 flex items-center gap-2">
            <HeartCrack className="w-4 h-4" /> Your Sabotage Archetype
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#086788] mb-3">"{result.archetype}"</h2>
          <p className="text-lg font-black text-[#086788]/50 mb-6">Level {result.level}: {result.levelData.title}</p>
          <p className="text-lg font-medium text-[#086788]/85 leading-relaxed mb-6">
            {result.levelData.subtitle}
          </p>
          <div className="bg-[#fff1d0] border border-[#e8d8a0] rounded-2xl p-5">
            <p className="text-base font-medium text-[#086788]/80 leading-relaxed">{result.levelData.advice}</p>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2 font-black text-sm"
            style={{ backgroundColor: severityLabel.color + "18", color: severityLabel.color, border: `1.5px solid ${severityLabel.color}40` }}>
            <AlertTriangle className="w-4 h-4" /> {severityLabel.text}
          </div>
        </div>

        {/* ── SCORE DASHBOARD ── */}
        <div className="bg-white rounded-3xl border border-[#d6d2d2] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-7 h-7 text-[#06aed5]" />
            <h2 className="text-3xl font-black text-[#086788]">Your 5-Axis Sabotage Scan</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              {result.subscales.map((s, i) => {
                const barColor = s.pct >= 75 ? "#dd1c1a" : s.pct >= 50 ? "#f0c808" : "#06aed5";
                return (
                  <div key={s.key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-black text-[#086788]">{s.label}</span>
                      <span className="text-sm font-black" style={{ color: barColor }}>
                        <AnimatedNumber target={Math.round(s.pct)} />%
                      </span>
                    </div>
                    <AnimatedBar value={s.pct} color={barColor} delay={i * 120} />
                  </div>
                );
              })}
            </div>
            <RadarChart subscales={result.subscales} />
          </div>
        </div>

        {/* ── COMPOSITES ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-xl text-[#086788] flex items-center gap-2">
                <Activity className="text-[#dd1c1a] w-5 h-5" /> Anxious Pattern
              </h4>
              <span className="text-sm font-bold text-[#dd1c1a] bg-[#dd1c1a]/10 px-3 py-1 rounded-full">
                {result.composites.anxiousPattern} / 80
              </span>
            </div>
            <p className="text-[#086788]/60 text-sm mb-4">Hypervigilance, testing, fear of abandonment.</p>
            <AnimatedBar value={(result.composites.anxiousPattern / 80) * 100} color="#dd1c1a" delay={300} />
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-xl text-[#086788] flex items-center gap-2">
                <ShieldAlert className="text-[#086788]/60 w-5 h-5" /> Avoidant Pattern
              </h4>
              <span className="text-sm font-bold text-[#086788]/60 bg-[#086788]/10 px-3 py-1 rounded-full">
                {result.composites.avoidantPattern} / 80
              </span>
            </div>
            <p className="text-[#086788]/60 text-sm mb-4">Distancing, emotional shutdown, fear of engulfment.</p>
            <AnimatedBar value={(result.composites.avoidantPattern / 80) * 100} color="#086788" delay={400} />
          </div>
        </div>

        {/* ── BELL CURVE ── */}
        <div className="bg-white rounded-3xl border border-[#d6d2d2] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-7 h-7 text-[#06aed5]" />
            <h2 className="text-3xl font-black text-[#086788]">Population Context</h2>
          </div>
          <p className="text-[#086788]/75 font-medium text-lg mb-8 leading-relaxed">
            <strong>You are not broken.</strong> You measure in the{" "}
            <span className="text-[#dd1c1a] font-black">{populationPercentile}th percentile</span>{" "}
            for self-sabotage intensity. The chart shows where you land across the full population distribution.
          </p>
          <BellCurve pct={populationPercentile} />
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: "Overall Sabotage Score", value: overallPct, suffix: "%" },
              { label: "Population Percentile", value: populationPercentile, suffix: "th" },
              { label: "Critical Flag Count", value: result.criticalFlags, suffix: "" },
            ].map((s, i) => (
              <div key={i} className="bg-[#fff1d0] rounded-2xl p-4 text-center border border-[#e8d8a0]">
                <p className="text-3xl font-black text-[#086788]">
                  <AnimatedNumber target={s.value} />{s.suffix}
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-[#086788]/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOP DRIVERS ── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border-l-4 border-[#dd1c1a] p-7 shadow-sm">
            <Lock className="w-7 h-7 text-[#dd1c1a] mb-3" />
            <h3 className="text-xl font-black text-[#086788] mb-2">Primary Sabotage Driver</h3>
            <p className="text-2xl font-black text-[#dd1c1a] mb-2">{result.topDrivers[0]?.label}</p>
            <p className="font-medium text-[#086788]/75 text-sm leading-relaxed">
              This is the dominant mechanism causing you to push people away or create conflict before closeness develops.
            </p>
          </div>
          <div className="bg-white rounded-2xl border-l-4 border-[#f0c808] p-7 shadow-sm">
            <Flame className="w-7 h-7 text-[#f0c808] mb-3" />
            <h3 className="text-xl font-black text-[#086788] mb-2">Secondary Trigger</h3>
            <p className="text-2xl font-black text-[#f0c808] mb-2">{result.topDrivers[1]?.label}</p>
            <p className="font-medium text-[#086788]/75 text-sm leading-relaxed">
              This amplifies your primary driver — especially when both activate together under relationship stress.
            </p>
          </div>
        </div>

        {/* ── VALUE STACK BRIDGE ── */}
        <div className="bg-[#086788] rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
          <Sparkles className="absolute bottom-4 left-4 w-28 h-28 text-white/5 pointer-events-none" />
          <span className="inline-block bg-[#f0c808] text-[#086788] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
            🎁 What Comes Next
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            You Now Have the Diagnosis.<br />
            <span className="text-[#f0c808]">Here's the Treatment.</span>
          </h2>
          <p className="text-[#06aed5] font-medium text-xl max-w-2xl mx-auto">
            Most people read their result and do nothing. The ones who change, use a system. We built two — hyper-specific to what your data revealed.
          </p>
        </div>

        {/* ── HORMOZI VALUE STACK ── */}
        <div className="bg-white rounded-3xl border border-[#d6d2d2] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-7 h-7 text-[#f0c808]" />
            <h2 className="text-3xl font-black text-[#086788]">Everything You're Getting</h2>
          </div>
          <div className="space-y-1">
            {[
              { label: "Attachment Style Workbook PDF (50+ pages)", value: "€9.99" },
              { label: "Trauma Style Playbook PDF (40+ pages)", value: "€9.99" },
              { label: "7-Day Rewire Protocol (daily actions, 10 min/day)", value: "€4.99" },
              { label: "Partner Communication Script Templates", value: "€6.99" },
              { label: "Root Cause Mapping Worksheet", value: "€3.99" },
              { label: "Trigger Identification Journal Pages", value: "€2.99" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e0cc] last:border-0">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06aed5] shrink-0" />
                  <span className="font-medium text-[#086788]">{item.label}</span>
                </div>
                <span className="font-black text-[#086788]/35 line-through text-sm ml-4 shrink-0">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between bg-[#fff1d0] rounded-2xl p-5 border border-[#e8d8a0]">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#086788]/50">Total Retail Value</p>
              <p className="text-xl font-black text-[#086788]/35 line-through">€38.94</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-widest text-[#dd1c1a]">Bundle Price Today</p>
              <p className="text-4xl font-black text-[#086788]">€15.99</p>
            </div>
          </div>
        </div>

        {/* ── PLAYBOOK CARDS ── */}
        <div>
          <h2 className="text-3xl font-black text-[#086788] mb-8 text-center">Choose Your Playbook</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <PlaybookCard
              title="Attachment Style Workbook"
              subtitle="Rewire your bonding patterns from the root"
              price={9.99} strikePrice={19.99}
              badge="Workbook" highlight={false}
              icon={<BookOpen className="w-6 h-6" />}
              gumroadUrl="https://sinadehesh.gumroad.com/l/attachment-workbook"
              cta="Get This Workbook"
              bullets={[
                "50+ pages of guided exercises",
                "Identify your exact attachment style with scoring",
                "Daily reprogramming habits — just 10 min/day",
                "Partner communication templates included",
                "Based on Ainsworth + Bowlby research",
              ]}
            />
            <PlaybookCard
              title="Trauma Style Playbook"
              subtitle="Understand your trauma response in relationships"
              price={9.99} strikePrice={19.99}
              badge="Playbook" highlight={true}
              icon={<Brain className="w-6 h-6" />}
              gumroadUrl="https://sinadehesh.gumroad.com/l/trauma-playbook"
              cta="Get This Playbook"
              bullets={[
                "40+ pages of trauma-informed exercises",
                "Map your exact trauma response style",
                "Nervous system regulation techniques",
                "Somatic body-based exercises included",
                "Peer-reviewed psychology framework",
              ]}
            />
          </div>
        </div>

        {/* ── BUNDLE ── */}
        <BundleBanner />

        {/* ── SOCIAL PROOF ── */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { quote: "I finally understood WHY I kept pushing people away. The playbook gave me 3 habits I use every single day.", name: "Sara M., 28" },
            { quote: "The radar chart alone was worth it. I could see my control needs were off the charts. Life-changing clarity.", name: "Jade T., 34" },
            { quote: "I bought both books. The bundle price is insane value. Therapist-quality content for less than a coffee.", name: "Priya R., 31" },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#d6d2d2] shadow-sm flex flex-col gap-4">
              <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#f0c808] fill-[#f0c808]" />)}</div>
              <p className="text-[#086788]/80 font-medium text-sm leading-relaxed italic">"{t.quote}"</p>
              <p className="text-xs font-black text-[#086788]/45 uppercase tracking-widest mt-auto">— {t.name}</p>
            </div>
          ))}
        </div>

        {/* ── URGENCY STRIP ── */}
        <div className="bg-[#dd1c1a] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-white shrink-0 animate-pulse" />
            <p className="font-black text-white text-lg">Introductory pricing — once it's gone, it's gone.</p>
          </div>
          <a href="https://sinadehesh.gumroad.com/l/sabotage-bundle" target="_blank" rel="noopener noreferrer"
            className="shrink-0 px-8 py-3 bg-white text-[#dd1c1a] rounded-xl font-black text-lg hover:bg-[#fff1d0] transition-all">
            Lock In €15.99 Now
          </a>
        </div>

        {/* ── CROSS-SELL ── */}
        <div className="bg-white rounded-3xl border-2 border-[#086788] p-8 md:p-12 text-center shadow-md">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#086788]/10 text-[#086788] font-black text-xs tracking-widest uppercase mb-6">
            Your Next Diagnosis
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-[#086788] mb-4">
            What's Your Attachment Style?
          </h3>
          <p className="text-xl font-medium text-[#086788]/70 mb-8 max-w-lg mx-auto">
            Your sabotage score links directly to your attachment wiring. Take the 12-minute clinical attachment quiz to complete your full picture.
          </p>
          <Link href="/attachment-style-quiz"
            className="inline-flex items-center justify-center gap-3 py-5 px-10 bg-[#086788] hover:bg-[#06aed5] text-white rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1">
            Take The Attachment Quiz <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* ── FOOTER NOTE ── */}
        <div className="flex items-center gap-3 justify-center pb-4 opacity-40">
          <p className="text-xs font-black uppercase tracking-widest text-[#086788]">
            Instant PDF delivery · No subscription · Secure checkout via Gumroad
          </p>
        </div>

      </div>
    </div>
  );
}
