import WorkbookGate from "@/components/workbook/WorkbookGate";

/**
 * Week 6 sits behind the bundle. Gating at the layout means every day in
 * this week is covered without touching seven page files — and adding a
 * day later cannot accidentally ship ungated.
 */
export default function Week6Layout({ children }: { children: React.ReactNode }) {
  return <WorkbookGate week={6}>{children}</WorkbookGate>;
}
