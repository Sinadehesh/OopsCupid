'use client';

/**
 * Week 2 · Day 4 (Day 11) — the day that did not exist.
 *
 * Day 3 ends on the Needs Iceberg and links here; Day 5 links back here.
 * The route was never built, so anyone who paid for the bundle and worked
 * through week 2 in order hit a 404 in the middle of it and had to guess
 * their way forward.
 *
 * It belongs here on content grounds too: day 3 finds the need under the
 * protest behaviour, day 5 builds somewhere safe to feel it. Between the
 * two sits the part that actually changes anything — saying the need out
 * loud to the person it concerns.
 */

import React, { useState } from 'react';
import {
  MessageSquare, ArrowRight, Brain, Repeat, CheckCircle2,
  ArrowLeftRight, AlertTriangle, Sparkles,
} from 'lucide-react';

const CARD =
  'rounded-[2rem] bg-white/70 backdrop-blur-xl shadow-lg shadow-indigo-100/40 border border-white/60 p-8 md:p-10';

const TEXTAREA =
  'w-full bg-white/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 placeholder:text-slate-400 ' +
  'focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none shadow-inner transition-all';

/**
 * Each pair is a protest behaviour and the request it was standing in for.
 * They are deliberately unflattering: the point of the exercise is that the
 * protest version is recognisable, not that it is defensible.
 */
const TRANSLATIONS = [
  {
    protest: 'Going quiet and waiting to be asked what is wrong.',
    cost: 'They either miss it, or they learn that your silence is a test they can fail.',
    request: 'Something is bothering me and I would rather say it than sit on it. Ten minutes tonight?',
  },
  {
    protest: 'Reading the timestamps. Sending a second message about the first message.',
    cost: 'You get an answer about the messages instead of an answer about the worry.',
    request: 'I get anxious when a day goes by with nothing. A one-line text is enough — could you?',
  },
  {
    protest: 'Saying "it is fine" in a tone that makes it clear it is not fine.',
    cost: 'They are asked to guess, and are then wrong, which is a fight you both lose.',
    request: 'It is not fine, and I do not want to pretend. Here is the specific thing I minded.',
  },
  {
    protest: 'Bringing up the worst version of the future to see if they argue you out of it.',
    cost: 'Reassurance you extracted does not land. You will need it again in two hours.',
    request: 'I am spiralling about us and I know it is the anxiety talking. Will you sit with me?',
  },
];

export default function Week2Day4() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [request, setRequest] = useState('');

  const flip = (i: number) => setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));
  const allRevealed = TRANSLATIONS.every((_, i) => revealed[i]);

  /**
   * A request is easy to write vaguely and hard to write so that someone
   * could actually do it tomorrow. These three checks are the difference,
   * and showing them live is more use than marking the answer afterwards.
   */
  const words = request.trim().split(/\s+/).filter(Boolean).length;
  const checks = [
    {
      label: 'Names one specific thing',
      ok: words >= 6,
      hint: 'Six words is about the floor for a request that is not just a mood.',
    },
    {
      label: 'Asks, rather than accuses',
      ok: /\b(could|would|can|will|i would like|i need|please)\b/i.test(request) &&
          !/\byou always\b|\byou never\b/i.test(request),
      hint: 'Aim for "could you…" or "I need…". "You never…" starts a different conversation.',
    },
    {
      label: 'Small enough to do this week',
      ok: /\b(tonight|tomorrow|today|this week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|minutes|once|text|call)\b/i.test(request),
      hint: 'Attach it to a time or an action — "a text before bed", "ten minutes on Sunday".',
    },
  ];
  const passing = checks.filter((c) => c.ok).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50/30 to-slate-50 font-sans text-slate-800 pb-24">

      {/* Header */}
      <header className="relative overflow-hidden pt-20 pb-20 px-6">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 w-[360px] h-[360px] rounded-full bg-sky-400/20 blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase border border-indigo-200">
              Week 2 · Day 4 (Day 11)
            </span>
            <span className="text-indigo-500 text-sm font-semibold tracking-wide uppercase">
              The Earned Security Workbook
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 mb-5">
            The Direct{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">
              Request
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Yesterday you found the need under the behaviour. Today you say it out loud,
            in a sentence someone could actually act on.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">

        {/* 1. Attachment Insight */}
        <section className={CARD}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900">
                <Brain className="w-7 h-7 text-indigo-500 shrink-0" />
                Attachment Insight: Why Protest Feels Safer
              </h2>
              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>
                  A protest behaviour is a request with the risk taken out of it. Going
                  quiet, testing, hinting, escalating — each one is an attempt to get a
                  need met <em>without</em> having said what the need was. If it does not
                  arrive, nothing was refused. You were never turned down, because you
                  never asked.
                </p>
                <p>
                  That is the trade. Protest protects you from a specific no, and in
                  exchange it guarantees a general one: the person opposite is left
                  guessing, gets it wrong, and you both conclude that they do not care.
                </p>
                <p>
                  A direct request is riskier and enormously more efficient. It can be
                  answered. It can even be answered badly — and a bad answer to a clear
                  question tells you more about the relationship in one evening than six
                  months of hinting.
                </p>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-7 text-center">
                <Repeat className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <p className="text-sm font-semibold text-indigo-900 leading-relaxed">
                  Protest asks the room.
                  <br />
                  A request asks the person.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Translator */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <ArrowLeftRight className="w-7 h-7 text-indigo-500 shrink-0" />
            Practice 1: The Translator
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Four protest behaviours, each with the request it was standing in for. Turn
            over the ones you recognise. Recognising your own is the work here — you do
            not have to like it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TRANSLATIONS.map((item, i) => (
              <button
                key={i}
                onClick={() => flip(i)}
                aria-pressed={!!revealed[i]}
                className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 min-h-[220px] flex flex-col ${
                  revealed[i]
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                {revealed[i] ? (
                  <>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-200 mb-3">
                      What it costs
                    </span>
                    <p className="text-sm leading-relaxed text-indigo-50 mb-5">{item.cost}</p>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-200 mb-2">
                      The request underneath
                    </span>
                    <p className="text-base font-bold leading-relaxed mt-auto">
                      &ldquo;{item.request}&rdquo;
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">
                      Protest behaviour
                    </span>
                    <p className="text-base font-bold text-slate-800 leading-relaxed">
                      {item.protest}
                    </p>
                    <span className="mt-auto pt-6 text-xs font-bold text-indigo-500 inline-flex items-center gap-1.5">
                      Turn it over <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>

          {allRevealed && (
            <div className="mt-7 rounded-2xl bg-indigo-50 border border-indigo-100 p-6 flex gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-900 font-medium leading-relaxed">
                Notice that none of the requests are big. That is the pattern: the protest
                is usually enormous and the request it replaces is usually small enough to
                fit in a text message.
              </p>
            </div>
          )}
        </section>

        {/* 3. Build one */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <MessageSquare className="w-7 h-7 text-indigo-500 shrink-0" />
            Practice 2: Build One of Your Own
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Take the need you uncovered yesterday and write the request it deserves. The
            three checks update as you type. They are blunt on purpose — a request that
            fails them is one the other person cannot act on.
          </p>

          <div className="space-y-6">
            <div>
              <p className="block font-bold text-base text-slate-800 mb-3 leading-relaxed">
                Which protest behaviour do you use most, and what were you actually asking for?
              </p>
              <textarea
                className={TEXTAREA + ' h-32'}
                placeholder="e.g. I go quiet and wait to be noticed. What I want is for him to ask once, without me having to perform being upset…"
              />
            </div>

            <div>
              <p className="block font-bold text-base text-slate-800 mb-3 leading-relaxed">
                Write the request as one sentence you could actually say this week.
              </p>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className={TEXTAREA + ' h-28'}
                placeholder="e.g. When you are away could you text me once before bed? It stops me spiralling and it takes you ten seconds…"
              />

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Is it askable?
                  </span>
                  <span className="text-xs font-bold text-slate-500">{passing} of 3</span>
                </div>
                <ul className="space-y-3">
                  {checks.map((c) => (
                    <li key={c.label} className="flex gap-3">
                      {c.ok ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-bold ${c.ok ? 'text-emerald-700' : 'text-slate-600'}`}>
                          {c.label}
                        </p>
                        {!c.ok && (
                          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{c.hint}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="block font-bold text-base text-slate-800 mb-3 leading-relaxed">
                What are you afraid happens if you ask plainly and they say no?
              </p>
              <textarea
                className={TEXTAREA + ' h-32'}
                placeholder="e.g. That it proves I am too much, and that I will have handed him the proof myself…"
              />
            </div>
          </div>
        </section>

        {/* 4. Integration */}
        <section className={CARD}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900">
            <CheckCircle2 className="w-7 h-7 text-indigo-500 shrink-0" />
            Integration
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-5">
            Asking plainly is not the same as asking calmly, and today is not the day you
            will do it well. When, specifically, will you say the sentence you just wrote —
            and what will you do with the twenty minutes of anxiety that follow?
          </p>
          <textarea
            className={TEXTAREA + ' h-32'}
            placeholder="e.g. Sunday, after dinner, out loud, once. Then I go for a walk instead of watching for his reaction…"
          />
          <p className="text-[11px] font-bold text-slate-400 mt-4">
            Kept for the end-of-week review, which reads across your days.
          </p>
        </section>

        {/* Nav */}
        <section className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 gap-4">
          <a
            href="/workbook/anxious-attachment/week-2/day-3"
            className="text-slate-500 font-medium hover:text-slate-800 transition-colors text-sm"
          >
            ← Back to Day 10
          </a>
          <a
            href="/workbook/anxious-attachment/week-2/day-5"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-full transition-all group shadow-lg shadow-indigo-700/20 text-sm"
          >
            Continue to Day 12
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </section>

      </main>
    </div>
  );
}
