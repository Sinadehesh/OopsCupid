/**
 * THE DAILY CHALLENGES. Each game gets one, the same for everyone on the
 * same day (seeded by the date):
 *
 *  - Daily 5 flags: five quick red-or-green calls from the Flag Runner
 *    gates, six seconds each, one go per day.
 *  - Love Tower: reach today's milestone.
 *  - Kiss the Frogs: reach today's guy on the ladder.
 *  - Heart Wars: win today's battle map against today's boss.
 *
 * Streaks live in lib/games/streaks.ts.
 */

import { LEVELS, type RunnerPair } from "./flagRunner";
import { seeded, todayKey } from "./streaks";

export const DAILY_COUNT = 5;
export const DAILY_SECONDS = 6;

/* ── Daily 5 flags ── */

export type DailyPick = { pair: RunnerPair; levelId: string; greenLeft: boolean };
export type Mark = "g" | "r" | "t";

export function dailyPicks(key = todayKey()): DailyPick[] {
  const all = LEVELS.flatMap((l) => l.pairs.map((pair) => ({ pair, levelId: l.id })));
  const r = seeded(`oopscupid-flags-${key}`);
  const chosen: DailyPick[] = [];
  const used = new Set<number>();
  while (chosen.length < DAILY_COUNT) {
    const i = Math.floor(r() * all.length);
    if (used.has(i)) continue;
    used.add(i);
    chosen.push({ ...all[i], greenLeft: r() < 0.5 });
  }
  return chosen;
}

const RESULT = "oc_daily_flags_result";
export function loadFlagsResult(key = todayKey()): Mark[] | null {
  try {
    const r = JSON.parse(localStorage.getItem(RESULT) || "null");
    return r && r.key === key ? r.marks : null;
  } catch {
    return null;
  }
}
export function saveFlagsResult(marks: Mark[], key = todayKey()) {
  try {
    localStorage.setItem(RESULT, JSON.stringify({ key, marks }));
  } catch {}
}

export function shareText(n: number, marks: Mark[], streak: number) {
  const row = marks.map((m) => (m === "g" ? "💚" : m === "r" ? "🚩" : "⏰")).join("");
  const score = marks.filter((m) => m === "g").length;
  return `OopsCupid Daily #${n}\n${row} ${score}/${marks.length}\n🔥 ${streak}-day streak\noopscupid.com/daily`;
}

/* ── Love Tower: today's milestone (index into its milestone list) ── */
export function towerTarget(key = todayKey()) {
  const r = seeded(`oopscupid-tower-${key}`);
  return 8 + Math.floor(r() * 8); // between "Exclusive" and "Survived IKEA"
}

/* ── Kiss the Frogs: today's rung on the ladder ── */
export function frogsTarget(key = todayKey()) {
  const r = seeded(`oopscupid-frogs-${key}`);
  return 5 + Math.floor(r() * 3); // Bad boy, Finance bro or Decent guy
}

/* ── Heart Wars: today's battle map ── */
export type WarsTower = { x: number; y: number; owner: "me" | "foe" | "free"; n: number; emoji?: string; label?: string };

const HANGOUTS = [
  { emoji: "💬", label: "Group chat" },
  { emoji: "🥂", label: "Brunch" },
  { emoji: "🎤", label: "Karaoke" },
  { emoji: "🍕", label: "Pizza night" },
  { emoji: "📸", label: "The Gram" },
  { emoji: "🍸", label: "Cocktails" },
  { emoji: "🧘", label: "Yoga" },
  { emoji: "🛍️", label: "Shopping" },
  { emoji: "💅", label: "Nail salon" },
  { emoji: "🎬", label: "Cinema" },
];
const BOSSES = [
  { name: "The Ex", emoji: "🪃" },
  { name: "The Situationship", emoji: "😶" },
  { name: "The Office Flirt", emoji: "😏" },
  { name: "The Monster-in-Law", emoji: "👹" },
  { name: "Cold Feet", emoji: "🥶" },
  { name: "The Player", emoji: "🎰" },
  { name: "The Gaslighter", emoji: "🌀" },
  { name: "The Catfish", emoji: "🎣" },
];

export function warsDaily(key = todayKey()) {
  const r = seeded(`oopscupid-wars-${key}`);
  const boss = BOSSES[Math.floor(r() * BOSSES.length)];
  const foes = 1 + Math.floor(r() * 2);
  const towers: WarsTower[] = [{ x: 0.5, y: 0.88, owner: "me", n: 32 + Math.floor(r() * 8) }];
  const foeXs = foes === 1 ? [0.5] : [0.25, 0.75];
  for (const x of foeXs) towers.push({ x, y: 0.12, owner: "foe", n: 10 + Math.floor(r() * 6) });
  const spots = [
    { x: 0.18, y: 0.52 },
    { x: 0.82, y: 0.52 },
    { x: 0.5, y: 0.45 },
    { x: 0.3, y: 0.3 },
    { x: 0.7, y: 0.7 },
  ];
  const free = 3 + Math.floor(r() * 2);
  const pool = [...HANGOUTS];
  for (let i = 0; i < free; i++) {
    const h = pool.splice(Math.floor(r() * pool.length), 1)[0];
    towers.push({ ...spots[i], owner: "free", n: 5 + Math.floor(r() * 9), ...h });
  }
  // Two boss towers make twice the hearts, so each one grows a little slower.
  return { id: `daily-${key}`, name: "Today's battle", boss, bg: "#FFE68A", foeRate: foes === 1 ? 1.15 : 1.6, aiEvery: 3.4, towers };
}

/* ── Today's goal for each game, in words ── */
const TOWER_NAMES = ["Exclusive 🔒", "\"I love you\" 💗", "Met his mum 👩", "First holiday ✈️", "Shared Netflix 📺", "Moved in 🏠", "Got a dog 🐶", "Survived IKEA 🪑"];
const FROG_NAMES = ["🎸 Bad boy", "💼 Finance bro", "🧔 Decent guy"];

export function dailyGoal(id: string) {
  if (id === "tower") return `Build up to ${TOWER_NAMES[towerTarget() - 8]}`;
  if (id === "frogs") return `Reach ${FROG_NAMES[frogsTarget() - 5]}`;
  if (id === "wars") {
    const d = warsDaily();
    return `Beat ${d.boss.emoji} ${d.boss.name} in today's battle`;
  }
  return "Call today's 5 flags";
}
