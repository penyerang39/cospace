import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo — See Cospace in Action",
  description: "Schedule a personalized demo to see how Cospace can streamline your team's workflow and boost productivity.",
  openGraph: {
    title: "Request a Demo — See Cospace in Action",
    description: "Schedule a personalized demo to see how Cospace can streamline your team's workflow and boost productivity.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Demo — See Cospace in Action",
    description: "Schedule a personalized demo to see how Cospace can streamline your team's workflow and boost productivity.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
