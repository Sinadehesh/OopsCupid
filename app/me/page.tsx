import Link from "next/link";
import { User, Heart, Magnet, Sparkles, Bomb, ArrowRight } from "lucide-react";

export const metadata = { title: "Fix Your Dating Patterns | OopsCupid" };

export default function MeHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* HERO SECTION: The Dream Outcome */}
      <section className="bg-[#8B5CF6] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <User className="w-4 h-4 text-white" />
            Instant Diagnostic Audits
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Stop Picking <span className="text-[#FDE047] drop-shadow-sm">The Wrong Guys.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Take a quick 3-minute test. Find out why you chase toxic people, why nice guys feel boring, and get the exact steps to fix your habits today.
          </p>
        </div>
      </section>

      {/* THE PAIN SECTION: Running from Hell */}
      <section className="pt-16 pb-8 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2C54] mb-4">
          Are You Tired Of Your Own Cycle?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-medium">
          You do not need years of therapy to figure out what is wrong. Stop guessing. Pick a test below, let our smart tool scan your answers, and get instant, cold hard facts about your dating blind spots.
        </p>
      </section>

      {/* CARDS SECTION: The Solution (No Effort) */}
      <section className="py-12 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/attachment-style-quiz" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EC4899]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EC4899] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Am I So Anxious?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Find out why you overthink his texts and panic when he pulls away. Get the exact steps to feel secure and calm.
              </p>
              <div className="flex items-center text-[#EC4899] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Get Instant Answers <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/why-do-i-attract-toxic-people" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#A855F7] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Magnet className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Do I Pick Bad Guys?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Stop dating the same toxic guy in a different font. Uncover the hidden signals you are sending that draw players to you.
              </p>
              <div className="flex items-center text-[#A855F7] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Spot The Pattern <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/attraction-patterns" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#8B5CF6] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">My Dating Blind Spots</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Let our smart tool scan your dating history to tell you exactly where you go wrong and how to fix it fast.
              </p>
              <div className="flex items-center text-[#8B5CF6] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Scan My History <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/why-do-i-sabotage-relationships" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden opacity-90">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F43F5E]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#F43F5E] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Bomb className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Do Safe Guys Feel Boring? <span className="text-sm font-bold text-[#F43F5E] bg-[#F43F5E]/10 px-3 py-1 rounded-full ml-2 align-middle whitespace-nowrap tracking-wide">COMING SOON</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Stop pushing away good people. Find out why a peaceful relationship feels like boredom to you, and how to stop ruining it.
              </p>
              <div className="flex items-center text-[#F43F5E] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Join The Waitlist <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
