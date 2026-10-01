import type { Metadata } from "next";
import LoveTower from "@/components/games/LoveTower";

const url = "https://www.oopscupid.com/love-tower";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Love Tower 🏗️")}&q=${encodeURIComponent("How far can your relationship get?")}`;

export const metadata: Metadata = {
  title: "Love Tower: The Relationship Stacking Game | OopsCupid",
  description: "Stack every milestone of a relationship, from the first DM to the golden anniversary. Line them up perfectly or it all falls apart. A free, silly game.",
  alternates: { canonical: url },
  openGraph: { title: "Love Tower 🏗️", description: "How far can your relationship get before it falls apart?", url, images: [{ url: card, width: 1200, height: 630, alt: "Love Tower" }] },
  twitter: { card: "summary_large_image", title: "Love Tower 🏗️", images: [card] },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <LoveTower />
    </main>
  );
}
