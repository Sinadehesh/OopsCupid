"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Lock, ShieldCheck, Clock } from "lucide-react";
import type { Program } from "@/lib/programs/types";
import CheckoutButton from "@/components/offers/CheckoutButton";
import { doneSessions } from "./progress";

export default function ProgramOverview({ program }: { program: Program }) {
  const [done, setDone] = useState<string[]>([]);
  const [owned, setOwned] = useState(false);
  useEffect(() => {
    setDone(doneSessions(program.slug));
    fetch("/api/access").then((r) => (r.ok ? r.json() : null)).then((a) => setOwned(!!a?.workbook)).catch(() => {});
  }, [program.slug]);

  const live = program.status === "live";
  const total = program.outline.reduce((n, w) => n + w.sessions.length, 0);
  const accent = program.accent;
  const nextUp = (() => {
    for (const w of program.outline) for (let i = 0; i < w.sessions.length; i++) {
      if (!done.includes(`${w.week}-${i + 1}`)) return { week: w.week, day: i + 1 };
    }
    return null;
  })();

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      <header className="max-w-4xl mx-auto px-6 pt-14 md:pt-20 pb-10">
        <Link href="/workbook" className="text-sm font-bold text-slate-400 hover:text-slate-700 mb-8 inline-block">All programmes</Link>
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>
          {live ? `4 weeks · ${total} sessions · about 12 minutes each` : "Being written"}
        </p>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-5">{program.title}</h1>
        <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed mb-6">{program.subtitle}</p>
        <p className="text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl">{program.whoFor}</p>

        {live && (
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Link href={`/workbook/${program.slug}/week-${nextUp?.week ?? 1}/day-${nextUp?.day ?? 1}`}
              className="inline-flex items-center justify-center gap-2 text-white font-extrabold text-lg px-8 py-4 rounded-2xl" style={{ backgroundColor: accent }}>
              {done.length === 0 ? "Start week 1, free" : nextUp ? `Continue: week ${nextUp.week}, session ${nextUp.day}` : "Revisit a session"} <ArrowRight className="w-5 h-5" />
            </Link>
            {!owned && (
              <CheckoutButton sku="report-workbook-bundle" returnTo={`/workbook/${program.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-lg px-8 py-4 rounded-2xl hover:border-slate-400 disabled:opacity-70">
                Unlock all 4 weeks · €49
              </CheckoutButton>
            )}
          </div>
        )}
        {live && done.length > 0 && (
          <p className="text-sm font-bold text-slate-500 mt-5">{done.length} of {total} sessions done</p>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-10">
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-7">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">By the end</h2>
            <ul className="space-y-3">
              {program.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 text-slate-700 font-medium leading-relaxed">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />{o}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200/80 p-7">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-400 mb-4">How it works</h2>
            <ul className="space-y-3 text-slate-700 font-medium leading-relaxed">
              <li className="flex gap-2.5"><Clock className="w-5 h-5 shrink-0 mt-0.5 text-slate-400" />Five short sessions a week, on your phone, at your own pace.</li>
              <li className="flex gap-2.5"><Check className="w-5 h-5 shrink-0 mt-0.5 text-slate-400" />Everything you write is saved, and read back to you at the end of each week.</li>
              <li className="flex gap-2.5"><ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-slate-400" />Draws on {program.methods.join(", ")}. Self-help, not therapy.</li>
            </ul>
          </div>
        </section>

        {program.safety && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-900 font-medium leading-relaxed">{program.safety}</div>
        )}

        <section className="space-y-5">
          {program.outline.map((w) => {
            const gated = w.week > 1 && !owned;
            return (
              <div key={w.week} className="bg-white rounded-3xl border border-slate-200/80 p-7">
                <div className="flex items-baseline justify-between gap-4 mb-5">
                  <h2 className="text-xl font-black text-slate-900">
                    <span style={{ color: accent }}>Week {w.week}.</span> {w.theme}
                  </h2>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 shrink-0">
                    {w.week === 1 ? "Free" : gated ? <span className="inline-flex items-center gap-1"><Lock className="w-3 h-3" /> Bundle</span> : "Unlocked"}
                  </span>
                </div>
                <ol className="space-y-1">
                  {w.sessions.map((s, i) => {
                    const d = i + 1;
                    const isDone = done.includes(`${w.week}-${d}`);
                    const row = (
                      <span className="flex items-center gap-3 py-2.5">
                        <span className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-black ${isDone ? "text-white" : "bg-slate-100 text-slate-500"}`}
                          style={isDone ? { backgroundColor: accent } : undefined}>
                          {isDone ? <Check className="w-4 h-4" /> : d}
                        </span>
                        <span className="flex-1 font-bold text-slate-800">{s.title}</span>
                        <span className="hidden sm:inline text-xs font-bold text-slate-400">{s.technique}</span>
                      </span>
                    );
                    return (
                      <li key={s.title} className="border-b border-slate-100 last:border-0">
                        {live ? <Link href={`/workbook/${program.slug}/week-${w.week}/day-${d}`} className="block hover:bg-slate-50 rounded-xl px-2 -mx-2">{row}</Link> : row}
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </section>

        {!live && (
          <p className="text-center text-slate-500 font-medium">
            This programme is being written. Its structure is above; it opens when every session is finished, not before.
          </p>
        )}
      </main>
    </div>
  );
}
