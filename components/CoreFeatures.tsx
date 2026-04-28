import Image from "next/image";
import { SectionLabel } from "./ui/SectionLabel";
import { ScrollReveal } from "./ui/ScrollReveal";

const features = [
  {
    image: "/figma-assets/cost-dashboard.png",
    imageClassName: "left-[8%] top-[8%] w-[150%]",
    title: "Lowest Runtime Cost",
    body:
      "Optimized compute runs your pipelines faster and cheaper than self-hosting. Pay less per token, scale without surprises.",
  },
  {
    image: "/figma-assets/deploy-canvas.png",
    imageClassName: "left-[-46%] top-[-9%] w-[144%]",
    title: "One-Click Cloud Deploy",
    body:
      "Push from your IDE straight to RocketRide Cloud. Elastic compute, autoscaling, and observability included.",
  },
  {
    image: "/figma-assets/key-dashboard.png",
    imageClassName: "left-[7%] top-[-3%] w-[142%]",
    title: "Universal API Key",
    body:
      "One key, every provider. Simplify account management, stop juggling keys. Your bill shrinks as you scale.",
  },
];

export function CoreFeatures() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal className="max-w-[520px]">
          <SectionLabel>Core features</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            Production AI, <span className="text-accent">managed for you</span>
          </h2>
          <p className="mt-4 max-w-[432px] text-lg leading-tight text-text-dim sm:text-xl">
            From idea to production AI your team actually owns.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-[29px] md:grid-cols-3">
          {features.map((f, index) => (
            <ScrollReveal key={f.title} delay={index * 120} variant="scale-up">
              <article className="min-w-0">
                <div className="relative h-[320px] overflow-hidden rounded-[10px] md:h-[365px]">
                  <Image
                    src="/figma-assets/majestic-nebula.png"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 409px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <Image
                    src={f.image}
                    alt=""
                    width={668}
                    height={440}
                    className={`absolute max-w-none rounded-[10px] ${f.imageClassName}`}
                  />
                </div>
                <h3 className="mt-[15px] text-[22px] font-semibold leading-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-1 text-lg leading-tight text-text-muted">
                  {f.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
