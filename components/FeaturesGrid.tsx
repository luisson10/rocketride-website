import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { IconTile } from "./ui/IconTile";
import { Icon } from "./ui/Icon";

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
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            Built for teams running AI in production.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted max-w-[720px]">
            Build, test, and deploy your pipelines with tools that do the work
            for you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title} className="flex flex-col">
              <IconTile name={f.icon} />
              <h3 className="mt-5 text-[24px] font-semibold mb-2 text-white">
                {f.title}
              </h3>
              <p className="text-text-muted text-base leading-relaxed flex-1">
                {f.body}
              </p>
              <a
                href="#"
                className="mt-5 text-sm text-accent hover:text-accent/80 inline-flex items-center gap-1 self-start"
              >
                Learn more
                <Icon name="bx-right-arrow-alt" className="text-base" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
