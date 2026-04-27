'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass, ArrowRight, Brain, AlertTriangle, Anchor,
  Play, Square, ShieldCheck, ThumbsDown, ThumbsUp, RefreshCcw
} from 'lucide-react';

const CARD = 'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-teal-100/40 border border-white/60 p-8 md:p-12';

const guiltScenarios = [
  {
    situation: "I lied to my partner about where I was to avoid an argument.",
    type: 'True Guilt' as const,
    desc: "You violated a core value of honesty and trust. The guilt is accurate and requires an apology.",
  },
  {
    situation: "I told my friend I was too tired to go out, and she seemed disappointed.",
    type: 'False Guilt' as const,
    desc: "You protected your energy. Her disappointment belongs to her, not you. No apology needed.",
  },
  {
    situation: "I took 4 hours to text him back because I was deep into a work project.",
    type: 'False Guilt' as const,
    desc: "You are allowed to have a life outside the relationship. You did nothing wrong.",
  },
  {
    situation: "I yelled at my partner and called them a name during a fight.",
    type: 'True Guilt' as const,
    desc: "You crossed a line into disrespect. This requires the 3\u00a0R\u2019s of Repair.",
  },
];

export default function Week3Day2() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  // Breathing Anchor
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
          const next = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-teal-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase border border-teal-200">
              Week 3 &middot; Day 2 (Day 16)
            </span>
            <span className="text-teal-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
              Broken Compass
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding the vital difference between True Guilt and False Guilt.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Compass className="w-7 h-7 text-teal-600 shrink-0" />
            Attachment Insight: The Broken Compass
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                For securely attached people, guilt is a functioning compass. It points North when
                they have actually done something wrong &mdash; like breaking a promise.
              </p>
              <p>
                If you have Anxious Attachment, your compass is broken. It spins wildly and tells
                you that you did something wrong <strong>any time someone else is displeased.</strong>
              </p>
              <div className="bg-teal-50/80 border border-teal-100 rounded-2xl p-4 flex items-start gap-3 mt-2">
                <AlertTriangle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-sm text-teal-900 leading-relaxed">
                  <strong>The Realization:</strong> When you set a boundary, you{' '}
                  <em>will</em> feel guilty. Expect it. This is <em>False Guilt</em>. You must
                  learn to tolerate the feeling without changing your mind.
                </p>
              </div>
            </div>
            <div className="md:w-56 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1500367215255-0e0b21484065?q=80&w=600&auto=format&fit=crop"
                alt="A vintage compass on a wooden surface"
                width={224}
                height={192}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-teal-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-teal-300 text-base mb-6 leading-relaxed">
                Feeling guilt &mdash; even false guilt &mdash; activates the inner child. Drop your
                anchor for 60 seconds to stay in the Adult seat.
              </p>
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-teal-200 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-teal-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-teal-200 mb-2">
                    <span>Exhale <span className="text-teal-400 font-normal">(longer = calmer)</span></span>
                    <span className="font-bold">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-teal-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-teal-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(20,184,166,0.5)] border-2 border-teal-400/50"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                >
                  <span className="font-bold uppercase tracking-wider text-white text-sm">
                    {isBreathing ? breathPhase : 'Ready'}
                  </span>
                  {isBreathing && (
                    <span className="text-3xl font-light mt-1 text-white">{timeLeft}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!isBreathing) {
                    setBreathPhase('Inhale');
                    setTimeLeft(inhaleTime);
                  }
                  setIsBreathing(b => !b);
                }}
                className={`w-full max-w-xs py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm ${
                  isBreathing
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30'
                    : 'bg-white text-teal-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-4 h-4" /> Stop Anchor</>
                  : <><Play className="w-4 h-4" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Guilt Sorter */}
        <section className={`${CARD} !bg-white/80`}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <RefreshCcw className="w-7 h-7 text-teal-600 shrink-0" />
            Practice 2: The Guilt Sorter
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            Read the situation. Click the card to reveal whether your compass is telling you
            the truth, or whether it&rsquo;s a False Alarm.
          </p>

          <div className="grid gap-4">
            {guiltScenarios.map((card, i) => {
              const flipped = !!flippedCards[i];
              const isTrue = card.type === 'True Guilt';
              return (
                <button
                  key={i}
                  onClick={() => setFlippedCards(p => ({ ...p, [i]: !p[i] }))}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    flipped
                      ? isTrue
                        ? 'bg-orange-50 border-orange-300'
                        : 'bg-emerald-50 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                        flipped
                          ? isTrue ? 'text-orange-600' : 'text-emerald-600'
                          : 'text-slate-400'
                      }`}>
                        {flipped ? card.type : 'The Situation'}
                      </span>
                      <p className="text-sm font-medium text-slate-800 leading-relaxed">
                        {flipped ? card.desc : `\u201c${card.situation}\u201d`}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      flipped
                        ? isTrue
                          ? 'bg-orange-200 text-orange-700'
                          : 'bg-emerald-200 text-emerald-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {flipped
                        ? isTrue
                          ? <ThumbsDown className="w-4 h-4" />
                          : <ThumbsUp className="w-4 h-4" />
                        : <RefreshCcw className="w-4 h-4" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-teal-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-4 text-slate-600 text-base leading-relaxed">
            Describe a time recently when you felt guilty, but upon reflection, it was actually
            <em> False Guilt</em>.
          </p>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white border border-teal-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-teal-500 text-sm leading-relaxed resize-none mb-4"
            placeholder="e.g., I felt guilty for telling him I didn\u2019t want to text all day at work\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white rounded-xl font-bold transition-colors text-sm"
            >
              {isSaved
                ? <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Saved!</span>
                : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-3/day-1"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 15
          </a>
          <a
            href="/workbook/anxious-attachment/week-3/day-3"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Continue to Day 17
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
