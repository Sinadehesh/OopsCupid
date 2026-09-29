"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { Program, Session, Week } from "@/lib/programs/types";
import BlockView from "./Blocks";
import { SessionProvider } from "./persist";
import { markDone, doneSessions } from "./progress";
import WorkbookGate from "@/components/workbook/WorkbookGate";
import WeekReview from "@/components/workbook/WeekReview";

/**
 * One session. Deliberately a single scroll: intro, exercises, the one
 * sentence to leave with, then onward. No tabs, no stepper, because the
 * point of a fifteen-minute session is that it can be done on a phone on
 * a bus without losing your place.
 */
export default function SessionView({
  program,
  week,
  session,
  next,
  prev,
  isLastOfWeek,
}: {
  program: Pick<Program, "slug" | "title" | "accent" | "safety"> & { totalWeeks: number };
  week: Pick<Week, "week" | "theme">;
  session: Session;
  next: { week: number; day: number } | null;
  prev: { week: number; day: number } | null;
  isLastOfWeek: boolean;
}) {
  const [done, setDone] = useState(false);
  const accent = program.accent;
  const href = (w: number, d: number) => `/workbook/${program.slug}/week-${w}/day-${d}`;

  useEffect(() => {
    setDone(doneSessions(program.slug).includes(`${week.week}-${session.day}`));
  }, [program.slug, week.week, session.day]);

  const locked = `Weeks 2 to ${program.totalWeeks}`;

  return (
    <WorkbookGate
      week={week.week}
      returnTo={href(week.week, session.day)}
      programTitle={program.title}
      lockedWeeks={locked}
      lockedCount={`${(program.totalWeeks - 1) * 5} more sessions`}
    >
      <SessionProvider place={{ program: program.slug, week: week.week, day: session.day }}>
        <div className="min-h-screen bg-[#FAFAF7] pb-24">
          <header className="max-w-3xl mx-auto px-6 pt-10 md:pt-14 pb-8">
            <Link href={`/workbook/${program.slug}`} className="text-sm font-bold text-slate-400 hover:text-slate-700 inline-flex items-center gap-1.5 mb-8">
              <ArrowLeft className="w-4 h-4" /> {program.title}
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white" style={{ backgroundColor: accent }}>
                Week {week.week} · Session {session.day}
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{week.theme}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">{session.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 mb-7">
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> About {session.minutes} minutes</span>
              <span>{session.technique}</span>
            </div>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">{session.intro}</p>
          </header>

          <main className="max-w-3xl mx-auto px-6 space-y-6">
            {week.week === 1 && session.day === 1 && program.safety && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-900 font-medium leading-relaxed">
                {program.safety}
              </div>
            )}

            {session.blocks.map((b) => <BlockView key={b.id} block={b} accent={accent} />)}

            <div className="rounded-3xl p-7 md:p-9 text-white" style={{ backgroundColor: "#0E1621" }}>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Take this with you
              </p>
              <p className="text-xl md:text-2xl font-black leading-snug">{session.takeaway}</p>
            </div>

            <button
              onClick={() => { markDone(program.slug, week.week, session.day); setDone(true); }}
              className={`w-full min-h-[58px] rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-colors ${done ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200" : "text-white"}`}
              style={done ? undefined : { backgroundColor: accent }}
            >
              <CheckCircle2 className="w-5 h-5" /> {done ? "Session done" : "Mark this session done"}
            </button>

            {isLastOfWeek && <WeekReview workbook={program.slug} week={week.week} />}

            <nav className="flex items-center justify-between pt-6 border-t border-slate-200">
              {prev ? (
                <Link href={href(prev.week, prev.day)} className="text-sm font-bold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5">
                  <ArrowLeft className="w-4 h-4" /> Previous
                </Link>
              ) : <span />}
              {next ? (
                <Link href={href(next.week, next.day)} className="inline-flex items-center gap-2 text-white font-extrabold px-6 py-3.5 rounded-2xl" style={{ backgroundColor: "#0E1621" }}>
                  {next.week !== week.week ? `On to week ${next.week}` : "Next session"} <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link href={`/workbook/${program.slug}`} className="inline-flex items-center gap-2 text-white font-extrabold px-6 py-3.5 rounded-2xl" style={{ backgroundColor: accent }}>
                  Finish the programme <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          </main>
        </div>
      </SessionProvider>
    </WorkbookGate>
  );
}
