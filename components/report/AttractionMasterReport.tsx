"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, BrainCircuit, Activity, HeartHandshake, EyeOff, Zap, ChevronRight, CheckCircle2, Lock, Flame, Sparkles, PhoneCall, ArrowRight, Crown, Radar } from "lucide-react";
import Link from "next/link";

export default function AttractionMasterReport({ profile, email }: { profile: any, email?: string }) {
  const [activeToxicTab, setActiveToxicTab] = useState(0);
  const [bundleSelected, setBundleSelected] = useState({ playbook1: true, playbook2: true });
  const [mounted, setMounted] = useState(false);
  const [blindSpotRevealed, setBlindSpotRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic Data Handling
  const topTrait = profile?.primaryPattern || profile?.archetype || "The Empathic Rescuer";
  const userDescription = profile?.description || "Your nervous system rejects safe men, actively hunting for danger disguised as chemistry.";

  // Dynamic Blueprint or highly realistic fallback
  const blueprintData = profile?.traits ? [
    { label: "Tolerance For Chaos", score: profile.traits.chaos || 85, color: "bg-[#c1121f]" },
    { label: "Savior Complex", score: profile.traits.savior || 92, color: "bg-[#e63946]" },
    { label: "Boundary Permeability", score: profile.traits.boundaries || 78, color: "bg-[#457b9d]" },
    { label: "Dopamine Baseline", score: profile.traits.dopamine || 65, color: "bg-[#1d3557]" }
  ] : [
    { label: "Tolerance For Chaos", score: 88, color: "bg-[#c1121f]" },
    { label: "Savior Complex", score: 94, color: "bg-[#e63946]" },
    { label: "Boundary Permeability", score: 81, color: "bg-[#457b9d]" },
    { label: "Dopamine Baseline", score: 62, color: "bg-[#1d3557]" }
  ];

  const toxicRoster = [
    {
      name: "The Covert Narcissist",
      dangerLevel: 95,
      charm: "Seems deeply misunderstood, sensitive, and emotionally profound.",
      reality: "Uses pity to manipulate you into prioritizing his needs while ignoring yours.",
      needProvided: "A profound sense of purpose through 'saving' someone.",
      healthyAlternative: "Finding a partner to build purpose *together*, not by fixing him."
    },
    {
      name: "The Love Bomber",
      dangerLevel: 88,
      charm: "Plans future trips on date two, intense eye contact, overwhelming affection.",
      reality: "Creates a false sense of security so you ignore erratic behavior later.",
      needProvided: "Massive spikes of adrenaline and intense validation.",
      healthyAlternative: "Generating excitement through novel experiences with a consistent partner."
    },
    {
      name: "The Emotionally Unavailable",
      dangerLevel: 75,
      charm: "Mysterious, independent, incredibly charming when he wants to be.",
      reality: "Breadcrumbs you to keep you hooked without ever fully committing.",
      needProvided: "The 'thrill of the chase' to avoid true, terrifying vulnerability.",
      healthyAlternative: "Learning to tolerate the 'calm' of true intimacy without mistaking it for boredom."
    }
  ];

  const bundlePrice = (bundleSelected.playbook1 && bundleSelected.playbook2) ? 15.99 : (bundleSelected.playbook1 || bundleSelected.playbook2) ? 10.99 : 0;

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#f8f9fa] font-sans selection:bg-[#a8dadc] selection:text-[#1d3557]">
      
      {/* ========================================= */}
      {/* 1. HERO (Dark Blue #1d3557 & Light Cyan #a8dadc) */}
      {/* ========================================= */}
      <div className="bg-[#1d3557] text-[#a8dadc] py-20 px-6 relative overflow-hidden border-b-[6px] border-[#e63946]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#457b9d]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#a8dadc]/10 text-[#a8dadc] rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-[#a8dadc]/30 shadow-[0_0_15px_rgba(168,218,220,0.2)]">
            <CheckCircle2 className="w-4 h-4" /> AI Profile Analysis Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1] text-white">
            Your Subconscious Mapped: <br className="hidden md:block" />
            <span className="text-[#a8dadc] drop-shadow-md">"{topTrait}"</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl font-medium leading-relaxed">
            {userDescription}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-24">

        {/* ========================================= */}
        {/* 2. THE PSYCHOLOGICAL BLUEPRINT (Interactive Graphs) */}
        {/* ========================================= */}
        <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BrainCircuit className="w-8 h-8 text-[#1d3557]" />
                <h2 className="text-3xl md:text-4xl font-black text-[#1d3557] tracking-tight">The Clinical Blueprint</h2>
              </div>
              <p className="text-[#457b9d] font-bold text-lg max-w-2xl">Your answers revealed high spikes in these specific behavioral traits. These spikes are what manipulators actively hunt for.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_15px_40px_rgba(29,53,87,0.08)] border border-[#a8dadc]/50">
            <div className="space-y-8">
              {blueprintData.map((data, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-2 px-1">
                    <span className="font-black text-[#1d3557] text-sm md:text-base uppercase tracking-widest">{data.label}</span>
                    <span className={`font-black text-xl ${data.score > 80 ? 'text-[#c1121f]' : 'text-[#457b9d]'}`}>
                      {mounted ? data.score : 0}%
                    </span>
                  </div>
                  <div className="w-full h-6 bg-[#f1f5f9] rounded-full overflow-hidden border border-gray-200 shadow-inner">
                    <div 
                      className={`h-full rounded-full ${data.color} transition-all duration-[1500ms] ease-out relative overflow-hidden`}
                      style={{ width: mounted ? `${data.score}%` : '0%' }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 3. THE BLIND SPOT (Interactive Reveal - Mid Blue #457b9d) */}
        {/* ========================================= */}
        <section>
          <div className={`rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl transition-colors duration-700 ${blindSpotRevealed ? 'bg-[#1d3557]' : 'bg-[#457b9d]'}`}>
            
            {/* Unrevealed State */}
            {!blindSpotRevealed && (
              <div className="text-center relative z-10 py-10">
                <div className="w-24 h-24 mx-auto bg-[#1d3557]/20 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping"></div>
                  <Radar className="w-12 h-12 text-white animate-spin-slow" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">A Critical Vulnerability Detected</h2>
                <p className="text-[#a8dadc] text-lg mb-8 max-w-xl mx-auto font-medium">Our system has identified a psychological blind spot in your profile that toxic men use to exploit you.</p>
                <button 
                  onClick={() => setBlindSpotRevealed(true)}
                  className="bg-[#1d3557] hover:bg-[#0f1d30] text-white px-8 py-4 rounded-xl font-black text-lg transition-transform active:scale-95 shadow-xl"
                >
                  Scan My Blind Spots Now
                </button>
              </div>
            )}

            {/* Revealed State */}
            {blindSpotRevealed && (
              <div className="relative z-10 animate-in fade-in zoom-in duration-500 text-[#a8dadc]">
                <div className="absolute -bottom-10 -right-10 text-[#a8dadc]/10 pointer-events-none">
                  <EyeOff className="w-64 h-64" />
                </div>
                <h3 className="text-sm font-black text-[#e63946] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Vulnerability Exposed
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-white">
                  You don't see red flags.<br/>You see <span className="text-[#e63946] underline decoration-[#e63946]/50 underline-offset-8">projects.</span>
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-white/90 text-lg font-medium leading-relaxed">
                  <p>
                    Your highest score is your empathy. In the real world, empathy is a gift. In the dating market, it is a vulnerability. You are neurologically wired to feel "sparks" when you sense someone is slightly broken.
                  </p>
                  <div className="bg-[#457b9d]/30 backdrop-blur-sm p-6 rounded-2xl border border-[#a8dadc]/20">
                    <p className="text-[#a8dadc] text-base">
                      <strong className="text-white text-lg block mb-2 border-b border-[#a8dadc]/20 pb-2">The Danger:</strong>
                      When a healthy man shows up, he has no trauma for you to fix. Your brain interprets this lack of work as "boring." You end up friend-zoning the good guys and obsessing over the chaotic ones.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================= */}
        {/* 4. THE TOXIC ROSTER (Reds & Dark Blues) */}
        {/* ========================================= */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#1d3557] tracking-tight mb-4">Your Toxic Match Roster</h2>
            <p className="text-lg text-[#457b9d] font-bold max-w-2xl mx-auto">Based on your blueprint, these are the 3 specific profiles hunting you on apps right now. Select a profile to view their tactics.</p>
          </div>

          {/* Interactive Tabs */}
          <div className="bg-[#a8dadc]/20 p-2 rounded-2xl flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto border border-[#a8dadc]/40">
            {toxicRoster.map((toxic, i) => (
              <button 
                key={i}
                onClick={() => setActiveToxicTab(i)}
                className={`px-6 py-3 rounded-xl font-black text-sm md:text-base transition-all duration-300 flex-1 min-w-[150px] ${
                  activeToxicTab === i 
                  ? 'bg-[#1d3557] text-[#a8dadc] shadow-lg shadow-[#1d3557]/30 scale-105' 
                  : 'bg-white text-[#1d3557] hover:bg-white/80'
                }`}
              >
                {toxic.name}
              </button>
            ))}
          </div>

          {/* Active Content Card */}
          <div className="bg-white rounded-[2rem] border-2 border-[#1d3557]/10 shadow-[0_20px_50px_rgba(29,53,87,0.1)] overflow-hidden transition-all duration-500">
            <div className="p-8 md:p-12">
              
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-10 pb-8 border-b-2 border-dashed border-gray-200">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-[#1d3557]">{toxicRoster[activeToxicTab].name}</h3>
                </div>
                
                {/* Run Away Meter (#c1121f to #780000) */}
                <div className="bg-[#f8f9fa] p-5 rounded-2xl w-full lg:w-72 shrink-0 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-[#1d3557] uppercase tracking-wider">Run Away Meter</span>
                    <span className="text-lg font-black text-[#780000]">{toxicRoster[activeToxicTab].dangerLevel}/100</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#e63946] via-[#c1121f] to-[#780000]" 
                      style={{ width: `${toxicRoster[activeToxicTab].dangerLevel}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#a8dadc]/10 rounded-2xl p-6 border-l-4 border-[#457b9d]">
                  <div className="flex items-center gap-2 mb-3 text-[#457b9d] font-black text-sm uppercase tracking-widest"><Sparkles className="w-5 h-5" /> The Illusion</div>
                  <p className="text-[#1d3557] font-bold text-lg leading-relaxed">{toxicRoster[activeToxicTab].charm}</p>
                </div>
                <div className="bg-[#e63946]/10 rounded-2xl p-6 border-l-4 border-[#c1121f]">
                  <div className="flex items-center gap-2 mb-3 text-[#c1121f] font-black text-sm uppercase tracking-widest"><ShieldAlert className="w-5 h-5" /> The Brutal Reality</div>
                  <p className="text-[#780000] font-bold text-lg leading-relaxed">{toxicRoster[activeToxicTab].reality}</p>
                </div>
              </div>

              <div className="bg-[#1d3557] text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#457b9d]/30 rounded-full blur-[60px]"></div>
                <h4 className="text-[#a8dadc] font-black text-sm mb-6 uppercase tracking-widest flex items-center gap-2"><Activity className="w-5 h-5"/> Psychological Translation</h4>
                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="text-white/60 font-bold block text-sm mb-2">What toxic need are they fulfilling for you?</span>
                    <p className="font-bold text-xl">{toxicRoster[activeToxicTab].needProvided}</p>
                  </div>
                  <div className="pt-6 border-t border-[#457b9d]/50">
                    <span className="text-[#e63946] block font-black text-sm mb-3 flex items-center gap-2"><HeartHandshake className="w-5 h-5" /> How to meet this need in a healthy way:</span>
                    <p className="font-bold text-xl leading-relaxed text-[#a8dadc]">{toxicRoster[activeToxicTab].healthyAlternative}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* 5. THE STATUS UPSELL (Ecosystem Reset) */}
        {/* ========================================= */}
        <section id="playbooks" className="pt-16 mt-16 border-t-[3px] border-[#a8dadc]/50">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#457b9d]/10 text-[#457b9d] rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-[#457b9d]/20">
              <Crown className="w-4 h-4" /> The Paradigm Shift
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1d3557] tracking-tight mb-6">Become The Group Chat Envy.</h2>
            <p className="text-lg text-[#457b9d] font-bold max-w-2xl mx-auto leading-relaxed">
              Imagine showing up to brunch and your friends are literally begging to know how you found a guy who communicates like an adult and still gives you butterflies. Go from the "friend who needs rescuing" to the "friend who sets the standard."
            </p>
          </div>

          <div className="bg-white border-2 border-[#1d3557]/10 rounded-[3rem] p-6 md:p-12 shadow-[0_20px_60px_rgba(29,53,87,0.12)] relative">
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Playbook 1 */}
              <label className={`cursor-pointer group relative p-8 rounded-3xl border-[3px] transition-all duration-300 ${
                bundleSelected.playbook1 
                ? 'bg-[#a8dadc]/10 border-[#1d3557] shadow-lg shadow-[#1d3557]/10 transform -translate-y-1' 
                : 'bg-white border-gray-200 hover:border-[#457b9d]/50 hover:bg-gray-50'
              }`}>
                <input type="checkbox" className="sr-only" checked={bundleSelected.playbook1} onChange={(e) => setBundleSelected({...bundleSelected, playbook1: e.target.checked})} />
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-colors ${bundleSelected.playbook1 ? 'bg-[#1d3557] border-[#1d3557] text-white' : 'bg-gray-100 border-gray-300'}`}>
                    {bundleSelected.playbook1 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <span className="font-black text-[#1d3557] text-xl bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">$10.99</span>
                </div>
                <h4 className="text-2xl font-black text-[#1d3557] mb-3">The "Mask-Slipping" Scripts</h4>
                <p className="text-base font-bold text-[#457b9d] leading-relaxed">Copy-paste text messages designed by psychologists to force manipulators to break character before date 1. Save months of wasted time.</p>
              </label>

              {/* Playbook 2 */}
              <label className={`cursor-pointer group relative p-8 rounded-3xl border-[3px] transition-all duration-300 ${
                bundleSelected.playbook2 
                ? 'bg-[#a8dadc]/10 border-[#1d3557] shadow-lg shadow-[#1d3557]/10 transform -translate-y-1' 
                : 'bg-white border-gray-200 hover:border-[#457b9d]/50 hover:bg-gray-50'
              }`}>
                <input type="checkbox" className="sr-only" checked={bundleSelected.playbook2} onChange={(e) => setBundleSelected({...bundleSelected, playbook2: e.target.checked})} />
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-colors ${bundleSelected.playbook2 ? 'bg-[#1d3557] border-[#1d3557] text-white' : 'bg-gray-100 border-gray-300'}`}>
                    {bundleSelected.playbook2 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <span className="font-black text-[#1d3557] text-xl bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">$10.99</span>
                </div>
                <h4 className="text-2xl font-black text-[#1d3557] mb-3">The Secure Man Field Guide</h4>
                <p className="text-base font-bold text-[#457b9d] leading-relaxed">How to spot a genuinely healthy guy and rewire your brain so you stop feeling "bored" by stability. The ultimate healthy attraction playbook.</p>
              </label>
            </div>

            {/* Checkout Strip */}
            <div className="bg-[#1d3557] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl">
              <div>
                <h4 className="text-3xl font-black mb-3 flex items-center gap-3">
                  Bundle & Save 
                  {bundleSelected.playbook1 && bundleSelected.playbook2 && <span className="bg-[#e63946] text-white text-xs px-3 py-1.5 rounded-lg uppercase tracking-widest animate-pulse">Deal Applied</span>}
                </h4>
                <p className="text-[#a8dadc] font-bold text-lg">Get both playbooks and completely reset your dating ecosystem.</p>
              </div>
              
              <div className="text-center md:text-right shrink-0 w-full md:w-auto">
                <div className="text-5xl font-black text-white mb-5">${bundlePrice.toFixed(2)}</div>
                <button 
                  disabled={bundlePrice === 0}
                  className="w-full md:w-auto px-10 h-16 bg-[#e63946] hover:bg-[#c1121f] text-white rounded-2xl font-black text-xl transition-all shadow-[0_10px_30px_rgba(230,57,70,0.4)] hover:shadow-[0_15px_40px_rgba(193,18,31,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Unlock Ecosystem Reset <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-black text-[#457b9d]">
              <ShieldCheck className="w-5 h-5 text-[#1d3557]" /> 30-Day Money Back Guarantee. Instant Digital Access.
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 6. HIGH-TICKET UPSELL (Deepest Red #780000) */}
        {/* ========================================= */}
        <section className="pb-16">
          <div className="bg-gradient-to-br from-[#780000] to-[#c1121f] rounded-[3rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(120,0,0,0.3)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
            
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-sm">
                <Flame className="w-4 h-4 text-[#a8dadc]" /> Need Immediate Help?
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">The Emergency Intercept Call</h3>
              <p className="text-white/80 font-bold text-xl leading-relaxed max-w-2xl">
                Talking to a guy right now and your gut is screaming? Don't make a mistake that costs you months of peace. Book a private tactical review. We will read his texts and tell you exactly what he is doing.
              </p>
            </div>

            <div className="relative z-10 bg-white rounded-3xl p-8 text-center shrink-0 w-full md:w-auto shadow-2xl">
              <div className="text-6xl font-black text-[#780000] mb-6">€50</div>
              <a href="#" className="w-full inline-flex h-16 items-center justify-center gap-3 bg-[#1d3557] hover:bg-[#0f1d30] text-white px-8 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 shadow-lg">
                <PhoneCall className="w-6 h-6" /> Book Tactical Call
              </a>
              <p className="text-[#457b9d] text-sm mt-5 font-black uppercase tracking-widest">Strictly Confidential</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Simple fallback icon for AlertTriangle if not imported from lucide-react
function AlertTriangle(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" x2="12" y1="9" y2="13"/>
      <line x1="12" x2="12.01" y1="17" y2="17"/>
    </svg>
  )
}
