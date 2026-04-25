'use client';

import React, { useState, useEffect } from 'react';
import {
  Dog, ArrowRight, Brain, Shield, Anchor,
  RefreshCcw, Play, Square, ShieldCheck,
  MessageSquareHeart,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-rose-200 rounded-2xl p-4 text-slate-700 ' +
  'placeholder:text-slate-400 focus:ring-2 focus:ring-rose-400 focus:border-transparent ' +
  'outline-none resize-none shadow-inner transition-all';

type BreathPhase = 'Inhale' | 'Exhale';

interface GuardDogCard {
  critic: string;
  parent: string;
}

const guardDogThoughts: GuardDogCard[] = [
  {
    critic: 'You are too needy. That\'s why they are pulling away. You ruin everything.',
    parent: 'You have valid needs. It is scary when they aren\'t met, but you are not "too much." You are human.',
  },
  {
    critic: 'If you don\'t text them right now and apologize, they will leave you forever.',
    parent: 'You are terrified of losing them. I see that. But rushing to fix it out of panic isn\'t safe. Let\'s breathe first.',
  },
  {
    critic: 'See? They look annoyed. You must have said something stupid again.',
    parent: 'Their mood belongs to them, not you. You don\'t have to monitor their face to be safe.',
  },
];

export default function Week2Day2() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

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

  const toggleCard = (i: number) =>
    setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-pink-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase border border-rose-200">
              Week 2 · Day 2 (Day 9)
            </span>
            <span className="text-rose-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Overzealous{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Guard Dog
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding your Inner Critic and translating its attacks into compassion.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. Attachment Insight ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Dog className="w-7 h-7 text-rose-500 shrink-0" />
                Attachment Insight: The Guard Dog
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Most people hate their "Inner Critic" — the voice that says{' '}
                  <em>"You're too needy, you're annoying, nobody really likes you."</em>
                </p>
                <p>
                  But your Inner Critic is actually an overzealous{' '}
                  <strong>Guard Dog</strong>. When you were a child, it realized that if it
                  criticized you <em>before</em> your parents or peers could, you could fix your
                  behaviour and avoid abandonment.
                </p>
              </div>

              <div className="mt-5 bg-rose-50/80 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-900 leading-relaxed">
                  <strong>The Realization:</strong> The critic is trying to protect you from
                  rejection by attacking you first. We do not fight the guard dog. We simply{' '}
                  <strong>relieve it of its duties</strong>.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=600&auto=format&fit=crop"
                alt="Guard Dog"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Breathing Anchor ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            {/* Left: controls */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-rose-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Before we speak to the Guard Dog, we must ground our physical body. Drop your
                anchor for 60 seconds.
              </p>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-rose-400">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={8} value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-rose-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-rose-400">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={10} value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-rose-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: bubble */}
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-7">
                <div
                  className="absolute inset-0 bg-rose-500/25 rounded-full blur-lg"
                  style={{
                    transform: isExpanding ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${currentDur} ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex flex-col items-center justify-center z-10 border-2 border-rose-400/50 shadow-[0_0_30px_rgba(244,63,94,0.4)]"
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
                    ? 'bg-rose-900/40 text-rose-300 border border-rose-700 hover:bg-rose-900/60'
                    : 'bg-white text-rose-900 hover:scale-105 shadow-md'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-5 h-5" /> Stop Anchor</>
                  : <><Play className="w-5 h-5" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. Reparenting Translator ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <MessageSquareHeart className="w-7 h-7 text-rose-500 shrink-0" />
            Practice 2: The Reparenting Translator
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Click the cards below to translate the panicked attack of the Guard Dog into the
            soothing, regulated voice of a Secure Parent.
          </p>

          <div className="grid gap-4">
            {guardDogThoughts.map((card, i) => {
              const flipped = !!flippedCards[i];
              return (
                <button
                  key={i}
                  onClick={() => toggleCard(i)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    flipped
                      ? 'bg-emerald-50/80 border-emerald-300 shadow-md'
                      : 'bg-rose-50/80 border-rose-200 hover:border-rose-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                        flipped ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {flipped ? 'The Nurturing Parent (Reparenting)' : 'The Guard Dog (Inner Critic)'}
                      </span>
                      <p className={`text-base font-medium leading-relaxed ${
                        flipped ? 'text-emerald-900' : 'text-slate-800'
                      }`}>
                        {flipped ? card.parent : card.critic}
                      </p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      flipped ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-500'
                    }`}>
                      <RefreshCcw className={`w-5 h-5 transition-transform duration-300 ${flipped ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 4. Reflection ── */}
        <section className="rounded-[2rem] bg-rose-50/60 backdrop-blur-xl shadow-lg shadow-rose-100/30 border border-rose-100 p-8 md:p-10">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-rose-900">
            <Brain className="w-6 h-6 text-rose-500 shrink-0" />
            Integration
          </h2>
          <p className="text-rose-800 text-base leading-relaxed mb-5">
            What is a mean thing your "Guard Dog" told you recently? How would a loving parent
            rephrase it?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. Critic: 'You are so stupid for trusting them.' / Parent: 'You have a big heart, and it hurts that they disappointed you…'"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2500); }}
              disabled={!reflection.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaved ? <><ShieldCheck className="w-5 h-5" /> Saved!</> : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-1"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 8
          </a>
          <a
            href="/workbook/anxious-attachment/week-2/day-3"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-full transition-all group shadow-lg shadow-rose-700/20 text-sm"
          >
            Continue to Day 10
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
