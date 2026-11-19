import type { Metadata } from "next";
import SurveyTake from "@/components/survey/SurveyTake";

// Personal links with names in them: nothing here for search.
export const metadata: Metadata = {
  title: "Someone sent you a survey 👀 | OopsCupid",
  description: "Eight quick taps, then send your answers back.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SurveyTake />;
}
