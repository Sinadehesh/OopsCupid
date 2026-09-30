"use client";

import React from "react";
import type { TickItem } from "@/lib/quizzes/tickTests";
import { sticker } from "@/lib/ui/sticker";

const MONO = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" } as const;

/** The shelf: every item as a product to scan. */
export function ReceiptShelf({
  items,
  selected,
  onToggle,
}: {
  items: TickItem[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((it, i) => {
        const on = selected.includes(it.id);
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onToggle(it.id)}
            aria-pressed={on}
            className={`relative text-left rounded-2xl px-3.5 py-3 flex items-center gap-3 font-bold text-[15px] leading-snug text-[#1A1033] ${sticker} ${on ? "bg-[#B8F2D8]" : "bg-white"}`}
          >
            <span className="shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-lg border-2 border-[#1A1033] bg-white" aria-hidden="true">
              {/* a tiny barcode */}
              <span className="flex gap-[1.5px] h-4">
                {[2, 1, 3, 1, 2, 1, 1, 3].map((w, k) => (
                  <span key={k} className="bg-[#1A1033] h-full" style={{ width: w }} />
                ))}
              </span>
              <span className="text-[8px] font-black mt-0.5" style={MONO}>{String(i + 1).padStart(3, "0")}</span>
            </span>
            <span className="flex-1">{it.text}</span>
            <span className={`shrink-0 rounded-full border-2 border-[#1A1033] px-2 py-0.5 text-[10px] font-black ${on ? "bg-[#1A1033] text-white" : "bg-[#FFE68A]"}`}>
              {on ? "✓ SCANNED" : "SCAN"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** The printed receipt: what she scanned, itemised and totalled. */
export function Receipt({
  items,
  selected,
  store,
  paidWith,
  total,
  animate = false,
}: {
  items: TickItem[];
  selected: string[];
  store: string;
  paidWith: string;
  total: number;
  animate?: boolean;
}) {
  const picked = items.filter((it) => selected.includes(it.id));
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  let line = 0;
  const L = (children: React.ReactNode, className = "") => {
    const d = line++ * 90;
    return (
      <div className={`${animate ? "oc-print" : ""} ${className}`} style={animate ? { animationDelay: `${d}ms` } : undefined}>
        {children}
      </div>
    );
  };
  const dotted = <div className="border-t-2 border-dashed border-[#1A1033]/40 my-2" />;

  return (
    <div className="relative mx-auto max-w-[360px] -rotate-1" style={{ filter: "drop-shadow(4px 4px 0 #1A1033)" }}>
      <div className="bg-[#FFFDF6] text-[#1A1033] px-5 pt-5 pb-7 border-x-2 border-t-2 border-[#1A1033]" style={{ ...MONO, clipPath: "polygon(0 0,100% 0,100% calc(100% - 8px),95% 100%,90% calc(100% - 8px),85% 100%,80% calc(100% - 8px),75% 100%,70% calc(100% - 8px),65% 100%,60% calc(100% - 8px),55% 100%,50% calc(100% - 8px),45% 100%,40% calc(100% - 8px),35% 100%,30% calc(100% - 8px),25% 100%,20% calc(100% - 8px),15% 100%,10% calc(100% - 8px),5% 100%,0 calc(100% - 8px))" }}>
        {L(<p className="text-center text-[17px] font-black tracking-wider">{store}</p>)}
        {L(<p className="text-center text-[11px] font-bold opacity-70">OOPSCUPID.COM · {today}</p>)}
        {dotted}
        {picked.length === 0 && L(<p className="text-[13px] font-bold text-center py-3">NO ITEMS SCANNED. CLEAN RECORD ✨</p>)}
        {picked.map((it) => (
          <React.Fragment key={it.id}>{L(
            <div className="flex gap-2 text-[12.5px] font-bold leading-snug py-0.5">
              <span className="shrink-0">1x</span>
              <span className="flex-1 uppercase">{it.text}</span>
              <span className="shrink-0">{it.flag ? "🚩" : "✓"}</span>
            </div>,
          )}</React.Fragment>
        ))}
        {dotted}
        {L(
          <div className="flex justify-between text-[15px] font-black">
            <span>TOTAL</span>
            <span>{picked.length} OF {total}</span>
          </div>,
        )}
        {L(
          <div className="flex justify-between text-[12px] font-bold">
            <span>PAID WITH</span>
            <span className="text-right">{paidWith}</span>
          </div>,
        )}
        {L(
          <div className="flex justify-between text-[12px] font-bold">
            <span>REFUNDS</span>
            <span>NOT AVAILABLE</span>
          </div>,
        )}
        {dotted}
        {L(
          <div className="flex justify-center gap-[2px] h-10 mt-2" aria-hidden="true">
            {Array.from({ length: 38 }, (_, k) => (
              <span key={k} className="bg-[#1A1033] h-full" style={{ width: [1, 2, 3, 1, 2][(k * 7 + picked.length) % 5] }} />
            ))}
          </div>,
        )}
        {L(<p className="text-center text-[11px] font-bold mt-2">THANK YOU. COME AGAIN (PLEASE DON&apos;T)</p>)}
      </div>
    </div>
  );
}
