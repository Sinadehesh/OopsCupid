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
  title: "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
  description:
    "Not sure if he likes you or just likes the attention? OopsCupid helps women spot relationship red flags, decode mixed signals, analyze texts, and understand toxic patterns with free quizzes and tools.",
  keywords: [
    "relationship red flags",
    "is he a red flag",
    "mixed signals from a guy",
    "how to tell if he likes you",
    "toxic friendship quiz",
    "why do I attract toxic people",
    "chat analyzer relationship",
    "is he breadcrumbing me",
    "is he gaslighting me",
    "dating patterns quiz",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
    description:
      "Free quizzes and tools to spot red flags, decode texts, and understand toxic patterns. No sign-up required.",
    url: "https://oopscupid.com",
    siteName: "OopsCupid",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OopsCupid | Relationship Red Flags & Dating Quizzes",
    description:
      "Spot red flags, decode mixed signals, and understand your dating patterns. Free quizzes for women.",
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
