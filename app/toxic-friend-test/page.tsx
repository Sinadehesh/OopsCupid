import { Metadata } from "next";
import ToxicQuizEngine from "./_components/ToxicQuizEngine";

export const metadata: Metadata = {
  title: "Toxic Friendship Diagnostics Battery | OopsCupid",
  description: "A comprehensive, research-inspired 88-question screening tool to evaluate friendship toxicity, relational aggression, and emotional harm.",
};

export default function ToxicFriendTestPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <span className="bg-[#00A6ED]/10 text-[#00A6ED] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
          Research-Inspired Screener
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D2C54] mb-4">
          Toxic Friendship Assessment
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          This comprehensive battery measures hidden dimensions of manipulation, aggression, and emotional impact. It is a self-discovery tool, not a clinical diagnosis.
        </p>
      </div>

      {/* Core Assessment Engine */}
      <ToxicQuizEngine />
      
    </main>
  );
}
