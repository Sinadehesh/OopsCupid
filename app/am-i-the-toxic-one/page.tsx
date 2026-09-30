import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-the-toxic-one");

export default function Page() {
  return <TickPage slug="am-i-the-toxic-one" />;
}
