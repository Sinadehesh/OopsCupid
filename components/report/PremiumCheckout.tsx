"use client";

import React from "react";
import { ShieldCheck, Loader2, CheckCircle2, Star, Zap, Lock, BookOpen, ArrowRight } from "lucide-react";

interface PremiumCheckoutProps {
  onUnlock: () => void;
  isGenerating: boolean;
  archetype: string;
  relationshipStatus: string;
}

export default function PremiumCheckout({ onUnlock, isGenerating, archetype, relationshipStatus }: PremiumCheckoutProps) {
  return (
    <div className={`relative w-full max-w-4xl mx-auto mt-8`}>
      
      {/* Hook Section */}
      <div className="text-center mb-12">
        <p className="text-sm font-bold tracking-widest uppercase mb-3 text-[#086788]/60">The 10-Minute Love Pattern Breakdown</p>
        <p className="text-xl font-bold text-[#06aed5] mb-6">See your pattern. Know the damage. Fix it faster.</p>
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-[#086788] leading-tight`}>
          Why Love Feels Hard<br/>— And What To Do Next
        </h2>
        <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto text-[#086788]/80`}>
          Unlock your full Love Pattern Breakdown and see the hidden pattern behind your attachment style, your biggest relationship risks, and your personal action plan.
        </p>
      </div>

      {/* Blurred Preview Image Simulation */}
      <div className="relative w-full h-48 md:h-64 bg-white border border-[#d6d2d2] rounded-2xl mb-12 overflow-hidden shadow-sm flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d6d2d2 25%, transparent 25%, transparent 75%, #d6d2d2 75%, #d6d2d2), repeating-linear-gradient(45deg, #d6d2d2 25%, #fff 25%, #fff 75%, #d6d2d2 75%, #d6d2d2)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
         <div className="bg-white/90 backdrop-blur-sm py-4 px-8 rounded-xl border border-[#d6d2d2] shadow-sm z-10 flex items-center gap-3">
           <Lock className="w-5 h-5 text-[#086788]" />
           <span className="font-bold text-[#086788] text-lg tracking-wide uppercase">Secure Clinical Report</span>
         </div>
      </div>

      {/* What Makes This Different */}
      <div className="bg-white border border-[#d6d2d2] rounded-2xl p-8 md:p-12 mb-8 shadow-sm">
        <h3 className="text-2xl md:text-3xl font-black mb-6 text-[#086788]">This is not a cute internet quiz.</h3>
        <p className="text-lg md:text-xl font-medium text-[#086788]/80 leading-relaxed space-y-4">
          <span className="block mb-4">This is a deep personal breakdown built from 92 questions across attachment, self-esteem, emotion, and love style.</span>
          <span className="block">It shows how your nervous system reacts to closeness, stress, rejection, and connection, then turns that into a clear explanation you can actually use.</span>
        </p>
      </div>

      {/* Value Stack */}
      <div className="bg-white border border-[#d6d2d2] rounded-2xl p-8 md:p-12 mb-8 shadow-sm">
        <h3 className="text-2xl md:text-3xl font-black mb-8 text-[#086788]">Inside your unlock today:</h3>
        <ul className="space-y-5 text-lg md:text-xl font-medium text-[#086788]/90 mb-10">
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> Full attachment map across your life areas.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> Your primary love archetype explained in plain English.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> “The Truth About You” deep summary.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> “The Origin Print” to show where the pattern began.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> “The Normalcy Curve” so you can see where you stand.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> “The Romantic Threat” so you know what hurts your relationships.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> “The Workplace Threat” so you see how the pattern spills into daily life.</li>
          <li className="flex items-start gap-4"><CheckCircle2 className="w-6 h-6 text-[#06aed5] shrink-0 mt-1" /> “The Master Action Plan” for what to do next.</li>
        </ul>
        <div className="bg-[#fff1d0]/50 border-l-4 border-[#f0c808] p-6 rounded-r-xl">
          <p className="text-xl font-black text-[#086788]">You are not buying information.<br/>You are buying clarity, relief, and a plan.</p>
        </div>
      </div>

      {/* Bonuses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-[#d6d2d2] rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-[#fff1d0] rounded flex items-center justify-center mb-4"><Zap className="w-5 h-5 text-[#f0c808]" /></div>
          <h4 className="text-lg font-black text-[#086788] mb-2">Bonus 1: Fast-read version</h4>
          <p className="text-base font-medium text-[#086788]/80">Get the most important insights in 60 seconds.</p>
        </div>
        <div className="bg-white border border-[#d6d2d2] rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-[#fff1d0] rounded flex items-center justify-center mb-4"><BookOpen className="w-5 h-5 text-[#06aed5]" /></div>
          <h4 className="text-lg font-black text-[#086788] mb-2">Bonus 2: Save your result</h4>
          <p className="text-base font-medium text-[#086788]/80">Come back later and read it anytime.</p>
        </div>
        <div className="bg-white border border-[#d6d2d2] rounded-2xl p-6 shadow-sm">
          <div className="w-10 h-10 bg-[#fff1d0] rounded flex items-center justify-center mb-4"><Star className="w-5 h-5 text-[#086788]" /></div>
          <h4 className="text-lg font-black text-[#086788] mb-2">Bonus 3: Founding price</h4>
          <p className="text-base font-medium text-[#086788]/80">Get the full report now at the early price before it goes up.</p>
        </div>
      </div>

      {/* Final Paywall Block */}
      <div className="bg-white border-2 border-[#086788] rounded-3xl p-8 md:p-12 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#f0c808]"></div>
        
        <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#086788]">Unlock Your Full Love Pattern Breakdown</h3>
        <p className="text-xl font-medium text-[#086788]/80 mb-8 max-w-2xl mx-auto">
          You already know your attachment style. Now unlock the part that actually helps.<br/><br/>
          In the next 10 minutes, you will see why you act this way in love, where this pattern came from, how it affects your relationships, what damage it creates if you do nothing, and what to do next to change it.
        </p>

        <div className="mb-8">
          <p className="text-lg font-bold text-[#086788]/50 uppercase tracking-widest mb-2">Today Only</p>
          <p className="text-6xl md:text-7xl font-black text-[#086788]">€12.99</p>
        </div>

        <button 
          onClick={onUnlock} 
          disabled={isGenerating} 
          className="w-full max-w-md mx-auto min-h-[72px] bg-[#f0c808] text-[#086788] rounded-xl font-black text-2xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0 cursor-pointer group"
        >
          {isGenerating ? (
            <><Loader2 className="w-7 h-7 animate-spin text-[#086788]" /> Generating...</>
          ) : (
            <>Show Me My Full Report <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </div>

      {/* Guarantee */}
      <div className={`p-6 mt-6`}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 shrink-0 bg-white border border-[#d6d2d2] rounded-full flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6 text-[#086788]" />
          </div>
          <div>
            <h4 className={`text-lg font-black mb-1 text-[#086788]`}>7-Day Guarantee</h4>
            <p className={`text-sm md:text-base font-medium text-[#086788]/80`}>
              Read the full report. If it does not feel accurate, useful, or eye-opening, email us within 7 days and we will refund you.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
