import SurveyLanding, { surveyMetadata } from "@/components/survey/SurveyLanding";

export const metadata = surveyMetadata("date");

export default function Page() {
  return <SurveyLanding mode="date" />;
}
