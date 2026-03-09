import React from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import ReportSection from "./ReportSection";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import { 
  generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative 
} from "@/lib/psychometrics/narratives";
import { Lock, Check } from "lucide-react";

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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* 1. ATTACHMENT QUADRANT */}
      <div className="mb-12">
        <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
      </div>

      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-12 mb-8 border-b pb-3`}>Your Attachment Domains</h3>
      
      {/* 2. GENERAL ATTACHMENT & LOCKED INSIGHT */}
      <div className="mb-12">
        <ReportSection title="" isDarkTheme={isDarkTheme}>
          <div className="mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#a855f7] mb-1">General Attachment</h4>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${tH3}`}>{profile.attachment.general.classification}</h2>
          </div>
          <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
          <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color="bg-[#d81159]" />
          <p className={`mt-6 text-base md:text-lg font-medium ${tText} leading-relaxed`}>
            {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
          </p>
        </ReportSection>
        {/* Placed immediately after General */}
        <LockedInsightCard 
          title={`${profile.attachment.general.classification} Characteristics`} 
          teaser="A deep dive into your primary attachment behaviors, defensive patterns, and the exact psychological mechanisms driving your responses." 
        />
      </div>

      {/* 3. ROMANTIC ATTACHMENT & LOCKED INSIGHT */}
      <div className="mb-12">
        <ReportSection title="" isDarkTheme={isDarkTheme}>
          <div className="mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ef4444] mb-1">Romantic Attachment</h4>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${tH3}`}>{profile.attachment.romantic.classification}</h2>
          </div>
          <ScoreBar label="Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#ef4444]" />
          <ScoreBar label="Anxiety" value={profile.attachment.romantic.anxietyScore} color="bg-[#d81159]" />
          <p className={`mt-6 text-base md:text-lg font-medium ${tText} leading-relaxed`}>
            {generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren)}
          </p>
        </ReportSection>
        {/* Placed immediately after Romantic */}
        <LockedInsightCard 
          title="Relationship Compatibility Patterns" 
          teaser="See exactly which attachment styles you thrive with romantically, and which ones will trigger your deepest insecurities." 
        />
      </div>

      {/* 4. CAREGIVER ATTACHMENT GRID & LOCKED INSIGHT */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ReportSection title="Maternal Figure" isDarkTheme={isDarkTheme}>
            <h3 className={`text-2xl font-extrabold ${tH3} mb-4`}>{profile.attachment.mother.classification}</h3>
            <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
            <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color="bg-[#d81159]" />
            <p className={`mt-4 text-base font-medium ${tText} leading-relaxed`}>
              {generateAttachmentNarrative("mother", profile.attachment.mother.classification, isSingle, gender, hasChildren)}
            </p>
          </ReportSection>

          <ReportSection title="Paternal Figure" isDarkTheme={isDarkTheme}>
            <h3 className={`text-2xl font-extrabold ${tH3} mb-4`}>{profile.attachment.father.classification}</h3>
            <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
            <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color="bg-[#d81159]" />
            <p className={`mt-4 text-base font-medium ${tText} leading-relaxed`}>
              {generateAttachmentNarrative("father", profile.attachment.father.classification, isSingle, gender, hasChildren)}
            </p>
          </ReportSection>
        </div>
        {/* Placed immediately after Caregivers (tied to Schemas) */}
        <LockedInsightCard 
          title="Deep Schema Interpretation" 
          teaser={`You scored high for '${profile.schemas[0]?.name || "Fear of Abandonment"}'. Discover the exact childhood events that programmed your current triggers, and how they sabotage you today.`} 
        />
      </div>

      {/* 5. WORK ATTACHMENT */}
      <div className="mb-12">
        <ReportSection title="" isDarkTheme={isDarkTheme}>
          <div className="mb-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f97316] mb-1">Attachment at Work</h4>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${tH3}`}>{profile.attachment.work.classification}</h2>
          </div>
          <ScoreBar label="Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#f97316]" />
          <ScoreBar label="Anxiety" value={profile.attachment.work.anxietyScore} color="bg-[#d81159]" />
          <p className={`mt-6 text-base md:text-lg font-medium ${tText} leading-relaxed`}>
            {generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren)}
          </p>
        </ReportSection>
      </div>

      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b pb-3`}>Core Psychological Drivers</h3>

      {/* 6. SELF ESTEEM */}
      <div className="mb-12">
        <ReportSection title="Baseline Self-Esteem" isDarkTheme={isDarkTheme}>
          <ScoreBar label="Total Self-Worth Index" value={profile.selfEsteem.score} color={profile.selfEsteem.score < 50 ? "bg-orange-400" : "bg-[#006ba6]"} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-6">
            <ScoreBar label="Self-Liking" value={profile.selfEsteem.selfLiking} max={20} color="bg-[#0496ff]" />
            <ScoreBar label="Self-Competence" value={profile.selfEsteem.selfCompetence} max={20} color="bg-[#0496ff]" />
          </div>

          <p className={`mt-6 text-base md:text-lg font-medium ${tText} leading-relaxed`}>
            {generateSelfEsteemNarrative(profile.selfEsteem.level)}
          </p>
        </ReportSection>
      </div>

      {/* 7. EMOTION REGULATION & LOCKED INSIGHT */}
      <div className="mb-12">
        <ReportSection title="Emotion Regulation (DERS-16)" isDarkTheme={isDarkTheme}>
          <ScoreBar label="Overall Dysregulation Risk" value={profile.emotionRegulation.score} color={profile.emotionRegulation.score > 60 ? "bg-red-500" : "bg-[#006ba6]"} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-6">
            <ScoreBar label="Nonacceptance" value={profile.emotionRegulation.subscales.nonacceptance} max={20} color="bg-slate-400" />
            <ScoreBar label="Goals" value={profile.emotionRegulation.subscales.goals} max={15} color="bg-slate-400" />
            <ScoreBar label="Impulse Control" value={profile.emotionRegulation.subscales.impulse} max={15} color="bg-slate-400" />
            <ScoreBar label="Strategies" value={profile.emotionRegulation.subscales.strategies} max={20} color="bg-slate-400" />
            <ScoreBar label="Clarity" value={profile.emotionRegulation.subscales.clarity} max={10} color="bg-slate-400" />
          </div>

          <p className={`mt-6 text-base md:text-lg font-medium ${tText} leading-relaxed`}>
            {generateEmotionNarrative(profile.emotionRegulation.level)}
          </p>
        </ReportSection>
        {/* Placed immediately after Emotion Regulation */}
        <LockedInsightCard 
          title="Emotional Triggers & Core Wounds" 
          teaser="The 3 specific behaviors from partners that instantly send your nervous system into a 'fight-or-flight' trauma response." 
        />
      </div>

      {/* 8. ADVANCED DYNAMICS (LOCKED) */}
      <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b pb-3 flex items-center gap-3`}>
        <Lock className="w-7 h-7 text-[#ffbc42]" /> 
        Advanced Relational Dynamics (Locked)
      </h3>

      <div className="space-y-6">
        <LockedInsightCard 
          title="Partner Attraction Magnets" 
          teaser={`Understand why your '${profile.loveStyle}' love style magnetically draws you to the same toxic or unavailable types, and how to rewire your attraction.`} 
        />
        <LockedInsightCard 
          title="Trauma-Driven Dynamics" 
          teaser="A clinical breakdown of the trauma-bonds you are prone to forming, and step-by-step strategies to break them permanently." 
        />
      </div>

      {/* 9. UPSELL BANNER GRID */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h3 className={`text-3xl md:text-4xl font-extrabold text-center mb-10 ${tH3}`}>
          Unlock Your Full Psychological Profile
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Bundle */}
          <div className={`rounded-3xl shadow-lg border border-gray-200 p-8 flex flex-col h-full ${isDarkTheme ? 'bg-slate-800/50' : 'bg-white'}`}>
            <h4 className={`text-xl font-bold mb-2 ${tH3}`}>Personalized Attachment Report</h4>
            <div className={`text-4xl font-extrabold mb-8 ${tH3}`}>€27</div>
            <ul className={`space-y-4 mb-10 flex-grow text-base ${tText}`}>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Complete Attachment Style Breakdown</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Relationship Pattern Analysis</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Actionable Dating & Healing Advice</span></li>
            </ul>
            <button className="w-full bg-[#006ba6] hover:bg-[#0496ff] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-md hover:shadow-lg">
              Unlock Basic Report
            </button>
          </div>

          {/* Ultimate Bundle */}
          <div className="bg-gradient-to-b from-[#006ba6]/10 to-[#0496ff]/20 rounded-3xl shadow-xl border-2 border-[#0496ff] p-8 flex flex-col h-full relative">
            <div className="absolute top-0 right-0 bg-[#ffbc42] text-[#334B63] text-xs font-extrabold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
              Most Popular
            </div>
            <h4 className="text-xl font-bold mb-2 text-[#006ba6]">Ultimate Relationship Blueprint</h4>
            <div className="text-4xl font-extrabold mb-8 text-[#006ba6]">€47</div>
            <ul className="space-y-4 mb-10 flex-grow text-base text-slate-800 font-medium">
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#0496ff] shrink-0 mt-0.5"/> <strong>Everything in the Basic Report PLUS:</strong></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#0496ff] shrink-0 mt-0.5"/> <span>Deep Childhood Schema Analysis</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#0496ff] shrink-0 mt-0.5"/> <span>Emotional Trigger Mapping</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#0496ff] shrink-0 mt-0.5"/> <span>Healing Strategy Workbook</span></li>
              <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#0496ff] shrink-0 mt-0.5"/> <span>Compatibility Matrices</span></li>
            </ul>
            <button className="w-full bg-[#ffbc42] hover:bg-[#e5a93c] text-[#334B63] font-bold text-lg py-4 rounded-xl transition-all shadow-[0_6px_20px_rgba(255,188,66,0.3)] hover:shadow-[0_8px_25px_rgba(255,188,66,0.5)] transform hover:-translate-y-0.5">
              Unlock Ultimate Blueprint
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
