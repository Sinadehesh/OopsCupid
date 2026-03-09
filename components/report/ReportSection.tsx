import React from "react";

export default function ReportSection({ title, content, isDarkTheme, children }: { title?: string, content?: string, isDarkTheme: boolean, children?: React.ReactNode }) {
  const tAccentLight = isDarkTheme ? "bg-[#b10f2e]/10" : "bg-[#0496ff]/5";
  const tBorder = isDarkTheme ? "border-[#de7c5a]/40" : "border-[#dee2ff]";
  const tH3 = isDarkTheme ? "text-[#280000]" : "text-[#334B63]";

  return (
    <div className={`${tAccentLight} p-6 rounded-2xl border ${tBorder} mb-6`}>
      {title && <h4 className={`text-xl font-bold ${tH3} mb-3`}>{title}</h4>}
      {content && <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">{content}</p>}
      {children}
    </div>
  );
}
