import Hero from "@/components/ui/Hero";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signs of Trauma Bonding | OopsCupid Guide",
  description: "Everything you need to know about signs of trauma bonding and how to protect your peace.",
};

export default function ArticlePage() {
  return (
    <>
      <Hero
        headline="Signs of Trauma Bonding"
        subheadline="Because ignoring the problem won't make it go away."
      />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="mb-12 border-b border-border pb-8">
            <Link href="/relationship-red-flags" className="text-primary-600 hover:text-primary-700 font-medium">
                &larr; Back to Relationship Red Flags
            </Link>
        </div>
        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
            <p>This is a placeholder for the article. Here you will write the SEO optimized content discussing the psychological realities and practical signs related to <strong>Signs of Trauma Bonding</strong>.</p>
            <h3>What is it actually?</h3>
            <p>Content explaining the core concepts goes here.</p>
            <h3>How to spot the signs early</h3>
            <ul>
                <li>Sign 1: Placeholder text</li>
                <li>Sign 2: Placeholder text</li>
                <li>Sign 3: Placeholder text</li>
            </ul>
        </article>
      </div>
    </>
  );
}