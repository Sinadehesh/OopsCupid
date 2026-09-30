import React from "react";
import Link from "next/link";
import { QUICK_TESTS } from "@/lib/quizzes/tickTests";

/**
 * "Try another one": every forty-second test, as a swipeable row. A visitor
 * who has just finished one has already shown she likes the format, and
 * the next one is a tap away rather than a trip back to the homepage.
 */
export default function MoreQuickTests({
  exclude,
  title = "Try another 40-second test",
  className = "",
}: {
  exclude?: string;
  title?: string;
  className?: string;
}) {
  const tests = QUICK_TESTS.filter((t) => t.slug !== exclude);
  return (
    <section className={`mt-10 ${className}`}>
      <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">{title}</h2>
      <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tests.map((t) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className="snap-start shrink-0 w-[150px] rounded-2xl p-4 min-h-[112px] flex flex-col justify-between active:scale-[0.97] transition-transform"
            style={{ backgroundColor: t.bg, color: t.fg }}
          >
            <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
            <span className="text-[15px] font-extrabold leading-tight mt-2">{t.short}</span>
            <span className="text-[11px] font-bold opacity-60 mt-1">{t.fun ? "Just for fun →" : "40 seconds →"}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
