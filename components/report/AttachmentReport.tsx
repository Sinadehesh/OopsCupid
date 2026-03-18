"use client";

import React, { useState } from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
// FIXED: Added 'Unlock' to the imports below so TypeScript doesn't crash the build
import { ShieldCheck, Lock, Unlock, AlertTriangle, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: { isSingle: boolean; gender: string; hasChildren: boolean; };
  isDarkTheme?: boolean;
}

export default function AttachmentReport({ profile, demographics, isDarkTheme = false }: AttachmentReportProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

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
         alert(`API Error: ${response.statusText}. Please check logs.`);
         setIsGenerating(false);
         return;
      }

      const data = await response.json();
      if (data.success && data.report) {
        setPremiumData(data.report);
        setIsPremium(true);
      }
    } catch (error: any) {
      console.error("Failed", error);
      alert(`Network Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderSeductiveCopy = (domainName: string, classification: string) => {
    return (
      <div className="mt-4 flex flex-col h-full">
        <p className={`text-lg font-medium leading-relaxed mb-4 ${tText}`}>
          Your scores expose a highly specific <strong className="text-red-500 dark:text-red-400">vulnerability loop</strong> tied to your {classification} baseline. Toxic personalities and emotionally unavailable partners subconsciously detect this exact pattern.
        </p>
        <p className={`text-lg font-medium leading-relaxed mb-8 ${tText}`}>
          There is a hidden trigger in your profile that forces your nervous system to confuse anxiety with chemistry, guaranteeing a cycle of self-sabotage.
        </p>
        
        <div className="mt-auto">
          <button 
             onClick={handleUnlockPremium}
             disabled={isGenerating}
             className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-lg transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
          >
             {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
             {isGenerating ? "Analyzing Patterns..." : "Unlock The Extraction Blueprint"}
          </button>
        </div>
      </div>
    );
  };

  const dummyBlurText = "This section contains a deep clinical analysis of your psychological patterns. It explains exactly how your nervous system reacts to specific triggers. Unlocking this reveals the exact step-by-step strategies needed to rewire your responses and achieve secure attachment. Do not ignore these red flags.";
  const primarySchema = profile.schemas && profile.schemas.length > 0 ? profile.schemas[0].name : "Fear of Abandonment";
  const loveStyle = profile.loveStyle || "Pragma (Practical)";

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        
        {isPremium && (
          <div className="mb-10 p-4 bg-green-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">Blueprint Unlocked. Scroll down to view your results.</span>
          </div>
        )}

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16 md:mb-24">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit border shadow-sm ${isDarkTheme ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
              <ShieldCheck className="w-4 h-4" />
              Trusted by Millions Worldwide
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${tH3}`}>
              Your Complete<br />Attachment Profile
            </h2>
            <p className={`text-base md:text-lg font-medium leading-relaxed mb-8 ${tText}`}>
              Your preliminary results are ready. We have identified your primary survival strategies and baseline metrics. However, the exact psychological drivers and extraction plans are restricted to the Premium Analysis.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {!isPremium ? (
          <>
            <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
              The Gateway Analysis
            </h3>
            
            <div className="space-y-12 md:space-y-16">
              
              {/* GENERAL ATTACHMENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">General Attachment Style</h4>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#a855f7] mb-8">{profile.attachment.general.classification}</h2>
                  <div className="space-y-5 mb-8">
                    <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
                    <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                  </div>
                  {renderSeductiveCopy("General", profile.attachment.general.classification)}
                </div>
                <div onClick={handleUnlockPremium} className="cursor-pointer group relative transition-transform hover:-translate-y-1">
                  <LockedInsightCard title={`The ${profile.attachment.general.classification} Playbook`} teaser="A tactical deep dive into the exact mind games your brain plays on you, and the copy-paste scripts you need to set boundaries today." blurredBody={dummyBlurText} isDarkTheme={isDarkTheme} />
                </div>
              </div>

              {/* ROMANTIC ATTACHMENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Romantic Attachment Style</h4>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#ef4444] mb-8">{profile.attachment.romantic.classification}</h2>
                  <div className="space-y-5 mb-8">
                    <ScoreBar label="Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#ef4444]" />
                    <ScoreBar label="Anxiety" value={profile.attachment.romantic.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                  </div>
                  {renderSeductiveCopy("Romantic", profile.attachment.romantic.classification)}
                </div>
                <div onClick={handleUnlockPremium} className="cursor-pointer group relative transition-transform hover:-translate-y-1">
                  <LockedInsightCard title="Who You Magnetically Attract" teaser={`See exactly which toxic personalities naturally target your ${profile.attachment.romantic.classification} traits, why they target you, and the exact red flags you are ignoring.`} blurredBody={dummyBlurText} isDarkTheme={isDarkTheme} />
                </div>
              </div>

              {/* CAREGIVERS + TRAUMA LOOP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
                <div className="flex flex-col gap-8 lg:gap-12 h-full">
                  <div className={`rounded-3xl border p-8 md:p-10 flex-1 ${cardClass}`}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Maternal Figure</h3>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#8b5cf6] mb-6">{profile.attachment.mother.classification}</h2>
                    <div className="space-y-4">
                      <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
                      <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                    </div>
                  </div>
                  <div className={`rounded-3xl border p-8 md:p-10 flex-1 ${cardClass}`}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Paternal Figure</h3>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#fb923c] mb-6">{profile.attachment.father.classification}</h2>
                    <div className="space-y-4">
                      <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
                      <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                    </div>
                  </div>
                </div>
                <div onClick={handleUnlockPremium} className="cursor-pointer group relative transition-transform hover:-translate-y-1">
                  <LockedInsightCard title="The Hidden Trauma Loop" teaser={`You scored high for '${primarySchema}'. Discover the exact childhood events that programmed this trigger and the psychology of how to delete it.`} blurredBody={dummyBlurText} isDarkTheme={isDarkTheme} />
                </div>
              </div>
            </div>

            <div className="mt-16">
               <UnlockBanner />
               <SharePrintButtons />
            </div>
          </>
        ) : (
          <div className="mt-16 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className={`p-8 md:p-12 rounded-3xl border shadow-xl ${cardClass}`}>
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10" /> The Clinical Validation
                 </h2>
                 <div className={`text-lg md:text-xl leading-relaxed space-y-6 ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.validationLayer }}></div>
             </div>

             <div className="p-8 md:p-12 rounded-3xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 shadow-xl">
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-8 h-8 md:w-10 md:h-10" /> The Silent Sabotage Pattern
                 </h2>
                 <div className={`text-lg md:text-xl leading-relaxed space-y-6 ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.fearLayer }}></div>
             </div>

             <div className={`p-8 md:p-12 rounded-3xl border shadow-xl ${cardClass}`}>
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                    <Unlock className="w-8 h-8 md:w-10 md:h-10" /> Your Override Protocol
                 </h2>
                 <div className={`text-lg md:text-xl leading-relaxed space-y-6 ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.hopeLayer }}></div>
             </div>
             
             <SharePrintButtons />
          </div>
        )}

      </div>
    </div>
  );
}
