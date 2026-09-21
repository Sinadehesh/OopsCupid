"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Loader2 } from "lucide-react";
import PremiumGate from "@/components/report/PremiumGate";
import PremiumDossier from "@/components/report/premium/PremiumDossier";
import { loadQuizResult } from "@/lib/quizResults";
import type { Dossier } from "@/lib/report/dossier";

/**
 * The /premium route shell, shared by every quiz.
 *
 * Three states, in this order:
 *   1. no saved result  → send them back to the quiz (nothing to report on)
 *   2. not entitled     → PremiumGate shows the paywall
 *   3. entitled         → the full dossier
 *
 * Reading the saved result BEFORE the gate is deliberate: someone who has
 * paid but never taken this particular quiz should be told to take it, not
 * shown an empty report.
 */
export default function PremiumRoute<T>({
  storageKey,
  quizHref,
  quizName,
  build,
}: {
  storageKey: string;
  quizHref: string;
  quizName: string;
  build: (raw: T) => Dossier;
}) {
  const [raw, setRaw] = useState<T | null>(null);
  const [status, setStatus] = useState<"loading" | "missing" | "ready">("loading");

  useEffect(() => {
    const saved = loadQuizResult<T>(storageKey);
    if (saved) {
      setRaw(saved);
      setStatus("ready");
    } else {
      setStatus("missing");
    }
  }, [storageKey]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#FAFAF7]">
        <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />
        <p className="text-slate-500 font-bold">Loading your results…</p>
      </div>
    );
  }

  if (status === "missing" || !raw) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 bg-[#FAFAF7]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
            No results on this device yet
          </h1>
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            The full report is built from your own answers, so there is nothing to
            show until you take the {quizName}. It takes a few minutes.
          </p>
          <Link
            href={quizHref}
            className="inline-flex w-full items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-lg py-4 rounded-2xl transition-colors"
          >
            Take the quiz
          </Link>
          <p className="text-xs font-medium text-slate-400 mt-4">
            Already paid? Your access is saved — finish the quiz and the full
            report opens automatically.
          </p>
        </div>
      </div>
    );
  }

  let dossier: Dossier;
  try {
    dossier = build(raw);
  } catch {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 bg-[#FAFAF7]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-5" />
          <h1 className="text-xl font-black text-slate-900 mb-3">We couldn't read your saved results</h1>
          <p className="text-slate-600 font-medium mb-7">
            They were probably saved by an older version of the quiz. Retaking it
            fixes this — your access is not affected.
          </p>
          <Link href={quizHref} className="inline-flex w-full items-center justify-center bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl">
            Retake the quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PremiumGate returnTo={`${quizHref}/premium`}>
      <PremiumDossier dossier={dossier} />
    </PremiumGate>
  );
}
