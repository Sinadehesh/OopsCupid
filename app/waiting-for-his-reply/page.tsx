import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("waiting-for-his-reply");

export default function Page() {
  return <TickPage slug="waiting-for-his-reply" />;
}
