'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare, ArrowRight, Brain, ScrollText, Anchor,
  Play, Square, Info, ShieldCheck, Unlock, Copy, CheckCircle2
} from 'lucide-react';

const CARD = 'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-blue-100/40 border border-white/60 p-8 md:p-12';

const scriptSteps = [
  { letter: 'S', name: 'Specify',   text: "When you raise your voice at me during an argument..." },
  { letter: 'A', name: 'Assert',    text: "...I feel overwhelmed and I cannot hear what you are trying to say." },
  { letter: 'F', name: 'Fairness',  text: "I know you are frustrated and want this resolved, and I want to resolve it too." },
  { letter: 'E', name: 'Enforce',   text: "But I will not engage in a yelling match. If the volume stays high, I am going to step into the other room for 20 minutes so we can both calm down." },
];

export default function Week3Day4() {
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    const fullText = scriptSteps.map(s => s.text).join(' ');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const allRevealed = revealedSteps >= scriptSteps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase border border-blue-200">
              Week 3 &middot; Day 4 (Day 18)
            </span>
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              S.A.F.E. Script
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Building the blueprint to say what you mean without attacking.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <ScrollText className="w-7 h-7 text-blue-600 shrink-0" />
            Attachment Insight: The Blueprint
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                When the amygdala is hijacked, the language centre of your brain literally shuts
                down. This is why anxious people either freeze and say nothing, or explode in a
                messy, critical rant.
              </p>
              <p>
                You cannot build a house in a hurricane, and you cannot invent a healthy boundary
                in the middle of a panic attack. You need a <strong>Blueprint</strong>.
              </p>
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 mt-2">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>The Realization:</strong> The S.A.F.E. method gives your brain a
                  predictable, fill-in-the-blank structure to lean on when you are triggered.
                </p>
              </div>
            </div>
            <div className="md:w-56 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop"
                alt="Architectural blueprints on a table"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-blue-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-blue-300 text-base mb-6 leading-relaxed">
                Breathe here to bring the language centre of your brain (Broca&rsquo;s Area)
                back online.
              </p>
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-blue-200 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-blue-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-blue-200 mb-2">
                    <span>Exhale <span className="text-blue-400 font-normal">(longer = calmer)</span></span>
                    <span className="font-bold">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
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
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(59,130,246,0.5)] border-2 border-blue-400/50"
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
                    : 'bg-white text-blue-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-4 h-4" /> Stop Anchor</>
                  : <><Play className="w-4 h-4" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Script Builder */}
        <section className={`${CARD} !bg-white/85`}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <MessageSquare className="w-7 h-7 text-blue-600 shrink-0" />
            Practice 2: The Builder
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            Click each step to reveal how it fits together into a complete, calm boundary.
          </p>

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-4">
            {scriptSteps.map((step, idx) => (
              <div key={idx}>
                {idx <= revealedSteps ? (
                  <div className="flex items-start gap-5 animate-in fade-in slide-in-from-left-4 duration-500 bg-white p-5 rounded-2xl border border-blue-100 shadow-sm">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg border border-blue-200">
                      {step.letter}
                    </div>
                    <div className="pt-0.5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{step.name}</h4>
                      <p className="text-sm text-slate-800 font-medium leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setRevealedSteps(idx)}
                    className="flex items-center justify-center w-full p-5 rounded-2xl border-2 border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all font-bold text-sm gap-3"
                  >
                    <Unlock className="w-5 h-5" /> Reveal: <strong>{step.name}</strong>
                  </button>
                )}
              </div>
            ))}
          </div>

          {allRevealed && (
            <div className="mt-6 p-7 bg-slate-900 text-white rounded-2xl shadow-xl animate-in slide-in-from-bottom-4 duration-500">
              <h4 className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">Completed Boundary</h4>
              <blockquote className="text-base font-serif italic mb-6 leading-relaxed text-slate-200">
                &ldquo;{scriptSteps.map(s => s.text).join(' ')}&rdquo;
              </blockquote>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 hover:bg-blue-50 rounded-full font-bold transition-colors shadow-md mx-auto text-sm"
              >
                {copied
                  ? <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied!</>
                  : <><Copy className="w-4 h-4" /> Copy Script</>}
              </button>
            </div>
          )}
        </section>

        {/* 4. Integration Reflection */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-blue-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-4 text-slate-600 text-base leading-relaxed">
            Pick a boundary you need to set this week. Draft it using S.A.F.E.
          </p>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white border border-blue-200 rounded-xl p-5 h-40 outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed resize-none mb-4"
            placeholder="S: When you\u2026  A: I feel\u2026  F: I know you\u2026  E: But I will\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl font-bold transition-colors text-sm"
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
            href="/workbook/anxious-attachment/week-3/day-3"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 17
          </a>
          <a
            href="/workbook/anxious-attachment/week-3/day-5"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Continue to Day 19
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
