import React from "react";
import ResultGauge from "../ui/ResultGauge";

export default function AttachmentQuadrant({ dialData, isDarkTheme }: { dialData: Record<string, number>, isDarkTheme: boolean }) {
  return (
    <div className="mb-10">
      <h4 className={`text-center text-sm font-bold ${isDarkTheme ? "text-[#8f2d56]" : "text-[#006ba6]"} tracking-widest mb-6 uppercase`}>
        Attachment Dimensions (ECR-RS)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <ResultGauge score={dialData["Anxiety"] || 0} label="Attachment Anxiety" subLabel={`Severity: ${dialData["Anxiety"] || 0}/100`} />
        <ResultGauge score={dialData["Avoidance"] || 0} label="Attachment Avoidance" subLabel={`Severity: ${dialData["Avoidance"] || 0}/100`} />
      </div>
    </div>
  );
}
