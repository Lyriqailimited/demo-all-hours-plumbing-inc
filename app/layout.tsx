import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "All Hours Plumbing | South Charlotte's Trusted Family Plumber Since 1995",
  description:
    "Family-owned plumbing serving South Charlotte for 30+ years. 4.8 stars, 104 Google reviews, BBB A+ rated. Emergency and scheduled service. Call (704) 488-8177.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
