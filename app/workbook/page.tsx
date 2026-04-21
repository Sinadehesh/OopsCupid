'use client';

import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  Compass,
  Users,
  Magnet,
  EyeOff,
  HeartCrack,
  Wind,
  Lock,
} from 'lucide-react';

const WORKBOOKS = [
  {
    id: 'anxious-attachment',
    type: 'Workbook',
    eyebrow: 'Day 1 · Live Now',
    title: 'The Earned Security Workbook',
    description:
      'A 6-week actionable guide to healing anxious attachment, calming your nervous system, and cultivating inner peace. Includes breathing resets, journaling prompts, and somatic practices.',
    href: '/workbook/anxious-attachment',
    locked: false,
    badge: 'Free Preview',
    color: 'from-cyan-500 to-blue-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    badgeBg: 'bg-cyan-900',
    Icon: Wind,
  },
  {
    id: 'rewiring-attraction',
    type: 'Workbook',
    eyebrow: 'Workbook · Coming Soon',
    title: 'Rewiring Toxic Attraction',
    description:
      'Discover the subconscious patterns driving your attraction to unavailable people and learn to magnetize healthy, secure love instead.',
    href: '#',
    locked: true,
    badge: 'Trending',
    color: 'from-violet-500 to-fuchsia-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    badgeBg: 'bg-violet-900',
    Icon: Magnet,
  },
  {
    id: 'manipulation-defense',
    type: 'Playbook',
    eyebrow: 'Playbook · Coming Soon',
    title: 'The Manipulation Defense Playbook',
    description:
      'Arm yourself against gaslighting, love bombing, and narcissism. Learn to spot red flags early and trust your intuition again.',
    href: '#',
    locked: true,
    badge: 'Essential',
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-900',
    Icon: EyeOff,
  },
  {
    id: 'toxic-friendship-detox',
    type: 'Playbook',
    eyebrow: 'Playbook · Coming Soon',
    title: 'The Toxic Friendship Detox',
    description:
      'Identify energy vampires, set guilt-free boundaries, and gracefully distance yourself from unhealthy group dynamics without burning everything down.',
    href: '#',
    locked: true,
    badge: null,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-900',
    Icon: Users,
  },
  {
    id: 'breaking-sabotage',
    type: 'Workbook',
    eyebrow: 'Workbook · Coming Soon',
    title: 'Breaking the Sabotage Cycle',
    description:
      'Understand why you push good people away and use somatic tools to tolerate the vulnerability of healthy, secure relationships.',
    href: '#',
    locked: true,
    badge: null,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-900',
    Icon: ShieldCheck,
  },
  {
    id: 'infidelity-healing',
    type: 'Workbook',
    eyebrow: 'Workbook · Coming Soon',
    title: 'Navigating Betrayal Trauma',
    description:
      'A compassionate guide to processing the shock of infidelity, deciding whether to stay or go, and rebuilding your self-worth from the ground up.',
    href: '#',
    locked: true,
    badge: null,
    color: 'from-slate-500 to-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    badgeBg: 'bg-slate-800',
    Icon: HeartCrack,
  },
  {
    id: 'secure-dating-playbook',
    type: 'Playbook',
    eyebrow: 'Playbook · Coming Soon',
    title: 'The Secure Dating Playbook',
    description:
      'Stop abandoning yourself in the early stages of dating. A step-by-step framework to date with intention, clear boundaries, and real clarity about what you want.',
    href: '#',
    locked: true,
    badge: null,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-900',
    Icon: Compass,
  },
  {
    id: 'avoidant-attachment',
    type: 'Workbook',
    eyebrow: 'Workbook · Coming Soon',
    title: 'The Avoidant Attachment Workbook',
    description:
      'For those who shut down when love gets close. Learn why you pull away, how to stay present without losing yourself, and how to let people in safely.',
    href: '#',
    locked: true,
    badge: null,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-900',
    Icon: Heart,
  },
];

const FILTERS = ['All', 'Workbook', 'Playbook', 'Free'];

export default function WorkbooksHub() {
  const [filter, setFilter] = useState('All');

  const filtered = WORKBOOKS.filter((w) => {
    if (filter === 'All') return true;
    if (filter === 'Free') return !w.locked;
    return w.type === filter;
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfeff,_#ffffff_40%,_#f8fafc_100%)] text-slate-900">
      <style jsx global>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .float-card { animation: floatCard 7s ease-in-out infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.13),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,0.10),transparent_32%)]" />

        <div className="mx-auto max-w-5xl text-center fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-5 py-2.5 text-sm font-medium text-cyan-800 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Psychology-backed relationship guides
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
            Your toolkit for{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
              healthier love
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Actionable workbooks and playbooks built on attachment theory, somatic therapy, and real relationship psychology — not generic advice.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
            {[
              { label: 'Guides available', value: '8 workbooks & playbooks' },
              { label: 'Based on', value: 'Attachment theory & somatic work' },
              { label: 'Start today', value: 'First workbook is free' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-lg shadow-cyan-100/40 backdrop-blur"
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-1.5 font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'border border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300 hover:text-slate-900 backdrop-blur'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filtered.map((w, i) => (
              <a
                key={w.id}
                href={w.locked ? undefined : w.href}
                className={`group relative ${
                  w.locked ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-lg shadow-cyan-100/30 backdrop-blur-xl transition-all duration-300 ${
                    !w.locked && 'hover:shadow-2xl hover:shadow-cyan-100/50 hover:-translate-y-1'
                  }`}
                  style={i === 0 ? { animation: 'floatCard 7s ease-in-out infinite' } : {}}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${w.color}`} />

                  <div className="flex flex-col gap-5 p-8 sm:flex-row">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${w.iconBg}`}>
                        <w.Icon className={`h-7 w-7 ${w.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            {w.eyebrow}
                          </span>
                          {w.badge && (
                            <span className={`rounded-full ${w.badgeBg} px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white`}>
                              {w.badge}
                            </span>
                          )}
                          {w.locked && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                              <Lock className="h-3 w-3" />
                              Coming Soon
                            </span>
                          )}
                        </div>

                        <h3 className={`text-xl font-semibold text-slate-900 transition-colors ${
                          !w.locked && 'group-hover:text-cyan-700'
                        }`}>
                          {w.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {w.description}
                        </p>
                      </div>

                      <div>
                        {w.locked ? (
                          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-400">
                            <Lock className="h-4 w-4" />
                            Notify me when live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                            Start workbook
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Blurred overlay for locked cards */}
                  {w.locked && (
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/10 backdrop-blur-[1px]" />
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.10),transparent_40%)]" />
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/70 p-12 text-center shadow-2xl shadow-cyan-100/50 backdrop-blur-xl">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Take one of our free psychological assessments to discover your attachment style, relationship patterns, or friendship dynamics — we'll point you to the right guide.
          </p>
          <a
            href="/quizzes"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-slate-800"
          >
            Take a free quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
