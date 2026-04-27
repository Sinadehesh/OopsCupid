'use client';

import React, { useState, useEffect } from 'react';
import {
  Map, ArrowRight, Brain, Anchor, Play, Square,
  Info, ShieldCheck, RefreshCcw, FileText
} from 'lucide-react';

export default function Week4Day1() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

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

  const blueprints = [
    {
      old: 'If I am not perfectly accommodating, people will realize I\u2019m a burden and leave.',
      new: 'I am allowed to take up space. My imperfections do not make me unlovable.',
    },
    {
      old: 'If someone asks for space, it means they are preparing to abandon me.',
      new: 'Space is a biological need for nervous system regulation, not a threat to my existence.',
    },
    {
      old: 'I have to work incredibly hard to \u201cearn\u201d my place in someone\u2019s life.',
      new: 'Love is not a transaction. I do not have to pay rent for my seat in a relationship.',
    },
  ];

  const phaseDuration = isBreathing
    ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime)
    : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase border border-blue-200">
              Week 4 &middot; Day 1 (Day 22)
            </span>
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Faulty{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              Blueprint
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding John Bowlby&rsquo;s &ldquo;Internal Working Models&rdquo; and why your brain lies to you.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-blue-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Map className="w-7 h-7 text-blue-600 shrink-0" />
            Attachment Insight: The Blueprint
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                Attachment theory pioneer John Bowlby discovered that our early childhood
                experiences create an <strong>Internal Working Model</strong> &mdash; a
                subconscious blueprint for how relationships work.
              </p>
              <p>
                If you have Anxious Attachment, your blueprint has a massive structural flaw.
                It was drawn in childhood and says:{' '}
                <em>
                  &ldquo;I am inherently unworthy, and others are unreliable. Therefore, I must
                  cling tightly to survive.&rdquo;
                </em>
              </p>
              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  <strong>The Realization:</strong> You are an adult living in a house built
                  from a terrified child&rsquo;s blueprint. The things your brain tells you
                  about your partner pulling away aren&rsquo;t facts &mdash; they are just the
                  old, faulty blueprint talking.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop"
                alt="Architectural blueprints"
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
                Challenging your core beliefs feels dangerous to the nervous system. Drop your
                anchor for 60 seconds to signal safety to your body.
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
                {/* Glow blob */}
                <div
                  className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                {/* Orb */}
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

        {/* 3. Redraft the Blueprint */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-blue-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <FileText className="w-7 h-7 text-blue-600 shrink-0" />
            Practice 2: Redrafting the Blueprint
          </h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">
            Click each card to erase the childhood lie and replace it with the Adult Truth.
          </p>

          <div className="grid gap-4">
            {blueprints.map((card, i) => (
              <button
                key={i}
                onClick={() => setFlippedCards(p => ({ ...p, [i]: !p[i] }))}
                className={`text-left w-full cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                  flippedCards[i]
                    ? 'bg-slate-900 border-slate-700 shadow-md'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <span
                      className={`text-xs font-bold uppercase tracking-widest mb-2 block ${
                        flippedCards[i] ? 'text-cyan-400' : 'text-slate-400'
                      }`}
                    >
                      {flippedCards[i] ? 'New Adult Blueprint' : 'Old Childhood Blueprint'}
                    </span>
                    <p
                      className={`text-base font-medium leading-relaxed ${
                        flippedCards[i] ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {flippedCards[i] ? card.new : `\u201c${card.old}\u201d`}
                    </p>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      flippedCards[i] ? 'bg-slate-800 text-cyan-400' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <RefreshCcw
                      className={`w-4 h-4 transition-transform duration-300 ${
                        flippedCards[i] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-blue-50/80 border border-blue-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            What is one specific &ldquo;Old Blueprint&rdquo; rule that you have been living by in
            relationships?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-blue-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., If I ask for too much, they will get tired of me and leave\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all"
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
            href="/workbook/anxious-attachment/week-3/day-7"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Week 3
          </a>
          <a
            href="/workbook/anxious-attachment/week-4/day-2"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 23
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
