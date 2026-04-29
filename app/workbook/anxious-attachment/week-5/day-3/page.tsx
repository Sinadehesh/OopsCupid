'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame, ArrowRight, Brain, Clock, Anchor,
  Play, Square, ShieldCheck, ThermometerSnowflake
} from 'lucide-react';

export default function Week5Day3() {
  const [timePassed, setTimePassed] = useState(0);

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

  // Derived values — clamped to [10, 100]
  const panicLevel = Math.max(10, 100 - timePassed * 4);
  const logicLevel = Math.min(100, 10 + timePassed * 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-pink-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase border border-rose-200">
              Week 5 &middot; Day 3 (Day 31)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Molten{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Iron
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding the 24-Hour Rule and why you must &ldquo;strike while the iron
            is cold.&rdquo;
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Flame className="w-7 h-7 text-rose-500 shrink-0" />
            Attachment Insight: The Molten Iron
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                You&rsquo;ve probably heard the saying &ldquo;strike while the iron is
                hot.&rdquo; In relationships, this is terrible advice.
              </p>
              <p>
                When your attachment system is triggered, your emotional brain is like
                molten iron &mdash; volatile, blazing hot, and impossible to handle
                safely. If you try to fix a relationship problem while your body is
                flooded with cortisol, you will almost always cause burns.
              </p>
              <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-5 flex items-start gap-3">
                <ThermometerSnowflake className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-900 leading-relaxed">
                  <strong>The Realization:</strong> You must strike when the iron is{' '}
                  <em>cold</em>. The biological &ldquo;refractory period&rdquo; of an
                  emotional hijack can take up to 24 hours to fully flush out of your
                  bloodstream.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1533555239109-7d1a29337efb?q=80&w=600&auto=format&fit=crop"
                alt="Glowing hot iron"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-rose-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Waiting 24 hours to resolve a fight feels agonizing to the inner child.
                Anchor yourself here to tolerate the waiting period.
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
                    className="w-full accent-rose-400 disabled:opacity-40"
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
                    className="w-full accent-rose-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-rose-500/25 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(244,63,94,0.35)] border border-rose-400/30"
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
                    ? 'bg-slate-800 text-rose-300 border border-rose-700 hover:bg-slate-700'
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

        {/* 3. The Urge Surfer */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Clock className="w-7 h-7 text-rose-500 shrink-0" />
            Practice 2: The Urge Surfer
          </h2>
          <p className="text-slate-500 text-sm mb-10 max-w-2xl leading-relaxed">
            Move the slider to simulate the passing of time after a triggering argument.
            Notice how your biological capacity changes.
          </p>

          {/* Progress bars */}
          <div className="space-y-6 mb-10">
            <div>
              <div className="flex justify-between text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">
                <span>Urge to Send a &ldquo;Fix It&rdquo; Text</span>
                <span className="tabular-nums">{Math.round(panicLevel)}%</span>
              </div>
              <div className="w-full h-4 bg-rose-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-300"
                  style={{ width: `${panicLevel}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                <span>Prefrontal Cortex (Logic &amp; Empathy)</span>
                <span className="tabular-nums">{Math.round(logicLevel)}%</span>
              </div>
              <div className="w-full h-4 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${logicLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Time slider */}
          <div className="bg-slate-50/80 border border-slate-100 p-6 md:p-8 rounded-2xl">
            <div className="flex items-baseline gap-3 mb-5">
              <h4 className="font-bold text-slate-700 text-sm">Time passed since the trigger:</h4>
              <span className="text-rose-600 text-2xl font-extrabold tabular-nums">{timePassed}h</span>
            </div>
            <input
              type="range" min="0" max="24" value={timePassed}
              onChange={e => setTimePassed(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-3">
              <span>0 hrs (Immediate)</span>
              <span>12 hrs</span>
              <span>24 hrs (Cooled Down)</span>
            </div>
          </div>

          {/* Success message */}
          <div className={`mt-6 transition-all duration-500 ${
            timePassed >= 20 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}>
            <div className="p-6 bg-emerald-50/80 border border-emerald-100 rounded-2xl text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-800 font-semibold text-sm leading-relaxed">
                The iron is cold. You are now biologically capable of having a productive,
                secure conversation.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-rose-50/80 border border-rose-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-rose-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Think of a time you tried to force a resolution while highly anxious. How did
            the conversation go?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-rose-100 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-rose-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., We just ended up yelling louder and causing more damage\u2026"
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
            href="/workbook/anxious-attachment/week-5/day-2"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 30
          </a>
          <a
            href="/workbook/anxious-attachment/week-5/day-4"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 32
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
