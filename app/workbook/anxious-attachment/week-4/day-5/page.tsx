'use client';

import React, { useState, useEffect } from 'react';
import {
  Lightbulb, ArrowRight, Brain, User, Anchor,
  Play, Square, ShieldCheck, Users
} from 'lucide-react';

export default function Week4Day5() {
  const [spotlight, setSpotlight] = useState<'Me' | 'Them'>('Me');

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50/60 via-slate-50 to-slate-100 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-slate-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-widest uppercase border border-amber-200">
              Week 4 &middot; Day 5 (Day 26)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">
              Spotlight
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Dismantling &ldquo;Personalization&rdquo; and the belief that everything they do is about you.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-amber-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Lightbulb className="w-7 h-7 text-amber-500 shrink-0" />
            Attachment Insight: Personalization
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                Anxiety makes us incredibly egocentric. We suffer from a cognitive distortion
                called <strong>Personalization</strong> &mdash; the belief that you are the
                direct cause of other people&rsquo;s moods and behaviors.
              </p>
              <p>
                If they are quiet, you think: <em>&ldquo;What did I do wrong?&rdquo;</em> If
                they are stressed, you think:{' '}
                <em>&ldquo;I must fix this so they aren&rsquo;t mad at me.&rdquo;</em> You have
                placed the spotlight entirely on yourself.
              </p>
              <div className="bg-amber-50/80 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  <strong>The Realization:</strong> You are a supporting character in their
                  movie. Most of the time, their behavior has absolutely nothing to do with you.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1516055619834-026ac434440f?q=80&w=600&auto=format&fit=crop"
                alt="A single spotlight on a stage"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-amber-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                To move the spotlight off yourself, you must first be grounded. Breathe here
                for 60 seconds.
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
                    className="w-full accent-amber-400 disabled:opacity-40"
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
                    className="w-full accent-amber-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(245,158,11,0.25)] border border-amber-400/20"
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
                    ? 'bg-slate-800 text-amber-300 border border-amber-700 hover:bg-slate-700'
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

        {/* 3. Spotlight Shifter */}
        <section className="rounded-[2rem] bg-slate-900 text-white p-8 md:p-12 shadow-2xl border border-slate-700/60 relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl" />

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 text-amber-400 shrink-0" />
            Practice 2: Shift the Spotlight
          </h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-2xl">
            Toggle the switch to manually move the spotlight off your ego and onto the reality
            of their human experience.
          </p>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8">
            {/* Toggle */}
            <div className="flex justify-center mb-10">
              <div className="flex bg-slate-900/80 p-1.5 rounded-full border border-slate-700 w-full max-w-md">
                <button
                  onClick={() => setSpotlight('Me')}
                  className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                    spotlight === 'Me'
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Spotlight on ME
                </button>
                <button
                  onClick={() => setSpotlight('Them')}
                  className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                    spotlight === 'Them'
                      ? 'bg-amber-400 text-slate-900 shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Spotlight on THEM
                </button>
              </div>
            </div>

            {/* Content panels */}
            <div className="relative min-h-[200px] flex items-center justify-center text-center">
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  spotlight === 'Me'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-3 pointer-events-none'
                }`}
              >
                <User className="w-14 h-14 text-rose-400 mb-4" />
                <p className="text-rose-100 text-xl font-semibold mb-3 max-w-lg leading-snug">
                  &ldquo;They seem so distant. What did I do wrong? Am I annoying them? Are they tired of me?&rdquo;
                </p>
                <p className="text-rose-400 text-sm font-medium">
                  This assumes you control their emotions.
                </p>
              </div>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  spotlight === 'Them'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-3 pointer-events-none'
                }`}
              >
                <Users className="w-14 h-14 text-amber-400 mb-4" />
                <p className="text-amber-100 text-xl font-semibold mb-3 max-w-lg leading-snug">
                  &ldquo;They seem distant. They must have had a really hard day. They are probably just exhausted.&rdquo;
                </p>
                <p className="text-amber-400 text-sm font-medium">
                  This allows them to be a whole person with separate stressors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-amber-50/80 border border-amber-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-amber-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            When you feel someone pulling away, what is the #1 &ldquo;Spotlight on Me&rdquo;
            assumption you usually jump to?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-amber-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-amber-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I always assume I was too needy or talked too much\u2026"
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
            href="/workbook/anxious-attachment/week-4/day-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 25
          </a>
          <a
            href="/workbook/anxious-attachment/week-4/day-6"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 27
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
