"use client";

/**
 * DAILY STREAKS, one per game. Each game has a daily challenge; finishing
 * it on consecutive days builds that game's streak, missing a day resets
 * it. Everything lives on the phone (localStorage); nothing is sent.
 *
 * Dates use her own time zone, so "today" ends at her midnight.
 */

import { useCallback, useEffect, useState } from "react";

export type GameId = "flags" | "tower" | "frogs" | "wars";

export const DAILY_GAMES: { id: GameId; name: string; emoji: string; href: string; bg: string }[] = [
  { id: "flags", name: "Daily 5 flags", emoji: "🚦", href: "/daily", bg: "#FFD1E8" },
  { id: "tower", name: "Love Tower", emoji: "🏗️", href: "/love-tower", bg: "#C9B6FF" },
  { id: "frogs", name: "Kiss the Frogs", emoji: "🐸", href: "/kiss-the-frogs", bg: "#D9F99D" },
  { id: "wars", name: "Heart Wars", emoji: "🏰", href: "/heart-wars", bg: "#FFB3C7" },
];

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysBetween(a: string, b: string) {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

const LAUNCH = "2026-10-06";
/** "Daily #12": counted from launch day. */
export function dailyNumber(key = todayKey()) {
  return Math.max(1, daysBetween(LAUNCH, key) + 1);
}

/** A small seeded random generator: every phone gets the same challenge on the same day. */
export function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type StreakSave = { last: string | null; streak: number; best: number; days: number };
const EMPTY: StreakSave = { last: null, streak: 0, best: 0, days: 0 };
const keyFor = (id: GameId) => `oc_streak_${id}`;

export function loadStreak(id: GameId): StreakSave {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(keyFor(id)) || "{}") };
  } catch {
    return EMPTY;
  }
}

/** The streak as it stands today: zero if she missed yesterday. */
export function liveStreak(s: StreakSave, key = todayKey()) {
  if (!s.last) return 0;
  return daysBetween(s.last, key) <= 1 ? s.streak : 0;
}

export function doneToday(s: StreakSave, key = todayKey()) {
  return s.last === key;
}

/** Mark today's challenge done. Safe to call twice. */
export function completeToday(id: GameId, key = todayKey()): StreakSave {
  const s = loadStreak(id);
  if (s.last === key) return s;
  const gap = s.last ? daysBetween(s.last, key) : 99;
  const streak = gap === 1 ? s.streak + 1 : 1;
  const next = { last: key, streak, best: Math.max(s.best, streak), days: s.days + 1 };
  try {
    localStorage.setItem(keyFor(id), JSON.stringify(next));
  } catch {}
  return next;
}

export const STREAK_BADGES = [
  { days: 3, emoji: "🔥", name: "On fire" },
  { days: 7, emoji: "💅", name: "One week, no ick" },
  { days: 14, emoji: "👑", name: "Red flag royalty" },
  { days: 30, emoji: "💘", name: "Certified green flag" },
];

export function nextBadge(streak: number) {
  return STREAK_BADGES.find((b) => b.days > streak);
}

export function badgeFor(streak: number) {
  return [...STREAK_BADGES].reverse().find((b) => streak >= b.days);
}

/** Time left until her midnight, as "5h 12m". */
export function untilTomorrow(now = new Date()) {
  const m = new Date(now);
  m.setHours(24, 0, 0, 0);
  const mins = Math.max(0, Math.round((m.getTime() - now.getTime()) / 60000));
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

/** One game's daily state, for a component. */
export function useDaily(id: GameId) {
  const [save, setSave] = useState<StreakSave>(EMPTY);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setSave(loadStreak(id));
    setReady(true);
  }, [id]);
  const complete = useCallback(() => {
    const before = loadStreak(id);
    const next = completeToday(id);
    setSave(next);
    return { save: next, isNew: before.last !== next.last };
  }, [id]);
  return { ready, done: doneToday(save), streak: liveStreak(save), best: save.best, complete };
}
