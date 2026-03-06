import MainHero from "@/components/ui/MainHero";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relationship Red Flags | OopsCupid",
  description: "Are you just overthinking, or is something actually wrong? Learn to spot the signs of cheating, gaslighting, and manipulation early.",
};

export default function RedFlagsHub() {
  return (
    <>
      <MainHero
        headline="Relationship Red Flags"
        subheadline="Because ignoring them won't make them go away. Let's analyze what's actually happening."
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
          <h2 className="text-3xl font-bold text-foreground">Are You Overthinking, Or Are These Genuine Red Flags?</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            It is incredibly easy to confuse relationship anxiety with genuine intuition. When you are deeply invested in someone, your brain often tries to rationalize their bad behavior. The goal of this hub is to help you step back, look at the objective facts, and determine if you are dealing with common relationship hurdles or massive warning signs like <Link href="/is-he-gaslighting-me" className="text-[var(--primary-base)] font-medium hover:underline">gaslighting</Link> and <Link href="/is-he-manipulative" className="text-[var(--primary-base)] font-medium hover:underline">manipulation</Link>. 
          </p>
          <p className="text-lg leading-relaxed text-foreground/80">
            If you are constantly trying to decode their texts to figure out where you stand, you might also want to check out our <Link href="/dating-texting-analysis" className="text-[var(--primary-base)] font-medium hover:underline">Dating & Texting Analysis</Link> section to understand the psychology behind mixed signals.
          </p>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Popular Analysis Tools & Quizzes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card href="/is-he-cheating" title="Is He Cheating?" description="Take the quiz to separate typical distance from the actual subtle signs of infidelity." category="Quiz" />
          <Card href="/red-flags-in-a-relationship" title="Red Flags in a Relationship" description="The ultimate checklist of early warning signs you absolutely shouldn't ignore." category="Checklist" />
          <Card href="/is-he-gaslighting-me" title="Is He Gaslighting Me?" description="Find out if you're actually losing your mind or if someone is actively making you feel that way." category="Quiz" />
          <Card href="/is-he-manipulative" title="Is He Manipulative?" description="Spot the difference between normal conflict resolution and toxic manipulation." category="Quiz" />
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-16 border-t border-border pt-12">
          <h2 className="text-3xl font-bold text-foreground">Why We Ignore Relationship Red Flags</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            Psychologically, we often ignore red flags because acknowledging them means we have to make a difficult decision. This is deeply tied to our <Link href="/attraction-patterns" className="text-[var(--primary-base)] font-medium hover:underline">Attraction Patterns</Link>. If you grew up around chaotic relationships, a peaceful, healthy dynamic might feel "boring," causing you to unconsciously seek out partners who display the very red flags that end up hurting you.
          </p>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Deep Dive Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card href="/gaslighting-signs" title="10 Signs of Gaslighting" description="A comprehensive breakdown of how gaslighting actually works in real life." category="Article" />
          <Card href="/love-bombing-signs" title="Love Bombing vs. Genuine Affection" description="Why that intense early connection might be a massive red flag." category="Article" />
          <Card href="/trauma-bonding-signs" title="Understanding Trauma Bonding" description="Why it's so incredibly hard to leave a toxic relationship once you're in it." category="Article" />
        </div>
      </div>
    </>
  );
}
