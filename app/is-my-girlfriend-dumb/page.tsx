import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-girlfriend-dumb");

export default function Page() {
  return <TickPage slug="is-my-girlfriend-dumb" />;
}
