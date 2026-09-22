import WorkbookGate from "@/components/workbook/WorkbookGate";

/**
 * Week 2 sits behind the bundle. Gating at the layout means every day in
 * this week is covered without touching seven page files — and adding a
 * day later cannot accidentally ship ungated.
 */
export default function Week2Layout({ children }: { children: React.ReactNode }) {
  return <WorkbookGate week={2}>{children}</WorkbookGate>;
}
