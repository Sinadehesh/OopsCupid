'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Brain,
  SplitSquareHorizontal,
  Eye,
  CheckCircle2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter,
  PenTool,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

export default function Week4Narrative() {
  const [isAwarenessActive, setIsAwarenessActive] = useState(false);

  const [triggerEvent, setTriggerEvent] = useState('');
  const [theStory, setTheStory] = useState('');
  const [theFacts, setTheFacts] = useState('');
  const [distortions, setDistortions] = useState({
    mindReading: false,
    catastrophizing: false,
    personalization: false,
    blackAndWhite: false,
  });
  const [isReframeSaved, setIsReframeSaved] = useState(false);

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [journalEntries, setJournalEntries] = useState<Record<number, string>>({});
  const [isJournalSaved, setIsJournalSaved] = useState(false);

  const prompts = [
    {
      day: 1,
      question: 'When my partner or friend is distant, what story does my mind immediately tell me? Is that story actually accurate based on undeniable facts?',
      focus: "Identifying the 'Internal Working Model'",
    },
    {
      day: 2,
      question: "In what ways do I over-function or over-give in my relationships to 'earn' my place?",
      focus: 'Codependency & Utility',
    },
    {
      day: 3,
      question: 'What am I deeply afraid will happen if I set a boundary or say no to someone I love?',
      focus: 'Fear of Abandonment',
    },
    {
      day: 4,
      question: "What is the difference between needing connection and needing to control someone else's mood to feel safe?",
      focus: 'Differentiation & Mentalization',
    },
    {
      day: 5,
      question: "If I deeply and truly believed I was already 'enough,' exactly as I am, how would I act differently today?",
      focus: 'Secure Attachment Visualization',
    },
  ];

  const handleSaveReframe = () => {
    setIsReframeSaved(true);
    setTimeout(() => setIsReframeSaved(false), 3000);
  };

  const handleSaveJournal = () => {
    setIsJournalSaved(true);
    setTimeout(() => setIsJournalSaved(false), 3000);
  };

  const handleEntryChange = (text: string) => {
    setJournalEntries(prev => ({ ...prev, [currentPromptIndex]: text }));
  };

  const toggleDistortion = (key: keyof typeof distortions) => {
    setDistortions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const nextPrompt = () => setCurrentPromptIndex(prev => Math.min(prompts.length - 1, prev + 1));
  const prevPrompt = () => setCurrentPromptIndex(prev => Math.max(0, prev - 1));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#ffffff_40%,_#f8fafc_100%)] text-slate-800 font-sans pb-20">

      {/* Header */}
      <header className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.10),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.08),transparent_32%)]" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-800 backdrop-blur shadow-sm">
            <BookOpen className="h-4 w-4" />
            Week 4 · The Earned Security Workbook
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            Rewriting The{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Narrative
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Move out of reactive mode. Learn to externalize your fears through journaling, evaluate anxious stories rationally, and rebuild your internal working model.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 -mt-4 relative z-20 space-y-10">

        {/* Psychoeducation */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-blue-100/40 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <Brain className="w-7 h-7 text-blue-600" />
            The &ldquo;Internal Working Model&rdquo;
          </h2>
          <div className="space-y-4 text-slate-600 leading-8 text-base">
            <p>
              Attachment theory teaches us that our early experiences form an <strong className="text-slate-800">&ldquo;Internal Working Model&rdquo;</strong> — a subconscious blueprint about how relationships work, whether you are lovable, and whether others are reliable.
            </p>
            <p>
              For someone with anxious attachment, the internal working model often states: <em>&ldquo;I must be perfect to be loved, and if someone pulls away, it means they are leaving me.&rdquo;</em> Because of this blueprint, your brain applies <strong className="text-slate-800">Cognitive Distortions</strong> to neutral events. A delayed text isn&rsquo;t just a delayed text; it becomes proof of abandonment.
            </p>
            <div className="bg-cyan-50 border-l-4 border-cyan-400 p-5 rounded-r-2xl">
              <h3 className="text-cyan-800 font-semibold text-base mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5" /> The Power of Mentalization
              </h3>
              <p className="text-cyan-700 text-sm leading-7 m-0">
                <strong>Mentalization</strong> is the ability to understand that your mind and your partner&rsquo;s mind are separate. It is the realization that <em>&ldquo;my feeling of being abandoned is a real feeling, but it does not mean they are actually abandoning me.&rdquo;</em> Journaling acts as the bridge to this awareness.
              </p>
            </div>
          </div>
        </section>

        {/* Cycle Breaker */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 p-8 md:p-10 shadow-2xl text-white">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-3">
              <RefreshCw className="w-7 h-7 text-cyan-400" />
              The Cycle Breaker
            </h2>
            <p className="text-slate-300 mb-8 text-base leading-7 max-w-2xl">
              Toggle &ldquo;Pause &amp; Reflect&rdquo; to see how journaling reroutes your nervous system&rsquo;s automated loop.
            </p>

            <div className="bg-slate-800/60 rounded-2xl p-6 md:p-8 border border-slate-700 backdrop-blur">
              {/* Toggle */}
              <div className="flex justify-center mb-10">
                <button
                  onClick={() => setIsAwarenessActive(v => !v)}
                  className="flex items-center bg-slate-900 p-1.5 rounded-full border border-slate-700 shadow-inner gap-1"
                >
                  <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!isAwarenessActive ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400'}`}>
                    Anxious Loop
                  </span>
                  <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isAwarenessActive ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-400'}`}>
                    Pause &amp; Reflect
                  </span>
                </button>
              </div>

              {/* Flowchart */}
              <div className="relative flex flex-col items-center max-w-md mx-auto">
                <div className="w-full bg-slate-700/80 border border-slate-600 p-4 rounded-2xl text-center">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-1">Step 1: The Trigger</span>
                  <span className="font-medium text-base">Partner is quiet &amp; withdrawn</span>
                </div>
                <div className="h-6 w-px bg-slate-600" />
                <div className="w-full bg-slate-700/80 border border-slate-600 p-4 rounded-2xl text-center">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-1">Step 2: The Story</span>
                  <span className="font-medium text-base">&ldquo;I did something wrong. They are losing interest in me.&rdquo;</span>
                </div>
                <div className="h-6 w-px bg-slate-600" />

                <div className="w-full relative" style={{ minHeight: 160 }}>
                  {/* Anxious path */}
                  <div className={`absolute w-full transition-all duration-700 ease-in-out ${!isAwarenessActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                    <div className="bg-rose-900/50 border border-rose-500/40 p-5 rounded-2xl text-center shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                      <span className="text-xs text-rose-300 uppercase tracking-widest font-semibold block mb-1">Step 3: Amygdala Hijack</span>
                      <span className="font-medium text-base text-rose-100 block mb-3">Panic, chest tightness, fear.</span>
                      <div className="h-4 w-px bg-rose-500/40 mx-auto my-2" />
                      <span className="text-xs text-rose-300 uppercase tracking-widest font-semibold block mb-1">Step 4: Protest Behavior</span>
                      <span className="font-medium text-base text-rose-100">Sending 5 texts asking &ldquo;Are you mad at me?&rdquo;</span>
                    </div>
                  </div>

                  {/* Secure path */}
                  <div className={`absolute w-full transition-all duration-700 ease-in-out ${isAwarenessActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
                    <div className="bg-cyan-900/50 border border-cyan-500/40 p-5 rounded-2xl text-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                      <span className="text-xs text-cyan-300 uppercase tracking-widest font-semibold block mb-1">Step 3: Prefrontal Cortex Engagement</span>
                      <span className="font-medium text-base text-cyan-100 block mb-3">Journaling: &ldquo;Is this fact or a story?&rdquo;</span>
                      <div className="h-4 w-px bg-cyan-500/40 mx-auto my-2" />
                      <span className="text-xs text-cyan-300 uppercase tracking-widest font-semibold block mb-1">Step 4: Secure Response</span>
                      <span className="font-medium text-base text-cyan-100">Self-soothing and allowing them space to regulate.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story vs Fact Analyzer */}
        <section className="rounded-[2rem] border border-blue-100 bg-blue-50/60 p-8 md:p-10 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
            <Filter className="w-7 h-7 text-blue-600" />
            The Story vs. Fact Analyzer
          </h2>
          <p className="text-slate-600 mb-8 text-base leading-7">
            Anxiety thrives on ambiguity and assumptions. Use this tool to separate the objective facts from the story your inner child is telling you.
          </p>

          <div className="bg-white/80 rounded-2xl border border-blue-100 p-6 md:p-8 shadow-sm backdrop-blur space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">1. The Trigger (What Happened?)</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none h-24 text-sm"
                  placeholder="e.g., My partner said they were too tired to hang out tonight."
                  value={triggerEvent}
                  onChange={(e) => setTriggerEvent(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">2. My Story (The Assumption)</label>
                <textarea
                  className={`w-full border rounded-2xl p-4 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none h-24 transition-colors text-sm ${theStory.length > 0 ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                  placeholder="e.g., They are pulling away and don't enjoy spending time with me anymore."
                  value={theStory}
                  onChange={(e) => setTheStory(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">3. Identify Cognitive Distortions</label>
              <div className="flex flex-wrap gap-2">
                {(['mindReading', 'catastrophizing', 'personalization', 'blackAndWhite'] as const).map((key) => {
                  const labels: Record<string, string> = {
                    mindReading: 'Mind Reading',
                    catastrophizing: 'Catastrophizing',
                    personalization: 'Personalization',
                    blackAndWhite: 'Black & White Thinking',
                  };
                  return (
                    <button
                      key={key}
                      onClick={() => toggleDistortion(key)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${distortions[key] ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-sm' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                    >
                      {distortions[key] && <CheckCircle2 className="w-4 h-4" />}
                      {labels[key]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">4. The Objective Facts (Camera Check)</label>
              <div className="relative">
                <textarea
                  className={`w-full border rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none resize-none h-24 transition-colors text-sm ${theFacts.length > 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                  placeholder="If a video camera recorded this event, what are the undeniable facts? (e.g., 'They said they were tired.')"
                  value={theFacts}
                  onChange={(e) => setTheFacts(e.target.value)}
                />
                <SplitSquareHorizontal className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveReframe}
                disabled={theFacts.length === 0 || theStory.length === 0}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 text-white font-medium rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md text-sm"
              >
                {isReframeSaved ? <><CheckCircle2 className="w-4 h-4" /> Reframe Anchored</> : 'Anchor The Facts'}
              </button>
            </div>
          </div>
        </section>

        {/* 5-Day Journaling Carousel */}
        <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 md:p-10 shadow-lg shadow-blue-100/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                <PenTool className="w-6 h-6 text-indigo-500" />
                The 5-Day Deep Dive
              </h2>
              <p className="text-slate-500 mt-1 text-sm">Spend 10 minutes a day writing uncensored answers.</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button onClick={prevPrompt} disabled={currentPromptIndex === 0} className="p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextPrompt} disabled={currentPromptIndex === prompts.length - 1} className="p-2 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white/60">
            <div className="bg-indigo-50/80 border-b border-indigo-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
                  Day {prompts[currentPromptIndex].day} of 5
                </span>
                <h3 className="text-base font-semibold text-indigo-900">{prompts[currentPromptIndex].focus}</h3>
              </div>
              <div className="flex sm:hidden gap-2">
                <button onClick={prevPrompt} disabled={currentPromptIndex === 0} className="p-2 rounded-full bg-white border border-indigo-200 text-indigo-500 disabled:opacity-30">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextPrompt} disabled={currentPromptIndex === prompts.length - 1} className="p-2 rounded-full bg-white border border-indigo-200 text-indigo-500 disabled:opacity-30">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start gap-3 mb-6">
                <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-base text-slate-800 font-medium leading-8">
                  &ldquo;{prompts[currentPromptIndex].question}&rdquo;
                </p>
              </div>

              <textarea
                className="w-full h-44 p-5 bg-slate-50 border border-slate-200 rounded-2xl resize-none outline-none text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 transition-all text-sm leading-7"
                placeholder="Write honestly and without judgment..."
                value={journalEntries[currentPromptIndex] || ''}
                onChange={(e) => handleEntryChange(e.target.value)}
              />

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-slate-400 font-medium">
                  {currentPromptIndex + 1} / {prompts.length} Prompts
                </span>
                <button
                  onClick={handleSaveJournal}
                  disabled={!(journalEntries[currentPromptIndex]?.length > 0)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-950 text-white font-medium rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {isJournalSaved ? <><CheckCircle2 className="w-4 h-4" /> Saved</> : 'Save Reflection'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a href="/workbook/anxious-attachment/week-3" className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm">
            ← Back to Week 3
          </a>
          <a
            href="/workbook/anxious-attachment/week-5"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800 shadow-lg group"
          >
            Complete Week 4
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
