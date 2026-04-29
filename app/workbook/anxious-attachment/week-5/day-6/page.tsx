'use client';

import React, { useState, useEffect } from 'react';
import {
  Map, ArrowRight, Brain, Route, Anchor,
  Play, Square, Info, ShieldCheck, CheckCircle2
} from 'lucide-react';

export default function Week5Day6() {
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');
  const [isPlanSaved, setIsPlanSaved] = useState(false);

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Unused in original but keep for future integration section
  const [reflection] = useState('');

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

  const handleSavePlan = () => {
    setIsPlanSaved(true);
    setTimeout(() => setIsPlanSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-pink-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-pink-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase border border-rose-200">
              Week 5 &middot; Day 6 (Day 34)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              Bridge
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Step 3 of Repair: Providing the Roadmap to prevent future ruptures.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Route className="w-7 h-7 text-rose-600 shrink-0" />
            Attachment Insight: The Roadmap
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                You have Reflected (The Mirror) and taken Responsibility (The 50% Rule). The
                final step of healthy repair is providing a <strong>Roadmap</strong>.
              </p>
              <p>
                An apology without changed behavior is just manipulation. Your partner needs to
                know you have a plan for the <em>next</em> time you get triggered. You are
                building a Bridge over the pothole you keep falling into.
              </p>
              <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-900 leading-relaxed">
                  <strong>The Realization:</strong> Anxious brains need predictability. By
                  creating an &ldquo;If/Then&rdquo; plan, you are giving both yourself and your
                  partner the predictable safety you crave.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=600&auto=format&fit=crop"
                alt="Bridge over water"
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
                <Anchor className="w-7 h-7 text-pink-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Planning for future conflict requires the logic of the prefrontal cortex.
                Drop your anchor for 60 seconds.
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
                    className="w-full accent-pink-400 disabled:opacity-40"
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
                    className="w-full accent-pink-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-pink-500/25 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(244,63,94,0.3)] border border-rose-400/30"
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
                    ? 'bg-slate-800 text-pink-300 border border-pink-700 hover:bg-slate-700'
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

        {/* 3. If/Then Roadmap Builder */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Map className="w-7 h-7 text-rose-600 shrink-0" />
            Practice 2: The If/Then Roadmap
          </h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl leading-relaxed">
            Define your personal trigger and the committed action you will take{' '}
            <em>instead</em> of your old protest behavior.
          </p>

          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
            {/* IF */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-rose-600 mb-3 uppercase tracking-wider">
                <span className="w-8 h-8 bg-rose-100 border border-rose-200 rounded-lg flex items-center justify-center text-xs font-extrabold">
                  IF
                </span>
                I feel triggered by&hellip;
              </label>
              <input
                type="text"
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none placeholder:text-slate-400"
                placeholder="e.g., You asking for space after work"
                value={trigger}
                onChange={e => setTrigger(e.target.value)}
              />
            </div>

            {/* divider arrow */}
            <div className="flex justify-center">
              <div className="w-px h-6 bg-slate-200" />
            </div>

            {/* THEN */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-emerald-600 mb-3 uppercase tracking-wider">
                <span className="w-8 h-8 bg-emerald-100 border border-emerald-200 rounded-lg flex items-center justify-center text-xs font-extrabold">
                  THEN
                </span>
                I commit to&hellip;
              </label>
              <input
                type="text"
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-400 outline-none placeholder:text-slate-400"
                placeholder="e.g., Doing my 4-6 breathing instead of double-texting"
                value={action}
                onChange={e => setAction(e.target.value)}
              />
            </div>

            {/* Preview */}
            {trigger && action && (
              <div className="bg-slate-900 text-white rounded-xl p-5 text-sm leading-relaxed">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-semibold">Your Roadmap</p>
                <p>
                  <span className="text-rose-400 font-bold">If </span>
                  {trigger.toLowerCase().replace(/^i feel triggered by\s*/i, '')},{' '}
                  <span className="text-emerald-400 font-bold">then </span>
                  {action.toLowerCase().replace(/^i commit to\s*/i, '')}.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleSavePlan}
              disabled={!trigger || !action}
              className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-lg hover:scale-105 disabled:hover:scale-100"
            >
              {isPlanSaved ? (
                <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Roadmap Secured</>
              ) : (
                'Build The Bridge'
              )}
            </button>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-5/day-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 33
          </a>
          <a
            href="/workbook/anxious-attachment/week-5/day-7"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 35
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
