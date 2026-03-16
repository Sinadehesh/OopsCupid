"use client";
import React, { useState } from "react";
import PremiumReport from "./PremiumReport";
import { MessageSquare, ShieldCheck } from "lucide-react";

// Reusable Bar Component for the Dimensions
function DimensionBar({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="font-extrabold text-[#0D2C54] text-sm md:text-base">{label}</span>
        <span className="font-bold text-slate-500 text-sm">{score}%</span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}

export default function FreeResult({ data, rawAnswers }: { data: any, rawAnswers: Record<string, string> }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.riskScore / 100) * circumference;
  const ringColor = data.riskScore >= 60 ? "#d81159" : data.riskScore >= 40 ? "#ffbc42" : "#00A6ED";

  const handleShare = async () => {
    const text = `I just took the Toxic Friendship Diagnostics Battery. My risk score is ${data.riskScore}/100 (${data.archetype}). Find out your friendship risk score here:`;
    const url = "https://oopscupid.com/toxic-friend-test";
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Friendship Profile", text, url });
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Result copied to clipboard!");
    }
  };

  if (isUnlocked) {
    return <PremiumReport data={data} rawAnswers={rawAnswers} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Overview Card */}
      <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(13,44,84,0.06)] border border-[#0D2C54]/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r={radius} stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={ringColor}
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-[#0D2C54]">{data.riskScore}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
          </div>
        </div>
        <div className="text-center md:text-left w-full">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Dominant Pattern</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-3">{data.archetype}</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-4">{data.description}</p>
          
          <button onClick={handleShare} className="inline-flex items-center gap-2 text-sm font-bold text-[#00A6ED] hover:text-[#008fcc] transition-colors focus:outline-none bg-[#00A6ED]/5 px-4 py-2 rounded-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Share My Result
          </button>
        </div>
      </div>

      {/* Dimension Breakdown Card */}
      <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(13,44,84,0.06)] border border-[#0D2C54]/10 p-8 md:p-10">
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0D2C54] mb-2">Your Toxicity Dimensions</h3>
        <p className="text-slate-500 font-medium mb-8 text-sm md:text-base">
          Toxic friendships operate across multiple invisible layers. Here is your specific breakdown based on your answers:
        </p>

        <div className="space-y-6">
          <DimensionBar label="Friendship Victimization (Direct Harm)" score={data.mods.victimization} color="bg-[#d81159]" />
          <DimensionBar label="Relational Aggression (Social Harm)" score={data.mods.aggression} color="bg-[#ffbc42]" />
          <DimensionBar label="Manipulation & Control" score={data.mods.manipulation} color="bg-[#8f2d56]" />
          <DimensionBar label="Negative Quality (Low Support)" score={data.mods.quality} color="bg-[#00A6ED]" />
          <DimensionBar label="Antisocial Influence (Recklessness)" score={data.mods.antisocial} color="bg-slate-800" />
          
          <div className="border-t border-slate-100 pt-6 mt-8 space-y-6">
            <DimensionBar label="Your Vulnerability Factors" score={data.mods.vulnerability} color="bg-slate-400" />
            <DimensionBar label="Emotional Harm Impact" score={data.mods.impact} color="bg-rose-400" />
          </div>
        </div>
      </div>

      {/* HORMOZI-STYLE GRAND SLAM UPSELL CARD */}
      <div className="bg-[#0f172a] rounded-[24px] shadow-2xl border border-rose-500/30 p-8 md:p-10 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-8">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <MessageSquare className="w-4 h-4" /> The Playbook & Scripts
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Don't Know What To Say?</h3>
          <p className="text-slate-300 text-lg mb-6 font-medium">
            Stop stressing over how to set a boundary. Unlock your customized <strong>Tactical Playbook</strong> and get exact, copy-paste text scripts to handle this friendship without the drama.
          </p>
          <div className="flex items-center gap-2 text-sm text-green-400 font-bold mb-6 justify-center md:justify-start">
            <ShieldCheck className="w-5 h-5" /> Backed by our 7-Day Money-Back Guarantee
          </div>
        </div>

        <div className="w-full md:w-auto z-10 shrink-0">
          <button 
            onClick={() => setIsUnlocked(true)}
            className="w-full bg-[#ffbc42] hover:bg-[#e5a93c] hover:scale-105 text-black font-extrabold text-lg py-5 px-8 rounded-2xl transition-all shadow-[0_0_20px_rgba(255,188,66,0.3)]"
          >
            Unlock Playbook
          </button>
        </div>
      </div>

    </div>
  );
}
