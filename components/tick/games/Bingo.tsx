"use client";

import React, { useEffect, useRef, useState } from "react";
import { CANDY, stickerStatic, display } from "@/lib/ui/sticker";

/** 16 items make a 4x4 card, 12 make 3 across by 4 down. */
export function bingoShape(n: number) {
  return n === 16 ? { cols: 4, rows: 4 } : { cols: 3, rows: Math.ceil(n / 3) };
}

/** Every winning line, as lists of cell indexes. Diagonals only on a square card. */
export function bingoLines(n: number): number[][] {
  const { cols, rows } = bingoShape(n);
  const lines: number[][] = [];
  for (let r = 0; r < rows; r++) lines.push(Array.from({ length: cols }, (_, c) => r * cols + c));
  for (let c = 0; c < cols; c++) lines.push(Array.from({ length: rows }, (_, r) => r * cols + c));
  if (cols === rows) {
    lines.push(Array.from({ length: cols }, (_, k) => k * cols + k));
    lines.push(Array.from({ length: cols }, (_, k) => k * cols + (cols - 1 - k)));
  }
  return lines.filter((l) => l.every((i) => i < n));
}

export type BingoItem = { id: string; text: string };

export function completedLines(items: BingoItem[], selected: string[]) {
  const on = new Set(items.map((it, i) => (selected.includes(it.id) ? i : -1)).filter((i) => i >= 0));
  return bingoLines(items.length).filter((l) => l.every((i) => on.has(i)));
}

const STAMPS = ["💀", "🚩", "😬", "👀", "🙃", "💅", "🔥", "😳"];

export function BingoBoard({
  items,
  selected,
  name,
  emoji,
  onToggle,
}: {
  items: BingoItem[];
  selected: string[];
  name: string;
  emoji: string;
  /** Leave out for the finished, read-only card. */
  onToggle?: (id: string) => void;
}) {
  const { cols } = bingoShape(items.length);
  const lines = completedLines(items, selected);
  const inLine = new Set(lines.flat());
  const full = selected.length === items.length;

  // Shout BINGO whenever a new line completes.
  const prev = useRef(lines.length);
  const [shout, setShout] = useState<{ n: number; text: string } | null>(null);
  useEffect(() => {
    if (!onToggle) return;
    if (lines.length > prev.current) {
      setShout({ n: Date.now(), text: full ? "BLACKOUT!" : lines.length > 1 ? `BINGO x${lines.length}!` : "BINGO!" });
      const t = setTimeout(() => setShout(null), 1300);
      prev.current = lines.length;
      return () => clearTimeout(t);
    }
    prev.current = lines.length;
  }, [lines.length, full, onToggle]);

  return (
    <div className={`relative rounded-[24px] bg-[#FF4FA3] p-2.5 sm:p-3 ${stickerStatic}`}>
      <div className="flex items-center justify-between px-1.5 pb-2 text-white">
        <span className="text-[20px] sm:text-2xl leading-none" style={display}>{emoji} {name}</span>
        <span className="rounded-full bg-white text-[#1A1033] border-2 border-[#1A1033] px-2 py-0.5 text-[11px] font-black tabular-nums shrink-0">
          {lines.length} {lines.length === 1 ? "line" : "lines"}
        </span>
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {items.map((it, i) => {
          const on = selected.includes(it.id);
          const Cell = onToggle ? "button" : "div";
          return (
            <Cell
              key={it.id}
              {...(onToggle ? { onClick: () => onToggle(it.id), "aria-pressed": on, type: "button" as const } : {})}
              className={`relative overflow-hidden rounded-xl border-2 border-[#1A1033] p-1.5 flex items-center justify-center text-center min-h-[92px] sm:min-h-[110px] transition-colors ${
                inLine.has(i) ? "bg-[#FFE68A]" : on ? "" : "bg-white"
              } ${onToggle ? "active:scale-95 transition-transform" : ""}`}
              style={on && !inLine.has(i) ? { backgroundColor: CANDY[i % CANDY.length] } : undefined}
            >
              <span className={`relative z-10 font-extrabold leading-[1.15] text-[#1A1033] ${cols === 4 ? "text-[10.5px] sm:text-[13px]" : "text-[12.5px] sm:text-[14px]"}`}>
                {it.text}
              </span>
              {on && (
                <span
                  aria-hidden="true"
                  className={`${onToggle ? "oc-stamp" : ""} absolute z-0 inset-1 rounded-full border-[3px] border-[#FF4FA3] bg-[#FF4FA3]/15 flex items-center justify-center -rotate-12 pointer-events-none`}
                >
                  <span className="text-[44px] opacity-30">{STAMPS[i % STAMPS.length]}</span>
                </span>
              )}
            </Cell>
          );
        })}
      </div>

      {shout && (
        <div key={shout.n} className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="oc-shout rounded-[28px] bg-[#FFE68A] border-[3px] border-[#1A1033] shadow-[6px_6px_0_#1A1033] px-8 py-5 text-center">
            <p className="text-[54px] leading-none text-[#FF4FA3]" style={{ ...display, WebkitTextStroke: "2px #1A1033" }}>{shout.text}</p>
            <p className="text-2xl mt-1">🎉💀🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}
