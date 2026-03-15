import React from "react";
import SabotageQuizEngine from "./_components/SabotageQuizEngine";

export const metadata = {
  title: "Why Do I Sabotage Relationships? | Clinical Quiz",
  description: "A 50-item behavioral audit measuring fear of closeness, rejection alarm, and self-protective distancing."
};

export default function SabotagePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">Why Do I Sabotage Relationships?</h1>
        <p className="text-slate-500 text-lg">Stop guessing. Start measuring. Run a 50-point clinical screening on your attachment anxiety, fear of rejection, and protective instincts.</p>
      </div>
      <SabotageQuizEngine />
    </main>
  );
}
