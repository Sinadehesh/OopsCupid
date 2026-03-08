import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import { HeartHandshake, ShieldAlert, UserMinus, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: "What Is My Attachment Style Quiz? | Free Test | OopsCupid",
  description: "Take our free, instant quiz to discover if your attachment style is Anxious, Avoidant, Secure, or Disorganized.",
  keywords: ["attachment style test", "anxious or avoidant quiz", "relationship psychology test"],
};

export default function AttachmentQuizPage() {
  return (
    <main className="min-h-screen bg-[#feeafa] pb-24 font-sans">
      
      {/* HERO SECTION WITH NEW PALETTE GRADIENT */}
      <section className="relative bg-gradient-to-r from-[#8e9aaf] to-[#cbc0d3] pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            Attachment Style Assessment
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium mb-10 text-white/95 max-w-2xl mx-auto drop-shadow-sm">
            Discover your relationship blueprint. Take our free clinical assessment to find out if you are Anxious, Avoidant, Fearful, or Secure.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-semibold text-white">
            <span className="flex items-center gap-2">✓ Takes &lt; 5 mins</span>
            <span className="flex items-center gap-2">✓ Free Instant Report</span>
            <span className="flex items-center gap-2">✓ Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* OVERLAPPING QUIZ WIDGET */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl shadow-[#8e9aaf]/10 border-2 border-[#dee2ff] p-8 md:p-12">
          <QuizWidget quizName="attachment-style" />
        </div>
      </section>

      {/* THE 4 STYLES EDUCATIONAL GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-[#334B63] mb-6">
            What Are The Four Attachment Styles?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Anxious Preoccupied
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <HeartHandshake className="w-20 h-20 text-[#efd3d7] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Intensely desire close relationships but are often preoccupied with fears of abandonment and hyper-vigilant to signs of rejection.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Fearful Avoidant
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <ShieldAlert className="w-20 h-20 text-[#8e9aaf] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Desire intimacy but are simultaneously terrified of it. Often send mixed signals of wanting to be close and then abruptly pulling away.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Dismissive Avoidant
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <UserMinus className="w-20 h-20 text-[#cbc0d3] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Equate intimacy with a loss of independence. Prefer to rely solely on themselves and actively avoid getting emotionally "too close".
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#dee2ff] overflow-hidden flex flex-col hover:shadow-md hover:border-[#cbc0d3] transition-all duration-300">
            <div className="bg-[#8e9aaf] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Secure
            </div>
            <div className="p-8 flex justify-center items-center bg-[#dee2ff]/30">
              <ShieldCheck className="w-20 h-20 text-[#efd3d7] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-[#5E6E79] text-[15px] leading-relaxed font-medium">
                Comfortable with both intimacy and independence. Trusting, supportive, and able to effectively communicate their needs without playing games.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
