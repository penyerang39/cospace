import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientOnlyBlobController from "./components/ClientOnlyBlobController";
import { getNavigation } from "./lib/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AutoReveal from "./components/AutoReveal";
import FormProgressBar from './components/FormProgressBar';
import { ThemeProvider } from "./components/ThemeProvider";
import AdminLayoutWrapper from "./components/AdminLayoutWrapper";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cospace by NEO14",
  description: "Cospace replaces a patchwork of tools (Slack, Dropbox, Asana, dashboards) with one secure workspace built for speed and clarity.",
  icons: {
    icon: [
      { url: "/favicon/neo14Icon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon/favicon.svg", sizes: "48x48", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon/neo14Icon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Cospace by NEO14",
    description: "Cospace replaces a patchwork of tools (Slack, Dropbox, Asana, dashboards) with one secure workspace built for speed and clarity.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace by NEO14",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cospace by NEO14",
    description: "Cospace replaces a patchwork of tools (Slack, Dropbox, Asana, dashboards) with one secure workspace built for speed and clarity.",
    images: [
      "/branding/neo14Logo.svg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = getNavigation();
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  
  return (
    <html lang="en">
      <head>
        {websiteId && (
          <script
            async
            src="/api/umami/script"
            data-website-id={websiteId}
            data-host-url="/api/umami"
          />
        )}
      </head>
      <body
        className={`${interFont.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
          <Navbar navigation={navigation} />
          <FormProgressBar />
          <AdminLayoutWrapper blobController={<ClientOnlyBlobController />}>
            <main className="flex-grow">
              {children}
            </main>
          </AdminLayoutWrapper>
          <AutoReveal />
          <Footer />
          <SpeedInsights />
          <div 
            id="theme-transition-overlay" 
            className="theme-transition-overlay"
            aria-hidden="true"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
