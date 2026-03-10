import React from "react";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import CircularScore from "./CircularScore";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import { generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative } from "@/lib/psychometrics/narratives";
import { ShieldCheck, ArrowRight } from "lucide-react";

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

  const dummyBlurText = "This section contains a deep clinical analysis of your psychological patterns. It explains exactly how your nervous system reacts to specific triggers, the childhood origins of these patterns, and the subconscious mechanisms driving your behavior today. Unlocking this reveals the exact step-by-step strategies needed to rewire your responses and achieve secure attachment.";

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 w-full`}>
      {/* Clean, reliable centered container — NO w-screen negative margins */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* HERO SECTION — perfectly balanced cards */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-stretch">
          
          {/* LEFT CARD — generous padding, shadow, and breathing room */}
          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col justify-center ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-8 w-fit ${isDarkTheme ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
              <ShieldCheck className="w-4 h-4" />
              TRUSTED BY MILLIONS WORLDWIDE
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-extrabold leading-none tracking-tighter mb-8 ${tH3}`}>
              Your Complete<br />Attachment Profile
            </h2>
            
            <p className={`text-[17px] leading-relaxed mb-10 ${tText}`}>
              Your attachment style affects how you experience close relationships with others. When we feel secure, we experience healthier relationships that support and protect our well-being. If we feel insecure, it can be more difficult for us to feel safe, seen, valued, or supported in relationships.
            </p>
            
            <div className="mt-auto">
              <button className={`inline-flex items-center gap-3 font-semibold text-lg ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-[#006ba6] hover:text-[#0496ff]'}`}>
                Learn More <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT CARD — Quadrant */}
          <div className="flex items-center justify-center w-full h-full">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
          Detailed Domain Breakdown
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          {/* 2. GENERAL ATTACHMENT */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
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
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
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
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
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
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
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

          {/* 6. SELF ESTEEM & EMOTION REGULATION (DATA DASHBOARD) */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-12 border-t border-slate-200">
          <div className={`rounded-[24px] border p-6 md:p-10 flex flex-col justify-center h-full ${cardClass}`}>
            <h3 className={`text-xl md:text-2xl font-extrabold mb-8 text-center ${tH3}`}>
              Core Psychological Drivers
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 w-full mb-8">
              <CircularScore 
                title="Self-Esteem" 
                value={profile.selfEsteem.score} 
                max={100} 
                subtitle="Self-Worth Index" 
                color={profile.selfEsteem.score < 50 ? "#F6511D" : "#00A6ED"} 
                isDarkTheme={isDarkTheme} 
              />
              
              <div className={`hidden md:block w-px h-32 ${isDarkTheme ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
              <div className={`block md:hidden h-px w-32 ${isDarkTheme ? 'bg-slate-700' : 'bg-slate-100'}`}></div>

              <CircularScore 
                title="Emotion Control" 
                value={profile.emotionRegulation.score} 
                max={100} 
                subtitle="Dysregulation Risk" 
                color={profile.emotionRegulation.score > 60 ? "#F6511D" : "#FFB400"} 
                isDarkTheme={isDarkTheme} 
              />
            </div>
            
            <div className={`mt-auto p-5 rounded-[16px] border ${isDarkTheme ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <p className={`text-sm md:text-base font-medium leading-relaxed text-center ${tText}`}>
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

        {/* 7. UPSELL BANNER */}
        <UnlockBanner />

      </div>
    </div>
  </div>
  );
}