"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { dailyNumber, nextBadge, untilTomorrow } from "@/lib/games/streaks";
import { stickerStatic, display } from "@/lib/ui/sticker";

/** The strip at the top of a game: today's challenge, done or not, and the streak. */
export default function DailyBanner({ goal, done, streak, ready }: { goal: string; done: boolean; streak: number; ready: boolean }) {
  const [left, setLeft] = useState("");
  useEffect(() => {
    setLeft(untilTomorrow());
    const t = setInterval(() => setLeft(untilTomorrow()), 30000);
    return () => clearInterval(t);
  }, []);
  if (!ready) return <div className="h-[74px] mb-4" />;
  const badge = nextBadge(streak);
  return (
    <div className={`rounded-[20px] px-4 py-3 mb-4 ${stickerStatic} ${done ? "bg-[#B8F2D8]" : "bg-[#FFE68A]"}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1A1033]/70">📅 Daily #{dailyNumber()}</p>
        <Link href="/daily" className="text-[12px] font-black text-[#1A1033] underline">All dailies →</Link>
      </div>
      <p className="text-[17px] leading-tight text-[#1A1033] mt-0.5" style={display}>
        {done ? `✅ Done! ${goal}` : `🎯 ${goal}`}
      </p>
      <p className="text-[12px] font-black text-[#1A1033]/75 mt-1">
        🔥 {streak}-day streak
        {badge ? ` · ${badge.days - streak} to ${badge.emoji} ${badge.name}` : ""}
        {done ? ` · next in ${left}` : ""}
      </p>
    </div>
  );
}

/** A big celebration when today's challenge is completed. */
export function DailyDone({ show, streak, onClose }: { show: number | null; streak: number; onClose: () => void }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [show, onClose]);
  if (!show) return null;
  return (
    <div key={show} className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-6">
      <div className="oc-shout rounded-[26px] bg-[#FFE68A] border-[3px] border-[#1A1033] shadow-[6px_6px_0_#1A1033] px-6 py-5 text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#1A1033]/70">Daily challenge done</p>
        <p className="text-[40px] leading-none text-[#FF4FA3] my-1" style={{ ...display, WebkitTextStroke: "1.5px #1A1033" }}>🔥 {streak}</p>
        <p className="text-[16px] font-black text-[#1A1033]">day streak! Come back tomorrow</p>
      </div>
    </div>
  );
}
