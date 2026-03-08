import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "The 4 Adult Attachment Styles Explained | OopsCupid",
  description: "Why do you push love away or cling too tightly? Understand the four adult attachment styles (Anxious, Avoidant, Secure, Disorganized) and how they affect your relationships.",
  keywords: ["attachment styles", "anxious attachment", "avoidant attachment", "relationship patterns", "why do I push love away"],
};

export default function AttachmentArticlePage() {
  return (
    <main className="bg-[#FFFDFC] min-h-screen py-20 px-6 md:px-10 lg:px-14">
      <article className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="text-[32px] md:text-[42px] font-semibold text-[#334B63] mb-6 leading-tight">
          The 4 Adult Attachment Styles: Why You Love the Way You Do
        </h1>
        
        <p className="text-[18px] md:text-[22px] font-normal leading-relaxed text-[#5E6E79] mb-10">
          Do you find yourself constantly worrying that your partner is going to leave you? Or do you instinctively pull away the second someone gets too close? The answer usually lies in your attachment style.
        </p>

        {/* Call to Action Box tailored to your colors */}
        <div className="bg-[#FFB8A1]/20 border-l-4 border-[#FFB8A1] p-8 my-10 rounded-r-2xl">
          <h3 className="text-[22px] font-semibold text-[#334B63] mb-3">Not sure which style you are?</h3>
          <p className="text-[#5E6E79] mb-6">Take our free clinical assessment to uncover your specific attachment style and relationship patterns.</p>
          <Link 
            href="/attachment-style-quiz" 
            className="inline-block bg-[#FFB8A1] text-[#111111] font-semibold px-8 py-3 rounded-full hover:bg-[#F0A090] transition-colors"
          >
            Take the Attachment Style Quiz →
          </Link>
        </div>

        <h2 className="text-[26px] font-semibold text-[#334B63] mt-12 mb-4">1. Anxious Attachment</h2>
        <p className="text-[#5E6E79] leading-relaxed mb-6">
          People with an anxious attachment style often feel a deep fear of abandonment. They crave extreme closeness and intimacy but constantly worry that their partner doesn't want to be as close as they do. If he takes three hours to text back, your brain immediately assumes he's losing interest.
        </p>

        <h2 className="text-[26px] font-semibold text-[#334B63] mt-12 mb-4">2. Avoidant Attachment</h2>
        <p className="text-[#5E6E79] leading-relaxed mb-6">
          Avoidant individuals equate intimacy with a loss of independence. When things get serious, they feel suffocated and naturally start creating distance. They might hyper-focus on their partner's flaws as an excuse to pull away.
        </p>

        <h2 className="text-[26px] font-semibold text-[#334B63] mt-12 mb-4">3. Disorganized (Fearful-Avoidant)</h2>
        <p className="text-[#5E6E79] leading-relaxed mb-6">
          This is a confusing mix of both anxious and avoidant traits, usually stemming from past trauma. You desperately want love, but you are also terrified of it. It creates a volatile "come here, now go away" dynamic in relationships.
        </p>

        <h2 className="text-[26px] font-semibold text-[#334B63] mt-12 mb-4">4. Secure Attachment</h2>
        <p className="text-[#5E6E79] leading-relaxed mb-8">
          The holy grail of relationships. Secure individuals are comfortable with intimacy, don't panic over normal space in a relationship, and communicate their needs effectively without game-playing.
        </p>
      </article>
    </main>
  );
}