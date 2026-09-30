import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("are-you-the-therapist-friend");

export default function Page() {
  return <TickPage slug="are-you-the-therapist-friend" />;
}
