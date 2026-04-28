import Image from "next/image";
import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { ScrollReveal } from "./ui/ScrollReveal";

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden py-16 sm:py-24">
      <div className="relative mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal
          variant="scale-up"
          className="border-steel grid min-h-[368px] overflow-hidden rounded-[15px] bg-card lg:grid-cols-[48%_52%]"
        >
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-[50px]">
            <SectionLabel>READY FOR LAUNCH</SectionLabel>
            <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
              <span className="block">Your first AI pipeline</span>
              <span className="block text-accent">ships in 4 minutes.</span>
            </h2>
            <p className="mt-5 max-w-[406px] text-lg leading-tight text-text-dim sm:text-xl">
              Spin up a cloud account, connect your first provider, and deploy
              to production.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Button href="#" variant="primary" size="md">
                Get started
              </Button>
              <Button href="#pricing" variant="secondary" size="md">
                <Icon name="bx-calendar" className="text-lg" />
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-[368px]">
            <Image
              src="/figma-assets/launch-dashboard.png"
              alt="RocketRide launch pipeline dashboard"
              width={593}
              height={309}
              className="absolute left-0 top-[58px] w-[115%] max-w-none rounded-t-[10px] drop-shadow-[0_0_5px_black] lg:w-[593px]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
