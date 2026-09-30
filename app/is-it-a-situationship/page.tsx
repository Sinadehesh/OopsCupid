import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-it-a-situationship");

export default function Page() {
  return <TickPage slug="is-it-a-situationship" />;
}
