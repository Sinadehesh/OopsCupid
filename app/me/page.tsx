import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Assessments | OopsCupid",
  description: "Browse your collection of free, psychology-backed relationship quizzes. Spot red flags, discover your attachment style, and decode mixed signals.",
};

export default function MeHubPage() {
  return (
    <main className="bg-gradient-to-b from-[#0496ff]/5 to-white min-h-screen py-24 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        
        {/* Hub Header with new vibrant aesthetic */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <span className="text-[#8f2d56] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            Self-Discovery Hub
          </span>
          <h1 className="text-[42px] md:text-[56px] font-extrabold text-[#006ba6] mb-6 leading-tight">
            Find Your <span className="text-[#d81159] font-serif italic">Answers</span>
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium leading-relaxed text-[#334B63]/80">
            Seven clinical-grade assessments to decode your patterns, spot the red flags, and understand why you love the way you do.
          </p>
        </div>
        
        {/* Grid of 7 Quiz Cards with Expressive Human Portraits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card 
            variant="quiz"
            title="What Is My Attachment Style? Clinical Test"
            href="/attachment-style-quiz"
            imageUrl="https://images.unsplash.com/photo-1516575334481-ba558110b9af?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-[#0496ff]/20"
            textColor="text-[#006ba6]"
          />
          
          <Card 
            variant="quiz"
            title="Is He Manipulative? Spot the Hidden Signs"
            href="/is-he-manipulative"
            imageUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-[#d81159]/15"
            textColor="text-[#8f2d56]"
          />
          
          <Card 
            variant="quiz"
            title="Is My Friend Toxic? Friendship Analysis"
            href="/toxic-friend-test"
            imageUrl="https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-[#ffbc42]/30"
            textColor="text-[#006ba6]"
          />
          
          <Card 
            variant="quiz"
            title="Who Am I Attracted To? Discover Your Magnet"
            href="/attraction-patterns"
            imageUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-[#8f2d56]/15"
            textColor="text-[#8f2d56]"
          />
          
          <Card 
            variant="quiz"
            title="Who Finds Me Attractive? The Psychology"
            href="/who-is-attracted-to-me"
            imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-[#006ba6]/15"
            textColor="text-[#006ba6]"
          />
          
          <Card 
            variant="quiz"
            title="Why Do I Sabotage My Relationships?"
            href="/why-do-i-sabotage-relationships"
            imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
            accentColor="bg-[#d81159]/10"
            textColor="text-[#d81159]"
          />

          {/* Featured 7th Card - Centered and wider */}
          <div className="md:col-span-1 md:col-start-1 md:col-end-3 lg:col-span-3 lg:w-2/3 mx-auto w-full mt-4">
              <Card 
                variant="quiz"
                title="Is He Cheating? The Micro-Cheating Test"
                href="/is-he-cheating"
                imageUrl="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80"
                accentColor="bg-gradient-to-r from-[#0496ff]/10 to-[#ffbc42]/20"
                textColor="text-[#8f2d56]"
              />
          </div>

        </div>

      </div>
    </main>
  );
}
