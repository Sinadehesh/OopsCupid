"use client";

import React from "react";
import { ShieldCheck, Crosshair, FileText, Zap, Loader2, Lock } from "lucide-react";

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating: boolean;
  isDarkTheme?: boolean;
}

export default function PremiumCheckout({ onUnlock, isGenerating, isDarkTheme = false }: PremiumCheckoutProps) {
  const bgCard = isDarkTheme ? "bg-[#14213d] border-[#fca311]/30" : "bg-[#ffffff] border-[#e5e5e5]";
  const tH3 = isDarkTheme ? "text-[#ffffff]" : "text-[#000000]";
  const tText = isDarkTheme ? "text-[#e5e5e5]" : "text-[#14213d]";
  const bgPillar = isDarkTheme ? "bg-[#000000]/50 border-[#000000]" : "bg-[#e5e5e5]/30 border-[#e5e5e5]";

  return (
    <div className={`relative p-8 md:p-12 border-t-4 border-[#9d0208] ${isDarkTheme ? 'bg-[#000000]' : 'bg-[#e5e5e5]/20'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#9d0208] blur-[120px] rounded-full mix-blend-multiply"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fca311] blur-[120px] rounded-full mix-blend-multiply"></div>
      </div>

      <div className={`relative z-10 rounded-3xl border shadow-2xl overflow-hidden max-w-3xl mx-auto ${bgCard}`}>
        <div className="p-8 md:p-10 text-center border-b border-[#000000]/10 dark:border-[#ffffff]/10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#fca311]/20 text-[#fca311] font-extrabold text-sm tracking-widest uppercase mb-6">
            The Ultimate Clarity Bundle
          </span>
          <h2 className={`text-3xl md:text-5xl font-black mb-4 ${tH3}`}>
            Don't Know What To Do Next?
          </h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#9d0208] mb-6">
            Get The Tactical Playbook.
          </h3>
          <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto ${tText}`}>
            You've seen the surface-level scores. Now let us tell you exactly how to fix it without the stress. Unlock your personalized, step-by-step extraction plan right now.
          </p>
        </div>

        <div className="p-8 md:p-10 space-y-6">
          <div className={`flex gap-6 p-6 rounded-2xl border ${bgPillar}`}>
            <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#9d0208]/10 text-[#9d0208]"><Crosshair className="w-7 h-7" /></div>
            <div>
              <h4 className={`text-xl font-black mb-2 ${tH3}`}>1. The Harsh Truth</h4>
              <p className={`font-medium ${tText}`}>We name the exact mind games and behavioral loops being used against you right now.</p>
            </div>
          </div>
          <div className={`flex gap-6 p-6 rounded-2xl border relative overflow-hidden ${bgPillar}`}>
            <div className="absolute top-0 right-0 bg-[#fca311] text-[#000000] text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg">Highest Value</div>
            <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#fca311]/10 text-[#fca311]"><Zap className="w-7 h-7" /></div>
            <div>
              <h4 className={`text-xl font-black mb-2 ${tH3}`}>2. The Playbook</h4>
              <p className={`font-medium ${tText}`}>A simple, 3-step action plan on exactly what to do next to take your power back.</p>
            </div>
          </div>
          <div className={`flex gap-6 p-6 rounded-2xl border ${bgPillar}`}>
            <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#14213d]/10 text-[#14213d] dark:bg-[#e5e5e5]/10 dark:text-[#e5e5e5]"><FileText className="w-7 h-7" /></div>
            <div>
              <h4 className={`text-xl font-black mb-2 ${tH3}`}>3. Text Scripts</h4>
              <p className={`font-medium ${tText}`}>Don't know what to say? Get copy-paste texts that are polite, lethal, and impossible to argue with.</p>
            </div>
          </div>
        </div>

        <div className={`p-8 md:p-10 border-t ${isDarkTheme ? 'bg-[#000000]/50 border-[#ffffff]/10' : 'bg-[#e5e5e5]/50 border-[#000000]/10'}`}>
          <div className="flex flex-col items-center text-center mb-8">
            <span className={`text-lg font-bold line-through opacity-60 mb-1 ${tText}`}>Total Value: $197</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${tText}`}>Today:</span>
              <span className="text-5xl font-black text-[#9d0208]">$19</span>
            </div>
          </div>
          <button onClick={onUnlock} disabled={isGenerating} className="w-full py-5 bg-[#9d0208] hover:bg-[#9d0208]/90 text-[#ffffff] rounded-2xl font-extrabold text-xl md:text-2xl transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0 cursor-pointer">
            {isGenerating ? <><Loader2 className="w-7 h-7 animate-spin text-[#fca311]" /> Processing Secure Payment...</> : <><Lock className="w-6 h-6" /> Unlock Everything Now</>}
          </button>
          <div className="mt-6 flex items-center justify-center gap-2 text-[#14213d] dark:text-[#e5e5e5] opacity-80">
            <ShieldCheck className="w-5 h-5 text-[#fca311]" /><span className="text-sm font-bold">7-Day Guarantee: 100% money back if it's not accurate.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
