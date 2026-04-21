'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity, ArrowRight, ShieldAlert, CheckCircle2,
  Flame, Snowflake, Crosshair, AlertTriangle, Brain, Play, Square,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 ' +
  'focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

const protestBehaviors = [
  "Double or triple texting when left on 'read'.",
  'Picking a fight just to get their attention.',
  'Guilt-tripping or acting cold to make them chase me.',
  'Monitoring their social media to see if they are online but ignoring me.',
];

export default function Day2() {
  const [zone, setZone] = useState<number>(50);
  const [behaviors, setBehaviors] = useState<Record<number, boolean>>({});
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

  const getZoneInfo = () => {
    if (zone > 70)
      return {
        title: 'Hyperarousal (The Heater is Blasting)',
        desc: 'Panic, racing heart, anger, overwhelm. You feel compelled to "fix" the relationship right now using Protest Behaviors.',
        color: 'bg-rose-500',
        textColor: 'text-rose-400',
        borderColor: 'border-rose-500/50',
        icon: <Flame className="w-7 h-7" />,
      };
    if (zone < 30)
      return {
        title: 'Hypoarousal (The AC is Freezing)',
        desc: 'Numbness, shutting down, dissociation. You abandon your own needs completely to keep the peace.',
        color: 'bg-blue-500',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/50',
        icon: <Snowflake className="w-7 h-7" />,
      };
    return {
      title: 'Window of Tolerance (Perfect 72°)',
      desc: 'Calm, curious, grounded. You can feel relationship anxiety without losing control of your actions.',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/60',
      icon: <Crosshair className="w-7 h-7" />,
    };
  };
  const info = getZoneInfo();

  const bubbleScale = isBreathing && breathPhase === 'Inhale' ? 1.2 : 1;
  const glowScale  = isBreathing && breathPhase === 'Inhale' ? 1.5 : 1;
  const dur = isBreathing ? `${breathPhase === 'Inhale' ? 4 : 6}s` : '1s';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/30 to-slate-50 text-slate-800 font-sans pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-purple-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 1 · Day 2
            </span>
            <span className="text-indigo-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Thermostat
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding the Window of Tolerance and why you act out when anxious.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. The Psychology ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Activity className="w-7 h-7 text-indigo-500 shrink-0" />
                The Nervous System Thermostat
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  Your nervous system has a perfect 72° zone called the{' '}
                  <strong>Window of Tolerance</strong>. Here, you feel safe and can handle
                  relationship bumps smoothly.
                </p>
                <p>
                  But when triggered, Anxious Attachment cranks the heat to 100°. This is{' '}
                  <strong>Hyperarousal</strong>. You feel unbearable pressure to cool the room.
                  Because you don't know how to cool <em>yourself</em> down, you try to control
                  your partner to fix the temperature for you.
                </p>
              </div>

              <div className="mt-6 bg-amber-50/80 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  These attempts to force your partner to regulate you are called{' '}
                  <strong>Protest Behaviors</strong>. They are desperate bids for connection, but
                  they often push partners further away.
                </p>
              </div>
            </div>

            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1584985552317-a06f477ca36b?q=80&w=600&auto=format&fit=crop"
                alt="Thermostat dial"
                width={300} height={200}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* ── 2. Practice 1: Name Your Protest Behaviors ── */}
        <section className={CARD.replace('bg-white/70', 'bg-rose-50/60').replace('shadow-indigo-100/40', 'shadow-rose-100/40')}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <ShieldAlert className="w-7 h-7 text-rose-500 shrink-0" />
            Practice 1: Name Your Protest Behaviors
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            Awareness is the first step. Which of these do you use when you're in the "Too Hot"
            Hyperarousal zone?
          </p>

          <div className="space-y-4">
            {protestBehaviors.map((beh, i) => (
              <label
                key={i}
                className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 shadow-sm ${
                  behaviors[i]
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-white/80 border-slate-200 hover:border-rose-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={behaviors[i] || false}
                  onChange={() => setBehaviors((p) => ({ ...p, [i]: !p[i] }))}
                />
                <div
                  className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${
                    behaviors[i] ? 'bg-rose-500 border-rose-500' : 'border-slate-300 bg-white'
                  }`}
                >
                  {behaviors[i] && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <span
                  className={`text-base ${
                    behaviors[i] ? 'text-rose-900 font-semibold' : 'text-slate-600 font-medium'
                  }`}
                >
                  {beh}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* ── 3. Practice 2: Interactive Thermostat ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white shadow-2xl border border-slate-800/60 p-8 md:p-10 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Activity className="w-7 h-7 text-indigo-400 shrink-0" />
              Practice 2: The Interactive Thermostat
            </h2>
            <p className="text-slate-400 mb-8 text-base leading-relaxed max-w-xl">
              Drag the slider to explore each zone and its physical symptoms. The goal is to
              catch yourself <em>before</em> you leave the window.
            </p>

            {/* Thermostat zones */}
            <div className="flex gap-6 items-stretch mb-8">
              {/* Zone bars */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex-1 bg-rose-500/20 rounded-2xl border border-rose-500/40 flex items-center justify-center p-4 text-rose-300 font-bold uppercase tracking-wider text-sm text-center">
                  <Flame className="w-5 h-5 mr-2 shrink-0" /> Hyperarousal (Too Hot)
                </div>
                <div className="flex-1 bg-emerald-500/20 rounded-2xl border-2 border-emerald-500/60 flex items-center justify-center p-4 text-emerald-400 font-bold uppercase tracking-wider text-sm text-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <Crosshair className="w-5 h-5 mr-2 shrink-0" /> Window of Tolerance (72°)
                </div>
                <div className="flex-1 bg-blue-500/20 rounded-2xl border border-blue-500/40 flex items-center justify-center p-4 text-blue-300 font-bold uppercase tracking-wider text-sm text-center">
                  <Snowflake className="w-5 h-5 mr-2 shrink-0" /> Hypoarousal (Too Cold)
                </div>
              </div>

              {/* Vertical slider */}
              <div className="flex flex-col items-center justify-center w-16">
                <input
                  type="range" min="0" max="100" value={zone}
                  onChange={(e) => setZone(Number(e.target.value))}
                  className="h-56 cursor-pointer accent-white"
                  style={{ writingMode: 'vertical-lr', direction: 'rtl', appearance: 'slider-vertical', WebkitAppearance: 'slider-vertical' }}
                />
                {/* Indicator dot */}
                <div className={`mt-3 w-5 h-5 rounded-full border-2 border-white shadow-lg transition-colors duration-300 ${info.color}`} />
              </div>
            </div>

            {/* Zone description card */}
            <div className={`p-6 rounded-2xl border-2 bg-slate-900/60 transition-all duration-500 ${info.borderColor}`}>
              <h3 className={`font-bold text-xl mb-3 flex items-center gap-3 ${info.textColor}`}>
                {info.icon}
                {info.title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">{info.desc}</p>
            </div>
          </div>
        </section>

        {/* ── 4. Drop the Anchor ── */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="md:flex-1">
              <h3 className="font-bold text-slate-900 text-xl mb-2">Drop Your Anchor</h3>
              <p className="text-slate-500 text-base leading-relaxed">
                Whenever you feel yourself leaving the Window of Tolerance, use your 4-6 breathing
                anchor for 30 seconds.
              </p>
              {isBreathing && (
                <div className="mt-4 flex items-center gap-4">
                  {/* Mini bubble */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-indigo-400/20 rounded-full blur-md"
                      style={{ transform: `scale(${glowScale})`, transitionDuration: dur, transition: 'transform' }}
                    />
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex flex-col items-center justify-center z-10 border border-indigo-400/50"
                      style={{ transform: `scale(${bubbleScale})`, transitionDuration: dur, transition: 'transform' }}
                    >
                      <span className="text-white text-[10px] font-bold uppercase">{breathPhase}</span>
                      <span className="text-white text-sm font-light">{timeLeft}</span>
                    </div>
                  </div>
                  <span className="text-slate-500 text-sm">{breathPhase === 'Inhale' ? 'Breathe in slowly…' : 'Blow out slowly…'}</span>
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
              {isBreathing ? <><Square className="w-5 h-5" /> Stop Anchor</> : <><Play className="w-5 h-5" /> Start Anchor</>}
            </button>
          </div>
        </section>

        {/* ── 5. Integration Reflection ── */}
        <section className={CARD.replace('bg-white/70', 'bg-indigo-50/80')}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-indigo-900">
            <Brain className="w-6 h-6 text-indigo-500 shrink-0" />
            Integration
          </h2>
          <p className="text-indigo-700 text-base leading-relaxed mb-5">
            What does your body physically feel like right <em>before</em> you engage in a protest
            behavior?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. My jaw clenches and my thumbs start typing before I even think…"
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
            href="/workbook/anxious-attachment/week-1/day-1"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 1
          </a>
          <a
            href="/workbook/anxious-attachment/week-1/day-3"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all group shadow-lg shadow-indigo-600/20 text-sm"
          >
            Continue to Day 3
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
