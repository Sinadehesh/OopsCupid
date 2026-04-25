'use client';

import React, { useState, useEffect } from 'react';
import {
  Droplet, ArrowRight, Brain, Search, Anchor,
  Play, Square, ShieldCheck, RefreshCw,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-sky-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-sky-200 rounded-2xl p-4 text-slate-700 ' +
  'placeholder:text-slate-400 focus:ring-2 focus:ring-sky-400 focus:border-transparent ' +
  'outline-none resize-none shadow-inner transition-all';

type BreathPhase = 'Inhale' | 'Exhale';

interface IcebergCard {
  surface: string;
  deep: string;
}

const icebergNeeds: IcebergCard[] = [
  {
    surface: 'Picking a fight over dishes.',
    deep: 'I need to know that I am not alone in carrying the weight of this life.',
  },
  {
    surface: 'Snooping on their phone.',
    deep: 'I need transparency and safety because uncertainty feels like physical danger to me.',
  },
  {
    surface: 'Acting cold and pulling away.',
    deep: 'I need you to notice that I am hurt and pursue me, so I know I am valuable to you.',
  },
  {
    surface: "Saying 'yes' when I mean 'no'.",
    deep: 'I need to feel useful so that you will not abandon me.',
  },
];

export default function Week2Day3() {
  const [activeNeed, setActiveNeed] = useState<number | null>(null);

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

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

  const toggleNeed = (i: number) =>
    setActiveNeed((prev) => (prev === i ? null : i));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-blue-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-widest uppercase border border-sky-200">
              Week 2 · Day 3 (Day 10)
            </span>
            <span className="text-sky-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Needs{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
              Iceberg
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Decoding the hidden, wounded needs buried beneath your relationship anxiety.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. Attachment Insight ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Droplet className="w-7 h-7 text-sky-500 shrink-0" />
                Attachment Insight: The Invisible Burden
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  As an anxiously attached child, you likely learned that having direct needs (like
                  asking for comfort) was burdensome or dangerous. So, you learned to hide them.
                </p>
                <p>
                  Because your needs didn’t disappear, they went underground. Like an{' '}
                  <strong>Iceberg</strong>, what people see on the surface is your anxious behaviour
                  (picking fights, clinging, checking up). But beneath the water is a massive,
                  unmet inner child need.
                </p>
              </div>

              <div className="mt-5 bg-sky-50/80 border border-sky-100 rounded-2xl p-4 flex items-start gap-3">
                <Search className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <p className="text-sm text-sky-900 leading-relaxed">
                  <strong>The Realization:</strong> Healing means stopping the surface-level
                  behaviours by bravely identifying and voicing the deep-water needs.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=600&auto=format&fit=crop"
                alt="Iceberg underwater"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Breathing Anchor ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-sky-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Looking at our true needs is vulnerable. Vulnerability triggers the nervous system.
                Drop your anchor for 60 seconds before we dive deep.
              </p>

              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-sky-400">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={8} value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-sky-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-sky-400">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={10} value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-sky-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-7">
                <div
                  className="absolute inset-0 bg-sky-500/25 rounded-full blur-lg"
                  style={{
                    transform: isExpanding ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${currentDur} ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex flex-col items-center justify-center z-10 border-2 border-sky-400/50 shadow-[0_0_30px_rgba(14,165,233,0.4)]"
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
                    ? 'bg-sky-900/40 text-sky-300 border border-sky-700 hover:bg-sky-900/60'
                    : 'bg-white text-sky-900 hover:scale-105 shadow-md'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-5 h-5" /> Stop Anchor</>
                  : <><Play className="w-5 h-5" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. Iceberg Decoder ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <RefreshCw className="w-7 h-7 text-sky-500 shrink-0" />
            Practice 2: Decode the Iceberg
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Click the surface-level “Protest Behaviours” to dive beneath the water and reveal the
            terrified inner child need hiding underneath.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {icebergNeeds.map((card, i) => {
              const active = activeNeed === i;
              return (
                <button
                  key={i}
                  onClick={() => toggleNeed(i)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 min-h-[130px] flex flex-col justify-center ${
                    active
                      ? 'bg-sky-900 border-sky-700 text-white shadow-xl scale-[1.02]'
                      : 'bg-sky-50/80 border-sky-200 hover:border-sky-400 shadow-sm'
                  }`}
                >
                  {active ? (
                    <>
                      <span className="text-xs font-bold uppercase tracking-wider mb-2 text-sky-300">
                        Deep Water Need
                      </span>
                      <p className="text-base font-medium text-white leading-relaxed">
                        &ldquo;{card.deep}&rdquo;
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-bold uppercase tracking-wider mb-2 text-sky-600 block">
                        Surface Behaviour
                      </span>
                      <p className="text-base font-medium text-slate-800 leading-relaxed">
                        &ldquo;{card.surface}&rdquo;
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 4. Reflection ── */}
        <section className="rounded-[2rem] bg-sky-50/60 backdrop-blur-xl shadow-lg shadow-sky-100/30 border border-sky-100 p-8 md:p-10">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-sky-900">
            <Brain className="w-6 h-6 text-sky-500 shrink-0" />
            Integration
          </h2>
          <p className="text-sky-800 text-base leading-relaxed mb-5">
            Think of a time you acted out recently. What was the{' '}
            <em>actual</em> need you were terrified to ask for directly?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. I acted angry about the laundry, but I really just needed them to hold me…"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2500); }}
              disabled={!reflection.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaved ? <><ShieldCheck className="w-5 h-5" /> Saved!</> : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-2"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 9
          </a>
          <a
            href="/workbook/anxious-attachment/week-2/day-4"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-full transition-all group shadow-lg shadow-sky-700/20 text-sm"
          >
            Continue to Day 11
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
