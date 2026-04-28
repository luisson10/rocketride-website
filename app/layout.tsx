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
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-bg text-text flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
