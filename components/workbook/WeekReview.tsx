"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Quote, AlertTriangle, Target, GitCompareArrows } from "lucide-react";

/**
 * END-OF-WEEK REVIEW
 *
 * The reason the bundle costs €49. Everything else in the workbook is
 * writing that could, in principle, be read anywhere. This reads what the
 * buyer actually wrote across the week and responds to it — quoting them,
 * naming what moved between days, and setting one task.
 *
 * It degrades honestly: too little written, no key configured, or a failed
 * generation all produce a plain message rather than an error screen, and
 * none of them touch the saved entries.
 */

interface Review {
  headline: string;
  observations: { quote: string; reading: string }[];
  pattern: string;
  contradiction: string;
  task: { title: string; detail: string };
  flag: string;
}

export default function WeekReview({
  workbook,
  week,
}: {
  workbook: string;
  week: number;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [review, setReview] = useState<Review | null>(null);
  const [message, setMessage] = useState("");

  const run = async () => {
    setState("loading");
    setMessage("");
    let sessionId = "anonymous";
    try {
      sessionId = localStorage.getItem("oc_workbook_session") ?? "anonymous";
    } catch {}

    try {
      const res = await fetch("/api/workbook/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workbook, week, sessionId }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(
          data?.message ??
            data?.error ??
            "The review couldn't be generated just now. Your entries are safe."
        );
        setState("error");
        return;
      }
      setReview(data.review);
      setState("done");
    } catch {
      setMessage("Couldn't reach the server. Your entries are saved on this device.");
      setState("error");
    }
  };

  if (state === "done" && review) {
    return (
      <section className="my-12 rounded-3xl bg-[#0E1621] text-white overflow-hidden">
        <div className="p-7 md:p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Your week {week} review
          </p>
          <h2 className="text-2xl md:text-3xl font-black leading-snug mb-8">{review.headline}</h2>

          {review.flag && (
            <div className="rounded-2xl bg-amber-500/15 border border-amber-400/30 p-5 mb-8 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-100 font-medium leading-relaxed">{review.flag}</p>
            </div>
          )}

          <div className="space-y-5 mb-8">
            {review.observations?.map((o, i) => (
              <div key={i} className="rounded-2xl bg-white/[0.06] border border-white/10 p-5">
                <div className="flex gap-2.5 mb-3">
                  <Quote className="w-4 h-4 text-white/30 shrink-0 mt-1" />
                  <p className="text-white/90 font-bold italic leading-relaxed">
                    &ldquo;{o.quote}&rdquo;
                  </p>
                </div>
                <p className="text-white/65 font-medium leading-relaxed pl-6">{o.reading}</p>
              </div>
            ))}
          </div>

          {review.pattern && (
            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40 mb-2">
                Across the week
              </p>
              <p className="text-white/80 font-medium leading-relaxed">{review.pattern}</p>
            </div>
          )}

          {review.contradiction && (
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40 mb-2 flex items-center gap-2">
                <GitCompareArrows className="w-3.5 h-3.5" /> Where your entries disagree
              </p>
              <p className="text-white/80 font-medium leading-relaxed">{review.contradiction}</p>
            </div>
          )}

          {review.task && (
            <div className="rounded-2xl bg-[#EC8A66]/15 border border-[#EC8A66]/30 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#EC8A66] mb-2 flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> This week&rsquo;s one task
              </p>
              <h3 className="text-lg font-black mb-2">{review.task.title}</h3>
              <p className="text-white/75 font-medium leading-relaxed">{review.task.detail}</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="my-12 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-7 md:p-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-5">
        <Sparkles className="w-6 h-6 text-[#E07850]" />
      </div>
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">
        Finished week {week}? Get it read back to you.
      </h2>
      <p className="text-slate-600 font-medium leading-relaxed max-w-lg mx-auto mb-7">
        This reads everything you wrote this week and tells you what it sees — quoting
        your own words, naming what shifted between days, and setting one thing to do
        next. It is not a summary.
      </p>

      <button
        onClick={run}
        disabled={state === "loading"}
        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-lg px-8 py-4 rounded-2xl transition-colors disabled:opacity-60"
      >
        {state === "loading" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Reading your week…</>
        ) : (
          <>Review my week</>
        )}
      </button>

      {state === "error" && (
        <p className="text-slate-600 font-medium mt-5 max-w-lg mx-auto">{message}</p>
      )}
    </section>
  );
}
