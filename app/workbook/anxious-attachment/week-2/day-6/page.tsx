'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Swords, ArrowRight, Brain, Smile, Anchor,
  Play, Square, ShieldCheck, Ticket,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-100/40 border border-white/60 p-8 md:p-10';

type BreathPhase = 'Inhale' | 'Exhale';

export default function Week2Day6() {
  const [signature, setSignature] = useState('');
  const [slipGenerated, setSlipGenerated] = useState(false);

  // Breathing
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleIssueSlip = () => {
    if (!signature.trim()) return;
    setSlipGenerated(true);
  };

  const handleReset = () => {
    setSlipGenerated(false);
    setSignature('');
    // Focus the input after reset
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-yellow-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase border border-amber-200">
              Week 2 · Day 6 (Day 13)
            </span>
            <span className="text-amber-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Off-Duty{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">
              Soldier
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Reclaiming the inner child&rsquo;s right to rest, play, and exist without a job.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Swords className="w-7 h-7 text-amber-500 shrink-0" />
                Attachment Insight: The Joy Deficit
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  When a child has to become hypervigilant to survive emotionally, they become a
                  tiny soldier — constantly scanning the perimeter for danger (anger, withdrawal,
                  distance).
                </p>
                <p>
                  Soldiers on active duty do not play. They do not rest.{' '}
                  <strong>Play requires absolute safety.</strong> If you struggle to relax, have
                  fun, or do things &ldquo;just because,&rdquo; it&rsquo;s because your inner child is still
                  standing guard.
                </p>
              </div>

              <div className="mt-5 bg-amber-50/80 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                <Brain className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>The Realization:</strong> As the Capable Adult, it is your job to
                  relieve the child from their post. You must explicitly give them permission to
                  be off-duty.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop"
                alt="Child playing freely"
                width={300}
                height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-amber-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Resting can trigger anxiety for people wired for chaos. Drop your anchor for
                60 seconds to prove to your body that stillness is safe.
              </p>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-amber-400">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={8} value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-amber-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-amber-400">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={10} value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-amber-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-7">
                <div
                  className="absolute inset-0 bg-amber-500/25 rounded-full blur-lg"
                  style={{
                    transform: isExpanding ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${currentDur} ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex flex-col items-center justify-center z-10 border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
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
                    ? 'bg-amber-900/40 text-amber-300 border border-amber-700 hover:bg-amber-900/60'
                    : 'bg-white text-amber-900 hover:scale-105 shadow-md'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-5 h-5" /> Stop Anchor</>
                  : <><Play className="w-5 h-5" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. The Permission Slip */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <Ticket className="w-7 h-7 text-amber-500 shrink-0" />
            Practice 2: The Permission Slip
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            As the Adult, you must explicitly relieve your inner child from duty. Generate a
            permission slip for them below.
          </p>

          <div className="bg-amber-50/60 p-8 md:p-12 rounded-[1.5rem] border-2 border-dashed border-amber-300 max-w-2xl mx-auto relative">

            {!slipGenerated ? (
              <div className="space-y-6">
                <p className="text-base font-bold text-amber-900 text-center leading-relaxed">
                  Sign your name below to authorize the child&rsquo;s release from duty today.
                </p>
                <input
                  ref={inputRef}
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleIssueSlip()}
                  placeholder="Sign your name (The Adult)…"
                  className="w-full text-center text-2xl font-serif italic bg-transparent border-b-2 border-amber-400 focus:border-amber-600 outline-none py-3 text-amber-950 placeholder:text-amber-200 transition-colors"
                />
                <button
                  onClick={handleIssueSlip}
                  disabled={!signature.trim()}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 text-sm"
                >
                  Issue Permission Slip
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Smile className="w-14 h-14 text-amber-500 mx-auto mb-5" />
                <h3 className="text-2xl font-black text-amber-900 mb-4 uppercase tracking-widest">
                  Official Leave
                </h3>
                <p className="text-base text-amber-800 leading-relaxed font-medium mb-6 max-w-md mx-auto">
                  &ldquo;I, <strong>{signature}</strong>, hereby relieve my inner child from their
                  post. You do not need to scan for danger today. You do not need to earn love.
                  You have full permission to play, rest, and be completely useless.&rdquo;
                </p>
                <ShieldCheck className="w-9 h-9 text-emerald-500 mx-auto mb-6" />
                <button
                  onClick={handleReset}
                  className="text-xs text-amber-400 hover:text-amber-600 underline underline-offset-2 transition-colors"
                >
                  Issue a new slip
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 12
          </a>
          <a
            href="/workbook/anxious-attachment/week-2/day-7"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition-all group shadow-lg shadow-amber-600/20 text-sm"
          >
            Continue to Day 14
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
