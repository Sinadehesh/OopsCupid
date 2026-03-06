import Hero from "@/components/ui/Hero";
import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toxic Friendships Analysis | OopsCupid",
  description: "Identify one-sided, draining, and jealous friendships. Because sometimes the worst heartbreak comes from a friend.",
};

export default function ToxicFriendshipsHub() {
  return (
    <>
      <Hero
        headline="Toxic Friendships"
        subheadline="Because romantic relationships aren't the only ones that can break your heart or drain your energy."
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Tests & Quizzes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card href="/toxic-friend-test" title="Toxic Friend Test" description="Take the assessment to see if your friendship is actually healthy." category="Quiz" />
          <Card href="/is-my-best-friend-toxic" title="Is My Best Friend Toxic?" description="When the person closest to you feels like the hardest to be around." category="Quiz" />
          <Card href="/are-my-friends-bad-for-me" title="Are My Friends Bad for Me?" description="Analyze your entire friend group's dynamic and its effect on you." category="Quiz" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground pt-12 border-t border-border mb-8">Articles & Deep Dives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" id="jealousy">
          <Card href="/signs-of-a-toxic-friend" title="7 Subtle Signs of a Toxic Friend" description="They might not be overtly mean, but they leave you feeling drained." category="Article" />
          <Card href="/toxic-friendships#frenemies" title="The Overly Competitive Friend" description="Why everything feels like a competition and how to protect your peace." category="Article" />
          <Card href="/toxic-friendships#boundary" title="Setting Boundaries with Friends" description="How to say 'no' without ending the friendship (if you don't want to)." category="Guide" />
        </div>
      </div>
    </>
  );
}
