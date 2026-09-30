import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-he-a-mamas-boy");

export default function Page() {
  return <TickPage slug="is-he-a-mamas-boy" />;
}
