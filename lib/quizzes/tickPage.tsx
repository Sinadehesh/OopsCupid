import type { Metadata } from "next";
import TickPicker from "@/components/tick/TickPicker";
import { tickTestBySlug, type TickTest } from "@/lib/quizzes/tickTests";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { versusBySlug } from "@/lib/quizzes/versus";
import VersusGame from "@/components/tick/VersusGame";
import ChoiceGame from "@/components/tick/ChoiceGame";
import { choiceGame } from "@/lib/quizzes/choiceGames";
import { typeQuiz, type TypeQuiz as TypeQuizData } from "@/lib/quizzes/typeQuizzes";
import TypeQuiz from "@/components/tick/TypeQuiz";

const baseUrl = "https://www.oopscupid.com";

/** Metadata for a forty-second test, with a share card for TikTok bios. */
export function tickMetadata(slug: string): Metadata {
  const t = tickTestBySlug(slug)!;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(t.question)}&q=${encodeURIComponent(`${t.items.length} taps · ${t.items.length <= 12 ? 30 : 40} seconds`)}`;
  return {
    metadataBase: new URL(baseUrl),
    title: t.seo.title,
    description: t.seo.description,
    alternates: { canonical: `${baseUrl}/${slug}` },
    openGraph: {
      title: t.question,
      description: t.seo.description,
      url: `${baseUrl}/${slug}`,
      type: "website",
      images: [{ url: card, width: 1200, height: 630, alt: t.question }],
    },
    twitter: { card: "summary_large_image", title: t.question, description: t.seo.description, images: [card] },
  };
}

/** The page body for a forty-second test. */
export function TickPage({ slug }: { slug: string }) {
  const t = tickTestBySlug(slug)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: t.question,
    url: `${baseUrl}/${slug}`,
    educationalLevel: "beginner",
    hasPart: t.items.map((i) => ({ "@type": "Question", name: i.text })),
  };
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TickPicker slug={slug} />
      <TickAbout t={t} />
    </main>
  );
}

/**
 * Readable text under the game. The game itself is mostly buttons, which
 * gives a search engine little to go on; this says, in the words people
 * search with, what the quiz looks at, using the same groups the result
 * explains. Shown to everyone, and mirrored in FAQ structured data.
 */
function TickAbout({ t }: { t: TickTest }) {
  const about = t.seo.about ?? t.question;
  const seconds = t.items.length <= 12 ? 30 : 40;
  const faq = [
    {
      q: `How does the "${about.replace(/\?$/, "")}" quiz work?`,
      a: `Tap every one of the ${t.items.length} signs that fits, then see your result straight away. It takes about ${seconds} seconds, it's free, there's no email or sign-up, and nothing you tap leaves your phone.`,
    },
    {
      q: "Is the result a diagnosis?",
      a: t.fun
        ? "No. It's just for fun, with one genuinely useful point about what the signs you picked have in common."
        : "No. It counts what you recognise and explains the pattern those signs usually belong to. It can't diagnose anyone, but it's a clear starting point for an honest conversation.",
    },
    {
      q: "Can I get more than the free result?",
      a: "If you want it: a personal read of exactly what you picked is €2.99, and the full report, which also unlocks every guide on the site, is €9.99. The result itself is always free.",
    },
  ];
  return (
    <section className="bg-[#FFF4FA] border-t-[2.5px] border-[#1A1033]/10">
      <div className="max-w-2xl mx-auto px-5 py-12 text-[#1A1033]">
        <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">{about}</h2>
        <p className="text-[16px] font-semibold text-[#1A1033]/75 leading-relaxed mb-6">{t.seo.description}</p>
        <h3 className="text-lg font-black mb-3">What this quiz looks at</h3>
        <ul className="space-y-2.5 mb-8">
          {Object.values(t.groups).map((g) => (
            <li key={g.label} className="text-[15px] leading-relaxed text-[#1A1033]/80">
              <b className="text-[#1A1033]">{g.label}:</b> {g.does}
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-black mb-3">Questions people ask</h3>
        <div className="space-y-4">
          {faq.map((f) => (
            <div key={f.q}>
              <p className="font-black text-[15px]">{f.q}</p>
              <p className="text-[15px] text-[#1A1033]/75 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <FaqJsonLd items={faq} />
      </div>
    </section>
  );
}

/** Metadata for a two-person "who would say this?" game. */
export function versusMetadata(slug: string): Metadata {
  const g = versusBySlug(slug)!;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(g.title)}&q=${encodeURIComponent("Who would say it? One minute")}`;
  return {
    metadataBase: new URL(baseUrl),
    title: g.seo.title,
    description: g.seo.description,
    alternates: { canonical: `${baseUrl}/${slug}` },
    openGraph: { title: g.title, description: g.seo.description, url: `${baseUrl}/${slug}`, type: "website", images: [{ url: card, width: 1200, height: 630, alt: g.title }] },
    twitter: { card: "summary_large_image", title: g.title, description: g.seo.description, images: [card] },
  };
}

export function VersusPage({ slug }: { slug: string }) {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      <VersusGame slug={slug} />
    </main>
  );
}

/** Metadata for a pick-the-answer game. */
export function choiceMetadata(slug: string): Metadata {
  const g = choiceGame(slug)!;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(`${g.title} ${g.emoji}`)}&q=${encodeURIComponent(g.seo.og)}`;
  return {
    metadataBase: new URL(baseUrl),
    title: g.seo.title,
    description: g.seo.description,
    alternates: { canonical: `${baseUrl}/${slug}` },
    openGraph: { title: `${g.title} ${g.emoji}`, description: g.seo.og, url: `${baseUrl}/${slug}`, type: "website", images: [{ url: card, width: 1200, height: 630, alt: g.title }] },
    twitter: { card: "summary_large_image", title: `${g.title} ${g.emoji}`, description: g.seo.og, images: [card] },
  };
}

export function ChoicePage({ slug }: { slug: string }) {
  const g = choiceGame(slug)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: g.title,
    url: `${baseUrl}/${slug}`,
    educationalLevel: "beginner",
    hasPart: g.rounds.map((r) => ({ "@type": "Question", name: r.prompt })),
  };
  return (
    <main className="min-h-screen bg-[#FFF4FA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ChoiceGame slug={slug} />
    </main>
  );
}

/** Metadata for a "which one are you?" quiz. */
export function typeMetadata(slug: string): Metadata {
  const x = typeQuiz(slug)!;
  const card = `${baseUrl}/api/og?t=${encodeURIComponent(`${x.title} ${x.emoji}`)}&q=${encodeURIComponent(x.seo.og)}`;
  return {
    metadataBase: new URL(baseUrl),
    title: x.seo.title,
    description: x.seo.description,
    alternates: { canonical: `${baseUrl}/${slug}` },
    openGraph: { title: `${x.title} ${x.emoji}`, description: x.seo.description, url: `${baseUrl}/${slug}`, type: "website", images: [{ url: card, width: 1200, height: 630, alt: x.title }] },
    twitter: { card: "summary_large_image", title: `${x.title} ${x.emoji}`, description: x.seo.description, images: [card] },
  };
}

export function TypePage({ slug }: { slug: string }) {
  const x = typeQuiz(slug)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: x.title,
    url: `${baseUrl}/${slug}`,
    educationalLevel: "beginner",
    hasPart: x.questions.map((q) => ({ "@type": "Question", name: q.prompt })),
  };
  return (
    <main className="min-h-screen bg-[#FFF4FA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TypeQuiz slug={slug} />
      <TypeAbout x={x} />
    </main>
  );
}

/** Readable text under a type quiz: every type explained, plus a short FAQ. */
function TypeAbout({ x }: { x: TypeQuizData }) {
  const names = Object.values(x.types).map((t) => t.title);
  const faq = [
    {
      q: `How does the "${x.seo.about.replace(/\?$/, "")}" quiz work?`,
      a: `Answer ${x.questions.length} quick questions and every answer counts towards one of ${names.length} types: ${names.join(", ")}. You get your type and your full mix straight away. It's free, there's no sign-up, and it takes about a minute.`,
    },
    {
      q: "Is it scientific?",
      a: `It's for fun, not a diagnosis. Each type explains one real idea from relationship psychology, and if you want a properly scored answer, the free full test linked from your result goes much deeper.${x.note ? ` ${x.note}` : ""}`,
    },
    {
      q: "Can I get more than the free result?",
      a: "If you want it: the €9.99 report unlocks the full written report for every test on the site, plus every guide. Your type is always free.",
    },
  ];
  return (
    <section className="bg-white border-t-[2.5px] border-[#1A1033]/10">
      <div className="max-w-2xl mx-auto px-5 py-12 text-[#1A1033]">
        <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">{x.seo.about}</h2>
        <p className="text-[16px] font-semibold text-[#1A1033]/75 leading-relaxed mb-6">{x.seo.description}</p>
        <h3 className="text-lg font-black mb-3">The {names.length} types</h3>
        <ul className="space-y-3 mb-8">
          {Object.values(x.types).map((t) => (
            <li key={t.title} className="text-[15px] leading-relaxed text-[#1A1033]/80">
              <b className="text-[#1A1033]">{t.emoji} {t.title}:</b> {t.line} {t.body}
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-black mb-3">Questions people ask</h3>
        <div className="space-y-4">
          {faq.map((f) => (
            <div key={f.q}>
              <p className="font-black text-[15px]">{f.q}</p>
              <p className="text-[15px] text-[#1A1033]/75 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <FaqJsonLd items={faq} />
      </div>
    </section>
  );
}
