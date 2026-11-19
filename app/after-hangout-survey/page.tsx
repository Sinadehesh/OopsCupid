import SurveyLanding, { surveyMetadata } from "@/components/survey/SurveyLanding";

export const metadata = surveyMetadata("hangout");

export default function Page() {
  return <SurveyLanding mode="hangout" />;
}
