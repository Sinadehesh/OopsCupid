"use client";

import React, { useState } from "react";
import { MANIPULATION_QUESTIONS } from "@/lib/psychometrics/manipulation/questions";
import { calculateManipulationScore } from "@/lib/psychometrics/manipulation/scoring";
import { Answer, AssessmentResult } from "@/lib/psychometrics/manipulation/types";
import ManipulationMasterReport from "@/components/report/ManipulationMasterReport";

type QuizState = "intro" | "consent" | "questions" | "calculating" | "results" | "master_report";

export default function ManipulationQuizWidget() {
  const [step, setStep] = useState<QuizState>("intro");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Free flow uses PAR. Premium mock runs everything.
  const isPremiumSimulated = true; // Set true so we can test the UI quickly
  const activeQuestions = isPremiumSimulated ? MANIPULATION_QUESTIONS : MANIPULATION_QUESTIONS.filter(q => !q.premiumOnly);
  const currentQ = activeQuestions[currentIndex];

  const handleStart = () => setStep("consent");
  const handleConsent = () => setStep("questions");

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, { questionId: currentQ.id, value }];
    setAnswers(newAnswers);

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep("calculating");
      setTimeout(() => {
        const finalResult = calculateManipulationScore(newAnswers, MANIPULATION_QUESTIONS, isPremiumSimulated);
        setResult(finalResult);
        
        // Skip the upsell screen completely if testing premium flow
        setStep(isPremiumSimulated ? "master_report" : "results");
      }, 1500);
    }
  };

  // Quick dev hack to auto-fill to test Master Report instantly without clicking 93 times
  const autoFillTest = () => {
    const mockAnswers = MANIPULATION_QUESTIONS.map(q => ({
      questionId: q.id,
      value: Math.floor(Math.random() * 3) + 2 // Random scores skewed high
    }));
    const mockResult = calculateManipulationScore(mockAnswers, MANIPULATION_QUESTIONS, true);
    setResult(mockResult);
    setStep("master_report");
  };

  if (step === "master_report" && result) {
    return <ManipulationMasterReport result={result} />;
  }

  if (step === "intro") {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-3xl font-extrabold text-[#3B1F2B] mb-6">Is He Manipulating Me?</h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          This psychological battery screens for patterns of coercive control, power tactics, and gaslighting.
        </p>
        
        <button onClick={handleStart} className="w-full bg-[#3B1F2B] text-white py-4 rounded-full font-bold text-xl hover:bg-[#2A151E] transition-all mb-4">
          Start Full Screening
        </button>

        <button onClick={autoFillTest} className="w-full bg-[#A23B72]/10 text-[#A23B72] py-4 rounded-full font-bold text-sm border border-[#A23B72]/20 hover:bg-[#A23B72]/20 transition-all">
          [DEV]: Auto-Fill & Jump to Master Report
        </button>
      </div>
    );
  }

  if (step === "consent") {
    return (
      <div className="bg-[#3B1F2B] text-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-[#F18F01]">Safety & Privacy Notice</h2>
        <p className="text-lg mb-6 leading-relaxed opacity-90">
          This assessment asks about sensitive relationship dynamics. Your answers are completely private.
        </p>
        <button onClick={handleConsent} className="w-full bg-[#F18F01] text-[#3B1F2B] py-4 rounded-full font-bold text-xl hover:bg-[#e08400] transition-all">
          I Understand, Continue
        </button>
      </div>
    );
  }

  if (step === "questions") {
    const progress = Math.round((currentIndex / activeQuestions.length) * 100);
    return (
      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto border border-gray-100 min-h-[400px] flex flex-col justify-center relative">
        <div className="absolute top-8 left-8 right-8">
          <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
            <span>Clinical Battery</span>
            <span>{currentIndex + 1} of {activeQuestions.length}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#A23B72] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-[#3B1F2B] text-center mb-10 leading-tight">
            {currentQ.stem}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Never", val: 0 },
              { label: "Rarely", val: 1 },
              { label: "Sometimes", val: 2 },
              { label: "Often", val: 3 },
              { label: "Very Often", val: 4 },
              { label: "Constantly", val: 5 }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleAnswer(opt.val)}
                className="bg-gray-50 border border-gray-200 text-[#3B1F2B] py-4 rounded-xl font-semibold hover:bg-[#3B1F2B] hover:text-white transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "calculating") {
    return (
      <div className="bg-white p-12 rounded-[32px] shadow-xl max-w-2xl mx-auto text-center border border-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#A23B72] mx-auto mb-6"></div>
        <h3 className="text-2xl font-bold text-[#3B1F2B]">Generating Clinical Map...</h3>
        <p className="text-gray-500 mt-2">Correlating subscales and coercion patterns.</p>
      </div>
    );
  }

  return null;
}
