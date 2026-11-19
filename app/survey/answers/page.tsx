import type { Metadata } from "next";
import SurveyAnswers from "@/components/survey/SurveyAnswers";

export const metadata: Metadata = {
  title: "Their answers 💌 | OopsCupid",
  description: "The answers to your survey.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SurveyAnswers />;
}
