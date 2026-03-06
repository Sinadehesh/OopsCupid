import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import Link from "next/link";
import { Metadata } from "next";
import { FlagTriangleRight, MessageSquareText, Ghost, Magnet, ArrowRight } from "lucide-react";

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

      <div className="container mx-auto px-4 py-20" id="hubs">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            What's on your mind?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Choose a topic to dive into our deep-dive articles and psychological tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Hub 1: Relationship Red Flags */}
          <div className="group relative bg-surface backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-border hover:border-[var(--primary-base)]/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--primary-base)]/5 to-transparent rounded-t-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-14 h-14 bg-[var(--primary-base)]/10 text-[var(--primary-base)] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[var(--primary-base)]/20">
                <FlagTriangleRight className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/relationship-red-flags" className="before:absolute before:inset-0">
                  Relationship Red Flags
                </Link>
              </h3>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                Are you just overthinking, or is something actually wrong? Learn to spot the signs early before you invest too much time.
              </p>
              
              <ul className="space-y-4 relative z-10">
                <li><Link href="/is-he-cheating" className="flex items-center text-foreground hover:text-[var(--primary-hover)] font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-base)] mr-3"></span> Is He Cheating? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--primary-base)]" /></Link></li>
                <li><Link href="/red-flags-in-a-relationship" className="flex items-center text-foreground hover:text-[var(--primary-hover)] font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-base)] mr-3"></span> Red Flags in a Relationship <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--primary-base)]" /></Link></li>
                <li><Link href="/is-he-gaslighting-me" className="flex items-center text-foreground hover:text-[var(--primary-hover)] font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-base)] mr-3"></span> Is He Gaslighting Me? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--primary-base)]" /></Link></li>
              </ul>
            </div>
          </div>

          {/* Hub 2: Dating & Texting Analysis */}
          <div className="group relative bg-surface backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-border hover:border-[var(--secondary-base)]/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--secondary-base)]/5 to-transparent rounded-t-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-14 h-14 bg-[var(--secondary-base)]/10 text-[var(--secondary-base)] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[var(--secondary-base)]/20">
                <MessageSquareText className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/dating-texting-analysis" className="before:absolute before:inset-0">
                  Dating & Texting Analysis
                </Link>
              </h3>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                Decode the mixed signals. Let's figure out what they actually mean when they text you that, or why they left you on read.
              </p>
              
              <ul className="space-y-4 relative z-10">
                <li><Link href="/chat-analyzer" className="flex items-center text-foreground hover:text-[var(--secondary-hover)] font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-base)] mr-3"></span> Chat Analyzer <span className="ml-2 text-[10px] uppercase font-bold tracking-wider text-[var(--secondary-base)] bg-[var(--secondary-base)]/10 px-2 py-0.5 rounded border border-[var(--secondary-base)]/20">Tool</span> <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--secondary-base)]" /></Link></li>
                <li><Link href="/dating-profile-analyzer" className="flex items-center text-foreground hover:text-[var(--secondary-hover)] font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-base)] mr-3"></span> Profile Analyzer <span className="ml-2 text-[10px] uppercase font-bold tracking-wider text-[var(--secondary-base)] bg-[var(--secondary-base)]/10 px-2 py-0.5 rounded border border-[var(--secondary-base)]/20">Tool</span> <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--secondary-base)]" /></Link></li>
                <li><Link href="/dating-texting-analysis#why-disappear" className="flex items-center text-foreground hover:text-[var(--secondary-hover)] font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-base)] mr-3"></span> Why Do They Disappear? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--secondary-base)]" /></Link></li>
              </ul>
            </div>
          </div>

          {/* Hub 3: Toxic Friendships */}
          <div className="group relative bg-surface backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-border hover:border-foreground-muted/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface-elevated/50 to-transparent rounded-t-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-14 h-14 bg-surface-elevated text-foreground rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border">
                <Ghost className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/toxic-friendships" className="before:absolute before:inset-0">
                  Toxic Friendships
                </Link>
              </h3>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                Because sometimes the heartbreak isn't from a partner. Identify one-sided, jealous, and draining friends.
              </p>
              
              <ul className="space-y-4 relative z-10">
                <li><Link href="/toxic-friend-test" className="flex items-center text-foreground hover:text-foreground font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-foreground-muted mr-3"></span> Toxic Friend Test <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-foreground-muted" /></Link></li>
                <li><Link href="/is-my-best-friend-toxic" className="flex items-center text-foreground hover:text-foreground font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-foreground-muted mr-3"></span> Is My Best Friend Toxic? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-foreground-muted" /></Link></li>
                <li><Link href="/are-my-friends-bad-for-me" className="flex items-center text-foreground hover:text-foreground font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-foreground-muted mr-3"></span> Are My Friends Bad For Me? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-foreground-muted" /></Link></li>
              </ul>
            </div>
          </div>

          {/* Hub 4: Attraction Patterns */}
          <div className="group relative bg-surface backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-border hover:border-foreground-muted/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface-elevated/50 to-transparent rounded-t-3xl pointer-events-none" />
            
            <div className="relative">
              <div className="w-14 h-14 bg-surface-elevated text-foreground rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border">
                <Magnet className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                <Link href="/attraction-patterns" className="before:absolute before:inset-0">
                  Attraction Patterns
                </Link>
              </h3>
              <p className="text-foreground-secondary mb-8 leading-relaxed">
                Why does history keep repeating itself? Uncover your subconscious dating choices and break the loop.
              </p>
              
              <ul className="space-y-4 relative z-10">
                <li><Link href="/what-kind-of-person-do-i-attract" className="flex items-center text-foreground hover:text-foreground font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-foreground-muted mr-3"></span> What Kind of Person Do I Attract? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-foreground-muted" /></Link></li>
                <li><Link href="/why-do-i-attract-toxic-people" className="flex items-center text-foreground hover:text-foreground font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-foreground-muted mr-3"></span> Why Do I Attract Toxic People? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-foreground-muted" /></Link></li>
                <li><Link href="/why-do-i-sabotage-relationships" className="flex items-center text-foreground hover:text-foreground font-medium transition-colors group/link"><span className="w-1.5 h-1.5 rounded-full bg-foreground-muted mr-3"></span> Why Do I Sabotage Everything? <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-foreground-muted" /></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <section className="bg-surface py-24 border-t border-border mt-12 bg-gradient-to-b from-surface to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm mb-2 block">The Philosophy</span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6 sm:text-4xl">
                How OopsCupid Works
              </h2>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                We blend cheeky humor with real psychological frameworks. Instead of overthinking your relationships in isolation, use our tools and quizzes to get objective clarity. Stop writing paragraphs to your group chat—let our analysis tools do the heavy lifting.
              </p>
              <CTA text="Start Analyzing" href="/chat-analyzer" variant="secondary" />
            </div>
            <div className="flex-1 grid grid-cols-1 gap-6 w-full">
               <Card 
                  title="Chat Analyzer AI" 
                  description="Paste those confusing mixed-signal texts and let our AI decode what they actually mean." 
                  href="/chat-analyzer"
                  category="AI Tool"
                />
                <Card 
                  title="Profile Analyzer" 
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
