import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StaleAssetReload from "@/components/layout/StaleAssetReload";
import SessionProvider from "@/components/SessionProvider";
import { Analytics } from "@vercel/analytics/next";
import CookieBanner from "@/components/layout/CookieBanner";

/**
 * Google Tag Manager (GTM-56PTMMXV, with Google Analytics G-H19G7Z2YTZ set
 * up inside it). Google's install code with the loader moved inside a
 * check, because the rules differ by where the visitor is:
 *
 * - In Europe (EU, UK and neighbours, told from the device's time zone, or
 *   when the zone is unknown) the law wants a yes before analytics
 *   cookies, so the container is not even downloaded until she taps yes in
 *   the cookie banner.
 * - Everywhere else, the US included, no banner: it loads straight away,
 *   unless the browser sends Global Privacy Control or she has said no in
 *   "Cookie settings" (remembered on the device as oc-consent).
 * - Never on /survey pages: those links carry people's names and private
 *   notes in the address, and Analytics records the address.
 *
 * It runs first thing in the head, so visitors are counted from the first
 * moment, as Google's snippet would.
 */
const GTM_BOOT = String.raw`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
gtag('js',new Date());
window.ocLoadGtm=function(){if(window.ocGtm||location.pathname.indexOf('/survey')===0)return;window.ocGtm=1;gtag('consent','update',{analytics_storage:'granted'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=GTM-56PTMMXV';document.head.appendChild(s);};
var tz='';try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||'';}catch(e){}
window.ocAsk=!tz||/^(Europe|Arctic)\/|^Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe|Faeroe)$|^Asia\/(Nicosia|Famagusta)$|^Indian\/(Reunion|Mayotte)$|^America\/(Guadeloupe|Martinique|Cayenne|Marigot|St_Barthelemy)$|^(UTC|GMT|Etc\/.+|WET|CET|MET|EET|GB|GB-Eire|Eire|Iceland|Portugal|Poland)$/.test(tz);
window.ocDefault=!window.ocAsk&&!navigator.globalPrivacyControl;
var c=null;try{c=localStorage.getItem('oc-consent');}catch(e){}
if(c==='granted'||(c===null&&window.ocDefault))window.ocLoadGtm();`;

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oopscupid.com"),
  title: "OopsCupid | Free Relationship Quizzes, Tests & Red Flag Checks",
  description:
    "Free, research-informed relationship quizzes for women: is he cheating, is he manipulative, attachment style tests, toxic friend tests, and attraction pattern diagnostics, with instant scored results.",
  keywords: [
    "relationship quiz",
    "is he cheating quiz",
    "is he manipulative test",
    "attachment style quiz",
    "toxic friend test",
    "why do I attract toxic people quiz",
    "relationship red flags test",
    "is he gaslighting me quiz",
    "self sabotage relationship quiz",
    "dating patterns quiz",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "OopsCupid | Free Relationship Quizzes, Tests & Red Flag Checks",
    description:
      "Free relationship quizzes with instant scored results: cheating, manipulation, attachment styles, toxic friends, and attraction patterns. No sign-up required.",
    url: "https://www.oopscupid.com",
    siteName: "OopsCupid",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OopsCupid | Free Relationship Quizzes & Tests",
    description:
      "Spot red flags and understand your dating patterns with free, research-informed quizzes for women.",
  },
  // No site-wide canonical here: a canonical in the root layout is inherited
  // by every page that doesn't set its own, which told Google that dozens
  // of pages were copies of the homepage. Each page sets its own.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GTM_BOOT }} />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
        {/* Web Analytics. The site ran for five months with no measurement
            of any kind, traffic, funnel drop-off and conversion were all
            unknowable. Everything in lib/track.ts reports through this. */}
        <StaleAssetReload />
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
