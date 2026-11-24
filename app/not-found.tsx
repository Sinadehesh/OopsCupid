import type { Metadata } from "next";
import Link from "next/link";
import MoreQuickTests from "@/components/tick/MoreQuickTests";
import { sticker, display } from "@/lib/ui/sticker";

export const metadata: Metadata = {
  title: "Page not found | OopsCupid",
  robots: { index: false, follow: true },
};

/** A wrong or old address still lands somewhere to play. */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#FFF4FA] text-[#1A1033] overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-5 py-14">
        <p className="text-[56px] mb-2" aria-hidden="true">🫣</p>
        <h1 className="text-[36px] md:text-5xl leading-[1.05] mb-3" style={display}>This page ghosted you</h1>
        <p className="text-[17px] font-semibold text-[#1A1033]/70 mb-6">It moved or never existed. These ones are still here:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={`inline-flex rounded-full bg-[#FF4FA3] text-white px-5 py-3 font-black ${sticker}`}>Go to the homepage</Link>
          <Link href="/games" className={`inline-flex rounded-full bg-white px-5 py-3 font-black ${sticker}`}>See every quiz</Link>
        </div>
        <MoreQuickTests title="Or take a quick one" />
      </div>
    </main>
  );
}
