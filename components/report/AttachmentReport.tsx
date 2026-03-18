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

  const tH3 = isDarkTheme ? "text-[#ffffff]" : "text-[#000000]";
  const tText = isDarkTheme ? "text-[#e5e5e5]" : "text-[#14213d]";
  const cardClass = isDarkTheme ? "bg-[#14213d] border-[#000000] shadow-lg" : "bg-[#ffffff] border-[#e5e5e5] shadow-md";
  const pageBg = isDarkTheme ? "bg-[#000000]" : "bg-[#e5e5e5]";

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const handleUnlockPremium = async () => {
    setIsGenerating(true);
    try {
      // 🔥 THE FIX: Absolute URL + Dynamic Cache Buster.
      // This forces the browser to send a strict POST request and completely ignores any cached 308 Permanent Redirects.
      const apiUrl = `${window.location.origin}/api/premium-report/?_t=${Date.now()}`;
      
      const response = await fetch(apiUrl, {
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

  const getSeductiveHook = (classification: string, domain: string) => {
    const lower = classification.toLowerCase();
    
    if (lower.includes("anxious") || lower.includes("preoccupied")) {
      return {
        hook: `Your scores expose a highly active hyper-vigilance loop in ${domain} dynamics. You possess a subconscious radar that detects microscopic shifts in others' moods, but this "gift" is actively weaponized against you.`,
        fear: `Toxic personalities instinctively detect and exploit this exact pattern. There is a critical blindspot in your profile that forces your nervous system to confuse anxiety with chemistry, effectively guaranteeing a cycle of self-sabotage if left unaddressed.`,
      };
    }
    
    if (lower.includes("avoidant") || lower.includes("dismissive")) {
      return {
        hook: `Your data reveals a highly efficient, yet profoundly isolating survival strategy in ${domain} dynamics. You've built a psychological fortress that protects you from disappointment, but it contains a massive, destructive blindspot.`,
        fear: `The moment expectations or intimacy deepens, a subconscious 'deactivation' trigger forces you to pull away or find fatal flaws in others. If left unchecked, this specific loop guarantees the destruction of healthy connections and chronic isolation.`,
      };
    }
    
    if (lower.includes("fearful") || lower.includes("disorganized")) {
      return {
        hook: `Your results indicate an exhausting psychological tug-of-war in ${domain} dynamics. Your nervous system is trapped in a chaotic 'push-pull' loop—deeply craving connection but violently rejecting it as a threat the second it arrives.`,
        fear: `Manipulators specifically target this exact psychological fracture. You are currently driving with one foot on the gas and one on the brake. To break this cycle before further relational damage occurs, you must implement an override protocol.`,
      };
    }
    
    return {
      hook: `Your baseline in ${domain} dynamics is remarkably resilient, but this creates a highly dangerous vulnerability. Because you operate with high empathy and healthy boundaries, you run a subconscious program assuming others do the same.`,
      fear: `This "benefit of the doubt" makes you a prime target for emotional vampires. Your scores indicate a severe risk of over-functioning and being slowly drained by emotionally unavailable people who exploit your stability.`,
    };
  };

  const renderUnifiedSeductionCard = (domain: string, classification: string, avoidance: number, anxiety: number) => {
    const { hook, fear } = getSeductiveHook(classification, domain);
    
    return (
      <div className={`rounded-3xl border overflow-hidden mb-12 ${cardClass}`}>
        
        {/* VISIBLE TOP HALF */}
        <div className={`p-8 md:p-10 border-b ${isDarkTheme ? 'border-[#000000]' : 'border-[#e5e5e5]'}`}>
          <div className="flex items-center justify-between mb-6">
             <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#fca311]">Domain: {domain}</h4>
             <BrainCircuit className="w-6 h-6 text-[#14213d] dark:text-[#e5e5e5]" />
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-black mb-8 ${tH3}`}>
            {classification}
          </h2>

          <div className={`space-y-6 mb-10 p-6 rounded-2xl border ${isDarkTheme ? 'bg-[#000000]/50 border-[#000000]' : 'bg-[#e5e5e5]/30 border-[#e5e5e5]'}`}>
            <ScoreBar label="Avoidance Risk" value={avoidance} color="bg-[#fca311]" />
            <ScoreBar label="Anxiety Risk" value={anxiety} color="bg-[#fca311]" />
          </div>

          {!isPremium && (
            <div className="space-y-4">
              <p className={`text-xl font-bold leading-relaxed text-[#9d0208]`}>
                {hook}
              </p>
              <p className={`text-lg font-medium leading-relaxed ${tText}`}>
                {fear}
              </p>
            </div>
          )}
        </div>

        {/* LOCKED BOTTOM HALF */}
        {!isPremium && (
          <div className={`relative p-8 md:p-10 ${isDarkTheme ? 'bg-[#000000]/20' : 'bg-[#e5e5e5]/20'}`}>
            
            <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[8px] ${isDarkTheme ? 'bg-[#000000]/60' : 'bg-[#ffffff]/60'}`}>
              <div className={`p-8 rounded-2xl border text-center shadow-2xl max-w-md w-full mx-4 transition-transform hover:scale-[1.02] ${isDarkTheme ? 'bg-[#14213d] border-[#fca311]/30' : 'bg-[#ffffff] border-[#e5e5e5]'}`}>
                <Lock className="w-12 h-12 mx-auto mb-4 text-[#9d0208]" />
                <h3 className={`text-2xl font-extrabold mb-2 ${tH3}`}>Unlock The {classification.split('-')[0]} Playbook</h3>
                <p className={`mb-6 font-medium text-sm md:text-base ${tText}`}>
                  Access the exact psychological scripts, boundary frameworks, and intervention strategies to override your subconscious trigger.
                </p>
                
                <button 
                  onClick={handleUnlockPremium}
                  disabled={isGenerating}
                  className="w-full py-4 bg-[#9d0208] hover:bg-[#9d0208]/90 text-[#ffffff] rounded-xl font-extrabold text-lg transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
                >
                  {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin text-[#fca311]" /> Unlocking Blueprint...</> : "Reveal My Extraction Plan"}
                </button>
              </div>
            </div>

            <div className="filter blur-[6px] select-none pointer-events-none opacity-50 space-y-6">
              <h3 className={`text-2xl font-black flex items-center gap-2 ${tH3}`}>
                <Sparkles className="w-6 h-6 text-[#fca311]" /> The {classification.split('-')[0]} Playbook
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
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${pageBg} py-12 border-t ${isDarkTheme ? 'border-[#000000]' : 'border-[#e5e5e5]'}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">

        {hasJustUnlocked && (
          <div className="mb-8 p-4 bg-[#14213d] border border-[#fca311]/50 text-[#fca311] rounded-xl shadow-lg flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold text-lg">Blueprint Unlocked. Your Master Analysis is below.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit border shadow-sm ${isDarkTheme ? 'bg-[#9d0208]/20 border-[#9d0208]/30 text-[#9d0208]' : 'bg-[#9d0208]/10 border-[#9d0208]/20 text-[#9d0208]'}`}>
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

        {isPremium && premiumData && (
          <div className="mt-16 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
             
             <div className={`p-8 md:p-12 rounded-3xl border shadow-sm mb-12 ${cardClass}`}>
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#fca311] mb-6">Verified Master Profile</h4>
                <h2 className={`text-4xl md:text-5xl font-black mb-8 ${tH3}`}>
                  {profile.attachment.general.classification}
                </h2>
                <div className={`space-y-6 p-6 rounded-2xl border ${isDarkTheme ? 'bg-[#000000]/50 border-[#000000]' : 'bg-[#e5e5e5]/30 border-[#e5e5e5]'}`}>
                  <ScoreBar label="Avoidance Risk" value={profile.attachment.general.avoidanceScore} color="bg-[#fca311]" />
                  <ScoreBar label="Anxiety Risk" value={profile.attachment.general.anxietyScore} color="bg-[#fca311]" />
                </div>
             </div>

             <div className={`p-8 md:p-12 rounded-3xl border shadow-xl ${cardClass}`}>
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 text-[#14213d] dark:text-[#fca311]">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10" /> The Clinical Validation
                 </h2>
                 <div className={`text-lg md:text-xl leading-relaxed space-y-6 ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.validationLayer }}></div>
             </div>

             <div className={`p-8 md:p-12 rounded-3xl border shadow-xl ${isDarkTheme ? 'bg-[#9d0208]/10 border-[#9d0208]/30' : 'bg-[#9d0208]/5 border-[#9d0208]/20'}`}>
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 text-[#9d0208]">
                    <AlertTriangle className="w-8 h-8 md:w-10 md:h-10" /> The Silent Sabotage Pattern
                 </h2>
                 <div className={`text-lg md:text-xl leading-relaxed space-y-6 ${tText}`} dangerouslySetInnerHTML={{ __html: premiumData.fearLayer }}></div>
             </div>

             <div className={`p-8 md:p-12 rounded-3xl border shadow-xl ${cardClass}`}>
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 text-[#14213d] dark:text-[#fca311]">
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
