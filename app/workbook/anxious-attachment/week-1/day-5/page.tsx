'use client';

import React, { useState, useEffect } from 'react';
import {
  Waves, ArrowRight, Headphones, Droplets, Wind,
  CarFront, RefreshCw, Play, Square, Brain, ShieldCheck,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 ' +
  'placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent ' +
  'outline-none resize-none shadow-inner transition-all';

const exercises = [
  {
    id: 1,
    title: 'The Physiological Sigh',
    icon: <Wind className="w-12 h-12 mb-5 text-sky-400" />,
    desc: 'Two quick inhales through the nose, followed by one long exhale through the mouth. Rapidly offloads carbon dioxide and mechanically slows the heart.',
  },
  {
    id: 2,
    title: 'Vocal Toning (Humming)',
    icon: <Headphones className="w-12 h-12 mb-5 text-purple-400" />,
    desc: "Humming a low pitch (like 'Voooo') physically massages the vagus nerve in your throat, triggering deep relaxation and safety signals.",
  },
  {
    id: 3,
    title: 'Cold Exposure',
    icon: <Droplets className="w-12 h-12 mb-5 text-blue-400" />,
    desc: "Splashing ice-cold water on your face triggers the 'mammalian dive reflex', immediately slowing your heart rate and interrupting a panic attack.",
  },
];

type SighPhase = 'Inhale 1' | 'Inhale 2' | 'Exhale';

const SIGH_DURATIONS: Record<SighPhase, number> = {
  'Inhale 1': 2000,
  'Inhale 2': 1000,
  Exhale: 5000,
};

const NEXT_PHASE: Record<SighPhase, SighPhase> = {
  'Inhale 1': 'Inhale 2',
  'Inhale 2': 'Exhale',
  Exhale: 'Inhale 1',
};

const SIGH_INSTRUCTIONS: Record<SighPhase, string> = {
  'Inhale 1': 'Deep breath in through the nose…',
  'Inhale 2': 'Sharp second inhale to pop lungs open!',
  Exhale: 'Loooong, slow exhale through the mouth…',
};

export default function Day5() {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

  const [isSighing, setIsSighing] = useState(false);
  const [sighPhase, setSighPhase] = useState<SighPhase>('Inhale 1');

  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isSighing) {
      setSighPhase('Inhale 1');
      return;
    }
    const timer = setTimeout(() => {
      setSighPhase((p) => NEXT_PHASE[p]);
    }, SIGH_DURATIONS[sighPhase]);
    return () => clearTimeout(timer);
  }, [isSighing, sighPhase]);

  const isExpanding = isSighing && (sighPhase === 'Inhale 1' || sighPhase === 'Inhale 2');
  const bubble1Dur = sighPhase === 'Inhale 1' ? '2s' : sighPhase === 'Inhale 2' ? '1s' : '5s';
  const bubble2Dur = sighPhase === 'Inhale 2' ? '1s' : sighPhase === 'Exhale' ? '5s' : '2s';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-widest uppercase border border-sky-200">
              Week 1 · Day 5
            </span>
            <span className="text-sky-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">
              Emergency Brake
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Activating the Vagus Nerve to manually stop the speeding car of anxiety.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. The Metaphor ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <CarFront className="w-7 h-7 text-indigo-500 shrink-0" />
                The Car With No Brakes
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  When your Anxious Attachment is triggered, your body slams on the{' '}
                  <strong>Sympathetic Accelerator</strong>. You flood with adrenaline, ready to chase
                  down your partner to "fix" things immediately.
                </p>
                <p>
                  Ideally, we should press the <strong>Parasympathetic Brakes</strong> to calm down.
                  The main cable for this brake system is the <strong>Vagus Nerve</strong>.
                </p>
                <p>
                  But if you grew up with inconsistent care, your brake pedal is weak. Today, we
                  physically strengthen that nerve using somatic tools.
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop"
                alt="Sports Car"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Vagal Toolkit ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Waves className="w-7 h-7 text-indigo-400 shrink-0" />
              Practice 1: The Vagal Toolkit
            </h2>
            <p className="text-slate-400 mb-8 text-base leading-relaxed">
              Click a card to reveal a somatic exercise that directly stimulates the Vagus Nerve —
              these are emergency brakes for severe panic attacks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {exercises.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setActiveExercise(activeExercise === ex.id ? null : ex.id)}
                  className={`text-left cursor-pointer rounded-3xl p-8 transition-all duration-300 min-h-[260px] border-2 flex flex-col justify-center ${
                    activeExercise === ex.id
                      ? 'bg-indigo-900/80 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 hover:border-slate-500'
                  }`}
                >
                  {activeExercise === ex.id ? (
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-indigo-300">
                        {ex.title}
                      </h4>
                      <p className="text-base leading-relaxed text-indigo-50">{ex.desc}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="flex justify-center">{ex.icon}</div>
                      <h4 className="font-bold text-lg mb-5">{ex.title}</h4>
                      <span className="inline-flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-bold bg-slate-900/80 px-4 py-2 rounded-full border border-slate-700">
                        <RefreshCw className="w-3.5 h-3.5" /> Reveal Exercise
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Guided Sigh ── */}
        <section className={CARD.replace('bg-white/70', 'bg-sky-50/80').replace('border-white/60', 'border-sky-100')}>
          <h2 className="text-2xl font-bold text-sky-900 mb-2 flex items-center gap-3">
            <Wind className="w-7 h-7 text-sky-500 shrink-0" />
            Practice 2: The Physiological Sigh
          </h2>
          <p className="text-sky-700 text-base leading-relaxed mb-8 max-w-xl">
            Neuroscientist Andrew Huberman calls this the fastest way to calm the nervous system
            in real-time. Follow the animation below.
          </p>

          <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-sky-200 shadow-inner max-w-lg mx-auto">
            {/* Breathing circle */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              <div
                className="absolute inset-0 bg-sky-200 rounded-full"
                style={{
                  transform: isExpanding ? 'scale(1.5)' : 'scale(1)',
                  transition: `transform ${bubble1Dur} ease-in-out`,
                }}
              />
              <div
                className="absolute inset-0 bg-sky-300/60 rounded-full"
                style={{
                  transform: isSighing && sighPhase === 'Inhale 2' ? 'scale(1.8)' : isExpanding ? 'scale(1.5)' : 'scale(1)',
                  transition: `transform ${bubble2Dur} ease-in-out`,
                }}
              />
              <div className="w-32 h-32 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-full flex flex-col items-center justify-center z-10 shadow-xl border-4 border-white">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest leading-none">
                  {isSighing ? sighPhase : 'Ready'}
                </span>
              </div>
            </div>

            {/* Instruction */}
            <div className="h-14 flex items-center justify-center w-full bg-sky-50 rounded-2xl px-4 mb-7">
              <p className="text-sky-700 font-semibold text-base text-center">
                {!isSighing
                  ? 'Press start when you are ready.'
                  : SIGH_INSTRUCTIONS[sighPhase]}
              </p>
            </div>

            <button
              onClick={() => setIsSighing(!isSighing)}
              className={`inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-base shadow-md transition-all ${
                isSighing
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                  : 'bg-sky-600 text-white hover:bg-sky-700 hover:scale-105 shadow-sky-600/20'
              }`}
            >
              {isSighing ? <><Square className="w-5 h-5" /> Stop</> : <><Play className="w-5 h-5" /> Start The Sigh</>}
            </button>
          </div>
        </section>

        {/* ── 4. Integration Reflection ── */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-indigo-500 shrink-0" />
            Integration
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-5">
            Which of the three tools (Sighing, Humming, Cold) feels like the most realistic
            "Emergency Brake" for you to use during an argument?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. I think splashing cold water on my face would snap me out of it…"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2500); }}
              disabled={!reflection.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaved ? <><ShieldCheck className="w-5 h-5" /> Saved!</> : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-1/day-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 4
          </a>
          <a
            href="/workbook/anxious-attachment/week-1/day-6"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all group shadow-lg shadow-indigo-600/20 text-sm"
          >
            Continue to Day 6
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
