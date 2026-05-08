import { Nav } from "@/components/Nav";
import { AskAiExperience } from "@/components/AskAiExperience";
import { AppCarousel } from "@/components/AppCarousel";
import { ProblemSection } from "@/components/ProblemSection";
import { PlatformSection } from "@/components/PlatformSection";
import { CoreFeatures } from "@/components/CoreFeatures";
import { WaysToBuild } from "@/components/WaysToBuild";
import { UseCases } from "@/components/UseCases";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Integrations } from "@/components/Integrations";
import { Pricing } from "@/components/Pricing";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-icon-tile">
        <AskAiExperience />
        <AppCarousel />
        <ProblemSection />
        <PlatformSection />
        <CoreFeatures />
        <WaysToBuild />
        <UseCases />
        <FeaturesGrid />
        <Integrations />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
