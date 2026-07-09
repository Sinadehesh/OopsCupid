"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { infidelityQuestions } from "@/lib/psychometrics/infidelity/questions";
import { generateInfidelityProfile } from "@/lib/psychometrics/infidelity/scoring";
import InfidelityFreeResult from "./InfidelityFreeResult";
import { ShieldAlert, ArrowRight, Lock } from "lucide-react";

/**
 * Curated 20-item short form (4 per subscale) drawn from the full
 * 100-item bank. Interleaved by domain so consecutive questions feel
 * varied. The free quiz uses this; the full bank stays available for a
 * future "deep audit" premium tier.
 */
const SHORT_FORM_IDS = [
  "I_Dig_1", "I_Sch_4", "I_Emo_4", "I_Def_3", "I_Phy_3",
  "I_Dig_2", "I_Sch_6", "I_Emo_5", "I_Def_1", "I_Phy_4",
  "I_Dig_5", "I_Sch_10", "I_Emo_3", "I_Def_4", "I_Phy_2",
  "I_Dig_8", "I_Sch_13", "I_Emo_6", "I_Def_5", "I_Phy_5",
];

const quizQuestions = SHORT_FORM_IDS.map(
  (id) => infidelityQuestions.find((q) => q.id === id)!
).filter(Boolean);

/** "3 - Sometimes" → { val: 3, label: "Sometimes" } */
function parseOption(option: string) {
  const m = option.match(/^(\d+)\s*-\s*(.*)$/);
  return m ? { val: parseInt(m[1], 10), label: m[2] } : { val: 0, label: option };
}

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

  // DETERMINISTIC SCORING: real per-subscale psychometrics — identical
  // answers always produce identical results.
  const processScoring = (rawAnswers: Record<string, number>) => {
    setIsProcessing(true);

    setTimeout(() => {
      const profile = generateInfidelityProfile(rawAnswers);
      const n = profile.normalizedScores;
      const score = profile.suspicionIndex;

      setResult({
        score,
        riskLevel: score >= 70 ? "SEVERE" : score >= 45 ? "ELEVATED" : "MODERATE",
        archetype: profile.archetype,
        flaggedCount: profile.flaggedCount,
        answeredCount: profile.answeredCount,
        vectors: {
          digital: n.Digital,
          chronological: n.Schedule,
          intimacy: n.Emotion,
          micro: Math.round((n.Defensive + n.Physical) / 2),
        },
      });

      setIsProcessing(false);
      setStep("email");
    }, 1500);
  };

  const handleAnswer = (score: number) => {
    const nextAnswers = { ...answers, [quizQuestions[currentQ].id]: score };
    setAnswers(nextAnswers);

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      processScoring(nextAnswers);
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
      <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full mb-8 shadow-sm"><ShieldAlert className="w-10 h-10" /></div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Is He Cheating On You?</h1>
      <p className="text-lg md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed">Take this brutally honest diagnostic. We will analyze his digital footprint, schedule shifts, and defensive behaviors to determine if he is hiding something.</p>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">{quizQuestions.length} questions · 3 minutes · Instant result</p>
      <button onClick={handleStart} className="bg-rose-600 text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-rose-700 hover:-translate-y-1 transition-all">Start Diagnostic <ArrowRight className="inline ml-2" /></button>
    </div>
  );

  const question = quizQuestions[currentQ];
  const progress = (currentQ / quizQuestions.length) * 100;
  const options = question.options.map(parseOption);

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 relative">
      <div className="mb-10 mt-6">
        <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider"><span>Question {currentQ + 1} of {quizQuestions.length}</span><span>{Math.round(progress)}%</span></div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full"><div className="bg-slate-900 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
      </div>
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100 text-center mb-10 min-h-[200px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">"{question?.text}"</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
        {options.map((opt) => (
          <button key={opt.val} onClick={() => handleAnswer(opt.val)} className="group flex flex-col items-center justify-center w-[30%] aspect-square bg-white border-2 border-slate-100 rounded-[24px] hover:border-slate-900 hover:bg-slate-50 hover:-translate-y-1 transition-all">
            <span className="text-3xl md:text-4xl font-extrabold text-slate-300 group-hover:text-slate-900 mb-1">{opt.val}</span>
            <span className="text-[11px] md:text-sm font-extrabold text-slate-600 uppercase leading-tight px-1">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
