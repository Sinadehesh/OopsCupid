import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { HeartHandshake, ShieldAlert, UserMinus, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: "What Is His Attachment Style? Partner Test | OopsCupid",
  description: "Decode his mixed signals. Take our 12-question clinical assessment to find out if your partner is Anxious, Avoidant, Fearful, or Secure.",
};

export default function PartnerAttachmentQuizPage() {
  return (
    <main className="min-h-screen bg-[#fdffff] pb-24 font-sans">
      
      {/* HERO SECTION WITH CRIMSON PALETTE */}
      <section className="relative bg-gradient-to-r from-[#570000] to-[#b10f2e] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-lg">
        <div className="w-full max-w-[1400px] mx-auto">
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            Partner Attachment Assessment
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-white/95 w-full max-w-[1400px] mx-auto drop-shadow-sm">
            Stop guessing his intentions. Use our clinical test to uncover his relationship blueprint, decode his mixed signals, and understand how he truly views intimacy.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-[#de7c5a]">
            <span className="flex items-center gap-2">✓ 12 Deep Questions</span>
            <span className="flex items-center gap-2">✓ Free Instant Report</span>
            <span className="flex items-center gap-2">✓ Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-[#fdffff] rounded-[24px] shadow-2xl border border-[#de7c5a]/30 p-8 md:p-12">
          <QuizWidget quizName="partners-attachment-style" />
        </div>
      </section>

      {/* THE 4 STYLES EDUCATIONAL GRID (CRIMSON THEMED) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#280000] mb-6">
            His Core Psychological Drivers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#280000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Anxious Preoccupied
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <HeartHandshake className="w-20 h-20 text-[#de7c5a] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                He intensely desires close relationships but is preoccupied with fears of abandonment, constantly seeking your reassurance.
              </p>
            </div>
          </div>

          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#280000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Fearful Avoidant
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <ShieldAlert className="w-20 h-20 text-[#b10f2e] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                He sends severe mixed signals. He desires intimacy but is terrified of it, causing an exhausting push-pull dynamic.
              </p>
            </div>
          </div>

          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#280000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Dismissive Avoidant
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <UserMinus className="w-20 h-20 text-[#570000] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                He equates intimacy with a loss of independence. He prefers to rely solely on himself and avoids getting emotionally "too close".
              </p>
            </div>
          </div>

          <div className="bg-[#fdffff] rounded-2xl shadow-sm border border-[#de7c5a]/40 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#b10f2e] transition-all duration-300">
            <div className="bg-[#280000] text-[#fdffff] text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Secure
            </div>
            <div className="p-8 flex justify-center items-center bg-[#b10f2e]/5">
              <ShieldCheck className="w-20 h-20 text-[#de7c5a] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#570000] text-[15px] leading-relaxed font-medium">
                He is comfortable with both intimacy and independence. He communicates needs effectively without playing destructive games.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
