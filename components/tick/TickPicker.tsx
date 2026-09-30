"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, LifeBuoy } from "lucide-react";
import { scoreTick, tickTestBySlug, nextQuickTest, type TickResult } from "@/lib/quizzes/tickTests";
import { usePremiumAccess } from "@/lib/usePremiumAccess";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import CheckoutButton from "@/components/offers/CheckoutButton";
import ProgramOffer from "@/components/program/ProgramOffer";
import MoreQuickTests from "./MoreQuickTests";

/**
 * One screen, tap to select, same as /things-he-says: someone from a video
 * needs to see the whole grid at once, because reading sixteen familiar
 * sentences together is the hook.
 *
 * The result page is ordered for the two things a visitor might do next:
 * pay for the full picture, or keep going for free. Both paths stay on the
 * site: the free route is the full test (where the report lives), the
 * programme's free week, and another forty-second test.
 */
export default function TickPicker({ slug }: { slug: string }) {
  const test = tickTestBySlug(slug)!;
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<TickResult | null>(null);
  const [started, setStarted] = useState(false);
  const { granted } = usePremiumAccess();
  const seconds = test.items.length <= 12 ? 30 : 40;
  const next = nextQuickTest(slug);

  const toggle = (id: string) => {
    if (!started) {
      setStarted(true);
      trackQuizStart(slug);
    }
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const show = () => {
    const r = scoreTick(test, selected);
    setResult(r);
    trackQuizComplete(slug, test.items.length);
    trackResultView(slug, r.band);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    const strong = result.band === "pattern" || result.band === "system";
    return (
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-3">
          {test.emoji} Your result
        </p>
        <h1 className="text-3xl md:text-[2.6rem] font-black text-slate-900 leading-tight tracking-tight mb-4">
          {result.headline}
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">{result.verdict}</p>

        {result.support && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 mb-8 flex gap-3.5">
            <LifeBuoy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-900 font-medium leading-relaxed">{result.support}</p>
          </div>
        )}

        {/* The paid step comes straight after the verdict when there is
            enough for a report to be about: that is the moment she most
            wants to know more. */}
        {strong && (granted ? <Unlocked test={test} /> : <ReportOffer test={test} />)}

        {/* Straight on to the next one: a finished test is the moment
            she is most likely to take another. */}
        <Link
          href={`/${next.slug}`}
          className="flex items-center gap-4 rounded-3xl p-5 mb-8 active:scale-[0.98] transition-transform shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          style={{ backgroundColor: next.bg, color: next.fg }}
        >
          <span className="text-4xl shrink-0" aria-hidden="true">{next.emoji}</span>
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-60 mb-0.5">
              Up next{next.fun ? " · just for fun" : ""}
            </span>
            <span className="block text-xl font-black leading-snug">{next.short}</span>
          </span>
          <ArrowRight className="w-6 h-6 shrink-0" />
        </Link>

        {result.groups.length > 0 && (
          <div className="space-y-3 mb-10">
            <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
              What you picked, and what it means
            </h2>
            {result.groups.map((g) => (
              <div key={g.key} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_2px_20px_rgba(15,23,42,0.05)]">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-black text-slate-900 text-lg">{g.label}</h3>
                  <span className="shrink-0 text-xs font-black text-slate-400">{g.items.length} picked</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-3">{g.does}</p>
                <ul className="space-y-1">
                  {g.items.map((i) => (
                    <li key={i.id} className="text-slate-500 font-bold text-[15px]">· {i.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!strong && result.band !== "none" && (granted ? <Unlocked test={test} /> : <ReportOffer test={test} />)}

        <div className="rounded-3xl bg-[#0E1621] text-white p-7 md:p-9 mb-8">
          <h2 className="text-2xl font-black mb-3 leading-snug">A few taps can only count.</h2>
          <p className="text-white/70 font-medium leading-relaxed mb-6">
            The full test asks how often, since when and what happens afterwards, which is what tells a bad
            stretch from a pattern. It is free and your result appears on screen.
          </p>
          <Link
            href={test.full.href}
            className="inline-flex items-center justify-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg px-7 py-4 rounded-2xl transition-colors"
          >
            {test.full.label} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {result.band !== "none" && <ProgramOffer quizPath={test.full.href} className="!px-0 !py-4" />}

        <ResultShare
          quiz={test.short}
          quizPath={`/${test.slug}`}
          title={result.headline}
          score={result.count}
          scoreLabel={`of ${result.total}`}
        />

        <MoreQuickTests exclude={test.slug} />

        <button
          onClick={() => { setResult(null); setSelected([]); }}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Start again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-8 md:py-14">
      <div className="text-center mb-7 md:mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-3">
          {test.emoji} {test.fun ? `Just for fun · ${seconds} seconds` : `Takes about ${seconds} seconds`}
        </p>
        <h1 className="text-[32px] md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-4">
          {test.question}
        </h1>
        <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">{test.intro}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
        {test.items.map((i) => {
          const on = selected.includes(i.id);
          return (
            <button
              key={i.id}
              onClick={() => toggle(i.id)}
              aria-pressed={on}
              className={`text-left px-4 py-3.5 rounded-2xl border-2 font-bold leading-snug transition-all min-h-[60px] flex items-center gap-3 active:scale-[0.98] ${
                on ? "bg-slate-900 border-slate-900 text-white shadow-lg" : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              <span className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center ${on ? "bg-[#EC8A66] border-[#EC8A66]" : "border-slate-300"}`}>
                {on && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
              {i.text}
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-3 z-10">
        <button
          onClick={show}
          className="w-full min-h-[60px] bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-lg rounded-2xl transition-colors shadow-xl flex items-center justify-center gap-2"
        >
          {selected.length === 0 ? "None of these" : `Show my result (${selected.length})`}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-xs font-bold text-slate-400 mt-5">Nothing you tap leaves your phone.</p>
    </div>
  );
}

function ReportOffer({ test }: { test: NonNullable<ReturnType<typeof tickTestBySlug>> }) {
  return (
    <div className="rounded-3xl border-2 border-[#EC8A66] bg-white p-7 md:p-9 mb-8 shadow-[0_10px_40px_rgba(236,138,102,0.15)]">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-2">The full report · €9.99</p>
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-snug">{test.report.pitch}</h2>
      <ul className="space-y-2.5 mb-6 text-slate-700 font-medium">
        {test.report.bullets.map((b) => (
          <li key={b} className="flex gap-2.5">
            <Check className="w-5 h-5 text-[#E07850] shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>
      <CheckoutButton
        sku="premium-report"
        returnTo={test.full.href}
        className="w-full min-h-[60px] bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg rounded-2xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        Unlock the full report · €9.99
      </CheckoutButton>
      <p className="text-xs font-bold text-slate-400 mt-3 leading-relaxed">
        After paying you take the full test and the report is built from your answers. It also unlocks the full
        report on every other test on the site. One payment, no subscription, 7-day refund.
      </p>
    </div>
  );
}

/** Already paid: say so, and send her to where the report is. Never a second charge for the same thing. */
function Unlocked({ test }: { test: NonNullable<ReturnType<typeof tickTestBySlug>> }) {
  return (
    <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-6 mb-8">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-2">Your full reports are unlocked</p>
      <h2 className="text-xl font-black text-slate-900 mb-4 leading-snug">{test.report.pitch}</h2>
      <Link
        href={test.full.href}
        className="inline-flex items-center justify-center gap-2 w-full min-h-[56px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg rounded-2xl transition-colors"
      >
        Get my full report <ArrowRight className="w-5 h-5" />
      </Link>
      <p className="text-xs font-bold text-slate-500 mt-3">Take the full test and your report is built from your answers. Nothing more to pay.</p>
    </div>
  );
}
