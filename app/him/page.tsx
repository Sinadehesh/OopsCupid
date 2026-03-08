import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Him | OopsCupid",
  description: "Decode his behavior, spot the red flags, and understand exactly what is going on in his head with our psychology-backed tools.",
};

export default function HimHubPage() {
  return (
    <main className="bg-gradient-to-b from-[#fdffff] to-[#f9f4f4] min-h-screen py-24 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        
        {/* Hub Header with the dark, intense aesthetic */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <span className="text-[#b10f2e] font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-sm">
            Partner Analysis Hub
          </span>
          <h1 className="text-[42px] md:text-[56px] font-extrabold text-[#280000] mb-6 leading-tight">
            Decode His <span className="text-[#b10f2e] font-serif italic">Behavior</span>
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium leading-relaxed text-[#570000]/80">
            Stop guessing. Use our clinical-grade tools to analyze his texts, spot the hidden red flags, and understand exactly what he's really thinking.
          </p>
        </div>
        
        {/* Grid of 7 Quiz/Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card 
            variant="quiz"
            title="What Is His Attachment Style? Partner Test"
            href="/partners-attachment-style"
            accentColor="bg-[#de7c5a]/20"
          />
          
          <Card 
            variant="quiz"
            title="Is He Manipulative? Spot the Hidden Signs"
            href="/is-he-manipulative"
            accentColor="bg-[#b10f2e]/10"
          />
          
          <Card 
            variant="quiz"
            title="Is He Emotionally Unavailable?"
            href="/emotionally-unavailable-test"
            accentColor="bg-[#570000]/10"
          />
          
          <Card 
            variant="quiz"
            title="Is He Gaslighting Me? 9 Warning Signs"
            href="/is-he-gaslighting-me"
            accentColor="bg-[#b10f2e]/15"
          />
          
          <Card 
            variant="quiz"
            title="Am I Dating a Covert Narcissist?"
            href="/dating-a-narcissist-test"
            accentColor="bg-[#280000]/5"
          />
          
          <Card 
            variant="quiz"
            title="Is He Cheating? The Micro-Cheating Test"
            href="/is-he-cheating"
            accentColor="bg-[#de7c5a]/30"
          />

          {/* Featured 7th Card - Centered and wider */}
          <div className="md:col-span-1 md:col-start-1 md:col-end-3 lg:col-span-3 lg:w-2/3 mx-auto w-full mt-4">
              <Card 
                variant="tool"
                title="Chat Analyzer: Decode What He Actually Means"
                description="Paste his confusing texts here. Our AI will break down his interest level, red flags, and hidden intentions in plain English."
                buttonText="Analyze His Texts →"
                href="/chat-analyzer"
                accentColor="bg-gradient-to-r from-[#b10f2e]/10 to-[#de7c5a]/20 border border-[#b10f2e]/20"
              />
          </div>

        </div>

      </div>
    </main>
  );
}
