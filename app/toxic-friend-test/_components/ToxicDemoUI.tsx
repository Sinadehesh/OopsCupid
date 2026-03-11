"use client";

import React, { useState } from "react";

// --- COMPONENT 1: Answer Card ---
export function ToxicAnswerCard({
  text,
  options = ["0 - Never", "1 - Rarely", "2 - Sometimes", "3 - Often", "4 - Very Often"]
}: {
  text: string;
  options?: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[24px] shadow-[0_12px_40px_rgba(13,44,84,0.06)] border border-[#0D2C54]/10 p-8">
      <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-8 leading-snug">{text}</h3>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`w-full text-left p-4 rounded-[16px] border-[2px] font-bold text-lg transition-all duration-200 
              ${selected === opt 
                ? "border-[#00A6ED] bg-[#00A6ED]/10 text-[#00A6ED]" 
                : "border-[#0D2C54]/15 text-[#0D2C54] hover:border-[#00A6ED]/50 hover:bg-slate-50"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT 2: Result Ring ---
export function ToxicResultRing({ score, label, color = "#d81159" }: { score: number, label: string, color?: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0f172a] rounded-[24px] border border-slate-800 shadow-xl max-w-sm mx-auto">
      <div className="relative flex items-center justify-center w-40 h-40">
        {/* Background Circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(216,17,89,0.5)]"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white">{score}</span>
        </div>
      </div>
      <h4 className="mt-6 font-bold text-slate-300 tracking-widest uppercase text-sm text-center">{label}</h4>
    </div>
  );
}

// --- STORYBOOK DEMO CONTAINER ---
export default function ToxicDemoStorybook() {
  return (
    <div className="p-10 space-y-16 bg-slate-50 min-h-screen">
      <div>
        <h2 className="text-slate-500 font-bold mb-4 uppercase tracking-widest text-sm">Demo: Answer Card</h2>
        <ToxicAnswerCard text="I worry that private things I tell this friend could be used against me." />
      </div>
      <div>
        <h2 className="text-slate-500 font-bold mb-4 uppercase tracking-widest text-sm">Demo: Premium Radar / Ring</h2>
        <ToxicResultRing score={82} label="Relational Aggression" color="#ffbc42" />
      </div>
    </div>
  );
}
