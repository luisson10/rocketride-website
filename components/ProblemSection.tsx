import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { IconTile } from "./ui/IconTile";
import { ScrollReveal } from "./ui/ScrollReveal";

const cards = [
  {
    icon: "bx-shapes",
    title: "Tool sprawl",
    body:
      "The AI ecosystem has thousands of models, frameworks, and tools, and it changes weekly. Your team spends more time evaluating than building.",
  },
  {
    icon: "bx-git-branch",
    title: "Prototype to production gap",
    body:
      "Demos work. Production breaks. What took hours to prototype takes weeks to harden.",
  },
  {
    icon: "bx-user-circle",
    title: "The one person who knows it",
    body:
      "AI gets built by whoever has the time. When that person leaves, no one else can read the code, debug the agent, or keep it alive.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1286px] px-4 sm:px-6">
        <ScrollReveal className="mx-auto max-w-[760px] text-center">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="mt-4 text-4xl font-semibold leading-none tracking-tight sm:text-[44px]">
            <span className="block">AI is fast.</span>
            <span className="block text-accent">AI projects are slow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[718px] text-lg leading-tight text-text-dim sm:text-xl">
            The hard part isn&apos;t writing the code anymore. It&apos;s
            specifying intent, picking the right tools, evaluating output, and
            keeping it all running reliably.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-[29px] md:grid-cols-3">
          {cards.map((c, index) => (
            <ScrollReveal key={c.title} delay={index * 110} variant="scale-up">
              <Card className="flex min-h-[216px] flex-col justify-between !p-5">
                <IconTile name={c.icon} size={58} />
                <div>
                  <h3 className="text-[22px] font-semibold leading-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-lg leading-tight text-text-muted">
                    {c.body}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
