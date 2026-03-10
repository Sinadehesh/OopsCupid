import React from "react";
import Link from "next/link";

export default function ClarityHub() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#3B1F2B] py-20 px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Relationship Clarity Hub</h1>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">
          Psychology-backed guides and deep dives into the patterns that shape your life.
        </p>
      </section>

      {/* Article Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Featured Essay: Attachment Styles */}
          <Link href="/understanding-attachment-styles" className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="h-48 bg-[#A23B72] flex items-center justify-center p-8 text-center text-white">
              <h2 className="text-2xl font-bold">Attachment Styles, Explained</h2>
            </div>
            <div className="p-8">
              <p className="text-[#3B1F2B]/70 mb-4 italic">"The real reason you keep repeating the same relationship patterns..."</p>
              <span className="text-[#2E86AB] font-bold group-hover:underline">Read Full Essay →</span>
            </div>
          </Link>

          {/* Placeholder for future essays */}
          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col justify-center border border-dashed border-slate-300 text-center text-slate-400">
            <p className="font-medium">More Guides Coming Soon</p>
          </div>
        </div>
      </section>
    </main>
  );
}
