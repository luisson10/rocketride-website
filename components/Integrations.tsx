import { SectionLabel } from "./ui/SectionLabel";
import { Card } from "./ui/Card";
import { Icon } from "./ui/Icon";

const tools: { name: string; icon: string }[] = [
  { name: "OpenAI", icon: "bx-bot" },
  { name: "Anthropic", icon: "bx-brain" },
  { name: "HuggingFace", icon: "bx-package" },
  { name: "Pinecone", icon: "bx-cube" },
  { name: "Weaviate", icon: "bx-grid-alt" },
  { name: "LangChain", icon: "bx-link" },
  { name: "IBM Granite", icon: "bx-chip" },
  { name: "Mistral", icon: "bx-wind" },
  { name: "Cohere", icon: "bx-conversation" },
  { name: "Ollama", icon: "bx-server" },
];

export function Integrations() {
  return (
    <section id="resources" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Integrations</SectionLabel>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight tracking-tight">
            Connect your favorite tools.
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-text-muted max-w-[720px] mx-auto">
            Support for LLMs, Vector DBs, Agent frameworks, embeddings, and full
            MCP support. Wire them into a running pipeline in minutes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {tools.map((t) => (
            <Card key={t.name} className="flex items-center gap-3 p-4">
              <span className="bg-icon-tile rounded-[10px] w-9 h-9 flex items-center justify-center">
                <Icon name={t.icon} className="text-white text-lg" />
              </span>
              <span className="text-sm font-semibold text-white">{t.name}</span>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent/80"
          >
            Browse all integrations
            <Icon name="bx-right-arrow-alt" className="text-base" />
          </a>
        </div>
      </div>
    </section>
  );
}
