import React from "react";
import { DashboardGrid } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock } from "lucide-react";

export default function AttractionMasterReport({ profile, isDarkTheme = false }: any) {
  const isPremium = profile.premiumUnlocked || false;

  // Modern, high-readability palette with dynamic action color
  const colors = {
    bgMain: "bg-transparent",
    bgCard: "bg-white",     
    borderCard: "border-[#ced2dc]", 
    textPrimary: "text-[#086788]",  
    textSecondary: "text-[#086788]/70",
    accent: "#DD1C1A"
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#DD1C1A"; // High Risk (Red)
    if (score >= 50) return "#F0C808"; // Moderate Risk (Yellow)
    return "#06AED5"; // Baseline (Blue)
  };

  // Custom Locked Card Component
  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-[24px] border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-xs font-bold uppercase tracking-widest text-[#DD1C1A] mb-4 flex items-center gap-2`}>
             Premium Insight Unlocked
          </h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>
            This premium section contains your personalized deep-dive analysis based on your unique combination of Big Five traits, Attachment patterns, and explicit mate preferences.
          </p>
        </div>
      );
    }

    return (
      <div className={`relative rounded-[24px] border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-sm`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>
            This premium section contains your personalized deep-dive analysis based on your unique combination of Big Five traits, Attachment patterns, and explicit mate preferences.
          </p>
          <div className="w-full h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#ced2dc] rounded"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm">
          <div className="w-14 h-14 bg-[#DD1C1A] rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button className={`px-6 py-3 rounded-full font-bold text-sm bg-[#DD1C1A] text-white shadow-lg hover:bg-[#C11715] transition-colors`}>
            Unlock Full Analysis
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 w-full max-w-5xl mx-auto space-y-12">
      
      {/* HERO SECTION */}
      <div className="bg-[#086788] text-white rounded-[32px] p-10 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-6 w-fit bg-white/10 border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[#F0C808]" />
            CLINICAL ATTRACTION MAP
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">Your Attraction Archetype</h1>
          <p className="text-lg opacity-80 mb-6 max-w-xl leading-relaxed">
            Based on your personality, attachment, and explicit preferences, we have mapped the exact psychological profile of the people you are drawn to.
          </p>
          <div className="inline-block bg-[#06AED5]/20 border border-[#06AED5]/40 px-6 py-3 rounded-xl backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider opacity-70 mb-1 font-bold">Primary Archetype</p>
            <p className="text-2xl font-bold text-white">{profile.archetype || "Analyzing..."}</p>
          </div>
        </div>
      </div>

      {/* CORE METRICS DASHBOARD (FREE) */}
      <div className="space-y-6">
        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} border-b ${colors.borderCard} pb-3`}>
          Your Baseline Psychology
        </h3>
        <p className={`${colors.textSecondary} max-w-3xl leading-relaxed`}>
          Your attraction patterns are a reflection of your own psychological baseline. Before we predict your partner, we measure you.
        </p>
        
        <DashboardGrid 
          healthScore={100 - profile.riskIndex} 
          gaugeScore={profile.riskIndex} 
          gaugeLabel="Attraction Risk Index" 
        />
      </div>

      {/* PREDICTED PARTNER PROFILE (LOCKED CONTENT) */}
      <div className="space-y-6 pt-8">
        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} border-b ${colors.borderCard} pb-3`}>
          Predicted Partner Trait Profile
        </h3>
        <p className={`${colors.textSecondary} max-w-3xl leading-relaxed`}>
          Based on scientific data regarding assortative mating (how similar traits cluster) and your explicit values, this is the exact behavioral profile you are statistically likely to pursue.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomLockedCard 
            title="The Partner Profile" 
            teaser="Unlock your report to see the Big Five, Attachment, and Dark Triad breakdown of the partners you keep choosing." 
          />
          <CustomLockedCard 
            title="Your Attraction Magnets" 
            teaser="Discover the specific traits you unknowingly over-value, and how they expose you to relationship risk." 
          />
        </div>
      </div>

      {/* NARRATIVE & BREAK THE PATTERN (LOCKED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <CustomLockedCard 
          title="The Psychological Narrative" 
          teaser="Read the full story of why your nervous system considers this specific archetype to be 'safe' or 'exciting'." 
        />
        <CustomLockedCard 
          title="Break The Pattern" 
          teaser="Concrete, clinical levers you can pull to re-wire your attraction away from toxic traits and toward stability." 
        />
      </div>

      {/* UPSELL BANNER */}
      {!isPremium && (
        <div className="pt-12">
          <UnlockBanner />
        </div>
      )}

    </div>
  );
}
