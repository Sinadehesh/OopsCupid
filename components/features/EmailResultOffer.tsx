"use client";

import React from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

/**
 * Optional updates form shown under a result, never in front of it.
 * The result stays on screen; this form does not claim to email a copy.
 */
export default function EmailResultOffer({
  onSubmit,
  email,
  setEmail,
  agreed,
  setAgreed,
  saving,
  saved,
  error,
  className = "",
}: {
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (v: string) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  saving: boolean;
  saved: boolean;
  error?: string | null;
  className?: string;
}) {
  if (saved) {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div
          role="status"
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <p className="text-emerald-900 font-bold">
            You&apos;re on the free update list. Your result is still on screen above.
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
              Want new quizzes and practical guides?
            </h3>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Optional; your result is already on screen. Join the free email list for new
              quizzes and relationship advice.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Your email address"
            autoComplete="email"
            required
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
              Email me new quizzes and practical relationship advice. I agree to the{" "}
              <a href="/terms" className="underline hover:text-slate-700">Terms</a> and{" "}
              <a href="/privacy" className="underline hover:text-slate-700">Privacy Policy</a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={!email || !agreed || saving}
            className="w-full min-h-[52px] bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? "Joining…" : "Join the free update list"}
            {!saving && <ArrowRight className="w-4 h-4" />}
          </button>
          {error && <p role="alert" className="text-sm font-bold text-rose-600 text-center">{error}</p>}
        </form>

        <p className="text-[11px] font-bold text-slate-400 mt-4 text-center">
          No account. Unsubscribe any time. Your answers leave our servers within 48 hours.
        </p>
      </div>
    </div>
  );
}
