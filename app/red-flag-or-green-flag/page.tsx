import type { Metadata } from "next";
import FlagGame from "@/components/tick/FlagGame";

const url = "https://www.oopscupid.com/red-flag-or-green-flag";
const card = `https://www.oopscupid.com/api/og?t=${encodeURIComponent("Red flag or green flag?")}&q=${encodeURIComponent("Swipe game · 16 cards")}`;

export const metadata: Metadata = {
  title: "Red Flag or Green Flag? The Swipe Game | OopsCupid",
  description: "Swipe 16 dating moments left for red flag, right for green. Get the verdict and the reason after every card, and find out how sharp your red flag radar is. Free.",
  alternates: { canonical: url },
  openGraph: { title: "Red flag or green flag? 🚦", description: "Swipe 16 dating moments. How sharp is your red flag radar?", url, images: [{ url: card, width: 1200, height: 630, alt: "Red flag or green flag?" }] },
  twitter: { card: "summary_large_image", title: "Red flag or green flag? 🚦", images: [card] },
};

export default function Page() {
  return <FlagGame />;
}
