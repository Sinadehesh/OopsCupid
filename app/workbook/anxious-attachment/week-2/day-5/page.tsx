'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Home, ArrowRight, Brain, Shield, Anchor,
  Play, Square, ShieldCheck, Lock, Bed, Music,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-teal-100/40 border border-white/60 p-8 md:p-10';

type BreathPhase = 'Inhale' | 'Exhale';
type SafeKey = 'door' | 'blanket' | 'music';

const SAFE_ITEMS: { key: SafeKey; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    key: 'door',
    label: 'Heavy Oak Door',
    desc: 'Locks from the inside. Nobody can enter without permission.',
    icon: <Lock className="w-9 h-9" />,
  },
  {
    key: 'blanket',
    label: 'Weighted Blanket',
    desc: 'Deep pressure therapy for the nervous system.',
    icon: <Bed className="w-9 h-9" />,
  },
  {
    key: 'music',
    label: 'Soothing Sound',
    desc: 'Rainfall or low humming to block out the world.',
    icon: <Music className="w-9 h-9" />,
  },
];

export default function Week2Day5() {
  const [safeItems, setSafeItems] = useState<Record<SafeKey, boolean>>({
    door: false,
    blanket: false,
    music: false,
  });

  // Breathing
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Reflection
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Cleanup save timer on unmount
  useEffect(() => () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); }, []);

  const toggleItem = (key: SafeKey) =>
    setSafeItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const isRoomSafe = safeItems.door && safeItems.blanket && safeItems.music;

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

  const handleSave = () => {
    setIsSaved(true);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-teal-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase border border-emerald-200">
              Week 2 · Day 5 (Day 12)
            </span>
            <span className="text-emerald-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Building the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Safe Room
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Creating an internal landscape of absolute psychological safety.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Home className="w-7 h-7 text-emerald-500 shrink-0" />
                Attachment Insight: The Internal Sanctuary
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Securely attached people have an internal &ldquo;Safe Room.&rdquo; When the world gets
                  chaotic, they can retreat inward and soothe themselves because they internalized
                  the safety their caregivers provided.
                </p>
                <p>
                  Anxiously attached individuals often feel like they have nowhere safe to go
                  inside their own minds. Your mind can feel like a dangerous neighborhood &mdash; but
                  that can be changed.
                </p>
              </div>

              <div className="mt-5 bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                <Brain className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>The Realization:</strong> We must actively build this Safe Room using
                  Guided Imagery. By visualizing a perfectly safe space, your nervous system
                  responds exactly as if you were physically there.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=600&auto=format&fit=crop"
                alt="Cosy, dimly-lit room"
                width={300}
                height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Anchor className="w-7 h-7 text-emerald-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Before we can build the Safe Room, we must calm the architect (you). Drop your
                anchor for 60 seconds.
              </p>
              <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/60 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-emerald-400">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={8} value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-emerald-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-emerald-400">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min={2} max={10} value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-emerald-400 disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-7">
                <div
                  className="absolute inset-0 bg-emerald-500/25 rounded-full blur-lg"
                  style={{
                    transform: isExpanding ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${currentDur} ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex flex-col items-center justify-center z-10 border-2 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
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
                    ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700 hover:bg-emerald-900/60'
                    : 'bg-white text-emerald-900 hover:scale-105 shadow-md'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-5 h-5" /> Stop Anchor</>
                  : <><Play className="w-5 h-5" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Construct the Room */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <Shield className="w-7 h-7 text-emerald-500 shrink-0" />
            Practice 2: Construct the Room
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Click the items below to actively construct a psychological safe space for your inner
            child. Notice how your body settles as the room becomes secure.
          </p>

          <div
            className="rounded-2xl border p-8 min-h-[280px] flex flex-col justify-center transition-all duration-700"
            style={{
              backgroundColor: isRoomSafe ? 'rgb(236 253 245)' : 'rgb(240 253 250)',
              borderColor: isRoomSafe ? 'rgb(167 243 208)' : 'rgb(204 251 241)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {SAFE_ITEMS.map(({ key, label, desc, icon }) => (
                <button
                  key={key}
                  onClick={() => toggleItem(key)}
                  aria-pressed={safeItems[key]}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    safeItems[key]
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg scale-105'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                >
                  <span className="mb-3">{icon}</span>
                  <span className="font-bold text-sm">{label}</span>
                  <span className="text-xs mt-2 opacity-75 leading-snug">{desc}</span>
                </button>
              ))}
            </div>

            {isRoomSafe ? (
              <div className="text-center animate-in zoom-in duration-500">
                <ShieldCheck className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-xl font-extrabold text-emerald-700 mb-1">The Room is Secure.</h3>
                <p className="text-emerald-600 text-sm leading-relaxed max-w-sm mx-auto">
                  You can bring your inner child here whenever they feel abandoned.
                  They are safe here.
                </p>
              </div>
            ) : (
              <p className="text-center text-slate-400 text-sm">
                Select all three elements to secure the room.
              </p>
            )}
          </div>
        </section>

        {/* 4. Integration / Reflection */}
        <section className="rounded-[2rem] bg-emerald-50/60 backdrop-blur-sm border border-emerald-100 p-8 md:p-10">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-3 text-emerald-900">
            <Brain className="w-6 h-6 text-emerald-600 shrink-0" />
            Integration
          </h2>
          <p className="text-emerald-800 text-base leading-relaxed mb-5">
            If your Safe Room had one more item in it &mdash; a pet, a smell, a specific view out the
            window &mdash; what would it be?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="e.g., A golden retriever asleep by the fire…"
            className="w-full bg-white border border-emerald-200 rounded-2xl p-5 h-32 text-sm outline-none focus:ring-2 focus:ring-emerald-400 resize-none leading-relaxed"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              disabled={!reflection.trim()}
              className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md shadow-emerald-700/20"
            >
              {isSaved ? (
                <><ShieldCheck className="w-4 h-4" /> Saved!</>
              ) : (
                'Save Entry'
              )}
            </button>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 11
          </a>
          <a
            href="/workbook/anxious-attachment/week-2/day-6"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full transition-all group shadow-lg shadow-emerald-700/20 text-sm"
          >
            Continue to Day 13
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
