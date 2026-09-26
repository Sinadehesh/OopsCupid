"use client";

import React, { useState } from "react";
import { Quote, GitCompareArrows, MinusCircle, ChevronDown } from "lucide-react";
import type { Evidence, AnsweredQuestion } from "@/lib/report/evidence";

/**
 * THE SECTION THAT MAKES THE REPORT WORTH PAYING FOR.
 *
 * Everything else in a dossier is writing that existed before the buyer
 * arrived — good writing, chosen by her score, but chosen from a shelf.
 * This section contains nothing that existed before she answered: her own
 * sentences, her own answers beside them, and the places where the two do
 * not line up.
 *
 * Three blocks, in the order a reader needs them:
 *
 *  - what she agreed with, quoted, because that is the evidence for
 *    everything the rest of the report claims;
 *  - where her answers contradict each other, because that is the part no
 *    score can express and no article can guess;
 *  - what she ruled out, because a pattern with stated exceptions is a
 *    description she can recognise rather than a horoscope she has to
 *    squint at.
 *
 * Deliberately no interpretation inside the quotes. The moment this section
 * starts explaining what each answer "reveals", it stops being her data and
 * becomes more generated paragraphs — which is the thing being fixed.
 */

const CAP = 8;
/**
 * The widest splits only. One battery here has 33 dimensions and produced
 * eighteen contradictions in testing; eighteen cards is a wall, and the
 * four sharpest are the ones she will recognise.
 */
const TENSION_CAP = 4;

function AnswerRow({
  item,
  accent,
  tone,
}: {
  item: AnsweredQuestion;
  accent: string;
  tone: "agreed" | "denied";
}) {
  const agreed = tone === "agreed";
  return (
    <li className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-4 border-b border-slate-100 last:border-0">
      <span
        className="shrink-0 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider"
        style={
          agreed
            ? { backgroundColor: `${accent}1A`, color: accent }
            : { backgroundColor: "#F1F5F9", color: "#64748B" }
        }
      >
        {item.answer}
      </span>
      <span className="flex-1">
        <span className="block text-slate-800 font-bold leading-relaxed">
          &ldquo;{item.text}&rdquo;
        </span>
        <span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mt-1.5">
          {item.category}
        </span>
      </span>
    </li>
  );
}

function Disclosure({
  count,
  open,
  onToggle,
}: {
  count: number;
  open: boolean;
  onToggle: () => void;
}) {
  if (count <= 0) return null;
  return (
    <button
      onClick={onToggle}
      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
    >
      {open ? "Show fewer" : `Show the other ${count}`}
      <ChevronDown
        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default function YourAnswers({
  evidence,
  accent,
}: {
  evidence: Evidence;
  accent: string;
}) {
  const [allEndorsed, setAllEndorsed] = useState(false);
  const [allRejected, setAllRejected] = useState(false);

  const endorsed = allEndorsed ? evidence.endorsed : evidence.endorsed.slice(0, CAP);
  const rejected = allRejected ? evidence.rejected : evidence.rejected.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-7 md:p-9">
        <p className="text-slate-600 font-medium leading-relaxed">
          Before any of our interpretation, here is your own. You answered{" "}
          <strong className="text-slate-900">
            {evidence.answered} of {evidence.total}
          </strong>{" "}
          statements about your own life; everything the rest of this report
          claims is built on these, so you should be able to check our
          working.
        </p>
      </div>

      {/* What she agreed with */}
      {evidence.endorsed.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-7 md:p-9">
          <h3 className="text-lg font-black text-slate-900 mb-1.5 flex items-center gap-2.5">
            <Quote className="w-5 h-5 shrink-0" style={{ color: accent }} />
            The {evidence.endorsed.length} statements you marked strongest
          </h3>
          <p className="text-slate-500 font-medium text-sm leading-relaxed mb-5">
            Strongest first. This is the evidence, not a summary of it.
          </p>
          <ul>
            {endorsed.map((item) => (
              <AnswerRow key={item.id} item={item} accent={accent} tone="agreed" />
            ))}
          </ul>
          <Disclosure
            count={evidence.endorsed.length - CAP}
            open={allEndorsed}
            onToggle={() => setAllEndorsed((v) => !v)}
          />
        </div>
      )}

      {/* Where her answers fight each other */}
      {evidence.tensions.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-7 md:p-9">
          <h3 className="text-lg font-black text-slate-900 mb-1.5 flex items-center gap-2.5">
            <GitCompareArrows className="w-5 h-5 shrink-0" style={{ color: accent }} />
            Where your answers disagree with each other
          </h3>
          <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
            Each pair below measures the same thing, and you answered them at
            opposite ends. That is not an error — it means the pattern is
            narrower than its score suggests, and the gap is where it actually
            starts and stops.
          </p>

          <div className="space-y-5">
            {evidence.tensions.slice(0, TENSION_CAP).map((t) => (
              <div
                key={t.category}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-4">
                  {t.category}
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                    <span
                      className="shrink-0 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                    >
                      {t.agreed.answer}
                    </span>
                    <p className="text-slate-800 font-bold leading-relaxed">
                      &ldquo;{t.agreed.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                    <span className="shrink-0 inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-600">
                      {t.denied.answer}
                    </span>
                    <p className="text-slate-600 font-bold leading-relaxed">
                      &ldquo;{t.denied.text}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What she ruled out */}
      {evidence.rejected.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-7 md:p-9">
          <h3 className="text-lg font-black text-slate-900 mb-1.5 flex items-center gap-2.5">
            <MinusCircle className="w-5 h-5 shrink-0 text-slate-400" />
            What you ruled out
          </h3>
          <p className="text-slate-500 font-medium text-sm leading-relaxed mb-5">
            Just as important, and usually left out. Wherever this report
            describes a pattern, it does not mean these — you said so.
          </p>
          <ul>
            {rejected.map((item) => (
              <AnswerRow key={item.id} item={item} accent={accent} tone="denied" />
            ))}
          </ul>
          <Disclosure
            count={evidence.rejected.length - 6}
            open={allRejected}
            onToggle={() => setAllRejected((v) => !v)}
          />
        </div>
      )}
    </div>
  );
}
