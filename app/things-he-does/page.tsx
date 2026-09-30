import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("things-he-does");

export default function Page() {
  return <TickPage slug="things-he-does" />;
}
