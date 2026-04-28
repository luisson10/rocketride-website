import { SectionLabel } from "./ui/SectionLabel";
import { PlatformDashboard } from "./ui/MockDashboard";

export function PlatformSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <SectionLabel>The Platform</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight max-w-[900px] mx-auto">
            One platform to build, ship, and maintain AI in production.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted max-w-[720px] mx-auto">
            RocketRide turns your AI work into structured pipelines that run on
            managed cloud infrastructure. Build it once, hand it off, scale it
            forever.
          </p>
        </div>

        <div className="mt-14 max-w-5xl mx-auto">
          <PlatformDashboard />
        </div>
      </div>
    </section>
  );
}
