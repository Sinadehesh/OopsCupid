'use client';

import React, { useState, useEffect } from 'react';
import {
  Anchor, ArrowRight, Brain, ShieldCheck, Play,
  Square, Info, Ship, CheckCircle2
} from 'lucide-react';

type ChecklistKey = 'consistent' | 'repairs' | 'boundaries' | 'vulnerable' | 'boring';

const CHECKLIST_ITEMS: { key: ChecklistKey; label: string; description: string }[] = [
  { key: 'consistent', label: 'Consistency', description: "Their words match their actions. They don't disappear for days." },
  { key: 'repairs', label: 'Repair', description: 'After a disagreement, they actively try to reconnect.' },
  { key: 'boundaries', label: 'Boundaries', description: 'If you say "no," they accept it without guilt-tripping you.' },
  { key: 'vulnerable', label: 'Emotional Access', description: 'They are willing to share their feelings.' },
  { key: 'boring', label: 'The "Boring" Test', description: 'You feel calm (or even a bit bored) with them. No major anxiety spikes.' },
];

export default function Week6Day1() {
  const [safeHarborScore, setSafeHarborScore] = useState(0);
  const [checklist, setChecklist] = useState<Record<ChecklistKey, boolean>>({
    consistent: false,
    repairs: false,
    boundaries: false,
    vulnerable: false,
    boring: false,
  });

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

  const handleCheck = (key: ChecklistKey) => {
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      setSafeHarborScore(Object.values(next).filter(Boolean).length);
      return next;
    });
  };

  const getScoreLabel = () => {
    if (safeHarborScore === 0) return null;
    if (safeHarborScore <= 2) return { text: 'Proceed with caution. This dynamic may trigger your anxiety.', color: 'text-amber-400' };
    if (safeHarborScore === 3) return { text: 'Developing potential. Monitor their consistency.', color: 'text-teal-300' };
    return { text: 'A Corrective Relationship! This is a Safe Harbor.', color: 'text-emerald-400' };
  };

  const getShieldColor = () => {
    if (safeHarborScore === 0) return 'text-slate-600';
    if (safeHarborScore <= 2) return 'text-amber-400';
    if (safeHarborScore <= 4) return 'text-teal-400';
    return 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]';
  };

  const scoreLabel = getScoreLabel();
  const circumference = 2 * Math.PI * 90; // 565.49

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-emerald-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-teal-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-emerald-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase border border-teal-200">
              Week 6 &middot; Day 1 (Day 36)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
              Safe Harbor
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Learning how to identify a &ldquo;Corrective Relationship&rdquo; that actually heals you.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-teal-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Ship className="w-7 h-7 text-teal-600 shrink-0" />
            Attachment Insight: The Safe Harbor
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                You cannot heal relational trauma in isolation. Your nervous system was injured
                in a relationship, and it must be healed in a relationship. Psychologists call
                this a <strong>Corrective Emotional Experience</strong>.
              </p>
              <p>
                You need a <strong>Safe Harbor</strong> — a partner, friend, or therapist who
                does not escalate when you panic, and does not withdraw when you need them.
                They remain steady.
              </p>
              <div className="bg-teal-50/80 border border-teal-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-sm text-teal-900 leading-relaxed">
                  <strong>The Realization:</strong> Anxiously attached people have broken
                  &ldquo;radars.&rdquo; They are often drawn to chaotic people and find secure
                  people &ldquo;boring.&rdquo; We must manually override the radar to seek safety.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=600&auto=format&fit=crop"
                alt="Calm harbor at sunrise"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-emerald-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Evaluating the people we love can cause anxiety. Drop your anchor for 60 seconds
                to step into the objective Adult Chair.
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
                    className="w-full accent-emerald-400 disabled:opacity-40"
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
                    className="w-full accent-emerald-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(16,185,129,0.25)] border border-emerald-400/30"
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
                    ? 'bg-slate-800 text-emerald-300 border border-emerald-700 hover:bg-slate-700'
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

        {/* 3. Safe Harbor Detector */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-emerald-500/8 blur-3xl" />

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 relative z-10">
            <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
            Practice 2: The Safe Harbor Detector
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-2xl leading-relaxed relative z-10">
            Think of a current partner, close friend, or person you are dating. Use your logical
            brain — not your feelings — to objectively evaluate them below.
          </p>

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            {/* Checklist */}
            <div className="w-full md:w-3/5 space-y-3">
              {CHECKLIST_ITEMS.map(({ key, label, description }) => (
                <button
                  key={key}
                  onClick={() => handleCheck(key)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    checklist[key]
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-100'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:bg-slate-800/60 hover:border-slate-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded shrink-0 mt-0.5 border-2 flex items-center justify-center transition-colors ${
                      checklist[key] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                    }`}
                  >
                    {checklist[key] && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm leading-relaxed">
                    <strong className={checklist[key] ? 'text-emerald-300' : 'text-slate-300'}>
                      {label}:
                    </strong>{' '}
                    {description}
                  </span>
                </button>
              ))}
            </div>

            {/* Score Gauge */}
            <div className="w-full md:w-2/5 flex flex-col items-center justify-center pt-4 md:pt-0">
              <div className="relative w-44 h-44 flex items-center justify-center mb-5">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#1e293b" strokeWidth="12" />
                  <circle
                    cx="100" cy="100" r="90" fill="none"
                    stroke="#34d399" strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (circumference * (safeHarborScore / 5))}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <ShieldCheck className={`w-16 h-16 transition-all duration-500 z-10 ${getShieldColor()}`} />
              </div>

              <p className="text-2xl font-bold text-white mb-2 tabular-nums">
                {safeHarborScore} <span className="text-slate-500 font-normal text-base">/ 5</span>
              </p>
              <div className="h-10 flex items-start justify-center">
                {scoreLabel && (
                  <p className={`text-xs text-center font-medium leading-relaxed max-w-[180px] ${scoreLabel.color}`}>
                    {scoreLabel.text}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-teal-50/80 border border-teal-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-teal-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Looking at the person you evaluated, what is the hard truth about your relationship
            with them?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-teal-100 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-teal-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., The hard truth is that I am confusing their inconsistency for passion..."
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
            href="/workbook/anxious-attachment/week-5/day-7"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Week 5
          </a>
          <a
            href="/workbook/anxious-attachment/week-6/day-2"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 37
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
