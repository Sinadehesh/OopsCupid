"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Lock } from "lucide-react";
import { LEVELS, ICK_LIMIT, ENDINGS, endingFor, travelSeconds, type Ending, type RunnerLevel } from "@/lib/games/flagRunner";
import { GUIDE_META } from "@/lib/guides/meta";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import GuideCards from "@/components/guides/GuideCards";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import ResultShare from "@/components/share/ResultShare";
import MerchCard from "@/components/shop/MerchCard";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

const SLUG = "flag-runner";
const SAVE = "oc_flag_runner_v3";

type Phase = "menu" | "ready" | "run" | "pause" | "ending" | "done";
type Lane = 0 | 1;
type Step = { i: number; green: boolean };

function loadStars(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(SAVE) || "{}").stars ?? {};
  } catch {
    return {};
  }
}
function saveStars(stars: Record<string, number>) {
  try {
    localStorage.setItem(SAVE, JSON.stringify({ stars }));
  } catch {}
}

/** The heart above her head, filled to `fill` (0 to 1). */
function LoveHeart({ fill, size = 46, broken = false }: { fill: number; size?: number; broken?: boolean }) {
  const id = useId().replace(/:/g, "");
  const path = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
  const top = 3 + (1 - Math.max(0, Math.min(fill, 1))) * 18.5;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={broken ? "oc-wiggle" : ""}>
      <defs>
        <clipPath id={`h${id}`}>
          <rect x="0" y={top} width="24" height="24" style={{ transition: "y 0.4s ease-out" }} />
        </clipPath>
      </defs>
      <path d={path} fill="#ffffff" stroke="#1A1033" strokeWidth="1.6" />
      <path d={path} fill={broken ? "#9CA3AF" : "#FF4FA3"} clipPath={`url(#h${id})`} />
      {broken && <path d="M12 5 L10.5 9 L13 11.5 L11 15 L12.5 19" stroke="#1A1033" strokeWidth="1.4" fill="none" />}
    </svg>
  );
}

/** Her: running, with the heart over her head and her ick underneath it. */
function Runner({ fill, ick, running, broken }: { fill: number; ick: number; running: boolean; broken: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <LoveHeart fill={fill} broken={broken} />
      <div className="flex gap-0.5 -mt-0.5 mb-0.5" aria-label={`Ick ${ick} of ${ICK_LIMIT}`}>
        {Array.from({ length: ICK_LIMIT }, (_, k) => (
          <span key={k} className={`text-[13px] leading-none ${k < ick ? "" : "opacity-25 grayscale"}`}>🤢</span>
        ))}
      </div>
      <span className="inline-block" style={{ transform: "scaleX(-1)" }}>
        <span className={`text-[52px] leading-none inline-block ${running ? "oc-run" : ""}`} aria-hidden="true">🏃‍♀️</span>
      </span>
    </div>
  );
}

export default function FlagRunner() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [levelIdx, setLevelIdx] = useState(0);
  const [stars, setStars] = useState<Record<string, number>>({});
  const [pairIdx, setPairIdx] = useState(0);
  const [t, setT] = useState(0);
  const [lane, setLane] = useState<Lane>(0);
  const [history, setHistory] = useState<Step[]>([]);
  const [greenLeft, setGreenLeft] = useState<boolean[]>([]);
  const [toast, setToast] = useState<{ green: boolean; why: string } | null>(null);
  const [ending, setEnding] = useState<Ending>("situationship");

  const laneRef = useRef<Lane>(0);
  const raf = useRef<number | null>(null);

  const level: RunnerLevel = LEVELS[levelIdx];
  const total = level.pairs.length;
  const greens = history.filter((h) => h.green).length;
  const reds = history.length - greens;

  useEffect(() => setStars(loadStars()), []);

  const unlocked = (i: number) => i === 0 || (stars[LEVELS[i - 1].id] ?? 0) > 0;

  const steer = useCallback((l: Lane) => {
    laneRef.current = l;
    setLane(l);
  }, []);

  useEffect(() => {
    if (phase !== "run") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") steer(0);
      if (e.key === "ArrowRight") steer(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, steer]);

  const openLevel = (i: number) => {
    setLevelIdx(i);
    setPhase("ready");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = () => {
    setGreenLeft(LEVELS[levelIdx].pairs.map(() => Math.random() < 0.5));
    setPairIdx(0);
    setT(0);
    steer(Math.random() < 0.5 ? 0 : 1);
    setHistory([]);
    setToast(null);
    setPhase("run");
    trackQuizStart(`${SLUG}:${level.id}`);
  };

  // The gates slide down the road; when they reach her, her lane decides.
  useEffect(() => {
    if (phase !== "run") return;
    const travel = travelSeconds(levelIdx) * 1000;
    let begin: number | null = null;
    const tick = (now: number) => {
      if (begin === null) begin = now;
      const p = Math.min((now - begin) / travel, 1);
      setT(p);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      const green = (laneRef.current === 0) === greenLeft[pairIdx];
      setHistory((h) => [...h, { i: pairIdx, green }]);
      setToast({ green, why: green ? level.pairs[pairIdx].green.why : level.pairs[pairIdx].red.why });
      setPhase("pause");
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [phase, pairIdx, levelIdx, greenLeft, level]);

  // A beat to read why, then the next pair, or the ending.
  useEffect(() => {
    if (phase !== "pause") return;
    const id = setTimeout(() => {
      setToast(null);
      if (reds >= ICK_LIMIT || pairIdx + 1 >= total) {
        setEnding(endingFor(greens, reds, total));
        setPhase("ending");
      } else {
        setPairIdx(pairIdx + 1);
        setT(0);
        setPhase("run");
      }
    }, 1500);
    return () => clearTimeout(id);
  }, [phase, pairIdx, total, greens, reds]);

  // The ending plays out on the road, then the summary.
  useEffect(() => {
    if (phase !== "ending") return;
    const id = setTimeout(() => {
      const s = ENDINGS[ending].stars;
      trackQuizComplete(`${SLUG}:${level.id}`, total);
      trackResultView(`${SLUG}:${level.id}`, ending);
      if (s > 0) {
        setStars((prev) => {
          const next = { ...prev, [level.id]: Math.max(prev[level.id] ?? 0, s) };
          saveStars(next);
          return next;
        });
      }
      setPhase("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2300);
    return () => clearTimeout(id);
  }, [phase, ending, level, total]);

  /* ─────────────── menu ─────────────── */

  if (phase === "menu") {
    const survived = LEVELS.filter((l) => (stars[l.id] ?? 0) > 0).length;
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className={`inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
            🏃‍♀️ runner game · {LEVELS.length} levels
          </span>
          <h1 className="text-[40px] md:text-6xl leading-[1] text-[#1A1033] mb-3" style={display}>Flag Runner</h1>
          <p className="text-[16px] font-bold text-[#1A1033]/70 leading-relaxed">
            Run through the 💚 green flags to fill your heart. Every 🚩 red flag adds to the ick. Fill the heart and it&apos;s love. Three icks and you break up.
          </p>
          {survived > 0 && <p className="mt-3 text-[14px] font-black text-[#FF4FA3]">💘 {survived} of {LEVELS.length} levels survived</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {LEVELS.map((l, i) => {
            const open = unlocked(i);
            const s = stars[l.id] ?? 0;
            return (
              <button
                key={l.id}
                type="button"
                disabled={!open}
                onClick={() => openLevel(i)}
                className={`relative rounded-[22px] p-4 text-left text-[#1A1033] ${open ? sticker : stickerStatic} ${open ? "" : "opacity-50"} ${i % 2 ? "rotate-1" : "-rotate-1"}`}
                style={{ backgroundColor: l.bg }}
              >
                <span className="block text-[11px] font-black uppercase tracking-wider opacity-70">Level {i + 1}</span>
                <span className="block text-3xl my-1" aria-hidden="true">{open ? l.emoji : "🔒"}</span>
                <span className="block text-[17px] leading-tight" style={display}>{l.name}</span>
                <span className="block text-[12px] font-black mt-1">vs {l.boss.emoji} {l.boss.name}</span>
                <span className="block text-[15px] mt-1" aria-label={`${s} stars`}>{s ? "⭐".repeat(s) + "☆".repeat(3 - s) : open ? "☆☆☆" : ""}</span>
                {!open && <Lock className="absolute top-3 right-3 w-4 h-4" />}
              </button>
            );
          })}
        </div>
        <p className="text-center text-[13px] font-bold text-[#1A1033]/50 mt-5">Survive a level (no break-up) to unlock the next one.</p>
      </div>
    );
  }

  /* ─────────────── level intro ─────────────── */

  if (phase === "ready") {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className={`oc-pop rounded-[28px] p-6 text-center text-[#1A1033] ${stickerStatic}`} style={{ backgroundColor: level.bg }}>
          <p className="text-[12px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Level {levelIdx + 1}</p>
          <p className="text-6xl mb-2" aria-hidden="true">{level.emoji}</p>
          <h1 className="text-[36px] leading-none mb-2" style={display}>{level.name}</h1>
          <p className="text-[15px] font-black mb-5">vs {level.boss.emoji} {level.boss.name}</p>
          <ul className="text-left text-[15px] font-bold space-y-1.5 mb-6 bg-white/70 rounded-2xl border-2 border-[#1A1033] p-4">
            <li>👆 Tap left or right to steer her.</li>
            <li>💚 Green flag: her heart fills up.</li>
            <li>🚩 Red flag: one more 🤢. Three and {level.boss.name} wins.</li>
            <li>🔥 Watch out for the hard ones.</li>
            <li>💘 Every green flag means true love.</li>
          </ul>
          <button type="button" onClick={start} className={`w-full min-h-[62px] rounded-2xl bg-[#FF4FA3] text-white font-black text-xl flex items-center justify-center gap-2 ${sticker}`}>
            Run! <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
        <button type="button" onClick={() => setPhase("menu")} className="mt-5 text-sm font-black text-[#1A1033]/50">← All levels</button>
      </div>
    );
  }

  /* ─────────────── summary ─────────────── */

  if (phase === "done") {
    const end = ENDINGS[ending];
    const won = end.stars > 0;
    const mistakes = history.filter((h) => !h.green);
    const guides = GUIDE_META.filter((g) => level.guides.includes(g.slug));
    const nextLevel = LEVELS[levelIdx + 1];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className={`relative overflow-hidden rounded-[28px] text-white p-6 md:p-8 mb-8 text-center ${stickerStatic} ${won ? "bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D]" : "bg-[#1A1033]"}`}>
          {won && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {[end.emoji, "✨", level.emoji, "✨", end.emoji].map((e, k) => (
                <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 110}ms` }}>{e}</span>
              ))}
            </div>
          )}
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white/80 mb-2">Level {levelIdx + 1} · {level.name}</p>
          <p className="text-6xl mb-2" aria-hidden="true">{ending === "breakup" ? level.boss.emoji : end.emoji}</p>
          <h1 className="text-[38px] md:text-5xl leading-none mb-2" style={display}>{ending === "breakup" ? `${level.boss.name} wins` : end.title}</h1>
          {won && <p className="text-4xl mb-2" aria-label={`${end.stars} stars`}>{"⭐".repeat(end.stars)}{"☆".repeat(3 - end.stars)}</p>}
          <p className="text-[17px] font-bold text-white/95 mb-1">{ending === "breakup" ? "💔 " : ""}{end.line}</p>
          <p className="text-[14px] font-black text-white/80">💚 {greens} green · 🚩 {reds} red</p>
          <div className="grid gap-2 mt-5">
            {won && nextLevel && (
              <button type="button" onClick={() => openLevel(levelIdx + 1)} className={`w-full min-h-[56px] rounded-2xl bg-white text-[#1A1033] font-black text-lg flex items-center justify-center gap-2 ${sticker}`}>
                Next: {nextLevel.emoji} {nextLevel.name} <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            )}
            <button type="button" onClick={start} className={`w-full min-h-[52px] rounded-2xl font-black text-lg flex items-center justify-center gap-2 ${sticker} ${won && nextLevel ? "bg-transparent text-white !border-white !shadow-none" : "bg-white text-[#1A1033]"}`}>
              <RotateCcw className="w-5 h-5" /> {ending === "love" ? "Play again" : ending === "breakup" ? "Try again" : "Go for true love 💘"}
            </button>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-[15px] text-[#1A1033] mb-3" style={display}>🧠 {mistakes.length ? "The red flags that got you" : "Flawless. Here's why each one was green"}</h2>
          <div className="space-y-3">
            {(mistakes.length ? mistakes : history).map((h) => {
              const pair = level.pairs[h.i];
              return (
                <div key={h.i} className={`rounded-[20px] bg-white p-4 ${stickerStatic}`}>
                  {pair.hard && <span className="inline-block rounded-full bg-[#FFE68A] border-2 border-[#1A1033] px-2 py-0.5 text-[10px] font-black mb-1.5">🔥 HARD ONE</span>}
                  {!h.green && <p className="text-[14px] font-bold text-[#1A1033]/70 mb-1">🚩 You ran through: &ldquo;{pair.red.text}&rdquo;</p>}
                  <p className="text-[15px] font-black text-[#1A1033] mb-1">💚 {h.green ? "" : "The green flag was: "}&ldquo;{pair.green.text}&rdquo;</p>
                  <p className="text-[14px] font-semibold text-[#1A1033]/75">{h.green ? pair.green.why : pair.red.why}</p>
                </div>
              );
            })}
          </div>
        </section>

        {level.support && (
          <p className={`rounded-2xl bg-[#FFE68A] p-4 mb-8 text-[15px] font-bold text-[#1A1033] ${stickerStatic}`}>💛 {level.support}</p>
        )}

        <GuideCards guides={guides} title="Level up for real" />

        <Link href={level.test.href} className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 bg-[#FFE68A] text-[#1A1033] ${sticker}`}>
          <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{level.emoji}</span>
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Now check your own</span>
            <span className="block text-xl leading-snug" style={display}>{level.test.label}</span>
          </span>
          <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
        </Link>

        <UnlockAllCard from={`result-${SLUG}`} />

        <ResultShare
          quiz="Flag Runner"
          quizPath={`/${SLUG}`}
          title={ending === "breakup" ? `${level.boss.name} ${level.boss.emoji} broke us up` : `${end.emoji} ${end.title} on ${level.name}`}
          score={greens}
          scoreLabel={`of ${total} green flags`}
        />
        <MerchCard from={`result-${SLUG}`} />
        <MoreQuickTests exclude={SLUG} />

        <button type="button" onClick={() => setPhase("menu")} className="mt-8 text-sm font-black text-[#1A1033]/50">← All levels</button>
      </div>
    );
  }

  /* ─────────────── the road ─────────────── */

  const pair = level.pairs[Math.min(pairIdx, total - 1)];
  const gl = greenLeft[pairIdx];
  const leftGate = gl ? pair.green : pair.red;
  const rightGate = gl ? pair.red : pair.green;
  const gateTop = 34 + t * 200;
  const showGates = phase === "run";
  const broken = phase === "ending" && ending === "breakup";

  return (
    <div className="max-w-md mx-auto px-3 py-4 select-none">
      <div className="flex items-center justify-between mb-2 text-[13px] font-black text-[#1A1033]">
        <span>{level.emoji} Level {levelIdx + 1}</span>
        <span>vs {level.boss.emoji} {level.boss.name}</span>
        <span className="tabular-nums">{Math.min(pairIdx + 1, total)}/{total}</span>
      </div>

      <div
        className={`relative h-[450px] rounded-[26px] overflow-hidden ${stickerStatic} touch-none`}
        style={{ background: `linear-gradient(${level.bg}, #FFF4FA)` }}
        onPointerDown={(e) => {
          if (phase !== "run") return;
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          steer(e.clientX - r.left < r.width / 2 ? 0 : 1);
        }}
      >
        <div className="absolute inset-0" style={{ clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)", background: "#FFB3D1" }} />
        <div
          className={`absolute top-0 bottom-0 left-1/2 w-[6px] -translate-x-1/2 ${phase === "run" ? "oc-road" : ""}`}
          style={{ backgroundImage: "repeating-linear-gradient(#fff 0 22px, transparent 22px 44px)" }}
        />

        {showGates && pair.hard && (
          <span className="absolute top-2 left-1/2 -translate-x-1/2 z-10 rounded-full bg-[#FFE68A] border-2 border-[#1A1033] px-2.5 py-0.5 text-[11px] font-black text-[#1A1033] whitespace-nowrap">
            🔥 HARD ONE
          </span>
        )}

        {/* Gates: one size and one font all the way down; only the position moves. */}
        {showGates &&
          [leftGate, rightGate].map((g, k) => (
            <div
              key={k}
              className="absolute rounded-2xl border-[2.5px] border-[#1A1033] px-2 py-2 text-center font-extrabold leading-[1.15] text-[#1A1033] flex items-center justify-center"
              style={{
                top: gateTop,
                width: "calc(50% - 14px)",
                left: k === 0 ? "8px" : "calc(50% + 6px)",
                minHeight: 92,
                fontSize: 17,
                backgroundColor: CANDY[(pairIdx * 2 + k) % CANDY.length],
                boxShadow: "3px 3px 0 #1A1033",
              }}
            >
              {g.text}
            </div>
          ))}

        {toast && (
          <div className="absolute inset-x-3 top-4 z-20">
            <div className={`oc-pop rounded-2xl border-[2.5px] border-[#1A1033] p-3.5 shadow-[3px_3px_0_#1A1033] ${toast.green ? "bg-[#B8F2D8]" : "bg-[#FFD1E8]"}`}>
              <p className="text-[20px] text-[#1A1033]" style={display}>{toast.green ? "💚 Green flag! Heart +1" : "🚩 Red flag! Ick +1"}</p>
              <p className="text-[14px] font-bold text-[#1A1033]/85 leading-snug mt-0.5">{toast.why}</p>
            </div>
          </div>
        )}

        {/* The ending, played out on the road. */}
        {phase === "ending" && (
          <div className="absolute inset-x-0 top-6 z-20 flex flex-col items-center text-center px-4">
            {ending === "breakup" ? (
              <>
                <span className="text-[84px] leading-none oc-pop" aria-hidden="true">{level.boss.emoji}</span>
                <p className="mt-2 text-[28px] text-[#1A1033]" style={display}>{level.boss.name} wins 💔</p>
              </>
            ) : ending === "love" ? (
              <>
                <span className="text-[84px] leading-none oc-pop" aria-hidden="true">💘</span>
                <p className="mt-2 text-[28px] text-[#1A1033]" style={display}>It&apos;s love!</p>
                <span className="text-4xl mt-2 oc-flee" aria-hidden="true">{level.boss.emoji}</span>
              </>
            ) : (
              <>
                <span className="text-[84px] leading-none oc-pop" aria-hidden="true">{ENDINGS[ending].emoji}</span>
                <p className="mt-2 text-[26px] text-[#1A1033]" style={display}>{ENDINGS[ending].title}</p>
              </>
            )}
          </div>
        )}

        {/* Her. */}
        <div
          className="absolute bottom-3 transition-all duration-200 ease-out -translate-x-1/2"
          style={{ left: phase === "ending" ? "50%" : lane === 0 ? "27%" : "73%" }}
        >
          <Runner fill={greens / total} ick={reds} running={phase === "run" || phase === "pause"} broken={broken} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {([0, 1] as Lane[]).map((l) => (
          <button
            key={l}
            type="button"
            onPointerDown={() => phase === "run" && steer(l)}
            className={`min-h-[64px] rounded-2xl font-black text-xl ${sticker} ${lane === l ? "bg-[#1A1033] text-white" : "bg-white text-[#1A1033]"}`}
            aria-pressed={lane === l}
          >
            {l === 0 ? "⬅️ Left" : "Right ➡️"}
          </button>
        ))}
      </div>
      <p className="text-center text-[12px] font-bold text-[#1A1033]/50 mt-3">Tap either side of the road to steer.</p>
    </div>
  );
}
