"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, LifeBuoy } from "lucide-react";
import { scoreTick, tickTestBySlug, nextQuickTest, type TickResult } from "@/lib/quizzes/tickTests";
import { usePremiumAccess } from "@/lib/usePremiumAccess";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import CheckoutButton from "@/components/offers/CheckoutButton";
import ProgramOffer from "@/components/program/ProgramOffer";
import MoreQuickTests from "./MoreQuickTests";
import QuickRead, { loadPending, savePending } from "./QuickRead";
import { tickGame, type Tier } from "@/lib/quizzes/tickGames";
import { BingoBoard, completedLines } from "./games/Bingo";
import { ReceiptShelf, Receipt } from "./games/Receipt";
import { TierGame, TierBoard } from "./games/TierList";
import GuideCards from "@/components/guides/GuideCards";
import { guidesFor } from "@/lib/guides/meta";
import MerchCard from "@/components/shop/MerchCard";
import { CANDY, INK, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * A forty-second test that plays like a game.
 *
 * One screen, every item visible at once (reading sixteen familiar lines
 * together is the hook), but each tap now answers back: the card pops into
 * a candy colour with its own reaction emoji, and a meter at the bottom
 * fills as she goes. Instant feedback is what keeps people tapping to the
 * end, and a finished test is the only one that can lead anywhere.
 *
 * The meter only ever shows how many she has ticked, never a verdict it
 * cannot support.
 */

const REACTIONS = ["😬", "👀", "🚩", "💀", "🙃", "😳", "🤭", "🔥"];

function meterWord(count: number, total: number, fun?: boolean) {
  if (count === 0) return fun ? "waiting for the tea ☕" : "tap the ones you recognise";
  const r = count / total;
  if (r < 0.25) return fun ? "hmm, mild 🤏" : "a few 🤔";
  if (r < 0.5) return fun ? "okay this is spicy 🌶️" : "ooh, a pattern 👀";
  return fun ? "certified 💯" : "that's a lot 😬";
}

export default function TickPicker({ slug }: { slug: string }) {
  const test = tickTestBySlug(slug)!;
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<TickResult | null>(null);
  const [started, setStarted] = useState(false);
  const [popped, setPopped] = useState<{ id: string; n: number } | null>(null);
  const game = tickGame(slug);
  const [tiers, setTiers] = useState<Record<string, Tier>>({});
  const [order, setOrder] = useState<string[]>([]);

  // Back from Stripe with ?read=1: put her answers back exactly as they
  // were, so the read she just bought appears on the same result.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("read")) return;
    const picks = loadPending<string[]>(slug);
    if (Array.isArray(picks) && picks.length) {
      setSelected(picks);
      const savedTiers = loadPending<Record<string, Tier>>(`${slug}:tiers`);
      if (savedTiers && typeof savedTiers === "object") setTiers(savedTiers);
      setResult(scoreTick(test, picks));
    }
  }, [slug, test]);
  const { granted } = usePremiumAccess();
  const seconds = test.items.length <= 12 ? 30 : 40;
  const next = nextQuickTest(slug);

  const toggle = (id: string) => {
    if (!started) {
      setStarted(true);
      trackQuizStart(slug);
    }
    const on = !selected.includes(id);
    if (on) setPopped({ id, n: Date.now() });
    setSelected((prev) => (on ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  // Tier list: "all the time" and "sometimes" count as picked.
  const applyTiers = (next: Record<string, Tier>, nextOrder: string[]) => {
    setTiers(next);
    setOrder(nextOrder);
    setSelected(test.items.filter((it) => next[it.id] === 0 || next[it.id] === 1).map((it) => it.id));
  };
  const setTier = (id: string, t: Tier) => {
    if (!started) {
      setStarted(true);
      trackQuizStart(slug);
    }
    applyTiers({ ...tiers, [id]: t }, [...order, id]);
  };
  const undoTier = () => {
    const last = order[order.length - 1];
    if (!last) return;
    const next = { ...tiers };
    delete next[last];
    applyTiers(next, order.slice(0, -1));
  };

  const show = () => {
    if (game?.mode === "tier") savePending(`${slug}:tiers`, tiers);
    const r = scoreTick(test, selected);
    setResult(r);
    trackQuizComplete(slug, test.items.length);
    trackResultView(slug, r.band);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    const pct = Math.round((result.count / result.total) * 100);
    return (
      <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
        <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
          {game && (
            <div className="mb-8">
              <p className="text-center text-[12px] font-black uppercase tracking-[0.18em] text-[#1A1033]/60 mb-3">📸 screenshot it, post it</p>
              {game.mode === "bingo" && <BingoBoard items={test.items} selected={selected} name={game.name} emoji={test.emoji} />}
              {game.mode === "receipt" && (
                <Receipt items={test.items} selected={selected} store={game.store ?? "OOPSCUPID"} paidWith={game.paidWith ?? "YOUR SANITY"} total={test.items.length} animate />
              )}
              {game.mode === "tier" && (
                <TierBoard
                  items={test.items}
                  tiers={Object.keys(tiers).length ? tiers : Object.fromEntries(selected.map((id) => [id, 1 as Tier]))}
                  labels={game.tiers ?? ["💀 All the time", "😬 Sometimes", "😇 Never"]}
                  name={game.name}
                />
              )}
            </div>
          )}

          {/* The result, as a card worth screenshotting. */}
          <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 md:p-8 mb-8 ${stickerStatic}`}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {[test.emoji, "✨", test.emoji, "💥", test.emoji].map((e, i) => (
                <span key={i} className="oc-burst text-2xl" style={{ animationDelay: `${i * 120}ms` }}>{e}</span>
              ))}
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85 mb-2">{test.emoji} {game?.name ?? test.short}</p>
            {game?.mode === "bingo" && (
              <p className="inline-block rounded-full bg-[#FFE68A] text-[#1A1033] border-2 border-[#1A1033] px-3 py-1 text-sm font-black mb-3">
                {bingoBadge(completedLines(test.items, selected).length, selected.length === test.items.length)}
              </p>
            )}
            <h1 className="text-[34px] md:text-5xl leading-[1.02] mb-4" style={display}>{result.headline}</h1>
            <div className="h-4 rounded-full bg-white/30 border-2 border-[#1A1033] overflow-hidden mb-4">
              <div className="h-full bg-[#FFE68A] transition-all duration-700" style={{ width: `${Math.max(pct, 4)}%` }} />
            </div>
            <p className="text-[17px] font-bold leading-relaxed text-white/95">{result.verdict}</p>
          </div>

          {result.support && (
            <div className={`rounded-2xl bg-[#FFE68A] p-5 mb-8 flex gap-3.5 ${stickerStatic}`}>
              <LifeBuoy className="w-5 h-5 text-[#1A1033] shrink-0 mt-0.5" />
              <p className="text-[#1A1033] font-bold leading-relaxed">{result.support}</p>
            </div>
          )}

          <GuideCards guides={guidesFor(slug, result.groups.map((g) => g.key))} />

          {result.count > 0 && (
            <QuickRead
              input={{ kind: "tick", slug, picks: result.chosen.map((i) => i.id), count: result.count }}
              pending={result.chosen.map((i) => i.id)}
            />
          )}

          {/* Straight on to the next one. */}
          <Link
            href={`/${next.slug}`}
            className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 ${sticker}`}
            style={{ backgroundColor: next.bg, color: INK }}
          >
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{next.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">
                Up next{next.fun ? " · just for fun" : ""}
              </span>
              <span className="block text-xl leading-snug" style={display}>{next.short}</span>
            </span>
            <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
          </Link>

          {result.groups.length > 0 && (
            <div className="space-y-3 mb-10">
              <h2 className="text-[13px] text-[#1A1033]" style={display}>🔍 What you picked, and what it means</h2>
              {result.groups.map((g, i) => (
                <div key={g.key} className={`rounded-[22px] p-5 bg-white ${stickerStatic}`}>
                  <div className="flex items-center justify-between gap-4 mb-1.5">
                    <h3 className="text-lg text-[#1A1033]" style={display}>{g.label}</h3>
                    <span className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-black border-2 border-[#1A1033]" style={{ backgroundColor: CANDY[i % CANDY.length] }}>
                      {g.items.length} picked
                    </span>
                  </div>
                  <p className="text-slate-700 font-semibold leading-relaxed mb-3">{g.does}</p>
                  <ul className="space-y-1">
                    {g.items.map((it) => (
                      <li key={it.id} className="text-[#1A1033]/60 font-bold text-[15px]">· {it.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {result.band !== "none" && (granted ? <Unlocked test={test} /> : <ReportOffer test={test} />)}

          <div className={`rounded-[26px] bg-[#1A1033] text-white p-7 md:p-9 mb-8 ${stickerStatic}`}>
            <h2 className="text-2xl mb-3 leading-snug" style={display}>A few taps can only count.</h2>
            <p className="text-white/75 font-semibold leading-relaxed mb-6">
              The full test asks how often, since when and what happens afterwards, which is what tells a bad
              stretch from a pattern. It&apos;s free and your result appears on screen.
            </p>
            <Link href={test.full.href} className={`inline-flex items-center justify-center gap-2 bg-[#FF4FA3] text-white font-black text-lg px-6 py-4 rounded-2xl ${sticker} !border-white !shadow-[4px_4px_0_#ffffff]`}>
              {test.full.label} <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </Link>
          </div>

          {result.band !== "none" && <ProgramOffer quizPath={test.full.href} className="!px-0 !py-4" />}

          <ResultShare
            quiz={test.short}
            quizPath={`/${test.slug}`}
            title={game?.mode === "bingo" ? `${bingoBadge(completedLines(test.items, selected).length, selected.length === test.items.length)} on ${game.name}` : result.headline}
            score={result.count}
            scoreLabel={`of ${result.total}`}
          />

          <MerchCard from={`result-${slug}`} />

          <MoreQuickTests exclude={test.slug} />

          <button
            onClick={() => { setResult(null); setSelected([]); setTiers({}); setOrder([]); }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#1A1033]/50 hover:text-[#1A1033] transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Play again
          </button>
        </div>
      </div>
    );
  }

  const pct = Math.round((selected.length / test.items.length) * 100);
  const lines = game?.mode === "bingo" ? completedLines(test.items, selected).length : 0;
  const sorted = Object.keys(tiers).length;
  const word =
    game?.mode === "bingo"
      ? selected.length === 0 ? "stamp the ones you've had" : `${lines} ${lines === 1 ? "line" : "lines"} · ${meterWord(selected.length, test.items.length, true)}`
      : game?.mode === "receipt"
        ? selected.length === 0 ? "scan the ones he does" : `🧾 ${selected.length} scanned · ${meterWord(selected.length, test.items.length, test.fun)}`
        : meterWord(selected.length, test.items.length, test.fun);
  const tierDone = game?.mode === "tier" && sorted === test.items.length;

  return (
    <div className="bg-[#FFF4FA] min-h-screen overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4 py-7 md:py-12">
        <div className="text-center mb-6 md:mb-9">
          <span className={`inline-block rotate-[-2deg] rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-4 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
            {game ? `${game.mode === "bingo" ? "🎱" : game.mode === "receipt" ? "🧾" : "🏆"} ${game.name} · ${seconds} sec` : `${test.emoji} ${test.fun ? `just for fun · ${seconds} sec` : `${seconds} seconds`}`}
          </span>
          <h1 className="text-[34px] md:text-6xl leading-[1.02] text-[#1A1033] mb-3" style={display}>{test.question}</h1>
          <p className="text-base md:text-lg text-[#1A1033]/70 font-semibold leading-relaxed max-w-xl mx-auto">{game?.how ?? test.intro}</p>
        </div>

        <div className="max-w-2xl mx-auto mb-6">
          {game?.mode === "bingo" && <BingoBoard items={test.items} selected={selected} name={game.name} emoji={test.emoji} onToggle={toggle} />}
          {game?.mode === "receipt" && <ReceiptShelf items={test.items} selected={selected} onToggle={toggle} />}
          {game?.mode === "tier" && (
            <TierGame
              items={test.items}
              tiers={tiers}
              labels={game.tiers ?? ["💀 All the time", "😬 Sometimes", "😇 Never"]}
              name={game.name}
              order={order}
              onSet={setTier}
              onUndo={undoTier}
            />
          )}
          {!game && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {test.items.map((it, idx) => {
                const on = selected.includes(it.id);
                const justPopped = popped?.id === it.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => toggle(it.id)}
                    aria-pressed={on}
                    className={`relative text-left px-4 py-3.5 rounded-[18px] font-bold leading-snug min-h-[60px] flex items-center gap-3 ${sticker} ${
                      on ? "text-[#1A1033]" : "bg-white text-[#1A1033]/85"
                    } ${justPopped ? "oc-pop" : ""}`}
                    style={on ? { backgroundColor: CANDY[idx % CANDY.length] } : undefined}
                  >
                    <span className={`w-6 h-6 rounded-lg border-2 border-[#1A1033] shrink-0 flex items-center justify-center ${on ? "bg-[#1A1033]" : "bg-white"}`}>
                      {on && <Check className="w-4 h-4 text-white" strokeWidth={3.5} />}
                    </span>
                    <span className="flex-1">{it.text}</span>
                    {on && <span className="shrink-0 text-xl" aria-hidden="true">{REACTIONS[idx % REACTIONS.length]}</span>}
                    {justPopped && (
                      <span key={popped!.n} aria-hidden="true" className="oc-rise pointer-events-none absolute right-6 -top-2 text-2xl">
                        {REACTIONS[idx % REACTIONS.length]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* The meter and the button, pinned to the bottom of the screen. The
            tier list has its own counter, so it only gets the button, once
            she's sorted enough to be worth showing. */}
        {game?.mode === "tier" ? (
          (tierDone || sorted >= 4) && (
            <div className="sticky bottom-3 z-10 max-w-2xl mx-auto">
              <button
                onClick={show}
                className={`w-full min-h-[60px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}
              >
                {tierDone ? "See what my tier list says" : `Finish now (${sorted}/${test.items.length} sorted)`}
                <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          )
        ) : (
          <div className="sticky bottom-3 z-10 space-y-2 max-w-2xl mx-auto">
            <div className={`rounded-2xl bg-white px-4 py-2.5 ${stickerStatic} !shadow-[3px_3px_0_#1A1033]`}>
              <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-1.5">
                <span>{game ? "" : "🌡️ "}{word}</span>
                <span className="tabular-nums">{selected.length}/{test.items.length}</span>
              </div>
              <div className="h-3 rounded-full bg-[#FFE4F1] border-2 border-[#1A1033] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <button
              onClick={show}
              className={`w-full min-h-[60px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}
            >
              {game?.mode === "receipt"
                ? `🧾 Print my receipt${selected.length ? ` (${selected.length})` : ""}`
                : game?.mode === "bingo"
                  ? selected.length === 0 ? "None of these" : "Call it: see my card"
                  : selected.length === 0 ? "None of these" : `Show my result (${selected.length})`}
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        )}

        <p className="text-center text-xs font-bold text-[#1A1033]/45 mt-5">🤫 Nothing you tap leaves your phone.</p>
      </div>
    </div>
  );
}

function bingoBadge(lines: number, full: boolean) {
  if (full) return "💀 BLACKOUT: every square";
  if (lines === 0) return "No bingo. Lucky you 🍀";
  return `🎉 ${lines} BINGO ${lines === 1 ? "line" : "lines"}`;
}

function ReportOffer({ test }: { test: NonNullable<ReturnType<typeof tickTestBySlug>> }) {
  return (
    <div className={`rounded-[26px] bg-white p-6 md:p-8 mb-8 ${stickerStatic} !shadow-[5px_5px_0_#FF4FA3]`}>
      <span className="inline-block rounded-full bg-[#FFE68A] border-2 border-[#1A1033] px-2.5 py-0.5 text-[11px] font-black text-[#1A1033] mb-3">
        The full report · €9.99
      </span>
      <h2 className="text-2xl md:text-3xl text-[#1A1033] mb-4 leading-snug" style={display}>{test.report.pitch}</h2>
      <ul className="space-y-2.5 mb-6 text-[#1A1033]/85 font-semibold">
        {test.report.bullets.map((b) => (
          <li key={b} className="flex gap-2.5">
            <Check className="w-5 h-5 text-[#FF4FA3] shrink-0 mt-0.5" strokeWidth={3} />
            {b}
          </li>
        ))}
      </ul>
      <CheckoutButton
        sku="premium-report"
        returnTo={test.full.href}
        className={`w-full min-h-[60px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg flex items-center justify-center gap-2 disabled:opacity-70 ${sticker}`}
      >
        Unlock the full report · €9.99
      </CheckoutButton>
      <p className="text-xs font-bold text-[#1A1033]/50 mt-3 leading-relaxed">
        After paying you take the full test and the report is built from your answers. It also unlocks every
        report, read and guide on the site. One payment, no subscription, 7-day refund.
      </p>
    </div>
  );
}

/** Already paid: say so, and send her to where the report is. Never a second charge for the same thing. */
function Unlocked({ test }: { test: NonNullable<ReturnType<typeof tickTestBySlug>> }) {
  return (
    <div className={`rounded-[26px] bg-[#B8F2D8] p-6 mb-8 ${stickerStatic}`}>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1033]/70 mb-2">✅ Your full reports are unlocked</p>
      <h2 className="text-xl text-[#1A1033] mb-4 leading-snug" style={display}>{test.report.pitch}</h2>
      <Link
        href={test.full.href}
        className={`inline-flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl bg-[#1A1033] text-white font-black text-lg ${sticker}`}
      >
        Get my full report <ArrowRight className="w-5 h-5" strokeWidth={3} />
      </Link>
      <p className="text-xs font-bold text-[#1A1033]/60 mt-3">Take the full test and your report is built from your answers. Nothing more to pay.</p>
    </div>
  );
}
