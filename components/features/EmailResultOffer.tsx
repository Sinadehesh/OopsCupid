"use client";

import React from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

/**
 * EMAIL OFFER — shown UNDER a result, never in front of it.
 *
 * This replaced a mandatory gate. Search Console shows 23% of the queries
 * reaching this site contain "free", and several spell out "no email" or
 * "no sign up": people are explicitly searching for a test that does not
 * demand an address, and this site was the one with a wall.
 *
 * The wall collected 4 addresses in five months, so it was protecting
 * nothing while turning away the exact audience Google was sending. Asked
 * afterwards, the address is an offer with a reason attached — which is
 * both more honest and, on every funnel I have seen, more productive.
 */
export default function EmailResultOffer({
  onSubmit,
  email,
  setEmail,
  agreed,
  setAgreed,
  saving,
  saved,
  className = "",
}: {
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (v: string) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  saving: boolean;
  saved: boolean;
  className?: string;
}) {
  if (saved) {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <p className="text-emerald-900 font-bold">
            Sent. Your results are on their way — check spam if it hasn&apos;t arrived in a few minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgba(15,23,42,0.05)]">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-lg leading-snug">
              Want a copy of this?
            </h3>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Optional — you&apos;ve already got your result. This just sends it to you
              so you can read it again later.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-4 focus:ring-slate-100 outline-none text-slate-800 font-medium transition-all"
          />

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 mt-0.5 border-2 border-slate-300 rounded bg-white peer-checked:bg-slate-800 peer-checked:border-slate-800 transition-colors flex items-center justify-center shrink-0 group-hover:border-slate-400">
              {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className="text-sm font-medium text-slate-500 leading-snug">
              Send it to me, and I agree to the{" "}
              <a href="/terms" className="underline hover:text-slate-700">Terms</a> and{" "}
              <a href="/privacy" className="underline hover:text-slate-700">Privacy Policy</a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={!email || !agreed || saving}
            className="w-full min-h-[52px] bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Sending…" : "Email me my results"}
            {!saving && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-[11px] font-bold text-slate-400 mt-4 text-center">
          No account. No spam. Your answers leave our servers within 48 hours.
        </p>
      </div>
    </div>
  );
}
