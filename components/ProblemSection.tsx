import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { IconTile } from "./ui/IconTile";

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
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            AI is fast. <span className="text-accent">AI projects are slow.</span>
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted max-w-[720px] mx-auto">
            The hard part isn&apos;t writing the code anymore. It&apos;s
            specifying intent, picking the right tools, evaluating output, and
            keeping it all running reliably.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c) => (
            <Card key={c.title} className="p-7">
              <IconTile name={c.icon} />
              <h3 className="mt-5 text-[24px] font-semibold mb-2 text-white">
                {c.title}
              </h3>
              <p className="text-text-muted leading-relaxed text-base">
                {c.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
