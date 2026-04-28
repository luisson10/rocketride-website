"use client";

import { useState } from "react";
import { Icon } from "./ui/Icon";

type App = {
  title: string;
  description: string;
  tags: string[];
};

const APPS: App[] = [
  {
    title: "Brandy",
    description: "Image recognition tool for surfacing your brand within any video",
    tags: ["Video", "LLM"],
  },
  {
    title: "Clipsmith",
    description: "Turn raw recordings into short clips, show notes, and social posts",
    tags: ["Content", "Video"],
  },
  {
    title: "Signal Desk",
    description: "Monitor customer conversations and route insights to your team",
    tags: ["Analytics", "AI"],
  },
  {
    title: "Launch Notes",
    description: "Generate changelog drafts and launch updates from product work",
    tags: ["Workflow", "Content"],
  },
  {
    title: "Support Pilot",
    description: "Build a knowledge-aware support assistant your team can tune",
    tags: ["Support", "Agent"],
  },
  {
    title: "Model Arena",
    description: "Compare model responses side by side before shipping a pipeline",
    tags: ["Eval", "LLM"],
  },
  {
    title: "Doc Forge",
    description: "Ingest docs, extract structure, and publish searchable knowledge",
    tags: ["Docs", "RAG"],
  },
  {
    title: "Revenue Scout",
    description: "Find account signals and summarize next actions for sales teams",
    tags: ["Sales", "AI"],
  },
  {
    title: "Ops Autopilot",
    description: "Run recurring internal workflows with observability and handoff",
    tags: ["Ops", "Workflow"],
  },
];

const SLIDES = [APPS.slice(0, 3), APPS.slice(3, 6), APPS.slice(6, 9)];

function AppCard({ app }: { app: App }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border-strong bg-icon-tile p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.26)]">
      <div className="grid grid-cols-[44%_1fr] gap-3">
        <div
          className="relative min-h-[96px] overflow-hidden rounded-[8px] border border-white/10"
          style={{
            background:
              "radial-gradient(circle at 18% 8%, rgba(168, 85, 247, 0.55), transparent 28%), radial-gradient(circle at 92% 18%, rgba(0, 185, 236, 0.28), transparent 32%), linear-gradient(135deg, rgba(15,15,15,0.2), rgba(31,31,31,0.92))",
          }}
        >
          <div className="absolute inset-x-4 bottom-3 top-5 rounded-[6px] bg-white/94 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
            <div className="absolute left-3 right-3 top-1/2 h-px bg-nebula-violet/30" />
            <div className="absolute bottom-4 left-3 right-4 h-px rotate-[-8deg] bg-nebula-violet/40" />
            <span className="absolute left-3 top-[52%] h-1.5 w-1.5 rounded-full bg-nebula-violet" />
            <span className="absolute left-[48%] top-[46%] h-1.5 w-1.5 rounded-full bg-nebula-violet" />
            <span className="absolute right-4 bottom-4 h-1.5 w-1.5 rounded-full bg-nebula-violet" />
          </div>
        </div>

        <div className="min-w-0 py-1 pr-1">
          <h3 className="text-sm font-semibold leading-tight text-text">
            {app.title}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-text-muted">
            {app.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-[6px] border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] leading-none text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppCarousel() {
  const [active, setActive] = useState(0);
  const previous = () =>
    setActive((current) => (current === 0 ? SLIDES.length - 1 : current - 1));
  const next = () =>
    setActive((current) => (current === SLIDES.length - 1 ? 0 : current + 1));

  return (
    <section className="relative py-10 sm:py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-5">
          <div className="col-start-2 mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-text">
                RocketRide AI for everything
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                From design tools to dev workflows discover extensions to go faster
              </p>
            </div>
            <a
              href="#features"
              className="inline-flex h-10 items-center justify-center self-start rounded-[10px] border border-border-strong bg-icon-tile px-6 text-sm font-semibold text-text-muted transition-colors hover:bg-surface-2 hover:text-text sm:self-auto"
            >
              Explore All
            </a>
          </div>

          <button
            type="button"
            onClick={previous}
            aria-label="Previous apps"
            className="col-start-1 row-start-2 inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-strong bg-icon-tile text-text-muted shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Icon name="bx-chevron-left" className="text-xl" />
          </button>

          <div className="col-start-2 row-start-2 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {SLIDES.map((slide, slideIdx) => (
                <div
                  key={slideIdx}
                  className="w-full shrink-0 grid grid-cols-1 gap-5 md:grid-cols-3"
                >
                  {slide.map((app) => (
                    <AppCard key={app.title} app={app} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next apps"
            className="col-start-3 row-start-2 inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-strong bg-icon-tile text-text-muted shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-colors hover:bg-surface-2 hover:text-text"
          >
            <Icon name="bx-chevron-right" className="text-xl" />
          </button>

          <div className="col-start-2 mt-6 flex items-center justify-center gap-2">
            {SLIDES.map((_, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to app page ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-5 bg-text shadow-[0_0_12px_rgba(255,255,255,0.32)]"
                      : "w-1.5 bg-white/20 hover:bg-white/35"
                  }`}
                >
                  <span className="sr-only">Go to app page {i + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
