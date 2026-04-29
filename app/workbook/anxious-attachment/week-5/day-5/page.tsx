'use client';

import React, { useState, useEffect } from 'react';
import {
  PieChart, ArrowRight, Brain, Edit3, Anchor,
  Play, Square, Info, ShieldCheck, CheckCircle2
} from 'lucide-react';

export default function Week5Day5() {
  const [replacements, setReplacements] = useState<Record<number, boolean>>({});

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

  const handleEdit = (id: number) => {
    setReplacements(prev => ({ ...prev, [id]: true }));
  };

  const allEdited = Object.keys(replacements).length === 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-fuchsia-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-fuchsia-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase border border-violet-200">
              Week 5 &middot; Day 5 (Day 33)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              50% Rule
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Step 2 of Repair: Taking absolute responsibility for your side of the street.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-violet-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <PieChart className="w-7 h-7 text-violet-600 shrink-0" />
            Attachment Insight: The &ldquo;But&rdquo; Eraser
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                Welcome to Step 2 of Repair: <strong>Responsibility.</strong> Anxious individuals
                often struggle with genuine apologies because acknowledging a mistake feels like
                confirming their core fear (&ldquo;I am fundamentally unlovable&rdquo;).
              </p>
              <p>
                To protect against this shame, you issue what experts call a{' '}
                <em>Justified Apology</em>: &ldquo;I&rsquo;m sorry I yelled,{' '}
                <em>but</em> you made me so mad.&rdquo;
              </p>
              <div className="bg-violet-50/80 border border-violet-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <p className="text-sm text-violet-900 leading-relaxed">
                  <strong>The Realization:</strong> The word &ldquo;but&rdquo; completely erases an
                  apology. You are only responsible for your 50% of the pie chart. You own your
                  reaction, full stop.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=600&auto=format&fit=crop"
                alt="Responsibility concept"
                width={600}
                height={400}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md grayscale"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-fuchsia-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Taking raw responsibility triggers immense shame in the inner child. Anchor
                yourself to remain in the capable Adult chair.
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
                    className="w-full accent-fuchsia-400 disabled:opacity-40"
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
                    className="w-full accent-fuchsia-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-fuchsia-500/25 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(217,70,219,0.3)] border border-fuchsia-400/30"
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
                    ? 'bg-slate-800 text-fuchsia-300 border border-fuchsia-700 hover:bg-slate-700'
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

        {/* 3. The "But" Eraser */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-violet-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Edit3 className="w-7 h-7 text-violet-600 shrink-0" />
            Practice 2: The &ldquo;But&rdquo; Eraser
          </h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl leading-relaxed">
            Read the apology below. Click the{' '}
            <strong className="text-rose-500">red justifications</strong> to instantly erase
            them and leave behind a secure, 100% responsible apology.
          </p>

          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 md:p-8 mb-6">
            <p className="text-base md:text-lg font-medium text-slate-800 leading-loose">
              &ldquo;I am so sorry that I snapped at you when you walked in the door,{' '}
              <button
                onClick={() => handleEdit(0)}
                className={`mx-1 cursor-pointer rounded-lg px-2 py-0.5 font-semibold text-sm transition-all ${
                  replacements[0]
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 cursor-default'
                    : 'text-rose-600 bg-rose-50 border border-rose-200 line-through decoration-rose-400 hover:bg-rose-100'
                }`}
              >
                {replacements[0] ? '(Full stop.)' : 'but I was so stressed out from work.'}
              </button>
              {' '}It was wrong of me to pick a fight,{' '}
              <button
                onClick={() => handleEdit(1)}
                className={`mx-1 cursor-pointer rounded-lg px-2 py-0.5 font-semibold text-sm transition-all ${
                  replacements[1]
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 cursor-default'
                    : 'text-rose-600 bg-rose-50 border border-rose-200 line-through decoration-rose-400 hover:bg-rose-100'
                }`}
              >
                {replacements[1] ? '(Full stop.)' : 'even though you were ignoring me all day.'}
              </button>
              {' '}I own my reaction,{' '}
              <button
                onClick={() => handleEdit(2)}
                className={`mx-1 cursor-pointer rounded-lg px-2 py-0.5 font-semibold text-sm transition-all ${
                  replacements[2]
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 cursor-default'
                    : 'text-rose-600 bg-rose-50 border border-rose-200 line-through decoration-rose-400 hover:bg-rose-100'
                }`}
              >
                {replacements[2] ? 'and I will do better next time.' : 'but you have to admit you started it.'}
              </button>
              &rdquo;
            </p>
          </div>

          {allEdited ? (
            <div className="flex items-start gap-4 p-5 bg-emerald-50/80 border border-emerald-100 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-emerald-800 leading-relaxed">
                Excellent. You have claimed your 50% without demanding they claim theirs.
                That is True Responsibility.
              </p>
            </div>
          ) : (
            <p className="text-slate-400 text-sm text-center">
              Click the red justifications to rewrite the apology.
            </p>
          )}
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-violet-50/80 border border-violet-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-violet-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Write a 100% responsible apology for a recent &ldquo;Protest Behavior&rdquo; you
            engaged in. Do not use the word &ldquo;but&rdquo;.
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-violet-100 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-violet-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I am sorry I sent you 5 angry texts in a row. It was unfair to pressure you like that."
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
            href="/workbook/anxious-attachment/week-5/day-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 32
          </a>
          <a
            href="/workbook/anxious-attachment/week-5/day-6"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 34
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
