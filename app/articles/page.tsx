import Link from "next/link";
import { BookOpen, BrainCircuit, ShieldAlert, HeartCrack, ArrowRight } from "lucide-react";

export const metadata = { title: "Relationship Red Flag Guides | OopsCupid" };

export default function ClarityHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* HERO SECTION: The Dream Outcome */}
      <section className="bg-[#10B981] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <BookOpen className="w-4 h-4 text-white" />
            Red Flag Playbooks
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Stop Ignoring <span className="text-[#FDE047] drop-shadow-sm">The Signs.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Quick, brutally honest guides on spotting manipulation, avoiding fake friends, and knowing exactly when to walk away.
          </p>
        </div>
      </section>

      {/* THE PAIN SECTION: Running from Hell */}
      <section className="pt-16 pb-8 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2C54] mb-4">
          Do Not Wait Until It Gets Worse.
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
          You already have a bad feeling in your gut. We are here to validate it. Skip the long psychology textbooks. Pick a quick-read playbook below to spot the exact mind games being used against you today.
        </p>
      </section>

      {/* CARDS SECTION: The Solution (No Effort) */}
      <section className="py-12 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/articles/manipulation-science" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#F59E0B] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <BrainCircuit className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Spot The Manipulator</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Do they always twist the story so it is your fault? Learn the exact phrases manipulators use and how to shut them down.
              </p>
              <div className="flex items-center text-[#F59E0B] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Read The Playbook <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/articles/is-my-friend-toxic" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Toxic Friend Checklist</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                A brutal reality check. See the 5 hidden signs your best friend is actually secretly jealous of you and draining your energy.
              </p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Read The Playbook <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/love-bombing-signs" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden opacity-90">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#10B981] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <HeartCrack className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Love Bombing vs. Real Love <span className="text-sm font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full ml-2 align-middle whitespace-nowrap tracking-wide uppercase">COMING SOON</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                He says "I love you" after a week. Is he your soulmate, or is he rushing to trap you? Find out exactly how to tell the difference.
              </p>
              <div className="flex items-center text-[#10B981] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Join Waitlist <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/trauma-bonding-signs" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden opacity-90">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EAB308] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Can't I Leave? <span className="text-sm font-bold text-[#EAB308] bg-[#EAB308]/10 px-3 py-1 rounded-full ml-2 align-middle whitespace-nowrap tracking-wide uppercase">COMING SOON</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                You know he is bad for you, but you stay. Discover how "Trauma Bonding" literally rewires your brain, and the exact steps to break the addiction.
              </p>
              <div className="flex items-center text-[#EAB308] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Join Waitlist <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
