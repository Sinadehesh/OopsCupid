"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { CheckCircle2, ShieldCheck, Heart, Briefcase, Users, Target, ArrowRight, LineChart, Lock } from "lucide-react";
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

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#fff1d0] py-12 md:py-20 border-t border-[#d6d2d2]`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {isPremium && (
          <div className="mb-12 p-6 bg-white border border-[#06aed5] rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left animate-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 shrink-0 text-[#06aed5]" />
            <div>
              <p className="font-black text-2xl text-[#086788]">YOUR LOVE PATTERN BREAKDOWN</p>
              <p className="text-sm font-bold uppercase tracking-widest text-[#086788]/60">Full Report Unlocked</p>
            </div>
          </div>
        )}

        {/* Free Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12">
          <div className={`rounded-2xl p-8 md:p-12 flex flex-col justify-center bg-white border border-[#d6d2d2] shadow-sm`}>
            <h4 className="text-sm font-black uppercase tracking-widest text-[#086788]/50 mb-3">Your Free Result</h4>
            <h2 className={`text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-[#086788]`}>
              {profile.attachment.general.classification}
            </h2>
            <p className={`text-xl font-medium leading-relaxed text-[#086788]/80`}>
              Based on your answers, this is your primary attachment style. This is the label for how you naturally respond to closeness, stress, and connection.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center min-h-[400px] bg-white rounded-2xl border border-[#d6d2d2] p-4 md:p-8 shadow-sm">
            <AttachmentQuadrant domains={[quadrantDomains[0]]} />
          </div>
        </div>

        {!isPremium && (
          <div className={`rounded-2xl p-8 md:p-12 mb-12 bg-white border border-[#d6d2d2] shadow-sm max-w-4xl mx-auto text-center`}>
             <h3 className={`text-3xl md:text-4xl font-black mb-6 text-[#086788]`}>
               This is only the surface.
             </h3>
             <p className={`text-lg md:text-xl mb-8 font-medium text-[#086788]/80 leading-relaxed`}>
               A label alone will not tell you why love feels hard, why you pull away, why you chase, why you panic, or why you keep repeating the same painful cycle.<br/><br/>
               Your full result shows the deeper story behind your pattern — where it came from, how it affects your relationships, what it is costing you, and what to do next.
             </p>
             
             <div className="bg-[#fff1d0]/50 border border-[#d6d2d2] rounded-xl p-6 md:p-8 text-left max-w-2xl mx-auto relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-[#d6d2d2]/50 text-[#086788] text-xs font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg flex items-center gap-1">
                 <Lock className="w-3 h-3" /> Locked
               </div>
               <h4 className="text-xl font-black text-[#086788] mb-4">Inside the full breakdown:</h4>
               <ul className="space-y-3 font-medium text-[#086788]/90 text-lg">
                 <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> Why you act this way in love.</li>
                 <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> What shaped this pattern.</li>
                 <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> Your biggest relationship risk.</li>
                 <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> What people feel around you.</li>
                 <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> What to do in the next 24 hours.</li>
               </ul>
             </div>
             
             <p className={`text-lg mt-8 font-bold text-[#086788]`}>
               If you want real clarity, not just a label, unlock your full Love Pattern Breakdown below.
             </p>
          </div>
        )}

        {/* Premium Section */}
        {isPremium && premiumData ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            <div className="bg-white border-l-8 border-[#086788] p-8 md:p-14 rounded-2xl shadow-sm">
              <h2 className="text-4xl font-black mb-8 text-[#086788]">The Truth About You</h2>
              <div className="text-xl font-medium leading-relaxed text-[#086788]/90 space-y-6" dangerouslySetInnerHTML={{ __html: premiumData.deepValidation }}></div>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6"><Users className="w-8 h-8 text-[#086788]" /><h3 className={`text-2xl font-black text-[#086788]`}>The Origin Print</h3></div>
                <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.childhoodPrint }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6"><Heart className="w-8 h-8 text-[#086788]" /><h3 className={`text-2xl font-black text-[#086788]`}>The Romantic Threat</h3></div>
                <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.romanticDanger }}></div>
              </div>

              <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
                <div className="flex items-center gap-4 mb-6"><Briefcase className="w-8 h-8 text-[#086788]" /><h3 className={`text-2xl font-black text-[#086788]`}>The Workplace Threat</h3></div>
                <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.workplaceDanger }}></div>
              </div>
            </div>

            <div className={`p-8 md:p-14 rounded-2xl border border-[#d6d2d2] bg-white shadow-sm`}>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-[#086788]"><Target className="w-10 h-10 text-[#06aed5]" /> The Master Action Plan</h2>
              <div className={`text-xl leading-relaxed font-medium text-[#086788] [&>ol]:space-y-6 [&>ol]:list-none [&>ol]:p-0 [&>ol>li>b]:text-[#086788] [&>ol>li>b]:uppercase [&>ol>li>b]:text-sm [&>ol>li>b]:tracking-widest [&>ol>li>b]:block [&>ol>li>b]:mb-3 [&>ol>li]:bg-[#fff1d0]/50 [&>ol>li]:p-8 [&>ol>li]:rounded-xl [&>ol>li]:border [&>ol>li]:border-[#d6d2d2]`} dangerouslySetInnerHTML={{ __html: premiumData.masterActionPlan }}></div>
            </div>

            <div className="bg-white border-2 border-[#dd1c1a] p-8 md:p-12 rounded-2xl shadow-md mt-12 text-center">
              <span className="inline-block py-1.5 px-4 rounded bg-[#dd1c1a]/10 text-[#dd1c1a] font-black text-sm tracking-widest uppercase mb-6">Your Next Step</span>
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
