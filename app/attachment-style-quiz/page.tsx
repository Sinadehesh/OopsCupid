import type { Metadata } from 'next';
import QuizWidget from '@/components/features/QuizWidget';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "What Is My Attachment Style Quiz? | Free Test | OopsCupid",
  description: "Take our free, instant quiz to discover if your attachment style is Anxious, Avoidant, Secure, or Disorganized.",
  keywords: ["attachment style test", "anxious or avoidant quiz", "relationship psychology test"],
};

export default function AttachmentQuizPage() {
  const quizQuestions = [
    {
      id: 1,
      text: "When your partner needs space, how do you genuinely react?",
      options: [
        { text: "I panic and worry they are losing interest in me.", score: 3 }, // Anxious
        { text: "I feel relieved. I like having my own space too.", score: 1 }, // Avoidant
        { text: "I'm fine with it. We all need time to ourselves.", score: 0 }, // Secure
      ]
    },
    {
      id: 2,
      text: "How do you feel about emotional intimacy and opening up?",
      options: [
        { text: "I want to merge completely with my partner.", score: 3 },
        { text: "It makes me uncomfortable. I prefer to rely on myself.", score: 1 },
        { text: "I enjoy being close, but I also maintain my independence.", score: 0 },
      ]
    },
    {
      id: 3,
      text: "If a minor disagreement happens, what goes through your mind?",
      options: [
        { text: "This is it, they're going to break up with me.", score: 3 },
        { text: "I shut down and want to walk away from the drama.", score: 1 },
        { text: "We'll talk it out and resolve it together.", score: 0 },
      ]
    },
    {
      id: 4,
      text: "What is your biggest fear in a relationship?",
      options: [
        { text: "Being abandoned or not being loved enough.", score: 3 },
        { text: "Being suffocated or losing my freedom.", score: 1 },
        { text: "I don't have extreme fears; I trust the process.", score: 0 },
      ]
    }
  ];

  return (
    <main className="bg-[#F9F4F4] min-h-screen py-20 px-6 md:px-10 lg:px-14">
      <div className="max-w-3xl mx-auto space-y-12">
        
        <div className="text-center">
          <h1 className="text-[32px] md:text-[42px] font-semibold text-[#334B63] mb-6">
            What Is My Attachment Style?
          </h1>
          <p className="text-[18px] md:text-[22px] font-normal leading-relaxed text-[#5E6E79]">
            Answer these 4 questions honestly to uncover your relationship blueprint. No sign-up required.
          </p>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm p-8 md:p-12">
          <QuizWidget 
            quizId="attachment-style"
            title="Attachment Style Assessment"
            questions={quizQuestions} 
          />
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