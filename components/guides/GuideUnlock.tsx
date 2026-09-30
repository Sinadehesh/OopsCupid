"use client";

import React from "react";
import { Lock, Check } from "lucide-react";
import CheckoutButton from "@/components/offers/CheckoutButton";

/** The €1.99 paywall under a guide's free first section. */
export default function GuideUnlock({ slug, rest, minutes }: { slug: string; rest: string[]; minutes: number }) {
  return (
    <div className="relative rounded-3xl bg-[#0E1621] text-white p-6 md:p-8 my-8 overflow-hidden shadow-[0_18px_50px_rgba(14,22,33,0.35)]">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#EC8A66]/25 blur-3xl" />
      <p className="relative text-[11px] font-black uppercase tracking-[0.2em] text-[#F5DD90] mb-2 flex items-center gap-1.5">
        <Lock className="w-3.5 h-3.5" /> Keep reading
      </p>
      <h2 className="relative text-2xl md:text-3xl font-black leading-snug mb-4">The rest of this guide</h2>
      <ul className="relative space-y-2 mb-6">
        {rest.map((t) => (
          <li key={t} className="flex gap-2.5 font-semibold text-white/90">
            <Check className="w-5 h-5 text-[#EC8A66] shrink-0 mt-0.5" /> {t}
          </li>
        ))}
      </ul>
      <CheckoutButton
        sku="guide"
        returnTo={`/guides/${slug}`}
        className="relative w-full min-h-[62px] bg-[#EC8A66] hover:bg-[#E07850] text-white font-black text-xl rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(236,138,102,0.45)] active:scale-[0.98] disabled:opacity-70"
      >
        Unlock the full guide · €1.99
      </CheckoutButton>
      <p className="relative text-center text-xs font-bold text-white/55 mt-3">
        About {minutes} minutes · Apple Pay, Google Pay or card · yours to reread any time
      </p>
      <div className="relative mt-5 pt-5 border-t border-white/10 text-center">
        <CheckoutButton
          sku="premium-report"
          returnTo={`/guides/${slug}`}
          className="text-sm font-extrabold text-[#F5DD90] hover:underline disabled:opacity-70"
        >
          Or unlock every guide, every read and every full report · €9.99
        </CheckoutButton>
      </div>
    </div>
  );
}
