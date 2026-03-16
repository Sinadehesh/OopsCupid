import Link from "next/link";
import { Search, Ghost, Flame, UserCheck, MessageCircle, ArrowRight, Eye } from "lucide-react";

export const metadata = { title: "Decode His Behavior | OopsCupid" };

export default function HimHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* HERO SECTION: The Dream Outcome */}
      <section className="bg-[#EF4444] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <Search className="w-4 h-4 text-white" />
            Instant Truth Scanners
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Stop Guessing <span className="text-[#FDE047] drop-shadow-sm">What He Means.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Take a 3-minute test. Find out if he is genuine, playing games, or just wasting your time. Get instant answers and exact texts to take your power back.
          </p>
        </div>
      </section>

      {/* THE PAIN SECTION: Running from Hell */}
      <section className="pt-16 pb-8 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2C54] mb-4">
          Is He Driving You Crazy?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
          He reads your text but does not reply. When you ask if something is wrong, he says "I am just tired." Stop letting him spin the story. Pick a tool below to expose the truth today.
        </p>
      </section>

      {/* CARDS SECTION: The Solution (No Effort) */}
      <section className="py-12 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/is-he-manipulative" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Ghost className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Is He Playing Mind Games?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Stop making excuses for bad behavior. Find out exactly how he is using you, and get the text scripts to shut it down fast.
              </p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Expose His Games <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/is-he-gaslighting-me" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden opacity-90">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Is He Making You Feel Crazy? <span className="text-sm font-bold text-[#EF4444] bg-[#EF4444]/10 px-3 py-1 rounded-full ml-2 align-middle whitespace-nowrap tracking-wide">COMING SOON</span></h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Does he twist your words and play the victim? Let us show you the exact lies he uses to control the story so you can stop doubting yourself.
              </p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Join The Waitlist <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/is-he-cheating" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Is He Hiding Something?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Trust your gut. Let our smart tool scan his recent habits and tell you if you are being paranoid, or if he is actually cheating.
              </p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Find The Truth <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/partners-attachment-style" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Why Does He Pull Away?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">
                Everything is great, then he goes completely cold. Find out why he gets scared when things get serious, and exactly how to handle it.
              </p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Get Instant Answers <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/dating-texting-analysis" className="group block h-full md:col-span-2 max-w-3xl mx-auto w-full">
            <div className="bg-[#EF4444] rounded-[32px] p-8 md:p-10 shadow-[0_10px_30px_rgba(239,68,68,0.3)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.4)] transition-all duration-300 hover:-translate-y-2 h-full flex flex-col md:flex-row items-center gap-8 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-20 h-20 bg-white rounded-2xl flex flex-shrink-0 items-center justify-center shadow-lg z-10">
                <MessageCircle className="w-10 h-10 text-[#EF4444]" />
              </div>
              <div className="z-10 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-white">What Does His Text Mean? <span className="text-sm font-bold text-[#EF4444] bg-[#FDE047] px-3 py-1 rounded-full ml-2 align-middle whitespace-nowrap tracking-wide uppercase">Coming Soon</span></h2>
                <p className="text-white/90 mb-6 leading-relaxed font-medium text-lg">
                  Paste a screenshot of your chat. Our smart tool will translate his confusing texts into plain English. Never overthink a message again.
                </p>
                <div className="inline-flex items-center text-black bg-[#FDE047] px-6 py-3 rounded-full font-extrabold uppercase text-sm tracking-wide">
                  Join AI Waitlist <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
