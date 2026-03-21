import ManipulationQuizEngine from "./_components/ManipulationQuizEngine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is He Manipulative? | Clinical Screening Test | OopsCupid",
  description: "Free, psychology-backed screening tool to identify signs of coercive control, gaslighting, and psychological abuse.",
};

export default function IsHeManipulativePage() {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      <ManipulationQuizEngine />
    </main>
  );
}
