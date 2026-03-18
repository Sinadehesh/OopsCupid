import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { ShieldCheck, Target, Heart, BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: "The Master Psychological Battery | Attachment, Emotion, Self-Esteem",
  description: "A comprehensive 92-question clinical assessment combining ECR-RS, DERS-16, and Rosenberg scales to reveal your true relationship blueprint.",
};

export default function MegaBatteryPage() {
  return (
    <main className="min-h-screen bg-[#F8FBFF] pb-24 font-sans">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#00A6ED] pt-24 pb-48 px-6 md:px-10 lg:px-14 text-white text-center shadow-sm">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#FFB400] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            The Master Assessment
          </span>
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            Your Complete Clinical Profile
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-white/95 max-w-2xl mx-auto drop-shadow-sm">
            This is our most advanced, 92-question clinical battery. It measures your core attachment style, global self-esteem, emotion regulation capacity, and romantic love style all in one test.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-white">
            <span className="flex items-center gap-2">✓ 4 Clinical Scales</span>
            <span className="flex items-center gap-2">✓ 92 Deep Questions</span>
            <span className="flex items-center gap-2">✓ Master Dashboard</span>
          </div>
        </div>
      </section>

      {/* WIDE CONTAINER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 -mt-32 relative z-10 mb-24">
        <QuizWidget quizName="attachment-style" />
      </section>

      {/* THE 4 PILLARS EXPLAINED */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#0D2C54] mb-6">
            What This Test Measures
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#00A6ED]/20 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            <div className="bg-[#006ba6] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">Phase 1: Attachment</div>
            <div className="p-8 flex justify-center items-center bg-[#0496ff]/5"><ShieldCheck className="w-20 h-20 text-[#0D2C54] stroke-[1.5]" /></div>
            <div className="p-6 text-center flex-grow"><p className="text-[#0D2C54] text-[15px] leading-relaxed font-medium">Uses the 9-item ECR-RS structure to map your exact levels of attachment anxiety and avoidance.</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#00A6ED]/20 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            <div className="bg-[#d81159] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">Phase 2: Self-Esteem</div>
            <div className="p-8 flex justify-center items-center bg-[#d81159]/5"><Target className="w-20 h-20 text-[#d81159] stroke-[1.5]" /></div>
            <div className="p-6 text-center flex-grow"><p className="text-[#0D2C54] text-[15px] leading-relaxed font-medium">Uses the 10-item Rosenberg scale to determine your baseline self-worth and boundaries.</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#00A6ED]/20 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            <div className="bg-[#8f2d56] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">Phase 3: Emotion</div>
            <div className="p-8 flex justify-center items-center bg-[#8f2d56]/5"><BrainCircuit className="w-20 h-20 text-[#8f2d56] stroke-[1.5]" /></div>
            <div className="p-6 text-center flex-grow"><p className="text-[#0D2C54] text-[15px] leading-relaxed font-medium">Uses the 16-item DERS scale to measure how dysregulated your nervous system gets during stress.</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#00A6ED]/20 overflow-hidden flex flex-col hover:shadow-lg transition-all">
            <div className="bg-[#ffbc42] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">Phase 4: Love Styles</div>
            <div className="p-8 flex justify-center items-center bg-[#ffbc42]/10"><Heart className="w-20 h-20 text-[#FFB400] stroke-[1.5]" /></div>
            <div className="p-6 text-center flex-grow"><p className="text-[#0D2C54] text-[15px] leading-relaxed font-medium">Maps your approach to romance using Hendrick's typologies (Eros, Ludus, Pragma, etc).</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
