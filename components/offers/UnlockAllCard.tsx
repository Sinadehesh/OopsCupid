"use client";

import React from "react";
import { Check } from "lucide-react";
import CheckoutButton from "@/components/offers/CheckoutButton";
import { useOwned } from "@/components/guides/GuideCards";
import { GUIDE_META as GUIDES } from "@/lib/guides/meta";
import { stickerStatic, sticker, display } from "@/lib/ui/sticker";

/**
 * The bundle, where a game ends: one €9.99 payment opens every guide,
 * every personal read and every full report. It's the same product as
 * the "full report" everywhere else, described by what it actually
 * opens. Hidden for anyone who already has it.
 */
export default function UnlockAllCard({ returnTo = "/guides", from }: { returnTo?: string; from?: string }) {
  const owned = useOwned();
  if (!owned.checked || owned.all) return null;
  const separately = (GUIDES.length * 1.99).toFixed(2);
  return (
    <div className={`relative rounded-[26px] bg-[#1A1033] text-white p-6 md:p-8 mb-8 ${stickerStatic} !shadow-[5px_5px_0_#FF4FA3]`} data-from={from}>
      <span className="absolute -top-3 right-5 rotate-3 rounded-full bg-[#FFE68A] text-[#1A1033] border-2 border-[#1A1033] px-3 py-1 text-[12px] font-black">
        🔓 the bundle
      </span>
      <h2 className="text-[26px] md:text-3xl leading-tight mb-3" style={display}>Unlock everything · €9.99</h2>
      <ul className="space-y-2 mb-5 font-bold text-white/90">
        <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#FF4FA3] shrink-0 mt-0.5" strokeWidth={3} />All {GUIDES.length} guides (€{separately} if bought one by one)</li>
        <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#FF4FA3] shrink-0 mt-0.5" strokeWidth={3} />A personal read on every quick test and game that has one</li>
        <li className="flex gap-2.5"><Check className="w-5 h-5 text-[#FF4FA3] shrink-0 mt-0.5" strokeWidth={3} />Every full report on the site, built from your own answers</li>
      </ul>
      <CheckoutButton
        sku="premium-report"
        returnTo={returnTo}
        className={`w-full min-h-[60px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg flex items-center justify-center gap-2 disabled:opacity-70 ${sticker} !border-white !shadow-[4px_4px_0_#ffffff]`}
      >
        Unlock everything · €9.99
      </CheckoutButton>
      <p className="text-center text-xs font-bold text-white/55 mt-3">Apple Pay, Google Pay or card · one payment, no subscription · 7-day refund</p>
    </div>
  );
}
