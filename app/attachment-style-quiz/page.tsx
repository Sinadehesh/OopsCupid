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
    <main className="min-h-screen bg-[#F8F9FA] pb-24 font-sans">
      
      {/* 1. HERO SECTION WITH CURVED GRADIENT */}
      <section className="relative bg-gradient-to-r from-purple-500 to-pink-400 pt-24 pb-40 px-6 md:px-10 lg:px-14 rounded-b-[3rem] text-white text-center shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[40px] md:text-[56px] font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
            Attachment Style Quiz
          </h1>
          <p className="text-[20px] md:text-[24px] font-light mb-10 text-white/95 max-w-2xl mx-auto">
            Discover your relationship blueprint. Take our free clinical assessment to find out if you are Anxious, Avoidant, Fearful, or Secure.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm md:text-base font-medium text-white/90">
            <span className="flex items-center gap-2">✓ Takes &lt; 5 mins</span>
            <span className="flex items-center gap-2">✓ Free Instant Report</span>
            <span className="flex items-center gap-2">✓ Psychology Backed</span>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING QUIZ WIDGET */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative z-10 mb-24">
        <div className="bg-white rounded-[24px] shadow-xl shadow-purple-900/10 border border-purple-100 p-8 md:p-12">
          {/* Note: This uses your existing QuizWidget */}
          <QuizWidget quizName="attachment-style" />
        </div>
      </section>

      {/* 3. THE 4 STYLES EDUCATIONAL GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[42px] font-bold text-gray-900 mb-6">
            What Are The Four Attachment Styles?
          </h2>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 tablet, 4 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Card 1: Anxious Preoccupied */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <div className="bg-[#A020F0] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Anxious Preoccupied
            </div>
            <div className="p-8 flex justify-center items-center bg-purple-50/50">
              <HeartHandshake className="w-20 h-20 text-[#FF69B4] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-gray-600 text-[15px] leading-relaxed font-light">
                Intensely desire close relationships but are often preoccupied with fears of abandonment and hyper-vigilant to signs of rejection.
              </p>
            </div>
          </div>

          {/* Card 2: Fearful Avoidant */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <div className="bg-[#A020F0] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Fearful Avoidant
            </div>
            <div className="p-8 flex justify-center items-center bg-purple-50/50">
              <ShieldAlert className="w-20 h-20 text-[#A020F0] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-gray-600 text-[15px] leading-relaxed font-light">
                Desire intimacy but are simultaneously terrified of it. Often send mixed signals of wanting to be close and then abruptly pulling away.
              </p>
            </div>
          </div>

          {/* Card 3: Dismissive Avoidant */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <div className="bg-[#A020F0] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Dismissive Avoidant
            </div>
            <div className="p-8 flex justify-center items-center bg-purple-50/50">
              <UserMinus className="w-20 h-20 text-teal-400 stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-gray-600 text-[15px] leading-relaxed font-light">
                Equate intimacy with a loss of independence. Prefer to rely solely on themselves and actively avoid getting emotionally "too close".
              </p>
            </div>
          </div>

          {/* Card 4: Secure */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-200 overflow-hidden flex flex-col hover:shadow-lg hover:border-purple-300 transition-all duration-300">
            <div className="bg-[#A020F0] text-white text-[13px] font-bold uppercase tracking-widest py-3 text-center">
              Secure
            </div>
            <div className="p-8 flex justify-center items-center bg-purple-50/50">
              <ShieldCheck className="w-20 h-20 text-[#FF69B4] stroke-[1.5]" />
            </div>
            <div className="p-6 text-center flex-grow">
              <p className="text-gray-600 text-[15px] leading-relaxed font-light">
                Comfortable with both intimacy and independence. Trusting, supportive, and able to effectively communicate their needs without playing games.
              </p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}