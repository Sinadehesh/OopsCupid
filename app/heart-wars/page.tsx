import type { Metadata } from "next";
import HeartWars from "@/components/games/HeartWars";

const url = "https://www.oopscupid.com/heart-wars";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Heart Wars 🏰")}&q=${encodeURIComponent("Capture every tower from The Ex.")}`;

export const metadata: Metadata = {
  title: "Heart Wars: The Relationship Tower Battle | OopsCupid",
  description: "Send your hearts to capture the group chat, brunch and karaoke, and take every tower from The Ex, The Situationship and Cold Feet. A free strategy game.",
  alternates: { canonical: url },
  openGraph: { title: "Heart Wars 🏰", description: "Capture every tower from The Ex.", url, images: [{ url: card, width: 1200, height: 630, alt: "Heart Wars 🏰" }] },
  twitter: { card: "summary_large_image", title: "Heart Wars 🏰", images: [card] },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <HeartWars />
    </main>
  );
}
