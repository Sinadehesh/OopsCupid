"use client";
import React from "react";
import { generatePremiumNarrative, extractRedFlags } from "../_lib/narrative";
import { ToxicResultRing } from "./ToxicDemoUI"; // Reusing the ring from Phase 1

export default function PremiumReport({ data, rawAnswers }: { data: any, rawAnswers: Record<string, string> }) {
  const narrativeData = generatePremiumNarrative(data.archetype, data.tier, data.mods);
  const redFlags = extractRedFlags(rawAnswers);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Premium Hero Block */}
      <div className="bg-[#0f172a] rounded-[24px] p-8 md:p-12 border border-slate-700 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d81159]/10 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Premium Profile Unlocked</h2>
        <p className="text-slate-400 text-lg mb-10">Your comprehensive friendship diagnostics.</p>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          <ToxicResultRing score={data.mods.victimization} label="Victimization" color="#d81159" />
          <ToxicResultRing score={data.mods.aggression} label="Aggression" color="#ffbc42" />
          <ToxicResultRing score={data.mods.manipulation} label="Manipulation" color="#00A6ED" />
        </div>
      </div>

      {/* Narrative & Distortion Check */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 md:p-10 space-y-8">
        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">The Dynamic: {data.archetype}</h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">
            {narrativeData.narrative}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4 flex items-center gap-2">
            <span>🧠</span> Distortion Check: Am I Overreacting?
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            {narrativeData.distortionCheck}
          </p>
        </div>
      </div>

      {/* Top Red Flags Extraction */}
      {redFlags.length > 0 && (
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 md:p-10">
          <h3 className="text-2xl font-extrabold text-[#d81159] mb-6 border-b border-slate-100 pb-4">
            Critical Red Flags Detected
          </h3>
          <div className="space-y-4">
            {redFlags.map((flag, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-rose-50/50 p-5 rounded-xl border border-rose-100">
                <span className="text-xl">🚩</span>
                <div>
                  <p className="text-lg font-bold text-slate-800">{flag.q?.text}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">You answered: {flag.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Plan & Scripts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
          <h3 className="text-xl font-extrabold text-[#0D2C54] mb-4">Immediate Actions</h3>
          <ul className="space-y-3">
            {narrativeData.actionPlan.immediate.map((action, i) => (
              <li key={i} className="flex gap-3 text-slate-700"><span className="text-[#00A6ED]">✓</span> {action}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
          <h3 className="text-xl font-extrabold text-[#0D2C54] mb-4">Copy-Paste Boundary Scripts</h3>
          <div className="space-y-4">
            {narrativeData.scripts.map((script, i) => (
              <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">{script.title}</p>
                <p className="text-slate-800 font-medium italic">"{script.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Export Teaser */}
      <div className="text-center py-6">
        <button className="bg-slate-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mx-auto shadow-lg shadow-slate-900/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download PDF Report
        </button>
      </div>

    </div>
  );
}
