"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { type GuideMeta as Guide, GUIDE_PRICE } from "@/lib/guides/meta";
import CheckoutButton from "@/components/offers/CheckoutButton";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

/** What the access cookie already opens, so nobody is offered something twice. */
export function useOwned() {
  const [owned, setOwned] = useState<{ checked: boolean; all: boolean; reads: string[] }>({ checked: false, all: false, reads: [] });
  useEffect(() => {
    let off = false;
    fetch("/api/access", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => !off && setOwned({ checked: true, all: Boolean(d?.premiumReport), reads: Array.isArray(d?.reads) ? d.reads : [] }))
      .catch(() => !off && setOwned((o) => ({ ...o, checked: true })));
    return () => {
      off = true;
    };
  }, []);
  return owned;
}

/**
 * "Read about this": the guides that match what she just did, as small
 * cards. Tap the card to read the free part first, or tap the price to go
 * straight to Stripe: an impulse buy should be one tap, not two pages.
 */
export default function GuideCards({ guides, title = "Read about what you ticked" }: { guides: Guide[]; title?: string }) {
  const owned = useOwned();
  if (!guides.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-[15px] text-[#1A1033] mb-3" style={display}>📖 {title}</h2>
      <div className="space-y-3">
        {guides.map((g) => {
          const has = owned.all || owned.reads.includes(`guides/${g.slug}`);
          return (
            <div key={g.slug} className={`flex items-center gap-3 rounded-[20px] p-4 ${stickerStatic}`} style={{ backgroundColor: g.bg, color: "#1A1033" }}>
              <Link href={`/guides/${g.slug}`} className="flex flex-1 min-w-0 items-center gap-3">
                <span className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-2xl" aria-hidden="true">{g.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-black text-[17px] leading-tight">{g.title}</span>
                  <span className="block text-[13px] font-semibold opacity-75 leading-snug mt-0.5">{g.hook}</span>
                  {!has && <span className="block text-[12px] font-black mt-1 underline">Read the free part</span>}
                </span>
              </Link>
              {has ? (
                <Link href={`/guides/${g.slug}`} className={`shrink-0 rounded-xl bg-[#B8F2D8] px-2.5 py-1.5 text-center text-[12px] font-black leading-tight ${sticker}`}>
                  ✓ Yours
                  <br />
                  Read
                </Link>
              ) : (
                <CheckoutButton
                  sku="guide"
                  returnTo={`/guides/${g.slug}`}
                  compact
                  className={`shrink-0 rotate-3 rounded-xl bg-[#FFE68A] px-2.5 py-1.5 text-center min-w-[64px] disabled:opacity-70 ${sticker}`}
                >
                  <span className="block text-[10px] font-black uppercase tracking-wider">Get it</span>
                  <span className="block font-black">{GUIDE_PRICE}</span>
                </CheckoutButton>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
