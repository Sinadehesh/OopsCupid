"use client";

import React from "react";
import { generateToxicFriendNarrative } from "@/lib/psychometrics/toxic-friend/narrative";

interface PremiumReportProps {
  data: {
    riskScore: number;
    impactScore: number;
    tier: number;
    modules: Record<string, number>;
    hardFlagTriggered: boolean;
  };
}

export default function PremiumReportView({ data }: PremiumReportProps) {
  const { riskScore, impactScore, tier, modules } = data;
  
  // Generate the specific text based on the math
  const narrative = generateToxicFriendNarrative(tier, modules, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* HERO SCORE BLOCK */}
      <div className="bg-[#0f172a] rounded-[24px] p-8 md:p-12 border border-slate-700 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#b10f2e]/10 rounded-full blur-3xl"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Premium Profile Unlocked</h2>
        <p className="text-slate-400 text-lg mb-10">Your complete friendship dynamic breakdown.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Main Risk Score */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-8 border-[#b10f2e] flex items-center justify-center mb-4 relative bg-slate-900 shadow-[0_0_30px_rgba(177,15,46,0.3)]">
              <span className="text-5xl font-extrabold text-white">{riskScore}</span>
            </div>
            <span className="text-slate-300 font-bold uppercase tracking-widest text-sm">Toxicity Risk</span>
          </div>

          {/* Impact Score */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-8 border-[#0496ff] flex items-center justify-center mb-4 relative bg-slate-900 shadow-[0_0_30px_rgba(4,150,255,0.2)]">
              <span className="text-5xl font-extrabold text-white">{impactScore}</span>
            </div>
            <span className="text-slate-300 font-bold uppercase tracking-widest text-sm">Emotional Harm</span>
          </div>
        </div>
      </div>

      {/* DIMENSION BREAKDOWN */}
      <div className="bg-white rounded-[24px] p-8 md:p-10 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-extrabold text-slate-900 mb-6 border-b pb-4">The 4 Hidden Dimensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DimensionBar label="Friendship Victimization" score={modules.victimization} description="Direct control, unpredictable hostility, or fear." color="bg-[#b10f2e]" />
          <DimensionBar label="Negative Quality" score={modules.quality} description="One-sidedness, betrayal, and lack of support." color="bg-[#0496ff]" />
          <DimensionBar label="Relational Aggression" score={modules.aggression} description="Social exclusion, status games, and reputation damage." color="bg-[#ffbc42]" />
          <DimensionBar label="Unsafe Influence" score={modules.antisocial} description="Pressure into risk, dishonesty, and moral discomfort." color="bg-slate-800" />
        </div>
      </div>

      {/* THE NARRATIVE */}
      <div className="bg-white rounded-[24px] p-8 md:p-10 border border-slate-200 shadow-sm space-y-8">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4 text-[#8f2d56]">The Dynamic</h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">{narrative.dynamic}</p>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4 text-[#006ba6]">Distortion Check: Am I Overreacting?</h3>
          <p className="text-lg text-slate-700 leading-relaxed font-medium bg-slate-50 p-6 rounded-xl border border-slate-100">{narrative.distortionCheck}</p>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Action & Boundary Guidance</h3>
          <ul className="space-y-4">
            {narrative.guidance.map((tip, idx) => (
              <li key={idx} className="flex gap-4 items-start bg-slate-50 p-5 rounded-xl border border-slate-100">
                <span className="text-2xl">🛡️</span>
                <p className="text-lg text-slate-700 font-medium">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RISK GUARDRAIL NOTE */}
      <div className="text-center p-6 text-slate-500 text-sm">
        <p>This result highlights a pattern of behaviors associated with emotional harm, control, or relational aggression. It does not diagnose a disorder or prove malicious intent. If you feel physically unsafe, please seek professional support.</p>
      </div>

    </div>
  );
}

function DimensionBar({ label, score, description, color }: { label: string, score: number, description: string, color: string }) {
  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
      <div className="flex justify-between items-end mb-2">
        <span className="font-extrabold text-slate-900">{label}</span>
        <span className="font-bold text-slate-500">{Math.round(score)}/100</span>
      </div>
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
        <div className={`h-full rounded-full ${color} transition-all duration-1000`} style={{ width: `${score}%` }}></div>
      </div>
      <p className="text-sm text-slate-600 font-medium">{description}</p>
    </div>
  );
}
