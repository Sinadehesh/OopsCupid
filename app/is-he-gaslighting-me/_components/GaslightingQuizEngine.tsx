"use client";
import React, { useState } from "react";
import { gaslightingQuestions } from "@/lib/psychometrics/gaslighting/questions";
import { calculateGaslightingScore } from "@/lib/psychometrics/gaslighting/scoring";
import GaslightingReport from "./GaslightingReport";
import { CloudFog, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

export default function GaslightingQuizEngine() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  // Email gate state
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (currentQ < gaslightingQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      setFinalAnswers(newAnswers);
      setAnswers(newAnswers);
      setShowEmailGate(true);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          quizType: "gaslighting",
          rawAnswers: finalAnswers,
        }),
      });
    } catch {
      // silently continue — never block the user
    } finally {
      setEmailSubmitting(false);
      setIsFinished(true);
    }
  };

  const handleSkip = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    const result = calculateGaslightingScore(finalAnswers);
    return <GaslightingReport result={result} />;
  }

  const progress = (currentQ / gaslightingQuestions.length) * 100;

  // ── EMAIL GATE ──
  if (showEmailGate) {
    return (
      <div className="max-w-lg mx-auto w-full pt-10 px-4">
        <div className="bg-[#0c1a2e] rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <CloudFog className="w-3.5 h-3.5" /> Your Reality Check Is Ready
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
              Where Should We<br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Send Your Report?
              </span>
            </h2>
            <p className="text-white/50 font-medium text-base mb-8 leading-relaxed">
              Enter your email to see your full results. We never spam — only insights that matter.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="your@email.com"
                className="w-full px-5 py-4 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30
                  font-bold text-lg focus:outline-none focus:border-indigo-400 focus:bg-white/12 transition-all"
              />
              {emailError && <p className="text-rose-400 text-sm font-bold">{emailError}</p>}
              <button
                type="submit"
                disabled={emailSubmitting}
                className="w-full py-5 rounded-xl font-black text-xl text-white
                  bg-gradient-to-r from-indigo-600 to-violet-600
                  hover:from-violet-600 hover:to-indigo-600
                  transition-all duration-300 shadow-lg shadow-indigo-500/20
                  flex items-center justify-center gap-3 disabled:opacity-60">
                {emailSubmitting
                  ? <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking…</>
                  : <>See My Results <ArrowRight className="w-5 h-5" />}</>
              }
              </button>
            </form>
            <button onClick={handleSkip}
              className="mt-4 text-white/25 hover:text-white/50 text-sm font-bold transition-colors">
              Skip for now →
            </button>
            <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-6">
              No spam · Unsubscribe anytime · Private & secure
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-full pt-10">
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-indigo-50 text-indigo-600 uppercase">
            <CloudFog className="w-4 h-4" /> Gaslighting Audit
          </div>
          <span className="text-slate-400 font-bold text-sm">{currentQ + 1} / {gaslightingQuestions.length}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full mb-10 overflow-hidden">
          <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
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
            { label: "Very Often", value: 4 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold
                hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-lg">
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
