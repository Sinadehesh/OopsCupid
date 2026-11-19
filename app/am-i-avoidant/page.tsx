import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-avoidant");

export default function Page() {
  return <TickPage slug="am-i-avoidant" />;
}
