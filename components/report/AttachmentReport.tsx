import React from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import { generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative } from "@/lib/psychometrics/narratives";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: { isSingle: boolean; gender: string; hasChildren: boolean; };
  isDarkTheme?: boolean;
}

export default function AttachmentReport({ profile, demographics, isDarkTheme = false }: AttachmentReportProps) {
  const { isSingle, gender, hasChildren } = demographics;

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const dummyBlurText = "This section contains a deep clinical analysis of your psychological patterns. It explains exactly how your nervous system reacts to specific triggers, the childhood origins of these patterns, and the subconscious mechanisms driving your behavior today. Unlocking this reveals the exact step-by-step strategies needed to rewire your responses and achieve secure attachment.";

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";

  return (
    // BREAKOUT CONTAINER: 100vw width breaks out of the narrow QuizWidget parent
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
      
      {/* Centered Max-Width Container for perfect readable line-lengths */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* 1. HERO SECTION & ATTACHMENT QUADRANT */}
        {/* Stacks naturally on mobile (text first, then chart). Side-by-side on md/lg screens. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16 md:mb-24">
          
          {/* Left Text Intro (Now inside a beautiful card!) */}
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit border shadow-sm ${isDarkTheme ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
              <ShieldCheck className="w-4 h-4" />
              Trusted by Millions Worldwide
            </div>
            
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${tH3}`}>
              Your Complete<br />Attachment Profile
            </h2>
            
            <p className={`text-base md:text-lg font-medium leading-relaxed mb-8 ${tText}`}>
              Your attachment style affects how you experience close relationships with others. When we feel secure, we experience healthier relationships that support and protect our well-being. If we feel insecure, it can be more difficult for us to feel safe, seen, valued, or supported in relationships.
            </p>
            
            <div className="mt-auto">
              <button className={`inline-flex items-center gap-2 font-bold transition-all text-lg group ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-[#006ba6] hover:text-[#0496ff]'}`}>
                Learn More <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Quadrant (The component already renders its own white card) */}
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>

        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
          Detailed Domain Breakdown
        </h3>
        
        <div className="space-y-12 md:space-y-16">
          
          {/* 2. GENERAL ATTACHMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">General Attachment Style</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#a855f7] mb-8">{profile.attachment.general.classification}</h2>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
                <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              <p className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
                {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
              </p>
            </div>
            <LockedInsightCard 
              title={`${profile.attachment.general.classification} Characteristics`} 
              teaser="A deep dive into your primary attachment behaviors, defensive patterns, and the exact psychological mechanisms driving your responses." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* 3. ROMANTIC ATTACHMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Romantic Attachment Style</h4>
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
              title="Relationship Compatibility Patterns" 
              teaser="See exactly which attachment styles you thrive with romantically, and which ones will trigger your deepest insecurities." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* 4. CAREGIVERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
            <div className="flex flex-col gap-8 lg:gap-12 h-full">
              <div className={`rounded-3xl border p-8 md:p-10 flex-1 ${cardClass}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Maternal Figure</h3>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#8b5cf6] mb-6">{profile.attachment.mother.classification}</h2>
                <div className="space-y-4">
                  <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
                  <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                </div>
              </div>
              <div className={`rounded-3xl border p-8 md:p-10 flex-1 ${cardClass}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Paternal Figure</h3>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#fb923c] mb-6">{profile.attachment.father.classification}</h2>
                <div className="space-y-4">
                  <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
                  <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
                </div>
              </div>
            </div>
            <LockedInsightCard 
              title="Deep Schema Interpretation" 
              teaser={`You scored high for '${profile.schemas[0]?.name || "Fear of Abandonment"}'. Discover the exact childhood events that programmed this trigger.`} 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* 5. WORK ATTACHMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Attachment at Work</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] mb-8">{profile.attachment.work.classification}</h2>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#f97316]" />
                <ScoreBar label="Anxiety" value={profile.attachment.work.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              <p className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
                {generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren)}
              </p>
            </div>
            <LockedInsightCard 
              title="Workplace & Success Triggers" 
              teaser="Understand how your attachment style affects your career trajectory, how you handle authority, and why you might experience imposter syndrome." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* 6. SELF ESTEEM & EMOTION REGULATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-12 border-t border-slate-200">
            <div className="flex flex-col gap-8 lg:gap-12 h-full">
              <div className={`rounded-3xl border p-8 md:p-10 flex-col ${cardClass}`}>
                <h3 className={`text-xl font-bold mb-6 ${tH3}`}>Baseline Self-Esteem</h3>
                <ScoreBar label="Total Self-Worth Index" value={profile.selfEsteem.score} color={profile.selfEsteem.score < 50 ? "bg-orange-400" : "bg-[#006ba6]"} />
              </div>
              <div className={`rounded-3xl border p-8 md:p-10 flex-col ${cardClass}`}>
                <h3 className={`text-xl font-bold mb-6 ${tH3}`}>Emotion Regulation</h3>
                <ScoreBar label="Overall Dysregulation Risk" value={profile.emotionRegulation.score} color={profile.emotionRegulation.score > 60 ? "bg-red-500" : "bg-[#006ba6]"} />
                <p className={`mt-6 text-base font-medium leading-relaxed ${tText}`}>
                  {generateEmotionNarrative(profile.emotionRegulation.level)}
                </p>
              </div>
            </div>
            <LockedInsightCard 
              title="Partner Attraction Magnets" 
              teaser={`Understand why your '${profile.loveStyle}' love style magnetically draws you to the same toxic or unavailable types, and how to rewire your attraction.`} 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>
        </div>

        {/* 7. UPSELL BANNER */}
        <UnlockBanner />
      <SharePrintButtons />

      </div>
    </div>
  );
}
