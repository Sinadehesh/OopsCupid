import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("am-i-the-mom-friend");

export default function Page() {
  return <TickPage slug="am-i-the-mom-friend" />;
}
