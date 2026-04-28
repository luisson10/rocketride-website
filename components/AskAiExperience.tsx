"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AppCarousel } from "./AppCarousel";
import { Hero } from "./Hero";
import { Icon } from "./ui/Icon";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  href?: string;
  hrefLabel?: string;
};

type FaqAnswer = {
  match: string[];
  content: string;
  href?: string;
  hrefLabel?: string;
};

const SUGGESTED_QUESTIONS = [
  "What can I build?",
  "How much does RocketRide cost?",
  "Browse app examples",
  "How do teams deploy?",
];

const FAQ_ANSWERS: FaqAnswer[] = [
  {
    match: ["cost", "price", "pricing", "much"],
    content:
      "RocketRide has plans for individual builders, production developers, and teams. The pricing section breaks down what each tier includes.",
    href: "#pricing",
    hrefLabel: "Jump to pricing",
  },
  {
    match: ["build", "what can", "apps", "examples", "browse"],
    content:
      "You can browse app patterns built with RocketRide, then remix them into pipelines for content, model evaluation, support, ingestion, and team workflows.",
    href: "#features",
    hrefLabel: "Explore features",
  },
  {
    match: ["deploy", "deployment", "cloud", "production", "teams"],
    content:
      "Teams can push structured AI pipelines to RocketRide Cloud with managed runtime, autoscaling, observability, and shared collaboration built in.",
    href: "#features",
    hrefLabel: "See deployment features",
  },
  {
    match: ["integrations", "tools", "providers", "llm", "api key"],
    content:
      "RocketRide is designed to connect LLMs, vector databases, agent frameworks, embeddings, and MCP-enabled tools behind a simpler workflow.",
    href: "#resources",
    hrefLabel: "View integrations",
  },
  {
    match: ["enterprise", "security", "soc", "governance"],
    content:
      "Enterprise teams get governance-oriented features like auditability, role-based collaboration, dedicated support, and production-ready infrastructure.",
    href: "#pricing",
    hrefLabel: "Compare plans",
  },
  {
    match: ["compare", "benchmark", "models", "eval", "evaluation"],
    content:
      "RocketRide can help compare LLM outputs in structured evaluation pipelines before your team ships a workflow to production.",
    href: "#features",
    hrefLabel: "See evaluation workflows",
  },
  {
    match: ["recording", "content", "newsletter", "blog", "video"],
    content:
      "A RocketRide pipeline can turn recordings and raw inputs into reusable content workflows like newsletters, show notes, scripts, and posts.",
    href: "#features",
    hrefLabel: "Browse workflow ideas",
  },
];

const FALLBACK_ANSWER: FaqAnswer = {
  match: [],
  content:
    "I can help with RocketRide pricing, app examples, deployment, integrations, teams, and production AI workflows. Try asking about one of those topics.",
  href: "#features",
  hrefLabel: "Start with features",
};

function getAnswer(question: string): FaqAnswer {
  const normalized = question.toLowerCase();
  return (
    FAQ_ANSWERS.find((answer) =>
      answer.match.some((term) => normalized.includes(term)),
    ) ?? FALLBACK_ANSWER
  );
}

function createMessage(role: Message["role"], content: string, answer?: FaqAnswer): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    href: answer?.href,
    hrefLabel: answer?.hrefLabel,
  };
}

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-[10px] border px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "border-accent/40 bg-accent/15 text-text"
            : "border-border-strong bg-icon-tile text-text-muted"
        }`}
      >
        <p>{message.content}</p>
        {!isUser && message.href && (
          <a
            href={message.href}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80"
          >
            {message.hrefLabel}
            <Icon name="bx-right-arrow-alt" className="text-base" />
          </a>
        )}
      </div>
    </div>
  );
}

type AskAiDrawerProps = {
  open: boolean;
  messages: Message[];
  onClose: () => void;
  onAsk: (question: string) => void;
};

function AskAiDrawer({ open, messages, onClose, onAsk }: AskAiDrawerProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    onAsk(question);
    setInput("");
  };

  return (
    <aside
      aria-label="Ask AI chat drawer"
      aria-hidden={!open}
      className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-full flex-col border-l border-border-strong bg-surface shadow-[-24px_0_80px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-200 ease-out sm:w-[360px] ${
        open
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-full opacity-0"
      }`}
    >
      <div className="border-b border-border-strong px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-text">Ask AI</p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              Ask about pricing, apps, deployment, and how RocketRide works.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Ask AI"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-text-muted transition-colors hover:bg-icon-tile hover:text-text"
          >
            <Icon name="bx-x" className="text-2xl" />
          </button>
        </div>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-accent/70 via-nebula-violet/50 to-transparent" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="rounded-[10px] border border-border-strong bg-icon-tile p-4">
            <p className="text-sm font-medium text-text">Ask me about RocketRide.</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              I can answer questions while you keep browsing the page.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => onAsk(question)}
                  className="inline-flex items-center rounded-[10px] border border-border-strong bg-surface px-3 py-1.5 text-xs text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border-strong p-4">
        <label htmlFor="ask-ai-drawer-input" className="sr-only">
          Ask RocketRide
        </label>
        <div className="flex items-center gap-2 rounded-[10px] border border-border-strong bg-icon-tile p-2">
          <input
            id="ask-ai-drawer-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask RocketRide..."
            className="min-w-0 flex-1 bg-transparent px-1 text-sm text-text placeholder:text-text-dim outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            aria-label="Send question"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-border-strong bg-accent text-white transition-colors hover:bg-[#00a8d6]"
          >
            <Icon name="bx-up-arrow-alt" className="text-lg" />
          </button>
        </div>
      </form>
    </aside>
  );
}

export function AskAiExperience() {
  const topExperienceRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const updateLauncherVisibility = () => {
      const topExperience = topExperienceRef.current;
      if (!topExperience) return;
      const nextVisible = topExperience.getBoundingClientRect().bottom <= 88;
      window.dispatchEvent(
        new CustomEvent("ask-ai:visibility", {
          detail: { visible: nextVisible },
        }),
      );
    };

    updateLauncherVisibility();
    window.addEventListener("scroll", updateLauncherVisibility, { passive: true });
    window.addEventListener("resize", updateLauncherVisibility);

    return () => {
      window.removeEventListener("scroll", updateLauncherVisibility);
      window.removeEventListener("resize", updateLauncherVisibility);
    };
  }, []);

  useEffect(() => {
    const handleOpenRequest = () => setDrawerOpen(true);

    window.addEventListener("ask-ai:open", handleOpenRequest);
    return () => window.removeEventListener("ask-ai:open", handleOpenRequest);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("ask-ai-docked-open", drawerOpen);
    window.dispatchEvent(
      new CustomEvent("ask-ai:open-state", {
        detail: { open: drawerOpen },
      }),
    );

    return () => {
      document.documentElement.classList.remove("ask-ai-docked-open");
    };
  }, [drawerOpen]);

  const askQuestion = useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const answer = getAnswer(trimmed);
    setMessages((current) => [
      ...current,
      createMessage("user", trimmed),
      createMessage("assistant", answer.content, answer),
    ]);
    setDrawerOpen(true);
  }, []);

  return (
    <>
      <div ref={topExperienceRef} className="bg-bg">
        <Hero onAskQuestion={askQuestion} />
        <AppCarousel />
      </div>

      <AskAiDrawer
        open={drawerOpen}
        messages={messages}
        onClose={() => setDrawerOpen(false)}
        onAsk={askQuestion}
      />
    </>
  );
}
