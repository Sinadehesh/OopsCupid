"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { versusBySlug, scoreVersus, type Pick, type VersusResult } from "@/lib/quizzes/versus";
import { nextQuickTest } from "@/lib/quizzes/tickTests";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import ResultShare from "@/components/share/ResultShare";
import ProgramOffer from "@/components/program/ProgramOffer";
import MoreQuickTests from "./MoreQuickTests";
import QuickRead, { loadPending } from "./QuickRead";

type Pending = { names: { a: string; b: string }; picks: Record<string, Pick> };

/**
 * "Who would say this?" One card at a time, big buttons with the names on
 * them, so it plays like a game rather than a form. The names stay in this
 * browser; the share card never includes them.
 */
export default function VersusGame({ slug }: { slug: string }) {
  const game = versusBySlug(slug)!;
  const [stage, setStage] = useState<"names" | "play" | "result">("names");
  const [names, setNames] = useState({ a: "", b: "" });
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<Record<string, Pick>>({});
  const [result, setResult] = useState<VersusResult | null>(null);
  const next = nextQuickTest(slug);

  // Back from Stripe: restore the game exactly as it finished.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("read")) return;
    const p = loadPending<Pending>(slug);
    if (p?.names && p?.picks) {
      setNames(p.names);
      setPicks(p.picks);
      setResult(scoreVersus(game, p.picks));
      setStage("result");
    }
  }, [slug, game]);

  const a = names.a.trim() || game.roleA;
  const b = names.b.trim() || game.roleB;

  const choose = (p: Pick) => {
    const card = game.cards[i];
    const updated = { ...picks, [card.id]: p };
    setPicks(updated);
    if (i + 1 < game.cards.length) {
      setI(i + 1);
    } else {
      const r = scoreVersus(game, updated);
      setResult(r);
      setStage("result");
      trackQuizComplete(slug, game.cards.length);
      trackResultView(slug, `${r.a.tier.label}|${r.b.tier.label}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (stage === "names") {
    return (
      <div className="max-w-xl mx-auto px-5 py-8 md:py-14">
        <div className="text-center mb-7">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-3">
            {game.emoji} {game.cards.length} moments · about a minute
          </p>
          <h1 className="text-[36px] md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-4">{game.title}</h1>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">{game.intro}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            trackQuizStart(slug);
            setStage("play");
          }}
          className="space-y-3"
        >
          {(["a", "b"] as const).map((k) => (
            <label key={k} className="block">
              <span className="block text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-1.5">
                {k === "a" ? game.roleA : game.roleB}
              </span>
              <input
                value={names[k]}
                onChange={(e) => setNames({ ...names, [k]: e.target.value.slice(0, 24) })}
                placeholder={k === "a" ? game.placeholderA : game.placeholderB}
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-4 text-lg font-bold text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </label>
          ))}
          <button
            type="submit"
            className="w-full min-h-[60px] bg-slate-900 text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            Let's play <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs font-bold text-slate-400">Names stay on your phone. They're never shared or stored.</p>
        </form>
      </div>
    );
  }

  if (stage === "play") {
    const card = game.cards[i];
    const btn = "min-h-[64px] rounded-2xl font-black text-lg px-3 active:scale-[0.97] transition-transform break-words";
    return (
      <div className="max-w-xl mx-auto px-5 py-8 md:py-14">
        <div className="flex items-center justify-between mb-2 text-xs font-black text-slate-400">
          <span>{game.emoji} {game.title}</span>
          <span>{i + 1} / {game.cards.length}</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden mb-6">
          <div className="h-full bg-[#EC8A66] transition-all duration-300" style={{ width: `${(i / game.cards.length) * 100}%` }} />
        </div>
        <div key={card.id} className="rounded-3xl p-6 md:p-8 mb-5 animate-in fade-in slide-in-from-right-4 duration-300" style={{ backgroundColor: game.bg, color: game.fg }}>
          <p className="text-xs font-black uppercase tracking-[0.15em] opacity-60 mb-3">{card.situation}</p>
          <p className="text-2xl md:text-3xl font-black leading-snug">{card.line}</p>
          <p className="text-sm font-bold opacity-60 mt-4">Who would?</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={() => choose("a")} className={`${btn} bg-slate-900 text-white`}>{a}</button>
          <button onClick={() => choose("b")} className={`${btn} bg-[#EC8A66] text-white`}>{b}</button>
          <button onClick={() => choose("both")} className={`${btn} bg-white border-2 border-slate-200 text-slate-700 !text-base !min-h-[52px]`}>Both</button>
          <button onClick={() => choose("neither")} className={`${btn} bg-white border-2 border-slate-200 text-slate-700 !text-base !min-h-[52px]`}>Neither</button>
        </div>
        {i > 0 && (
          <button onClick={() => setI(i - 1)} className="mt-5 text-sm font-bold text-slate-400">← Back</button>
        )}
      </div>
    );
  }

  const r = result!;
  const winnerName = r.winner === "a" ? a : r.winner === "b" ? b : null;
  const loserName = r.winner === "a" ? b : r.winner === "b" ? a : null;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8 md:py-14">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-3">{game.emoji} Your result</p>
      <h1 className="text-3xl md:text-[2.6rem] font-black text-slate-900 leading-tight tracking-tight mb-6">
        {winnerName ? `${winnerName} is the one in your corner.` : "It's closer than you think."}
      </h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {([["a", a, r.a], ["b", b, r.b]] as const).map(([k, name, p]) => (
          <div key={k} className={`rounded-3xl p-5 text-center ${r.winner === k ? "bg-slate-900 text-white" : "bg-white border-2 border-slate-200 text-slate-900"}`}>
            <div className="text-5xl mb-2" aria-hidden="true">{p.tier.emoji}</div>
            <p className="font-black text-lg leading-tight break-words">{name}</p>
            <p className={`text-xs font-black uppercase tracking-wider mt-1 ${r.winner === k ? "text-[#F5DD90]" : "text-[#E07850]"}`}>{p.tier.label}</p>
            <p className="text-3xl font-black mt-2 tabular-nums">{p.score}</p>
            <p className={`text-xs font-bold mt-1 ${r.winner === k ? "text-white/60" : "text-slate-400"}`}>{p.tier.line}</p>
          </div>
        ))}
      </div>

      {loserName && (
        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
          Built from your own guesses: you expect {winnerName} to show up for you and {loserName} to let you down more often. That's worth listening to.
        </p>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8">
        <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">Head to head</p>
        <div className="space-y-3">
          {r.a.traits.map((t, idx) => (
            <div key={t.key}>
              <p className="text-sm font-black text-slate-700 mb-1">{t.label}</p>
              {[[a, t.score, "bg-slate-900"], [b, r.b.traits[idx].score, "bg-[#EC8A66]"]].map(([n, v, c]) => (
                <div key={String(n)} className="flex items-center gap-2 mb-1">
                  <span className="w-16 shrink-0 text-xs font-bold text-slate-500 truncate">{n}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full ${c}`} style={{ width: `${v}%` }} />
                  </div>
                  <span className="w-8 text-right text-xs font-black text-slate-500 tabular-nums">{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <QuickRead
        input={{ kind: "versus", slug, picks, names: { a, b }, count: game.cards.length }}
        pending={{ names, picks }}
      />

      <Link
        href={`/${next.slug}`}
        className="flex items-center gap-4 rounded-3xl p-5 mb-8 active:scale-[0.98] transition-transform shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
        style={{ backgroundColor: next.bg, color: next.fg }}
      >
        <span className="text-4xl shrink-0" aria-hidden="true">{next.emoji}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-60 mb-0.5">Up next{next.fun ? " · just for fun" : ""}</span>
          <span className="block text-xl font-black leading-snug">{next.short}</span>
        </span>
        <ArrowRight className="w-6 h-6 shrink-0" />
      </Link>

      <div className="rounded-3xl bg-[#0E1621] text-white p-7 mb-8">
        <h2 className="text-2xl font-black mb-3 leading-snug">Worried about {loserName ?? "one of them"}?</h2>
        <p className="text-white/70 font-medium leading-relaxed mb-6">
          A guessing game can only show who you expect more from. The full test looks at what actually happens, how often, and what it costs you.
        </p>
        <Link href={game.full.href} className="inline-flex items-center justify-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg px-7 py-4 rounded-2xl transition-colors">
          {game.full.label} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <ProgramOffer quizPath={game.full.href} className="!px-0 !py-4" />

      <ResultShare
        quiz={game.title}
        quizPath={`/${slug}`}
        title={`${game.title}: ${r.a.tier.emoji} vs ${r.b.tier.emoji}`}
        score={Math.max(r.a.score, r.b.score)}
        scoreLabel="for the winner"
      />

      <MoreQuickTests exclude={slug} />

      <button
        onClick={() => { setStage("names"); setI(0); setPicks({}); setResult(null); }}
        className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4" /> Play again with two others
      </button>
    </div>
  );
}
