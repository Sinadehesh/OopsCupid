"use client";
import React from "react";
import { generatePremiumNarrative } from "../_lib/narrative";

export default function PremiumReport({ data, answers }: { data: any, answers: Record<string, string> }) {
  const report = generatePremiumNarrative(data, answers);

  const PrintButton = () => (
    <button onClick={() => window.print()} className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-700 transition print:hidden">
      🖨️ Save as PDF
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="bg-[#0f172a] rounded-[24px] p-8 md:p-12 border border-slate-700 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A6ED]/10 rounded-full blur-3xl"></div>
        <div className="flex justify-between items-start mb-6">
          <span className="bg-[#00A6ED]/20 text-[#00A6ED] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest print:hidden">
            Premium Profile
          </span>
          <PrintButton />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Diagnostic Profile: {data.archetype}</h2>
        <p className="text-slate-400 text-lg">Your comprehensive friendship pattern analysis.</p>
      </div>

      {/* 5 Dimensions Breakdown */}
      <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-6">The 5 Hidden Dimensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DimensionBar label="Victimization (Control/Hostility)" score={data.mods.victimization} color="bg-rose-500" />
          <DimensionBar label="Relational Aggression" score={data.mods.aggression} color="bg-amber-500" />
          <DimensionBar label="Manipulation & Control" score={data.mods.manipulation} color="bg-purple-500" />
          <DimensionBar label="Negative Quality (One-sided)" score={data.mods.quality} color="bg-blue-500" />
          <DimensionBar label="Antisocial Influence" score={data.mods.antisocial} color="bg-slate-800" />
        </div>
      </div>

      {/* Narrative & Distortion Check */}
      <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm space-y-8">
        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">The Dynamic</h3>
          <p className="text-lg text-slate-700 leading-relaxed p-6 bg-slate-50 rounded-xl border border-slate-100">
            {report.narrativeText}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">Distortion Check</h3>
          <p className="text-lg text-slate-700 leading-relaxed p-6 bg-blue-50/50 rounded-xl border border-blue-100">
            {report.distortionCheck}
          </p>
        </div>
      </div>

      {/* Top Red Flags */}
      <div className="bg-rose-50 rounded-[24px] p-8 border border-rose-100 shadow-sm">
        <h3 className="text-2xl font-extrabold text-rose-900 mb-4">Your Top Extracted Red Flags</h3>
        <ul className="space-y-3">
          {report.redFlags.length > 0 ? report.redFlags.map((flag, idx) => (
            <li key={idx} className="flex gap-3 text-lg text-rose-800 font-medium items-start">
              <span className="mt-1">🚩</span> <span>{flag}</span>
            </li>
          )) : <li className="text-rose-800">No severe red flags detected in your answers.</li>}
        </ul>
      </div>

      {/* Action Plan & Scripts */}
      <div className="bg-white rounded-[24px] p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">Action Plan</h3>
          <ul className="space-y-4">
            {report.actions.map((act, idx) => (
              <li key={idx} className="flex gap-3 items-start text-slate-700 font-medium">
                <span className="text-[#00A6ED]">✓</span> {act}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">Boundary Scripts</h3>
          <ul className="space-y-4">
            {report.scripts.map((script, idx) => (
              <li key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-medium italic">
                "{script}"
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

function DimensionBar({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
      <div className="flex justify-between items-end mb-2">
        <span className="font-extrabold text-[#0D2C54] text-sm">{label}</span>
        <span className="font-bold text-slate-500 text-sm">{Math.round(score)}/100</span>
      </div>
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}
