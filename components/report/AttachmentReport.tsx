"use client";

import React, { useState } from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { CheckCircle2, ShieldCheck, Activity, Crosshair, Zap, FileText } from "lucide-react";
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
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    try {
      const data = await generatePremiumReport(
        profile.attachment.general.classification,
        profile.attachment.general.anxietyScore,
        profile.attachment.general.avoidanceScore
      );
      
      if (data && data.success && data.report) {
        setPremiumData(data.report);
        setIsPremium(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
         alert(`AI Generation Failed: ${data?.error || "Unknown Error"}`);
      }
    } catch (error: any) {
      alert(`Server Action Network Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderDomainScores = (title: string, data: any) => (
    <div className={`p-4 rounded-xl border ${isDarkTheme ? 'bg-[#000000]/40 border-[#ffffff]/10' : 'bg-[#f8fbff] border-[#00A6ED]/20'}`}>
      <h4 className={`text-sm font-black uppercase tracking-wider mb-4 ${isDarkTheme ? 'text-[#fca311]' : 'text-[#0D2C54]'}`}>{title}</h4>
      <div className="space-y-4">
        <ScoreBar label="Anxiety" value={data.anxietyScore} color={isDarkTheme ? "bg-[#fca311]" : "bg-[#d81159]"} />
        <ScoreBar label="Avoidance" value={data.avoidanceScore} color={isDarkTheme ? "bg-[#fca311]" : "bg-[#00A6ED]"} />
      </div>
    </div>
  );

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${pageBg} py-12 border-t ${isDarkTheme ? 'border-[#000000]' : 'border-[#e5e5e5]'}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {isPremium && (
          <div className="mb-10 p-5 bg-[#14213d] border-2 border-[#fca311] text-[#fca311] rounded-2xl shadow-2xl flex items-center justify-center gap-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-black text-xl">THE SUBCONSCIOUS REWIRE PROTOCOL UNLOCKED</p>
              <p className="text-sm opacity-90 font-bold uppercase tracking-widest">Authorized Clinical Access Granted</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-12">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
             <div className="flex items-center gap-2 mb-6 text-[#9d0208] font-black uppercase text-xs tracking-tighter">
               <Activity className="w-5 h-5 text-[#fca311]" /> Clinical Baseline Found
             </div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#fca311] mb-2">Primary Archetype</h4>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight ${tH3}`}>
              {profile.attachment.general.classification}
            </h2>
            <p className={`text-lg font-medium leading-relaxed ${tText}`}>
              Your psychological blueprint has been mapped. See exactly how your nervous system responds to closeness, stress, and abandonment below.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {!isPremium && (
          <div className={`rounded-3xl border p-8 md:p-10 mb-12 ${cardClass} animate-in fade-in duration-700`}>
             <h3 className={`text-2xl font-black mb-6 flex items-center gap-3 ${tH3}`}>
               <ShieldCheck className="w-6 h-6 text-[#fca311]" /> Granular Subconscious Mapping
             </h3>
             <p className={`mb-8 font-medium ${tText}`}>
               Attachment isn't one-size-fits-all. Our AI has isolated exactly how your triggers change depending on who you are dealing with.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {renderDomainScores("General Baseline", profile.attachment.general)}
               {renderDomainScores("Romantic Partners", profile.attachment.romantic)}
               {renderDomainScores("Maternal Figure", profile.attachment.mother)}
               {renderDomainScores("Paternal Figure", profile.attachment.father)}
             </div>
          </div>
        )}

        {isPremium && premiumData ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* Module 1: Reality Check */}
            <div className={`p-8 md:p-12 rounded-3xl border-t-4 border-t-[#d81159] shadow-2xl relative ${cardClass}`}>
              <div className="absolute top-0 right-0 bg-[#d81159] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg">Module 1</div>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#d81159]"><Crosshair className="w-8 h-8" /> The Clinical Reality Check</h2>
              <div className={`text-lg leading-relaxed space-y-6 font-medium ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.harshTruth }}></div>
            </div>

            {/* Module 2: The Playbook */}
            <div className={`p-8 md:p-12 rounded-3xl border-t-4 border-t-[#FFB400] shadow-2xl relative ${cardClass}`}>
               <div className="absolute top-0 right-0 bg-[#FFB400] text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg">Module 2</div>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#D97706]"><Zap className="w-8 h-8 fill-current" /> The Extraction Playbook</h2>
              <div className={`text-lg leading-relaxed space-y-6 font-medium ${tText} [&>ol]:space-y-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li>b]:text-[#D97706]`} dangerouslySetInnerHTML={{ __html: premiumData.tacticalPlaybook }}></div>
            </div>

            {/* Module 3: Lethal Scripts */}
            <div className={`p-8 md:p-12 rounded-3xl border-t-4 border-t-[#00A6ED] shadow-2xl relative ${isDarkTheme ? 'bg-[#14213d]' : 'bg-[#0D2C54]'} text-white`}>
              <div className="absolute top-0 right-0 bg-[#00A6ED] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg">Module 3</div>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#00A6ED]"><FileText className="w-8 h-8" /> Lethal Text Scripts</h2>
              <div className="text-lg leading-relaxed space-y-6 font-medium opacity-95 [&>blockquote]:border-l-4 [&>blockquote]:border-[#00A6ED] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:bg-black/20 [&>blockquote]:py-3 [&>blockquote]:pr-4 [&>blockquote]:rounded-r-lg" dangerouslySetInnerHTML={{ __html: premiumData.textScripts }}></div>
            </div>

            <div className="pt-8"><SharePrintButtons /></div>
          </div>
        ) : (
          <PremiumCheckout onUnlock={handleUnlockEverything} isGenerating={isGenerating} isDarkTheme={isDarkTheme} />
        )}
      </div>
    </div>
  );
}
