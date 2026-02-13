import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Stream - Global News Aggregator",
  description:
    "Stay informed with the latest news from around the world, powered by Valyu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} antialiased`}
      >
        {children}
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          Built with love. Powered by{" "}
          <a
            href="https://docs.valyu.ai/search/quickstart"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Valyu Search
          </a>
        </footer>
      </body>
    </html>
  );
}
