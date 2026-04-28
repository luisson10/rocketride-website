"use client";

import { useState } from "react";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { SegmentedControl } from "./ui/SegmentedControl";
import { CloudBuilderMock } from "./ui/MockDashboard";

const tabs = ["Cloud Builder", "IDE Extension", "CLI", "SDK", "MCP Server"];

const copy: Record<string, { title: string; body: string; best: string }> = {
  "Cloud Builder": {
    title: "Cloud Builder",
    body:
      "Visual drag-and-drop canvas in the browser. Design, test, and deploy pipelines without installing a thing.",
    best: "Best for: product managers, solution teams, quick prototypes",
  },
  "IDE Extension": {
    title: "IDE Extension",
    body:
      "Build pipelines side-by-side with your code. Autocomplete, inline previews, one-keystroke deploy.",
    best: "Best for: engineers who live in their editor",
  },
  CLI: {
    title: "Command-line interface",
    body:
      "Script every part of your pipeline lifecycle. Hook RocketRide into CI/CD or run it from a terminal.",
    best: "Best for: DevOps, automation, reproducible builds",
  },
  SDK: {
    title: "Native SDK",
    body:
      "Drop the SDK into any TypeScript or Python project. Call pipelines like functions, ship in hours.",
    best: "Best for: app developers embedding AI in products",
  },
  "MCP Server": {
    title: "MCP Server",
    body:
      "Expose your pipelines to any agent runtime via the Model Context Protocol. Composable, secure, multi-tenant.",
    best: "Best for: agent platforms and tool builders",
  },
};

export function WaysToBuild() {
  const [active, setActive] = useState<string>("Cloud Builder");
  const c = copy[active];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Ways to build</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            We meet your team where they work.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted max-w-[720px] mx-auto">
            Work from your code editor, the command line, or inside an agent.
            Same pipelines, same cloud, wherever you build.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <SegmentedControl items={tabs} active={active} onChange={setActive} />
        </div>

        <Card className="mt-10 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-4 text-text-muted text-[17px] leading-relaxed">
                {c.body}
              </p>
              <p className="mt-4 text-sm text-text-dim">→ {c.best}</p>
              <div className="mt-7">
                <Button href="#cta" variant="primary" size="md">
                  Get Started
                  <Icon name="bx-right-arrow-alt" className="text-lg" />
                </Button>
              </div>
            </div>
            <div>
              <CloudBuilderMock />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
