import React from "react";
import type { QuizEntry } from "@/lib/quizzes/registry";

const SITE = "https://oopscupid.com";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Quiz structured data — tells Google this page IS the questionnaire the
 * searcher asked for. Eligible for education/quiz rich treatments and
 * strongly disambiguates "test/quiz" intent queries.
 */
export function QuizJsonLd({ quiz }: { quiz: QuizEntry }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Quiz",
        name: quiz.seoTitle,
        description: quiz.description,
        url: `${SITE}${quiz.slug}`,
        educationalAlignment: {
          "@type": "AlignmentObject",
          alignmentType: "educationalSubject",
          targetName: "Relationship self-assessment",
        },
        provider: {
          "@type": "Organization",
          name: "OopsCupid",
          url: SITE,
        },
        ...(quiz.questionCount ? { numberOfQuestions: quiz.questionCount } : {}),
        ...(quiz.minutes ? { timeRequired: `PT${quiz.minutes}M` } : {}),
        isAccessibleForFree: true,
      }}
    />
  );
}

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage structured data. Must accompany the same Q&As rendered visibly. */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}

/** Breadcrumb trail — improves sitelink display for hub → quiz paths. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; slug: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE}${item.slug}`,
        })),
      }}
    />
  );
}
