"use client";
import React from "react";
import { ShieldAlert, Lock, Activity, EyeOff, FileText, ArrowRight } from "lucide-react";
import PremiumCheckout from "@/components/report/PremiumCheckout";

export default function ManipulationFreeResult({ data, onUnlock, isGenerating }: any) {
  const riskLevel = data?.riskLevel || "Elevated";

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8fafc] py-12 md:py-20 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <div className="text-center mb-12">
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Initial Threat Scan</h4>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-slate-900">
            Control Probability: <span className="text-indigo-600">{riskLevel}</span>
          </h2>
          <p className="text-xl font-medium leading-relaxed text-slate-600 max-w-3xl mx-auto">
            Based on the behavioral anomalies you reported, you are not crazy. His actions are highly consistent with clinical markers of psychological manipulation and coercive control.
          </p>
        </div>

        <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <ShieldAlert className="w-10 h-10 text-indigo-400" />
            <h3 className="text-2xl md:text-3xl font-black">He is not just a "bad communicator."</h3>
          </div>
          <div className="space-y-6 text-slate-300 font-medium text-lg leading-relaxed relative z-10">
            <p>You have been trying to solve this by talking to him. But you cannot communicate your way out of manipulation. His mixed signals—the sudden coldness, the guilt-tripping, the shifting of blame—are not an accident.</p>
            <p className="text-white font-bold text-xl border-l-4 border-indigo-500 pl-4 py-2 bg-white/5 rounded-r-xl">It is a psychological weapon called Intermittent Reinforcement.</p>
            <p>He is systematically hijacking your nervous system to keep you trapped in a cycle of anxiety and relief. To break the trauma bond, you must see the unedited blueprint of his abuse.</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200 mb-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Unlock the Subconscious Hijacking Dossier</h3>
            <p className="text-lg text-slate-600 font-medium">Get the clinical breakdown of exactly how he is controlling your reality, and what he will do next.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100"><Activity className="w-8 h-8 text-indigo-600 mb-4" /><h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-4 h-4"/> The 10-Point Control Matrix</h4><p className="text-slate-600 text-sm font-medium">Discover his exact abuse vectors, mapping out his financial, social, and emotional grip over you.</p></div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100"><EyeOff className="w-8 h-8 text-indigo-600 mb-4" /><h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-4 h-4"/> The "Sanity-Theft" Decoder</h4><p className="text-slate-600 text-sm font-medium">Word-for-word translations of his exact phrases, proving once and for all that you aren't crazy.</p></div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100"><ShieldAlert className="w-8 h-8 text-indigo-600 mb-4" /><h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-4 h-4"/> The Escalation Predictor</h4><p className="text-slate-600 text-sm font-medium">An AI-generated timeline predicting exactly what he will do next based on his current trajectory.</p></div>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100"><FileText className="w-8 h-8 text-indigo-600 mb-4" /><h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Lock className="w-4 h-4"/> The "Hoovering" Trap</h4><p className="text-slate-600 text-sm font-medium">The exact script he will use to suck you back in when you try to leave, and how to block it.</p></div>
          </div>

          <div className="border-t border-slate-100 pt-10">
            <PremiumCheckout onUnlock={onUnlock} isGenerating={isGenerating} archetype="Manipulation Dossier" relationshipStatus="In a relationship" />
            <div className="mt-6 text-center text-sm font-bold text-slate-500 flex items-center justify-center gap-2"><ArrowRight className="w-4 h-4 text-indigo-600" /> On the next page, you can optionally add the Grey Rock Disengagement Playbook to your order.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
