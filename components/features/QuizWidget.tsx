"use client";

import React, { useState, useMemo, useRef } from "react";
import SharePrintButtons from "@/components/ui/SharePrintButtons";
import { generatePsychologicalProfile, computeLegacyResult } from "@/lib/psychometrics/classification";
import AttachmentReport from "@/components/report/AttachmentReport";

import { attachmentQuestions } from "@/lib/psychometrics/attachment/questions";
import { attractionQuestions } from "@/lib/psychometrics/attraction/questions";
import { attractorQuestions } from "@/lib/psychometrics/attractor/questions";
import { partnerAttachmentQuestions } from "@/lib/psychometrics/partner-attachment/questions";
import { infidelityQuestions } from "@/lib/psychometrics/infidelity/questions";
import { friendRoleQuestions } from "@/lib/psychometrics/friend-role/questions";
import { friendUsedQuestions } from "@/lib/psychometrics/friend-used/questions";

import AttractionFreeResult from "@/app/attraction-patterns/_components/AttractionFreeResult";
import AttractionMasterReport from "@/components/report/AttractionMasterReport";
import AttractorMasterReport from "@/components/report/AttractorMasterReport";
import PartnerAttachmentReport from "@/components/report/PartnerAttachmentReport";
import InfidelityMasterReport from "@/components/report/InfidelityMasterReport";
import FriendRoleMasterReport from "@/components/report/FriendRoleMasterReport";
import FriendUsedMasterReport from "@/components/report/FriendUsedMasterReport";

import { generateAttractionProfile } from "@/lib/psychometrics/attraction/scoring";
import { generateAttractorProfile } from "@/lib/psychometrics/attractor/scoring";
import { generatePartnerAttachmentProfile } from "@/lib/psychometrics/partner-attachment/scoring";
import { generateInfidelityProfile } from "@/lib/psychometrics/infidelity/scoring";
import { generateFriendRoleProfile } from "@/lib/psychometrics/friend-role/scoring";
import { generateFriendUsedProfile } from "@/lib/psychometrics/friend-used/scoring";

import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers, setAnswers]               = useState<Record<string, string>>({});
  
  const [isScoring, setIsScoring]           = useState(false);
  const [showEmailGate, setShowEmailGate]   = useState(false);
  const [showResult, setShowResult]         = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [resultData, setResultData]         = useState<any>(null);
  
  const [email, setEmail]                   = useState("");
  const [agreed, setAgreed]                 = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating]       = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  const topRef = useRef<HTMLDivElement>(null);
  const isAttachment = quizName === "attachment-style";
  
  const activeQuestions = useMemo(() => {
    if (isAttachment) return attachmentQuestions; 
    if (quizName === "attraction-patterns") return attractionQuestions;
    if (quizName === "who-is-attracted-to-me") return attractorQuestions;
    if (quizName === "partners-attachment-style") return partnerAttachmentQuestions;
    if (quizName === "is-he-cheating") return infidelityQuestions;
    if (quizName === "friend-group-role") return friendRoleQuestions;
    if (quizName === "are-your-friends-using-you") return friendUsedQuestions;
    return [{ id: "1", text: "Default Question", options: ["A", "B", "C", "D"], category: "General" }];
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
      if (!fakeAnswers[q.id]) fakeAnswers[q.id] = q.options[Math.floor(Math.random() * q.options.length)];
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
      setTimeout(() => {setCurrentIndex(prev => prev - 1); setSelectedAnswer(null); setIsAnimating(false);}, 250);
    }
  };

  const handleCompile = () => {
    setIsScoring(true);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      setIsScoring(false);
      setShowEmailGate(true);
    }, 2000);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setIsSubmitting(true);

    let tempResultData: any = null;

    try {
      if (isAttachment) {
        const hasChildren = answers["demo_2"] === "Yes";
        const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
        const gender = answers["demo_3"] ?? "Non-binary";
        const profile = generatePsychologicalProfile(answers, hasChildren);
        tempResultData = { profile, demographics: { isSingle, gender, hasChildren }, rawAnswers: answers, type: "attachment", email };
      } else if (quizName === "attraction-patterns") {
        tempResultData = { profile: generateAttractionProfile(answers), type: "attraction" };
      } else if (quizName === "who-is-attracted-to-me") {
        tempResultData = { profile: generateAttractorProfile(answers), type: "attractor" };
      } else if (quizName === "partners-attachment-style") {
        tempResultData = { profile: generatePartnerAttachmentProfile(answers), type: "partner" };
      } else if (quizName === "is-he-cheating") {
        tempResultData = { profile: generateInfidelityProfile(answers), type: "infidelity" };
      } else if (quizName === "friend-group-role") {
        tempResultData = { profile: generateFriendRoleProfile(answers), type: "friendrole" };
      } else if (quizName === "are-your-friends-using-you") {
        tempResultData = { profile: generateFriendUsedProfile(answers), type: "friendused" };
      } else {
        tempResultData = { ...computeLegacyResult(answers, quizName), type: "legacy" };
      }
      setResultData(tempResultData);
    } catch (err) {
      console.error(err);
      setResultData({ type: "error" });
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          quizType: quizName, 
          rawAnswers: answers,
          profile: tempResultData?.profile || null 
        })
      });
    } catch(err) {
      console.error("Failed to save to database:", err);
    }

    setShowEmailGate(false);
    setShowResult(true);
    setIsSubmitting(false);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isScoring) {
    return (
      <div ref={topRef} className={`w-full max-w-5xl mx-auto text-center py-32 bg-white rounded-2xl shadow-sm border border-[#d6d2d2] animate-in fade-in`}>
        <div className="flex flex-col items-center justify-center">
          <div className={`w-16 h-16 border-4 border-[#d6d2d2] border-t-[#06aed5] rounded-full animate-spin mb-6`}></div>
          <h3 className={`text-2xl font-black text-[#086788] mb-2 animate-pulse`}>Compiling Profile...</h3>
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
          <p className="text-lg font-medium text-[#086788]/80">We have securely mapped your psychological profile. Where should we send your results?</p>
        </div>

        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#086788] mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#086788]/40" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#d6d2d2] rounded-xl focus:border-[#06aed5] focus:ring-4 focus:ring-[#06aed5]/20 outline-none text-[#086788] font-medium transition-all" placeholder="Enter your best email..." />
            </div>
          </div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer sr-only" />
              <div className="w-6 h-6 border-2 border-[#d6d2d2] rounded bg-white peer-checked:bg-[#06aed5] peer-checked:border-[#06aed5] transition-colors flex items-center justify-center group-hover:border-[#06aed5]">
                {agreed && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
            <span className="text-sm font-medium text-[#086788]/70 leading-snug pt-0.5">I agree to the Terms of Service & Privacy Policy, and consent to receive my results via email.</span>
          </label>
          <button type="submit" disabled={!email || !agreed || isSubmitting} className="w-full min-h-[64px] bg-[#086788] hover:bg-[#06aed5] text-white rounded-xl font-black text-xl transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer">
            {isSubmitting ? "Saving..." : "Reveal My Profile"} <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    );
  }

  if (showResult && resultData) {
    if (resultData.type === "error") return <div className="text-center py-20 font-black text-[#dd1c1a]">Analysis Failed. Please refresh.</div>;
    
    // FIX: email={resultData.email} is now explicitly passed down!
    if (resultData.type === "attachment") return <div ref={topRef} className="w-full animate-in fade-in duration-500"><AttachmentReport profile={resultData.profile} demographics={resultData.demographics} rawAnswers={resultData.rawAnswers} email={resultData.email} /></div>;
    
    if (resultData.type === "attraction") {
      if (!isPremiumUnlocked) {
        return (
          <div ref={topRef} className="w-full animate-in fade-in">
            <AttractionFreeResult 
              profile={resultData.profile} 
              onUnlock={() => setIsPremiumUnlocked(true)} 
              isGenerating={isScoring} 
            />
          </div>
        );
      }
      return (
        <div ref={topRef} className="w-full animate-in fade-in">
        <AttractionMasterReport profile={resultData.profile} />
        </div>
      );
    }
    if (resultData.type === "attractor") return <div ref={topRef} className="w-full animate-in fade-in"><AttractorMasterReport profile={resultData.profile} /></div>;
    if (resultData.type === "partner") return <div ref={topRef} className="w-full animate-in fade-in"><PartnerAttachmentReport profile={resultData.profile} /></div>;
    if (resultData.type === "infidelity") return <div ref={topRef} className="w-full animate-in fade-in"><InfidelityMasterReport profile={resultData.profile} /></div>;
    if (resultData.type === "friendrole") return <div ref={topRef} className="w-full animate-in fade-in"><FriendRoleMasterReport profile={resultData.profile} /></div>;
    if (resultData.type === "friendused") return <div ref={topRef} className="w-full animate-in fade-in"><FriendUsedMasterReport profile={resultData.profile} /></div>;
    return <div ref={topRef} className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#d6d2d2] p-8 md:p-12 text-center"><h3 className="text-3xl font-black text-[#086788] mb-8">{resultData.title || "Result"}</h3><SharePrintButtons /></div>;
  }

  if (isFinished) {
    return (
      <div ref={topRef} className={`w-full max-w-5xl mx-auto bg-white border border-[#d6d2d2] rounded-2xl shadow-sm text-center py-20 px-6 animate-in fade-in zoom-in`}>
        <div className={`w-24 h-24 mx-auto bg-[#fff1d0] rounded-full flex items-center justify-center mb-6`}><span className="text-4xl">🧠</span></div>
        <h3 className={`text-3xl md:text-4xl font-black text-[#086788] mb-4`}>Assessment Complete</h3>
        <p className={`text-lg mb-10 max-w-xl mx-auto font-medium text-[#086788]/80`}>All behavioral data captured. We are ready to compile your specific psychological profile.</p>
        <button onClick={handleCompile} className={`w-full max-w-md mx-auto block bg-[#f0c808] text-[#086788] font-black py-4 px-8 min-h-[56px] rounded-xl transform hover:-translate-y-1 transition-all duration-300 shadow-md`}>
          Compile My Results
        </button>
      </div>
    );
  }

  const q = activeQuestions[currentIndex] as any;
  const sectionName = (q.section || q.moduleKey || q.category) ?? "Assessment";
  const useKeypad = isAttachment && !String(q.id).startsWith("demo");

  return (
    <div ref={topRef} className={`w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-[#d6d2d2] flex flex-col justify-center min-h-[400px] p-6 md:p-12`}>
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <div><span className={`text-xs md:text-sm font-bold px-3 py-1.5 rounded bg-[#fff1d0] text-[#086788]`}>{sectionName}</span></div>
          <div className={`text-sm md:text-base font-black tracking-wide text-[#086788]`}>QUESTION {currentIndex + 1} / {activeQuestions.length}</div>
        </div>
        <div className={`w-full h-2 rounded-full bg-[#d6d2d2] overflow-hidden`}><div className={`h-full rounded-full transition-all duration-500 ease-out bg-[#06aed5]`} style={{ width: `${progress}%` }} /></div>
      </div>
      <div className={`transition-all duration-250 ease-in-out transform ${isAnimating ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        <h3 className={`text-2xl md:text-4xl font-black text-[#086788] mb-10 leading-tight text-center max-w-3xl mx-auto`}>{q.text}</h3>
        {useKeypad ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4 w-full">
            {q.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isDisabled = selectedAnswer !== null && !isSelected;
              return (
                <button key={idx} onClick={() => handleOptionClick(option)} disabled={isDisabled} className={`group flex flex-col items-center justify-center w-full min-h-[100px] rounded-xl border-2 transition-all focus:outline-none ${isSelected ? 'bg-[#086788] border-[#086788] shadow-md text-white' : isDisabled ? 'bg-white border-[#d6d2d2] opacity-40 cursor-not-allowed text-[#086788]' : 'bg-white border-[#d6d2d2] hover:border-[#06aed5] hover:bg-[#06aed5]/5 cursor-pointer text-[#086788]'}`}>
                  <span className={`text-3xl md:text-4xl font-black mb-1 ${isSelected ? 'text-white' : 'text-[#06aed5]'}`}>{idx + 1}</span>
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider text-center px-2 leading-tight ${isSelected ? 'text-white' : 'text-[#086788] group-hover:text-[#086788]'}`}>{option}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-3xl mx-auto">
            {q.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswer === option;
              const isDisabled = selectedAnswer !== null && !isSelected;
              return (
                <button key={idx} onClick={() => handleOptionClick(option)} disabled={isDisabled} className={`w-full min-h-[64px] flex-col justify-center py-4 px-6 rounded-xl border-[2px] font-black text-base md:text-lg transition-all duration-200 flex items-center ${isSelected ? 'bg-[#086788] border-[#086788] text-white shadow-md' : isDisabled ? 'bg-white border-[#d6d2d2] opacity-40 cursor-not-allowed text-[#086788]' : 'bg-white border-[#d6d2d2] hover:border-[#06aed5] hover:bg-[#06aed5]/5 text-[#086788]'}`}>
                  <span className="w-full text-center">{option}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-between items-center border-t border-[#d6d2d2] pt-6">
        <button onClick={handleBack} disabled={currentIndex === 0 || isAnimating || selectedAnswer !== null} className={`min-h-[48px] text-sm font-black flex items-center gap-2 px-6 rounded-xl transition-all bg-white text-[#086788] border border-[#d6d2d2] hover:bg-[#fff1d0]/50 ${currentIndex === 0 || isAnimating || selectedAnswer !== null ? 'opacity-0 pointer-events-none' : ''}`}><span>←</span> Back</button>
        <button onClick={handleGodMode} type="button" className={`min-h-[48px] text-xs font-bold transition-all px-4 text-[#086788]/40 hover:text-[#086788]`}>⚡ Skip</button>
      </div>
    </div>
  );
}
