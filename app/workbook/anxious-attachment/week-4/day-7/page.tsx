'use client';

import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, Library, CheckCircle2 } from 'lucide-react';

export default function Week4Day7() {
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const bothFilled = reflection1.trim().length > 0 && reflection2.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50/60 via-slate-50 to-blue-50/30 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-blue-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold tracking-widest uppercase border border-cyan-200">
              Week 4 &middot; Day 7 (Day 28)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Integration &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Reflection
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Archiving the old story and stepping into narrative coherence.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. The Library Insight */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-cyan-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Library className="w-7 h-7 text-cyan-600 shrink-0" />
            Attachment Insight: The Library
          </h2>
          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              In Mary Main&rsquo;s groundbreaking research on the Adult Attachment Interview
              (AAI), she discovered something incredible: What makes someone securely attached
              is not having a perfect childhood. It is having a{' '}
              <strong>Coherent Narrative</strong>.
            </p>
            <p>
              Secure people are like librarians who have properly filed away their history.
              They can look at past pain objectively, without getting sucked back into it.
            </p>
            <div className="bg-cyan-50/80 border border-cyan-100 rounded-2xl p-6 flex items-start gap-3 mt-2">
              <Award className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <p className="text-sm text-cyan-900 leading-relaxed">
                This week, you took your messy, panicked, black-and-white journals and edited
                them. You separated Facts from Story. You dropped the Utility Belt. You stepped
                out of the scene and into the Director&rsquo;s Chair.{' '}
                <strong>You are rewriting the story.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 2. Week 4 Review Journal */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white relative z-10">
            <CheckCircle2 className="w-7 h-7 text-cyan-400 shrink-0" />
            Week 4 Review
          </h2>

          <div className="space-y-6 relative z-10">
            {/* Q1 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8">
              <label className="block font-bold text-base text-white mb-4 leading-snug">
                1. When your anxiety creates a &ldquo;Crystal Ball Story&rdquo; this week,
                what is one &ldquo;Camera Fact&rdquo; you can use to ground yourself?
              </label>
              <textarea
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-5 text-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none resize-none h-36 text-sm leading-relaxed placeholder:text-slate-600"
                placeholder="e.g., The story says they hate me, but the camera fact says they are just quietly watching TV\u2026"
                value={reflection1}
                onChange={e => setReflection1(e.target.value)}
              />
            </div>

            {/* Q2 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8">
              <label className="block font-bold text-base text-white mb-4 leading-snug">
                2. If you truly believed you did not need to wear the &ldquo;Utility Belt&rdquo;
                to be loved, what is one emotional burden you would drop today?
              </label>
              <textarea
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-5 text-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none resize-none h-36 text-sm leading-relaxed placeholder:text-slate-600"
                placeholder="e.g., I would stop trying to anticipate my partner\u2019s bad moods before they happen\u2026"
                value={reflection2}
                onChange={e => setReflection2(e.target.value)}
              />
            </div>
          </div>

          {/* CTA / Completion */}
          <div className="mt-10 flex justify-center relative z-10">
            {!isCompleted ? (
              <button
                onClick={() => setIsCompleted(true)}
                disabled={!bothFilled}
                className="px-12 py-5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-extrabold text-base rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)]"
              >
                Mark Week 4 Complete
              </button>
            ) : (
              <div className="w-full p-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2rem] text-white text-center shadow-2xl border border-white/10">
                <ShieldCheck className="w-16 h-16 text-white mx-auto mb-5 drop-shadow" />
                <h3 className="text-3xl font-black mb-3">Narrative Reclaimed.</h3>
                <p className="text-cyan-50 text-base font-medium max-w-lg mx-auto leading-relaxed">
                  You have successfully completed Week 4. You are no longer at the mercy of
                  your cognitive distortions. You are ready for Week 5.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-4/day-6"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 27
          </a>
          <a
            href="/workbook/anxious-attachment/week-5"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Start Week 5
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
