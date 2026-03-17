"use client";
import React from "react";
import { Download, Share2, ShieldAlert, BookOpen, MessageSquare } from "lucide-react";

export default function PremiumReport({ data, handleShare }: { data: any, handleShare: any }) {
  
  const getBarColor = (score: number) => {
    if (score >= 20) return "bg-rose-600";
    if (score >= 14) return "bg-orange-500";
    return "bg-slate-300";
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      {/* Top Action Bar */}
      <div className="flex justify-end gap-3 mb-6 print:hidden">
        <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Download className="w-4 h-4" /> Save PDF
        </button>
      </div>

      {/* The Brutal Truth Header */}
      <div className="bg-rose-600 text-white rounded-[32px] p-10 md:p-14 mb-8 shadow-2xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">The Brutal Truth.</h2>
        <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-xl md:text-2xl font-bold leading-relaxed">
            "{data.customHeadline}"
          </p>
        </div>
      </div>

      {/* Full 10-Point Chart */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
        <h3 className="font-extrabold text-2xl text-slate-800 mb-2">Your Subconscious Magnets</h3>
        <p className="text-slate-500 font-medium mb-8">Scores above 14 indicate an active vulnerability that toxic men exploit.</p>
        
        <div className="space-y-5">
          {data.sortedSubcategories.map((sub: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-bold text-slate-700">{sub.name}</span>
                <span className="text-slate-500 font-extrabold">{sub.score} / 25</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className={`h-full rounded-full ${getBarColor(sub.score)}`} style={{ width: `${(sub.score/25)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Tactical Playbook (Deliverables) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0f172a] text-white rounded-3xl p-8 shadow-lg">
          <ShieldAlert className="w-8 h-8 text-rose-500 mb-4" />
          <h4 className="font-extrabold text-xl mb-3">Your First-Date Blind Spot</h4>
          <p className="text-slate-300 font-medium leading-relaxed">
            Because your highest trait is <strong>{data.top1}</strong>, you unintentionally signal to men that you will tolerate bad behavior if they provide enough initial chemistry. You must consciously delay physical and emotional investment until they prove consistent patterns.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <MessageSquare className="w-8 h-8 text-[#ffbc42] mb-4" />
          <h4 className="font-extrabold text-xl text-slate-800 mb-3">The "Cutoff" Script</h4>
          <p className="text-slate-600 font-medium mb-4">When a man ghosts you and comes back weeks later, do NOT explain your feelings. Copy and paste this exactly:</p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-sm text-slate-800 border-l-4 border-[#ffbc42]">
            "Hey. I'm not interested in picking this back up, but I wish you the best."
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100 text-center">
        <BookOpen className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
        <h4 className="font-extrabold text-xl text-slate-800 mb-3">Your 30-Day Rewiring Plan</h4>
        <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          For the next 30 days, your only goal is to block adrenaline. If a guy makes you feel "butterflies" and anxiety, walk away immediately. Your nervous system is broken and interprets fear as love. You must force yourself to date men who feel "boring" until your brain resets.
        </p>
      </div>

    </div>
  );
}
