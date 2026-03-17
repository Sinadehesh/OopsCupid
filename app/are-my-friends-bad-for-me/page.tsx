import React from "react";
import QuizEngine from "./_components/QuizEngine";

export const metadata = {
  title: "Are My Friends Bad For Me? | Diagnostic Audit",
  description: "Take this 55-question clinical assessment to find out if your friends are secretly toxic, using you, or dragging you down.",
};

export default function AreMyFriendsBadPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <QuizEngine />
    </main>
  );
}
