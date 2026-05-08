"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  CodeAlt,
  Copy,
  Dashboard,
  Extension,
  Key as KeyIcon,
  MessageBubbleDots,
  NetworkChart,
  PlayCircle,
  Rocket,
  ShieldQuarter,
  Terminal,
  Typescript,
  VisualStudio,
  type BoxIconProps,
  type IconPack,
} from "@boxicons/react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionLabel } from "./ui/SectionLabel";

type Step = {
  title: string;
  body: string;
  preview: "runtime" | "observe" | "deploy";
};

const buildSteps: Step[] = [
  {
    title: "Build your runtime",
    body:
      "Use natural language, IDE extension, CLI workflows, or our visual pipeline editor to design AI applications your way.",
    preview: "runtime",
  },
  {
    title: "Test, observe, iterate",
    body:
      "Debug executions, monitor outputs, and track performance across every step of your runtime.",
    preview: "observe",
  },
  {
    title: "Deploy and scale",
    body:
      "Deploy instantly to self hosted infrastructure or RocketRide Cloud with scalable production execution.",
    preview: "deploy",
  },
];

const infrastructure = [
  {
    icon: Terminal,
    title: "Lowest runtime cost",
    body:
      "Optimized infrastructure runs AI apps faster and cheaper without sacrificing reliability or performance.",
  },
  {
    icon: Rocket,
    title: "Elastic autoscaling",
    body:
      "Scale pipelines automatically during demand spikes and scale to zero when idle.",
  },
  {
    icon: ShieldQuarter,
    title: "Enterprise governance",
    body:
      "SSO, audit logs, RBAC, isolated environments, and enterprise-ready security controls.",
  },
  {
    icon: KeyIcon,
    title: "One key, every provider",
    body:
      "Access leading models and services through one unified API layer with centralized billing, credentials, and usage management.",
  },
];

type BuilderOption = {
  title: string;
  icon: ComponentType<BoxIconProps>;
  iconPack?: IconPack;
  body: string;
  cta: string;
  previewTitle: string;
  previewLines: string[];
};

type BuilderSection = {
  label: string;
  tagline: string;
  options: BuilderOption[];
};

const builderSections: BuilderSection[] = [
  {
    label: "Developers",
    tagline: "Bring RocketRide into the tools you already ship from.",
    options: [
      {
        title: "IDE Extension",
        icon: VisualStudio,
        cta: "Install Extension",
        body: "Build pipelines directly inside VS Code, Cursor, Windsurf, and Antigravity.",
        previewTitle: "pipeline.agent.ts",
        previewLines: [
          "const pipeline = orchestrate({",
          "  agents: [researcher, writer, critic],",
          "  tools: [web, vectorStore, deploy],",
          "});",
          "",
          "logs.stream('deployment:ready');",
          "status: autocomplete agents/tools",
        ],
      },
      {
        title: "CLI",
        icon: Terminal,
        cta: "Copy install",
        body: "Deploy, test, and manage pipelines from the terminal.",
        previewTitle: "rocketride terminal",
        previewLines: [
          "$ rocketride env use production",
          "$ rocketride deploy ./support-pilot.yaml",
          "✓ building runtime",
          "✓ streaming realtime logs",
          "✓ pipeline execution output: healthy",
          "url: https://run.rocketride.cloud/support",
        ],
      },
      {
        title: "SDK",
        icon: Typescript,
        cta: "Copy snippet",
        body: "Embed RocketRide into applications using TypeScript or Python.",
        previewTitle: "sdk-example.ts",
        previewLines: [
          "import { RocketRide } from '@rocketride/sdk';",
          "",
          "const run = await rr.pipeline('triage').execute({",
          "  input: ticket.body,",
          "  agent: 'support-copilot',",
          "});",
          "return run.output;",
        ],
      },
      {
        title: "MCP Server",
        icon: NetworkChart,
        cta: "Copy MCP config",
        body: "Expose pipelines as tools for any MCP-compatible agent.",
        previewTitle: "mcp-config.json",
        previewLines: [
          "{",
          '  "mcpServers": {',
          '    "rocketride": {',
          '      "tools": ["summarize", "deploy", "search"]',
          "    }",
          "  }",
          "}",
        ],
      },
    ],
  },
  {
    label: "Thinkers",
    tagline: "Describe the workflow — RocketRide assembles the runtime for you.",
    options: [
      {
        title: "Natural Language Builder",
        icon: MessageBubbleDots,
        cta: "Try Composer",
        body: "Describe what you want to build and RocketRide generates the runtime.",
        previewTitle: "RocketRide Composer",
        previewLines: [
          "You: Build a weekly customer-insights workflow.",
          "RocketRide: Generating agents…",
          "✓ workflow map",
          "✓ integrations",
          "✓ deployment config",
          "Ready to test in cloud.",
        ],
      },
      {
        title: "Visual Cloud Builder",
        icon: Dashboard,
        iconPack: "filled",
        cta: "Open Builder",
        body: "Design, test, and deploy pipelines visually in the browser.",
        previewTitle: "Cloud Builder",
        previewLines: [
          "[Input] → [Agent] → [Eval] → [Deploy]",
          "drag-and-drop workflow nodes",
          "realtime execution: running",
          "logs: 42 events streamed",
          "deployment: one click away",
        ],
      },
    ],
  },
];

function MiniPipelinePreview() {
  const nodes = ["Input", "Agent", "Eval", "Deploy"];

  return (
    <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-between gap-3 rounded-[10px] bg-white p-5 text-bg shadow-[0_0_30px_rgba(0,0,0,0.28)]">
      {nodes.map((node, index) => (
        <div key={node} className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex min-h-16 flex-1 flex-col items-center justify-center rounded-[10px] border border-black/10 bg-white shadow-sm">
            <span className="h-2 w-10 rounded-full bg-accent/80" />
            <span className="mt-2 text-xs font-semibold text-bg">{node}</span>
          </div>
          {index < nodes.length - 1 && (
            <span className="hidden h-px w-6 shrink-0 bg-accent/70 sm:block" />
          )}
        </div>
      ))}
    </div>
  );
}

function ctaIconFor(cta: string) {
  const lower = cta.toLowerCase();
  if (lower.includes("copy")) return Copy;
  if (lower.includes("install")) return Extension;
  if (lower.includes("open")) return PlayCircle;
  if (lower.includes("try")) return MessageBubbleDots;
  return CodeAlt;
}

function CodeWindow({ option }: { option: BuilderOption }) {
  const [copied, setCopied] = useState(false);
  const CtaIcon = ctaIconFor(option.cta);
  const isCopyAction = option.cta.toLowerCase().includes("copy");

  const handleCta = async () => {
    if (!isCopyAction) return;
    try {
      await navigator.clipboard.writeText(option.previewLines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — silently ignore
    }
  };

  return (
    <div className="relative flex h-full min-h-[360px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,var(--color-card),var(--color-surface)_58%,var(--color-icon-tile))] p-5 sm:p-8">
      <div className="w-full max-w-[520px] overflow-hidden rounded-[10px] border border-border-strong bg-icon-tile shadow-[0_0_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 truncate text-center font-mono text-xs text-text-dim">
            {option.previewTitle}
          </span>
          <button
            type="button"
            onClick={handleCta}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/15"
          >
            <CtaIcon className="text-sm" width="1em" height="1em" />
            {copied ? "Copied" : option.cta}
          </button>
        </div>
        <div className="bg-card p-5 font-mono text-sm leading-relaxed text-text-muted sm:text-base">
          {option.previewLines.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className={
                line.startsWith("✓") || line.includes("status:")
                  ? "text-accent"
                  : line.startsWith("$")
                    ? "text-white"
                    : "text-text-muted"
              }
            >
              {line || " "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeTwoPlatformSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal
          variant="scale-up"
          className="border-steel grid min-h-[442px] overflow-hidden rounded-[15px] bg-card lg:grid-cols-[42%_58%]"
        >
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-[50px]">
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-4 max-w-[516px] text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
              One platform to build, deploy, and maintain AI in production.
            </h2>
            <p className="mt-5 max-w-[516px] text-lg leading-tight text-text-dim sm:text-xl">
              RocketRide turns your AI work into structured pipelines that run
              on managed cloud infrastructure. Build it once, hand it off, scale
              it forever.
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[442px]">
            <Image
              src="/figma-assets/majestic-nebula.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 746px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute bottom-[-34px] left-[7%] w-[118%] max-w-none rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.25)] lg:left-[8%]">
              <MiniPipelinePreview />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const STEP_DURATION_MS = 5000;

const SEGMENT_COUNT = buildSteps.length - 1;

export function HomeTwoHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const baseSegmentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const fillSegmentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const container = stepsContainerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();

      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const top = circleRefs.current[i];
        const bottom = circleRefs.current[i + 1];
        if (!top || !bottom) continue;

        const topRect = top.getBoundingClientRect();
        const bottomRect = bottom.getBoundingClientRect();
        const segTop =
          topRect.top - containerRect.top + topRect.height / 2;
        const segBottom =
          bottomRect.top - containerRect.top + bottomRect.height / 2;
        const segHeight = Math.max(0, segBottom - segTop);

        const baseEl = baseSegmentRefs.current[i];
        const fillEl = fillSegmentRefs.current[i];
        if (baseEl) {
          baseEl.style.top = `${segTop}px`;
          baseEl.style.height = `${segHeight}px`;
        }
        if (fillEl) {
          fillEl.style.top = `${segTop}px`;
          fillEl.style.height = `${segHeight}px`;
        }
      }
    };

    measure();
    window.addEventListener("resize", measure);
    const settle = window.setTimeout(measure, 350);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(settle);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    const stepStart = performance.now();

    const tick = (now: number) => {
      const elapsed = now - stepStart;
      const t = Math.min(elapsed / STEP_DURATION_MS, 1);

      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const fillEl = fillSegmentRefs.current[i];
        if (!fillEl) continue;
        fillEl.style.transform = `scaleY(${i === activeStep ? t : 0})`;
      }

      if (t >= 1) {
        setActiveStep((current) => (current + 1) % buildSteps.length);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeStep]);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal className="max-w-[540px]">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            AI done the right way
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-[50px] lg:grid-cols-[minmax(0,615px)_minmax(0,1fr)] lg:items-start">
          <ScrollReveal
            delay={90}
            variant="scale-up"
            className="relative aspect-[1080/720] overflow-hidden rounded-[10px] border border-border bg-[#0f0f0f]"
          >
            <iframe
              src="/howitworks-animation/index.html"
              title="How RocketRide works"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
          </ScrollReveal>

          <div ref={stepsContainerRef} className="relative flex flex-col gap-2">
            {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
              <div key={`segment-${i}`}>
                <div
                  ref={(el) => {
                    baseSegmentRefs.current[i] = el;
                  }}
                  className="absolute left-[25px] w-px bg-border-strong"
                />
                <div
                  ref={(el) => {
                    fillSegmentRefs.current[i] = el;
                  }}
                  className="absolute left-[25px] w-px origin-top bg-accent will-change-transform"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
            ))}
            {buildSteps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <ScrollReveal key={step.title} delay={140 + index * 80}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="group relative flex w-full gap-4 rounded-[10px] p-2.5 text-left transition-colors hover:bg-surface/60"
                  >
                    <div
                      ref={(el) => {
                        circleRefs.current[index] = el;
                      }}
                      className={`relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white transition-colors duration-500 ${
                        isActive ? "bg-accent" : "bg-text-label"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-2xl font-semibold leading-tight transition-colors duration-500 ease-out ${
                          isActive ? "text-white" : "text-text-dim"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-1 text-base leading-snug transition-colors duration-500 ease-out ${
                          isActive ? "text-text-muted" : "text-text-dim"
                        }`}
                      >
                        {step.body}
                      </p>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const partnerLogos = [
  {
    src: "/figma-assets/Sin título (1) 3.png",
    alt: "Agentic AI Foundation",
  },
  {
    src: "/figma-assets/Sin título (1) 2.png",
    alt: "Open Source Initiative",
  },
  {
    src: "/figma-assets/Sin título (1) 4.png",
    alt: "The Linux Foundation",
  },
];

function BuilderBento({ section }: { section: BuilderSection }) {
  const [activeTitle, setActiveTitle] = useState(section.options[0].title);
  const active =
    section.options.find((option) => option.title === activeTitle) ??
    section.options[0];

  return (
    <div>
      <div className="border-b border-border bg-[#2a2a2a] px-5 py-3 sm:px-8 sm:py-4">
        <h3 className="text-xl font-semibold leading-tight text-white sm:text-[22px]">
          {section.label}
        </h3>
        <p className="mt-0.5 max-w-[640px] text-sm leading-snug text-text-dim">
          {section.tagline}
        </p>
      </div>

      <div className="grid gap-5 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[44%_56%]">
        <div className="flex flex-col gap-2">
          {section.options.map((option) => {
            const OptionIcon = option.icon;
            const isActive = option.title === active.title;
            return (
              <button
                key={option.title}
                type="button"
                onClick={() => setActiveTitle(option.title)}
                className={`group flex w-full items-start gap-3 rounded-[10px] border bg-transparent p-4 text-left transition-colors duration-200 ${
                  isActive
                    ? "border-accent"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border bg-surface-2 transition-colors ${
                    isActive
                      ? "border-accent/30 text-accent"
                      : "border-border text-text-dim group-hover:text-white"
                  }`}
                >
                  <OptionIcon
                    pack={option.iconPack}
                    className="text-xl"
                    width="1em"
                    height="1em"
                  />
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-base font-semibold transition-colors ${
                      isActive ? "text-white" : "text-text-muted"
                    }`}
                  >
                    {option.title}
                  </div>
                  <div className="mt-0.5 text-sm leading-snug text-text-dim">
                    {option.body}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-[10px] border border-border lg:min-h-[360px]">
          <CodeWindow option={active} />
        </div>
      </div>
    </div>
  );
}

function PartnerLogoStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 px-5 py-8 sm:px-8 sm:py-10">
      {partnerLogos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={188}
          height={83}
          className="h-12 w-auto object-contain opacity-75 grayscale transition-opacity hover:opacity-100"
        />
      ))}
    </div>
  );
}

const complianceBadges = [
  { src: "/figma-assets/badge-soc2.png", alt: "SOC 2 Type 2" },
  { src: "/figma-assets/badge-iso27001.png", alt: "ISO 27001 Certified" },
  { src: "/figma-assets/badge-eu-gdpr.png", alt: "EU GDPR Compliant" },
];

function CloudPlatformPanel() {
  return (
    <div className="grid gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)]">
      <div className="flex flex-col gap-6">
        <div>
          <SectionLabel>Cloud Platform</SectionLabel>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-[40px]">
            Production AI infrastructure your whole company can run
          </h3>
        </div>
        <div className="relative aspect-[796/421] w-full overflow-hidden rounded-[10px] border border-border bg-white shadow-[0_0_24px_rgba(0,0,0,0.32)]">
          <Image
            src="/figma-assets/cloud-platform-canvas.png"
            alt="RocketRide pipeline canvas"
            fill
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {infrastructure.map((item) => {
          const ItemIcon = item.icon;
          return (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-border bg-surface-2 text-accent">
                <ItemIcon className="text-2xl" width="1em" height="1em" />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-semibold leading-tight text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm leading-snug text-text-dim">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {complianceBadges.map((badge) => (
            <Image
              key={badge.src}
              src={badge.src}
              alt={badge.alt}
              width={107}
              height={107}
              className="h-[88px] w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeTwoWaysToBuild() {
  return (
    <section id="ways-to-build" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-[620px] text-center">
          <SectionLabel>Ways to build</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            Build your way
          </h2>
          <p className="mx-auto mt-4 max-w-[521px] text-lg leading-tight text-text-dim sm:text-xl">
            Build through natural language, inside your IDE, or directly from
            code and infrastructure workflows.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={120}
          variant="scale-up"
          className="mx-auto mt-10 max-w-[1211px] divide-y divide-border overflow-hidden rounded-[15px] border border-border-strong bg-icon-tile"
        >
          {builderSections.map((section) => (
            <BuilderBento key={section.label} section={section} />
          ))}
          <PartnerLogoStrip />
          <CloudPlatformPanel />
        </ScrollReveal>
      </div>
    </section>
  );
}
