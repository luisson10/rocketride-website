import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { IconTile } from "./ui/IconTile";
import { Icon } from "./ui/Icon";
import { ScrollReveal } from "./ui/ScrollReveal";

type Feature = { title: string; body: string; icon: string };

const features: Feature[] = [
  {
    title: "Lowest Runtime Cost",
    body:
      "40% lower cost on every pipeline run. Same reliability and output quality, smaller bill.",
    icon: "bx-dollar-circle",
  },
  {
    title: "Elastic Autoscaling",
    body:
      "Handle bursts without capacity planning. Pay for what you use, scale to zero when idle.",
    icon: "bx-trending-up",
  },
  {
    title: "Team Collaboration",
    body: "Shared workspaces, role-based access, and real-time collaboration.",
    icon: "bx-group",
  },
  {
    title: "High-Throughput Ingestion",
    body:
      "Multi-threaded architecture processes large datasets in a fraction of the time.",
    icon: "bx-data",
  },
  {
    title: "Enterprise Readiness",
    body:
      "SOC 2 compliant infrastructure, full audit logs, and enterprise-grade security.",
    icon: "bx-shield-quarter",
  },
  {
    title: "One API Key",
    body:
      "One master key at aggregate usage, simplify billing, unlock volume economics.",
    icon: "bx-key",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal className="max-w-[520px]">
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            Built for teams running{" "}
            <span className="text-accent">AI in production</span>
          </h2>
          <p className="mt-4 max-w-[459px] text-lg leading-tight text-text-dim sm:text-xl">
            Build, test, and deploy your pipelines with tools that do the work
            for you.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, index) => (
            <ScrollReveal
              key={f.title}
              delay={(index % 3) * 90}
              variant="scale-up"
            >
              <Card
                className="group relative flex min-h-[204px] flex-col justify-between !p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <IconTile name={f.icon} size={58} />
                <a
                  href="#"
                  className="absolute right-3 top-2 inline-flex translate-y-1 items-center gap-1 rounded-[10px] px-4 py-2.5 text-lg font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span className="underline">Learn More</span>
                  <Icon
                    name="bx-right-arrow-alt"
                    className="-rotate-45 text-xl"
                  />
                </a>
                <div>
                  <h3 className="text-[22px] font-semibold leading-tight text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-lg leading-tight text-text-muted">
                    {f.body}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
