import type { Metadata } from "next";
import Image from "next/image";
import { LayoutDashboard, Zap, ShieldCheck, Sparkles, Users, Activity, Globe, MessageSquare, FileText, Blocks, BarChart3, Hash, Mic, Video, Search, Clock, UserPlus, History, Share2, Lock, MessageCircle, GitBranch, Download, Database, Bell, Brain, TrendingUp, RefreshCw, AlertTriangle, Workflow, Settings, Play, Code, Bug, Rocket, CheckCircle, Target, Calendar, Megaphone, Palette, Layers, Eye, ChevronDown } from "lucide-react";
import CTAButton from "./components/CTAButton";
import CTALink from "./components/CTALink";

export const metadata: Metadata = {
  title: "Cospace by NEO14 — Your private digital office",
  description: "Chat, files, tasks, meetings, and live dashboards in one secure workspace. Replace app‑sprawl with clarity. Free plan available.",
  openGraph: {
    title: "Cospace by NEO14 — Your private digital office",
    description: "Chat, files, tasks, meetings, and live dashboards in one secure workspace. Replace app‑sprawl with clarity. Free plan available.",
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
    title: "Cospace by NEO14 — Your private digital office",
    description: "Chat, files, tasks, meetings, and live dashboards in one secure workspace. Replace app‑sprawl with clarity. Free plan available.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding md:min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Background - extends beyond section */}
        <div className="absolute -top-32 -bottom-32 -left-1/4 -right-1/4 w-[150%] h-[150%]">
          <div className="noise-overlay"></div>
        </div>
        
        <div className="max-width container-padding w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-end md:items-center">
            {/* Image - shown first on mobile, second on desktop */}
            <div className="order-1 md:order-2">
              <div className="relative w-full h-flex md:h-[50vh]">
                <Image
                  src="/product/updated_projects.png"
                  alt="Cospace projects overview"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Text content - shown second on mobile, first on desktop */}
            <div className="order-2 md:order-1">
              <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left">
                <h1 className="heading-1 mb-6">
                  Meet <span className="gradient-text">Cospace</span> by NEO14
                </h1>
                <p className="body-large mb-8 max-w-2xl md:max-w-xl mx-auto md:mx-0">
                  Imagine running all your work from one calm, powerful place. Chat, meet, plan, share files, and track data—without the app‑hopping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-6">
                  <CTAButton variant="primary" text="get started" />
                  <CTAButton variant="secondary" text="book a demo" />
                </div>
                <p className="body-small">
                  Free plan available. No credit card required.
                </p>
              </div>
            </div>
          </div>
          <div>
            {/* Carousel - visible on md and above */}
            <div className="hidden md:block overflow-hidden mt-10">
              <div className="flex animate-scroll">
                <div className="flex space-x-8 whitespace-nowrap">
                  {/* First set */}
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>10,000+ workspaces created</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Activity className="w-4 h-4 text-accent" />
                    <span>99.95% uptime</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Real-time sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>AI-powered features</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>AES-256 encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>SSO/SAML</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Granular access control</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Audit logs</span>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>10,000+ workspaces created</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Activity className="w-4 h-4 text-accent" />
                    <span>99.95% uptime</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Real-time sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>AI-powered features</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>AES-256 encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Users className="w-4 h-4 text-accent" />
                    <span>SSO/SAML</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>EU & US hosting</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Granular access control</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground/70">
                    <FileText className="w-4 h-4 text-accent" />
                    <span>Audit logs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="section-padding" aria-labelledby="value-pillars-heading">
        <div className="max-width container-padding">
          <header className="text-center mb-16">
            <h2 id="value-pillars-heading" className="heading-2 mb-4">Built for modern teams</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything you need to work together, securely and efficiently.
            </p>
          </header>
          <ul className="grid-features" role="list">
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <LayoutDashboard className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">One workspace, zero chaos</h3>
                <p className="body-text">
                  Messages, docs, tasks, and dashboards stay linked to the work.
                </p>
              </div>
            </li>
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">Fast by default</h3>
                <p className="body-text">
                  Real‑time sync, lightning search, and clean UI keep teams moving.
                </p>
              </div>
            </li>
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">Secure for serious teams</h3>
                <p className="body-text">
                  End‑to‑end encryption at rest and in transit, SSO/SAML, roles, and audit trails.
                </p>
              </div>
            </li>
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">AI‑assisted where it matters</h3>
                <p className="body-text">
                  Draft docs, summarize threads, and surface trends in your data.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== PRODUCT FEATURES HEADER ===== */}
      <section className="section-padding" aria-labelledby="product-features-heading">
        <div className="max-width container-padding">
          <header className="text-center">
            <h2 id="product-features-heading" className="heading-2 mb-4">What NEO14 Can Do</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything you need to collaborate, create, and manage your work.
            </p>
          </header>
        </div>
      </section>

      {/* Chat & Meetings */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-8">
              <h3 className="heading-3 mb-4">Chat & Meetings</h3>
              <p className="body-text mb-6">
                Conversations that stay connected to the work. Channels for teams, threads for focus, and instant video calls when you need them.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Organized channels with searchable history</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Threads that keep discussions tidy</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Voice clips for async updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">1-click huddles with screen sharing</span>
                </li>
              </ul>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/updated_chat.png"
                  alt="Chat & Meetings interface"
                  width={1600}
                  height={1200}
                  className="w-full h-auto rounded-inherit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Files & Docs */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="gradient-border rounded-lg">
                <div className="image-frame-inner rounded-inherit">
                  <Image
                    src="/product/files_main_screen.png"
                    alt="Files & Docs interface"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Files & Docs</h3>
              <p className="body-text mb-6">
                Create, share, and ship together. Real-time collaboration with version control that actually works.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Real-time co-editing without conflicts</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Comments & suggestions in context</span>
                </li>
                <li className="flex items-center gap-3">
                  <History className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Full version history with diff view</span>
                </li>
                <li className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Granular permissions & secure sharing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AppBuilder */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-8">
              <h3 className="heading-3 mb-4">AppBuilder</h3>
              <p className="body-text mb-6">
                Internal tools without ticketing the dev team. Build forms, dashboards, and workflows visually in minutes.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <Blocks className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Point-and-click visual builder</span>
                </li>
                <li className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Connect Google Sheets, Postgres, APIs</span>
                </li>
                <li className="flex items-center gap-3">
                  <Workflow className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Automate approvals & notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Granular permissions per app</span>
                </li>
              </ul>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/datamodel.png"
                  alt="AppBuilder interface"
                  width={1600}
                  height={1200}
                  className="w-full h-auto rounded-inherit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data & Dashboards */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="gradient-border rounded-lg">
                <div className="image-frame-inner rounded-inherit">
                  <Image
                    src="/product/dashboards.png"
                    alt="Data & Dashboards interface"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Data & Dashboards</h3>
              <p className="body-text mb-6">
                All your key metrics—live and trustworthy. Connect data sources, build charts, and get AI insights without the complexity.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">No-code connections to any data source</span>
                </li>
                <li className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Live charts & tables with smart formatting</span>
                </li>
                <li className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">AI insights & trend analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-accent" aria-hidden="true" />
                  <span className="body-text">Smart alerting when metrics change</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS AREA - Black Background Container ===== */}
      <div className="bg-black">
      {/* ===== SOLUTIONS HEADER ===== */}
        <section className="section-padding text-white" aria-labelledby="solutions-heading">
        <div className="max-width container-padding">
          <header className="text-center">
            <h2 id="solutions-heading" className="heading-2 mb-4 !text-white">NEO14 for any Workflow</h2>
            <p className="body-large max-w-2xl mx-auto !text-white">
              Tailored workflows for every team: marketing, design, software, and government.
            </p>
          </header>
        </div>
      </section>

      {/* Software Solutions */}
        <section className="section-padding text-white">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-8">
              <h3 className="heading-3 mb-4 !text-white">For Software Developers</h3>
              <p className="body-text mb-6 !text-white">
                Roadmaps, sprints, release notes, and on-call runbooks. Link issues, PRDs, and docs to the code or service.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <GitBranch className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Connected roadmaps to actual commits</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Sprint planning with velocity tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Bug className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Issue tracking with context</span>
                </li>
                <li className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Automated release notes & deployment tracking</span>
                </li>
              </ul>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/Picture5.png"
                  alt="Software development workflow"
                  width={1600}
                  height={1200}
                  className="w-full h-auto rounded-inherit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Solutions */}
        <section className="section-padding text-white">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="gradient-border rounded-lg">
                <div className="image-frame-inner rounded-inherit">
                  <Image
                    src="/product/files_main_screen.png"
                    alt="Marketing campaign planning"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4 !text-white">For Marketers</h3>
              <p className="body-text mb-6 !text-white">
                Plan campaigns, track assets, centralize briefs, and review creatives all in one place. Connect ad spend data and build ROAS dashboards.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Campaign planning with templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Asset management with version control</span>
                </li>
                <li className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Multi-channel ROAS dashboards</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Team collaboration on creatives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Solutions */}
        <section className="section-padding text-white">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-8">
              <h3 className="heading-3 mb-4 !text-white">For Designers</h3>
              <p className="body-text mb-6 !text-white">
                Manage versions, share mocks, collect feedback, and ship on time. Link design tasks and specs to the latest files.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Version control with visual diffs</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Contextual feedback on designs</span>
                </li>
                <li className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Secure sharing with stakeholders</span>
                </li>
                <li className="flex items-center gap-3">
                  <GitBranch className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Design handoff to development</span>
                </li>
              </ul>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/Picture2.png"
                  alt="Design workflow interface"
                  width={1600}
                  height={1200}
                  className="w-full h-auto rounded-inherit"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Solutions */}
        <section className="section-padding text-white">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="gradient-border rounded-lg">
                <div className="image-frame-inner rounded-inherit">
                  <Image
                    src="/product/Picture8.png"
                    alt="Government security dashboard"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4 !text-white">For Governments</h3>
              <p className="body-text mb-6 !text-white">
                Secure document exchange, private file storage, and safe communication. Fine-grained access controls, audit logs, and data residency options.
              </p>
              <ul className="space-y-3" role="list">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">FedRAMP ready with AOT</span>
                </li>
                <li className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">AES-256 encryption with BYOK options</span>
                </li>
                <li className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">Comprehensive audit logging</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-500" aria-hidden="true" />
                  <span className="body-text !text-white">US-only data residency options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </div>
      <section className="section-padding" aria-labelledby="community-heading">
        <div className="max-width container-padding">
          <header className="text-center mb-16">
            <h2 id="community-heading" className="heading-2 mb-4">Community</h2>
            <p className="body-large max-w-2xl mx-auto">
              Build better workflows with others. Join thousands of teams sharing tips, templates, and best practices.
            </p>
          </header>
          <ul className="grid-features" role="list">
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">Discussion forum</h3>
                <p className="body-text">
                  Ask questions, share tips, and connect with other Cospace users worldwide.
                </p>
              </div>
            </li>
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">Templates gallery</h3>
                <p className="body-text">
                  Browse and share workflow templates for every team and use case.
                </p>
              </div>
            </li>
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">Release notes & roadmap</h3>
                <p className="body-text">
                  Stay updated on new features and influence our product direction.
                </p>
              </div>
            </li>
            <li className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">Events & webinars</h3>
                <p className="body-text">
                  Join live sessions, workshops, and networking events with fellow users.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="section-padding" aria-labelledby="pricing-heading">
        <div className="max-width container-padding">
          <header className="text-center mb-16">
            <h2 id="pricing-heading" className="heading-2 mb-4">Simple plans that scale with you</h2>
            <p className="body-large max-w-2xl mx-auto">
              Choose the plan that fits your team. All plans include our core collaboration features with transparent, usage-based pricing.
            </p>
          </header>
          <div className="grid md:grid-cols-4 gap-8" role="list">
            {/* Free Plan */}
            <li className="card flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="heading-4 mb-2">Free</h3>
                  <div className="mb-4 justify-between">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-muted"> forever</span>
                  </div>
                  <p className="body-small text-muted">Perfect for small teams getting started</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Up to 5 users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">5 GB storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Core chat & docs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Basic dashboards</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="secondary" text="get started" className="w-full" />
            </li>

            {/* Pro Plan */}
            <li className="card border-accent/20 relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">Most popular</span>
              </div>
              
              <div>
                <div className="mb-6">
                  <h3 className="heading-4 mb-2">Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$9</span>
                    <span className="text-muted">/user/month</span>
                  </div>
                  <p className="body-small text-muted">For growing teams that need more features</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Unlimited users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">100 GB storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Meetings & Huddles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">AppBuilder (standard)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Basic SSO</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="primary" text="get started" className="w-full" />
            </li>

            {/* Business Plan */}
            <li className="card flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="heading-4 mb-2">Business</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$18</span>
                    <span className="text-muted">/user/month</span>
                  </div>
                  <p className="body-small text-muted">For teams that need advanced security & controls</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">1 TB storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Advanced AppBuilder</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Database connectors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">SSO/SAML</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">SCIM & Audit logs</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="primary" text="get started" className="w-full" />
            </li>

            {/* Enterprise Plan */}
            <li className="card flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="heading-4 mb-2">Enterprise</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                  <p className="body-small text-muted">For organizations with complex requirements</p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Enterprise security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">BYOK encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Private cloud/VPC</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">EU/US data residency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="body-text">Dedicated support</span>
                  </div>
                </div>
              </div>
              
              <CTAButton variant="primary" text="request pricing" className="w-full" />
            </li>
          </div>
        </div>
      </section>

      {/* Callout Banner */}
      <section className="py-12 bg-accent/5" aria-labelledby="callout-text">
        <div className="max-width container-padding">
          <div className="text-center">
            <p id="callout-text" className="body-large text-foreground font-italic">
              Private by design — choose EU or US hosting. Keep sensitive work in a space you control.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding" aria-labelledby="final-cta-heading">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 id="final-cta-heading" className="heading-2 mb-6">Ready to get started?</h2>
            <p className="body-large mb-8">
              Join thousands of teams who've already made the switch to Cospace.
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
