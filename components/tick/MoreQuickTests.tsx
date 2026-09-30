import React from "react";
import Link from "next/link";
import { QUICK_TESTS } from "@/lib/quizzes/tickTests";
import { CANDY, INK, sticker, display } from "@/lib/ui/sticker";

/**
 * "Try another one": every quick test and game, as a swipeable row of
 * stickers. A visitor who has just finished one has shown she likes the
 * format, and the next one is a tap away.
 */
export default function MoreQuickTests({
  exclude,
  title = "Try another one",
  className = "",
}: {
  exclude?: string;
  title?: string;
  className?: string;
}) {
  const tests = QUICK_TESTS.filter((t) => t.slug !== exclude);
  return (
    <section className={`mt-10 ${className}`}>
      <h2 className="text-[15px] text-[#1A1033] mb-3" style={display}>⚡ {title} <span className="text-[#1A1033]/45 font-bold">· swipe →</span></h2>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pt-1 pb-3 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tests.map((t, i) => (
          <Link
            key={t.slug}
            href={`/${t.slug}`}
            className={`snap-start shrink-0 w-[150px] rounded-[20px] p-3.5 min-h-[124px] flex flex-col justify-between ${sticker} ${i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : ""}`}
            style={{ backgroundColor: CANDY[i % CANDY.length], color: INK }}
          >
            <span className="w-9 h-9 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-lg" aria-hidden="true">{t.emoji}</span>
            <span className="text-[15px] font-black leading-tight mt-2">{t.short}</span>
            <span className="mt-1.5 self-start rounded-full bg-[#1A1033] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              {t.fun ? "for fun" : "40 sec"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
