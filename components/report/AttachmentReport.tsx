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

  // Phase 1 High Contrast Palette
  const bgPage = "bg-[#fff1d0]";
  const textPrimary = "text-[#086788]";
  const textSecondary = "text-[#086788]/80";
  const bgCard = "bg-white border-[#d6d2d2]";

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

  const renderDomainScores = (title: string, data: any, colorCode: string) => (
    <div className={`p-4 rounded-xl border border-[#d6d2d2] bg-white`}>
      <h4 className={`text-sm font-black uppercase tracking-wider mb-4 text-[#086788]`}>{title}</h4>
      <div className="space-y-4">
        <ScoreBar label="Anxiety" value={data.anxietyScore} color={`bg-[${colorCode}]`} />
        <ScoreBar label="Avoidance" value={data.avoidanceScore} color={`bg-[#086788]`} />
      </div>
    </div>
  );

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${bgPage} py-12 border-t border-[#d6d2d2]`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {isPremium && (
          <div className="mb-10 p-5 bg-white border-2 border-[#06aed5] text-[#06aed5] rounded-2xl shadow-lg flex items-center justify-center gap-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-black text-xl text-[#086788]">THE MASTER AUDIT UNLOCKED</p>
              <p className="text-sm font-bold uppercase tracking-widest text-[#086788]/60">Full Clinical Synthesis Complete</p>
            </div>
          </div>
        )}

        {/* Free Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-12">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full shadow-sm ${bgCard}`}>
             <div className="flex items-center gap-2 mb-6 text-[#06aed5] font-black uppercase text-xs tracking-tighter">
               <Activity className="w-5 h-5 text-[#f0c808]" /> Clinical Baseline Found
             </div>
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#086788]/50 mb-2">Primary Archetype</h4>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight ${textPrimary}`}>
              {profile.attachment.general.classification}
            </h2>
            <p className={`text-lg font-medium leading-relaxed ${textSecondary}`}>
              Your psychological blueprint has been mapped. See exactly how your nervous system responds to closeness, stress, and abandonment below.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {!isPremium && (
          <div className={`rounded-3xl border p-8 md:p-10 mb-12 shadow-sm animate-in fade-in duration-700 ${bgCard}`}>
             <h3 className={`text-2xl font-black mb-6 flex items-center gap-3 ${textPrimary}`}>
               <ShieldCheck className="w-6 h-6 text-[#06aed5]" /> Granular Subconscious Mapping
             </h3>
             <p className={`mb-8 font-medium ${textSecondary}`}>
               Attachment isn't one-size-fits-all. Our AI has isolated exactly how your triggers change depending on who you are dealing with.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {renderDomainScores("General Baseline", profile.attachment.general, "#06aed5")}
               {renderDomainScores("Romantic Partners", profile.attachment.romantic, "#dd1c1a")}
               {renderDomainScores("Maternal Figure", profile.attachment.mother, "#f686bd")}
               {renderDomainScores("Paternal Figure", profile.attachment.father, "#fe5d9f")}
             </div>
          </div>
        )}

        {/* Premium Section */}
        {isPremium && premiumData ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* 1. Deep Validation */}
            <div className="bg-[#086788] text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 w-32 h-32 text-white/5 rotate-12 pointer-events-none" />
              <h2 className="text-3xl font-black mb-6 text-[#f0c808]">The Truth About You</h2>
              <div className="text-lg md:text-xl font-medium leading-relaxed opacity-95 space-y-6" dangerouslySetInnerHTML={{ __html: premiumData.deepValidation }}></div>
            </div>

            {/* 2. The Bell Curve Graphic */}
            <div className={`p-8 md:p-10 rounded-3xl border shadow-sm ${bgCard} overflow-hidden relative`}>
              <div className="flex items-center gap-3 mb-8">
                <LineChart className="w-8 h-8 text-[#06aed5]" />
                <h2 className={`text-2xl font-black ${textPrimary}`}>The Normalcy Curve</h2>
              </div>
              <p className={`text-base font-medium mb-8 ${textSecondary}`}>
                You are not broken. Look at the chart below. Most humans operate with some level of insecurity or trauma. You score in the <b>{premiumData.populationPercentile}th percentile</b> for attachment security.
              </p>
              
              <div className="relative w-full h-48 md:h-64 mt-4 mb-4">
                <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
                  <defs>
                    <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06aed5" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06aed5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200 Z" fill="url(#bellGradient)" />
                  <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200" fill="none" stroke="#06aed5" strokeWidth="4" strokeLinecap="round"/>
                  
                  <line x1="500" y1="20" x2="500" y2="200" stroke="#086788" strokeWidth="2" strokeDasharray="6 6" opacity="0.5"/>
                  <text x="500" y="15" textAnchor="middle" fill="#086788" fontSize="14" fontWeight="bold">Average (50)</text>

                  <g style={{ transform: `translateX(${premiumData.populationPercentile * 10 - 500}px)`, transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                    <line x1="500" y1="20" x2="500" y2="200" stroke="#dd1c1a" strokeWidth="3" />
                    <circle cx="500" cy="20" r="8" fill="#dd1c1a" />
                    <text x="500" y="0" textAnchor="middle" fill="#dd1c1a" fontSize="16" fontWeight="900">YOU ({premiumData.populationPercentile})</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* 3. The Details (Childhood, Romantic, Work) */}
            <div className="space-y-6">
              <div className={`p-8 md:p-10 rounded-3xl border-l-8 border-l-[#f686bd] ${bgCard}`}>
                <div className="flex items-center gap-4 mb-6"><Users className="w-8 h-8 text-[#f686bd]" /><h3 className={`text-2xl font-black ${textPrimary}`}>The Origin Print</h3></div>
                <div className={`text-lg leading-relaxed space-y-4 font-medium ${textSecondary}`} dangerouslySetInnerHTML={{ __html: premiumData.childhoodPrint }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-3xl border-l-8 border-l-[#dd1c1a] ${bgCard}`}>
                <div className="flex items-center gap-4 mb-6"><Heart className="w-8 h-8 text-[#dd1c1a]" /><h3 className={`text-2xl font-black ${textPrimary}`}>The Romantic Threat</h3></div>
                <div className={`text-lg leading-relaxed space-y-4 font-medium ${textSecondary}`} dangerouslySetInnerHTML={{ __html: premiumData.romanticDanger }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-3xl border-l-8 border-l-[#06aed5] ${bgCard}`}>
                <div className="flex items-center gap-4 mb-6"><Briefcase className="w-8 h-8 text-[#06aed5]" /><h3 className={`text-2xl font-black ${textPrimary}`}>The Workplace Threat</h3></div>
                <div className={`text-lg leading-relaxed space-y-4 font-medium ${textSecondary}`} dangerouslySetInnerHTML={{ __html: premiumData.workplaceDanger }}></div>
              </div>
            </div>

            {/* 4. Action Plan */}
            <div className={`p-8 md:p-12 rounded-3xl border-2 border-[#086788] bg-white shadow-xl`}>
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-[#086788]"><Target className="w-8 h-8 text-[#06aed5]" /> The Master Action Plan</h2>
              <div className={`text-lg leading-relaxed font-medium ${textSecondary} [&>ol]:space-y-6 [&>ol]:list-none [&>ol]:p-0 [&>ol>li>b]:text-[#086788] [&>ol>li>b]:uppercase [&>ol>li>b]:text-sm [&>ol>li>b]:tracking-widest [&>ol>li>b]:block [&>ol>li>b]:mb-2 [&>ol>li]:bg-[#fff1d0]/50 [&>ol>li]:p-6 [&>ol>li]:rounded-2xl [&>ol>li]:border [&>ol>li]:border-[#d6d2d2]`} dangerouslySetInnerHTML={{ __html: premiumData.masterActionPlan }}></div>
            </div>

            {/* 5. The Cross-Sell Push (Urgency/Red) */}
            <div className="bg-[#dd1c1a] p-1 rounded-3xl shadow-xl">
              <div className="bg-white p-8 md:p-10 rounded-[22px] text-center">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-[#dd1c1a] font-black text-xs tracking-widest uppercase mb-6">Critical Vulnerability Detected</span>
                <h3 className={`text-3xl font-black mb-4 ${textPrimary}`}>Take The "{premiumData.recommendedNextTest?.testName}" Test</h3>
                <p className={`text-lg font-medium max-w-2xl mx-auto mb-8 ${textSecondary}`}>
                  {premiumData.recommendedNextTest?.psychologicalPitch}
                </p>
                <Link href={`/${premiumData.recommendedNextTest?.testId}`} className="inline-flex items-center justify-center gap-3 py-4 px-8 bg-[#dd1c1a] hover:bg-[#b10f2e] text-white rounded-full font-black text-lg transition-transform hover:-translate-y-1 shadow-lg">
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
