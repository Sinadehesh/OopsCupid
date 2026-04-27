'use client';

import React, { useState, useEffect } from 'react';
import {
  Clapperboard, ArrowRight, Brain, RefreshCw, Anchor,
  Play, Square, ShieldCheck, User
} from 'lucide-react';

export default function Week4Day3() {
  const [isAwarenessActive, setIsAwarenessActive] = useState(false);

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

  const phaseDuration = isBreathing
    ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime)
    : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-violet-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 4 &middot; Day 3 (Day 24)
            </span>
            <span className="text-indigo-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Director&rsquo;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              Chair
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Learning &ldquo;Mentalization&rdquo;: Realizing that your reality is not their reality.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Clapperboard className="w-7 h-7 text-indigo-600 shrink-0" />
            Attachment Insight: Mentalization
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                In trauma therapy (specifically MBT &mdash; Mentalization-Based Treatment),{' '}
                <strong>Mentalization</strong> is the ability to understand that your mind and
                your partner&rsquo;s mind are entirely separate.
              </p>
              <p>
                When you are triggered, you lose this ability. If you feel rejected, you assume
                they <em>intended</em> to reject you. You assume the script in your head is the
                exact script they are reading from.
              </p>
              <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
                <User className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900 leading-relaxed">
                  <strong>The Realization:</strong> You must step out of the scene and sit in
                  the Director&rsquo;s Chair. A Director can look at two actors and realize they
                  have totally different motivations.{' '}
                  <em>
                    &ldquo;My feeling of abandonment is real, but that doesn&rsquo;t mean they
                    are abandoning me.&rdquo;
                  </em>
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop"
                alt="Director chair on a film set"
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
                Mentalization requires the prefrontal cortex. You cannot mentalize while in
                fight-or-flight. Drop your anchor for 60 seconds to bring the Director online.
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
                  className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(139,92,246,0.4)] border border-violet-400/30"
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

        {/* 3. The Cycle Breaker */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 relative z-10">
            <RefreshCw className="w-7 h-7 text-indigo-400 shrink-0" />
            Practice 2: The Cycle Breaker
          </h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-2xl relative z-10">
            Toggle the switch to sit in the Director&rsquo;s Chair and watch how it reroutes
            the anxiety loop.
          </p>

          {/* Toggle */}
          <div className="flex justify-center mb-10 relative z-10">
            <button
              onClick={() => setIsAwarenessActive(a => !a)}
              className="flex items-center bg-slate-900 p-1.5 rounded-full border border-slate-700 shadow-inner gap-1"
              aria-label="Toggle between anxious loop and director's chair"
            >
              <span
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  !isAwarenessActive
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Anxious Loop
              </span>
              <span
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  isAwarenessActive
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Director&rsquo;s Chair
              </span>
            </button>
          </div>

          {/* Flow diagram */}
          <div className="bg-slate-900/70 rounded-2xl p-6 md:p-8 border border-slate-800 relative z-10">
            <div className="flex flex-col items-center max-w-md mx-auto gap-0">

              {/* Step 1 */}
              <div className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-center shadow-sm">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-1">Step 1: The Trigger</span>
                <span className="font-medium text-base text-white">Partner says they need a night alone.</span>
              </div>

              <div className="h-6 w-px bg-slate-700" />

              {/* Step 2 */}
              <div className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-center shadow-sm">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-1">Step 2: The Story</span>
                <span className="font-medium text-base text-white">&ldquo;They are sick of me and want to pull away.&rdquo;</span>
              </div>

              <div className="h-6 w-px bg-slate-700" />

              {/* Step 3 + 4 — animated swap */}
              <div className="w-full relative" style={{ minHeight: '160px' }}>
                {/* Anxious path */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    !isAwarenessActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-3 pointer-events-none'
                  }`}
                >
                  <div className="w-full bg-rose-950/60 border border-rose-500/40 p-5 rounded-xl text-center shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                    <span className="text-xs text-rose-400 uppercase tracking-widest font-bold block mb-1">Step 3: Amygdala Hijack</span>
                    <span className="font-medium text-base text-rose-100 block mb-3">Panic, chest tightness, fear of loss.</span>
                    <div className="h-px w-12 bg-rose-500/30 mx-auto my-3" />
                    <span className="text-xs text-rose-400 uppercase tracking-widest font-bold block mb-1">Step 4: Protest Behavior</span>
                    <span className="font-medium text-base text-rose-100">Picking a fight to force them to prove they care.</span>
                  </div>
                </div>

                {/* Director path */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isAwarenessActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-3 pointer-events-none'
                  }`}
                >
                  <div className="w-full bg-indigo-950/60 border border-indigo-500/40 p-5 rounded-xl text-center shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                    <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold block mb-1">Step 3: Director&rsquo;s Observation</span>
                    <span className="font-medium text-base text-indigo-100 block mb-3">&ldquo;I feel scared, but maybe they are just exhausted from work.&rdquo;</span>
                    <div className="h-px w-12 bg-indigo-500/30 mx-auto my-3" />
                    <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold block mb-1">Step 4: Secure Response</span>
                    <span className="font-medium text-base text-indigo-100">Self-soothing and respecting their boundary.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-indigo-50/80 border border-indigo-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-indigo-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Think of an interaction where you assumed someone&rsquo;s negative intent. What is
            a completely different, innocent reason for their behavior?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-indigo-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-indigo-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I assumed they cancelled because I am boring, but maybe they were just genuinely burnt out\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all"
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
            href="/workbook/anxious-attachment/week-4/day-2"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 23
          </a>
          <a
            href="/workbook/anxious-attachment/week-4/day-4"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 25
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
