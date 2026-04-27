'use client';

import React, { useState, useEffect } from 'react';
import {
  Fence, ArrowRight, Brain, Sliders, Anchor,
  Play, Square, Info, ShieldCheck, Unlock, Lock
} from 'lucide-react';

const CARD = 'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-emerald-100/40 border border-white/60 p-8 md:p-12';

export default function Week3Day1() {
  const [boundaryLevel, setBoundaryLevel] = useState(50);
  const [spectrumStatus, setSpectrumStatus] = useState<'Porous' | 'Healthy' | 'Rigid'>('Healthy');

  // Breathing Anchor State
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Reflection
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (boundaryLevel < 35) setSpectrumStatus('Porous');
    else if (boundaryLevel > 65) setSpectrumStatus('Rigid');
    else setSpectrumStatus('Healthy');
  }, [boundaryLevel]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isBreathing) {
      timer = setTimeout(() => {
        if (timeLeft > 1) {
          setTimeLeft(t => t - 1);
        } else {
          const next = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
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

  const distance = (boundaryLevel - 50) * 1.5;

  const spectrumColors = {
    Porous:  { you: 'rgba(244,63,94,0.80)',   other: 'rgba(244,63,94,0.80)',   card: 'bg-rose-900/30 border-rose-500/30 text-rose-200',    slider: 'accent-rose-500'    },
    Healthy: { you: 'rgba(16,185,129,0.90)',  other: 'rgba(99,102,241,0.90)',  card: 'bg-emerald-900/30 border-emerald-500/30 text-emerald-100', slider: 'accent-emerald-500' },
    Rigid:   { you: 'rgba(148,163,184,0.90)', other: 'rgba(148,163,184,0.90)', card: 'bg-slate-800 border-slate-600 text-slate-300',         slider: 'accent-slate-400'   },
  };
  const sc = spectrumColors[spectrumStatus];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-teal-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase border border-emerald-200">
              Week 3 &middot; Day 1 (Day 15)
            </span>
            <span className="text-emerald-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Property Line
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Understanding what boundaries actually are &mdash; and why anxious people avoid them.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Fence className="w-7 h-7 text-emerald-600 shrink-0" />
            Attachment Insight: The Property Line
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                If you have an anxious attachment style, you likely view boundaries as
                &ldquo;walls&rdquo; that keep people out. You fear that if you set a limit,
                your partner or friend will abandon you.
              </p>
              <p>
                But boundaries are not brick walls. They are <strong>property lines</strong>.
                They simply show where &ldquo;You&rdquo; end, and &ldquo;They&rdquo; begin.
                They let the good stuff in, but keep the toxic stuff out.
              </p>
              <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3 mt-2">
                <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>The Realization:</strong> You over-give because you are trying to
                  &ldquo;buy&rdquo; security. A healthy boundary doesn&rsquo;t end relationships;
                  it saves them from resentment.
                </p>
              </div>
            </div>
            <div className="md:w-56 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1510620857372-5201103c8b41?q=80&w=600&auto=format&fit=crop"
                alt="A wooden fence in a field representing a healthy property line"
                width={224}
                height={192}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            {/* Controls */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-emerald-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-teal-300 text-base mb-6 leading-relaxed">
                Just <em>thinking</em> about setting a boundary causes the anxious nervous
                system to panic. Drop your anchor for 60 seconds to calm your body before
                we continue.
              </p>
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-teal-200 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={(e) => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-emerald-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-teal-200 mb-2">
                    <span>Exhale <span className="text-teal-400 font-normal">(longer = calmer)</span></span>
                    <span className="font-bold">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={(e) => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-emerald-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            {/* Orb */}
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                {/* Glow ring */}
                <div
                  className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                />
                {/* Orb */}
                <div
                  className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(16,185,129,0.5)] border-2 border-emerald-400/50"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                >
                  <span className="font-bold uppercase tracking-wider text-white text-sm">
                    {isBreathing ? breathPhase : 'Ready'}
                  </span>
                  {isBreathing && (
                    <span className="text-3xl font-light mt-1 text-white">{timeLeft}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!isBreathing) {
                    setBreathPhase('Inhale');
                    setTimeLeft(inhaleTime);
                  }
                  setIsBreathing(b => !b);
                }}
                className={`w-full max-w-xs py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm ${
                  isBreathing
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 hover:bg-rose-500/30'
                    : 'bg-white text-teal-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-4 h-4" /> Stop Anchor</>
                  : <><Play className="w-4 h-4" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Boundary Spectrum Visualiser */}
        <section className="rounded-[2rem] bg-slate-900 p-8 md:p-12 shadow-2xl text-white border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />

          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 relative z-10">
            <Sliders className="w-7 h-7 text-emerald-400 shrink-0" />
            Practice 2: The Boundary Spectrum
          </h2>
          <p className="text-slate-400 mb-8 text-base max-w-2xl leading-relaxed relative z-10">
            Use the slider. Notice how the relationship between &ldquo;You&rdquo; and
            &ldquo;Others&rdquo; changes based on how firm your boundaries are.
          </p>

          <div className="bg-slate-800/60 rounded-2xl p-7 border border-slate-700/60 relative z-10">
            {/* Canvas */}
            <div className="relative h-56 flex items-center justify-center mb-8 overflow-hidden bg-slate-900/70 rounded-xl border border-slate-800">
              {/* YOU orb */}
              <div
                className="absolute w-28 h-28 rounded-full flex items-center justify-center z-10 shadow-lg mix-blend-screen"
                style={{
                  transform: `translateX(${-distance}px)`,
                  backgroundColor: sc.you,
                  transition: 'transform 0.3s ease-out, background-color 0.5s',
                }}
              >
                <span className="font-bold text-white text-base drop-shadow-md">YOU</span>
              </div>

              {/* Healthy bridge line */}
              <div
                className="absolute h-2 rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: spectrumStatus === 'Healthy' ? '8rem' : '0', opacity: spectrumStatus === 'Healthy' ? 1 : 0 }}
              />

              {/* OTHERS orb */}
              <div
                className="absolute w-28 h-28 rounded-full flex items-center justify-center z-10 shadow-lg mix-blend-screen"
                style={{
                  transform: `translateX(${distance}px)`,
                  backgroundColor: sc.other,
                  transition: 'transform 0.3s ease-out, background-color 0.5s',
                }}
              >
                <span className="font-bold text-white text-base drop-shadow-md">OTHERS</span>
              </div>

              {/* Rigid wall */}
              <div
                className="absolute w-4 h-40 bg-slate-500 rounded-sm transition-all duration-500"
                style={{ opacity: spectrumStatus === 'Rigid' ? 1 : 0, transform: spectrumStatus === 'Rigid' ? 'scaleY(1)' : 'scaleY(0)' }}
              />
            </div>

            {/* Slider */}
            <input
              type="range" min="0" max="100" value={boundaryLevel}
              onChange={(e) => setBoundaryLevel(Number(e.target.value))}
              className={`w-full h-3 rounded-full appearance-none cursor-pointer outline-none transition-colors ${sc.slider}`}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
              <span>Porous</span>
              <span>Healthy</span>
              <span>Rigid</span>
            </div>

            {/* Status card */}
            <div className={`p-5 mt-6 rounded-xl border transition-colors duration-500 ${sc.card}`}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-1">
                {spectrumStatus === 'Porous'  && <Unlock    className="w-5 h-5" />}
                {spectrumStatus === 'Healthy' && <ShieldCheck className="w-5 h-5" />}
                {spectrumStatus === 'Rigid'   && <Lock       className="w-5 h-5" />}
                {spectrumStatus} Boundaries
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                {spectrumStatus === 'Porous'  && "You are enmeshed. You take on other people's emotions as your own. Saying 'no' feels dangerous. This leads to burnout and resentment."}
                {spectrumStatus === 'Healthy' && "You value connection, but protect your energy. You can say 'no' respectfully. You are not responsible for managing their emotions."}
                {spectrumStatus === 'Rigid'   && "You have built walls. To avoid the pain of conflict, you avoid intimacy altogether. You don't ask for help, and you don't let people in."}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-emerald-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-4 text-slate-600 text-base leading-relaxed">
            Where in your life do you currently have &ldquo;Porous&rdquo; boundaries?
            (Where do you over-give?)
          </p>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full bg-white border border-emerald-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-emerald-500 text-sm leading-relaxed resize-none mb-4"
            placeholder="e.g., With my mother, I always drop everything when she is upset&hellip;"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl font-bold transition-colors text-sm"
            >
              {isSaved
                ? <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Saved!</span>
                : 'Save Entry'}
            </button>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-7"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Week 2
          </a>
          <a
            href="/workbook/anxious-attachment/week-3/day-2"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Continue to Day 16
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
