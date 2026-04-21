'use client';

import React, { useState, useEffect } from 'react';
import {
  ScanFace, ArrowRight, Brain, Radar, Crosshair,
  Play, Square, Heart, ShieldAlert,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 ' +
  'focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

const parts = [
  { id: 'head',    label: 'Head & Jaw',      options: ['Tight/Clenched', 'Throbbing',        'Heavy',            'Clear/Relaxed'] },
  { id: 'throat',  label: 'Throat & Neck',   options: ['Constricted',    'Lump in throat',   'Dry',              'Open'] },
  { id: 'chest',   label: 'Chest & Heart',   options: ['Fluttery/Racing','Heavy/Pressure',   'Shallow breathing','Steady'] },
  { id: 'stomach', label: 'Stomach & Gut',   options: ['Knots',          'Nauseous',         'Warm',             'Settled'] },
];

export default function Day4() {
  const [radarDirection, setRadarDirection] = useState<'Outward' | 'Inward'>('Outward');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [sensations, setSensations] = useState<Record<string, string>>({});

  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isBreathing) {
      setBreathPhase('Inhale');
      setTimeLeft(4);
      return;
    }
    const timer = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft((t) => t - 1);
      } else {
        const next = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
        setBreathPhase(next);
        setTimeLeft(next === 'Inhale' ? 4 : 6);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isBreathing, timeLeft, breathPhase]);

  const handleSelectSensation = (sensation: string) => {
    if (selectedBodyPart) {
      setSensations((prev) => ({ ...prev, [selectedBodyPart]: sensation }));
      setTimeout(() => setSelectedBodyPart(null), 200);
    }
  };

  const bubbleScale   = isBreathing && breathPhase === 'Inhale' ? 1.2 : 1;
  const glowScale     = isBreathing && breathPhase === 'Inhale' ? 1.5 : 1;
  const dur           = isBreathing ? (breathPhase === 'Inhale' ? '4s' : '6s') : '1s';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-purple-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 1 · Day 4
            </span>
            <span className="text-indigo-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Radar Dish
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Learning Interoception: turning your focus from them, back to you.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. The Psychology ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Radar className="w-7 h-7 text-indigo-500 shrink-0" />
                The Hyper-Vigilance Radar
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Anxiously attached individuals are emotional radar dishes. You are constantly{' '}
                  <strong>externally scanning</strong> your partner — monitoring tone of voice,
                  texting speed, and micro-expressions to ensure you are safe.
                </p>
                <p>
                  Because all your energy is focused outward, you become entirely disconnected
                  from what is happening <em>inside</em> your own body.
                </p>
              </div>

              <div className="mt-6 bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-900 leading-relaxed">
                  <strong>The Goal:</strong> Today we practice <strong>Interoception</strong> — the
                  ability to turn the radar inward. We cannot regulate a panicked emotion if we
                  cannot locate where it lives in our body.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1518331647614-7a1f04cd34fc?q=80&w=600&auto=format&fit=crop"
                alt="Radar dish"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Practice 1: Flip the Switch ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Crosshair className="w-7 h-7 text-emerald-400 shrink-0" />
              Practice 1: Flip the Switch
            </h2>
            <p className="text-slate-400 mb-8 text-base leading-relaxed">
              Notice what happens when you shift your energy from outward surveillance to inward care.
            </p>

            {/* Toggle */}
            <div className="flex bg-slate-900 p-2 rounded-full border border-slate-700 mb-8 w-full max-w-md mx-auto">
              <button
                onClick={() => setRadarDirection('Outward')}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                  radarDirection === 'Outward' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Outward Radar
              </button>
              <button
                onClick={() => setRadarDirection('Inward')}
                className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                  radarDirection === 'Inward' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Inward Radar
              </button>
            </div>

            {/* Content */}
            <div className="min-h-[180px] flex items-center justify-center text-center">
              {radarDirection === 'Outward' ? (
                <div className="w-full">
                  <Radar className="w-16 h-16 text-rose-400 mx-auto mb-5" />
                  <p className="text-rose-100 text-xl font-medium mb-4 max-w-lg mx-auto leading-relaxed">
                    "Why haven't they replied? Are they mad? Did I do something wrong?"
                  </p>
                  <span className="inline-block bg-rose-900/40 text-rose-300 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold border border-rose-500/30">
                    Result: High Anxiety &amp; Exhaustion
                  </span>
                </div>
              ) : (
                <div className="w-full">
                  <Heart className="w-16 h-16 text-emerald-400 mx-auto mb-5 animate-pulse" />
                  <p className="text-emerald-100 text-xl font-medium mb-4 max-w-lg mx-auto leading-relaxed">
                    "My chest feels tight right now. I need to take a deep breath for myself."
                  </p>
                  <span className="inline-block bg-emerald-900/40 text-emerald-300 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold border border-emerald-500/30">
                    Result: Emotional Regulation &amp; Control
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. Practice 2: Body Scanner ── */}
        <section className={CARD.replace('bg-white/70', 'bg-indigo-50/80')}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-indigo-900">
            <ScanFace className="w-7 h-7 text-indigo-500 shrink-0" />
            Practice 2: The Interoception Map
          </h2>

          {/* Step A: Anchor */}
          <div className="bg-white/80 border border-indigo-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-8 shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">Step A: Drop Your Anchor</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Before we scan the body, breathe here for 30 seconds to establish safety.
              </p>
              {isBreathing && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-indigo-400/20 rounded-full blur-md"
                      style={{ transform: `scale(${glowScale})`, transitionDuration: dur, transition: 'transform' }}
                    />
                    <div
                      className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex flex-col items-center justify-center z-10 border border-indigo-400/50"
                      style={{ transform: `scale(${bubbleScale})`, transitionDuration: dur, transition: 'transform' }}
                    >
                      <span className="text-white text-[9px] font-bold uppercase leading-none">{breathPhase}</span>
                      <span className="text-white text-sm font-light">{timeLeft}</span>
                    </div>
                  </div>
                  <span className="text-slate-500 text-sm">
                    {breathPhase === 'Inhale' ? 'Breathe in slowly…' : 'Blow out slowly…'}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsBreathing(!isBreathing)}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all shrink-0 ${
                isBreathing
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:scale-105'
              }`}
            >
              {isBreathing ? <><Square className="w-5 h-5" /> Stop Anchor</> : <><Play className="w-5 h-5" /> Start 4-6 Breath</>}
            </button>
          </div>

          {/* Step B: Instructions */}
          <div className="bg-indigo-100/50 p-5 rounded-2xl mb-8">
            <h3 className="font-bold text-indigo-900 text-lg mb-1">Step B: Scan Without Judgment</h3>
            <p className="text-indigo-800 text-base leading-relaxed">
              Close your eyes. Then tap a body part below. What physical sensation do you notice there right now?{' '}
              <strong>Do not judge it or try to fix it — just label it.</strong>
            </p>
          </div>

          {/* Body parts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {parts.map((part) => (
              <div key={part.id} className="relative">
                <button
                  onClick={() => setSelectedBodyPart(selectedBodyPart === part.id ? null : part.id)}
                  className={`w-full p-6 rounded-2xl font-bold text-left transition-all border-2 shadow-sm ${
                    sensations[part.id]
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white/90 border-indigo-200 text-indigo-900 hover:bg-indigo-50 hover:border-indigo-400'
                  }`}
                >
                  <span className="text-lg block">{part.label}</span>
                  {sensations[part.id] && (
                    <span className="block text-sm font-normal mt-2 bg-indigo-500/40 px-3 py-1.5 rounded-xl">
                      Current: <strong>{sensations[part.id]}</strong>
                    </span>
                  )}
                </button>

                {selectedBodyPart === part.id && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-20">
                    <div className="grid grid-cols-2 gap-3">
                      {part.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSelectSensation(opt)}
                          className="p-3 text-sm bg-slate-50 hover:bg-indigo-100 hover:text-indigo-800 rounded-xl text-slate-700 font-semibold transition-colors"
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
        </section>

        {/* ── 4. Integration Reflection ── */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-indigo-500 shrink-0" />
            Integration
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-5">
            Was it difficult to focus on your internal body instead of thinking about your external relationships?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. Yes, my mind kept trying to wander back to my phone…"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2500); }}
              disabled={!reflection.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaved ? '✓ Saved!' : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-1/day-3"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 3
          </a>
          <a
            href="/workbook/anxious-attachment/week-1/day-5"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all group shadow-lg shadow-indigo-600/20 text-sm"
          >
            Continue to Day 5
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
