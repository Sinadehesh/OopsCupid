"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import ResultShare from "@/components/share/ResultShare";
import MerchCard from "@/components/shop/MerchCard";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * LOVE TOWER: a stacking game. A block slides across the top of the
 * tower; tap to drop it. Whatever hangs over the edge is chopped off, so
 * sloppy drops make the tower narrower until a miss brings it all down.
 * Every block is the next milestone of a relationship, so the score is
 * how far the relationship got: "we made it to Engaged".
 *
 * Pure fun. The money is in what comes after: the bundle, the shop and
 * the next game.
 */

const SLUG = "love-tower";
const BEST = "oc_love_tower_best";
const BLOCK_H = 36;
const VISIBLE = 9;

const MILESTONES = [
  "Single 😌",
  "He slid into the DMs 📩",
  "First date 🍝",
  "First kiss 💋",
  "Texting all day 📱",
  "Met the friends 🍻",
  "First fight 🗯️",
  "Made up 🥹",
  "Exclusive 🔒",
  "\"I love you\" 💗",
  "Met his mum 👩",
  "First holiday ✈️",
  "Shared Netflix 📺",
  "Moved in 🏠",
  "Got a dog 🐶",
  "Survived IKEA 🪑",
  "Joint account 💳",
  "Engaged 💍",
  "The wedding 💒",
  "Honeymoon 🌴",
  "First baby 👶",
  "Second baby 👶👶",
  "School run era 🚗",
  "Kids moved out 🎉",
  "Silver anniversary 🥈",
  "Grandkids 👵",
  "Golden anniversary 🥇",
  "Soulmates forever ♾️",
];

const milestone = (n: number) => MILESTONES[n] ?? `Year ${n - MILESTONES.length + 51} together 💞`;

type Block = { x: number; w: number };

export default function LoveTower() {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(340);
  const [phase, setPhase] = useState<"start" | "play" | "over">("start");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [mover, setMover] = useState<Block>({ x: 0, w: 200 });
  const [chop, setChop] = useState<{ x: number; w: number; n: number } | null>(null);
  const [perfect, setPerfect] = useState<{ n: number; streak: number } | null>(null);
  const [best, setBest] = useState(0);

  const dir = useRef(1);
  const pos = useRef(0);
  const streak = useRef(0);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);

  useEffect(() => {
    try {
      setBest(parseInt(localStorage.getItem(BEST) || "0", 10) || 0);
    } catch {}
    const measure = () => box.current && setWidth(box.current.clientWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const height = Math.max(0, blocks.length - 1);
  const speed = Math.min(130 + height * 14, 430);

  const start = () => {
    const w = Math.round(width * 0.62);
    setBlocks([{ x: Math.round((width - w) / 2), w }]);
    pos.current = 0;
    dir.current = 1;
    streak.current = 0;
    setMover({ x: 0, w });
    setChop(null);
    setPerfect(null);
    setPhase("play");
    trackQuizStart(SLUG);
  };

  // The sliding block.
  useEffect(() => {
    if (phase !== "play") return;
    last.current = null;
    const tick = (now: number) => {
      if (last.current !== null) {
        const dt = (now - last.current) / 1000;
        let x = pos.current + dir.current * speed * dt;
        const max = width - mover.w;
        if (x <= 0) { x = 0; dir.current = 1; }
        if (x >= max) { x = max; dir.current = -1; }
        pos.current = x;
        setMover((m) => ({ ...m, x }));
      }
      last.current = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [phase, speed, width, mover.w]);

  const drop = useCallback(() => {
    if (phase !== "play") return;
    const top = blocks[blocks.length - 1];
    const x = pos.current;
    const left = Math.max(x, top.x);
    const right = Math.min(x + mover.w, top.x + top.w);
    const overlap = right - left;

    if (overlap <= 0) {
      // Missed completely: the relationship falls apart.
      setChop({ x, w: mover.w, n: Date.now() });
      setPhase("over");
      const h = blocks.length - 1;
      trackQuizComplete(SLUG, h);
      trackResultView(SLUG, `height-${h}`);
      setBest((b) => {
        const nb = Math.max(b, h);
        try {
          localStorage.setItem(BEST, String(nb));
        } catch {}
        return nb;
      });
      return;
    }

    let placed: Block;
    if (Math.abs(x - top.x) <= 4) {
      // A perfect drop keeps the full width.
      placed = { x: top.x, w: top.w };
      streak.current += 1;
      setPerfect({ n: Date.now(), streak: streak.current });
      setChop(null);
    } else {
      placed = { x: left, w: overlap };
      streak.current = 0;
      setPerfect(null);
      const cutX = x < top.x ? x : right;
      setChop({ x: cutX, w: mover.w - overlap, n: Date.now() });
    }
    setBlocks((bs) => [...bs, placed]);
    // The next block starts from alternating sides.
    const fromLeft = blocks.length % 2 === 0;
    pos.current = fromLeft ? 0 : width - placed.w;
    dir.current = fromLeft ? 1 : -1;
    setMover({ x: pos.current, w: placed.w });
  }, [phase, blocks, mover.w, width]);

  // Space bar on a laptop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && phase === "play") {
        e.preventDefault();
        drop();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drop, phase]);

  // Only the top of the tower is on screen; it scrolls down as it grows.
  const offset = Math.max(0, blocks.length - (VISIBLE - 1));
  const stageH = VISIBLE * BLOCK_H + 70;
  const yFor = (i: number) => stageH - 20 - (i - offset + 1) * BLOCK_H;

  const reached = milestone(Math.max(0, blocks.length - 1));

  return (
    <div className="max-w-md mx-auto px-3 py-6">
      <div className="text-center mb-4">
        <span className={`inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-2 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
          🏗️ stacking game · tap to drop
        </span>
        <h1 className="text-[38px] leading-none text-[#1A1033]" style={display}>Love Tower</h1>
        <p className="text-[15px] font-bold text-[#1A1033]/70 mt-2">How far can your relationship get before it all falls down?</p>
      </div>

      <div className="flex justify-between text-[13px] font-black text-[#1A1033] mb-2 px-1">
        <span>🏗️ {height} high</span>
        <span>🏆 best {best}</span>
      </div>

      <div
        ref={box}
        onPointerDown={() => (phase === "play" ? drop() : undefined)}
        className={`relative w-full overflow-hidden rounded-[26px] ${stickerStatic} touch-none select-none`}
        style={{ height: stageH, background: "linear-gradient(#C9B6FF, #FFD1E8 60%, #FFF4FA)" }}
      >
        {/* The milestone she's on. */}
        {phase !== "start" && (
          <div className="absolute top-2 inset-x-0 z-10 flex justify-center">
            <span className="rounded-full bg-white border-2 border-[#1A1033] px-3 py-1 text-[13px] font-black text-[#1A1033]">{reached}</span>
          </div>
        )}

        {/* The tower. */}
        {blocks.map((b, i) =>
          i < offset - 1 ? null : (
            <div
              key={i}
              className={`absolute rounded-md border-2 border-[#1A1033] flex items-center justify-center overflow-hidden ${i === blocks.length - 1 && i > 0 ? "oc-pop" : ""}`}
              style={{ left: b.x, width: b.w, top: yFor(i), height: BLOCK_H - 2, backgroundColor: CANDY[i % CANDY.length], transition: "top 0.25s ease-out" }}
            >
              <span className="text-[11px] font-black text-[#1A1033] whitespace-nowrap px-1">{milestone(i)}</span>
            </div>
          ),
        )}

        {/* The block in the air. */}
        {phase === "play" && (
          <div
            className="absolute rounded-md border-2 border-[#1A1033] flex items-center justify-center overflow-hidden shadow-[0_4px_0_#1A1033]"
            style={{ left: mover.x, width: mover.w, top: yFor(blocks.length) - 8, height: BLOCK_H - 2, backgroundColor: CANDY[blocks.length % CANDY.length] }}
          >
            <span className="text-[11px] font-black text-[#1A1033] whitespace-nowrap px-1">{milestone(blocks.length)}</span>
          </div>
        )}

        {/* The bit that got chopped off, falling. */}
        {chop && chop.w > 1 && (
          <div
            key={chop.n}
            className="absolute rounded-md border-2 border-[#1A1033] oc-fall"
            style={{ left: chop.x, width: chop.w, top: yFor(phase === "over" ? blocks.length : blocks.length - 1), height: BLOCK_H - 2, backgroundColor: "#FF8A8A" }}
          />
        )}

        {perfect && (
          <div key={perfect.n} className="absolute inset-x-0 top-12 z-10 flex justify-center pointer-events-none">
            <span className="oc-shout rounded-full bg-[#FFE68A] border-2 border-[#1A1033] px-4 py-1 text-[18px] font-black text-[#FF4FA3]" style={display}>
              {perfect.streak > 1 ? `PERFECT x${perfect.streak} 💕` : "PERFECT 💕"}
            </span>
          </div>
        )}

        {phase === "start" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/60">
            <p className="text-6xl mb-3" aria-hidden="true">💞</p>
            <p className="text-[17px] font-black text-[#1A1033] mb-5">Tap anywhere to drop each milestone on top. Line them up perfectly, or the relationship gets shakier.</p>
            <button type="button" onClick={start} className={`w-full min-h-[60px] rounded-2xl bg-[#FF4FA3] text-white font-black text-xl flex items-center justify-center gap-2 ${sticker}`}>
              Start building <ArrowRight className="w-6 h-6" strokeWidth={3} />
            </button>
          </div>
        )}

        {phase === "over" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#1A1033]/90">
            <p className="text-6xl mb-2 oc-pop" aria-hidden="true">💔</p>
            <p className="text-[13px] font-black uppercase tracking-[0.18em] text-white/80">It all fell apart at</p>
            <p className="text-[30px] leading-tight text-white mb-1" style={display}>{milestone(blocks.length)}</p>
            <p className="text-[15px] font-bold text-white/85 mb-5">You made it to <b>{reached}</b>, {height} high.{height >= best && height > 0 ? " New best! 🏆" : ""}</p>
            <button type="button" onClick={start} className={`w-full min-h-[56px] rounded-2xl bg-white text-[#1A1033] font-black text-lg flex items-center justify-center gap-2 ${sticker}`}>
              <RotateCcw className="w-5 h-5" /> Try again
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-[12px] font-bold text-[#1A1033]/50 mt-3">Tap the tower (or press space) to drop.</p>

      {phase === "over" && (
        <div className="mt-8">
          <ResultShare quiz="Love Tower" quizPath={`/${SLUG}`} title={`We made it to ${reached}`} score={height} scoreLabel="high" />

          <Link href="/flag-runner" className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 bg-[#FFE68A] text-[#1A1033] ${sticker}`}>
            <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">🏃‍♀️</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Up next</span>
              <span className="block text-xl leading-snug" style={display}>Flag Runner: love or the ick?</span>
            </span>
            <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
          </Link>

          <UnlockAllCard returnTo="/flag-runner" from={`result-${SLUG}`} extra="All 16 Flag Runner levels, unlocked straight away" />
          <MerchCard from={`result-${SLUG}`} />
          <MoreQuickTests exclude={SLUG} />
        </div>
      )}
    </div>
  );
}
