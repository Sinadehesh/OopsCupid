"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Loader2, Check } from "lucide-react";
import CheckoutButton from "@/components/offers/CheckoutButton";

/**
 * WORKBOOK GATE
 *
 * The €49 "Premium Report + 6-Week Workbook" bundle advertised the
 * workbook as the thing you were paying for — while all 42 days of it sat
 * publicly readable. Someone buying that tier was paying for free content,
 * which is the most expensive kind of promise to break.
 *
 * Week 1 stays free. It is a genuine sample (seven full days, not a
 * teaser), it is what the workbook index already promises, and it is the
 * lead magnet. Weeks 2-6 are what the bundle actually buys.
 *
 * FREE_WEEKS is the whole control. Set it to 6 to make everything free
 * again — nothing else needs changing.
 */
const FREE_WEEKS = 1;

export default function WorkbookGate({
  week,
  children,
}: {
  week: number;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<"checking" | "granted" | "denied">(
    week <= FREE_WEEKS ? "granted" : "checking"
  );

  useEffect(() => {
    if (week <= FREE_WEEKS) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/access", { cache: "no-store" });
        if (res.status === 404) {
          // Static export / packaged app — no API layer.
          let local = false;
          try {
            local = localStorage.getItem("oc_unlocked") === "1";
          } catch {}
          if (!cancelled) setStatus(local ? "granted" : "denied");
          return;
        }
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setStatus(data?.workbook ? "granted" : "denied");
      } catch {
        if (!cancelled) setStatus("denied");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [week]);

  if (status === "checking") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-9 h-9 text-slate-400 animate-spin" />
        <p className="text-slate-500 font-bold">Loading…</p>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.08)] p-8 md:p-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-[#E07850]" />
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">
            Week {week}
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
            The rest of the workbook
          </h1>
          <p className="text-slate-600 font-medium leading-relaxed mb-7">
            Week 1 is free and yours to keep — all seven days of it. Weeks 2 to 6
            are part of the bundle, along with your full report.
          </p>

          <ul className="space-y-2.5 mb-8">
            {[
              "Weeks 2–6 — 35 more daily exercises",
              "Your complete premium report",
              "Lifetime access, no subscription",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          <CheckoutButton
            sku="report-workbook-bundle"
            returnTo={`/workbook/anxious-attachment/week-${week}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#EC8A66] hover:bg-[#E07850] text-white font-extrabold text-lg py-4 rounded-2xl transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-70"
          >
            Unlock the full workbook — €49
          </CheckoutButton>

          <p className="text-xs font-bold text-slate-400 mt-4 text-center">
            Secure checkout by Stripe · 7-day refund
          </p>

          <Link
            href="/workbook/anxious-attachment/week-1"
            className="block text-center text-sm font-bold text-slate-500 hover:text-slate-700 mt-5"
          >
            ← Back to week 1
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
