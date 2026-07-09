import React from "react";
import { quizRegistry } from "@/lib/quizzes/registry";
import { quizFaqs } from "@/lib/quizzes/faqs";
import { QuizJsonLd, BreadcrumbJsonLd } from "./JsonLd";
import QuizFaq from "./QuizFaq";
import RelatedQuizzes from "./RelatedQuizzes";

const HUB_LABEL = { him: "His Behavior", me: "My Patterns", friends: "Friendships" } as const;

/**
 * Drop-in SEO block for the bottom of any quiz/article page:
 * Quiz + Breadcrumb structured data, visible FAQ (with FAQPage schema),
 * and related-quiz internal links — all driven by the registry, so a page
 * needs exactly one line: <QuizSeoFooter slug="/its-slug" />
 */
export default function QuizSeoFooter({ slug }: { slug: string }) {
  const entry = quizRegistry.find((q) => q.slug === slug);
  const faqs = quizFaqs[slug];

  return (
    <>
      {entry?.isQuiz && <QuizJsonLd quiz={entry} />}
      {entry && (
        <BreadcrumbJsonLd
          items={[
            { name: "Home", slug: "/" },
            { name: HUB_LABEL[entry.hub], slug: `/${entry.hub}` },
            { name: entry.title, slug: entry.slug },
          ]}
        />
      )}
      {faqs && faqs.length > 0 && (
        <QuizFaq items={faqs} heading={`${entry?.title ?? "Quiz"} — Common Questions`} />
      )}
      <RelatedQuizzes currentSlug={slug} />
    </>
  );
}
