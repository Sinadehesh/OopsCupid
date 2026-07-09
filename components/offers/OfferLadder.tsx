import React from "react";
import { BookOpen, GraduationCap, PhoneCall, Check, ArrowRight } from "lucide-react";
import { getOfferStack, scoreToSeverity, type Severity } from "@/lib/offers/catalog";
import type { QuizTopic } from "@/lib/quizzes/registry";

const KIND_ICON = {
  playbook: BookOpen,
  course: GraduationCap,
  coaching: PhoneCall,
  program: PhoneCall,
} as const;

const KIND_LABEL = {
  playbook: "Instant PDF",
  course: "Full Course",
  coaching: "1:1 Session",
  program: "Program",
} as const;

/**
 * Three-rung offer ladder rendered after a report. The featured rung is
 * chosen by result severity (see getOfferStack) — decoy pricing does the
 * rest: the playbook makes the course look complete, the course makes
 * coaching look personal.
 */
export default function OfferLadder({
  topic,
  score,
  severity,
  heading = "Choose How Deep You Want To Go",
  subheading = "Every option is one-time. No subscriptions, instant access, secure checkout via Gumroad.",
}: {
  topic: QuizTopic;
  score?: number;
  severity?: Severity;
  heading?: string;
  subheading?: string;
}) {
  const sev = severity ?? scoreToSeverity(score ?? 50);
  const stack = getOfferStack(topic, sev);
  const offers = [stack.playbook, stack.course, stack.coaching] as const;

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
          {heading}
        </h2>
        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">{subheading}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {offers.map((offer) => {
          const featured =
            (stack.featured === "playbook" && offer.kind === "playbook") ||
            (stack.featured === "course" && offer.kind === "course") ||
            (stack.featured === "coaching" && offer.kind === "coaching");
          const Icon = KIND_ICON[offer.kind];

          return (
            <div
              key={offer.id}
              className={`relative flex flex-col rounded-3xl border-2 p-8 bg-white transition-all ${
                featured
                  ? "border-rose-500 shadow-2xl md:-translate-y-2"
                  : "border-slate-200 shadow-sm"
              }`}
            >
              {featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                  Recommended for your score
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    featured ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {KIND_LABEL[offer.kind]}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">{offer.name}</h3>
              <p className="text-slate-500 font-medium mb-6">{offer.tagline}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {offer.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span className="text-sm font-medium text-slate-600">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-5">
                <span className="text-4xl font-black text-slate-900">{offer.price}</span>
                {offer.anchorPrice && (
                  <span className="block text-xs font-bold text-slate-400 mt-1">
                    {offer.anchorPrice}
                  </span>
                )}
              </div>

              <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-base transition-all ${
                  featured
                    ? "bg-rose-500 hover:bg-rose-400 text-white shadow-lg"
                    : "bg-slate-900 hover:bg-slate-700 text-white"
                }`}
              >
                {offer.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm font-bold text-slate-400 mt-8">
        7-day money-back guarantee on every digital product. No questions asked.
      </p>
    </section>
  );
}
