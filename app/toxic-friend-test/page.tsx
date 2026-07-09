import { Metadata } from "next";
import ToxicQuizEngine from "./_components/ToxicQuizEngine";
import { QuizJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import QuizFaq from "@/components/seo/QuizFaq";
import RelatedQuizzes from "@/components/seo/RelatedQuizzes";
import { quizRegistry } from "@/lib/quizzes/registry";

export const metadata: Metadata = {
  title: "Toxic Friend Test — Is My Friend Toxic? Free Quiz | OopsCupid",
  description:
    "Is your friend toxic or just going through a rough patch? This free, research-inspired test scores control, competition, and energy drain — instant result, no sign-up.",
  alternates: { canonical: "https://oopscupid.com/toxic-friend-test" },
  openGraph: {
    title: "Toxic Friend Test — Is My Friend Toxic?",
    description:
      "Score your friendship across control, competition, and energy drain. Free and instant.",
    url: "https://oopscupid.com/toxic-friend-test",
    type: "website",
  },
};

const FAQ = [
  {
    q: "What makes a friend 'toxic' versus just difficult?",
    a: "Difficult friends drain you sometimes and give back other times; the relationship is uneven but real. Toxic friendships have a consistent direction: you leave interactions smaller — more anxious, more criticized, more used — and the pattern doesn't change when you raise it. This test measures that direction across control, competition, reliability, and how you feel after seeing them.",
  },
  {
    q: "Can a toxic friendship be fixed?",
    a: "Sometimes, if two things are true: the toxic pattern is situational (their bad year, not their operating system), and they can hear feedback without punishing you for it. The test result sorts your friendship into keep-and-repair, distance, or exit — with scripts for each.",
  },
  {
    q: "Why is it so hard to leave a toxic friendship?",
    a: "Shared history, mutual friends, and intermittent reinforcement — the good moments are real, and they keep hope alive. That's also why 'just cut them off' advice rarely works without a plan for the group dynamics and the guilt. A structured exit plan matters as much as the decision.",
  },
];

export default function ToxicFriendTestPage() {
  const quiz = quizRegistry.find((q) => q.slug === "/toxic-friend-test")!;

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
      <QuizJsonLd quiz={quiz} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", slug: "/" },
          { name: "Friendships", slug: "/friends" },
          { name: "Toxic Friend Test", slug: "/toxic-friend-test" },
        ]}
      />
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <span className="bg-[#00A6ED]/10 text-[#00A6ED] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
          Research-Inspired Screener
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D2C54] mb-4">
          Toxic Friendship Assessment
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          This comprehensive battery measures hidden dimensions of manipulation, aggression, and emotional impact. It is a self-discovery tool, not a clinical diagnosis.
        </p>
      </div>

      {/* Core Assessment Engine */}
      <ToxicQuizEngine />

      <QuizFaq items={FAQ} heading="Toxic Friend Test — Common Questions" />
      <RelatedQuizzes currentSlug="/toxic-friend-test" />
    </main>
  );
}
