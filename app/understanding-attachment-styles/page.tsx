import React from "react";
import Link from "next/link";

export default function AttachmentEssay() {
  return (
    <article className="min-h-screen bg-white font-sans text-[#3B1F2B]">
      {/* Hero Header using Dark Plum and Magenta */}
      <header className="bg-[#3B1F2B] text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#F18F01] font-bold tracking-widest mb-4 uppercase">Psychology Deep Dive</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Attachment Styles, Explained: The Real Reason You Keep Repeating Relationship Patterns
          </h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 text-lg leading-relaxed">
        <p className="mb-8 font-bold text-xl">You tell yourself this time will be different. And then it happens again.</p>
        
        <p className="mb-6">You meet someone promising, feel the spark, and within weeks you are back in the same emotional maze: overthinking texts, feeling sick when they pull away, or suddenly losing interest the moment someone gets too close.</p>

        {/* CTA 1 - Blue Accents */}
        <div className="my-12 p-8 bg-[#2E86AB]/5 rounded-3xl border-2 border-dashed border-[#2E86AB]/30 text-center">
          <h3 className="text-2xl font-bold mb-4">Don't just read about it—find your blueprint.</h3>
          <Link href="/attachment-style-quiz" className="inline-block bg-[#2E86AB] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Take the Free Attachment Quiz →
          </Link>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-[#A23B72]">Your Attachment Style Is Not Random</h2>
        <p className="mb-6">At the core of attachment are two psychological dimensions: <strong>Anxiety</strong> and <strong>Avoidance</strong>. Attachment anxiety is the fear of rejection, while avoidance is discomfort with emotional closeness.</p>
        
        <h2 className="text-3xl font-bold mt-12 mb-6 text-[#C73E1D]">The Free Result is the Label. The Master Report is the Map.</h2>
        <p className="mb-6">A free test can name the pattern, but the <strong>OopsCupid Master Report</strong> shows you the architecture. It reveals your Attachment Quadrant Map and the Circular Data Rings that track your Self-Worth Index.</p>

        {/* FINAL PREMIUM CTA - High Contrast Red */}
        <div className="mt-20 p-10 bg-[#3B1F2B] text-white rounded-[40px] text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">Ready to break the cycle?</h2>
          <p className="text-[#F18F01] text-xl mb-8 font-medium">Get the full Master Report and see the exact childhood schemas driving your dating choices.</p>
          <Link href="/attachment-style-quiz" className="inline-block bg-[#C73E1D] text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-[#A83519] transition-all hover:scale-105">
            Start Quiz & Unlock Report
          </Link>
        </div>
      </div>
    </article>
  );
}
