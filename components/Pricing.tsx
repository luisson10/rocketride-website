import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Icon } from "./ui/Icon";

type Tier = {
  name: string;
  price: string;
  priceSuffix?: string;
  blurb: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Builder",
    price: "$0",
    priceSuffix: "/month",
    blurb: "For individual devs getting started with AI.",
    features: [
      "Up to 3 pipelines",
      "Community support",
      "1 GB storage",
      "Basic observability",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$49",
    priceSuffix: "/month",
    blurb: "For individual developers running AI in production.",
    features: [
      "Unlimited pipelines",
      "Managed cloud runtime",
      "Cost observability",
      "Priority support",
      "Universal API key",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For teams that need governance, security, and dedicated support.",
    features: [
      "Everything in Pro",
      "Elastic auto-scaling",
      "Team collaboration",
      "High-throughput ingestion",
      "SOC 2 / Enterprise readiness",
      "Dedicated support",
    ],
    cta: "Contact Us",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            Scale as you grow.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={
                "relative p-7 flex flex-col " +
                (t.highlighted
                  ? "ring-1 ring-accent/60 shadow-[0_0_40px_rgba(0,185,236,0.15)]"
                  : "")
              }
            >
              {t.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Most popular</Badge>
                </div>
              )}

              <h3 className="text-[24px] font-semibold text-white">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[44px] font-semibold tracking-tight leading-none">
                  {t.price}
                </span>
                {t.priceSuffix && (
                  <span className="text-text-dim text-sm">{t.priceSuffix}</span>
                )}
              </div>
              <p className="mt-3 text-text-muted text-base leading-relaxed">
                {t.blurb}
              </p>

              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-base text-text-muted"
                  >
                    <Icon
                      name="bx-check"
                      className="text-accent text-xl shrink-0 leading-tight"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Button
                  href="#cta"
                  variant={t.highlighted ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                >
                  {t.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
