import QuizWidget from "@/components/features/QuizWidget";

export const metadata = {
  title: "Are Your Friends Using You? | OopsCupid",
  description: "A 108-item clinical assessment detecting transactional relationships, emotional labor burdens, and opportunistic friendships.",
};

export default function FriendsUsedPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] py-12 px-6">
      <div className="w-full max-w-[1400px] mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Are Your Friends Using You?</h1>
        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
          Take the 108-item behavioral audit to measure your Use-Risk Index and find out if your friendships are reciprocal or exploitative.
        </p>
      </div>
      
      <QuizWidget quizName="are-your-friends-using-you" />
    </main>
  );
}
