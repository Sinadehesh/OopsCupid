import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides/guides";
import GuideCards from "@/components/guides/GuideCards";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import MerchCard from "@/components/shop/MerchCard";
import { display } from "@/lib/ui/sticker";

export const metadata: Metadata = {
  title: "Relationship Guides: Red Flags, Overthinking, Hot and Cold | OopsCupid",
  description: "Short, fun, research-based guides to the things that keep you up at night: checking if he's online, red flags, hot-and-cold men, frenemies and more. €1.99 each.",
  alternates: { canonical: "https://www.oopscupid.com/guides" },
};

export default function GuidesIndex() {
  return (
    <main className="min-h-screen bg-[#FFF4FA]">
      <div className="max-w-2xl mx-auto px-5 py-8 md:py-14">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E07850] mb-2">Ten-minute reads · €1.99 each</p>
        <h1 className="text-[44px] md:text-6xl text-[#1A1033] leading-[1] mb-3" style={display}>The guides 📖</h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
          What's actually going on, in plain words, with the research behind it. The first part of every guide is free.
        </p>
        <GuideCards guides={GUIDES} title="Pick one" />
        <MerchCard from="guides-index" />
        <MoreQuickTests title="Or take a 40-second test" />
      </div>
    </main>
  );
}
