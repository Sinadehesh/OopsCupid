import React from "react";
import QuizEngine from "./_components/QuizEngine";

export const metadata = {
  title: "Why Do I Pick Bad Guys? | Diagnostic Audit",
  description: "Take the 50-question clinical assessment to find out exactly why you attract toxic men and how to stop it.",
};

export default function BadGuysQuizPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <QuizEngine />
    </main>
  );
}
