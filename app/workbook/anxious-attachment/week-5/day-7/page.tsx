'use client';

import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, Handshake, CheckCircle2, Info } from 'lucide-react';

export default function Week5Day7() {
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const bothFilled = reflection1.trim().length > 0 && reflection2.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/60 via-fuchsia-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-fuchsia-200/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold tracking-widest uppercase border border-violet-200">
              Week 5 &middot; Day 7 (Day 35)
            </span>
            <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            Integration &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Reflection
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Solidifying your new communication skills and breaking the Anxious-Avoidant cycle.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. The Diplomat Metaphor */}
        <section className="rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-violet-100/40 border border-white/60 p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900">
            <Handshake className="w-7 h-7 text-violet-600 shrink-0" />
            Attachment Insight: The Diplomat
          </h2>
          <div className="space-y-4 text-base text-slate-600 leading-relaxed">
            <p>
              In the past, your anxiety turned you into a soldier fighting a war for connection.
              You used <strong>Protest Behaviors</strong> to force love, which only caused your
              partners to build taller walls.
            </p>
            <p>
              This week, you took off the armor and became the <strong>Diplomat</strong>. A
              diplomat doesn&rsquo;t attack; they use the O.M.A. framework (Observation, Meaning,
              Ask). They don&rsquo;t strike while the iron is molten hot; they wait 24 hours.
            </p>
            <div className="bg-violet-50/80 border border-violet-100 rounded-2xl p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
              <p className="text-sm text-violet-900 leading-relaxed">
                Most importantly, the Diplomat knows how to repair. By mastering the{' '}
                <strong>3 R&rsquo;s</strong> (Reflect, Responsibility, Roadmap), you proved that
                a fight does not equal abandonment. A repaired rupture actually makes the bond{' '}
                <em>stronger</em>.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Week 5 Review Journal */}
        <section className="rounded-[2rem] bg-slate-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800/60 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl" />

          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
            <CheckCircle2 className="w-7 h-7 text-fuchsia-400 shrink-0" />
            Week 5 Review
          </h2>

          <div className="space-y-6 relative z-10">
            {/* Q1 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8">
              <label className="block text-sm font-bold text-slate-300 mb-4 leading-relaxed">
                1. When you feel the overwhelming urge to pursue an avoidant partner, what is
                your new plan to &ldquo;Break the Cycle&rdquo;?
              </label>
              <textarea
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-5 text-slate-200 text-sm leading-relaxed focus:ring-2 focus:ring-violet-400 outline-none resize-none h-36 placeholder:text-slate-600"
                placeholder="e.g., I will step into another room, do my 4-6 breathing, and wait at least an hour before texting..."
                value={reflection1}
                onChange={e => setReflection1(e.target.value)}
              />
            </div>

            {/* Q2 */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 md:p-8">
              <label className="block text-sm font-bold text-slate-300 mb-4 leading-relaxed">
                2. Of the 3 R&rsquo;s of Repair (Reflect, Responsibility, Roadmap), which one is
                the hardest for you, and why?
              </label>
              <textarea
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-5 text-slate-200 text-sm leading-relaxed focus:ring-2 focus:ring-violet-400 outline-none resize-none h-36 placeholder:text-slate-600"
                placeholder="e.g., Taking pure responsibility is hard because I want to justify my actions by saying 'But you started it'..."
                value={reflection2}
                onChange={e => setReflection2(e.target.value)}
              />
            </div>
          </div>

          {/* Complete CTA */}
          <div className="mt-10 flex justify-center relative z-10">
            {!isCompleted ? (
              <button
                onClick={() => setIsCompleted(true)}
                disabled={!bothFilled}
                className="inline-flex items-center gap-2 px-12 py-4 bg-fuchsia-500 hover:bg-fuchsia-400 disabled:opacity-40 disabled:hover:scale-100 text-white font-extrabold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(217,70,239,0.25)] text-sm"
              >
                <Award className="w-5 h-5" />
                Mark Week 5 Complete
              </button>
            ) : (
              <div className="w-full max-w-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] p-10 text-center border border-white/10 shadow-2xl">
                <ShieldCheck className="w-14 h-14 text-white mx-auto mb-5 drop-shadow" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                  Communication Upgraded.
                </h3>
                <p className="text-fuchsia-100 text-sm leading-relaxed max-w-sm mx-auto">
                  You have successfully completed Week 5. You now have the tools to break toxic
                  cycles and repair safely. You are ready for the Finale: Week 6.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-5/day-6"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 34
          </a>
          <a
            href="/workbook/anxious-attachment/week-6"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all group shadow-xl text-sm"
          >
            Start Week 6 (Finale)
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
