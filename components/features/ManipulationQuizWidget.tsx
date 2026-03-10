"use client";

import React, { useState, useRef } from "react";
import { MANIPULATION_QUESTIONS } from "@/lib/psychometrics/manipulation/questions";
import { calculateManipulationScore } from "@/lib/psychometrics/manipulation/scoring";
import { Answer, AssessmentResult } from "@/lib/psychometrics/manipulation/types";
import ManipulationMasterReport from "@/components/report/ManipulationMasterReport";

type QuizState = "intro" | "consent" | "questions" | "calculating" | "master_report";

export default function ManipulationQuizWidget() {
  const [step, setStep] = useState<QuizState>("intro");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Animation & UX States
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);
  const activeQuestions = MANIPULATION_QUESTIONS;
  const currentQ = activeQuestions[currentIndex];

  const progress = Math.round((currentIndex / activeQuestions.length) * 100);

  // STRICT CUSTOM RED PALETTE
  const colors = {
    bgMain: "bg-[#0f0606]",
    bgCard: "bg-[#200b0b]",
    borderCard: "border-[#2f0000]",
    textPrimary: "text-[#ffffff]",
    textSecondary: "text-[#ffffff]/70",
    progressTrack: "bg-[#2f0000]",
    progressFill: "bg-[#650000]",
    optionBorder: "border-[#2f0000]",
    optionHover: "hover:border-[#490000] hover:bg-[#490000]/20 hover:-translate-y-0.5",
    optionSelected: "border-[#650000] bg-[#650000]/30 shadow-inner",
    btnPrimary: "bg-[#650000] text-white hover:bg-[#490000] shadow-lg",
    btnBack: "border-[#2f0000] text-[#ffffff]/70 hover:bg-[#2f0000]/50 hover:text-white",
    chipBg: "bg-[#490000]/40",
    chipText: "text-[#ffffff]",
    indicatorSelected: "border-[#650000] bg-[#650000]",
    indicatorUnselected: "border-[#2f0000] bg-[#0f0606]"
  };

  const likertOptions = [
    { label: "Never", val: 0 },
    { label: "Rarely", val: 1 },
    { label: "Sometimes", val: 2 },
    { label: "Often", val: 3 },
    { label: "Very Often", val: 4 },
    { label: "Constantly", val: 5 }
  ];

  const impactOptions = [
    { label: "Not at all", val: 0 },
    { label: "A little", val: 1 },
    { label: "Moderately", val: 2 },
    { label: "Quite a bit", val: 3 },
    { label: "Extremely", val: 4 }
  ];

  const currentOptions = currentQ?.responseType === "impact_0_4" ? impactOptions : likertOptions;

  const handleStart = () => {
    setStep("consent");
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleConsent = () => setStep("questions");

  const handleOptionClick = (val: number) => {
    if (isAnimating || selectedAnswer !== null) return; 
    
    setSelectedAnswer(val);
    const newAnswers = [...answers.filter(a => a.questionId !== currentQ.id), { questionId: currentQ.id, value: val }];
    setAnswers(newAnswers);
    
    setTimeout(() => {
      setIsAnimating(true);
      setSlideDirection("forward");
      
      setTimeout(() => {
        if (currentIndex < activeQuestions.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsAnimating(false);
        } else {
          finishQuiz(newAnswers);
        }
      }, 250); 
    }, 400); 
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

  const finishQuiz = (finalAnswers: Answer[]) => {
    setStep("calculating");
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
    
    setTimeout(() => {
      // Calculate score with premiumUnlocked = false initially to show the paywall
      const finalResult = calculateManipulationScore(finalAnswers, MANIPULATION_QUESTIONS, false);
      setResult(finalResult);
      setStep("master_report");
    }, 2000);
  };

  const autoFillTest = () => {
    const mockAnswers = MANIPULATION_QUESTIONS.map(q => ({
      questionId: q.id,
      value: Math.floor(Math.random() * (currentQ?.responseType === "impact_0_4" ? 4 : 5))
    }));
    finishQuiz(mockAnswers);
  };

  if (step === "master_report" && result) {
    return (
      <div ref={topRef} className="w-full animate-in fade-in duration-500">
        <ManipulationMasterReport result={result} />
      </div>
    );
  }

  if (step === "intro") {
    return (
      <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bgCard} rounded-[32px] shadow-2xl border ${colors.borderCard} p-8 md:p-12 text-center animate-in fade-in`}>
        <div className="w-20 h-20 mx-auto bg-[#650000]/20 rounded-full flex items-center justify-center mb-6 border border-[#650000]/50">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className={`text-3xl md:text-4xl font-extrabold ${colors.textPrimary} mb-6 leading-tight`}>Is He Manipulating You?</h2>
        <p className={`text-lg ${colors.textSecondary} mb-10 leading-relaxed max-w-xl mx-auto`}>
          This 93-item clinical battery screens for patterns of coercive control, power tactics, and gaslighting. It is designed to map exactly how your reality is being distorted.
        </p>
        <button onClick={handleStart} className={`w-full md:w-auto px-10 py-5 rounded-full font-bold text-xl ${colors.btnPrimary} transition-all mb-6`}>
          Start Clinical Screening
        </button>
        <button onClick={autoFillTest} className={`block mx-auto text-sm font-bold ${colors.textSecondary} hover:text-white transition-colors underline underline-offset-4`}>
          [DEV] Skip & Auto-Fill
        </button>
      </div>
    );
  }

  if (step === "consent") {
    return (
      <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bgCard} rounded-[32px] shadow-2xl border ${colors.borderCard} p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4`}>
        <h2 className={`text-3xl font-extrabold mb-6 text-[#ffffff]`}>Safety & Privacy Notice</h2>
        <p className={`text-lg mb-6 leading-relaxed ${colors.textSecondary}`}>
          This assessment asks about sensitive relationship dynamics, including threats, control, and emotional pressure. Your answers are completely private and are not saved unless you choose to unlock your report.
        </p>
        <div className={`bg-[#0f0606] p-6 rounded-2xl mb-10 border ${colors.borderCard}`}>
          <p className="font-bold mb-2 text-white">Important Instructions:</p>
          <p className={`${colors.textSecondary}`}>Answer based on his behavior toward you over the <strong>last 12 months</strong>. Trust your initial instinct.</p>
        </div>
        <button onClick={handleConsent} className={`w-full py-5 rounded-full font-bold text-xl ${colors.btnPrimary} transition-all`}>
          I Understand, Continue
        </button>
      </div>
    );
  }

  if (step === "calculating") {
    return (
      <div ref={topRef} className={`w-full max-w-2xl mx-auto text-center py-24 ${colors.bgCard} rounded-[32px] shadow-2xl border ${colors.borderCard} animate-in fade-in`}>
        <div className={`w-16 h-16 border-4 border-t-transparent border-[#650000] rounded-full animate-spin mx-auto mb-8`}></div>
        <h3 className={`text-2xl font-extrabold ${colors.textPrimary} mb-3 animate-pulse`}>Generating Clinical Map...</h3>
        <p className={`${colors.textSecondary}`}>Correlating subscales and coercion patterns.</p>
      </div>
    );
  }

  return (
    <div ref={topRef} className={`w-full max-w-3xl mx-auto ${colors.bgCard} rounded-[32px] shadow-2xl border ${colors.borderCard} flex flex-col justify-center min-h-[450px] p-6 md:p-10`}>
      
      {/* HEADER: Section Indicator & Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className={`text-[11px] font-extrabold uppercase tracking-widest ${colors.textSecondary} block mb-2`}>
              Module
            </span>
            <span className={`text-xs md:text-sm font-extrabold px-3.5 py-1.5 rounded-md ${colors.chipBg} ${colors.chipText} uppercase tracking-wider`}>
              {currentQ.module.replace('_', ' ')}
            </span>
          </div>
          <div className={`text-sm md:text-base font-extrabold tracking-wide ${colors.textPrimary}`}>
            {currentIndex + 1} / {activeQuestions.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={`w-full h-2 rounded-full ${colors.progressTrack} overflow-hidden`}>
          <div className={`h-full rounded-full transition-all duration-500 ease-out ${colors.progressFill}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* QUESTION & OPTIONS */}
      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? (slideDirection === 'forward' ? 'opacity-0 -translate-y-4 scale-[0.99]' : 'opacity-0 translate-y-4 scale-[0.99]') : 'opacity-100 translate-y-0 scale-100'}`}>
        <h3 className={`text-2xl md:text-[28px] font-extrabold ${colors.textPrimary} mb-8 leading-snug text-left md:text-center`}>
          {currentQ.stem}
        </h3>

        <div className="grid grid-cols-1 gap-3 md:gap-4 w-full">
          {currentOptions.map((opt) => {
            const isSelected = selectedAnswer === opt.val;
            const isDisabled = selectedAnswer !== null && !isSelected;
            
            return (
              <button 
                key={opt.val} 
                onClick={() => handleOptionClick(opt.val)} 
                disabled={isDisabled}
                className={`
                  w-full text-left p-4 md:p-[20px] rounded-[16px] border-[2px] font-bold text-base md:text-lg transition-all duration-200 flex items-center
                  ${isSelected ? colors.optionSelected : colors.optionBorder}
                  ${!isDisabled && !isSelected ? colors.optionHover : ''}
                  ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                  ${colors.textPrimary} bg-[#0f0606]
                `}
              >
                <div className={`shrink-0 w-[22px] h-[22px] rounded-full border-[2px] mr-4 flex items-center justify-center transition-all duration-200 ${isSelected ? colors.indicatorSelected : colors.indicatorUnselected}`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                </div>
                <span className="flex-1">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FOOTER: Back Button */}
      <div className="mt-10 flex justify-between items-center">
        <button 
          onClick={handleBack} 
          disabled={currentIndex === 0 || isAnimating || selectedAnswer !== null}
          className={`text-sm font-extrabold flex items-center gap-2 px-5 py-2.5 rounded-[12px] border-[2px] transition-all 
            ${currentIndex === 0 || isAnimating || selectedAnswer !== null
              ? 'opacity-0 pointer-events-none' 
              : colors.btnBack}`}
        >
          <span>←</span> Back
        </button>
      </div>

    </div>
  );
}
