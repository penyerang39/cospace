import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getNavigation } from "./lib/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cospace by NEO14",
  description: "Cospace replaces a patchwork of tools (Slack, Dropbox, Asana, dashboards) with one secure workspace built for speed and clarity.",
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = getNavigation();
  
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} antialiased`}
      >
        <Navbar navigation={navigation} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
