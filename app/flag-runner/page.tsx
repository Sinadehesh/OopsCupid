import type { Metadata } from "next";
import FlagRunner from "@/components/games/FlagRunner";

const url = "https://www.oopscupid.com/flag-runner";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Flag Runner 🏃")}&q=${encodeURIComponent("Green flags grow your army. Beat the boss.")}`;

export const metadata: Metadata = {
  title: "Flag Runner: The Red Flag Game | OopsCupid",
  description: "A free runner game about dating. Steer your army of hearts through green flag gates, dodge the red flags, and beat bosses like The Ick and The Gaslighter across six levels.",
  alternates: { canonical: url },
  openGraph: { title: "Flag Runner 🏃", description: "Green flags grow your army. Red flags shrink it. Beat the boss.", url, images: [{ url: card, width: 1200, height: 630, alt: "Flag Runner" }] },
  twitter: { card: "summary_large_image", title: "Flag Runner 🏃", images: [card] },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <FlagRunner />
    </main>
  );
}
