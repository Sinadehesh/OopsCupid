"use client";

import React from "react";
import { Undo2 } from "lucide-react";
import type { TickItem } from "@/lib/quizzes/tickTests";
import type { Tier } from "@/lib/quizzes/tickGames";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

const ROW_BG = ["#FF8FB8", "#FFE68A", "#B8F2D8"];
const ROW_TAG = ["S", "A", "F"];

/** The finished (or growing) tier list. */
export function TierBoard({
  items,
  tiers,
  labels,
  name,
  latest,
}: {
  items: TickItem[];
  tiers: Record<string, Tier>;
  labels: [string, string, string];
  name: string;
  latest?: string;
}) {
  return (
    <div className={`rounded-[22px] bg-white overflow-hidden ${stickerStatic}`}>
      <p className="bg-[#1A1033] text-white text-center py-2 text-[18px]" style={display}>{name}</p>
      {labels.map((label, t) => {
        const row = items.filter((it) => tiers[it.id] === t);
        return (
          <div key={t} className="flex border-t-2 border-[#1A1033] min-h-[64px]">
            <div className="w-[76px] shrink-0 flex flex-col items-center justify-center border-r-2 border-[#1A1033] px-1 text-center" style={{ backgroundColor: ROW_BG[t] }}>
              <span className="text-[22px] leading-none text-[#1A1033]" style={display}>{ROW_TAG[t]}</span>
              <span className="text-[10px] font-black leading-tight text-[#1A1033] mt-1">{label}</span>
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 p-2 content-start bg-[#FFF8FC]">
              {row.map((it) => (
                <span
                  key={it.id}
                  className={`rounded-lg border-2 border-[#1A1033] px-2 py-1 text-[11.5px] font-extrabold leading-tight text-[#1A1033] ${it.id === latest ? "oc-drop" : ""}`}
                  style={{ backgroundColor: ROW_BG[t] }}
                >
                  {it.text}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The game: one card at a time, three buttons, the board fills up above. */
export function TierGame({
  items,
  tiers,
  labels,
  name,
  order,
  onSet,
  onUndo,
}: {
  items: TickItem[];
  tiers: Record<string, Tier>;
  labels: [string, string, string];
  name: string;
  /** Ids in the order they were sorted, for undo and the drop animation. */
  order: string[];
  onSet: (id: string, t: Tier) => void;
  onUndo: () => void;
}) {
  const current = items.find((it) => tiers[it.id] === undefined);
  const done = items.filter((it) => tiers[it.id] !== undefined).length;

  return (
    <div>
      {current ? (
        <div key={current.id} className={`oc-pop rounded-[24px] bg-[#C9B6FF] p-5 mb-3 ${stickerStatic}`}>
          <div className="flex items-center justify-between mb-2 text-[12px] font-black text-[#1A1033]/70">
            <span>Card {done + 1} of {items.length}</span>
            {order.length > 0 && (
              <button type="button" onClick={onUndo} className="inline-flex items-center gap-1 rounded-full bg-white border-2 border-[#1A1033] px-2 py-0.5 text-[#1A1033]">
                <Undo2 className="w-3.5 h-3.5" strokeWidth={3} /> undo
              </button>
            )}
          </div>
          <p className="text-[24px] leading-[1.15] text-[#1A1033] mb-4" style={display}>{current.text}</p>
          <div className="grid grid-cols-3 gap-2">
            {labels.map((label, t) => (
              <button
                key={t}
                type="button"
                onClick={() => onSet(current.id, t as Tier)}
                className={`min-h-[64px] rounded-2xl px-1.5 py-2 text-[13px] font-black leading-tight text-[#1A1033] ${sticker}`}
                style={{ backgroundColor: ROW_BG[t] }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`rounded-[24px] bg-[#B8F2D8] p-5 mb-3 text-center ${stickerStatic}`}>
          <p className="text-2xl text-[#1A1033]" style={display}>Tier list complete 🎉</p>
          <button type="button" onClick={onUndo} className="mt-2 inline-flex items-center gap-1 text-[13px] font-black text-[#1A1033]/60">
            <Undo2 className="w-3.5 h-3.5" strokeWidth={3} /> undo the last one
          </button>
        </div>
      )}
      <TierBoard items={items} tiers={tiers} labels={labels} name={name} latest={order[order.length - 1]} />
    </div>
  );
}
