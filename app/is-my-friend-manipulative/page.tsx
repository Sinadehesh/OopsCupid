import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-friend-manipulative");

export default function Page() {
  return <TickPage slug="is-my-friend-manipulative" />;
}
