import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("does-he-have-narcissistic-traits");

export default function Page() {
  return <TickPage slug="does-he-have-narcissistic-traits" />;
}
