"use client";

import React, { useState } from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import UnlockBanner from "./UnlockBanner";
import { Lock, Unlock, Loader2, AlertTriangle, Sparkles, CheckCircle2, ShieldCheck, BrainCircuit } from "lucide-react";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: any;
  isDarkTheme?: boolean;
}

export default function AttachmentReport({ profile, isDarkTheme = false }: AttachmentReportProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [hasJustUnlocked, setHasJustUnlocked] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [premiumData, setPremiumData] = useState<any>(null);

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-md" : "bg-white border-slate-200 shadow-md";

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
         alert(`API Connection Failed: ${response.status} ${response.statusText}\n\nCheck Vercel logs or OpenAI API key.`);
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

  // =========================================================================
  // THE SEDUCTION ENGINE: Dynamic, Fear & Curiosity-Based Hooks
  // =========================================================================
  const getSeductiveHook = (classification: string, domain: string) => {
    const lower = classification.toLowerCase();
    
    if (lower.includes("anxious") || lower.includes("preoccupied")) {
      return {
        titleColor: "text-purple-500",
        hook: `Your scores expose a highly active hyper-vigilance loop in ${domain} dynamics. You possess a subconscious radar that detects microscopic shifts in others' moods, but this "gift" is actively weaponized against you.`,
        fear: `Toxic personalities instinctively detect and exploit this exact pattern. There is a critical blindspot in your profile that forces your nervous system to confuse anxiety with chemistry, effectively guaranteeing a cycle of self-sabotage if left unaddressed.`,
      };
    }
    
    if (lower.includes("avoidant") || lower.includes("dismissive")) {
      return {
        titleColor: "text-orange-500",
        hook: `Your data reveals a highly efficient, yet profoundly isolating survival strategy in ${domain} dynamics. You've built a psychological fortress that protects you from disappointment, but it contains a massive, destructive blindspot.`,
        fear: `The moment expectations or intimacy deepens, a subconscious 'deactivation' trigger forces you to pull away or find fatal flaws in others. If left unchecked, this specific loop guarantees the destruction of healthy connections and chronic isolation.`,
      };
    }
    
    if (lower.includes("fearful") || lower.includes("disorganized")) {
      return {
        titleColor: "text-red-600",
        hook: `Your results indicate an exhausting psychological tug-of-war in ${domain} dynamics. Your nervous system is trapped in a chaotic 'push-pull' loop—deeply craving connection but violently rejecting it as a threat the second it arrives.`,
        fear: `Manipulators specifically target this exact psychological fracture. You are currently driving with one foot on the gas and one on the brake. To break this cycle before further relational damage occurs, you must implement an override protocol.`,
      };
    }
    
    // Secure
    return {
      titleColor: "text-blue-500",
      hook: `Your baseline in ${domain} dynamics is remarkably resilient, but this creates a highly dangerous vulnerability. Because you operate with high empathy and healthy boundaries, you run a subconscious program assuming others do the same.`,
      fear: `This "benefit of the doubt" makes you a prime target for emotional vampires. Your scores indicate a severe risk of over-functioning and being slowly drained by emotionally unavailable people who exploit your stability.`,
    };
  };

  const renderUnifiedSeductionCard = (domain: string, classification: string, avoidance: number, anxiety: number) => {
    const { hook, fear, titleColor } = getSeductiveHook(classification, domain);
    
    return (
      <div className={`rounded-3xl border overflow-hidden mb-12 ${cardClass}`}>
        
        {/* VISIBLE TOP HALF: The Score & The Cold Read Hook */}
        <div className="p-8 md:p-10 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
             <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-500">Domain: {domain}</h4>
             <BrainCircuit className="w-6 h-6 text-slate-400" />
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-black mb-8 ${titleColor}`}>
            {classification}
          </h2>

          <div className="space-y-6 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <ScoreBar label="Avoidance Risk" value={avoidance} color="bg-slate-800 dark:bg-slate-400" />
            <ScoreBar label="Anxiety Risk" value={anxiety} color="bg-slate-800 dark:bg-slate-400" />
          </div>

          {!isPremium && (
            <div className="space-y-4">
              <p className={`text-xl font-bold leading-relaxed ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`}>
                {hook}
              </p>
              <p className={`text-lg font-medium leading-relaxed ${tText}`}>
                {fear}
              </p>
            </div>
          )}
        </div>

        {/* LOCKED BOTTOM HALF: The Playbook & Paywall */}
        {!isPremium && (
          <div className="relative p-8 md:p-10 bg-slate-50/50 dark:bg-slate-900/20">
            
            {/* The Hard Paywall Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/60 backdrop-blur-[8px]">
              <div className={`p-8 rounded-2xl border text-center shadow-2xl max-w-md w-full mx-4 transition-transform hover:scale-[1.02] ${isDarkTheme ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <Lock className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-500" />
                <h3 className={`text-2xl font-extrabold mb-2 ${tH3}`}>Unlock The {classification.split('-')[0]} Playbook</h3>
                <p className={`mb-6 font-medium text-sm md:text-base ${tText}`}>
                  Access the exact psychological scripts, boundary frameworks, and intervention strategies to override your subconscious trigger.
                </p>
                
                <button 
                  onClick={handleUnlockPremium}
                  disabled={isGenerating}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-extrabold text-lg transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
                >
                  {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin" /> Unlocking Blueprint...</> : "Reveal My Extraction Plan"}
                </button>
              </div>
            </div>

            {/* The Teaser Text (Violently Blurred) */}
            <div className="filter blur-[6px] select-none pointer-events-none opacity-50 space-y-6">
              <h3 className={`text-2xl font-black flex items-center gap-2 ${tH3}`}>
                <Sparkles className="w-6 h-6" /> The {classification.split('-')[0]} Playbook
              </h3>
              <p className={`text-lg font-bold ${tText}`}>
                A tactical deep dive into the exact mind games your brain plays on you, and the copy-paste scripts you need to set boundaries today.
              </p>
              <p className={`text-base ${tText}`}>
                Step 1: The 20-minute physical delay. Put your phone on airplane mode, set a timer for 20 minutes, and physically leave the room. You are not ignoring them; you are actively short-circuiting the panic loop and proving to your nervous system that you are safe in the silence. Use the following text message verbatim when they inevitably reach out: "I am processing..."
              </p>
            </div>

          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {hasJustUnlocked && (
          <div className="mb-8 p-4 bg-green-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">Blueprint Unlocked. Your Master Analysis is below.</span>
          </div>
        )}

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit border shadow-sm ${isDarkTheme ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-100 text-red-700'}`}>
              <AlertTriangle className="w-4 h-4" /> Action Required
            </div>
            <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${tH3}`}>
              Your Subconscious Profile
            </h2>
            <p className={`text-lg font-medium leading-relaxed ${tText}`}>
              We have processed your data across all 5 psychological domains. Your scores indicate a high probability of repeating past relational trauma loops. Review your vulnerability scanners below.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        {/* ============================================== */}
        {/* FREE TIER: THE 5 SEDUCTION CARDS               */}
        {/* ============================================== */}
        {!isPremium && (
          <div className="animate-in fade-in duration-700">
            {renderUnifiedSeductionCard("General Life", profile.attachment.general.classification, profile.attachment.general.avoidanceScore, profile.attachment.general.anxietyScore)}
            {renderUnifiedSeductionCard("Romantic Relationships", profile.attachment.romantic.classification, profile.attachment.romantic.avoidanceScore, profile.attachment.romantic.anxietyScore)}
            {renderUnifiedSeductionCard("Maternal (Mother)", profile.attachment.mother.classification, profile.attachment.mother.avoidanceScore, profile.attachment.mother.anxietyScore)}
            {renderUnifiedSeductionCard("Paternal (Father)", profile.attachment.father.classification, profile.attachment.father.avoidanceScore, profile.attachment.father.anxietyScore)}
            {renderUnifiedSeductionCard("Work & Authority", profile.attachment.work.classification, profile.attachment.work.avoidanceScore, profile.attachment.work.anxietyScore)}
            
            <div className="mt-16">
              <UnlockBanner />
              <SharePrintButtons />
            </div>
          </div>
        )}

        {/* ============================================== */}
        {/* PREMIUM TIER: THE UNLOCKED AI MASTER REPORT    */}
        {/* ============================================== */}
        {isPremium && premiumData && (
          <div className="mt-16 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
             
             {/* Dynamic Re-Render of General Scores Without Blur */}
             <div className={`p-8 md:p-12 rounded-3xl border shadow-sm mb-12 ${cardClass}`}>
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-6">Verified Master Profile</h4>
                <h2 className={`text-4xl md:text-5xl font-black mb-8 ${getSeductiveHook(profile.attachment.general.classification, "General").titleColor}`}>
                  {profile.attachment.general.classification}
                </h2>
                <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <ScoreBar label="Avoidance Risk" value={profile.attachment.general.avoidanceScore} color="bg-slate-800 dark:bg-slate-400" />
                  <ScoreBar label="Anxiety Risk" value={profile.attachment.general.anxietyScore} color="bg-slate-800 dark:bg-slate-400" />
                </div>
             </div>

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
