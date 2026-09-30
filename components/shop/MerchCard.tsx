"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { shopUrl } from "@/lib/shop";
import { trackShopClick } from "@/lib/track";

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
      className={`group flex items-center gap-4 rounded-3xl bg-[#F3ECEB] border border-[#E7DAD7] p-4 pr-5 mb-8 active:scale-[0.98] transition-transform ${className}`}
    >
      <span className="shrink-0 w-20 h-24 rounded-2xl bg-white flex items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="The OopsCupid cupid" width={64} height={88} className="object-contain group-hover:scale-105 transition-transform" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#E07850] mb-0.5">{kicker}</span>
        <span className="block text-lg font-black text-slate-900 leading-snug">{title}</span>
        <span className="block text-[13px] font-semibold text-slate-500 leading-snug mt-0.5">{line}</span>
      </span>
      <span className="shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
        <ArrowUpRight className="w-5 h-5" />
      </span>
    </a>
  );
}
