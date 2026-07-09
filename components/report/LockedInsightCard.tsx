"use client";
import React from "react";
import { Lock, Eye, ArrowRight } from "lucide-react";

interface LockedInsightCardProps {
  title: string;
  teaser: string;
  blurredBody: string;
  isDarkTheme?: boolean;
  /**
   * ZEIGARNIK HOOK: pass the insight as a partial list — the first item is
   * shown in full, the rest render blurred. An opened-but-unfinished list
   * is far harder to walk away from than a fully hidden one.
   */
  revealedBullet?: string;
  lockedBullets?: string[];
  /** Wire the CTA. Falls back to scrolling to the #unlock-offer anchor. */
  onUnlock?: () => void;
  ctaText?: string;
}

export default function LockedInsightCard({
  title,
  teaser,
  blurredBody,
  isDarkTheme,
  revealedBullet,
  lockedBullets,
  onUnlock,
  ctaText = "Unlock full results",
}: LockedInsightCardProps) {
  const handleUnlock = () => {
    if (onUnlock) return onUnlock();
    // default: take them to the offer section on the same page
    document.getElementById("unlock-offer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border flex flex-col h-full w-full group ${isDarkTheme ? 'bg-slate-800 border-slate-700 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="p-6 md:p-8 pb-2 z-20 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#ffbc42]/20 p-2.5 rounded-full shadow-sm">
              <Lock className="w-5 h-5 text-[#b08800]" />
            </div>
            <h4 className={`text-xl font-extrabold ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
          </div>
          {/* PROGRESS FRAGMENT: "1 of N shown" makes the incompleteness explicit */}
          {lockedBullets && lockedBullets.length > 0 && (
            <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isDarkTheme ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-slate-500'}`}>
              1 of {lockedBullets.length + 1} shown
            </span>
          )}
        </div>
        <p className={`text-base font-bold leading-relaxed mb-4 ${isDarkTheme ? 'text-slate-300' : 'text-slate-700'}`}>
          {teaser}
        </p>

        {/* THE OPEN LOOP: first insight in full clarity, the rest visibly there but unreadable */}
        {revealedBullet && (
          <div className={`flex items-start gap-3 rounded-2xl p-4 mb-2 border ${isDarkTheme ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
            <Eye className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className={`text-sm font-bold leading-snug ${isDarkTheme ? 'text-emerald-200' : 'text-emerald-800'}`}>
              {revealedBullet}
            </p>
          </div>
        )}
        {lockedBullets?.map((b, i) => (
          <div key={i} className={`flex items-start gap-3 rounded-2xl p-4 mb-2 border ${isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
            <Lock className={`w-4 h-4 shrink-0 mt-1 ${isDarkTheme ? 'text-white/30' : 'text-slate-300'}`} />
            <p className={`text-sm font-bold leading-snug blur-[4px] select-none ${isDarkTheme ? 'text-slate-400' : 'text-slate-400'}`}>
              {b}
            </p>
          </div>
        ))}
      </div>

      <div className="px-6 md:px-8 pb-32 relative z-0 flex-grow overflow-hidden">
        <p className={`font-medium leading-relaxed blur-[5px] opacity-60 select-none pointer-events-none text-justify ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
          {blurredBody}
        </p>
        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkTheme ? 'from-slate-800 via-slate-800/70' : 'from-white via-white/70'} to-transparent z-10`}></div>
      </div>

      <div className="absolute bottom-5 left-0 right-0 z-30 px-6 md:px-8">
        <button
          onClick={handleUnlock}
          className="w-full bg-[#ffbc42] text-slate-900 font-extrabold text-base py-4 px-6 rounded-xl shadow-[0_4px_14px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          {ctaText} <ArrowRight className="w-4 h-4" />
        </button>
        {/* LOSS AVERSION — and it's true: answers are purged after 24h */}
        <p className={`text-center text-[11px] font-bold mt-2.5 ${isDarkTheme ? 'text-white/40' : 'text-slate-400'}`}>
          Your answers are deleted after 24 hours — this analysis can&apos;t be regenerated later.
        </p>
      </div>
    </div>
  );
}
