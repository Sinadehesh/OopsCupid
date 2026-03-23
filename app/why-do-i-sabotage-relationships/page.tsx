import React from "react";
import SabotageQuizEngine from "./_components/SabotageQuizEngine";
import { ShieldAlert, Activity, HeartCrack } from "lucide-react";

export const metadata = {
  title: "Why Do I Sabotage Relationships? | Clinical Behavioral Audit",
  description: "A 50-item behavioral audit measuring fear of closeness, rejection alarm, and self-protective distancing. Find your sabotage archetype.",
  keywords: ["why do i sabotage relationships", "relationship self-sabotage quiz", "fear of intimacy test", "attachment anxiety quiz", "avoidant attachment quiz"],
};

export default function SabotagePage() {
  return (
    <main className="min-h-screen bg-[#FFF1D0] pb-24 font-sans">

      {/* HERO — matches attraction-patterns exactly */}
      <section className="relative bg-[#086788] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-lg">
        <div className="w-full max-w-[1400px] mx-auto">
          <span className="text-[#F0C808] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            2026 Updated Clinical Edition
          </span>
          <h1 className="text-[40px] md:text-[56px] font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm text-[#FFF1D0]">
            Why Do I Sabotage Relationships?
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-[#FFF1D0]/90 w-full max-w-[1400px] mx-auto drop-shadow-sm">
            This isn't a generic personality quiz. Run a 50-point behavioral audit on your fear of closeness, rejection alarm, and self-protective distancing — and find your exact sabotage archetype.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base font-semibold text-white">
            <span className="flex items-center gap-2 text-[#06AED5]">✓ 50 Clinical Questions</span>
            <span className="flex items-center gap-2 text-[#06AED5]">✓ Anxious + Avoidant Scoring</span>
            <span className="flex items-center gap-2 text-[#06AED5]">✓ DSM-5 Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* QUIZ — overlaps hero, same -mt-24 pattern as attraction-patterns */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl border border-slate-100 p-4 md:p-8">
          <SabotageQuizEngine />
        </div>
      </section>

      {/* EDUCATIONAL SECTION — same card pattern as attraction-patterns */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
            The 3 Ways People Destroy Good Relationships
          </h2>
          <p className="text-xl text-[#086788]/80 w-full max-w-[1400px] mx-auto leading-relaxed font-medium">
            Self-sabotage isn't random. There are specific psychological triggers that activate your brain's defense system — even when everything is going well.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Panic & Pull Away
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <Activity className="w-20 h-20 text-[#DD1C1A] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                When things get real, your nervous system treats intimacy as danger. You don't leave because you stopped caring. You leave because closeness feels like a trap.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Flaw Hunt
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <ShieldAlert className="w-20 h-20 text-[#06AED5] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                You start noticing small things — the way they eat, the way they breathe. Your brain is manufacturing reasons to leave before they can leave you first.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Chaos Engine
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <HeartCrack className="w-20 h-20 text-[#F0C808] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                You mistake anxiety for chemistry and peace for boredom. Unconsciously, you create conflict to feel the adrenaline that your brain has learned to call "love."
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
