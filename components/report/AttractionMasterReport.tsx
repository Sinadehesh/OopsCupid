import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

export default function AttractionMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // Exact readable dark/light layout used in Manipulation test
  const colors = {
    bgMain: "bg-[#f2f5fa]", 
    bgCard: "bg-white",     
    borderCard: "border-[#ced2dc]", 
    textPrimary: "text-[#2a2522]",  
    textSecondary: "text-[#2a2522]/70",
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#DD1C1A"; // Red
    if (score >= 50) return "#F0C808"; // Yellow
    return "#06AED5"; // Blue
  };

  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#086788] mb-4 flex items-center gap-2">
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
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-sm`}>
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
          <div className="w-14 h-14 bg-[#086788] rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
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
    <div className={`py-6 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* HERO SECTION — Striking Dark Contrast Card */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-stretch">
          
          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col justify-center bg-[#2a2522] border-[#2a2522] shadow-2xl relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="relative z-10">
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-8 w-fit bg-[#086788] text-white shadow-md`}>
                <ShieldCheck className="w-4 h-4 text-[#F0C808]" />
                CLINICAL ATTRACTION MAP
              </div>
              
              <h2 className={`text-4xl md:text-5xl font-extrabold leading-none tracking-tighter mb-8 text-[#f2f5fa]`}>
                Your Attraction<br />Archetype
              </h2>
              
              <p className={`text-[17px] leading-relaxed mb-6 text-[#f2f5fa]/80`}>
                Based on your 78-item psychological screening, we have mapped the exact behavioral profile of the people your nervous system is drawn to.
              </p>

              <div className={`inline-block border p-4 rounded-xl mb-10 border-[#ced2dc]/20 bg-white/5`}>
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1 text-[#f2f5fa]">Primary Archetype Detected</p>
                <p className="text-xl font-bold text-[#F0C808]">{profile.archetype || "Analyzing..."}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
             <CircularScore 
              value={profile.riskIndex || 0} 
              title="Attraction Risk Index" 
              color={getSeverityColor(profile.riskIndex || 0)} 
              isDarkTheme={false}
            />
            <p className={`mt-6 text-center text-sm font-medium leading-relaxed ${colors.textSecondary} max-w-sm`}>
              Measures the probability that your trait clusters draw you toward partners with meaningful psychological risk (e.g. emotional volatility, antagonism).
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Your Baseline Profile
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2">Your Personality</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Core Traits</h2>
                </div>
              </div>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Neuroticism (Volatility)" value={profile.normalizedScores?.Neuroticism || 0} color="bg-[#DD1C1A]" />
                <ScoreBar label="Agreeableness (Empathy)" value={profile.normalizedScores?.Agreeableness || 0} color="bg-[#086788]" />
                <ScoreBar label="Attachment Anxiety" value={profile.normalizedScores?.Anxiety || 0} color="bg-[#F0C808]" />
                <ScoreBar label="Attachment Avoidance" value={profile.normalizedScores?.Avoidance || 0} color="bg-[#2a2522]" />
              </div>
            </div>
            <CustomLockedCard title="Your Attraction Magnets" teaser="Discover the specific traits you unknowingly over-value, and how they expose you to relationship risk." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
               <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2">Partner Prediction</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Assortative Risk</h2>
                </div>
              </div>
              <p className={`${colors.textSecondary} mb-8 leading-relaxed`}>
                Based on assortative mating science (how traits cluster across couples), this is your risk profile for attracting partners with maladaptive patterns.
              </p>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Dark Triad Magnetism" value={profile.normalizedScores?.Machiavellianism || 0} color="bg-[#2a2522]" />
                <ScoreBar label="Emotional Volatility Draw" value={profile.normalizedScores?.NegativeAffect || 0} color="bg-[#DD1C1A]" />
                <ScoreBar label="Impulsivity Attraction" value={profile.normalizedScores?.Disinhibition || 0} color="bg-[#086788]" />
              </div>
            </div>
            <CustomLockedCard title="The Predicted Partner Profile"  teaser="Unlock your report to see the exact Big Five, Attachment, and Dark Triad breakdown of the partners you keep choosing." />
          </div>
        </div>

        {!isPremium && (
          <div className="mt-16">
            <UnlockBanner />
          </div>
        )}
      </div>
    </div>
  );
}
