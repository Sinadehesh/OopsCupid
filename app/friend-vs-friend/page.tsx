import { versusMetadata, VersusPage } from "@/lib/quizzes/tickPage";

export const metadata = versusMetadata("friend-vs-friend");

export default function Page() {
  return <VersusPage slug="friend-vs-friend" />;
}
