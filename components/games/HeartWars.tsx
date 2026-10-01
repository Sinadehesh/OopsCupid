"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Lock } from "lucide-react";
import { trackQuizStart, trackQuizComplete, trackResultView } from "@/lib/track";
import UnlockAllCard from "@/components/offers/UnlockAllCard";
import ResultShare from "@/components/share/ResultShare";
import MerchCard from "@/components/shop/MerchCard";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { sticker, stickerStatic, display } from "@/lib/ui/sticker";

/**
 * HEART WARS: tower capture, relationship edition. Your towers make
 * hearts. Tap one of yours, then any other tower, and half its hearts
 * march over: they reinforce your own, or fight their way into neutral
 * hangouts and the boss's towers. Every tower shoots at enemy troops
 * passing close by, so the route matters. Take every boss tower to win.
 *
 * Pure fun. The end screen leads to the other games, the bundle and
 * the shop.
 */

const SLUG = "heart-wars";
const SAVE = "oc_heart_wars_v1";
const H = 470;
const R = 30; // tower radius
const RANGE = 78; // turret range
const SPEED = 72; // px per second

type Owner = "me" | "foe" | "free";
type TowerDef = { x: number; y: number; owner: Owner; n: number; emoji?: string; label?: string };
type Level = { id: string; name: string; boss: { name: string; emoji: string }; towers: TowerDef[]; foeRate: number; aiEvery: number; bg: string };

const LEVELS: Level[] = [
  {
    id: "group-chat",
    name: "Win back the group chat",
    boss: { name: "The Ex", emoji: "🪃" },
    bg: "#FFD1E8",
    foeRate: 1.1,
    aiEvery: 3.2,
    towers: [
      { x: 0.5, y: 0.86, owner: "me", n: 20 },
      { x: 0.5, y: 0.13, owner: "foe", n: 16 },
      { x: 0.2, y: 0.5, owner: "free", n: 8, emoji: "💬", label: "Group chat" },
      { x: 0.8, y: 0.5, owner: "free", n: 8, emoji: "🥂", label: "Brunch" },
      { x: 0.5, y: 0.5, owner: "free", n: 14, emoji: "🎤", label: "Karaoke" },
    ],
  },
  {
    id: "weekend",
    name: "Reclaim your weekend",
    boss: { name: "The Situationship", emoji: "😶" },
    bg: "#C9B6FF",
    foeRate: 1.0,
    aiEvery: 2.8,
    towers: [
      { x: 0.2, y: 0.86, owner: "me", n: 18 },
      { x: 0.8, y: 0.13, owner: "foe", n: 18 },
      { x: 0.2, y: 0.18, owner: "free", n: 10, emoji: "🛌", label: "Lie-in" },
      { x: 0.8, y: 0.82, owner: "free", n: 10, emoji: "🧘", label: "Yoga" },
      { x: 0.5, y: 0.5, owner: "free", n: 16, emoji: "🍕", label: "Pizza night" },
      { x: 0.25, y: 0.5, owner: "free", n: 6, emoji: "📸", label: "The Gram" },
    ],
  },
  {
    id: "office-party",
    name: "The office party",
    boss: { name: "The Office Flirt", emoji: "😏" },
    bg: "#BDE3FF",
    foeRate: 0.95,
    aiEvery: 2.5,
    towers: [
      { x: 0.5, y: 0.88, owner: "me", n: 24 },
      { x: 0.22, y: 0.13, owner: "foe", n: 14 },
      { x: 0.78, y: 0.13, owner: "foe", n: 14 },
      { x: 0.2, y: 0.55, owner: "free", n: 10, emoji: "🍸", label: "Open bar" },
      { x: 0.8, y: 0.55, owner: "free", n: 10, emoji: "🎶", label: "Dance floor" },
      { x: 0.5, y: 0.4, owner: "free", n: 18, emoji: "🏆", label: "Awards" },
    ],
  },
  {
    id: "family-dinner",
    name: "Family dinner",
    boss: { name: "The Monster-in-Law", emoji: "👹" },
    bg: "#FFE68A",
    foeRate: 0.85,
    aiEvery: 2.2,
    towers: [
      { x: 0.25, y: 0.87, owner: "me", n: 22 },
      { x: 0.75, y: 0.87, owner: "me", n: 10 },
      { x: 0.5, y: 0.12, owner: "foe", n: 26 },
      { x: 0.15, y: 0.35, owner: "foe", n: 10 },
      { x: 0.85, y: 0.35, owner: "free", n: 12, emoji: "🍷", label: "Wine" },
      { x: 0.5, y: 0.52, owner: "free", n: 16, emoji: "🍗", label: "The roast" },
    ],
  },
  {
    id: "wedding",
    name: "Wedding season",
    boss: { name: "Cold Feet", emoji: "🥶" },
    bg: "#B8F2D8",
    foeRate: 0.75,
    aiEvery: 1.9,
    towers: [
      { x: 0.5, y: 0.88, owner: "me", n: 30 },
      { x: 0.15, y: 0.15, owner: "foe", n: 16 },
      { x: 0.5, y: 0.1, owner: "foe", n: 20 },
      { x: 0.85, y: 0.15, owner: "foe", n: 16 },
      { x: 0.2, y: 0.55, owner: "free", n: 12, emoji: "💐", label: "Bouquet" },
      { x: 0.8, y: 0.55, owner: "free", n: 12, emoji: "🎂", label: "The cake" },
      { x: 0.5, y: 0.45, owner: "free", n: 20, emoji: "💍", label: "The ring" },
    ],
  },
];

type Tower = TowerDef & { id: number; acc: number; shot: number };
type Packet = { id: number; from: number; to: number; owner: Exclude<Owner, "free">; n: number; x: number; y: number; hit: number };

const OWNER_BG: Record<Owner, string> = { me: "#FF4FA3", foe: "#B4B9C4", free: "#FFFFFF" };

export default function HeartWars() {
  const box = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(340);
  const [phase, setPhase] = useState<"menu" | "play" | "won" | "lost">("menu");
  const [levelIdx, setLevelIdx] = useState(0);
  const [beaten, setBeaten] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [, setFrame] = useState(0);
  const towers = useRef<Tower[]>([]);
  const packets = useRef<Packet[]>([]);
  const ids = useRef(1);
  const aiClock = useRef(0);
  const elapsed = useRef(0);
  const raf = useRef<number | null>(null);

  const level = LEVELS[levelIdx];

  useEffect(() => {
    try {
      setBeaten(JSON.parse(localStorage.getItem(SAVE) || "[]"));
    } catch {}
  }, []);

  useEffect(() => {
    const measure = () => box.current && setW(box.current.clientWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [phase]);

  const px = (t: { x: number; y: number }) => ({ x: R + t.x * (W - 2 * R), y: R + t.y * (H - 2 * R) });

  const send = useCallback((fromId: number, toId: number) => {
    const from = towers.current.find((t) => t.id === fromId);
    const to = towers.current.find((t) => t.id === toId);
    if (!from || !to || from.owner === "free" || from.n < 2) return;
    const n = Math.floor(from.n / 2);
    from.n -= n;
    packets.current.push({ id: ids.current++, from: fromId, to: toId, owner: from.owner, n, x: from.x, y: from.y, hit: 0 });
  }, []);

  const startLevel = (i: number) => {
    setLevelIdx(i);
    towers.current = LEVELS[i].towers.map((t) => ({ ...t, id: ids.current++, acc: 0, shot: 0 }));
    packets.current = [];
    aiClock.current = 0;
    elapsed.current = 0;
    setSelected(null);
    setPhase("play");
    trackQuizStart(`${SLUG}:${LEVELS[i].id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finish = useCallback(
    (won: boolean) => {
      setPhase(won ? "won" : "lost");
      trackQuizComplete(`${SLUG}:${level.id}`, Math.round(elapsed.current));
      trackResultView(`${SLUG}:${level.id}`, won ? "won" : "lost");
      if (won) {
        setBeaten((b) => {
          const next = b.includes(level.id) ? b : [...b, level.id];
          try {
            localStorage.setItem(SAVE, JSON.stringify(next));
          } catch {}
          return next;
        });
      }
    },
    [level],
  );

  // The game loop: grow, march, shoot, fight, think.
  useEffect(() => {
    if (phase !== "play") return;
    let last: number | null = null;
    const tick = (now: number) => {
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed.current += dt;
      const ts = towers.current;

      // Owned towers grow; the boss's a bit faster on later levels.
      for (const t of ts) {
        if (t.owner === "free") continue;
        t.acc += dt;
        const every = t.owner === "foe" ? level.foeRate : 1;
        while (t.acc >= every) {
          t.acc -= every;
          if (t.n < 60) t.n += 1;
        }
      }

      // Troops march; towers shoot enemy troops passing in range.
      const pos = new Map(ts.map((t) => [t.id, px(t)]));
      for (const p of packets.current) {
        const target = ts.find((t) => t.id === p.to)!;
        const a = { x: R + p.x * (W - 2 * R), y: R + p.y * (H - 2 * R) };
        const b = pos.get(target.id)!;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const stepPx = SPEED * dt;
        if (dist <= R * 0.6 || dist <= stepPx) {
          // Arrival.
          if (target.owner === p.owner) target.n += p.n;
          else {
            target.n -= p.n;
            if (target.n < 0) {
              target.n = -target.n;
              target.owner = p.owner;
            }
          }
          p.n = 0;
          continue;
        }
        const nx = a.x + (dx / dist) * stepPx;
        const ny = a.y + (dy / dist) * stepPx;
        p.x = (nx - R) / (W - 2 * R);
        p.y = (ny - R) / (H - 2 * R);
      }
      for (const t of ts) {
        if (t.owner === "free") continue;
        t.shot += dt;
        if (t.shot < 0.45) continue;
        const tp = pos.get(t.id)!;
        const victim = packets.current.find((p) => {
          if (p.owner === t.owner || p.n <= 0 || p.to === t.id) return false;
          const pp = { x: R + p.x * (W - 2 * R), y: R + p.y * (H - 2 * R) };
          return Math.hypot(pp.x - tp.x, pp.y - tp.y) < RANGE;
        });
        if (victim) {
          victim.n -= 1;
          victim.hit = now;
          t.shot = 0;
        }
      }
      packets.current = packets.current.filter((p) => p.n > 0);

      // The boss thinks: attack the weakest thing it can beat.
      aiClock.current += dt;
      if (aiClock.current >= level.aiEvery) {
        aiClock.current = 0;
        const foes = ts.filter((t) => t.owner === "foe").sort((a, b) => b.n - a.n);
        const from = foes[0];
        if (from && from.n >= 8) {
          const fp = px(from);
          const targets = ts
            .filter((t) => t.owner !== "foe")
            .map((t) => ({ t, score: t.n + Math.hypot(px(t).x - fp.x, px(t).y - fp.y) / 40 }))
            .sort((a, b) => a.score - b.score);
          const pick = targets.find((x) => Math.floor(from.n / 2) > x.t.n + 2) ?? (foes[1] && from.n > 30 ? { t: foes[1] } : null);
          if (pick) send(from.id, pick.t.id);
        }
      }

      const mine = ts.some((t) => t.owner === "me") || packets.current.some((p) => p.owner === "me");
      const theirs = ts.some((t) => t.owner === "foe") || packets.current.some((p) => p.owner === "foe");
      setFrame((f) => f + 1);
      if (!theirs) return finish(true);
      if (!mine) return finish(false);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, W, level, send, finish]);

  const tapTower = (id: number) => {
    if (phase !== "play") return;
    const t = towers.current.find((x) => x.id === id)!;
    if (selected === null) {
      if (t.owner === "me") setSelected(id);
      return;
    }
    if (selected === id) return setSelected(null);
    const from = towers.current.find((x) => x.id === selected);
    if (from && from.owner === "me") send(selected, id);
    // Tapping another of your own towers after sending keeps it simple: deselect.
    setSelected(null);
  };

  /* ─────────────── menu ─────────────── */
  if (phase === "menu") {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <span className={`inline-block -rotate-2 rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] mb-3 ${stickerStatic} !shadow-[2px_2px_0_#1A1033]`}>
            🏰 strategy game · {LEVELS.length} levels
          </span>
          <h1 className="text-[40px] md:text-6xl leading-[1] text-[#1A1033] mb-3" style={display}>Heart Wars</h1>
          <p className="text-[16px] font-bold text-[#1A1033]/70 leading-relaxed">
            Your 💗 towers make hearts. Tap one, then tap any tower to send half your army. Take the hangouts, dodge the 🚩 fire, and capture every tower the boss owns.
          </p>
        </div>
        <div className="grid gap-3">
          {LEVELS.map((l, i) => {
            const open = i === 0 || beaten.includes(LEVELS[i - 1].id);
            const done = beaten.includes(l.id);
            return (
              <button
                key={l.id}
                type="button"
                disabled={!open}
                onClick={() => startLevel(i)}
                className={`relative flex items-center gap-4 rounded-[22px] p-4 text-left text-[#1A1033] ${open ? sticker : stickerStatic} ${open ? "" : "opacity-50"}`}
                style={{ backgroundColor: l.bg }}
              >
                <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">{open ? l.boss.emoji : "🔒"}</span>
                <span className="flex-1">
                  <span className="block text-[11px] font-black uppercase tracking-wider opacity-70">Level {i + 1}{done ? " · ✅ won" : ""}</span>
                  <span className="block text-[19px] leading-tight" style={display}>{l.name}</span>
                  <span className="block text-[13px] font-black">vs {l.boss.emoji} {l.boss.name}</span>
                </span>
                {!open && <Lock className="w-5 h-5" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─────────────── result ─────────────── */
  if (phase === "won" || phase === "lost") {
    const won = phase === "won";
    const next = LEVELS[levelIdx + 1];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className={`relative overflow-hidden rounded-[28px] text-white p-6 md:p-8 mb-8 text-center ${stickerStatic} ${won ? "bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D]" : "bg-[#1A1033]"}`}>
          {won && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around">
              {["💗", "🏰", "✨", "🏰", "💗"].map((e, k) => (
                <span key={k} className="oc-burst text-2xl" style={{ animationDelay: `${k * 110}ms` }}>{e}</span>
              ))}
            </div>
          )}
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white/80 mb-2">Level {levelIdx + 1} · {level.name}</p>
          <p className="text-6xl mb-2" aria-hidden="true">{won ? "🏆" : level.boss.emoji}</p>
          <h1 className="text-[38px] md:text-5xl leading-none mb-3" style={display}>{won ? `${level.boss.name} defeated!` : `${level.boss.name} took over`}</h1>
          <p className="text-[17px] font-bold text-white/95">{won ? `Every tower is yours, in ${Math.round(elapsed.current)} seconds.` : "Your hearts ran out. Regroup and go again."}</p>
          <div className="grid gap-2 mt-5">
            {won && next && (
              <button type="button" onClick={() => startLevel(levelIdx + 1)} className={`w-full min-h-[56px] rounded-2xl bg-white text-[#1A1033] font-black text-lg flex items-center justify-center gap-2 ${sticker}`}>
                Next: {next.boss.emoji} {next.name} <ArrowRight className="w-5 h-5" strokeWidth={3} />
              </button>
            )}
            <button type="button" onClick={() => startLevel(levelIdx)} className={`w-full min-h-[52px] rounded-2xl font-black text-lg flex items-center justify-center gap-2 ${sticker} ${won && next ? "bg-transparent text-white !border-white !shadow-none" : "bg-white text-[#1A1033]"}`}>
              <RotateCcw className="w-5 h-5" /> {won ? "Play again" : "Try again"}
            </button>
          </div>
        </div>

        <ResultShare
          quiz="Heart Wars"
          quizPath={`/${SLUG}`}
          title={won ? `I beat ${level.boss.name} ${level.boss.emoji} in Heart Wars` : `${level.boss.name} ${level.boss.emoji} beat me in Heart Wars`}
          score={levelIdx + 1}
          scoreLabel="level"
        />
        <Link href="/kiss-the-frogs" className={`flex items-center gap-4 rounded-[24px] p-5 mb-8 bg-[#D9F99D] text-[#1A1033] ${sticker}`}>
          <span className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-3xl" aria-hidden="true">🐸</span>
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] opacity-70 mb-0.5">Up next</span>
            <span className="block text-xl leading-snug" style={display}>Kiss the Frogs</span>
          </span>
          <ArrowRight className="w-6 h-6 shrink-0" strokeWidth={3} />
        </Link>
        <UnlockAllCard returnTo="/flag-runner" from={`result-${SLUG}`} extra="All 16 Flag Runner levels, unlocked straight away" />
        <MerchCard from={`result-${SLUG}`} />
        <MoreQuickTests exclude={SLUG} />
        <button type="button" onClick={() => setPhase("menu")} className="mt-8 text-sm font-black text-[#1A1033]/50">← All levels</button>
      </div>
    );
  }

  /* ─────────────── the battlefield ─────────────── */
  const now = typeof performance !== "undefined" ? performance.now() : 0;
  const total = (o: Owner) => towers.current.filter((t) => t.owner === o).reduce((s, t) => s + t.n, 0) + packets.current.filter((p) => p.owner === o).reduce((s, p) => s + p.n, 0);
  const sel = towers.current.find((t) => t.id === selected);

  return (
    <div className="max-w-md mx-auto px-3 py-4 select-none">
      <div className="flex items-center justify-between mb-2 text-[13px] font-black text-[#1A1033]">
        <span className="rounded-full bg-[#FF4FA3] text-white border-2 border-[#1A1033] px-2.5 py-0.5">💗 {total("me")}</span>
        <span className="truncate px-2">{level.name}</span>
        <span className="rounded-full bg-[#6B7280] text-white border-2 border-[#1A1033] px-2.5 py-0.5">{level.boss.emoji} {total("foe")}</span>
      </div>

      <div ref={box} className={`relative w-full rounded-[26px] overflow-hidden ${stickerStatic} touch-manipulation`} style={{ height: H, background: `radial-gradient(circle at 50% 50%, #fff, ${level.bg})` }}>
        {/* Aim line from the selected tower */}
        {sel && (
          <div className="absolute inset-0 pointer-events-none flex items-start justify-center pt-2">
            <span className="rounded-full bg-[#1A1033] text-white px-3 py-1 text-[12px] font-black oc-pulse">Now tap where to send {Math.floor(sel.n / 2)} 💗</span>
          </div>
        )}

        {/* Towers */}
        {towers.current.map((t) => {
          const p = px(t);
          const isSel = selected === t.id;
          const face = t.owner === "me" ? "💗" : t.owner === "foe" ? level.boss.emoji : t.emoji ?? "🏠";
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => tapTower(t.id)}
              className="absolute flex flex-col items-center"
              style={{ left: p.x - R - 6, top: p.y - R - 6, width: R * 2 + 12 }}
              aria-label={`${t.owner === "me" ? "Your tower" : t.owner === "foe" ? level.boss.name : t.label} with ${t.n} hearts`}
            >
              {t.owner !== "free" && (
                <span className="absolute rounded-full border-2 border-dashed pointer-events-none" style={{ width: RANGE * 2, height: RANGE * 2, left: R + 6 - RANGE, top: R + 6 - RANGE, borderColor: t.owner === "me" ? "#FF4FA355" : "#6B728055" }} />
              )}
              <span
                className={`relative flex items-center justify-center rounded-full border-[3px] border-[#1A1033] shadow-[3px_3px_0_#1A1033] text-[28px] ${isSel ? "ring-4 ring-[#FFE68A] scale-110" : ""} transition-transform`}
                style={{ width: R * 2, height: R * 2, backgroundColor: OWNER_BG[t.owner] }}
              >
                {face}
                <span className="absolute -bottom-2 rounded-full bg-white border-2 border-[#1A1033] px-1.5 text-[12px] font-black text-[#1A1033] tabular-nums leading-tight">{t.n}</span>
              </span>
              {t.owner === "free" && t.label && <span className="mt-2.5 text-[10px] font-black text-[#1A1033] whitespace-nowrap">{t.label}</span>}
            </button>
          );
        })}

        {/* Troops on the move */}
        {packets.current.map((p) => {
          const x = R + p.x * (W - 2 * R);
          const y = R + p.y * (H - 2 * R);
          const hitNow = now - p.hit < 160;
          return (
            <span
              key={p.id}
              className="absolute pointer-events-none flex items-center gap-0.5 rounded-full border-2 border-[#1A1033] px-1.5 py-0.5 text-[11px] font-black tabular-nums"
              style={{ left: x - 18, top: y - 11, backgroundColor: p.owner === "me" ? "#FFD1E8" : "#E5E7EB" }}
            >
              {hitNow ? "🚩" : p.owner === "me" ? "💗" : level.boss.emoji} {p.n}
            </span>
          );
        })}
      </div>

      <p className="text-center text-[12px] font-bold text-[#1A1033]/55 mt-3">Tap your 💗 tower, then tap a target. Dashed circles are each tower&apos;s range: 🚩 fire hits enemy troops passing through.</p>
      <button type="button" onClick={() => setPhase("menu")} className="mt-3 block mx-auto text-sm font-black text-[#1A1033]/50">← Give up</button>
    </div>
  );
}
