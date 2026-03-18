"use client";

import React, { useState } from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { Lock, Unlock, Loader2, CheckCircle2, AlertTriangle, Sparkles, ShieldCheck } from "lucide-react";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: any;
  isDarkTheme?: boolean;
}

// 1. PRECISION SCORE BAR (Upgrades visually when Premium is unlocked)
const PrecisionScoreBar = ({ label, value, color, isPremium, type }: { label: string, value: number, color: string, isPremium: boolean, type: string }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1.5 items-end">
        <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
        {isPremium ? (
          <span className={`text-xs font-extrabold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 ${color.replace('bg-', 'text-')}`}>
            {value.toFixed(1)} / 100 <span className="text-slate-400 font-medium ml-1">(Top 15% for {type})</span>
          </span>
        ) : (
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{Math.round(value)}</span>
        )}
      </div>
      <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

export default function AttachmentReport({ profile, isDarkTheme = false }: AttachmentReportProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [hasJustUnlocked, setHasJustUnlocked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const bgCard = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";
  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  // 2. THE FUNCTIONAL UNLOCK BUTTON (Hits the AI API)
  const handleUnlockPremium = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/premium-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizType: "attachment-style",
          primaryArchetype: profile.attachment.general.classification,
          normalizedScores: {
             anxiety: profile.attachment.general.anxietyScore,
             avoidance: profile.attachment.general.avoidanceScore
          }
        }),
      });
      
      if (!response.ok) {
         alert(`API Connection Failed: ${response.status} ${response.statusText}\n\nCheck your Vercel logs or OpenAI API key.`);
         setIsGenerating(false);
         return;
      }

      const data = await response.json();
      if (data.success && data.report) {
        setPremiumData(data.report);
        setIsPremium(true);
        setHasJustUnlocked(true);
        setTimeout(() => setHasJustUnlocked(false), 5000);
      } else {
         alert("The AI returned an empty response. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to generate premium report", error);
      alert(`Network Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 3. THE SEDUCTIVE, SCARY CURIOSITY COPY
  const renderSeductiveTeaser = (classification: string) => (
    <div className="mt-8 p-6 rounded-xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
      <p className={`text-lg leading-relaxed mb-4 ${tText}`}>
        Your specific combination of scores exposes a highly active <strong className="text-red-600 dark:text-red-400">subconscious vulnerability scanner</strong> tied to your {classification} baseline. 
      </p>
      <p className={`text-lg leading-relaxed mb-4 ${tText}`}>
        Toxic personalities and emotionally unavailable partners instinctively detect this exact pattern. There is a hidden trigger buried in this profile that forces your nervous system to confuse anxiety with chemistry, effectively guaranteeing a cycle of self-sabotage if left unchecked.
      </p>
      <p className={`text-lg leading-relaxed font-bold ${tH3}`}>
        The full breakdown below reveals the exact name of this pattern, the specific relational drift you are causing, and the 3-step override script you must use starting tonight.
      </p>
    </div>
  );

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {/* Post-Purchase Success Banner */}
        {hasJustUnlocked && (
          <div className="mb-8 p-4 bg-green-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">🎉 Full results unlocked — your personalized breakdown is ready.</span>
          </div>
        )}

        {/* HERO INTRO & QUADRANT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${bgCard}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit border shadow-sm ${isDarkTheme ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
              <ShieldCheck className="w-4 h-4" /> Trusted Psychological Battery
            </div>
            <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${tH3}`}>
              Your Subconscious Profile
            </h2>
            <p className={`text-lg font-medium leading-relaxed ${tText}`}>
              We have processed your data and identified your baseline metrics. However, your scores indicate a high probability of repeating past relational trauma loops.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {/* THE UNIFIED CARD: GENERAL ATTACHMENT */}
        <div className={`rounded-3xl border ${bgCard} overflow-hidden mb-12`}>
          
          {/* VISIBLE FREE TIER SECTION */}
          <div className="p-8 md:p-10 border-b border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-2">How You Operate (General)</h4>
            <h2 className={`text-4xl md:text-5xl font-black mb-8 ${profile.attachment.general.classification.includes('Anxious') ? 'text-purple-500' : 'text-blue-500'}`}>
              {profile.attachment.general.classification}
            </h2>

            {/* Progress Bars */}
            <div className="space-y-6 mb-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <PrecisionScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-purple-500" isPremium={isPremium} type={profile.attachment.general.classification} />
              <PrecisionScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color={isDarkTheme ? "bg-slate-400" : "bg-slate-800"} isPremium={isPremium} type={profile.attachment.general.classification} />
            </div>

            {/* The Persuasion Teaser Block */}
            {!isPremium && renderSeductiveTeaser(profile.attachment.general.classification)}
          </div>

          {/* PREMIUM / BLURRED TIER SECTION */}
          <div className="relative p-8 md:p-10 bg-slate-50/50 dark:bg-slate-900/20">
            
            {/* IF NOT PREMIUM: Show Blur Overlay & Button */}
            {!isPremium && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/60 backdrop-blur-[6px]">
                <div className={`p-8 rounded-2xl border text-center shadow-2xl max-w-md w-full mx-4 ${isDarkTheme ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <Lock className="w-12 h-12 mx-auto mb-4 text-red-500" />
                  <h3 className={`text-2xl font-extrabold mb-2 ${tH3}`}>Unlock Extraction Blueprint</h3>
                  <p className={`mb-6 font-medium ${tText}`}>Access your AI-generated psychological profile and 3-step intervention plan.</p>
                  
                  <button 
                    onClick={handleUnlockPremium}
                    disabled={isGenerating}
                    className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-extrabold text-lg transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
                  >
                    {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin" /> Unlocking...</> : "Unlock My Results Now"}
                  </button>
                </div>
              </div>
            )}

            {/* THE CONTENT (Blurred if free, clear if premium) */}
            <div className={`space-y-10 ${!isPremium ? 'filter blur-[5px] select-none pointer-events-none opacity-40' : 'animate-in fade-in slide-in-from-bottom-4 duration-700'}`}>
              
              {isPremium && premiumData ? (
                <>
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>
                      <Sparkles className="w-6 h-6" /> The Clinical Validation
                    </h3>
                    <p className={`text-lg leading-relaxed ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.validationLayer }}></p>
                  </div>

                  <div className="p-6 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                    <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`}>
                      <AlertTriangle className="w-5 h-5" /> The Silent Drift Pattern
                    </h3>
                    <p className={`text-lg leading-relaxed ${tText}`}>{premiumData.fearLayer}</p>
                  </div>

                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      The Override Protocol
                    </h3>
                    <div className={`text-lg space-y-4 leading-relaxed ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.hopeLayer }}></div>
                  </div>
                </>
              ) : (
                // DUMMY TEXT TO BLUR
                <div className="space-y-8">
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>The Clinical Validation</h3>
                    <p className={`text-lg ${tText}`}>Your Anxiety score of 39 places you in the top 20% for emotional resilience. You have a highly tuned radar for shifts in emotional energy, which makes you an incredibly empathetic and loyal partner. This is a profound strength that most people lack.</p>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-3 ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`}>The Silent Drift Pattern</h3>
                    <p className={`text-lg ${tText}`}>However, your Avoidance score of 44 combined with Anxiety at 39 creates a silent drift pattern. This is not a flaw. This is a learned strategy that once protected you — but is now costing you deep intimacy. You won't explode, you'll slowly emotionally disappear.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <SharePrintButtons />
      </div>
    </div>
  );
}
