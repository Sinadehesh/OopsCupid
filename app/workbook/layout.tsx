import WorkbookAutosaveFromPath from "@/components/workbook/WorkbookAutosaveFromPath";

/**
 * Every page under /workbook keeps what is typed into it.
 *
 * This lives in the layout on purpose. Persistence that each page has to
 * opt into is persistence that forty-four pages forgot, which is exactly
 * what happened here: people wrote a week of honest answers into a €49
 * product and closed the tab on all of it.
 */
export default function WorkbookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WorkbookAutosaveFromPath />
    </>
  );
}
