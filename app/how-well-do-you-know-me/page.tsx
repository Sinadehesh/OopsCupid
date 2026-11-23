import KnowLanding, { knowMetadata } from "@/components/knowme/KnowLanding";

export const metadata = knowMetadata("bestie");

export default function Page() {
  return <KnowLanding mode="bestie" />;
}
