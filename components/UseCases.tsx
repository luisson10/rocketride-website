"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { SegmentedControl } from "./ui/SegmentedControl";

const cases = [
  {
    name: "LLM Benchmarking",
    image: "/figma-assets/pipeline-wide.png",
    body:
      "Run the same prompt across multiple leading LLMs and compare their outputs side by side in real time, all within a single structured evaluation pipeline.",
  },
  {
    name: "Image recognition",
    image: "/figma-assets/deploy-canvas.png",
    body:
      "Detect brands, people, objects, and visual events with a reusable pipeline your team can monitor and improve over time.",
  },
  {
    name: "Record Anonymization",
    image: "/figma-assets/cost-dashboard.png",
    body:
      "Remove sensitive fields, redact documents, and keep audit-ready traces while your data moves through production AI systems.",
  },
  {
    name: "Advanced RAG",
    image: "/figma-assets/key-dashboard.png",
    body:
      "Connect retrieval, reranking, generation, and evaluation into one governed cloud pipeline for knowledge-heavy applications.",
  },
];

export function UseCases() {
  const [active, setActive] = useState(cases[0].name);
  const current = cases.find((item) => item.name === active) ?? cases[0];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <div className="max-w-[650px]">
          <SectionLabel>Use cases</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            <span className="text-accent">One cloud.</span> Every AI workload.
          </h2>
          <p className="mt-4 max-w-[501px] text-lg leading-tight text-text-dim sm:text-xl">
            From smart chatbots to comparing AI models to keeping documents safe.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-2">
          <SegmentedControl
            items={cases.map((item) => item.name)}
            active={active}
            onChange={setActive}
            className="min-w-max"
          />
        </div>

        <div className="mt-4">
          <div className="relative h-[360px] overflow-hidden rounded-[10px] sm:h-[428px]">
            <Image
              src="/figma-assets/starry-mountains.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
            <Image
              src={current.image}
              alt={`${current.name} pipeline preview`}
              width={833}
              height={441}
              className="absolute bottom-[-69px] left-1/2 w-[833px] max-w-[86%] -translate-x-1/2 rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div className="mt-[25px] flex flex-col gap-5 py-2.5 lg:flex-row lg:items-center lg:gap-[60px]">
            <p className="flex-1 text-xl leading-tight text-white">
              {current.body}
            </p>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Button href="#" variant="secondary" size="md">
                <Icon name="bx-book-open" className="text-lg" />
                Read more
              </Button>
              <Button href="#cta" variant="primary" size="md">
                Use Pipeline
                <Icon name="bx-right-arrow-alt" className="text-lg" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
