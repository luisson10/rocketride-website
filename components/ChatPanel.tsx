"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@boxicons/react";
import { ChatComposer } from "./ChatComposer";

const SCROLL_DOCK_THRESHOLD = 280;
const SCROLL_RECENTER_THRESHOLD = 80;

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  href?: string;
  hrefLabel?: string;
};

export type DockState = "centered" | "docked";

type Props = {
  messages: Message[];
  onAskQuestion: (question: string) => void;
  onDockStateChange?: (state: DockState) => void;
};

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-[10px] border px-4 py-3 text-sm leading-relaxed ${
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
            <ArrowRight className="text-base" width="1em" height="1em" />
          </a>
        )}
      </div>
    </div>
  );
}

export function ChatPanel({
  messages,
  onAskQuestion,
  onDockStateChange,
}: Props) {
  const [dockState, setDockState] = useState<DockState>("centered");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inner messages to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  // Window scroll → dock/recenter with hysteresis
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setDockState((prev) => {
        if (prev === "centered" && scrollY > SCROLL_DOCK_THRESHOLD) return "docked";
        if (prev === "docked" && scrollY < SCROLL_RECENTER_THRESHOLD) return "centered";
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Anchor link clicks anywhere on the page → force dock-right
  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      setDockState("docked");
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Notify parent when dock state changes
  useEffect(() => {
    onDockStateChange?.(dockState);
  }, [dockState, onDockStateChange]);

  // Toggle the body class for layout shift (padding-right for content)
  useEffect(() => {
    const isDocked = dockState === "docked";
    document.documentElement.classList.toggle("ask-ai-docked-open", isDocked);
    return () => {
      document.documentElement.classList.remove("ask-ai-docked-open");
    };
  }, [dockState]);

  const isDocked = dockState === "docked";

  const panelClasses = `fixed z-30 flex flex-col bg-bg shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-[top,right,left,width,height,transform,border-radius] duration-300 ease-out ${
    isDocked
      ? "top-0 right-0 left-auto translate-x-0 h-[100dvh] w-full sm:w-[360px] rounded-none border-l border-border-strong"
      : "top-[88px] left-1/2 -translate-x-1/2 w-[min(760px,calc(100vw-32px))] h-[calc(100dvh-120px)] max-h-[820px] rounded-[15px] border-steel"
  }`;

  return (
    <aside aria-label="Ask AI conversation" className={panelClasses}>
      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-[680px] flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-border-strong px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-[680px] justify-center">
          <ChatComposer
            variant="panel"
            placeholder="Ask a follow-up…"
            onAskQuestion={onAskQuestion}
            className="!max-w-[680px]"
          />
        </div>
      </div>
    </aside>
  );
}
