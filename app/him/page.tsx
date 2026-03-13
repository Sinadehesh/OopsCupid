import Link from "next/link";
import { Search, Ghost, Flame, UserCheck, MessageCircle, ArrowRight } from "lucide-react";

export const metadata = { title: "The Him Hub | OopsCupid" };

export default function HimHub() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="bg-[#EF4444] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <Search className="w-4 h-4 text-white" />
            Behavioral Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Decode his <span className="text-white/80 drop-shadow-sm">behavior.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Analyze text messages, spot clinical red flags, and determine if he is manipulative or genuine.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Link href="/is-he-manipulative" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Ghost className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Is He Manipulative?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Spot the hidden signs of coercive control.</p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Start Audit <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/is-he-gaslighting-me" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Is He Gaslighting Me?</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Determine if he is altering your reality.</p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Check Signs <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/partners-attachment-style" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <UserCheck className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">His Attachment Style</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Decode why he pulls away or gets clingy.</p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Analyze Him <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/dating-texting-analysis" className="group block h-full">
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EF4444]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-[#EF4444] rounded-2xl flex items-center justify-center mb-8 shadow-md z-10">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mb-4 z-10">Texting Analyzer AI</h2>
              <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">Let our AI analyze his actual text messages.</p>
              <div className="flex items-center text-[#EF4444] font-extrabold z-10 mt-auto uppercase text-sm tracking-wide">
                Upload Texts <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
