"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, LifeBuoy } from "lucide-react";
import { PHRASES, scorePhrases, type PhraseResult } from "@/lib/quizzes/thingsHeSays";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import CheckoutButton from "@/components/offers/CheckoutButton";
import ProgramOffer from "@/components/program/ProgramOffer";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import GuideCards from "@/components/guides/GuideCards";
import { guidesFor } from "@/lib/guides/guides";
import MerchCard from "@/components/shop/MerchCard";

const QUIZ = "things-he-says";

/**
 * Tap to select, one screen, no pagination.
 *
 * A stepper would be the house pattern, and it would be wrong here. Someone
 * arriving from a video needs to see the whole thing in one look: the grid
 * is the hook, and reading sixteen sentences at once is what produces the
 * jolt of recognition that makes anyone finish anything. Paginating it
 * would turn a ten-second decision into sixteen of them.
 */
export default function PhrasePicker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<PhraseResult | null>(null);
  const [started, setStarted] = useState(false);

  const toggle = (id: string) => {
    if (!started) {
      setStarted(true);
      trackQuizStart(QUIZ);
    }
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const show = () => {
    const r = scorePhrases(selected);
    setResult(r);
    trackQuizComplete(QUIZ, PHRASES.length);
    trackResultView(QUIZ, r.band);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-14">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-3">
          Your result
        </p>
        <h1 className="text-3xl md:text-[2.75rem] font-black text-slate-900 leading-tight tracking-tight mb-5">
          {result.headline}
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
          {result.verdict}
        </p>

        <GuideCards guides={guidesFor("things-he-says", result.tactics.map((t) => t.key))} />

        {result.support && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 mb-10 flex gap-3.5">
            <LifeBuoy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-900 font-medium leading-relaxed">{result.support}</p>
          </div>
        )}

        {result.tactics.length > 0 && (
          <div className="space-y-4 mb-12">
            <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
              What you picked is doing {result.tactics.length === 1 ? "one thing" : `${result.tactics.length} different things`}
            </h2>
            {result.tactics.map((t) => (
              <div
                key={t.key}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_2px_20px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-black text-slate-900 text-lg">{t.label}</h3>
                  <span className="shrink-0 text-xs font-black text-slate-400">
                    {t.count} of your {result.count}
                  </span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-4">{t.does}</p>
                <ul className="space-y-1.5">
                  {result.chosen
                    .filter((p) => p.tactic === t.key)
                    .map((p) => (
                      <li key={p.id} className="text-slate-500 font-bold italic">
                        &ldquo;{p.text}&rdquo;
                        {p.slug && (
                          <Link
                            href={`/signs/${p.slug}`}
                            className="not-italic font-bold text-[#E07850] hover:underline ml-2 text-sm"
                          >
                            what this one is
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* The money path from paid social. Until this existed, somebody who
            came from an advert and recognised half the grid had no way to
            pay at all: every buy button on the site sat behind a full
            assessment she had not started. Offered only once she has
            recognised enough for the report to be about something, and it
            says plainly that the report needs the assessment, because a
            report that turned out to require twenty more questions after
            paying would be exactly the surprise that reads as a con. */}
        {(result.band === "pattern" || result.band === "system") && (
          <div className="rounded-3xl border-2 border-[#EC8A66] bg-white p-8 md:p-10 mb-8 shadow-[0_10px_40px_rgba(236,138,102,0.15)]">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-3">
              The full report · €9.99
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-snug">
              Find out which of these is doing the damage.
            </h2>
            <ul className="space-y-2.5 mb-7 text-slate-700 font-medium">
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#E07850] shrink-0 mt-0.5" />Each tactic scored separately, from twenty questions about how often and what happens after</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#E07850] shrink-0 mt-0.5" />Your own answers quoted back, including where they contradict each other</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#E07850] shrink-0 mt-0.5" />The exact sentence to use the next time each one happens</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#E07850] shrink-0 mt-0.5" />A 14-day plan that does not need his cooperation</li>
            </ul>
            <CheckoutButton
              sku="premium-report"
              returnTo="/is-he-manipulative"
              className="w-full min-h-[60px] bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg rounded-2xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              Unlock the full report · €9.99
            </CheckoutButton>
            <p className="text-xs font-bold text-slate-400 mt-4 leading-relaxed">
              After paying you take the 20-question assessment, about four
              minutes, and the report is built from your answers. One payment,
              no subscription, 7-day refund.
            </p>
          </div>
        )}

        <div className="rounded-3xl bg-[#0E1621] text-white p-8 md:p-10 mb-8">
          <h2 className="text-2xl font-black mb-3 leading-snug">
            Sixteen sentences cannot tell you what to do next.
          </h2>
          <p className="text-white/70 font-medium leading-relaxed mb-7">
            They can only tell you what you recognised. The full test asks about
            frequency, escalation and what happens afterwards, which is what
            separates a bad stretch from a pattern, and it scores every answer
            you give rather than counting taps.
          </p>
          <Link
            href="/is-he-manipulative"
            className="inline-flex items-center justify-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg px-8 py-4 rounded-2xl transition-colors"
          >
            Or take the test free first
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs font-bold text-white/40 mt-4">
            No sign-up. No email. Your answers are not sent anywhere.
          </p>
        </div>

        {result.band !== "none" && <ProgramOffer quizPath="/things-he-says" className="!px-0 !py-4" />}

        <ResultShare
          quiz="Things He Says"
          quizPath="/things-he-says"
          title={result.headline}
          score={result.count}
          scoreLabel="of 16 recognised"
        />

        <MerchCard from="result-things-he-says" />

        <MoreQuickTests exclude="things-he-says" />

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
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <div className="text-center mb-10">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-4">
          Takes about forty seconds
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-5">
          Which of these
          <br />
          has he said to you?
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
          Tap every one you have actually heard. Not what he meant, not how he
          said it, just whether the sentence is familiar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {PHRASES.map((p) => {
          const on = selected.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              aria-pressed={on}
              className={`text-left px-5 py-4 rounded-2xl border-2 font-bold leading-snug transition-all min-h-[64px] flex items-center gap-3 ${
                on
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center ${
                  on ? "bg-[#EC8A66] border-[#EC8A66]" : "border-slate-300"
                }`}
              >
                {on && <Check className="w-3.5 h-3.5 text-white" />}
              </span>
              &ldquo;{p.text}&rdquo;
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-4 z-10">
        <button
          onClick={show}
          className="w-full min-h-[60px] bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-lg rounded-2xl transition-colors shadow-xl flex items-center justify-center gap-2"
        >
          {selected.length === 0
            ? "I have not heard any of these"
            : `Show me what ${selected.length === 1 ? "it" : "they"} mean${selected.length === 1 ? "s" : ""} (${selected.length})`}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-xs font-bold text-slate-400 mt-6">
        Nothing you tap leaves your phone.
      </p>
    </div>
  );
}
