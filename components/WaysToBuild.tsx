"use client";

import Image from "next/image";
import { useState, type ComponentType } from "react";
import {
  ArrowRight,
  Book,
  Code,
  Copy,
  Dashboard,
  Extension,
  NetworkChart,
  Terminal,
  Typescript,
  VisualStudio,
  type BoxIconProps,
  type IconPack,
} from "@boxicons/react";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { SegmentedControl } from "./ui/SegmentedControl";
import { ScrollReveal } from "./ui/ScrollReveal";

const tabs = ["IDE Extension", "CLI", "SDK", "MCP Server", "Cloud Builder"];

type CopyItem = {
  title: string;
  icon: ComponentType<BoxIconProps>;
  iconPack?: IconPack;
  cta: string;
  ctaIcon: ComponentType<BoxIconProps>;
  body: string;
  best: string;
};

const copy: Record<string, CopyItem> = {
  "Cloud Builder": {
    title: "Cloud Builder",
    icon: Dashboard,
    iconPack: "filled",
    cta: "Get Started",
    ctaIcon: ArrowRight,
    body:
      "Visual drag-and-drop canvas in the browser. Design, test, and deploy pipelines without installing a thing.",
    best: "Best for: product managers, solution teams, quick prototypes",
  },
  "IDE Extension": {
    title: "IDE Extension",
    icon: VisualStudio,
    cta: "Install Extension",
    ctaIcon: Extension,
    body:
      "Native extension for VS Code, Cursor, Windsurf and Antigravity. Build pipelines inside the editor you already live in.",
    best: "Best for: developers who want AI pipelines next to their code",
  },
  CLI: {
    title: "CLI",
    icon: Terminal,
    cta: "npm install -g",
    ctaIcon: Code,
    body:
      "Ship pipelines from your terminal. Full deployment, logs, and env management without leaving the shell.",
    best: "Best for: CI/CD workflows, ops, and scripting",
  },
  SDK: {
    title: "SDK",
    icon: Typescript,
    cta: "View Docs",
    ctaIcon: Book,
    body:
      "TypeScript and Python SDKs to call, compose, and orchestrate pipelines from inside any application.",
    best: "Best for: embedding RocketRide into applications, agents, and services",
  },
  "MCP Server": {
    title: "MCP Server",
    icon: NetworkChart,
    cta: "Copy config",
    ctaIcon: Copy,
    body:
      "Expose your pipelines as tools any MCP-compatible agent can call. Plug RocketRide into Claude, Cursor, or custom agents.",
    best: "Best for: agentic workflows and multi-agent systems",
  },
};

export function WaysToBuild() {
  const [active, setActive] = useState<string>("IDE Extension");
  const c = copy[active];
  const ActiveIcon = c.icon;
  const CtaIcon = c.ctaIcon;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal className="max-w-[540px]">
          <SectionLabel>Ways to build</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            We meet your team{" "}
            <span className="text-accent">where they work</span>
          </h2>
          <p className="mt-4 text-lg leading-tight text-text-dim sm:text-xl">
            Work from your code editor, the command line, or inside an agent.
            Same pipelines, same cloud, wherever you build.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={90} className="mt-10 overflow-x-auto pb-2">
          <SegmentedControl
            items={tabs}
            active={active}
            onChange={setActive}
            className="min-w-max"
          />
        </ScrollReveal>

        <div className="mt-5 grid grid-cols-1 gap-[50px] lg:grid-cols-[minmax(0,615px)_minmax(0,1fr)]">
          <ScrollReveal
            delay={160}
            variant="fade-left"
            className="relative h-[334px] overflow-hidden rounded-[10px]"
          >
            <Image
              src="/figma-assets/starry-mountains.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 615px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
            <Image
              src="/figma-assets/pipeline-wide.png"
              alt={`${active} pipeline preview`}
              width={833}
              height={441}
              className="absolute bottom-[-134px] left-[27px] w-[833px] max-w-none rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.25)]"
            />
          </ScrollReveal>

          <ScrollReveal
            delay={240}
            variant="scale-up"
            className="border-steel flex min-h-[334px] flex-col gap-3 rounded-[15px] bg-surface p-3"
          >
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-icon-tile">
                <ActiveIcon
                  pack={c.iconPack}
                  className="text-[22px] text-white"
                  width="1em"
                  height="1em"
                />
              </div>
              <h3 className="min-w-0 flex-1 text-[28px] font-semibold leading-tight text-white">
                {c.title}
              </h3>
              <Button href="#cta" variant="primary" size="md">
                {c.cta}
                <CtaIcon className="text-lg" width="1em" height="1em" />
              </Button>
            </div>

            <div className="flex flex-1 items-start rounded-[10px] bg-surface-2 p-7 ring-1 ring-white/[0.04] sm:p-8">
              <div>
                <p className="text-xl leading-tight text-white">{c.body}</p>
                <p className="mt-7 text-lg leading-tight text-text-dim">
                  → {c.best}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
