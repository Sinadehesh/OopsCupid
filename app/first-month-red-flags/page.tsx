import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("first-month-red-flags");

export default function Page() {
  return <TickPage slug="first-month-red-flags" />;
}
