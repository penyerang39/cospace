import Image from "next/image";
import { MessageSquare, Users, Video, Mic, Search, Keyboard } from "lucide-react";
import CTAButton from "../../components/CTAButton";

export default function ChatPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center">
        <div className="max-width container-padding w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-1 mb-6">
              Chat & <span className="gradient-text">Meetings</span>
            </h1>
            <p className="body-large mb-8 max-w-2xl mx-auto">
              Conversations that stay connected to the work. Channels for teams and projects, threads that keep discussions tidy, and seamless voice/video collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Main Feature Image */}
      <section className="">
      <div className="gradient-border rounded-lg w-60%">
              <div className="image-frame-inner rounded-inherit">
                <Image src="/product/picture6.png" alt="Admin & Security preview" width={1600} height={900} className="w-full h-auto rounded-inherit" />
              </div>
            </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="max-width container-padding w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Channels */}
            <div className="card-feature">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <h3 className="heading-4">Channels</h3>
              </div>
              <p className="body-text">
                Dedicated spaces for teams and projects with topic descriptions. Keep conversations organized and findable with clear channel purposes.
              </p>
            </div>

            {/* Threads */}
            <div className="card-feature">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <h3 className="heading-4">Threads</h3>
              </div>
              <p className="body-text">
                Keep discussions tidy with threaded conversations. Convert any message to a task with one click to maintain workflow continuity.
              </p>
            </div>

            {/* Clips */}
            <div className="card-feature">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Video className="w-5 h-5 text-accent" />
                </div>
                <h3 className="heading-4">Clips</h3>
              </div>
              <p className="body-text">
                Quick voice and video snippets for async updates. Share context-rich information without scheduling meetings.
              </p>
            </div>

            {/* Huddles */}
            <div className="card-feature">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Mic className="w-5 h-5 text-accent" />
                </div>
                <h3 className="heading-4">Huddles</h3>
              </div>
              <p className="body-text">
                1-click voice rooms for instant collaboration. Escalate to video with screen share when you need visual context.
              </p>
            </div>

            {/* Search & Commands */}
            <div className="card-feature">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Search className="w-5 h-5 text-accent" />
                </div>
                <h3 className="heading-4">Global Search</h3>
              </div>
              <p className="body-text">
                Find anything instantly with powerful search across all conversations, files, and tasks. Keyboard-first commands for power users.
              </p>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="card-feature">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Keyboard className="w-5 h-5 text-accent" />
                </div>
                <h3 className="heading-4">Keyboard-First</h3>
              </div>
              <p className="body-text">
                Navigate and control everything with keyboard shortcuts. Built for efficiency and speed in your daily workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced padding */}
      <section className="pb-8">
        <div className="max-width container-padding w-full">
          <div className="text-center">
            <CTAButton variant="primary" text="get started" />
          </div>
        </div>
      </section>
    </main>
  );
}


