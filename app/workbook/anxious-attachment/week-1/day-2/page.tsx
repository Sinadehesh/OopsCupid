'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity, ArrowRight, ShieldAlert, CheckCircle2,
  Flame, Snowflake, Crosshair, AlertTriangle, Brain, Play, Square,
} from 'lucide-react';
import { saveWorkbookEntry } from '@/app/actions/saveWorkbookEntry';

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
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    if (!reflection.trim()) return;
    setIsSaving(true);
    const selectedBehaviors = protestBehaviors.filter((_, i) => behaviors[i]);
    await saveWorkbookEntry({
      workbook: 'anxious-attachment',
      week: 1,
      day: 2,
      exerciseKey: 'integration-reflection',
      content: {
        reflection,
        zone,
        zoneLabel: info.title,
        selectedBehaviors,
      },
    });
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

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
            Understanding your nervous system's temperature — and learning to stay in the Window of Tolerance.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── Protest Behaviors ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <ShieldAlert className="w-7 h-7 text-rose-500 shrink-0" />
            Protest Behaviors
          </h2>
          <p className="text-slate-500 mb-6 text-base leading-relaxed">
            Tick any that feel familiar — no judgment here.
          </p>
          <div className="space-y-3">
            {protestBehaviors.map((b, i) => (
              <button
                key={i}
                onClick={() => setBehaviors((prev) => ({ ...prev, [i]: !prev[i] }))}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  behaviors[i]
                    ? 'bg-rose-50 border-rose-400 text-rose-900'
                    : 'bg-white/80 border-slate-200 text-slate-700 hover:border-rose-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  behaviors[i] ? 'bg-rose-500 border-rose-500' : 'border-slate-300'
                }`}>
                  {behaviors[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm font-medium">{b}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Thermostat Slider ── */}
        <section className={CARD.replace('bg-white/70', 'bg-indigo-50/80')}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-indigo-900">
            <Activity className="w-7 h-7 text-indigo-500 shrink-0" />
            Your Nervous System Thermostat
          </h2>
          <p className="text-indigo-700 mb-8 text-base leading-relaxed">
            Drag the slider to where your nervous system feels right now.
          </p>
          <input
            type="range" min={0} max={100} value={zone}
            onChange={(e) => setZone(Number(e.target.value))}
            className="w-full accent-indigo-500 mb-6"
          />
          <div className={`rounded-2xl border-2 p-5 flex items-start gap-4 ${info.borderColor} bg-white/60`}>
            <div className={`${info.color} text-white p-2 rounded-xl shrink-0`}>{info.icon}</div>
            <div>
              <p className={`font-bold text-base ${info.textColor}`}>{info.title}</p>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">{info.desc}</p>
            </div>
          </div>
        </section>

        {/* ── Breathing ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 relative z-10">
            <AlertTriangle className="w-7 h-7 text-indigo-400 shrink-0" />
            Breathing Anchor
          </h2>
          <p className="text-slate-400 mb-8 text-base relative z-10">
            4-second inhale · 6-second exhale. Use this when you feel the thermostat rising.
          </p>
          <div className="flex flex-col items-center relative z-10">
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
              <div
                className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl transition-all ease-in-out"
                style={{ transform: `scale(${glowScale})`, transitionDuration: dur }}
              />
              <div
                className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-transform ease-in-out border-2 border-indigo-400/50"
                style={{ transform: `scale(${bubbleScale})`, transitionDuration: dur }}
              >
                <span className="font-bold text-lg uppercase tracking-wider text-white">
                  {isBreathing ? breathPhase : 'Ready'}
                </span>
                {isBreathing && <span className="text-3xl font-light mt-1">{timeLeft}</span>}
              </div>
            </div>
            <button
              onClick={() => {
                if (!isBreathing) { setBreathPhase('Inhale'); setTimeLeft(4); }
                setIsBreathing(!isBreathing);
              }}
              className={`px-10 py-4 rounded-full font-bold text-base transition-all flex items-center gap-2 ${
                isBreathing
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30'
                  : 'bg-white text-indigo-900 hover:bg-indigo-50 hover:scale-105 shadow-xl'
              }`}
            >
              {isBreathing ? <><Square className="w-5 h-5" /> Stop</> : <><Play className="w-5 h-5" /> Start Anchor</>}
            </button>
          </div>
        </section>

        {/* ── Integration Reflection ── */}
        <section className={CARD.replace('bg-white/70', 'bg-indigo-50/80')}>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-3 text-indigo-900">
            <Brain className="w-6 h-6 text-indigo-600 shrink-0" />
            Integration
          </h2>
          <p className="text-indigo-800 mb-5 text-base leading-relaxed">
            What does your body physically feel like right before you engage in a protest behavior?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. My jaw clenches and my thumbs start typing before I even think…"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              disabled={!reflection.trim() || isSaving}
              className="inline-flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all shadow-md"
            >
              {isSaved ? <><CheckCircle2 className="w-5 h-5" /> Saved!</> : isSaving ? 'Saving…' : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a href="/workbook/anxious-attachment/week-1/day-1" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm">← Back to Day 1</a>
          <a href="/workbook/anxious-attachment/week-1/day-3" className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg text-sm">
            Continue to Day 3 <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </section>
      </main>
    </div>
  );
}
