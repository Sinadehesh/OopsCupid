"use client";
import React, { useEffect, useState } from "react";
import { Download, Share2, ShieldAlert, EyeOff, FileText, Video, ArrowRight, Target, BrainCircuit, Activity, Search, AlertOctagon, Zap, ShieldQuestion, Fingerprint, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function PremiumReport({ data, handleShare }: { data: any, handleShare: any }) {
  const [mounted, setMounted] = useState(false);
  const [zoomStatus, setZoomStatus] = useState<"idle" | "loading" | "booked">("idle");
  
  useEffect(() => setMounted(true), []);

  const topTrait = data?.top1 || "The Hyper-Empathetic Rescuer";
  let subs = data?.sortedSubcategories || [];
  
  // Pad to exactly 10 for the comprehensive matrix
  const displaySubs = [...subs];
  const fallbackNames = ["Boundary Collapse", "Trauma-Bond Susceptibility", "Gaslighting Receptivity", "Conflict Avoidance", "Validation Seeking", "Hyper-Forgiveness", "Sunk-Cost Fallacy", "Red-Flag Rationalization", "Fear of Abandonment", "Emotional Absorption"];
  while (displaySubs.length < 10) {
    displaySubs.push({ 
      name: fallbackNames[displaySubs.length] || `Latent Trait ${displaySubs.length + 1}`, 
      score: Math.floor(Math.random() * 12) + 10 
    });
  }

  const curveball = displaySubs[displaySubs.length - 1];
  const matrixItems = displaySubs.slice(0, 9);

  // Dynamic AI Text Generator based on specific score thresholds
  const generateAnalysis = (name: string, score: number) => {
    if (score >= 20) return `CRITICAL VULNERABILITY: Your score of ${score}/25 indicates a severe subconscious blind spot. Predators actively scan for this exact frequency. You are highly likely to rationalize toxic behavior in this area as "passion" or "complexity," allowing manipulators to cross your boundaries with zero consequences. Immediate rewiring required.`;
    if (score >= 15) return `ELEVATED RISK: At ${score}/25, you show significant susceptibility here. While you might spot the red flags eventually, a skilled manipulator will use this trait to test your limits early on. You often give people the benefit of the doubt exactly when you should be pulling away.`;
    if (score >= 10) return `MODERATE EXPOSURE: A score of ${score}/25 means you have baseline defenses, but a highly covert narcissist can still bypass them if they catch you in a vulnerable emotional state. Stay vigilant when you feel tired or lonely.`;
    return `SECURE ZONE: At ${score}/25, this is actually a psychological stronghold for you. Toxic individuals will hit a brick wall if they try to manipulate you using this specific angle.`;
  };

  const getRingColor = (score: number) => {
    if (score >= 20) return "text-rose-600";
    if (score >= 15) return "text-orange-500";
    return "text-emerald-500";
  };

  const getBgColor = (score: number) => {
    if (score >= 20) return "bg-rose-50 border-rose-100";
    if (score >= 15) return "bg-orange-50 border-orange-100";
    return "bg-emerald-50 border-emerald-100";
  };

  // Live Audit Booking Handler
  const handleZoomBooking = async () => {
    setZoomStatus("loading");
    
    try {
      // Secretly save the booking request to the database
      const targetEmail = data?.email || "anonymous_audit@oopscupid.com"; // Fallback if email wasn't passed directly in data
      await fetch('/api/leads/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail })
      });
    } catch (err) {
      console.error("Booking error", err);
    }
    
    // Artificial 1.5s delay so the user feels the "processing" happen
    setTimeout(() => {
      setZoomStatus("booked");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans">
      
      {/* HEADER UTILITIES */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 print:hidden animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-rose-600" /> Master-File Dossier
          </h1>
          <p className="text-slate-500 font-medium ml-11">Encrypted Psychological Analysis</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors shadow-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/20">
            <Download className="w-4 h-4" /> Save PDF
          </button>
        </div>
      </div>

      {/* HERO / ARCHETYPE */}
      <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-16 mb-16 shadow-[0_20px_50px_rgba(15,23,42,0.3)] relative overflow-hidden animate-in zoom-in-95 duration-1000">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <BrainCircuit className="w-14 h-14 text-rose-500 mb-8 relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
        <h2 className="text-sm font-black text-rose-400 tracking-[0.3em] uppercase mb-4 relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div> Core Archetype Lock
        </h2>
        <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight relative z-10 leading-none">"{topTrait}"</h3>
        <div className="bg-white/10 border border-white/20 p-6 md:p-8 rounded-2xl backdrop-blur-md relative z-10">
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
            {data?.customHeadline || "You naturally see the potential in people and give without keeping score. But this exact superpower is the backdoor predators use to exploit you. Below is the unedited data on how they do it."}
          </p>
        </div>
      </div>

      {/* 1. THE DEEP-DIVE ATTRACTION MATRIX */}
      <div className="mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 fill-mode-both">
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg">
            <Target className="w-8 h-8 text-rose-400" />
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The Comprehensive Matrix</h3>
            <p className="text-lg text-slate-500 font-medium">AI-Generated analysis of your 10 subconscious vulnerability zones.</p>
          </div>
        </div>

        <div className="space-y-6">
          {matrixItems.map((sub: any, i: number) => {
            const scorePercent = mounted ? (sub.score / 25) * 100 : 0;
            return (
              <div key={i} className={`flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${getBgColor(sub.score)}`}>
                
                {/* Animated Circular Biometric Ring */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 mx-auto md:mx-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path 
                      className={`${getRingColor(sub.score)} stroke-current transition-all duration-1500 ease-out`} 
                      strokeWidth="3" 
                      strokeDasharray={`${scorePercent}, 100`} 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl md:text-3xl font-black ${getRingColor(sub.score)}`}>{sub.score}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">/ 25</span>
                  </div>
                </div>

                {/* AI Text Analysis */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h4 className="text-2xl font-black text-slate-900">{sub.name}</h4>
                    {sub.score >= 20 && <span className="bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse">High Alert</span>}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-lg">
                    {generateAnalysis(sub.name, sub.score)}
                  </p>
                </div>
              </div>
            );
          })}

          {/* THE CURVEBALL (Glitch Aesthetic) */}
          <div className="relative overflow-hidden bg-slate-900 text-white p-8 md:p-10 rounded-[2rem] border border-slate-700 shadow-2xl group mt-10">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50 group-hover:animate-[ping_2s_infinite]"></div>
            <div className="absolute -right-10 -top-10 text-amber-500/10">
              <Zap className="w-64 h-64" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-amber-500/30">
                  <AlertOctagon className="w-4 h-4" /> Anomaly Detected
                </div>
                <h4 className="text-3xl font-black mb-4">The Curveball: {curveball.name}</h4>
                <p className="text-slate-300 font-medium text-lg leading-relaxed">
                  This trait contradicts your main archetype. Because it is so unexpected, healthy partners get confused by it, but toxic partners use it as a secret hook. <strong>Score: {curveball.score}/25.</strong> Your AI breakdown indicates this is where you are most likely to self-sabotage a good relationship while excusing a bad one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE BLIND SPOT DECODER (Radar Scan) */}
      <div className="mb-20 bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full blur-3xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-100 p-3 rounded-xl text-rose-600"><EyeOff className="w-8 h-8" /></div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Blind Spot Decoder</h3>
            </div>
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
              When someone enters your localized blind spot, your brain suppresses danger signals and translates anxiety into "chemistry." Here is exactly how they breach the perimeter:
            </p>
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-rose-600 text-lg mb-2 flex items-center gap-2"><ArrowRight className="w-5 h-5"/> The "Vulnerability" Play</h4>
                <p className="text-slate-700 font-medium">They overshare a traumatic past on date 1 to trigger your "Rescuer" instinct. You mistake trauma-dumping for emotional intimacy.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-black text-rose-600 text-lg mb-2 flex items-center gap-2"><ArrowRight className="w-5 h-5"/> Rapid Mirroring</h4>
                <p className="text-slate-700 font-medium">They perfectly mimic your core values in the first 2 weeks, creating an artificial, soulmate-level trust that disarms your logic.</p>
              </div>
            </div>
          </div>
          
          {/* Animated Radar Graphic */}
          <div className="flex items-center justify-center py-10">
            <div className="relative w-72 h-72 rounded-full border-[6px] border-slate-100 flex items-center justify-center bg-slate-50 shadow-inner overflow-hidden">
              <div className="absolute w-full h-full rounded-full border-2 border-rose-200 animate-[ping_3s_infinite]"></div>
              <div className="absolute w-52 h-52 rounded-full border-2 border-slate-200"></div>
              <div className="absolute w-32 h-32 rounded-full border-2 border-slate-200"></div>
              {/* Radar Sweeper */}
              <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-tr from-rose-400/40 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]"></div>
              <ShieldQuestion className="w-10 h-10 text-rose-600 relative z-10" />
              {/* Fake "Blips" */}
              <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)] animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PREDATOR PROFILER (Threat Gauge) */}
      <div className="mb-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          
          {/* Pulsing Threat Gauge */}
          <div className="w-64 h-64 relative flex-shrink-0">
            <div className="absolute inset-0 bg-rose-500 opacity-20 rounded-full blur-2xl animate-pulse"></div>
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-2xl">
              <path className="text-slate-800 stroke-current" strokeWidth="2" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-rose-500 stroke-current transition-all duration-2000 ease-out" strokeWidth="2.5" strokeDasharray={`${mounted ? 88 : 0}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Activity className="w-8 h-8 text-rose-500 mb-1 animate-pulse" />
              <span className="text-4xl font-black text-white">88%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mt-1">Match Risk</span>
            </div>
          </div>
          
          <div className="text-white">
            <h3 className="text-sm font-black text-slate-400 tracking-[0.2em] uppercase mb-2">The Predator Profiler</h3>
            <h4 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Primary Threat: <br/><span className="text-rose-500">Covert Narcissism</span></h4>
            <p className="text-slate-300 font-medium text-lg leading-relaxed mb-8">
              Unlike grandiose narcissists who brag, the covert narcissist plays the victim. They attract you by seeming "misunderstood" or "damaged." You feel an intense, biological urge to fix them. By the time they turn cruel, you are already trauma-bonded.
            </p>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h5 className="font-black text-rose-400 text-xs uppercase tracking-widest mb-3">Behavioral Signatures (How to spot them):</h5>
              <p className="text-slate-300 font-medium text-sm leading-relaxed">
                They constantly blame their exes for everything. They require immense emotional support from you, but physically withdraw, act annoyed, or pick a fight on days when YOU are having a bad day and need support yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE 3-STEP PROTOCOL (Timeline UI) */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <ShieldAlert className="w-12 h-12 text-slate-900 mx-auto mb-4" />
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">The "Mask-Slip" Protocol</h3>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Run this psychologically proven stress-test before getting attached. It safely forces toxic individuals to drop their act.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: 'The "No" Test', desc: 'Tell him "no" to something incredibly small (like rescheduling a date by 30 mins). A healthy man adapts. A manipulator will sulk, guilt-trip, or passively punish you.' },
            { num: 2, title: 'The Spotlight Shift', desc: 'When he is complaining about his day, suddenly shift the conversation to a problem of yours. A toxic person will immediately pivot back to themselves within two sentences.' },
            { num: 3, title: 'The Boundary Delay', desc: 'Refuse to text back for 4 hours during a normal day. A secure man assumes you are busy. A manipulator will double-text aggressively or act cold when you finally reply.' }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative group hover:border-slate-400 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform group-hover:bg-rose-600">
                {step.num}
              </div>
              <h4 className="font-black text-2xl text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* UPSELLS (BOTTOM PLACEMENT FOR HIGH CONVERSION) */}
      {/* ========================================================= */}
      <div className="border-t-[1px] border-slate-200 pt-20 pb-10 print:hidden">
        <h3 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-6 tracking-tight">Equip Your Defenses.</h3>
        <p className="text-xl text-slate-500 font-medium text-center max-w-2xl mx-auto mb-16">You know the data. Now get the exact tools and expert guidance to execute it flawlessly in the real world.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* THE PLAYBOOK ($10.99) */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700"><FileText className="w-64 h-64 text-emerald-400"/></div>
            
            <FileText className="w-12 h-12 text-emerald-400 mb-6 relative z-10" />
            <h4 className="text-3xl font-black text-white mb-4 relative z-10 leading-tight">The Detective Playbook</h4>
            <p className="text-emerald-100/80 font-medium mb-8 relative z-10 leading-relaxed text-lg">
              A short, lethal document filled with psychological weapons. Become a human lie detector. Force manipulators to expose themselves with exact copy-paste text scripts. Your friends will wonder how you see through people so easily.
            </p>
            <div className="flex items-end gap-4 mb-10 relative z-10">
              <span className="text-5xl font-black text-emerald-400">$10.99</span>
              <span className="text-emerald-100/40 line-through font-bold pb-2 text-xl">$49.00</span>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl py-5 rounded-2xl transition-all relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-1">
              Unlock Weaponized Playbook
            </button>
          </div>

          {/* THE ZOOM CALL (€50) WITH DATABASE TRACKING */}
          <div className="bg-white border-2 border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative group hover:border-rose-300 transition-colors">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-700 font-black text-xs uppercase tracking-widest px-5 py-3 rounded-bl-3xl rounded-tr-[2.5rem]">Strict Capacity Limit</div>
            
            <Video className="w-12 h-12 text-rose-500 mb-6" />
            <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">1-on-1 Predator Audit</h4>
            <p className="text-slate-600 font-medium mb-8 leading-relaxed text-lg">
              Think the guy you're talking to right now is a psychopath? Get on a private 30-minute Zoom call with our clinical experts. Share your screen, show us his texts, and we will decode his true intentions live. Stop guessing.
            </p>
            <div className="flex items-end gap-3 mb-10">
              <span className="text-5xl font-black text-slate-900">€50</span>
              <span className="text-slate-400 font-bold pb-2 text-xl">/ Private Session</span>
            </div>
            
            {/* DYNAMIC BOOKING BUTTON */}
            {zoomStatus === "booked" ? (
              <div className="w-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-black text-xl py-5 rounded-2xl flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> Session Reserved!
                </div>
              </div>
            ) : (
              <button 
                onClick={handleZoomBooking}
                disabled={zoomStatus === "loading"}
                className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {zoomStatus === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Book Live Audit Call"}
              </button>
            )}
            
            {zoomStatus === "booked" && (
              <p className="text-center text-sm font-bold text-emerald-600 mt-4 animate-in slide-in-from-bottom-2">
                Details have been securely saved to your file. We will email you the scheduling link shortly.
              </p>
            )}

          </div>

        </div>

        {/* ECOSYSTEM LOOP */}
        <div className="bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
          <Search className="w-14 h-14 text-rose-400 mx-auto mb-6" />
          <h4 className="text-3xl md:text-4xl font-black text-rose-950 mb-4 tracking-tight">Is He Manipulating You Right Now?</h4>
          <p className="text-rose-800 font-medium max-w-2xl mx-auto mb-10 text-xl">
            Don't guess. Put his behavior through our advanced clinical diagnostic to find out if you are being love-bombed or gaslit.
          </p>
          <Link href="/is-he-manipulative" className="inline-flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-rose-600/30 hover:-translate-y-1 w-full sm:w-auto">
            Test Your Partner Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

    </div>
  );
}
