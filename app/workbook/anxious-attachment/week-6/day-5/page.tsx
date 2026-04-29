'use client';

import React, { useEffect, useState } from 'react';
import {
  SmilePlus,
  ArrowRight,
  Brain,
  Gamepad2,
  Anchor,
  Play,
  Square,
  Info,
  ShieldCheck,
  Ticket,
} from 'lucide-react';

type BreathPhase = 'Inhale' | 'Exhale';

const ACTIVITIES = [
  {
    title: 'Finger Painting',
    desc: 'Buy cheap watercolors and paint with your hands. No rules, no structure, no \u201cgood\u201d art allowed.',
  },
  {
    title: 'The Dance Party',
    desc: 'Put on a song from when you were 8 years old. Jump around your living room purely to shake out the energy.',
  },
  {
    title: 'The Sandbox',
    desc: 'Go to a park, take off your shoes, and literally put your feet in the sand or grass. Let yourself be messy.',
  },
  {
    title: 'The Cartoon Binge',
    desc: 'Watch an episode of a comforting childhood cartoon while eating a nostalgic snack. No phones allowed.',
  },
];

export default function Week6Day5() {
  const [activeActivity, setActiveActivity] = useState<number | null>(null);

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isBreathing) {
      timer = setTimeout(() => {
        if (timeLeft > 1) {
          setTimeLeft((t) => t - 1);
        } else {
          const next: BreathPhase = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
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

  const handleBreathToggle = () => {
    if (!isBreathing) {
      setBreathPhase('Inhale');
      setTimeLeft(inhaleTime);
    }
    setIsBreathing((b) => !b);
  };

  const phaseDuration = isBreathing ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime) : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 font-sans text-slate-800 pb-24">
      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(234,88,12,0.07),transparent_40%)]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-700 mb-4">
            Week 6 &middot; Day 5 (Day 40)
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Playground
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Relieving the inner child from duty and teaching your nervous system how to play.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Attachment Insight */}
        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-white/70">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-5 flex items-center text-slate-900">
                <SmilePlus className="w-7 h-7 text-amber-500 mr-3 shrink-0" />
                Attachment Insight: The Joy Deficit
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  As we discussed in Week 2, a hyper-vigilant child is essentially an on-duty soldier. And
                  soldiers on active duty do not play.
                </p>
                <p>
                  <strong>Play requires absolute safety.</strong> If you struggle to relax, have fun, or do
                  things &ldquo;just because they are fun,&rdquo; it&rsquo;s because your nervous system still
                  believes it must be &ldquo;useful&rdquo; to survive.
                </p>
                <div className="bg-amber-50/80 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <strong>The Realization:</strong> To solidify Earned Security, you must engage in
                    activities that produce absolutely zero capital or relationship value. You must play.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop"
                alt="Playground with warm light"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Breathing Anchor */}
        <section className="bg-slate-950 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/8 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
                <Anchor className="w-7 h-7 text-amber-400 mr-3 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                Relaxing can actually trigger anxiety for people used to chaos
                (relaxation-induced anxiety). Anchor yourself to prove that stillness is safe.
              </p>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-white">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-amber-400 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale</span>
                    <span className="font-bold text-white">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-amber-400 disabled:opacity-50"
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
                    transitionDuration: `${phaseDuration}s`,
                    transitionProperty: 'transform',
                    transitionTimingFunction: 'ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(245,158,11,0.2)] border border-amber-400/30"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                    transitionProperty: 'transform',
                    transitionTimingFunction: 'ease-in-out',
                  }}
                >
                  <span className="font-bold uppercase tracking-wider text-white text-sm">
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
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
                    : 'bg-white text-slate-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing ? (
                  <><Square className="w-5 h-5" /> Stop Anchor</>
                ) : (
                  <><Play className="w-5 h-5" /> Start Anchor Breath</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Joy Generator */}
        <section className="bg-white/85 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3 text-slate-900 mb-3">
              <Gamepad2 className="w-7 h-7 text-amber-500 shrink-0" />
              Practice 2: The Joy Generator
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Click a ticket below to assign yourself a mandatory &ldquo;Play&rdquo; activity for this
              week. It must serve zero practical purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {ACTIVITIES.map((act, i) => {
              const isActive = activeActivity === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveActivity(isActive ? null : i)}
                  className={`rounded-[1.5rem] p-8 text-left transition-all duration-300 border-2 min-h-[180px] flex flex-col justify-center ${
                    isActive
                      ? 'bg-amber-500 border-amber-600 text-white shadow-xl scale-[1.03]'
                      : 'bg-amber-50/80 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:scale-[1.01]'
                  }`}
                >
                  {isActive ? (
                    <div className="animate-in zoom-in-95 duration-300">
                      <Ticket className="w-7 h-7 mb-3 opacity-60" />
                      <p className="text-base font-medium leading-relaxed">{act.desc}</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-bold text-amber-900 mb-1">{act.title}</h3>
                      <p className="text-amber-500 font-bold uppercase text-xs tracking-[0.2em]">
                        Tap to reveal
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Integration */}
        <section className="bg-amber-50/80 p-8 md:p-10 rounded-[2rem] border border-amber-100">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center">
            <Brain className="w-6 h-6 text-amber-600 mr-3 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            What was your absolute favorite thing to do when you were 7 years old? How can you
            recreate a version of that this weekend?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white border border-amber-100 rounded-2xl p-5 h-32 outline-none focus:ring-2 focus:ring-amber-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., I used to love building forts out of blankets. I could build one to read a book in..."
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
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-6/day-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 39
          </a>
          <a
            href="/workbook/anxious-attachment/week-6/day-6"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 41
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </main>
    </div>
  );
}
