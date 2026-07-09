import React from "react";
import { PhoneCall, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { CLARITY_CALL, type Severity } from "@/lib/offers/catalog";

/**
 * The coaching upsell block — the highest-margin rung of the ladder.
 * Rendered inside free results and premium reports. Copy adapts to the
 * user's result severity so the pitch matches their emotional state.
 */
export default function CoachingUpsell({
  severity = "moderate",
  topicLabel = "your situation",
}: {
  severity?: Severity;
  topicLabel?: string;
}) {
  const headline =
    severity === "high"
      ? "Your Results Are Serious. Don't Navigate This Alone."
      : severity === "moderate"
      ? "A Report Tells You What. A Coach Tells You What To Do Tonight."
      : "Want To Make Sure It Stays This Way?";

  const sub =
    severity === "high"
      ? `Your scores put you in the range where generic advice stops working. In one private session we go through ${topicLabel} together and you leave with a concrete plan — not a pep talk.`
      : severity === "moderate"
      ? `Reading about ${topicLabel} is step one. Talking it through with someone who has seen hundreds of these situations is what actually changes it.`
      : `Your results look manageable — which is exactly when one session does the most. Build the habits now, before the pattern gets expensive.`;

  return (
    <section className="w-full max-w-4xl mx-auto my-12 rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-2xl">
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <PhoneCall className="w-6 h-6" />
          </div>
          <span className="uppercase tracking-widest text-xs font-black text-rose-400">
            1:1 Private Coaching
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{headline}</h2>
        <p className="text-slate-300 text-lg font-medium leading-relaxed mb-8 max-w-2xl">{sub}</p>

        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {CLARITY_CALL.bullets.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-slate-200 font-medium">{b}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            href={CLARITY_CALL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-rose-500 hover:bg-rose-400 text-white font-black text-lg px-10 py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5"
          >
            {CLARITY_CALL.cta} — {CLARITY_CALL.price}
            <ArrowRight className="w-5 h-5" />
          </a>
          {CLARITY_CALL.anchorPrice && (
            <div className="text-slate-400 text-sm font-bold">
              Independent coaches charge {CLARITY_CALL.anchorPrice.replace("€", "€")}
              <br className="hidden sm:block" /> for the same hour.
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-950/60 px-8 md:px-12 py-5 flex items-center gap-3 border-t border-white/10">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-bold text-slate-300">
          Not useful? Say so in the first 15 minutes and it&apos;s a full refund. You risk nothing.
        </p>
      </div>
    </section>
  );
}
