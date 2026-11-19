import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-friend-jealous-of-me");

export default function Page() {
  return <TickPage slug="is-my-friend-jealous-of-me" />;
}
