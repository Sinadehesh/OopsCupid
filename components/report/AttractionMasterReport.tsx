"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Brain, Activity, Heart, EyeOff, ChevronRight, CheckCircle2, Flame, Sparkles, PhoneCall, ArrowRight, Star, Crosshair, AlertTriangle, ShieldCheck, Zap, Target, Eye, Fingerprint, MessageSquare, Shield, ChevronDown } from "lucide-react";

export default function AttractionMasterReport({ profile, email }: { profile: any, email?: string }) {
  const [activeToxicTab, setActiveToxicTab] = useState(0);
  const [bundleSelected, setBundleSelected] = useState({ playbook1: true, playbook2: true });
  const [mounted, setMounted] = useState(false);
  const [blindSpotRevealed, setBlindSpotRevealed] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState<number | null>(0);
  const [realityMode, setRealityMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock body scroll when this full-screen component mounts
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Bulletproof Data Handling
  const topTrait = profile?.primaryPattern || profile?.archetype || "The Empathic Rescuer";
  const userDescription = profile?.description || "Your nervous system rejects safe men, actively hunting for danger disguised as chemistry.";

  const blueprintData = [
    { 
      label: "Tolerance For Chaos", 
      score: profile?.traits?.chaos ?? 88, 
      color: "#c1121f",
      desc: "Your baseline for excitement is dangerously skewed. Peace feels like boredom to your nervous system; anxiety feels like passion. Manipulators sense this and intentionally create drama to keep you hooked."
    },
    { 
      label: "Savior Complex", 
      score: profile?.traits?.savior ?? 94, 
      color: "#e63946",
      desc: "You subconsciously derive your self-worth from being indispensable to broken people. If a man doesn't 'need' you to fix him, you struggle to feel a deep romantic connection to him."
    },
    { 
      label: "Boundary Permeability", 
      score: profile?.traits?.boundaries ?? 81, 
      color: "#a8dadc",
      desc: "You absorb the emotions of others and struggle to say 'no' without immense guilt. Toxic men push your boundaries early to see how much bad behavior you will rationalize and forgive."
    },
    { 
      label: "Dopamine Baseline", 
      score: profile?.traits?.dopamine ?? 62, 
      color: "#457b9d",
      desc: "You require extreme emotional highs to feel stimulated. Secure, consistent men don't trigger these massive dopamine spikes, causing you to friend-zone them for being 'too nice'."
    }
  ];

  const toxicRoster = [
    {
      name: "The Covert Narcissist",
      dangerLevel: 95,
      lure: "They mirror your deepest insecurities, presenting themselves as a 'misunderstood soul' who has been wronged by the world. They make you feel like the only one who truly 'gets' them.",
      trap: "Once you are fully invested in saving them, they suddenly withdraw affection. They weaponize your empathy, forcing you to work endlessly just to earn their baseline respect.",
      toll: "You are left emotionally drained, walking on eggshells, and questioning your own sanity.",
      healthyAlternative: "Seeking a partner who shares their vulnerabilities openly, without making it your responsibility to fix them."
    },
    {
      name: "The Love Bomber",
      dangerLevel: 88,
      lure: "Intense eye contact, overwhelming affection, and planning future vacations by date two. They manufacture a soulmate dynamic instantly to flood your brain with dopamine.",
      trap: "This explosive affection creates a false sense of absolute security. When their mask slips and they become controlling or erratic, you endure it, hoping to get the 'perfect guy' from date one back.",
      toll: "A trauma bond. You become addicted to the cycle of intense highs and terrifying lows.",
      healthyAlternative: "Generating excitement through novel experiences (travel, goals) with a partner whose affection is consistent, not explosive."
    },
    {
      name: "The Emotionally Unavailable",
      dangerLevel: 75,
      lure: "They are mysterious, highly independent, and incredibly charming when they want to be. They give you just enough attention to keep you hoping they will change.",
      trap: "They breadcrumb you. By keeping you in a constant state of 'chasing', they avoid true, terrifying vulnerability while keeping you hooked on the potential of what *could* be.",
      toll: "Years of wasted youth waiting for a commitment that was never going to happen.",
      healthyAlternative: "Learning to tolerate the 'calm' of a secure man without mistaking his stability for a lack of chemistry."
    }
  ];

  const bundlePrice = (bundleSelected.playbook1 && bundleSelected.playbook2) ? 15.99 : (bundleSelected.playbook1 || bundleSelected.playbook2) ? 10.99 : 0;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1d3557] overflow-y-auto w-full h-full font-sans selection:bg-[#e63946] selection:text-white">
      
      {/* ========================================= */}
      {/* 1. HERO (Dark Blue #1d3557 & Light Cyan #a8dadc) */}
      {/* ========================================= */}
      <div className="bg-[#1d3557] text-[#a8dadc] pt-12 pb-16 md:pt-20 md:pb-24 px-6 relative overflow-hidden border-b-[6px] border-[#e63946]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#457b9d]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#780000]/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#a8dadc]/10 text-[#a8dadc] rounded-full text-xs font-black uppercase tracking-[0.2em] border border-[#a8dadc]/30 shadow-[0_0_20px_rgba(168,218,220,0.1)]">
              <CheckCircle2 className="w-4 h-4" /> AI Profile Analysis Complete
            </div>
            <span className="text-[#457b9d] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-4 h-4" /> Secure File
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.05] text-white">
            Your Subconscious Mapped: <br className="hidden md:block" />
            <span className="text-[#a8dadc] drop-shadow-md">"{topTrait}"</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#a8dadc]/80 max-w-3xl font-medium leading-relaxed border-l-4 border-[#e63946] pl-6">
            {userDescription}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#f8f9fa] w-full relative">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 space-y-32">

          {/* ========================================= */}
          {/* 2. THE PSYCHOLOGICAL BLUEPRINT (Animated Circles & Accordion) */}
          {/* ========================================= */}
          <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-[#1d3557] tracking-tight mb-4 flex items-center gap-4">
                <Brain className="w-10 h-10 text-[#e63946]" /> The Clinical Blueprint
              </h2>
              <p className="text-[#457b9d] font-bold text-xl max-w-3xl leading-relaxed">
                Your answers revealed dangerous spikes in specific psychological traits. These spikes form a signature that manipulators actively hunt for.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {blueprintData.map((data, i) => {
                const isExpanded = expandedMetric === i;
                const radius = 36;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = mounted ? circumference - (data.score / 100) * circumference : circumference;

                return (
                  <div 
                    key={i} 
                    onClick={() => setExpandedMetric(isExpanded ? null : i)}
                    className={`bg-white rounded-[2rem] p-6 border-2 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl ${isExpanded ? 'border-[#457b9d] shadow-[#457b9d]/10' : 'border-gray-200 hover:border-[#a8dadc]'}`}
                  >
                    <div className="flex items-center gap-6">
                      {/* Circular Gauge */}
                      <div className="relative w-24 h-24 shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r={radius} stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                          <circle 
                            cx="50" cy="50" r={radius} 
                            stroke={data.color} strokeWidth="8" fill="transparent" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-[1500ms] ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-2xl font-black text-[#1d3557] leading-none">{mounted ? data.score : 0}</span>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-[#1d3557] mb-1">{data.label}</h3>
                        <div className="flex items-center gap-2 text-sm font-bold text-[#e63946] uppercase tracking-widest">
                          {data.score > 80 ? 'Critical Level' : 'Elevated Level'}
                        </div>
                      </div>
                      
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 ${isExpanded ? 'bg-[#457b9d] text-white rotate-180' : 'bg-gray-100 text-[#457b9d]'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                      <div className="overflow-hidden">
                        <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-gray-200">
                          <p className="text-[#1d3557] font-medium text-base leading-relaxed">
                            {data.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ========================================= */}
          {/* 3. THE BLIND SPOT (Interactive Reality Toggle) */}
          {/* ========================================= */}
          <section>
            <div className="bg-[#780000] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c1121f] rounded-full blur-[150px] pointer-events-none opacity-50"></div>
              
              <div className="relative z-10 text-center mb-12">
                <h3 className="text-sm font-black text-[#a8dadc] uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Critical Vulnerability Exposed
                </h3>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white mb-6">
                  You don't see red flags.<br/>You see <span className="text-[#a8dadc] underline decoration-[#e63946] underline-offset-8">projects.</span>
                </h2>
                <p className="text-[#a8dadc]/80 text-xl font-medium max-w-2xl mx-auto">
                  Your empathy is neurologically wired to feel "sparks" when you sense someone is slightly broken. 
                </p>
              </div>

              {/* Interactive Lens */}
              <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 max-w-4xl mx-auto">
                <div className="flex p-2 bg-black/20 rounded-[2rem] mb-6 relative">
                  <div 
                    className={`absolute inset-y-2 w-[calc(50%-16px)] bg-[#e63946] rounded-xl transition-all duration-500 ease-out ${realityMode ? 'translate-x-[calc(100%+16px)]' : 'translate-x-0'}`}
                  ></div>
                  <button 
                    onClick={() => setRealityMode(false)}
                    className={`flex-1 py-4 text-lg font-black z-10 transition-colors ${!realityMode ? 'text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    How You See Them
                  </button>
                  <button 
                    onClick={() => setRealityMode(true)}
                    className={`flex-1 py-4 text-lg font-black z-10 transition-colors flex items-center justify-center gap-2 ${realityMode ? 'text-white' : 'text-white/50 hover:text-white'}`}
                  >
                    <Eye className="w-5 h-5" /> The Brutal Reality
                  </button>
                </div>

                <div className="p-8 md:p-12 min-h-[250px] flex items-center justify-center text-center">
                  {!realityMode ? (
                    <div className="animate-in fade-in zoom-in duration-500">
                      <Heart className="w-16 h-16 text-[#a8dadc] mx-auto mb-6 animate-pulse" />
                      <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                        "He just has a lot of potential. He's misunderstood, and if I just love him hard enough, he will heal and treat me perfectly."
                      </p>
                    </div>
                  ) : (
                    <div className="animate-in fade-in zoom-in duration-500">
                      <ShieldAlert className="w-16 h-16 text-[#e63946] mx-auto mb-6" />
                      <p className="text-2xl md:text-3xl font-bold text-[#a8dadc] leading-relaxed">
                        "He is using my compassion as a shield. He has no intention of changing, because my endless forgiveness means he never has to."
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================= */}
          {/* 4. THE TOXIC ROSTER (Deep Dark Blue & Cyan) */}
          {/* ========================================= */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#1d3557] tracking-tight mb-6">The Real-Life Roster</h2>
              <p className="text-xl text-[#457b9d] font-medium max-w-3xl mx-auto leading-relaxed">
                This isn't about dating apps. This is about real-life psychological magnetism. These are the 3 specific archetypes subconsciously drawn to your signature.
              </p>
            </div>

            {/* Interactive Pill Tabs */}
            <div className="bg-[#457b9d]/10 p-2 rounded-3xl flex flex-col md:flex-row justify-center gap-2 mb-10 max-w-4xl mx-auto border border-[#457b9d]/20">
              {toxicRoster.map((toxic, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveToxicTab(i)}
                  className={`px-6 py-4 rounded-2xl font-black text-sm md:text-lg transition-all duration-300 flex-1 ${
                    activeToxicTab === i 
                    ? 'bg-[#1d3557] text-[#a8dadc] shadow-xl transform scale-[1.02]' 
                    : 'bg-transparent text-[#457b9d] hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {toxic.name}
                </button>
              ))}
            </div>

            {/* Active Content Card with key for animation trigger */}
            <div key={activeToxicTab} className="bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(29,53,87,0.1)] overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="p-8 md:p-14">
                
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-12 pb-10 border-b-2 border-[#f1f5f9]">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#780000]/10 text-[#780000] rounded-full text-xs font-black uppercase tracking-widest mb-4">
                      <Target className="w-4 h-4" /> Active Threat
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-[#1d3557]">{toxicRoster[activeToxicTab].name}</h3>
                  </div>
                  
                  {/* Run Away Meter */}
                  <div className="bg-[#1d3557] p-5 rounded-2xl w-full lg:w-80 shrink-0 shadow-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-black text-[#a8dadc] uppercase tracking-widest">Run Away Meter</span>
                      <span className="text-xl font-black text-[#e63946]">{toxicRoster[activeToxicTab].dangerLevel}/100</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full rounded-full transition-all duration-[2000ms] ease-out bg-gradient-to-r from-[#e63946] via-[#c1121f] to-[#780000]" 
                        style={{ width: mounted ? `${toxicRoster[activeToxicTab].dangerLevel}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-[#f8f9fa] rounded-3xl p-8 border border-gray-200 hover:border-[#a8dadc] transition-colors">
                    <div className="w-12 h-12 bg-[#457b9d]/10 rounded-xl flex items-center justify-center mb-6">
                      <Sparkles className="w-6 h-6 text-[#457b9d]" />
                    </div>
                    <h4 className="text-xl font-black text-[#1d3557] mb-3">The Lure</h4>
                    <p className="text-gray-600 font-medium leading-relaxed">{toxicRoster[activeToxicTab].lure}</p>
                  </div>
                  
                  <div className="bg-[#f8f9fa] rounded-3xl p-8 border border-gray-200 hover:border-[#e63946] transition-colors">
                    <div className="w-12 h-12 bg-[#e63946]/10 rounded-xl flex items-center justify-center mb-6">
                      <Crosshair className="w-6 h-6 text-[#e63946]" />
                    </div>
                    <h4 className="text-xl font-black text-[#1d3557] mb-3">The Trap</h4>
                    <p className="text-gray-600 font-medium leading-relaxed">{toxicRoster[activeToxicTab].trap}</p>
                  </div>

                  <div className="bg-[#f8f9fa] rounded-3xl p-8 border border-gray-200 hover:border-[#780000] transition-colors">
                    <div className="w-12 h-12 bg-[#780000]/10 rounded-xl flex items-center justify-center mb-6">
                      <ShieldAlert className="w-6 h-6 text-[#780000]" />
                    </div>
                    <h4 className="text-xl font-black text-[#1d3557] mb-3">The Toll</h4>
                    <p className="text-gray-600 font-medium leading-relaxed">{toxicRoster[activeToxicTab].toll}</p>
                  </div>
                </div>

                <div className="bg-[#457b9d] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl">
                  <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                    <Activity className="w-64 h-64" />
                  </div>
                  <h4 className="text-[#a8dadc] font-black text-sm mb-6 uppercase tracking-widest flex items-center gap-3">
                    <Brain className="w-5 h-5"/> The Subconscious Fix
                  </h4>
                  <div className="relative z-10">
                    <p className="font-bold text-2xl md:text-3xl leading-tight text-white max-w-3xl">
                      {toxicRoster[activeToxicTab].healthyAlternative}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ========================================= */}
          {/* 5. THE STATUS UPSELL (Ecosystem Reset) */}
          {/* ========================================= */}
          <section id="playbooks" className="pt-16 mt-20 border-t-2 border-dashed border-[#a8dadc]">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#1d3557] text-[#a8dadc] rounded-full text-sm font-black uppercase tracking-widest mb-6 shadow-lg">
                <Star className="w-4 h-4" /> The Paradigm Shift
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-[#1d3557] tracking-tight mb-6">Become The Group Chat Envy.</h2>
              <p className="text-xl text-[#457b9d] font-bold max-w-3xl mx-auto leading-relaxed">
                Imagine showing up to brunch and your friends are literally begging to know how you found a guy who communicates like an adult and still gives you butterflies. Go from the "friend who needs rescuing" to the "friend who sets the standard."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Playbook 1 */}
              <label className={`cursor-pointer group relative p-10 rounded-[2.5rem] border-4 transition-all duration-300 flex flex-col ${
                bundleSelected.playbook1 
                ? 'bg-white border-[#1d3557] shadow-2xl transform -translate-y-2' 
                : 'bg-white/50 border-gray-200 hover:border-[#a8dadc] hover:bg-white'
              }`}>
                <input type="checkbox" className="sr-only" checked={bundleSelected.playbook1} onChange={(e) => setBundleSelected({...bundleSelected, playbook1: e.target.checked})} />
                
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${bundleSelected.playbook1 ? 'bg-[#1d3557] text-[#a8dadc]' : 'bg-gray-100 text-gray-400'}`}>
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${bundleSelected.playbook1 ? 'bg-[#e63946] border-[#e63946] text-white' : 'bg-white border-gray-300'}`}>
                    {bundleSelected.playbook1 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-black tracking-wider mb-4 line-through decoration-[#e63946] decoration-2">Value: $47.00</div>
                  <h4 className="text-3xl font-black text-[#1d3557] mb-4 leading-tight">The "Mask-Slipping" Scripts</h4>
                  <p className="text-lg font-medium text-gray-600 leading-relaxed">Copy-paste text messages designed by psychologists to force manipulators to break character before date 1. Save months of wasted time.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <span className="text-3xl font-black text-[#1d3557]">$10.99</span>
                </div>
              </label>

              {/* Playbook 2 */}
              <label className={`cursor-pointer group relative p-10 rounded-[2.5rem] border-4 transition-all duration-300 flex flex-col ${
                bundleSelected.playbook2 
                ? 'bg-white border-[#1d3557] shadow-2xl transform -translate-y-2' 
                : 'bg-white/50 border-gray-200 hover:border-[#a8dadc] hover:bg-white'
              }`}>
                <input type="checkbox" className="sr-only" checked={bundleSelected.playbook2} onChange={(e) => setBundleSelected({...bundleSelected, playbook2: e.target.checked})} />
                
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${bundleSelected.playbook2 ? 'bg-[#1d3557] text-[#a8dadc]' : 'bg-gray-100 text-gray-400'}`}>
                    <Shield className="w-7 h-7" />
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${bundleSelected.playbook2 ? 'bg-[#e63946] border-[#e63946] text-white' : 'bg-white border-gray-300'}`}>
                    {bundleSelected.playbook2 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-black tracking-wider mb-4 line-through decoration-[#e63946] decoration-2">Value: $47.00</div>
                  <h4 className="text-3xl font-black text-[#1d3557] mb-4 leading-tight">The Secure Man Field Guide</h4>
                  <p className="text-lg font-medium text-gray-600 leading-relaxed">Exactly how to spot a genuinely healthy guy and rewire your dopamine so you stop feeling "bored" by stability. The ultimate healthy attraction playbook.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <span className="text-3xl font-black text-[#1d3557]">$10.99</span>
                </div>
              </label>
            </div>

            {/* Checkout Strip */}
            <div className="bg-[#1d3557] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#457b9d]/30 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-3xl md:text-4xl font-black mb-4 flex flex-col md:flex-row items-center gap-4">
                  Bundle & Save 
                  {bundleSelected.playbook1 && bundleSelected.playbook2 && <span className="bg-[#e63946] text-white text-sm px-4 py-2 rounded-xl uppercase tracking-widest animate-pulse shadow-lg">Deal Applied</span>}
                </h4>
                <p className="text-[#a8dadc] font-bold text-xl max-w-lg">Get both playbooks instantly and completely reset your dating ecosystem.</p>
              </div>
              
              <div className="text-center md:text-right shrink-0 w-full md:w-auto relative z-10">
                <div className="flex flex-col items-center md:items-end mb-6">
                  {bundleSelected.playbook1 && bundleSelected.playbook2 && <span className="text-[#a8dadc] font-bold line-through text-xl mb-1">$21.98</span>}
                  <div className="text-6xl md:text-7xl font-black text-white leading-none">${bundlePrice.toFixed(2)}</div>
                </div>
                <button 
                  disabled={bundlePrice === 0}
                  className="w-full md:w-auto px-10 h-20 bg-[#e63946] hover:bg-[#c1121f] active:scale-95 text-white rounded-2xl font-black text-2xl transition-all shadow-[0_15px_40px_rgba(230,57,70,0.4)] flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Unlock Ecosystem Reset <ArrowRight className="w-8 h-8" />
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-3 text-sm font-black text-[#457b9d]">
              <ShieldCheck className="w-6 h-6 text-[#1d3557]" /> 30-Day Money Back Guarantee. Instant Digital Access.
            </div>

          </section>

          {/* ========================================= */}
          {/* 6. HIGH-TICKET UPSELL (Deepest Red #780000) */}
          {/* ========================================= */}
          <section className="pb-16">
            <div className="bg-gradient-to-br from-[#780000] to-[#c1121f] rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
              
              <div className="relative z-10 flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 text-white rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/20 backdrop-blur-md shadow-lg">
                  <Flame className="w-5 h-5 text-[#a8dadc]" /> Need Immediate Tactical Help?
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">The Emergency Intercept Call</h3>
                <p className="text-white/90 font-bold text-xl leading-relaxed max-w-2xl">
                  Talking to a guy right now and your gut is screaming? Don't make a mistake that costs you months of peace. Book a private tactical review. We will analyze his texts and tell you exactly what he is doing.
                </p>
              </div>

              <div className="relative z-10 bg-white rounded-[2.5rem] p-10 text-center shrink-0 w-full md:w-auto shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="text-7xl font-black text-[#780000] mb-8">€50</div>
                <a href="#" className="w-full inline-flex h-16 items-center justify-center gap-3 bg-[#1d3557] hover:bg-[#0f1d30] text-white px-10 rounded-2xl font-black text-xl transition-all shadow-lg active:scale-95">
                  <PhoneCall className="w-6 h-6" /> Book Private Call
                </a>
                <p className="text-[#457b9d] text-sm mt-6 font-black uppercase tracking-widest">Strictly Confidential</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
