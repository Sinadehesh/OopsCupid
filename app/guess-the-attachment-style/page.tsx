import { choiceMetadata, ChoicePage } from "@/lib/quizzes/tickPage";

export const metadata = choiceMetadata("guess-the-attachment-style");

export default function Page() {
  return <ChoicePage slug="guess-the-attachment-style" />;
}
