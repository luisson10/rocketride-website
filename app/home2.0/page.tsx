import { AskAiExperience } from "@/components/AskAiExperience";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import {
  HomeTwoHowItWorks,
  HomeTwoPlatformSection,
  HomeTwoWaysToBuild,
} from "@/components/HomeTwoSections";
import { Nav } from "@/components/Nav";

export const metadata = {
  title: "RocketRide home2.0 — Build AI your whole team can run",
  description:
    "An alternate RocketRide homepage inspired by the Figma SaaS website direction.",
};

export default function HomeTwoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-icon-tile">
        <AskAiExperience
        fullViewportHero
        heroBackgroundVideoSrc="/11D08001-902B-4AD7-BBE3-75F97674B6D3-15119-000008A4202FDC54.mp4"
      />
        <HomeTwoPlatformSection />
        <HomeTwoHowItWorks />
        <HomeTwoWaysToBuild />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
