import type { Metadata } from "next";
import KissTheFrogs from "@/components/games/KissTheFrogs";

const url = "https://www.oopscupid.com/kiss-the-frogs";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Kiss the Frogs 🐸")}&q=${encodeURIComponent("How many frogs until you find your prince?")}`;

export const metadata: Metadata = {
  title: "Kiss the Frogs: The Dating Merge Game | OopsCupid",
  description: "Merge frogs into clowns, ghosts and situationships until you find your prince. A free, silly 2048-style dating game.",
  alternates: { canonical: url },
  openGraph: { title: "Kiss the Frogs 🐸", description: "How many frogs until you find your prince?", url, images: [{ url: card, width: 1200, height: 630, alt: "Kiss the Frogs 🐸" }] },
  twitter: { card: "summary_large_image", title: "Kiss the Frogs 🐸", images: [card] },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF4FA] overflow-x-hidden">
      <KissTheFrogs />
    </main>
  );
}
