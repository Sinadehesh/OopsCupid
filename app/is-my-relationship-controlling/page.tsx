import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-relationship-controlling");

export default function Page() {
  return <TickPage slug="is-my-relationship-controlling" />;
}
