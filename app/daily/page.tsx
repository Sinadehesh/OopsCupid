import type { Metadata } from "next";
import DailyHub from "@/components/games/DailyHub";

const url = "https://www.oopscupid.com/daily";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Today's challenges 📅")}&q=${encodeURIComponent("Keep your streak alive 🔥")}`;

export const metadata: Metadata = {
  title: "Daily Challenge: 5 Flags a Day | OopsCupid",
  description: "Five red-or-green flag calls a day, the same for everyone, plus daily challenges in Love Tower, Kiss the Frogs and Heart Wars. Keep your streak alive.",
  alternates: { canonical: url },
  openGraph: { title: "Today's challenges 📅", description: "Five flags a day. Keep your streak alive 🔥", url, images: [{ url: card, width: 1200, height: 630, alt: "OopsCupid daily" }] },
  twitter: { card: "summary_large_image", title: "Today's challenges 📅", images: [card] },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <DailyHub />
    </main>
  );
}
