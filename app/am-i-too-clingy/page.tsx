import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-too-clingy");

export default function Page() {
  return <TickPage slug="am-i-too-clingy" />;
}
