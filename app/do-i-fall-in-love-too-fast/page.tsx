import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("do-i-fall-in-love-too-fast");

export default function Page() {
  return <TickPage slug="do-i-fall-in-love-too-fast" />;
}
