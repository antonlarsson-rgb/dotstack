import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
});

const jetbrainsMono = localFont({
  src: [
    { path: "../public/fonts/JetBrainsMono-Regular.woff2", weight: "400" },
    { path: "../public/fonts/JetBrainsMono-Medium.woff2", weight: "500" },
  ],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: ".stack — A single invoice, a single dashboard, one AI.",
  description:
    "Replace your entire SaaS stack with one invoice, one dashboard, and an AI that works across every tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
