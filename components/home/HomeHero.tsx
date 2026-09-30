"use client";

import { tileBadge } from "@/lib/quizzes/tickGames";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackHomeClick } from "@/lib/track";
import { QUICK_TESTS } from "@/lib/quizzes/tickTests";

/**
 * HOMEPAGE HERO, built for the phone and for TikTok.
 *
 * The first screen offers something to tap, not something to read: one
 * forty-second test, a swipeable row of quick games, then the big tests.
 *
 * The look is "sticker" style: candy colours, thick ink outlines, hard
 * offset shadows that press in when tapped, a scrolling ticker and a few
 * tilted cards. It reads as playful and tappable, which is the register of
 * the women in their twenties arriving from TikTok, where the previous
 * muted slate-and-cream looked like a clinic. Motion is decorative only and
 * switches off for anyone who has asked their phone to reduce motion.
 *
 * No time claims on the full tests: several run to a hundred questions.
 * Only the forty-second tests say forty seconds, which is true.
 */

const INK = "#1A1033";

const QUICK = {
  href: "/things-he-says",
  title: "Which of these has he said to you?",
  detail: "🎱 bingo · 40 seconds",
};

/** Candy palette, cycled across the cards. */
const CANDY = ["#FFD1E8", "#C9B6FF", "#FFE68A", "#B8F2D8", "#FFC9A8", "#BDE3FF", "#FFB3C7", "#D9F99D"];

const TILES: { href: string; emoji: string; label: string }[] = [
  { href: "/attachment-style-quiz", emoji: "🧠", label: "What's my attachment style?" },
  { href: "/is-he-manipulative", emoji: "🚩", label: "Is he manipulating me?" },
  { href: "/is-he-cheating", emoji: "🕵️‍♀️", label: "Is he cheating?" },
  { href: "/why-do-i-pick-bad-guys", emoji: "💔", label: "Why do I pick bad guys?" },
  { href: "/partners-attachment-style", emoji: "🥶", label: "Why does he pull away?" },
  { href: "/is-he-gaslighting-me", emoji: "🌀", label: "Is he gaslighting me?" },
  { href: "/why-do-i-sabotage-relationships", emoji: "💣", label: "Do I sabotage my relationships?" },
  { href: "/toxic-friend-test", emoji: "🐍", label: "Is my friend toxic?" },
];

const TICKER = [
  "💬 which of these has he said?",
  "🥊 friend vs friend",
  "💘 him vs your ex",
  "🙋‍♀️ is she a pick-me?",
  "🚩 red flag or beige flag?",
  "🤡 is my boyfriend stupid?",
  "🪞 am I the toxic one?",
  "🌫️ situationship or relationship?",
];

/** The sticker look: ink outline and a hard shadow that presses in on tap. */
const sticker =
  "border-[2.5px] border-[#1A1033] shadow-[4px_4px_0_#1A1033] active:shadow-[1px_1px_0_#1A1033] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-100";

export default function HomeHero() {
  const quick = QUICK_TESTS.filter((t) => t.slug !== "things-he-says");

  return (
    <section className="relative overflow-hidden bg-[#FFF4FA]">
      {/* Floating colour blobs behind everything. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="oc-float absolute -top-16 -left-20 w-72 h-72 rounded-full bg-[#FF4FA3]/30 blur-3xl" />
        <div className="oc-float-slow absolute top-40 -right-24 w-80 h-80 rounded-full bg-[#9B7BFF]/30 blur-3xl" />
        <div className="oc-float absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[#FFB36B]/30 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#1A103322_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      {/* Scrolling ticker of the games, like a TikTok caption strip. */}
      <div className="relative border-b-[2.5px] border-[#1A1033] bg-[#FF4FA3] text-white overflow-hidden">
        <div className="oc-marquee flex w-max gap-8 py-2 text-[13px] font-black whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pt-6 pb-10 md:pt-12 md:pb-16">
        <div className="flex justify-center gap-2 mb-3 flex-wrap">
          {["✨ free", "🤫 private", "⚡ no sign-up"].map((c, i) => (
            <span
              key={c}
              className={`rounded-full bg-white px-3 py-1 text-[12px] font-black text-[#1A1033] border-2 border-[#1A1033] ${i === 1 ? "rotate-2" : i === 0 ? "-rotate-2" : ""}`}
            >
              {c}
            </span>
          ))}
        </div>

        <h1
          className="text-center text-[44px] leading-[0.98] md:text-[76px] tracking-tight text-[#1A1033] mb-3"
          style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif", fontWeight: 900, letterSpacing: "-0.03em" }}
        >
          Is it{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-[-4px] bottom-[6%] h-[42%] bg-[#FF4FA3]/45 -rotate-1 rounded-md" />
            <span className="relative">him</span>
          </span>
          , or is it{" "}
          <span className="relative inline-block">
            <span className="absolute inset-x-[-4px] bottom-[6%] h-[42%] bg-[#FFD84D] rotate-1 rounded-md" />
            <span className="relative">you?</span>
          </span>{" "}
          <span className="inline-block oc-wiggle">👀</span>
        </h1>
        <p className="text-center text-[16px] md:text-[19px] font-bold text-[#1A1033]/70 mb-6">
          Tiny tests. Brutally honest results.
        </p>

        {/* The one test to start with. */}
        <Link
          href={QUICK.href}
          onClick={() => trackHomeClick("quick")}
          className={`group relative flex items-center gap-4 rounded-[26px] bg-gradient-to-br from-[#FF4FA3] via-[#FF6F7D] to-[#FF9A4D] text-white px-5 py-5 md:px-7 md:py-6 mb-5 ${sticker}`}
        >
          <span className="absolute -top-3 right-4 rotate-3 rounded-full bg-[#FFE68A] text-[#1A1033] border-2 border-[#1A1033] px-2.5 py-0.5 text-[11px] font-black">
            🔥 most played
          </span>
          <span className="shrink-0 w-14 h-14 rounded-2xl bg-white/25 border-2 border-white/60 flex items-center justify-center text-3xl" aria-hidden="true">
            💬
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-white/85 mb-0.5">Start here</span>
            <span className="block text-[19px] md:text-[24px] font-black leading-[1.12]">{QUICK.title}</span>
            <span className="block text-[12px] md:text-sm font-bold text-white/85 mt-1">{QUICK.detail}</span>
          </span>
          <span className="oc-pulse shrink-0 w-11 h-11 rounded-full bg-white text-[#FF4FA3] border-2 border-[#1A1033] flex items-center justify-center">
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </span>
        </Link>

        {/* Swipeable quick games. */}
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[13px] font-black text-[#1A1033]">⚡ Quick ones <span className="text-[#1A1033]/50">· swipe →</span></p>
        </div>
        <div className="-mx-4 px-4 mb-6 flex gap-3 overflow-x-auto snap-x snap-mandatory pt-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quick.map((t, i) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              onClick={() => trackHomeClick(t.slug)}
              className={`snap-start shrink-0 w-[44%] sm:w-[30%] md:w-[22%] rounded-[22px] p-3.5 flex flex-col justify-between min-h-[132px] ${sticker} ${i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : ""}`}
              style={{ backgroundColor: CANDY[i % CANDY.length], color: INK }}
            >
              <span className="w-10 h-10 rounded-full bg-white border-2 border-[#1A1033] flex items-center justify-center text-xl" aria-hidden="true">
                {t.emoji}
              </span>
              <span className="text-[15px] font-black leading-tight mt-2">{t.short}</span>
              <span className="mt-2 self-start rounded-full bg-[#1A1033] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                {tileBadge(t.slug, t.fun)}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-[13px] font-black text-[#1A1033] mb-2">🔎 The deep ones</p>

        {/* The questions people actually search, as thumb-sized tiles. */}
        <div id="home-tests" className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TILES.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => trackHomeClick(t.href.slice(1))}
              className={`flex flex-col justify-between rounded-[22px] p-3.5 md:p-4 min-h-[118px] bg-white ${sticker}`}
              style={{ color: INK }}
            >
              <span
                className="w-10 h-10 rounded-full border-2 border-[#1A1033] flex items-center justify-center text-xl"
                style={{ backgroundColor: CANDY[(i + 3) % CANDY.length] }}
                aria-hidden="true"
              >
                {t.emoji}
              </span>
              <span className="text-[15px] md:text-base font-black leading-tight mt-2">{t.label}</span>
              <span className="text-[11px] font-black text-[#FF4FA3] mt-1">Free test →</span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          <Link
            href="/quizzes"
            onClick={() => trackHomeClick("all")}
            className={`inline-flex items-center gap-1.5 rounded-full bg-[#FFE68A] px-4 py-2 text-[14px] font-black text-[#1A1033] ${sticker}`}
          >
            All the tests <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </Link>
          <Link
            href="/games"
            onClick={() => trackHomeClick("games")}
            className={`inline-flex items-center gap-1.5 rounded-full bg-[#B8F2D8] px-4 py-2 text-[14px] font-black text-[#1A1033] ${sticker}`}
          >
            🎮 The games <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </Link>
          <Link
            href="/guides"
            onClick={() => trackHomeClick("guides")}
            className={`inline-flex items-center gap-1.5 rounded-full bg-[#C9B6FF] px-4 py-2 text-[14px] font-black text-[#1A1033] ${sticker}`}
          >
            📖 The guides <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * A bar pinned to the bottom of the phone screen once the tiles have
 * scrolled away, so a visitor reading further down is never more than
 * one tap from starting a test. Hidden on desktop and while the tiles
 * are still visible, where it would only repeat them.
 */
export function StickyTestBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById("home-tests");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-[140%]"}`}
      aria-hidden={!show}
    >
      <Link
        href={QUICK.href}
        tabIndex={show ? 0 : -1}
        onClick={() => trackHomeClick("sticky")}
        className={`flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-[#FF4FA3] to-[#FF9A4D] text-white font-black text-[17px] py-4 ${sticker}`}
      >
        Take the 40-second test 👀 <ArrowRight className="w-5 h-5" strokeWidth={3} />
      </Link>
    </div>
  );
}
