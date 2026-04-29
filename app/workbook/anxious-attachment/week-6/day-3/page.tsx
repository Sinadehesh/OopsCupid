'use client';

import React, { useEffect, useState } from 'react';
import {
  HeartHandshake,
  ArrowRight,
  Brain,
  UserPlus,
  Anchor,
  Play,
  Square,
  Info,
  ShieldCheck,
  Smile,
} from 'lucide-react';

type BreathPhase = 'Inhale' | 'Exhale';

const COMPASSION_LEVELS = [
  {
    threshold: 33,
    role: 'The Harsh Critic',
    text: "You messed up again. You're so embarrassing. This is why everyone leaves you.",
    accent: 'rose',
  },
  {
    threshold: 66,
    role: 'The Logical Observer',
    text: "You made a mistake, but it's not the end of the world. You can fix it.",
    accent: 'sky',
  },
  {
    threshold: 101,
    role: 'The Compassionate Witness',
    text: 'Of course you reacted that way\u2014your nervous system was terrified. It makes total sense. I love you anyway.',
    accent: 'emerald',
  },
] as const;

type AccentColor = (typeof COMPASSION_LEVELS)[number]['accent'];

const accentMap: Record<AccentColor, { bg: string; border: string; label: string; text: string; card: string }> = {
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    label: 'text-rose-600',    text: 'text-rose-700',    card: 'bg-rose-100/60' },
  sky:     { bg: 'bg-sky-50',     border: 'border-sky-200',     label: 'text-sky-600',     text: 'text-sky-700',     card: 'bg-sky-100/60' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'text-emerald-600', text: 'text-emerald-700', card: 'bg-emerald-100/60' },
};

function getCompassionStatus(level: number) {
  return COMPASSION_LEVELS.find((l) => level < l.threshold) ?? COMPASSION_LEVELS[2];
}

export default function Week6Day3() {
  const [compassionLevel, setCompassionLevel] = useState(0);

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

  const status = getCompassionStatus(compassionLevel);
  const colors = accentMap[status.accent];
  const isWitness = status.accent === 'emerald';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/60 via-white to-blue-50/40 font-sans text-slate-800 pb-24">
      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_40%)]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-sky-700 mb-4">
            Week 6 &middot; Day 3 (Day 38)
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
              Compassionate Witness
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Replacing the Inner Critic with radical self-forgiveness.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Attachment Insight */}
        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-white/70 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-5 flex items-center text-slate-900">
                <HeartHandshake className="w-7 h-7 text-sky-500 mr-3 shrink-0" />
                Attachment Insight: Forgiving the Spiral
              </h2>
              <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
                <p>
                  As you heal, you are going to mess up. You will have days where you slip into hyperarousal
                  and send a &ldquo;protest text.&rdquo; You will have moments where the inner child takes the wheel.
                </p>
                <p>
                  When this happens, the old Anxious blueprint will try to punish you with intense shame.
                  <em> &ldquo;I&rsquo;m failing at healing. I&rsquo;m broken.&rdquo;</em>
                </p>
                <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-5 flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-sky-900 leading-relaxed">
                    <strong>The Realization:</strong> You cannot shame yourself into security. You must become a{' '}
                    <strong>Compassionate Witness</strong> to your own mistakes. Secure attachment means knowing you
                    are worthy of love <em>especially</em> when you mess up.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop"
                alt="Calm ocean horizon"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Breathing Anchor */}
        <section className="bg-slate-950 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-white">
                <Anchor className="w-7 h-7 text-sky-400 mr-3 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                Self-compassion feels completely alien to a traumatized nervous system. Drop your anchor for
                60 seconds to prepare your body to receive kindness.
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
                    className="w-full accent-sky-400 disabled:opacity-50"
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
                    className="w-full accent-sky-400 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transitionDuration: `${phaseDuration}s`,
                    transitionProperty: 'transform',
                    transitionTimingFunction: 'ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-sky-600 to-blue-700 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(56,189,248,0.2)] border border-sky-400/30"
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

        {/* Compassion Dial */}
        <section className="bg-white/85 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-2xl font-bold mb-3 flex items-center text-slate-900">
            <UserPlus className="w-7 h-7 text-sky-500 mr-3 shrink-0" />
            Practice 2: The Compassion Dial
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
            Imagine you just lost your temper and double-texted your partner. Move the dial below to
            change how you talk to yourself afterward.
          </p>

          <div className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200 space-y-8">
            {/* Dial labels */}
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 px-1">
              <span>Harsh Critic</span>
              <span>Compassionate Witness</span>
            </div>

            {/* Track with gradient */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 right-0 h-3 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-300 via-sky-300 to-emerald-400 opacity-40 pointer-events-none" />
              <input
                type="range" min="0" max="100" value={compassionLevel}
                onChange={(e) => setCompassionLevel(Number(e.target.value))}
                className="relative w-full h-3 rounded-full appearance-none cursor-pointer accent-emerald-500 bg-transparent z-10"
              />
            </div>

            {/* Voice card */}
            <div
              className={`p-7 rounded-2xl border-2 transition-all duration-500 ${colors.bg} ${colors.border}`}
            >
              <span
                className={`inline-block text-xs font-extrabold uppercase tracking-[0.2em] mb-3 ${colors.label}`}
              >
                {status.role}
              </span>
              <p className={`text-xl md:text-2xl font-serif italic leading-relaxed text-slate-800`}>
                &ldquo;{status.text}&rdquo;
              </p>
            </div>

            {/* Witness celebration */}
            {isWitness && (
              <div className="flex flex-col items-center text-center pt-2 animate-in slide-in-from-bottom-4 duration-500">
                <Smile className="w-10 h-10 text-emerald-500 mb-2" />
                <p className="text-emerald-700 font-bold text-sm max-w-md leading-relaxed">
                  This is the voice of Earned Security. Notice how it instantly reduces the shame in your body.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Integration */}
        <section className="bg-sky-50/80 p-8 md:p-10 rounded-[2rem] border border-sky-100">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center">
            <Brain className="w-6 h-6 text-sky-500 mr-3 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Write a &ldquo;Compassionate Witness&rdquo; statement to yourself regarding a mistake you made in a
            past relationship.
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white border border-sky-100 rounded-2xl p-5 h-32 outline-none focus:ring-2 focus:ring-sky-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="e.g., Of course I clung to them tightly. I was terrified of being abandoned. I forgive myself..."
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-full font-bold text-sm transition-all"
            >
              {isSaved ? (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Saved!
                </span>
              ) : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-6/day-2"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 37
          </a>
          <a
            href="/workbook/anxious-attachment/week-6/day-4"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 39
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
