import Image from "next/image";
import { BarChart3, Database, Zap, Bell, Brain, TrendingUp, RefreshCw, AlertTriangle } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function DataPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Data & Dashboards</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              All your key metrics—live and trustworthy. Connect data sources, build charts, and get AI insights without the complexity.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Turn data into decisions</h2>
            <p className="body-large max-w-2xl mx-auto">
              Connect, visualize, and understand your data without a dedicated analyst.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">No-code connections</h3>
              <p className="body-text">
                Bring in CSVs, databases, and third-party metrics without writing queries.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Live charts & tables</h3>
              <p className="body-text">
                Build beautiful visualizations in minutes with smart formatting.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">AI insights</h3>
              <p className="body-text">
                Summarize trends, flag anomalies, and get suggested next steps.
              </p>
            </div>
            <div className="card-feature">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-accent" />
              </div>
              <h3 className="heading-4 mb-3">Smart alerting</h3>
              <p className="body-text">
                Get notified in channels or via email when metrics hit thresholds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="heading-3 mb-4">Connect everything</h3>
              <p className="body-text mb-6">
                Import data from spreadsheets, databases, APIs, and popular business tools. Schedule automatic refreshes to keep dashboards current.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  <span className="body-text">Scheduled data refreshes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent" />
                  <span className="body-text">CSV, Excel, Google Sheets</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="body-text">APIs & database connections</span>
                </div>
              </div>
            </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/datamodel.png"
                  alt="Data connections visualization"
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
                    alt="Dashboard interface"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="heading-3 mb-4">AI-powered insights</h3>
              <p className="body-text mb-6">
                Don't just look at charts—understand what they mean. Get automated summaries of key changes and suggested actions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="body-text">Trend analysis & forecasting</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <span className="body-text">Anomaly detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-accent" />
                  <span className="body-text">Natural language summaries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Types Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Every chart type you need</h2>
            <p className="body-large max-w-2xl mx-auto">
              From simple bar charts to complex multi-axis visualizations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Standard charts</h4>
                <p className="body-text">
                  Bar, line, pie, scatter plots with automatic formatting and colors.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Interactive tables</h4>
                <p className="body-text">
                  Sortable, filterable data tables with conditional formatting.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">KPI metrics</h4>
                <p className="body-text">
                  Single-number metrics with trend indicators and progress bars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Data that drives action</h2>
            <p className="body-large max-w-2xl mx-auto">
              Your dashboards aren't isolated—they're connected to your team's workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Team notifications</h4>
                <p className="body-text">
                  Post dashboard updates to team channels automatically when key metrics change.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Discussion context</h4>
                <p className="body-text">
                  Link charts to conversations and decisions for full context on data changes.
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
            <h2 className="heading-2 mb-6">Ready to see your data clearly?</h2>
            <p className="body-large mb-8">
              Stop squinting at spreadsheets. Build dashboards that actually help you make decisions.
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


