"use client";

import React, { useState } from "react";
import { Brain, AlertTriangle, FileText, Zap, CheckCircle2, ArrowRight, Loader2, ShieldCheck, HeartCrack, Layers, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SabotageFreeResult({ profile }: { profile: any }) {
  const router = useRouter();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [bumpAccepted, setBumpAccepted] = useState(true);

  const topTrait = profile?.archetype || "The Hyper-Vigilant Tester";
  
  const handleCheckoutClick = () => {
    setIsUnlocking(true);
    setTimeout(() => {
       // Passes demo ID. In prod, pass the newly created DB row ID.
       router.push("/why-do-i-sabotage-relationships/premium?id=demo");
    }, 1500);
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden font-sans bg-slate-900 selection:bg-rose-500/30">
      
      {/* PART 1: THE REVEAL & THE PAIN (DARK) */}
      <div className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 md:px-8 max-w-5xl mx-auto z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 text-rose-300 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.15em] mb-6 border border-rose-500/20 backdrop-blur-md">
            <Brain className="w-3.5 h-3.5" /> Your Mind Has Been Mapped
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-white drop-shadow-lg">
            Your primary defense archetype is: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.2)]">
              "{topTrait}"
            </span>
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-300 max-w-2xl mx-auto px-2">
            You don't push people away because you don't care. You push them away because your nervous system is convinced that <span className="text-white font-bold">closeness is a threat.</span>
          </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 relative z-10">
            <div className="p-3.5 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-inner shrink-0">
              <AlertTriangle className="w-8 h-8 text-orange-400 animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white">
              Normal advice tells you to "stop overthinking." <span className="text-orange-400">But you can't.</span>
            </h3>
          </div>
          
          <div className="space-y-4 text-slate-300 font-medium text-base md:text-lg leading-relaxed relative z-10">
            <p>
              Our 50-point clinical audit shows your brain is running a hidden survival script. When someone finally gets close, your <strong className="text-rose-400">"rejection alarm"</strong> triggers. 
            </p>
            <p>
              You subconsciously engineer a reason to pull away, pick a fight, or go cold—protecting yourself from a betrayal that hasn't even happened yet. Your sabotage loop is predictable, which means it can be rewired.
            </p>
          </div>
        </div>
      </div>

      {/* PART 2: THE SOLUTION & OFFER (LIGHT) */}
      <div className="bg-slate-50 w-full rounded-t-[2.5rem] md:rounded-t-[4rem] px-4 md:px-8 pt-12 md:pt-20 pb-24 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Unlock Your <span className="text-rose-600">"Secure Love"</span> Master-File
            </h3>
            <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto px-4">
              Stop letting hidden triggers ruin good relationships. Get the exact psychological blueprint to disarm your defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-3 md:space-y-4 order-2 lg:order-1">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">What you get right now:</h4>
              
              {[
                { icon: HeartCrack, title: "The Core Wound Diagnosis", value: "$97", desc: "See exactly why your brain perceives closeness as danger based on your anxious/avoidant split." },
                { icon: Layers, title: "The Sabotage Loop Map", value: "$67", desc: "The step-by-step cycle you unconsciously follow to burn relationships down." },
                { icon: Brain, title: "The Trigger Translation Guide", value: "$47", desc: "Learn how to tell the difference between a real red flag and your nervous system panicking." },
                { icon: Zap, title: "The 'Safe Word' Scripts", value: "$97", desc: "Exact text messages to send when you feel the urge to run away, ghost, or start a fight." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 md:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300">
                  <div className="shrink-0 w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-black text-slate-900 text-base md:text-lg leading-tight pr-2">{item.title}</h5>
                      <span className="text-xs font-bold text-slate-400 line-through shrink-0 mt-0.5">{item.value}</span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-8">
              <div className="bg-white rounded-[2rem] border-2 border-rose-600 p-6 md:p-8 shadow-2xl shadow-rose-600/10 relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-black text-[10px] md:text-xs uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                  <Sparkles className="w-3 h-3 inline pb-0.5 mr-1" /> 97% Off For Action Takers
                </div>
                
                <div className="text-center mb-6 mt-2">
                  <p className="text-slate-400 font-bold mb-1 text-sm">Total Value: <span className="line-through">$308.00</span></p>
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="text-2xl font-black text-slate-800">Today:</span>
                    <span className="text-6xl font-black text-rose-600 tracking-tighter">$9.99</span>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setBumpAccepted(!bumpAccepted)}
                  className={`w-full text-left flex gap-3.5 items-start p-4 rounded-xl border-2 transition-all duration-200 mb-6 focus:outline-none ${
                    bumpAccepted ? 'bg-amber-50 border-amber-400 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 shrink-0 mt-0.5 transition-colors ${
                    bumpAccepted ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-300'
                  }`}>
                    {bumpAccepted && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 mb-0.5">
                      <span className="text-amber-600">Wait!</span> Add the 'Panic Moment' Cheat Sheet (+$7)
                    </p>
                    <p className="text-xs font-medium text-slate-600 leading-snug">
                      Get a 1-page digital emergency guide. 3 nervous-system resets to stop you from sending that destructive text.
                    </p>
                  </div>
                </button>

                <button 
                  onClick={handleCheckoutClick} 
                  disabled={isUnlocking} 
                  className="w-full h-16 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl font-black text-xl transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
                >
                  {isUnlocking ? (
                    <><Loader2 className="w-6 h-6 animate-spin" /> Preparing File...</>
                  ) : (
                    <>Unlock My Master-File <ArrowRight className="w-6 h-6" /></>
                  )}
                </button>

                <div className="mt-6 flex items-start gap-3 bg-emerald-50 p-3.5 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                  <p className="text-xs font-bold text-slate-600 leading-snug">
                    <span className="text-emerald-800 font-black">100% "Seen and Understood" Guarantee.</span> If it doesn't describe your relationship cycle with terrifying accuracy, we will refund every penny.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
