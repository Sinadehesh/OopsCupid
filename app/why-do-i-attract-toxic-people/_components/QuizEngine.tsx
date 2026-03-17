"use client";
import React, { useState } from "react";
import { BAD_GUYS_QUESTIONS } from "../_data/questions";
import { calculateBadGuysScore } from "../_lib/scoring";
import FreeResult from "./FreeResult";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function QuizEngine() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleStart = () => setStarted(true);

  const handleAnswer = (score: number) => {
    // Save the answer
    const nextAnswers = { ...answers, [BAD_GUYS_QUESTIONS[currentQ].id]: score };
    setAnswers(nextAnswers);

    // Progress logic using robust prev state to avoid race conditions
    if (currentQ < BAD_GUYS_QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      // End of quiz
      setIsProcessing(true);
      setTimeout(() => {
        setResult(calculateBadGuysScore(nextAnswers));
        setIsProcessing(false);
      }, 1500);
    }
  };

  if (result) return <FreeResult data={result} />;

  if (isProcessing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500 bg-[#fafafa]">
        <div className="w-20 h-20 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Scanning Your Subconscious...</h2>
        <p className="text-slate-500 font-medium text-lg">Cross-referencing your answers with clinical dating patterns.</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center animate-in fade-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 text-rose-600 rounded-full mb-8 shadow-sm">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Why Do I Attract Toxic People?</h1>
        <p className="text-lg md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed">
          Take this brutally honest 50-question audit. Uncover the exact subconscious signals you are sending that attract players, narcissists, and emotionally unavailable men.
        </p>
        <button onClick={handleStart} className="bg-rose-600 text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:bg-rose-700 hover:-translate-y-1 transition-all">
          Start Diagnostic Audit <ArrowRight className="inline ml-2" />
        </button>
      </div>
    );
  }

  const question = BAD_GUYS_QUESTIONS[currentQ];
  const progress = ((currentQ) / BAD_GUYS_QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-10">
        <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
          <span>Question {currentQ + 1} of {BAD_GUYS_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div className="bg-rose-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100 text-center mb-8 min-h-[200px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">"{question.text}"</h2>
      </div>

      <div className="space-y-3">
        {[
          { label: "1 - Never true", val: 1 },
          { label: "2 - Rarely true", val: 2 },
          { label: "3 - Sometimes true", val: 3 },
          { label: "4 - Often true", val: 4 },
          { label: "5 - Very true", val: 5 },
        ].map((opt) => (
          <button
            key={opt.val}
            onClick={() => handleAnswer(opt.val)}
            className="w-full text-left bg-white border-2 border-slate-100 p-5 rounded-2xl font-bold text-lg text-slate-700 hover:border-rose-500 hover:bg-rose-50 transition-all focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
