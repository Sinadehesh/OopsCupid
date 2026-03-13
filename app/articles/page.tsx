import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import CTA from "@/components/ui/CTA";
import { BookOpen, ShieldAlert, BrainCircuit, HeartCrack } from "lucide-react";

export default function ClarityHubPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F9F4F4]">
      <MainHero
        title="The Clarity Hub"
        description="Stop guessing. Educate yourself. Read our clinical deep-dives into the science of human behavior, manipulation, and attachment."
        badge="RESOURCES & ESSAYS"
        imagePath="/images/hubs/texting.png"
        theme="amber"
      />

      <section className="w-full max-w-[1200px] px-6 py-16 md:px-10 lg:px-14 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <QuizWidget
            title="The Science of Manipulation"
            description="Deep dive into the dark psychology of coercive control and how to spot it."
            href="/articles/manipulation-science"
            timeToComplete="5 min read"
            icon={BrainCircuit}
            theme="amber"
            badge="Featured Essay"
          />
          <QuizWidget
            title="Is My Friend Toxic?"
            description="Learn the clinical signs of a one-sided, emotionally draining friendship."
            href="/articles/is-my-friend-toxic"
            timeToComplete="4 min read"
            icon={ShieldAlert}
            theme="amber"
          />
          <QuizWidget
            title="Love Bombing vs. Affection"
            description="How to tell if they are moving too fast to trap you, or just genuinely excited."
            href="/love-bombing-signs"
            timeToComplete="6 min read"
            icon={HeartCrack}
            theme="amber"
          />
          <QuizWidget
            title="Trauma Bonding Signs"
            description="Understand the biological addiction to a toxic partner and how to break it."
            href="/trauma-bonding-signs"
            timeToComplete="7 min read"
            icon={BookOpen}
            theme="amber"
          />
        </div>
      </section>

      <CTA />
    </main>
  );
}
