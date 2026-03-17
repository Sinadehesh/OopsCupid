"use client";
import React, { useState } from "react";
import PremiumReport from "./PremiumReport";
import { Lock, Download, Share2, ArrowRight, ShieldCheck } from "lucide-react";

export default function FreeResult({ data }: { data: any }) {
  const [unlocked, setUnlocked] = useState(false);

  const handleShare = async () => {
    const text = `I just took the 'Are My Friends Bad For Me?' diagnostic. My friendship circle was rated: ${data.tier}. Take the test here:`;
    const url = "https://oopscupid.com/are-my-friends-bad-for-me";
    if (navigator.share) {
      try { await navigator.share({ title: "My Friendship Diagnosis", text, url }); } 
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

      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border-t-8 border-[#10b981] text-center relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#10b981]/10 rounded-bl-full -z-0"></div>
        <div className="relative z-10">
          <p className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-2">Your Diagnostic Tier</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">{data.tier}</h2>
          
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 text-left">
            <p className="text-sm font-extrabold text-[#10b981] uppercase mb-2 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4"/> The Brutal Truth
            </p>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Your Highest Pain Point: {data.top1}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              You are not imagining it. Some of your friendships survive purely on your effort, your guilt, and your emotional availability. 
            </p>
          </div>

          <div className="bg-slate-800 text-white rounded-2xl p-6 flex items-center justify-between gap-4 text-left shadow-lg border border-slate-700">
            <div>
              <Lock className="w-6 h-6 text-[#10b981] mb-2" />
              <p className="font-bold text-sm text-slate-300">Your full report shows exactly which type of fake-friend pattern you attract and the safest way to pull back without starting drama.</p>
            </div>
          </div>
        </div>
      </div>

      {/* HORMOZI GRAND SLAM OFFER */}
      <div className="bg-[#0f172a] rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-[#10b981]/30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#10b981]/20 text-[#10b981] uppercase border border-[#10b981]/30">
            <Lock className="w-4 h-4" /> Premium Action Plan
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Stop Being Used. Get The Playbook.</h3>
          <p className="text-slate-300 text-lg mb-8 font-medium max-w-lg mx-auto">
            Unlock your full 10-point toxic friendship breakdown. We will give you the exact copy-paste text scripts to set boundaries and take your power back today.
          </p>
          
          <button onClick={() => setUnlocked(true)} className="w-full bg-[#10b981] text-white font-extrabold text-xl py-5 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-[#059669] hover:scale-105 transition-all">
            Unlock My Playbook & Scripts <ArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
