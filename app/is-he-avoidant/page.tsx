import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-he-avoidant");

export default function Page() {
  return <TickPage slug="is-he-avoidant" />;
}
