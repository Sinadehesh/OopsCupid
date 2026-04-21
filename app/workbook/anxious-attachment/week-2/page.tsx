'use client';

import React, { useState } from 'react';
import {
  Heart,
  ArrowRight,
  RefreshCcw,
  Eye,
  HandMetal,
  Ear,
  Wind,
  Coffee,
  CheckCircle2,
  ShieldAlert,
  Image as ImageIcon,
  MessageSquareHeart,
  BookOpen,
} from 'lucide-react';

export default function Week2InnerChild() {
  const [groundingStep, setGroundingStep] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [journalEntry, setJournalEntry] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSaveJournal = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const groundingData = [
    { num: 5, sense: 'See', icon: <Eye className="w-8 h-8" />, desc: 'Name 5 things you can see around you.', color: 'bg-rose-50 text-rose-600 border-rose-200' },
    { num: 4, sense: 'Touch', icon: <HandMetal className="w-8 h-8" />, desc: 'Name 4 things you can physically feel.', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { num: 3, sense: 'Hear', icon: <Ear className="w-8 h-8" />, desc: 'Name 3 things you can hear right now.', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { num: 2, sense: 'Smell', icon: <Wind className="w-8 h-8" />, desc: 'Name 2 things you can smell.', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { num: 1, sense: 'Taste', icon: <Coffee className="w-8 h-8" />, desc: 'Name 1 thing you can taste.', color: 'bg-teal-50 text-teal-600 border-teal-200' },
  ];

  const reparentingScenarios = [
    {
      trigger: 'Your partner asks for some space after an argument.',
      critic: "They are leaving me. I'm too needy. If I don't fix this right now, the relationship is over.",
      parent: "It's scary to feel disconnected, but their need for space is about their regulation, not your worth. I am here to keep you safe while we wait.",
    },
    {
      trigger: "A friend leaves your text on 'read' for 24 hours.",
      critic: "They are mad at me. I must have said something stupid. I should apologize immediately just in case.",
      parent: 'You are allowed to take up space. Their delay is likely about their own busy life. You are loved, even in the silence.',
    },
    {
      trigger: 'You make a small mistake at work or in a conversation.',
      critic: "I am an idiot. Everyone sees through me. I have to be perfect or people will realize I'm a fraud.",
      parent: 'It is okay to make mistakes. You don\u2019t have to be perfect to be worthy of love and belonging. I forgive you.',
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff1f2,_#ffffff_40%,_#f8fafc_100%)] text-slate-800 font-sans pb-20">

      {/* Header */}
      <header className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.14),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(251,113,133,0.12),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.08),transparent_32%)]" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-medium text-rose-800 backdrop-blur shadow-sm">
            <BookOpen className="h-4 w-4" />
            Week 2 · The Earned Security Workbook
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            Healing Your{' '}
            <span className="bg-gradient-to-r from-rose-500 to-pink-400 bg-clip-text text-transparent">
              Inner Child
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Who we are today is deeply informed by our childhood. Learn to step into the role of a nurturing caregiver for yourself, soothing the younger parts of you that fear abandonment.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 -mt-4 relative z-20 space-y-10">

        {/* Psychoeducation */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-rose-100/40 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500" />
            Understanding the Wounded Child
          </h2>
          <div className="space-y-4 text-slate-600 leading-8 text-base">
            <p>
              Inner child work isn\u2019t about dwelling on the past or blaming your parents. It is a vital somatic and cognitive practice focused on healing the parts of yourself that formed during early developmental stages.
            </p>
            <p>
              As an anxiously attached adult, when you experience a relationship trigger, it is rarely your adult self who is panicking. It is your <strong className="text-slate-800">Inner Child</strong> \u2014 a younger version of you who once experienced inconsistent care and learned that love had to be \u201cearned.\u201d
            </p>
            <p>
              True healing begins with <strong className="text-slate-800">Reparenting</strong>: providing that younger version of yourself the emotional response they needed back then, right now in the present.
            </p>
          </div>
        </section>

        {/* Reparenting Translator */}
        <section className="rounded-[2rem] border border-rose-100 bg-rose-50/60 p-8 md:p-10 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
            <MessageSquareHeart className="w-7 h-7 text-rose-500" />
            The Reparenting Translator
          </h2>
          <p className="text-slate-600 mb-8 text-base leading-7">
            Practice translating the panicked voice of the Inner Critic into the soothing voice of the Nurturing Parent. <strong className="text-slate-800">Click the arrow to flip and reparent the thought.</strong>
          </p>

          <div className="space-y-6">
            {reparentingScenarios.map((scenario, index) => (
              <div key={index} className="rounded-2xl border border-rose-100 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Trigger: {scenario.trigger}</h3>
                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                  <div className={`flex-1 p-5 rounded-2xl border-l-4 transition-colors ${flippedCards[index] ? 'bg-slate-50 border-slate-300' : 'bg-rose-50 border-rose-400'}`}>
                    <span className="text-xs font-bold text-rose-500 uppercase mb-2 block">Inner Critic</span>
                    <p className={`text-base font-medium ${flippedCards[index] ? 'text-slate-400 line-through' : 'text-slate-800'}`}>"{scenario.critic}"</p>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <button
                      onClick={() => handleCardFlip(index)}
                      className="w-12 h-12 bg-white rounded-full border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-300 transition-all hover:rotate-180 duration-500"
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleCardFlip(index)}
                    className="md:hidden py-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 font-medium text-sm"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Reparent Thought
                  </button>

                  <div className={`flex-1 p-5 rounded-2xl border-l-4 transition-all duration-500 ${flippedCards[index] ? 'bg-emerald-50 border-emerald-400 opacity-100' : 'bg-slate-50 border-slate-200 opacity-50'}`}>
                    <span className={`text-xs font-bold uppercase mb-2 block ${flippedCards[index] ? 'text-emerald-600' : 'text-slate-400'}`}>Nurturing Parent</span>
                    <p className={`text-base font-medium ${flippedCards[index] ? 'text-emerald-900' : 'text-slate-400 blur-[4px] select-none'}`}>"{scenario.parent}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grounding Module */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 p-8 md:p-10 shadow-2xl text-white">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-3">
              <ShieldAlert className="w-7 h-7 text-rose-400" />
              Emergency Grounding: 5-4-3-2-1
            </h2>
            <p className="text-slate-300 mb-8 text-base leading-7 max-w-2xl">
              Inner child work can feel overwhelming. If panic rises, use this sensory tool to anchor your nervous system back into the present moment.
            </p>

            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8 backdrop-blur">
              <div className="flex justify-between items-center mb-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-700 z-0" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-rose-500 z-0 transition-all duration-500" style={{ width: `${(groundingStep / 4) * 100}%` }} />
                {groundingData.map((_, idx) => (
                  <div key={idx} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${idx <= groundingStep ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-slate-800 text-slate-500 border border-slate-600'}`}>
                    {5 - idx}
                  </div>
                ))}
              </div>

              <div className={`flex flex-col items-center text-center p-8 rounded-2xl border ${groundingData[groundingStep].color} transition-all duration-300`}>
                <div className="mb-4">{groundingData[groundingStep].icon}</div>
                <h3 className="text-3xl font-semibold mb-2">{groundingData[groundingStep].num}</h3>
                <p className="text-xl font-medium">{groundingData[groundingStep].desc}</p>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setGroundingStep(prev => Math.max(0, prev - 1))}
                  disabled={groundingStep === 0}
                  className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition-colors font-medium text-sm"
                >
                  Previous
                </button>
                {groundingStep < 4 ? (
                  <button
                    onClick={() => setGroundingStep(prev => Math.min(4, prev + 1))}
                    className="px-8 py-3 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 shadow-lg transition-all text-sm"
                  >
                    I\u2019ve Found {groundingData[groundingStep].num}
                  </button>
                ) : (
                  <button
                    onClick={() => setGroundingStep(0)}
                    className="px-8 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow-lg transition-all flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Fully Grounded
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Photo Reflection Journal */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-rose-100/40 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-rose-500" />
                The Photo Reflection
              </h2>
              <div className="bg-rose-50 p-5 rounded-2xl border-l-4 border-rose-400 mb-5">
                <p className="text-slate-700 text-sm leading-7">
                  <strong>Task:</strong> Find a photo of yourself between ages 4 and 10. Look at the child\u2019s eyes. What emotion do you see? What did that child need?
                </p>
              </div>
              <p className="text-slate-600 text-sm leading-7">
                Imagine sitting next to that younger version of yourself. Write them a short letter. Tell them: <em>\u201cI see you. It wasn\u2019t your fault. You are safe now.\u201d</em>
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-2">
                <textarea
                  className="w-full h-48 p-4 bg-transparent resize-none outline-none text-slate-700 placeholder:text-slate-400 leading-relaxed text-sm"
                  placeholder="Dear younger me, I\u2019m looking at you right now and I see..."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
                <div className="flex justify-end p-2 border-t border-rose-100">
                  <button
                    onClick={handleSaveJournal}
                    disabled={journalEntry.length === 0}
                    className="flex items-center px-6 py-2.5 bg-slate-950 text-white font-medium rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Sealed in Journal</> : 'Save Letter'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a href="/workbook/anxious-attachment/week-1" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm">
            \u2190 Back to Week 1
          </a>
          <a
            href="/workbook/anxious-attachment/week-3"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 shadow-lg group"
          >
            Complete Week 2
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
