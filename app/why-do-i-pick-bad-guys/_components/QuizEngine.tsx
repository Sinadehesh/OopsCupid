"use client";
import { GameQuestion, GameLoading, GameStart } from "@/components/quiz/GameQuiz";
import React, { useEffect, useState } from "react";
import { BAD_GUYS_QUESTIONS } from "../_data/questions";
import { calculateBadGuysScore } from "../_lib/scoring";
import FreeResult from "./FreeResult";
import { saveQuizResult, loadQuizResult, QUIZ_KEYS } from "@/lib/quizResults";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function QuizEngine() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Coming back from checkout (or just reloading) should land on the
  // result, not on the start screen.
  useEffect(() => {
    const saved = loadQuizResult(QUIZ_KEYS.badGuys);
    if (saved) setResult(saved);
  }, []);

  const handleStart = () => setStarted(true);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [BAD_GUYS_QUESTIONS[currentQ].id]: score };
    setAnswers(newAnswers);

    if (currentQ < BAD_GUYS_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        const computed = calculateBadGuysScore(newAnswers);
        // Persist before any checkout link is shown: the buyer leaves for
        // Stripe and returns to a fresh page with no React state.
        saveQuizResult(QUIZ_KEYS.badGuys, computed);
        setResult(computed);
        setIsProcessing(false);
      }, 2000);
    }
  };

  if (result) return <FreeResult data={result} />;

  if (isProcessing) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameLoading emoji="💔" /></div>;

  if (!started) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameStart emoji="💔" title="Why do I pick bad guys?" blurb="Rate how true each one is for you. Short levels, then the pattern behind your picks." total={BAD_GUYS_QUESTIONS.length} onStart={handleStart} /></div>;

  const question = BAD_GUYS_QUESTIONS[currentQ];

  return (
    <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden">
      <GameQuestion
        name="Why you pick bad guys"
        emoji="💔"
        index={currentQ}
        total={BAD_GUYS_QUESTIONS.length}
        text={question.text}
        quote={true}
        options={[{ label: "Never true", value: 1 }, { label: "Rarely true", value: 2 }, { label: "Sometimes true", value: 3 }, { label: "Often true", value: 4 }, { label: "Very true", value: 5 }]}
        onAnswer={(v) => handleAnswer(Number(v))}
        onBack={() => setCurrentQ((c) => Math.max(c - 1, 0))}
      />
    </div>
  );
}
