'use client';

import React, { useState, useEffect } from 'react';
import {
  Hourglass, ArrowRight, Brain, Anchor,
  Play, Square, Info, ShieldCheck, History,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-amber-200 rounded-2xl p-4 text-slate-700 ' +
  'placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent ' +
  'outline-none resize-none shadow-inner transition-all';

type BreathPhase = 'Inhale' | 'Exhale';
type FlashbackMode = 'Past' | 'Present';

export default function Week2Day1() {
  const [flashbackMode, setFlashbackMode] = useState<FlashbackMode>('Past');

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

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
        const next: BreathPhase = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
        setBreathPhase(next);
        setTimeLeft(next === 'Inhale' ? inhaleTime : exhaleTime);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isBreathing, timeLeft, breathPhase, inhaleTime, exhaleTime]);

  const isExpanding = isBreathing && breathPhase === 'Inhale';
  const currentDur = isBreathing
    ? `${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s`
    : '1s';

  const handleToggleBreathe = () => {
    if (!isBreathing) {
      setBreathPhase('Inhale');
      setTimeLeft(inhaleTime);
    }
    setIsBreathing((v) => !v);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-orange-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase border border-amber-200">
              Week 2 · Day 1 (Day 8)
            </span>
            <span className="text-amber-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Emotional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Time Machine
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding "Emotional Flashbacks" and why triggers make you feel like a terrified child.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. Attachment Insight ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <History className="w-7 h-7 text-amber-500 shrink-0" />
                Attachment Insight: Emotional Flashbacks
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Most people think of a flashback as seeing a visual memory, like a movie playing in
                  your head. But in attachment trauma, we experience{' '}
                  <strong>Emotional Flashbacks</strong>.
                </p>
                <p>
                  When your partner pulls away, you don’t <em>see</em> a memory of your childhood.
                  Instead, your body suddenly{' '}
                  <strong>feels exactly the same way it felt</strong> when you were a helpless child
                  facing abandonment.
                </p>
              </div>

              <div className="mt-5 bg-amber-50/80 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>The Realization:</strong> The intensity of your panic right now does not
                  match the current event (a delayed text). It matches the <em>past</em> event (a
                  child left alone). You are time-traveling.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=600&auto=format&fit=crop"
                alt="Clock"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Breathing Anchor ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            {/* Left: controls */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-amber-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                To exit a time machine, you need an anchor in the present. Your breath is the only
                bodily function you can consciously control right now. Set your pace.
              </p>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-amber-400">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={8} value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-amber-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-amber-400">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={10} value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-amber-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: bubble */}
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-7">
                <div
                  className="absolute inset-0 bg-amber-500/25 rounded-full blur-lg"
                  style={{
                    transform: isExpanding ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${currentDur} ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex flex-col items-center justify-center z-10 border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                  style={{
                    transform: isExpanding ? 'scale(1.2)' : 'scale(1)',
                    transition: `transform ${currentDur} ease-in-out`,
                  }}
                >
                  <span className="text-white text-xs font-bold uppercase tracking-wider leading-none">
                    {isBreathing ? breathPhase : 'Ready'}
                  </span>
                  {isBreathing && (
                    <span className="text-white text-3xl font-light mt-1">{timeLeft}</span>
                  )}
                </div>
              </div>

              <button
                onClick={handleToggleBreathe}
                className={`w-full max-w-xs py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isBreathing
                    ? 'bg-amber-900/40 text-amber-300 border border-amber-700 hover:bg-amber-900/60'
                    : 'bg-white text-amber-900 hover:scale-105 shadow-md'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-5 h-5" /> Stop Anchor</>
                  : <><Play className="w-5 h-5" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. Flashback Decoder ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <Hourglass className="w-7 h-7 text-amber-500 shrink-0" />
            Practice 2: The Flashback Decoder
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            When you feel panic, click the toggle below to actively shift your brain from the
            helpless past to the capable present.
          </p>

          <div className="bg-amber-50/60 rounded-2xl border border-amber-100 p-7 flex flex-col items-center">
            {/* Toggle */}
            <div className="flex bg-white p-1.5 rounded-full border border-amber-200 shadow-sm mb-8 w-full max-w-md">
              <button
                onClick={() => setFlashbackMode('Past')}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                  flashbackMode === 'Past'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                The Helpless Past
              </button>
              <button
                onClick={() => setFlashbackMode('Present')}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                  flashbackMode === 'Present'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                The Capable Present
              </button>
            </div>

            {/* Content */}
            <div className="min-h-[160px] w-full flex items-center justify-center text-center">
              {flashbackMode === 'Past' ? (
                <div className="w-full">
                  <h3 className="text-2xl font-extrabold text-rose-500 mb-3">
                    “I am trapped and alone.”
                  </h3>
                  <p className="text-rose-800/80 text-base max-w-md mx-auto leading-relaxed">
                    As a child, abandonment meant literal death. You had no money, no car, no way
                    to survive without your caregivers.
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <h3 className="text-2xl font-extrabold text-emerald-600 mb-3">
                    “I am an adult, and I have choices.”
                  </h3>
                  <p className="text-emerald-800/80 text-base max-w-md mx-auto leading-relaxed">
                    Even if this person leaves, I will survive. I can feed myself, shelter myself,
                    and comfort myself. I am safe.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. Reflection ── */}
        <section className={CARD.replace('bg-white/70', 'bg-amber-50/60').replace('border-white/60', 'border-amber-100')}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-amber-900">
            <Brain className="w-6 h-6 text-amber-500 shrink-0" />
            Integration
          </h2>
          <p className="text-amber-800 text-base leading-relaxed mb-5">
            Think of your most recent anxious trigger. Write down: “I felt like I was back in the
            past when…”
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. I felt like I was 6 years old waiting for my dad to pick me up…"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2500); }}
              disabled={!reflection.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaved ? <><ShieldCheck className="w-5 h-5" /> Saved!</> : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-1/day-7"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Week 1
          </a>
          <a
            href="/workbook/anxious-attachment/week-2/day-2"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-full transition-all group shadow-lg shadow-amber-700/20 text-sm"
          >
            Continue to Day 9
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
