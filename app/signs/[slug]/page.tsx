import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, HelpCircle, Info } from "lucide-react";
import { SYMPTOM_PAGES } from "@/lib/seo/symptoms";
import { quizRegistry } from "@/lib/quizzes/registry";

/**
 * /signs/[slug] — the long-tail traffic pages.
 *
 * Statically generated at build time, so they cost nothing to serve and
 * are fully crawlable without JavaScript. Each carries FAQPage and
 * Article JSON-LD, a direct answer in the first paragraph (for featured
 * snippets and AI citation), and one internal link to the quiz that
 * actually measures the thing.
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return SYMPTOM_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = SYMPTOM_PAGES.find((p) => p.slug === slug);
  if (!page) return {};

  const url = `https://www.oopscupid.com/signs/${page.slug}`;
  const og = `https://www.oopscupid.com/api/og?t=${encodeURIComponent(page.phrase)}&q=${encodeURIComponent("OopsCupid")}`;

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      url,
      type: "article",
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.description,
      images: [og],
    },
  };
}

export default async function SignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SYMPTOM_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const quiz = quizRegistry.find((q) => q.slug === page.quiz);
  const related = page.related
    .map((r) => SYMPTOM_PAGES.find((p) => p.slug === r))
    .filter(Boolean) as typeof SYMPTOM_PAGES;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: page.phrase,
        description: page.description,
        articleSection: "Relationships",
        mainEntityOfPage: `https://www.oopscupid.com/signs/${page.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.oopscupid.com" },
          { "@type": "ListItem", position: 2, name: "Signs", item: "https://www.oopscupid.com/signs" },
          { "@type": "ListItem", position: 3, name: page.phrase },
        ],
      },
    ],
  };

  return (
    <article className="bg-[#FAFAF7] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <nav className="text-xs font-bold text-slate-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/signs" className="hover:text-slate-600">Signs</Link>
        </nav>

        <h1 className="text-3xl md:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
          &ldquo;{page.phrase}&rdquo;
        </h1>

        {/* The direct answer. First thing on the page because it is what
            gets pulled into a snippet and quoted by an AI — it has to
            stand alone with no page around it. */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_2px_20px_rgba(15,23,42,0.05)] p-6 md:p-8 mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">The short answer</p>
          <p className="text-lg text-slate-800 leading-relaxed font-medium">{page.answer}</p>
        </div>

        <div className="space-y-10">
          {page.body.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3">{section.heading}</h2>
              <p className="text-slate-700 leading-[1.75] font-medium">{section.text}</p>
            </section>
          ))}
        </div>

        {/* The honest counter-case. Every one of these behaviours has an
            innocent explanation, and a page that hides that is
            fearmongering — which readers detect. */}
        <section className="mt-10 rounded-3xl bg-emerald-50/60 border border-emerald-200/70 p-6 md:p-8">
          <h2 className="text-lg font-black text-emerald-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" /> When it is not what you think
          </h2>
          <p className="text-emerald-950/80 leading-relaxed font-medium">{page.notAlways}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5">What to do about it</h2>
          <ol className="space-y-3">
            {page.whatToDo.map((step, i) => (
              <li key={i} className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-5">
                <span className="shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-slate-700 leading-relaxed font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* The funnel. One quiz, chosen because it genuinely measures the
            thing the page is about. */}
        {quiz && (
          <section className="mt-12 rounded-3xl bg-[#0E1621] text-white p-8 md:p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">
              Find out where you actually stand
            </p>
            <h2 className="text-2xl md:text-3xl font-black mb-4">{quiz.title}</h2>
            <p className="text-white/70 leading-relaxed font-medium mb-7">{page.quizPitch}</p>
            <Link
              href={quiz.slug}
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-extrabold px-7 py-4 rounded-2xl hover:-translate-y-0.5 transition-transform"
            >
              Take the assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/35 text-xs font-bold mt-4">
              Free · No account needed · {quiz.minutes ?? 8} minutes
            </p>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-400" /> Common questions
          </h2>
          <div className="space-y-3">
            {page.faq.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-black text-slate-900 mb-2">{f.q}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black text-slate-900 mb-5">Related</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/signs/${r.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
                >
                  <p className="font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-slate-700">
                    &ldquo;{r.phrase}&rdquo;
                  </p>
                  <span className="text-xs font-black text-slate-400 inline-flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-14 text-xs text-slate-400 font-medium leading-relaxed border-t border-slate-200 pt-6">
          This page is general information, not a diagnosis or clinical advice. If you are
          frightened of someone, or being controlled, a domestic abuse service can help — in the
          UK, the National Domestic Abuse Helpline is 0808 2000 247, free and 24 hours.
        </p>
      </div>
    </article>
  );
}
