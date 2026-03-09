import React from "react";
import { Lock } from "lucide-react";

interface LockedInsightCardProps {
  title: string;
  teaser: string;
  blurredBody: string;
}

export default function LockedInsightCard({ title, teaser, blurredBody }: LockedInsightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-full w-full group">
      
      {/* Visible Header */}
      <div className="p-6 md:p-8 pb-0 z-20 relative bg-gradient-to-b from-white via-white to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-[#ffbc42]/20 p-2 rounded-full">
            <Lock className="w-5 h-5 text-[#b08800]" />
          </div>
          <h4 className="text-lg md:text-xl font-extrabold text-slate-800">{title}</h4>
        </div>
        <p className="text-sm md:text-base font-bold text-slate-700 leading-relaxed mb-4">
          {teaser}
        </p>
      </div>

      {/* Realistic Blurred Body */}
      <div className="px-6 md:px-8 pb-8 relative z-0 flex-grow overflow-hidden">
        <p className="text-slate-500 font-medium leading-relaxed blur-[4px] opacity-60 select-none pointer-events-none text-justify">
          {blurredBody}
        </p>
        {/* Gradient Fade to hide the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent z-10"></div>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30 px-6">
        <button className="w-full bg-[#ffbc42] text-slate-900 font-extrabold text-sm md:text-base py-3.5 px-6 rounded-xl shadow-[0_4px_14px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] transition-all transform hover:-translate-y-0.5">
          Unlock full results
        </button>
      </div>
    </div>
  );
}
