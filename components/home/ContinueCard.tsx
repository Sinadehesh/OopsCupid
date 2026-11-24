"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QUICK_TESTS } from "@/lib/quizzes/tickTests";
import { doneSlugs } from "@/lib/progress";
import { trackHomeClick } from "@/lib/track";

/** For a returning visitor: her count so far and the next quiz she hasn't done. */
export default function ContinueCard() {
  const [done, setDone] = useState<string[] | null>(null);
  useEffect(() => setDone(doneSlugs()), []);
  if (!done) return null;
  const finished = QUICK_TESTS.filter((t) => done.includes(t.slug)).length;
  if (finished === 0) return null;
  const next = QUICK_TESTS.find((t) => !done.includes(t.slug));
  if (!next) return null;
  return (
    <Link
      href={`/${next.slug}`}
      onClick={() => trackHomeClick("continue")}
      className="flex items-center gap-3 rounded-[22px] bg-white px-4 py-3.5 mb-5 border-[2.5px] border-[#1A1033] shadow-[4px_4px_0_#1A1033] active:shadow-[1px_1px_0_#1A1033] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-100"
    >
      <span className="w-11 h-11 shrink-0 rounded-full border-2 border-[#1A1033] flex items-center justify-center text-xl" style={{ backgroundColor: next.bg }} aria-hidden="true">
        {next.emoji}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-[#1A1033]/60">
          🎟️ {finished} of {QUICK_TESTS.length} done · keep going
        </span>
        <span className="block text-[16px] font-black leading-tight text-[#1A1033] truncate">{next.short}</span>
      </span>
      <ArrowRight className="w-5 h-5 shrink-0 text-[#1A1033]" strokeWidth={3} />
    </Link>
  );
}
