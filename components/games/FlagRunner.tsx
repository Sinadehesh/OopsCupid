"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Lock } from "lucide-react";
import {
  LEVELS,
  GREEN_OPS,
  RED_OPS,
  START_HEARTS,
  applyOp,
  bossPower,
  starsFor,
  travelSeconds,
  type RunnerLevel,
} from "@/lib/games/flagRunner";
import { GUIDE_META } from "@/lib/guides/meta";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import GuideCards from "@/components/guides/GuideCards";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import ResultShare from "@/components/share/ResultShare";
import MerchCard from "@/components/shop/MerchCard";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

const SLUG = "flag-runner";
const SAVE = "oc_flag_runner_v2";

type Phase = "menu" | "ready" | "run" | "pause" | "boss" | "done";
type Lane = 0 | 1;
type Step = { i: number; green: boolean; op: string };

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

/** The army: a cluster of hearts and a big number. */
function Army({ n, flash }: { n: number; flash: "up" | "down" | null }) {
  const shown = Math.min(n, 18);
  return (
    <div className={`flex flex-col items-center ${flash ? "oc-pop" : ""}`}>
      <div className="flex flex-wrap justify-center w-[92px] -space-x-1 -space-y-2 min-h-[28px]" aria-hidden="true">
        {Array.from({ length: shown }, (_, k) => (
          <span key={k} className="text-[18px] leading-none">{flash === "down" ? "💔" : "💗"}</span>
        ))}
      </div>
      <span className={`mt-1 rounded-full border-2 border-[#1A1033] px-2.5 py-0.5 text-[15px] font-black tabular-nums ${flash === "down" ? "bg-[#FF8A8A]" : flash === "up" ? "bg-[#B8F2D8]" : "bg-white"} text-[#1A1033]`}>
        💗 {n}
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
  const [hearts, setHearts] = useState(START_HEARTS);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const [toast, setToast] = useState<{ green: boolean; op: string; why: string } | null>(null);
  const [history, setHistory] = useState<Step[]>([]);
  const [greenLeft, setGreenLeft] = useState<boolean[]>([]);
  const [fight, setFight] = useState(0);
  const [won, setWon] = useState(false);

  const laneRef = useRef<Lane>(0);
  const heartsRef = useRef(START_HEARTS);
  const raf = useRef<number | null>(null);

  const level: RunnerLevel = LEVELS[levelIdx];
  const boss = bossPower(levelIdx);

  useEffect(() => setStars(loadStars()), []);

  const unlocked = (i: number) => i === 0 || (stars[LEVELS[i - 1].id] ?? 0) > 0;

  const steer = useCallback((l: Lane) => {
    laneRef.current = l;
    setLane(l);
  }, []);

  // Arrow keys on a laptop.
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
    setGreenLeft(level.pairs.map(() => Math.random() < 0.5));
    setPairIdx(0);
    setT(0);
    steer(0);
    setHearts(START_HEARTS);
    heartsRef.current = START_HEARTS;
    setHistory([]);
    setToast(null);
    setFlash(null);
    setPhase("run");
    trackQuizStart(`${SLUG}:${level.id}`);
  };

  const finish = useCallback(
    (win: boolean, finalHearts: number) => {
      setWon(win);
      setPhase("done");
      trackQuizComplete(`${SLUG}:${level.id}`, level.pairs.length);
      trackResultView(`${SLUG}:${level.id}`, win ? `won-${starsFor(finalHearts)}` : "lost");
      if (win) {
        const s = starsFor(finalHearts);
        setStars((prev) => {
          const next = { ...prev, [level.id]: Math.max(prev[level.id] ?? 0, s) };
          saveStars(next);
          return next;
        });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [level],
  );

  // The run: the gate pair slides down the road; when it reaches you, the
  // lane you're in decides which gate you went through.
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
      const i = pairIdx;
      const green = (laneRef.current === 0) === greenLeft[i];
      const op = green ? GREEN_OPS[i] : RED_OPS[i];
      const next = applyOp(heartsRef.current, op);
      heartsRef.current = next;
      setHearts(next);
      setFlash(green ? "up" : "down");
      setHistory((h) => [...h, { i, green, op }]);
      setToast({ green, op, why: green ? level.pairs[i].green.why : level.pairs[i].red.why });
      setPhase("pause");
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [phase, pairIdx, levelIdx, greenLeft, level]);

  // Between gates: a moment to read why, then the next pair (or the boss).
  useEffect(() => {
    if (phase !== "pause") return;
    const id = setTimeout(() => {
      setFlash(null);
      setToast(null);
      if (heartsRef.current <= 0) return finish(false, 0);
      if (pairIdx + 1 < level.pairs.length) {
        setPairIdx(pairIdx + 1);
        setT(0);
        setPhase("run");
      } else {
        setFight(0);
        setPhase("boss");
      }
    }, 1500);
    return () => clearTimeout(id);
  }, [phase, pairIdx, level, finish]);

  // The boss fight: both sides lose hearts until one runs out.
  useEffect(() => {
    if (phase !== "boss") return;
    let begin: number | null = null;
    const tick = (now: number) => {
      if (begin === null) begin = now;
      const p = Math.min((now - begin - 600) / 1600, 1);
      setFight(Math.max(p, 0));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setTimeout(() => finish(heartsRef.current > boss, heartsRef.current), 700);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [phase, boss, finish]);

  /* ─────────────── screens ─────────────── */

  if (phase === "menu") {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className={`inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
            🏃 runner game · {LEVELS.length} levels
          </span>
          <h1 className="text-[40px] md:text-6xl leading-[1] text-[#1A1033] mb-3" style={display}>Flag Runner</h1>
          <p className="text-[16px] font-bold text-[#1A1033]/70 leading-relaxed">
            Steer your army of hearts through the gates. 💚 Green flags make it bigger, 🚩 red flags shrink it. Beat the boss at the end of every level.
          </p>
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
        <p className="text-center text-[13px] font-bold text-[#1A1033]/50 mt-5">Beat a level to unlock the next one.</p>
      </div>
    );
  }

  if (phase === "ready") {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className={`oc-pop rounded-[28px] p-6 text-center text-[#1A1033] ${stickerStatic}`} style={{ backgroundColor: level.bg }}>
          <p className="text-[12px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Level {levelIdx + 1}</p>
          <p className="text-6xl mb-2" aria-hidden="true">{level.emoji}</p>
          <h1 className="text-[36px] leading-none mb-4" style={display}>{level.name}</h1>
          <div className="grid grid-cols-2 gap-2 mb-5 text-[14px] font-black">
            <span className="rounded-2xl bg-white border-2 border-[#1A1033] p-2">💗 You start with {START_HEARTS}</span>
            <span className="rounded-2xl bg-white border-2 border-[#1A1033] p-2">{level.boss.emoji} {level.boss.name}: {boss}</span>
          </div>
          <ul className="text-left text-[15px] font-bold space-y-1.5 mb-6">
            <li>👆 Tap left or right (or use the buttons) to steer.</li>
            <li>💚 Go through the <b>green flag</b>. Its power is hidden until you pass.</li>
            <li>🚩 Red flags shrink your army. Lose them all and it&apos;s game over.</li>
            <li>{level.boss.emoji} Beat {level.boss.name} with more than {boss} hearts.</li>
          </ul>
          <button type="button" onClick={start} className={`w-full min-h-[62px] rounded-2xl bg-[#FF4FA3] text-white font-black text-xl flex items-center justify-center gap-2 ${sticker}`}>
            Run! <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
        <button type="button" onClick={() => setPhase("menu")} className="mt-5 text-sm font-black text-[#1A1033]/50">← All levels</button>
      </div>
    );
  }

  if (phase === "done") {
    const s = starsFor(heartsRef.current);
    const mistakes = history.filter((h) => !h.green);
    const guides = GUIDE_META.filter((g) => level.guides.includes(g.slug));
    const nextLevel = LEVELS[levelIdx + 1];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className={`relative overflow-hidden rounded-[28px] text-white p-6 md:p-8 mb-8 text-center ${stickerStatic} ${won ? "bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D]" : "bg-[#1A1033]"}`}>
          {won && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {["⭐", "💗", level.emoji, "💗", "⭐"].map((e, k) => (
                <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 110}ms` }}>{e}</span>
              ))}
            </div>
          )}
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white/80 mb-2">Level {levelIdx + 1} · {level.name}</p>
          <p className="text-6xl mb-2" aria-hidden="true">{won ? "🏆" : level.boss.emoji}</p>
          <h1 className="text-[38px] md:text-5xl leading-none mb-3" style={display}>{won ? "Level complete!" : `${level.boss.name} won`}</h1>
          {won ? (
            <p className="text-4xl mb-2" aria-label={`${s} stars`}>{"⭐".repeat(s)}{"☆".repeat(3 - s)}</p>
          ) : (
            <p className="text-[17px] font-bold text-white/90 mb-2">{heartsRef.current <= 0 ? "Your army ran out of hearts." : `You had ${heartsRef.current} hearts. You needed more than ${boss}.`}</p>
          )}
          <p className="text-[17px] font-bold text-white/95">
            You spotted {history.length - mistakes.length} of {level.pairs.length} green flags{won ? ` and finished with ${heartsRef.current} 💗` : ""}.
          </p>
          <div className="grid gap-2 mt-5">
            {won && nextLevel ? (
              <button type="button" onClick={() => openLevel(levelIdx + 1)} className={`w-full min-h-[56px] rounded-2xl bg-white text-[#1A1033] font-black text-lg flex items-center justify-center gap-2 ${sticker}`}>
                Next: {nextLevel.emoji} {nextLevel.name} <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            ) : null}
            <button type="button" onClick={start} className={`w-full min-h-[52px] rounded-2xl font-black text-lg flex items-center justify-center gap-2 ${sticker} ${won && nextLevel ? "bg-transparent text-white !border-white !shadow-none" : "bg-white text-[#1A1033]"}`}>
              <RotateCcw className="w-5 h-5" /> {won ? "Go for 3 stars" : "Try again"}
            </button>
          </div>
        </div>

        {/* The learning: every wrong turn, with both gates and the reason. */}
        <section className="mb-8">
          <h2 className="text-[15px] text-[#1A1033] mb-3" style={display}>🧠 {mistakes.length ? "What tripped you up" : "Flawless. Here's why each one was green"}</h2>
          <div className="space-y-3">
            {(mistakes.length ? mistakes : history).map((h) => {
              const pair = level.pairs[h.i];
              return (
                <div key={h.i} className={`rounded-[20px] bg-white p-4 ${stickerStatic}`}>
                  {!h.green && (
                    <p className="text-[14px] font-bold text-[#1A1033]/70 mb-1">🚩 You went through: &ldquo;{pair.red.text}&rdquo; ({h.op})</p>
                  )}
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
          title={won ? `Beat ${level.boss.name} ${level.boss.emoji} ${"⭐".repeat(s)}` : `${level.boss.name} got me ${level.boss.emoji}`}
          score={heartsRef.current}
          scoreLabel="hearts"
        />
        <MerchCard from={`result-${SLUG}`} />
        <MoreQuickTests exclude={SLUG} />

        <button type="button" onClick={() => setPhase("menu")} className="mt-8 text-sm font-black text-[#1A1033]/50">← All levels</button>
      </div>
    );
  }

  /* ─────────────── the road ─────────────── */

  const pair = level.pairs[pairIdx];
  const gl = greenLeft[pairIdx];
  const leftGate = gl ? pair.green : pair.red;
  const rightGate = gl ? pair.red : pair.green;
  // Gates keep one size and one font all the way down, so the text never
  // jumps while she's reading it. Only their position moves.
  const gateTop = 16 + t * 250;
  const passed = phase === "pause";

  const bossLeft = Math.round(boss - Math.min(heartsRef.current, boss) * fight);
  const armyLeft = Math.round(heartsRef.current - Math.min(heartsRef.current, boss) * fight);

  return (
    <div className="max-w-md mx-auto px-3 py-4 select-none">
      <div className="flex items-center justify-between mb-2 text-[13px] font-black text-[#1A1033]">
        <span>{level.emoji} Level {levelIdx + 1}</span>
        <span>{phase === "boss" ? `${level.boss.emoji} Boss fight!` : `Gate ${pairIdx + 1}/${level.pairs.length}`}</span>
      </div>

      <div
        className={`relative h-[430px] rounded-[26px] overflow-hidden ${stickerStatic} touch-none`}
        style={{ background: `linear-gradient(${level.bg}, #FFF4FA)` }}
        onPointerDown={(e) => {
          if (phase !== "run") return;
          const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          steer(e.clientX - r.left < r.width / 2 ? 0 : 1);
        }}
      >
        {/* The road, with moving dashes down the middle. */}
        <div className="absolute inset-0" style={{ clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)", background: "#FFB3D1" }} />
        <div
          className="absolute top-0 bottom-0 left-1/2 w-[6px] -translate-x-1/2 oc-road"
          style={{ backgroundImage: "repeating-linear-gradient(#fff 0 22px, transparent 22px 44px)" }}
        />

        {phase === "boss" ? (
          <div className="absolute inset-x-0 top-6 flex flex-col items-center">
            <span className={`text-[76px] leading-none ${fight > 0 ? "oc-wiggle" : ""}`} aria-hidden="true">{level.boss.emoji}</span>
            <span className="mt-1 rounded-full bg-[#1A1033] text-white px-3 py-1 text-[16px] font-black tabular-nums">{level.boss.name}: {bossLeft}</span>
          </div>
        ) : (
          !passed && (
            <>
              {[leftGate, rightGate].map((g, k) => (
                <div
                  key={k}
                  className="absolute rounded-2xl border-[2.5px] border-[#1A1033] bg-white/95 px-2 py-2 text-center font-extrabold leading-[1.15] text-[#1A1033] flex items-center justify-center"
                  style={{
                    top: gateTop,
                    width: "calc(50% - 14px)",
                    left: k === 0 ? "8px" : "calc(50% + 6px)",
                    minHeight: 96,
                    fontSize: 17,
                    backgroundColor: CANDY[(pairIdx * 2 + k) % CANDY.length],
                    boxShadow: "3px 3px 0 #1A1033",
                  }}
                >
                  {g.text}
                </div>
              ))}
            </>
          )
        )}

        {/* What just happened, and why. */}
        {toast && (
          <div className="absolute inset-x-3 top-4 z-20">
            <div className={`oc-pop rounded-2xl border-[2.5px] border-[#1A1033] p-3.5 shadow-[3px_3px_0_#1A1033] ${toast.green ? "bg-[#B8F2D8]" : "bg-[#FFD1E8]"}`}>
              <p className="text-[20px] text-[#1A1033]" style={display}>
                {toast.green ? "💚 Green flag!" : "🚩 Red flag!"} <span className="tabular-nums">{toast.op}</span>
              </p>
              <p className="text-[14px] font-bold text-[#1A1033]/85 leading-snug mt-0.5">{toast.why}</p>
            </div>
          </div>
        )}

        {/* The army. */}
        <div
          className="absolute bottom-4 transition-all duration-200 ease-out -translate-x-1/2"
          style={{ left: phase === "boss" ? "50%" : lane === 0 ? "27%" : "73%" }}
        >
          <Army n={phase === "boss" ? armyLeft : hearts} flash={flash} />
        </div>
      </div>

      {/* Big steering buttons for thumbs. */}
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
