import QuizWidget from "@/components/features/QuizWidget";

export const metadata = {
  title: "What Role Do You Play In Your Friend Group? | OopsCupid",
  description: "Take the 120-item clinical assessment to find out your exact friend group archetype.",
};

export default function FriendRolePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] py-12 px-6">
      <div className="w-full max-w-[1400px] mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D2C54] mb-4">What Role Do You Play?</h1>
        <p className="text-[#0D2C54]/70 font-medium max-w-2xl mx-auto">
          Are you the Leader, the Therapist, or the Peacekeeper? This 120-item assessment analyzes your group dynamics to reveal your exact archetype.
        </p>
      </div>
      
      <QuizWidget quizName="friend-group-role" />
    </main>
  );
}
