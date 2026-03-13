import Link from "next/link";
import { Users, ShieldAlert, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Friendship Analysis Tools | OopsCupid",
  description: "Understand your friend group dynamics, spot toxic traits, and figure out your role.",
};

export default function FriendsHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* HAPPY & VIBRANT HERO SECTION */}
      <section className="bg-[#FFB400] text-[#0D2C54] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0D2C54] via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-[#0D2C54]/10 shadow-sm uppercase">
            <Users className="w-4 h-4 text-[#0D2C54]" />
            Friendship Dynamics
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Who is in your <span className="text-white drop-shadow-sm">circle?</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            From uncovering your hidden group role to detecting toxic patterns, analyze the people you spend the most time with.
          </p>
        </div>
      </section>

      {/* 3-CARD GRID SECTION */}
      <section className="py-20 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Friend Group Role (The New Tool) */}
          <Link href="/friend-group-role" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A6ED]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#00A6ED] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                What Role Do You Play?
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Are you the Leader, the Therapist, or the Peacekeeper? Take our 120-item assessment to find out your exact archetype.
              </p>
              
              <div className="flex items-center text-[#00A6ED] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Take the Test <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: Toxic Friend Test (Existing Tool) */}
          <Link href="/toxic-friend-test" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF495C]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#FF495C] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                Is My Friend Toxic?
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Analyze their behavior to see if your friendship is emotionally draining, one-sided, or actively harmful to your mental health.
              </p>
              
              <div className="flex items-center text-[#FF495C] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Scan Behavior <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 3: Are My Friends Bad For Me (Existing Tool) */}
          <Link href="/are-my-friends-bad-for-me" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#43B929]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#43B929] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <HeartHandshake className="w-7 h-7 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                Are They Bad For Me? <span className="text-sm font-bold opacity-60 tracking-normal align-middle whitespace-nowrap">(Coming Soon)</span>
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Evaluate your entire friend group's influence. Are they helping you grow, or are they subtly holding you back?
              </p>
              
              <div className="flex items-center text-[#43B929] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Start Evaluation <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 4: Are Your Friends Using You (The New Tool) */}
          <Link href="/are-your-friends-using-you" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#10b981] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <span className="text-2xl">⚖️</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                Are They Using You?
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Run a 108-point transactional audit on your circle. Measure emotional labor, financial drain, and reciprocity imbalances.
              </p>
              
              <div className="flex items-center text-[#10b981] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Start Audit <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
  

        </div>
      </section>
    </main>
  );
}
