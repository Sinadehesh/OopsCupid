import { choiceMetadata, ChoicePage } from "@/lib/quizzes/tickPage";

export const metadata = choiceMetadata("friend-or-frenemy");

export default function Page() {
  return <ChoicePage slug="friend-or-frenemy" />;
}
