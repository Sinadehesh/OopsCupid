import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import CTA from "@/components/ui/CTA";
import { Magnet, Bomb, Sparkles, Heart } from "lucide-react";

export default function MeHubPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F9F4F4]">
      <MainHero
        title="The Me Hub"
        description="Focus inward. Understand your attachment style, attraction patterns, and emotional triggers to build healthier relationships."
        badge="SELF REFLECTION"
        imagePath="/images/hubs/patterns.png"
        theme="violet"
      />

      <section className="w-full max-w-[1200px] px-6 py-16 md:px-10 lg:px-14 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <QuizWidget
            title="Your Attachment Style"
            description="Discover how you securely or anxiously connect with others."
            href="/attachment-style-quiz"
            timeToComplete="4 min"
            questionCount={15}
            icon={Heart}
            theme="violet"
            badge="Psych Profile"
          />
          <QuizWidget
            title="Why Do I Attract Toxic People?"
            description="Audit the subconscious signals you are putting out to the wrong people."
            href="/why-do-i-attract-toxic-people"
            timeToComplete="3 min"
            questionCount={12}
            icon={Magnet}
            theme="violet"
          />
          <QuizWidget
            title="Attraction Patterns"
            description="Map out your exact dating history and find the common denominator."
            href="/attraction-patterns"
            timeToComplete="5 min"
            questionCount={14}
            icon={Sparkles}
            theme="violet"
          />
          <QuizWidget
            title="Why Do I Sabotage?"
            description="Understand the hidden fears making you push good partners away."
            href="/why-do-i-sabotage-relationships"
            timeToComplete="4 min"
            questionCount={12}
            icon={Bomb}
            theme="violet"
          />
        </div>
      </section>
      
      <CTA />
    </main>
  );
}
