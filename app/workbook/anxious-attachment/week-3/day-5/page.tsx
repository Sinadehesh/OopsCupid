'use client';

import React, { useState, useEffect } from 'react';
import {
  CloudLightning, ArrowRight, Brain, Anchor,
  Play, Square, Info, ShieldCheck, MessageCircle
} from 'lucide-react';

const CARD = 'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-slate-100/40 border border-white/60 p-8 md:p-12';

const INITIAL_MESSAGES: { sender: 'partner' | 'you'; text: string }[] = [
  { sender: 'partner', text: "Wow, so you\u2019re just ignoring me now? I guess you don\u2019t care about my feelings." },
];

export default function Week3Day5() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [choiceMade, setChoiceMade] = useState(false);
  const [choiceWasHealthy, setChoiceWasHealthy] = useState<boolean | null>(null);

  // Breathing Anchor
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhaleTime, setInhaleTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  // Reflection
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

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

  const handleChoice = (isHealthy: boolean) => {
    setChoiceMade(true);
    setChoiceWasHealthy(isHealthy);
    const reply = isHealthy
      ? "I care about you very much. I am just holding the boundary we discussed because I need space to calm down. I will text you tomorrow."
      : "No I\u2019m not! I\u2019m sorry, please don\u2019t be mad. I\u2019m here, what do you need?";
    setMessages(prev => [...prev, { sender: 'you', text: reply }]);
  };

  const handleRestart = () => {
    setChoiceMade(false);
    setChoiceWasHealthy(null);
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/30 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-slate-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-indigo-300/15 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold tracking-widest uppercase border border-slate-300">
              Week 3 &middot; Day 5 (Day 19)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400">
              Pushback
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Holding the line when the &ldquo;Extinction Burst&rdquo; happens.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <CloudLightning className="w-7 h-7 text-slate-600 shrink-0" />
            Attachment Insight: The Weather
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-base text-slate-600 leading-relaxed">
              <p>
                When you set a boundary with someone used to your people-pleasing, they will likely
                push back. In psychology, this is called an <strong>Extinction Burst</strong>&mdash;the
                behaviour gets worse before it gets better.
              </p>
              <p>
                They might get angry, guilt-trip you, or withdraw. This is terrifying for the
                Anxious attacher. But you must view their reaction like <strong>The Weather</strong>.
              </p>
              <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>The Realization:</strong> You are the house. Their emotional reaction is the
                  storm outside. A house does not apologise for the rain. It just stands firm. Let them
                  be mad. It is not your job to fix their weather.
                </p>
              </div>
            </div>
            <div className="md:w-56 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=600&auto=format&fit=crop"
                alt="Storm clouds gathering over a landscape"
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
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-slate-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-slate-600/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-white">
                <Anchor className="w-7 h-7 text-slate-400 shrink-0" />
                Practice 1: Drop Your Anchor
              </h2>
              <p className="text-slate-300 text-base mb-6 leading-relaxed">
                When the storm hits, the inner child wants to cave. Drop your anchor for 60 seconds
                to reinforce the walls of the house.
              </p>
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Inhale</span>
                    <span className="font-bold">{inhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="8" value={inhaleTime}
                    onChange={e => setInhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-slate-400 disabled:opacity-40"
                  />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Exhale <span className="text-slate-500 font-normal">(longer = calmer)</span></span>
                    <span className="font-bold">{exhaleTime}s</span>
                  </label>
                  <input
                    type="range" min="2" max="10" value={exhaleTime}
                    onChange={e => setExhaleTime(Number(e.target.value))}
                    disabled={isBreathing}
                    className="w-full accent-slate-400 disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div
                  className="absolute inset-0 bg-slate-500/30 rounded-full blur-xl"
                  style={{
                    transform: isBreathing && breathPhase === 'Inhale' ? 'scale(1.6)' : 'scale(1)',
                    transition: isBreathing
                      ? `transform ${breathPhase === 'Inhale' ? inhaleTime : exhaleTime}s ease-in-out`
                      : 'transform 1s ease-in-out',
                  }}
                />
                <div
                  className="w-32 h-32 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(100,116,139,0.5)] border-2 border-slate-400/50"
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
                    : 'bg-white text-slate-900 hover:scale-105 shadow-lg'
                }`}
              >
                {isBreathing
                  ? <><Square className="w-4 h-4" /> Stop Anchor</>
                  : <><Play className="w-4 h-4" /> Start Anchor Breath</>}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Pushback Simulator */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-900">
            <MessageCircle className="w-7 h-7 text-slate-600 shrink-0" />
            Practice 2: The Pushback Simulator
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            You set a boundary asking for a night alone. They hit you with a guilt trip. Choose
            how the Secure Adult responds.
          </p>

          <div className="bg-slate-100/80 border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
            {/* Chat window */}
            <div className="p-6 space-y-5 min-h-[220px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'you'
                      ? 'bg-slate-700 text-white rounded-br-sm'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                  }`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${
                      msg.sender === 'you' ? 'text-slate-400' : 'text-rose-500'
                    }`}>
                      {msg.sender === 'partner' ? 'The Pushback' : 'Your Response'}
                    </span>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Choices */}
            {!choiceMade ? (
              <div className="p-4 bg-white/80 border-t border-slate-200 space-y-3">
                <button
                  onClick={() => handleChoice(false)}
                  className="w-full p-4 border border-rose-200 hover:bg-rose-50 text-left rounded-xl transition-colors group"
                >
                  <span className="font-bold text-rose-600 block mb-1 text-sm">Cave (People-Pleasing)</span>
                  <span className="text-sm text-slate-600">&ldquo;No I&rsquo;m not! I&rsquo;m sorry, please don&rsquo;t be mad. I&rsquo;m here, what do you need?&rdquo;</span>
                </button>
                <button
                  onClick={() => handleChoice(true)}
                  className="w-full p-4 border border-emerald-200 hover:bg-emerald-50 text-left rounded-xl transition-colors"
                >
                  <span className="font-bold text-emerald-600 block mb-1 text-sm">Hold the Line (Secure Adult)</span>
                  <span className="text-sm text-slate-600">&ldquo;I care about you very much. I am just holding the boundary we discussed. I will text you tomorrow.&rdquo;</span>
                </button>
              </div>
            ) : (
              <div className={`p-6 border-t animate-in slide-in-from-bottom-4 duration-500 text-center ${
                choiceWasHealthy
                  ? 'bg-emerald-50/80 border-emerald-200'
                  : 'bg-rose-50/80 border-rose-200'
              }`}>
                <ShieldCheck className={`w-10 h-10 mx-auto mb-2 ${
                  choiceWasHealthy ? 'text-emerald-600' : 'text-rose-400'
                }`} />
                {choiceWasHealthy ? (
                  <>
                    <h4 className="font-bold text-emerald-900 text-lg mb-1">Boundary Maintained</h4>
                    <p className="text-emerald-700 text-sm leading-relaxed">
                      You survived the weather. They are allowed to be upset, and you are allowed to rest.
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-rose-900 text-lg mb-1">The Cave Response</h4>
                    <p className="text-rose-700 text-sm leading-relaxed">
                      This is the old pattern. Notice how quickly panic overrode your intention. That awareness is the work.
                    </p>
                  </>
                )}
                <button
                  onClick={handleRestart}
                  className="mt-4 text-slate-600 underline font-bold text-sm hover:text-slate-900 transition-colors"
                >
                  Restart Simulator
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 4. Integration */}
        <section className={CARD}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900">
            <Brain className="w-6 h-6 text-slate-600 shrink-0" />
            Integration
          </h2>
          <p className="mb-4 text-slate-600 text-base leading-relaxed">
            When people push back against your boundaries, what is your typical &ldquo;Cave&rdquo; behaviour?
            (e.g., over-apologising, instantly changing your mind).
          </p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl p-5 h-32 outline-none focus:ring-2 focus:ring-slate-500 text-sm leading-relaxed resize-none mb-4"
            placeholder="e.g., I usually start apologising profusely and promise to make it up to them\u2026"
          />
          <div className="flex justify-end">
            <button
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              disabled={!reflection.trim()}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl font-bold transition-colors text-sm"
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
            href="/workbook/anxious-attachment/week-3/day-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 18
          </a>
          <a
            href="/workbook/anxious-attachment/week-3/day-6"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Continue to Day 20
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
