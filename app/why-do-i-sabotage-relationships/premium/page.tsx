import React from "react";
import SabotageReport from "../_components/SabotageReport";

export const metadata = {
  title: "Premium Sabotage Analysis | OopsCupid",
};

export default function PremiumSabotagePage({ searchParams }: { searchParams: { id?: string } }) {
  // In production, fetch the generated 'result' object from DB using searchParams.id
  // This mock prevents the page from crashing while you hook up the DB route.
  const mockResult = {
    level: 3,
    levelData: { title: "High Alert", subtitle: "You run at the first sign of safety.", advice: "You must break the trigger chain." },
    archetype: "The Hyper-Vigilant Tester",
    composites: { anxiousPattern: 65, avoidantPattern: 45, vulnerabilityScore: 70, defenseScore: 85 },
    subscales: [{ key: "1", label: "Fear of Engulfment", pct: 80 }, { key: "2", label: "Rejection Sensitivity", pct: 90 }],
    topDrivers: [{ label: "Perfectionism" }, { label: "Control" }]
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">The Anatomy of Your Defenses</h1>
        <p className="text-slate-500 text-lg">Here is exactly how you protect yourself from being loved.</p>
      </div>
      <SabotageReport result={mockResult} />
    </main>
  );
}
