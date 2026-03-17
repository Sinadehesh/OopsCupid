"use client";
import React, { useState } from "react";
import PremiumReport from "./PremiumReport";
import { Target, Lock, Download, Share2, ArrowRight } from "lucide-react";

export default function FreeResult({ data }: { data: any }) {
  const [unlocked, setUnlocked] = useState(false);

  const handleShare = async () => {
    const text = `I just took the 'Why Do I Attract Toxic People?' diagnostic. My dominant vulnerability is ${data.top1} (${data.tier}). Take the test here:`;
    const url = "https://oopscupid.com/why-do-i-attract-toxic-people";
    if (navigator.share) {
      try { await navigator.share({ title: "My Dating Blindspots", text, url }); } 
      catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link copied to clipboard!");
    }
  };

  if (unlocked) return <PremiumReport data={data} handleShare={handleShare} />;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      <div className="flex justify-end gap-3 mb-6">
        <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Download className="w-4 h-4" /> Save PDF
        </button>
      </div>

      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border-t-8 border-rose-500 text-center relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50 rounded-bl-full -z-0"></div>
        <div className="relative z-10">
          <p className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-2">Your Diagnostic Tier</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">{data.tier}</h2>
          
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mb-8 text-left">
            <p className="text-sm font-extrabold text-rose-600 uppercase mb-1">Your #1 Subconscious Vulnerability:</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-3">{data.top1}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Based on your answers, this is the primary reason you keep bypassing healthy options and settling for toxic dynamics. You are subconsciously prioritizing this feeling over your own emotional safety.
            </p>
          </div>

          <div className="bg-slate-800 text-white rounded-2xl p-6 flex items-center justify-between gap-4 text-left shadow-lg">
            <div>
              <Lock className="w-6 h-6 text-rose-400 mb-2" />
              <p className="font-bold text-sm">Your full report reveals the exact signal you send that toxic men read as access.</p>
            </div>
          </div>
        </div>
      </div>

      {/* HORMOZI GRAND SLAM OFFER */}
      <div className="bg-[#0f172a] rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-rose-500/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-rose-500/20 text-rose-300 uppercase">
            <Target className="w-4 h-4" /> Premium Playbook
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Stop The Cycle. Get The Playbook.</h3>
          <p className="text-slate-300 text-lg mb-8 font-medium max-w-lg mx-auto">
            Unlock your full 10-point psychological breakdown. We will expose exactly why you attract bad guys, and give you the copy-paste scripts to cut them off safely.
          </p>
          
          <button onClick={() => setUnlocked(true)} className="w-full bg-[#ffbc42] text-black font-extrabold text-xl py-5 rounded-2xl shadow-[0_0_30px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] hover:scale-105 transition-all">
            Unlock My Full Diagnosis <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
