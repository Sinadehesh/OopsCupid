"use client";
import React, { useState, useEffect } from "react";
import { TOXIC_FRIEND_QUESTIONS, OPTIONS, Question } from "../_data/questions";
import SafetyModal from "./SafetyModal";
import FreeResult from "./FreeResult";
import { calculateToxicScores } from "../_lib/scoring";

const STORAGE_KEY = "oopscupid_toxic_friend_progress";

export default function ToxicQuizEngine() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSafety, setShowSafety] = useState(false);
  
  const [isFinished, setIsFinished] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultsData, setResultsData] = useState<any>(null);

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers || {});
        setCurrentIndex(parsed.currentIndex || 0);
      } catch (e) {
        console.error("Failed to parse saved progress");
      }
    }
    setMounted(true);
  }, []);

  // Save on change
  useEffect(() => {
    if (mounted && !isFinished) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex }));
    }
  }, [answers, currentIndex, mounted, isFinished]);

  if (!mounted) return <div className="min-h-[400px] flex items-center justify-center text-slate-500" aria-live="polite">Loading Engine...</div>;

  if (isFinished && resultsData) {
    return <FreeResult data={resultsData} rawAnswers={answers} />;
  }

  if (isCalculating) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-[24px] shadow-lg border border-slate-200 p-16 text-center animate-in fade-in zoom-in" aria-live="assertive">
        <div className="w-16 h-16 border-4 border-[#0D2C54]/20 border-t-[#00A6ED] rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-extrabold text-[#0D2C54]">Computing Diagnostics...</h2>
        <p className="text-slate-500 mt-2">Analyzing multi-dimensional risk factors.</p>
      </div>
    );
  }

  const question: Question = TOXIC_FRIEND_QUESTIONS[currentIndex];
  const progressPercent = Math.round((currentIndex / TOXIC_FRIEND_QUESTIONS.length) * 100);
  const currentOptions = OPTIONS[question.responseType];

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (question.hardFlag) {
      if (question.responseType === "binary" && option === "Yes") setShowSafety(true);
      if (question.responseType === "freq" && (option.startsWith("3") || option.startsWith("4"))) setShowSafety(true);
    }

    setTimeout(() => {
      if (currentIndex < TOXIC_FRIEND_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsCalculating(true);
        setTimeout(() => {
          const res = calculateToxicScores(newAnswers);
          setResultsData(res);
          setIsCalculating(false);
          setIsFinished(true);
        }, 1500);
      }
    }, 350);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-in slide-in-from-bottom-4 duration-500 relative">
      {showSafety && <SafetyModal onClose={() => setShowSafety(false)} />}
      
      {/* Header & Progress (Hidden from screen readers to avoid noise) */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100" aria-hidden="true">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Module</span>
          <span className="text-sm font-extrabold text-[#00A6ED]">{question.module} • {question.subscale}</span>
        </div>
        <div className="text-right text-sm font-bold text-slate-400">
          {currentIndex + 1} / {TOXIC_FRIEND_QUESTIONS.length}
        </div>
      </div>

      {/* Accessible Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Quiz progress">
        <div className="h-full bg-[#00A6ED] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(13,44,84,0.06)] border border-[#0D2C54]/10 p-6 md:p-10 min-h-[350px] flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl font-extrabold text-[#0D2C54] mb-5 leading-snug" aria-live="polite">
          {question.text}
        </h3>
        
        {/* Accessible Radiogroup with enlarged touch targets */}
        <div className="grid grid-cols-1 gap-3 w-full" role="radiogroup" aria-label="Answer options">
          {currentOptions.map((opt) => {
            const isSelected = answers[question.id] === opt;
            return (
              <button
                key={opt}
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left py-3 px-4 md:py-4 md:px-5 min-h-[50px] rounded-[12px] border-[2px] font-bold text-sm md:text-base transition-all duration-200 flex items-center focus:outline-none focus:ring-4 focus:ring-[#00A6ED]/30
                  ${isSelected 
                    ? "border-[#00A6ED] bg-[#00A6ED]/10 text-[#00A6ED] shadow-inner" 
                    : "border-[#0D2C54]/15 text-[#0D2C54] hover:border-[#00A6ED]/50 hover:bg-slate-50"
                  }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={handleBack} 
          disabled={currentIndex === 0}
          aria-label="Go back to previous question"
          className="px-6 py-3 min-h-[48px] rounded-xl font-bold text-slate-500 hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-0 transition-all focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          &larr; Back
        </button>
        <span className="text-xs font-medium text-slate-400 flex items-center gap-1" aria-hidden="true">
          💾 Auto-saving
        </span>
      </div>
    </div>
  );
}
