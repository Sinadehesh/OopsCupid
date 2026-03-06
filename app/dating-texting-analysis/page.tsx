import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dating & Texting Analysis | OopsCupid",
  description: "Decode the mixed signals. Figure out what they actually mean when they text you that, and why they disappear.",
};

export default function DatingTextingHub() {
  return (
    <>
      <Hero
        headline="Dating & Texting Analysis"
        subheadline="Stop asking your group chat what 'maybe later' means. Let's decode the mixed signals objectively."
      >
        <CTA text="Try Chat Analyzer" href="/chat-analyzer" variant="primary" />
      </Hero>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">AI Analysis Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card href="/chat-analyzer" title="Chat Analyzer" description="Paste a confusing conversation and let AI read between the lines." category="AI Tool" />
          <Card href="/dating-profile-analyzer" title="Dating Profile Analyzer" description="See what your Hinge profile is actually communicating to potential matches." category="AI Tool" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground pt-12 border-t border-border mb-8">Dating Psychology & Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" id="why-disappear">
          <Card href="/dating-texting-analysis" title="Why Does He Text Me Then Disappear?" description="The psychology of hot-and-cold behavior and how to handle it." category="Guide" />
          <Card href="/dating-texting-analysis" title="Is He Breadcrumbing Me?" description="How to tell if they are keeping you on the hook with minimal effort." category="Guide" />
          <Card href="/dating-texting-analysis" title="The 'Busy' Excuse" description="When are they actually busy, and when is it a soft rejection?" category="Guide" />
        </div>
      </div>
    </>
  );
}
