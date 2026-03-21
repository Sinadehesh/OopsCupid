"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { INFIDELITY_QUESTIONS } from "@/lib/psychometrics/infidelity/questions";
import { calculateInfidelityScore } from "@/lib/psychometrics/infidelity/scoring";
import InfidelityFreeResult from "./InfidelityFreeResult";
import { ShieldAlert, ArrowRight, Zap, Lock } from "lucide-react";

export default function InfidelityQuizEngine() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [step, setStep] = useState<"quiz" | "email" | "result">("quiz");
  const [email, setEmail] = useState("");

  const handleStart = () => setStarted(true);

  const handleGodMode = () => {
    const fakeAnswers: Record<string, number> = {};
    INFIDELITY_QUESTIONS.forEach(q => { fakeAnswers[q.id] = Math.floor(Math.random() * 5) + 1; });
    setAnswers(fakeAnswers);
    setStarted(true); setIsProcessing(true);
    setTimeout(() => {
      setResult(calculateInfidelityScore(fakeAnswers));
      setIsProcessing(false); setStep("email");
    }, 1500);
  };

  const handleAnswer = (score: number) => {
    const nextAnswers = { ...answers, [INFIDELITY_QUESTIONS[currentQ].id]: score };
    setAnswers(nextAnswers);
    if (currentQ < INFIDELITY_QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setResult(calculateInfidelityScore(nextAnswers));
        setIsProcessing(false); setStep("email");
      }, 1500);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, quizType: "infidelity", rawAnswers: answers, profile: result })
      });
    } catch (err) {}
    setStep("result");
  };

  const handleUnlock = async () => {
    setIsGenerating(true);
    if (typeof window !== 'undefined') localStorage.setItem('infidelity_result', JSON.stringify({ ...result, email, quizType: "infidelity" }));
    if (email) {
      try {
        await fetch('/api/leads/unlock', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          // Passes the exact quiz type to keep the database organized
          body: JSON.stringify({ email, quizType: "infidelity" }) 
        });
      } catch (err) {}
    }
    router.push(`/is-he-cheating/premium`);
  };

  if (isProcessing) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#fafafa]">
      <div className="w-20 h-20 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-8"></div>
      <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Analyzing Behavioral Anomalies...</h2>
      <p className="text-slate-500 font-medium text-lg">Cross-referencing his actions with clinical deception markers.</p>
    </div>
  );

  if (step === "email") return (
    <div className="max-w-xl mx-auto py-20 px-6 text-center animate-in zoom-in duration-500">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 text-white rounded-full mb-8 shadow-xl">
        <Lock className="w-10 h-10" />
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Analysis Complete.</h2>
      <p className="text-lg text-slate-600 mb-10 font-medium">We have detected specific behavioral anomalies that correlate with deception. Enter your email to reveal his threat profile.</p>
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <input type="email" required placeholder="Enter your best email..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-5 rounded-2xl border-2 border-slate-200 text-lg focus:border-slate-900 outline-none text-center font-medium" />
        <button type="submit" className="w-full bg-rose-600 text-white font-extrabold text-xl py-5 rounded-2xl shadow-lg hover:bg-rose-700 transition-all flex items-center justify-center gap-3">
          Reveal My Report <ArrowRight className="w-6 h-6" />
        </button>
      </form>
    </div>
  );

  if (step === "result" && result) return <InfidelityFreeResult data={result} onUnlock={handleUnlock} isGenerating={isGenerating} />;

  if (!started) return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-center relative">
      <button onClick={handleGodMode} className="absolute top-0 right-6 flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors shadow-sm"><Zap className="w-4 h-4" /> GOD MODE</button>
      <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full mb-8 shadow-sm"><ShieldAlert className="w-10 h-10" /></div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Is He Cheating On You?</h1>
      <p className="text-lg md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed">Take this brutally honest diagnostic. We will analyze his digital footprint, schedule shifts, and defensive behaviors to determine if he is hiding something.</p>
      <button onClick={handleStart} className="bg-rose-600 text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-rose-700 hover:-translate-y-1 transition-all">Start Diagnostic <ArrowRight className="inline ml-2" /></button>
    </div>
  );

  const question = INFIDELITY_QUESTIONS[currentQ];
  const progress = (currentQ / INFIDELITY_QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 relative">
      <button onClick={handleGodMode} className="absolute -top-6 right-6 flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600"><Zap className="w-3 h-3" /> Auto</button>
      <div className="mb-10 mt-6">
        <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider"><span>Question {currentQ + 1} of {INFIDELITY_QUESTIONS.length}</span><span>{Math.round(progress)}%</span></div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full"><div className="bg-slate-900 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
      </div>
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100 text-center mb-10 min-h-[200px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">"{question.text}"</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
        {[ { text: "Never", val: 1 }, { text: "Rarely", val: 2 }, { text: "Sometimes", val: 3 }, { text: "Often", val: 4 }, { text: "Always", val: 5 } ].map(opt => (
          <button key={opt.val} onClick={() => handleAnswer(opt.val)} className="group flex flex-col items-center justify-center w-[30%] aspect-square bg-white border-2 border-slate-100 rounded-[24px] hover:border-slate-900 hover:bg-slate-50 hover:-translate-y-1 transition-all">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-300 group-hover:text-slate-900 mb-1">{opt.val}</span>
            <span className="text-[11px] md:text-sm font-extrabold text-slate-600 uppercase">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
