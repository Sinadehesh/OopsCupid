"use client";
import React, { useState } from "react";
import { gaslightingQuestions } from "@/lib/psychometrics/gaslighting/questions";
import { calculateGaslightingScore } from "@/lib/psychometrics/gaslighting/scoring";
import GaslightingReport from "./GaslightingReport";
import { CloudFog } from "lucide-react";

export default function GaslightingQuizEngine() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (currentQ < gaslightingQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      setAnswers(newAnswers);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const result = calculateGaslightingScore(answers);
    return <GaslightingReport result={result} />;
  }

  const progress = (currentQ / gaslightingQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full pt-10">
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-200">
        
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-indigo-50 text-indigo-600 uppercase">
            <CloudFog className="w-4 h-4" /> Gaslighting Audit
          </div>
          <span className="text-slate-400 font-bold text-sm">{currentQ + 1} / 50</span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full mb-10 overflow-hidden">
          <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-10 leading-tight">
          {gaslightingQuestions[currentQ].text}
        </h2>

        <div className="flex flex-col gap-3">
          {[
            { label: "Never", value: 0 },
            { label: "Rarely", value: 1 },
            { label: "Sometimes", value: 2 },
            { label: "Often", value: 3 },
            { label: "Very Often", value: 4 }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
