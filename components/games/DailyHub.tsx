"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Check } from "lucide-react";
import { DAILY_SECONDS, dailyPicks, loadFlagsResult, saveFlagsResult, shareText, dailyGoal, type Mark } from "@/lib/games/daily";
import { DAILY_GAMES, dailyNumber, doneToday, liveStreak, loadStreak, untilTomorrow, useDaily, badgeFor, STREAK_BADGES, type StreakSave } from "@/lib/games/streaks";
import { trackQuizStart, trackQuizComplete, trackShare } from "@/lib/track";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import MerchCard from "@/components/shop/MerchCard";
import { CANDY, sticker, stickerStatic, display } from "@/lib/ui/sticker";

/** The Daily 5 flags game itself. */
function DailyFlags() {
  // Today's five, worked out in her browser (the page itself is built ahead of time).
  const picks = useRef(dailyPicks()).current;
  const daily = useDaily("flags");
  const [marks, setMarks] = useState<Mark[] | null>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [left, setLeft] = useState(DAILY_SECONDS);
  const [flash, setFlash] = useState<Mark | null>(null);
  const [copied, setCopied] = useState(false);
  const live = useRef<Mark[]>([]);

  useEffect(() => setMarks(loadFlagsResult()), []);

  const answer = useCallback(
    (m: Mark) => {
      live.current = [...live.current, m];
      setFlash(m);
      setTimeout(() => setFlash(null), 450);
      if (live.current.length >= picks.length) {
        setPlaying(false);
        saveFlagsResult(live.current);
        setMarks(live.current);
        daily.complete();
        trackQuizComplete("daily-flags", picks.length);
      } else {
        setI(live.current.length);
        setLeft(DAILY_SECONDS);
      }
    },
    [picks.length, daily],
  );

  // The clock: run out and it counts as a miss.
  useEffect(() => {
    if (!playing) return;
    if (left <= 0) {
      answer("t");
      return;
    }
    const t = setTimeout(() => setLeft((s) => +(s - 0.1).toFixed(1)), 100);
    return () => clearTimeout(t);
  }, [playing, left, answer]);

  const start = () => {
    live.current = [];
    setI(0);
    setLeft(DAILY_SECONDS);
    setPlaying(true);
    trackQuizStart("daily-flags");
  };

  const share = async () => {
    const text = shareText(dailyNumber(), marks ?? [], daily.streak);
    trackShare("/daily", "daily");
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {}
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  // Already played today: show the row and the share.
  if (marks) {
    const score = marks.filter((m) => m === "g").length;
    return (
      <div className={`rounded-[26px] bg-white p-6 text-center mb-6 ${stickerStatic}`}>
        <p className="text-[12px] font-black uppercase tracking-[0.18em] text-[#1A1033]/60">Daily 5 · #{dailyNumber()}</p>
        <p className="text-[44px] tracking-[0.15em] my-2" aria-label={`${score} of ${marks.length}`}>
          {marks.map((m) => (m === "g" ? "💚" : m === "r" ? "🚩" : "⏰")).join("")}
        </p>
        <p className="text-[24px] text-[#1A1033]" style={display}>{score}/{marks.length} · 🔥 {daily.streak}-day streak</p>
        <p className="text-[14px] font-bold text-[#1A1033]/60 mt-1">New flags in {untilTomorrow()}</p>
        <button type="button" onClick={share} className={`mt-4 w-full min-h-[56px] rounded-2xl bg-[#FF4FA3] text-white font-black text-lg flex items-center justify-center gap-2 ${sticker}`}>
          {copied ? <><Check className="w-5 h-5" /> Copied, paste it anywhere</> : <><Share2 className="w-5 h-5" /> Share my row</>}
        </button>
        <div className="mt-5 text-left space-y-2">
          {picks.map((p, k) => (
            <p key={k} className="text-[13px] font-bold text-[#1A1033]/80">
              {marks[k] === "g" ? "💚" : marks[k] === "r" ? "🚩" : "⏰"} <b>{p.pair.green.text}</b> was the green flag. {p.pair.green.why}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (!playing) {
    return (
      <div className={`rounded-[26px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white p-6 text-center mb-6 ${stickerStatic}`}>
        <p className="text-[12px] font-black uppercase tracking-[0.18em] text-white/85">Daily 5 · #{dailyNumber()}</p>
        <p className="text-[34px] leading-none my-2" style={display}>5 flags. 6 seconds each.</p>
        <p className="text-[15px] font-bold text-white/90 mb-5">Tap the green flag before the clock runs out. Everyone gets the same five today. One go only.</p>
        <button type="button" onClick={start} className={`w-full min-h-[60px] rounded-2xl bg-white text-[#1A1033] font-black text-xl flex items-center justify-center gap-2 ${sticker}`}>
          Go <ArrowRight className="w-6 h-6" strokeWidth={3} />
        </button>
      </div>
    );
  }

  const p = picks[i];
  const opts = p.greenLeft ? [p.pair.green, p.pair.red] : [p.pair.red, p.pair.green];
  return (
    <div className={`rounded-[26px] bg-white p-5 mb-6 ${stickerStatic}`}>
      <div className="flex justify-between text-[13px] font-black text-[#1A1033] mb-2">
        <span>Flag {i + 1}/{picks.length}</span>
        <span className={left < 2 ? "text-[#FF4FA3]" : ""}>⏱️ {Math.ceil(left)}s</span>
      </div>
      <div className="h-3 rounded-full bg-[#FFE4F1] border-2 border-[#1A1033] overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D]" style={{ width: `${(left / DAILY_SECONDS) * 100}%`, transition: "width 0.1s linear" }} />
      </div>
      <p className="text-center text-[14px] font-black text-[#1A1033]/70 mb-3">Which one's the green flag? {p.pair.hard ? "🔥 hard one" : ""}</p>
      <div key={i} className="grid grid-cols-2 gap-3 oc-pop">
        {opts.map((o, k) => (
          <button
            key={k}
            type="button"
            onClick={() => answer(o === p.pair.green ? "g" : "r")}
            className={`min-h-[110px] rounded-2xl p-3 text-[17px] font-black leading-tight text-[#1A1033] ${sticker}`}
            style={{ backgroundColor: CANDY[(i * 2 + k) % CANDY.length] }}
          >
            {o.text}
          </button>
        ))}
      </div>
      {flash && (
        <p className="text-center text-[22px] mt-3 oc-pop" style={display}>{flash === "g" ? "💚 Yes!" : flash === "r" ? "🚩 Nope" : "⏰ Too slow"}</p>
      )}
    </div>
  );
}

export default function DailyHub() {
  // The page is pre-rendered; "today" only means something in her browser.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-[80vh]" />;
  return <DailyHubInner />;
}

function DailyHubInner() {
  const [saves, setSaves] = useState<Record<string, StreakSave> | null>(null);
  const [left, setLeft] = useState("");
  useEffect(() => {
    const load = () => setSaves(Object.fromEntries(DAILY_GAMES.map((g) => [g.id, loadStreak(g.id)])));
    load();
    setLeft(untilTomorrow());
    const t = setInterval(() => {
      load();
      setLeft(untilTomorrow());
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const doneCount = saves ? DAILY_GAMES.filter((g) => doneToday(saves[g.id])).length : 0;
  const bestStreak = saves ? Math.max(0, ...DAILY_GAMES.map((g) => liveStreak(saves[g.id]))) : 0;
  const badge = badgeFor(bestStreak);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <span className={`inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
          📅 Daily #{dailyNumber()} · resets in {left}
        </span>
        <h1 className="text-[40px] leading-none text-[#1A1033]" style={display}>Today&apos;s challenges</h1>
        <p className="text-[15px] font-bold text-[#1A1033]/70 mt-2">
          {saves ? `${doneCount} of ${DAILY_GAMES.length} done today.` : ""} Do one every day to keep your streak alive 🔥
        </p>
        {badge && <p className="mt-2 inline-block rounded-full bg-[#FFE68A] border-2 border-[#1A1033] px-3 py-1 text-[13px] font-black text-[#1A1033]">{badge.emoji} {badge.name}</p>}
      </div>

      <DailyFlags />

      <div className="grid gap-3 mb-8">
        {DAILY_GAMES.filter((g) => g.id !== "flags").map((g) => {
          const s = saves?.[g.id];
          const done = s ? doneToday(s) : false;
          const streak = s ? liveStreak(s) : 0;
          return (
            <Link key={g.id} href={g.href} className={`flex items-center gap-4 rounded-[22px] p-4 text-[#1A1033] ${sticker}`} style={{ backgroundColor: g.bg }}>
              <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{done ? "✅" : g.emoji}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-[11px] font-black uppercase tracking-wider opacity-70">{g.name} · 🔥 {streak}</span>
                <span className="block text-[17px] leading-tight" style={display}>{dailyGoal(g.id)}</span>
                <span className="block text-[12px] font-black mt-0.5">{done ? "Done for today 💅" : "Play now"}</span>
              </span>
              <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
            </Link>
          );
        })}
      </div>

      <div className={`rounded-[22px] bg-white p-4 mb-8 ${stickerStatic}`}>
        <p className="text-[14px] font-black text-[#1A1033] mb-2">Streak badges</p>
        <div className="flex flex-wrap gap-2">
          {STREAK_BADGES.map((b) => (
            <span key={b.days} className={`rounded-full border-2 border-[#1A1033] px-2.5 py-1 text-[12px] font-black text-[#1A1033] ${bestStreak >= b.days ? "bg-[#FFE68A]" : "bg-white opacity-50"}`}>
              {b.emoji} {b.name} · {b.days} days
            </span>
          ))}
        </div>
      </div>

      <UnlockAllCard returnTo="/flag-runner" from="daily" extra="All 16 Flag Runner levels, unlocked straight away" />
      <MerchCard from="daily" />
    </div>
  );
}
