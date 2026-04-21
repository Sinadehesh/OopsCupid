'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  Repeat,
  Smartphone,
  CheckCircle2,
  Copy,
  HeartHandshake,
  ShieldAlert,
  AlertOctagon,
  PauseCircle,
  PenLine,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Design-system helpers
   (mirrors Week 4 / the rest of the workbook)
───────────────────────────────────────────── */
const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-violet-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-violet-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

const TAB_ACTIVE: Record<string, string> = {
  reflect: 'border-emerald-500 text-emerald-700 bg-white',
  responsibility: 'border-amber-500 text-amber-700 bg-white',
  roadmap: 'border-blue-500 text-blue-700 bg-white',
};

/* ─────────────────────────────────────────────
   Distortion data (kept for future expansions)
───────────────────────────────────────────── */

export default function Week5Communication() {
  // Pursue-Withdraw visualizer
  const [cycleBroken, setCycleBroken] = useState(false);

  // O.M.A. builder
  const [observation, setObservation] = useState('');
  const [meaning, setMeaning] = useState('');
  const [ask, setAsk] = useState('');
  const [copiedOMA, setCopiedOMA] = useState(false);

  // 3 R's tabs
  const [activeTab, setActiveTab] = useState<'reflect' | 'responsibility' | 'roadmap'>('reflect');
  const [reflectText, setReflectText] = useState('');
  const [responsibilityText, setResponsibilityText] = useState('');
  const [roadmapText, setRoadmapText] = useState('');
  const [isRepairSaved, setIsRepairSaved] = useState(false);

  const compiledOMA = [observation, meaning, ask]
    .filter(Boolean)
    .map((s) => s.trim().replace(/\.+$/, ''))
    .join('. ')
    .concat(observation || meaning || ask ? '.' : '');

  const handleCopyOMA = () => {
    if (!compiledOMA) return;
    navigator.clipboard.writeText(compiledOMA);
    setCopiedOMA(true);
    setTimeout(() => setCopiedOMA(false), 2000);
  };

  const handleSaveRepair = () => {
    setIsRepairSaved(true);
    setTimeout(() => setIsRepairSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50/30 to-slate-50 text-slate-800 font-sans pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase border border-violet-200">
              Week 5
            </span>
            <span className="text-violet-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Communication &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Conflict Repair
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            A secure relationship isn't one without fights — it's one with healthy repairs. Learn
            to express your needs clearly and break the anxious–avoidant trap.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. Psychoeducation ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold text-slate-900 mb-5 flex items-center gap-3">
            <Repeat className="w-7 h-7 text-violet-500 shrink-0" />
            The Pursue–Withdraw Dance
          </h2>

          <div className="prose prose-slate prose-lg max-w-none mb-8">
            <p>
              When anxiously attached individuals feel a loss of connection, they often engage in{' '}
              <strong>"Protest Behaviors"</strong> — sending a barrage of texts, criticising, or
              picking a fight. The subconscious goal is to force a reaction and prove the partner
              is still there.
            </p>
            <p>
              If your partner has an <em>avoidant</em> attachment style their nervous system reads
              pursuit as engulfment and <strong>withdraws</strong>. That withdrawal terrifies your
              anxious inner child, causing you to pursue harder. This is the{' '}
              <strong>Infinity Loop of relationship misery</strong>.
            </p>
          </div>

          {/* Interactive loop visualizer */}
          <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800 relative overflow-hidden text-center">
            {/* Ambient glows inside dark card */}
            <div className={`pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 ${cycleBroken ? 'opacity-0' : 'opacity-30 bg-rose-500'}`} />
            <div className={`pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 ${cycleBroken ? 'opacity-0' : 'opacity-30 bg-blue-600'}`} />

            <h3 className="text-xl font-bold text-white mb-8 relative z-10">The Anxious–Avoidant Trap</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 relative mb-10 z-10">
              {/* Anxious side */}
              <div className={`w-full md:w-56 p-6 rounded-2xl border-2 transition-all duration-500 ${cycleBroken ? 'bg-slate-800 border-slate-700 opacity-40' : 'bg-rose-950/60 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.25)]'}`}>
                <h4 className="text-rose-400 font-bold uppercase tracking-wider text-xs mb-2">Anxious Partner</h4>
                <p className="text-white text-sm font-medium leading-snug">
                  Feels disconnected, pursues with protest behavior — criticism, over-texting.
                </p>
              </div>

              {/* Arrow bridge */}
              <div className="hidden md:flex flex-col items-center justify-center px-4 w-32 relative h-32">
                <div className={`absolute top-4 w-full h-px transition-all duration-500 ${cycleBroken ? 'bg-slate-700' : 'bg-gradient-to-r from-rose-500 to-blue-500'}`} />
                <div className={`absolute bottom-4 w-full h-px transition-all duration-500 ${cycleBroken ? 'bg-slate-700' : 'bg-gradient-to-l from-blue-500 to-rose-500'}`} />

                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${cycleBroken ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                  <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                    Pause & Regulate
                  </div>
                </div>
              </div>

              {/* Avoidant side */}
              <div className={`w-full md:w-56 p-6 rounded-2xl border-2 transition-all duration-500 ${cycleBroken ? 'bg-slate-800 border-slate-700 opacity-40' : 'bg-blue-950/60 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.25)]'}`}>
                <h4 className="text-blue-400 font-bold uppercase tracking-wider text-xs mb-2">Avoidant Partner</h4>
                <p className="text-white text-sm font-medium leading-snug">
                  Feels overwhelmed or controlled, withdraws, shuts down, or asks for space.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCycleBroken(!cycleBroken)}
              className={`relative z-10 inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
                cycleBroken
                  ? 'bg-slate-700 text-white hover:bg-slate-600'
                  : 'bg-violet-500 text-white hover:bg-violet-400 hover:scale-105 shadow-[0_0_20px_rgba(139,92,246,0.4)]'
              }`}
            >
              {cycleBroken ? (
                <><Repeat className="w-4 h-4" /> Reset Cycle</>
              ) : (
                <><PauseCircle className="w-4 h-4" /> Break The Cycle</>
              )}
            </button>

            {cycleBroken && (
              <p className="relative z-10 text-emerald-400 mt-5 text-sm animate-in fade-in slide-in-from-bottom-2">
                <strong>Cycle broken!</strong> By refusing protest behaviors and self-regulating instead,
                you stop fuelling their need to withdraw.
              </p>
            )}
          </div>
        </section>

        {/* ── 2. O.M.A. Builder ── */}
        <section className={CARD.replace('shadow-violet-100/40', 'shadow-fuchsia-100/40').replace('bg-white/70', 'bg-violet-50/80')}>
          <h2 className="text-2xl font-bold text-violet-900 mb-3 flex items-center gap-3">
            <Smartphone className="w-7 h-7 text-violet-600 shrink-0" />
            The O.M.A. Template Builder
          </h2>
          <p className="text-violet-700 mb-8 text-base leading-relaxed">
            Instead of a critical text (<em>"You always ignore me!"</em>), use the{' '}
            <strong>Observation → Meaning → Ask</strong> formula. It removes blame while clearly
            stating your need.
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Inputs */}
            <div className="lg:w-1/2 space-y-5">
              {[
                { label: '1. Observation — just the facts', key: 'observation', value: observation, setter: setObservation, placeholder: 'e.g., We haven\'t connected much since you got home...' },
                { label: '2. Meaning — my feeling / story', key: 'meaning', value: meaning, setter: setMeaning, placeholder: 'e.g., When we don\'t speak my brain tells me I\'m being ignored...' },
                { label: '3. Ask — a specific, doable request', key: 'ask', value: ask, setter: setAsk, placeholder: 'e.g., Can we do a quick 10-min check-in so I feel grounded?' },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-violet-800 uppercase tracking-widest mb-1.5">
                    {label}
                  </label>
                  <textarea
                    className={TEXTAREA + ' h-20'}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Phone mockup */}
            <div className="lg:w-1/2 flex justify-center items-start">
              <div className="w-[280px] bg-slate-950 rounded-[2.5rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="bg-slate-800 h-5 rounded-b-3xl w-32 mx-auto" />

                {/* Chat header */}
                <div className="bg-slate-900 pt-6 pb-4 px-5 text-center border-b border-slate-800 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className="text-white text-xs font-semibold">Partner</span>
                </div>

                {/* Message bubble */}
                <div className="flex-1 min-h-[200px] p-4 flex flex-col justify-end bg-slate-950">
                  {compiledOMA.length > 1 ? (
                    <div className="bg-violet-500 text-white p-4 rounded-2xl rounded-br-sm text-xs leading-relaxed shadow-md animate-in slide-in-from-bottom-4">
                      {observation && <span className="block mb-1">{observation.trim()}.</span>}
                      {meaning && <span className="block mb-1 text-violet-200">{meaning.trim()}.</span>}
                      {ask && <span className="block font-semibold">{ask.trim()}.</span>}
                    </div>
                  ) : (
                    <p className="text-center text-slate-600 text-xs italic">
                      Start typing to build your message…
                    </p>
                  )}
                </div>

                {/* Copy button */}
                <div className="bg-slate-900 p-4 border-t border-slate-800">
                  <button
                    onClick={handleCopyOMA}
                    disabled={compiledOMA.length <= 1}
                    className="w-full py-2.5 bg-white text-slate-900 font-bold rounded-full text-xs disabled:opacity-40 flex items-center justify-center gap-2 transition-opacity"
                  >
                    {copiedOMA ? (
                      <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy to clipboard</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. The 3 R's ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
            <HeartHandshake className="w-7 h-7 text-emerald-500 shrink-0" />
            The 3 R's of Relationship Repair
          </h2>
          <p className="text-slate-500 mb-8 text-base leading-relaxed">
            A fight is a rupture in the attachment bond. The hallmark of a secure relationship is
            the ability to swiftly and genuinely repair that rupture. Use this worksheet after a
            conflict.
          </p>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex flex-col sm:flex-row border-b border-slate-200 bg-slate-50">
              {(['reflect', 'responsibility', 'roadmap'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                    activeTab === tab
                      ? TAB_ACTIVE[tab]
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab === 'reflect' ? '1. Reflect' : tab === 'responsibility' ? '2. Responsibility' : '3. Roadmap'}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6 md:p-8 min-h-[320px] flex flex-col">

              {activeTab === 'reflect' && (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="flex items-start gap-3 mb-5">
                    <ShieldAlert className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Reflect Their Reality</h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Summarise what you heard them say — no defence, no "but".{' '}
                        <em>"Here is what I heard you experience…"</em>
                      </p>
                    </div>
                  </div>
                  <textarea
                    className={TEXTAREA + ' flex-1 min-h-[120px]'}
                    placeholder="When we argued, I heard you say that…"
                    value={reflectText}
                    onChange={(e) => setReflectText(e.target.value)}
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setActiveTab('responsibility')}
                      className="px-5 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 text-sm transition-colors"
                    >
                      Next: Responsibility →
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'responsibility' && (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-start gap-3 mb-5">
                    <AlertOctagon className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Take Responsibility</h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Own your 50%. Drop the "but."{' '}
                        <em>"Here is my part in how things went wrong…"</em>
                      </p>
                    </div>
                  </div>
                  <textarea
                    className={TEXTAREA + ' flex-1 min-h-[120px]'}
                    placeholder="My part in this conflict was…"
                    value={responsibilityText}
                    onChange={(e) => setResponsibilityText(e.target.value)}
                  />
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => setActiveTab('reflect')}
                      className="px-5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setActiveTab('roadmap')}
                      className="px-5 py-2 bg-amber-50 text-amber-700 font-bold rounded-xl hover:bg-amber-100 text-sm transition-colors"
                    >
                      Next: Roadmap →
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'roadmap' && (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-start gap-3 mb-5">
                    <PenLine className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Build a Roadmap</h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Actionable plan for next time.{' '}
                        <em>"Here is what I will try to do next time…"</em>
                      </p>
                    </div>
                  </div>
                  <textarea
                    className={TEXTAREA + ' flex-1 min-h-[120px]'}
                    placeholder="Next time I feel triggered like this, I will…"
                    value={roadmapText}
                    onChange={(e) => setRoadmapText(e.target.value)}
                  />
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => setActiveTab('responsibility')}
                      className="px-5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl text-sm transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSaveRepair}
                      className={`inline-flex items-center gap-2 px-5 py-2 font-bold rounded-xl text-sm transition-colors ${
                        isRepairSaved
                          ? 'bg-slate-900 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isRepairSaved ? (
                        <><CheckCircle2 className="w-4 h-4" /> Repair Saved</>
                      ) : (
                        'Save Repair Script'
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-4"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors w-full sm:w-auto text-center text-sm"
          >
            ← Back to Week 4
          </a>
          <a
            href="/workbook/anxious-attachment/week-6"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-700 transition-all group shadow-lg shadow-violet-600/20 text-sm"
          >
            Complete Week 5
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
