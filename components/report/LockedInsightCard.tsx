import React from "react";
import { Lock } from "lucide-react";

interface LockedInsightCardProps {
  title: string;
  teaser: string;
  isDarkTheme?: boolean;
}

export default function LockedInsightCard({ title, teaser, isDarkTheme }: LockedInsightCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border flex flex-col items-center justify-center p-6 md:p-10 text-center group h-full w-full ${isDarkTheme ? 'bg-slate-800 border-slate-700 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
      
      {/* Fake Blurred Text Pattern */}
      <div className={`absolute inset-0 p-6 opacity-40 select-none pointer-events-none blur-[3px] ${isDarkTheme ? 'brightness-50' : ''}`}>
        <div className="w-3/4 h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-full h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-5/6 h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-full h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-2/3 h-3 bg-slate-300 rounded mb-4"></div>
        <div className="w-full h-3 bg-slate-300 rounded mb-4"></div>
      </div>

      <div className={`absolute inset-0 z-10 ${isDarkTheme ? 'bg-slate-800/80' : 'bg-white/70'}`}></div>

      {/* Actual Content & CTA */}
      <div className="relative z-20 flex flex-col items-center w-full mt-auto mb-auto">
        <div className="bg-[#ffbc42]/20 p-3 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
          <Lock className="w-7 h-7 text-[#b08800]" />
        </div>
        <h4 className={`text-lg md:text-xl font-bold mb-3 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>{title}</h4>
        <p className={`text-sm md:text-base font-medium mb-6 max-w-md mx-auto leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-slate-600'}`}>
          {teaser}
        </p>
        <button className="w-full bg-[#ffbc42] text-black font-bold py-3.5 px-6 rounded-xl shadow-[0_4px_14px_rgba(255,188,66,0.4)] hover:bg-[#e5a93c] transition-all transform hover:-translate-y-0.5">
          Unlock full results
        </button>
      </div>
    </div>
  );
}
