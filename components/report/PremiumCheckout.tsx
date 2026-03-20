"use client";

import React from "react";
import { ShieldCheck, Crosshair, FileText, Zap, Loader2, Lock, Clock, ArrowRight } from "lucide-react";

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating: boolean;
  isDarkTheme?: boolean;
}

export default function PremiumCheckout({ onUnlock, isGenerating, isDarkTheme = false }: PremiumCheckoutProps) {
  const bgCard = isDarkTheme ? "bg-[#14213d] border-[#fca311]/30" : "bg-[#ffffff] border-[#0D2C54]/10";
  const tH3 = isDarkTheme ? "text-[#ffffff]" : "text-[#0D2C54]";
  const tText = isDarkTheme ? "text-[#e5e5e5]" : "text-[#475569]";
  const bgPillar = isDarkTheme ? "bg-[#000000]/50 border-[#000000]" : "bg-[#f8fbff] border-[#00A6ED]/20";

  return (
    <div className={`relative p-1 border-t-4 border-[#00A6ED] rounded-3xl shadow-2xl ${isDarkTheme ? 'bg-[#000000]' : 'bg-gradient-to-b from-white to-[#f8fbff]'}`}>
      
      {/* Urgency Banner */}
      <div className="bg-[#0D2C54] text-white text-center py-3 rounded-t-3xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide">
        <Clock className="w-4 h-4 text-[#FFB400]" /> 
        AI Server Allocation Secured For The Next 15 Minutes
      </div>

      <div className={`relative z-10 rounded-b-3xl overflow-hidden max-w-4xl mx-auto ${bgCard}`}>
        <div className="p-8 md:p-12 text-center border-b border-[#000000]/5 dark:border-[#ffffff]/10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFB400]/20 text-[#D97706] font-extrabold text-sm tracking-widest uppercase mb-4">
            The Subconscious Rewire Protocol
          </span>
          <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${tH3}`}>
            Stop Guessing. <span className="text-[#00A6ED]">Take Your Power Back.</span>
          </h2>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${tText}`}>
            You’ve seen the raw data. Now get the exact, step-by-step behavioral playbook to stop self-sabotaging, set lethal boundaries, and fix your relationship dynamics <b>tonight.</b>
          </p>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: The Stack */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className={`text-2xl font-black mb-6 ${tH3}`}>What You Are Getting Today:</h3>
            
            <div className={`flex gap-5 p-5 rounded-2xl border shadow-sm ${bgPillar}`}>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#d81159]/10 text-[#d81159]"><Crosshair className="w-6 h-6" /></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg font-bold ${tH3}`}>1. The Clinical Reality Check</h4>
                  <span className="text-sm font-bold opacity-50 line-through">$97 Value</span>
                </div>
                <p className={`text-sm md:text-base font-medium ${tText}`}>We name the exact subconscious mind games and toxic behavioral loops being used against you.</p>
              </div>
            </div>

            <div className={`flex gap-5 p-5 rounded-2xl border shadow-sm relative overflow-hidden ${bgPillar}`}>
              <div className="absolute top-0 right-0 bg-[#FFB400] text-[#000000] text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg">Core Offer</div>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#FFB400]/20 text-[#D97706]"><Zap className="w-6 h-6 fill-current" /></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg font-bold ${tH3}`}>2. The Extraction Playbook</h4>
                  <span className="text-sm font-bold opacity-50 line-through">$147 Value</span>
                </div>
                <p className={`text-sm md:text-base font-medium ${tText}`}>A simple, 3-step action plan telling you exactly what to do next to shift the dynamic back in your favor.</p>
              </div>
            </div>

            <div className={`flex gap-5 p-5 rounded-2xl border shadow-sm ${bgPillar}`}>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#00A6ED]/10 text-[#00A6ED]"><FileText className="w-6 h-6" /></div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg font-bold ${tH3}`}>3. Lethal Text Scripts</h4>
                  <span className="text-sm font-bold opacity-50 line-through">$47 Value</span>
                </div>
                <p className={`text-sm md:text-base font-medium ${tText}`}>Don't know what to say? Get copy-paste text messages that are polite, firm, and impossible to argue with.</p>
              </div>
            </div>
          </div>

          {/* Right Column: The Price & Button */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className={`p-8 rounded-3xl border-2 border-[#00A6ED] bg-white dark:bg-[#000000] text-center shadow-xl relative`}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00A6ED] text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                Save 93% Today
              </div>
              
              <div className="space-y-1 mb-6 mt-2">
                <p className="text-sm font-bold text-slate-400">Therapy: <span className="line-through">$1,200+ & 6 Months</span></p>
                <p className="text-sm font-bold text-slate-400">Total Value: <span className="line-through">$291</span></p>
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
                  <><Loader2 className="w-6 h-6 animate-spin text-[#00A6ED]" /> Generating Plan...</>
                ) : (
                  <>Unlock My Protocol <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              <div className="mt-6 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">One-Time Payment. No Subscriptions.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Reversal Guarantee */}
        <div className={`p-6 border-t ${isDarkTheme ? 'bg-[#000000] border-[#ffffff]/10' : 'bg-[#f8fbff] border-[#000000]/5'}`}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 shrink-0 bg-[#FFB400]/20 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#D97706]" />
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-1 ${tH3}`}>The "Dead-On Accurate" Guarantee</h4>
              <p className={`text-sm font-medium ${tText}`}>
                Read through your custom protocol. If you don't feel like we just read your diary and gave you the exact tools to take your power back, email us within 7 days and we'll refund every penny. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
