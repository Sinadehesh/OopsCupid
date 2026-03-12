import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Target, Brain, AlertTriangle } from "lucide-react";

export default function AttractionMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // UI Palette
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

  // 🧠 THE FREE PREDICTION DICTIONARY
  // This gives them exactly what they asked for ("who am I attracted to") for free, hooking them in.
  const ARCHETYPES: Record<string, { subtitle: string, prediction: string }> = {
    "The Dark Magnet": {
        subtitle: "You associate power and dominance with attraction.",
        prediction: "You are statistically drawn to highly ambitious, dominant, and status-driven individuals who may exhibit 'Dark Triad' traits (narcissism, Machiavellianism). You are attracted to their confidence, decisiveness, and social gravity. However, while this provides intense excitement and a feeling of being 'protected' or elevated, it often comes with a high risk of emotional unavailability, power struggles, and feeling systematically undervalued once the honeymoon phase ends."
    },
    "The Fixer": {
        subtitle: "You associate caretaking and healing with love.",
        prediction: "You are deeply attracted to 'wounded birds'—partners who show vulnerability, emotional instability, or a deep need to be saved or guided. Your high empathy makes you a natural caretaker, and you feel most secure and loved when you are needed. However, this pattern almost always leads to one-sided relationships, emotional burnout, and a dynamic where your own needs are perpetually put on hold to manage their crises."
    },
    "The Intensity Chaser": {
        subtitle: "You associate anxiety and unpredictability with passion.",
        prediction: "For you, peace often feels like boredom. You are drawn to partners who provide explosive physical chemistry, unpredictability, and severe emotional highs and lows. This is usually driven by an underlying anxious-avoidant 'push-pull' dynamic. You subconsciously seek out inconsistent partners because the anxiety of winning them over feels exactly like passionate love to your nervous system."
    },
    "The Safe-But-Bored Seeker": {
        subtitle: "You value stability, but may struggle with the quietness of secure love.",
        prediction: "You consciously prioritize stability, kindness, and safety. You are attracted to dependable partners who provide a secure base and don't play emotional games. However, if your baseline leans secure, you might occasionally find 'healthy' feeling a bit too quiet or lacking in explosive chemistry. Your psychological challenge is learning to build excitement and passion within a safe container, rather than seeking out chaotic personalities to manufacture a spark."
    }
  };

  const currentArchetype = ARCHETYPES[profile.archetype] || ARCHETYPES["The Safe-But-Bored Seeker"];

  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#086788] mb-4 flex items-center gap-2">
             Premium Insight Unlocked
          </h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>
            Premium content renders here based on the exact traits and arrays passed.
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
    // FULL WIDTH CONTAINER UP TO 1400px
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[#2a2522] border-[#2a2522] shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#086788] text-white shadow-md`}>
              <ShieldCheck className="w-4 h-4 text-[#F0C808]" />
              CLINICAL ATTRACTION MAP
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-none tracking-tighter mb-6 text-[#f2f5fa]`}>
              Your Attraction Archetype:<br/>
              <span className="text-[#F0C808] mt-2 block">{profile.archetype || "Analyzing..."}</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#f2f5fa]/80 font-medium">
              {currentArchetype.subtitle}
            </p>
          </div>
        </div>

        {/* WIDESCREEN FREE PREDICTION & GAUGE GRID */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          
          {/* THE FREE PREDICTION REVEAL (2/3 width) */}
          <div className={`lg:col-span-2 rounded-3xl border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#086788]/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-[#086788]" />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>The Psychology of Your Type</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary}`}>
              {currentArchetype.prediction}
            </p>
          </div>

          {/* RISK GAUGE (1/3 width) */}
          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-lg text-center`}>
            <CircularScore 
              value={profile.riskIndex || 0} 
              title="Attraction Risk Index" 
              color={getSeverityColor(profile.riskIndex || 0)} 
              isDarkTheme={false}
            />
            <p className={`mt-8 text-sm font-medium leading-relaxed ${colors.textSecondary}`}>
              Measures the probability that your trait clusters repeatedly draw you toward partners with meaningful psychological risk.
            </p>
          </div>
        </div>

        {/* CHARTS & LOCKED SECTIONS */}
        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Your Baseline Profile
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2 flex items-center gap-2"><Brain className="w-4 h-4"/> Your Personality</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Core Traits</h2>
                </div>
              </div>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Neuroticism (Volatility)" value={profile.normalizedScores?.Neuroticism || 0} color="bg-[#DD1C1A]" />
                <ScoreBar label="Agreeableness (Empathy)" value={profile.normalizedScores?.Agreeableness || 0} color="bg-[#086788]" />
                <ScoreBar label="Attachment Anxiety" value={profile.normalizedScores?.Anxiety || 0} color="bg-[#F0C808]" />
                <ScoreBar label="Attachment Avoidance" value={profile.normalizedScores?.Avoidance || 0} color="bg-[#2a2522]" />
              </div>
            </div>
            <CustomLockedCard title="Your Attraction Magnets" teaser="Discover the specific traits you unknowingly over-value, and how they expose you to relationship risk." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
               <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Partner Prediction</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Assortative Risk</h2>
                </div>
              </div>
              <p className={`${colors.textSecondary} mb-8 leading-relaxed`}>
                Based on assortative mating science (how traits cluster across couples), this is your risk profile for attracting partners with maladaptive patterns.
              </p>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Dark Triad Magnetism" value={profile.normalizedScores?.Machiavellianism || 0} color="bg-[#2a2522]" />
                <ScoreBar label="Emotional Volatility Draw" value={profile.normalizedScores?.NegativeAffect || 0} color="bg-[#DD1C1A]" />
                <ScoreBar label="Impulsivity Attraction" value={profile.normalizedScores?.Disinhibition || 0} color="bg-[#086788]" />
              </div>
            </div>
            <CustomLockedCard title="The Predicted Partner Profile"  teaser="Unlock your report to see the exact Big Five, Attachment, and Dark Triad breakdown of the partners you keep choosing." />
          </div>
        </div>

        {!isPremium && (
          <div className="mt-20">
            <UnlockBanner />
          </div>
        )}
      </div>
    </div>
  );
}
