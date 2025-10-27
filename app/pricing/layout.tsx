import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cospace Pricing — Free, Pro, Business, Enterprise",
  description: "Simple, scalable plans. Start free and upgrade as you grow.",
  openGraph: {
    title: "Cospace Pricing — Free, Pro, Business, Enterprise",
    description: "Simple, scalable plans. Start free and upgrade as you grow.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cospace Pricing — Free, Pro, Business, Enterprise",
    description: "Simple, scalable plans. Start free and upgrade as you grow.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
