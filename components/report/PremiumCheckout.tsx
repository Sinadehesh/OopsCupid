"use client";

import React from "react";
import { ShieldCheck, BrainCircuit, HeartHandshake, Zap, Loader2, Clock, ArrowRight } from "lucide-react";

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating: boolean;
  archetype: string;
  relationshipStatus: string;
}

export default function PremiumCheckout({ onUnlock, isGenerating, archetype, relationshipStatus }: PremiumCheckoutProps) {
  const displayStatus = relationshipStatus === 'Single' ? 'Singles' : 'Couples';

  return (
    <div className={`relative w-full max-w-6xl mx-auto bg-white border border-[#d6d2d2] rounded-2xl shadow-md mt-12 overflow-hidden`}>
      
      {/* Urgency Strip */}
      <div className="bg-[#f0c808] text-[#086788] text-center py-3 px-4 flex items-center justify-center gap-2 font-black text-sm tracking-wide">
        <Clock className="w-5 h-5" /> 
        AI Server Allocation Secured For The Next 15 Minutes
      </div>

      <div className="p-6 md:p-12 border-b border-[#d6d2d2] bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded bg-[#fff1d0] text-[#086788] font-bold text-sm tracking-widest uppercase mb-6">
            The {archetype} Blueprint
          </span>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#086788]`}>
            We Found The Missing Link. <span className="text-[#06aed5]">Now Fix It.</span>
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed text-[#086788]/80`}>
            The free data shows <i>what</i> you are. The Master Audit connects your childhood data to your current life to show you exactly <i>why</i> you self-sabotage, and gives you a detailed {relationshipStatus.toLowerCase()} action plan to rewire it.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 bg-[#fff1d0]/20">
        
        {/* Left Stack */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className={`text-2xl font-black mb-6 text-[#086788]`}>The Clarity Bundle Stack:</h3>
          
          <div className={`flex gap-5 p-6 rounded-xl bg-white border border-[#d6d2d2] shadow-sm`}>
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded bg-[#fff1d0] text-[#f686bd]"><BrainCircuit className="w-6 h-6" /></div>
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className={`text-lg font-black text-[#086788]`}>1. The Origin Deconstruction</h4>
                <span className="text-sm font-bold text-[#086788]/40 line-through">$97 Value</span>
              </div>
              <p className={`text-base font-medium text-[#086788]/80`}>We synthesize your Mother and Father scores to reveal the exact childhood loops currently running your adult nervous system.</p>
            </div>
          </div>

          <div className={`flex gap-5 p-6 rounded-xl bg-white border border-[#d6d2d2] shadow-sm`}>
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded bg-[#fff1d0] text-[#06aed5]"><HeartHandshake className="w-6 h-6" /></div>
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className={`text-lg font-black text-[#086788]`}>2. Romantic & Professional Synthesis</h4>
                <span className="text-sm font-bold text-[#086788]/40 line-through">$97 Value</span>
              </div>
              <p className={`text-base font-medium text-[#086788]/80`}>See exactly how your triggers secretly bleed into your romantic choices and workplace burnout.</p>
            </div>
          </div>

          <div className={`flex gap-5 p-6 rounded-xl bg-white border-2 border-[#f0c808] shadow-md relative overflow-hidden`}>
            <div className="absolute top-0 right-0 bg-[#f0c808] text-[#086788] text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl">Core Offer</div>
            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded bg-[#f0c808]/20 text-[#f0c808]"><Zap className="w-6 h-6 fill-current" /></div>
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className={`text-lg font-black text-[#086788]`}>3. The {displayStatus} Action Plan</h4>
                <span className="text-sm font-bold text-[#086788]/60 line-through">$147 Value</span>
              </div>
              <p className={`text-base font-bold text-[#086788]/90`}>A ruthless, actionable guide on the immediate threats to your relationship status, and exactly how to fix it.</p>
            </div>
          </div>
        </div>

        {/* Right Stack (Price Box) */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] text-center shadow-md relative`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#dd1c1a] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
              Save 94% Today
            </div>
            
            <div className="space-y-2 mb-8 mt-4">
              <p className="text-sm font-bold text-[#086788]/50">Therapy: <span className="line-through">$1,200+ & 6 Months</span></p>
              <p className="text-sm font-bold text-[#086788]/50">Total Value: <span className="line-through">$341</span></p>
              <div className="flex items-baseline justify-center gap-2 pt-4">
                <span className={`text-2xl font-black text-[#086788]`}>Today:</span>
                <span className="text-7xl font-black text-[#086788]">$19</span>
              </div>
            </div>

            <button 
              onClick={onUnlock} 
              disabled={isGenerating} 
              className="w-full min-h-[64px] bg-[#f0c808] text-[#086788] rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0 cursor-pointer group"
            >
              {isGenerating ? (
                <><Loader2 className="w-6 h-6 animate-spin text-[#086788]" /> Compiling Matrix...</>
              ) : (
                <>Unlock My Playbook <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 md:p-8 border-t border-[#d6d2d2] bg-white`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 shrink-0 bg-[#fff1d0] rounded flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-[#086788]" />
          </div>
          <div>
            <h4 className={`text-lg font-black mb-1 text-[#086788]`}>The "Diary Reader" Guarantee</h4>
            <p className={`text-sm md:text-base font-medium text-[#086788]/80`}>
              If this report doesn't feel like we just read your diary and gave you the exact cheat code to fix your mind, email us within 7 days and we'll refund every penny. No questions asked.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
