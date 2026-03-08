import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { ShieldAlert, EyeOff, BrainCircuit, HeartCrack } from 'lucide-react';

export const metadata: Metadata = {
  title: "Is He Manipulating Me? Covert Narcissist Test | OopsCupid",
  description: "Spot the hidden signs of gaslighting, guilt-tripping, and emotional manipulation. Take our free clinical assessment to uncover the truth.",
};

export default function ManipulativeQuizPage() {
  return (
    <main className="min-h-screen bg-[#fdffff] pb-24 font-sans">
      
      {/* HERO SECTION WITH DEEP CRIMSON PALETTE */}
      <section className="relative bg-gradient-to-r from-[#280000] to-[#b10f2e] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-lg">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#de7c5a] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            Toxicity & Red Flag Assessment
          </span>
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            Is He Manipulating You?
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Manipulators use confusion as a weapon. Take this 8-question clinical test to find out if you are experiencing gaslighting, guilt-tripping, or covert emotional abuse.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-[#fdffff]">
            <span className="flex items-center gap-2">✓ 8 Deep Questions</span>
            <span className="flex items-center gap-2">✓ Free Instant Report</span>
            <span className="flex items-center gap-2">✓ Spot Covert Narcissism</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-[#fdffff] rounded-[24px] shadow-2xl border border-[#de7c5a]/30 p-8 md:p-12">
          <QuizWidget quizName="is-he-manipulative" />
        </div>
      </section>

      {/* THE 4 PILLARS OF MANIPULATION (CRIMSON THEMED) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#280000] mb-6">
            The Four Pillars of Manipulation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#570000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Gaslighting
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <EyeOff className="w-20 h-20 text-[#de7c5a] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                Denying reality to make you doubt your own memory. "I never said that" or "You're acting crazy right now."
              </p>
            </div>
          </div>

          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#570000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Guilt-Tripping
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <HeartCrack className="w-20 h-20 text-[#b10f2e] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                Making you feel responsible for his bad behavior. "I wouldn't have yelled if you didn't provoke me."
              </p>
            </div>
          </div>

          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#570000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Isolation
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <ShieldAlert className="w-20 h-20 text-[#570000] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                Subtly turning you against your support system so that he becomes the only person you trust or rely on.
              </p>
            </div>
          </div>

          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#570000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Love-Bombing
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <BrainCircuit className="w-20 h-20 text-[#de7c5a] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                Overwhelming you with intense affection and promises early on, only to withdraw it later to maintain control.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
