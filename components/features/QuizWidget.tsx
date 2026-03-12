"use client";

import React, { useState, useMemo, useRef } from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import Link from "next/link";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import MasterReport from "@/components/report/MasterReport";
import { DashboardGrid, MultiGaugeGrid } from "@/components/report/ScoreBars";

// EXTERNAL QUESTION VAULTS
import { attachmentQuestions, Question } from "@/lib/psychometrics/attachment/questions";
import { attractionQuestions } from "@/lib/psychometrics/attraction/questions";
import { attractorQuestions } from "@/lib/psychometrics/attractor/questions";
import { partnerAttachmentQuestions } from "@/lib/psychometrics/partner-attachment/questions";
import { infidelityQuestions } from "@/lib/psychometrics/infidelity/questions";

// EXTERNAL REPORT IMPORTS
import { generateAttractionProfile } from "@/lib/psychometrics/attraction/scoring";
import AttractionMasterReport from "@/components/report/AttractionMasterReport";

import { generateAttractorProfile } from "@/lib/psychometrics/attractor/scoring";
import AttractorMasterReport from "@/components/report/AttractorMasterReport";

import { generatePartnerAttachmentProfile } from "@/lib/psychometrics/partner-attachment/scoring";
import PartnerAttachmentReport from "@/components/report/PartnerAttachmentReport";

import { generateInfidelityProfile } from "@/lib/psychometrics/infidelity/scoring";
import InfidelityMasterReport from "@/components/report/InfidelityMasterReport";

const legacyBanks: Record<string, Question[]> = {
  "is-he-manipulative": [
    { id: "1", text: "When you bring up something he did wrong, how does he react?", options: ["Apologizes and tries to fix it", "Denies it ever happened", "Blames you for making him act that way", "Changes the subject entirely"] },
  ],
  "default": [
    { id: "1", text: "How often do they text you first?", options: ["Every day", "Usually", "Rarely", "Never"] }
  ]
};

const PHASE_LABELS: Record<string, string> = {
  demographics: "Profile Setup", ecr: "Attachment Style", rosenberg: "Self-Esteem", ders: "Emotion Regulation",
  lovestyle: "Love Styles", yqs: "Deep Patterns", crq: "Relationship Blueprint", mds: "Inner World", parenting: "Parenting Style",
  "A": "Personality Core", "B": "Attachment Dynamics", "C": "Maladaptive Traits", 
  "D": "Dark Triad Risk", "E": "Clinical Vulnerabilities", "F": "Mate Preferences"
};

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers, setAnswers]               = useState<Record<string, string>>({});
  const [showResult, setShowResult]         = useState(false);
  const [resultData, setResultData]         = useState<any>(null);
  const [loading, setLoading]               = useState(false);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);

  const isDarkTheme = ["is-he-manipulative"].includes(quizName);
  
  // 🔥 ROUTING LOGIC
  const isAttraction = quizName === "attraction-patterns";
  const isAttractor = quizName === "who-is-attracted-to-me";
  const isPartnerAttachment = quizName === "partners-attachment-style";
  const isCheating = quizName === "is-he-cheating";
  
  // Apply the premium, high-contrast UI to all advanced tests
  const isPremiumUI = isAttraction || isAttractor || isPartnerAttachment || isCheating;

  const activeQuestions = useMemo(() => {
    if (quizName === "attachment-style") return attachmentQuestions; 
    if (isAttraction) return attractionQuestions;
    if (isAttractor) return attractorQuestions; 
    if (isPartnerAttachment) return partnerAttachmentQuestions;
    if (isCheating) return infidelityQuestions;

    return legacyBanks[quizName] || legacyBanks["default"];
  }, [quizName, isAttraction, isAttractor, isPartnerAttachment, isCheating]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

  // Dynamic Theme Colors
  let colors = {
    bg: "bg-white", cardBorder: "border-[#0D2C54]/10", cardShadow: "shadow-[0_12px_40px_rgba(13,44,84,0.06)]", textPrimary: "text-[#0D2C54]", textSecondary: "text-[#0D2C54]/60", progressTrack: "bg-[#0D2C54]/10", progressFill: "bg-[#FFB400]", optionBorder: "border-[#0D2C54]/15", optionHover: "hover:border-[#00A6ED] hover:bg-[#00A6ED]/[0.03] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,166,237,0.12)]", optionSelected: "border-[#00A6ED] bg-[#00A6ED]/[0.05]", btnPrimary: "bg-[#00A6ED] text-white hover:bg-[#00A6ED]/90 shadow-md", btnBack: "border-[#0D2C54]/20 text-[#0D2C54] hover:bg-[#0D2C54]/5", chipBg: "bg-[#FFB400]/20", chipText: "text-[#0D2C54]"
  };

  if (isPremiumUI) {
      if (isAttraction) colors = { ...colors, textPrimary: "text-[#086788]", textSecondary: "text-[#086788]/70", progressTrack: "bg-[#086788]/10", progressFill: "bg-[#F0C808]", optionBorder: "border-[#06AED5]/40", optionHover: "hover:border-[#06AED5] hover:bg-[#06AED5]/5", optionSelected: "border-[#086788] bg-[#06AED5]/10", btnPrimary: "bg-[#DD1C1A] text-white", btnBack: "border-[#086788]/20 text-[#086788]", chipBg: "bg-[#086788]/10", chipText: "text-[#086788]" };
      else if (isAttractor) colors = { ...colors, textPrimary: "text-[#3B1F2B]", textSecondary: "text-[#3B1F2B]/70", progressTrack: "bg-[#3B1F2B]/10", progressFill: "bg-[#F18F01]", optionBorder: "border-[#A23B72]/40", optionHover: "hover:border-[#A23B72] hover:bg-[#A23B72]/5", optionSelected: "border-[#3B1F2B] bg-[#A23B72]/10", btnPrimary: "bg-[#C73E1D] text-white", btnBack: "border-[#3B1F2B]/20 text-[#3B1F2B]", chipBg: "bg-[#3B1F2B]/10", chipText: "text-[#3B1F2B]" };
      else if (isPartnerAttachment) colors = { ...colors, textPrimary: "text-[#0f172a]", textSecondary: "text-[#0f172a]/70", progressTrack: "bg-[#0f172a]/10", progressFill: "bg-[#e11d48]", optionBorder: "border-[#94a3b8]/40", optionHover: "hover:border-[#94a3b8] hover:bg-[#94a3b8]/5", optionSelected: "border-[#0f172a] bg-[#94a3b8]/10", btnPrimary: "bg-[#e11d48] text-white hover:bg-[#be123c]", btnBack: "border-[#0f172a]/20 text-[#0f172a]", chipBg: "bg-[#0f172a]/10", chipText: "text-[#0f172a]" };
      else if (isCheating) colors = { ...colors, bg: "bg-[#0a0a0a]", cardBorder: "border-[#27272a]", cardShadow: "shadow-2xl shadow-red-900/10", textPrimary: "text-white", textSecondary: "text-gray-400", progressTrack: "bg-white/10", progressFill: "bg-[#ef4444]", optionBorder: "border-[#27272a]", optionHover: "hover:border-[#ef4444] hover:bg-[#ef4444]/10", optionSelected: "border-[#ef4444] bg-[#ef4444]/20", btnPrimary: "bg-[#ef4444] text-white hover:bg-[#dc2626]", btnBack: "border-white/20 text-white", chipBg: "bg-black/50 border border-[#ef4444]/30", chipText: "text-[#ef4444]" };
  } else if (isDarkTheme) {
      colors = { ...colors, bg: "bg-[#0f172a]", cardBorder: "border-slate-700", textPrimary: "text-slate-100", textSecondary: "text-slate-400", progressTrack: "bg-slate-100", progressFill: "bg-[#0496ff]", optionBorder: "border-slate-700", optionHover: "hover:border-[#b10f2e] hover:bg-[#b10f2e]/10", optionSelected: "border-[#0496ff] bg-[#0496ff]/10", btnPrimary: "bg-[#b10f2e] text-white", btnBack: "border-slate-700 text-slate-400 hover:bg-slate-800", chipBg: "bg-slate-800", chipText: "text-slate-300" };
  }

  const handleOptionClick = (option: string) => {
    if (isAnimating || selectedAnswer !== null) return; 
    setSelectedAnswer(option);
    const q = activeQuestions[currentIndex] as any;
    setAnswers(prev => ({ ...prev, [q.id]: option }));
    
    setTimeout(() => {
      setIsAnimating(true);
      setSlideDirection("forward");
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnimating(false);
      }, 250); 
    }, 400); 
  };

  const handleGodMode = () => {
    const fakeAnswers = { ...answers };
    activeQuestions.forEach((q: any) => {
      if (!fakeAnswers[q.id]) {
        fakeAnswers[q.id] = q.options[Math.floor(Math.random() * q.options.length)];
      }
    });
    if (quizName === 'attachment-style') {
      fakeAnswers['demo_1'] = 'Single'; fakeAnswers['demo_2'] = 'No'; fakeAnswers['demo_3'] = 'Woman';
    }
    setAnswers(fakeAnswers);
    setCurrentIndex(activeQuestions.length);
  };

  const handleBack = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setSlideDirection("backward");
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setSelectedAnswer(null); 
        setIsAnimating(false);
      }, 250);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (quizName === "attachment-style") {
        const hasChildren = answers["demo_2"] === "Yes";
        const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
        const gender = answers["demo_3"] ?? "Non-binary";
        const profile = generatePsychologicalProfile(answers, hasChildren);
        setResultData({ profile, demographics: { isSingle, gender, hasChildren }, type: "attachment" });
      } else if (isAttraction) {
        const profile = { ...generateAttractionProfile(answers), premiumUnlocked: false };
        setResultData({ profile, type: "attraction" });
      } else if (isAttractor) {
        const profile = { ...generateAttractorProfile(answers), premiumUnlocked: false };
        setResultData({ profile, type: "attractor" });
      } else if (isPartnerAttachment) {
        const profile = { ...generatePartnerAttachmentProfile(answers), premiumUnlocked: false };
        setResultData({ profile, type: "partner" });
      } else if (isCheating) {
        const profile = { ...generateInfidelityProfile(answers), premiumUnlocked: false };
        setResultData({ profile, type: "infidelity" });
      } else {
        const res = computeLegacyResult(answers, quizName);
        setResultData({ ...res, type: "legacy" });
      }
      setShowResult(true);
      setLoading(false);
      if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
  };

  if (loading) {
    const spinnerColorClass = isCheating ? 'border-[#ef4444]' : isPartnerAttachment ? 'border-[#0f172a]' : isAttractor ? 'border-[#3B1F2B]' : isAttraction ? 'border-[#086788]' : 'border-[#00A6ED]';
    return (
      <div ref={topRef} className={`w-full text-center py-24 ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} animate-in fade-in`}>
        <div className="flex flex-col items-center justify-center">
          <div className={`w-16 h-16 border-4 border-t-transparent ${spinnerColorClass} rounded-full animate-spin mb-6`}></div>
          <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-2 animate-pulse`}>Analyzing Profile...</h3>
        </div>
      </div>
    );
  }

  if (showResult && resultData) {
    if (resultData.type === "attachment") {
      return <div ref={topRef} className="w-full animate-in fade-in duration-500"><MasterReport profile={resultData.profile} demographics={resultData.demographics} isDarkTheme={isDarkTheme} /></div>;
    }
    if (resultData.type === "attraction") {
      return <div ref={topRef} className="w-full animate-in fade-in duration-500"><AttractionMasterReport profile={resultData.profile} /></div>;
    }
    if (resultData.type === "attractor") {
      return <div ref={topRef} className="w-full animate-in fade-in duration-500"><AttractorMasterReport profile={resultData.profile} /></div>;
    }
    if (resultData.type === "partner") {
      return <div ref={topRef} className="w-full animate-in fade-in duration-500"><PartnerAttachmentReport profile={resultData.profile} /></div>;
    }
    if (resultData.type === "infidelity") {
      return <div ref={topRef} className="w-full animate-in fade-in duration-500"><InfidelityMasterReport profile={resultData.profile} /></div>;
    }

    return (
      <div ref={topRef} className={`rounded-[24px] ${colors.bg} text-left w-full max-w-3xl mx-auto ${colors.cardShadow} border ${colors.cardBorder} animate-in fade-in duration-500 p-6 md:p-10`}>
        <h3 className={`text-[28px] md:text-[34px] font-extrabold ${colors.textPrimary} mb-10 leading-tight text-center`}>{resultData.title}</h3>
        <DashboardGrid healthScore={resultData.healthScore} gaugeScore={resultData.gaugeScore} gaugeLabel={resultData.gaugeLabel} />
        <p className={`${colors.textPrimary} p-6 border ${colors.optionBorder} rounded-[16px] font-medium text-lg whitespace-pre-wrap mb-4 bg-slate-50/50`}>{resultData.description}</p>
        <p className={`${colors.textPrimary} p-6 border ${colors.optionBorder} rounded-[16px] font-medium text-lg whitespace-pre-wrap bg-slate-50/50`}>{resultData.behaviors}</p>
        <SharePrintButtons />
      </div>
    );
  }

  if (isFinished) {
    return (
      <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} text-center py-16 px-6 animate-in fade-in zoom-in`}>
        <div className={`w-24 h-24 mx-auto ${colors.progressTrack} rounded-full flex items-center justify-center mb-6`}>
          <span className="text-4xl">🧠</span>
        </div>
        <h3 className={`text-3xl font-extrabold ${colors.textPrimary} mb-4`}>Assessment Complete</h3>
        <p className={`text-lg mb-10 max-w-md mx-auto font-medium ${colors.textSecondary}`}>All data captured. We are ready to compile your specific psychological profile.</p>
        <button onClick={handleSubmit} className={`w-full max-w-sm mx-auto block ${colors.btnPrimary} font-extrabold py-4 rounded-[14px] transform hover:-translate-y-1 transition-all duration-300`}>
          Reveal Profile
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentIndex] as any;
  const baseSectionName = PHASE_LABELS[q.section || q.moduleKey || "default"] ?? q.section ?? q.moduleKey ?? "Assessment";
  const sectionName = q.subscaleKey || q.subscale ? `${baseSectionName} • ${q.subscaleKey || q.subscale}` : baseSectionName;

  return (
    <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bg} rounded-[24px] ${colors.cardShadow} border ${colors.cardBorder} flex flex-col justify-center min-h-[320px] p-5 md:p-6`}>
      <div className="mb-5">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className={`text-[11px] font-extrabold uppercase tracking-widest ${colors.textSecondary} block mb-2`}>Section</span>
            <span className={`text-xs md:text-sm font-extrabold px-3.5 py-1.5 rounded-md ${colors.chipBg} ${colors.chipText}`}>{sectionName}</span>
          </div>
          <div className={`text-sm md:text-base font-extrabold tracking-wide ${colors.textPrimary}`}>QUESTION {currentIndex + 1} / {activeQuestions.length}</div>
        </div>
        <div className={`w-full h-2 rounded-full ${colors.progressTrack} overflow-hidden`}>
          <div className={`h-full rounded-full transition-all duration-500 ease-out ${colors.progressFill}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? (slideDirection === 'forward' ? 'opacity-0 -translate-y-4 scale-[0.99]' : 'opacity-0 translate-y-4 scale-[0.99]') : 'opacity-100 translate-y-0 scale-100'}`}>
        <h3 className={`text-xl md:text-2xl font-extrabold ${colors.textPrimary} mb-5 leading-snug text-left md:text-center`}>{q.text}</h3>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
          {q.options.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === option;
            const isDisabled = selectedAnswer !== null && !isSelected;
            return (
              <button key={idx} onClick={() => handleOptionClick(option)} disabled={isDisabled}
                className={`w-[30%] min-w-[100px] flex-grow text-center flex-col justify-center py-3 px-4 md:py-4 md:px-5 rounded-[12px] border-[2px] font-bold text-sm md:text-base transition-all duration-200 flex items-center ${isSelected ? colors.optionSelected : colors.optionBorder} ${!isDisabled && !isSelected ? colors.optionHover : ''} ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${colors.textPrimary}`}>
                {(!isPremiumUI && !isDarkTheme) && (
                  <div className={`shrink-0 w-[22px] h-[22px] rounded-full border-[2px] mr-4 flex items-center justify-center transition-all duration-200 ${isSelected ? 'border-[#00A6ED] bg-[#00A6ED]' : 'border-[#0D2C54]/20 bg-white'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                  </div>
                )}
                <span className="w-full text-center">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <button onClick={handleBack} disabled={currentIndex === 0 || isAnimating || selectedAnswer !== null}
          className={`text-sm font-extrabold flex items-center gap-2 px-5 py-2.5 rounded-[12px] border-[2px] transition-all ${currentIndex === 0 || isAnimating || selectedAnswer !== null ? 'opacity-0 pointer-events-none' : colors.btnBack}`}>
          <span>←</span> Back
        </button>
        <button onClick={handleGodMode} type="button" title="Instantly jump to results" className={`text-[10px] md:text-xs font-bold transition-all border rounded-lg px-3 py-1.5 ml-auto shadow-sm ${isCheating ? 'text-gray-500 border-[#27272a] hover:text-[#ef4444] bg-[#171717]' : 'text-slate-400 hover:text-slate-600 border-slate-200 hover:border-slate-300 bg-white'}`}>
          ⚡ God Mode
        </button>
      </div>
    </div>
  );
}
