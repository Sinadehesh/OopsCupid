import React from "react";
import { Lock } from "lucide-react";

interface LockedInsightCardProps {
  title: string;
  teaser: string;
}

export default function LockedInsightCard({ title, teaser }: LockedInsightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center p-6 md:p-10 text-center group">
      
      {/* Background Fake Blurred Text Pattern */}
      <div className="absolute inset-0 p-6 opacity-40 select-none pointer-events-none blur-[3px]">
        <div className="w-3/4 h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-full h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-5/6 h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-full h-3 bg-slate-300 rounded mb-4"></div>
      </div>

      <div className="absolute inset-0 bg-white/70 z-10"></div>

      {/* Actual Content & CTA */}
      <div className="relative z-20 flex flex-col items-center w-full">
        <Lock className="w-8 h-8 text-[#ffbc42] mb-3" />
        <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-2">{title}</h4>
        <p className="text-slate-600 text-sm md:text-base font-medium mb-6 max-w-md mx-auto leading-relaxed">
          {teaser}
        </p>
        <button className="w-full md:w-auto bg-[#ffbc42] text-black font-bold py-3.5 px-10 rounded-full shadow-[0_4px_14px_rgba(255,188,66,0.4)] hover:bg-[#e5a93c] transition-all transform hover:-translate-y-0.5">
          Unlock full results
        </button>
      </div>
    </div>
  );
}
