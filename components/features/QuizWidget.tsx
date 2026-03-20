"use client";

import React, { useState, useMemo, useRef } from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";

import AttachmentReport from "@/components/report/AttachmentReport";

import { attachmentQuestions, Question } from "@/lib/psychometrics/attachment/questions";
import { attractionQuestions } from "@/lib/psychometrics/attraction/questions";
import { attractorQuestions } from "@/lib/psychometrics/attractor/questions";
import { partnerAttachmentQuestions } from "@/lib/psychometrics/partner-attachment/questions";
import { infidelityQuestions } from "@/lib/psychometrics/infidelity/questions";
import { friendRoleQuestions } from "@/lib/psychometrics/friend-role/questions";
import { friendUsedQuestions } from "@/lib/psychometrics/friend-used/questions";

import AttractionMasterReport from "@/components/report/AttractionMasterReport";
import AttractorMasterReport from "@/components/report/AttractorMasterReport";
import PartnerAttachmentReport from "@/components/report/PartnerAttachmentReport";
import InfidelityMasterReport from "@/components/report/InfidelityMasterReport";
import FriendRoleMasterReport from "@/components/report/FriendRoleMasterReport";
import FriendUsedMasterReport from "@/components/report/FriendUsedMasterReport";

const legacyBanks: Record<string, Question[]> = {
  "default": [
    { id: "1", text: "How often do they text you first?", options: ["Every day", "Usually", "Rarely", "Never"] }
  ]
};

const PHASE_LABELS: Record<string, string> = {
  demographics: "Profile Setup", ecr: "Attachment Style"
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
  const isAttachment = quizName === "attachment-style";
  
  const activeQuestions = useMemo(() => {
    if (isAttachment) return attachmentQuestions; 
    return legacyBanks["default"];
  }, [quizName, isAttachment]);

  const isFinished = currentIndex >= activeQuestions.length;
  const progress   = Math.round((currentIndex / activeQuestions.length) * 100);

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
    if (isAttachment) {
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
      if (isAttachment) {
        const hasChildren = answers["demo_2"] === "Yes";
        const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
        const gender = answers["demo_3"] ?? "Non-binary";
        const profile = generatePsychologicalProfile(answers, hasChildren);
        setResultData({ profile, demographics: { isSingle, gender, hasChildren }, type: "attachment" });
      } else {
        setResultData({ ...computeLegacyResult(answers, quizName), type: "legacy" });
      }
      setShowResult(true);
      setLoading(false);
      if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
  };

  if (loading) {
    return (
      <div ref={topRef} className={`w-full text-center py-24 bg-white rounded-[24px] shadow-lg border border-[#d6d2d2] animate-in fade-in`}>
        <div className="flex flex-col items-center justify-center">
          <div className={`w-16 h-16 border-4 border-[#d6d2d2] border-t-[#06aed5] rounded-full animate-spin mb-6`}></div>
          <h3 className={`text-2xl font-black text-[#086788] mb-2 animate-pulse`}>Analyzing Profile...</h3>
        </div>
      </div>
    );
  }

  if (showResult && resultData) {
    if (resultData.type === "attachment") {
      return <div ref={topRef} className="w-full animate-in fade-in duration-500"><AttachmentReport profile={resultData.profile} demographics={resultData.demographics} /></div>;
    }
    return null;
  }

  if (isFinished) {
    return (
      <div ref={topRef} className={`w-full max-w-3xl mx-auto bg-white border border-[#d6d2d2] rounded-[24px] shadow-lg text-center py-16 px-6 animate-in fade-in zoom-in`}>
        <div className={`w-24 h-24 mx-auto bg-[#fff1d0] border border-[#f0c808]/30 rounded-full flex items-center justify-center mb-6`}>
          <span className="text-4xl">🧠</span>
        </div>
        <h3 className={`text-3xl font-black text-[#086788] mb-4`}>Assessment Complete</h3>
        <p className={`text-lg mb-10 max-w-md mx-auto font-medium text-[#086788]/80`}>All data captured. We are ready to compile your specific psychological profile.</p>
        <button onClick={handleSubmit} className={`w-full max-w-sm mx-auto block bg-[#086788] hover:bg-[#06aed5] text-white font-black py-4 rounded-[14px] transform hover:-translate-y-1 transition-all duration-300 shadow-md`}>
          Reveal Profile
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentIndex] as any;
  const sectionName = PHASE_LABELS[q.section || q.moduleKey || "default"] ?? "Assessment";
  const useKeypad = isAttachment && !String(q.id).startsWith("demo");

  return (
    <div ref={topRef} className={`w-full max-w-3xl mx-auto bg-white rounded-[24px] shadow-lg border border-[#d6d2d2] flex flex-col justify-center min-h-[320px] p-6 md:p-8`}>
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className={`text-[11px] font-black uppercase tracking-widest text-[#086788]/50 block mb-2`}>Section</span>
            <span className={`text-xs md:text-sm font-black px-3.5 py-1.5 rounded-md bg-[#fff1d0] text-[#086788]`}>{sectionName}</span>
          </div>
          <div className={`text-sm md:text-base font-black tracking-wide text-[#086788]`}>QUESTION {currentIndex + 1} / {activeQuestions.length}</div>
        </div>
        <div className={`w-full h-2 rounded-full bg-[#d6d2d2] overflow-hidden`}>
          <div className={`h-full rounded-full transition-all duration-500 ease-out bg-[#06aed5]`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? (slideDirection === 'forward' ? 'opacity-0 -translate-y-4 scale-[0.99]' : 'opacity-0 translate-y-4 scale-[0.99]') : 'opacity-100 translate-y-0 scale-100'}`}>
        <h3 className={`text-2xl md:text-3xl font-black text-[#086788] mb-8 leading-snug text-center`}>{q.text}</h3>
        
        {useKeypad ? (
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-lg mx-auto w-full">
            {q.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isDisabled = selectedAnswer !== null && !isSelected;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isDisabled}
                  className={`group flex flex-col items-center justify-center w-[30%] aspect-square rounded-[24px] border-2 transition-all focus:outline-none active:scale-95 ${
                    isSelected 
                      ? 'bg-[#086788] border-[#086788] shadow-md text-white' 
                      : isDisabled
                        ? 'bg-white border-[#d6d2d2] opacity-40 cursor-not-allowed text-[#086788]'
                        : 'bg-white border-[#d6d2d2] hover:border-[#06aed5] hover:bg-[#06aed5]/5 hover:-translate-y-1 hover:shadow-md cursor-pointer text-[#086788]'
                  }`}
                >
                  <span className={`text-3xl md:text-4xl font-black mb-1 ${isSelected ? 'text-white' : 'text-[#06aed5]'}`}>
                    {idx + 1}
                  </span>
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider text-center px-1 leading-tight ${isSelected ? 'text-white' : 'text-[#086788] group-hover:text-[#086788]'}`}>
                    {option}
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4 w-full">
            {q.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isDisabled = selectedAnswer !== null && !isSelected;
              return (
                <button key={idx} onClick={() => handleOptionClick(option)} disabled={isDisabled}
                  className={`w-full md:w-[45%] flex-grow text-center flex-col justify-center py-4 px-5 rounded-[16px] border-[2px] font-black text-sm md:text-base transition-all duration-200 flex items-center ${
                    isSelected 
                      ? 'bg-[#086788] border-[#086788] text-white shadow-md' 
                      : isDisabled 
                        ? 'bg-white border-[#d6d2d2] opacity-40 cursor-not-allowed text-[#086788]' 
                        : 'bg-white border-[#d6d2d2] hover:border-[#06aed5] hover:bg-[#06aed5]/5 text-[#086788]'
                  }`}>
                  <span className="w-full text-center">{option}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between items-center border-t border-[#d6d2d2] pt-6">
        <button onClick={handleBack} disabled={currentIndex === 0 || isAnimating || selectedAnswer !== null}
          className={`text-sm font-black flex items-center gap-2 px-5 py-2.5 rounded-[12px] transition-all bg-white text-[#086788] border border-[#d6d2d2] hover:bg-slate-50 ${currentIndex === 0 || isAnimating || selectedAnswer !== null ? 'opacity-0 pointer-events-none' : ''}`}>
          <span>←</span> Back
        </button>
        <button onClick={handleGodMode} type="button" className={`text-[10px] md:text-xs font-bold transition-all border rounded-lg px-3 py-1.5 shadow-sm text-[#086788]/50 hover:text-[#086788] border-[#d6d2d2] bg-white`}>
          ⚡ God Mode
        </button>
      </div>
    </div>
  );
}
