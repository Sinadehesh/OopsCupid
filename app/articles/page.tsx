import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function ClarityHub() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#3B1F2B] mb-6">
            Relationship Clarity Hub
          </h1>
          <p className="text-xl text-[#3B1F2B]/70 max-w-2xl mx-auto mb-16">
            Deep dives into attachment theory, texting psychology, and the patterns that shape your love life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* The New Essay Card - Custom Styled for the Hub */}
            <div className="group bg-[#3B1F2B] rounded-[32px] overflow-hidden shadow-xl transition-all hover:-translate-y-2 flex flex-col">
              <div className="h-48 bg-[#A23B72] flex items-center justify-center p-8 text-center">
                <h3 className="text-2xl font-bold text-white">Attachment Styles, Explained</h3>
              </div>
              <div className="p-8 text-left flex-grow flex flex-col">
                <p className="text-white/80 mb-6 flex-grow">Learn the real reason you keep repeating relationship patterns and how to break the cycle.</p>
                <Link href="/understanding-attachment-styles" className="text-[#F18F01] font-bold hover:underline">
                  Read Full Essay →
                </Link>
              </div>
            </div>

            {/* Tool Cards */}
            <Card 
              variant="tool" 
              title="Chat Analyzer" 
              description="Decode his texts and mixed signals to see what he really means." 
              href="/chat-analyzer" 
              buttonText="Try Analyzer" 
            />
            <Card 
              variant="tool" 
              title="Profile Analyzer" 
              description="Spot red flags and personality traits before the first date." 
              href="/dating-profile-analyzer" 
              buttonText="Try Analyzer" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}
