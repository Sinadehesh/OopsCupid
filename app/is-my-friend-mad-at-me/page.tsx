import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-friend-mad-at-me");

export default function Page() {
  return <TickPage slug="is-my-friend-mad-at-me" />;
}
