"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PremiumReport from "../_components/PremiumReport";
import { ShieldAlert } from "lucide-react";

export default function PremiumToxicAttractionPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Retrieve the user's specific diagnostic data from local storage
  useEffect(() => {
    const stored = localStorage.getItem("toxic_attraction_result");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored result", e);
      }
    }
    setLoading(false);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Toxic Attraction Profile",
        text: "I just uncovered my subconscious dating blind spots.",
        url: window.location.origin + "/why-do-i-attract-toxic-people",
      });
    } catch (err) {
      console.log("Share failed or unsupported", err);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800">Decrypting Master-File...</h2>
      </div>
    );
  }

  // Fallback if they navigated here directly without taking the quiz
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] text-center px-6">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">No Profile Found</h2>
        <p className="text-slate-600 mb-8 max-w-md">We couldn't find your diagnostic data. Please retake the audit to generate your custom Master-File.</p>
        <button onClick={() => router.push('/why-do-i-attract-toxic-people')} className="bg-rose-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-rose-700 transition-colors">
          Retake Diagnostic
        </button>
      </div>
    );
  }

  // Render the Phase 3 Premium Report Component
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PremiumReport data={data} handleShare={handleShare} />
    </div>
  );
}
