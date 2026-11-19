import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-in-limerence");

export default function Page() {
  return <TickPage slug="am-i-in-limerence" />;
}
