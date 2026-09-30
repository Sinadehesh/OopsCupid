"use client";
import { GameQuestion, GameLoading } from "@/components/quiz/GameQuiz";
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
  return (
    <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden">
      <GameQuestion
        name="Why you sabotage it"
        emoji="💣"
        index={currentQ}
        total={sabotageQuestions.length}
        text={sabotageQuestions[currentQ].text}
        options={[{ label: "Never", value: 0 }, { label: "Rarely", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Very often", value: 4 }]}
        onAnswer={(v) => handleAnswer(Number(v))}
      />
    </div>
  );
}
