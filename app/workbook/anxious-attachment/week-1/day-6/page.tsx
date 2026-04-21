'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon, ArrowRight, PenTool, CheckCircle2,
  History, MessageSquareHeart, HandHeart,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-10';

export default function Day6() {
  const [journal, setJournal] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-28 px-6">
        {/* background image overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2500&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            width={2500} height={1667}
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/80 to-rose-900/60" />
        </div>

        {/* ambient glow orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 right-0 w-80 h-80 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-rose-900/60 text-rose-200 text-xs font-bold tracking-widest uppercase border border-rose-700/50">
              Week 1 · Day 6
            </span>
            <span className="text-rose-300 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white mb-5">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300">
              Loud Child
            </span>
          </h1>
          <p className="text-rose-200 text-lg md:text-xl max-w-2xl leading-relaxed">
            Connecting with the true origin of your relationship anxiety.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-16 space-y-10 relative z-20">

        {/* ── 1. The Metaphor ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <History className="w-7 h-7 text-rose-500 shrink-0" />
            Attachment Insight: The Loud Child
          </h2>

          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Anxious attachment typically forms when a caregiver is <em>inconsistent</em>. Sometimes
              they were warm and attentive; other times cold, overwhelmed, absent, or punishing.
            </p>
            <p>
              Because you never knew which version of the parent you were going to get, you learned a
              very specific, brilliant survival strategy:{' '}
              <strong>
                You had to become "loud" (emotionally hyper-activated) to guarantee your needs were
                met.
              </strong>{' '}
              You had to cry louder, perform better, or cling tighter to ensure you weren't forgotten.
            </p>
          </div>

          <div className="mt-6 bg-rose-50/80 border border-rose-100 rounded-2xl p-6 flex items-start gap-4">
            <HandHeart className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-rose-900 text-base mb-1">The Adult Realization</h3>
              <p className="text-rose-800 text-sm leading-relaxed">
                When you feel the overwhelming panic of abandonment today, it is not your logical adult
                self reacting. It is this terrified inner child crying out for consistency. We must
                speak directly to them.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Action Exercise ── */}
        <section className="rounded-[2rem] bg-rose-50/80 backdrop-blur-xl border border-rose-100 shadow-lg shadow-rose-100/40 p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-rose-900">
            <MessageSquareHeart className="w-7 h-7 text-rose-500 shrink-0" />
            Observation &amp; Compassion
          </h2>
          <p className="text-rose-700 text-base leading-relaxed mb-8 max-w-2xl">
            Look closely at a childhood photo of yourself (ages 4-10). What emotion do you see in
            their eyes? Were they allowed to have needs? Write a letter to them — tell them they are
            safe now, and that you (the capable adult) will protect them so they don't have to be
            "loud" anymore.
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Photo placeholder */}
            <div className="md:w-1/3 shrink-0">
              <div className="w-full aspect-[4/5] bg-white/80 rounded-3xl border-2 border-dashed border-rose-300 flex flex-col items-center justify-center text-center p-6 shadow-inner hover:border-rose-500 transition-colors cursor-default group">
                <ImageIcon className="w-12 h-12 mb-3 text-rose-300 group-hover:text-rose-400 transition-colors" />
                <p className="text-xs font-semibold text-rose-700 leading-relaxed">
                  Place a photo of yourself<br />(ages 4–10) here on your desk<br />while you write.
                </p>
              </div>
            </div>

            {/* Letter card */}
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[1.75rem] border border-rose-200 shadow-xl p-6 md:p-8">
              <h3 className="font-bold text-rose-900 flex items-center gap-2 mb-5 text-lg">
                <PenTool className="w-5 h-5 text-rose-500 shrink-0" />
                Write to them
              </h3>

              <textarea
                className={
                  'w-full bg-rose-50/60 border border-rose-200 rounded-2xl p-5 outline-none ' +
                  'focus:ring-2 focus:ring-rose-400 focus:border-transparent resize-none h-56 ' +
                  'text-slate-700 text-base font-serif italic shadow-inner placeholder:text-rose-300 ' +
                  'transition-all leading-relaxed'
                }
                placeholder="Dear younger me, I am looking at you right now and I see…"
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
              />

              <div className="flex justify-end mt-5">
                <button
                  onClick={handleSave}
                  disabled={!journal.trim()}
                  className={
                    'inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm ' +
                    'transition-all shadow-md disabled:opacity-40 ' +
                    (isSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-600/20 hover:scale-105')
                  }
                >
                  {isSaved ? (
                    <><CheckCircle2 className="w-5 h-5" /> Safely Stored</>
                  ) : (
                    'Save Letter'
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-1/day-5"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 5
          </a>
          <a
            href="/workbook/anxious-attachment/week-1/day-7"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all group shadow-lg shadow-indigo-600/20 text-sm"
          >
            Continue to Day 7
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
