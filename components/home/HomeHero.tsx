"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackHomeClick } from "@/lib/track";
import { QUICK_TESTS } from "@/lib/quizzes/tickTests";

/**
 * HOMEPAGE HERO, built for the phone.
 *
 * The old hero was a headline and a four-line paragraph, then four stock
 * photos: on a phone, the first screen held no button at all. People who
 * arrive from TikTok are there to have a go at something, so the first
 * screen now offers exactly that: a one-line question, one test that takes
 * forty seconds, and the most-searched questions as big tiles a thumb can
 * hit. Nothing to read before the first tap.
 *
 * No time claims on the tiles: several tests run to a hundred questions,
 * and "3 minutes" on those would be the first thing a visitor caught us
 * out on. The only timing shown is the forty-second test, which is true.
 */

const QUICK = {
  href: "/things-he-says",
  title: "Which of these has he said to you?",
  detail: "16 phrases · 40 seconds · see what they mean",
};

const TILES: { href: string; emoji: string; label: string; bg: string; fg: string }[] = [
  { href: "/attachment-style-quiz", emoji: "🧠", label: "What's my attachment style?", bg: "#DDEFE8", fg: "#1F4A3E" },
  { href: "/is-he-manipulative", emoji: "🚩", label: "Is he manipulating me?", bg: "#FCE3D8", fg: "#7A2E14" },
  { href: "/is-he-cheating", emoji: "🕵️‍♀️", label: "Is he cheating?", bg: "#FBE0E6", fg: "#7A1F35" },
  { href: "/why-do-i-pick-bad-guys", emoji: "💔", label: "Why do I pick bad guys?", bg: "#FBF0CF", fg: "#5E4A12" },
  { href: "/partners-attachment-style", emoji: "🥶", label: "Why does he pull away?", bg: "#DDE9F5", fg: "#1E3E5E" },
  { href: "/is-he-gaslighting-me", emoji: "🌀", label: "Is he gaslighting me?", bg: "#E9E2F7", fg: "#3F2C6B" },
  { href: "/why-do-i-sabotage-relationships", emoji: "💣", label: "Do I sabotage my relationships?", bg: "#D8F0EE", fg: "#134A45" },
  { href: "/toxic-friend-test", emoji: "🐍", label: "Is my friend toxic?", bg: "#FDEBD3", fg: "#6B3E0E" },
];

export default function HomeHero() {
  return (
    <section className="bg-[#F7F4ED] px-4 pt-6 pb-10 md:pt-14 md:pb-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-[11px] md:text-xs font-extrabold uppercase tracking-[0.2em] text-[#E07850] mb-2">
          Free · No sign-up · Result on screen
        </p>
        <h1 className="text-center text-[34px] leading-[1.05] md:text-[56px] font-bold text-[#3A556C] mb-2">
          Is it him, or is it you?
        </h1>
        <p className="text-center text-[16px] md:text-[19px] font-medium text-[#5E7183] mb-5 md:mb-8">
          Pick what's on your mind. Get an honest answer.
        </p>

        {/* The one test to start with. */}
        <Link
          href={QUICK.href}
          onClick={() => trackHomeClick("quick")}
          className="group flex items-center gap-4 rounded-3xl bg-[#3A556C] text-white px-5 py-4 md:px-7 md:py-6 shadow-[0_10px_30px_rgba(58,85,108,0.35)] active:scale-[0.98] transition-transform mb-4"
        >
          <span className="text-3xl md:text-4xl shrink-0" aria-hidden="true">💬</span>
          <span className="flex-1 min-w-0">
            <span className="block text-[10px] md:text-xs font-black uppercase tracking-[0.18em] text-[#F5DD90] mb-0.5">
              Start here
            </span>
            <span className="block text-[17px] md:text-[22px] font-extrabold leading-snug">{QUICK.title}</span>
            <span className="block text-[12px] md:text-sm font-semibold text-white/65 mt-0.5">{QUICK.detail}</span>
          </span>
          <span className="shrink-0 w-10 h-10 rounded-full bg-[#E07850] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>

        {/* More forty-second tests, swipeable: the format TikTok visitors
            finish, so there is always another one to try. */}
        <div className="-mx-4 px-4 mb-5 flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {QUICK_TESTS.filter((t) => t.slug !== "things-he-says").map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              onClick={() => trackHomeClick(t.slug)}
              className="snap-start shrink-0 w-[46%] sm:w-[31%] md:w-[23%] rounded-2xl p-3.5 flex flex-col justify-between min-h-[118px] active:scale-[0.97] transition-transform border-2 border-white/60"
              style={{ backgroundColor: t.bg, color: t.fg }}
            >
              <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
              <span className="text-[15px] font-extrabold leading-tight mt-1.5">{t.short}</span>
              <span className="text-[10px] font-black uppercase tracking-wider opacity-60 mt-1.5">{t.fun ? "Just for fun" : "40 seconds"}</span>
            </Link>
          ))}
        </div>

        <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#5E7183] mb-2.5">
          Or take a full test
        </p>

        {/* The questions people actually search, as thumb-sized tiles. */}
        <div id="home-tests" className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => trackHomeClick(t.href.slice(1))}
              className="flex flex-col justify-between rounded-2xl p-3.5 md:p-4 min-h-[104px] active:scale-[0.97] hover:-translate-y-0.5 transition-transform"
              style={{ backgroundColor: t.bg, color: t.fg }}
            >
              <span className="text-2xl" aria-hidden="true">{t.emoji}</span>
              <span className="text-[15px] md:text-base font-extrabold leading-tight mt-2">{t.label}</span>
              <span className="text-[11px] font-bold opacity-60 mt-1">Free test →</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link
            href="/quizzes"
            onClick={() => trackHomeClick("all")}
            className="inline-flex items-center gap-1.5 text-[15px] font-extrabold text-[#E07850]"
          >
            See all 15 free tests <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="mx-2 text-slate-300">·</span>
          <Link
            href="/guides"
            onClick={() => trackHomeClick("guides")}
            className="inline-flex items-center gap-1.5 text-[15px] font-extrabold text-[#3A556C]"
          >
            Read the guides <ArrowRight className="w-4 h-4" />
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
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-[#F7F4ED] via-[#F7F4ED]/95 to-transparent transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <Link
        href={QUICK.href}
        tabIndex={show ? 0 : -1}
        onClick={() => trackHomeClick("sticky")}
        className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[#E07850] text-white font-extrabold text-[16px] py-4 shadow-[0_8px_24px_rgba(224,120,80,0.45)] active:scale-[0.98] transition-transform"
      >
        Take the 40-second test <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
