"use client";
import React, { useState, useEffect } from "react";
import { Download, Share2, ShieldAlert, EyeOff, FileText, Video, Target, CheckCircle2, Loader2 } from "lucide-react";

export default function InfidelityMasterReport({ data }: any) {
  const [mounted, setMounted] = useState(false);
  const [zoomStatus, setZoomStatus] = useState<"idle" | "loading" | "booked">("idle");
  
  useEffect(() => { 
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const score = data?.score || 75;
  const riskLevel = data?.riskLevel || "ELEVATED";
  
  const vectors = [
    { name: "Digital Forensics", score: 88, text: "High probability of secondary messaging apps, deleted threads, or notification silencing." },
    { name: "Chronological Anomalies", score: 72, text: "Unexplained schedule gaps and 'working late' excuses that don't align with logic." },
    { name: "Intimacy & Defensiveness", score: 91, text: "He shifts the blame onto you, uses gaslighting, or picks fights to justify leaving the house." },
    { name: "Micro-Cheating Spectrum", score: 85, text: "Orbiting exes on social media, blurring boundaries with female 'friends'." },
  ];

  const handleZoomBooking = async () => {
    setZoomStatus("loading");
    try { 
      await fetch('/api/leads/coaching', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data?.email || "anonymous", type: "infidelity-audit" }) 
      }); 
    } catch(e) {}
    setTimeout(() => setZoomStatus("booked"), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans bg-[#f8fafc]">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10 print:hidden animate-in fade-in slide-in-from-top-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-600 animate-pulse" /> Deception Dossier
          </h1>
          <p className="text-slate-500 font-medium ml-11 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Live Investigation Secure
          </p>
        </div>
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 shadow-md">
          Save PDF
        </button>
      </div>

      {/* HERO: PROBABILITY GAUGE */}
      <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-16 mb-16 shadow-2xl relative overflow-hidden group animate-in zoom-in-95">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-600/20 blur-[100px] animate-pulse"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-48 h-48 relative flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-rose-500 stroke-current transition-all duration-[2000ms] ease-out drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" strokeWidth="3" strokeDasharray={`${mounted ? score : 0}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-rose-500 drop-shadow-lg">{score}%</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold mt-1">Probability</span>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-black text-rose-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 animate-spin"/> Threat Level: {riskLevel}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Paranoia vs. Reality</h3>
            <p className="text-xl text-slate-300 font-medium leading-relaxed">
              Stop letting him tell you you are crazy. Your intuition is picking up on specific, clinical micro-deceptions. His behavioral footprint strongly suggests he is hiding critical information.
            </p>
          </div>
        </div>
      </div>

      {/* 4-VECTOR BEHAVIORAL BREACH */}
      <div className="mb-20 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-100">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-8">4-Vector Behavioral Breach</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vectors.map((vec, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl group hover:-translate-y-1 transition-all overflow-hidden relative">
              <div className="absolute right-0 top-0 w-32 h-32 bg-slate-900/5 blur-3xl rounded-full"></div>
              <h4 className="font-black text-xl text-slate-800 mb-4">{vec.name}</h4>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-4 shadow-inner">
                <div className="bg-gradient-to-r from-rose-400 to-rose-600 h-full rounded-full transition-all duration-[2000ms] ease-out" style={{ width: mounted ? `${vec.score}%` : '0%' }}></div>
              </div>
              <div className="inline-block bg-rose-100 text-rose-700 text-xs font-black px-3 py-1 rounded-full mb-3">ANOMALY DETECTED</div>
              <p className="text-slate-600 font-medium leading-relaxed">{vec.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TRUTH EXTRACTION PROTOCOL */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Truth-Extraction Protocol</h3>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">3 psychological traps you can safely set today to catch him in a lie without him realizing it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: 'The False Timeline', desc: 'Ask about an event from yesterday but intentionally state the wrong time. A truth-teller corrects the time smoothly. A liar will over-explain or agree with your false time.' },
            { num: 2, title: 'The Phone Pivot', desc: 'While talking, casually ask him to look up a restaurant menu on his phone. Watch his hands. Does he tilt the screen away? Does he close background apps first?' },
            { num: 3, title: 'The Silence Trap', desc: 'When he gives you an excuse that sounds shady, stay completely silent for 10 seconds while holding eye contact. Liars hate silence and will start filling the gap with contradictions.' }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl group hover:border-slate-900 hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-lg group-hover:bg-rose-600 group-hover:scale-110 transition-all">{step.num}</div>
              <h4 className="font-black text-2xl text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ACV MAXIMIZERS (THE $9.99 AND €50 OFFERS) */}
      {/* ========================================================= */}
      <div className="border-t-4 border-slate-200 pt-20 pb-10 print:hidden">
        <h3 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-6 tracking-tight">Stop Guessing. Get Proof.</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* THE PLAYBOOK ($9.99) */}
          <div className="bg-gradient-to-br from-slate-900 to-rose-950 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <FileText className="w-12 h-12 text-rose-400 mb-6 relative z-10" />
            <h4 className="text-3xl font-black text-white mb-4 relative z-10 leading-tight">Digital Detective Playbook</h4>
            <p className="text-rose-100/80 font-medium mb-8 relative z-10 leading-relaxed text-lg">
              The ultimate forensic guide. Learn exactly how to recover deleted messages, check hidden location history on iOS/Android, and decipher secret emoji codes. Plus, get the exact text scripts to shut down his gaslighting.
            </p>
            <div className="flex items-end gap-4 mb-10 relative z-10">
              <span className="text-5xl font-black text-rose-400">$9.99</span>
              <span className="text-rose-100/40 line-through font-bold pb-2 text-xl">$39.00</span>
            </div>
            <button className="w-full bg-rose-500 hover:bg-rose-400 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:-translate-y-1 relative z-10">
              Unlock Weaponized Playbook
            </button>
          </div>

          {/* THE ZOOM CALL (€50) */}
          <div className="bg-white border-2 border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative group hover:border-slate-900 transition-colors flex flex-col justify-between">
            <div>
              <div className="absolute top-0 right-0 bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-bl-3xl rounded-tr-[2.5rem]">Strict Capacity Limit</div>
              <Video className="w-12 h-12 text-slate-900 mb-6" />
              <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Live Evidence Audit</h4>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed text-lg">
                Show us your screenshots. Get on a private 30-minute Zoom call with our forensic behavioral experts. We will review his texts, examine his alibis, and decode his true intentions live.
              </p>
            </div>
            <div>
              <div className="flex items-end gap-3 mb-8">
                <span className="text-5xl font-black text-slate-900">€50</span>
                <span className="text-slate-400 font-bold pb-2 text-xl">/ 30-Min Session</span>
              </div>
              {zoomStatus === "booked" ? (
                <div className="w-full bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-black text-xl py-5 rounded-2xl flex flex-col items-center justify-center gap-2 animate-in zoom-in">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> Audit Reserved!</div>
                  <span className="text-xs font-bold text-emerald-600">Details sent to your secure file.</span>
                </div>
              ) : (
                <button onClick={handleZoomBooking} disabled={zoomStatus === "loading"} className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1">
                  {zoomStatus === "loading" ? <Loader2 className="w-6 h-6 animate-spin" /> : "Book Live Audit Call"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
