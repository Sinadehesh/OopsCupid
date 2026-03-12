import React from "react";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, Lock, Radar, EyeOff, AlertOctagon } from "lucide-react";

export default function InfidelityMasterReport({ profile }: any) {
  const isPremium = profile.premiumUnlocked;

  // Suspenseful Noir/Crimson Palette
  const colors = {
    bgMain: "bg-[#0a0a0a]", 
    bgCard: "bg-[#171717]",     
    borderCard: "border-[#27272a]", 
    textPrimary: "text-[#f4f4f5]",  
    textSecondary: "text-[#a1a1aa]",
    accentRed: "#ef4444",
    accentDark: "#000000"
  };

  const getSeverityColor = (score: number) => {
    if (score >= 70) return "#ef4444"; // Neon Red
    if (score >= 45) return "#f59e0b"; // Warning Orange
    return "#10b981"; // Safe Green
  };

  const ARCHETYPES: Record<string, { subtitle: string, prediction: string }> = {
    "The Gaslighting Ghost": {
        subtitle: "High digital secrecy paired with aggressive psychological warfare.",
        prediction: "Your data reveals a highly toxic cover-up pattern. He is actively hiding digital evidence (passcodes, locked screens, deleted texts) and using extreme defensiveness to protect his secrets. By turning the blame on you, calling you 'crazy,' and starting fights when you ask simple questions, he is intentionally destabilizing your reality to keep you off his trail."
    },
    "The Double Life": {
        subtitle: "Severe logistical shifts backed by physical evidence.",
        prediction: "The behavioral data points to a highly orchestrated logistical affair. The combination of unexplained absences, wildly varying schedules, and emerging physical evidence (cash, scents, grooming changes) suggests this is not just digital. He is actively allocating physical time and resources away from your relationship to sustain a secondary life."
    },
    "The Digital Betrayal": {
        subtitle: "His primary breach is occurring through screens, not logistics.",
        prediction: "He is displaying extreme digital paranoia. While his physical schedule may not have drastically changed, his phone has become a heavily guarded fortress. This pattern usually points to intense emotional affairs, cyber infidelity, dating apps, or improper communication with a coworker or ex that he knows crosses the line of your relationship."
    },
    "The Silent Deactivation": {
        subtitle: "He is emotionally preparing his exit strategy.",
        prediction: "The data shows a massive drop in emotional intimacy and engagement, rather than aggressive hiding. He is 'quiet quitting' the relationship. This often happens when a partner is 'monkey-branching' (securing a new partner before officially leaving) or has entirely lost the emotional bandwidth to sustain your connection due to an outside distraction."
    },
    "The High-Risk Cover-up": {
        subtitle: "Multiple intersecting red flags across domains.",
        prediction: "Your 100-point data scan detected severe anomalies across his phone habits, his schedule, and his emotional availability. While he hasn't locked into one specific style of affair, the sheer volume of defensive behaviors and changing routines makes it highly statistically probable that he is hiding a massive breach of trust."
    },
    "The False Alarm": {
        subtitle: "Low overall cover-up signature detected.",
        prediction: "Based on his behavioral signature, the data does not reflect the standard architecture of infidelity. While he may have some avoidant behaviors or communication issues, he lacks the specific defensive matrix, digital paranoia, and logistical hiding required to sustain an affair. The issues in your relationship are likely structural, not an active betrayal."
    }
  };

  const currentArchetype = ARCHETYPES[profile.archetype] || ARCHETYPES["The False Alarm"];

  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
          <h4 className={`text-sm font-bold uppercase tracking-widest text-[#ef4444] mb-4 flex items-center gap-2`}>Premium Access</h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>Decrypted data loaded.</p>
        </div>
      );
    }
    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
        <div className="filter blur-[8px] opacity-30 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>This section contains deep clinical analysis.</p>
          <div className="w-full h-4 bg-[#3f3f46] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#3f3f46] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#3f3f46] rounded"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0a]/70 backdrop-blur-sm border border-white/5">
          <div className={`w-14 h-14 bg-[#171717] border border-[#27272a] rounded-full flex items-center justify-center mb-4 shadow-2xl`}>
            <Lock className="w-6 h-6 text-[#ef4444]" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button className={`px-8 py-3 rounded-full font-bold text-sm bg-[#ef4444] text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-[#dc2626] transition-all`}>
            Decrypt Evidence Log
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-8 md:py-12 w-full ${colors.bgMain} min-h-screen text-white font-sans`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* WIDESCREEN HERO SECTION */}
        <div className={`rounded-[32px] border p-10 md:p-16 flex flex-col justify-center bg-[#171717] border-[#27272a] shadow-2xl relative overflow-hidden mb-8`}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ef4444 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#ef4444] opacity-[0.05] rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-black/50 border border-[#ef4444]/30 text-[#ef4444] shadow-md`}>
              <Radar className="w-4 h-4 text-[#ef4444]" />
              100-POINT SCAN COMPLETE
            </div>
            <h2 className={`text-4xl md:text-6xl font-extrabold leading-none tracking-tighter mb-6 text-white`}>
              Threat Signature:<br/>
              <span className="text-[#ef4444] mt-2 block">{profile.archetype || "Analyzing..."}</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium">
              {currentArchetype.subtitle}
            </p>
          </div>
        </div>

        {/* FREE PREDICTION & GAUGE GRID */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          <div className={`lg:col-span-2 rounded-3xl border p-8 md:p-12 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg relative overflow-hidden`}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ef4444]"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full bg-[#ef4444]/10 flex items-center justify-center`}>
                <EyeOff className={`w-6 h-6 text-[#ef4444]`} />
              </div>
              <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary}`}>The Behavioral Read</h3>
            </div>
            <p className={`text-lg md:text-xl leading-relaxed ${colors.textSecondary}`}>
              {currentArchetype.prediction}
            </p>
          </div>

          <div className={`lg:col-span-1 rounded-3xl border p-8 md:p-10 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-lg text-center`}>
            <CircularScore 
              value={profile.suspicionIndex || 0} 
              title="Suspicion Index" 
              color={getSeverityColor(profile.suspicionIndex || 0)} 
              isDarkTheme={true}
            />
            <p className={`mt-8 text-sm font-medium leading-relaxed ${colors.textSecondary}`}>
              Probability score representing how closely his behaviors align with documented clinical patterns of deception and infidelity.
            </p>
          </div>
        </div>

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Evidence Vectors
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className={`text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2`}><AlertOctagon className="w-4 h-4"/> Threat Telemetry</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Subscale Risks</h2>
                </div>
              </div>
              <div className="space-y-6 mb-8 flex-grow">
                <ScoreBar label="Digital Secrecy & Phone Hiding" value={profile.normalizedScores?.Digital || 0} color={`bg-[#ef4444]`} />
                <ScoreBar label="Defensiveness & Gaslighting" value={profile.normalizedScores?.Defensive || 0} color={`bg-[#f59e0b]`} />
                <ScoreBar label="Logistical Shifts (Schedule)" value={profile.normalizedScores?.Schedule || 0} color="bg-[#10b981]" />
                <ScoreBar label="Intimacy Withdrawal" value={profile.normalizedScores?.Emotion || 0} color="bg-[#6366f1]" />
              </div>
            </div>
            <CustomLockedCard title="The Cover-Up Strategy" teaser="Unlock the breakdown of exactly how he is hiding his tracks, and what specific physical tells you are missing." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
             <CustomLockedCard title="Gaslighting Breakdown"  teaser="See the exact scripts he is using to make you doubt your own intuition and memory." />
             <CustomLockedCard title="The Confrontation Playbook"  teaser="Do not confront him without leverage. Read the step-by-step clinical guide on how to force the truth without letting him flip the script on you." />
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
