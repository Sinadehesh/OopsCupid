"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DAILY_GAMES, dailyNumber, doneToday, liveStreak, loadStreak, untilTomorrow } from "@/lib/games/streaks";
import { trackHomeClick } from "@/lib/track";
import { sticker, display } from "@/lib/ui/sticker";

/** The homepage nudge: today's challenges, how many are done, the streak. */
export default function DailyCard() {
  const [state, setState] = useState<{ done: number; streak: number; left: string; n: number } | null>(null);
  useEffect(() => {
    const saves = DAILY_GAMES.map((g) => loadStreak(g.id));
    setState({
      done: saves.filter((s) => doneToday(s)).length,
      streak: Math.max(0, ...saves.map((s) => liveStreak(s))),
      left: untilTomorrow(),
      n: dailyNumber(),
    });
  }, []);
  return (
    <Link
      href="/daily"
      onClick={() => trackHomeClick("daily")}
      className={`relative flex items-center gap-4 rounded-[24px] bg-[#1A1033] text-white px-5 py-4 mb-5 ${sticker} !shadow-[4px_4px_0_#FF4FA3]`}
    >
      <span className="shrink-0 w-12 h-12 rounded-2xl bg-white/15 border-2 border-white/40 flex items-center justify-center text-2xl" aria-hidden="true">📅</span>
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/70">
          Daily{state ? ` #${state.n}` : ""} · new every day
        </span>
        <span className="block text-[18px] leading-tight" style={display}>
          {state ? `${state.done}/${DAILY_GAMES.length} challenges done today` : "Today's challenges"}
        </span>
        <span className="block text-[12px] font-bold text-white/75 mt-0.5">
          {state && state.streak > 0 ? `🔥 ${state.streak}-day streak · don't break it` : "🔥 Start a streak today"}
          {state ? ` · resets in ${state.left}` : ""}
        </span>
      </span>
      <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
    </Link>
  );
}
