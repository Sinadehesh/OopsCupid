import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-boyfriend-toxic");

export default function Page() {
  return <TickPage slug="is-my-boyfriend-toxic" />;
}
