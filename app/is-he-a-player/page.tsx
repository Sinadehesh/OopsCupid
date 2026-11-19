import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-he-a-player");

export default function Page() {
  return <TickPage slug="is-he-a-player" />;
}
