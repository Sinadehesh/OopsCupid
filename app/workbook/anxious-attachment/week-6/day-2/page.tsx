'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Brain,
  Anchor,
  Play,
  Square,
  Info,
  ShieldCheck,
  RefreshCcw,
  Train,
  Flame,
} from 'lucide-react';

type BreathPhase = 'Inhale' | 'Exhale';
type FeelingType = 'rollercoaster' | 'train';
type SortState = FeelingType | 'error';

const RELATIONSHIP_FEELINGS: { text: string; type: FeelingType }[] = [
  {
    text: 'I constantly check my phone to see if they texted, feeling a pit in my stomach until they do.',
    type: 'rollercoaster',
  },
  {
    text: "We haven't talked in a few hours, but I know they're busy and will get back to me later.",
    type: 'train',
  },
  {
    text: 'When we make up after a fight, the relief is so intense it feels like a drug.',
    type: 'rollercoaster',
  },
  {
    text: "When we hang out, it's just nice and easy. There are no massive highs or massive lows.",
    type: 'train',
  },
];

export default function Week6Day2() {
  const [activeCard, setActiveCard] = useState(0);
  const [sorted, setSorted] = useState<Record<number, SortState>>({});

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
          setTimeLeft((prev) => prev - 1);
        } else {
          const nextPhase: BreathPhase = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
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
    setIsBreathing((prev) => !prev);
  };

  const handleSort = (type: FeelingType) => {
    const isCorrect = RELATIONSHIP_FEELINGS[activeCard].type === type;
    setSorted((prev) => ({ ...prev, [activeCard]: isCorrect ? type : 'error' }));

    if (isCorrect && activeCard < RELATIONSHIP_FEELINGS.length - 1) {
      setTimeout(() => setActiveCard((prev) => prev + 1), 800);
    }

    if (isCorrect && activeCard === RELATIONSHIP_FEELINGS.length - 1) {
      setTimeout(() => setActiveCard(RELATIONSHIP_FEELINGS.length), 800);
    }
  };

  const handleReset = () => {
    setActiveCard(0);
    setSorted({});
  };

  const phaseDuration = isBreathing
    ? breathPhase === 'Inhale'
      ? inhaleTime
      : exhaleTime
    : 1;

  const isComplete = activeCard >= RELATIONSHIP_FEELINGS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 font-sans text-slate-800 pb-24">
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.10),transparent_35%)]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-4">
            Week 6 • Day 2 (Day 37)
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            The Rollercoaster
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Why your brain mistakes anxiety for butterflies, and peace for boredom.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">
        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-white/70 overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-slate-900">
                <Flame className="w-7 h-7 text-rose-500 mr-3" />
                Attachment Insight: Trauma Bonds
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  If you grew up with chaos or inconsistency, your nervous system learned that love equals stress.
                </p>
                <p>
                  When you meet someone toxic or avoidant, the unpredictability triggers massive spikes of cortisol
                  (stress) and dopamine (relief). It feels like a <strong>Rollercoaster</strong>. Your brain can
                  misinterpret this intense, sickening anxiety as &ldquo;butterflies&rdquo; or &ldquo;passion.&rdquo;
                </p>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start mt-4">
                  <Info className="w-6 h-6 text-slate-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-800 leading-relaxed">
                    <strong>The Realization:</strong> When you finally meet a secure person, there is no cortisol
                    spike. It feels like a smooth, predictable <strong>Train Ride</strong>. At first, your traumatized
                    brain may misread this peaceful safety as &ldquo;boring&rdquo; or &ldquo;lacking chemistry.&rdquo;
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1513560645609-b47fa43f77df?q=80&w=600&auto=format&fit=crop"
                alt="Rollercoaster tracks at dusk"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-950 text-white p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-700/20 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
                <Anchor className="w-7 h-7 text-emerald-400 mr-3" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                Redefining what love feels like requires a calm nervous system. Drop your anchor for 60 seconds to
                prepare your body for peace.
              </p>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-white">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="8"
                    value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-emerald-400 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale</span>
                    <span className="font-bold text-white">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-emerald-400 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl transition-all"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-transform border border-emerald-400/30"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                  }}
                >
                  <span className="font-bold uppercase tracking-wider text-white">{isBreathing ? breathPhase : 'Ready'}</span>
                  {isBreathing && <span className="text-3xl font-light mt-1 text-white tabular-nums">{timeLeft}</span>}
                </div>
              </div>
              <button
                onClick={handleBreathToggle}
                className={`w-full max-w-xs py-4 rounded-full font-bold text-base md:text-lg flex items-center justify-center transition-all ${
                  isBreathing
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
                    : 'bg-white text-slate-900 hover:scale-105'
                }`}
              >
                {isBreathing ? (
                  <>
                    <Square className="w-5 h-5 mr-2" /> Stop Anchor
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" /> Start Anchor Breath
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white/85 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-slate-900">
            <RefreshCcw className="w-7 h-7 text-slate-600 mr-3" />
            Practice 2: Peace vs. Panic
          </h2>
          <p className="text-slate-700 mb-8 text-base md:text-lg leading-relaxed">
            Sort the feelings below. Is this the toxic rush of the Rollercoaster (Panic), or the safe
            consistency of the Train Ride (Peace)?
          </p>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center shadow-sm min-h-[320px] flex items-center justify-center">
            {!isComplete ? (
              <div className="w-full animate-in slide-in-from-bottom-4 duration-500">
                <div className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">
                  Card {activeCard + 1} of {RELATIONSHIP_FEELINGS.length}
                </div>

                <div className="bg-white border border-slate-200 p-8 rounded-2xl mb-8 shadow-sm">
                  <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                    &ldquo;{RELATIONSHIP_FEELINGS[activeCard].text}&rdquo;
                  </p>
                </div>

                {sorted[activeCard] === 'error' && (
                  <p className="text-rose-500 font-bold mb-4 animate-pulse">
                    Think again. Is that true safety, or just the adrenaline of anxiety?
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleSort('rollercoaster')}
                    className="px-8 py-4 bg-rose-100 text-rose-700 font-bold rounded-2xl hover:bg-rose-200 transition-colors flex items-center justify-center border border-rose-200"
                  >
                    <Flame className="w-5 h-5 mr-2" /> The Rollercoaster (Panic)
                  </button>
                  <button
                    onClick={() => handleSort('train')}
                    className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors flex items-center justify-center shadow-md"
                  >
                    <Train className="w-5 h-5 mr-2" /> The Train Ride (Peace)
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-500 py-8">
                <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Wiring Updated</h3>
                <p className="text-slate-600 leading-relaxed">
                  You are learning to stop chasing the adrenaline rush.
                </p>
                <button onClick={handleReset} className="mt-6 inline-flex items-center text-slate-600 font-bold hover:text-slate-900 transition-colors">
                  <RefreshCcw className="w-4 h-4 mr-2" /> Practice Again
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-slate-900 flex items-center">
            <Brain className="w-6 h-6 mr-3" />
            Integration
          </h2>
          <p className="mb-4 text-slate-700 text-base md:text-lg leading-relaxed">
            Have you ever pushed away a genuinely nice, secure person because you felt &ldquo;no spark&rdquo;
            or thought they were &ldquo;boring&rdquo;? Write about it.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 h-32 outline-none focus:ring-2 focus:ring-emerald-500 mb-4 text-base resize-none"
            placeholder="e.g., Yes, I dated someone who always texted back, and my brain completely lost interest..."
          />
          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 2000);
              }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full font-bold transition-colors"
            >
              {isSaved ? (
                <span className="flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" /> Saved!
                </span>
              ) : (
                'Save Entry'
              )}
            </button>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a href="/workbook/anxious-attachment/week-6/day-1" className="text-slate-500 font-bold hover:text-slate-800 transition-colors">
            ← Back to Day 36
          </a>
          <a
            href="/workbook/anxious-attachment/week-6/day-3"
            className="flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-black shadow-lg transition-transform hover:scale-105"
          >
            Continue to Day 38 <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </main>
    </div>
  );
}
