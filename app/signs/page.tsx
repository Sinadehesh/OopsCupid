import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SYMPTOM_PAGES } from "@/lib/seo/symptoms";
import { quizRegistry } from "@/lib/quizzes/registry";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Signs & Patterns — Plain Answers To The Things You're Noticing",
  description:
    "Straight answers to the specific things people notice in relationships and friendships — what each one usually means, when it does not, and what to do.",
  alternates: { canonical: "https://www.oopscupid.com/signs" },
};

/** Groups the long-tail pages by the quiz they feed, which is also how
 *  the topics naturally cluster. */
const GROUPS: { heading: string; blurb: string; quizzes: string[] }[] = [
  {
    heading: "When something feels off with him",
    blurb: "Phrases people search at 1am, answered without the fearmongering.",
    quizzes: ["/is-he-gaslighting-me", "/is-he-manipulative", "/is-he-cheating"],
  },
  {
    heading: "When the pattern is yours",
    blurb: "The things you keep doing, and where they come from.",
    quizzes: ["/attachment-style-quiz", "/attraction-patterns", "/why-do-i-pick-bad-guys"],
  },
  {
    heading: "When it's a friendship",
    blurb: "The costs nobody names, because friendships have no review points.",
    quizzes: ["/are-my-friends-bad-for-me", "/are-your-friends-using-you", "/toxic-friend-test"],
  },
];

export default function SignsIndex() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-14 md:py-20">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
          Signs &amp; patterns
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mb-14">
          Specific things people notice, answered properly — what each one usually
          means, when it means nothing, and what to actually do. No checklists, no
          scare tactics.
        </p>

        <div className="space-y-14">
          {GROUPS.map((group) => {
            const pages = SYMPTOM_PAGES.filter((p) => group.quizzes.includes(p.quiz));
            if (!pages.length) return null;
            return (
              <section key={group.heading}>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1.5">
                  {group.heading}
                </h2>
                <p className="text-slate-500 font-medium mb-6">{group.blurb}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pages.map((p) => {
                    const quiz = quizRegistry.find((q) => q.slug === p.quiz);
                    return (
                      <Link
                        key={p.slug}
                        href={`/signs/${p.slug}`}
                        className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:-translate-y-0.5 transition-all"
                      >
                        <p className="font-bold text-slate-900 leading-snug mb-2">
                          &ldquo;{p.phrase}&rdquo;
                        </p>
                        {quiz && (
                          <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                            {quiz.title}
                          </p>
                        )}
                        <span className="text-xs font-black text-slate-500 inline-flex items-center gap-1">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
