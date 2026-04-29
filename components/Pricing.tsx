"use client";

import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Check } from "@boxicons/react";
import { SegmentedControl } from "./ui/SegmentedControl";
import { ScrollReveal } from "./ui/ScrollReveal";

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
    price: "$49",
    priceSuffix: "/month",
    blurb: "For individual developers running AI in production.",
    features: [
      "Managed cloud runtime",
      "Master API Key *For certain providers",
      "Cost observability",
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$249",
    priceSuffix: "/month",
    blurb: "For developers who need a higher throughput and advanced controls",
    features: [
      "Everything in Builder",
      "Elastic auto-scaling",
      "Expanded token allocation",
      "Priority support",
      "Advanced Observability",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For teams that need governance, security, and dedicated support",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "SOC 2 compliance and audit logs",
      "Per team cost observability",
      "Dedicated support and SLAs",
    ],
    cta: "Contact Us",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal>
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            Scale as you grow
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={90} className="mt-10 overflow-x-auto pb-2">
          <SegmentedControl
            items={["Monthly", "Yearly (Save 20%)"]}
            active="Monthly"
            onChange={() => undefined}
            className="min-w-max"
          />
        </ScrollReveal>

        <div className="mt-4 grid grid-cols-1 gap-[15px] lg:grid-cols-3">
          {tiers.map((t, index) => (
            <ScrollReveal key={t.name} delay={index * 110} variant="scale-up">
              <Card
                className={
                  "relative flex min-h-[523px] flex-col gap-[15px] !px-[25px] !py-5 " +
                  (t.highlighted
                    ? "shadow-[0_0_40px_rgba(0,185,236,0.12)]"
                    : "")
                }
              >
                {t.highlighted && (
                  <div className="absolute right-6 top-6">
                    <Badge>Recommended</Badge>
                  </div>
                )}

                <div>
                  <h3 className="text-[22px] font-semibold leading-tight text-white">
                    {t.name}
                  </h3>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-[30px] font-semibold leading-tight text-white">
                      {t.price}
                    </span>
                    {t.priceSuffix && (
                      <span className="text-[22px] font-semibold leading-tight text-text-dim">
                        {t.priceSuffix}
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-lg leading-tight text-text-muted">
                    {t.blurb}
                  </p>
                </div>

                <Button
                  href="#cta"
                  variant={t.highlighted ? "primary" : "secondary"}
                  size="md"
                  className="w-full"
                >
                  {t.cta}
                </Button>

                <div className="flex items-center gap-2 py-1">
                  <div className="h-px flex-1 bg-text-dim/50" />
                  <span className="text-sm font-semibold text-text-dim">
                    Features
                  </span>
                  <div className="h-px flex-1 bg-text-dim/50" />
                </div>

                <ul className="space-y-2.5">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-lg leading-tight text-white"
                    >
                      <Check
                        className="shrink-0 text-[17px] leading-none text-white"
                        width="1em"
                        height="1em"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
