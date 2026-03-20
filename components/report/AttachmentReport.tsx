"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { CheckCircle2, ShieldCheck, Activity, Heart, Briefcase, Users, Target, Sparkles, ArrowRight, LineChart } from "lucide-react";
import { generatePremiumReport } from "@/app/actions/generatePremiumReport";
import PremiumCheckout from "./PremiumCheckout";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: any;
  isDarkTheme?: boolean;
}

export default function AttachmentReport({ profile, demographics, isDarkTheme = false }: AttachmentReportProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const tH3 = isDarkTheme ? "text-[#ffffff]" : "text-[#000000]";
  const tText = isDarkTheme ? "text-[#e5e5e5]" : "text-[#14213d]";
  const cardClass = isDarkTheme ? "bg-[#14213d] border-[#000000] shadow-lg" : "bg-[#ffffff] border-[#e5e5e5] shadow-md";
  const pageBg = isDarkTheme ? "bg-[#000000]" : "bg-[#e5e5e5]";

  const relationshipStatus = demographics?.isSingle ? "Single" : "In a relationship";

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const handleUnlockEverything = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    try {
      const data = await generatePremiumReport(profile.attachment, demographics);
      
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
              <p className="font-black text-xl">THE MASTER AUDIT UNLOCKED</p>
              <p className="text-sm opacity-90 font-bold uppercase tracking-widest">Full Clinical Synthesis Complete</p>
            </div>
          </div>
        )}

        {/* Free Section */}
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

        {/* Premium Section */}
        {isPremium && premiumData ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* 1. Deep Validation */}
            <div className="bg-gradient-to-br from-[#0D2C54] to-[#14213d] text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 w-32 h-32 text-white/5 rotate-12 pointer-events-none" />
              <h2 className="text-3xl font-black mb-6 text-[#00A6ED]">The Truth About You</h2>
              <div className="text-lg md:text-xl font-medium leading-relaxed opacity-95 space-y-6" dangerouslySetInnerHTML={{ __html: premiumData.deepValidation }}></div>
            </div>

            {/* 2. The Bell Curve Graphic */}
            <div className={`p-8 md:p-10 rounded-3xl border-2 border-[#e5e5e5] dark:border-[#333] ${cardClass} overflow-hidden relative`}>
              <div className="flex items-center gap-3 mb-8">
                <LineChart className="w-8 h-8 text-[#00A6ED]" />
                <h2 className={`text-2xl font-black ${tH3}`}>The Normalcy Curve</h2>
              </div>
              <p className={`text-base font-medium mb-8 ${tText}`}>
                You are not broken. Look at the chart below. Most humans operate with some level of insecurity or trauma. You score in the <b>{premiumData.populationPercentile}th percentile</b> for attachment security.
              </p>
              
              <div className="relative w-full h-48 md:h-64 mt-4 mb-4">
                {/* Custom SVG Bell Curve */}
                <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
                  <defs>
                    <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00A6ED" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00A6ED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* The Curve Fill */}
                  <path 
                    d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200 Z" 
                    fill="url(#bellGradient)" 
                  />
                  {/* The Curve Line */}
                  <path 
                    d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200" 
                    fill="none" 
                    stroke="#00A6ED" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  
                  {/* Average Marker */}
                  <line x1="500" y1="20" x2="500" y2="200" stroke="#fca311" strokeWidth="2" strokeDasharray="6 6" />
                  <text x="500" y="15" textAnchor="middle" fill="#fca311" fontSize="14" fontWeight="bold">Average (50)</text>

                  {/* User Pin */}
                  <g style={{ transform: `translateX(${premiumData.populationPercentile * 10 - 500}px)`, transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                    <line x1="500" y1="20" x2="500" y2="200" stroke="#d81159" strokeWidth="3" />
                    <circle cx="500" cy="20" r="8" fill="#d81159" />
                    <text x="500" y="0" textAnchor="middle" fill="#d81159" fontSize="16" fontWeight="900">YOU ({premiumData.populationPercentile})</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* 3. The Details (Childhood, Romantic, Work) */}
            <div className="space-y-6">
              <div className={`p-8 md:p-10 rounded-3xl border-l-8 border-l-[#d81159] ${cardClass}`}>
                <div className="flex items-center gap-4 mb-6"><Users className="w-8 h-8 text-[#d81159]" /><h3 className={`text-2xl font-black ${tH3}`}>The Origin Print</h3></div>
                <div className={`text-lg leading-relaxed space-y-4 font-medium ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.childhoodPrint }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-3xl border-l-8 border-l-[#FFB400] ${cardClass}`}>
                <div className="flex items-center gap-4 mb-6"><Heart className="w-8 h-8 text-[#D97706]" /><h3 className={`text-2xl font-black ${tH3}`}>The Romantic Threat</h3></div>
                <div className={`text-lg leading-relaxed space-y-4 font-medium ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.romanticDanger }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-3xl border-l-8 border-l-[#00A6ED] ${cardClass}`}>
                <div className="flex items-center gap-4 mb-6"><Briefcase className="w-8 h-8 text-[#00A6ED]" /><h3 className={`text-2xl font-black ${tH3}`}>The Workplace Threat</h3></div>
                <div className={`text-lg leading-relaxed space-y-4 font-medium ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.workplaceDanger }}></div>
              </div>
            </div>

            {/* 4. Action Plan */}
            <div className={`p-8 md:p-12 rounded-3xl border-2 border-[#0D2C54] bg-[#f8fbff] dark:bg-[#000000]`}>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#0D2C54] dark:text-white"><Target className="w-8 h-8 text-[#00A6ED]" /> The Master Action Plan</h2>
              <div className={`text-lg leading-relaxed font-medium ${tText} [&>ol]:space-y-6 [&>ol]:list-none [&>ol]:p-0 [&>ol>li>b]:text-[#0D2C54] [&>ol>li>b]:dark:text-white [&>ol>li>b]:uppercase [&>ol>li>b]:text-sm [&>ol>li>b]:tracking-widest [&>ol>li>b]:block [&>ol>li>b]:mb-2 [&>ol>li]:bg-white [&>ol>li]:dark:bg-[#14213d] [&>ol>li]:p-6 [&>ol>li]:rounded-2xl [&>ol>li]:border [&>ol>li]:shadow-sm`} dangerouslySetInnerHTML={{ __html: premiumData.masterActionPlan }}></div>
            </div>

            {/* 5. The Cross-Sell Push */}
            <div className="bg-gradient-to-r from-[#d81159] to-[#8f2d56] p-1 rounded-3xl shadow-xl">
              <div className="bg-white dark:bg-[#14213d] p-8 md:p-10 rounded-[22px] text-center">
                <span className="inline-block py-1 px-4 rounded-full bg-rose-100 text-[#d81159] font-black text-xs tracking-widest uppercase mb-6">Your Next Target</span>
                <h3 className={`text-3xl font-black mb-4 ${tH3}`}>Take The "{premiumData.recommendedNextTest?.testName}" Test</h3>
                <p className={`text-lg font-medium max-w-2xl mx-auto mb-8 ${tText}`}>
                  {premiumData.recommendedNextTest?.psychologicalPitch}
                </p>
                <Link href={`/${premiumData.recommendedNextTest?.testId}`} className="inline-flex items-center justify-center gap-3 py-4 px-8 bg-[#d81159] hover:bg-[#b10f2e] text-white rounded-full font-black text-lg transition-transform hover:-translate-y-1 shadow-lg">
                  Start This Diagnostic Now <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="pt-8 pb-12"><SharePrintButtons /></div>
          </div>
        ) : (
          <PremiumCheckout 
            onUnlock={handleUnlockEverything} 
            isGenerating={isGenerating} 
            archetype={profile.attachment.general.classification}
            relationshipStatus={relationshipStatus}
            isDarkTheme={isDarkTheme} 
          />
        )}
      </div>
    </div>
  );
}
