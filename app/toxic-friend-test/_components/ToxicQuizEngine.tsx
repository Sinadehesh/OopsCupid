"use client";
import { GameQuestion, GameLoading } from "@/components/quiz/GameQuiz";
import React, { useState, useEffect } from "react";
import { TOXIC_FRIEND_QUESTIONS, OPTIONS, Question } from "../_data/questions";
import SafetyModal from "./SafetyModal";
import FreeResult from "./FreeResult";
import { saveQuizResult, loadQuizResult, QUIZ_KEYS } from "@/lib/quizResults";
import { calculateToxicScores } from "../_lib/scoring";

export default function ToxicQuizEngine() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSafety, setShowSafety] = useState(false);
  
  // Blocks a second tap while the 350ms advance animation is pending.
  // Without it, two fast clicks queue two increments and walk the index
  // past the end of the question bank (a double-tap crashed the quiz and
  // lost every answer).
  const [advancing, setAdvancing] = useState(false);

  const [isFinished, setIsFinished] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultsData, setResultsData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Returning from checkout lands on the result, not the start screen.
    const saved = loadQuizResult(QUIZ_KEYS.toxicFriend);
    if (saved) {
      setResultsData(saved);
      setIsFinished(true);
    }
  }, []);

  if (!mounted) return <div className="min-h-[400px] flex items-center justify-center text-slate-500" aria-live="polite">Loading Engine...</div>;

  if (isFinished && resultsData) {
    return <FreeResult data={resultsData} rawAnswers={answers} />;
  }

  if (isCalculating) return <div className="bg-[#FFF4FA] px-3 py-8 overflow-x-hidden"><GameLoading emoji="🐍" /></div>;

  const safeIndex = Math.min(Math.max(currentIndex, 0), TOXIC_FRIEND_QUESTIONS.length - 1);
  const question: Question = TOXIC_FRIEND_QUESTIONS[safeIndex];
  const progressPercent = Math.round((safeIndex / TOXIC_FRIEND_QUESTIONS.length) * 100);
  const currentOptions = OPTIONS[question.responseType];

  const handleSelect = (option: string) => {
    if (advancing) return;
    setAdvancing(true);
    const newAnswers = { ...answers, [question.id]: option };
    setAnswers(newAnswers);

    if (question.hardFlag) {
      if (question.responseType === "binary" && option === "Yes") setShowSafety(true);
      if (question.responseType === "freq" && (option.startsWith("3") || option.startsWith("4"))) setShowSafety(true);
    }

    setTimeout(() => {
      setAdvancing(false);
      if (safeIndex < TOXIC_FRIEND_QUESTIONS.length - 1) {
        setCurrentIndex(prev => Math.min(prev + 1, TOXIC_FRIEND_QUESTIONS.length - 1));
      } else {
        setIsCalculating(true);
        setTimeout(() => {
          const res = calculateToxicScores(newAnswers);
          // Survives the Stripe redirect, see lib/quizResults.ts.
          saveQuizResult(QUIZ_KEYS.toxicFriend, res);
          setResultsData(res);
          setIsCalculating(false);
          setIsFinished(true);
        }, 1500);
      }
    }, 350);
  };

  const handleBack = () => {
    setAdvancing(false);
    if (currentIndex > 0) setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full relative">
      {showSafety && <SafetyModal onClose={() => setShowSafety(false)} />}
      <GameQuestion
        name="Toxic friend test"
        emoji="🐍"
        index={safeIndex}
        total={TOXIC_FRIEND_QUESTIONS.length}
        text={question.text}
        section={question.module}
        options={currentOptions.map((o: string) => ({ label: o, value: o }))}
        onAnswer={(v) => handleSelect(String(v))}
        onBack={handleBack}
        delay={0}
      />
    </div>
  );
}
