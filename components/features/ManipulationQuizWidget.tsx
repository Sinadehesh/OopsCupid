"use client";

import React, { useState, useMemo, useRef } from "react";
import { manipulationQuestions } from "@/lib/psychometrics/manipulation/questions";
import { generateManipulationProfile } from "@/lib/psychometrics/manipulation/scoring";
import ManipulationMasterReport from "@/components/report/ManipulationMasterReport";

// FIX: Added CheckCircle2 to the imports here!
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ManipulationQuizWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [isScoring, setIsScoring] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);
  const isFinished = currentIndex >= manipulationQuestions.length;
  const progress = Math.round((currentIndex / manipulationQuestions.length) * 100);

  const handleOptionClick = (option: string) => {
    if (isAnimating || selectedAnswer !== null) return; 
    setSelectedAnswer(option);
    const q = manipulationQuestions[currentIndex];
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

  const handleCompile = () => {
    setIsScoring(true);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    
    setTimeout(() => {
      const profile = generateManipulationProfile(answers);
      setResultData(profile);
      setIsScoring(false);
      setShowEmailGate(true);
    }, 2000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    
    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quizType: 'manipulation', profile: resultData })
      }).catch(() => console.log("API not ready yet, proceeding anyway."));
      
      setResultData((prev: any) => ({ ...prev, userEmail: email }));
      
      setShowEmailGate(false);
      setShowResult(true);
      if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGodMode = () => {
    const fakeAnswers = { ...answers };
    manipulationQuestions.forEach((q) => {
      if (!fakeAnswers[q.id]) fakeAnswers[q.id] = q.options[Math.floor(Math.random() * q.options.length)];
    });
    setAnswers(fakeAnswers);
    setCurrentIndex(manipulationQuestions.length);
  };

  if (isScoring) {
    return (
      <div ref={topRef} className={`w-full max-w-5xl mx-auto text-center py-32 bg-white rounded-2xl shadow-sm border border-[#d6d2d2] animate-in fade-in`}>
        <div className="flex flex-col items-center justify-center">
          <div className={`w-16 h-16 border-4 border-[#d6d2d2] border-t-[#dd1c1a] rounded-full animate-spin mb-6`}></div>
          <h3 className={`text-2xl font-black text-[#086788] mb-2 animate-pulse`}>Compiling Red Flags...</h3>
        </div>
      </div>
    );
  }

  if (showEmailGate) {
    return (
      <div ref={topRef} className="w-full max-w-3xl mx-auto bg-white border border-[#d6d2d2] rounded-2xl shadow-md p-8 md:p-12 animate-in zoom-in fade-in">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="w-16 h-16 bg-[#fff1d0] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#f0c808]/40">
            <Lock className="w-8 h-8 text-[#086788]" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-[#086788] mb-4">Your Master Audit is Ready.</h3>
          <p className="text-lg font-medium text-[#086788]/80">
            We have completely mapped his behavior. Where should we send your secure copy of the results?
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#086788] mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#086788]/40" />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#d6d2d2] rounded-xl focus:border-[#06aed5] focus:ring-4 focus:ring-[#06aed5]/20 outline-none text-[#086788] font-medium transition-all"
                placeholder="Enter your best email..."
              />
            </div>
          </div>
          
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer sr-only" />
              <div className="w-6 h-6 border-2 border-[#d6d2d2] rounded bg-white peer-checked:bg-[#06aed5] peer-checked:border-[#06aed5] transition-colors flex items-center justify-center group-hover:border-[#06aed5]">
                {agreed && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
            <span className="text-sm font-medium text-[#086788]/70 leading-snug pt-0.5">
              I agree to the Terms of Service & Privacy Policy, and consent to receive my results and related psychological insights via email.
            </span>
          </label>

          <button type="submit" disabled={!email || !agreed || isSubmitting} className="w-full min-h-[64px] bg-[#086788] text-white rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer">
            {isSubmitting ? "Saving..." : "Reveal My Profile"} <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="flex justify-center items-center gap-2 mt-4 text-[#086788]/50 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Secure 256-bit Encryption
          </div>
        </form>
      </div>
    );
  }

  if (showResult && resultData) {
    return <div ref={topRef} className="w-full animate-in fade-in duration-500"><ManipulationMasterReport profile={resultData} /></div>;
  }

  if (isFinished) {
    return (
      <div ref={topRef} className={`w-full max-w-5xl mx-auto bg-white border border-[#d6d2d2] rounded-2xl shadow-sm text-center py-20 px-6 animate-in fade-in zoom-in`}>
        <div className={`w-24 h-24 mx-auto bg-[#fff1d0] rounded-full flex items-center justify-center mb-6`}>
          <span className="text-4xl">🚩</span>
        </div>
        <h3 className={`text-3xl md:text-4xl font-black text-[#086788] mb-4`}>Assessment Complete</h3>
        <p className={`text-lg mb-10 max-w-xl mx-auto font-medium text-[#086788]/80`}>All behavioral data captured. We are ready to compile his psychological profile.</p>
        <button onClick={handleCompile} className={`w-full max-w-md mx-auto block bg-[#dd1c1a] text-white font-black py-4 px-8 min-h-[56px] rounded-xl transform hover:-translate-y-1 transition-all duration-300 shadow-md`}>
          Analyze His Behavior
        </button>
      </div>
    );
  }

  const q = manipulationQuestions[currentIndex];

  return (
    <div ref={topRef} className={`w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-[#d6d2d2] flex flex-col justify-center min-h-[400px] p-6 md:p-12`}>
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div><span className={`text-xs md:text-sm font-bold px-3 py-1.5 rounded bg-[#fff1d0] text-[#086788]`}>{q.category}</span></div>
          <div className={`text-sm md:text-base font-black tracking-wide text-[#086788]`}>QUESTION {currentIndex + 1} / {manipulationQuestions.length}</div>
        </div>
        <div className={`w-full h-2 rounded-full bg-[#d6d2d2] overflow-hidden`}><div className={`h-full rounded-full transition-all duration-500 ease-out bg-[#dd1c1a]`} style={{ width: `${progress}%` }} /></div>
      </div>

      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? 'opacity-0 -translate-y-4 scale-[0.99]' : 'opacity-100 translate-y-0 scale-100'}`}>
        <h3 className={`text-2xl md:text-4xl font-black text-[#086788] mb-10 leading-tight text-center max-w-3xl mx-auto`}>{q.text}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-3xl mx-auto">
          {q.options.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === option;
            const isDisabled = selectedAnswer !== null && !isSelected;
            return (
              <button key={idx} onClick={() => handleOptionClick(option)} disabled={isDisabled}
                className={`w-full min-h-[64px] flex-col justify-center py-4 px-6 rounded-xl border-[2px] font-black text-base md:text-lg transition-all duration-200 flex items-center ${
                  isSelected ? 'bg-[#086788] border-[#086788] text-white shadow-md' : isDisabled ? 'bg-white border-[#d6d2d2] opacity-40 cursor-not-allowed text-[#086788]' : 'bg-white border-[#d6d2d2] hover:border-[#06aed5] hover:bg-[#06aed5]/5 text-[#086788]'
                }`}>
                <span className="w-full text-center">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center border-t border-[#d6d2d2] pt-6">
        <button onClick={handleGodMode} type="button" className={`min-h-[48px] text-xs font-bold transition-all px-4 text-[#086788]/40 hover:text-[#086788] ml-auto`}>
          ⚡ Skip
        </button>
      </div>
    </div>
  );
}
