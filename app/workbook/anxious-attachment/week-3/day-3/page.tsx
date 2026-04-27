'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertOctagon, ArrowRight, Brain, Stethoscope, Anchor,
  Play, Square, ShieldCheck, ScanFace
} from 'lucide-react';

const CARD = 'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-sky-100/40 border border-white/60 p-8 md:p-12';

const parts = [
  { id: 'throat',    label: 'Throat & Voice',      options: ['Swallowing words', 'Choked up',      'Muted',         'Clear']     },
  { id: 'jaw',       label: 'Jaw & Teeth',          options: ['Grinding',         'Clenched tight', 'Aching',        'Relaxed']   },
  { id: 'shoulders', label: 'Shoulders & Neck',     options: ['Hunched up',       'Carrying weight','Stiff',         'Dropped']   },
  { id: 'stomach',   label: 'Gut & Digestion',      options: ['Acidic',           'Nauseous dread', 'Tied in knots', 'Calm']      },
];

export default function Week3Day3() {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [sensations, setSensations] = useState<Record<string, string>>({});

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

  const handleSelectSensation = (sensation: string) => {
    if (!selectedBodyPart) return;
    setSensations(prev => ({ ...prev, [selectedBodyPart]: sensation }));
    setTimeout(() => setSelectedBodyPart(null), 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-blue-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-widest uppercase border border-sky-200">
              Week 3 &middot; Day 3 (Day 17)
            </span>
            <span className="text-sky-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Check{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
              Engine Light
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Learning to recognize the physical sensation of &ldquo;No&rdquo; before resentment builds.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Stethoscope className="w-7 h-7 text-sky-600 shrink-0" />
            Attachment Insight: When the Body Says No
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                As physician Dr. Gabor Mat&eacute; explains, if you do not know how to say
                &ldquo;no&rdquo; with your words, your body will eventually say &ldquo;no&rdquo;
                for you &mdash; in the form of burnout, exhaustion, or illness.
              </p>
              <p>
                Long before you say &ldquo;yes&rdquo; to a favour you resent, your body flashes
                a <strong>Check Engine Light</strong>. A tightening in the throat. A sinking dread
                in the stomach. A clench of the jaw.
              </p>
              <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-4 flex items-start gap-3 mt-2">
                <AlertOctagon className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-sm text-sky-900 leading-relaxed">
                  <strong>The Realization:</strong> Anxiously attached people have trained
                  themselves to ignore the Check Engine Light to keep the peace. Today, we
                  turn it back on.
                </p>
              </div>
            </div>
            <div className="md:w-56 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1549488344-c18408db0688?q=80&w=600&auto=format&fit=crop"
                alt="Car dashboard warning light"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-sky-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-sky-300 text-base mb-6 leading-relaxed">
                To feel the subtle signals of the body, we have to get quiet. Drop your anchor
                for 60 seconds.
              </p>
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-sky-200 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-sky-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-sky-200 mb-2">
                    <span>Exhale <span className="text-sky-400 font-normal">(longer = calmer)</span></span>
                    <span className="font-bold">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-sky-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-sky-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(14,165,233,0.5)] border-2 border-sky-400/50"
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
                    : 'bg-white text-sky-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-4 h-4" /> Stop Anchor</>
                  : <><Play className="w-4 h-4" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Resentment Radar */}
        <section className={`${CARD} !bg-white/80`}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <ScanFace className="w-7 h-7 text-sky-600 shrink-0" />
            Practice 2: The Resentment Radar
          </h2>
          <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-5 mb-8">
            <p className="text-sm text-sky-900 leading-relaxed">
              Close your eyes and think of a time someone asked you for a favour you deeply did
              not want to do, but you said &ldquo;yes&rdquo; anyway. Click the area where your
              body physically tried to say &ldquo;NO.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
            {parts.map(part => (
              <div key={part.id} className="relative">
                <button
                  onClick={() => setSelectedBodyPart(selectedBodyPart === part.id ? null : part.id)}
                  className={`w-full p-6 rounded-2xl font-bold text-left transition-all border-2 ${
                    sensations[part.id]
                      ? 'bg-sky-700 text-white border-sky-700 shadow-md'
                      : 'bg-white border-slate-200 text-sky-900 hover:bg-sky-50 hover:border-sky-300 shadow-sm'
                  }`}
                >
                  <span className="text-base block mb-1">{part.label}</span>
                  {sensations[part.id] && (
                    <span className="block text-xs font-normal mt-2 bg-sky-600/40 px-3 py-1.5 rounded-lg">
                      Warning sign: <strong>{sensations[part.id]}</strong>
                    </span>
                  )}
                  {!sensations[part.id] && (
                    <span className="text-xs text-sky-400 font-normal mt-1 block">
                      Tap to map your signal
                    </span>
                  )}
                </button>

                {selectedBodyPart === part.id && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-20 animate-in slide-in-from-top-2 duration-150">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">Choose your sensation</p>
                    <div className="grid grid-cols-2 gap-2">
                      {part.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleSelectSensation(opt)}
                          className="p-3 text-xs bg-slate-50 hover:bg-sky-100 hover:text-sky-800 rounded-xl text-slate-700 font-bold transition-colors text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(sensations).length === parts.length && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-800 font-medium">
                Radar complete. You now know your four Check Engine signals. Trust them.
              </p>
            </div>
          )}
        </section>

        {/* 4. Integration Reflection */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-sky-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-4 text-slate-600 text-base leading-relaxed">
            The next time you feel that specific physical sensation, what phrase can you use to
            buy yourself time instead of immediately saying yes?
          </p>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white border border-sky-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-sky-500 text-sm leading-relaxed resize-none mb-4"
            placeholder="e.g., &lsquo;Let me check my schedule and get back to you tomorrow.&rsquo;"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl font-bold transition-colors text-sm"
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
            href="/workbook/anxious-attachment/week-3/day-2"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 16
          </a>
          <a
            href="/workbook/anxious-attachment/week-3/day-4"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Continue to Day 18
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
