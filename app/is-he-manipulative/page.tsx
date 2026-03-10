import React from "react";
import ManipulationQuizWidget from "@/components/features/ManipulationQuizWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is He Manipulating Me? | Clinical Screening Test | OopsCupid",
  description: "Free, psychology-backed screening tool to identify signs of coercive control, gaslighting, and psychological abuse.",
};

export default function IsHeManipulativePage() {
  return (
    <main className="min-h-screen bg-[#FDF6EE]">
      {/* Hero Header */}
      <header className="bg-[#3B1F2B] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#A23B72] font-black tracking-widest mb-4 uppercase text-sm">Psychological Screening</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Is He Manipulating You?
          </h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Take the validated 20-item screening to see if your relationship crosses the clinical threshold for psychological friction.
          </p>
        </div>
      </header>

      {/* Quiz Section */}
      <section className="py-16 px-4 md:px-10 -mt-10 relative z-20">
        <ManipulationQuizWidget />
      </section>
      
      {/* Educational Context below the fold */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-[#3B1F2B]">
        <h2 className="text-3xl font-bold mb-6 text-center">Why You Should Take This Test</h2>
        <p className="text-lg leading-relaxed mb-6">
          Manipulation is rarely obvious. It doesn't usually look like a movie villain demanding control. 
          Instead, it looks like confusion. It looks like apologizing when you didn't do anything wrong. 
          It looks like slowly shrinking your world to keep the peace.
        </p>
        <p className="text-lg leading-relaxed">
          This battery uses structured clinical frameworks (including the PAR scale) to measure specific 
          behaviors: how demands are made, how threats are implied, and how reality is distorted over time.
        </p>
      </section>
    </main>
  );
}
