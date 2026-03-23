import React from "react";
import SabotageQuizEngine from "./_components/SabotageQuizEngine";

export const metadata = {
  title: "Why Do I Sabotage Relationships? | Clinical Quiz",
  description: "A 50-item behavioral audit measuring fear of closeness, rejection alarm, and self-protective distancing."
};

export default function SabotagePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      {/* HERO SECTION - PREMIUM THEME */}
      <section className="relative bg-slate-900 pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-lg">
        <div className="w-full max-w-[1400px] mx-auto">
          <span className="text-rose-400 font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            Clinical Defense Mechanism Audit
          </span>
          <h1 className="text-[40px] md:text-[56px] font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm text-white">
            Why Do I Sabotage Relationships?
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-slate-300 w-full max-w-[1400px] mx-auto drop-shadow-sm">
            Stop guessing. Start measuring. Run a 50-point clinical screening on your attachment anxiety, fear of rejection, and protective instincts.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-slate-200">
            <span className="flex items-center gap-2 text-rose-400">✓ 50-Point Audit</span>
            <span className="flex items-center gap-2 text-rose-400">✓ Trigger Mapping</span>
            <span className="flex items-center gap-2 text-rose-400">✓ Defense System Diagnosis</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="w-full max-w-4xl mx-auto px-4 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl border border-slate-100 p-4 md:p-8">
          <SabotageQuizEngine />
        </div>
      </section>
    </main>
  );
}
