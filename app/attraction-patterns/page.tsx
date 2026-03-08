import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { Magnet, Sparkles, HeartCrack, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: "Who Do I Attract? Attraction & Attachment Test | AAPT",
  description: "Stop repeating the same relationship cycles. Discover your dominant personality pattern, exactly who you are wired to fall for, and the hidden charm you bring to relationships.",
};

export default function AttractionPatternsPage() {
  return (
    <main className="min-h-screen bg-[#feeafa] pb-24 font-sans">
      
      {/* HERO SECTION WITH BOHO PINK PALETTE */}
      <section className="relative bg-gradient-to-r from-[#8e9aaf] to-[#cbc0d3] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#dee2ff] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            Self-Discovery & Patterns
          </span>
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            The Attraction & Attachment Personality Test
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-white/95 max-w-2xl mx-auto drop-shadow-sm">
            Think of personalities as relationship magnets. Find out exactly what your 'charge' is, who you are subconsciously drawn to, and the hidden psychological charm you bring to a partner.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-white">
            <span className="flex items-center gap-2">✓ 24 Deep Questions</span>
            <span className="flex items-center gap-2">✓ Advanced Probability Chart</span>
            <span className="flex items-center gap-2">✓ DSM-5 Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl shadow-[#8e9aaf]/10 border-2 border-[#dee2ff] p-8 md:p-12">
          <QuizWidget quizName="attraction-patterns" />
        </div>
      </section>

      {/* EDUCATIONAL SECTION ON THE 6 PATTERNS */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#334B63] mb-6">
            The Science of Relationship Magnets
          </h2>
          <p className="text-xl text-[#5E6E79] max-w-3xl mx-auto">
            Every type has a specific positive or negative charge that pulls certain other charges toward it. Once you know your pattern, you can break the cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Narcissistic Pull
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Sparkles className="w-20 h-20 text-[#efd3d7] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Drawn to empaths and 'rescuers' who will supply endless praise. Their charm is massive confidence, but the cost is a loss of your own boundaries.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Anxious/Avoidant Trap
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Magnet className="w-20 h-20 text-[#8e9aaf] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                The most studied pairing. The anxious person’s pursuit triggers the avoidant’s withdrawal, creating an addictive, exhausting dopamine rollercoaster.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Depressive Bond
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <HeartCrack className="w-20 h-20 text-[#cbc0d3] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Drawn to energetic optimists or narcissists who pull them out of the fog. Their charm is profound emotional depth and unbreakable loyalty.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Borderline Intensity
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Layers className="w-20 h-20 text-[#efd3d7] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Drawn to intense chemistry and 'saviors'. Their charm is the most passionate love you will ever experience, but it comes with a high emotional toll.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
