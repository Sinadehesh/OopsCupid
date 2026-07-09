import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelated } from "@/lib/quizzes/registry";

/**
 * Internal-linking block: contextual links to related quizzes.
 * Placed at the bottom of quiz and article pages. This is the main
 * lever for distributing authority across the funnel pages and keeping
 * visitors on-site (both direct ranking factors for this content type).
 */
export default function RelatedQuizzes({
  currentSlug,
  heading = "Keep Digging — Related Tests",
  count = 4,
}: {
  currentSlug: string;
  heading?: string;
  count?: number;
}) {
  const related = getRelated(currentSlug, count);
  if (related.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4">
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map((q) => (
          <Link
            key={q.slug}
            href={q.slug}
            className="group flex items-start justify-between gap-4 bg-white border border-slate-200 hover:border-rose-300 rounded-2xl p-6 transition-all hover:shadow-md"
          >
            <div>
              <h3 className="font-black text-slate-900 text-lg mb-1 group-hover:text-rose-600 transition-colors">
                {q.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                {q.description}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
