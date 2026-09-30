import React from "react";
import Link from "next/link";
import { type Guide, GUIDE_PRICE } from "@/lib/guides/guides";

/**
 * "Read about this": the guides that match what she just ticked, as small
 * cards with the price on them. The cheapest thing on the site, and the
 * most directly about her.
 */
export default function GuideCards({ guides, title = "Read about what you ticked" }: { guides: Guide[]; title?: string }) {
  if (!guides.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">{title}</h2>
      <div className="space-y-2.5">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="flex items-center gap-4 rounded-2xl p-4 active:scale-[0.98] transition-transform"
            style={{ backgroundColor: g.bg, color: g.fg }}
          >
            <span className="text-3xl shrink-0" aria-hidden="true">{g.emoji}</span>
            <span className="flex-1 min-w-0">
              <span className="block font-black text-[17px] leading-tight">{g.title}</span>
              <span className="block text-[13px] font-semibold opacity-75 leading-snug mt-0.5">{g.hook}</span>
            </span>
            <span className="shrink-0 text-center">
              <span className="block text-[11px] font-black uppercase tracking-wider opacity-60">Guide</span>
              <span className="block font-black">{GUIDE_PRICE}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
