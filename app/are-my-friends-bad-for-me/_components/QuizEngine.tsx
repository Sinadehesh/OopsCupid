"use client";
import { GameQuestion, GameLoading, GameStart } from "@/components/quiz/GameQuiz";
import React, { useEffect, useState } from "react";
import { TOXIC_FRIENDS_QUESTIONS } from "../_data/questions";
import { calculateFriendScore } from "../_lib/scoring";
import FreeResult from "./FreeResult";
import { saveQuizResult, loadQuizResult, QUIZ_KEYS } from "@/lib/quizResults";
import { Users, ArrowRight } from "lucide-react";

export default function QuizEngine() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Returning from checkout lands on the result, not the start screen.
  useEffect(() => {
    const saved = loadQuizResult(QUIZ_KEYS.friendsBad);
    if (saved) setResult(saved);
  }, []);

  const handleStart = () => setStarted(true);

  const handleAnswer = (score: number) => {
    const nextAnswers = { ...answers, [TOXIC_FRIENDS_QUESTIONS[currentQ].id]: score };
    setAnswers(nextAnswers);

    if (currentQ < TOXIC_FRIENDS_QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        const computed = calculateFriendScore(nextAnswers);
        // Survives the Stripe redirect, see lib/quizResults.ts.
        saveQuizResult(QUIZ_KEYS.friendsBad, computed);
        setResult(computed);
        setIsProcessing(false);
      }, 1500);
    }
  };

  if (result) return <FreeResult data={result} />;

  if (isProcessing) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameLoading emoji="👯" /></div>;

  if (!started) return <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden"><GameStart emoji="👯" title="Are my friends bad for me?" blurb="Think of your friend group and rate each one. Short levels, then what your friendships are really giving you." total={TOXIC_FRIENDS_QUESTIONS.length} onStart={handleStart} /></div>;

  const question = TOXIC_FRIENDS_QUESTIONS[currentQ];

  return (
    <div className="bg-[#FFF4FA] px-3 py-8 md:py-12 overflow-x-hidden">
      <GameQuestion
        name="Are your friends bad for you?"
        emoji="👯"
        index={currentQ}
        total={TOXIC_FRIENDS_QUESTIONS.length}
        text={question.text}
        quote={true}
        options={[{ label: "Never", value: 1 }, { label: "Rarely", value: 2 }, { label: "Sometimes", value: 3 }, { label: "Often", value: 4 }, { label: "Always", value: 5 }]}
        onAnswer={(v) => handleAnswer(Number(v))}
        onBack={() => setCurrentQ((c) => Math.max(c - 1, 0))}
      />
    </div>
  );
}
