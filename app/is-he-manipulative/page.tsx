import React from "react";
import ManipulationQuizWidget from "@/components/features/ManipulationQuizWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is He Manipulating Me? | Clinical Screening Test | OopsCupid",
  description: "Free, psychology-backed screening tool to identify signs of coercive control, gaslighting, and psychological abuse.",
};

export default function IsHeManipulativePage() {
  return (
    <main className="min-h-screen bg-[#f2f5fa] relative overflow-hidden pb-20">
      {/* THE FIXED RED SIDEBARS */}
      <div className="fixed top-0 left-0 w-3 md:w-6 lg:w-10 h-full bg-[#650000] border-r-4 border-[#490000] z-50 pointer-events-none shadow-[4px_0_15px_rgba(101,0,0,0.2)]"></div>
      <div className="fixed top-0 right-0 w-3 md:w-6 lg:w-10 h-full bg-[#650000] border-l-4 border-[#490000] z-50 pointer-events-none shadow-[-4px_0_15px_rgba(101,0,0,0.2)]"></div>

      {/* Hero Header */}
      <header className="bg-[#2a2522] text-white py-24 px-12 md:px-20 text-center relative z-10 shadow-xl border-b-[6px] border-[#650000]">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#ced2dc] font-black tracking-[0.2em] mb-4 uppercase text-sm">Clinical Screening</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Is He Manipulating You?
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto text-[#f2f5fa]">
            Take the validated 93-item clinical battery to map exact coercion tactics, isolation patterns, and gaslighting.
          </p>
        </div>
      </header>

      {/* Quiz Section */}
      <section className="py-16 px-8 md:px-20 -mt-12 relative z-20">
        <ManipulationQuizWidget />
      </section>
    </main>
  );
}
