import type { Metadata } from "next";
import KnowTake from "@/components/knowme/KnowTake";

// Personal links with names and answers in them: nothing here for search,
// and kept under /survey so Analytics never loads on them.
export const metadata: Metadata = {
  title: "How well do you know me? 👀 | OopsCupid",
  description: "Ten guesses. Find out how well you really know them.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <KnowTake />;
}
