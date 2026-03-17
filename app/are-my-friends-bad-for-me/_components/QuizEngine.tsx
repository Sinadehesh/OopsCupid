"use client";
import React, { useState } from "react";
import { TOXIC_FRIENDS_QUESTIONS } from "../_data/questions";
import { calculateFriendScore } from "../_lib/scoring";
import FreeResult from "./FreeResult";
import { Users, ArrowRight } from "lucide-react";

export default function QuizEngine() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleStart = () => setStarted(true);

  const handleAnswer = (score: number) => {
    const nextAnswers = { ...answers, [TOXIC_FRIENDS_QUESTIONS[currentQ].id]: score };
    setAnswers(nextAnswers);

    if (currentQ < TOXIC_FRIENDS_QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setResult(calculateFriendScore(nextAnswers));
        setIsProcessing(false);
      }, 1500);
    }
  };

  if (result) return <FreeResult data={result} />;

  if (isProcessing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500 bg-[#fafafa]">
        <div className="w-20 h-20 border-4 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Scanning Friend Dynamics...</h2>
        <p className="text-slate-500 font-medium text-lg">Analyzing 10 distinct vectors of relational damage.</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center animate-in fade-in duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#10b981]/10 text-[#10b981] rounded-full mb-8 shadow-sm">
          <Users className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">Are My Friends Bad For Me?</h1>
        <p className="text-lg md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed">
          Take this brutally honest 55-question diagnostic. Find out if you are the friend, the backup plan, or the emotional ATM.
        </p>
        <button onClick={handleStart} className="bg-[#10b981] text-white font-extrabold text-xl py-5 px-12 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:bg-[#059669] hover:-translate-y-1 transition-all">
          Start Diagnostic Audit <ArrowRight className="inline ml-2" />
        </button>
      </div>
    );
  }

  const question = TOXIC_FRIENDS_QUESTIONS[currentQ];
  const progress = ((currentQ) / TOXIC_FRIENDS_QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-10">
        <div className="flex justify-between text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
          <span>Question {currentQ + 1} of {TOXIC_FRIENDS_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div className="bg-[#10b981] h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100 text-center mb-10 min-h-[220px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">"{question.text}"</h2>
      </div>

      {/* KEYPAD LAYOUT */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-md mx-auto">
        {[
          { text: "Never", val: 1 },
          { text: "Rarely", val: 2 },
          { text: "Sometimes", val: 3 },
          { text: "Often", val: 4 },
          { text: "Always", val: 5 },
        ].map((opt) => (
          <button
            key={opt.val}
            onClick={() => handleAnswer(opt.val)}
            className="group flex flex-col items-center justify-center w-[30%] aspect-square bg-white border-2 border-slate-100 rounded-[24px] shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:border-[#10b981] hover:bg-[#10b981]/5 hover:-translate-y-1 hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-[#10b981]/20 active:scale-95"
          >
            <span className="text-3xl md:text-4xl font-extrabold text-slate-300 group-hover:text-[#10b981] transition-colors mb-1">
              {opt.val}
            </span>
            <span className="text-[11px] md:text-sm font-extrabold text-slate-600 uppercase tracking-wider text-center">
              {opt.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
