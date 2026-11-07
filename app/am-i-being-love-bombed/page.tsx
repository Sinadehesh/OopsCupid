import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-being-love-bombed");

export default function Page() {
  return <TickPage slug="am-i-being-love-bombed" />;
}
