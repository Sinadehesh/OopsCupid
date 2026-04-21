'use client';

import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Wind,
  Activity,
  Play,
  Square,
  Settings2,
  CheckCircle2,
  Info,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function Week1NervousSystem() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Idle' | 'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Idle');
  const [timeLeft, setTimeLeft] = useState(0);

  const [inhaleSecs, setInhaleSecs] = useState(4);
  const [hold1Secs, setHold1Secs] = useState(4);
  const [exhaleSecs, setExhaleSecs] = useState(4);
  const [hold2Secs, setHold2Secs] = useState(4);

  const [journalEntry, setJournalEntry] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isBreathing) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        if (breathPhase === 'Idle' || breathPhase === 'Pause') {
          setBreathPhase('Inhale');
          setTimeLeft(inhaleSecs - 1);
        } else if (breathPhase === 'Inhale') {
          if (hold1Secs > 0) {
            setBreathPhase('Hold');
            setTimeLeft(hold1Secs - 1);
          } else {
            setBreathPhase('Exhale');
            setTimeLeft(exhaleSecs - 1);
          }
        } else if (breathPhase === 'Hold') {
          setBreathPhase('Exhale');
          setTimeLeft(exhaleSecs - 1);
        } else if (breathPhase === 'Exhale') {
          if (hold2Secs > 0) {
            setBreathPhase('Pause');
            setTimeLeft(hold2Secs - 1);
          } else {
            setBreathPhase('Inhale');
            setTimeLeft(inhaleSecs - 1);
          }
        }
      }
    } else {
      setBreathPhase('Idle');
      setTimeLeft(0);
    }

    return () => clearTimeout(timer);
  }, [isBreathing, timeLeft, breathPhase, inhaleSecs, hold1Secs, exhaleSecs, hold2Secs]);

  const applyPreset = (preset: 'box' | 'relax' | 'awaken') => {
    if (preset === 'box') { setInhaleSecs(4); setHold1Secs(4); setExhaleSecs(4); setHold2Secs(4); }
    if (preset === 'relax') { setInhaleSecs(4); setHold1Secs(7); setExhaleSecs(8); setHold2Secs(0); }
    if (preset === 'awaken') { setInhaleSecs(6); setHold1Secs(0); setExhaleSecs(2); setHold2Secs(0); }
  };

  const handleSaveJournal = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getCircleStyles = () => {
    if (breathPhase === 'Inhale') return { transform: 'scale(1.5)', transitionDuration: `${inhaleSecs}s` };
    if (breathPhase === 'Exhale') return { transform: 'scale(1)', transitionDuration: `${exhaleSecs}s` };
    if (breathPhase === 'Hold') return { transform: 'scale(1.5)', transitionDuration: '0s' };
    if (breathPhase === 'Pause') return { transform: 'scale(1)', transitionDuration: '0s' };
    return { transform: 'scale(1)', transitionDuration: '1s' };
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfeff,_#ffffff_40%,_#f8fafc_100%)] text-slate-800 font-sans pb-20">

      {/* Header */}
      <header className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.12),transparent_30%)]" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-800 backdrop-blur shadow-sm">
            <BookOpen className="h-4 w-4" />
            Week 1 · The Earned Security Workbook
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            Befriending Your{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              Nervous System
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Before we can change our anxious thoughts, we must signal safety to the body. Learn the neuroscience of your triggers and master somatic regulation.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 -mt-4 relative z-20 space-y-10">

        {/* Intro Card */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-cyan-100/40 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <BrainCircuit className="w-7 h-7 text-cyan-600" />
            The Science of the “Anxious Spiral”
          </h2>
          <div className="space-y-4 text-slate-600 leading-8 text-base">
            <p>
              When your partner pulls away, or a text goes unanswered, your brain doesn’t process it as a mild inconvenience. For the anxiously attached, the brain’s alarm center — the <strong className="text-slate-800">amygdala</strong> — interprets distance as an evolutionary threat to survival.
            </p>
            <p>
              As Dr. Bessel van der Kolk explains in <em>The Body Keeps the Score</em>, intense attachment stress shuts down the prefrontal cortex — the logical, rational part of your brain. This is why <strong className="text-slate-800">you cannot simply “think” your way out of an anxious spiral.</strong>
            </p>
            <p>
              Healing requires a <strong className="text-slate-800">“bottom-up” approach</strong>: we must calm the physical body before the mind can follow.
            </p>
          </div>
        </section>

        {/* Window of Tolerance */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-cyan-100/40 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-3">
            <Activity className="w-7 h-7 text-rose-500" />
            Your Window of Tolerance
          </h2>
          <p className="text-slate-600 mb-8 text-base leading-7">
            Coined by Dr. Dan Siegel, the Window of Tolerance is the optimal zone of arousal where you can function effectively and process emotions without feeling overwhelmed.
          </p>

          <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold text-rose-600 text-sm">Hyperarousal<br /><span className="font-normal text-xs text-rose-400">(Fight/Flight)</span></div>
              <div className="flex-1 h-16 bg-gradient-to-r from-rose-100 to-rose-200 rounded-xl border-2 border-rose-300 relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500/10">
                  <span className="text-rose-800 text-sm font-medium">Panic, racing thoughts, urge to double-text, anger.</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-bold text-emerald-600 text-sm">Window of<br />Tolerance</div>
              <div className="flex-1 h-24 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border-2 border-emerald-400 flex items-center justify-center shadow-inner">
                <span className="text-emerald-700 font-medium">Calm, curious, able to self-soothe and connect.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold text-slate-500 text-sm">Hypoarousal<br /><span className="font-normal text-xs text-slate-400">(Freeze/Fawn)</span></div>
              <div className="flex-1 h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl border-2 border-slate-300 relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-500/10">
                  <span className="text-slate-700 text-sm font-medium">Numbness, shutting down, dissociation, hopelessness.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 p-4 rounded-2xl flex items-start gap-3 border border-cyan-100">
            <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-cyan-900">
              <strong>The goal:</strong> Not to eliminate stress entirely, but to use somatic tools to widen your window of tolerance so relationship friction no longer throws you into hyperarousal.
            </p>
          </div>
        </section>

        {/* Breathing Module */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 p-8 md:p-10 shadow-2xl text-white">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-3">
              <Wind className="w-7 h-7 text-cyan-400" />
              Somatic Intervention: Breathing Regulator
            </h2>
            <p className="text-slate-300 mb-10 text-base leading-7 max-w-2xl">
              Slow, deep breathing directly stimulates the <strong className="text-white">Vagus Nerve</strong>, applying the “brakes” to your autonomic nervous system. Use this to practice regulating your state right now.
            </p>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Orb */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[300px] bg-slate-900/60 rounded-3xl border border-slate-700 p-8">
                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  <div className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-xl transition-all duration-1000 ${breathPhase === 'Inhale' || breathPhase === 'Hold' ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
                  <div
                    className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-400 shadow-[0_0_40px_rgba(34,211,238,0.3)] flex items-center justify-center z-10 ease-in-out"
                    style={isBreathing ? getCircleStyles() : { transform: 'scale(1)', transitionDuration: '1s' }}
                  >
                    <div className="text-center">
                      <span className="block text-lg font-semibold tracking-widest uppercase">
                        {isBreathing ? breathPhase : 'Ready'}
                      </span>
                      {isBreathing && (
                        <span className="block text-3xl font-light mt-1">{timeLeft + 1}</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsBreathing(!isBreathing)}
                  className={`flex items-center px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 ${
                    isBreathing
                      ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/50'
                      : 'bg-white text-slate-900 hover:bg-cyan-50 hover:scale-105 shadow-xl'
                  }`}
                >
                  {isBreathing
                    ? <><Square className="w-5 h-5 mr-2 fill-current" /> Stop Practice</>
                    : <><Play className="w-5 h-5 mr-2 fill-current" /> Start Breathing</>}
                </button>
              </div>

              {/* Controls */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Settings2 className="w-4 h-4" /> Select a Pattern
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[{key:'box',label:'Box Breathing',sub:'4-4-4-4 · Focus'},{key:'relax',label:'4-7-8 Relax',sub:'Deep Calm'},{key:'awaken',label:'6-0-2 Awaken',sub:'Exit Hypoarousal'}].map((p) => (
                      <button key={p.key} onClick={() => applyPreset(p.key as 'box'|'relax'|'awaken')} className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-left">
                        <span className="block font-semibold text-white text-sm mb-0.5">{p.label}</span>
                        <span className="text-slate-400 text-xs">{p.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Custom (seconds)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Inhale', val: inhaleSecs, set: setInhaleSecs, min: 2, max: 10 },
                      { label: 'Hold Top', val: hold1Secs, set: setHold1Secs, min: 0, max: 10 },
                      { label: 'Exhale', val: exhaleSecs, set: setExhaleSecs, min: 2, max: 10 },
                      { label: 'Hold Bottom', val: hold2Secs, set: setHold2Secs, min: 0, max: 10 },
                    ].map((s) => (
                      <div key={s.label}>
                        <label className="block text-xs text-slate-400 mb-1">{s.label}</label>
                        <input type="range" min={s.min} max={s.max} value={s.val} onChange={(e) => s.set(Number(e.target.value))} className="w-full accent-cyan-400" disabled={isBreathing} />
                        <div className="text-right text-sm font-medium text-white">{s.val}s</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journal */}
        <section className="rounded-[2rem] border border-cyan-100 bg-cyan-50/60 p-8 md:p-10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Somatic Tracking Journal</h2>
              <p className="text-slate-600 mb-4 text-sm leading-7">
                <strong>Interoception</strong> is the ability to perceive physical sensations inside your body. After your breathing practice, tune in: what do you physically feel right now?
              </p>
              <p className="text-slate-500 text-sm">
                e.g. “Warmth in my chest,” “Tingling in my hands,” “My jaw feels slightly less tight.”
              </p>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="rounded-2xl border border-cyan-200 bg-white/80 p-2 shadow-sm backdrop-blur">
                <textarea
                  className="w-full h-40 p-4 bg-transparent resize-none outline-none text-slate-700 placeholder:text-slate-400"
                  placeholder="I notice the sensation of..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
                <div className="flex justify-end p-2 border-t border-slate-100">
                  <button
                    onClick={handleSaveJournal}
                    disabled={journalEntry.length === 0}
                    className="flex items-center px-6 py-2.5 bg-slate-950 text-white font-medium rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved</> : 'Save Entry'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex justify-between items-center pt-8 border-t border-slate-200">
          <a href="/workbook/anxious-attachment" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm">
            ← Back to Workbook
          </a>
          <a
            href="/workbook/anxious-attachment/week-2"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 shadow-lg group"
          >
            Complete Week 1
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
