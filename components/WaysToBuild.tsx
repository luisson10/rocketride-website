"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { SegmentedControl } from "./ui/SegmentedControl";

const tabs = ["IDE Extension", "CLI", "SDK", "MCP Server", "Cloud Builder"];

const copy: Record<
  string,
  { title: string; icon: string; cta: string; body: string; best: string }
> = {
  "Cloud Builder": {
    title: "Cloud Builder",
    icon: "bxs-dashboard",
    cta: "Get Started",
    body:
      "Visual drag-and-drop canvas in the browser. Design, test, and deploy pipelines without installing a thing.",
    best: "Best for: product managers, solution teams, quick prototypes",
  },
  "IDE Extension": {
    title: "IDE Extension",
    icon: "bxl-visual-studio",
    cta: "Install Extension",
    body:
      "Native extension for VS Code, Cursor, Windsurf and Antigravity. Build pipelines inside the editor you already live in.",
    best: "Best for: developers who want AI pipelines next to their code",
  },
  CLI: {
    title: "CLI",
    icon: "bx-terminal",
    cta: "npm install -g",
    body:
      "Ship pipelines from your terminal. Full deployment, logs, and env management without leaving the shell.",
    best: "Best for: CI/CD workflows, ops, and scripting",
  },
  SDK: {
    title: "SDK",
    icon: "bxl-typescript",
    cta: "View Docs",
    body:
      "TypeScript and Python SDKs to call, compose, and orchestrate pipelines from inside any application.",
    best: "Best for: embedding RocketRide into applications, agents, and services",
  },
  "MCP Server": {
    title: "MCP Server",
    icon: "bx-network-chart",
    cta: "Copy config",
    body:
      "Expose your pipelines as tools any MCP-compatible agent can call. Plug RocketRide into Claude, Cursor, or custom agents.",
    best: "Best for: agentic workflows and multi-agent systems",
  },
};

export function WaysToBuild() {
  const [active, setActive] = useState<string>("IDE Extension");
  const c = copy[active];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <div className="max-w-[540px]">
          <SectionLabel>Ways to build</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            We meet your team{" "}
            <span className="text-accent">where they work</span>
          </h2>
          <p className="mt-4 text-lg leading-tight text-text-dim sm:text-xl">
            Work from your code editor, the command line, or inside an agent.
            Same pipelines, same cloud, wherever you build.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-2">
          <SegmentedControl
            items={tabs}
            active={active}
            onChange={setActive}
            className="min-w-max"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-[50px] lg:grid-cols-[minmax(0,615px)_minmax(0,1fr)]">
          <div className="relative h-[334px] overflow-hidden rounded-[10px]">
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
          </div>

          <div className="border-steel flex min-h-[334px] flex-col gap-2.5 rounded-[15px] bg-surface p-2.5">
            <div className="flex items-center gap-2.5 px-2.5 py-1.5">
              <Icon name={c.icon} className="text-2xl text-white" />
              <h3 className="min-w-0 flex-1 text-2xl font-semibold leading-tight text-white">
                {c.title}
              </h3>
              <Button href="#cta" variant="primary" size="sm">
                {c.cta}
                <Icon name="bx-right-arrow-alt" className="text-lg" />
              </Button>
            </div>

            <div className="flex flex-1 items-center rounded-[10px] bg-card p-6 sm:p-[25px]">
              <div>
                <p className="text-xl leading-tight text-white">{c.body}</p>
                <p className="mt-7 text-lg leading-tight text-text-dim">
                  → {c.best}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
