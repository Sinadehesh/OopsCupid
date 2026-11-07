import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-scared-of-love");

export default function Page() {
  return <TickPage slug="am-i-scared-of-love" />;
}
