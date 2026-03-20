"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generatePremiumReport } from "@/app/actions/generatePremiumReport";
import { AlertTriangle, BrainCircuit, Activity, ShieldCheck, Target, ArrowRight, LineChart, Users, Heart, Ghost } from "lucide-react";
import Link from "next/link";
import SharePrintButtons from "@/components/ui/SharePrintButtons";

export default function PremiumAttachmentReportPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [premiumData, setPremiumData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.getItem('oc_saved_profile');
        if (!savedData) {
          setError("We couldn't find your profile data. Please complete the assessment first so we can securely compile your audit.");
          setIsLoading(false);
          return;
        }

        const parsedData = JSON.parse(savedData);
        // Fallback for missing rawAnswers if they got here unexpectedly
        const rawAnswers = parsedData.rawAnswers || {}; 
        
        // Pass the rawAnswers straight into the AI!
        const data = await generatePremiumReport(parsedData.profile?.attachment || {}, parsedData.demographics || {}, rawAnswers);
        
        if (data.success && data.report) {
          setPremiumData(data.report);
        } else {
          setError(`Analysis Server Error: ${data.error || "Missing AI response."}`);
        }
      } catch (err: any) {
        setError(`Unexpected System Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1d0] px-4 text-center">
        <AlertTriangle className="w-16 h-16 text-[#dd1c1a] mb-6" />
        <h2 className="text-3xl font-black text-[#086788] mb-4">Access Denied</h2>
        <p className="text-lg font-medium text-[#086788]/80 max-w-md mb-8">{error}</p>
        <button onClick={() => router.push('/attachment-style-quiz')} className="px-8 py-4 bg-[#086788] hover:bg-[#06aed5] transition-colors text-white rounded-xl font-black shadow-md">Return to Assessment</button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff1d0] px-4">
        <div className="w-20 h-20 border-8 border-[#d6d2d2] border-t-[#06aed5] rounded-full animate-spin mb-8 shadow-sm"></div>
        <h2 className="text-3xl md:text-4xl font-black text-[#086788] mb-4 text-center">Compiling Your Master Audit...</h2>
        <p className="text-[#086788]/80 text-center max-w-md text-lg font-medium leading-relaxed">
          Our elite behavioral AI is actively reading every single answer you provided to profile your relationship dynamic. Please wait 10-15 seconds.
        </p>
      </div>
    );
  }

  if (premiumData) {
    return (
      <div className="min-h-screen bg-[#fff1d0] py-12 md:py-20 border-t border-[#d6d2d2]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          {/* Header */}
          <div className="bg-[#086788] text-white p-8 md:p-14 rounded-2xl shadow-lg text-center relative overflow-hidden">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">Your Love Pattern Breakdown</h1>
            <p className="text-xl md:text-2xl font-medium text-[#06aed5] max-w-3xl mx-auto">
              Clinical access granted. We have successfully mapped your partner's playbook and the psychological threats you face.
            </p>
          </div>

          {/* Deep Validation */}
          <div className="bg-white border border-[#d6d2d2] border-l-8 border-l-[#f0c808] p-8 md:p-14 rounded-2xl shadow-sm">
            <h2 className="text-4xl font-black mb-8 text-[#086788]">The Reality Check</h2>
            <div className="text-xl font-medium leading-relaxed text-[#086788]/90 space-y-6" dangerouslySetInnerHTML={{ __html: premiumData.deepValidation }}></div>
          </div>

          {/* Visual Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Danger Meter */}
            <div className={`p-8 md:p-12 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm text-center`}>
              <h2 className={`text-3xl font-black text-[#086788] mb-4`}>Relationship Danger Score</h2>
              <p className={`text-lg font-medium text-[#086788]/80 mb-8`}>Based on your answers, how dangerous is it to stay in this dynamic?</p>
              
              <div className="relative w-full aspect-[2/1] overflow-hidden mb-6 flex justify-center mt-8">
                <div className="absolute top-0 w-64 h-64 md:w-80 md:h-80 rounded-full border-[30px] border-[#d6d2d2] border-b-transparent border-l-transparent -rotate-45"></div>
                <div className="absolute top-0 w-64 h-64 md:w-80 md:h-80 rounded-full border-[30px] border-[#dd1c1a] border-b-transparent border-l-transparent transition-transform duration-1000 ease-out" style={{ transform: `rotate(${-45 + ((premiumData.partnerDangerScore || 0) / 100) * 180}deg)` }}></div>
                <div className="absolute bottom-0 w-full text-center pb-4">
                  <span className="text-6xl md:text-7xl font-black text-[#dd1c1a]">{premiumData.partnerDangerScore || 0}<span className="text-3xl text-[#086788]/50">/100</span></span>
                </div>
              </div>
            </div>

            {/* Manipulation Bell Curve */}
            <div className={`p-8 md:p-12 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm overflow-hidden`}>
              <h2 className={`text-3xl font-black text-[#086788] mb-4 text-center`}>His Manipulation Level</h2>
              <p className={`text-lg font-medium mb-8 text-[#086788]/80 text-center`}>
                How manipulative is the partner you attract compared to average guys? Your partner sits in the <b>{premiumData.manipulationPercentile || 50}th percentile</b>.
              </p>
              <div className="relative w-full h-48 mt-4">
                <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
                  <defs><linearGradient id="mGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#dd1c1a" stopOpacity="0.3" /><stop offset="100%" stopColor="#dd1c1a" stopOpacity="0.0" /></linearGradient></defs>
                  <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200 Z" fill="url(#mGrad)" />
                  <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200" fill="none" stroke="#dd1c1a" strokeWidth="4" strokeLinecap="round"/>
                  <line x1="500" y1="20" x2="500" y2="200" stroke="#086788" strokeWidth="2" strokeDasharray="6 6" opacity="0.3"/>
                  <text x="500" y="15" textAnchor="middle" fill="#086788" fontSize="14" fontWeight="bold">Average Guy (50)</text>
                  <g style={{ transform: `translateX(${(premiumData.manipulationPercentile || 50) * 10 - 500}px)`, transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                    <line x1="500" y1="20" x2="500" y2="200" stroke="#086788" strokeWidth="4" />
                    <circle cx="500" cy="20" r="8" fill="#086788" />
                    <text x="500" y="0" textAnchor="middle" fill="#086788" fontSize="18" fontWeight="900">HIM ({premiumData.manipulationPercentile || 50})</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Deep Dives */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
              <div className="flex items-center gap-4 mb-6"><Users className="w-8 h-8 text-[#06aed5]" /><h3 className={`text-2xl font-black text-[#086788]`}>Profile of Your Partner</h3></div>
              <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.boyfriendProfile }}></div>
            </div>

            <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
              <div className="flex items-center gap-4 mb-6"><Ghost className="w-8 h-8 text-[#f0c808]" /><h3 className={`text-2xl font-black text-[#086788]`}>His Playbook</h3></div>
              <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.hisPlaybook }}></div>
            </div>

            <div className={`p-8 md:p-10 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm`}>
              <div className="flex items-center gap-4 mb-6"><AlertTriangle className="w-8 h-8 text-[#dd1c1a]" /><h3 className={`text-2xl font-black text-[#086788]`}>Relationship Threats</h3></div>
              <div className={`text-base md:text-lg leading-relaxed space-y-4 font-medium text-[#086788]/90`} dangerouslySetInnerHTML={{ __html: premiumData.relationshipThreats }}></div>
            </div>
          </div>

          {/* Action Plan */}
          <div className={`p-8 md:p-14 rounded-2xl border border-[#d6d2d2] bg-white shadow-sm`}>
            <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-[#086788]"><Target className="w-10 h-10 text-[#06aed5]" /> What To Be Careful About (Action Plan)</h2>
            <div className={`text-xl leading-relaxed font-medium text-[#086788] [&>ol]:space-y-6 [&>ol]:list-none [&>ol]:p-0 [&>ol>li>b]:text-[#086788] [&>ol>li>b]:uppercase [&>ol>li>b]:text-sm [&>ol>li>b]:tracking-widest [&>ol>li>b]:block [&>ol>li>b]:mb-3 [&>ol>li]:bg-[#fff1d0]/50 [&>ol>li]:p-8 [&>ol>li]:rounded-xl [&>ol>li]:border [&>ol>li]:border-[#d6d2d2]`} dangerouslySetInnerHTML={{ __html: premiumData.masterActionPlan }}></div>
          </div>

          {/* Cross-Sell */}
          <div className="bg-white border-2 border-[#dd1c1a] p-8 md:p-12 rounded-2xl shadow-md mt-12 text-center">
            <span className="inline-block py-1.5 px-4 rounded bg-[#dd1c1a]/10 text-[#dd1c1a] font-black text-sm tracking-widest uppercase mb-6">Your Next Step</span>
            <h3 className={`text-3xl md:text-4xl font-black mb-6 text-[#086788]`}>Take The "{premiumData.recommendedNextTest?.testName || 'Is He Manipulative?'}" Test</h3>
            <p className={`text-xl font-medium max-w-3xl mx-auto mb-10 text-[#086788]/80`}>
              {premiumData.recommendedNextTest?.psychologicalPitch || "Identify the exact manipulation tactics he is using on you right now."}
            </p>
            <Link href={`/${premiumData.recommendedNextTest?.testId || 'is-he-manipulative'}`} className="inline-flex items-center justify-center gap-3 py-5 px-10 min-h-[64px] bg-[#dd1c1a] hover:bg-[#b10f2e] text-white rounded-xl font-black text-xl transition-transform hover:-translate-y-1 shadow-md">
              Start This Diagnostic Now <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

          <div className="pt-8 pb-12"><SharePrintButtons /></div>
        </div>
      </div>
    );
  }

  return null;
}
