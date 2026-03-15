import React from "react";
import GaslightingQuizEngine from "./_components/GaslightingQuizEngine";

export const metadata = {
  title: "Is He Gaslighting Me? | Clinical Screening Tool",
  description: "A 50-item behavioral audit measuring reality denial, invalidation, and the erosion of self-trust."
};

export default function GaslightingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">Is He Gaslighting Me?</h1>
        <p className="text-slate-500 text-lg">Stop guessing. Start measuring. Run a 50-point clinical screening on his behavior and your mental clarity.</p>
      </div>
      <GaslightingQuizEngine />
    </main>
  );
}
