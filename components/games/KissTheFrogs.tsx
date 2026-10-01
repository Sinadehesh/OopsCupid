"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import ResultShare from "@/components/share/ResultShare";
import MerchCard from "@/components/shop/MerchCard";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * KISS THE FROGS: 2048, dating edition. Swipe and every tile slides; two
 * of the same guy merge into the next one up the ladder. You kiss a lot
 * of frogs to get to the prince. Pure fun; the share line is how far up
 * the ladder you got.
 */

const SLUG = "kiss-the-frogs";
const BEST = "oc_kiss_frogs_best";
const N = 4;

const LADDER = [
  { e: "🐸", name: "Frog", bg: "#D9F99D" },
  { e: "🤡", name: "The Clown", bg: "#FFE68A" },
  { e: "👻", name: "The Ghost", bg: "#E5E7EB" },
  { e: "🍞", name: "Breadcrumber", bg: "#FFC9A8" },
  { e: "😶", name: "Situationship", bg: "#C9B6FF" },
  { e: "🎸", name: "Bad boy", bg: "#FFB3C7" },
  { e: "💼", name: "Finance bro", bg: "#BDE3FF" },
  { e: "🧔", name: "Decent guy", bg: "#B8F2D8" },
  { e: "🐶", name: "Golden retriever bf", bg: "#FDE68A" },
  { e: "💐", name: "Green flag king", bg: "#A7F3D0" },
  { e: "🤴", name: "The Prince", bg: "#FF4FA3" },
  { e: "💍", name: "Husband material", bg: "#FFD1E8" },
];

type Tile = { id: number; r: number; c: number; v: number; isNew?: boolean; merged?: boolean; gone?: boolean };
type Dir = "left" | "right" | "up" | "down";

let nextId = 1;

function spawn(tiles: Tile[]): Tile[] {
  const used = new Set(tiles.filter((t) => !t.gone).map((t) => t.r * N + t.c));
  const free = Array.from({ length: N * N }, (_, i) => i).filter((i) => !used.has(i));
  if (!free.length) return tiles;
  const i = free[Math.floor(Math.random() * free.length)];
  return [...tiles, { id: nextId++, r: Math.floor(i / N), c: i % N, v: Math.random() < 0.9 ? 0 : 1, isNew: true }];
}

/** Slide everything one way. Returns the new tiles, whether anything moved, and how many merges. */
function slide(tiles: Tile[], dir: Dir): { tiles: Tile[]; moved: boolean; merges: number } {
  const live = tiles.filter((t) => !t.gone).map((t) => ({ ...t, isNew: false, merged: false }));
  const out: Tile[] = [];
  let moved = false;
  let merges = 0;
  for (let line = 0; line < N; line++) {
    // Tiles in this row/column, in the order they hit the wall.
    const inLine = live
      .filter((t) => (dir === "left" || dir === "right" ? t.r === line : t.c === line))
      .sort((a, b) => {
        const ka = dir === "left" || dir === "right" ? a.c : a.r;
        const kb = dir === "left" || dir === "right" ? b.c : b.r;
        return dir === "left" || dir === "up" ? ka - kb : kb - ka;
      });
    let slot = 0;
    let last: Tile | null = null;
    for (const t of inLine) {
      if (last && !last.merged && last.v === t.v) {
        // Merge into the tile already at the wall.
        last.v += 1;
        last.merged = true;
        merges++;
        out.push({ ...t, r: last.r, c: last.c, gone: true });
        moved = true;
        continue;
      }
      const pos = dir === "left" || dir === "up" ? slot : N - 1 - slot;
      const r = dir === "left" || dir === "right" ? line : pos;
      const c = dir === "left" || dir === "right" ? pos : line;
      if (r !== t.r || c !== t.c) moved = true;
      const placed: Tile = { ...t, r, c };
      out.push(placed);
      last = placed;
      slot++;
    }
  }
  return { tiles: out, moved, merges };
}

function canMove(tiles: Tile[]) {
  const live = tiles.filter((t) => !t.gone);
  if (live.length < N * N) return true;
  const at = (r: number, c: number) => live.find((t) => t.r === r && t.c === c)?.v;
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++) {
      const v = at(r, c);
      if (v === at(r, c + 1) || v === at(r + 1, c)) return true;
    }
  return false;
}

export default function KissTheFrogs() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [kisses, setKisses] = useState(0);
  const [over, setOver] = useState(false);
  const [best, setBest] = useState(0);
  const [cheer, setCheer] = useState<{ n: number; v: number } | null>(null);
  const started = useRef(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  const top = tiles.reduce((m, t) => (t.gone ? m : Math.max(m, t.v)), 0);

  const newGame = useCallback(() => {
    setTiles(spawn(spawn([])));
    setKisses(0);
    setOver(false);
    setCheer(null);
    started.current = false;
  }, []);

  useEffect(() => {
    newGame();
    try {
      setBest(parseInt(localStorage.getItem(BEST) || "0", 10) || 0);
    } catch {}
  }, [newGame]);

  const tilesRef = useRef<Tile[]>([]);
  tilesRef.current = tiles;

  const move = useCallback(
    (dir: Dir) => {
      if (over) return;
      const prev = tilesRef.current;
      const res = slide(prev, dir);
      if (!res.moved) return;
      if (!started.current) {
        started.current = true;
        trackQuizStart(SLUG);
      }
      const nextTiles = spawn(res.tiles);
      tilesRef.current = nextTiles;
      setTiles(nextTiles);
      const topOf = (ts: Tile[]) => ts.reduce((m, t) => (t.gone ? m : Math.max(m, t.v)), 0);
      const newTop = topOf(nextTiles);
      if (res.merges) setKisses((k) => k + res.merges);
      if (newTop > topOf(prev) && newTop >= 2) setCheer({ n: Date.now(), v: newTop });
      // Clear the merged-away tiles once they've slid in.
      setTimeout(() => setTiles((ts) => ts.filter((t) => !t.gone)), 130);
      if (!canMove(nextTiles)) {
        setTimeout(() => {
          setOver(true);
          trackQuizComplete(SLUG, newTop);
          trackResultView(SLUG, LADDER[newTop].name);
          setBest((b) => {
            const nb = Math.max(b, newTop);
            try {
              localStorage.setItem(BEST, String(nb));
            } catch {}
            return nb;
          });
        }, 300);
      }
    },
    [over],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" };
      if (map[e.key]) {
        e.preventDefault();
        move(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
    else move(dy > 0 ? "down" : "up");
  };

  const reached = LADDER[Math.max(top, 0)];

  return (
    <div className="max-w-md mx-auto px-3 py-6">
      <div className="text-center mb-4">
        <span className={`inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-2 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
          🐸 merge game · swipe to play
        </span>
        <h1 className="text-[38px] leading-none text-[#1A1033]" style={display}>Kiss the Frogs</h1>
        <p className="text-[15px] font-bold text-[#1A1033]/70 mt-2">Swipe to merge two of the same guy into a better one. Kiss enough frogs and you&apos;ll find your prince 🤴</p>
      </div>

      <div className="flex justify-between items-center text-[13px] font-black text-[#1A1033] mb-2 px-1">
        <span>💋 {kisses} kisses</span>
        <span className="rounded-full bg-white border-2 border-[#1A1033] px-2 py-0.5">{reached.e} {reached.name}</span>
        <span>🏆 {LADDER[best].e}</span>
      </div>

      <div
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (start.current = null)}
        className={`relative w-full aspect-square rounded-[24px] bg-[#FFB3D1] p-2 touch-none select-none ${stickerStatic}`}
      >
        {/* Empty cells */}
        <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
          {Array.from({ length: N * N }, (_, i) => (
            <div key={i} className="rounded-xl bg-white/45 border-2 border-[#1A1033]/15" />
          ))}
        </div>

        {/* Tiles, positioned so they slide */}
        <div className="absolute inset-2">
          {tiles.map((t) => {
            const step = `calc((100% - 24px) / 4 + 8px)`;
            const L = LADDER[Math.min(t.v, LADDER.length - 1)];
            return (
              <div
                key={t.id}
                className="absolute transition-all duration-[120ms] ease-out"
                style={{ width: "calc((100% - 24px) / 4)", height: "calc((100% - 24px) / 4)", left: `calc(${t.c} * ${step})`, top: `calc(${t.r} * ${step})`, zIndex: t.gone ? 1 : 2 }}
              >
                <div
                  key={`${t.id}-${t.v}`}
                  className={`w-full h-full rounded-xl border-[2.5px] border-[#1A1033] shadow-[2px_2px_0_#1A1033] flex flex-col items-center justify-center ${t.isNew || t.merged ? "oc-pop" : ""}`}
                  style={{ backgroundColor: L.bg }}
                >
                  <span className="text-[34px] leading-none">{L.e}</span>
                  <span className="text-[9px] font-black text-[#1A1033] text-center leading-tight mt-0.5 px-0.5">{L.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {cheer && (
          <div key={cheer.n} className="absolute inset-x-0 top-1/3 z-10 flex justify-center pointer-events-none">
            <span className="oc-shout rounded-2xl bg-[#FFE68A] border-[2.5px] border-[#1A1033] shadow-[3px_3px_0_#1A1033] px-4 py-2 text-center">
              <span className="block text-[11px] font-black uppercase tracking-wider text-[#1A1033]/70">New level unlocked</span>
              <span className="block text-[22px] text-[#1A1033]" style={display}>{LADDER[cheer.v].e} {LADDER[cheer.v].name}!</span>
            </span>
          </div>
        )}

        {over && (
          <div className="absolute inset-0 z-20 rounded-[22px] flex flex-col items-center justify-center p-6 text-center bg-[#1A1033]/90">
            <p className="text-6xl mb-2 oc-pop" aria-hidden="true">{reached.e}</p>
            <p className="text-[13px] font-black uppercase tracking-[0.18em] text-white/80">Out of moves. You ended up with</p>
            <p className="text-[30px] leading-tight text-white mb-1" style={display}>{reached.name}</p>
            <p className="text-[15px] font-bold text-white/85 mb-5">after {kisses} kisses.{top >= 10 ? " You found your prince 🤴" : " The prince is still out there."}</p>
            <button type="button" onClick={newGame} className={`w-full min-h-[56px] rounded-2xl bg-white text-[#1A1033] font-black text-lg flex items-center justify-center gap-2 ${sticker}`}>
              <RotateCcw className="w-5 h-5" /> Kiss more frogs
            </button>
          </div>
        )}
      </div>

      {/* Buttons for anyone who doesn't swipe */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {(["left", "up", "down", "right"] as Dir[]).map((d) => (
          <button key={d} type="button" onClick={() => move(d)} className={`min-h-[50px] rounded-2xl bg-white text-[#1A1033] font-black text-xl ${sticker}`} aria-label={`Move ${d}`}>
            {d === "left" ? "⬅️" : d === "up" ? "⬆️" : d === "down" ? "⬇️" : "➡️"}
          </button>
        ))}
      </div>

      {/* The ladder, so she knows what she's aiming for */}
      <div className={`mt-6 rounded-[22px] bg-white p-4 ${stickerStatic}`}>
        <p className="text-[13px] font-black text-[#1A1033] mb-2">The ladder</p>
        <div className="flex flex-wrap gap-1.5">
          {LADDER.slice(0, 11).map((l, i) => (
            <span key={l.name} className={`rounded-full border-2 border-[#1A1033] px-2 py-0.5 text-[11px] font-black text-[#1A1033] ${i <= top ? "" : "opacity-40"}`} style={{ backgroundColor: l.bg }}>
              {l.e} {l.name}
            </span>
          ))}
        </div>
      </div>

      {over && (
        <div className="mt-8">
          <ResultShare quiz="Kiss the Frogs" quizPath={`/${SLUG}`} title={`I kissed ${kisses} frogs and got ${reached.e} ${reached.name}`} score={kisses} scoreLabel="kisses" />
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
