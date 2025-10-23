import Image from "next/image";
import { MessageSquare, Users, Mic, Video, Search, Hash, UserPlus, Clock } from "lucide-react";
import CTAButton from "../../components/CTAButton";
import CTALink from "../../components/CTALink";
import ScrollHint from "../../components/ScrollHint";

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center relative">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              <span className="gradient-text">Chat & Meetings</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Conversations that stay connected to the work. Channels for teams, threads for focus, and instant video calls when you need them.
            </p>
          </div>
        </div>
        <ScrollHint />
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Everything you need to communicate</h2>
            <p className="body-large max-w-2xl mx-auto">
              From quick messages to deep discussions, stay connected without the noise.
            </p>
          </div>
          <div className="grid-features">
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Hash className="w-6 h-6 text-accent" />
                  </div>
                <h3 className="heading-4 mb-3">Channels for teams</h3>
                <p className="body-text">
                  Organized spaces for projects with topic descriptions and searchable history.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-accent" />
                  </div>
                <h3 className="heading-4 mb-3">Threads keep it tidy</h3>
                <p className="body-text">
                  Start threads from any message. Convert discussions to tasks instantly.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-accent" />
                  </div>
                <h3 className="heading-4 mb-3">Voice clips</h3>
                <p className="body-text">
                  Quick audio snippets for async updates when typing isn't enough.
                </p>
              </div>
            </div>
            <div className="card-feature-with-gradient">
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-accent" />
                  </div>
                <h3 className="heading-4 mb-3">1-click huddles</h3>
                <p className="body-text">
                  Start voice rooms instantly. Escalate to video with screen sharing.
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
              <h3 className="heading-3 mb-4">Smart search across everything</h3>
              <p className="body-text mb-6">
                Find any message, file, or conversation in seconds. Search works across channels, DMs, and shared files with smart filters and instant results.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-accent" />
                  <span className="body-text">Global search with filters</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="body-text">Message history & archives</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="body-text">Member mentions & @here</span>
                </div>
              </div>
                </div>
            <div className="gradient-border rounded-lg">
              <div className="image-frame-inner rounded-inherit">
                <Image
                  src="/product/files_main_screen.png"
                  alt="Search interface"
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
                    src="/product/updated_chat.png"
                    alt="Meeting interface"
                    width={1600}
                    height={1200}
                    className="w-full h-auto rounded-inherit"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 pl-8">
              <h3 className="heading-3 mb-4">Meetings that work</h3>
              <p className="body-text mb-6">
                High-quality video calls with screen sharing, recording, and automatic transcripts. No separate app needed.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-accent" />
                  <span className="body-text">HD video with screen share</span>
                </div>
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 text-accent" />
                  <span className="body-text">Guest access with links</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="body-text">Recording & transcripts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Connected to your work</h2>
            <p className="body-large max-w-2xl mx-auto">
              Chat isn't separate from your files and projects—it's built in.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">File previews</h4>
                <p className="body-text">
                  See docs, images, and PDFs right in chat without switching apps.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Task creation</h4>
                <p className="body-text">
                  Turn any message into a trackable task with one click.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="accent-border pl-4 mb-4">
                <h4 className="heading-4 mb-2">Project context</h4>
                <p className="body-text">
                  Messages stay connected to the files and data they reference.
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
            <h2 className="heading-2 mb-6">Ready to upgrade your team chat?</h2>
            <p className="body-large mb-8">
              Join thousands of teams who've made the switch from Slack and Discord.
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