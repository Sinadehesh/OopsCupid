"use client";

import React from "react";
import { ShieldCheck, BrainCircuit, HeartHandshake, Briefcase, Zap, Loader2, Lock, Clock, ArrowRight } from "lucide-react";

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating: boolean;
  archetype: string;
  relationshipStatus: string;
  isDarkTheme?: boolean;
}

export default function PremiumCheckout({ onUnlock, isGenerating, archetype, relationshipStatus, isDarkTheme = false }: PremiumCheckoutProps) {
  const bgCard = isDarkTheme ? "bg-[#14213d] border-[#fca311]/30" : "bg-[#ffffff] border-[#0D2C54]/10";
  const tH3 = isDarkTheme ? "text-[#ffffff]" : "text-[#0D2C54]";
  const tText = isDarkTheme ? "text-[#e5e5e5]" : "text-[#475569]";
  const bgPillar = isDarkTheme ? "bg-[#000000]/50 border-[#000000]" : "bg-[#f8fbff] border-[#00A6ED]/20";

  // Personalize the M-A-G-I-C naming
  const displayStatus = relationshipStatus === 'Single' ? 'Singles' : 'Couples';

  return (
    <div className={`relative p-1 border-t-4 border-[#00A6ED] rounded-3xl shadow-2xl ${isDarkTheme ? 'bg-[#000000]' : 'bg-gradient-to-b from-white to-[#f8fbff]'}`}>
      
      <div className="bg-[#0D2C54] text-white text-center py-3 rounded-t-3xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide">
        <Clock className="w-4 h-4 text-[#FFB400]" /> 
        AI Server Allocation Secured For The Next 15 Minutes
      </div>

      <div className={`relative z-10 rounded-b-3xl overflow-hidden max-w-4xl mx-auto ${bgCard}`}>
        <div className="p-8 md:p-12 text-center border-b border-[#000000]/5 dark:border-[#ffffff]/10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFB400]/20 text-[#D97706] font-extrabold text-sm tracking-widest uppercase mb-4">
            The {archetype} Subconscious Blueprint
          </span>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${tH3}`}>
            We Found The Missing Link. <span className="text-[#00A6ED]">Now Fix It.</span>
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${tText}`}>
            The free data shows <i>what</i> you are. The Master Audit connects your childhood data to your current life to show you exactly <i>why</i> you self-sabotage, and gives you a 24-hour {relationshipStatus.toLowerCase()} action plan to rewire it.
          </p>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-3 space-y-4">
            <h3 className={`text-2xl font-black mb-6 ${tH3}`}>The Clarity Bundle Stack:</h3>
            
            <div className={`flex gap-5 p-5 rounded-2xl border shadow-sm ${bgPillar}`}>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#d81159]/10 text-[#d81159]"><BrainCircuit className="w-6 h-6" /></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg font-bold ${tH3}`}>1. The Origin Deconstruction</h4>
                  <span className="text-sm font-bold opacity-50 line-through">$97 Value</span>
                </div>
                <p className={`text-sm md:text-base font-medium ${tText}`}>We synthesize your Mother and Father scores to reveal the exact childhood loops currently running your adult nervous system.</p>
              </div>
            </div>

            <div className={`flex gap-5 p-5 rounded-2xl border shadow-sm ${bgPillar}`}>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#8f2d56]/10 text-[#8f2d56]"><HeartHandshake className="w-6 h-6" /></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg font-bold ${tH3}`}>2. Romantic & Professional Synthesis</h4>
                  <span className="text-sm font-bold opacity-50 line-through">$97 Value</span>
                </div>
                <p className={`text-sm md:text-base font-medium ${tText}`}>See exactly how your triggers secretly bleed into your romantic choices and workplace burnout.</p>
              </div>
            </div>

            <div className={`flex gap-5 p-5 rounded-2xl border shadow-sm relative overflow-hidden ${bgPillar}`}>
              <div className="absolute top-0 right-0 bg-[#FFB400] text-[#000000] text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg">Core Offer</div>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#FFB400]/20 text-[#D97706]"><Zap className="w-6 h-6 fill-current" /></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg font-bold ${tH3}`}>3. The 24-Hour {displayStatus} Action Plan</h4>
                  <span className="text-sm font-bold opacity-50 line-through">$147 Value</span>
                </div>
                <p className={`text-sm md:text-base font-medium ${tText}`}>A ruthless, actionable guide on the immediate threats to your relationship status, and exactly how to fix it.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className={`p-8 rounded-3xl border-2 border-[#00A6ED] bg-white dark:bg-[#000000] text-center shadow-xl relative`}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00A6ED] text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                Save 94% Today
              </div>
              
              <div className="space-y-1 mb-6 mt-2">
                <p className="text-sm font-bold text-slate-400">Therapy: <span className="line-through">$1,200+ & 6 Months</span></p>
                <p className="text-sm font-bold text-slate-400">Total Value: <span className="line-through">$341</span></p>
                <div className="flex items-baseline justify-center gap-2 pt-2">
                  <span className={`text-2xl font-bold ${tH3}`}>Today:</span>
                  <span className="text-6xl font-black text-[#00A6ED]">$19</span>
                </div>
              </div>

              <button 
                onClick={onUnlock} 
                disabled={isGenerating} 
                className="w-full py-5 bg-[#0D2C54] hover:bg-[#0D2C54]/90 text-[#ffffff] rounded-2xl font-extrabold text-xl transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0 cursor-pointer group"
              >
                {isGenerating ? (
                  <><Loader2 className="w-6 h-6 animate-spin text-[#00A6ED]" /> Compiling Matrix...</>
                ) : (
                  <>Unlock My Playbook <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={`p-6 border-t ${isDarkTheme ? 'bg-[#000000] border-[#ffffff]/10' : 'bg-[#f8fbff] border-[#000000]/5'}`}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 shrink-0 bg-[#FFB400]/20 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#D97706]" />
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-1 ${tH3}`}>The "Diary Reader" Guarantee</h4>
              <p className={`text-sm font-medium ${tText}`}>
                If this report doesn't feel like we just read your diary and gave you the exact cheat code to fix your mind, email us within 7 days and we'll refund every penny. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
