"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { shopUrl } from "@/lib/shop";
import { trackShopClick } from "@/lib/track";
import { sticker, display } from "@/lib/ui/sticker";

/**
 * The merch, shown where people are in a good mood: after a result, after
 * a guide, on the homepage. It goes straight to the Spreadshop store,
 * which prints, ships and handles every customer question.
 */
export default function MerchCard({
  from,
  kicker = "The merch",
  title = "Put the cupid on it.",
  line = "Our patron saint of bad decisions, on tees and hoodies.",
  className = "",
}: {
  from: string;
  kicker?: string;
  title?: string;
  line?: string;
  className?: string;
}) {
  return (
    <a
      href={shopUrl(from)}
      target="_blank"
      rel="noopener"
      onClick={() => trackShopClick(from)}
      className={`group flex items-center gap-4 rounded-[24px] bg-[#C9B6FF] p-4 pr-5 mb-8 ${sticker} ${className}`}
    >
      <span className="shrink-0 w-20 h-24 rounded-2xl bg-white border-2 border-[#1A1033] -rotate-3 flex items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="The OopsCupid cupid" width={64} height={88} className="object-contain group-hover:scale-105 transition-transform" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#1A1033]/70 mb-0.5">🛍️ {kicker}</span>
        <span className="block text-lg text-[#1A1033] leading-snug" style={display}>{title}</span>
        <span className="block text-[13px] font-bold text-[#1A1033]/70 leading-snug mt-0.5">{line}</span>
      </span>
      <span className="shrink-0 w-10 h-10 rounded-full bg-[#FF4FA3] border-2 border-[#1A1033] text-white flex items-center justify-center">
        <ArrowUpRight className="w-5 h-5" />
      </span>
    </a>
  );
}
