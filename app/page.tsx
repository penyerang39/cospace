import Image from "next/image";
import { LayoutDashboard, Zap, ShieldCheck, Sparkles, Users, Activity, Globe, MessageSquare, FileText, Blocks, BarChart3, Hash, Mic, Video, Search, Clock, UserPlus, History, Share2, Lock, MessageCircle, GitBranch, Download, Database, Bell, Brain, TrendingUp, RefreshCw, AlertTriangle, Workflow, Settings, Play, Code, Bug, Rocket, CheckCircle, Target, Calendar, Megaphone, Palette, Layers, Eye, ChevronDown } from "lucide-react";
import CTAButton from "./components/CTAButton";
import CTALink from "./components/CTALink";

export default function Home() {
  return (
    <main className="md:min-h-screen">
      {/* Hero Section */}
      <section className="section-padding md:min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Background - extends beyond section */}
        <div className="absolute -top-32 -bottom-32 -left-1/4 -right-1/4 w-[150%] h-[150%]">
          <div className="animated-gradient-bg"></div>
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
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Built for modern teams</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything you need to work together, securely and efficiently.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">One workspace, zero chaos</h3>
              <p className="body-text">
                Messages, docs, tasks, and dashboards stay linked to the work.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">Fast by default</h3>
              <p className="body-text">
                Real‑time sync, lightning search, and clean UI keep teams moving.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">Secure for serious teams</h3>
              <p className="body-text">
                End‑to‑end encryption at rest and in transit, SSO/SAML, roles, and audit trails.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="heading-4 mb-3">AI‑assisted where it matters</h3>
              <p className="body-text">
                Draft docs, summarize threads, and surface trends in your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT FEATURES SECTION ===== */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Product Features</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything you need to collaborate, create, and manage your work.
            </p>
          </div>

          {/* Chat & Meetings */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="heading-3 mb-4">Chat & Meetings</h3>
                <p className="body-text mb-6">
                  Conversations that stay connected to the work. Channels for teams, threads for focus, and instant video calls when you need them.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-accent" />
                    <span className="body-text">Organized channels with searchable history</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    <span className="body-text">Threads that keep discussions tidy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mic className="w-5 h-5 text-accent" />
                    <span className="body-text">Voice clips for async updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-accent" />
                    <span className="body-text">1-click huddles with screen sharing</span>
                  </div>
                </div>
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

          {/* Files & Docs */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
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
              <div className="order-1 md:order-2">
                <h3 className="heading-3 mb-4">Files & Docs</h3>
                <p className="body-text mb-6">
                  Create, share, and ship together. Real-time collaboration with version control that actually works.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-accent" />
                    <span className="body-text">Real-time co-editing without conflicts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    <span className="body-text">Comments & suggestions in context</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-accent" />
                    <span className="body-text">Full version history with diff view</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-accent" />
                    <span className="body-text">Granular permissions & secure sharing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AppBuilder */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="heading-3 mb-4">AppBuilder</h3>
                <p className="body-text mb-6">
                  Internal tools without ticketing the dev team. Build forms, dashboards, and workflows visually in minutes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Blocks className="w-5 h-5 text-accent" />
                    <span className="body-text">Point-and-click visual builder</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-accent" />
                    <span className="body-text">Connect Google Sheets, Postgres, APIs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Workflow className="w-5 h-5 text-accent" />
                    <span className="body-text">Automate approvals & notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span className="body-text">Granular permissions per app</span>
                  </div>
                </div>
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

          {/* Data & Dashboards */}
          <div className="mb-20">
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
              <div className="order-1 md:order-2">
                <h3 className="heading-3 mb-4">Data & Dashboards</h3>
                <p className="body-text mb-6">
                  All your key metrics—live and trustworthy. Connect data sources, build charts, and get AI insights without the complexity.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-accent" />
                    <span className="body-text">No-code connections to any data source</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <span className="body-text">Live charts & tables with smart formatting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-accent" />
                    <span className="body-text">AI insights & trend analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-accent" />
                    <span className="body-text">Smart alerting when metrics change</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTIONS SECTION ===== */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Solutions by Industry</h2>
            <p className="body-large max-w-2xl mx-auto">
              Tailored workflows for every team: marketing, design, software, and government.
            </p>
          </div>

          {/* Software Solutions */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="heading-3 mb-4">Software Development</h3>
                <p className="body-text mb-6">
                  Roadmaps, sprints, release notes, and on-call runbooks. Link issues, PRDs, and docs to the code or service.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-accent" />
                    <span className="body-text">Connected roadmaps to actual commits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="body-text">Sprint planning with velocity tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bug className="w-5 h-5 text-accent" />
                    <span className="body-text">Issue tracking with context</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-accent" />
                    <span className="body-text">Automated release notes & deployment tracking</span>
                  </div>
                </div>
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

          {/* Marketing Solutions */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
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
              <div className="order-1 md:order-2">
                <h3 className="heading-3 mb-4">Marketing</h3>
                <p className="body-text mb-6">
                  Plan campaigns, track assets, centralize briefs, and review creatives all in one place. Connect ad spend data and build ROAS dashboards.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-accent" />
                    <span className="body-text">Campaign planning with templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-accent" />
                    <span className="body-text">Asset management with version control</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <span className="body-text">Multi-channel ROAS dashboards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="body-text">Team collaboration on creatives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design Solutions */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="heading-3 mb-4">Design</h3>
                <p className="body-text mb-6">
                  Manage versions, share mocks, collect feedback, and ship on time. Link design tasks and specs to the latest files.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-accent" />
                    <span className="body-text">Version control with visual diffs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    <span className="body-text">Contextual feedback on designs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-accent" />
                    <span className="body-text">Secure sharing with stakeholders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-accent" />
                    <span className="body-text">Design handoff to development</span>
                  </div>
                </div>
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

          {/* Government Solutions */}
          <div className="mb-20">
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
              <div className="order-1 md:order-2">
                <h3 className="heading-3 mb-4">Government</h3>
                <p className="body-text mb-6">
                  Secure document exchange, private file storage, and safe communication. Fine-grained access controls, audit logs, and data residency options.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span className="body-text">FedRAMP authorized with ATO ready</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-accent" />
                    <span className="body-text">AES-256 encryption with BYOK options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-accent" />
                    <span className="body-text">Comprehensive audit logging</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-accent" />
                    <span className="body-text">US-only data residency options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY SECTION ===== */}
      <section className="section-padding bg-foreground/2">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Community</h2>
            <p className="body-large max-w-2xl mx-auto">
              Build better workflows with others. Join thousands of teams sharing tips, templates, and best practices.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Discussion forum</h3>
              <p className="body-text">
                Ask questions, share tips, and connect with other Cospace users worldwide.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Templates gallery</h3>
              <p className="body-text">
                Browse and share workflow templates for every team and use case.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Release notes & roadmap</h3>
              <p className="body-text">
                Stay updated on new features and influence our product direction.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Events & webinars</h3>
              <p className="body-text">
                Join live sessions, workshops, and networking events with fellow users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Simple plans that scale with you</h2>
            <p className="body-large max-w-2xl mx-auto">
              Choose the plan that fits your team. All plans include our core collaboration features with transparent, usage-based pricing.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="card flex flex-col justify-between">
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
            </div>

            {/* Pro Plan */}
            <div className="card border-accent/20 relative flex flex-col justify-between">
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
            </div>

            {/* Business Plan */}
            <div className="card flex flex-col justify-between">
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
            </div>

            {/* Enterprise Plan */}
            <div className="card flex flex-col justify-between">
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
            </div>
          </div>
        </div>
      </section>

      {/* Callout Banner */}
      <section className="py-12 bg-accent/5">
        <div className="max-width container-padding">
          <div className="text-center">
            <p className="body-large text-foreground font-italic">
              Private by design — choose EU or US hosting. Keep sensitive work in a space you control.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to get started?</h2>
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
