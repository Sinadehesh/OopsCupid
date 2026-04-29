'use client';

import React, { useEffect, useState } from 'react';
import {
  BookHeart,
  ArrowRight,
  Library,
  Anchor,
  Play,
  Square,
  Info,
  ShieldCheck,
  MapPin,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

type BreathPhase = 'Inhale' | 'Exhale';
type Step = 1 | 2 | 3 | 4;

export default function Week6Day4() {
  const [step, setStep] = useState<Step>(1);
  const [oldBelief, setOldBelief] = useState('');
  const [objectiveContext, setObjectiveContext] = useState('');
  const [newIntegration, setNewIntegration] = useState('');

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const [isNarrativeSaved, setIsNarrativeSaved] = useState(false);

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

  const handleSaveNarrative = () => {
    setIsNarrativeSaved(true);
    setTimeout(() => setIsNarrativeSaved(false), 3000);
  };

  const STEPS: { label: string; idx: Step }[] = [
    { label: '1. The Childhood Belief', idx: 1 },
    { label: '2. The Objective Reality', idx: 2 },
    { label: '3. The Integration', idx: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/40 font-sans text-slate-800 pb-24">
      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.07),transparent_40%)]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-indigo-700 mb-4">
            Week 6 &middot; Day 4 (Day 39)
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              Coherent Narrative
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            The ultimate clinical marker of Earned Secure Attachment.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Attachment Insight */}
        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-white/70">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-5 flex items-center text-slate-900">
                <Library className="w-7 h-7 text-indigo-500 mr-3 shrink-0" />
                Attachment Insight: The Archivist
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  In Mary Main&rsquo;s groundbreaking research on the{' '}
                  <em>Adult Attachment Interview (AAI)</em>, she discovered something incredible: What makes
                  someone secure is not having a perfect childhood. It is having a{' '}
                  <strong>Coherent Narrative</strong>.
                </p>
                <p>
                  Secure people are like archivists who have properly filed away their history. They can look
                  at past pain objectively, without getting sucked back into it emotionally, and without
                  idealizing their parents.
                </p>
                <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-indigo-900 leading-relaxed">
                    <strong>The Realization:</strong> You earn security not by forgetting your painful
                    childhood, but by rewriting your story so that it makes logical sense to your Adult brain.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop"
                alt="Library shelves with warm light"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Breathing Anchor */}
        <section className="bg-slate-950 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
                <Anchor className="w-7 h-7 text-violet-400 mr-3 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                Re-filing childhood memories can activate the amygdala. Drop your anchor for 60
                seconds to ensure the Adult Archivist stays online.
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
                    className="w-full accent-violet-400 disabled:opacity-50"
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
                    className="w-full accent-violet-400 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                    transitionProperty: 'transform',
                    transitionTimingFunction: 'ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-violet-400/30"
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

        {/* Narrative Integrator */}
        <section className="bg-white/85 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center">
            <BookHeart className="w-7 h-7 text-indigo-500 mr-3 shrink-0" />
            Practice 2: The Narrative Integrator
          </h2>
          <p className="text-slate-600 mb-8 text-base md:text-lg leading-relaxed">
            Use this step-by-step builder to integrate a painful childhood dynamic into a coherent adult story.
          </p>

          <div className="bg-slate-50/80 rounded-2xl border border-slate-200 overflow-hidden">
            {/* Step tabs — hidden on step 4 */}
            {step < 4 && (
              <div className="flex border-b border-slate-200 bg-white">
                {STEPS.map(({ label, idx }) => (
                  <div
                    key={idx}
                    className={`flex-1 py-4 px-2 text-center text-xs font-bold uppercase tracking-wide transition-colors border-b-2 ${
                      step >= idx
                        ? 'text-indigo-600 border-indigo-500'
                        : 'text-slate-400 border-transparent'
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}

            <div className="p-8 md:p-12 min-h-[380px] flex flex-col justify-center">

              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-400 max-w-2xl mx-auto w-full">
                  <label className="block text-lg font-bold text-slate-800 mb-4 leading-relaxed">
                    What flawed belief did you form about yourself as a child to survive your environment?
                  </label>
                  <textarea
                    className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-slate-700 focus:ring-2 focus:ring-indigo-400 outline-none resize-none h-40 text-base shadow-sm placeholder:text-slate-400"
                    placeholder="e.g., 'I believed that if I wasn't perfect and overly helpful, people would eventually get tired of me and leave.'"
                    value={oldBelief}
                    onChange={(e) => setOldBelief(e.target.value)}
                  />
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!oldBelief.trim()}
                      className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-md"
                    >
                      Next Step &rarr;
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-400 max-w-2xl mx-auto w-full">
                  <label className="block text-lg font-bold text-slate-800 mb-4 leading-relaxed">
                    Zoom out like a documentary camera. What was the{' '}
                    <em>actual, objective reality</em> of the adults around you?
                  </label>
                  <textarea
                    className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-slate-700 focus:ring-2 focus:ring-indigo-400 outline-none resize-none h-40 text-base shadow-sm placeholder:text-slate-400"
                    placeholder="e.g., 'The reality is my parents were deeply overwhelmed with their own trauma and entirely unequipped to provide consistent emotional attunement.'"
                    value={objectiveContext}
                    onChange={(e) => setObjectiveContext(e.target.value)}
                  />
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                    >
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!objectiveContext.trim()}
                      className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-md"
                    >
                      Next Step &rarr;
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-400 max-w-2xl mx-auto w-full">
                  <label className="block text-lg font-bold text-slate-800 mb-4 leading-relaxed">
                    Combine these into an integrated, self-compassionate truth.
                  </label>
                  <textarea
                    className="w-full bg-white border border-slate-200 rounded-2xl p-5 text-slate-700 focus:ring-2 focus:ring-indigo-400 outline-none resize-none h-40 text-base shadow-sm placeholder:text-slate-400"
                    placeholder="e.g., 'My anxious people-pleasing was a brilliant survival strategy for an unpredictable home. But I am an adult now, and I am safe enough to let that armor go.'"
                    value={newIntegration}
                    onChange={(e) => setNewIntegration(e.target.value)}
                  />
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                    >
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={!newIntegration.trim()}
                      className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 disabled:opacity-40 transition-all shadow-md"
                    >
                      Compile Narrative
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto w-full">
                  <div className="text-center mb-8">
                    <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-slate-900">Your Coherent Narrative</h3>
                  </div>

                  <div className="bg-indigo-950 text-indigo-50 p-8 md:p-10 rounded-[1.5rem] shadow-xl text-left space-y-6 relative">
                    <MapPin className="absolute top-5 right-5 text-indigo-700 w-8 h-8 opacity-40" />
                    <p className="text-base md:text-lg font-serif italic leading-relaxed">&ldquo;{oldBelief}&rdquo;</p>
                    <div className="border-t border-indigo-800" />
                    <p className="text-base md:text-lg font-serif italic leading-relaxed">&ldquo;{objectiveContext}&rdquo;</p>
                    <div className="border-t border-indigo-800" />
                    <p className="text-base md:text-lg font-serif italic leading-relaxed text-amber-300 font-bold">&ldquo;{newIntegration}&rdquo;</p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-8 py-3 text-slate-500 font-bold hover:text-slate-800 border border-slate-200 rounded-full transition-colors"
                    >
                      Edit Story
                    </button>
                    <button
                      onClick={handleSaveNarrative}
                      className="flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all shadow-lg"
                    >
                      {isNarrativeSaved ? (
                        <><CheckCircle2 className="w-5 h-5" /> Safely Filed in the Archives</>
                      ) : (
                        <><ShieldCheck className="w-5 h-5" /> Save My Story</>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-6/day-3"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 38
          </a>
          <a
            href="/workbook/anxious-attachment/week-6/day-5"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 40
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </main>
    </div>
  );
}
