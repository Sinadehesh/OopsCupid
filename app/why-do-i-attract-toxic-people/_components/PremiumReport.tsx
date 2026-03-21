"use client";
import React, { useState } from "react";
import { Download, Share2, ShieldAlert, BookOpen, MessageSquare, AlertOctagon, Video, ArrowRight, Target, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PremiumReport({ data, handleShare }: { data: any, handleShare: any }) {
  const [otoDismissed, setOtoDismissed] = useState(false);

  const getBarColor = (score: number) => {
    if (score >= 20) return "bg-rose-600";
    if (score >= 14) return "bg-orange-500";
    return "bg-slate-300";
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      {/* PHASE 3: HIGH-TICKET OTO / ESCALATION */}
      {!otoDismissed && (
        <div className="bg-[#fff1d0] border-2 border-[#f0c808] rounded-3xl p-8 md:p-10 mb-12 shadow-xl relative overflow-hidden animate-in slide-in-from-bottom-4 duration-700 print:hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500 animate-pulse"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">SUCCESS! Your Master-File is ready below.</h3>
              <p className="text-slate-600 font-medium">But please stop and read this carefully. Your order is not complete.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest mb-4">
              <AlertOctagon className="w-3 h-3" /> VIP Upgrade Unlocked
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">Claim Your 1-on-1 "Live Predator Audit" Coaching Session</h4>
            <p className="text-base md:text-lg font-medium text-slate-600 mb-6 leading-relaxed">
              Reading your Master-File will give you incredible clarity. But when you are in the middle of a confusing "situationship," your own judgment gets clouded. Hand your phone to a certified behavioral expert for a <strong>15-minute live audit</strong> of your texts to spot the exact manipulation tactics hiding in plain sight.
            </p>
            
            <div className="flex items-start gap-4 bg-rose-50 p-4 md:p-5 rounded-xl border border-rose-100 mb-8">
              <Clock className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-rose-800 leading-snug">
                WARNING: Strict Capacity Limit. Because this requires live, human behavioral experts, we can only offer this to 2 women per day. If you leave this page, your spot will be given to the next person.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white px-8 py-5 rounded-xl font-black text-lg transition-all hover:-translate-y-1 shadow-lg shadow-rose-600/20 flex items-center justify-center gap-3">
                <Video className="w-6 h-6" /> YES, Claim My Live Audit Session Now
              </button>
              <button onClick={() => setOtoDismissed(true)} className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors py-2">
                No thank you, I will analyze his texts on my own.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UTILITY BAR */}
      <div className="flex justify-end gap-3 mb-6 print:hidden">
        <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors">
          <Download className="w-4 h-4" /> Save PDF
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="bg-rose-600 text-white rounded-[32px] p-10 md:p-14 mb-8 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight relative z-10">The Brutal Truth.</h2>
        <div className="bg-white/10 p-6 md:p-8 rounded-2xl border border-white/20 backdrop-blur-sm relative z-10 shadow-inner">
          <p className="text-xl md:text-2xl font-bold leading-relaxed text-rose-50">
            "{data.customHeadline}"
          </p>
        </div>
      </div>

      {/* ATTRACTION MATRIX */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-rose-500" />
          <h3 className="font-extrabold text-2xl text-slate-800">Your Subconscious Magnets</h3>
        </div>
        <p className="text-slate-500 font-medium mb-8">Scores above 14 indicate an active vulnerability that toxic individuals routinely exploit.</p>
        
        <div className="space-y-6">
          {data.sortedSubcategories.map((sub: any, i: number) => (
            <div key={i} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{sub.name}</span>
                <span className="text-slate-500 font-extrabold bg-slate-100 px-2 py-0.5 rounded">{sub.score} / 25</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden shadow-inner">
                <div className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(sub.score)}`} style={{ width: `${(sub.score/25)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DUAL INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0f172a] text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 opacity-10 rounded-full blur-2xl"></div>
          <ShieldAlert className="w-10 h-10 text-rose-500 mb-6 relative z-10" />
          <h4 className="font-extrabold text-xl md:text-2xl mb-4 relative z-10">Your First-Date Blind Spot</h4>
          <p className="text-slate-300 font-medium leading-relaxed relative z-10">
            Because your highest trait is <strong className="text-rose-400 border-b border-rose-400/30 pb-0.5">{data.top1}</strong>, you unintentionally signal to men that you will tolerate bad behavior if they provide enough initial chemistry. Predators use this exact backdoor to bypass your intuition.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <MessageSquare className="w-10 h-10 text-[#ffbc42] mb-6" />
          <h4 className="font-extrabold text-xl md:text-2xl text-slate-800 mb-4">The "Cutoff" Script</h4>
          <p className="text-slate-600 font-medium mb-5 leading-relaxed">When a manipulator tries to "hoover" you back in, do NOT explain your feelings. Copy and paste this exactly:</p>
          <div className="bg-slate-50 p-5 rounded-2xl font-mono text-sm md:text-base text-slate-800 border-l-4 border-[#ffbc42] shadow-sm">
            "Hey. I'm not interested in picking this back up, but I wish you the best."
          </div>
        </div>
      </div>

      {/* 30 DAY PLAN */}
      <div className="bg-indigo-50 rounded-3xl p-8 md:p-12 border border-indigo-100 text-center mb-16 shadow-sm">
        <BookOpen className="w-10 h-10 text-indigo-500 mx-auto mb-6" />
        <h4 className="font-extrabold text-2xl md:text-3xl text-slate-800 mb-4">Your 30-Day Rewiring Plan</h4>
        <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto text-lg">
          For the next 30 days, your only goal is to block adrenaline. If a guy makes you feel "butterflies" and anxiety, walk away immediately. Your nervous system is currently translating fear as love. You must force yourself to date men who feel "boring" until your brain resets.
        </p>
      </div>

      {/* PHASE 3: ECOSYSTEM CONTINUITY LOOP */}
      <div className="border-t-2 border-slate-200 pt-16 pb-8 text-center print:hidden">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Target className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">Put It To The Test.</h3>
        <p className="text-lg md:text-xl font-medium text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Think about the guy you are currently talking to. Is he love-bombing you, or is he just romantic? Is he gaslighting you, or is it a genuine misunderstanding? <strong>Find out right now.</strong>
        </p>
        <Link href="/is-he-manipulative" className="inline-flex items-center justify-center gap-3 bg-[#0f172a] hover:bg-slate-800 text-white px-8 md:px-10 py-5 rounded-2xl font-black text-lg md:text-xl transition-all hover:-translate-y-1 shadow-2xl shadow-slate-900/20 w-full sm:w-auto group">
          Take the Manipulation Quiz <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
