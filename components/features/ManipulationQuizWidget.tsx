"use client";

import React, { useState } from "react";
import { MANIPULATION_QUESTIONS } from "@/lib/psychometrics/manipulation/questions";
import { calculateManipulationScore } from "@/lib/psychometrics/manipulation/scoring";
import { Answer, AssessmentResult } from "@/lib/psychometrics/manipulation/types";

type QuizState = "intro" | "consent" | "questions" | "calculating" | "results";

export default function ManipulationQuizWidget() {
  const [step, setStep] = useState<QuizState>("intro");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Free flow only uses the PAR module (premiumOnly is falsy)
  const freeQuestions = MANIPULATION_QUESTIONS.filter(q => !q.premiumOnly);
  const currentQ = freeQuestions[currentIndex];

  const handleStart = () => setStep("consent");
  const handleConsent = () => setStep("questions");

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, { questionId: currentQ.id, value }];
    setAnswers(newAnswers);

    if (currentIndex < freeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStep("calculating");
      setTimeout(() => {
        const finalResult = calculateManipulationScore(newAnswers, MANIPULATION_QUESTIONS, false);
        setResult(finalResult);
        setStep("results");
      }, 1500);
    }
  };

  if (step === "intro") {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto border border-gray-100">
        <h2 className="text-3xl font-extrabold text-[#3B1F2B] mb-6">Is He Manipulating Me?</h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          This psychological battery screens for patterns of coercive control, power tactics, and gaslighting. 
          It is designed as a screening system, not a diagnostic proof of abuse.
        </p>
        <div className="bg-[#A23B72]/10 p-6 rounded-2xl mb-8 border border-[#A23B72]/20">
          <h4 className="font-bold text-[#A23B72] mb-2">How it works:</h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Free Screen:</strong> Takes ~3 minutes. Uses the validated 20-item PAR scale to assess baseline psychological friction over the last 12 months.</li>
            <li><strong>Premium Unlock:</strong> Adds coercive control, isolation tactics, and gaslighting deep-dives to map exactly what is happening.</li>
          </ul>
        </div>
        <button onClick={handleStart} className="w-full bg-[#3B1F2B] text-white py-4 rounded-full font-bold text-xl hover:bg-[#2A151E] transition-all">
          Start Free Screening
        </button>
      </div>
    );
  }

  if (step === "consent") {
    return (
      <div className="bg-[#3B1F2B] text-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-[#F18F01]">Safety & Privacy Notice</h2>
        <p className="text-lg mb-6 leading-relaxed opacity-90">
          This assessment asks about sensitive relationship dynamics, including threats, control, and emotional pressure. 
          Your answers are completely private and are not saved to your account unless you choose to unlock the Master Report.
        </p>
        <div className="bg-white/10 p-6 rounded-2xl mb-8">
          <p className="font-bold mb-2">Important Instructions:</p>
          <p className="opacity-90">Answer based on his behavior toward you over the <strong>last 12 months</strong>. Trust your initial instinct.</p>
        </div>
        <button onClick={handleConsent} className="w-full bg-[#F18F01] text-[#3B1F2B] py-4 rounded-full font-bold text-xl hover:bg-[#e08400] transition-all">
          I Understand, Continue
        </button>
      </div>
    );
  }

  if (step === "questions") {
    const progress = Math.round((currentIndex / freeQuestions.length) * 100);
    return (
      <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl max-w-3xl mx-auto border border-gray-100 min-h-[400px] flex flex-col justify-center relative">
        <div className="absolute top-8 left-8 right-8">
          <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
            <span>Core Assessment</span>
            <span>{currentIndex + 1} of {freeQuestions.length}</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#2E86AB] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
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
                className="bg-gray-50 border border-gray-200 text-[#3B1F2B] py-4 rounded-xl font-semibold hover:bg-[#2E86AB] hover:text-white hover:border-[#2E86AB] transition-all"
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
        <h3 className="text-2xl font-bold text-[#3B1F2B]">Analyzing behavioral patterns...</h3>
        <p className="text-gray-500 mt-2">Checking against psychological friction thresholds.</p>
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
              ? "Your responses triggered the clinical cutoff for psychological or coercive friction. This indicates a highly imbalanced dynamic."
              : "Your core friction score is currently below the severe threshold, though mixed signals or specific pressure points may still exist."}
          </p>
        </div>

        <div className="p-8 md:p-12 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Core Finding</h4>
              <p className="text-2xl font-bold text-[#3B1F2B]">
                {result.dominantPattern === "high_coercive_control" ? "High Coercive Control" : "Patterns Require Deep-Dive"}
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                The free screen only looks at 20 surface-level indicators. To accurately map if he is using <strong>Gaslighting</strong>, <strong>Isolation</strong>, or <strong>Emotional Control</strong>, we need to run the remaining 73-item battery.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#A23B72]/5 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                <span className="bg-[#3B1F2B] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">Locked</span>
                <p className="font-bold text-[#3B1F2B]">Power Tactics Profile</p>
              </div>
              <h4 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Hidden Metric</h4>
              <div className="w-full bg-gray-200 h-4 rounded-full mt-4"></div>
              <div className="w-2/3 bg-gray-200 h-4 rounded-full mt-2"></div>
            </div>
          </div>

          <div className="bg-[#3B1F2B] p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F18F01] via-[#A23B72] to-[#C73E1D]"></div>
            <h3 className="text-3xl font-extrabold text-white mb-4">Unlock the Full Manipulation Report</h3>
            <p className="text-[#F18F01] text-lg mb-8 font-medium">
              Run the full Coercive Control, Power Tactics, and Gaslighting batteries. See exactly what tactics are being used against you.
            </p>
            <button className="bg-[#C73E1D] text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-[#A83519] transition-all hover:scale-105 shadow-lg w-full md:w-auto">
              Unlock Premium Master Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
