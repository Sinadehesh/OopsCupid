"use client";
import React, { useState, useEffect } from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldAlert, Lock, HandCoins, AlertTriangle, Sparkles } from "lucide-react";

export default function FriendUsedMasterReport({ profile }: any) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isPremium = profile?.premiumUnlocked || false;
  const [aiReport, setAiReport] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleUnlock = async () => {
    setIsRedirecting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizType: "are-your-friends-using-you" }),
      });
      const data = await res.json();
      
      if (data.url) {
         window.location.href = data.url;
      } else {
         alert("Checkout failed to generate URL.");
         setIsRedirecting(false);
      }
    } catch (err) {
      console.error(err);
      setIsRedirecting(false);
    }
  };

  useEffect(() => {
    if (isPremium && !aiReport && !isGenerating) {
      const fetchAIData = async () => {
        setIsGenerating(true);
        try {
          const res = await fetch("/api/premium-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quizType: "are-your-friends-using-you",
              primaryArchetype: profile.primaryArchetype,
              secondaryArchetype: profile.secondaryArchetype,
              useRiskIndex: profile.useRiskIndex,
              normalizedScores: profile.normalizedScores
            }),
          });
          const data = await res.json();
          if (data.success) setAiReport(data.report);
        } catch (err) {
          console.error("AI Fetch Error:", err);
        } finally {
          setIsGenerating(false);
        }
      };
      fetchAIData();
    }
  }, [isPremium, profile, aiReport, isGenerating]);

  const colors = {
    bgMain: "bg-[#0f172a]", 
    bgCard: "bg-[#1e293b]",     
    borderCard: "border-[#334155]", 
    textPrimary: "text-[#f8fafc]",  
    textSecondary: "text-[#94a3b8]",
    accentEmerald: "#10b981",
    accentRed: "#ef4444"
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#ef4444";
    if (score >= 50) return "#f59e0b";
    if (score >= 25) return "#3b82f6";
    return "#10b981";
  };

  const ARCHETYPES: Record<string, { hook: string, prediction: string }> = {
    "The Generous Anchor": { hook: "I’m the one everyone leans on — and sometimes takes for granted.", prediction: "You provide massive stability to your group, but your data shows a severe lack of boundary enforcement." },
    "The Overleveraged Helper": { hook: "I give more than I receive — time to rebalance.", prediction: "Your friendship dynamic is fundamentally lopsided. Your time and resources are systematically drained." },
    "The Unseen Sponsor": { hook: "People benefit from my connections and resources more than they thank me.", prediction: "Your circle is leveraging your status or finances. They are here for what you provide." },
    "The Emotional ATM": { hook: "I’m the group’s emotional bank — often robbed.", prediction: "You are dealing with high emotional labor extraction. They use you for free therapy." },
    "The Conditional Companion": { hook: "Friends are there when it’s useful — but disappear when it isn’t.", prediction: "Your friendships operate on highly conditional terms. In quiet moments, you are on your own." },
    "The Boundary Blur": { hook: "My lines are fuzzy and people cross them.", prediction: "Your primary vulnerability is an inability to hold a line. Friends have learned they can push you." },
    "The Reliable One (but Burned)": { hook: "I always show up — and get burned.", prediction: "You hold a strict standard of loyalty that your friends simply do not return." },
    "The Financial Magnet": { hook: "I’m frequently expected to foot the bill.", prediction: "The data shows intense exploitation of your finances. Friends assume you will always pay." },
    "The Dependent Trap": { hook: "A friend keeps me close by making me feel I owe them.", prediction: "The data flags high manipulation. Someone is trying to keep you emotionally tethered." },
    "The Strategic Networker": { hook: "People orbit me for access — but relationships can still be fair.", prediction: "You attract status-seekers, but you maintain boundaries well enough to keep it balanced." }
  };

  const currentArchetype = ARCHETYPES[profile?.primaryArchetype] || ARCHETYPES["The Generous Anchor"];

  const CustomLockedCard = ({ title, teaser, aiKey, isAlert = false }: any) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[#10b981] mb-4 flex items-center gap-2`}>
            <Sparkles className="w-4 h-4" /> Premium Analysis
          </h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          {isGenerating ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            </div>
          ) : (
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {aiReport && aiReport[aiKey] ? aiReport[aiKey] : "Analysis data loaded."}
            </p>
          )}
        </div>
      );
    }
    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-lg`}>
        <div className="filter blur-[6px] opacity-30 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <div className="w-full h-4 bg-[#334155] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#334155] rounded mb-2"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0f172a]/80 backdrop-blur-sm">
          <div className={`w-14 h-14 ${isAlert ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'} rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Lock className="w-6 h-6" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button 
            onClick={handleUnlock} 
            disabled={isRedirecting} 
            className={`px-6 py-3 rounded-full font-bold text-sm ${isAlert ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white shadow-lg transition-colors disabled:opacity-70`}
          >
            {isRedirecting ? "Securely redirecting..." : "Unlock Full Analysis"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center ${colors.bgCard} ${colors.borderCard} shadow-2xl relative overflow-hidden mb-8`}>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#0f172a] border border-[#334155] text-white">
                  <HandCoins className="w-4 h-4 text-[#10b981]" /> TRANSACTIONAL AUDIT COMPLETE
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  Primary Role: <span className="text-[#10b981]">{profile?.primaryArchetype}</span>
                </h2>
                <p className="text-xl text-emerald-400 font-medium italic mb-6">"{currentArchetype.hook}"</p>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">{currentArchetype.prediction}</p>
             </div>
             <div className="shrink-0 rounded-3xl border p-8 bg-[#0f172a] border-[#334155] text-center">
                <CircularScore value={profile?.useRiskIndex || 0} title="" color={getSeverityColor(profile?.useRiskIndex || 0)} isDarkTheme={true} />
                <span className="text-2xl font-bold text-white block mt-4">Risk: {profile?.useRiskIndex || 0}%</span>
             </div>
          </div>
        </div>

        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard}`}>
              <h2 className={`text-3xl font-extrabold ${colors.textPrimary} mb-6`}>Where You Lose</h2>
              <div className="space-y-6">
                <ScoreBar label="Emotional Labor" value={profile?.normalizedScores?.["Emotional Labor"] || 0} color="bg-[#3b82f6]" />
                <ScoreBar label="Reciprocity Deficit" value={profile?.normalizedScores?.["Reciprobalance"] || 0} color="bg-[#f59e0b]" />
                <ScoreBar label="Manipulation" value={profile?.normalizedScores?.["Manipulation"] || 0} color="bg-[#ef4444]" />
              </div>
            </div>
            
            <CustomLockedCard 
              title="The Psychological Cold Read" 
              aiKey="theColdRead" 
              teaser="A deep, unfiltered analysis of exactly why you attract this dynamic, and the hidden fears driving your compliance." 
            />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard 
               title="The Harsh Truth (Red Flags)" 
               aiKey="theHarshTruth" 
               teaser="The specific, undeniable behavioral loops your friends are using to keep you in your place." 
               isAlert={true}
             />
             <CustomLockedCard 
               title="The Tactical Playbook & Scripts" 
               aiKey="tacticalPlaybook" 
               teaser="A step-by-step psychological protocol and copy-paste text messages to reclaim your power." 
             />
          </div>
        </div>
        {!isPremium && <div className="mt-20"><UnlockBanner /></div>}
      </div>
    </div>
  );
}
