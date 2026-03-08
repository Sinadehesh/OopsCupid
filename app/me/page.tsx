import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Assessments | OopsCupid",
  description: "Browse your collection of 7 free, psychology-backed relationship quizzes. Spot red flags, discover your attachment style, and decode mixed signals.",
};

export default function MeHubPage() {
  return (
    <main className="bg-gradient-to-b from-[#f7ede2] to-white min-h-screen py-24 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        
        {/* Hub Header with new aesthetic */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <span className="text-[#84a59d] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            Self-Discovery Hub
          </span>
          <h1 className="text-[42px] md:text-[56px] font-extrabold text-[#334B63] mb-6 leading-tight">
            Find Your <span className="text-[#f28482] font-serif italic">Answers</span>
          </h1>
          <p className="text-[20px] md:text-[24px] font-normal leading-relaxed text-[#5E6E79]">
            Seven clinical-grade assessments to decode your patterns, spot the red flags, and understand why you love the way you do.
          </p>
        </div>
        
        {/* Grid of 7 Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card 
            variant="quiz"
            title="What Is My Attachment Style? Clinical Test"
            href="/attachment-style-quiz"
            accentColor="bg-[#f5cac3]/60"
          />
          
          <Card 
            variant="quiz"
            title="Is He Manipulative? Spot the Hidden Signs"
            href="/is-he-manipulative"
            accentColor="bg-[#84a59d]/20"
          />
          
          <Card 
            variant="quiz"
            title="Is My Friend Toxic? Friendship Analysis"
            href="/toxic-friend-test"
            accentColor="bg-[#f6bd60]/25"
          />
          
          <Card 
            variant="quiz"
            title="Why Do I Keep Attracting the Same Type?"
            href="/attraction-patterns"
            accentColor="bg-[#f28482]/15"
          />
          
          <Card 
            variant="quiz"
            title="Is He Gaslighting Me? 9 Warning Signs"
            href="/is-he-gaslighting-me"
            accentColor="bg-[#84a59d]/30"
          />
          
          <Card 
            variant="quiz"
            title="Why Do I Sabotage My Relationships?"
            href="/why-do-i-sabotage-relationships"
            accentColor="bg-[#f6bd60]/40"
          />

          {/* Featured 7th Card - Centered and wider */}
          <div className="md:col-span-1 md:col-start-1 md:col-end-3 lg:col-span-3 lg:w-2/3 mx-auto w-full mt-4">
              <Card 
                variant="quiz"
                title="Is He Cheating? The Micro-Cheating Test"
                href="/is-he-cheating"
                accentColor="bg-gradient-to-r from-[#f5cac3]/70 to-[#f28482]/25"
              />
          </div>

        </div>

      </div>
    </main>
  );
}
