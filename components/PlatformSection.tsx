import Image from "next/image";
import { SectionLabel } from "./ui/SectionLabel";

export function PlatformSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <div className="border-steel grid min-h-[483px] overflow-hidden rounded-[15px] bg-card lg:grid-cols-[42%_58%]">
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-[50px]">
            <SectionLabel>The Platform</SectionLabel>
            <h2 className="mt-4 max-w-[516px] text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
              One platform to build, ship, and maintain AI in production.
            </h2>
            <p className="mt-5 max-w-[516px] text-lg leading-tight text-text-dim sm:text-xl">
              RocketRide turns your AI work into structured pipelines that run
              on managed cloud infrastructure. Build it once, hand it off, scale
              it forever.
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[483px]">
            <Image
              src="/figma-assets/cosmic-nebula.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 746px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <Image
              src="/figma-assets/pipeline-wide.png"
              alt="RocketRide pipeline canvas"
              width={833}
              height={441}
              className="absolute bottom-[-12px] left-[7%] w-[120%] max-w-none rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.25)] lg:left-[8%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
