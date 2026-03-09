import React from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import { 
  generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative 
} from "@/lib/psychometrics/narratives";
import { Check } from "lucide-react";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: { isSingle: boolean; gender: string; hasChildren: boolean; };
  isDarkTheme: boolean;
}

export default function AttachmentReport({ profile, demographics }: AttachmentReportProps) {
  const { isSingle, gender, hasChildren } = demographics;

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  return (
    // BREAKOUT CONTAINER: Forces full width even if parent QuizWidget is restricted
    <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[#fdfbfb] py-10 md:py-16 mt-8 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* 1. ATTACHMENT QUADRANT */}
        <div className="mb-16">
          <AttachmentQuadrant domains={quadrantDomains} />
        </div>

        {/* 2. GENERAL ATTACHMENT */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">General Attachment Style</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#a855f7] mb-6">{profile.attachment.general.classification}</h2>
          <div className="space-y-4 mb-6">
            <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
            <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color="bg-slate-800" />
          </div>
          <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
            {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
          </p>
        </div>

        {/* 3. ROMANTIC ATTACHMENT */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Your Romantic Attachment Style</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#ef4444] mb-6">{profile.attachment.romantic.classification}</h2>
          <div className="space-y-4 mb-6">
            <ScoreBar label="Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#ef4444]" />
            <ScoreBar label="Anxiety" value={profile.attachment.romantic.anxietyScore} color="bg-slate-800" />
          </div>
          <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
            {generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren)}
          </p>
        </div>

        {/* 4. CAREGIVER ATTACHMENT */}
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 mt-12">Caregiver Attachment Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-500 mb-2">Maternal Figure</h3>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#8b5cf6] mb-6">{profile.attachment.mother.classification}</h2>
            <div className="space-y-4 mb-6">
              <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
              <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color="bg-slate-800" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-500 mb-2">Paternal Figure</h3>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#fb923c] mb-6">{profile.attachment.father.classification}</h2>
            <div className="space-y-4 mb-6">
              <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
              <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color="bg-slate-800" />
            </div>
          </div>
        </div>

        {/* 5. WORK ATTACHMENT */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Your Attachment at Work</h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] mb-6">{profile.attachment.work.classification}</h2>
          <div className="space-y-4 mb-6">
            <ScoreBar label="Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#f97316]" />
            <ScoreBar label="Anxiety" value={profile.attachment.work.anxietyScore} color="bg-slate-800" />
          </div>
          <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
            {generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren)}
          </p>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 mt-16 border-t border-slate-200 pt-8">Self-Esteem & Emotion Regulation</h3>

        {/* 6. SELF ESTEEM */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Baseline Self-Esteem (Rosenberg)</h3>
          <ScoreBar label="Total Self-Worth Index" value={profile.selfEsteem.score} color="bg-[#006ba6]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t border-slate-100">
            <ScoreBar label="Self-Liking" value={profile.selfEsteem.selfLiking} max={20} color="bg-slate-400" />
            <ScoreBar label="Self-Competence" value={profile.selfEsteem.selfCompetence} max={20} color="bg-slate-400" />
          </div>
        </div>

        {/* 7. EMOTION REGULATION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Emotion Regulation (DERS-16)</h3>
          <ScoreBar label="Overall Dysregulation Risk" value={profile.emotionRegulation.score} color="bg-[#d81159]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t border-slate-100">
            <ScoreBar label="Nonacceptance" value={profile.emotionRegulation.subscales.nonacceptance} max={20} color="bg-slate-400" />
            <ScoreBar label="Goals" value={profile.emotionRegulation.subscales.goals} max={15} color="bg-slate-400" />
            <ScoreBar label="Impulse Control" value={profile.emotionRegulation.subscales.impulse} max={15} color="bg-slate-400" />
            <ScoreBar label="Strategies" value={profile.emotionRegulation.subscales.strategies} max={20} color="bg-slate-400" />
            <ScoreBar label="Clarity" value={profile.emotionRegulation.subscales.clarity} max={10} color="bg-slate-400" />
          </div>
        </div>

        {/* 8. PREMIUM INSIGHTS (LOCKED) */}
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6 mt-16 text-center">Premium Insights (Locked)</h3>
        <div className="space-y-6 mb-16">
          <LockedInsightCard 
            title={`${profile.attachment.general.classification} Characteristics`} 
            teaser="A deep dive into your primary attachment behaviors, defensive patterns, and the exact psychological mechanisms driving your responses." 
          />
          <LockedInsightCard 
            title="Relationship Compatibility Patterns" 
            teaser="See exactly which attachment styles you thrive with romantically, and which ones will trigger your deepest insecurities." 
          />
          <LockedInsightCard 
            title="Deep Schema Interpretation" 
            teaser="Discover the exact childhood events that programmed your current triggers, and how they sabotage you today." 
          />
          <LockedInsightCard 
            title="Trauma-Driven Dynamics" 
            teaser="A clinical breakdown of the trauma-bonds you are prone to forming, and step-by-step strategies to break them permanently." 
          />
        </div>

        {/* 9. UPSELL BANNER GRID */}
        <div className="mt-16 border-t border-slate-200 pt-16 pb-10">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-12">
            Unlock Your Full Psychological Profile
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Bundle */}
            <div className="rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col bg-white h-full">
              <h4 className="text-xl font-bold text-slate-800 mb-2">Basic Report</h4>
              <div className="text-4xl font-extrabold text-slate-800 mb-8">€27</div>
              <ul className="space-y-4 mb-10 flex-grow text-base text-slate-600 font-medium">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Complete Attachment Breakdown</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Relationship Pattern Analysis</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Actionable Dating Advice</span></li>
              </ul>
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-full transition-all">
                Unlock Basic
              </button>
            </div>

            {/* Ultimate Bundle */}
            <div className="rounded-3xl shadow-xl border-2 border-[#ffbc42] p-8 flex flex-col bg-white h-full relative transform md:-translate-y-2">
              <div className="absolute top-0 right-0 bg-[#ffbc42] text-black text-xs font-extrabold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                Most Popular
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Ultimate Bundle</h4>
              <div className="text-4xl font-extrabold text-slate-800 mb-8">€47</div>
              <ul className="space-y-4 mb-10 flex-grow text-base text-slate-800 font-semibold">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <strong>Everything in Basic PLUS:</strong></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <span>Deep Childhood Schema Analysis</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <span>Emotional Trigger Mapping</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <span>Compatibility Matrices</span></li>
              </ul>
              <button className="w-full bg-[#ffbc42] hover:bg-[#e5a93c] text-black font-bold py-4 rounded-full transition-all shadow-md">
                Unlock Ultimate
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
