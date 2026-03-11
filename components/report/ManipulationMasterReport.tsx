import React from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { AssessmentResult } from "@/lib/psychometrics/manipulation/types";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";
import UnlockBanner from "./UnlockBanner";
import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

interface Props {
  result: AssessmentResult;
}

export default function ManipulationMasterReport({ result }: Props) {
  const { par, coercive_control, power_tactics, gaslighting, impact } = result.modules;

  const isPremium = result.premiumUnlocked;

  // HIGH READABILITY PALETTE
  const colors = {
    bgMain: "bg-transparent", // Transparent to show the page background
    bgCard: "bg-white",     
    borderCard: "border-[#ced2dc]", 
    textPrimary: "text-[#2a2522]",  
    textSecondary: "text-[#2a2522]/70",
  };

  const getSeverityColor = (score: number) => {
    if (score >= 80) return "#650000"; // Critical Red
    if (score >= 60) return "#490000"; // High Red
    return "#2a2522"; // Elevated/Baseline Gray-Brown
  };

  const dominantLabels: Record<string, string> = {
    "mixed_friction": "Mixed / Low Friction",
    "emotional_control": "Emotional Control & Intimidation",
    "gaslighting": "Gaslighting & Reality Distortion",
    "isolation_dependency": "Isolation & Forced Dependency",
    "high_coercive_control": "High Coercive Control"
  };

  const CustomLockedCard = ({ title, teaser }: { title: string, teaser: string }) => {
    if (isPremium) {
      return (
        <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard}`}>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#650000] mb-4 flex items-center gap-2">
             Premium Insight Unlocked
          </h4>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed`}>
            This section reveals the precise psychological mechanisms mapping to this behavior, including the underlying schema triggers and behavioral scripts used to distort reality and enforce compliance.
          </p>
        </div>
      );
    }

    return (
      <div className={`relative rounded-3xl border p-8 md:p-10 flex flex-col h-full overflow-hidden ${colors.bgCard} ${colors.borderCard} group`}>
        <div className="filter blur-[6px] opacity-40 select-none">
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-4`}>{title}</h3>
          <p className={`${colors.textSecondary} leading-relaxed mb-4`}>
            This section contains a deep clinical analysis of these psychological patterns. It explains exactly how these specific tactics trigger your nervous system.
          </p>
          <div className="w-full h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-[#ced2dc] rounded mb-2"></div>
          <div className="w-5/6 h-4 bg-[#ced2dc] rounded"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/80 backdrop-blur-sm">
          <div className="w-14 h-14 bg-[#650000] rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h4 className={`text-xl font-extrabold ${colors.textPrimary} mb-2`}>{title}</h4>
          <p className={`text-sm ${colors.textSecondary} mb-6 max-w-sm`}>{teaser}</p>
          <button className={`px-6 py-3 rounded-full font-bold text-sm bg-[#650000] text-white shadow-lg hover:bg-[#490000] transition-colors`}>
            Unlock Full Analysis
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-6 w-full`}>
      <div className="w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* HERO SECTION — Striking Dark Contrast Card */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-stretch">
          
          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col justify-center bg-[#2a2522] border-[#2a2522] shadow-2xl`}>
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-8 w-fit bg-[#650000] text-white shadow-md`}>
              <ShieldCheck className="w-4 h-4" />
              CLINICAL BATTERY COMPLETE
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-extrabold leading-none tracking-tighter mb-8 text-[#f2f5fa]`}>
              Manipulation &<br />Control Analysis
            </h2>
            
            <p className={`text-[17px] leading-relaxed mb-6 text-[#f2f5fa]/80`}>
              Based on the 93-item clinical battery. This report maps exact tactics across demands, threats, isolation, and gaslighting to determine if your relationship crosses the threshold for psychological friction.
            </p>

            <div className={`inline-block border p-4 rounded-xl mb-10 border-[#ced2dc]/20 bg-white/5`}>
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1 text-[#f2f5fa]">Dominant Pattern Detected</p>
              <p className="text-xl font-bold text-white">{dominantLabels[result.dominantPattern]}</p>
            </div>
          </div>

          <div className={`rounded-3xl border p-10 md:p-12 flex flex-col items-center justify-center ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
             <CircularScore 
              value={result.overallRisk100} 
              title="Overall Risk Index" 
              color={getSeverityColor(result.overallRisk100)} 
              isDarkTheme={false}
            />
            <p className={`mt-6 font-bold uppercase tracking-widest text-sm ${colors.textSecondary}`}>Tier: {result.severityTier}</p>
          </div>
        </div>

        {/* SAFETY FLAGS WARNING */}
        {result.safetyFlags.length > 0 && (
          <div className="bg-[#650000] text-white p-8 rounded-3xl shadow-lg flex items-start gap-6 mb-16">
            <div className="text-4xl">⚠️</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Critical Safety Escalation</h3>
              <p className="text-lg opacity-95">
                Your responses triggered clinical safety flags (e.g., threats, surveillance, or restriction of essentials). 
                This indicates severe risk. Please consider speaking with a domestic abuse advocate safely.
              </p>
            </div>
          </div>
        )}

        <h3 className={`text-2xl md:text-3xl font-extrabold ${colors.textPrimary} mb-8 border-b ${colors.borderCard} pb-3`}>
          Detailed Behavioral Breakdown
        </h3>
        
        <div className="space-y-12 md:space-y-16 w-full">
          
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2">Module Breakdown</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Coercive Control</h2>
                </div>
                <span className={`text-3xl font-bold text-[#650000]`}>{coercive_control?.normalized100}%</span>
              </div>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Demands & Strict Rules" value={coercive_control?.subscales.demands.normalized100 || 0} color="bg-[#490000]" />
                <ScoreBar label="Threats & Retaliation" value={coercive_control?.subscales.threats.normalized100 || 0} color="bg-[#650000]" />
                <ScoreBar label="Surveillance & Stalking" value={coercive_control?.subscales.surveillance.normalized100 || 0} color="bg-[#2a2522]" />
                <ScoreBar label="Forced Appeasement" value={coercive_control?.subscales.response_to_demands.normalized100 || 0} color="bg-[#ced2dc]" />
              </div>
            </div>
            <CustomLockedCard title="Control Mechanics" teaser="Discover exactly how these specific surveillance and demand tactics are systematically stripping your independence." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
               <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2">Module Breakdown</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Gaslighting Index</h2>
                </div>
                <span className={`text-3xl font-bold text-[#650000]`}>{gaslighting?.normalized100}%</span>
              </div>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Reality Distortion" value={gaslighting?.subscales.reality_distortion.normalized100 || 0} color="bg-[#650000]" />
                <ScoreBar label="Self-Doubt Induction" value={gaslighting?.subscales.self_doubt_induction.normalized100 || 0} color="bg-[#490000]" />
                <ScoreBar label="Confusion Dependency" value={gaslighting?.subscales.confusion_dependency.normalized100 || 0} color="bg-[#2a2522]" />
              </div>
            </div>
            <CustomLockedCard title="Reality Distortion Breakdown" teaser="See the exact linguistic scripts being used to induce self-doubt, and the steps to trust your memory again." />
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className={`rounded-3xl border p-8 md:p-10 flex flex-col h-full ${colors.bgCard} ${colors.borderCard} shadow-xl`}>
               <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#ced2dc] mb-2">Module Breakdown</h4>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary}`}>Power Tactics</h2>
                </div>
                <span className={`text-3xl font-bold text-[#650000]`}>{power_tactics?.normalized100}%</span>
              </div>
              <div className="space-y-5 mb-8 flex-grow">
                <ScoreBar label="Intimidation & Fear" value={power_tactics?.subscales.intimidation.normalized100 || 0} color="bg-[#650000]" />
                <ScoreBar label="Isolation & Sabotage" value={power_tactics?.subscales.isolation_dependency.normalized100 || 0} color="bg-[#490000]" />
                <ScoreBar label="Blame Reversal (DARVO)" value={power_tactics?.subscales.blame_minimization.normalized100 || 0} color="bg-[#ced2dc]" />
                <ScoreBar label="Financial Control" value={power_tactics?.subscales.economic_control.normalized100 || 0} color="bg-[#2a2522]" />
              </div>
            </div>
            <CustomLockedCard title="DARVO & Isolation Strategies" teaser="Understand how blame is being systematically reversed onto you, and why your social circle is shrinking." />
          </div>
          
        </div>

        {!isPremium && (
          <div className="mt-16">
            <UnlockBanner />
      <SharePrintButtons />
          </div>
        )}
      </div>
    </div>
  );
}
