import React from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import CircularScore from "./CircularScore";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import { generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative } from "@/lib/psychometrics/narratives";
import { ShieldCheck, ArrowRight, Info } from "lucide-react";

interface MasterReportProps {
  profile: PsychologicalProfile;
  demographics: { isSingle: boolean; gender: string; hasChildren: boolean; };
  isDarkTheme?: boolean;
}

export default function MasterReport({ profile, demographics, isDarkTheme = false }: MasterReportProps) {
  const { isSingle, gender, hasChildren } = demographics;

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const dummyBlurText = "This section contains the exact text scripts and step-by-step extraction plan you need to rewire this dynamic. Unlocking this reveals the undeniable truth about why they act this way, and gives you the exact tactical playbook to set boundaries that actually work.";

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 w-full`}>
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* HERO SECTION — Outcome Driven */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-stretch">
          
          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col justify-center ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-8 w-fit ${isDarkTheme ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
              <ShieldCheck className="w-4 h-4" />
              INSTANT DIAGNOSTIC AUDIT
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-extrabold leading-none tracking-tighter mb-6 ${tH3}`}>
              Stop Guessing. Here Is <br className="hidden md:block"/> <span className="text-rose-500">Your Diagnosis.</span>
            </h2>
            
            <p className={`text-[18px] font-medium leading-relaxed mb-10 ${tText}`}>
              Your psychological scan is complete. Below is the cold-hard truth about why you react the way you do, why you keep attracting the exact same relationship problems, and exactly what you need to do to fix it today.
            </p>
            
            <div className="mt-auto">
              <button className={`inline-flex items-center gap-3 font-extrabold text-lg ${isDarkTheme ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-500'}`}>
                Read My Diagnosis <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT CARD — Quadrant with Explanation */}
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
            <div className={`w-full p-5 rounded-2xl border ${isDarkTheme ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
               <h4 className="font-extrabold text-sm uppercase tracking-widest mb-3 text-rose-500 flex items-center gap-2"><Info className="w-4 h-4"/> How To Read Your Graph</h4>
               <p className={`text-sm font-medium ${tText} leading-relaxed`}>
                 <strong>Vertical Line (Anxiety):</strong> Higher dots mean you overthink, fear abandonment, and stress over texts.<br/>
                 <strong>Horizontal Line (Avoidance):</strong> Dots further to the right mean you easily feel trapped, suffocated, and pull away from closeness.
               </p>
            </div>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
          Your Brutally Honest Breakdowns
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          {/* GENERAL ATTACHMENT */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-2">How You Operate (General)</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#a855f7] mb-6">{profile.attachment.general.classification}</h2>
              
              <div className="space-y-5 mb-6">
                <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
                <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              
              <div className={`p-4 mb-6 rounded-xl border ${isDarkTheme ? 'bg-[#a855f7]/10 border-[#a855f7]/20' : 'bg-[#a855f7]/5 border-[#a855f7]/10'}`}>
                 <p className={`text-sm font-medium ${tText} leading-relaxed`}>
                   <strong className="text-[#a855f7]">High Avoidance</strong> means you view emotional closeness as a threat to your freedom. <strong className={isDarkTheme ? "text-slate-300" : "text-slate-800"}>High Anxiety</strong> means your nervous system is stuck waiting for the other shoe to drop.
                 </p>
              </div>

              <p className={`text-base md:text-lg font-medium leading-relaxed ${tText} flex-grow`}>
                {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
              </p>
            </div>
            <LockedInsightCard 
              title={`The ${profile.attachment.general.classification} Playbook`} 
              teaser="A tactical deep dive into the exact mind games your brain plays on you, and the copy-paste scripts you need to set boundaries today." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* ROMANTIC ATTACHMENT */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-2">Your Dating Blind Spots</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#ef4444] mb-8">{profile.attachment.romantic.classification}</h2>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#ef4444]" />
                <ScoreBar label="Anxiety" value={profile.attachment.romantic.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              <p className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
                {generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren)}
              </p>
            </div>
            <LockedInsightCard 
              title="Who You Magnetically Attract" 
              teaser="See exactly which toxic personalities you naturally attract, why they target you, and the exact red flags you are ignoring." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* CAREGIVERS */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
            <div className="flex flex-col gap-8 lg:gap-12 h-full">
              <div className={`rounded-3xl border p-8 md:p-10 flex-1 ${cardClass}`}>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-2">Childhood Roots: Mother</h3>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#8b5cf6] mb-6">{profile.attachment.mother.classification}</h2>
                <div className="space-y-4">
                  <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
                  <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                </div>
              </div>
              <div className={`rounded-3xl border p-8 md:p-10 flex-1 ${cardClass}`}>
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 mb-2">Childhood Roots: Father</h3>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#fb923c] mb-6">{profile.attachment.father.classification}</h2>
                <div className="space-y-4">
                  <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
                  <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                </div>
              </div>
            </div>
            <LockedInsightCard 
              title="The Hidden Trauma Loop" 
              teaser={`You scored high for '${profile.schemas[0]?.name || "Fear of Abandonment"}'. Discover the exact childhood events that programmed this trigger and how to delete it.`} 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* SELF ESTEEM & EMOTION REGULATION */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-12 border-t border-slate-200">
          <div className={`rounded-[24px] border p-6 md:p-10 flex flex-col justify-center h-full ${cardClass}`}>
            <h3 className={`text-xl md:text-2xl font-extrabold mb-4 text-center ${tH3}`}>
              Your Vulnerability Scanners
            </h3>
            <p className="text-center text-sm font-medium text-slate-500 mb-8 max-w-sm mx-auto">These meters show exactly how vulnerable you are to emotional manipulation right now.</p>
            
            <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 w-full mb-8">
              <CircularScore 
                title="Self-Esteem" 
                value={profile.selfEsteem.score} 
                max={100} 
                subtitle="Your Internal Armor" 
                color={profile.selfEsteem.score < 50 ? "#F6511D" : "#00A6ED"} 
                isDarkTheme={isDarkTheme} 
              />
              
              <div className={`hidden md:block w-px h-32 ${isDarkTheme ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
              <div className={`block md:hidden h-px w-32 ${isDarkTheme ? 'bg-slate-700' : 'bg-slate-100'}`}></div>

              <CircularScore 
                title="Emotion Control" 
                value={profile.emotionRegulation.score} 
                max={100} 
                subtitle="Spiral Risk" 
                color={profile.emotionRegulation.score > 60 ? "#F6511D" : "#FFB400"} 
                isDarkTheme={isDarkTheme} 
              />
            </div>
            
            <div className={`mt-auto p-5 rounded-[16px] border ${isDarkTheme ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <p className={`text-sm md:text-base font-medium leading-relaxed text-center ${tText}`}>
                {generateEmotionNarrative(profile.emotionRegulation.level)} {generateSelfEsteemNarrative(profile.selfEsteem.score)}
              </p>
            </div>
          </div>
          
          <LockedInsightCard 
            title="The Step-By-Step Extraction Plan" 
            teaser={`Understand why your '${profile.loveStyle}' love style magnetically draws you to toxic people, and unlock the exact, step-by-step plan to rewire your attraction today.`} 
            blurredBody={dummyBlurText}
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* UPSELL BANNER */}
        <UnlockBanner />
      <SharePrintButtons />

      </div>
    </div>
  </div>
  );
}
