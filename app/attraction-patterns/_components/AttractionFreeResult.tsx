"use client";

import React, { useState } from "react";
import { Lock, Database, ShieldCheck, ArrowRight, AlertOctagon, BrainCircuit, HeartCrack, Zap, CheckCircle2, Loader2, Crosshair, ChevronRight, Fingerprint, Flame } from "lucide-react";
import Link from "next/link";

export default function AttractionFreeResult({ profile, onUnlock, isGenerating = false }: { profile: any, onUnlock: () => void, isGenerating?: boolean }) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [bumpAccepted, setBumpAccepted] = useState(true);

  const topTrait = profile?.archetype || "The Empathic Rescuer";
  
  const handleUnlockClick = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 1500);
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#020617] py-16 md:py-24 border-t border-slate-800 overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        
        {/* THE BAIT (FREE VALUE) */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Fingerprint className="w-4 h-4" /> Subconscious Magnetism Analyzed
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white drop-shadow-lg">
            Your Core Attraction <br className="hidden md:block" />Archetype is: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">
              "{topTrait}"
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-400 max-w-3xl mx-auto">
            You don't attract toxic people by accident. Your nervous system is biologically wired to view <span className="text-white font-bold border-b border-indigo-500 pb-0.5">"safe" partners as boring</span>, and <span className="text-rose-400 font-bold border-b border-rose-500 pb-0.5">"chaotic" partners as chemistry</span>.
          </p>
        </div>

        {/* THE PROBLEM INJECTION (ELEVATED) */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] p-10 md:p-14 shadow-2xl mb-20 relative overflow-hidden group border border-slate-800">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 group-hover:bg-rose-600/20 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 relative z-10">
            <div className="p-5 bg-rose-500/10 rounded-2xl border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)] shrink-0">
              <Flame className="w-10 h-10 text-rose-500 animate-pulse" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
              Your empathy is currently a <br className="hidden md:block"/> <span className="text-rose-400">hunting ground.</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 font-medium text-lg leading-relaxed relative z-10">
            <div>
              <p className="mb-6">
                Traditional dating advice tells you to <em className="text-slate-100">"just set better boundaries."</em> <strong className="text-rose-400">They are wrong.</strong> 
              </p>
              <p>
                Our clinical data reveals a highly specific <strong>Psychological Blind Spot</strong> in your PID-5 profile. You are unknowingly broadcasting a frequency that manipulators actively hunt.
              </p>
            </div>
            <div className="bg-rose-950/30 p-6 rounded-2xl border border-rose-900/50 flex items-start gap-4">
              <Lock className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
              <p className="text-sm text-rose-200/80 leading-relaxed">
                <strong className="text-rose-100 block mb-2 text-base">To them, your profile is a neon sign.</strong>
                A label alone won't protect you on your next date. You must intercept the loop before it starts by seeing the exact playbook they use against you.
              </p>
            </div>
          </div>
        </div>

        {/* THE GRAND SLAM OFFER */}
        <div className="bg-white rounded-[3rem] shadow-[0_0_60px_rgba(255,255,255,0.1)] border-4 border-indigo-600 overflow-hidden relative transform transition-all">
          <div className="bg-indigo-600 text-center py-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 animate-[pulse_4s_infinite]"></div>
             <p className="text-indigo-100 font-black text-sm uppercase tracking-[0.2em] relative z-10 flex items-center justify-center gap-2">
               <Zap className="w-4 h-4 fill-current" /> AI Profile Compilation Complete
             </p>
          </div>

          <div className="p-8 md:p-14">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">The "Loop-Intercept" Master-File</h3>
              <p className="text-xl text-slate-500 font-medium">Equip yourself with the psychological weapons to force manipulators to drop their act before Date 1.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              
              {/* Value Stack */}
              <div className="lg:col-span-3 space-y-4">
                {[
                  { icon: Database, title: "The Clinical Attraction Matrix", value: "$97", desc: "Your unedited psychological data showing exactly why you attract specific disorders." },
                  { icon: Crosshair, title: "The Dark Triad Target Report", value: "$67", desc: "Identify the specific subset of toxic men (e.g. Covert Narcissism) hunting your archetype." },
                  { icon: HeartCrack, title: "The Chemistry vs. Panic Diagnostic", value: "$47", desc: "Rewire your dopamine so you stop feeling 'bored' by healthy, secure men." },
                  { icon: Zap, title: "The 'Mask-Slipping' Texting Playbook", value: "$97", desc: "5 psychologically-engineered text scripts to force manipulators to break character instantly." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1 cursor-default">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-black text-slate-900 text-xl">{item.title}</h5>
                        <span className="text-sm font-bold text-slate-400 line-through">{item.value}</span>
                      </div>
                      <p className="text-slate-600 font-medium text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout / Order Form */}
              <div className="lg:col-span-2 sticky top-8">
                <div className="bg-slate-50 rounded-[2.5rem] border-2 border-slate-200 p-8 shadow-xl relative">
                  
                  <div className="text-center mb-8">
                    <p className="text-slate-400 font-bold mb-2 uppercase tracking-wider text-sm">Total Value: <span className="line-through">$308.00</span></p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-3xl font-black text-slate-800">Today:</span>
                      <span className="text-7xl font-black text-indigo-600 tracking-tighter">$9.99</span>
                    </div>
                  </div>

                  {/* Order Bump */}
                  <div className={`p-5 rounded-2xl border-2 transition-all duration-300 mb-8 cursor-pointer shadow-sm ${bumpAccepted ? 'bg-amber-50 border-amber-400 shadow-amber-500/20' : 'bg-white border-slate-200 hover:border-amber-300'}`} onClick={() => setBumpAccepted(!bumpAccepted)}>
                    <div className="flex gap-4 items-start">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 shrink-0 mt-0.5 transition-colors ${bumpAccepted ? 'bg-amber-500 border-amber-500 text-white' : 'bg-slate-50 border-slate-300'}`}>
                        {bumpAccepted && <CheckCircle2 className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-base font-black text-slate-900 mb-1 leading-tight">
                          <span className="text-amber-600 animate-pulse inline-block">Yes!</span> Add the 'Dealbreaker Cheat Sheet' (+$7)
                        </p>
                        <p className="text-sm font-medium text-slate-600 leading-snug">
                          A PDF checklist of the 7 micro-behaviors covert narcissists use on date 1. Over 38% of users add this.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleUnlockClick} 
                    disabled={isUnlocking} 
                    className="w-full min-h-[72px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-2xl transition-all duration-300 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-80 disabled:hover:translate-y-0"
                  >
                    {isUnlocking ? <><Loader2 className="w-6 h-6 animate-spin" /> Unlocking...</> : <>Reveal My File <ArrowRight className="w-7 h-7" /></>}
                  </button>

                  <div className="mt-8 flex items-start gap-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                    <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                      <span className="text-emerald-800 font-black">100% "Clarity" Guarantee.</span> If this doesn't perfectly describe your exes and blow your mind, email us for a full refund. No questions asked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Downsell / Ecosystem Continuity */}
        <div className="mt-16 text-center">
          <Link href="/is-he-manipulative" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors group px-6 py-3 rounded-full hover:bg-white/5">
            Not ready? Test your current partner first <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
