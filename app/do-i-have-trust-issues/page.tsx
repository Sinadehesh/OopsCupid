import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("do-i-have-trust-issues");

export default function Page() {
  return <TickPage slug="do-i-have-trust-issues" />;
}
