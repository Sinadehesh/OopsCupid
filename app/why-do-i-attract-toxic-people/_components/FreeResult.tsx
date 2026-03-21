"use client";
import React from "react";
import { ShieldAlert, Lock, Database, EyeOff, UserX, FlaskConical, ShieldCheck, ArrowRight, AlertOctagon } from "lucide-react";
import PremiumCheckout from "@/components/report/PremiumCheckout";

export default function FreeResult({ data, onUnlock, isGenerating }: { data: any, onUnlock: any, isGenerating: boolean }) {
  const topTrait = data?.top1 || "The Hyper-Empathetic Rescuer";

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8fafc] py-12 md:py-20 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* THE HOOK & VALIDATION */}
        <div className="text-center mb-12">
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Diagnostic Result</h4>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-slate-900">
            You are "<span className="text-rose-600">{topTrait}</span>"
          </h2>
          <p className="text-xl font-medium leading-relaxed text-slate-600 max-w-3xl mx-auto">
            Based on your 24 data points, we have mapped your primary attraction archetype. You possess a rare, high-tier level of empathy. You naturally see the potential in people, you give without keeping score, and you have an incredible capacity to love through difficult times.
          </p>
        </div>

        {/* THE EPIPHANY BRIDGE (OPPORTUNITY SWITCH) */}
        <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <AlertOctagon className="w-10 h-10 text-rose-500" />
            <h3 className="text-2xl md:text-3xl font-black">But right now, your superpower is being weaponized.</h3>
          </div>
          
          <div className="space-y-6 text-slate-300 font-medium text-lg leading-relaxed relative z-10">
            <p>
              For years, traditional therapy and generic dating advice have told you to <em className="text-rose-300">"just set better boundaries"</em> or <em className="text-rose-300">"stop ignoring red flags."</em> They made you feel like your broken heart was your own fault.
            </p>
            <p className="text-white font-bold text-xl border-l-4 border-rose-500 pl-4 py-2 bg-white/5 rounded-r-xl">
              They were completely wrong.
            </p>
            <p>
              Our data shows that you do not lack boundaries. You have a highly specific, subconscious <strong>Psychological Blind Spot</strong>. You are unknowingly broadcasting a "frequency" that healthy men don't even notice—but to manipulators, narcissists, and toxic individuals, it looks like a glowing neon target.
            </p>
            <p className="text-rose-400 font-bold">
              They aren't accidentally finding you. They are actively hunting your archetype.
            </p>
          </div>
        </div>

        {/* THE GRAND SLAM OFFER STACK */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200 mb-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">To break the cycle, you must close the backdoor.</h3>
            <p className="text-lg text-slate-600 font-medium">
              A label alone will not protect you on your next date. Unlock your private <strong>Toxic-Loop Intercept Master-File</strong> to see the exact playbook predators are using against you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-rose-200 transition-colors group">
              <Database className="w-8 h-8 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" /> Attraction Matrix
              </h4>
              <p className="text-slate-600 text-sm font-medium">See the hard data on exactly why your past relationships failed, scoring your vulnerabilities across 10 psychological zones to remove the mystery.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-rose-200 transition-colors group">
              <EyeOff className="w-8 h-8 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" /> Perimeter Breach Analysis
              </h4>
              <p className="text-slate-600 text-sm font-medium">A brutal breakdown of the exact scenarios where you cannot see danger, and the micro-behaviors manipulators use to slip past your defenses.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-rose-200 transition-colors group">
              <UserX className="w-8 h-8 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" /> Dark Triad Target Report
              </h4>
              <p className="text-slate-600 text-sm font-medium">Identify the specific cluster of mental disorders (e.g., Covert Narcissism) you magnetically attract, so you know exactly what they look and sound like.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-rose-200 transition-colors group">
              <FlaskConical className="w-8 h-8 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" /> 3-Step "Mask-Slip" Protocol
              </h4>
              <p className="text-slate-600 text-sm font-medium">A psychologically proven, covert testing framework to run on any man before you get attached, forcing him to drop his "perfect guy" act.</p>
            </div>
          </div>

          {/* THE GUARANTEE (RISK REVERSAL) */}
          <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 text-center md:text-left">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xl font-black text-emerald-900 mb-2">The 100% "Clarity or Cash Back" Guarantee</h4>
              <p className="text-emerald-800/80 font-medium text-sm leading-relaxed">
                We take all the risk. Unlock your Master-File right now. If you do not immediately recognize your exes in the data—if you do not feel an instant, chilling level of clarity about why your past relationships went wrong—simply email us within 30 days and we will refund every penny. No questions asked.
              </p>
            </div>
          </div>

          {/* CHECKOUT SECTION */}
          <div className="border-t border-slate-100 pt-10">
            <PremiumCheckout 
              onUnlock={onUnlock} 
              isGenerating={isGenerating} 
              archetype={topTrait}
            />
            
            {/* ORDER BUMP TEASE */}
            <div className="mt-6 text-center text-sm font-bold text-slate-500 flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4 text-rose-500" /> 
              On the next page, you will have the option to add the <span className="text-slate-800">Narcissist Disarmament Playbook</span> to your order.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
