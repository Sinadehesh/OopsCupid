'use client';

import React, { useState } from 'react';
import {
  Award,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Info,
} from 'lucide-react';

const MANIFESTO_LINES = [
  'I commit to being the Capable Adult for my inner child.',
  'I accept that my anxiety is a biological response, not a character flaw, and I will treat myself with deep compassion when I stumble.',
  'I will not use stress or burnout as my only boundary. I am allowed to say \u201cno\u201d simply because I want to.',
  'I will seek out Safe Harbors, and I will tolerate the peaceful \u201cboredom\u201d of healthy love without manufacturing a storm.',
];

export default function Week6Day7() {
  const [signature, setSignature] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.06),transparent_40%)]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-4">
            Week 6 &middot; Day 7 (Day 42 &mdash; The Finale)
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              Security Manifesto
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            You have reached the end of 6 weeks of foundational work. It is time to step into your new blueprint.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* Graduation Insight */}
        <section className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-white/70">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-900">
            <Award className="w-7 h-7 text-emerald-500 mr-3 shrink-0" />
            Attachment Insight: The Graduation
          </h2>
          <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
            <p>
              Over the last 42 days, you have done the hardest psychological work a person can do. You faced the
              terrifying void of abandonment and realized <strong className="text-slate-800">you did not die</strong>.
            </p>
            <p>
              You learned how to manually hit the brakes on your nervous system. You learned how to comfort the
              loud, scared child inside of you. You learned how to draw property lines, say &ldquo;no&rdquo; even
              when it caused false guilt, and translate your panic into clean, secure communication.
            </p>
          </div>
          <div className="mt-6 bg-emerald-50/80 border border-emerald-100 rounded-2xl p-6 flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-900 leading-relaxed">
              <strong>Your brain is physically altered.</strong> You have laid down new neural pathways. You are no
              longer acting out of the old blueprint. You are building a home in the new one.
            </p>
          </div>
        </section>

        {/* The Manifesto */}
        <section className="bg-slate-950 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/6 rounded-full blur-3xl" />

          <h2 className="text-2xl font-bold text-white mb-10 flex items-center justify-center gap-3 relative z-10 text-center">
            <HeartHandshake className="w-7 h-7 text-emerald-400 shrink-0" />
            The Earned Security Manifesto
          </h2>

          {/* Manifesto Card */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10">

              {/* Vow lines */}
              <div className="space-y-5 mb-8">
                {MANIFESTO_LINES.map((line, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 shrink-0 rounded-full border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-slate-200 text-base md:text-lg leading-relaxed font-light italic">{line}</p>
                  </div>
                ))}
              </div>

              {/* Centrepiece affirmation */}
              <div className="border-t border-white/10 pt-6 text-center">
                <p className="text-emerald-300 text-lg md:text-xl font-bold tracking-wide">
                  I am inherently worthy of love, exactly as I am.
                </p>
              </div>

              {/* Signature / Completion */}
              <div className="border-t border-white/10 mt-8 pt-8">
                {!isCompleted ? (
                  <div className="space-y-5">
                    <p className="text-xs font-bold text-slate-400 text-center uppercase tracking-[0.2em]">
                      Sign your name to seal your new blueprint
                    </p>
                    <input
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Sign here&hellip;"
                      className="w-full text-center text-3xl md:text-4xl font-serif italic bg-transparent border-b border-emerald-500/40 focus:border-emerald-400 outline-none py-4 text-white placeholder:text-slate-600"
                    />
                    <button
                      onClick={() => setIsCompleted(true)}
                      disabled={!signature.trim()}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-xl transition-all disabled:opacity-30 shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      Seal the Manifesto
                    </button>
                  </div>
                ) : (
                  <div className="text-center animate-in slide-in-from-bottom-4 duration-700 space-y-4">
                    <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Manifesto Sealed</h3>
                    <p className="text-base text-slate-300 leading-relaxed">
                      Congratulations,{' '}
                      <strong className="text-emerald-300">{signature}</strong>.
                      {' '}You have completed the 6-Week Anxious Attachment Program.
                    </p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-emerald-400 font-semibold">42 days. Done.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-6/day-6"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            &larr; Back to Day 41
          </a>
          <a
            href="/workbook"
            className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all shadow-xl hover:scale-105 text-sm group"
          >
            <BookOpen className="w-5 h-5" />
            Return to Workbook Hub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </main>
    </div>
  );
}
