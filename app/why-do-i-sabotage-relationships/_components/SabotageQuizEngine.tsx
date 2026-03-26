"use client";
import React, { useState } from "react";
import { sabotageQuestions } from "@/lib/psychometrics/sabotage/questions";
import { calculateSabotageScore } from "@/lib/psychometrics/sabotage/scoring";
import SabotageReport from "./SabotageReport";
import { Bomb, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

type Stage = "quiz" | "email" | "result";

export default function SabotageQuizEngine() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<any>(null);

  // ── answer a question ────────────────────────────────────────────────────
  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (currentQ < sabotageQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      setAnswers(newAnswers);
      setStage("email");
    }
  };

  // ── submit email ─────────────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setIsSaving(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          quizType: "sabotage",
          rawAnswers: answers,
        }),
      });
    } catch (_) {
      // silently continue — don't block user if DB is temporarily down
    }

    const computed = calculateSabotageScore(answers);
    setResult(computed);
    setIsSaving(false);
    setStage("result");
  };

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (stage === "result" && result) {
    return <SabotageReport result={result} />;
  }

  // ── EMAIL GATE ───────────────────────────────────────────────────────────
  if (stage === "email") {
    return (
      <div className="max-w-lg mx-auto w-full pt-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-200 text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#086788]/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#086788]" />
          </div>

          {/* Headline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dd1c1a]/10 text-[#dd1c1a] text-xs font-black uppercase tracking-widest mb-4">
            <Bomb className="w-3.5 h-3.5" /> Analysis Complete
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#086788] mb-3 leading-tight">
            Your Results Are Ready
          </h2>
          <p className="text-[#086788]/70 font-medium text-lg mb-8 leading-relaxed">
            Enter your email to unlock your full Sabotage Blueprint. We&apos;ll also send you a copy so you can revisit it anytime.
          </p>

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#086788]/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="your@email.com"
                autoComplete="email"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#d6d2d2] text-[#086788] font-bold text-lg placeholder:text-[#086788]/30
                  focus:outline-none focus:border-[#086788] transition-colors bg-[#fff1d0]/40"
              />
            </div>
            {emailError && (
              <p className="text-[#dd1c1a] text-sm font-bold text-left">{emailError}</p>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-4 bg-[#086788] hover:bg-[#06aed5] disabled:opacity-60 text-white rounded-xl
                font-black text-xl flex items-center justify-center gap-3 transition-all shadow-md">
              {isSaving ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking…</>
              ) : (
                <>See My Results <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          {/* Trust line */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs font-bold text-[#086788]/35 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            No spam. Unsubscribe anytime.
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  const progress = (currentQ / sabotageQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full pt-10">
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-200">

        <div className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest bg-rose-50 text-rose-600 uppercase">
            <Bomb className="w-4 h-4" /> Sabotage Audit
          </div>
          <span className="text-slate-400 font-bold text-sm">{currentQ + 1} / {sabotageQuestions.length}</span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full mb-10 overflow-hidden">
          <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-10 leading-tight">
          {sabotageQuestions[currentQ].text}
        </h2>

        <div className="flex flex-col gap-3">
          {[
            { label: "Never",      value: 0 },
            { label: "Rarely",     value: 1 },
            { label: "Sometimes",  value: 2 },
            { label: "Often",      value: 3 },
            { label: "Very Often", value: 4 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold
                hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-all text-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
