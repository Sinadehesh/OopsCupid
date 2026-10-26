import Link from "next/link";
import { Users, ShieldAlert, Sparkles, ArrowRight, HeartHandshake } from "lucide-react";

export const metadata = {
  alternates: { canonical: "https://www.oopscupid.com/friends" },
  title: "Spot Fake Friends | OopsCupid",
  description: "Explore free friendship tests for toxic behaviour, one-sided relationships, and boundaries, with question counts and time estimates shown before you start.",
};

export default function FriendsHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* HERO SECTION: The Dream Outcome */}
      <section className="bg-[#FFB400] text-[#0D2C54] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0D2C54] via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-[#0D2C54]/10 shadow-sm uppercase">
            <Users className="w-4 h-4 text-[#0D2C54]" />
            Friendship Audits
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Stop Being <span className="text-white drop-shadow-sm">Used.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Start with a 30-second quick test or choose a deeper friendship assessment. Every result appears on screen, with no sign-up required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
            <Link
              href="/are-you-the-therapist-friend"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0D2C54] px-6 py-4 text-white font-extrabold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Try the 30-second quick test <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/is-my-friend-a-pick-me"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#0D2C54]/25 bg-white/25 px-6 py-4 font-extrabold transition-colors hover:bg-white/40"
            >
              Play the pick-me friend quiz
            </Link>
          </div>
        </div>
      </section>

      {/* THE PAIN SECTION: Running from Hell */}
      <section className="pt-16 pb-8 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2C54] mb-4">
          Are You The "Backup" Friend?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
          You listen to their problems for hours, but when you need them, they are "too busy." They only text you when they need a favor. Stop pouring into cups that do not pour back. Get the truth today.
        </p>
      </section>

      {/* CARDS SECTION: The Solution (No Effort) */}
      <section className="py-12 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/friend-group-role" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A6ED]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#00A6ED] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                Am I Always The Therapist?
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Do people dump their trauma on you and leave? Find out why you play this role and exactly how to set boundaries fast.
              </p>
              
              <div className="flex items-center text-[#00A6ED] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Get Instant Answers <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

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
                Stop making excuses for them. Let our smart tool scan their habits and give you cold, hard facts on whether you should walk away.
              </p>
              
              <div className="flex items-center text-[#FF495C] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Scan Their Behavior <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/are-my-friends-bad-for-me" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden opacity-90">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#43B929]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#43B929] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <HeartHandshake className="w-7 h-7 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                Are They Dragging Me Down?
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Do you feel exhausted after hanging out? Find out if your circle is holding you back from your true potential.
              </p>
              
              <div className="flex items-center text-[#43B929] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Take The Free Assessment <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/are-your-friends-using-you" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="w-14 h-14 bg-[#10b981] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <span className="text-2xl">⚖️</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">
                Are They Using Me?
              </h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Do they only care when you pay or do favors? Get a brutal reality check and the exact copy-paste texts to safely say "no".
              </p>
              
              <div className="flex items-center text-[#10b981] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Spot Fake Friends <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
  
        </div>
      </section>
    </main>
  );
}
