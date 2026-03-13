import Link from "next/link";
import { BookOpen, BrainCircuit, ShieldAlert, HeartCrack, ArrowRight } from "lucide-react";

export const metadata = { title: "The Clarity Hub | OopsCupid" };

export default function ClarityHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="bg-[#10B981] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <BookOpen className="w-4 h-4 text-white" />
            Resources & Essays
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            The Clarity <span className="text-white/80 drop-shadow-sm">Hub.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Stop guessing. Educate yourself with clinical deep-dives into the science of human behavior.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/articles/manipulation-science" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#F59E0B] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <BrainCircuit className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">The Science of Manipulation</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Deep dive into the dark psychology of coercive control.</p>
              <div className="flex items-center text-[#F59E0B] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Read Essay <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/articles/is-my-friend-toxic" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Is My Friend Toxic?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Learn the clinical signs of a one-sided, draining friendship.</p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Read Essay <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/love-bombing-signs" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#10B981] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <HeartCrack className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Love Bombing vs. Affection <span className="text-sm font-bold opacity-60 tracking-normal align-middle whitespace-nowrap">(Coming Soon)</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">How to tell if they are moving too fast to trap you.</p>
              <div className="flex items-center text-[#10B981] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Read Essay <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/trauma-bonding-signs" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EAB308] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Trauma Bonding Signs <span className="text-sm font-bold opacity-60 tracking-normal align-middle whitespace-nowrap">(Coming Soon)</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Understand the biological addiction to a toxic partner.</p>
              <div className="flex items-center text-[#EAB308] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Read Essay <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
