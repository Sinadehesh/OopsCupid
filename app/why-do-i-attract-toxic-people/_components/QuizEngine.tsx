"use client";
import { GameQuestion, GameLoading, GameStart } from "@/components/quiz/GameQuiz";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BAD_GUYS_QUESTIONS } from "../_data/questions";
import { calculateBadGuysScore } from "../_lib/scoring";
import FreeResult from "./FreeResult";
import EmailResultOffer from "@/components/features/EmailResultOffer";
import { ShieldAlert, ArrowRight, Zap, Lock } from "lucide-react";

export default function QuizEngine() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Email Gate States
  const [step, setStep] = useState<"quiz" | "email" | "result">("quiz");
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);

  const handleStart = () => setStarted(true);

  const handleGodMode = () => {
    const fakeAnswers: Record<number, number> = {};
    BAD_GUYS_QUESTIONS.forEach(q => {
      fakeAnswers[q.id] = Math.floor(Math.random() * 5) + 1; 
    });
    setAnswers(fakeAnswers);
    setStarted(true);
    setIsProcessing(true);
    setTimeout(() => {
      setResult(calculateBadGuysScore(fakeAnswers));
      setIsProcessing(false);
      setStep("result"); // No email wall: see ManipulationQuizEngine for why.
    }, 1500);
  };

  const handleAnswer = (score: number) => {
    const nextAnswers = { ...answers, [BAD_GUYS_QUESTIONS[currentQ].id]: score };
    setAnswers(nextAnswers);

    if (currentQ < BAD_GUYS_QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setResult(calculateBadGuysScore(nextAnswers));
        setIsProcessing(false);
        setStep("result"); // No email wall: see ManipulationQuizEngine for why.
      }, 1500);
    }
  };

  const handleOptionalEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setIsSubmittingEmail(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quizType: "toxic-attraction", rawAnswers: answers, profile: result })
      });
      setEmailSaved(true);
    } catch (error) {
      console.error("Failed to save lead", error);
    }
    setIsSubmittingEmail(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmittingEmail(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          quizType: "toxic-attraction",
          rawAnswers: answers,
          profile: result
        })
      });
    } catch (error) {
      console.error("Failed to save lead", error);
    }
    
    setIsSubmittingEmail(false);
    setStep("result");
  };

  const handleUnlock = async () => {
    setIsGenerating(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('toxic_attraction_result', JSON.stringify(result));
    }
    
    if (email) {
      try {
        await fetch('/api/leads/unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
      } catch (err) {}
    }

    const style = result?.top1 || "The Hyper-Empathetic Rescuer";
  };

  if (isProcessing) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameLoading emoji="🧲" /></div>;

  // THE NEW EMAIL GATE PAGE
  if (step === "email") {
    return (
      <div className="max-w-xl mx-auto py-20 px-6 text-center animate-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full mb-8 shadow-sm">
          <Lock className="w-10 h-10" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Your Profile is Ready.</h2>
        <p className="text-lg text-slate-600 mb-10 font-medium">
          Your result is ready.
        </p>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <input 
            type="email" 
            required 
            placeholder="Enter your best email..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-6 py-5 rounded-2xl border-2 border-slate-200 text-lg focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-center font-medium text-slate-800"
          />
          <button 
            type="submit" 
            disabled={isSubmittingEmail}
            className="w-full bg-rose-600 text-white font-extrabold text-xl py-5 rounded-2xl shadow-lg hover:bg-rose-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isSubmittingEmail ? "Unlocking..." : "Reveal My Profile Now"} <ArrowRight className="w-6 h-6" />
          </button>
        </form>
        <p className="text-xs text-slate-400 font-bold mt-6">Your data is 100% secure and private.</p>
      </div>
    );
  }

  if (step === "result" && result) {
    return (
      <>
        <FreeResult data={result} onUnlock={handleUnlock} isGenerating={isGenerating} />
        <EmailResultOffer
          className="px-6 pb-16"
          onSubmit={handleOptionalEmail}
          email={email}
          setEmail={setEmail}
          agreed={agreed}
          setAgreed={setAgreed}
          saving={isSubmittingEmail}
          saved={emailSaved}
        />
      </>
    );
  }

  if (!started) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameStart emoji="🧲" title="Why do I attract toxic people?" blurb="Rate how true each one is for you. Short levels, then your pattern, explained." total={BAD_GUYS_QUESTIONS.length} onStart={handleStart} /></div>;

  const question = BAD_GUYS_QUESTIONS[currentQ];

  return (
    <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden">
      <GameQuestion
        name="Why you attract toxic people"
        emoji="🧲"
        index={currentQ}
        total={BAD_GUYS_QUESTIONS.length}
        text={question.text}
        quote={true}
        options={[{ label: "Never", value: 1 }, { label: "Rarely", value: 2 }, { label: "Sometimes", value: 3 }, { label: "Often", value: 4 }, { label: "Always", value: 5 }]}
        onAnswer={(v) => handleAnswer(Number(v))}
        onBack={() => setCurrentQ((c) => Math.max(c - 1, 0))}
      />
    </div>
  );
}
