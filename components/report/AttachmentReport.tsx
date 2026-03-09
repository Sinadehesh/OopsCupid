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
}

export default function AttachmentReport({ profile, demographics }: AttachmentReportProps) {
  const { isSingle, gender, hasChildren } = demographics;

  const quadrantDomains: DomainPoint[] = Object.entries(profile.attachment).map(([key, data]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key], anxiety: data.anxietyScore, avoidance: data.avoidanceScore };
  });

  const dummyBlurText = "This section contains a deep clinical analysis of your psychological patterns. It explains exactly how your nervous system reacts to specific triggers, the childhood origins of these patterns, and the subconscious mechanisms driving your behavior today. Unlocking this reveals the exact step-by-step strategies needed to rewire your responses and achieve secure attachment.";

  return (
    // BREAKOUT CONTAINER: 100vw width breaks out of the narrow QuizWidget parent
    <div className="w-[100vw] ml-[calc(50%-50vw)] bg-[#fafafa] py-12 md:py-20 mt-8 border-t border-slate-200">
      
      {/* Inner Container restricted to max-w-5xl for perfect readability */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* 1. ATTACHMENT QUADRANT */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-8">Your Attachment Map</h2>
          <AttachmentQuadrant domains={quadrantDomains} />
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-16 mb-8 border-b border-slate-200 pb-3">
          Detailed Domain Breakdown
        </h3>
        
        {/* 2. GENERAL ATTACHMENT (Side-by-side grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 items-stretch">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col h-full">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#a855f7] mb-1">General Attachment</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">{profile.attachment.general.classification}</h2>
            <div className="space-y-4 mb-6 flex-grow">
              <ScoreBar label="Avoidance (Fear of Intimacy)" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
              <ScoreBar label="Anxiety (Fear of Rejection)" value={profile.attachment.general.anxietyScore} color="bg-slate-700" />
            </div>
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-700">
              {generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren)}
            </p>
          </div>
          <LockedInsightCard 
            title="Deep Schema Interpretation" 
            teaser={`You scored high for '${profile.schemas[0]?.name || "Fear of Abandonment"}'. Discover the childhood events that programmed this trigger.`} 
            blurredBody={dummyBlurText}
          />
        </div>

        {/* 3. ROMANTIC ATTACHMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 items-stretch">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col h-full">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ef4444] mb-1">Romantic Attachment</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">{profile.attachment.romantic.classification}</h2>
            <div className="space-y-4 mb-6 flex-grow">
              <ScoreBar label="Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#ef4444]" />
              <ScoreBar label="Anxiety" value={profile.attachment.romantic.anxietyScore} color="bg-slate-700" />
            </div>
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-700">
              {generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren)}
            </p>
          </div>
          <LockedInsightCard 
            title="Relationship Compatibility Patterns" 
            teaser="See exactly which attachment styles you thrive with romantically, and which ones will trigger your deepest insecurities." 
            blurredBody={dummyBlurText}
          />
        </div>

        {/* 4. CAREGIVERS */}
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 mt-16">Caregiver Attachment Patterns</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 items-stretch">
          <div className="flex flex-col gap-6 h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#8b5cf6] mb-1">Maternal Figure</h3>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">{profile.attachment.mother.classification}</h2>
              <div className="space-y-4">
                <ScoreBar label="Avoidance" value={profile.attachment.mother.avoidanceScore} color="bg-[#8b5cf6]" />
                <ScoreBar label="Anxiety" value={profile.attachment.mother.anxietyScore} color="bg-slate-700" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex-1">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#fb923c] mb-1">Paternal Figure</h3>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">{profile.attachment.father.classification}</h2>
              <div className="space-y-4">
                <ScoreBar label="Avoidance" value={profile.attachment.father.avoidanceScore} color="bg-[#fb923c]" />
                <ScoreBar label="Anxiety" value={profile.attachment.father.anxietyScore} color="bg-slate-700" />
              </div>
            </div>
          </div>
          <LockedInsightCard 
            title="Trauma-Driven Dynamics" 
            teaser="A clinical breakdown of the trauma-bonds you are prone to forming, and step-by-step strategies to break them permanently." 
            blurredBody={dummyBlurText}
          />
        </div>

        {/* 5. WORK ATTACHMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 items-stretch">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col h-full">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#f97316] mb-1">Attachment at Work</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6">{profile.attachment.work.classification}</h2>
            <div className="space-y-4 mb-6 flex-grow">
              <ScoreBar label="Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#f97316]" />
              <ScoreBar label="Anxiety" value={profile.attachment.work.anxietyScore} color="bg-slate-700" />
            </div>
            <p className="text-base md:text-lg font-medium leading-relaxed text-slate-700">
              {generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren)}
            </p>
          </div>
          <LockedInsightCard 
            title="Workplace & Success Triggers" 
            teaser="Understand how your attachment style affects your career trajectory, how you handle authority, and why you might experience imposter syndrome." 
            blurredBody={dummyBlurText}
          />
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-16 mb-8 border-t border-slate-200 pt-8 pb-3">Core Psychological Drivers</h3>

        {/* 6. SELF ESTEEM & EMOTION REGULATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 items-stretch">
          <div className="flex flex-col gap-6 h-full">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Baseline Self-Esteem</h3>
              <ScoreBar label="Total Self-Worth Index" value={profile.selfEsteem.score} color={profile.selfEsteem.score < 50 ? "bg-orange-400" : "bg-[#006ba6]"} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-6 border-t border-slate-100 flex-grow">
                <ScoreBar label="Self-Liking" value={profile.selfEsteem.selfLiking} max={20} color="bg-[#0496ff]" />
                <ScoreBar label="Self-Competence" value={profile.selfEsteem.selfCompetence} max={20} color="bg-[#0496ff]" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Emotion Regulation (DERS-16)</h3>
              <ScoreBar label="Overall Dysregulation Risk" value={profile.emotionRegulation.score} color={profile.emotionRegulation.score > 60 ? "bg-red-500" : "bg-[#006ba6]"} />
              <p className="mt-6 text-base font-medium leading-relaxed text-slate-700">
                {generateEmotionNarrative(profile.emotionRegulation.level)}
              </p>
            </div>
          </div>
          <LockedInsightCard 
            title="Partner Attraction Magnets" 
            teaser={`Understand why your '${profile.loveStyle}' love style magnetically draws you to the same toxic or unavailable types, and how to rewire your attraction.`} 
            blurredBody={dummyBlurText}
          />
        </div>

        {/* 7. UPSELL BANNER GRID */}
        <div className="mt-16 border-t border-slate-200 pt-16 pb-10">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-12">
            Unlock Your Full Psychological Profile
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Bundle */}
            <div className="rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col h-full bg-white">
              <h4 className="text-xl font-bold text-slate-800 mb-2">Basic Report</h4>
              <div className="text-4xl font-extrabold text-slate-800 mb-8">€27</div>
              <ul className="space-y-4 mb-10 flex-grow text-base font-medium text-slate-600">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Complete Attachment Breakdown</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Relationship Pattern Analysis</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/> <span>Actionable Dating Advice</span></li>
              </ul>
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all">
                Unlock Basic
              </button>
            </div>

            {/* Ultimate Bundle */}
            <div className="rounded-3xl shadow-xl border-2 border-[#ffbc42] p-8 flex flex-col h-full bg-white relative transform md:-translate-y-2">
              <div className="absolute top-0 right-0 bg-[#ffbc42] text-black text-xs font-extrabold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                Most Popular
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Ultimate Bundle</h4>
              <div className="text-4xl font-extrabold text-slate-800 mb-8">€47</div>
              <ul className="space-y-4 mb-10 flex-grow text-base font-semibold text-slate-800">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <strong>Everything in Basic PLUS:</strong></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <span>Deep Childhood Schema Analysis</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <span>Emotional Trigger Mapping</span></li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#ffbc42] shrink-0 mt-0.5"/> <span>Compatibility Matrices</span></li>
              </ul>
              <button className="w-full bg-[#ffbc42] hover:bg-[#e5a93c] text-black font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(255,188,66,0.3)]">
                Unlock Ultimate
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
