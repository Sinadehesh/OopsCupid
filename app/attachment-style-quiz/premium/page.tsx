"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generatePremiumReport } from "@/app/actions/generatePremiumReport";
import { AlertTriangle, LineChart, Target, ArrowRight, Heart, Briefcase, Users, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import SharePrintButtons from "@/components/ui/SharePrintButtons";

export default function PremiumAttachmentReportPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [premiumData, setPremiumData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Coaching States
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.getItem('oc_saved_profile');
        if (!savedData) {
          setError("We couldn't find your profile data. Please complete the assessment first.");
          setIsLoading(false);
          return;
        }

        const parsedData = JSON.parse(savedData);
        setUserData(parsedData);
        const rawAnswers = parsedData.rawAnswers || {}; 
        
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

  const handleClaimCoaching = async () => {
    setIsClaiming(true);
    // Ping API to update lead record
    try {
      await fetch('/api/leads/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData?.email || 'unknown', type: 'attachment_coaching' })
      }).catch(() => console.log("Coaching API mocked successfully."));
      
      setTimeout(() => {
        setIsClaimed(true);
        setIsClaiming(false);
      }, 1000);
    } catch(err) {
      setIsClaiming(false);
    }
  };

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
          Our behavioral AI is hot-reading your raw data to build a custom, psychological blueprint. Please wait 10-15 seconds.
        </p>
      </div>
    );
  }

  if (premiumData && userData) {
    const isSingle = userData.demographics?.isSingle;
    const nextTest = isSingle 
      ? { id: "why-do-i-pick-bad-guys", name: "Why Do I Pick Bad Guys?", pitch: "Stop repeating the cycle. Discover exactly what traits you are subconsciously drawn to and why you keep attracting the wrong people." }
      : { id: "is-he-manipulative", name: "Is He Manipulative?", pitch: "Are you overreacting, or is he playing mind games? Identify the exact manipulation tactics he might be using on you right now." };

    const renderSubcategory = (title: string, icon: any, dataObj: any, rawScores: any, color: string) => {
      if (!dataObj) return null;
      return (
        <div className="bg-white border border-[#d6d2d2] rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className={`p-6 border-b border-[#d6d2d2]`} style={{ backgroundColor: `${color}10` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg shadow-sm" style={{ color: color }}>{icon}</div>
              <h3 className="text-2xl font-black text-[#086788]">{title}</h3>
            </div>
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-black uppercase mb-1 text-[#086788]/60"><span>Anxiety</span><span>{rawScores?.anxietyScore || 0}%</span></div>
                <div className="w-full h-2 bg-[#d6d2d2] rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${rawScores?.anxietyScore || 0}%`, backgroundColor: color }}></div></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-black uppercase mb-1 text-[#086788]/60"><span>Avoidance</span><span>{rawScores?.avoidanceScore || 0}%</span></div>
                <div className="w-full h-2 bg-[#d6d2d2] rounded-full overflow-hidden"><div className="h-full rounded-full bg-[#086788]" style={{ width: `${rawScores?.avoidanceScore || 0}%` }}></div></div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#dd1c1a] mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> The Threat</h4>
            <div className="text-lg font-medium text-[#086788]/90 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: dataObj.threat }}></div>
            
            <h4 className="text-sm font-black uppercase tracking-widest text-[#06aed5] mb-4 flex items-center gap-2"><Target className="w-4 h-4"/> Your Playbook</h4>
            <div className="space-y-4">
              <div className="bg-[#fff1d0]/30 p-4 rounded-xl border border-[#d6d2d2]">
                <p className="text-xs font-black text-[#086788]/50 uppercase tracking-widest mb-1">Immediate (Right Now)</p>
                <p className="font-bold text-[#086788]">{dataObj.playbook?.immediate}</p>
              </div>
              <div className="bg-[#fff1d0]/30 p-4 rounded-xl border border-[#d6d2d2]">
                <p className="text-xs font-black text-[#086788]/50 uppercase tracking-widest mb-1">In One Week</p>
                <p className="font-bold text-[#086788]">{dataObj.playbook?.oneWeek}</p>
              </div>
              <div className="bg-[#fff1d0]/30 p-4 rounded-xl border border-[#d6d2d2]">
                <p className="text-xs font-black text-[#086788]/50 uppercase tracking-widest mb-1">In One Month</p>
                <p className="font-bold text-[#086788]">{dataObj.playbook?.oneMonth}</p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-[#fff1d0] py-12 md:py-20 border-t border-[#d6d2d2]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div className="bg-[#086788] text-white p-8 md:p-12 rounded-2xl shadow-lg text-center relative overflow-hidden">
            <Sparkles className="absolute top-4 right-4 w-32 h-32 text-white/5 rotate-12 pointer-events-none" />
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Your Master Audit</h1>
            <p className="text-lg md:text-xl font-medium text-[#06aed5]">Clinical access granted. We have successfully mapped your deep psychological blueprint.</p>
          </div>

          <div className="bg-white border border-[#d6d2d2] border-l-8 border-l-[#f0c808] p-8 md:p-12 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-black mb-6 text-[#086788]">The Deep Profile</h2>
            <div className="text-lg md:text-xl font-medium leading-relaxed text-[#086788]/90 space-y-6" dangerouslySetInnerHTML={{ __html: premiumData.unifiedProfile }}></div>
          </div>

          <div className={`p-8 md:p-12 rounded-2xl bg-white border border-[#d6d2d2] shadow-sm overflow-hidden`}>
            <div className="flex items-center gap-4 mb-6">
              <LineChart className="w-8 h-8 text-[#06aed5]" />
              <h2 className={`text-3xl font-black text-[#086788]`}>The Normalcy Curve</h2>
            </div>
            <p className={`text-lg font-medium mb-8 text-[#086788]/80 leading-relaxed`}>
              Look at the chart below. <b>Only the top 10% of people are naturally secure.</b> The vast majority of the population operates with deep insecurity, trauma, and messy relationship patterns. You score in the <b>{premiumData.populationPercentile}th percentile</b>. You are not broken—you are completely normal. And we are going to show you exactly how to fix it below.
            </p>
            <div className="relative w-full h-48 mt-4">
              <svg viewBox="0 0 1000 200" className="w-full h-full preserve-3d overflow-visible">
                <defs><linearGradient id="bellGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#06aed5" stopOpacity="0.3" /><stop offset="100%" stopColor="#06aed5" stopOpacity="0.0" /></linearGradient></defs>
                <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200 Z" fill="url(#bellGradient)" />
                <path d="M 0 200 C 300 200, 400 20, 500 20 C 600 20, 700 200, 1000 200" fill="none" stroke="#06aed5" strokeWidth="4" strokeLinecap="round"/>
                
                {/* 90th Percentile Marker */}
                <line x1="900" y1="20" x2="900" y2="200" stroke="#086788" strokeWidth="2" strokeDasharray="4 4" opacity="0.4"/>
                <text x="900" y="10" textAnchor="middle" fill="#086788" fontSize="12" fontWeight="bold">Top 10% (Secure)</text>

                <g style={{ transform: `translateX(${premiumData.populationPercentile * 10 - 500}px)`, transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                  <line x1="500" y1="20" x2="500" y2="200" stroke="#dd1c1a" strokeWidth="4" />
                  <circle cx="500" cy="20" r="8" fill="#dd1c1a" />
                  <text x="500" y="0" textAnchor="middle" fill="#dd1c1a" fontSize="18" fontWeight="900">YOU ({premiumData.populationPercentile})</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="space-y-2 mt-8">
            {renderSubcategory("Maternal Dynamic", <Users/>, premiumData.subcategories?.mother, userData.profile?.attachment?.mother, "#f686bd")}
            {renderSubcategory("Paternal Dynamic", <Users/>, premiumData.subcategories?.father, userData.profile?.attachment?.father, "#fe5d9f")}
            {renderSubcategory("Romantic Bleed", <Heart/>, premiumData.subcategories?.romantic, userData.profile?.attachment?.romantic, "#dd1c1a")}
            {renderSubcategory("Workplace Bleed", <Briefcase/>, premiumData.subcategories?.work, userData.profile?.attachment?.work, "#06aed5")}
          </div>

          {/* Hormozi Coaching Offer */}
          <div className="bg-white border-2 border-[#f0c808] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden mt-12">
            <div className="absolute top-0 right-0 bg-[#f0c808] text-[#086788] text-[10px] font-black px-4 py-1.5 uppercase tracking-widest rounded-bl-lg">Limited Offer</div>
            
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#086788]">Stop Guessing. Start Rewiring.</h2>
            <p className="text-lg font-medium text-[#086788]/80 mb-6">
              You have the data. Now you need execution. This isn't a fluffy therapy session to talk about your feelings. This is a tactical, 1-on-1 coaching session based on your exact profile above to give you behavioral steps you can use today.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl font-black text-[#086788]">Free</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#086788]/40 line-through">Usually €50.00</span>
                <span className="text-sm font-black text-[#dd1c1a] uppercase tracking-widest">Included With Premium</span>
              </div>
            </div>

            {isClaimed ? (
              <div className="bg-[#06aed5]/10 border border-[#06aed5]/30 p-6 rounded-xl flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#06aed5] shrink-0" />
                <div>
                  <p className="font-black text-[#086788] text-lg">Request Confirmed!</p>
                  <p className="text-sm font-medium text-[#086788]/80">We've updated your file. Check your email shortly for scheduling instructions.</p>
                </div>
              </div>
            ) : (
              <button onClick={handleClaimCoaching} disabled={isClaiming} className="w-full min-h-[64px] bg-[#f0c808] text-[#086788] rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer">
                {isClaiming ? "Securing Spot..." : "Yes, I'm Interested In Coaching"} <Zap className="w-6 h-6" />
              </button>
            )}
            <p className="text-xs text-center font-bold text-[#086788]/40 mt-4 uppercase tracking-widest">Available for a limited time due to coach capacity.</p>
          </div>

          {/* Final Push Cross-Sell */}
          <div className="bg-white border-2 border-[#dd1c1a] p-8 md:p-12 rounded-3xl shadow-md mt-12 text-center">
            <span className="inline-block py-1.5 px-4 rounded bg-[#dd1c1a]/10 text-[#dd1c1a] font-black text-xs tracking-widest uppercase mb-6">Your Next Target</span>
            <h3 className={`text-3xl md:text-4xl font-black mb-6 text-[#086788]`}>Take The "{nextTest.name}" Test</h3>
            <p className={`text-xl font-medium mb-10 text-[#086788]/80`}>{nextTest.pitch}</p>
            <Link href={`/${nextTest.id}`} className="inline-flex items-center justify-center gap-3 py-5 w-full md:w-auto px-10 min-h-[64px] bg-[#dd1c1a] hover:bg-[#b10f2e] text-white rounded-xl font-black text-xl transition-transform hover:-translate-y-1 shadow-md">
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
