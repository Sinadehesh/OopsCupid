"use client";
import React, { useState } from "react";
import PremiumDossier from "@/components/report/premium/PremiumDossier";
import { buildBadGuysDossier } from "../_lib/dossier";
import { Target, Lock, ArrowRight } from "lucide-react";
import { usePremiumAccess } from "@/lib/usePremiumAccess";
import CheckoutButton from "@/components/offers/CheckoutButton";
import ResultShare from "@/components/share/ResultShare";

export default function FreeResult({ data }: { data: any }) {
  const { granted } = usePremiumAccess();


  // Already paid? Show the full dossier here rather than making them
  // navigate — same content as /why-do-i-pick-bad-guys/premium.
  if (granted) return <PremiumDossier dossier={buildBadGuysDossier(data)} />;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      {/* Share is the only free distribution this site has: the card at
          /api/og previews the archetype, so a posted link is an ad. */}
      <div className="flex justify-center md:justify-end mb-6">
        <ResultShare
          quiz="Why Do I Pick Bad Guys?"
          quizPath="/why-do-i-pick-bad-guys"
          title={data.tier}
          score={Math.round(((data.totalScore - 50) / 200) * 100)}
          scoreLabel="Pattern Index"
        />
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
              Based on your answers, this is the primary reason you keep bypassing healthy options and settling for toxic dynamics. You are subconsciously prioritizing this feeling over your own safety.
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
          
          <CheckoutButton sku="premium-report" returnTo="/why-do-i-pick-bad-guys/premium" className="w-full bg-[#ffbc42] text-black font-extrabold text-xl py-5 rounded-2xl shadow-[0_0_30px_rgba(255,188,66,0.3)] hover:bg-[#e5a93c] hover:scale-105 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70">Unlock My Full Diagnosis</CheckoutButton>
        </div>
      </div>
    </div>
  );
}
