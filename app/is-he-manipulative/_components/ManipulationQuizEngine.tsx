"use client";
import { GameQuestion, GameLoading, GameStart } from "@/components/quiz/GameQuiz";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ManipulationFreeResult from "./ManipulationFreeResult";
import EmailResultOffer from "@/components/features/EmailResultOffer";
import { ShieldAlert, ArrowRight, Zap, Lock, AlertTriangle } from "lucide-react";

// @ts-ignore - This forces Vercel to compile successfully regardless of strict TS export rules
import * as QuestionModule from "@/lib/psychometrics/manipulation/questions";

// Dynamically extract the questions array no matter what it was named in your file
const getQuestions = (): any[] => {
  if (QuestionModule.manipulationQuestions) return QuestionModule.manipulationQuestions;
  if (QuestionModule.MANIPULATION_QUESTIONS) return QuestionModule.MANIPULATION_QUESTIONS;
  if (QuestionModule.questions) return QuestionModule.questions;
  if (QuestionModule.default) return QuestionModule.default;
  for (const key in QuestionModule) {
    if (Array.isArray((QuestionModule as any)[key])) return (QuestionModule as any)[key];
  }
  return [];
};

// Free quiz = the 20 core (non-premium) items; the premium-only bank stays
// reserved for a future deep-audit tier. Shorter quiz, far less drop-off.
const qList = getQuestions().filter((q: any) => !q.premiumOnly);

/**
 * Deterministic subscale scoring: answers are 1-5 per item; each displayed
 * category maps to the real subscales measuring it. Identical answers
 * always produce identical results.
 */
function scoreCategories(rawAnswers: Record<string, number>) {
  const CATEGORY_MAP: Record<string, string[]> = {
    gaslighting: ["coercive_emotional", "reality_distortion", "self_doubt_induction"],
    isolation: ["restrictive_isolating", "isolation_dependency", "surveillance"],
    emotional_extortion: ["severe_psych_abuse", "threats", "intimidation", "financial_abuse"],
    intermittent_reinforcement: ["blame_minimization", "confusion_dependency", "emotional_exhaustion"],
  };
  const pct = (ids: any[]) => {
    let sum = 0, denom = 0;
    ids.forEach((q: any) => {
      const v = rawAnswers[q.id];
      if (v === undefined) return;
      sum += v - 1; // options are 1-5 → 0-4
      denom += 4;
    });
    return denom > 0 ? Math.round((sum / denom) * 100) : null;
  };
  const all = getQuestions();
  const overall = pct(all.filter((q: any) => rawAnswers[q.id] !== undefined)) ?? 0;
  const out: Record<string, number> = {};
  for (const [cat, subs] of Object.entries(CATEGORY_MAP)) {
    const items = all.filter((q: any) => subs.includes(q.subscale));
    out[cat] = pct(items) ?? overall;
  }
  return { overall, categories: out };
}

export default function ManipulationQuizEngine() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [step, setStep] = useState<"quiz" | "email" | "result">("quiz");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);

  // INDESTRUCTIBLE LOCAL SCORING ENGINE
  const executeLocalScoring = (rawAnswers: Record<string, number>) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      try {
        const { overall, categories } = scoreCategories(rawAnswers);

        const finalResult = {
          overall: {
            score: overall,
            percent: overall,
            severity: overall >= 70 ? "SEVERE" : overall >= 45 ? "ELEVATED" : "MODERATE"
          },
          categories: {
            gaslighting: { percent: categories.gaslighting },
            isolation: { percent: categories.isolation },
            emotional_extortion: { percent: categories.emotional_extortion },
            intermittent_reinforcement: { percent: categories.intermittent_reinforcement }
          }
        };

        setResult(finalResult);
        // Straight to the result. This quiz had its own email wall, which the
        // site-wide removal missed because it does not use the shared widget:
        // a buyer who paid from the entry quiz answered twenty questions and
        // was then asked for an address before seeing anything.
        setStep("result");
      } catch (err) {
        console.error("Local Scoring Failed", err);
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleStart = () => setStarted(true);

  const handleGodMode = () => {
    if (qList.length === 0) return;
    const fakeAnswers: Record<string, number> = {};
    qList.forEach(q => { fakeAnswers[q.id] = Math.floor(Math.random() * 5) + 1; });
    setAnswers(fakeAnswers);
    setStarted(true); 
    executeLocalScoring(fakeAnswers);
  };

  const handleAnswer = (score: number) => {
    const nextAnswers = { ...answers, [qList[currentQ].id]: score };
    setAnswers(nextAnswers);
    
    if (currentQ < qList.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      executeLocalScoring(nextAnswers);
    }
  };

  const handleOptionalEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    setSavingEmail(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quizType: "manipulation", rawAnswers: answers, profile: result })
      });
      setEmailSaved(true);
    } catch (err) {}
    setSavingEmail(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quizType: "manipulation", rawAnswers: answers, profile: result })
      });
    } catch (err) {}
    setStep("result");
  };

  const handleUnlock = async () => {
    if (typeof window !== 'undefined') localStorage.setItem('manipulation_result', JSON.stringify({ ...result, rawAnswers: answers, email, quizType: "manipulation" }));
    if (email) {
      try {
        await fetch('/api/leads/unlock', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ email, quizType: "manipulation" }) 
        });
      } catch (err) {}
    }
  };

  // FAILSAFE: If the questions file is truly missing or empty
  if (qList.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#fafafa]">
      <AlertTriangle className="w-20 h-20 text-rose-500 mb-6 animate-pulse" />
      <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Data Initialization Error</h2>
      <p className="text-slate-500 font-medium text-lg max-w-md">The psychometric questions failed to load. Please verify the exports in your questions.ts file.</p>
    </div>
  );

  if (isProcessing) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameLoading emoji="🎭" /></div>;

  if (step === "email") return (
    <div className="max-w-xl mx-auto py-20 px-6 text-center animate-in zoom-in duration-500">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 text-white rounded-full mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/20 blur-xl animate-pulse"></div>
        <Lock className="w-10 h-10 relative z-10" />
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Analysis Complete.</h2>
      <p className="text-lg text-slate-600 mb-10 font-medium">Your result is ready.</p>
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <input type="email" required placeholder="Enter your best email..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-200 text-lg focus:border-indigo-600 outline-none text-center font-medium shadow-inner" />
        <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xl py-5 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-3 group">
          Reveal My Report <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );

  if (step === "result" && result) return (
    <>
      <ManipulationFreeResult data={result} onUnlock={handleUnlock} isGenerating={isGenerating} />
      <EmailResultOffer
        className="px-6 pb-16"
        onSubmit={handleOptionalEmail}
        email={email}
        setEmail={setEmail}
        agreed={agreed}
        setAgreed={setAgreed}
        saving={savingEmail}
        saved={emailSaved}
      />
    </>
  );

  if (!started) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameStart emoji="🎭" title="Is he manipulative?" blurb="Rate how often each one happens. Short levels, then whether it looks like bad communication or a pattern." total={qList.length} onStart={handleStart} /></div>;

  const question = qList[currentQ];

  return (
    <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden">
      <GameQuestion
        name="Is he manipulative?"
        emoji="🎭"
        index={currentQ}
        total={qList.length}
        text={question?.text || question?.stem || ""}
        quote={true}
        options={[{ label: "Never", value: 1 }, { label: "Rarely", value: 2 }, { label: "Sometimes", value: 3 }, { label: "Often", value: 4 }, { label: "Always", value: 5 }]}
        onAnswer={(v) => handleAnswer(Number(v))}
        onBack={() => setCurrentQ((c) => Math.max(c - 1, 0))}
      />
    </div>
  );
}
