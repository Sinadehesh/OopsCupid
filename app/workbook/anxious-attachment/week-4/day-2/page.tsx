'use client';

import React, { useState, useEffect } from 'react';
import {
  Camera, ArrowRight, Brain, ScanEye, Anchor,
  Play, Square, ShieldCheck, Sparkles, XCircle
} from 'lucide-react';

export default function Week4Day2() {
  // Breathing Anchor State
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Sorter State
  const [activeThought, setActiveThought] = useState(0);
  const [sorted, setSorted] = useState<Record<number, 'fact' | 'fiction' | 'error'>>({});

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

  const thoughtsToSort = [
    { text: 'My partner sighed heavily when they walked in the door.', type: 'fact' },
    { text: 'They sighed because they are tired of dealing with me.', type: 'fiction' },
    { text: 'My friend read my text at 2:00 PM but hasn\u2019t replied yet.', type: 'fact' },
    { text: 'They are deliberately ignoring me to punish me.', type: 'fiction' },
  ];

  const handleSort = (type: 'fact' | 'fiction') => {
    const isCorrect = thoughtsToSort[activeThought].type === type;
    setSorted(prev => ({ ...prev, [activeThought]: isCorrect ? type : 'error' }));
    if (isCorrect && activeThought < thoughtsToSort.length - 1) {
      setTimeout(() => setActiveThought(prev => prev + 1), 800);
    }
  };

  const phaseDuration = isBreathing
    ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime)
    : 1;

  const allDone = activeThought >= thoughtsToSort.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-teal-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold tracking-widest uppercase border border-cyan-200">
              Week 4 &middot; Day 2 (Day 23)
            </span>
            <span className="text-cyan-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Crystal{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">
              Ball
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Separating Objective Facts from Cognitive Distortions.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-cyan-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Sparkles className="w-7 h-7 text-cyan-600 shrink-0" />
            Attachment Insight: Mind-Reading
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                To survive unpredictability, the anxious brain developed a superpower:{' '}
                <strong>Mind-Reading</strong>. You became hyper-attuned to micro-expressions,
                sighs, and changes in tone, trying to predict danger before it happened.
              </p>
              <p>
                The problem is, your crystal ball is heavily biased. Cognitive Behavioral
                Therapy (CBT) calls this a <strong>Cognitive Distortion</strong>. You take a
                neutral fact and instantly project a catastrophic, rejection-based narrative
                onto it.
              </p>
              <div className="bg-cyan-50/80 border border-cyan-100 rounded-2xl p-5 flex items-start gap-3">
                <Camera className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <p className="text-sm text-cyan-900 leading-relaxed">
                  <strong>The Camera Test:</strong> If a video camera recorded the room, what
                  would it see? A camera records a sigh. It does <em>not</em> record &ldquo;they
                  hate me.&rdquo; You must separate the camera facts from the story.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1549007628-98e66e1d51a6?q=80&w=600&auto=format&fit=crop"
                alt="Crystal ball reflecting light"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-teal-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                When we misinterpret a fact, the body panics instantly. Drop your anchor to
                slow the processing speed between &ldquo;event&rdquo; and &ldquo;reaction.&rdquo;
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
                    className="w-full accent-teal-400 disabled:opacity-40"
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
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(20,184,166,0.4)] border border-teal-400/30"
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
                    ? 'bg-slate-800 text-teal-300 border border-teal-700 hover:bg-slate-700'
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

        {/* 3. Fact vs Fiction Sorter */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-cyan-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <ScanEye className="w-7 h-7 text-cyan-600 shrink-0" />
            Practice 2: The Sorter
          </h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">
            Sort the following statements. Would a literal video camera record this as an
            objective fact, or is it an Anxious Story (Crystal Ball)?
          </p>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center">
            {!allDone ? (
              <div>
                <div className="bg-cyan-50/80 border border-cyan-100 p-8 rounded-xl mb-6">
                  <p className="text-xl font-bold text-slate-900 leading-relaxed">
                    &ldquo;{thoughtsToSort[activeThought].text}&rdquo;
                  </p>
                </div>

                {sorted[activeThought] === 'error' && (
                  <p className="text-rose-500 font-bold mb-5 flex items-center justify-center gap-2 text-sm">
                    <XCircle className="w-4 h-4" /> Think again! Apply the Camera Test.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => handleSort('fact')}
                    className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all hover:scale-105 text-sm flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" /> Camera Fact
                  </button>
                  <button
                    onClick={() => handleSort('fiction')}
                    className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all hover:scale-105 text-sm flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Crystal Ball Story
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <ShieldCheck className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Excellent Work</h3>
                <p className="text-slate-500 text-sm mb-6">You successfully separated reality from anxiety.</p>
                <button
                  onClick={() => { setActiveThought(0); setSorted({}); }}
                  className="text-cyan-600 font-bold text-sm underline underline-offset-2 hover:text-cyan-800 transition-colors"
                >
                  Practice Again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-cyan-50/80 border border-cyan-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-cyan-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Think of an interaction that made you anxious recently. What was the{' '}
            <em>Camera Fact</em>, and what was your <em>Crystal Ball Story</em>?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-cyan-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-cyan-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., Fact: They went to sleep without calling. Story: They don\u2019t love me anymore\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all"
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
            href="/workbook/anxious-attachment/week-4/day-1"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 22
          </a>
          <a
            href="/workbook/anxious-attachment/week-4/day-3"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 24
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
