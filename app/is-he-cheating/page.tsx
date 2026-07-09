import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import Link from "next/link";
import { Metadata } from "next";
import { QuizJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import QuizFaq from "@/components/seo/QuizFaq";
import RelatedQuizzes from "@/components/seo/RelatedQuizzes";
import { quizRegistry } from "@/lib/quizzes/registry";

export const metadata: Metadata = {
  title: "Is He Cheating? Take the 3-Minute Behavioral Test | OopsCupid",
  description:
    "Is he cheating or are you overthinking? This free 20-question behavioral test analyzes his phone habits, schedule changes, and emotional distance — with an instant result.",
  alternates: { canonical: "https://oopscupid.com/is-he-cheating" },
  openGraph: {
    title: "Is He Cheating? Free Behavioral Diagnostic Test",
    description:
      "Analyze his phone habits, schedule shifts, and defensiveness in 3 minutes. Instant result, no sign-up required.",
    url: "https://oopscupid.com/is-he-cheating",
    type: "website",
  },
};

const FAQ = [
  {
    q: "How accurate is an 'is he cheating' quiz?",
    a: "No quiz can prove infidelity — only evidence can. What this test does is structure your observations: it scores 20 research-informed behavioral markers (phone secrecy, schedule changes, emotional withdrawal, defensiveness) so you can see whether the pattern you're sensing is strong, weak, or mixed, instead of ruminating in circles.",
  },
  {
    q: "What are the most common signs of cheating?",
    a: "The most consistently reported clusters are: sudden phone privacy (new passcode, face-down phone, hidden notifications), unexplained time gaps or 'working late' spikes, a drop in emotional and physical intimacy, and disproportionate defensiveness when asked normal questions. One sign alone means little — the pattern across clusters is what matters, which is exactly what this test measures.",
  },
  {
    q: "Should I confront him before I'm sure?",
    a: "Confronting without preparation usually backfires: a cheater gets a chance to rehearse, hide evidence, and turn the accusation back on you. It's smarter to document what you observe for a week first, then decide on a conversation strategy. Your test result includes guidance on what to do next based on your score.",
  },
  {
    q: "What if the test says I'm probably just anxious?",
    a: "That's a real and valuable result. Relationship anxiety and attachment triggers can produce the same gut feeling as real deception. If your score is low, the healthiest next step is usually working on the anxiety itself — our attachment style quiz is the right place to start.",
  },
];

export default function QuizPage() {
  const quiz = quizRegistry.find((q) => q.slug === "/is-he-cheating")!;

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <QuizJsonLd quiz={quiz} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", slug: "/" },
          { name: "His Behavior", slug: "/him" },
          { name: "Is He Cheating?", slug: "/is-he-cheating" },
        ]}
      />
      <MainHero
        topSubheading="INSTANT DIAGNOSTIC AUDIT"
        headline="Stop Guessing. Find Out The Truth."
        subheadline="Take this 3-minute test. Find out if you are being paranoid, or if he is actually hiding something behind your back."
        cards={[]} /* This explicitly tells the hero NOT to render the default cards */
      />

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/him"
            className="inline-flex items-center text-[#DD1C1A] hover:text-[#b81715] font-extrabold tracking-wide uppercase text-sm transition-colors"
          >
            &larr; Back to His Behavior Hub
          </Link>
        </div>

        {/* Added a nice container wrapper to make the quiz pop visually */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-2xl border border-slate-100">
          <QuizWidget quizName="is-he-cheating" />
        </div>
      </div>

      <QuizFaq items={FAQ} heading="Is He Cheating? — Common Questions" />
      <RelatedQuizzes currentSlug="/is-he-cheating" />
    </main>
  );
}
