import type { Metadata } from "next";
import Image from "next/image";
import { FileText, Users, History, Share2, Lock, MessageCircle, GitBranch, Download } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export const metadata: Metadata = {
  title: "Files & Docs — Real-time Collaboration in Cospace",
  description: "Create, share, and ship together. Real-time collaboration with version control that actually works. Manage all your files in one secure place.",
  openGraph: {
    title: "Files & Docs — Real-time Collaboration in Cospace",
    description: "Create, share, and ship together. Real-time collaboration with version control that actually works. Manage all your files in one secure place.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Files & Docs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Files & Docs — Real-time Collaboration in Cospace",
    description: "Create, share, and ship together. Real-time collaboration with version control that actually works. Manage all your files in one secure place.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function FilesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Files & Docs</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Create, share, and ship together. Real-time collaboration with version control that actually works.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Collaboration without compromise</h2>
            <p className="body-large max-w-2xl mx-auto">
              From quick notes to detailed specs, create and share with your team seamlessly.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature-with-gradient">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Real-time co-editing</h3>
              <p className="body-text">
                See changes as they happen. Work together without conflicts or overwrites.
              </p>
            </div>
            </div>
            <div className="card-feature-with-gradient">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Comments & suggestions</h3>
              <p className="body-text">
                Add feedback directly in context. Resolve suggestions with one click.
              </p>
            </div>
            </div>
            <div className="card-feature-with-gradient">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <History className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Version history</h3>
              <p className="body-text">
                Full change history with diff view. Restore any version instantly.
              </p>
            </div>
            </div>
            <div className="card-feature-with-gradient">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Granular permissions</h3>
              <p className="body-text">
                Control access down to the file level. Share securely with guests.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="pr-8">
              <h3 className="heading-3 mb-4">Structured templates</h3>
              <p className="body-text mb-6">
                Start fast with templates for common workflows. PRDs, meeting notes, briefs, and OKRs—all pre-formatted and ready to use.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <span className="body-text">Product requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">Meeting notes & agendas</span>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="w-5 h-5 text-accent" />
                  <span className="body-text">Project briefs & OKRs</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/updated_data.png"
                  alt="Document templates"
                  width={1600}
                  height={1200}
                  className="w-full h-auto rounded-inherit"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="gradient-border rounded-lg">
                <div className="image-frame-inner rounded-inherit">
                  <Image
                    src="/product/dashboards.png"
                    alt="File sharing interface"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Secure external sharing</h3>
              <p className="body-text mb-6">
                Share files and request uploads from anyone, even without an account. Set expiry dates and passwords for sensitive content.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-accent" />
                  <span className="body-text">Public links with controls</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-accent" />
                  <span className="body-text">File request forms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent" />
                  <span className="body-text">Password protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Types Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Work with any file type</h2>
            <p className="body-large max-w-2xl mx-auto">
              Rich preview support and powerful search across all your content.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Rich documents</h4>
                <p className="body-text">
                  Markdown docs, rich text, tables, and embedded media.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Design files</h4>
                <p className="body-text">
                  Preview Figma, Sketch, PDFs, and images without switching apps.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Spreadsheets</h4>
                <p className="body-text">
                  Import Excel and CSV files. Connect to live data sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to simplify file collaboration?</h2>
            <p className="body-large mb-8">
              Stop switching between Google Docs, Dropbox, and Notion. Keep everything connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton variant="primary" text="get started" />
              <CTAButton variant="secondary" text="book a demo" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


