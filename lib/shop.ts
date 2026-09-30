/** The merch shop: printed, shipped and supported by Spreadshop. */
export const SHOP_URL = "https://oopscupid.myspreadshop.co.uk/";

/** The shop link, tagged with where on the site it was tapped. */
export function shopUrl(from: string) {
  return `${SHOP_URL}?utm_source=oopscupid&utm_medium=site&utm_campaign=${encodeURIComponent(from)}`;
}
