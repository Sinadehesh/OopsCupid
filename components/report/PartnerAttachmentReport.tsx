import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Activity, Eye, AlertCircle } from "lucide-react";

export default function PartnerAttachmentReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // Cool, clinical, "investigative" aesthetic (Deep Navy and Silver)
  const colors = {
    bgMain: "bg-[#f4f7f9]", 
    bgCard: "bg-white",     
    borderCard: "border-[#d0d7de]", 
    textPrimary: "text-[#1e293b]",  
    textSecondary: "text-[#475569]",
    accentNavy: "#0f172a",
    accentSilver: "#94a3b8",
    accentAlert: "#e11d48"
  };

  const getSeverityColor = (score: number) => {
    if (score >= 70) return "#e11d48"; // Red
    if (score >= 50) return "#f59e0b"; // Orange
    return "#10b981"; // Green
  };

  // 🧠 THE PARTNER READ (FREE REVEAL)
  const ARCHETYPES: Record<string, { subtitle: string, prediction: string }> = {
    "Dismissive-Avoidant": {
        subtitle: "He views absolute independence as safety, and intimacy as a threat to his autonomy.",
        prediction: "Your partner's nervous system treats closeness as a demand. When the relationship deepens or conflict arises, his instinct is to deactivate—shutting down, pulling away, or using hyper-rationality to dismiss your emotions. He likely believes that needing someone is a weakness. This leaves you feeling lonely within the relationship, constantly chasing an emotional connection he is structurally wired to deny you."
    },
    "Anxious-Preoccupied": {
        subtitle: "He equates anxiety with love, and distance with abandonment.",
        prediction: "Your partner operates with a hyper-activated nervous system. He requires constant, visible reassurance to feel safe, and he interprets any boundary or need for space on your end as a signal that you are leaving him. He likely uses guilt, protest behaviors, or rapid escalation to force you to prove your love. While this can feel intensely passionate at first, it often turns into emotional suffocation."
    },
    "Fearful-Avoidant (Disorganized)": {
        subtitle: "He wants intimacy desperately, but is terrified of it once he gets it.",
        prediction: "Your data indicates severe behavioral volatility. Your partner exhibits a confusing 'push-pull' dynamic—he will draw you in with intense affection and vulnerability, but the moment he feels safe, a subconscious trigger fires, and he abruptly turns cold, hostile, or distant. You are constantly walking on eggshells because the rules of how to make him happy change depending on his internal level of fear."
    },
    "Secure": {
        subtitle: "He is comfortable with both intimacy and independence.",
        prediction: "Based on the behaviors you recorded, your partner possesses a well-regulated nervous system. He can handle conflict without stonewalling or spiraling into panic, he is consistent in his communication, and he respects your boundaries while freely offering emotional warmth. He views you as a teammate rather than a threat or an emotional crutch."
    }
  };

  const currentArchetype = ARCHETYPES[profile.styleLabel] || ARCHETYPES["Secure"];

  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-sm`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[${colors.accentNavy}] mb-4 flex items-center gap-2`}>Premium Insight Unlocked</h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>Data unlocked successfully.</p>
        </div>
      );
    }
    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group shadow-md`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>This section contains deep clinical analysis.</p>
          <div className="w-full h-4 bg-[#d0d7de] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#d0d7de] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#d0d7de] rounded"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm">
          <div className={`w-14 h-14 bg-[${colors.accentNavy}] rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button className={`px-6 py-3 rounded-full font-bold text-sm bg-[${colors.accentAlert}] text-white shadow-lg hover:opacity-90 transition-colors`}>
            Unlock Relationship Impact
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[${colors.accentNavy}] border-[${colors.accentNavy}] shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/10 border border-white/20 text-white shadow-md`}>
              <Eye className="w-4 h-4 text-white" />
              PARTNER DIAGNOSTIC COMPLETE
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-none tracking-tighter mb-6 text-white`}>
              His Attachment Style:<br/>
              <span className={`text-[${colors.accentSilver}] mt-2 block`}>{profile.styleLabel || "Analyzing..."}</span>
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
              <div className={`w-12 h-12 rounded-full bg-[${colors.accentNavy}]/10 flex items-center justify-center`}>
                <Activity className={`w-6 h-6 text-[${colors.accentNavy}]`} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>The Behavioral Read</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary}`}>
              {currentArchetype.prediction}
            </p>
          </div>

          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-lg text-center`}>
            <CircularScore 
              value={profile.volatilityIndex || 0} 
              title="Relational Volatility" 
              color={getSeverityColor(profile.volatilityIndex || 0)} 
              isDarkTheme={false}
            />
            <p className={`mt-8 text-sm font-medium leading-relaxed ${colors.textSecondary}`}>
              Measures the degree to which his nervous system defaults to 'fight or flight' (anxiety/avoidance) during moments of emotional intimacy or conflict.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          His Diagnostic Subscales
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className={`text-sm font-bold uppercase tracking-widest text-[${colors.accentSilver}] mb-2 flex items-center gap-2`}><AlertCircle className="w-4 h-4"/> Micro-Signals</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Observed Data</h2>
                </div>
              </div>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Deactivation / Avoidance" value={profile.normalizedScores?.Avoidance || 0} color={`bg-[${colors.accentNavy}]`} />
                <ScoreBar label="Hyper-activation / Anxiety" value={profile.normalizedScores?.Anxiety || 0} color={`bg-[${colors.accentAlert}]`} />
                <ScoreBar label="Disorganized Push-Pull" value={profile.normalizedScores?.FearfulRisk || 0} color="bg-[#f59e0b]" />
              </div>
            </div>
            <CustomLockedCard title="The Trajectory: How He Will Change You" teaser="His insecure attachment isn't just his problem. Unlock the clinical breakdown of how his specific behaviors are actively rewiring your nervous system." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard title="The Anxious-Avoidant Trap"  teaser="Find out if your relationship is locked in the most notoriously difficult psychological loop, and what role you are playing in it." />
             <CustomLockedCard title="The Communication Blueprint"  teaser="Concrete psychological tactics to bypass his defenses, stop triggering his 'fight or flight' response, and force a genuine conversation." />
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
