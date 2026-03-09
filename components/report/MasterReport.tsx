import React from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import ReportSection from "./ReportSection";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import { 
  generateAttachmentNarrative, generateSchemaNarrative, generateEmotionNarrative, 
  generateSelfEsteemNarrative, generateLoveStyleNarrative, generateDaydreamingNarrative, generateParentingNarrative 
} from "@/lib/psychometrics/narratives";
import { Lock } from "lucide-react";

interface MasterReportProps {
  profile: PsychologicalProfile;
  demographics: { isSingle: boolean; gender: string; hasChildren: boolean; };
  isDarkTheme: boolean;
}

export default function MasterReport({ profile, demographics, isDarkTheme }: MasterReportProps) {
  const { isSingle, gender, hasChildren } = demographics;

  // Map ECR-RS profile to Quadrant Points
  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const tH3 = isDarkTheme ? "text-[#280000]" : "text-[#006ba6]";

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* 1. ATTACHMENT QUADRANT */}
      <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />

      <h3 className={`text-2xl font-extrabold ${tH3} mt-12 mb-6 border-b pb-2`}>1. Attachment Domains</h3>
      
      {/* 2. GENERAL ATTACHMENT */}
      <ReportSection title="General Attachment" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Anxiety (Fear of Rejection)" value={profile.attachment.general.anxietyScore} color="bg-[#d81159]" />
        <ScoreBar label="Avoidance (Fear of Intimacy)" value={profile.attachment.general.avoidanceScore} color="bg-[#8f2d56]" />
        <p className="mt-4 text-lg font-medium text-slate-700 leading-relaxed">
          <strong className="uppercase tracking-wider text-sm text-[#d81159]">Style: {profile.attachment.general.classification}</strong><br/>
          {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
        </p>
      </ReportSection>

      {/* 3. ROMANTIC ATTACHMENT */}
      <ReportSection title="Romantic Attachment" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Romantic Anxiety" value={profile.attachment.romantic.anxietyScore} color="bg-[#d81159]" />
        <ScoreBar label="Romantic Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#8f2d56]" />
        <p className="mt-4 text-lg font-medium text-slate-700 leading-relaxed">
          <strong className="uppercase tracking-wider text-sm text-[#d81159]">Style: {profile.attachment.romantic.classification}</strong><br/>
          {generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren)}
        </p>
      </ReportSection>

      {/* 4. CAREGIVER ATTACHMENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`p-6 rounded-2xl border ${isDarkTheme ? "bg-[#b10f2e]/5 border-[#de7c5a]/40" : "bg-[#0496ff]/5 border-[#dee2ff]"}`}>
          <h4 className={`font-bold text-lg mb-3 ${tH3}`}>Maternal Figure</h4>
          <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color="bg-[#0496ff]" />
          <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#006ba6]" />
          <p className="mt-3 text-sm text-slate-700 font-medium leading-relaxed">
            <strong className="block mb-1 text-[#006ba6]">{profile.attachment.mother.classification}</strong>
            {generateAttachmentNarrative("mother", profile.attachment.mother.classification, isSingle, gender, hasChildren)}
          </p>
        </div>
        <div className={`p-6 rounded-2xl border ${isDarkTheme ? "bg-[#b10f2e]/5 border-[#de7c5a]/40" : "bg-[#0496ff]/5 border-[#dee2ff]"}`}>
          <h4 className={`font-bold text-lg mb-3 ${tH3}`}>Paternal Figure</h4>
          <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color="bg-[#0496ff]" />
          <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#006ba6]" />
          <p className="mt-3 text-sm text-slate-700 font-medium leading-relaxed">
            <strong className="block mb-1 text-[#006ba6]">{profile.attachment.father.classification}</strong>
            {generateAttachmentNarrative("father", profile.attachment.father.classification, isSingle, gender, hasChildren)}
          </p>
        </div>
      </div>

      {/* 5. WORK ATTACHMENT */}
      <ReportSection title="Workplace & Team Attachment" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Professional Anxiety" value={profile.attachment.work.anxietyScore} color="bg-[#ffbc42]" />
        <ScoreBar label="Professional Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#d81159]" />
        <p className="mt-4 text-lg font-medium text-slate-700 leading-relaxed">
          <strong className="uppercase tracking-wider text-sm text-[#d81159]">Style: {profile.attachment.work.classification}</strong><br/>
          {generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren)}
        </p>
      </ReportSection>

      <h3 className={`text-2xl font-extrabold ${tH3} mt-12 mb-6 border-b pb-2`}>2. Core Psychological Engine</h3>

      {/* 6. SELF ESTEEM */}
      <ReportSection title="Baseline Self-Esteem (Rosenberg)" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Self-Worth Index" value={profile.selfEsteem.score} color={profile.selfEsteem.score < 50 ? "bg-orange-400" : "bg-emerald-500"} />
        <p className="mt-2 text-lg font-medium text-slate-700 leading-relaxed">
          {generateSelfEsteemNarrative(profile.selfEsteem.level)}
        </p>
      </ReportSection>

      {/* 7. EMOTION REGULATION */}
      <ReportSection title="Emotion Regulation (DERS-16)" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Dysregulation Risk" value={profile.emotionRegulation.score} color={profile.emotionRegulation.score > 60 ? "bg-red-500" : "bg-emerald-500"} />
        <p className="mt-2 text-lg font-medium text-slate-700 leading-relaxed">
          {generateEmotionNarrative(profile.emotionRegulation.level)}
        </p>
      </ReportSection>

      {/* 8. PREMIUM INSIGHTS (LOCKED) */}
      <h3 className={`text-2xl font-extrabold ${tH3} mt-16 mb-6 border-b pb-2 flex items-center gap-2`}>
        <Lock className="w-6 h-6 text-[#ffbc42]" /> 
        3. Premium Deep-Dive (Locked)
      </h3>

      <div className="space-y-4">
        <LockedInsightCard 
          title="Deep Schema Interpretation" 
          teaser={`You scored high for '${profile.schemas[0]?.name || "Fear of Abandonment"}'. Discover the exact childhood events that programmed your current triggers, and how they sabotage your relationships today.`} 
        />
        <LockedInsightCard 
          title="Relationship Compatibility Patterns" 
          teaser="See exactly which attachment styles you thrive with, and which ones will trigger your deepest insecurities." 
        />
        <LockedInsightCard 
          title="Partner Attraction Magnets" 
          teaser={`Understand why your '${profile.loveStyle}' love style magnetically draws you to the same toxic or unavailable types.`} 
        />
        <LockedInsightCard 
          title="Trauma-Driven Dynamics" 
          teaser="A clinical breakdown of the trauma-bonds you are prone to forming, and step-by-step strategies to break them permanently." 
        />
      </div>

      {/* 9. UPSELL BANNER */}
      <UnlockBanner />

    </div>
  );
}
