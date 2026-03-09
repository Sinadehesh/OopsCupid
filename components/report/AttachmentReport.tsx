import React from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import { generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative } from "@/lib/psychometrics/narratives";
import { Check } from "lucide-react";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: { isSingle: boolean; gender: string; hasChildren: boolean; };
  isDarkTheme: boolean;
}

export default function AttachmentReport({ profile, demographics, isDarkTheme }: AttachmentReportProps) {
  const { isSingle, gender, hasChildren } = demographics;

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const tH3 = isDarkTheme ? "text-[#e2e8f0]" : "text-[#006ba6]";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-700";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 shadow-sm";
  const cardTitle = isDarkTheme ? "text-slate-200" : "text-slate-800";

  return (
    // BREAKOUT CONTAINER: Forces full width outside of standard narrow columns
    <div className={`w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fdfbfb]'} py-10 md:py-16 mt-8 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* 1. ATTACHMENT QUADRANT */}
        <div className="mb-16">
          <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-12 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>Your Attachment Domains</h3>
        
        {/* 2. GENERAL ATTACHMENT (PC: Left Free | Right Locked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-stretch">
          <div className={`rounded-2xl border p-6 md:p-8 flex flex-col h-full ${cardClass}`}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#a855f7] mb-1">General Attachment</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#a855f7] mb-6">{profile.attachment.general.classification}</h2>
            <div className="space-y-4 mb-6 flex-grow">
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
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* 3. ROMANTIC ATTACHMENT (PC: Left Free | Right Locked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-stretch">
          <div className={`rounded-2xl border p-6 md:p-8 flex flex-col h-full ${cardClass}`}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ef4444] mb-1">Romantic Attachment</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#ef4444] mb-6">{profile.attachment.romantic.classification}</h2>
            <div className="space-y-4 mb-6 flex-grow">
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
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* 4. CAREGIVERS (PC: Left Free | Right Locked) */}
        <h3 className={`text-2xl md:text-3xl font-bold mb-6 mt-12 ${cardTitle}`}>Caregiver Attachment Patterns</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-stretch">
          <div className="flex flex-col gap-6 h-full">
            <div className={`rounded-2xl border p-6 md:p-8 flex-1 ${cardClass}`}>
              <h3 className="text-lg md:text-xl font-bold text-slate-500 mb-2">Maternal Figure</h3>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#8b5cf6] mb-6">{profile.attachment.mother.classification}</h2>
              <div className="space-y-4">
                <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
                <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
            </div>
            <div className={`rounded-2xl border p-6 md:p-8 flex-1 ${cardClass}`}>
              <h3 className="text-lg md:text-xl font-bold text-slate-500 mb-2">Paternal Figure</h3>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#fb923c] mb-6">{profile.attachment.father.classification}</h2>
              <div className="space-y-4">
                <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
                <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
            </div>
          </div>
          <LockedInsightCard 
            title="Deep Schema Interpretation" 
            teaser={`You scored high for '${profile.schemas[0]?.name || "Fear of Abandonment"}'. Discover the exact childhood events that programmed your current triggers, and how they sabotage you today.`} 
            isDarkTheme={isDarkTheme}
          />
        </div>

        {/* 5. WORK ATTACHMENT (PC: Left Free | Right Locked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 items-stretch">
          <div className={`rounded-2xl border p-6 md:p-8 flex flex-col h-full ${cardClass}`}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f97316] mb-1">Attachment at Work</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] mb-6">{profile.attachment.work.classification}</h2>
            <div className="space-y-4 mb-6 flex-grow">
              <ScoreBar label="Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#f97316]" />
              <ScoreBar label="Anxiety" value={profile.attachment.work.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
            </div>
            <p className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
              {generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren)}
            </p>
          </div>
          <LockedInsightCard 
            title="Workplace & Success Triggers" 
            teaser={`Understand how your attachment style affects your career trajectory, how you handle authority, and why you might experience imposter syndrome.`} 
            isDarkTheme={isDarkTheme}
          />
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pt-8 pb-3`}>Core Psychological Drivers</h3>

        {/* 6. SELF ESTEEM & EMOTION REGULATION (PC: Left Free | Right Locked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-stretch">
          <div className="flex flex-col gap-6 h-full">
            <div className={`rounded-2xl border p-6 md:p-8 flex-col ${cardClass}`}>
              <h3 className={`text-xl md:text-2xl font-bold mb-6 ${cardTitle}`}>Baseline Self-Esteem</h3>
              <ScoreBar label="Total Self-Worth Index" value={profile.selfEsteem.score} color={profile.selfEsteem.score < 50 ? "bg-orange-400" : "bg-[#006ba6]"} />
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t ${isDarkTheme ? 'border-slate-700' : 'border-slate-100'} flex-grow`}>
                <ScoreBar label="Self-Liking" value={profile.selfEsteem.selfLiking} max={20} color="bg-[#0496ff]" />
                <ScoreBar label="Self-Competence" value={profile.selfEsteem.selfCompetence} max={20} color="bg-[#0496ff]" />
              </div>
            </div>
            <div className={`rounded-2xl border p-6 md:p-8 flex-col ${cardClass}`}>
              <h3 className={`text-xl md:text-2xl font-bold mb-6 ${cardTitle}`}>Emotion Regulation</h3>
              <ScoreBar label="Overall Dysregulation Risk" value={profile.emotionRegulation.score} color={profile.emotionRegulation.score > 60 ? "bg-red-500" : "bg-[#006ba6]"} />
              <p className={`mt-6 text-base font-medium leading-relaxed ${tText}`}>
                {generateEmotionNarrative(profile.emotionRegulation.level)}
              </p>
            </div>
          </div>
          <LockedInsightCard 
            title="Partner Attraction Magnets" 
            teaser={`Understand why your '${profile.loveStyle}' love style magnetically draws you to the same toxic or unavailable types, and how to rewire your attraction.`} 
            isDarkTheme={isDarkTheme}
          />
        </div>

        <UnlockBanner />
      </div>
    </div>
  );
}
