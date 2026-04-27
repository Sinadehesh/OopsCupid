'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame, ArrowRight, Brain, BatteryWarning, Anchor,
  Play, Square, Info, ShieldCheck, Plus, AlertTriangle
} from 'lucide-react';

const CARD = 'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-orange-100/40 border border-white/60 p-8 md:p-12';

export default function Week3Day6() {
  const [capacity, setCapacity] = useState(20);

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

  const addStress = () => setCapacity(prev => Math.min(100, prev + 20));
  const resetBoiler = () => setCapacity(20);

  const boilerColor =
    capacity >= 100 ? 'bg-rose-600 animate-pulse' :
    capacity > 60  ? 'bg-orange-500' :
                     'bg-emerald-500';

  const stressItems = [
    '\u201cSure, I can work late.\u201d',
    '\u201cNo problem, I\u2019ll pay for dinner again.\u201d',
    '\u201cI don\u2019t mind that you\u2019re 45 mins late.\u201d',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-orange-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-amber-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-widest uppercase border border-orange-200">
              Week 3 &middot; Day 6 (Day 20)
            </span>
            <span className="text-orange-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Exploding Boiler
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Why we use &ldquo;Burnout&rdquo; as our only boundary.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <BatteryWarning className="w-7 h-7 text-orange-500 shrink-0" />
            Attachment Insight: Stress as a Boundary
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                As therapist Emma McAdam points out, highly anxious people struggle to set
                boundaries because saying &ldquo;no&rdquo; induces guilt. So, they subconsciously
                develop a workaround: <strong>They wait until they are completely burned out.</strong>
              </p>
              <p>
                If you are physically exhausted, sick, or having a breakdown, you finally have an
                &ldquo;excuse&rdquo; that society (and your inner critic) accepts. You are using
                the <strong>Exploding Boiler</strong> to say &ldquo;no&rdquo; for you.
              </p>
              <div className="bg-orange-50/80 border border-orange-100 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-sm text-orange-900 leading-relaxed">
                  <strong>The Realization:</strong> You don&rsquo;t need a medical emergency or a
                  nervous breakdown to justify a boundary. &ldquo;I don&rsquo;t have the
                  bandwidth&rdquo; is a complete sentence.
                </p>
              </div>
            </div>
            <div className="md:w-56 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1541888062828-5a1e7b9ea0b1?q=80&w=600&auto=format&fit=crop"
                alt="A pressure gauge showing high pressure"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-red-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-orange-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Letting pressure out of the boiler requires regulation. Drop your anchor for
                60 seconds to release the steam.
              </p>
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={e => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-orange-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500 font-normal">(longer = calmer)</span></span>
                    <span className="font-bold">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={e => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-orange-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(249,115,22,0.5)] border-2 border-orange-400/50"
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
                    : 'bg-white text-orange-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-4 h-4" /> Stop Anchor</>
                  : <><Play className="w-4 h-4" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Capacity Simulator */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Flame className="w-7 h-7 text-orange-500 shrink-0" />
            Practice 2: The Capacity Simulator
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            Click to add stress to the boiler. Watch what happens when you wait until
            100% capacity to finally set a boundary.
          </p>

          <div className="flex flex-col md:flex-row gap-10 items-center bg-slate-50/80 p-8 rounded-2xl border border-slate-200/80">

            {/* Boiler visual */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <div className="relative w-32 h-56 bg-slate-200 rounded-3xl border-[6px] border-slate-300 overflow-hidden shadow-inner">
                <div
                  className={`absolute bottom-0 w-full transition-all duration-700 ${boilerColor}`}
                  style={{ height: `${capacity}%` }}
                />
                {/* Gauge lines */}
                {[25, 50, 75].map(pct => (
                  <div
                    key={pct}
                    className="absolute w-full border-t border-black/10"
                    style={{ bottom: `${pct}%` }}
                  />
                ))}
              </div>
              <span className={`text-sm font-bold tabular-nums ${
                capacity >= 100 ? 'text-rose-600' : capacity > 60 ? 'text-orange-600' : 'text-emerald-600'
              }`}>
                {capacity}% full
              </span>
            </div>

            {/* Controls */}
            <div className="flex-1 w-full space-y-3">
              {capacity < 100 ? (
                stressItems.map((label, i) => (
                  <button
                    key={i}
                    onClick={addStress}
                    className="w-full p-4 bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 rounded-xl flex items-center justify-between transition-all shadow-sm group"
                  >
                    <span className="text-sm font-medium text-slate-700 text-left">{label}</span>
                    <Plus className="w-4 h-4 text-orange-500 shrink-0 ml-3 group-hover:scale-125 transition-transform" />
                  </button>
                ))
              ) : (
                <div className="animate-in slide-in-from-right-4 duration-500 bg-rose-50/90 border border-rose-200 rounded-2xl p-6">
                  <AlertTriangle className="w-9 h-9 text-rose-600 mb-3" />
                  <h3 className="text-xl font-black text-rose-900 mb-2">Boiler Explosion!</h3>
                  <p className="text-rose-700 text-sm leading-relaxed mb-5">
                    You hit 100%. Now you have an anxiety attack, blow up at them, or get physically
                    sick. You finally have your &ldquo;excuse&rdquo; to rest.
                  </p>
                  <button
                    onClick={resetBoiler}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors text-sm"
                  >
                    Set Boundaries Earlier (Reset)
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Integration */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-orange-500 shrink-0" />
            Integration
          </h2>
          <p className="mb-4 text-slate-600 text-base leading-relaxed">
            What does your &ldquo;Exploding Boiler&rdquo; usually look like?
            (e.g., crying fits, migraines, blowing up over something small).
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-orange-100 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-orange-400 text-sm leading-relaxed resize-none mb-4"
            placeholder="e.g., I usually end up getting a migraine and having to cancel all my plans\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-white rounded-xl font-bold transition-colors text-sm"
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
            href="/workbook/anxious-attachment/week-3/day-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 19
          </a>
          <a
            href="/workbook/anxious-attachment/week-3/day-7"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Continue to Day 21
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
