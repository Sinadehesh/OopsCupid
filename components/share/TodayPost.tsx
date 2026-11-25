"use client";

import React, { useEffect, useState } from "react";
import SaveImagesButton from "./SaveImagesButton";
import CopyButton from "./CopyButton";
import { display } from "@/lib/ui/sticker";

export interface TodayEntry {
  slug: string;
  title: string;
  emoji: string;
  bg: string;
  slides: number;
  caption: string;
}

/** Counted from the day the kit went live, so day one is the first quiz. */
const START = Date.UTC(2026, 10, 8);

const TABS = [
  { label: "1 · Play along", hint: "People test their boyfriend or a friend with it, then comment the score. Small accounts are getting big views with this kind of post right now." },
  { label: "2 · Quiz", hint: "One of the site's quizzes as a slideshow." },
];

/**
 * Today's two posts, chosen for her so posting never starts with a
 * decision: a play-along post (a test she runs on him or with friends)
 * and a quiz slideshow, each list in its own order. Picked after mount
 * because the page is static and "today" is the visitor's.
 */
export default function TodayPost({ plays, quizzes }: { plays: TodayEntry[]; quizzes: TodayEntry[] }) {
  const [day, setDay] = useState<number | null>(null);
  const [tab, setTab] = useState(0);
  // "Show me another" steps through each list separately.
  const [skip, setSkip] = useState([0, 0]);

  useEffect(() => {
    const now = new Date();
    setDay(Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - START) / 86400000));
  }, []);

  if (day === null) return <div className="h-[460px] rounded-[24px] bg-white/60 mb-8" />;

  const list = tab === 0 ? plays : quizzes;
  const i = (((day + skip[tab]) % list.length) + list.length) % list.length;
  const k = list[i];
  const urls = Array.from({ length: k.slides }, (_, n) => `/slides/${k.slug}/${n + 1}.png`);

  return (
    <section className="rounded-[26px] p-5 mb-8 border-[2.5px] border-[#1A1033] shadow-[5px_5px_0_#1A1033]" style={{ backgroundColor: k.bg }}>
      <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-70 mb-2">📅 Today&apos;s two posts</p>
      <div className="flex gap-2 mb-3" role="tablist">
        {TABS.map((t, n) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={tab === n}
            onClick={() => setTab(n)}
            className={`rounded-full px-4 py-2 text-[14px] font-black border-2 border-[#1A1033] ${tab === n ? "bg-[#1A1033] text-white" : "bg-white text-[#1A1033]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="text-[13px] font-bold opacity-70 mb-2">{TABS[tab].hint}</p>
      <h2 className="text-2xl leading-tight mb-3" style={display}>{k.emoji} {k.title}</h2>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1 [scrollbar-width:none]">
        {urls.map((u, n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={u} src={u} alt={`Slide ${n + 1}`} width={90} height={160} className="shrink-0 w-[90px] h-[160px] rounded-xl border-2 border-[#1A1033] bg-white object-cover" />
        ))}
      </div>

      <ol className="space-y-3 mb-4">
        <li className="rounded-2xl bg-white p-3">
          <p className="text-[15px] font-black mb-2">1. Save the slides to your phone</p>
          <SaveImagesButton urls={urls} name={k.slug} eager className="w-full" />
          <p className="text-[12px] font-bold opacity-60 mt-2">iPhone: tap &quot;Save Images&quot;. Android: tap &quot;Save&quot; or &quot;Download&quot;.</p>
        </li>
        <li className="rounded-2xl bg-white p-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[15px] font-black">2. Copy the caption</p>
            <CopyButton text={k.caption} />
          </div>
          <p className="text-[13px] font-semibold opacity-75 leading-snug break-words">{k.caption}</p>
        </li>
        <li className="rounded-2xl bg-white p-3">
          <p className="text-[15px] font-black mb-1">3. Post it on TikTok</p>
          <ol className="list-[lower-alpha] pl-5 space-y-1 text-[14px] font-semibold leading-snug">
            <li>Open TikTok and tap the <b>+</b> at the bottom.</li>
            <li>Tap <b>Upload</b> (bottom right) and choose the slides in order: 1, 2, 3…</li>
            <li>Tap <b>Next</b>. If it asks Photo or Video, pick <b>Photo</b> so people swipe.</li>
            <li>Tap <b>Add sound</b> and pick any song near the top of the list.</li>
            <li>Tap <b>Next</b>, paste the caption, and tap <b>Post</b>. Done ✅</li>
          </ol>
        </li>
        <li className="rounded-2xl bg-white p-3">
          <p className="text-[15px] font-black mb-2">4. Same post on Instagram (optional)</p>
          <SaveImagesButton urls={urls.map((u) => `${u}?size=feed`)} name={`${k.slug}-ig`} label="Save Instagram-size slides" className="w-full !bg-white !text-[#1A1033] mb-2" />
          <p className="text-[14px] font-semibold leading-snug">Tap <b>+</b>, then <b>Post</b>, tap the multiple-photos icon, choose the slides, add music, paste the caption and tap <b>Share</b>. These are sized for the feed so nothing gets cropped.</p>
        </li>
      </ol>

      <p className="rounded-2xl bg-white/70 p-3 mb-4 text-[14px] font-semibold leading-snug">
        💬 <b>In the first hour, reply to every comment</b> (&quot;8/10?? keep him&quot;). Replies add to the comments, and comments are what get a post shown to more people.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => setSkip(skip.map((x, n) => (n === tab ? x + 1 : x)))} className="text-[13px] font-black underline opacity-70">
          Don&apos;t like this one? Show me another →
        </button>
        {tab === 0 ? (
          <button type="button" onClick={() => setTab(1)} className="rounded-full bg-white px-4 py-2 text-[14px] font-black border-2 border-[#1A1033]">
            Posted? Next: post 2 →
          </button>
        ) : null}
      </div>
    </section>
  );
}
