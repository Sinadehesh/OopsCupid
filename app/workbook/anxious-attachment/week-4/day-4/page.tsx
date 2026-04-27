'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase, ArrowRight, Brain, Anchor,
  Play, Square, ShieldCheck, BaggageClaim
} from 'lucide-react';

export default function Week4Day4() {
  const [burdens, setBurdens] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true,
  });

  // Breathing Anchor State
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Reflection
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isBreathing) {
      timer = setTimeout(() => {
        if (timeLeft > 1) {
          setTimeLeft(t => t - 1);
        } else {
          const nextPhase = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
          setBreathPhase(nextPhase);
          setTimeLeft(nextPhase === 'Exhale' ? exhaleTime : inhaleTime);
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
    setIsBreathing(b => !b);
  };

  const phaseDuration = isBreathing
    ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime)
    : 1;

  const handleDrop = (id: number) => {
    setBurdens(prev => ({ ...prev, [id]: false }));
  };

  const allDropped = Object.values(burdens).every(v => v === false);

  const burdenList = [
    { id: 0, text: 'Fixing my partner\u2019s bad mood.' },
    { id: 1, text: 'Over-planning everything so nobody gets upset.' },
    { id: 2, text: 'Anticipating needs before they are even asked.' },
    { id: 3, text: 'Suppressing my opinions to keep the peace.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-sky-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-blue-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-widest uppercase border border-sky-200">
              Week 4 &middot; Day 4 (Day 25)
            </span>
            <span className="text-sky-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Utility{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
              Belt
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Unpacking Codependency and the belief that you must be &ldquo;useful&rdquo; to be kept.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-sky-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Briefcase className="w-7 h-7 text-sky-600 shrink-0" />
            Attachment Insight: The Utility Belt
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                Codependency often develops when an anxious child realizes they cannot depend
                on their parents for stability. So, they flip the script:{' '}
                <em>
                  &ldquo;If I make everyone depend on ME, they can&rsquo;t leave me.&rdquo;
                </em>
              </p>
              <p>
                You put on an emotional <strong>Utility Belt</strong>. You become the ultimate
                fixer, planner, therapist, and peace-keeper. You over-function to ensure you
                are too valuable to abandon.
              </p>
              <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-5 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-sm text-sky-900 leading-relaxed">
                  <strong>The Realization:</strong> You are exhausted because you are carrying
                  the emotional weight of two people. A secure relationship is not built on
                  utility &mdash; it&rsquo;s built on mutual existence.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=600&auto=format&fit=crop"
                alt="Heavy bags on a conveyor belt"
                width={600}
                height={400}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-blue-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Dropping your utility belt feels terrifying, like you are dropping your only
                armor. Anchor yourself first.
              </p>

              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-white">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={e => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-blue-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-white">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={e => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-blue-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(56,189,248,0.4)] border border-sky-400/30"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
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
                    ? 'bg-slate-800 text-blue-300 border border-blue-700 hover:bg-slate-700'
                    : 'bg-white text-slate-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing ? (
                  <><Square className="w-4 h-4" /> Stop Anchor</>
                ) : (
                  <><Play className="w-4 h-4" /> Start Anchor Breath</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 3. The Baggage Drop */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-sky-100/40 border border-white/60 p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-3 flex items-center justify-center gap-3 text-slate-900">
            <BaggageClaim className="w-7 h-7 text-sky-600 shrink-0" />
            Practice 2: The Baggage Drop
          </h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-2xl mx-auto">
            These are not your jobs. Click each emotional burden you have been carrying for
            others to physically release it.
          </p>

          <div className="max-w-xl mx-auto space-y-3 mb-8">
            {burdenList.map(burden => (
              <button
                key={burden.id}
                onClick={() => handleDrop(burden.id)}
                disabled={!burdens[burden.id]}
                className={`w-full p-5 rounded-2xl border transition-all duration-500 text-left ${
                  burdens[burden.id]
                    ? 'bg-slate-900 border-slate-700 text-white shadow-md cursor-pointer hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-default'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-medium">{burden.text}</span>
                  {burdens[burden.id] ? (
                    <span className="text-xs uppercase tracking-widest font-bold text-slate-500 shrink-0">
                      Tap to drop
                    </span>
                  ) : (
                    <ShieldCheck className="text-emerald-500 w-5 h-5 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {allDropped && (
            <div className="p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl font-semibold text-base shadow-sm">
              Notice how much lighter you feel. You are still worthy of love.
            </div>
          )}
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-sky-50/80 border border-sky-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-sky-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            In what specific ways do you &ldquo;over-function&rdquo; in your current relationships
            to ensure they need you?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-sky-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-sky-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I always plan the dates and manage their schedule so they rely on me\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-sky-700 hover:bg-sky-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all"
            >
              {isSaved ? (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Saved!
                </span>
              ) : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-4/day-3"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 24
          </a>
          <a
            href="/workbook/anxious-attachment/week-4/day-5"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 26
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
