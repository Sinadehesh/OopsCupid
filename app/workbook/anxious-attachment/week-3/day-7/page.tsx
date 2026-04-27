'use client';

import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, Ruler, CheckCircle2 } from 'lucide-react';

export default function Week3Day7() {
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const canComplete = reflection1.trim().length > 0 && reflection2.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-teal-300/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase border border-emerald-200">
              Week 3 &middot; Day 7 (Day 21)
            </span>
            <span className="text-emerald-600 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Integration{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              &amp; Reflection
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Solidifying your property lines and embracing False Guilt.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-emerald-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Ruler className="w-7 h-7 text-emerald-600 shrink-0" />
            Attachment Insight: The Architect
          </h2>
          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              For the first half of your life, you didn&rsquo;t have fences. You let people walk
              all over your emotional lawn because you were terrified that if you asked them to stay
              on the path, they would leave entirely.
            </p>
            <p>
              This week, you became the <strong>Architect</strong>. You learned that healthy
              boundaries don&rsquo;t keep love out; they protect the house so that love can
              actually thrive there.
            </p>
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-5 flex items-start gap-3 mt-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-900 leading-relaxed">
                You now know the difference between True Guilt (harm) and False Guilt
                (disappointing someone by holding a limit). You understand the
                &ldquo;Extinction Burst&rdquo; (The Weather). Most importantly, you know that{' '}
                <strong>stress and burnout are not your only valid reasons to say no.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 2. Week Review Journal */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
            <CheckCircle2 className="w-7 h-7 text-teal-400 shrink-0" />
            Week 3 Review
          </h2>

          <div className="space-y-6 relative z-10">
            <div className="bg-slate-900/70 p-6 md:p-8 rounded-2xl border border-slate-800">
              <label className="block font-bold text-base text-white mb-3 leading-relaxed">
                1. What is one specific boundary you are going to draw this upcoming week, even if
                it causes &ldquo;False Guilt&rdquo;?
              </label>
              <textarea
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-5 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-400 outline-none resize-none h-36 text-sm leading-relaxed"
                placeholder="e.g., I am going to tell my boss I cannot answer emails after 6pm\u2026"
                value={reflection1}
                onChange={e => setReflection1(e.target.value)}
              />
            </div>

            <div className="bg-slate-900/70 p-6 md:p-8 rounded-2xl border border-slate-800">
              <label className="block font-bold text-base text-white mb-3 leading-relaxed">
                2. When you get pushback (The Storm), how will you use your &ldquo;Adult Chair&rdquo; to
                tolerate the discomfort without caving?
              </label>
              <textarea
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-5 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-400 outline-none resize-none h-36 text-sm leading-relaxed"
                placeholder="e.g., I will use my 4\u20136 breathing anchor and remind myself that their disappointment is not danger\u2026"
                value={reflection2}
                onChange={e => setReflection2(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-10 text-center relative z-10">
            {!isCompleted ? (
              <button
                onClick={() => setIsCompleted(true)}
                disabled={!canComplete}
                className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:scale-100 text-white font-extrabold text-base rounded-full hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.25)]"
              >
                Mark Week 3 Complete
              </button>
            ) : (
              <div className="animate-in zoom-in duration-500 p-10 bg-gradient-to-br from-teal-500 to-emerald-600 border-2 border-white/20 rounded-[2.5rem] text-white shadow-2xl">
                <ShieldCheck className="w-16 h-16 text-white mx-auto mb-5 drop-shadow-md" />
                <h3 className="text-3xl font-black mb-3 drop-shadow-sm">Boundaries Established.</h3>
                <p className="text-emerald-50 text-base font-medium max-w-md mx-auto leading-relaxed">
                  You have successfully completed Week 3. You are protecting your inner child and
                  securing your property line. You are halfway to Earned Security.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-3/day-6"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 20
          </a>
          <a
            href="/workbook/anxious-attachment/week-4"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Start Week 4
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
