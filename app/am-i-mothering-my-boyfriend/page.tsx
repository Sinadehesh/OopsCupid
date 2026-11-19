import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-mothering-my-boyfriend");

export default function Page() {
  return <TickPage slug="am-i-mothering-my-boyfriend" />;
}
