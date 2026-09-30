import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("things-my-friend-says");

export default function Page() {
  return <TickPage slug="things-my-friend-says" />;
}
