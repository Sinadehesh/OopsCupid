import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, readAccessToken } from "@/lib/stripe/access";

export const dynamic = "force-dynamic";

/**
 * What is the current visitor entitled to?
 *
 * Reads the httpOnly, server-signed cookie — the browser cannot forge or
 * edit it. Premium pages call this before rendering paid content.
 */
export async function GET(req: NextRequest) {
  const claims = readAccessToken(req.cookies.get(ACCESS_COOKIE)?.value);

  if (!claims) {
    return NextResponse.json({ premiumReport: false, workbook: false, coaching: false });
  }

  return NextResponse.json({
    premiumReport: claims.premiumReport,
    workbook: claims.workbook,
    coaching: claims.coaching,
    sku: claims.sku,
  });
}
