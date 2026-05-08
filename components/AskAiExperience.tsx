"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatPanel, type DockState, type Message } from "./ChatPanel";
import { Hero } from "./Hero";

type FaqAnswer = {
  match: string[];
  content: string;
  href?: string;
  hrefLabel?: string;
};

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

type AskAiExperienceProps = {
  fullViewportHero?: boolean;
  heroBackgroundVideoSrc?: string;
};

export function AskAiExperience({
  fullViewportHero = false,
  heroBackgroundVideoSrc,
}: AskAiExperienceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [dockState, setDockState] = useState<DockState>("centered");

  const askQuestion = useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const answer = getAnswer(trimmed);
    setMessages((current) => [
      ...current,
      createMessage("user", trimmed),
      createMessage("assistant", answer.content, answer),
    ]);
  }, []);

  // Drive the legacy ask-ai:visibility / ask-ai:open-state events the Nav listens to.
  // - Capsule visible only while there's no conversation yet AND user scrolled past hero.
  // - Open-state mirrors whether the chat is in docked mode (so Nav can hide the capsule).
  useEffect(() => {
    const hasConversation = messages.length > 0;

    const updateCapsule = () => {
      const visible = !hasConversation && window.scrollY > 280;
      window.dispatchEvent(
        new CustomEvent("ask-ai:visibility", { detail: { visible } }),
      );
    };

    updateCapsule();
    window.addEventListener("scroll", updateCapsule, { passive: true });
    window.addEventListener("resize", updateCapsule);
    return () => {
      window.removeEventListener("scroll", updateCapsule);
      window.removeEventListener("resize", updateCapsule);
    };
  }, [messages.length]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ask-ai:open-state", {
        detail: { open: dockState === "docked" && messages.length > 0 },
      }),
    );
  }, [dockState, messages.length]);

  // Allow the Nav capsule to summon the welcome composer (scroll to top).
  useEffect(() => {
    const onOpen = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("ask-ai:open", onOpen);
    return () => window.removeEventListener("ask-ai:open", onOpen);
  }, []);

  const hasConversation = messages.length > 0;

  if (!hasConversation) {
    return (
      <div className={`relative bg-bg ${fullViewportHero ? "-mt-[90px]" : ""}`}>
        <Hero
          onAskQuestion={askQuestion}
          fullViewport={fullViewportHero}
          backgroundVideoSrc={heroBackgroundVideoSrc}
        />
      </div>
    );
  }

  // Conversation mode: reserve hero-section height with a placeholder, render the
  // chat panel fixed-positioned over the top region. The carousel + the rest of the
  // marketing page sit naturally below the placeholder.
  return (
    <>
      <div
        aria-hidden
        className="bg-bg"
        style={{ minHeight: "calc(100dvh - 40px)" }}
      />
      <ChatPanel
        messages={messages}
        onAskQuestion={askQuestion}
        onDockStateChange={setDockState}
      />
    </>
  );
}
