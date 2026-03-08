import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "What Is My Attachment Style Quiz? | Free Test | OopsCupid",
  description: "Take our free, instant quiz to discover if your attachment style is Anxious, Avoidant, Secure, or Disorganized.",
  keywords: ["attachment style test", "anxious or avoidant quiz", "relationship psychology test"],
};

export default function AttachmentQuizPage() {
  return (
    <main className="bg-[#F9F4F4] min-h-screen py-20 px-6 md:px-10 lg:px-14">
      <div className="max-w-3xl mx-auto space-y-12">
        
        <div className="text-center">
          <h1 className="text-[32px] md:text-[42px] font-semibold text-[#334B63] mb-6">
            What Is My Attachment Style?
          </h1>
          <p className="text-[18px] md:text-[22px] font-normal leading-relaxed text-[#5E6E79]">
            Answer these questions honestly to uncover your relationship blueprint. No sign-up required.
          </p>
        </div>

        {/* Updated to use ONLY the prop your component expects */}
        <div className="bg-white rounded-[24px] shadow-sm p-8 md:p-12">
          <QuizWidget quizName="attachment-style" />
        </div>

        <div className="text-center mt-12">
          <p className="text-[#5E6E79] text-[18px]">
            Want to understand the psychology behind your result? <br />
            <Link href="/understanding-attachment-styles" className="text-[#FFB8A1] font-semibold hover:underline mt-2 inline-block">
              Read our full guide on the 4 Adult Attachment Styles →
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}