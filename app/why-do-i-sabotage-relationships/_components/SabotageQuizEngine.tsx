"use client";
import React, { useState } from "react";
import { sabotageQuestions } from "@/lib/psychometrics/sabotage/questions";
import { calculateSabotageScore } from "@/lib/psychometrics/sabotage/scoring";
import SabotageReport from "./SabotageReport";
import { Bomb, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import EmailResultOffer from "@/components/features/EmailResultOffer";

type Stage = "quiz" | "result";

export default function SabotageQuizEngine() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [emailSaved, setEmailSaved] = useState(false);
  const [result, setResult] = useState<any>(null);

  // ── answer a question ────────────────────────────────────────────────────
  // The last answer goes straight to the result. This quiz still had the
  // mandatory email wall the others dropped: people search for a free test
  // with no sign-up, and the wall turned them away at the finish line.
  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ < sabotageQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      return;
    }
    const computed = calculateSabotageScore(newAnswers);
    // Persist so /premium can render the paid report after a Stripe
    // round-trip, the buyer leaves this page and comes back to a fresh
    // React tree with no state.
    try {
      localStorage.setItem("oc_sabotage_result", JSON.stringify(computed));
      localStorage.setItem("oc_sabotage_answers", JSON.stringify(newAnswers));
    } catch (_) {
      // private mode / quota, the report still renders in this session
    }
    setResult(computed);
    setStage("result");
  };

  // ── optional email, asked under the result ───────────────────────────────
  const handleOptionalEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !agreed) return;
    setIsSaving(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, quizType: "sabotage", rawAnswers: answers }),
      });
      setEmailSaved(true);
    } catch (_) {
      // the result is already on screen; nothing is lost
    }
    setIsSaving(false);
  };

  // ── RESULT ───────────────────────────────────────────────────────────────
  if (stage === "result" && result) {
    return (
      <>
        <SabotageReport result={result} />
        <EmailResultOffer
          className="px-6 pb-16"
          onSubmit={handleOptionalEmail}
          email={email}
          setEmail={setEmail}
          agreed={agreed}
          setAgreed={setAgreed}
          saving={isSaving}
          saved={emailSaved}
        />
      </>
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
