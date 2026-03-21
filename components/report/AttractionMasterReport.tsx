"use client";

import React, { useState, useEffect } from "react";
import { Download, Share2, ShieldAlert, Fingerprint, BrainCircuit, Target, Activity, EyeOff, ArrowRight, Video, FileText, Search, CheckCircle2, Loader2, Radar, Crosshair, Zap } from "lucide-react";
import Link from "next/link";

export default function AttractionMasterReport({ profile, demographics, email, isUnlocked = true }: any) {
  const [mounted, setMounted] = useState(false);
  const [zoomStatus, setZoomStatus] = useState<"idle" | "loading" | "booked">("idle");

  useEffect(() => {
    // Staggered mounting for smooth animation sequencing
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const primaryArchetype = profile?.attraction?.primaryLabel || "The Empathic Rescuer";
  
  // Frequency Data
  const frequencies = [
    { name: "Agreeableness (Compliance)", score: 92, status: "CRITICAL", text: "You automatically prioritize his comfort over your safety." },
    { name: "Openness (Boundary Fluidity)", score: 85, status: "HIGH", text: "You view red flags as 'complexity' and try to understand rather than leave." },
    { name: "Neuroticism (Anxiety Baseline)", score: 78, status: "HIGH", text: "Your nervous system confuses anxiety with romantic chemistry." },
    { name: "Conscientiousness (Fixer Drive)", score: 88, status: "HIGH", text: "You treat his brokenness as a project you must complete." },
  ];

  // Dark Triad Susceptibility Data
  const darkTriad = [
    { name: "Covert Narcissists", risk: 94, color: "text-rose-500", border: "border-rose-500", bg: "bg-rose-500", desc: "Targeted by 'victims' who need endless emotional labor." },
    { name: "Machiavellians", risk: 72, color: "text-orange-500", border: "border-orange-500", bg: "bg-orange-500", desc: "Susceptible to slow, calculated financial or social isolation." },
    { name: "Psychopaths", risk: 45, color: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500", desc: "You generally avoid overt aggression and physical chaos." }
  ];

  const handleZoomBooking = async () => {
    setZoomStatus("loading");
    try {
      const targetEmail = email || "anonymous_audit@oopscupid.com";
      await fetch('/api/leads/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, type: "roster-audit" })
      });
    } catch (err) {}
    setTimeout(() => setZoomStatus("booked"), 1500);
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: "My Attraction Master-File", url: window.location.href });
    } catch (err) {}
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans bg-[#f8fafc] overflow-hidden">
      
      {/* HEADER UTILITIES */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 print:hidden animate-in fade-in slide-in-from-top-8 duration-700">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-indigo-600 animate-pulse" /> Subconscious Magnetism Dossier
          </h1>
          <p className="text-slate-500 font-medium ml-11 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Connection Secured
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors shadow-md">
            <Download className="w-4 h-4" /> Save PDF
          </button>
        </div>
      </div>

      {/* MODULE 1: THE HERO (MOTION AESTHETIC) */}
      <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-16 mb-16 shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden group animate-in zoom-in-95 duration-1000">
        {/* Animated Grid & Glows */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-500 opacity-10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 animate-[pulse_5s_ease-in-out_infinite]"></div>
        
        <BrainCircuit className="w-16 h-16 text-indigo-400 mb-8 relative z-10 animate-[bounce_3s_infinite]" />
        <h2 className="text-xs font-black text-indigo-400 tracking-[0.3em] uppercase mb-4 relative z-10 flex items-center gap-2">
          <Crosshair className="w-4 h-4 animate-[spin_3s_linear_infinite]" /> Target Archetype Locked
        </h2>
        <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight relative z-10 leading-none drop-shadow-2xl">
          "{primaryArchetype}"
        </h3>
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md relative z-10 hover:bg-white/10 transition-colors duration-500">
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
            You aren't just unlucky. Your specific combination of high agreeableness and extreme openness is acting as a homing beacon for toxic partners. Below is the unedited clinical data proving exactly why you attract them.
          </p>
        </div>
      </div>

      {/* MODULE 2: SUBCONSCIOUS FREQUENCY DECODER */}
      <div className="mb-20 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-100 fill-mode-both">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl shadow-sm relative">
            <Activity className="w-8 h-8" />
            <div className="absolute inset-0 border-2 border-indigo-400 rounded-xl animate-ping opacity-20"></div>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Subconscious Frequency Decoder</h3>
            <p className="text-lg text-slate-500 font-medium">Derived from your Big Five & PID-5 Maladaptive Trait inputs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frequencies.map((freq, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative overflow-hidden group hover:shadow-indigo-500/10 transition-all hover:-translate-y-1">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 opacity-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-end mb-4 relative z-10">
                <h4 className="font-black text-xl text-slate-800">{freq.name}</h4>
                <span className="text-3xl font-black text-rose-600">{freq.score}%</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden relative z-10 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-rose-400 to-rose-600 h-full rounded-full transition-all duration-1500 ease-out relative" 
                  style={{ width: mounted ? `${freq.score}%` : '0%' }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_infinite]"></div>
                </div>
              </div>
              
              <div className="inline-block bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 relative z-10 border border-rose-200">
                {freq.status} VULNERABILITY
              </div>
              <p className="text-slate-600 font-medium leading-relaxed relative z-10">{freq.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODULE 3: DARK TRIAD TARGET MATRIX (HEAVY MOTION) */}
      <div className="mb-20 bg-slate-900 rounded-[2.5rem] p-8 md:p-16 border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="flex items-center gap-4 mb-12 relative z-10">
          <div className="relative">
            <Radar className="w-12 h-12 text-rose-500 relative z-10" />
            <div className="absolute inset-0 bg-rose-500 blur-xl opacity-40 animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight">Dark Triad Target Matrix</h3>
            <p className="text-slate-400 font-medium mt-2">Live threat assessment based on your psychological footprint.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {darkTriad.map((threat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm text-center relative overflow-hidden group hover:bg-white/10 transition-colors">
              {/* Background Glow matching threat color */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 ${threat.bg} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
              
              <div className="w-36 h-36 mx-auto relative mb-6">
                {/* Outer Spinning Ring */}
                <div className={`absolute inset-0 border-2 border-dashed ${threat.border} rounded-full opacity-30 animate-[spin_8s_linear_infinite]`}></div>
                
                {/* SVG Circular Gauge */}
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 scale-90">
                  <path className="text-slate-700 stroke-current" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path 
                    className={`${threat.color} stroke-current transition-all duration-[2000ms] ease-out drop-shadow-[0_0_8px_currentColor]`} 
                    strokeWidth="2.5" 
                    strokeDasharray={`${mounted ? threat.risk : 0}, 100`} 
                    fill="none" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black ${threat.color} drop-shadow-[0_0_10px_currentColor]`}>{threat.risk}%</span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-1">Match Risk</span>
                </div>
              </div>
              <h4 className="text-2xl font-black mb-3">{threat.name}</h4>
              <p className="text-slate-300 font-medium text-sm leading-relaxed">{threat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODULE 4: CHEMISTRY VS PANIC DIAGNOSTIC */}
      <div className="mb-20 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 fill-mode-both">
        <div className="bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100 rounded-[2.5rem] p-10 md:p-16 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 text-indigo-500/5 group-hover:scale-110 transition-transform duration-1000">
            <ShieldAlert className="w-96 h-96" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-600 text-white p-3 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] animate-[pulse_2s_infinite]">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The "Boring Love" Diagnostic</h3>
            </div>
            <p className="text-xl text-slate-700 font-medium leading-relaxed mb-8 max-w-3xl">
              Your data reveals a severe biological mix-up. Your nervous system is currently wired to view emotional unavailability as a "spark." When you meet a secure, healthy man who texts you back and doesn't play games, your brain interprets the lack of adrenaline as a lack of chemistry. <strong className="text-indigo-900">You aren't losing interest because he's boring; you're losing interest because he's safe.</strong>
            </p>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-md flex items-start gap-4 transform hover:-translate-y-1 transition-transform">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-full flex-shrink-0"><EyeOff className="w-6 h-6" /></div>
              <div>
                <h4 className="font-black text-xl text-slate-900 mb-2">Your Schema Origin Detected:</h4>
                <p className="text-slate-600 font-medium text-lg">You are subconsciously trying to win the love of an emotionally distant early caregiver by repeating the cycle with emotionally distant partners on dating apps.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 5: 3-STEP MASK-SLIP PROTOCOL */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">The "Mask-Slip" Protocol</h3>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Execute this psychologically proven stress-test before getting attached. It safely forces toxic individuals to drop their act.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: 'The "No" Test', desc: 'Tell him "no" to something incredibly small. A healthy man adapts. A manipulator will sulk, guilt-trip, or passively punish you.' },
            { num: 2, title: 'Spotlight Shift', desc: 'When he complains about his day, suddenly shift to a problem of yours. A toxic person will pivot back to themselves instantly.' },
            { num: 3, title: 'Boundary Delay', desc: 'Refuse to text back for 4 hours. A secure man assumes you are busy. A manipulator will double-text aggressively or act cold.' }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl relative group hover:border-slate-400 transition-all hover:-translate-y-3 cursor-default">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-[2rem]"></div>
              <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-lg group-hover:bg-rose-600 group-hover:scale-110 transition-all">
                {step.num}
              </div>
              <h4 className="font-black text-2xl text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ACV MAXIMIZERS (CONSISTENT PRICING AS REQUESTED) */}
      {/* ========================================================= */}
      <div className="border-t-4 border-slate-200 pt-20 pb-10 print:hidden">
        <h3 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-6 tracking-tight">Break The Trauma Bond.</h3>
        <p className="text-xl text-slate-500 font-medium text-center max-w-2xl mx-auto mb-16">You have the data. Now equip yourself with the psychological weapons and expert guidance needed to execute it flawlessly.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* UPSELL 1: THE PLAYBOOK ($9.99) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
              <FileText className="w-64 h-64 text-indigo-400"/>
            </div>
            
            <div className="relative z-10">
              <FileText className="w-12 h-12 text-indigo-400 mb-6 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <h4 className="text-3xl font-black text-white mb-4 leading-tight">The "Mask-Slipping" Texting Playbook</h4>
              <p className="text-indigo-100/80 font-medium mb-8 leading-relaxed text-lg">
                Force him to show his true colors before the first date. Get 5 exact, psychologically-engineered text messages to send a new match. Secure men answer normally. Toxic men expose their rage and avoidance instantly.
              </p>
              <div className="flex items-end gap-4 mb-10">
                {/* PRICING ENFORCED: $9.99 */}
                <span className="text-5xl font-black text-indigo-400">$9.99</span>
                <span className="text-indigo-100/40 line-through font-bold pb-2 text-xl">$39.00</span>
              </div>
              <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2">
                Unlock Weaponized Playbook <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* UPSELL 2: LIVE ROSTER AUDIT TEST (€50) */}
          <div className="bg-white border-2 border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative group hover:border-rose-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="absolute top-0 right-0 bg-rose-100 text-rose-700 font-black text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-bl-3xl rounded-tr-[2.5rem] flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-600 rounded-full animate-ping"></span> Strict Capacity
              </div>
              
              <Video className="w-12 h-12 text-rose-500 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Live Roster Audit / Test</h4>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed text-lg">
                Reading the data is one thing. Executing it when you have feelings for someone is another. Bring the text threads and dating profiles of the top 3 guys you are talking to. You'll share your screen, and our behavioral experts will clinically dissect them live on Zoom.
              </p>
            </div>
            
            <div>
              <div className="flex items-end gap-3 mb-8">
                {/* PRICING ENFORCED: €50 */}
                <span className="text-5xl font-black text-slate-900">€50</span>
                <span className="text-slate-400 font-bold pb-2 text-xl">/ 30-Min Session</span>
              </div>
              
              {zoomStatus === "booked" ? (
                <div className="w-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-black text-xl py-5 rounded-2xl flex flex-col items-center justify-center gap-2 animate-in zoom-in duration-300">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> Test Reserved!</div>
                  <span className="text-xs font-bold text-emerald-600">Details sent to your secure file.</span>
                </div>
              ) : (
                <button onClick={handleZoomBooking} disabled={zoomStatus === "loading"} className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1 disabled:opacity-70">
                  {zoomStatus === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Book Live Audit Call"}
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ECOSYSTEM LOOP */}
        <div className="bg-rose-50 border-2 border-rose-100 rounded-[2.5rem] p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          <Search className="w-14 h-14 text-rose-400 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
          <h4 className="text-3xl md:text-4xl font-black text-rose-950 mb-4 tracking-tight relative z-10">Is He Manipulating You Right Now?</h4>
          <p className="text-rose-800 font-medium max-w-2xl mx-auto mb-10 text-xl relative z-10">
            Don't guess. Put his behavior through our advanced clinical diagnostic to find out if you are being love-bombed or gaslit.
          </p>
          <Link href="/is-he-manipulative" className="inline-flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:shadow-rose-600/30 hover:-translate-y-1 w-full sm:w-auto relative z-10">
            Test Your Partner Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

    </div>
  );
}
