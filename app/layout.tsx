import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RocketRide — Build AI your whole team can run",
  description:
    "RocketRide turns AI projects into structured, maintainable AI pipelines. Ship faster, run cheaper, and never inherit a black box again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full bg-icon-tile text-text flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
