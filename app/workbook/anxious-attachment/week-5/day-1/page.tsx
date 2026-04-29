'use client';

import React, { useState, useEffect } from 'react';
import {
  Repeat, ArrowRight, Brain, Anchor, Play, Square,
  ShieldCheck, PauseCircle, HeartCrack
} from 'lucide-react';

export default function Week5Day1() {
  const [cycleBroken, setCycleBroken] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-purple-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-fuchsia-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase border border-violet-200">
              Week 5 &middot; Day 1 (Day 29)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Infinity{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Loop
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding the devastating &ldquo;Pursue-Withdraw&rdquo; dance of anxious and
            avoidant partners.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-violet-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Repeat className="w-7 h-7 text-violet-600 shrink-0" />
            Attachment Insight: The Trap
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                When anxiously attached individuals feel a loss of connection, they use{' '}
                <strong>Protest Behaviors</strong> (like sending a barrage of texts or picking
                a fight) to force a reaction. You are chasing connection.
              </p>
              <p>
                If your partner is <em>Avoidant</em>, your panicked pursuit feels like an
                attack. Their nervous system responds by withdrawing to protect themselves.
                This withdrawal terrifies your inner child, causing you to pursue harder.
              </p>
              <div className="bg-violet-50/80 border border-violet-100 rounded-2xl p-5 flex items-start gap-3">
                <HeartCrack className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <p className="text-sm text-violet-900 leading-relaxed">
                  <strong>The Realization:</strong> This is the Infinity Loop. The harder you
                  pull, the faster they run. You cannot control their running, but you hold 50%
                  of the loop. If you stop pulling, the dynamic must change.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1516663713099-37eaea67e8f5?q=80&w=600&auto=format&fit=crop"
                alt="Infinity lines"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-fuchsia-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Stopping the urge to pursue feels like letting go of a lifeline. Drop your
                anchor for 60 seconds to soothe the panic of standing still.
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
                  className="w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(217,70,239,0.35)] border border-fuchsia-400/30"
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

        {/* 3. The Loop Breaker */}
        <section className="rounded-[2rem] bg-slate-900 text-white p-8 md:p-12 shadow-2xl border border-slate-700/60 relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-violet-500/5 blur-3xl" />

          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
            <PauseCircle className="w-7 h-7 text-violet-400 shrink-0" />
            Practice 2: Break The Loop
          </h2>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 md:p-8 relative z-10">
            {/* The two nodes */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">

              {/* Anxious node */}
              <div className={`w-full md:w-56 p-6 rounded-2xl border-2 transition-all duration-500 ${
                cycleBroken
                  ? 'bg-slate-800 border-slate-700 opacity-40'
                  : 'bg-rose-950/60 border-rose-500/70 shadow-[0_0_24px_rgba(244,63,94,0.2)]'
              }`}>
                <h4 className="text-rose-400 font-bold uppercase tracking-wider text-xs mb-2">Anxious Action</h4>
                <p className="text-white text-sm font-medium leading-snug">
                  Panic. Send 3 texts demanding an answer. Criticize them for being cold.
                </p>
              </div>

              {/* Connector — desktop only */}
              <div className="hidden md:flex flex-col items-center justify-center w-28 relative h-24">
                <div className={`absolute top-3 w-full h-0.5 transition-all duration-500 ${
                  cycleBroken ? 'bg-slate-700' : 'bg-gradient-to-r from-rose-500 to-blue-500'
                }`} />
                <div className={`absolute bottom-3 w-full h-0.5 transition-all duration-500 ${
                  cycleBroken ? 'bg-slate-700' : 'bg-gradient-to-l from-blue-500 to-rose-500'
                }`} />
                <div className={`transition-all duration-500 ${
                  cycleBroken ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}>
                  <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow whitespace-nowrap">
                    Pause &amp; Breathe
                  </div>
                </div>
              </div>

              {/* Avoidant node */}
              <div className={`w-full md:w-56 p-6 rounded-2xl border-2 transition-all duration-500 ${
                cycleBroken
                  ? 'bg-slate-800 border-slate-700 opacity-40'
                  : 'bg-blue-950/60 border-blue-500/70 shadow-[0_0_24px_rgba(59,130,246,0.2)]'
              }`}>
                <h4 className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-2">Avoidant Reaction</h4>
                <p className="text-white text-sm font-medium leading-snug">
                  Feels overwhelmed and attacked. Retreats, ignores texts, builds walls.
                </p>
              </div>
            </div>

            {/* CTA button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setCycleBroken(b => !b)}
                className={`px-8 py-4 rounded-full font-bold text-base flex items-center gap-2 transition-all ${
                  cycleBroken
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_24px_rgba(124,58,237,0.3)]'
                }`}
              >
                {cycleBroken ? (
                  <><Repeat className="w-4 h-4" /> Resume Loop</>
                ) : (
                  <><PauseCircle className="w-4 h-4" /> Refuse to Pursue</>
                )}
              </button>
            </div>

            {/* Success message */}
            <div className={`text-center transition-all duration-500 ${
              cycleBroken ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
            }`}>
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-300 text-sm font-medium max-w-md mx-auto leading-relaxed">
                By refusing to attack, you stop giving them a reason to run. The dynamic is
                forced to change.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-violet-50/80 border border-violet-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-violet-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            What is your &ldquo;go-to&rdquo; protest behavior when you feel someone pulling
            away? (e.g., guilt-tripping, silent treatment, over-explaining).
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-violet-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-violet-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I usually send a massive block of text explaining why I'm hurt\u2026"
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
            href="/workbook/anxious-attachment/week-4/day-7"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Week 4
          </a>
          <a
            href="/workbook/anxious-attachment/week-5/day-2"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 30
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
