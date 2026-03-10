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

  // We load ALL 93 questions so the user invests significant time
  const activeQuestions = MANIPULATION_QUESTIONS;
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
        // Calculate the score, but set premiumUnlocked to FALSE
        const finalResult = calculateManipulationScore(newAnswers, MANIPULATION_QUESTIONS, false);
        setResult(finalResult);
        
        // Push them to the limited Results / Upsell Wall
        setStep("results");
      }, 1500);
    }
  };

  const handleUnlock = () => {
    if (result) {
      // Re-calculate with premiumUnlocked = true
      const premiumResult = calculateManipulationScore(answers, MANIPULATION_QUESTIONS, true);
      setResult(premiumResult);
      setStep("master_report");
    }
  };

  // Quick dev hack to auto-fill to test the flow instantly
  const autoFillTest = () => {
    const mockAnswers = MANIPULATION_QUESTIONS.map(q => ({
      questionId: q.id,
      value: Math.floor(Math.random() * 3) + 2 // Random scores skewed high
    }));
    const mockResult = calculateManipulationScore(mockAnswers, MANIPULATION_QUESTIONS, false);
    setResult(mockResult);
    setAnswers(mockAnswers);
    setStep("results");
  };

  if (step === "master_report" && result) {
    return <ManipulationMasterReport result={result} />;
  }

  if (step === "intro") {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-3xl font-extrabold text-[#3B1F2B] mb-6">Is He Manipulating Me?</h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          This 93-item clinical battery maps exact tactics across demands, threats, isolation, and gaslighting.
        </p>
        
        <button onClick={handleStart} className="w-full bg-[#3B1F2B] text-white py-4 rounded-full font-bold text-xl hover:bg-[#2A151E] transition-all mb-4">
          Start Clinical Screening
        </button>

        <button onClick={autoFillTest} className="w-full bg-[#A23B72]/10 text-[#A23B72] py-4 rounded-full font-bold text-sm border border-[#A23B72]/20 hover:bg-[#A23B72]/20 transition-all">
          [DEV]: Auto-Fill & Jump to Results Wall
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

  if (step === "results" && result) {
    const parScore = result.modules.par;
    const isElevated = parScore?.triggeredCutoff;

    return (
      <div className="bg-white rounded-[32px] shadow-xl max-w-4xl mx-auto border border-gray-100 overflow-hidden">
        <div className={`p-10 text-center text-white ${isElevated ? 'bg-[#C73E1D]' : 'bg-[#2E86AB]'}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {isElevated ? "Elevated Friction Detected" : "Baseline Friction Detected"}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {isElevated 
              ? "Your responses triggered the clinical cutoff for psychological or coercive friction based on the core baseline."
              : "Your core friction score is currently below the severe threshold, though mixed signals or specific pressure points may still exist."}
          </p>
        </div>

        <div className="p-8 md:p-12 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Analysis Complete</h4>
              <p className="text-2xl font-bold text-[#3B1F2B]">
                93 Items Analyzed
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                We have processed your responses. Your data has been successfully mapped across 18 clinical subscales, including <strong>Gaslighting</strong>, <strong>Isolation</strong>, and <strong>Emotional Control</strong>.
              </p>
            </div>
            
            {/* BLURRED PREMIUM TEASER */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#A23B72]/5 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-6 text-center border-2 border-[#A23B72]/20 rounded-2xl">
                <span className="bg-[#3B1F2B] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">Locked</span>
                <p className="font-bold text-[#3B1F2B]">Power Tactics & Gaslighting Profile</p>
              </div>
              <h4 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Hidden Metrics</h4>
              <div className="w-full bg-gray-200 h-4 rounded-full mt-4"></div>
              <div className="w-2/3 bg-gray-200 h-4 rounded-full mt-2"></div>
              <div className="w-4/5 bg-gray-200 h-4 rounded-full mt-2"></div>
            </div>
          </div>

          <div className="bg-[#3B1F2B] p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F18F01] via-[#A23B72] to-[#C73E1D]"></div>
            <h3 className="text-3xl font-extrabold text-white mb-4">Unlock Your Psychological Blueprint</h3>
            <p className="text-[#F18F01] text-lg mb-8 font-medium max-w-2xl mx-auto">
              You just invested the time to provide 93 clinical data points. Don't leave without your answers. Unlock your Master Report to see exactly what manipulation tactics are being used against you.
            </p>
            <button 
              onClick={handleUnlock}
              className="bg-[#C73E1D] text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-[#A83519] transition-all hover:scale-105 shadow-[0_0_20px_rgba(199,62,29,0.4)] w-full md:w-auto"
            >
              Unlock Premium Master Report
            </button>
            <p className="mt-4 text-white/50 text-sm italic">
              (For now, this button instantly unlocks the mock premium report for testing)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
