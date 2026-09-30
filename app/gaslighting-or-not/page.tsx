import { choiceMetadata, ChoicePage } from "@/lib/quizzes/tickPage";

export const metadata = choiceMetadata("gaslighting-or-not");

export default function Page() {
  return <ChoicePage slug="gaslighting-or-not" />;
}
