import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relationship Red Flags | OopsCupid",
  description: "Are you just overthinking, or is something actually wrong? Learn to spot the signs of cheating, gaslighting, and manipulation early.",
};

export default function RedFlagsHub() {
  return (
    <>
      <Hero
        headline="Relationship Red Flags"
        subheadline="Because ignoring them won't make them go away. Let's analyze what's actually happening."
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Popular Analysis Tools & Quizzes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card href="/is-he-cheating" title="Is He Cheating?" description="Take the quiz to separate anxiety from actual subtle signs." category="Quiz" />
          <Card href="/red-flags-in-a-relationship" title="Red Flags in a Relationship" description="The ultimate checklist of early warning signs you shouldn't ignore." category="Checklist" />
          <Card href="/is-he-gaslighting-me" title="Is He Gaslighting Me?" description="Find out if you're actually losing your mind or if someone is making you feel that way." category="Quiz" />
          <Card href="/is-he-manipulative" title="Is He Manipulative?" description="Spot the difference between influence and toxic manipulation." category="Quiz" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mt-20 mb-8">Deep Dive Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card href="/gaslighting-signs" title="10 Signs of Gaslighting" description="A comprehensive breakdown of how gaslighting actually works in real life." category="Article" />
          <Card href="/love-bombing-signs" title="Love Bombing vs. Genuine Affection" description="Why that intense early connection might be a massive red flag." category="Article" />
          <Card href="/trauma-bonding-signs" title="Understanding Trauma Bonding" description="Why it's so incredibly hard to leave a toxic relationship." category="Article" />
        </div>
      </div>
    </>
  );
}
