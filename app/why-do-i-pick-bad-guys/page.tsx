import React from "react";
import QuizEngine from "./_components/QuizEngine";
import QuizSeoFooter from "@/components/seo/QuizSeoFooter";

export const metadata = {
  title: "Why Do I Attract the Wrong Guys? Free Quiz (Why I Pick Bad Guys)",
  description: "Take the free 50-question assessment to find out exactly why you attract toxic men and how to stop it.",
};

export default function BadGuysQuizPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <QuizEngine />
    <QuizSeoFooter slug="/why-do-i-pick-bad-guys" />
    </main>
  );
}
