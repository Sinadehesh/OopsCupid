'use client';

import React, { useEffect, useState } from 'react';
import {
  Siren,
  ArrowRight,
  Brain,
  LifeBuoy,
  Anchor,
  Play,
  Square,
  Info,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

type BreathPhase = 'Inhale' | 'Exhale';

const PLAN_FIELDS = [
  {
    key: 'breathe' as const,
    step: 1,
    label: 'My physical grounding tool will be:',
    placeholder: 'e.g., Doing the 4-6 breathing anchor for 2 minutes.',
  },
  {
    key: 'call' as const,
    step: 2,
    label: 'My \u201cSafe Harbor\u201d contact to text/call instead of my partner is:',
    placeholder: 'e.g., My best friend Sarah, or my therapist.',
  },
  {
    key: 'mantra' as const,
    step: 3,
    label: 'My Adult Mantra to read when I panic is:',
    placeholder: "e.g., 'I am an adult. I am safe. Disappointment is not danger.'",
  },
] as const;

type PlanKey = (typeof PLAN_FIELDS)[number]['key'];

export default function Week6Day6() {
  const [planSteps, setPlanSteps] = useState<Record<PlanKey, string>>({
    breathe: '',
    call: '',
    mantra: '',
  });
  const [isPlanSaved, setIsPlanSaved] = useState(false);

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isBreathing) {
      timer = setTimeout(() => {
        if (timeLeft > 1) {
          setTimeLeft((t) => t - 1);
        } else {
          const next: BreathPhase = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
          setBreathPhase(next);
          setTimeLeft(next === 'Exhale' ? exhaleTime : inhaleTime);
        }
      }, 1000);
    } else {
      setBreathPhase('Inhale');
      setTimeLeft(inhaleTime);
    }
    return () => clearTimeout(timer);
  }, [isBreathing, timeLeft, breathPhase, inhaleTime, exhaleTime]);

  const handleBreathToggle = () => {
    if (!isBreathing) {
      setBreathPhase('Inhale');
      setTimeLeft(inhaleTime);
    }
    setIsBreathing((b) => !b);
  };

  const phaseDuration = isBreathing ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime) : 1;

  const handleSavePlan = () => {
    setIsPlanSaved(true);
    setTimeout(() => setIsPlanSaved(false), 3000);
  };

  const isPlanComplete = PLAN_FIELDS.every(({ key }) => planSteps[key].trim().length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-white to-pink-50/40 font-sans text-slate-800 pb-24">
      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.11),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.06),transparent_40%)]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-rose-700 mb-4">
            Week 6 &middot; Day 6 (Day 41)
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Fire Drill
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Building your Relapse Prevention Plan because you <em>will</em> get triggered again.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Attachment Insight */}
        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-white/70">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-5 flex items-center text-slate-900">
                <Siren className="w-7 h-7 text-rose-500 mr-3 shrink-0" />
                Attachment Insight: The Fire Drill
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  Earned Secure Attachment does not mean you never feel anxious again. It means you know
                  what to do when the anxiety hits.
                </p>
                <p>
                  Schools don&rsquo;t wait for a building to catch on fire to figure out how to evacuate.
                  They run <strong>Fire Drills</strong> when it&rsquo;s sunny and calm out. You must build
                  your relapse prevention plan today, while your prefrontal cortex is online.
                </p>
                <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-900 leading-relaxed">
                    <strong>The Realization:</strong> When the amygdala hijacks your brain, you will forget
                    everything in this workbook. You need a simple, 3-step physical checklist you can grab
                    without thinking.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1542282811-943ef1a67779?q=80&w=600&auto=format&fit=crop"
                alt="Red fire alarm on wall"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Breathing Anchor */}
        <section className="bg-slate-950 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/8 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
                <Anchor className="w-7 h-7 text-rose-400 mr-3 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                Let&rsquo;s practice the first step of your fire drill right now. Anchor yourself for
                60 seconds.
              </p>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-white">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-rose-400 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-white">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-rose-400 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                    transitionProperty: 'transform',
                    transitionTimingFunction: 'ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(244,63,94,0.2)] border border-rose-400/30"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                    transitionProperty: 'transform',
                    transitionTimingFunction: 'ease-in-out',
                  }}
                >
                  <span className="font-bold uppercase tracking-wider text-white text-sm">
                    {isBreathing ? breathPhase : 'Ready'}
                  </span>
                  {isBreathing && (
                    <span className="text-3xl font-light mt-1 text-white tabular-nums">{timeLeft}</span>
                  )}
                </div>
              </div>
              <button
                onClick={handleBreathToggle}
                className={`w-full max-w-xs py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all ${
                  isBreathing
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
                    : 'bg-white text-slate-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing ? (
                  <><Square className="w-5 h-5" /> Stop Anchor</>
                ) : (
                  <><Play className="w-5 h-5" /> Start Anchor Breath</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Emergency Protocol Builder */}
        <section className="bg-white/85 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-slate-900 mb-3">
              <LifeBuoy className="w-7 h-7 text-rose-500 shrink-0" />
              Practice 2: Build The Protocol
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
              Fill in each step now, while you&rsquo;re calm. When panic hits, this card is your rescue.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200 space-y-7">
              {PLAN_FIELDS.map(({ key, step, label, placeholder }) => (
                <div key={key}>
                  <label className="flex items-start gap-3 text-base font-bold text-slate-800 mb-3">
                    <span className="w-7 h-7 shrink-0 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-black mt-0.5">
                      {step}
                    </span>
                    {label}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-rose-400 outline-none placeholder:text-slate-400"
                    placeholder={placeholder}
                    value={planSteps[key]}
                    onChange={(e) => setPlanSteps((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>

            {/* Compiled card preview */}
            {isPlanComplete && (
              <div className="mt-6 bg-rose-950 text-white p-7 rounded-2xl border border-rose-800 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-400 mb-1">Your Emergency Card</p>
                {PLAN_FIELDS.map(({ key, step, label }) => (
                  <div key={key} className="flex items-start gap-3">
                    <span className="w-6 h-6 shrink-0 bg-rose-800 text-rose-300 rounded-full flex items-center justify-center text-xs font-black mt-0.5">
                      {step}
                    </span>
                    <div>
                      <p className="text-xs text-rose-400 font-semibold mb-0.5">{label}</p>
                      <p className="text-sm text-white font-medium">{planSteps[key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSavePlan}
                disabled={!isPlanComplete}
                className="flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-full font-bold text-sm disabled:opacity-40 transition-all shadow-lg hover:scale-105"
              >
                {isPlanSaved ? (
                  <><CheckCircle2 className="w-5 h-5" /> Protocol Locked In</>
                ) : (
                  <><ShieldCheck className="w-5 h-5" /> Lock in Emergency Protocol</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-6/day-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 40
          </a>
          <a
            href="/workbook/anxious-attachment/week-6/day-7"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to The Finale
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </main>
    </div>
  );
}
