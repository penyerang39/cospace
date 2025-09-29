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

      {/* Content Section - Cards left, Image right */}
      <section className="section-padding">
        <div className="max-width container-padding grid md:grid-cols-2 items-start gap-8 w-full">
          {/* Cards Column - Left */}
          <div className="order-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-fit">
              {/* Top Row - 3 cards */}
              {/* Channels */}
              <div className="card-feature h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="heading-4">Channels</h3>
                </div>
                <p className="body-text">
                  Dedicated spaces for teams and projects with topic descriptions.
                </p>
              </div>

              {/* Threads */}
              <div className="card-feature h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="heading-4">Threads</h3>
                </div>
                <p className="body-text">
                  Keep discussions tidy with threaded conversations.
                </p>
              </div>

              {/* Clips */}
              <div className="card-feature h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Video className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="heading-4">Clips</h3>
                </div>
                <p className="body-text">
                  Quick voice and video snippets for async updates.
                </p>
              </div>

              {/* Bottom Row - 3 cards */}
              {/* Huddles */}
              <div className="card-feature h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Mic className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="heading-4">Huddles</h3>
                </div>
                <p className="body-text">
                  1-click voice rooms for instant collaboration.
                </p>
              </div>

              {/* Search & Commands */}
              <div className="card-feature h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Search className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="heading-4">Global Search</h3>
                </div>
                <p className="body-text">
                  Find anything instantly with powerful search.
                </p>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="card-feature h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Keyboard className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="heading-4">Keyboard-First</h3>
                </div>
                <p className="body-text">
                  Navigate with keyboard shortcuts for efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Image Column - Right */}
          <div className="order-2">
            <div className="relative w-fit h-fit overflow-hidden rounded-lg bg-white">
              <Image 
                src="/product/updated_chat.png" 
                alt="Chat & Meetings interface showing channels, threads, and video calls" 
                width={600}
                height={400}
                className="object-contain" 
                priority 
                sizes="(min-width: 768px) 40vw, 90vw" 
              />
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


