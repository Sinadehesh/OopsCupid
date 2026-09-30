"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * THE LONG TESTS, AS A GAME
 *
 * Twenty to fifty questions is a long way on a phone. The questions and
 * the scoring stay exactly as they are; what changes is how it feels to
 * get through them:
 *
 *  - Levels. The test is cut into up to five levels, each with a name,
 *    and a "level up" card between them. Five short climbs feel shorter
 *    than one long one.
 *  - A runner. The test's emoji walks along the progress bar.
 *  - Every answer reacts: the button pops and gets an emoji that fits
 *    the answer (😇 never, 🚩 often, 💀 very often).
 *  - The sticker look the rest of the site uses.
 *
 * Nothing here claims anything about the answers; the reactions only
 * mirror what she picked.
 */

export type GameOption = { label: string; value: string | number; emoji?: string };

const LEVEL_NAMES = ["🌱 Warm-up", "🔥 Getting real", "💫 The deep end", "👑 Nearly there", "🏆 Final round"];

const LEVEL_UP_LINES = [
  "Warm-up done. The next ones get a bit more honest.",
  "Past the easy bit. Your result is taking shape.",
  "Over halfway. Keep answering like nobody's watching (nobody is).",
  "Last level coming. A few more and it's result time.",
];

/** An emoji that mirrors the answer, from the words on the button. */
export function scaleEmoji(label: string): string | undefined {
  const l = label.toLowerCase().replace(/^\d+\s*[-.:)]\s*/, "");
  if (/strongly agree|completely|extremely|very often|very true|always|all the time|definitely/.test(l)) return "💀";
  if (/strongly disagree|not at all|never/.test(l)) return "😇";
  if (/disagree/.test(l)) return "👎";
  if (/rarely|a little|slightly|once/.test(l)) return "🙂";
  if (/sometimes|neutral|not sure|unsure|maybe|somewhat|moderately|neither/.test(l)) return "😬";
  if (/often|mostly|usually|agree|quite|a lot|very/.test(l)) return "🚩";
  if (/^yes/.test(l)) return "✅";
  if (/^no\b/.test(l)) return "❌";
  return undefined;
}

function levelsFor(total: number) {
  const count = total >= 20 ? 5 : total >= 12 ? 4 : total >= 6 ? 3 : 1;
  const size = Math.ceil(total / count);
  const names = count === 1 ? [LEVEL_NAMES[0]] : [...LEVEL_NAMES.slice(0, count - 1), LEVEL_NAMES[4]];
  return { count, size, names };
}

export function GameQuestion({
  name,
  emoji,
  index,
  total,
  text,
  quote = false,
  section,
  options,
  onAnswer,
  onBack,
  delay = 280,
  layout = "list",
}: {
  name: string;
  emoji: string;
  index: number;
  total: number;
  text: string;
  quote?: boolean;
  section?: string;
  options: GameOption[];
  onAnswer: (value: string | number) => void;
  onBack?: () => void;
  /** Milliseconds between the pop and moving on. 0 if the parent already waits. */
  delay?: number;
  layout?: "list" | "grid";
}) {
  const { count, size, names } = levelsFor(total);
  const level = Math.min(Math.floor(index / size), count - 1);
  const [seenLevel, setSeenLevel] = useState(level);
  const [picked, setPicked] = useState<string | number | null>(null);

  // A new question clears the last pick. Going back never replays a level-up.
  useEffect(() => {
    setPicked(null);
    if (level < seenLevel) setSeenLevel(level);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = Math.round((index / total) * 100);

  const choose = (v: string | number) => {
    if (picked !== null) return;
    setPicked(v);
    if (delay > 0) setTimeout(() => onAnswer(v), delay);
    else onAnswer(v);
  };

  const hud = (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] -rotate-1 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
          {emoji} {name}
        </span>
        <span className="rounded-full bg-[#FFE68A] border-2 border-[#1A1033] px-2.5 py-0.5 text-[12px] font-black text-[#1A1033] whitespace-nowrap">
          Level {level + 1}/{count}
        </span>
      </div>
      {/* The runner: the test's emoji walks along the bar. */}
      <div className="relative pt-5">
        <span
          aria-hidden="true"
          className="absolute top-0 text-2xl transition-all duration-500 ease-out -translate-x-1/2"
          style={{ left: `${Math.min(Math.max(pct, 3), 97)}%` }}
        >
          {emoji}
        </span>
        <div
          className="relative h-4 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress"
        >
          <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
          {Array.from({ length: count - 1 }, (_, k) => (
            <span key={k} className="absolute top-0 bottom-0 w-[2px] bg-[#1A1033]/30" style={{ left: `${(((k + 1) * size) / total) * 100}%` }} />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-1.5 text-[12px] font-black text-[#1A1033]/60">
        <span>{names[level]}</span>
        <span className="tabular-nums">{index + 1}/{total}</span>
      </div>
    </div>
  );

  // Level up, between levels.
  if (level > seenLevel) {
    const last = level === count - 1;
    return (
      <div className="w-full max-w-xl mx-auto px-1">
        {hud}
        <div className={`oc-pop relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-7 text-center ${stickerStatic}`}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
            {["✨", emoji, "🎉", emoji, "✨"].map((e, k) => (
              <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 110}ms` }}>{e}</span>
            ))}
          </div>
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white/85 mb-2">Level {level} complete</p>
          <p className="text-[40px] leading-none mb-3" style={display}>{last ? "Final level!" : "Level up!"}</p>
          <p className="text-2xl mb-2" style={display}>{names[level]}</p>
          <p className="text-[16px] font-bold text-white/95 mb-6">{LEVEL_UP_LINES[Math.min(level - 1, LEVEL_UP_LINES.length - 1)]}</p>
          <button
            type="button"
            onClick={() => setSeenLevel(level)}
            className={`w-full min-h-[58px] rounded-2xl bg-[#1A1033] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker} !border-white !shadow-[4px_4px_0_#ffffff]`}
          >
            Let&apos;s go <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-1">
      {hud}
      <div key={index} className={`oc-pop rounded-[26px] p-5 md:p-7 mb-4 ${stickerStatic}`} style={{ backgroundColor: CANDY[index % CANDY.length] }}>
        {section && <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1A1033]/60 mb-2">{section}</p>}
        <h2 className="text-[23px] md:text-3xl leading-[1.18] text-[#1A1033]" style={display}>
          {quote ? <>&ldquo;{text}&rdquo;</> : text}
        </h2>
      </div>

      <div className={layout === "grid" ? "grid grid-cols-2 sm:grid-cols-4 gap-2.5" : "grid gap-2.5"} role="radiogroup" aria-label="Answer options">
        {options.map((o, k) => {
          const on = picked === o.value;
          const e = o.emoji ?? scaleEmoji(o.label);
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => choose(o.value)}
              disabled={picked !== null && !on}
              className={`relative min-h-[56px] rounded-2xl px-4 py-3 flex items-center gap-3 text-left font-black text-[16px] text-[#1A1033] ${sticker} ${
                on ? "bg-[#FF4FA3] !text-white oc-pop" : "bg-white"
              } ${picked !== null && !on ? "opacity-40" : ""} ${layout === "grid" ? "flex-col justify-center text-center !gap-1 !px-2" : ""}`}
            >
              {e ? (
                <span className="text-2xl shrink-0" aria-hidden="true">{e}</span>
              ) : (
                <span className="w-8 h-8 shrink-0 rounded-full border-2 border-[#1A1033] flex items-center justify-center text-[13px] font-black" style={{ backgroundColor: CANDY[k % CANDY.length] }} aria-hidden="true">
                  {k + 1}
                </span>
              )}
              <span className={layout === "grid" ? "text-[13px] leading-tight" : "flex-1 leading-snug"}>{o.label.replace(/^\d+\s*[-.:)]\s*/, "")}</span>
              {on && (
                <span aria-hidden="true" className="oc-rise pointer-events-none absolute right-5 -top-2 text-2xl">{e ?? "✨"}</span>
              )}
            </button>
          );
        })}
      </div>

      {onBack && index > 0 && (
        <button type="button" onClick={onBack} className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-[#1A1033]/50 hover:text-[#1A1033]">
          <ArrowLeft className="w-4 h-4" strokeWidth={3} /> Back
        </button>
      )}
    </div>
  );
}

/** The screen between the last answer and the result. */
export function GameLoading({ emoji = "✨", lines }: { emoji?: string; lines?: string[] }) {
  const msgs = lines ?? ["Counting your answers…", "Adding up the patterns…", "Building your result…"];
  const [k, setK] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setK((x) => (x + 1) % msgs.length), 700);
    return () => clearInterval(t);
  }, [msgs.length]);
  return (
    <div className="w-full max-w-xl mx-auto px-1 py-10" aria-live="polite">
      <div className={`rounded-[28px] bg-white p-10 text-center ${stickerStatic}`}>
        <div className="oc-wiggle text-6xl mb-4" aria-hidden="true">{emoji}</div>
        <p className="text-2xl text-[#1A1033] mb-4" style={display}>{msgs[k]}</p>
        <div className="h-3 rounded-full bg-[#FFE4F1] border-2 border-[#1A1033] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] animate-pulse" style={{ width: `${((k + 1) / msgs.length) * 100}%`, transition: "width 0.6s" }} />
        </div>
      </div>
    </div>
  );
}

/** The start screen: what it is, how long, one big button. */
export function GameStart({
  emoji,
  title,
  blurb,
  total,
  onStart,
  cta = "Start the game",
}: {
  emoji: string;
  title: string;
  blurb: string;
  total: number;
  onStart: () => void;
  cta?: string;
}) {
  const { count } = levelsFor(total);
  const minutes = Math.max(2, Math.round(total * 0.12));
  return (
    <div className="w-full max-w-xl mx-auto px-1 py-8 text-center">
      <div className="oc-wiggle inline-block text-7xl mb-4" aria-hidden="true">{emoji}</div>
      <h1 className="text-[38px] md:text-6xl leading-[1.02] text-[#1A1033] mb-4" style={display}>{title}</h1>
      <p className="text-lg text-[#1A1033]/70 font-bold leading-relaxed mb-6">{blurb}</p>
      <div className="flex justify-center gap-2 flex-wrap mb-7">
        {[`🎮 ${count} levels`, `❓ ${total} questions`, `⏱️ about ${minutes} min`, "🤫 private"].map((c, k) => (
          <span key={c} className={`rounded-full border-2 border-[#1A1033] px-3 py-1 text-[13px] font-black text-[#1A1033] ${k % 2 ? "rotate-1" : "-rotate-1"}`} style={{ backgroundColor: CANDY[k] }}>
            {c}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onStart}
        className={`w-full min-h-[62px] rounded-2xl bg-[#FF4FA3] text-white font-black text-xl flex items-center justify-center gap-2 ${sticker}`}
      >
        {cta} <ArrowRight className="w-6 h-6" strokeWidth={3} />
      </button>
    </div>
  );
}
