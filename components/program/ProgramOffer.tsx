import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { programForQuiz } from "@/lib/programs/registry";
import CheckoutButton from "@/components/offers/CheckoutButton";

/**
 * The next step after a report: the programme that works on what the
 * report found.
 *
 * Keyed on the quiz path, so it appears on every report whose quiz a live
 * programme lists, and on none of the others. When the next programme
 * opens, its offer shows up across its quizzes' reports with no change
 * here. A report with no live programme behind it gets nothing rather
 * than a pitch for something unwritten.
 *
 * Week 1 is offered first and free, because the fastest way to sell a
 * workbook is to let somebody do a session of it.
 */
export default function ProgramOffer({ quizPath, className = "" }: { quizPath: string; className?: string }) {
  const p = programForQuiz(quizPath);
  if (!p) return null;

  return (
    <section className={`max-w-4xl mx-auto px-6 py-12 ${className}`}>
      <div className="rounded-3xl overflow-hidden border-2" style={{ borderColor: p.accent }}>
        <div className="p-8 md:p-10 bg-white">
          <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: p.accent }}>
            What to do with this
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-snug">{p.title}</h2>
          <p className="text-lg text-slate-600 font-medium mb-6">{p.subtitle}. Four weeks, fifteen minutes a session.</p>
          <ul className="space-y-2.5 mb-8">
            {p.outcomes.slice(0, 4).map((o) => (
              <li key={o} className="flex gap-2.5 text-slate-700 font-medium leading-relaxed">
                <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: p.accent }} />{o}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={`/workbook/${p.slug}/week-1/day-1`}
              className="inline-flex items-center justify-center gap-2 text-white font-extrabold text-lg px-8 py-4 rounded-2xl" style={{ backgroundColor: p.accent }}>
              Start week 1, free <ArrowRight className="w-5 h-5" />
            </Link>
            <CheckoutButton sku="report-workbook-bundle" returnTo={`/workbook/${p.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-lg px-8 py-4 rounded-2xl hover:border-slate-400 disabled:opacity-70">
              All 4 weeks · €49
            </CheckoutButton>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-4">
            €49 opens every programme on the site, and each new one as it opens. One payment, 7-day refund.
          </p>
        </div>
      </div>
    </section>
  );
}
