'use client';

import React, { useState, useEffect } from 'react';
import {
  PenTool, ArrowRight, Brain, Edit3, Anchor,
  Play, Square, ShieldCheck, CheckCircle2
} from 'lucide-react';

export default function Week4Day6() {
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

  const allEdited = Object.keys(replacements).length === 4;

  const words = [
    { id: 0, before: 'never',              after: 'sometimes' },
    { id: 1, before: 'am totally unlovable', after: 'feel unheard right now' },
    { id: 2, before: 'everything is ruined', after: 'we are having a hard time' },
    { id: 3, before: 'alone forever',       after: 'okay, no matter what happens' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-cyan-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase border border-blue-200">
              Week 4 &middot; Day 6 (Day 27)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Editor&rsquo;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Pen
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Using Cognitive Reframing to rewrite extreme, black-and-white thoughts.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-blue-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <PenTool className="w-7 h-7 text-blue-600 shrink-0" />
            Attachment Insight: Black-and-White Thinking
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                When the amygdala is hijacked, the brain loses its ability to see nuance. It
                resorts to <strong>Black-and-White Thinking</strong> (also known as
                All-or-Nothing thinking).
              </p>
              <p>
                You use extreme words like{' '}
                <em>&ldquo;Always,&rdquo; &ldquo;Never,&rdquo; &ldquo;Everything,&rdquo;</em>{' '}
                and <em>&ldquo;Everyone.&rdquo;</em> These extreme words pour gasoline on your
                anxiety.
              </p>
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
                <PenTool className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>The Realization:</strong> As the Editor of your own mind, you must
                  strike out extreme words and replace them with accurate, nuanced truths to
                  calm your nervous system.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1583508114551-df4b136c4b26?q=80&w=600&auto=format&fit=crop"
                alt="Red editing pen on paper"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-cyan-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Before we can edit the script, we have to sit in the Editor&rsquo;s chair. Drop
                your anchor for 60 seconds to find your focus.
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
                    className="w-full accent-cyan-400 disabled:opacity-40"
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
                    className="w-full accent-cyan-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-cyan-500/25 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-400/30"
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
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-700 hover:bg-slate-700'
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

        {/* 3. The Reframing Editor */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-blue-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Edit3 className="w-7 h-7 text-blue-600 shrink-0" />
            Practice 2: The Reframing Editor
          </h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-2xl">
            Read the anxious thought. Click the extreme{' '}
            <strong className="text-rose-500">red words</strong> to strike them out and replace
            them with the accurate, nuanced truth.
          </p>

          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 md:p-8 text-lg font-medium leading-loose text-slate-700 mb-8">
            &ldquo;They{' '}
            {words.map((w, i) => (
              <React.Fragment key={w.id}>
                <button
                  onClick={() => handleEdit(w.id)}
                  disabled={!!replacements[w.id]}
                  className={`inline mx-1 px-2 py-0.5 rounded-lg transition-all duration-300 font-semibold ${
                    replacements[w.id]
                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 cursor-default'
                      : 'text-rose-600 bg-rose-50 border border-rose-200 line-through decoration-rose-400 hover:bg-rose-100 cursor-pointer'
                  }`}
                >
                  {replacements[w.id] ? w.after : w.before}
                </button>
                {i === 0 && ' pay attention to me. I guess I '}
                {i === 1 && ' and '}
                {i === 2 && '. I am going to end up '}
                {i === 3 && '.'}
              </React.Fragment>
            ))}
            &rdquo;
          </div>

          {allEdited ? (
            <div className="p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl font-semibold text-base shadow-sm flex flex-col items-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              Notice how the edited version feels much less terrifying to your body.
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm font-medium">
              {4 - Object.keys(replacements).length} red word{4 - Object.keys(replacements).length !== 1 ? 's' : ''} remaining — click to edit.
            </p>
          )}
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-blue-50/80 border border-blue-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            What is an extreme, black-and-white word you often use when fighting? How can you
            soften it?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-blue-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I always say 'You never care about me.' I could replace it with 'I feel uncared for right now\u2026'"
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
            href="/workbook/anxious-attachment/week-4/day-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 26
          </a>
          <a
            href="/workbook/anxious-attachment/week-4/day-7"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 28
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
