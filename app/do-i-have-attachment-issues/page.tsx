import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("do-i-have-attachment-issues");

export default function Page() {
  return <TickPage slug="do-i-have-attachment-issues" />;
}
