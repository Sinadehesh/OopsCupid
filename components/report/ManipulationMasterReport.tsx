"use client";
import React, { useState, useEffect } from "react";
import { Download, Share2, ShieldAlert, EyeOff, FileText, Video, Target, CheckCircle2, Loader2, Activity, Zap, Crosshair } from "lucide-react";
import Link from "next/link";

export default function ManipulationMasterReport({ data }: any) {
  const [mounted, setMounted] = useState(false);
  const [zoomStatus, setZoomStatus] = useState<"idle" | "loading" | "booked">("idle");
  
  useEffect(() => { 
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const rawScore = data?.overall?.score || 85;
  const riskLevel = data?.overall?.severity || "SEVERE";
  
  // Maps directly to your clinical sub-modules
  const matrix = [
    { name: "Reality Distortion (Gaslighting)", score: 92, text: "He systematically denies events that occurred, causing severe cognitive dissonance." },
    { name: "Isolation Tactics", score: 85, text: "He covertly undermines your friends/family to ensure you only rely on him." },
    { name: "Emotional Extortion", score: 88, text: "He uses guilt, the silent treatment, or threats of self-harm to enforce compliance." },
    { name: "Intermittent Reinforcement", score: 96, text: "He alternates extreme cruelty with intense affection to biochemically addict you." },
  ];

  const handleZoomBooking = async () => {
    setZoomStatus("loading");
    try { 
      await fetch('/api/leads/coaching', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data?.email || "anonymous", quizType: "manipulation" }) 
      }); 
    } catch(e) {}
    setTimeout(() => setZoomStatus("booked"), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans bg-[#f8fafc] overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 print:hidden animate-in fade-in slide-in-from-top-8 duration-700">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-600 animate-pulse" /> Hijacking Dossier
          </h1>
          <p className="text-slate-500 font-medium ml-11 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Connection Secured
          </p>
        </div>
        <button onClick={() => window.print()} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 shadow-lg hover:-translate-y-0.5 transition-all">
          Download PDF
        </button>
      </div>

      {/* HERO: COERCION GAUGE WITH MOTION GLOW */}
      <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-8 md:p-16 mb-16 shadow-[0_20px_50px_rgba(15,23,42,0.4)] relative overflow-hidden group animate-in zoom-in-95 duration-1000">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-[pulse_4s_ease-in-out_infinite]"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-48 h-48 relative flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-indigo-500 stroke-current transition-all duration-[2000ms] ease-out drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" strokeWidth="3" strokeDasharray={`${mounted ? rawScore : 0}, 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-indigo-400 drop-shadow-lg">{rawScore}%</span>
              <span className="text-[10px] uppercase text-slate-400 font-bold mt-1 tracking-widest">Coercion Index</span>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-black text-indigo-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 animate-spin"/> Threat Level: {riskLevel}
            </h2>
            <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-2xl">The Hijacking Protocol</h3>
            <p className="text-xl text-slate-300 font-medium leading-relaxed bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
              You cannot "communicate" your way out of manipulation. His shifting moods and explosive anger are not an accident; they are a calculated, clinical mechanism designed to paralyze your nervous system and hijack your reality.
            </p>
          </div>
        </div>
      </div>

      {/* THE CONTROL MATRIX */}
      <div className="mb-20 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-100">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-indigo-600" /> The 4-Point Control Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matrix.map((vec, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl group hover:border-indigo-400 transition-colors overflow-hidden relative hover:-translate-y-1">
              <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="font-black text-xl text-slate-800 mb-4 relative z-10">{vec.name}</h4>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-4 shadow-inner relative z-10 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-[2000ms] ease-out relative" style={{ width: mounted ? `${vec.score}%` : '0%' }}>
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_infinite]"></div>
                </div>
              </div>
              <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 relative z-10">ACTIVE TACTIC DETECTED</div>
              <p className="text-slate-600 font-medium leading-relaxed relative z-10">{vec.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* THE SANITY-THEFT DECODER */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 flex justify-center items-center gap-3">
            <EyeOff className="w-10 h-10 text-slate-900" /> The "Sanity-Theft" Decoder
          </h3>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">Word-for-word translations of his exact phrases, proving once and for all that you aren't crazy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: '"You are too sensitive"', desc: 'Translation: "I am going to condition you to accept my cruelty by convincing you that your totally normal reaction is a mental illness."' },
            { num: 2, title: '"I never said that"', desc: 'Translation: "I know exactly what I said. But if I say it confidently enough, you will doubt your own memory. This is called Gaslighting."' },
            { num: 3, title: '"After everything I do for you"', desc: 'Translation: "I am using a single past favor to emotionally extort you into tolerating my current unacceptable behavior."' }
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl group hover:border-slate-900 hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-2xl mb-6 shadow-lg group-hover:bg-indigo-600 group-hover:scale-110 transition-all">{step.num}</div>
              <h4 className="font-black text-xl text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ACV MAXIMIZERS (THE $9.99 AND €50 OFFERS) */}
      {/* ========================================================= */}
      <div className="border-t-4 border-slate-200 pt-20 pb-10 print:hidden">
        <h3 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-6 tracking-tight">Extract Yourself Safely.</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* THE PLAYBOOK ($9.99) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>
            <FileText className="w-12 h-12 text-indigo-400 mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <h4 className="text-3xl font-black text-white mb-4 relative z-10 leading-tight">The "Grey Rock" Disengagement Playbook</h4>
            <p className="text-indigo-100/80 font-medium mb-8 relative z-10 leading-relaxed text-lg">
              You cannot just dump a manipulator; he will rage or guilt-trip you into returning. You need to become completely boring. Get the exact text scripts and psychological shields to force him to discard you peacefully.
            </p>
            <div className="flex items-end gap-4 mb-10 relative z-10">
              <span className="text-5xl font-black text-indigo-400">$9.99</span>
              <span className="text-indigo-100/40 line-through font-bold pb-2 text-xl">$39.00</span>
            </div>
            <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:-translate-y-1 relative z-10 flex items-center justify-center gap-3">
              Unlock Escape Playbook <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* THE ZOOM CALL (€50) */}
          <div className="bg-white border-2 border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative group hover:border-slate-900 transition-colors flex flex-col justify-between">
            <div>
              <div className="absolute top-0 right-0 bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-4 py-3 rounded-bl-3xl rounded-tr-[2.5rem] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Strict Capacity
              </div>
              <Video className="w-12 h-12 text-slate-900 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Live Forensic Text Audit</h4>
              <p className="text-slate-600 font-medium mb-8 leading-relaxed text-lg">
                Show us your screenshots. Get on a private 30-minute Zoom call with our behavioral experts. We will review your last argument, examine his texts, and decode his manipulation tactics live on screen. 
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
                <button onClick={handleZoomBooking} disabled={zoomStatus === "loading"} className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
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
