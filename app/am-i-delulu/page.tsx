import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-delulu");

export default function Page() {
  return <TickPage slug="am-i-delulu" />;
}
