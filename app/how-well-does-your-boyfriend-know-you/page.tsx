import KnowLanding, { knowMetadata } from "@/components/knowme/KnowLanding";

export const metadata = knowMetadata("boyfriend");

export default function Page() {
  return <KnowLanding mode="boyfriend" />;
}
