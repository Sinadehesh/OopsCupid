import { tickMetadata, TickPage } from "@/lib/quizzes/tickPage";

export const metadata = tickMetadata("is-my-fwb-catching-feelings");

export default function Page() {
  return <TickPage slug="is-my-fwb-catching-feelings" />;
}
