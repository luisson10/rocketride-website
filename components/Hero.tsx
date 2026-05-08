"use client";

import {
  DollarCircle,
  Grid,
  MessageBubbleDots,
  Rocket,
  type BoxIconProps,
} from "@boxicons/react";
import type { ComponentType } from "react";
import { ChatComposer } from "./ChatComposer";

type QuestionHint = { label: string; icon: ComponentType<BoxIconProps> };

const QUESTION_HINTS: QuestionHint[] = [
  { label: "What can I build?", icon: MessageBubbleDots },
  { label: "How much does it cost?", icon: DollarCircle },
  { label: "Browse app examples", icon: Grid },
  { label: "How do teams deploy?", icon: Rocket },
];

type HeroProps = {
  onAskQuestion: (question: string) => void;
  fullViewport?: boolean;
  backgroundVideoSrc?: string;
};

export function Hero({
  onAskQuestion,
  fullViewport = false,
  backgroundVideoSrc,
}: HeroProps) {
  return (
    <section
      className={`relative z-10 flex items-center justify-center overflow-hidden bg-bg ${
        fullViewport
          ? "min-h-[calc(100svh+90px)] pt-[90px]"
          : "min-h-[410px] pb-6 pt-24 sm:min-h-[440px]"
      }`}
    >
      {backgroundVideoSrc && (
        <>
          <video
            aria-hidden
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
            src={backgroundVideoSrc}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65"
          />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
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

          <ChatComposer variant="hero" onAskQuestion={onAskQuestion} />

          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2">
            {QUESTION_HINTS.map((action) => {
              const HintIcon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    onAskQuestion(action.label);
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
