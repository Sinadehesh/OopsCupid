"use client";

import React from "react";
import CheckoutButton from "@/components/offers/CheckoutButton";
import {
  ShieldCheck, BrainCircuit, HeartHandshake, Zap, Loader2,
  ArrowRight, CheckCircle2, Lock, FlaskConical, Quote, Tag,
} from "lucide-react";

/**
 * The promotion code advertised above the offer, or null for no banner.
 * A 15%-off coupon exists in the live account (`gvHAwfM6`); it has no
 * promotion code attached yet, so there is nothing for a buyer to type.
 * Create one named RESULTS15 in Stripe, then set this to "RESULTS15".
 */
const PROMO_CODE: string | null = null;

interface Testimonial {
  quote: string;
  name: string; // first name + initial only
}

export interface Inclusion {
  title: string;
  body: string;
}

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating?: boolean;
  archetype: string;
  relationshipStatus: string;
  /**
   * What THIS quiz's report actually contains, in the buyer's order of
   * interest. Required on purpose: the list used to be hard-coded to the
   * attachment quiz ("we synthesize your Mother and Father scores") and
   * was rendered verbatim on quizzes that never ask about parents.
   * Anything listed here must exist in the report the buyer lands on.
   */
  inclusions: Inclusion[];
  /** One sentence: what the paid report adds over the free result. */
  pitch: string;
  /** Headline. Defaults to something true of every report. */
  headline?: string;
  headlineAccent?: string;
  /** Where to land after paying, e.g. "/is-he-cheating/premium". */
  premiumPath?: string;
  /** Prefills Stripe Checkout with the email the quiz captured. */
  email?: string;
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
          <span key={s.label} className={`text-[11px] font-black uppercase tracking-widest ${s.done ? "text-[#5A7492]" : "text-[#3A556C]"}`}>
            {s.done ? "✓ " : ""}{s.label}
          </span>
        ))}
      </div>
      <div className="w-full h-2.5 bg-[#d6d2d2]/50 rounded-full overflow-hidden">
        <div className="h-full w-[88%] bg-gradient-to-r from-[#5A7492] to-[#EC8A66] rounded-full" />
      </div>
      <p className="text-center text-xs font-bold text-[#3A556C]/60 mt-2">
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
  premiumPath,
  email,
  inclusions,
  pitch,
  headline = "You've seen the summary.",
  headlineAccent = "Here is the whole picture.",
  testimonials = [],
}: PremiumCheckoutProps) {
  return (
    <div id="unlock-offer" className="relative w-full max-w-6xl mx-auto bg-white border border-[#d6d2d2] rounded-2xl shadow-md mt-12 overflow-hidden scroll-mt-8">

      {/* HONEST URGENCY: a real first-purchase discount scoped to this page.
          Do NOT set this to a string until a promotion code with exactly
          that name exists in the live Stripe account — advertising a code
          Stripe rejects is the worst possible moment to break trust.
          See docs/STRIPE.md § Promotion code. */}
      {PROMO_CODE && (
        <div className="bg-[#F5DD90] text-[#3A556C] text-center py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm tracking-wide">
          <Tag className="w-5 h-5" /> New-reader offer: code{" "}
          <span className="bg-[#3A556C] text-[#F5DD90] px-2 py-0.5 rounded font-extrabold tracking-wider">{PROMO_CODE}</span>{" "}
          takes 15% off — valid on your first unlock
        </div>
      )}

      <div className="p-6 md:p-12 border-b border-[#d6d2d2] bg-white">
        <JourneyProgress />
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded bg-[#F7F4ED] text-[#3A556C] font-bold text-xs tracking-[0.18em] uppercase mb-6 border border-[#3A556C]/10">
            The {archetype} Blueprint
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#3A556C]">
            {headline} <span className="text-[#5A7492]">{headlineAccent}</span>
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-[#3A556C]/80">{pitch}</p>
        </div>
      </div>

      <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 bg-[#F7F4ED]/60">
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-2xl font-black mb-6 text-[#3A556C]">What is in your full report:</h3>

          {inclusions.map((item, i) => (
            <div
              key={item.title}
              className={`flex gap-5 p-6 rounded-xl bg-white shadow-sm ${
                i === 0 ? "border-2 border-[#EC8A66] shadow-md" : "border border-[#d6d2d2]"
              }`}
            >
              <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded ${i === 0 ? "bg-[#EC8A66]/15 text-[#E07850]" : "bg-[#F7F4ED] text-[#5A7492]"}`}>
                {i === 0 ? <Zap className="w-6 h-6 fill-current" /> : i === 1 ? <BrainCircuit className="w-6 h-6" /> : <HeartHandshake className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h4 className="text-lg font-black text-[#3A556C]">{item.title}</h4>
                  <span className="text-xs font-black uppercase tracking-widest text-[#E07850] bg-[#EC8A66]/10 px-2.5 py-1 rounded shrink-0">Included</span>
                </div>
                <p className="text-base font-medium text-[#3A556C]/80">{item.body}</p>
              </div>
            </div>
          ))}

          {/* SOCIAL PROOF — renders only when real quotes are supplied */}
          {testimonials.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {testimonials.slice(0, 2).map((t) => (
                <div key={t.name} className="bg-white border border-[#d6d2d2] rounded-xl p-5">
                  <Quote className="w-5 h-5 text-[#E07850] mb-2" />
                  <p className="text-sm font-medium text-[#3A556C]/90 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs font-black text-[#3A556C]/50 uppercase tracking-widest">— {t.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] text-center shadow-md relative">
            {/* ANCHORING — a real, defensible comparison, not a fabricated strike-price */}
            <div className="mb-8 mt-2">
              <p className="text-[13px] font-semibold text-[#5E7183] leading-snug">
                For context, private therapy runs{" "}
                <span className="whitespace-nowrap font-bold text-[#5E7183]/80">€60–120 an hour</span>.
                This is a report, not therapy — it is a starting point, not a substitute.
              </p>
              <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#E07850]">Today, one-time</p>
              <p className="text-[56px] leading-none font-extrabold text-[#3A556C] tabular-nums mt-1">€9.99</p>
              <p className="text-[11px] font-bold text-[#8B93A1] uppercase tracking-widest mt-2.5">No subscription · Instant access</p>
            </div>

            <CheckoutButton
              sku="premium-report"
              email={email}
              returnTo={premiumPath}
              beforeCheckout={onUnlock}
              className="w-full min-h-[64px] bg-[#EC8A66] hover:bg-[#E07850] text-white rounded-xl font-extrabold text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0 cursor-pointer"
            >
              Unlock My Playbook
            </CheckoutButton>

            {/* AUTHORITY / TRUST BADGES — every claim defensible */}
            <div className="grid grid-cols-2 gap-2 mt-7 text-left">
              {[
                { icon: FlaskConical, text: "Research-informed" },
                { icon: Lock, text: "Stripe checkout" },
                { icon: ShieldCheck, text: "7-day refund" },
                { icon: CheckCircle2, text: "No subscription" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 min-w-0 bg-[#F7F4ED] border border-[#3A556C]/10 rounded-lg px-3 py-2.5">
                  <Icon className="w-4 h-4 text-[#E07850] shrink-0" />
                  <span className="text-[11px] font-bold text-[#3A556C] leading-snug">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 border-t border-[#d6d2d2] bg-white flex flex-col sm:flex-row items-center gap-4 justify-center">
        <ShieldCheck className="w-8 h-8 text-[#5A7492]" />
        <p className="text-sm md:text-base font-bold text-[#3A556C]/80">
          7-day guarantee. If the report does not describe your situation, email
          us within 7 days for a full refund — no questions asked.
        </p>
      </div>
    </div>
  );
}
