"use client";

import { useState } from "react";
import { Icon } from "./ui/Icon";

type App = {
  title: string;
  description: string;
  icon: string;
  tags: string[];
};

const APPS: App[] = [
  {
    title: "App One",
    description: "Access all your assets in one place.",
    icon: "bx-folder",
    tags: ["Content", "Workflow"],
  },
  {
    title: "App Two",
    description: "Access all your assets in one place.",
    icon: "bx-message-rounded-dots",
    tags: ["AI", "Automation"],
  },
  {
    title: "App Three",
    description: "Access all your assets in one place.",
    icon: "bx-pulse",
    tags: ["Analytics", "Enterprise"],
  },
  {
    title: "App Four",
    description: "Access all your assets in one place.",
    icon: "bx-movie-play",
    tags: ["Content", "Mobile"],
  },
  {
    title: "App Five",
    description: "Access all your assets in one place.",
    icon: "bx-group",
    tags: ["Integration", "API"],
  },
  {
    title: "App Six",
    description: "Access all your assets in one place.",
    icon: "bx-help-circle",
    tags: ["AI", "Workflow"],
  },
  {
    title: "App Seven",
    description: "Access all your assets in one place.",
    icon: "bx-calendar",
    tags: ["Automation", "Enterprise"],
  },
  {
    title: "App Eight",
    description: "Access all your assets in one place.",
    icon: "bx-cloud",
    tags: ["API", "Integration"],
  },
  {
    title: "App Nine",
    description: "Access all your assets in one place.",
    icon: "bx-bar-chart-alt-2",
    tags: ["Analytics", "AI"],
  },
];

const SLIDES = [APPS.slice(0, 3), APPS.slice(3, 6), APPS.slice(6, 9)];

function AppCard({ app }: { app: App }) {
  return (
    <div className="border-steel rounded-[10px] overflow-hidden bg-card flex items-stretch min-h-[180px]">
      {/* Left: text + tags */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-text font-medium text-base sm:text-lg">
            {app.title}
          </h3>
          <p className="mt-1 text-text-muted text-sm line-clamp-2">
            {app.description}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2 py-1 text-[11px] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: gradient + icon */}
      <div
        className="w-[40%] shrink-0 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(107, 43, 212, 0.25), transparent 70%), linear-gradient(135deg, rgba(67, 56, 202, 0.18) 0%, rgba(30, 42, 138, 0.0) 100%)",
        }}
      >
        <div className="h-14 w-14 rounded-[12px] bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_24px_var(--color-nebula-glow)]">
          <Icon name={app.icon} className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );
}

export function AppCarousel() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-text tracking-tight text-center">
          Discover what you can build
        </h2>
        <p className="mt-4 text-text-muted text-center max-w-[640px] mx-auto">
          A growing library of apps you can pick up, remix, and ship.
        </p>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {SLIDES.map((slide, slideIdx) => (
              <div
                key={slideIdx}
                className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {slide.map((app) => (
                  <AppCard key={app.title} app={app} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {SLIDES.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                role="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActive(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-nebula-violet shadow-[0_0_12px_var(--color-nebula-glow)]"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
