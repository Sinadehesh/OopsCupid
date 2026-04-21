'use client';

import React, { useState } from 'react';
import { Award, ArrowRight, Dumbbell, CalendarCheck } from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const DARK_TEXTAREA =
  'w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-5 text-slate-200 ' +
  'placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-400 focus:border-transparent ' +
  'outline-none resize-none h-40 text-base leading-relaxed transition-all';

export default function Day7() {
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const bothFilled = reflection1.trim().length > 0 && reflection2.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50/20 to-slate-50 font-sans text-slate-800 pb-24">

      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 1 · Day 7
            </span>
            <span className="text-indigo-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Integration &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
              Reflection
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Solidifying your new foundation of emotional safety.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* ── 1. The Metaphor ── */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Dumbbell className="w-7 h-7 text-indigo-500 shrink-0" />
            Attachment Insight: The Emotional Gym
          </h2>

          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              You cannot heal an insecure attachment style through logic alone. If you could, you
              would have already talked yourself out of your anxiety.
            </p>
            <p>
              Think of your nervous system like a muscle. For years, you have been doing "bicep
              curls" for anxiety. Your hyper-vigilance muscle is massive, and your self-soothing
              muscle is weak. This week, we went to the emotional gym.
            </p>
          </div>

          <div className="mt-6 bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5">
            <p className="text-indigo-900 text-sm leading-relaxed">
              By learning to pause your <strong>Protest Behaviors</strong>, map your{' '}
              <strong>Window of Tolerance</strong>, and apply mechanical brakes via your{' '}
              <strong>Vagus Nerve</strong>, you have laid the most critical foundation for Earned
              Secure Attachment. You are proving to your body that you are safe, even when someone
              else pulls away.
            </p>
          </div>
        </section>

        {/* ── 2. Week Review ── */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-10 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <CalendarCheck className="w-7 h-7 text-emerald-400 shrink-0" />
              Week 1 Review
            </h2>

            <div className="space-y-6">
              {/* Q1 */}
              <div className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/60">
                <label className="block font-bold text-base text-white mb-4 leading-relaxed">
                  1. What physical sign in your body is your absolute earliest indicator that you are
                  slipping into the "Too Hot" Hyperarousal zone?
                </label>
                <textarea
                  className={DARK_TEXTAREA}
                  placeholder="e.g. My chest gets incredibly tight, my jaw clenches, I feel an uncontrollable urge to reach for my phone…"
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                />
              </div>

              {/* Q2 */}
              <div className="bg-slate-800/70 p-6 rounded-2xl border border-slate-700/60">
                <label className="block font-bold text-base text-white mb-4 leading-relaxed">
                  2. Which somatic tool (Breathing Anchor, 5-4-3-2-1, Humming, or Cold Water)
                  worked best for you to interrupt the spiral this week?
                </label>
                <textarea
                  className={DARK_TEXTAREA}
                  placeholder="e.g. The 5-4-3-2-1 method really helped pull me out of my head and back into reality…"
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                />
              </div>
            </div>

            {/* Completion CTA */}
            <div className="mt-10 text-center">
              {!isCompleted ? (
                <button
                  onClick={() => setIsCompleted(true)}
                  disabled={!bothFilled}
                  className={
                    'inline-flex items-center gap-2 px-10 py-4 rounded-full font-extrabold text-base ' +
                    'transition-all shadow-[0_0_30px_rgba(16,185,129,0.25)] ' +
                    'bg-emerald-500 text-white hover:bg-emerald-400 ' +
                    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105'
                  }
                >
                  Mark Week 1 Complete
                </button>
              ) : (
                <div className="p-10 bg-gradient-to-br from-emerald-500 to-teal-600 border border-white/10 rounded-[2rem] text-white shadow-2xl">
                  <Award className="w-16 h-16 text-white mx-auto mb-5 drop-shadow-md" />
                  <h3 className="text-3xl font-black mb-3 tracking-tight">Masterful Work.</h3>
                  <p className="text-emerald-50 text-base leading-relaxed max-w-md mx-auto">
                    You have successfully completed the foundation of somatic regulation. You are now
                    ready to begin <strong>Week 2: Healing the Inner Child</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Navigation ── */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-1/day-6"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 6
          </a>
          <a
            href="/workbook/anxious-attachment/week-2"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all group shadow-lg shadow-slate-900/20 text-sm"
          >
            Start Week 2
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
