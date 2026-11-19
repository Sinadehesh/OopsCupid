import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-he-breadcrumbing-me");

export default function Page() {
  return <TickPage slug="is-he-breadcrumbing-me" />;
}
