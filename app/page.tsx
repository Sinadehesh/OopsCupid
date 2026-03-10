import MainHero from "@/components/ui/MainHero";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
  description: "Not sure if he likes you or just likes the attention? OopsCupid helps women spot relationship red flags, decode mixed signals, analyze texts, and understand toxic patterns with free quizzes and tools.",
};

export default function Home() {
  return (
    <main>
      <MainHero />

      {/* SECTION 3 — WHAT IS OOPSCUPID (Cream Background) */}
      <section className="bg-[#FFF1D0] py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-12 text-center md:text-left">
            Free Relationship Clarity Tools & Quizzes
          </h2>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            <div className="flex-1">
              <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#086788]/80 mb-10 max-w-2xl">
                OopsCupid is a free relationship analysis platform for women 
                who want real answers — not vague advice. Use our quizzes to 
                spot relationship red flags, decode mixed signals, and understand 
                toxic patterns. No sign-up required to start.
              </p>
              <Link href="/quizzes" className="inline-block bg-[#DD1C1A] text-white rounded-full px-8 py-4 text-[18px] font-bold hover:bg-[#b81715] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Take a Free Quiz →
              </Link>
            </div>
            <div className="flex-1 w-full">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <span className="text-[18px] font-bold text-[#086788]">Free quizzes for red flags, friendships, and dating patterns</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <span className="text-[18px] font-bold text-[#086788]">AI-powered chat and profile analyzers</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <span className="text-[18px] font-bold text-[#086788]">Psychology-backed guides written for real situations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED TOOLS (White Background) */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-12 text-center">
            Relationship Analysis Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="tool" title="Chat Analyzer — Decode What He Actually Means" description="Paste any conversation and get a psychology-backed breakdown of his texting behavior, interest level, and red flags — in plain English." href="/tools/chat-analyzer" buttonText="Try Chat Analyzer" />
            <Card variant="tool" title="Dating Profile Analyzer — See Red Flags Before the First Date" description="Share his profile and get a clear read on what his bio, word choices, and photos are really signaling before you swipe right." href="/tools/profile-analyzer" buttonText="Try Profile Analyzer" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — QUIZZES (Soft Cream Background) */}
      <section className="bg-[#FFF1D0]/60 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
              Free Relationship Quizzes
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#086788]/80">
              Answer a few questions and get a real, honest read on your situation. No sign-up. No fluff.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="quiz" title="What Is My Attachment Style? Free Test" href="/attachment-style-quiz" accentColor="bg-[#F0C808]/30" />
            <Card variant="quiz" title="Is My Friend Toxic? Free Friendship Quiz" href="/toxic-friend-test" accentColor="bg-[#06AED5]/20" />
            <Card variant="quiz" title="Why Do I Keep Attracting the Same Type?" href="/attraction-patterns" accentColor="bg-[#DD1C1A]/20" />
          </div>
          
          <div className="text-center">
            <Link href="/quizzes" className="text-[18px] text-[#06AED5] hover:text-[#086788] hover:underline underline-offset-4 font-bold transition-colors">
              See all free quizzes →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROOF (White Background) */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-16 text-center">
            Why Women Use OopsCupid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="proof" title="Stop Replaying the Conversation" description="Get a clear answer in minutes instead of analyzing the same text for three days." />
            <Card variant="proof" title="Know Before You're in Too Deep" description="Spot the warning signs early — not after six months of confusion and wasted energy." />
            <Card variant="proof" title="Understand the Pattern" description="Find out why you keep ending up here, so next time looks completely different." />
          </div>
        </div>
      </section>

      {/* SECTION 7 — ARTICLES (Soft Cream Background) */}
      <section className="bg-[#FFF1D0]/60 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
              Relationship Red Flags & Guides
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#086788]/80">
              Psychology-backed articles written for real, messy, confusing situations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="article" tag="Red Flags" title="Is He Gaslighting Me? 9 Signs You're Not Imagining It" href="/is-he-gaslighting-me" />
            <Card variant="article" tag="Attachment Styles" title="The 4 Adult Attachment Styles Explained" href="/understanding-attachment-styles" />
            <Card variant="article" tag="Toxic Friendships" title="Signs Your Best Friend Is Secretly Jealous of You" href="/signs-of-a-toxic-friend" />
          </div>

          <div className="text-center">
            <Link href="/articles" className="text-[18px] text-[#06AED5] hover:text-[#086788] hover:underline underline-offset-4 font-bold transition-colors">
              Read all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — NEWSLETTER (Deep Teal Background) */}
      <section className="bg-[#086788] py-24 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-[36px] md:text-[46px] font-extrabold mb-6 leading-tight text-white">
                Get Relationship Clarity in Your Inbox
              </h2>
              <p className="text-[18px] md:text-[20px] font-medium text-[#FFF1D0] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Free quizzes, red flag breakdowns, texting psychology, 
                and pattern analysis delivered weekly. No spam. Unsubscribe any time.
              </p>
            </div>

            <div className="lg:w-1/2 w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="w-full bg-white text-[#086788] px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-[#06AED5]/50 text-[18px] font-medium placeholder:text-[#086788]/40"
                  required
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#F0C808] text-[#086788] px-8 py-4 rounded-full font-extrabold text-[18px] hover:bg-[#e5be00] transition-colors whitespace-nowrap shadow-lg"
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
