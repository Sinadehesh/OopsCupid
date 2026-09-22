import WorkbookGate from "@/components/workbook/WorkbookGate";

/**
 * Week 3 sits behind the bundle. Gating at the layout means every day in
 * this week is covered without touching seven page files — and adding a
 * day later cannot accidentally ship ungated.
 */
export default function Week3Layout({ children }: { children: React.ReactNode }) {
  return <WorkbookGate week={3}>{children}</WorkbookGate>;
}
