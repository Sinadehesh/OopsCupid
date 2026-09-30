"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, LifeBuoy } from "lucide-react";
import { PHRASES, scorePhrases, type PhraseResult } from "@/lib/quizzes/thingsHeSays";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import CheckoutButton from "@/components/offers/CheckoutButton";
import ProgramOffer from "@/components/program/ProgramOffer";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import GuideCards from "@/components/guides/GuideCards";
import { guidesFor } from "@/lib/guides/meta";
import MerchCard from "@/components/shop/MerchCard";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";
import { BingoBoard, completedLines } from "@/components/tick/games/Bingo";
import QuickRead, { loadPending } from "@/components/tick/QuickRead";

// The bingo card shows each sentence in quotes.
const CARD = PHRASES.map((p) => ({ id: p.id, text: `"${p.text}"` }));
const NAME = "Things He Says Bingo";

function badge(selected: string[]) {
  const lines = completedLines(CARD, selected).length;
  if (selected.length === CARD.length) return "💀 BLACKOUT: every square";
  if (lines === 0) return "No bingo. Lucky you 🍀";
  return `🎉 ${lines} BINGO ${lines === 1 ? "line" : "lines"}`;
}

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

  // Back from Stripe with ?read=1: put her card back so the read appears.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("read")) return;
    const picks = loadPending<string[]>(QUIZ);
    if (Array.isArray(picks) && picks.length) {
      setSelected(picks);
      setResult(scorePhrases(picks));
    }
  }, []);

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
      <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden"><div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <p className="text-center text-[12px] font-black uppercase tracking-[0.18em] text-[#1A1033]/60 mb-3">📸 screenshot it, post it</p>
          <BingoBoard items={CARD} selected={selected} name={NAME} emoji="💬" />
        </div>

        <div className={`rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 md:p-8 mb-8 ${stickerStatic}`}>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 mb-2">💬 {NAME}</p>
          <p className="inline-block rounded-full bg-[#FFE68A] text-[#1A1033] border-2 border-[#1A1033] px-3 py-1 text-sm font-black mb-3">{badge(selected)}</p>
          <h1 className="text-[34px] md:text-5xl leading-[1.02] mb-4" style={display}>{result.headline}</h1>
          <p className="text-[17px] font-bold leading-relaxed text-white/95">{result.verdict}</p>
        </div>

        <GuideCards guides={guidesFor("things-he-says", result.tactics.map((t) => t.key))} />

        {result.count > 0 && (
          <QuickRead
            input={{ kind: "tick", slug: QUIZ, picks: result.chosen.map((p) => p.id), count: result.count }}
            pending={result.chosen.map((p) => p.id)}
          />
        )}

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
                className={`bg-white rounded-[22px] p-5 ${stickerStatic}`}
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
          title={`${badge(selected)} on ${NAME}`}
          score={result.count}
          scoreLabel="of 16 recognised"
        />

        <MerchCard from="result-things-he-says" />

        <MoreQuickTests exclude="things-he-says" />

        <button
          onClick={() => { setResult(null); setSelected([]); }}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Play again
        </button>
      </div></div>
    );
  }

  const lines = completedLines(CARD, selected).length;
  const pct = Math.round((selected.length / CARD.length) * 100);
  return (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden"><div className="max-w-3xl mx-auto px-4 py-7 md:py-12">
      <div className="text-center mb-6">
        <span className="inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-4 border-2 border-[#1A1033] shadow-[2px_2px_0_#1A1033]">
          🎱 {NAME} · 40 sec
        </span>
        <h1 className="text-[34px] md:text-6xl text-[#1A1033] leading-[1.02] mb-3" style={display}>
          Which of these
          <br />
          has he said to you?
        </h1>
        <p className="text-base md:text-lg text-[#1A1033]/70 font-semibold leading-relaxed max-w-xl mx-auto">
          Stamp every sentence you&apos;ve actually heard. A full row, column or diagonal is a BINGO. You don&apos;t want a BINGO.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-6">
        <BingoBoard items={CARD} selected={selected} name={NAME} emoji="💬" onToggle={toggle} />
      </div>

      <div className="sticky bottom-3 z-10 space-y-2 max-w-2xl mx-auto">
        <div className={`rounded-2xl bg-white px-4 py-2.5 ${stickerStatic} !shadow-[3px_3px_0_#1A1033]`}>
          <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-1.5">
            <span>{selected.length === 0 ? "stamp the ones you've heard" : `${lines} ${lines === 1 ? "line" : "lines"} · ${selected.length >= 8 ? "that's a lot 😬" : selected.length >= 4 ? "ooh, a pattern 👀" : "a few 🤔"}`}</span>
            <span className="tabular-nums">{selected.length}/{CARD.length}</span>
          </div>
          <div className="h-3 rounded-full bg-[#FFE4F1] border-2 border-[#1A1033] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button
          onClick={show}
          className={`w-full min-h-[60px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}
        >
          {selected.length === 0 ? "I haven't heard any of these" : "Call it: see my card"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-xs font-bold text-[#1A1033]/45 mt-5">
        🤫 Nothing you tap leaves your phone.
      </p>
    </div></div>
  );
}
