import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("when-it-gets-serious");

export default function Page() {
  return <TickPage slug="when-it-gets-serious" />;
}
