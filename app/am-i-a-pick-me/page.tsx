import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-a-pick-me");

export default function Page() {
  return <TickPage slug="am-i-a-pick-me" />;
}
