'use client';

import React, { useState, useEffect } from 'react';
import {
  BellRing, ArrowRight, Brain, Flame, Anchor,
  RefreshCcw, Play, Square, Info, ShieldCheck,
} from 'lucide-react';
import { saveWorkbookEntry } from '@/app/actions/saveWorkbookEntry';

/* ─────────────────────────────────────────────
   Design-system constants
   (mirrors Weeks 4-6 of the workbook)
───────────────────────────────────────────── */
const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 ' +
  'focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

const dangers = [
  {
    fake: "They haven't texted back in 4 hours. They are losing interest and leaving me.",
    real: 'They are busy at work. I am safe in my room. A delayed text cannot hurt me physically.',
  },
  {
    fake: 'Their tone was short. They are mad and pulling away from me.',
    real: 'They might be tired, hungry, or stressed. My survival is not currently at risk.',
  },
  {
    fake: "If I don't fix this argument right now, the relationship is over forever.",
    real: 'Taking a break to calm down protects the relationship. I am okay.',
  },
];

export default function Day1() {
  // Threat decoder
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [threatSaved, setThreatSaved] = useState(false);

  // Breathing anchor
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Reflection
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save Threat Decoder when all cards flipped
  useEffect(() => {
    const allFlipped = dangers.every((_, i) => flippedCards[i]);
    if (allFlipped && !threatSaved) {
      setThreatSaved(true);
      saveWorkbookEntry({
        workbook: 'anxious-attachment',
        week: 1,
        day: 1,
        exerciseKey: 'threat-decoder',
        content: { completed: true, allCardsFlipped: true },
      });
    }
  }, [flippedCards, threatSaved]);

  // Breathing countdown
  useEffect(() => {
    if (!isBreathing) {
      setBreathPhase('Inhale');
      setTimeLeft(inhaleTime);
      return;
    }
    const timer = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft((t) => t - 1);
      } else {
        const next = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
        setBreathPhase(next);
        setTimeLeft(next === 'Inhale' ? inhaleTime : exhaleTime);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isBreathing, timeLeft, breathPhase, inhaleTime, exhaleTime]);

  const startBreathing = () => {
    setBreathPhase('Inhale');
    setTimeLeft(inhaleTime);
    setIsBreathing(true);
  };

  const handleSaveReflection = async () => {
    if (!reflection.trim()) return;
    setIsSaving(true);
    const result = await saveWorkbookEntry({
      workbook: 'anxious-attachment',
      week: 1,
      day: 1,
      exerciseKey: 'integration-reflection',
      content: { reflection },
    });
    setIsSaving(false);
    if (result.success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  const bubbleScale = isBreathing && breathPhase === 'Inhale' ? 1.2 : 1;
  const glowScale  = isBreathing && breathPhase === 'Inhale' ? 1.6 : 1;
  const bubbleDuration = isBreathing
    ? `${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s`
    : '1s';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-slate-50 text-slate-800 font-sans pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-purple-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 1 · Day 1
            </span>
            <span className="text-indigo-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              False Fire Alarm
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding the Amygdala Hijack and learning to manually turn off the panic alarm.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. The Psychology ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <BellRing className="w-7 h-7 text-rose-500 shrink-0" />
                The &quot;Burnt Toast&quot; Metaphor
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Inside your brain is a tiny, almond-shaped smoke detector called the{' '}
                  <strong>Amygdala</strong>. Its only job is to keep you alive. If a tiger attacks,
                  it blares the alarm — anxiety, racing heart — so you run.
                </p>
                <p>
                  With <strong>Anxious Attachment</strong>, your smoke detector is overly
                  sensitive. When your partner is quiet or pulls away, your brain reacts as if a
                  tiger is in the room. But there is no tiger. It&apos;s just burnt toast.
                </p>
              </div>

              <div className="mt-6 bg-rose-50/80 border border-rose-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-900 leading-relaxed">
                  <strong>The Golden Rule:</strong> You cannot use logic to turn off a fire alarm.
                  Telling yourself to &quot;calm down&quot; doesn&apos;t work. You must use your{' '}
                  <em>physical body</em> to manually switch the alarm off.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1502443015502-3c13cfae24be?q=80&w=600&auto=format&fit=crop"
                alt="Red fire alarm"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Practice 1: Threat Decoder ── */}
        <section className={CARD.replace('bg-white/70', 'bg-orange-50/60').replace('shadow-indigo-100/40', 'shadow-orange-100/40')}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <Flame className="w-7 h-7 text-orange-500 shrink-0" />
            Practice 1: Threat Decoder
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            When the alarm rings, your brain tells you a scary story. Tap each card to translate
            the <em>False Alarm</em> (emotional fear) into <em>Objective Safety</em> (reality).
          </p>

          <div className="grid gap-4">
            {dangers.map((card, i) => (
              <button
                key={i}
                onClick={() => setFlippedCards((p) => ({ ...p, [i]: !p[i] }))}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                  flippedCards[i]
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-md'
                    : 'bg-white/80 border-orange-200 hover:border-orange-400 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest mb-2 block ${
                        flippedCards[i] ? 'text-emerald-600' : 'text-orange-500'
                      }`}
                    >
                      {flippedCards[i] ? 'Objective Safety (Reality)' : 'False Alarm (The Story)'}
                    </span>
                    <p
                      className={`text-base font-medium leading-snug ${
                        flippedCards[i] ? 'text-emerald-900' : 'text-slate-800'
                      }`}
                    >
                      {flippedCards[i] ? card.real : card.fake}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      flippedCards[i]
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-orange-100 text-orange-500'
                    }`}
                  >
                    <RefreshCcw
                      className={`w-5 h-5 transition-transform duration-300 ${
                        flippedCards[i] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {threatSaved && (
            <p className="mt-4 text-sm text-emerald-600 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Practice saved!
            </p>
          )}
        </section>

        {/* ── 3. Practice 2: Breathing Anchor ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white shadow-2xl border border-slate-800/60 p-8 md:p-10 relative overflow-hidden">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            {/* Controls */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-indigo-400 shrink-0" />
                Practice 2: Your Breathing Anchor
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                Now manually turn off the alarm. Dial in your pace below. The secret:{' '}
                <strong>make the exhale longer than the inhale.</strong>
              </p>

              <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-6">
                {[
                  { label: 'Inhale (Breathe in)', val: inhaleTime, set: setInhaleTime, min: 2, max: 8 },
                  { label: 'Exhale (Blow out slowly)', val: exhaleTime, set: setExhaleTime, min: 2, max: 10 },
                ].map(({ label, val, set, min, max }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                      <span>{label}</span>
                      <span className="font-bold text-white">{val}s</span>
                    </div>
                    <input
                      type="range" min={min} max={max} value={val}
                      onChange={(e) => set(Number(e.target.value))}
                      disabled={isBreathing}
                      className="w-full accent-indigo-400 disabled:opacity-40 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bubble */}
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                {/* Outer glow */}
                <div
                  className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl"
                  style={{ transform: `scale(${glowScale})`, transitionDuration: bubbleDuration, transition: 'transform' }}
                />
                {/* Bubble */}
                <div
                  className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(99,102,241,0.45)] border-2 border-indigo-400/50"
                  style={{ transform: `scale(${bubbleScale})`, transitionDuration: bubbleDuration, transition: 'transform' }}
                >
                  <span className="font-bold text-sm uppercase tracking-wider">
                    {isBreathing ? breathPhase : 'Ready'}
                  </span>
                  {isBreathing && (
                    <span className="text-3xl font-light mt-0.5">{timeLeft}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => (isBreathing ? setIsBreathing(false) : startBreathing())}
                className={`w-full max-w-xs py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all ${
                  isBreathing
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30'
                    : 'bg-white text-indigo-900 hover:scale-105 shadow-lg'
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

        {/* ── 4. Integration Reflection ── */}
        <section className={CARD.replace('bg-white/70', 'bg-indigo-50/80')}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-indigo-900">
            <Brain className="w-6 h-6 text-indigo-500 shrink-0" />
            Integration
          </h2>
          <p className="text-indigo-700 text-base leading-relaxed mb-5">
            After practising your anchor breath for 2 minutes, what physical shift did you notice
            in your body?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. My chest feels slightly less tight, my shoulders dropped…"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveReflection}
              disabled={!reflection.trim() || isSaving}
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaving ? (
                'Saving…'
              ) : isSaved ? (
                <><ShieldCheck className="w-5 h-5" /> Saved!</>
              ) : (
                'Save Entry'
              )}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Overview
          </a>
          <a
            href="/workbook/anxious-attachment/week-1/day-2"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all group shadow-lg shadow-indigo-600/20 text-sm"
          >
            Continue to Day 2
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
