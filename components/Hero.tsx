"use client";

import { useRef, useState, type FormEvent, type MouseEvent } from "react";
import Image from "next/image";
import { PulsingBorder } from "@paper-design/shaders-react";
import { Icon } from "./ui/Icon";

// Two palettes that crossfade by cursor proximity.
// Base = cool, accent-anchored (always on). Hot = vivid pop (fades in near the border).
const BASE_COLORS = ["#00b9ec", "#1e3a8a", "#0a4a6a"];
const HOT_COLORS = ["#00b9ec", "#ff3df0", "#9333ea"];

// Distance (in px) from the form's bounding box at which the hot glow is fully off.
// Closer than this → hot glow fades in linearly; on/inside the form → fully on.
const PROXIMITY_FALLOFF_PX = 220;

type QuickAction = { label: string; icon: string };

const QUICK_ACTIONS: QuickAction[] = [
  { label: "Write a Newsletter", icon: "bx-news" },
  { label: "Show Notes", icon: "bx-note" },
  { label: "Blog Post", icon: "bx-book-content" },
  { label: "Video Script", icon: "bx-video" },
  { label: "LinkedIn Post", icon: "bxl-linkedin" },
];

export function Hero() {
  const formRef = useRef<HTMLFormElement>(null);
  const [proximity, setProximity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = formRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const next = Math.max(0, Math.min(1, 1 - distance / PROXIMITY_FALLOFF_PX));
    setProximity(next);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
  const preventDefault = (e: MouseEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-bg min-h-[calc(100vh-80px)] flex items-center justify-center"
    >
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo orb */}
          <div className="relative z-10 mb-5 h-[52px] w-[52px] rounded-[10px] bg-icon-tile border-steel-dark shadow-[0_0_40px_var(--color-accent-glow),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center justify-center">
            <Image
              src="/RockerRide-icon-transparent-white.svg"
              alt="RocketRide"
              width={32}
              height={32}
              className="h-[60%] w-[60%] object-contain opacity-90"
              priority
            />
          </div>

          {/* Greeting row */}
          <div className="relative z-10 mb-6 flex items-center justify-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-icon-tile border-steel-dark">
              <Icon name="bx-edit" className="text-sm text-text-muted" />
            </span>
            <span className="text-lg font-medium text-text-muted">
              Good afternoon
            </span>
          </div>

          {/* Chat form + shader glow */}
          <div className="relative w-full max-w-[640px]">
            {/* Two PulsingBorder layers, crossfaded by proximity. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 z-0"
            >
              {/* Base glow — always on, cool cyan. */}
              <div className="absolute inset-0">
                <PulsingBorder
                  colors={BASE_COLORS}
                  colorBack="rgba(0,0,0,0)"
                  roundness={0.08}
                  thickness={0.08}
                  softness={0.85}
                  intensity={0.5}
                  bloom={0.7}
                  spots={3}
                  spotSize={0.4}
                  pulse={0.15}
                  smoke={0}
                  smokeSize={0}
                  speed={0.4}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              {/* Hot glow — opacity follows cursor proximity. */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: proximity,
                  transition: "opacity 180ms ease-out",
                }}
              >
                <PulsingBorder
                  colors={HOT_COLORS}
                  colorBack="rgba(0,0,0,0)"
                  roundness={0.08}
                  thickness={0.12}
                  softness={0.8}
                  intensity={0.7}
                  bloom={0.9}
                  spots={4}
                  spotSize={0.45}
                  pulse={0.3}
                  smoke={0}
                  smokeSize={0}
                  speed={0.7}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative z-10 w-full rounded-[10px] border-steel px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Top row: inner chips */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={preventDefault}
                  className="inline-flex items-center gap-1.5 rounded-[10px] bg-icon-tile border border-border-strong px-3 py-1.5 text-xs text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
                >
                  <Icon name="bx-upload" className="text-sm" />
                  Upload Recording
                </button>
                <button
                  type="button"
                  onClick={preventDefault}
                  className="inline-flex items-center gap-1.5 rounded-[10px] bg-icon-tile border border-border-strong px-3 py-1.5 text-xs text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
                >
                  <Icon name="bx-layer" className="text-sm" />
                  Select space
                  <Icon name="bx-chevron-down" className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={preventDefault}
                  className="inline-flex items-center gap-1.5 rounded-[10px] bg-icon-tile border border-border-strong px-3 py-1.5 text-xs text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
                >
                  <Icon name="bx-play-circle" className="text-sm" />
                  No recording selected
                  <Icon name="bx-chevron-down" className="text-sm" />
                </button>
              </div>

              {/* Main input row */}
              <div className="mt-3">
                <label htmlFor="hero-ask" className="sr-only">
                  Ask RocketRide
                </label>
                <input
                  id="hero-ask"
                  type="text"
                  placeholder="Type to create content ex: blog post, newsletter…"
                  className="w-full bg-transparent text-text placeholder:text-text-dim text-base outline-none border-none"
                  autoComplete="off"
                />
              </div>

              {/* Bottom-right generate button */}
              <div className="mt-3 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-[10px] bg-accent text-white px-3 py-1.5 text-xs font-semibold hover:bg-[#00a8d6] transition-colors"
                >
                  <Icon name="bx-subdirectory-left" className="text-sm" />
                  Generate
                </button>
              </div>
            </form>
          </div>

          {/* Quick-action chips row */}
          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={preventDefault}
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-icon-tile border border-border-strong px-3 py-1.5 text-xs text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
              >
                <Icon name={action.icon} className="text-sm" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
