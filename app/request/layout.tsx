import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Pricing - See Cospace in Action",
  description: "Schedule a personalized demo to see how Cospace can streamline your team's workflow and boost productivity.",
  openGraph: {
    title: "Request Pricing - See Cospace in Action",
    description: "Schedule a personalized demo to see how Cospace can streamline your team's workflow and boost productivity.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Early Access",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Early Access — Join Cospace Beta",
    description: "Be among the first to experience Cospace. Join our beta program and help shape the future of team collaboration.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
