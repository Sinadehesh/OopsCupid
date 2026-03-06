import MainHero from "@/components/ui/MainHero";
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
      <MainHero
        topSubheading="Psychological Clarity & Tools"
        headline="Clarity for your relationships."
        question="How can we help you find the tools or insight you need?"
      />

      <section className="container mx-auto px-4 -mt-32 mb-32 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px]">
            <Card 
              title="Red Flags" 
              description="Are you overthinking, or is something actually wrong?" 
              href="/relationship-red-flags"
              accentColor="bg-[#FFB8A1]"
              textColor="text-black"
              imageUrl="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600&auto=format&fit=crop"
            />
            <Card 
              title="Mixed Signals" 
              description="Decode the hidden meanings behind the silence." 
              href="/dating-texting-analysis"
              accentColor="bg-[#A8D8CD]"
              textColor="text-black"
              imageUrl="https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=600&auto=format&fit=crop"
            />
            <Card 
              title="Friendships" 
              description="Identify one-sided and draining connections today." 
              href="/toxic-friendships"
              accentColor="bg-[#FDE6A5]"
              textColor="text-black"
              imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop"
            />
            <Card 
              title="Patterns" 
              description="Uncover your subconscious dating choices." 
              href="/attraction-patterns"
              accentColor="bg-[#405466]"
              textColor="text-white"
              imageUrl="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=600&auto=format&fit=crop"
            />
        </div>
      </section>

      {/* Other sections can go here, but focusing on the requested hero and feature section */}
      
      {/* Newsletter Band */}
      <section className="bg-[#334756] py-24 text-white">
         <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-3/5">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Improve your Relationship Skills <br />
                with our newsletter.
              </h2>
            </div>
            <div className="lg:w-2/5 w-full max-w-md">
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="Your Email Address"
                  className="bg-white text-black px-6 py-4 rounded-full focus:outline-none" 
                />
                <button className="bg-[#FFB8A1] text-black px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
