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
        headline="Clarity for the relationships confusing you."
        subheadline="Use our validated quizzes, AI analyzers, and expert guides to decode red flags, mixed signals, and recurring attraction patterns."
      >
        <CTA text="Try Chat Analyzer" href="/chat-analyzer" variant="primary" />
        <CTA text="Take a Quiz" href="#categories" variant="secondary" />
      </Hero>

      {/* Trust Stats / Credibility (Inspired by Gottman Image 1) */}
      <div className="bg-background-secondary py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border text-center">
              <span className="block text-4xl font-bold text-primary-base mb-2 italic font-serif">10k+</span>
              <span className="block text-xl font-bold text-foreground mb-1">Conversations analyzed</span>
              <p className="text-sm text-foreground-muted">Empowered by our Chat Analyzer AI</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border text-center">
              <span className="block text-4xl font-bold text-foreground mb-2 italic font-serif">#1</span>
              <span className="block text-xl font-bold text-foreground mb-1">Red Flag Detection</span>
              <p className="text-sm text-foreground-muted">Recognized for psychological clarity</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border text-center">
              <span className="block text-4xl font-bold text-primary-base mb-2 italic font-serif">50k+</span>
              <span className="block text-xl font-bold text-foreground mb-1">Quizzes Taken</span>
              <p className="text-sm text-foreground-muted">Helping users find their breakthrough</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Category Grid (Inspired by Gottman Image 3) */}
      <section className="py-24 bg-background" id="categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-foreground-secondary mb-2">How can we help you find clarity?</h2>
            <h3 className="text-5xl font-bold text-foreground font-serif italic">Explore Our Hubs</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1: Red Flags */}
            <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-border group cursor-pointer transition-smooth hover:shadow-lg">
              <div className="h-48 bg-[#F8E9E4] flex items-center justify-center p-8 transition-smooth group-hover:bg-[#F2D7D0]">
                <FlagTriangleRight className="w-16 h-16 text-primary-base opacity-40" />
              </div>
              <div className="p-8 pb-10 flex-grow border-t-8 border-[#E58F7A] bg-[#F8E9E4]/20">
                <h4 className="text-3xl font-bold text-foreground mb-4">Red Flags</h4>
                <p className="text-foreground-secondary mb-6 text-sm font-semibold leading-relaxed">
                  Are you overthinking, or is something actually wrong? Spot warning signs early.
                </p>
                <ul className="space-y-3 mb-8">
                  <li><Link href="/is-he-cheating" className="text-sm font-bold text-foreground/70 hover:text-primary-base flex items-center gap-2 group/link">Is He Cheating? <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/red-flags-in-a-relationship" className="text-sm font-bold text-foreground/70 hover:text-primary-base flex items-center gap-2 group/link">General Red Flags <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/is-he-gaslighting-me" className="text-sm font-bold text-foreground/70 hover:text-primary-base flex items-center gap-2 group/link">Gaslighting Test <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                </ul>
              </div>
            </div>

            {/* Category 2: Text Analysis */}
            <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-border group cursor-pointer transition-smooth hover:shadow-lg">
              <div className="h-48 bg-[#E6EBEE] flex items-center justify-center p-8 transition-smooth group-hover:bg-[#D9E1E6]">
                <MessageSquareText className="w-16 h-16 text-secondary-base opacity-40" />
              </div>
              <div className="p-8 pb-10 flex-grow border-t-8 border-[#48627A] bg-[#E6EBEE]/20">
                <h4 className="text-3xl font-bold text-foreground mb-4">Text Analysis</h4>
                <p className="text-foreground-secondary mb-6 text-sm font-semibold leading-relaxed">
                  Decode the mixed signals and figure out what their messages actually mean.
                </p>
                <ul className="space-y-3 mb-8">
                  <li><Link href="/chat-analyzer" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Chat Analyzer Tool <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/dating-profile-analyzer" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Profile Analyzer <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/dating-texting-analysis#why-disappear" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Why They Disappear <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                </ul>
              </div>
            </div>

            {/* Category 3: Friendships */}
            <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-border group cursor-pointer transition-smooth hover:shadow-lg">
              <div className="h-48 bg-[#EDF3F1] flex items-center justify-center p-8 transition-smooth group-hover:bg-[#E1ECE8]">
                <Ghost className="w-16 h-16 text-[#A7C9C1] opacity-40" />
              </div>
              <div className="p-8 pb-10 flex-grow border-t-8 border-[#A7C9C1] bg-[#EDF3F1]/20">
                <h4 className="text-3xl font-bold text-foreground mb-4">Friendships</h4>
                <p className="text-foreground-secondary mb-6 text-sm font-semibold leading-relaxed">
                   Identify one-sided, jealous, and draining friends before they drain your energy.
                </p>
                <ul className="space-y-3 mb-8">
                  <li><Link href="/toxic-friend-test" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Toxic Friend Test <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/is-my-best-friend-toxic" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Is She Toxic? <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/are-my-friends-bad-for-me" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Friend Audit <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                </ul>
              </div>
            </div>

            {/* Category 4: Patterns */}
            <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-border group cursor-pointer transition-smooth hover:shadow-lg">
              <div className="h-48 bg-[#F5F2EC] flex items-center justify-center p-8 transition-smooth group-hover:bg-[#EDE8E0]">
                <Magnet className="w-16 h-16 text-[#E8D7A4] opacity-40" />
              </div>
              <div className="p-8 pb-10 flex-grow border-t-8 border-[#E8D7A4] bg-[#F5F2EC]/20">
                <h4 className="text-3xl font-bold text-foreground mb-4">Patterns</h4>
                <p className="text-foreground-secondary mb-6 text-sm font-semibold leading-relaxed">
                   Uncover your subconscious dating choices and break the cycle once and for all.
                </p>
                <ul className="space-y-3 mb-8">
                  <li><Link href="/why-do-i-attract-toxic-people" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Why My Type? <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/why-do-i-sabotage-relationships" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Sabotage Audit <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                  <li><Link href="/what-kind-of-person-do-i-attract" className="text-sm font-bold text-foreground/70 hover:text-secondary-base flex items-center gap-2 group/link">Attraction Pattern <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" /></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools (Inspired by Gottman Image 2) */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
                <div className="aspect-video bg-background-secondary rounded-lg border border-border flex items-center justify-center relative group overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-secondary-base/5 animate-pulse"></div>
                    <div className="bg-white rounded-full p-6 shadow-xl relative z-10 transition-smooth group-hover:scale-110">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-secondary-base">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-bold text-foreground font-serif italic mb-6">We KNOW Relationships</h2>
              <h3 className="text-2xl font-bold text-foreground-secondary mb-6 leading-tight">Proven Methods to build stronger, lasting connections</h3>
              <p className="text-lg text-foreground-secondary mb-10 leading-relaxed">
                OopsCupid transforms your relationship confusion into clarity with science-backed analyzers. Whether you're decoding mixed signals in a new match or auditing long-term patterns, we guide you every step of the way with objective insight.
              </p>
              <CTA text="Try Chat Analyzer" href="/chat-analyzer" variant="primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview (Inspired by Gottman Image 5) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-foreground font-serif italic mb-4">Best of the Blog</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col">
              <div className="aspect-[4/3] bg-background-secondary rounded-lg border border-border mb-8 overflow-hidden">
                <div className="w-full h-full bg-secondary-base/5 flex items-center justify-center italic text-foreground-muted">Featured Image Placeholder</div>
              </div>
              <h4 className="text-3xl font-bold text-foreground font-serif mb-4 hover:text-primary-base transition-colors cursor-pointer leading-tight">
                The Four Falsehoods: Why We Lie to Ourselves About Red Flags
              </h4>
              <p className="text-lg text-foreground-secondary mb-6 leading-relaxed">
                Breaking down the psychological barriers that keep us anchored to people who aren't good for us. Understanding 'Cognitive Dissonance' in dating.
              </p>
              <Link href="/gaslighting-signs" className="text-primary-base font-bold underline underline-offset-4 decoration-2 hover:text-primary-hover">Read More</Link>
            </div>

            <div className="space-y-12">
              <div className="border-b border-border pb-8 last:border-0 hover:translate-x-1 transition-smooth cursor-pointer group">
                <h5 className="text-2xl font-bold text-foreground font-serif mb-2 group-hover:text-primary-base">10 Ways to Recognize Breadcrumbing Instantly</h5>
                <p className="text-foreground-secondary mb-4 italic">Spotting the crumbs before you get hungry for interaction.</p>
                <span className="text-sm font-bold text-primary-base/60 uppercase tracking-widest">Read More</span>
              </div>
              <div className="border-b border-border pb-8 last:border-0 hover:translate-x-1 transition-smooth cursor-pointer group">
                <h5 className="text-2xl font-bold text-foreground font-serif mb-2 group-hover:text-primary-base">How to Listen Without Getting Defensive</h5>
                <p className="text-foreground-secondary mb-4 italic">A guide to productive conflict in early dating phases.</p>
                <span className="text-sm font-bold text-primary-base/60 uppercase tracking-widest">Read More</span>
              </div>
              <div className="border-b border-border pb-8 last:border-0 hover:translate-x-1 transition-smooth cursor-pointer group">
                <h5 className="text-2xl font-bold text-foreground font-serif mb-2 group-hover:text-primary-base">Why I Stopped Trying to Control My Partner</h5>
                <p className="text-foreground-secondary mb-4 italic">Taking responsibility for your own emotional security.</p>
                <span className="text-sm font-bold text-primary-base/60 uppercase tracking-widest">Read More</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Band (Inspired by Gottman Image 4) */}
      <section className="bg-secondary-base py-20 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[#334B63]/20 mix-blend-multiply italic font-serif flex items-center justify-center text-[20vw] opacity-10 select-none pointer-events-none">Oops</div>
         <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-3/5">
              <h2 className="text-5xl font-bold mb-6 italic font-serif leading-tight">
                Improve your Relationship Skills <br />
                with our <span className="text-primary-base">Free Newsletters</span>
              </h2>
            </div>
            <div className="lg:w-2/5 w-full max-w-md">
              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-white/80">Email <span className="text-primary-base">*</span></label>
                <input 
                  type="email" 
                  id="email"
                  className="bg-white text-foreground px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base" 
                />
                <button className="bg-primary-base text-white px-8 py-4 rounded-md font-bold text-xl hover:bg-primary-hover transition-smooth shadow-lg">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
