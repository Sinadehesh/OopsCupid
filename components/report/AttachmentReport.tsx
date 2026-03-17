import React from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import { generateAttachmentNarrative, generateEmotionNarrative, generateSelfEsteemNarrative } from "@/lib/psychometrics/narratives";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

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

  const dummyBlurText = "This section contains a deep clinical analysis of your psychological patterns. It explains exactly how your nervous system reacts to specific triggers, the childhood origins of these patterns, and the subconscious mechanisms driving your behavior today. Unlocking this reveals the exact step-by-step strategies needed to rewire your responses and achieve secure attachment. Do not ignore these red flags.";

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";

  // THE TEASER FUNCTION: Only renders the very first paragraph (The Sharp Truth) to create a curiosity gap.
  const renderTeaserNarrative = (text: string) => {
    const paragraphs = text.split('\n\n');
    const firstParagraph = paragraphs[0] || text;
    
    // Automatically bold labels like "The Sharp Truth:"
    const colonIndex = firstParagraph.indexOf(': ');
    if (colonIndex !== -1 && colonIndex < 40) {
      const title = firstParagraph.substring(0, colonIndex);
      const rest = firstParagraph.substring(colonIndex + 2);
      return (
        <div className="relative">
          <span className="block mb-2">
            <strong className={`font-extrabold ${isDarkTheme ? 'text-slate-100' : 'text-slate-900'}`}>{title}: </strong>
            {rest}
          </span>
          <div className="mt-4 p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center gap-3">
             <Lock className="w-4 h-4 text-slate-400" />
             <span className="text-sm font-semibold text-slate-500 italic">Advanced analysis & behavioral scripts locked.</span>
          </div>
        </div>
      );
    }
    return <span className="block mb-4">{firstParagraph}</span>;
  };

  const primarySchema = profile.schemas && profile.schemas.length > 0 ? profile.schemas[0].name : "Fear of Abandonment";
  const loveStyle = profile.loveStyle || "Pragma (Practical)";

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 border-t ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16 md:mb-24">
          <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit border shadow-sm ${isDarkTheme ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
              <ShieldCheck className="w-4 h-4" />
              Trusted by Millions Worldwide
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${tH3}`}>
              Your Complete<br />Attachment Profile
            </h2>
            <p className={`text-base md:text-lg font-medium leading-relaxed mb-8 ${tText}`}>
              Your preliminary results are ready. We have identified your primary survival strategies and baseline metrics. However, the exact psychological drivers and extraction plans are restricted to the Premium Analysis.
            </p>
          </div>
          <div className="flex flex-col w-full h-full justify-center">
            <AttachmentQuadrant domains={quadrantDomains} isDarkTheme={isDarkTheme} />
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
          The Gateway Analysis
        </h3>
        
        <div className="space-y-12 md:space-y-16">
          
          {/* GENERAL ATTACHMENT + PLAYBOOK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">General Attachment Style</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#a855f7] mb-8">{profile.attachment.general.classification}</h2>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Avoidance" value={profile.attachment.general.avoidanceScore} color="bg-[#a855f7]" />
                <ScoreBar label="Anxiety" value={profile.attachment.general.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              <div className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
                {renderTeaserNarrative(generateAttachmentNarrative("general", profile.attachment.general.classification, isSingle, gender, hasChildren))}
              </div>
            </div>
            <LockedInsightCard 
              title={`The ${profile.attachment.general.classification} Playbook`} 
              teaser="A tactical deep dive into the exact mind games your brain plays on you, and the copy-paste scripts you need to set boundaries today." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* ROMANTIC ATTACHMENT + ATTRACTION MAGNETS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Romantic Attachment Style</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#ef4444] mb-8">{profile.attachment.romantic.classification}</h2>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Avoidance" value={profile.attachment.romantic.avoidanceScore} color="bg-[#ef4444]" />
                <ScoreBar label="Anxiety" value={profile.attachment.romantic.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              <div className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
                {renderTeaserNarrative(generateAttachmentNarrative("romantic", profile.attachment.romantic.classification, isSingle, gender, hasChildren))}
              </div>
            </div>
            <LockedInsightCard 
              title="Who You Magnetically Attract" 
              teaser={`See exactly which toxic personalities naturally target your ${profile.attachment.romantic.classification} traits, why they target you, and the exact red flags you are ignoring.`} 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* CAREGIVERS + TRAUMA LOOP */}
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
              title="The Hidden Trauma Loop" 
              teaser={`You scored high for '${primarySchema}'. Discover the exact childhood events that programmed this trigger and the psychology of how to delete it.`} 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* WORK + EXTRACTION PLAN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch pt-8">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Your Attachment at Work</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] mb-8">{profile.attachment.work.classification}</h2>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Avoidance" value={profile.attachment.work.avoidanceScore} color="bg-[#f97316]" />
                <ScoreBar label="Anxiety" value={profile.attachment.work.anxietyScore} color={isDarkTheme ? "bg-slate-500" : "bg-slate-800"} />
              </div>
              <div className={`text-base md:text-lg font-medium leading-relaxed ${tText}`}>
                {renderTeaserNarrative(generateAttachmentNarrative("work", profile.attachment.work.classification, isSingle, gender, hasChildren))}
              </div>
            </div>
            <LockedInsightCard 
              title="The Step-By-Step Extraction Plan" 
              teaser={`Understand why your '${loveStyle}' love style magnetically draws you to toxic people, and unlock the exact, step-by-step plan to rewire your attraction today.`} 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

        </div>

        {/* UPSELL BANNER */}
        <UnlockBanner />
        <SharePrintButtons />

      </div>
    </div>
  );
}
