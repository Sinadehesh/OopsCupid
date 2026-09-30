import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("after-a-good-weekend");

export default function Page() {
  return <TickPage slug="after-a-good-weekend" />;
}
