import MainHero from "@/components/ui/MainHero";
import ToolForm from "@/components/features/ToolForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Analyzer | OopsCupid",
  description: "Use our Chat Analyzer to get objective feedback and stop overthinking.",
};

export default function ToolPage() {
  return (
    <>
      <MainHero
        headline="Chat Analyzer"
        subheadline="Paste the details below and let AI provide the harsh (but helpful) truth."
      />
      <div className="container mx-auto px-4 py-16">
        <ToolForm toolName="Chat Analyzer" endpoint="/api/chat-analyzer" placeholderText="Paste the screenshot text directly or type the conversation here..." />
      </div>
    </>
  );
}