import MainHero from "@/components/ui/MainHero";
import ToolForm from "@/components/features/ToolForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dating Profile Analyzer | OopsCupid",
  description: "Use our Dating Profile Analyzer to get objective feedback and stop overthinking.",
};

export default function ToolPage() {
  return (
    <>
      <MainHero
        headline="Dating Profile Analyzer"
        subheadline="Paste the details below and let AI provide the harsh (but helpful) truth."
      />
      <div className="container mx-auto px-4 py-16">
        <ToolForm toolName="Dating Profile Analyzer" endpoint="/api/dating-profile-analyzer" placeholderText="Paste your hinge prompts or completely describe your profile..." />
      </div>
    </>
  );
}