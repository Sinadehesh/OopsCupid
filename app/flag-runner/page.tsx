import type { Metadata } from "next";
import FlagRunner from "@/components/games/FlagRunner";

const url = "https://www.oopscupid.com/flag-runner";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Flag Runner 🏃")}&q=${encodeURIComponent("Green flags fill her heart. Red flags bring the ick.")}`;

export const metadata: Metadata = {
  title: "Flag Runner: The Red Flag Game | OopsCupid",
  description: "A free runner game about dating. Run through the green flags to fill her heart, dodge the red ones before the ick wins. Sixteen spicy levels, from the apps to the proposal.",
  alternates: { canonical: url },
  openGraph: { title: "Flag Runner 🏃", description: "Green flags fill her heart. Three red flags and the ick wins.", url, images: [{ url: card, width: 1200, height: 630, alt: "Flag Runner" }] },
  twitter: { card: "summary_large_image", title: "Flag Runner 🏃", images: [card] },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <FlagRunner />
    </main>
  );
}
