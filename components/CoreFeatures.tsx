import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { IconTile } from "./ui/IconTile";

const features = [
  {
    icon: "bx-dollar-circle",
    title: "Lowest Runtime Cost",
    body:
      "Optimized compute runs your pipelines faster and cheaper than self-hosting. Pay less per token, scale without surprises.",
  },
  {
    icon: "bx-cloud-upload",
    title: "One-Click Cloud Deploy",
    body:
      "Push from your IDE straight to RocketRide Cloud. Elastic compute, autoscaling, and observability included.",
  },
  {
    icon: "bx-key",
    title: "Universal API Key",
    body:
      "One key, every provider. Simplify account management, stop juggling keys. Your bill shrinks as you scale.",
  },
];

export function CoreFeatures() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <SectionLabel>Core features</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            From idea to production — AI your team actually owns.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title}>
              <IconTile name={f.icon} />
              <h3 className="mt-5 text-[24px] font-semibold mb-2 text-white">
                {f.title}
              </h3>
              <p className="text-text-muted leading-relaxed text-base">
                {f.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
