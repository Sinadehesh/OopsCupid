import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OopsCupid | Spot Red Flags & Analyze Your Dating Patterns",
  description: "Stop wondering why they disappeared. Spot relationship red flags, analyze texts, identify toxic friendships, and understand your attraction patterns with OopsCupid.",
};

export default function Home() {
  return (
    <>
      <Hero
        badge="New: Chat Analyzer Tool"
        headline="Stop Gaslighting Yourself."
        subheadline="We analyze the texts, spot the red flags, and decode the patterns so you don't have to."
      >
        <CTA text="Try Chat Analyzer" href="/chat-analyzer" variant="primary" />
        <CTA text="Take a Quiz" href="#hubs" variant="outline" />
      </Hero>

      <div className="container mx-auto px-4 py-16" id="hubs">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What&apos;s on your mind?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Choose a topic to dive into our deep-dive articles and psychological tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Hub 1: Relationship Red Flags */}
          <div className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              <Link href="/relationship-red-flags" className="hover:text-primary-600 transition-colors">
                Relationship Red Flags
              </Link>
            </h3>
            <p className="text-foreground/70 mb-6">Are you just overthinking, or is something actually wrong? Learn to spot the signs early.</p>
            <div className="space-y-3">
              <Link href="/is-he-cheating" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Is He Cheating?</Link>
              <Link href="/red-flags-in-a-relationship" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Red Flags in a Relationship</Link>
              <Link href="/is-he-gaslighting-me" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Is He Gaslighting Me?</Link>
              <Link href="/is-he-manipulative" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Is He Manipulative?</Link>
            </div>
          </div>

          {/* Hub 2: Dating & Texting Analysis */}
          <div className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              <Link href="/dating-texting-analysis" className="hover:text-primary-600 transition-colors">
                Dating & Texting Analysis
              </Link>
            </h3>
            <p className="text-foreground/70 mb-6">Decode the mixed signals. Let&apos;s figure out what they actually mean when they text you that.</p>
            <div className="space-y-3">
              <Link href="/chat-analyzer" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Chat Analyzer [Tool]</Link>
              <Link href="/dating-profile-analyzer" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Dating Profile Analyzer [Tool]</Link>
              <Link href="/dating-texting-analysis#why-disappear" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Why Does He Text Me Then Disappear?</Link>
              <Link href="/dating-texting-analysis#breadcrumbing" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Is He Breadcrumbing Me?</Link>
            </div>
          </div>

          {/* Hub 3: Toxic Friendships */}
          <div className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              <Link href="/toxic-friendships" className="hover:text-primary-600 transition-colors">
                Toxic Friendships
              </Link>
            </h3>
            <p className="text-foreground/70 mb-6">Because sometimes the heartbreak isn&apos;t from a partner. Identify one-sided and draining friendships.</p>
            <div className="space-y-3">
              <Link href="/toxic-friend-test" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Toxic Friend Test</Link>
              <Link href="/is-my-best-friend-toxic" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Is My Best Friend Toxic?</Link>
              <Link href="/are-my-friends-bad-for-me" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Are My Friends Bad for Me?</Link>
              <Link href="/toxic-friendships#jealousy" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Signs Your Friend Is Jealous of You</Link>
            </div>
          </div>

          {/* Hub 4: Attraction Patterns */}
          <div className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              <Link href="/attraction-patterns" className="hover:text-primary-600 transition-colors">
                Attraction Patterns
              </Link>
            </h3>
            <p className="text-foreground/70 mb-6">Why does history keep repeating itself? Understand your subconscious dating choices.</p>
            <div className="space-y-3">
              <Link href="/why-do-i-attract-toxic-people" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Why Do I Attract Toxic People?</Link>
              <Link href="/why-do-i-sabotage-relationships" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Why Do I Sabotage Relationships?</Link>
              <Link href="/what-kind-of-person-do-i-attract" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; What Kind of Person Do I Attract?</Link>
              <Link href="/why-do-i-keep-dating-the-same-type" className="block text-primary-700 hover:text-primary-500 font-medium font-sm">&rarr; Why Do I Keep Dating the Same Type?</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-surface py-20 border-t border-border mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                How OopsCupid Works
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                We blend cheeky humor with real psychological frameworks. Instead of overthinking your relationships in isolation, use our tools and quizzes to get objective clarity. Stop writing paragraphs to your group chat—let our analysis tools do the heavy lifting.
              </p>
              <CTA text="Start Analyzing" href="/chat-analyzer" variant="secondary" />
            </div>
            <div className="flex-1 grid grid-cols-1 gap-4 w-full">
               <Card 
                  title="Chat Analyzer" 
                  description="Paste those confusing mixed-signal texts and let our AI decode what they actually mean." 
                  href="/chat-analyzer"
                  category="AI Tool"
                />
                <Card 
                  title="Dating Profile Analyzer" 
                  description="Optimize your hinge or tinder profile to attract who you actually want, not who you usually get." 
                  href="/dating-profile-analyzer"
                  category="AI Tool"
                />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
