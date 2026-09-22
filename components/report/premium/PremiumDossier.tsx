"use client";

import React, { useEffect, useState } from "react";
import {
  Activity, BarChart3, Brain, MessageSquareQuote, ClipboardCheck,
  ChevronDown, CheckCircle2, Fingerprint, HelpCircle, Sparkles,
} from "lucide-react";
import RiskGauge from "@/components/report/charts/RiskGauge";
import SubscaleRadar from "@/components/report/charts/SubscaleRadar";
import SignalFrequency from "@/components/report/charts/SignalFrequency";
import CoachingUpsell from "@/components/offers/CoachingUpsell";
import { scoreToSeverity } from "@/lib/offers/catalog";
import type { Dossier } from "@/lib/report/dossier";
import { insightFor, intensityLabel, tierOf } from "@/lib/report/dossier";

/**
 * PREMIUM DOSSIER
 *
 * One renderer for every paid report. It reads a `Dossier` (see
 * lib/report/dossier.ts) and lays it out as five sections:
 *
 *   01 Executive summary — the verdict, as a gauge and three hero numbers
 *   02 Data breakdown    — radar + magnitude bars + per-dimension writing
 *   03 Deep dive         — why the pattern exists
 *   04 Scripts           — what to actually say
 *   05 Plan              — a dated fortnight, not a list of adjectives
 *
 * Charts do the comparing, prose does the explaining. Nothing here is
 * band-generic: every dimension carries its own mechanism and counter-move,
 * so two people in the same band read two different reports.
 */

function SectionHeader({
  no, kicker, title, icon: Icon, accent,
}: { no: string; kicker: string; title: string; icon: any; accent: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>
          Section {no}
        </span>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">{kicker}</span>
      </div>
      <h2 className="text-2xl md:text-[2rem] font-black text-slate-900 tracking-tight flex items-center gap-3">
        <Icon className="w-6 h-6 shrink-0" style={{ color: accent }} />
        {title}
      </h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] ${className}`}>
      {children}
    </div>
  );
}

/** Assembling state — a paid report should feel compiled, not pasted. */
function Assembling({ accent, steps }: { accent: string; steps: string[] }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, steps.length)), 400);
    return () => clearInterval(t);
  }, [steps.length]);
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative w-24 h-24 mb-10">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" style={{ borderTopColor: accent }} />
        <Fingerprint className="absolute inset-0 m-auto w-10 h-10 text-slate-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-8">Compiling your dossier…</h2>
      <div className="space-y-3 text-left">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-3 transition-opacity duration-300 ${i <= step ? "opacity-100" : "opacity-30"}`}>
            {i < step
              ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              : <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin" />}
            <span className="text-slate-600 font-bold text-sm">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One measured dimension, expandable. Collapsed by default — the reader
 *  scans the bars first, then opens the two or three that stung. */
const FALLBACK_INSIGHT = {
  mechanism: "",
  high: "", mid: "", low: "",
  move: "",
};

function SubscaleCard({
  d, insight: maybeInsight, accent, defaultOpen,
}: { d: any; insight: any; accent: string; defaultOpen: boolean }) {
  const insight = maybeInsight ?? FALLBACK_INSIGHT;
  const [open, setOpen] = useState(defaultOpen);
  const tier = tierOf(d.value);
  const tierStyle =
    tier === "high" ? { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200" }
    : tier === "mid" ? { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" }
    : { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" };

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left p-5 md:p-6 flex items-start gap-4 hover:bg-slate-50/70 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-2">
            <h3 className="font-black text-slate-900 text-lg">{d.label}</h3>
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${tierStyle.bg} ${tierStyle.text} ${tierStyle.ring}`}>
              {intensityLabel(d.value)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{ width: `${d.value}%`, backgroundColor: accent }}
              />
            </div>
            <span className="text-sm font-black text-slate-700 tabular-nums w-10 text-right">{d.value}</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-2.5">{d.measures}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 md:px-6 pb-6 -mt-1 space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
          <div className="h-px bg-slate-100" />
          {insightFor(insight, d.value) && (
            <p className="text-slate-700 leading-relaxed font-medium">{insightFor(insight, d.value)}</p>
          )}
          {insight.mechanism && (
            <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1.5">Why it works this way</p>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{insight.mechanism}</p>
            </div>
          )}
          {insight.move && (
            <div className="rounded-2xl p-4 border" style={{ backgroundColor: `${accent}0d`, borderColor: `${accent}33` }}>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] mb-1.5" style={{ color: accent }}>
                Your counter-move
              </p>
              <p className="text-slate-800 text-sm leading-relaxed font-semibold">{insight.move}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function PremiumDossier({
  dossier,
  assemblingSteps,
}: {
  dossier: Dossier;
  assemblingSteps?: string[];
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1700);
    return () => clearTimeout(t);
  }, []);

  const { band, subscales, insights } = dossier;
  const accent = band.accent;

  const steps = assemblingSteps ?? [
    "Reading your response pattern",
    `Scoring ${subscales.length} behavioural dimensions`,
    "Matching your profile against the norm set",
    "Writing your action plan",
  ];

  if (!ready) return <Assembling accent={accent} steps={steps} />;

  const ranked = [...subscales].sort((a, b) => b.value - a.value);
  if (!ranked.length) {
    // No usable dimensions — show the verdict rather than crashing the
    // page someone has paid for.
    return (
      <div className="bg-[#FAFAF7] min-h-screen px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">{dossier.title}</h1>
          <p className="text-slate-700 leading-relaxed font-medium">{band.verdict}</p>
        </div>
      </div>
    );
  }
  const top = ranked[0];
  const lowest = ranked[ranked.length - 1];
  const spread = top.value - lowest.value;
  const elevated = subscales.filter((s) => s.value >= 67).length;

  return (
    <div className="bg-[#FAFAF7] min-h-screen animate-in fade-in duration-500">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[#0E1621] text-white">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ background: `radial-gradient(60% 80% at 50% 0%, ${accent}, transparent 70%)` }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">
            {dossier.quiz} · Complete Report
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">{dossier.title}</h1>

          <div className="flex justify-center mb-6">
            <RiskGauge value={dossier.score} accent={accent} label={dossier.scoreLabel} />
          </div>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-black mb-7"
            style={{ backgroundColor: `${accent}22`, borderColor: `${accent}55`, color: accent }}
          >
            <Activity className="w-4 h-4" /> {band.label}
          </div>

          <p className="max-w-2xl mx-auto text-white/75 text-base md:text-lg leading-relaxed font-medium">
            {band.verdict}
          </p>

          {dossier.archetype && (
            <div className="mt-9 max-w-2xl mx-auto rounded-3xl bg-white/[0.06] border border-white/10 p-6 text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> {dossier.archetypeLabel ?? "Your profile"}
              </p>
              <p className="text-xl md:text-2xl font-black mb-2" style={{ color: accent }}>{dossier.archetype}</p>
              {dossier.archetypeBlurb && (
                <p className="text-white/70 leading-relaxed font-medium">{dossier.archetypeBlurb}</p>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-14 md:py-20 space-y-20 md:space-y-24">
        {/* ── 01 EXECUTIVE SUMMARY ───────────────────────────────────── */}
        <section>
          <SectionHeader no="01" kicker="At a glance" title="Executive summary" icon={Activity} accent={accent} />

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { k: "Strongest driver", v: top.label, sub: `${top.value}/100 — ${intensityLabel(top.value)}` },
              { k: "Dimensions elevated", v: `${elevated} of ${subscales.length}`, sub: elevated >= subscales.length / 2 ? "A broad pattern, not one bad habit" : "Concentrated, which makes it fixable" },
              { k: "Profile spread", v: `${spread} pts`, sub: spread >= 40 ? "Sharply uneven — one area is carrying this" : "Even — the pattern is systemic" },
            ].map((s) => (
              <Card key={s.k} className="p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">{s.k}</p>
                <p className="text-lg font-black text-slate-900 leading-tight mb-1">{s.v}</p>
                <p className="text-xs text-slate-500 font-semibold leading-snug">{s.sub}</p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">What to do about the timing</p>
              <p className="text-slate-700 leading-relaxed font-medium">{band.urgency}</p>
            </Card>
            <Card className="p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Keep this in proportion</p>
              <p className="text-slate-700 leading-relaxed font-medium">{band.perspective}</p>
            </Card>
          </div>
        </section>

        {/* ── 02 DATA BREAKDOWN ──────────────────────────────────────── */}
        <section>
          <SectionHeader no="02" kicker="The numbers" title="Your data, dimension by dimension" icon={BarChart3} accent={accent} />

          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <Card className="p-6">
              <p className="font-black text-slate-900 mb-1">Profile shape</p>
              <p className="text-sm text-slate-500 font-medium mb-3">
                A balanced shape means the pattern is spread across your whole style; a spike means one dimension is driving it.
              </p>
              <SubscaleRadar
                accent={accent}
                // Match the bar chart's height so the two cards align.
                height={Math.max(320, subscales.length * 56 + 16)}
                data={subscales.map((s) => ({ axis: s.short, value: s.value, description: s.measures }))}
              />
            </Card>
            <Card className="p-6">
              <p className="font-black text-slate-900 mb-1">Ranked intensity</p>
              <p className="text-sm text-slate-500 font-medium mb-3">
                Read top down. The first two bars are where change pays for itself fastest.
              </p>
              <SignalFrequency
                accent={accent}
                data={ranked.map((s) => ({ label: s.short, value: s.value, description: s.measures }))}
              />
            </Card>
          </div>

          <div className="space-y-3">
            {ranked.map((s, i) => (
              <SubscaleCard
                key={s.key}
                d={s}
                insight={insights[s.key]}
                accent={accent}
                defaultOpen={i < 2}
              />
            ))}
          </div>
        </section>

        {/* ── 03 DEEP DIVE ───────────────────────────────────────────── */}
        {dossier.deepDive.length > 0 && (
          <section>
            <SectionHeader no="03" kicker="The mechanism" title="Why this pattern exists" icon={Brain} accent={accent} />
            <div className="space-y-4">
              {dossier.deepDive.map((d, i) => (
                <Card key={d.heading} className="p-6 md:p-8">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-xs font-black tabular-nums" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-black text-slate-900">{d.heading}</h3>
                  </div>
                  <p className="text-slate-700 leading-[1.75] font-medium">{d.body}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── 04 SCRIPTS ─────────────────────────────────────────────── */}
        {dossier.scripts.length > 0 && (
          <section>
            <SectionHeader no="04" kicker="Word for word" title="What to actually say" icon={MessageSquareQuote} accent={accent} />
            <div className="space-y-4">
              {dossier.scripts.map((s) => (
                <Card key={s.situation} className="p-6 md:p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">{s.situation}</p>
                  <blockquote
                    className="border-l-[3px] pl-5 py-1 text-lg md:text-xl font-bold text-slate-900 leading-relaxed mb-4"
                    style={{ borderColor: accent }}
                  >
                    “{s.say}”
                  </blockquote>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    <span className="font-black text-slate-500">Why it lands: </span>{s.why}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ── 05 PLAN ────────────────────────────────────────────────── */}
        {dossier.plan.length > 0 && (
          <section>
            <SectionHeader no="05" kicker="Next 14 days" title="Your action plan" icon={ClipboardCheck} accent={accent} />
            <div className="relative pl-6 md:pl-8">
              <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />
              <div className="space-y-6">
                {dossier.plan.map((p) => (
                  <div key={p.window} className="relative">
                    <div
                      className="absolute -left-6 md:-left-8 top-1.5 w-4 h-4 rounded-full border-[3px] border-white"
                      style={{ backgroundColor: accent }}
                    />
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{p.window}</p>
                    <h3 className="text-lg font-black text-slate-900 mb-1.5">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        {dossier.faq && dossier.faq.length > 0 && (
          <section>
            <SectionHeader no="06" kicker="Loose ends" title="Questions this raises" icon={HelpCircle} accent={accent} />
            <div className="space-y-3">
              {dossier.faq.map((f) => (
                <Card key={f.q} className="p-6">
                  <h3 className="font-black text-slate-900 mb-2">{f.q}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{f.a}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <CoachingUpsell severity={scoreToSeverity(dossier.score)} topicLabel={dossier.topicLabel ?? "your results"} />
      </main>
    </div>
  );
}
