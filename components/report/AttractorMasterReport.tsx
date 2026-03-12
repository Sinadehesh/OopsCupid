import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Target, Radio, AlertTriangle } from "lucide-react";

export default function AttractorMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // Elegant Purple/Red Palette to distinguish it from the other tests
  const colors = {
    bgMain: "bg-[#f2f5fa]", 
    bgCard: "bg-white",     
    borderCard: "border-[#ced2dc]", 
    textPrimary: "text-[#2a2522]",  
    textSecondary: "text-[#2a2522]/70",
  };

  const getSeverityColor = (score: number) => {
    if (score >= 75) return "#C73E1D"; // Red (High Vulnerability)
    if (score >= 50) return "#F18F01"; // Orange (Moderate)
    return "#2E86AB"; // Blue (Safe)
  };

  // 🧠 THE 12 INBOUND ARCHETYPES (Who they attract)
  const ARCHETYPES: Record<string, { subtitle: string, prediction: string }> = {
    "The Predator Magnet": {
        subtitle: "You signal high empathy, anxiety, and vulnerability.",
        prediction: "Because you openly project innocence, a desire to please, and high emotional sensitivity, you act as a beacon for highly manipulative or predatory individuals (Dark Triad). They sense your boundaries are flexible and that you will prioritize their needs over your own."
    },
    "The Chase Trigger": {
        subtitle: "You signal extreme mystery and emotional unavailability.",
        prediction: "By projecting fierce independence and detachment, you consistently attract highly anxious, 'fixer' personalities. People who equate love with earning it will obsess over breaking down your walls, even if you offer them very little emotional warmth."
    },
    "The Broken-Bird Collector": {
        subtitle: "You signal absolute safety and maternal/paternal warmth.",
        prediction: "You radiate stability, extreme agreeableness, and caretaking energy. As a result, you are a magnet for 'wounded' individuals, people with chaotic lives, or those needing a parent figure rather than a partner. You attract people who need to be saved."
    },
    "The Narcissist's Trophy": {
        subtitle: "You signal extreme aesthetics and status.",
        prediction: "Because your primary signals are visual perfection and hard-to-get exclusivity, you attract highly image-conscious, narcissistic partners. They want you not for deep emotional connection, but as a status symbol to elevate their own social standing."
    },
    "The Opportunist's Mark": {
        subtitle: "You signal high resources and generosity.",
        prediction: "By overtly displaying wealth, status, and a willingness to provide, you attract partners who view relationships as economic or social stepping stones. You risk drawing in opportunistic individuals who will drain your resources while offering little genuine emotional reciprocity."
    },
    "The Savior's Project": {
        subtitle: "You signal beautiful chaos and a need for guidance.",
        prediction: "You project an image of wild unpredictability, emotional volatility, or 'tortured' artistry. This instantly attracts 'white knight' personalities and fixers who want to tame you, manage your life, or heal your perceived brokenness."
    },
    "The Dominant's Canvas": {
        subtitle: "You signal compliance and a desire to be led.",
        prediction: "By signaling innocence and submissiveness, you draw in highly dominant, sometimes antagonistic partners who want absolute control over the relationship dynamic. You attract those who want to shape, protect, and ultimately restrict you."
    },
    "The Submissive's Shield": {
        subtitle: "You signal absolute authority and protection.",
        prediction: "You project extreme confidence, dominance, and competence. You naturally attract highly anxious or submissive partners who want to outsource their life decisions to you, looking for a protector rather than an equal."
    },
    "The Sapiosexual Trap": {
        subtitle: "You signal formidable intellect and high standards.",
        prediction: "You project intense intellectualism and elitism. You attract partners who view debate as foreplay and who want to constantly prove their mental worth to you. However, you also scare off highly emotionally intelligent people who mistake your intellectual rigor for coldness."
    },
    "The Traditional Catch": {
        subtitle: "You signal conservative, conventional stability.",
        prediction: "You aggressively project traditional gender roles and family-oriented values. You attract people looking for a highly predictable, script-following partner to build a conventional life with, which filters out chaotic types but may also attract rigid, inflexible personalities."
    },
    "The Subculture Icon": {
        subtitle: "You signal extreme alternative aesthetics and values.",
        prediction: "Your aesthetic and behavioral signals are so intensely tied to a specific subculture that you almost exclusively attract people from within that echo chamber. You draw in partners who value your rebellion against the mainstream above all else."
    },
    "The Low-Effort Magnet": {
        subtitle: "You signal that you demand absolutely nothing.",
        prediction: "By projecting the ultimate 'chill, no-drama' persona, you inadvertently attract highly avoidant, lazy, or emotionally unavailable partners. They flock to you because they sense they won't have to put in any actual work or emotional labor to keep you."
    },
    "The Safe Harbor": {
        subtitle: "You signal authentic, grounded stability.",
        prediction: "You project a balanced mix of emotional availability and firm boundaries. Because you do not signal extreme vulnerability or extreme chaos, you primarily attract secure individuals looking for genuine partnership, while naturally repelling both predators and 'fixers'."
    }
  };

  const currentArchetype = ARCHETYPES[profile.archetype] || ARCHETYPES["The Safe Harbor"];

  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[#A23B72] mb-4 flex items-center gap-2`}>Premium Insight Unlocked</h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>Data unlocked successfully.</p>
        </div>
      );
    }
    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-sm`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>This section contains deep clinical analysis.</p>
          <div className="w-full h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#ced2dc] rounded"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm">
          <div className={`w-14 h-14 bg-[#3B1F2B] rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button className={`px-6 py-3 rounded-full font-bold text-sm bg-[#A23B72] text-white shadow-lg hover:opacity-90 transition-colors`}>
            Unlock Full Analysis
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[#3B1F2B] border-[#3B1F2B] shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-[#A23B72] text-white shadow-md`}>
              <ShieldCheck className="w-4 h-4 text-white" />
              SIGNAL PROFILE COMPLETE
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-none tracking-tighter mb-6 text-white`}>
              Your Inbound Archetype:<br/>
              <span className="text-[#F18F01] mt-2 block">{profile.archetype || "Analyzing..."}</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-medium">
              {currentArchetype.subtitle}
            </p>
          </div>
        </div>

        {/* FREE PREDICTION & GAUGE GRID */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          <div className={`lg:col-span-2 rounded-3xl border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full bg-[#A23B72]/10 flex items-center justify-center`}>
                <Target className={`w-6 h-6 text-[#A23B72]`} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>Who You Draw In</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary}`}>
              {currentArchetype.prediction}
            </p>
          </div>

          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-lg text-center`}>
            <CircularScore 
              value={profile.vulnerabilityIndex || 0} 
              title="Vulnerability Index" 
              color={getSeverityColor(profile.vulnerabilityIndex || 0)} 
              isDarkTheme={false}
            />
            <p className={`mt-8 text-sm font-medium leading-relaxed ${colors.textSecondary}`}>
              Measures the likelihood that the signals you broadcast (e.g., hyper-empathy, victimhood, extreme submissiveness) act as a magnet for psychologically toxic or predatory partners.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          The Signals You Broadcast
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2 flex items-center gap-2"><Radio className="w-4 h-4"/> Your Visible Signals</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Social Broadcast</h2>
                </div>
              </div>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Anxiety / Clinginess Signal" value={profile.normalizedScores?.Anxiety || 0} color={`bg-[#A23B72]`} />
                <ScoreBar label="Avoidance / Distance Signal" value={profile.normalizedScores?.Avoidance || 0} color={`bg-[#3B1F2B]`} />
                <ScoreBar label="Extreme Independence Signal" value={profile.normalizedScores?.Independence || 0} color="bg-[#2E86AB]" />
                <ScoreBar label="Caretaker / Fixer Signal" value={profile.normalizedScores?.Maternal || profile.normalizedScores?.Agreeableness || 0} color="bg-[#F18F01]" />
              </div>
            </div>
            <CustomLockedCard title="The Dark Triad Magnet" teaser="Discover exactly which of your behaviors unintentionally signal 'easy target' to manipulative personalities." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard title="Your Assortative Match Profile"  teaser="Unlock the clinical breakdown of exactly what Big Five and Attachment traits your future partners are statistically likely to have." />
             <CustomLockedCard title="Signal Reprogramming"  teaser="Concrete, clinical levers you can pull to stop broadcasting vulnerability and start filtering for secure partners." />
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
