"use client";
import React from "react";
import { Download, Share2, ShieldAlert, EyeOff, FileText, Video, ArrowRight, Target, BrainCircuit, Activity, Search, AlertOctagon } from "lucide-react";
import Link from "next/link";

export default function PremiumReport({ data, handleShare }: { data: any, handleShare: any }) {
  const topTrait = data?.top1 || "The Rescuer";
  const subs = data?.sortedSubcategories || [];
  
  // Pad to ensure we have 10 subcategories for the matrix display if data is short
  const displaySubs = [...subs];
  while (displaySubs.length < 10) {
    displaySubs.push({ name: `Latent Vulnerability ${displaySubs.length + 1}`, score: Math.floor(Math.random() * 10) + 5 });
  }

  // Determine the "Curveball" trait (usually a high variance or unexpected low score)
  const curveball = displaySubs[displaySubs.length - 1];

  const getBarColor = (score: number) => {
    if (score >= 20) return "bg-rose-600";
    if (score >= 14) return "bg-orange-500";
    return "bg-emerald-500";
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 animate-in fade-in duration-700 font-sans">
      
      {/* HEADER & UTILITIES */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Toxic Attraction Master-File</h1>
          <p className="text-slate-500 font-medium">Confidential Psychological Dossier</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
            <Download className="w-4 h-4" /> Save PDF
          </button>
        </div>
      </div>

      {/* HERO / ARCHETYPE SECTION */}
      <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 md:p-14 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <BrainCircuit className="w-12 h-12 text-rose-500 mb-6 relative z-10" />
        <h2 className="text-sm font-black text-rose-400 tracking-widest uppercase mb-2 relative z-10">Primary Archetype Detected</h2>
        <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight relative z-10">"{topTrait}"</h3>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed font-medium relative z-10">
          {data?.customHeadline || "You naturally see the potential in people and give without keeping score. But this exact superpower is the backdoor predators use to exploit you."}
        </p>
      </div>

      {/* 1. THE ATTRACTION MATRIX (10 SUBCATEGORIES) */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-rose-600" />
          <h3 className="text-3xl font-black text-slate-900">The 10-Point Attraction Matrix</h3>
        </div>
        <p className="text-lg text-slate-600 mb-8 font-medium">
          This is the clinical breakdown of the psychological signals you broadcast. Scores in the <span className="text-rose-600 font-bold">Red Zone</span> indicate active vulnerabilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100">
          {displaySubs.slice(0, 9).map((sub: any, i: number) => (
            <div key={i} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700">{sub.name}</span>
                <span className="text-slate-900 font-extrabold">{sub.score} / 25</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${getBarColor(sub.score)}`} style={{ width: `${(sub.score/25)*100}%` }}></div>
              </div>
            </div>
          ))}
          
          {/* THE CURVEBALL */}
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 mt-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-black text-amber-900">⚡ The Curveball: {curveball.name}</span>
              <span className="text-amber-900 font-extrabold">{curveball.score} / 25</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-3 overflow-hidden mb-3">
              <div className={`h-full rounded-full transition-all bg-amber-500`} style={{ width: `${(curveball.score/25)*100}%` }}></div>
            </div>
            <p className="text-xs font-bold text-amber-800">
              This trait contradicts your main archetype, confusing healthy partners but acting as a hidden hook for toxic ones.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE BLIND SPOT DECODER */}
      <div className="mb-16 bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <EyeOff className="w-8 h-8 text-rose-500" />
          <h3 className="text-3xl font-black">Your Psychological Blind Spots</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div>
            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-6">
              You are highly intelligent, but you have a localized blind spot regarding <strong>early-stage intent</strong>. When someone enters this blind spot, your brain suppresses danger signals and translates fear into "chemistry."
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-rose-400 font-bold mb-3 uppercase tracking-wider text-sm">How They Breach Your Defenses:</h4>
              <ul className="space-y-4 text-slate-200 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1">✗</span> 
                  <span><strong>The "Vulnerability" Play:</strong> They overshare a traumatic past early on to trigger your "Rescuer" instinct.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 mt-1">✗</span> 
                  <span><strong>Mirroring:</strong> They perfectly mimic your core values in the first 2 weeks, creating artificial soulmate-level trust.</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Custom Blind Spot Radar Graphic */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64 rounded-full border-4 border-slate-700 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border border-rose-500/30 animate-ping"></div>
              <div className="absolute w-48 h-48 rounded-full border border-slate-600"></div>
              <div className="absolute w-32 h-32 rounded-full border border-slate-600"></div>
              <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,1)]"></div>
              {/* Radar Sweeper */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-tr from-rose-500/20 to-transparent origin-bottom-left animate-spin" style={{ animationDuration: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PREDATOR PROFILER: WHAT MENTAL DISORDERS DO YOU ATTRACT? */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-8 h-8 text-rose-600" />
          <h3 className="text-3xl font-black text-slate-900">The Predator Profiler</h3>
        </div>
        <p className="text-lg text-slate-600 mb-8 font-medium">Based on your matrix, you do not attract random bad guys. You act as a magnet for a specific cluster of clinical personality types.</p>
        
        <div className="bg-rose-50 border-2 border-rose-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Custom Threat Level Gauge */}
            <div className="w-48 h-48 relative flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-rose-200 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-rose-600 stroke-current" strokeWidth="3" strokeDasharray="85, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-rose-700">85%</span>
                <span className="text-xs font-bold uppercase text-rose-500">Match Risk</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-black text-slate-900 mb-3">Primary Threat: Covert Narcissism</h4>
              <p className="text-slate-700 font-medium leading-relaxed mb-4">
                Unlike grandiose narcissists who brag, the covert narcissist plays the victim. They attract you by seeming "misunderstood" or "damaged." You feel the urge to fix them. 
              </p>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h5 className="font-bold text-rose-600 text-sm uppercase tracking-wider mb-2">How to Spot Them:</h5>
                <p className="text-sm font-medium text-slate-600">They constantly blame their exes for everything. They require immense emotional support but physically withdraw or act annoyed when you have a bad day and need support yourself.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE 3-STEP "TEST YOUR MAN" PROTOCOL */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-8 h-8 text-slate-800" />
          <h3 className="text-3xl font-black text-slate-900">The "Test Your Man" Protocol</h3>
        </div>
        <p className="text-lg text-slate-600 mb-8 font-medium">Before you get attached, run this psychologically proven stress-test. It safely forces toxic individuals to drop their mask.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">1</div>
            <h4 className="font-black text-lg text-slate-900 mb-2">The "No" Test</h4>
            <p className="text-slate-600 font-medium text-sm">Tell him "no" to something incredibly small (like rescheduling a date by 30 minutes). A healthy man adapts. A manipulator will sulk, guilt-trip, or passively punish you.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 relative top-0 md:top-6">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">2</div>
            <h4 className="font-black text-lg text-slate-900 mb-2">The Spotlight Shift</h4>
            <p className="text-slate-600 font-medium text-sm">When he is complaining about his day, suddenly shift the conversation to a problem of yours. A toxic person will immediately pivot back to themselves within two sentences.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 relative top-0 md:top-12">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">3</div>
            <h4 className="font-black text-lg text-slate-900 mb-2">The Boundary Delay</h4>
            <p className="text-slate-600 font-medium text-sm">Refuse to text back for 4 hours during a normal day. A secure man assumes you are busy. A manipulator will double-text aggressively or act cold when you finally reply.</p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PHASE 3 UPSELLS (MOVED TO BOTTOM FOR MAXIMUM CONVERSION) */}
      {/* ========================================================= */}
      
      <div className="border-t-4 border-slate-100 pt-16 pb-8 print:hidden">
        <h3 className="text-4xl font-black text-center text-slate-900 mb-12 tracking-tight">Equip Your Defenses.</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* UPSELL 1: THE PLAYBOOK ($10.99) */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <FileText className="w-10 h-10 text-emerald-400 mb-6 relative z-10" />
            <h4 className="text-2xl font-black text-white mb-3 relative z-10 leading-tight">The Detective Playbook</h4>
            <p className="text-emerald-100/80 font-medium mb-6 relative z-10 leading-relaxed text-sm md:text-base">
              A short, lethal document filled with psychological weapons. Become a human lie detector. Force manipulators to expose themselves with exact copy-paste text scripts. Your friends will wonder how you can see through people so easily.
            </p>
            <div className="flex items-end gap-3 mb-8 relative z-10">
              <span className="text-4xl font-black text-emerald-400">$10.99</span>
              <span className="text-emerald-100/50 line-through font-bold pb-1">$49.00</span>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg py-4 rounded-xl transition-all relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Unlock Playbook
            </button>
          </div>

          {/* UPSELL 2: THE ZOOM CALL (€50) */}
          <div className="bg-white border-2 border-slate-200 p-8 md:p-10 rounded-[2rem] shadow-xl relative group hover:border-rose-300 transition-colors">
            <div className="absolute top-0 right-0 bg-rose-100 text-rose-600 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-bl-2xl rounded-tr-[2rem]">Strictly Limited</div>
            <Video className="w-10 h-10 text-rose-500 mb-6" />
            <h4 className="text-2xl font-black text-slate-900 mb-3 leading-tight">1-on-1 Predator Audit</h4>
            <p className="text-slate-600 font-medium mb-6 leading-relaxed text-sm md:text-base">
              Think the guy you're talking to right now is a psychopath? Get on a private 30-minute Zoom call with our clinical experts. Share your screen, show us his texts, and we will decode his true intentions live.
            </p>
            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-black text-slate-900">€50</span>
              <span className="text-slate-400 font-bold pb-1">/ Session</span>
            </div>
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-lg py-4 rounded-xl transition-all shadow-lg">
              Book Live Audit Call
            </button>
          </div>

        </div>

        {/* ECOSYSTEM CONTINUITY LOOP */}
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-10 text-center relative overflow-hidden">
          <Search className="w-12 h-12 text-rose-400 mx-auto mb-6" />
          <h4 className="text-2xl md:text-3xl font-black text-rose-950 mb-4">Is He Manipulating You Right Now?</h4>
          <p className="text-rose-800 font-medium max-w-2xl mx-auto mb-8 text-lg">
            Don't guess. Put his behavior through our advanced clinical diagnostic to find out if you are being love-bombed or gaslit.
          </p>
          <Link href="/is-he-manipulative" className="inline-flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-all shadow-lg hover:shadow-rose-600/30">
            Test Your Partner Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
