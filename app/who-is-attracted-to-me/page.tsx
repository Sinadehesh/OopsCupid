import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { Sparkles, Eye, Target, Magnet } from 'lucide-react';

export const metadata: Metadata = {
  title: "Who Finds Me Attractive Quiz | Psychological Magnet Test",
  description: "Discover exactly who gets obsessed with you based on your hidden personality traits, attachment style, and subconscious emotional energy.",
};

export default function MagnetPatternsPage() {
  return (
    <main className="min-h-screen bg-[#feeafa] pb-24 font-sans">
      
      {/* HERO SECTION WITH BOHO PINK PALETTE */}
      <section className="relative bg-gradient-to-r from-[#cbc0d3] to-[#8e9aaf] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-md">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#dee2ff] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            The Psychological Magnet Test
          </span>
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            Who Finds Me Attractive?
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-white/95 max-w-2xl mx-auto drop-shadow-sm">
            People don't get attracted to you randomly. Find out which specific personality types are magnetically drawn to your exact energy, and the psychological “drug” you provide them.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-white">
            <span className="flex items-center gap-2">✓ 24 Fun Questions</span>
            <span className="flex items-center gap-2">✓ Your Personal Magnet Chart</span>
            <span className="flex items-center gap-2">✓ Deep Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl shadow-[#8e9aaf]/10 border-2 border-[#dee2ff] p-8 md:p-12">
          <QuizWidget quizName="who-finds-me-attractive" />
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#334B63] mb-6">
            Why You Are Their Irresistible Magnet
          </h2>
          <p className="text-xl text-[#5E6E79] max-w-3xl mx-auto leading-relaxed">
            Your personality broadcasts a specific emotional frequency. Their hidden issues light up when they sense your energy because you feel like the exact “missing piece” their nervous system has been craving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Confident Energy
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Sparkles className="w-20 h-20 text-[#efd3d7] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                You radiate charisma. You become a magnet for depressive and anxious types because your energy gives them a massive dopamine hit of validation.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Independent Energy
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Target className="w-20 h-20 text-[#8e9aaf] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                You love your space. This calm detachment triggers the ultimate "chase" response in anxious types who are desperate to win you over.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Deep Soul Energy
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Eye className="w-20 h-20 text-[#cbc0d3] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                You see the world in deeper shades. You become irresistible to "rescuers" and caretakers who want to feel like a hero every single day.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              The Intense Energy
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <Magnet className="w-20 h-20 text-[#efd3d7] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                You offer wild, unforgettable passion. Narcissists and emotionally guarded people obsess over you because you make them feel incredibly alive.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
