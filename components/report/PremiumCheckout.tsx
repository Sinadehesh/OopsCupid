"use client";

import React from "react";
import {
  ShieldCheck, BrainCircuit, HeartHandshake, Zap, Loader2,
  ArrowRight, CheckCircle2, Lock, FlaskConical, Quote, Tag,
} from "lucide-react";

interface Testimonial {
  quote: string;
  name: string; // first name + initial only
}

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating?: boolean;
  archetype: string;
  relationshipStatus: string;
  /**
   * SOCIAL PROOF — intentionally empty by default. Only pass REAL quotes
   * (e.g. from Gumroad reviews or emails, with permission). Fabricated
   * testimonials are illegal in the EU/US and torch trust if discovered.
   * Example shape:
   *   [{ quote: "This report finally explained why I attract toxic partners.", name: "Marta K." }]
   */
  testimonials?: Testimonial[];
}

/**
 * COMMITMENT & CONSISTENCY: she answered 20+ questions and gave an email —
 * the progress bar frames the purchase as finishing something 90% done,
 * not starting something new. Abandoning near-complete progress hurts
 * (Zeigarnik + loss aversion working together).
 */
function JourneyProgress() {
  const steps = [
    { label: "Diagnostic", done: true },
    { label: "Free Results", done: true },
    { label: "Your Full Blueprint", done: false },
  ];
  return (
    <div className="max-w-md mx-auto mb-10">
      <div className="flex items-center justify-between mb-2">
        {steps.map((s) => (
          <span key={s.label} className={`text-[11px] font-black uppercase tracking-widest ${s.done ? "text-[#06aed5]" : "text-[#086788]"}`}>
            {s.done ? "✓ " : ""}{s.label}
          </span>
        ))}
      </div>
      <div className="w-full h-2.5 bg-[#d6d2d2]/50 rounded-full overflow-hidden">
        <div className="h-full w-[88%] bg-gradient-to-r from-[#06aed5] to-[#f0c808] rounded-full" />
      </div>
      <p className="text-center text-xs font-bold text-[#086788]/60 mt-2">
        You&apos;ve done 88% of the work. The blueprint is the last step.
      </p>
    </div>
  );
}

export default function PremiumCheckout({
  onUnlock,
  isGenerating = false,
  archetype,
  relationshipStatus,
  testimonials = [],
}: PremiumCheckoutProps) {
  return (
    <div id="unlock-offer" className="relative w-full max-w-6xl mx-auto bg-white border border-[#d6d2d2] rounded-2xl shadow-md mt-12 overflow-hidden scroll-mt-8">

      {/* HONEST URGENCY: a real first-purchase discount scoped to this page —
          no fake countdowns, no fabricated server scarcity. */}
      <div className="bg-[#f0c808] text-[#086788] text-center py-3 px-4 flex items-center justify-center gap-2 font-black text-sm tracking-wide">
        <Tag className="w-5 h-5" /> New-reader offer: code <span className="bg-[#086788] text-[#f0c808] px-2 py-0.5 rounded font-black">RESULTS15</span> takes 15% off — valid on your first unlock
      </div>

      <div className="p-6 md:p-12 border-b border-[#d6d2d2] bg-white">
        <JourneyProgress />
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded bg-[#fff1d0] text-[#086788] font-bold text-sm tracking-widest uppercase mb-6 border border-[#f0c808]/50">
            The {archetype} Blueprint
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#086788]">
            We Found The Missing Link. <span className="text-[#06aed5]">Now Fix It.</span>
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-[#086788]/80">
            The free data shows <i>what</i> you are. The Master Audit connects your childhood data
            to your current life to show you exactly <i>why</i> you self-sabotage, and gives you a
            detailed {relationshipStatus.toLowerCase()} action plan to rewire it.
          </p>
          {/* LOSS AVERSION — true per our data policy */}
          <p className="mt-4 text-sm font-bold text-[#dd1c1a]">
            Don&apos;t leave without your blind spots: your answers are deleted after 24 hours and
            this analysis can&apos;t be rebuilt from scratch.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 bg-[#fff1d0]/20">
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-2xl font-black mb-6 text-[#086788]">The Clarity Bundle Stack:</h3>

          {[
            {
              icon: <BrainCircuit className="w-6 h-6" />, color: "text-[#f686bd]",
              title: "1. The Origin Deconstruction",
              body: "We synthesize your Mother and Father scores to reveal the exact childhood loops currently running your adult nervous system.",
            },
            {
              icon: <HeartHandshake className="w-6 h-6" />, color: "text-[#06aed5]",
              title: "2. Boyfriend & Partner Analysis",
              body: "See the exact type of toxic behaviors you naturally attract, and how your current/past partners manipulate your triggers.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-5 p-6 rounded-xl bg-white border border-[#d6d2d2] shadow-sm">
              <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded bg-[#fff1d0] ${item.color}`}>{item.icon}</div>
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h4 className="text-lg font-black text-[#086788]">{item.title}</h4>
                  <span className="text-xs font-black uppercase tracking-widest text-[#06aed5] bg-[#06aed5]/10 px-2.5 py-1 rounded">Included</span>
                </div>
                <p className="text-base font-medium text-[#086788]/80">{item.body}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-5 p-6 rounded-xl bg-white border-2 border-[#f0c808] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#f0c808] text-[#086788] text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl">Core Offer</div>
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded bg-[#f0c808]/20 text-[#f0c808]"><Zap className="w-6 h-6 fill-current" /></div>
            <div>
              <h4 className="text-lg font-black text-[#086788] mb-2">3. His Playbook &amp; Master Action Plan</h4>
              <p className="text-base font-bold text-[#086788]/90">A ruthless guide exposing his manipulation tactics, the exact threat he poses, and the scripts to stop him today.</p>
            </div>
          </div>

          {/* SOCIAL PROOF — renders only when real quotes are supplied */}
          {testimonials.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {testimonials.slice(0, 2).map((t) => (
                <div key={t.name} className="bg-white border border-[#d6d2d2] rounded-xl p-5">
                  <Quote className="w-5 h-5 text-[#f0c808] mb-2" />
                  <p className="text-sm font-medium text-[#086788]/90 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs font-black text-[#086788]/50 uppercase tracking-widest">— {t.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] text-center shadow-md relative">
            {/* ANCHORING — a real, defensible comparison, not a fabricated strike-price */}
            <div className="space-y-1 mb-8 mt-2">
              <p className="text-sm font-bold text-[#086788]/50">A therapist covering the same ground:</p>
              <p className="text-lg font-black text-[#086788]/60 line-through">€1,200+ and 6 months</p>
              <div className="flex items-baseline justify-center gap-2 pt-5">
                <span className="text-2xl font-black text-[#086788]">Today:</span>
                <span className="text-7xl font-black text-[#086788]">€9.99</span>
              </div>
              <p className="text-xs font-black text-[#06aed5] uppercase tracking-widest pt-2">One-time · No subscription</p>
            </div>

            <button
              onClick={onUnlock}
              disabled={isGenerating}
              className="w-full min-h-[64px] bg-[#f0c808] text-[#086788] rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0 cursor-pointer group"
            >
              {isGenerating
                ? <><Loader2 className="w-6 h-6 animate-spin text-[#086788]" /> Building Your Blueprint...</>
                : <>Unlock My Playbook <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>}
            </button>

            {/* AUTHORITY / TRUST BADGES — every claim defensible */}
            <div className="grid grid-cols-2 gap-2.5 mt-6 text-left">
              {[
                { icon: FlaskConical, text: "Research-informed metrics" },
                { icon: Lock, text: "Secure checkout via Gumroad" },
                { icon: ShieldCheck, text: "7-day money-back guarantee" },
                { icon: CheckCircle2, text: "Private — answers auto-deleted" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-[#fff1d0]/40 border border-[#f0c808]/30 rounded-lg px-3 py-2">
                  <Icon className="w-4 h-4 text-[#06aed5] shrink-0" />
                  <span className="text-[11px] font-black text-[#086788]/80 leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 border-t border-[#d6d2d2] bg-white flex flex-col sm:flex-row items-center gap-4 justify-center">
        <ShieldCheck className="w-8 h-8 text-[#06aed5]" />
        <p className="text-sm md:text-base font-bold text-[#086788]/80">
          7-Day &ldquo;Diary Reader&rdquo; Guarantee. Not accurate? Full refund. No questions asked.
        </p>
      </div>
    </div>
  );
}
