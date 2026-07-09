import React from "react";
import { FaqJsonLd, type FaqItem } from "./JsonLd";

/**
 * Visible FAQ section + matching FAQPage JSON-LD in one component.
 * Google requires the marked-up Q&As to be visible on the page — keeping
 * them in a single component guarantees they never drift apart.
 *
 * SEO effect: targets "People Also Ask" long-tails around the quiz keyword
 * and adds crawlable text to otherwise thin client-rendered quiz pages.
 */
export default function QuizFaq({
  items,
  heading = "Frequently Asked Questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="w-full max-w-3xl mx-auto my-16 px-4">
      <FaqJsonLd items={items} />
      <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
        {heading}
      </h2>
      <div className="space-y-4">
        {items.map(({ q, a }) => (
          <details
            key={q}
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden"
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-6 font-black text-slate-800 text-lg">
              {q}
              <span className="text-slate-400 group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">
                +
              </span>
            </summary>
            <p className="px-6 pb-6 text-slate-600 font-medium leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
