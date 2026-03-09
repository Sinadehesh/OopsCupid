import React from "react";
import { Lock } from "lucide-react";

interface LockedInsightCardProps {
  title: string;
  teaser: string;
  blurredBody: string;
  isDarkTheme?: boolean;
}

export default function LockedInsightCard({ title, teaser, blurredBody, isDarkTheme }: LockedInsightCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border flex flex-col h-full w-full group ${isDarkTheme ? 'bg-slate-800 border-slate-700 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
      
      {/* Visible Header */}
      <div className="p-6 md:p-8 pb-2 z-20 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#ffbc42]/20 p-2.5 rounded-full shadow-sm">
            <Lock className="w-5 h-5 text-[#b08800]" />
          </div>
          <h4 className={`text-xl font-extrabold ${isDarkTheme ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
        </div>
        <p className={`text-base font-bold leading-relaxed mb-2 ${isDarkTheme ? 'text-slate-300' : 'text-slate-700'}`}>
          {teaser}
        </p>
      </div>

      {/* Realistic Blurred Body */}
      <div className="px-6 md:px-8 pb-8 relative z-0 flex-grow overflow-hidden">
        <p className={`font-medium leading-relaxed blur-[5px] opacity-60 select-none pointer-events-none text-justify ${isDarkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
          {blurredBody}
        </p>
        {/* Gradient Fade to hide the bottom text cleanly */}
        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkTheme ? 'from-slate-800 via-slate-800/70' : 'from-white via-white/70'} to-transparent z-10`}></div>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-30 px-6 md:px-8">
        <button className="w-full bg-[#ffbc42] text-slate-900 font-extrabold text-base py-4 px-6 rounded-xl shadow-[0_4px_14px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] transition-all transform hover:-translate-y-0.5">
          Unlock full results
        </button>
      </div>
    </div>
  );
}
