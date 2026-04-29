'use client';

import React, { useState, useEffect } from 'react';
import {
  ScanEye, ArrowRight, Brain, RefreshCcw, Anchor,
  Play, Square, ShieldCheck, HeartHandshake,
  MessageCircle, XCircle, Info
} from 'lucide-react';

type SortResult = 'defense' | 'mirror' | 'error';

const STATEMENTS = [
  { text: "I was just trying to help you! You're always so ungrateful.", type: 'defense' },
  { text: "What I'm hearing is that my 'help' actually felt overwhelming to you.", type: 'mirror' },
  { text: "You're overreacting. It wasn't that big of a deal.", type: 'defense' },
  { text: "It sounds like when I did that, it made you feel completely dismissed.", type: 'mirror' },
] as const;

export default function Week5Day4() {
  const [activeThought, setActiveThought] = useState(0);
  const [sorted, setSorted] = useState<Record<number, SortResult>>({});

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

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

  const handleSort = (type: 'defense' | 'mirror') => {
    const isCorrect = STATEMENTS[activeThought].type === type;
    setSorted(prev => ({ ...prev, [activeThought]: isCorrect ? type : 'error' }));
    if (isCorrect && activeThought < STATEMENTS.length - 1) {
      setTimeout(() => setActiveThought(p => p + 1), 800);
    }
  };

  const handleReset = () => {
    setActiveThought(0);
    setSorted({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-violet-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-violet-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 5 &middot; Day 4 (Day 32)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              Mirror
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Step 1 of Repair: Learning how to reflect reality without defending yourself.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <HeartHandshake className="w-7 h-7 text-indigo-600 shrink-0" />
            Attachment Insight: Step 1 of Repair
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                A fight is a rupture in the attachment bond. To heal it, we must master the{' '}
                <strong>3 R&rsquo;s of Repair: Reflect, Responsibility, and Roadmap.</strong>{' '}
                Today we focus on the first R.
              </p>
              <p>
                When your partner brings up an issue, your anxious inner child feels attacked.
                Your instinct is to immediately defend yourself:{' '}
                <em>&ldquo;I didn&rsquo;t mean it like that!&rdquo;</em> But defense blocks repair.
              </p>
              <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900 leading-relaxed">
                  <strong>The Realization:</strong> You must become a Mirror. Before you explain
                  your side, you must accurately reflect their side back to them so they feel
                  truly heard.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1616081498670-36a445472856?q=80&w=600&auto=format&fit=crop"
                alt="Mirror reflection"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-violet-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Listening to criticism without defending yourself requires a massive amount of
                nervous system regulation. Anchor here.
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
                    className="w-full accent-violet-400 disabled:opacity-40"
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
                    className="w-full accent-violet-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-violet-500/25 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(139,92,246,0.35)] border border-violet-400/30"
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
                    ? 'bg-slate-800 text-violet-300 border border-violet-700 hover:bg-slate-700'
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

        {/* 3. Mirror or Defense Sorter */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <ScanEye className="w-7 h-7 text-indigo-600 shrink-0" />
            Practice 2: Mirror or Defense?
          </h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl leading-relaxed">
            Sort the responses below. Is the speaker acting like a Mirror (reflecting their
            partner&rsquo;s experience) or defending themselves?
          </p>

          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 md:p-8">
            {activeThought < STATEMENTS.length ? (
              <div>
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {STATEMENTS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i < activeThought
                          ? 'bg-emerald-500'
                          : i === activeThought
                          ? 'bg-indigo-500 scale-125'
                          : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl p-6 mb-6 text-center">
                  <p className="text-lg font-semibold text-indigo-950 leading-snug">
                    &ldquo;{STATEMENTS[activeThought].text}&rdquo;
                  </p>
                </div>

                {sorted[activeThought] === 'error' && (
                  <p className="text-rose-500 text-sm font-semibold mb-4 text-center flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" /> Think again — is this truly just reflecting what they said?
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => handleSort('defense')}
                    className="px-7 py-3.5 bg-rose-50 text-rose-700 border border-rose-200 font-bold rounded-full hover:bg-rose-100 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" /> Defensive Reaction
                  </button>
                  <button
                    onClick={() => handleSort('mirror')}
                    className="px-7 py-3.5 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <RefreshCcw className="w-4 h-4" /> True Mirror
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Mirror Mastered</h3>
                <p className="text-slate-500 text-sm mb-6">
                  You can now identify the difference between defending and listening.
                </p>
                <button
                  onClick={handleReset}
                  className="text-indigo-600 font-bold text-sm hover:text-indigo-800 transition-colors underline underline-offset-2"
                >
                  Practice Again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-indigo-50/80 border border-indigo-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-indigo-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Draft a &ldquo;Mirror&rdquo; statement you can use the next time someone expresses
            frustration with you.
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-indigo-100 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-indigo-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., 'What I'm hearing you say is that you felt abandoned when I did that...'"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all"
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
            href="/workbook/anxious-attachment/week-5/day-3"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 31
          </a>
          <a
            href="/workbook/anxious-attachment/week-5/day-5"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 33
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
