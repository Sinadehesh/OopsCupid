'use client';

import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, Gem, CheckCircle2, Brain } from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-rose-100/40 border border-white/60 p-8 md:p-12';

export default function Week2Day7() {
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const canComplete = reflection1.trim().length > 0 && reflection2.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-pink-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase border border-rose-200">
              Week 2 · Day 7 (Day 14)
            </span>
            <span className="text-rose-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Integration{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              &amp; Reflection
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Solidifying your relationship with your Inner Child.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Gem className="w-7 h-7 text-rose-500 shrink-0" />
            Attachment Insight: The Trust Ledger
          </h2>
          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              Your inner child has been running the show for a long time because they didn&rsquo;t trust
              you (the Adult) to keep them safe. Why would they? Every time you abandoned your own
              needs to please someone else, you abandoned the inner child all over again.
            </p>
            <p>
              Reparenting is not a one-time event. It is a <strong>Trust Ledger</strong>. Every
              time you pause, breathe, validate their fear, and handle the trigger as a capable
              adult, you make a massive deposit. Over time, the child realises they don&rsquo;t have
              to panic anymore &mdash; because you are in charge.
            </p>
          </div>

          <div className="mt-6 bg-rose-50/80 border border-rose-100 rounded-2xl p-4 flex items-start gap-3">
            <Brain className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p className="text-sm text-rose-900 leading-relaxed">
              <strong>This week you learned:</strong> to hear the Inner Critic without becoming it,
              to hold Two Chairs, to build a Safe Room, and to give your soldier permission to rest.
              That&rsquo;s four enormous deposits.
            </p>
          </div>
        </section>

        {/* 2. Week 2 Review Journal */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
            <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
            Week 2 Review
          </h2>

          <div className="space-y-6 relative z-10">
            {/* Question 1 */}
            <div className="bg-slate-900/70 p-7 rounded-2xl border border-slate-800/80">
              <label
                htmlFor="q1"
                className="block font-bold text-base text-white mb-4 leading-relaxed"
              >
                1. When your &ldquo;Guard Dog&rdquo; (Inner Critic) attacks you, what is it usually trying
                to protect you from?
              </label>
              <textarea
                id="q1"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-5 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-rose-500 outline-none resize-none h-36 text-sm leading-relaxed"
                placeholder="e.g., It criticises me so that no one else can. It’s trying to protect me from rejection…"
                value={reflection1}
                onChange={(e) => setReflection1(e.target.value)}
              />
            </div>

            {/* Question 2 */}
            <div className="bg-slate-900/70 p-7 rounded-2xl border border-slate-800/80">
              <label
                htmlFor="q2"
                className="block font-bold text-base text-white mb-4 leading-relaxed"
              >
                2. If your inner child truly believed you (the Adult) would protect them, how
                would your relationships feel different?
              </label>
              <textarea
                id="q2"
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-5 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-rose-500 outline-none resize-none h-36 text-sm leading-relaxed"
                placeholder="e.g., I wouldn’t panic when someone needs space. I would feel peaceful…"
                value={reflection2}
                onChange={(e) => setReflection2(e.target.value)}
              />
            </div>
          </div>

          {/* Completion */}
          <div className="mt-10 text-center relative z-10">
            {!isCompleted ? (
              <button
                onClick={() => canComplete && setIsCompleted(true)}
                disabled={!canComplete}
                className="px-12 py-5 bg-rose-500 hover:bg-rose-400 disabled:opacity-40 disabled:hover:scale-100 text-white font-extrabold rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(244,63,94,0.25)] text-base"
              >
                Mark Week 2 Complete
              </button>
            ) : (
              <div className="animate-in zoom-in duration-500 p-10 bg-gradient-to-br from-emerald-500 to-emerald-700 border-4 border-white/20 rounded-[2rem] text-white shadow-2xl">
                <ShieldCheck className="w-16 h-16 text-white mx-auto mb-5 drop-shadow-md" />
                <h3 className="text-3xl font-black mb-3 drop-shadow-sm">Inner Child Seen.</h3>
                <p className="text-emerald-50 text-base font-medium max-w-md mx-auto leading-relaxed">
                  You have successfully completed Week 2. You are stepping out of the helpless
                  past and into the capable present. You are ready for Week 3.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Week 2 Summary Pills */}
        <section className={CARD}>
          <h2 className="text-lg font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Award className="w-6 h-6 text-rose-500 shrink-0" />
            What you built this week
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { day: 8,  label: 'Heard the Inner Critic',       color: 'bg-violet-100 text-violet-700 border-violet-200' },
              { day: 9,  label: 'Named the Guard Dog',          color: 'bg-blue-100   text-blue-700   border-blue-200'   },
              { day: 10, label: 'Felt the Fear in Your Body',   color: 'bg-pink-100   text-pink-700   border-pink-200'   },
              { day: 11, label: 'Sat in Two Chairs',            color: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' },
              { day: 12, label: 'Built the Safe Room',          color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
              { day: 13, label: 'Relieved the Soldier',         color: 'bg-amber-100  text-amber-700  border-amber-200'  },
              { day: 14, label: 'Integrated & Reflected',       color: 'bg-rose-100   text-rose-700   border-rose-200'   },
            ].map(({ day, label, color }) => (
              <span
                key={day}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold ${color}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Day {day}: {label}
              </span>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-6"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 13
          </a>
          <a
            href="/workbook/anxious-attachment/week-3"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-lg text-sm"
          >
            Start Week 3
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
