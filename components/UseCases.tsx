import { SectionLabel } from "./ui/SectionLabel";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";
import { BenchmarkChart } from "./ui/MockDashboard";

const otherCases: { name: string; icon: string }[] = [
  { name: "Image recognition", icon: "bx-image" },
  { name: "Record Anonymization", icon: "bx-shield-quarter" },
  { name: "Advanced RAG", icon: "bx-search-alt" },
];

export function UseCases() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Use cases</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            One cloud. Every AI workload.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted max-w-[720px] mx-auto">
            From smart chatbots to comparing AI models to keeping documents safe.
          </p>
        </div>

        <Card className="mt-14 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                LLM Benchmarking
              </h3>
              <p className="mt-4 text-text-muted text-[17px] leading-relaxed">
                Run the same prompt across multiple leading LLMs and compare
                their outputs side by side in real time, all within a single
                structured evaluation pipeline.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="#" variant="ghost" size="md">
                  Read more
                </Button>
                <Button href="#cta" variant="primary" size="md">
                  Use Pipeline
                </Button>
              </div>
            </div>
            <div>
              <BenchmarkChart />
            </div>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {otherCases.map((c) => (
            <Card
              key={c.name}
              className="p-4 flex items-center gap-3 cursor-pointer"
            >
              <span className="bg-icon-tile rounded-[10px] w-10 h-10 flex items-center justify-center">
                <Icon name={c.icon} className="text-white text-xl" />
              </span>
              <span className="text-base font-semibold text-white">
                {c.name}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
