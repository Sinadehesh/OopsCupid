import React from "react";
import Link from "next/link";
import { type Guide, GUIDE_PRICE } from "@/lib/guides/guides";
import { sticker, display } from "@/lib/ui/sticker";

/**
 * "Read about this": the guides that match what she just ticked, as small
 * cards with the price on them. The cheapest thing on the site, and the
 * most directly about her.
 */
export default function GuideCards({ guides, title = "Read about what you ticked" }: { guides: Guide[]; title?: string }) {
  if (!guides.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-[15px] text-[#1A1033] mb-3" style={display}>📖 {title}</h2>
      <div className="space-y-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className={`flex items-center gap-4 rounded-[20px] p-4 ${sticker}`}
            style={{ backgroundColor: g.bg, color: "#1A1033" }}
          >
            <span className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-2xl" aria-hidden="true">{g.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block font-black text-[17px] leading-tight">{g.title}</span>
              <span className="block text-[13px] font-semibold opacity-75 leading-snug mt-0.5">{g.hook}</span>
            </span>
            <span className="shrink-0 rotate-3 rounded-xl bg-[#FFE68A] border-2 border-[#1A1033] px-2 py-1 text-center">
              <span className="block text-[10px] font-black uppercase tracking-wider">Guide</span>
              <span className="block font-black">{GUIDE_PRICE}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
