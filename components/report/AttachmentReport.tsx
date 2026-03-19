"use client";

import React, { useState } from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { CheckCircle2, Sparkles, AlertTriangle, Terminal, MessageSquare, ListChecks, ShieldCheck } from "lucide-react";
import { generatePremiumReport } from "@/app/actions/generatePremiumReport";
import PremiumCheckout from "./PremiumCheckout";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: any;
  isDarkTheme?: boolean;
}

export default function AttachmentReport({ profile, isDarkTheme = false }: AttachmentReportProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const tH3 = isDarkTheme ? "text-[#ffffff]" : "text-[#000000]";
  const tText = isDarkTheme ? "text-[#e5e5e5]" : "text-[#14213d]";
  const cardClass = isDarkTheme ? "bg-[#14213d] border-[#000000] shadow-lg" : "bg-[#ffffff] border-[#e5e5e5] shadow-md";
  const pageBg = isDarkTheme ? "bg-[#000000]" : "bg-[#e5e5e5]";

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const handleUnlockEverything = async () => {
    setIsGenerating(true);
    // Simulate "Processing Payment" for 1.5s for psychological impact
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const data = await generatePremiumReport(
        profile.attachment.general.classification,
        profile.attachment.general.anxietyScore,
        profile.attachment.general.avoidanceScore
      );
      
      if (data.success && data.report) {
        setPremiumData(data.report);
        setIsPremium(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
         alert(`Connection Error: ${data.error}`);
      }
    } catch (error: any) {
      alert(`Network Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${pageBg} py-12 border-t ${isDarkTheme ? 'border-[#000000]' : 'border-[#e5e5e5]'}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {isPremium && (
          <div className="mb-10 p-5 bg-[#14213d] border-2 border-[#fca311] text-[#fca311] rounded-2xl shadow-2xl flex items-center justify-center gap-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-black text-xl">THE EXTRACTION BLUEPRINT UNLOCKED</p>
              <p className="text-sm opacity-90 font-bold uppercase tracking-widest">Authorized Clinical Access Granted</p>
            </div>
          </div>
        )}

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
             <div className="flex items-center gap-2 mb-6 text-[#9d0208] font-black uppercase text-xs tracking-tighter">
               <ShieldCheck className="w-4 h-4 text-[#fca311]" /> Clinical Attachment Analysis
             </div>
            <h2 className={`text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight ${tH3}`}>
              Your Psychological Blueprints
            </h2>
            <p className={`text-lg font-medium leading-relaxed ${tText}`}>
              Final results compiled from 92 clinical markers. Follow the protocols below to disrupt repeating cycles.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {/* UNLOCKED MASTER ANALYSIS */}
        {isPremium && premiumData ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* 1. THE HARSH TRUTH */}
            <div className={`p-8 md:p-12 rounded-3xl border-l-8 border-l-[#9d0208] ${cardClass}`}>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#9d0208]">
                <AlertTriangle className="w-8 h-8" /> 1. The Harsh Truth
              </h2>
              <div className={`text-lg md:text-xl leading-relaxed space-y-6 font-medium ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.harshTruth }}></div>
            </div>

            {/* 2. THE TACTICAL PLAYBOOK */}
            <div className={`p-8 md:p-12 rounded-3xl border-l-8 border-l-[#fca311] ${cardClass}`}>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#fca311]">
                <ListChecks className="w-8 h-8" /> 2. The Playbook
              </h2>
              <div className={`text-lg md:text-xl leading-relaxed space-y-6 font-medium ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.tacticalPlaybook }}></div>
            </div>

            {/* 3. TEXT SCRIPTS */}
            <div className={`p-8 md:p-12 rounded-3xl border-l-8 border-l-[#14213d] bg-[#14213d] text-white`}>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#fca311]">
                <MessageSquare className="w-8 h-8" /> 3. Text Scripts
              </h2>
              <div className="text-lg md:text-xl leading-relaxed space-y-6 font-mono opacity-90" dangerouslySetInnerHTML={{ __html: premiumData.textScripts }}></div>
            </div>

            <div className="pt-8"><SharePrintButtons /></div>
          </div>
        ) : (
          /* FREE VIEW WITH CHECKOUT */
          <div className="animate-in fade-in duration-700">
            <div className={`rounded-3xl border p-8 md:p-10 mb-12 ${cardClass}`}>
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#fca311] mb-6">Verified Master Profile</h4>
              <h2 className={`text-4xl md:text-5xl font-black mb-8 ${tH3}`}>{profile.attachment.general.classification}</h2>
              <div className={`space-y-6 p-6 rounded-2xl border ${isDarkTheme ? 'bg-[#000000]/50 border-[#000000]' : 'bg-[#e5e5e5]/30 border-[#e5e5e5]'}`}>
                <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#fca311]" />
                <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color="bg-[#fca311]" />
              </div>
            </div>

            <PremiumCheckout onUnlock={handleUnlockEverything} isGenerating={isGenerating} isDarkTheme={isDarkTheme} />
          </div>
        )}
      </div>
    </div>
  );
}
