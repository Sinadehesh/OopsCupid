import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attraction Patterns | OopsCupid",
  description: "Why does history keep repeating itself? Understand your subconscious dating choices and break the cycle of toxic relationships.",
};

export default function AttractionPatternsHub() {
  return (
    <>
      <Hero
        headline="Attraction Patterns"
        subheadline="Let's find out why you keep dating the 'same exact person in a different font'."
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl">

        <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
          <h2 className="text-3xl font-bold text-foreground">Why You Keep Dating Your "Type"</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            Have you ever noticed that you keep ending up in the exact same arguments with completely different people? That is your attraction pattern at work. Often, we are subconsciously drawn to what feels familiar, even if what feels familiar is actually painful. Recognizing these patterns is the first step to breaking the cycle and avoiding <Link href="/relationship-red-flags" className="text-primary-600 font-medium hover:underline">relationship red flags</Link> in the future.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80">
            If you are actively dating right now, we recommend running your matches through the <Link href="/chat-analyzer" className="text-primary-600 font-medium hover:underline">Chat Analyzer</Link> tool to make sure you aren't falling for the same <Link href="/love-bombing-signs" className="text-primary-600 font-medium hover:underline">love-bombing tactics</Link> you've experienced before.
          </p>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Self-Discovery Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card href="/why-do-i-attract-toxic-people" title="Why Do I Attract Toxic People?" description="Take the quiz to identify the subconscious signals you might be sending." category="Quiz" />
          <Card href="/why-do-i-sabotage-relationships" title="Why Do I Sabotage Relationships?" description="Find out if you are pushing good things away before they can hurt you." category="Quiz" />
          <Card href="/what-kind-of-person-do-i-attract" title="What Kind of Person Do I Attract?" description="Analyze your 'type' and why you constantly draw them in." category="Quiz" />
          <Card href="/why-do-i-keep-dating-the-same-type" title="Why Do I Keep Dating the Same Type?" description="Identify the patterns and finally break the cycle." category="Quiz" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground pt-12 border-t border-border mb-8">Psychology Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card href="/why-do-i-attract-toxic-people-article" title="The Psychology of Attraction" description="Why familiar pain often feels safer than unfamiliar healthy love." category="Article" />
          <Card href="/attraction-patterns#attachment" title="Attachment Styles in Dating" description="How your attachment style dictates who you feel chemistry with." category="Article" />
          <Card href="/attraction-patterns#fixing" title="The 'I Can Fix Him' Syndorome" description="Why potential is the most dangerous thing to fall in love with." category="Article" />
        </div>
      </div>
    </>
  );
}
