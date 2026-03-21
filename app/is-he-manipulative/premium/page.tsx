"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ManipulationMasterReport from "@/components/report/ManipulationMasterReport";

export default function ManipulationPremiumPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("manipulation_result");
    if (stored) {
      try { setData(JSON.parse(stored)); } catch (e) {}
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]"><div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div></div>;
  if (!data) return <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]"><h2 className="text-2xl font-bold mb-4">No Data Found</h2><button onClick={() => router.push('/is-he-manipulative')} className="bg-slate-900 text-white px-6 py-3 rounded-lg">Retake Diagnostic</button></div>;

  return <ManipulationMasterReport data={data} />;
}
