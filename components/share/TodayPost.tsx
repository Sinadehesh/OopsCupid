"use client";

import React, { useEffect, useState } from "react";
import SaveImagesButton from "./SaveImagesButton";
import CopyButton from "./CopyButton";

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

/**
 * Today's post, chosen for her: one quiz a day in order, starting with the
 * most shareable ones, so posting never starts with a decision. Picked
 * after mount because the page is static and "today" is the visitor's.
 */
export default function TodayPost({ entries }: { entries: TodayEntry[] }) {
  const [i, setI] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - START) / 86400000);
    setI(((day % entries.length) + entries.length) % entries.length);
  }, [entries.length]);

  if (i === null) return <div className="h-[460px] rounded-[24px] bg-white/60 mb-8" />;

  const k = entries[i];
  const urls = Array.from({ length: k.slides }, (_, n) => `/slides/${k.slug}/${n + 1}.png`);

  return (
    <section className="rounded-[26px] p-5 mb-8 border-[2.5px] border-[#1A1033] shadow-[5px_5px_0_#1A1033]" style={{ backgroundColor: k.bg }}>
      <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-70 mb-1">📅 Today&apos;s post</p>
      <h2 className="text-2xl font-black leading-tight mb-3">{k.emoji} {k.title}</h2>

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
          <p className="text-[15px] font-black mb-1">4. Same slides on Instagram (optional)</p>
          <p className="text-[14px] font-semibold leading-snug">Tap <b>+</b>, then <b>Post</b>, tap the multiple-photos icon, choose the slides, add music, paste the caption and tap <b>Share</b>.</p>
        </li>
      </ol>

      <button type="button" onClick={() => setI((i + 1) % entries.length)} className="text-[13px] font-black underline opacity-70">
        Don&apos;t like this one? Show me another →
      </button>
    </section>
  );
}
