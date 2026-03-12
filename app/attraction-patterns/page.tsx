import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { Magnet, Sparkles, HeartCrack, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: "Ultimate Who Am I Attracted To Quiz | Psychological Personality Test",
  description: "Discover exactly who you find irresistible based on your hidden issues, attachment style, and subconscious wiring. Stop dating the same toxic type.",
  keywords: ["Who am I attracted to quiz", "Psychological reasons why I keep dating the same type", "Who do I find attractive based on my personality", "Attachment style attraction predictor test", "Why am I attracted to narcissists"],
};

export default function AttractionPatternsPage() {
  return (
    <main className="min-h-screen bg-[#FFF1D0] pb-24 font-sans">
      
      {/* HERO SECTION WITH NEW CUSTOM PALETTE */}
      <section className="relative bg-[#086788] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-lg">
        <div className="w-full max-w-[1400px] mx-auto">
          <span className="text-[#F0C808] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            2026 Updated Clinical Edition
          </span>
          <h1 className="text-[40px] md:text-[56px] font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm text-[#FFF1D0]">
            The Ultimate "Who Am I Attracted To" Quiz
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-[#FFF1D0]/90 w-full max-w-[1400px] mx-auto drop-shadow-sm">
            This isn't a generic "pick your favorite color" test. Discover exactly who your nervous system finds irresistible based on your hidden childhood wiring, dopamine responses, and emotional needs.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-white">
            <span className="flex items-center gap-2 text-[#06AED5]">✓ 24 Deep Questions</span>
            <span className="flex items-center gap-2 text-[#06AED5]">✓ Advanced Probability Chart</span>
            <span className="flex items-center gap-2 text-[#06AED5]">✓ DSM-5 Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="w-full w-full max-w-[1400px] mx-auto px-4 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl border border-slate-100 p-4 md:p-8">
          <QuizWidget quizName="attraction-patterns" />
        </div>
      </section>

      {/* EDUCATIONAL SECTION ON THE 6 PATTERNS (PRESERVED) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
            The Science of Relationship Magnets
          </h2>
          <p className="text-xl text-[#086788]/80 w-full max-w-[1400px] mx-auto leading-relaxed font-medium">
            Your attraction isn’t random. Your own hidden issues literally light up when you meet someone who matches a familiar emotional chemistry—even if it hurts later.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Narcissistic Pull
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <Sparkles className="w-20 h-20 text-[#DD1C1A] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                Drawn to empaths and 'rescuers' who supply endless praise. Their charm is massive confidence that temporarily fixes your low self-worth.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Anxious/Avoidant Trap
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <Magnet className="w-20 h-20 text-[#06AED5] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                The most studied pairing. The anxious person’s pursuit triggers the avoidant’s withdrawal, creating an addictive, exhausting dopamine rollercoaster.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Depressive Bond
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <HeartCrack className="w-20 h-20 text-[#F0C808] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                Drawn to energetic optimists or natural rescuers. Their charm is profound emotional depth and iron-clad loyalty that hits your soul.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-2 border-[#06AED5]/20 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#06AED5] transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-[#086788] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Borderline Intensity
            </div>
            <div className="p-8 flex justify-center items-center bg-[#06AED5]/5">
              <Layers className="w-20 h-20 text-[#DD1C1A] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#086788]/80 text-[15px] leading-relaxed font-medium">
                Drawn to intense chemistry. Their charm is the most electric, can't-eat-can't-sleep passion you will ever experience, but comes with a high emotional toll.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}