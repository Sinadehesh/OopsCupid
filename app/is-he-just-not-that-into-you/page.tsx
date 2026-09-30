import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-he-just-not-that-into-you");

export default function Page() {
  return <TickPage slug="is-he-just-not-that-into-you" />;
}
