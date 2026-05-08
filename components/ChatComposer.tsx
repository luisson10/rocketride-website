"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
} from "react";
import { ArrowUp, Microphone } from "@boxicons/react";

const PROXIMITY_FALLOFF_PX = 220;
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

type GlowStyle = CSSProperties & Record<`--${string}`, string>;

const INITIAL_GLOW_STYLE: GlowStyle = {
  "--glow-x": "50%",
  "--glow-y": "50%",
  "--glow-opacity": "0.34",
  "--glow-scale": "1",
  "--border-opacity": "0.46",
  "--border-angle": "135deg",
};

const PROMPT_QUESTIONS = [
  "How much does RocketRide cost?",
  "Can RocketRide deploy my first AI pipeline?",
  "What can I build with RocketRide?",
  "Does RocketRide work with my existing tools?",
  "How do teams collaborate inside RocketRide?",
  "Can I compare different LLMs before shipping?",
  "Does RocketRide manage API keys for providers?",
  "How fast can I launch a production AI workflow?",
  "Can RocketRide turn recordings into content?",
  "What integrations does RocketRide support?",
  "Is RocketRide built for enterprise teams?",
  "Can I monitor pipeline cost and performance?",
  "How does RocketRide help with agent workflows?",
  "Can I build without managing cloud infrastructure?",
];

type Variant = "hero" | "panel";

type Props = {
  onAskQuestion: (question: string) => void;
  variant?: Variant;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export function ChatComposer({
  onAskQuestion,
  variant = "hero",
  placeholder = "Ask RocketRide…",
  autoFocus = false,
  className = "",
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [askValue, setAskValue] = useState("");
  const [animatedPrompt, setAnimatedPrompt] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeletingPrompt, setIsDeletingPrompt] = useState(false);

  const showFlourishes = variant === "hero";

  useEffect(() => {
    if (!showFlourishes) return;
    const currentPrompt = PROMPT_QUESTIONS[promptIndex];
    const isComplete = animatedPrompt === currentPrompt;
    const isEmpty = animatedPrompt.length === 0;
    const delay = isComplete ? 2200 : isDeletingPrompt ? 24 : 46;

    const timeout = window.setTimeout(() => {
      if (!isDeletingPrompt && isComplete) {
        setIsDeletingPrompt(true);
        return;
      }
      if (isDeletingPrompt && isEmpty) {
        setIsDeletingPrompt(false);
        setPromptIndex((current) => (current + 1) % PROMPT_QUESTIONS.length);
        return;
      }
      setAnimatedPrompt((current) =>
        isDeletingPrompt
          ? current.slice(0, -1)
          : currentPrompt.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [animatedPrompt, isDeletingPrompt, promptIndex, showFlourishes]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!showFlourishes) return;
    const rect = formRef.current?.getBoundingClientRect();
    const glowEl = glowRef.current;
    if (!rect || !glowEl) return;

    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const next = Math.max(0, Math.min(1, 1 - distance / PROXIMITY_FALLOFF_PX));
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, -10, 110);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, -20, 120);
    const angle =
      Math.atan2(
        e.clientY - (rect.top + rect.height / 2),
        e.clientX - (rect.left + rect.width / 2),
      ) *
        (180 / Math.PI) +
      90;

    glowEl.style.setProperty("--glow-x", `${x}%`);
    glowEl.style.setProperty("--glow-y", `${y}%`);
    glowEl.style.setProperty("--glow-opacity", `${0.32 + next * 0.58}`);
    glowEl.style.setProperty("--glow-scale", `${0.98 + next * 0.06}`);
    glowEl.style.setProperty("--border-opacity", `${0.42 + next * 0.5}`);
    glowEl.style.setProperty("--border-angle", `${angle}deg`);
  };

  const handleMouseLeave = () => {
    const glowEl = glowRef.current;
    if (!glowEl) return;
    glowEl.style.setProperty("--glow-opacity", "0.34");
    glowEl.style.setProperty("--glow-scale", "1");
    glowEl.style.setProperty("--border-opacity", "0.46");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = askValue.trim() || (showFlourishes ? animatedPrompt.trim() : "");
    if (!question) return;
    onAskQuestion(question);
    setAskValue("");
  };

  const preventDefault = (e: MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const placeholderText = showFlourishes ? animatedPrompt : "";

  return (
    <div
      ref={glowRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative w-full max-w-[640px] ${className}`}
      style={INITIAL_GLOW_STYLE}
    >
      {showFlourishes && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 z-[1] rounded-[30px] blur-2xl opacity-[var(--glow-opacity)] transition-[opacity,transform] duration-200 ease-out group-focus-within:opacity-0"
            style={{
              transform: "scale(var(--glow-scale))",
              background:
                "radial-gradient(220px 115px at var(--glow-x) var(--glow-y), rgba(111, 67, 255, 0.72), transparent 62%), radial-gradient(260px 120px at calc(var(--glow-x) + 16%) calc(var(--glow-y) + 14%), rgba(0, 185, 236, 0.5), transparent 66%), radial-gradient(190px 105px at calc(var(--glow-x) - 18%) calc(var(--glow-y) + 22%), rgba(168, 85, 247, 0.38), transparent 68%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[2px] z-[2] rounded-[12px] opacity-[var(--border-opacity)] blur-[1px] transition-opacity duration-200 ease-out group-focus-within:opacity-0"
            style={{
              background:
                "conic-gradient(from var(--border-angle), rgba(0, 185, 236, 0.08), rgba(111, 67, 255, 0.95), rgba(59, 130, 246, 0.88), rgba(0, 185, 236, 0.85), rgba(147, 51, 234, 0.95), rgba(0, 185, 236, 0.08))",
            }}
          />
        </>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative z-10 w-full rounded-[10px] border-steel px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-shadow duration-200 focus-within:shadow-[0_0_0_1px_rgba(0,185,236,0.55),0_0_28px_rgba(0,185,236,0.14),0_20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="flex min-h-[82px] flex-col justify-between gap-4">
          <label htmlFor="chat-composer-input" className="sr-only">
            Ask RocketRide
          </label>
          <div className="relative">
            {!askValue && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 flex min-w-0 items-center text-left text-base text-text-dim"
              >
                <span className="truncate">
                  {showFlourishes ? placeholderText : placeholder}
                </span>
                {showFlourishes && (
                  <span className="ml-0.5 h-5 w-px shrink-0 animate-pulse bg-text-muted" />
                )}
              </div>
            )}
            <input
              id="chat-composer-input"
              ref={inputRef}
              type="text"
              value={askValue}
              onChange={(e) => setAskValue(e.target.value)}
              className="relative w-full bg-transparent text-left text-base text-text caret-text outline-none border-none"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={preventDefault}
              aria-label="Use microphone"
              className="box-border inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border-strong bg-icon-tile p-0 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              <Microphone className="text-lg leading-none" width="1em" height="1em" />
            </button>
            <button
              type="submit"
              aria-label="Submit question"
              className="box-border inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border-strong bg-accent p-0 text-white transition-colors hover:bg-[#00a8d6]"
            >
              <ArrowUp className="text-lg leading-none" width="1em" height="1em" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
