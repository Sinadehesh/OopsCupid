"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { CheckCircle2, ShieldCheck, Activity, Heart, Briefcase, Users, Target, ArrowRight, LineChart } from "lucide-react";
import { generatePremiumReport } from "@/app/actions/generatePremiumReport";
import PremiumCheckout from "./PremiumCheckout";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: any;
}

export default function AttachmentReport({ profile, demographics }: AttachmentReportProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

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
    <div className={`p-6 rounded-xl bg-white border border-[#d6d2d2] shadow-sm`}>
      <h4 className={`text-sm font-black uppercase tracking-wider mb-5 text-[#086788]`}>{title}</h4>
      <div className="space-y-5">
        <ScoreBar label="Anxiety" value={data.anxietyScore} color={`bg-[${colorCode}]`} />
        <ScoreBar label="Avoidance" value={data.avoidanceScore} color={`bg-[#086788]`} />
      </div>
    </div>
  );

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#fff1d0] py-12 md:py-20 border-t border-[#d6d2d2]`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {isPremium && (
          <div className="mb-12 p-6 bg-white border border-[#06aed5] rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 shrink-0 text-[#06aed5]" />
            <div>
              <p className="font-black text-2xl text-[#086788]">THE MASTER AUDIT UNLOCKED</p>
              <p className="text-sm font-bold uppercase tracking-widest text-[#086788]/60">Full Clinical Synthesis Complete</p>
            </div>
          </div>
        )}

        {/* Free Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12">
          <div className={`rounded-2xl p-8 md:p-12 flex flex-col justify-center bg-white border border-[#d6d2d2] shadow-sm`}>
             <div className="flex items-center gap-2 mb-8 text-[#086788] font-bold uppercase text-sm tracking-tighter bg-[#fff1d0] px-4 py-2 rounded w-max">
               <Activity className="w-5 h-5 text-[#086788]" /> Clinical Baseline Found
             </div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[#086788]/50 mb-3">Primary Archetype</h4>
            <h2 className={`text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-[#086788]`}>
              {profile.attachment.general.classification}
            </h2>
            <p className={`text-lg md:text-xl font-medium leading-relaxed text-[#086788]/80`}>
              Your psychological blueprint has been mapped. See exactly how your nervous system responds to closeness, stress, and abandonment below.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center min-h-[400px] bg-white rounded-2xl border border-[#d6d2d2] p-4 md:p-8 shadow-sm">
            <AttachmentQuadrant domains={quadrantDomains} />
          </div>
        </div>

        {!isPremium && (
          <div className={`rounded-2xl p-8 md:p-12 mb-12 bg-white border border-[#d6d2d2] shadow-sm`}>
             <h3 className={`text-3xl font-black mb-6 flex items-center gap-3 text-[#086788]`}>
               <ShieldCheck className="w-8 h-8 text-[#06aed5]" /> Granular Subconscious Mapping
             </h3>
             <p className={`text-lg mb-10 font-medium text-[#086788]/80 max-w-3xl`}>
               Attachment isn't one-size-fits-all. Our AI has isolated exactly how your triggers change depending on who you are dealing with.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
               {renderDomainScores("General Baseline", profile.attachment.general, "#06aed5")}
               {renderDomainScores("Romantic Partners", profile.attachment.romantic, "#dd1c1a")}
               {renderDomainScores("Maternal Figure", profile.attachment.mother, "#f686bd")}
               {renderDomainScores("Paternal Figure", profile.attachment.father, "#fe5d9f")}
             </div>
          </div>
        )}

        {/* Premium Section */}
        {isPremium && premiumData ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* Dark Anchor Block for Validation */}
            <div className="bg-white border-l-8 border-[#086788] p-8 md:p-14 rounded-2xl shadow-sm">
              <h2 className="text-4xl font-black mb-8 text-[#086788]">The Truth About You</h2>
              <div className="text-xl font-medium leading-relaxed text-[#086788]/90 space-y-6" dangerouslySetInnerHTML={{ __html: premiumData.deepValidation }}></div>
            </div>

            {/* Normalcy Curve */}
            <div className={`p-8 md:p-14 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm overflow-hidden`}>
              <div className="flex items-center gap-4 mb-8">
                <LineChart className="w-10 h-10 text-[#06aed5]" />
                <h2 className={`text-3xl font-black text-[#086788]`}>The Normalcy Curve</h2>
              </div>
              <p className={`text-xl font-medium mb-12 text-[#086788]/80 max-w-3xl`}>
                You are not broken. Look at the chart below. Most humans operate with some level of insecurity or trauma. You score in the <b>{premiumData.populationPercentile}th percentile</b> for attachment security.
              </p>
              
              <div className="relative w-full h-56 md:h-72 mt-4 mb-4">
                <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
                  <defs>
                    <linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06aed5" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06aed5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200 Z" fill="url(#bellGradient)" />
                  <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200" fill="none" stroke="#06aed5" strokeWidth="4" strokeLinecap="round"/>
                  
                  <line x1="500" y1="20" x2="500" y2="200" stroke="#086788" strokeWidth="2" strokeDasharray="6 6" opacity="0.3"/>
                  <text x="500" y="15" textAnchor="middle" fill="#086788" fontSize="14" fontWeight="bold">Average (50)</text>

                  <g style={{ transform: `translateX(${premiumData.populationPercentile * 10 - 500}px)`, transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                    <line x1="500" y1="20" x2="500" y2="200" stroke="#dd1c1a" strokeWidth="4" />
                    <circle cx="500" cy="20" r="8" fill="#dd1c1a" />
                    <text x="500" y="0" textAnchor="middle" fill="#dd1c1a" fontSize="18" fontWeight="900">YOU ({premiumData.populationPercentile})</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Deep Dives */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6"><Users className="w-8 h-8 text-[#f686bd]" /><h3 className={`text-2xl font-black text-[#086788]`}>The Origin Print</h3></div>
                <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.childhoodPrint }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6"><Heart className="w-8 h-8 text-[#dd1c1a]" /><h3 className={`text-2xl font-black text-[#086788]`}>The Romantic Threat</h3></div>
                <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.romanticDanger }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6"><Briefcase className="w-8 h-8 text-[#06aed5]" /><h3 className={`text-2xl font-black text-[#086788]`}>The Workplace Threat</h3></div>
                <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.workplaceDanger }}></div>
              </div>
            </div>

            {/* Master Action Plan */}
            <div className={`p-8 md:p-14 rounded-2xl border border-[#d6d2d2] bg-white shadow-sm`}>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-[#086788]"><Target className="w-10 h-10 text-[#06aed5]" /> The Master Action Plan</h2>
              <div className={`text-xl leading-relaxed font-medium text-[#086788] [&>ol]:space-y-6 [&>ol]:list-none [&>ol]:p-0 [&>ol>li>b]:text-[#086788] [&>ol>li>b]:uppercase [&>ol>li>b]:text-sm [&>ol>li>b]:tracking-widest [&>ol>li>b]:block [&>ol>li>b]:mb-3 [&>ol>li]:bg-[#fff1d0]/50 [&>ol>li]:p-8 [&>ol>li]:rounded-xl [&>ol>li]:border [&>ol>li]:border-[#d6d2d2]`} dangerouslySetInnerHTML={{ __html: premiumData.masterActionPlan }}></div>
            </div>

            {/* The Cross-Sell Push (High Alert) */}
            <div className="bg-white border-2 border-[#dd1c1a] p-8 md:p-12 rounded-2xl shadow-md mt-12 text-center">
              <span className="inline-block py-1.5 px-4 rounded bg-[#dd1c1a]/10 text-[#dd1c1a] font-black text-sm tracking-widest uppercase mb-6">Critical Vulnerability Detected</span>
              <h3 className={`text-3xl md:text-4xl font-black mb-6 text-[#086788]`}>Take The "{premiumData.recommendedNextTest?.testName}" Test</h3>
              <p className={`text-xl font-medium max-w-3xl mx-auto mb-10 text-[#086788]/80`}>
                {premiumData.recommendedNextTest?.psychologicalPitch}
              </p>
              <Link href={`/${premiumData.recommendedNextTest?.testId}`} className="inline-flex items-center justify-center gap-3 py-5 px-10 min-h-[64px] bg-[#dd1c1a] hover:bg-[#b10f2e] text-white rounded-xl font-black text-xl transition-transform hover:-translate-y-1 shadow-md">
                Start This Diagnostic Now <ArrowRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="pt-8 pb-12"><SharePrintButtons /></div>
          </div>
        ) : (
          <PremiumCheckout 
            onUnlock={handleUnlockEverything} 
            isGenerating={isGenerating} 
            archetype={profile.attachment.general.classification}
            relationshipStatus={relationshipStatus}
          />
        )}
      </div>
    </div>
  );
}
