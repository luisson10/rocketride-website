"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
} from "react";
import {
  ArrowUp,
  DollarCircle,
  Grid,
  MessageBubbleDots,
  Microphone,
  Rocket,
  type BoxIconProps,
} from "@boxicons/react";

// Distance from the form where the liquid halo is fully faded out.
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

type QuestionHint = { label: string; icon: ComponentType<BoxIconProps> };

const QUESTION_HINTS: QuestionHint[] = [
  { label: "What can I build?", icon: MessageBubbleDots },
  { label: "How much does it cost?", icon: DollarCircle },
  { label: "Browse app examples", icon: Grid },
  { label: "How do teams deploy?", icon: Rocket },
];

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

type HeroProps = {
  onAskQuestion?: (question: string) => void;
};

export function Hero({ onAskQuestion }: HeroProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [askValue, setAskValue] = useState("");
  const [animatedPrompt, setAnimatedPrompt] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeletingPrompt, setIsDeletingPrompt] = useState(false);

  useEffect(() => {
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
  }, [animatedPrompt, isDeletingPrompt, promptIndex]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
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
    const question = askValue.trim() || animatedPrompt.trim();
    if (!question) return;
    onAskQuestion?.(question);
    setAskValue("");
  };
  const preventDefault = (e: MouseEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 overflow-visible bg-bg flex min-h-[410px] items-center justify-center pt-24 pb-6 sm:min-h-[440px]"
    >
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative z-10 mb-7 max-w-[760px] text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Welcome to RocketRide.
            </h1>
            <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-text-muted sm:text-lg">
              Browse apps built with RocketRide, or ask the site directly and
              get answers without digging through pages.
            </p>
          </div>

          {/* Chat form + cursor-reactive liquid glow */}
          <div
            ref={glowRef}
            className="group relative w-full max-w-[640px]"
            style={INITIAL_GLOW_STYLE}
          >
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

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative z-10 w-full rounded-[10px] border-steel px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-shadow duration-200 focus-within:shadow-[0_0_0_1px_rgba(0,185,236,0.55),0_0_28px_rgba(0,185,236,0.14),0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="flex min-h-[82px] flex-col justify-between gap-4">
                <label htmlFor="hero-ask" className="sr-only">
                  Ask RocketRide
                </label>
                <div className="relative">
                  {!askValue && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 flex min-w-0 items-center text-left text-base text-text-dim"
                    >
                      <span className="truncate">{animatedPrompt}</span>
                      <span className="ml-0.5 h-5 w-px shrink-0 animate-pulse bg-text-muted" />
                    </div>
                  )}
                  <input
                    id="hero-ask"
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

          {/* Question hint chips row */}
          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2">
            {QUESTION_HINTS.map((action) => {
              const HintIcon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    onAskQuestion?.(action.label);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-[10px] bg-icon-tile border border-border-strong px-3 py-1.5 text-xs text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
                >
                  <HintIcon className="text-sm" width="1em" height="1em" />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
