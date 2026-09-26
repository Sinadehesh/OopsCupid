"use client";

import React from "react";
import { Quote } from "lucide-react";
import YourAnswers from "./YourAnswers";
import { hasEvidence, type Evidence } from "@/lib/report/evidence";

/**
 * The "what you actually told us" section, packaged with its own heading so
 * the hand-built premium pages can add it in one line.
 *
 * PremiumDossier renders this section itself. Six paid reports here predate
 * that renderer and have their own layouts — and those six were the ones
 * charging for pages that could have been written before the buyer arrived.
 * Rewriting them onto the shared renderer would be a week of risk; giving
 * them the one section that earns the price is an import and a line.
 *
 * Renders nothing when there is no evidence — a result saved before the
 * quizzes started keeping answers is missing them, and an empty section
 * would be worse than none.
 */
export default function YourAnswersSection({
  evidence,
  accent = "#E07850",
  no = "02",
}: {
  evidence?: Evidence;
  accent?: string;
  /** Section number, to fit whatever numbering the host page uses. */
  no?: string;
}) {
  if (!hasEvidence(evidence)) return null;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-7">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-[11px] font-black uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            Section {no}
          </span>
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">
            Your own words
          </span>
        </div>
        <h2 className="text-2xl md:text-[2rem] font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Quote className="w-6 h-6 shrink-0" style={{ color: accent }} />
          What you actually told us
        </h2>
      </div>
      <YourAnswers evidence={evidence} accent={accent} />
    </section>
  );
}
