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
    <div className="w-full">
      {/* --- FREE SECTION --- */}
      <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />

      <h3 className={`text-2xl font-extrabold ${tH3} mt-12 mb-6 border-b pb-2`}>1. Attachment Domains</h3>
      
      <ReportSection title="General Attachment Blueprint" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Anxiety (Fear of Rejection)" value={profile.attachment.general.anxietyScore} color="bg-[#d81159]" />
        <ScoreBar label="Avoidance (Fear of Intimacy)" value={profile.attachment.general.avoidanceScore} color="bg-[#8f2d56]" />
        <p className="mt-4 text-lg font-medium text-slate-700 leading-relaxed">
          <strong>Style: {profile.attachment.general.classification}</strong><br/>
          {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
        </p>
      </ReportSection>

      <ReportSection title="Romantic Attachment" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Romantic Anxiety" value={profile.attachment.romantic.anxietyScore} color="bg-[#d81159]" />
        <ScoreBar label="Romantic Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#8f2d56]" />
        <p className="mt-4 text-lg font-medium text-slate-700 leading-relaxed">
          <strong>Style: {profile.attachment.romantic.classification}</strong><br/>
          {generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren)}
        </p>
      </ReportSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`p-6 rounded-2xl border ${isDarkTheme ? "bg-[#b10f2e]/5 border-[#de7c5a]/40" : "bg-[#0496ff]/5 border-[#dee2ff]"}`}>
          <h4 className="font-bold text-lg mb-3">Maternal Figure</h4>
          <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color="bg-[#0496ff]" />
          <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#006ba6]" />
          <p className="mt-3 text-sm text-slate-700 font-medium">{generateAttachmentNarrative("mother", profile.attachment.mother.classification, isSingle, gender, hasChildren)}</p>
        </div>
        <div className={`p-6 rounded-2xl border ${isDarkTheme ? "bg-[#b10f2e]/5 border-[#de7c5a]/40" : "bg-[#0496ff]/5 border-[#dee2ff]"}`}>
          <h4 className="font-bold text-lg mb-3">Paternal Figure</h4>
          <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color="bg-[#0496ff]" />
          <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#006ba6]" />
          <p className="mt-3 text-sm text-slate-700 font-medium">{generateAttachmentNarrative("father", profile.attachment.father.classification, isSingle, gender, hasChildren)}</p>
        </div>
      </div>

      <h3 className={`text-2xl font-extrabold ${tH3} mt-12 mb-6 border-b pb-2`}>2. Deep Psychological Drivers</h3>

      {profile.schemas.length > 0 && (
        <ReportSection title="Core Childhood Schemas" isDarkTheme={isDarkTheme}>
          <p className="text-slate-600 font-medium mb-4">These are the unconscious 'operating systems' running beneath your attachment style.</p>
          <div className="space-y-4">
            {profile.schemas.map((schema, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <span className="font-bold text-[#d81159] uppercase tracking-wider text-sm block mb-1">{schema.name}</span>
                <span className="text-slate-700 font-medium">{generateSchemaNarrative(schema.name)}</span>
              </div>
            ))}
          </div>
        </ReportSection>
      )}

      <ReportSection title="Emotion Regulation (DERS-16)" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Dysregulation Risk" value={profile.emotionRegulation.score} color={profile.emotionRegulation.score > 60 ? "bg-red-500" : "bg-emerald-500"} />
        <p className="mt-2 text-lg font-medium text-slate-700 leading-relaxed">
          {generateEmotionNarrative(profile.emotionRegulation.level)}
        </p>
      </ReportSection>

      <ReportSection title="Baseline Self-Esteem" isDarkTheme={isDarkTheme}>
        <ScoreBar label="Self-Worth Index" value={profile.selfEsteem.score} color={profile.selfEsteem.score < 50 ? "bg-orange-400" : "bg-emerald-500"} />
        <p className="mt-2 text-lg font-medium text-slate-700 leading-relaxed">
          {generateSelfEsteemNarrative(profile.selfEsteem.level)}
        </p>
      </ReportSection>

      <ReportSection title="Romantic Love Style" isDarkTheme={isDarkTheme}>
        <div className="bg-[#ffbc42]/10 p-5 rounded-xl border border-[#ffbc42]/30 mb-3">
          <span className="font-bold text-[#b08800] text-lg block mb-1">{profile.loveStyle}</span>
          <p className="text-slate-700 font-medium">{generateLoveStyleNarrative(profile.loveStyle)}</p>
        </div>
      </ReportSection>

      {hasChildren && profile.parentingStyle && (
        <ReportSection title="Parenting Dynamics" isDarkTheme={isDarkTheme}>
          <div className="bg-[#006ba6]/5 p-5 rounded-xl border border-[#006ba6]/20">
            <span className="font-bold text-[#006ba6] text-lg block mb-1">{profile.parentingStyle} Parenting</span>
            <p className="text-slate-700 font-medium">{generateParentingNarrative(profile.parentingStyle)}</p>
          </div>
        </ReportSection>
      )}

      <ReportSection title="Inner World & Escapism" isDarkTheme={isDarkTheme}>
        <p className="text-lg font-medium text-slate-700 leading-relaxed">
          {generateDaydreamingNarrative(profile.fantasyLevel)}
        </p>
      </ReportSection>

      {/* --- PREMIUM LOCKED SECTION --- */}
      <h3 className={`text-2xl font-extrabold ${tH3} mt-16 mb-6 border-b pb-2 flex items-center gap-2`}>
        <Lock className="w-6 h-6 text-[#ffbc42]" /> 
        3. Premium Deep-Dive (Locked)
      </h3>

      <div className="space-y-4">
        <LockedInsightCard 
          title="Deep Schema Interpretation" 
          teaser="Discover the exact childhood events that programmed your current triggers, and how they sabotage your relationships today." 
        />
        <LockedInsightCard 
          title="Relationship Compatibility Patterns" 
          teaser="See exactly which attachment styles you thrive with, and which ones will trigger your deepest insecurities." 
        />
        <LockedInsightCard 
          title="Hidden Emotional Triggers" 
          teaser="The 3 specific behaviors from partners that instantly send your nervous system into a 'fight-or-flight' trauma response." 
        />
        <LockedInsightCard 
          title="Partner Attraction Magnets" 
          teaser="Understand why you are magnetically drawn to the same toxic or unavailable types, and how to rewire your attraction." 
        />
        <LockedInsightCard 
          title="Trauma-Driven Dynamics" 
          teaser="A clinical breakdown of the trauma-bonds you are prone to forming, and step-by-step strategies to break them permanently." 
        />
      </div>

      <UnlockBanner />

    </div>
  );
}
