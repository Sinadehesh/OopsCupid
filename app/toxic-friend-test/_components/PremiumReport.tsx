"use client";
import React from "react";
import { generatePremiumNarrative } from "../_lib/narrative-engine";

export default function PremiumReport({ data, answers }: { data: any, answers: Record<string, string> }) {
  const narrative = generatePremiumNarrative(answers, data);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 pt-8 print:pt-0">
      
      {/* Print Header */}
      <div className="flex justify-between items-center bg-[#0f172a] p-8 rounded-[24px] shadow-2xl relative overflow-hidden print:bg-white print:text-black print:border print:shadow-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl print:hidden"></div>
        <div className="relative z-10 text-white print:text-black">
          <span className="text-rose-400 font-bold tracking-widest uppercase text-xs mb-2 block print:text-slate-500">
            Confidential Clinical Screener
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Premium Friendship Diagnostics</h2>
          <p className="text-slate-400 print:text-slate-600">Your specific vulnerability and risk factors mapped.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl backdrop-blur-sm transition-all print:hidden"
          title="Download PDF"
        >
          🖨️ PDF
        </button>
      </div>

      {/* Dimension Breakdown */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
        <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-6 border-b pb-4">Multi-Dimensional Risk Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Bar metric="Friendship Victimization" score={data.mods.victimization} color="bg-rose-500" desc="Direct control and unpredictable hostility." />
          <Bar metric="Relational Aggression" score={data.mods.aggression} color="bg-orange-500" desc="Social exclusion, status games, and gossip." />
          <Bar metric="Manipulation & Control" score={data.mods.manipulation} color="bg-purple-500" desc="Guilt pressure and emotional blackmail." />
          <Bar metric="Antisocial Influence" score={data.mods.antisocial} color="bg-slate-800" desc="Pressure into risky or dishonest behavior." />
        </div>
      </div>

      {/* Narrative & Distortion Check */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">The Dynamic: {data.archetype}</h3>
          <p className="text-slate-700 text-lg leading-relaxed mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
            {data.description}
          </p>
          
          <h3 className="text-xl font-extrabold text-[#0D2C54] mb-4 text-blue-600">Distortion Check: Am I Overreacting?</h3>
          <p className="text-slate-700 text-lg leading-relaxed bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            {narrative.distortionCheck}
          </p>
        </div>

        {/* Top Red Flags */}
        <div className="bg-rose-50 rounded-[24px] shadow-sm border border-rose-100 p-8">
          <h3 className="text-xl font-extrabold text-rose-900 mb-6">Your Top 3 Red Flags</h3>
          <ul className="space-y-4">
            {narrative.redFlags.map((flag, idx) => (
              <li key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-rose-100/50">
                <span className="text-xs font-bold text-rose-500 uppercase block mb-1">{flag.subscale}</span>
                <p className="text-slate-700 font-medium text-sm">"{flag.text}"</p>
              </li>
            ))}
            {narrative.redFlags.length === 0 && (
              <p className="text-slate-500 text-sm">No severe red flags detected in your answers.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Action Plan & Scripts */}
      <div className="bg-[#0D2C54] rounded-[24px] shadow-lg p-8 text-white">
        <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
          <span>🛡️</span> Strategic Action Plan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <span className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-1 block">Immediate (Next 48 Hours)</span>
              <p className="bg-white/10 p-4 rounded-xl font-medium">{narrative.actions.immediate}</p>
            </div>
            <div>
              <span className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-1 block">Medium-Term (Next 2 Weeks)</span>
              <p className="bg-white/10 p-4 rounded-xl font-medium">{narrative.actions.medium}</p>
            </div>
            <div>
              <span className="text-blue-300 font-bold uppercase tracking-widest text-xs mb-1 block">Long-Term Strategy</span>
              <p className="bg-white/10 p-4 rounded-xl font-medium">{narrative.actions.longTerm}</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-lg font-extrabold mb-4">Copy & Paste Boundary Scripts</h4>
            <div className="space-y-4">
              {narrative.scripts.map((script, idx) => (
                <div key={idx} className="bg-[#0f172a] p-4 rounded-xl shadow-inner">
                  <span className="text-rose-400 font-bold text-xs uppercase mb-2 block">{script.title}</span>
                  <p className="text-slate-200 font-mono text-sm leading-relaxed">"{script.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function Bar({ metric, score, color, desc }: { metric: string, score: number, color: string, desc: string }) {
  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
      <div className="flex justify-between items-end mb-2">
        <span className="font-extrabold text-slate-900">{metric}</span>
        <span className="font-bold text-slate-500">{score}/100</span>
      </div>
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
      </div>
      <p className="text-xs text-slate-500 font-medium">{desc}</p>
    </div>
  );
}
