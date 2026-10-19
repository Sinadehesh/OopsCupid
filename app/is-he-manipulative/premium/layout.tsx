import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Paid or private pages: keep them out of search results. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
