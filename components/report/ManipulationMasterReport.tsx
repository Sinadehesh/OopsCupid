import React from "react";
import { AssessmentResult } from "@/lib/psychometrics/manipulation/types";
import CircularScore from "./CircularScore";
import { ScoreBar } from "./ScoreBars";

interface Props {
  result: AssessmentResult;
}

export default function ManipulationMasterReport({ result }: Props) {
  const { par, coercive_control, power_tactics, gaslighting, impact } = result.modules;

  const getSeverityColor = (score: number) => {
    if (score >= 80) return "#C73E1D"; // Critical Red
    if (score >= 60) return "#F18F01"; // High Orange
    if (score >= 40) return "#A23B72"; // Elevated Magenta
    return "#2E86AB"; // Baseline Blue
  };

  const dominantLabels: Record<string, string> = {
    "mixed_friction": "Mixed / Low Friction",
    "emotional_control": "Emotional Control & Intimidation",
    "gaslighting": "Gaslighting & Reality Distortion",
    "isolation_dependency": "Isolation & Forced Dependency",
    "high_coercive_control": "High Coercive Control"
  };

  return (
    <div className="bg-[#FDF6EE] min-h-screen py-10">
      <div className="max-w-5xl mx-auto space-y-8 px-4 sm:px-6">
        
        {/* HEADER SECTION */}
        <div className="bg-[#3B1F2B] text-white p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A23B72] rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 flex-1">
            <p className="text-[#F18F01] font-bold tracking-[0.2em] uppercase text-sm mb-4">Official Master Report</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Manipulation & Control Analysis</h1>
            <p className="text-lg opacity-80 mb-6 max-w-xl">
              Based on the 93-item clinical battery. This report maps exact tactics across demands, threats, isolation, and gaslighting.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl">
              <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Dominant Pattern Detected</p>
              <p className="text-2xl font-bold text-[#F18F01]">{dominantLabels[result.dominantPattern]}</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* FIXED PROPS HERE: value and title instead of score and label, and removed size */}
            <CircularScore 
              value={result.overallRisk100} 
              title="Overall Risk Index" 
              color={getSeverityColor(result.overallRisk100)} 
              isDarkTheme={true}
            />
            <p className="mt-4 font-bold uppercase tracking-widest text-sm opacity-80">Tier: {result.severityTier}</p>
          </div>
        </div>

        {/* SAFETY FLAGS WARNING */}
        {result.safetyFlags.length > 0 && (
          <div className="bg-[#C73E1D] text-white p-8 rounded-3xl shadow-lg border-4 border-[#C73E1D]/50 flex items-start gap-6">
            <div className="text-4xl">⚠️</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Critical Safety Escalation</h3>
              <p className="text-lg opacity-95 mb-4">
                Your responses triggered clinical safety flags (e.g., threats, surveillance, or restriction of essentials). 
                This indicates severe risk. Please consider speaking with a domestic abuse advocate safely.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* COERCIVE CONTROL DEEP DIVE */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-[#3B1F2B]">Coercive Control</h3>
              <span className="text-3xl font-bold text-[#A23B72]">{coercive_control?.normalized100}%</span>
            </div>
            <p className="text-gray-600 mb-8 text-sm">Measures systematic attempts to strip away independence through rules, surveillance, and punishment.</p>
            <div className="space-y-4">
              <ScoreBar label="Demands & Strict Rules" value={coercive_control?.subscales.demands.normalized100 || 0} color="bg-[#A23B72]" />
              <ScoreBar label="Threats & Retaliation" value={coercive_control?.subscales.threats.normalized100 || 0} color="bg-[#C73E1D]" />
              <ScoreBar label="Surveillance & Stalking" value={coercive_control?.subscales.surveillance.normalized100 || 0} color="bg-[#3B1F2B]" />
              <ScoreBar label="Forced Appeasement" value={coercive_control?.subscales.response_to_demands.normalized100 || 0} color="bg-[#2E86AB]" />
            </div>
          </div>

          {/* GASLIGHTING SCREEN */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-[#3B1F2B]">Gaslighting Index</h3>
              <span className="text-3xl font-bold text-[#F18F01]">{gaslighting?.normalized100}%</span>
            </div>
            <p className="text-gray-600 mb-8 text-sm">Measures psychological manipulation designed to make you doubt your memory, perception, and sanity.</p>
            <div className="space-y-4">
              <ScoreBar label="Reality Distortion (Denial)" value={gaslighting?.subscales.reality_distortion.normalized100 || 0} color="bg-[#F18F01]" />
              <ScoreBar label="Self-Doubt Induction" value={gaslighting?.subscales.self_doubt_induction.normalized100 || 0} color="bg-[#A23B72]" />
              <ScoreBar label="Confusion Dependency" value={gaslighting?.subscales.confusion_dependency.normalized100 || 0} color="bg-[#3B1F2B]" />
            </div>
          </div>

          {/* POWER TACTICS PROFILE */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-[#3B1F2B]">Power Tactics Profile</h3>
              <span className="text-3xl font-bold text-[#2E86AB]">{power_tactics?.normalized100}%</span>
            </div>
            <p className="text-gray-600 mb-8 text-sm max-w-2xl">Breaks down the specific behavioral methods used to maintain dominance, deflect blame, and isolate you from support networks.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="space-y-4">
                <ScoreBar label="Intimidation & Fear" value={power_tactics?.subscales.intimidation.normalized100 || 0} color="bg-[#C73E1D]" />
                <ScoreBar label="Isolation & Social Sabotage" value={power_tactics?.subscales.isolation_dependency.normalized100 || 0} color="bg-[#3B1F2B]" />
              </div>
              <div className="space-y-4">
                <ScoreBar label="Blame Reversal (DARVO)" value={power_tactics?.subscales.blame_minimization.normalized100 || 0} color="bg-[#F18F01]" />
                <ScoreBar label="Economic/Financial Control" value={power_tactics?.subscales.economic_control.normalized100 || 0} color="bg-[#2E86AB]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
