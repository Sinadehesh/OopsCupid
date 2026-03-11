"use client";
import React, { useState, useEffect } from "react";
import { TOXIC_FRIEND_QUESTIONS, OPTIONS, Question } from "../_data/questions";
import SafetyModal from "./SafetyModal";

const STORAGE_KEY = "oopscupid_toxic_friend_progress";

export default function ToxicQuizEngine() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSafety, setShowSafety] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Hydrate from localStorage (Save/Resume functionality)
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

  // Save to localStorage on every change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex }));
    }
  }, [answers, currentIndex, mounted]);

  if (!mounted) return <div className="min-h-[400px] flex items-center justify-center">Loading Engine...</div>;

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-[24px] shadow-lg border border-slate-200 p-10 text-center animate-in fade-in zoom-in">
        <h2 className="text-3xl font-extrabold text-[#0D2C54] mb-4">Assessment Complete</h2>
        <p className="text-lg text-slate-600 mb-8">Your psychological profile has been recorded.</p>
        <button 
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setAnswers({});
            setCurrentIndex(0);
            setIsFinished(false);
          }}
          className="bg-[#00A6ED] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#008fcc] transition-all"
        >
          Reset Demo
        </button>
      </div>
    );
  }

  const question: Question = TOXIC_FRIEND_QUESTIONS[currentIndex];
  const progressPercent = Math.round((currentIndex / TOXIC_FRIEND_QUESTIONS.length) * 100);
  const currentOptions = OPTIONS[question.responseType];

  const handleSelect = (option: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: option }));

    // Hard Flag Safety Check
    if (question.hardFlag) {
      if (question.responseType === "binary" && option === "Yes") setShowSafety(true);
      if (question.responseType === "freq" && (option.startsWith("3") || option.startsWith("4"))) setShowSafety(true);
    }

    setTimeout(() => {
      if (currentIndex < TOXIC_FRIEND_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 relative">
      {showSafety && <SafetyModal onClose={() => setShowSafety(false)} />}
      
      {/* Header & Progress */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Module</span>
          <span className="text-sm font-extrabold text-[#00A6ED]">{question.module} • {question.subscale}</span>
        </div>
        <div className="text-right text-sm font-bold text-slate-400">
          {currentIndex + 1} / {TOXIC_FRIEND_QUESTIONS.length}
        </div>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#00A6ED] transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(13,44,84,0.06)] border border-[#0D2C54]/10 p-6 md:p-10 min-h-[350px] flex flex-col justify-center">
        <h3 className="text-2xl md:text-[28px] font-extrabold text-[#0D2C54] mb-10 leading-snug">
          {question.text}
        </h3>
        
        <div className="grid grid-cols-1 gap-3 w-full">
          {currentOptions.map((opt) => {
            const isSelected = answers[question.id] === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-4 md:p-5 rounded-[16px] border-[2px] font-bold text-lg transition-all duration-200 flex items-center
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

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={handleBack} 
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-0 transition-all"
        >
          &larr; Back
        </button>
        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
          💾 Auto-saving
        </span>
      </div>
    </div>
  );
}
