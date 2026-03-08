"use client";

import React, { useState } from "react";
import CTA from "../ui/CTA";

// Mock questions
const mockQuestions = [
  { id: 1, text: "How often do they text you first?", options: ["Every day", "Usually, but sometimes I do", "Rarely, I always initiate", "They leave me on read"] },
  { id: 2, text: "Do they remember small details you've shared?", options: ["Always", "Sometimes", "Only the big things", "Never"] },
  { id: 3, text: "How do you feel after spending time with them?", options: ["Energized and happy", "Normal", "Drained or anxious", "Confused"] },
  { id: 4, text: "Do they make plans for the future with you?", options: ["Yes, actively", "Sometimes vague plans", "Not really", "They avoid the topic"] },
  { id: 5, text: "How do they handle conflicts?", options: ["We talk it out calmly", "They get defensive but we resolve it", "They blame me", "They give me the silent treatment"] }
];

export default function QuizWidget({ quizName }: { quizName: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quiz-result", {
        method: "POST",
        body: JSON.stringify({ quizName, answers }),
      });
      const data = await res.json();
      setResultData(data);
      setShowResult(true);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (showResult && resultData) {
    return (
      <div className="rounded-2xl bg-[var(--secondary-base)]/5 p-8 border border-[var(--secondary-base)]/20 text-center max-w-2xl mx-auto shadow-sm">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--secondary-base)] mb-2 block">Your Result</span>
        <h3 className="text-3xl font-extrabold text-foreground mb-4">{resultData.title}</h3>
        <p className="text-foreground-secondary text-lg leading-relaxed mb-8">{resultData.description}</p>
        <CTA text="Take Another Quiz" variant="secondary" onClick={() => {
          setCurrentQuestion(0);
          setAnswers([]);
          setShowResult(false);
          setResultData(null);
        }} />
      </div>
    );
  }

  const q = mockQuestions[currentQuestion];

  return (
    <div className="rounded-2xl bg-surface border border-border p-6 md:p-8 max-w-2xl mx-auto shadow-sm">
      <div className="mb-6 flex justify-between text-sm font-medium text-foreground-muted border-b border-border pb-4">
        <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
        <span>{Math.round(((currentQuestion) / mockQuestions.length) * 100)}% Completed</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
        {q.text}
      </h3>

      <div className="space-y-3">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left p-4 rounded-xl border border-border hover:border-[var(--secondary-base)] hover:bg-surface-elevated transition-colors text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-[var(--secondary-base)] focus:ring-offset-2 focus:ring-offset-background"
          >
            {option}
          </button>
        ))}
      </div>

      {currentQuestion === mockQuestions.length - 1 && answers.length === mockQuestions.length && !showResult && (
        <div className="mt-8 text-center pt-8 border-t border-border">
          <CTA 
            text={loading ? "Analyzing..." : "See My Result"} 
            onClick={handleSubmit} 
            disabled={loading}
            variant="primary"
          />
        </div>
      )}
    </div>
  );
}
