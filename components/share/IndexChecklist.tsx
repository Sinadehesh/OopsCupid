"use client";

import React, { useEffect, useState } from "react";
import CopyButton from "./CopyButton";

const KEY = "oc-index-done";
const SITE = "https://www.oopscupid.com";
const PER_DAY = 10;

/**
 * Search Console's "Request indexing", turned into a two-minute daily job.
 * Google only takes about ten requests a day, so this shows ten pages, in
 * the order most likely to bring visitors, and remembers on this phone
 * which ones are done so tomorrow starts where today stopped.
 *
 * The property holds both www and bare-domain URLs, so it is a Domain
 * property, which is what the inspect links name.
 */
export default function IndexChecklist({ pages }: { pages: { path: string; label: string }[] }) {
  // path -> the day it was ticked (YYYY-MM-DD), so today's ticks stay on screen
  const [done, setDone] = useState<Record<string, string> | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      setDone(saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {});
    } catch {
      setDone({});
    }
  }, []);

  const toggle = (path: string) => {
    setDone((d) => {
      const next = { ...(d ?? {}) };
      if (next[path]) delete next[path];
      else next[path] = today;
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // Storage blocked: ticks just last until the page is closed.
      }
      return next;
    });
  };

  const d = done ?? {};
  const doneToday = pages.filter((p) => d[p.path] === today);
  const open = pages.filter((p) => !d[p.path]);
  const shown = new Set([...doneToday, ...open.slice(0, Math.max(0, PER_DAY - doneToday.length))].map((p) => p.path));
  const list = pages.filter((p) => shown.has(p.path));
  const total = pages.length;
  const finished = total - open.length;

  return (
    <div>
      <ol className="list-decimal pl-5 mt-3 space-y-2 text-[15px] font-semibold leading-snug">
        <li>Tap <b>Check on Google</b> next to the first page. Search Console opens and checks it (a few seconds).</li>
        <li>It says <b>&quot;URL is on Google&quot;</b>? Nothing to do. Come back and tick it.</li>
        <li>It says <b>&quot;URL is not on Google&quot;</b>? Tap <b>Request indexing</b> and wait about a minute until it says &quot;Indexing requested&quot;. Come back and tick it.</li>
        <li>Google allows about 10 a day. If it says <b>&quot;Quota exceeded&quot;</b>, stop and carry on tomorrow. This list remembers where you got to.</li>
      </ol>
      <p className="mt-3 text-[13px] font-bold text-[#1A1033]/60">
        If the button opens the wrong site, tap <b>Copy</b> instead and paste the link into the search bar at the top of Search Console.
      </p>

      <p className="mt-4 mb-2 text-[13px] font-black uppercase tracking-wider text-[#1A1033]/60">
        Today&apos;s pages · {finished} of {total} done
      </p>
      {open.length === 0 ? (
        <p className="rounded-2xl bg-[#B8F2D8] p-3 text-[15px] font-black">All done ✅ Google has been asked about every missing page.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((p) => {
            const url = `${SITE}${p.path}`;
            const inspect = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent("sc-domain:oopscupid.com")}&id=${encodeURIComponent(url)}`;
            const ticked = Boolean(d[p.path]);
            return (
              <li key={p.path} className={`rounded-2xl border-2 border-[#1A1033] p-3 ${ticked ? "bg-[#B8F2D8]/60" : "bg-white"}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={ticked} onChange={() => toggle(p.path)} className="mt-1 w-5 h-5 accent-[#FF4FA3] shrink-0" />
                  <span className={`text-[15px] font-black leading-snug ${ticked ? "line-through opacity-60" : ""}`}>
                    {p.label}
                    <span className="block text-[12px] font-semibold opacity-60 break-all">{p.path}</span>
                  </span>
                </label>
                {!ticked && (
                  <div className="flex flex-wrap gap-2 mt-2 pl-8">
                    <a href={inspect} target="_blank" rel="noopener" className="inline-flex rounded-full bg-[#FF4FA3] text-white px-3 py-1.5 text-[12px] font-black">
                      🔎 Check on Google
                    </a>
                    <CopyButton text={url} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {open.length > 0 && doneToday.length >= PER_DAY && (
        <p className="mt-3 rounded-2xl bg-[#FFE68A] p-3 text-[14px] font-black">That&apos;s today&apos;s 10 ✅ Come back tomorrow for the next ones.</p>
      )}
    </div>
  );
}
