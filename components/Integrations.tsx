import type { ComponentType } from "react";
import {
  Aws,
  Brain,
  Chip,
  Cube,
  Docker,
  Github,
  Grid,
  Link,
  Message,
  Package,
  Python,
  Robot,
  Server,
  Wind,
  type BoxIconProps,
} from "@boxicons/react";
import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { ScrollReveal } from "./ui/ScrollReveal";

type Tool = { name: string; icon: ComponentType<BoxIconProps> };

const tools: Tool[] = [
  { name: "OpenAI", icon: Robot },
  { name: "Anthropic", icon: Brain },
  { name: "HuggingFace", icon: Package },
  { name: "Pinecone", icon: Cube },
  { name: "Weaviate", icon: Grid },
  { name: "LangChain", icon: Link },
  { name: "IBM Granite", icon: Chip },
  { name: "Mistral", icon: Wind },
  { name: "Cohere", icon: Message },
  { name: "Ollama", icon: Server },
  { name: "AWS", icon: Aws },
  { name: "Python", icon: Python },
  { name: "Docker", icon: Docker },
  { name: "GitHub", icon: Github },
];

export function Integrations() {
  const marqueeTools = [...tools, ...tools];

  return (
    <section id="resources" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal variant="scale-up">
          <Card className="flex min-h-[490px] flex-col items-center justify-center overflow-hidden rounded-[15px] !p-[15px]">
          <div className="max-w-[760px] text-center">
            <SectionLabel>Integrations</SectionLabel>
            <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
              Connect your <span className="text-accent">favorite tools</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[624px] text-lg leading-tight text-text-dim sm:text-xl">
              Support for LLMs, Vector DBs, Agent frameworks, embeddings, and
              full MCP support. Wire them into a running pipeline in minutes.
            </p>
          </div>

          <div className="relative mt-8 h-[190px] w-full overflow-hidden">
            <div className="integrations-marquee absolute left-0 top-1/2 flex w-max -translate-y-1/2 gap-[19px] px-12">
              {marqueeTools.map((tool, index) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={`${tool.name}-${index}`}
                    className="flex h-[83px] w-[81px] shrink-0 items-center justify-center rounded-[11px] bg-white text-[#1f1f1f] shadow-[0_1px_3px_rgba(0,0,0,0.18)]"
                    title={tool.name}
                  >
                    <ToolIcon
                      className="text-[38px]"
                      width="1em"
                      height="1em"
                    />
                  </div>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#373737_0%,rgba(55,55,55,0.10)_18%,rgba(31,31,31,0)_50%,rgba(55,55,55,0.17)_88%,#373737_100%)]" />
          </div>

          <Button href="#" variant="primary" size="md" className="mt-1">
            Browse all integrations
          </Button>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
