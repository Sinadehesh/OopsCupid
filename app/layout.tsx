import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/SessionProvider";

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
  title: "OopsCupid | Free Relationship Quizzes, Tests & Red Flag Checks",
  description:
    "Free, research-informed relationship quizzes for women: is he cheating, is he manipulative, attachment style tests, toxic friend tests, and attraction pattern diagnostics — with instant scored results.",
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
    url: "https://oopscupid.com",
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
  alternates: {
    canonical: "https://oopscupid.com",
  },
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
      <body className="bg-background text-foreground font-sans antialiased">
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
