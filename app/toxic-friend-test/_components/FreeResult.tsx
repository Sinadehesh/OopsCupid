"use client";
import React from "react";

export default function FreeResult({ data }: { data: any }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.riskScore / 100) * circumference;
  
  // Dynamic color based on risk
  const ringColor = data.riskScore >= 60 ? "#d81159" : data.riskScore >= 40 ? "#ffbc42" : "#00A6ED";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Free Summary Header */}
      <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(13,44,84,0.06)] border border-[#0D2C54]/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        
        {/* Score Ring */}
        <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r={radius} stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={ringColor}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-[#0D2C54]">{data.riskScore}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
          </div>
        </div>

        {/* Text Summary */}
        <div className="text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Dominant Pattern</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-3">{data.archetype}</h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Premium Upsell CTA Block */}
      <div className="bg-[#0f172a] rounded-[24px] shadow-2xl border border-slate-800 p-8 md:p-10 relative overflow-hidden text-center">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <span className="inline-block bg-rose-500/20 text-rose-400 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          🔒 Premium Analysis Unlock
        </span>
        
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          Unlock Your Full Friendship Profile
        </h3>
        
        <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
          See your exact scores across 5 hidden dimensions. Discover your vulnerability modifiers, get a 10-step boundary plan, and access specific copy-paste scripts.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-slate-300 text-sm font-bold">Victimization</div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-slate-300 text-sm font-bold">Aggression</div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-slate-300 text-sm font-bold">Manipulation</div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 text-slate-300 text-sm font-bold">Impact Risk</div>
        </div>

        <button className="w-full md:w-auto bg-[#00A6ED] hover:bg-[#008fcc] text-white font-extrabold text-lg py-4 px-10 rounded-[14px] transition-all transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,166,237,0.3)]">
          Reveal Deep Diagnostics
        </button>
      </div>

    </div>
  );
}
