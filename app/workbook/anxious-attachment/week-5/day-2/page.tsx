'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare, ArrowRight, Brain, Smartphone, Anchor,
  Play, Square, ShieldCheck, Copy, CheckCircle2, Info
} from 'lucide-react';

export default function Week5Day2() {
  const [observation, setObservation] = useState('');
  const [meaning, setMeaning] = useState('');
  const [ask, setAsk] = useState('');
  const [copiedOMA, setCopiedOMA] = useState(false);

  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isBreathing) {
      timer = setTimeout(() => {
        if (timeLeft > 1) {
          setTimeLeft(t => t - 1);
        } else {
          const nextPhase = breathPhase === 'Inhale' ? 'Exhale' : 'Inhale';
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
    setIsBreathing(b => !b);
  };

  const phaseDuration = isBreathing
    ? (breathPhase === 'Inhale' ? inhaleTime : exhaleTime)
    : 1;

  const compiledOMA = [
    observation.trim(),
    meaning.trim(),
    ask.trim(),
  ].filter(Boolean).join(' ');

  const handleCopyOMA = () => {
    if (!compiledOMA) return;
    navigator.clipboard.writeText(compiledOMA);
    setCopiedOMA(true);
    setTimeout(() => setCopiedOMA(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50/60 via-purple-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-fuchsia-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-purple-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-bold tracking-widest uppercase border border-fuchsia-200">
              Week 5 &middot; Day 2 (Day 30)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500">
              Translator
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Replacing toxic &ldquo;Protest Texts&rdquo; with clean, blame-free requests.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-fuchsia-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <MessageSquare className="w-7 h-7 text-fuchsia-600 shrink-0" />
            Attachment Insight: The Language of Needs
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 text-base text-slate-600 leading-relaxed md:w-2/3">
              <p>
                Because anxiously attached children were often shamed for having needs, you
                learned to ask for things indirectly. Instead of saying,{' '}
                <em>&ldquo;I miss you,&rdquo;</em> you might say,{' '}
                <em>&ldquo;You never make time for me anymore.&rdquo;</em>
              </p>
              <p>
                This is a tragedy of communication. Your underlying need is beautiful
                (connection), but your delivery is an attack. Your partner only hears the
                attack, so they defend themselves — and the core need remains unmet.
              </p>
              <div className="bg-fuchsia-50/80 border border-fuchsia-100 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-fuchsia-600 shrink-0 mt-0.5" />
                <p className="text-sm text-fuchsia-900 leading-relaxed">
                  <strong>The Realization:</strong> Translate your panic into the{' '}
                  <strong>O.M.A.</strong> format — <strong>Observation</strong> (just the facts),{' '}
                  <strong>Meaning</strong> (the story you&rsquo;re telling yourself), and{' '}
                  <strong>Ask</strong> (a specific, doable request).
                </p>
              </div>
            </div>
            <div className="md:w-1/3 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop"
                alt="Chat bubbles"
                width={600}
                height={400}
                loading="lazy"
                className="w-full h-48 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>
        </section>

        {/* 2. Breathing Anchor */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-fuchsia-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                Before sending a text while angry, you <em>must</em> regulate your body first.
                Drop your anchor for 60 seconds to bring your logic center back online.
              </p>

              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold text-white">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={e => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-fuchsia-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Exhale <span className="text-slate-500">(longer = calmer)</span></span>
                    <span className="font-bold text-white">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={e => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-fuchsia-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-fuchsia-500/25 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(217,70,239,0.35)] border border-fuchsia-400/30"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.2)' : 'scale(1)',
                    transition: `transform ${phaseDuration}s ease-in-out`,
                  }}
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-white">
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
                    ? 'bg-slate-800 text-fuchsia-300 border border-fuchsia-700 hover:bg-slate-700'
                    : 'bg-white text-slate-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing ? (
                  <><Square className="w-4 h-4" /> Stop Anchor</>
                ) : (
                  <><Play className="w-4 h-4" /> Start Anchor Breath</>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 3. OMA Text Builder */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-fuchsia-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
            <Smartphone className="w-7 h-7 text-fuchsia-600 shrink-0" />
            Practice 2: The Text Builder
          </h2>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* OMA inputs */}
            <div className="lg:w-1/2 space-y-6">
              {[
                {
                  step: '1',
                  label: 'Observation',
                  sub: 'Just the camera facts',
                  placeholder: 'e.g., We haven\u2019t connected much since you got home\u2026',
                  value: observation,
                  onChange: setObservation,
                },
                {
                  step: '2',
                  label: 'Meaning',
                  sub: 'My story / vulnerable feeling',
                  placeholder: 'e.g., When we don\u2019t speak, my brain tells me I\u2019m being ignored\u2026',
                  value: meaning,
                  onChange: setMeaning,
                },
                {
                  step: '3',
                  label: 'Ask',
                  sub: 'A specific, doable request',
                  placeholder: 'e.g., Can we do a quick 10-minute check-in so I feel grounded?',
                  value: ask,
                  onChange: setAsk,
                },
              ].map(({ step, label, sub, placeholder, value, onChange }) => (
                <div key={step}>
                  <label className="block text-xs font-bold text-fuchsia-800 uppercase tracking-wider mb-2">
                    {step}. {label} <span className="font-normal text-slate-400 normal-case tracking-normal">({sub})</span>
                  </label>
                  <textarea
                    className="w-full bg-slate-50 border border-fuchsia-100 rounded-xl p-4 text-sm text-slate-700 leading-relaxed focus:ring-2 focus:ring-fuchsia-400 outline-none resize-none h-24 placeholder:text-slate-400"
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Smartphone preview */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-[300px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 relative shadow-2xl flex flex-col overflow-hidden" style={{ height: 560 }}>
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 flex justify-center z-20">
                  <div className="w-28 h-6 bg-slate-800 rounded-b-2xl" />
                </div>

                {/* Contact bar */}
                <div className="pt-8 pb-4 px-5 text-center border-b border-slate-700/60 z-10">
                  <div className="w-10 h-10 bg-slate-700 rounded-full mx-auto mb-2 flex items-center justify-center text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-white text-sm font-medium">Partner</span>
                </div>

                {/* Message area */}
                <div className="flex-1 p-4 flex flex-col justify-end bg-slate-900 z-10 overflow-hidden">
                  {compiledOMA ? (
                    <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-br-sm shadow-md text-left text-sm leading-relaxed">
                      {observation.trim() && <span className="block mb-1.5">{observation.trim()}.</span>}
                      {meaning.trim() && <span className="block mb-1.5 text-blue-100">{meaning.trim()}.</span>}
                      {ask.trim() && <span className="block font-semibold">{ask.trim()}</span>}
                    </div>
                  ) : (
                    <p className="text-center text-slate-500 text-xs italic pb-4">
                      Fill out the O.M.A. fields to draft your secure message&hellip;
                    </p>
                  )}
                </div>

                {/* Copy bar */}
                <div className="bg-slate-800 p-4 z-10">
                  <button
                    onClick={handleCopyOMA}
                    disabled={!compiledOMA}
                    className="w-full py-3 bg-white text-slate-900 font-bold rounded-full disabled:opacity-40 flex items-center justify-center gap-2 text-sm hover:bg-slate-100 transition-colors"
                  >
                    {copiedOMA ? (
                      <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy to Clipboard</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Integration Reflection */}
        <section className="rounded-[2rem] bg-fuchsia-50/80 border border-fuchsia-100 p-8 md:p-12">
          <h2 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-3">
            <Brain className="w-6 h-6 text-fuchsia-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-5 text-slate-600 text-base leading-relaxed">
            Think of a &ldquo;Protest Text&rdquo; you sent in the past (e.g. <em>&ldquo;Fine,
            guess you&rsquo;re too busy for me&rdquo;</em>). How would you rewrite it using
            the O.M.A. method today?
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-fuchsia-100 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-fuchsia-400 mb-4 text-sm leading-relaxed resize-none placeholder:text-slate-400"
            placeholder="O: I noticed you've been busy. M: It makes me feel disconnected. A: Can we call tonight?"
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
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-5/day-1"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 29
          </a>
          <a
            href="/workbook/anxious-attachment/week-5/day-3"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Continue to Day 31
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
