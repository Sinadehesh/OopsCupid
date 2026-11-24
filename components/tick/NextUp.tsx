"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QUICK_TESTS } from "@/lib/quizzes/tickTests";
import { doneSlugs } from "@/lib/progress";
import { sticker, display } from "@/lib/ui/sticker";

/**
 * After a result: how many she has done, and the next one she hasn't.
 * The next pick walks on from this quiz in the list, skipping any she has
 * finished, so each result leads somewhere new.
 */
export default function NextUp({ slug, className = "" }: { slug: string; className?: string }) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const read = () => setDone(doneSlugs());
    read();
    window.addEventListener("oc-progress", read);
    return () => window.removeEventListener("oc-progress", read);
  }, []);

  const total = QUICK_TESTS.length;
  const finished = QUICK_TESTS.filter((t) => done.includes(t.slug) || t.slug === slug).length;
  const at = Math.max(0, QUICK_TESTS.findIndex((t) => t.slug === slug));
  let next = QUICK_TESTS[(at + 1) % total];
  for (let k = 1; k < total; k++) {
    const t = QUICK_TESTS[(at + k) % total];
    if (t.slug !== slug && !done.includes(t.slug)) {
      next = t;
      break;
    }
  }

  return (
    <div className={`my-8 ${className}`}>
      <div className="flex items-center justify-between text-[13px] font-black text-[#1A1033] mb-1.5">
        <span>🎟️ {finished} of {total} done</span>
        <span className="text-[#1A1033]/55">{finished >= total ? "all of them 🏆" : `${total - finished} to go`}</span>
      </div>
      <div className="h-3 rounded-full bg-white border-2 border-[#1A1033] overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] transition-all duration-500" style={{ width: `${Math.max(4, (finished / total) * 100)}%` }} />
      </div>
      <Link href={`/${next.slug}`} className={`flex items-center gap-4 rounded-[24px] p-5 ${sticker}`} style={{ backgroundColor: next.bg, color: "#1A1033" }}>
        <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{next.emoji}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Up next{next.fun ? " · just for fun" : ""}</span>
          <span className="block text-xl leading-snug" style={display}>{next.short}</span>
        </span>
        <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
      </Link>
    </div>
  );
}
