import React from "react";
import ResultGauge from "../ui/ResultGauge";
import RelativeStatus from "../ui/RelativeStatus";

export function DashboardGrid({ healthScore, gaugeScore, gaugeLabel, subject }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 w-full">
      <ResultGauge score={gaugeScore || 0} label={gaugeLabel || "SCORE"} />
      <RelativeStatus healthScore={healthScore || 0} subject={subject || "Subject"} />
    </div>
  );
}

export function MultiGaugeGrid({ dialData, percentagesData, subLabelStr, title }: any) {
  if (!dialData || !percentagesData) return null;
  return (
    <div className="mb-12">
      <h4 className="text-center text-sm font-bold text-[#8e9aaf] tracking-widest mb-6 uppercase">
        {title || "Your Profile"}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ResultGauge score={dialData["Narcissistic"]} label="Narcissist" subLabel={`${percentagesData["Narcissistic"]}% ${subLabelStr}`} size="small" />
        <ResultGauge score={dialData["Avoidant"]} label="Avoidant" subLabel={`${percentagesData["Avoidant"]}% ${subLabelStr}`} size="small" />
        <ResultGauge score={dialData["Anxious"]} label="Anxious" subLabel={`${percentagesData["Anxious"]}% ${subLabelStr}`} size="small" />
        <ResultGauge score={dialData["Depressive"]} label="Depressive" subLabel={`${percentagesData["Depressive"]}% ${subLabelStr}`} size="small" />
        <ResultGauge score={dialData["Borderline"]} label="Borderline" subLabel={`${percentagesData["Borderline"]}% ${subLabelStr}`} size="small" />
        <ResultGauge score={dialData["Secure"]} label="Secure" subLabel={`${percentagesData["Secure"]}% ${subLabelStr}`} size="small" reverseColors={true} />
      </div>
    </div>
  );
}
