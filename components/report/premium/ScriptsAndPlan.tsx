"use client";

import React from "react";
import { MessageSquareQuote, ClipboardCheck } from "lucide-react";
import type { ScriptCard, ActionStep } from "@/lib/report/dossier";

/**
 * SCRIPTS + ACTION PLAN
 *
 * Extracted from PremiumDossier so reports that are not built on the
 * dossier can still deliver these two sections. That matters because the
 * checkout page promises "the scripts" and an action plan on every quiz
 * that renders PremiumCheckout — a promise two reports were not keeping.
 *
 * Section numbers are passed in so the host report's spine stays
 * continuous rather than restarting at 01.
 */

function SectionHeader({
  no, kicker, title, icon: Icon, accent,
}: { no: string; kicker: string; title: string; icon: any; accent: string }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>
          Section {no}
        </span>
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">{kicker}</span>
      </div>
      <h2 className="text-2xl md:text-[2rem] font-black text-slate-900 tracking-tight flex items-center gap-3">
        <Icon className="w-6 h-6 shrink-0" style={{ color: accent }} />
        {title}
      </h2>
    </div>
  );
}

export default function ScriptsAndPlan({
  scripts,
  plan,
  accent,
  scriptsNo = "04",
  planNo = "05",
  planHeading = "Your action plan",
  planKicker = "Next 14 days",
}: {
  scripts: ScriptCard[];
  plan: ActionStep[];
  accent: string;
  scriptsNo?: string;
  planNo?: string;
  planHeading?: string;
  planKicker?: string;
}) {
  if (!scripts.length && !plan.length) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-14 md:py-16 space-y-20 md:space-y-24">
      {scripts.length > 0 && (
        <section>
          <SectionHeader no={scriptsNo} kicker="Word for word" title="What to actually say" icon={MessageSquareQuote} accent={accent} />
          <div className="space-y-4">
            {scripts.map((s) => (
              <div key={s.situation} className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-6 md:p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">{s.situation}</p>
                <blockquote
                  className="border-l-[3px] pl-5 py-1 text-lg md:text-xl font-bold text-slate-900 leading-relaxed mb-4"
                  style={{ borderColor: accent }}
                >
                  &ldquo;{s.say}&rdquo;
                </blockquote>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  <span className="font-black text-slate-500">Why it lands: </span>{s.why}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {plan.length > 0 && (
        <section>
          <SectionHeader no={planNo} kicker={planKicker} title={planHeading} icon={ClipboardCheck} accent={accent} />
          <div className="relative pl-6 md:pl-8">
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-0.5 bg-slate-200" />
            <div className="space-y-6">
              {plan.map((p) => (
                <div key={p.window} className="relative">
                  <div
                    className="absolute -left-6 md:-left-8 top-1.5 w-4 h-4 rounded-full border-[3px] border-white"
                    style={{ backgroundColor: accent }}
                  />
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{p.window}</p>
                  <h3 className="text-lg font-black text-slate-900 mb-1.5">{p.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
