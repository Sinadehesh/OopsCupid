"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, BrainCircuit, Activity, HeartHandshake, EyeOff, Zap, ChevronRight, CheckCircle2, Lock, Flame, Sparkles, PhoneCall, ArrowRight, ShieldCheck, Crown } from "lucide-react";
import Link from "next/link";

export default function AttractionMasterReport({ profile, email }: { profile: any, email?: string }) {
  const [activeToxicTab, setActiveToxicTab] = useState(0);
  const [bundleSelected, setBundleSelected] = useState({ playbook1: true, playbook2: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const topTrait = profile?.primaryPattern || "The Empathic Rescuer";

  // Dynamic Data Simulation based on their profile
  const blueprintData = [
    { label: "Tolerance For Chaos", score: 85, color: "bg-rose-500" },
    { label: "Savior Complex", score: 92, color: "bg-amber-500" },
    { label: "Boundary Permeability", score: 78, color: "bg-teal-500" },
    { label: "Dopamine Baseline", score: 65, color: "bg-indigo-500" }
  ];

  const toxicRoster = [
    {
      name: "The Covert Narcissist",
      dangerLevel: 95,
      charm: "Seems deeply misunderstood, sensitive, and emotionally deep.",
      reality: "Uses pity to manipulate you into prioritizing his needs while ignoring yours.",
      needProvided: "A sense of deep, profound purpose and 'saving' someone.",
      healthyAlternative: "Finding a partner who is passionate about a shared cause, allowing you to build purpose *together*, not by fixing him."
    },
    {
      name: "The Love Bomber",
      dangerLevel: 88,
      charm: "Plans future trips on date two, intense eye contact, overwhelming affection.",
      reality: "Creating a false sense of security so you ignore his erratic behavior later.",
      needProvided: "Massive spikes of adrenaline and intense validation.",
      healthyAlternative: "Generating excitement through novel experiences (travel, new hobbies) with a partner whose affection is consistent, not explosive."
    },
    {
      name: "The Emotionally Unavailable",
      dangerLevel: 75,
      charm: "Mysterious, independent, incredibly charming when he wants to be.",
      reality: "Breadcrumbs you to keep you hooked without ever committing.",
      needProvided: "The 'thrill of the chase' and avoiding true, terrifying vulnerability.",
      healthyAlternative: "Dating a secure man and learning to tolerate the 'calm' of true intimacy without mistaking it for boredom."
    }
  ];

  const bundlePrice = (bundleSelected.playbook1 && bundleSelected.playbook2) ? 15.99 : (bundleSelected.playbook1 || bundleSelected.playbook2) ? 10.99 : 0;

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#fafaf9] font-sans selection:bg-teal-200">
      
      {/* ========================================= */}
      {/* 1. HERO & VALIDATION (Warm, Expensive)    */}
      {/* ========================================= */}
      <div className="bg-slate-900 text-stone-50 py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-300 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-teal-500/20">
            <CheckCircle2 className="w-4 h-4" /> Comprehensive Audit Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Your Subconscious Mapped: <br className="hidden md:block" />
            <span className="text-teal-400">"{topTrait}"</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
            Welcome to clarity. The data below is going to expose exactly why your nervous system rejects safe men, and why it actively hunts for danger disguised as chemistry.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-24">

        {/* ========================================= */}
        {/* 2. THE PSYCHOLOGICAL BLUEPRINT (Graphs)   */}
        {/* ========================================= */}
        <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-100 rounded-xl"><BrainCircuit className="w-6 h-6 text-slate-700" /></div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Clinical Blueprint</h2>
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
            <p className="text-slate-500 font-medium mb-10 text-lg">Your answers revealed high spikes in specific behavioral traits. These spikes are what toxic men look for.</p>
            
            <div className="space-y-8">
              {blueprintData.map((data, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">{data.label}</span>
                    <span className="font-black text-slate-400">{mounted ? data.score : 0}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${data.color} transition-all duration-1000 ease-out`}
                      style={{ width: mounted ? `${data.score}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. THE BLIND SPOT (High Contrast Insight) */}
        {/* ========================================= */}
        <section>
          <div className="bg-teal-900 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -bottom-24 -right-24 text-teal-800 opacity-50 rotate-12 pointer-events-none">
              <EyeOff className="w-96 h-96" />
            </div>
            
            <div className="relative z-10 text-stone-50">
              <h3 className="text-xs font-black text-teal-300 uppercase tracking-[0.2em] mb-4">Critical Vulnerability</h3>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">You don't see red flags.<br/>You see <span className="text-rose-400 underline decoration-rose-500/50 underline-offset-8">projects.</span></h2>
              
              <div className="grid md:grid-cols-2 gap-10 mt-10 text-teal-50 text-lg font-medium leading-relaxed">
                <p>
                  Your highest score is your empathy. In the real world, empathy is a gift. In the dating market, it is a vulnerability. You are neurologically wired to feel "sparks" when you sense someone is slightly broken.
                </p>
                <div className="bg-teal-950/50 p-6 rounded-2xl border border-teal-800/50">
                  <p className="text-teal-200 text-sm">
                    <strong className="text-stone-50 text-base block mb-2">The Danger:</strong>
                    When a healthy man shows up, he has no trauma for you to fix. Your brain interprets this lack of work as "boring" or "no chemistry." You end up friend-zoning the good guys and obsessing over the chaotic ones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. THE TOXIC ROSTER (Interactive)         */}
        {/* ========================================= */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Your Toxic Match Roster</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Based on your blueprint, these are the 3 specific profiles hunting you on dating apps right now. Select a profile to view their tactics.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {toxicRoster.map((toxic, i) => (
              <button 
                key={i}
                onClick={() => setActiveToxicTab(i)}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeToxicTab === i ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
              >
                {toxic.name}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden transition-all duration-500">
            <div className="p-8 md:p-12">
              
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                <div>
                  <h3 className="text-3xl font-black text-slate-900">{toxicRoster[activeToxicTab].name}</h3>
                </div>
                
                {/* Run Away Meter */}
                <div className="bg-slate-50 p-4 rounded-2xl w-full md:w-64 shrink-0 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Run Away Meter</span>
                    <span className="text-sm font-black text-rose-600">{toxicRoster[activeToxicTab].dangerLevel}/100</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden flex">
                    <div className="h-full bg-rose-500 rounded-full transition-all duration-700 ease-in-out" style={{ width: `${toxicRoster[activeToxicTab].dangerLevel}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex items-center gap-2 mb-3 text-amber-800 font-black text-sm uppercase tracking-widest"><Sparkles className="w-4 h-4" /> Why you fall for it</div>
                  <p className="text-amber-900/80 font-medium leading-relaxed">{toxicRoster[activeToxicTab].charm}</p>
                </div>
                <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                  <div className="flex items-center gap-2 mb-3 text-rose-800 font-black text-sm uppercase tracking-widest"><ShieldAlert className="w-4 h-4" /> The Brutal Reality</div>
                  <p className="text-rose-900/80 font-medium leading-relaxed">{toxicRoster[activeToxicTab].reality}</p>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-[50px]"></div>
                <h4 className="text-teal-400 font-bold text-sm mb-4 uppercase tracking-widest">Psychological Translation</h4>
                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="text-slate-400 block text-sm mb-1">What need are they actually fulfilling for you?</span>
                    <p className="font-medium text-lg">{toxicRoster[activeToxicTab].needProvided}</p>
                  </div>
                  <div className="pt-6 border-t border-slate-700/50">
                    <span className="text-teal-300 block font-bold text-sm mb-2 flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> How to meet this need in a healthy way:</span>
                    <p className="font-medium text-lg leading-relaxed text-slate-200">{toxicRoster[activeToxicTab].healthyAlternative}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 5. THE STATUS UPSELL (Grand Slam Bundle)  */}
        {/* ========================================= */}
        <section id="playbooks" className="pt-10 border-t-2 border-dashed border-slate-200">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <Crown className="w-4 h-4" /> The Ecosystem Reset
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Become The Group Chat Envy.</h2>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Imagine showing up to brunch and your friends are literally begging to know how you found a guy who plans dates, communicates like an adult, and still gives you butterflies. You go from the "friend who needs rescuing" to the "friend who sets the standard."
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200 relative">
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Product 1 */}
              <label className={`cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300 ${bundleSelected.playbook1 ? 'bg-teal-50 border-teal-500 shadow-md shadow-teal-500/10' : 'bg-white border-slate-200 hover:border-teal-300'}`}>
                <input type="checkbox" className="sr-only" checked={bundleSelected.playbook1} onChange={(e) => setBundleSelected({...bundleSelected, playbook1: e.target.checked})} />
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${bundleSelected.playbook1 ? 'bg-teal-500 border-teal-500 text-white' : 'bg-slate-100 border-slate-300'}`}>
                    {bundleSelected.playbook1 && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="font-black text-slate-900">$10.99</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">The "Mask-Slipping" Scripts</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">Copy-paste text messages designed by psychologists to force manipulators to break character before date 1. Save months of wasted time.</p>
              </label>

              {/* Product 2 */}
              <label className={`cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300 ${bundleSelected.playbook2 ? 'bg-teal-50 border-teal-500 shadow-md shadow-teal-500/10' : 'bg-white border-slate-200 hover:border-teal-300'}`}>
                <input type="checkbox" className="sr-only" checked={bundleSelected.playbook2} onChange={(e) => setBundleSelected({...bundleSelected, playbook2: e.target.checked})} />
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${bundleSelected.playbook2 ? 'bg-teal-500 border-teal-500 text-white' : 'bg-slate-100 border-slate-300'}`}>
                    {bundleSelected.playbook2 && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="font-black text-slate-900">$10.99</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">The Secure Man Field Guide</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">How to spot a genuinely healthy guy and rewire your brain so you stop feeling "bored" by stability. The ultimate healthy attraction playbook.</p>
              </label>
            </div>

            <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
              <div>
                <h4 className="text-2xl font-black mb-2 flex items-center gap-3">
                  Bundle & Save 
                  {bundleSelected.playbook1 && bundleSelected.playbook2 && <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider">Deal Applied</span>}
                </h4>
                <p className="text-slate-400 font-medium">Get both playbooks and completely reset your dating ecosystem.</p>
              </div>
              
              <div className="text-center md:text-right shrink-0 w-full md:w-auto">
                <div className="text-4xl font-black text-teal-400 mb-4">${bundlePrice.toFixed(2)}</div>
                <button 
                  disabled={bundlePrice === 0}
                  className="w-full md:w-auto px-8 h-14 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-900 rounded-xl font-black text-lg transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download Ecosystem Reset <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-slate-400">
              <ShieldCheck className="w-4 h-4" /> 30-Day Money Back Guarantee. Instant Access.
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 6. HIGH-TICKET UPSELL (Emergency Call)    */}
        {/* ========================================= */}
        <section className="pb-10">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Flame className="w-4 h-4" /> Need Immediate Help?
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">The Emergency Intercept Session</h3>
              <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-xl">
                Talking to a guy right now and your gut is screaming? Don't make a mistake that costs you months of peace. Book a private 30-minute tactical review with a relationship specialist. We will read his texts and tell you exactly what he is doing.
              </p>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center shrink-0 w-full md:w-auto">
              <div className="text-5xl font-black text-white mb-6">€50</div>
              <a href="#" className="w-full inline-flex h-14 items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 px-8 rounded-xl font-black text-lg transition-all active:scale-95 shadow-xl">
                <PhoneCall className="w-5 h-5" /> Book Tactical Call
              </a>
              <p className="text-slate-400 text-xs mt-4 font-medium">Limited availability. Confidential 1-on-1.</p>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 7. ECOSYSTEM LOOP                         */}
        {/* ========================================= */}
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-sm font-bold text-slate-400 mb-4">Want to analyze the specific guy you're dating right now?</p>
          <Link href="/is-he-manipulative" className="inline-flex items-center justify-center gap-2 text-slate-600 font-bold bg-white border border-slate-200 shadow-sm px-8 py-4 rounded-full hover:bg-slate-50 hover:text-teal-600 transition-all active:scale-95 text-base hover:shadow-md">
            Take the "Is He Manipulative" Diagnostic <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
