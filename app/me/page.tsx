import Link from "next/link";
import { User, Heart, Magnet, Sparkles, Bomb, ArrowRight } from "lucide-react";

export const metadata = { title: "The Me Hub | OopsCupid" };

export default function MeHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="bg-[#8B5CF6] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <User className="w-4 h-4 text-white" />
            Self Reflection
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Focus <span className="text-white/80 drop-shadow-sm">inward.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Understand your attachment style, attraction patterns, and emotional triggers to build healthier relationships.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/attachment-style-quiz" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EC4899]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EC4899] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Your Attachment Style</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Discover how you securely or anxiously connect with others.</p>
              <div className="flex items-center text-[#EC4899] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Take the Test <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/why-do-i-attract-toxic-people" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#A855F7] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Magnet className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Do I Attract Toxic People?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Audit the subconscious signals you are putting out.</p>
              <div className="flex items-center text-[#A855F7] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Audit Signals <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/attraction-patterns" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#8B5CF6] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Attraction Patterns</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Map out your exact dating history and find the common denominator.</p>
              <div className="flex items-center text-[#8B5CF6] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Map Patterns <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/why-do-i-sabotage-relationships" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F43F5E]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#F43F5E] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Bomb className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Do I Sabotage? <span className="text-sm font-bold opacity-60 tracking-normal align-middle whitespace-nowrap">(Coming Soon)</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Understand the hidden fears making you push good people away.</p>
              <div className="flex items-center text-[#F43F5E] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Find Out Why <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
