import React from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { AttractionProfile } from "@/lib/psychometrics/attraction/types";
import { ScoreBar } from "./ScoreBars";
import LockedInsightCard from "./LockedInsightCard";
import UnlockBanner from "./UnlockBanner";
import CircularScore from "./CircularScore";
import { ShieldCheck, ArrowRight, Magnet } from "lucide-react";

interface AttractionMasterReportProps {
  profile: AttractionProfile;
  isDarkTheme?: boolean;
}

export default function AttractionMasterReport({ profile, isDarkTheme = false }: AttractionMasterReportProps) {
  const dummyBlurText = "This section contains a deep clinical analysis of your psychological patterns. It explains exactly how your nervous system reacts to specific triggers, the childhood origins of these patterns, and the subconscious mechanisms driving your behavior today. Unlocking this reveals the exact step-by-step strategies needed to rewire your responses and break the cycle.";

  const tH3 = isDarkTheme ? "text-slate-100" : "text-slate-900";
  const tText = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const cardClass = isDarkTheme ? "bg-slate-800 border-slate-700 shadow-sm" : "bg-white border-slate-200 shadow-sm";

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#0f172a]' : 'bg-[#fafafa]'} py-12 w-full`}>
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* HERO SECTION */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-stretch">
          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col justify-center ${cardClass}`}>
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-8 w-fit ${isDarkTheme ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
              <Magnet className="w-4 h-4" />
              YOUR ATTRACTION BLUEPRINT
            </div>
            
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Primary Archetype</h4>
            <h2 className={`text-4xl md:text-5xl font-extrabold leading-none tracking-tighter mb-6 ${tH3}`}>
              {profile.archetypes.primary.label}
            </h2>
            
            <p className={`text-[17px] leading-relaxed mb-10 ${tText}`}>
              {profile.archetypes.primary.description}
            </p>
            
            <div className={`mt-auto p-6 rounded-[16px] border ${isDarkTheme ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
              <h5 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">The Shadow Pattern</h5>
              <p className={`text-sm md:text-base font-medium leading-relaxed ${tText}`}>
                {profile.archetypes.primary.shadowPattern}
              </p>
            </div>
          </div>

          {/* RISK INDEX & OVERVIEW */}
          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col items-center justify-center text-center ${cardClass}`}>
            <h3 className={`text-2xl font-extrabold mb-8 ${tH3}`}>Attraction Risk Index</h3>
            <CircularScore 
              title="Risk Score" 
              value={profile.riskIndex.score} 
              max={100} 
              subtitle={profile.riskIndex.band} 
              color={profile.riskIndex.score > 50 ? "#F6511D" : (profile.riskIndex.score > 25 ? "#FFB400" : "#00A6ED")} 
              isDarkTheme={isDarkTheme} 
            />
            <p className={`mt-8 text-base font-medium leading-relaxed ${tText} max-w-sm`}>
              This index measures the statistical probability that your psychological traits will draw you toward emotionally turbulent, unavailable, or high-conflict partners.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${tH3} mt-16 mb-8 border-b ${isDarkTheme ? 'border-slate-800' : 'border-slate-200'} pb-3`}>
          Your Trait Profile
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          {/* BIG FIVE TRAITS vs PREDICTED PARTNER PROFILE */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h3 className={`text-xl font-bold mb-6 ${tH3}`}>Normative Personality (Big Five)</h3>
              <div className="space-y-5 flex-grow">
                <ScoreBar label="Extraversion" value={profile.userTraits.bigFive.extraversion.normalized} color="bg-[#00A6ED]" />
                <ScoreBar label="Agreeableness" value={profile.userTraits.bigFive.agreeableness.normalized} color="bg-[#00A6ED]" />
                <ScoreBar label="Conscientiousness" value={profile.userTraits.bigFive.conscientiousness.normalized} color="bg-[#00A6ED]" />
                <ScoreBar label="Neuroticism" value={profile.userTraits.bigFive.neuroticism.normalized} color="bg-[#F6511D]" />
                <ScoreBar label="Openness" value={profile.userTraits.bigFive.openness.normalized} color="bg-[#00A6ED]" />
              </div>
            </div>
            
            {/* LOCKED: PREDICTED PARTNER PROFILE */}
            <LockedInsightCard 
              title="Predicted Partner Profile" 
              teaser="Based on assortative mating algorithms, discover the exact personality and attachment traits you are statistically guaranteed to attract." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

          {/* ATTACHMENT & MALADAPTIVE TRAITS vs DARK TRIAD ANALYSIS */}
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${cardClass}`}>
              <h3 className={`text-xl font-bold mb-6 ${tH3}`}>Attachment & Core Needs</h3>
              <div className="space-y-5 mb-8">
                <ScoreBar label="Attachment Anxiety" value={profile.userTraits.attachment.anxiety.normalized} color="bg-[#FFB400]" />
                <ScoreBar label="Attachment Avoidance" value={profile.userTraits.attachment.avoidance.normalized} color="bg-[#FFB400]" />
              </div>
              <h3 className={`text-xl font-bold mb-6 mt-4 ${tH3}`}>Maladaptive Traits (PID-5)</h3>
              <div className="space-y-5">
                <ScoreBar label="Negative Affectivity" value={profile.userTraits.maladaptive.negativeAffect.normalized} color="bg-[#a855f7]" />
                <ScoreBar label="Detachment" value={profile.userTraits.maladaptive.detachment.normalized} color="bg-[#a855f7]" />
                <ScoreBar label="Antagonism" value={profile.userTraits.maladaptive.antagonism.normalized} color="bg-[#a855f7]" />
              </div>
            </div>
            
            {/* LOCKED: DARK TRIAD ANALYSIS */}
            <LockedInsightCard 
              title="Dark Triad Compatibility" 
              teaser="See your vulnerability to Machiavellian, Narcissistic, and Psychopathic partners, and why your nervous system might confuse danger with chemistry." 
              blurredBody={dummyBlurText}
              isDarkTheme={isDarkTheme}
            />
          </div>

        </div>

        {/* UPSELL BANNER & FOOTER */}
        <div className="mt-16">
          <UnlockBanner />
          <SharePrintButtons />
        </div>

      </div>
    </div>
  );
}
