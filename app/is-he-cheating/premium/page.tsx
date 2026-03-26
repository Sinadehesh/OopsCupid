"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InfidelityMasterReport from "@/components/report/InfidelityMasterReport";

/** Ensures whatever shape came out of localStorage is safe to render */
function normalize(raw: any) {
  const score = typeof raw?.score === "number" ? raw.score : 65;
  const riskLevel =
    raw?.riskLevel === "SEVERE" || raw?.riskLevel === "MODERATE"
      ? raw.riskLevel
      : "ELEVATED";
  const v = raw?.vectors ?? {};
  return {
    score,
    riskLevel,
    email: raw?.email ?? "",
    vectors: {
      digital:       typeof v.digital       === "number" ? v.digital       : score,
      chronological: typeof v.chronological === "number" ? v.chronological : score,
      intimacy:      typeof v.intimacy      === "number" ? v.intimacy      : score,
      micro:         typeof v.micro         === "number" ? v.micro         : score,
    },
  };
}

export default function CheatingPremiumPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("infidelity_result");
      if (stored) setData(normalize(JSON.parse(stored)));
    } catch (e) {
      // malformed JSON — fall through to "no data" state
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f8fafc] px-6 text-center">
        <h2 className="text-2xl font-black text-slate-800">No Report Found</h2>
        <p className="text-slate-500 font-medium max-w-sm">
          It looks like you haven&apos;t completed the diagnostic yet, or your session expired.
        </p>
        <button
          onClick={() => router.push("/is-he-cheating")}
          className="mt-2 bg-rose-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-rose-500 transition-colors shadow-lg"
        >
          Take the Diagnostic
        </button>
      </div>
    );
  }

  return <InfidelityMasterReport data={data} />;
}
