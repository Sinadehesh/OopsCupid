import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-codependent");

export default function Page() {
  return <TickPage slug="am-i-codependent" />;
}
